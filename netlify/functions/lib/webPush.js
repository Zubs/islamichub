// Web Push with VAPID (RFC 8292) and payload encryption (RFC 8291, aes128gcm),
// written against Node's built-in crypto so no push library is needed.
import { Buffer } from 'node:buffer'
import {
  createECDH,
  createPrivateKey,
  createSign,
  hkdfSync,
  createCipheriv,
  randomBytes,
} from 'node:crypto'

const RECORD_SIZE = 4096
const TOKEN_LIFETIME_SECONDS = 12 * 60 * 60
const DEFAULT_TTL_SECONDS = 10 * 60

export function fromBase64Url(text) {
  return Buffer.from(text, 'base64url')
}

export function toBase64Url(bytes) {
  return Buffer.from(bytes).toString('base64url')
}

// keys: { publicKey, privateKey } as base64url; the public key is the 65-byte uncompressed point.
export function vapidToken(audience, { publicKey, privateKey, subject }, now = Date.now()) {
  const point = fromBase64Url(publicKey)
  const key = createPrivateKey({
    format: 'jwk',
    key: {
      kty: 'EC',
      crv: 'P-256',
      d: privateKey,
      x: toBase64Url(point.subarray(1, 33)),
      y: toBase64Url(point.subarray(33, 65)),
    },
  })
  const header = toBase64Url(JSON.stringify({ typ: 'JWT', alg: 'ES256' }))
  const claims = toBase64Url(
    JSON.stringify({
      aud: audience,
      exp: Math.floor(now / 1000) + TOKEN_LIFETIME_SECONDS,
      sub: subject,
    }),
  )
  const signature = createSign('SHA256')
    .update(`${header}.${claims}`)
    .sign({ key, dsaEncoding: 'ieee-p1363' })

  return `${header}.${claims}.${toBase64Url(signature)}`
}

// Encrypts a payload for one subscription. `salt` and `sender` are only passed by tests.
export function encryptPayload(payload, { p256dh, auth }, { salt = randomBytes(16), sender } = {}) {
  const receiverPublic = fromBase64Url(p256dh)
  const ecdh = sender ?? createECDH('prime256v1')
  if (!sender) {
    ecdh.generateKeys()
  }

  const senderPublic = ecdh.getPublicKey()
  const shared = ecdh.computeSecret(receiverPublic)
  const keyInfo = Buffer.concat([
    Buffer.from('WebPush: info\0'),
    receiverPublic,
    senderPublic,
  ])
  const inputKey = Buffer.from(hkdfSync('sha256', shared, fromBase64Url(auth), keyInfo, 32))
  const contentKey = Buffer.from(
    hkdfSync('sha256', inputKey, salt, Buffer.from('Content-Encoding: aes128gcm\0'), 16),
  )
  const nonce = Buffer.from(
    hkdfSync('sha256', inputKey, salt, Buffer.from('Content-Encoding: nonce\0'), 12),
  )

  const cipher = createCipheriv('aes-128-gcm', contentKey, nonce)
  const record = Buffer.concat([Buffer.from(payload), Buffer.from([2])])
  const encrypted = Buffer.concat([cipher.update(record), cipher.final(), cipher.getAuthTag()])

  const header = Buffer.alloc(21)
  salt.copy(header, 0)
  header.writeUInt32BE(RECORD_SIZE, 16)
  header.writeUInt8(senderPublic.length, 20)
  return Buffer.concat([header, senderPublic, encrypted])
}

// Sends one push. Resolves to { ok, gone, status }; `gone` means the subscription no longer exists.
export async function sendPush(subscription, payload, vapid, { fetch: send = fetch, ttl = DEFAULT_TTL_SECONDS } = {}) {
  const endpoint = new URL(subscription.endpoint)
  const token = vapidToken(endpoint.origin, vapid)
  const response = await send(subscription.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `vapid t=${token}, k=${vapid.publicKey}`,
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      TTL: String(ttl),
      Urgency: 'high',
    },
    body: encryptPayload(JSON.stringify(payload), subscription.keys),
  })

  return {
    ok: response.ok,
    gone: response.status === 404 || response.status === 410,
    status: response.status,
  }
}

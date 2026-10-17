import { describe, it, expect, vi } from 'vitest'
import {
  createECDH,
  createDecipheriv,
  createVerify,
  createPublicKey,
  hkdfSync,
  randomBytes,
} from 'node:crypto'
import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import {
  vapidToken,
  encryptPayload,
  sendPush,
  toBase64Url,
  fromBase64Url,
} from '../netlify/functions/lib/webPush.js'
import {
  validateRecord,
  remindersDue,
  localTime,
  recordId,
  MAX_REQUEST_BYTES,
} from '../netlify/functions/lib/pushRecords.js'
import { handlePushRequest } from '../netlify/functions/push.js'
import { sendDueReminders } from '../netlify/functions/push-send.js'
import { calcPrayerTimes } from '@/utils/prayer.js'
import { firstDayOfHijriMonth } from '@/utils/hijri.js'

function keyPair() {
  const ecdh = createECDH('prime256v1')
  ecdh.generateKeys()
  return ecdh
}

function device() {
  const keys = keyPair()
  const auth = randomBytes(16)
  return {
    keys,
    auth,
    subscription: {
      endpoint: `https://fcm.googleapis.com/fcm/send/${randomBytes(8).toString('hex')}`,
      keys: { p256dh: toBase64Url(keys.getPublicKey()), auth: toBase64Url(auth) },
    },
  }
}

// What a browser does with a received push (RFC 8291), to prove the encryption round-trips.
function decrypt(body, { keys, auth }) {
  const salt = body.subarray(0, 16)
  const recordSize = body.readUInt32BE(16)
  const keyLength = body.readUInt8(20)
  const senderPublic = body.subarray(21, 21 + keyLength)
  const encrypted = body.subarray(21 + keyLength)
  const shared = keys.computeSecret(senderPublic)
  const keyInfo = Buffer.concat([Buffer.from('WebPush: info\0'), keys.getPublicKey(), senderPublic])
  const inputKey = Buffer.from(hkdfSync('sha256', shared, auth, keyInfo, 32))
  const contentKey = Buffer.from(
    hkdfSync('sha256', inputKey, salt, Buffer.from('Content-Encoding: aes128gcm\0'), 16),
  )
  const nonce = Buffer.from(
    hkdfSync('sha256', inputKey, salt, Buffer.from('Content-Encoding: nonce\0'), 12),
  )
  const decipher = createDecipheriv('aes-128-gcm', contentKey, nonce)
  decipher.setAuthTag(encrypted.subarray(encrypted.length - 16))
  const plain = Buffer.concat([
    decipher.update(encrypted.subarray(0, encrypted.length - 16)),
    decipher.final(),
  ])
  return {
    text: plain.subarray(0, plain.length - 1).toString(),
    delimiter: plain.at(-1),
    recordSize,
  }
}

function vapidKeys() {
  const keys = keyPair()
  return {
    publicKey: toBase64Url(keys.getPublicKey()),
    privateKey: toBase64Url(keys.getPrivateKey()),
    subject: 'mailto:test@example.com',
  }
}

function memoryStore(initial = {}) {
  const data = new Map(Object.entries(initial))
  return {
    data,
    setJSON: vi.fn(async (key, value) => data.set(key, structuredClone(value))),
    get: vi.fn(async (key) => (data.has(key) ? structuredClone(data.get(key)) : null)),
    delete: vi.fn(async (key) => data.delete(key)),
    list: vi.fn(async () => ({ blobs: [...data.keys()].map((key) => ({ key })) })),
  }
}

const LAGOS = {
  lat: 6.524379,
  lng: 3.379206,
  timezone: 'Africa/Lagos',
  method: 'MWL',
  asrMethod: 'standard',
  items: { fajr: true, maghrib: true },
}

function body(overrides = {}, target = device()) {
  return { subscription: target.subscription, ...LAGOS, ...overrides }
}

function request(method, payload) {
  const init = { method }
  init.body = typeof payload === 'string' ? payload : JSON.stringify(payload)
  return new Request('https://islamichub.xyz/api/push', init)
}

// The instant at which a device's local clock reads the given prayer time on 10 April 2026.
function instantOf(record, prayer, plusMinutes = 0) {
  const offset = localTime(new Date(Date.UTC(2026, 3, 10, 12)), record.timezone).offsetHours
  const times = calcPrayerTimes(
    record.lat,
    record.lng,
    new Date(2026, 3, 10),
    offset,
    record.method,
    record.asrMethod,
  )
  const [hours, minutes] = times[prayer].split(':').map(Number)
  return new Date(Date.UTC(2026, 3, 10, hours, minutes + plusMinutes) - offset * 3600000)
}

describe('web push', () => {
  it('encrypts a payload the receiving device can decrypt', () => {
    const target = device()
    const message = JSON.stringify({ title: 'Maghrib prayer', path: '/tracker' })

    const encrypted = encryptPayload(message, target.subscription.keys)
    const { text, delimiter, recordSize } = decrypt(encrypted, target)

    expect(text).toBe(message)
    expect(delimiter).toBe(2)
    expect(recordSize).toBe(4096)
  })

  it('uses a fresh salt and key each time, so two messages never look alike', () => {
    const target = device()

    const first = encryptPayload('same', target.subscription.keys)
    const second = encryptPayload('same', target.subscription.keys)

    expect(first.equals(second)).toBe(false)
    expect(decrypt(second, target).text).toBe('same')
  })

  it('cannot be decrypted by another device', () => {
    const encrypted = encryptPayload('private', device().subscription.keys)

    expect(() => decrypt(encrypted, device())).toThrow()
  })

  it('signs a token the push service can verify, for that service only', () => {
    const vapid = vapidKeys()
    const now = Date.UTC(2026, 3, 10)

    const token = vapidToken('https://fcm.googleapis.com', vapid, now)
    const [header, claims, signature] = token.split('.')
    const point = fromBase64Url(vapid.publicKey)
    const publicKey = createPublicKey({
      format: 'jwk',
      key: {
        kty: 'EC',
        crv: 'P-256',
        x: toBase64Url(point.subarray(1, 33)),
        y: toBase64Url(point.subarray(33, 65)),
      },
    })

    expect(JSON.parse(fromBase64Url(header))).toEqual({ typ: 'JWT', alg: 'ES256' })
    expect(JSON.parse(fromBase64Url(claims))).toEqual({
      aud: 'https://fcm.googleapis.com',
      exp: now / 1000 + 12 * 3600,
      sub: 'mailto:test@example.com',
    })
    expect(
      createVerify('SHA256')
        .update(`${header}.${claims}`)
        .verify({ key: publicKey, dsaEncoding: 'ieee-p1363' }, fromBase64Url(signature)),
    ).toBe(true)
  })

  it('posts the encrypted message with the headers a push service expects', async () => {
    const target = device()
    const vapid = vapidKeys()
    const fetch = vi.fn(async () => new Response(null, { status: 201 }))

    const result = await sendPush(target.subscription, { title: 'Fajr prayer' }, vapid, { fetch })

    const [address, options] = fetch.mock.calls[0]
    expect(address).toBe(target.subscription.endpoint)
    expect(options.method).toBe('POST')
    expect(options.headers['Content-Encoding']).toBe('aes128gcm')
    expect(options.headers.Authorization).toMatch(/^vapid t=[\w-]+\.[\w-]+\.[\w-]+, k=/)
    expect(options.headers.Authorization).toContain(vapid.publicKey)
    expect(Number(options.headers.TTL)).toBeGreaterThan(0)
    expect(JSON.parse(decrypt(options.body, target).text)).toEqual({ title: 'Fajr prayer' })
    expect(result).toEqual({ ok: true, gone: false, status: 201 })
  })

  it.each([404, 410])('reports a subscription as gone on a %i', async (status) => {
    const fetch = vi.fn(async () => new Response(null, { status }))

    const result = await sendPush(device().subscription, {}, vapidKeys(), { fetch })

    expect(result).toMatchObject({ ok: false, gone: true })
  })
})

describe('validateRecord', () => {
  it('stores coordinates rounded to two decimal places and only the chosen reminders', () => {
    const record = validateRecord(body({ items: { fajr: true, isha: false, witr: true } }))

    expect(record.lat).toBe(6.52)
    expect(record.lng).toBe(3.38)
    expect(record.items).toEqual(['fajr'])
    expect(record.timezone).toBe('Africa/Lagos')
    expect(Object.keys(record).sort()).toEqual(
      ['asrMethod', 'items', 'lat', 'lng', 'method', 'sent', 'subscription', 'timezone'].sort(),
    )
  })

  it('keeps the khutbah time only while the khutbah reminder is chosen', () => {
    expect(validateRecord(body({ items: { khutbah: true }, khutbah: '13:15' })).khutbah).toBe(
      '13:15',
    )
    expect(validateRecord(body({ items: { fajr: true }, khutbah: '13:15' }))).not.toHaveProperty(
      'khutbah',
    )
  })

  it('keeps nothing else the client sends', () => {
    const record = validateRecord(body({ name: 'Zubair', email: 'a@b.c', place: 'Ikeja' }))

    expect(JSON.stringify(record)).not.toMatch(/Zubair|a@b\.c|Ikeja|6\.524379/)
  })

  it.each([
    ['nothing', null],
    ['text', 'hello'],
    ['no subscription', { ...LAGOS }],
    [
      'an endpoint that is not https',
      body({
        subscription: {
          endpoint: 'http://x.y/z',
          keys: { p256dh: 'a'.repeat(87), auth: 'b'.repeat(22) },
        },
      }),
    ],
    ['no keys', body({ subscription: { endpoint: 'https://push.example/1' } })],
    ['a latitude of 91', body({ lat: 91 })],
    ['a longitude of -181', body({ lng: -181 })],
    ['a latitude that is text', body({ lat: '6.5' })],
    ['an unknown method', body({ method: 'Tehran' })],
    ['an unknown Asr method', body({ asrMethod: 'other' })],
    ['an unknown timezone', body({ timezone: 'Mars/Olympus' })],
    ['no reminders chosen', body({ items: { fajr: false } })],
    ['reminders that are not a record', body({ items: null })],
    ['a khutbah time that is not a time', body({ items: { khutbah: true }, khutbah: '25:99' })],
  ])('rejects %s', (name, payload) => {
    expect(validateRecord(payload)).toBeNull()
  })
})

describe('remindersDue', () => {
  const lagos = validateRecord(body({ items: { fajr: true, maghrib: true } }))
  const london = validateRecord(
    body({ lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', items: { maghrib: true } }),
  )

  it('knows the wall-clock time and offset of a device, summer time included', () => {
    const instant = new Date(Date.UTC(2026, 3, 10, 12, 30))

    expect(localTime(instant, 'Africa/Lagos')).toMatchObject({
      day: '2026-04-10',
      minutes: 13 * 60 + 30,
      offsetHours: 1,
    })
    expect(localTime(instant, 'Europe/London')).toMatchObject({
      minutes: 13 * 60 + 30,
      offsetHours: 1,
    })
    expect(localTime(new Date(Date.UTC(2026, 0, 10, 12, 30)), 'Europe/London').offsetHours).toBe(0)
    expect(localTime(new Date(Date.UTC(2026, 3, 10, 22, 30)), 'Asia/Tokyo')).toMatchObject({
      day: '2026-04-11',
      minutes: 7 * 60 + 30,
      offsetHours: 9,
    })
  })

  it('is due in the minute the prayer time arrives', () => {
    const due = remindersDue(lagos, instantOf(lagos, 'maghrib'))

    expect(due).toEqual([
      {
        key: 'maghrib',
        day: '2026-04-10',
        path: '/tracker',
        title: 'Maghrib prayer',
        body: 'It is time for Maghrib.',
      },
    ])
  })

  it('sends each of two devices its reminder at its own local time', () => {
    const lagosMaghrib = instantOf(lagos, 'maghrib')
    const londonMaghrib = instantOf(london, 'maghrib')

    expect(lagosMaghrib.getTime()).not.toBe(londonMaghrib.getTime())
    expect(remindersDue(lagos, lagosMaghrib).map((due) => due.key)).toEqual(['maghrib'])
    expect(remindersDue(london, lagosMaghrib)).toEqual([])
    expect(remindersDue(london, londonMaghrib).map((due) => due.key)).toEqual(['maghrib'])
    expect(remindersDue(lagos, londonMaghrib)).toEqual([])
  })

  it('is not due a minute early, and is still due three minutes late but not four', () => {
    expect(remindersDue(lagos, instantOf(lagos, 'fajr', -1))).toEqual([])
    expect(remindersDue(lagos, instantOf(lagos, 'fajr', 3))).toHaveLength(1)
    expect(remindersDue(lagos, instantOf(lagos, 'fajr', 4))).toEqual([])
    expect(remindersDue(lagos, instantOf(lagos, 'fajr', 10))).toEqual([])
  })

  it('is not due again once sent for that day, and is due again the next day', () => {
    const sent = { ...lagos, sent: { fajr: '2026-04-10' } }

    expect(remindersDue(sent, instantOf(lagos, 'fajr', 1))).toEqual([])
    expect(
      remindersDue({ ...lagos, sent: { fajr: '2026-04-09' } }, instantOf(lagos, 'fajr')),
    ).toHaveLength(1)
  })

  it('times the adhkar reminders twenty minutes after their prayer, opening the adhkar', () => {
    const record = validateRecord(body({ items: { 'morning-adhkar': true } }))

    expect(remindersDue(record, instantOf(record, 'fajr'))).toEqual([])
    expect(remindersDue(record, instantOf(record, 'fajr', 20))).toMatchObject([
      { key: 'morning-adhkar', path: '/adhkar/morning', title: 'Morning adhkar' },
    ])
  })
})

// The instant at which a device's local clock reads `time` on a local date.
function instantAt(record, date, time) {
  const midday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12))
  const offset = localTime(midday, record.timezone).offsetHours
  const [hours, minutes] = time.split(':').map(Number)
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes) -
      offset * 3600000,
  )
}

function prayerTime(record, date, prayer, plusMinutes) {
  const midday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12))
  const offset = localTime(midday, record.timezone).offsetHours
  const times = calcPrayerTimes(record.lat, record.lng, date, offset, record.method, record.asrMethod)
  const [hours, minutes] = times[prayer].split(':').map(Number)
  const total = hours * 60 + minutes + plusMinutes
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

describe('Islamic day and Friday reminders from the server', () => {
  const first = firstDayOfHijriMonth(1448, 12)
  const eighth = new Date(first.getFullYear(), first.getMonth(), first.getDate() + 7)
  const ninth = new Date(first.getFullYear(), first.getMonth(), first.getDate() + 8)
  const lagos = validateRecord(body({ items: { arafah: true } }))
  const tokyo = validateRecord(
    body({ lat: 35.68, lng: 139.69, timezone: 'Asia/Tokyo', items: { arafah: true } }),
  )

  it.each([
    ['Lagos', lagos],
    ['Tokyo', tokyo],
  ])('sends ‘Arafah after Isha on the 8th and after Fajr on the 9th by the clock in %s', (_, record) => {
    const eve = instantAt(record, eighth, prayerTime(record, eighth, 'isha', 20))
    const day = instantAt(record, ninth, prayerTime(record, ninth, 'fajr', 20))

    expect(remindersDue(record, eve)).toMatchObject([
      { key: 'arafah-eve', path: '/calendar', title: 'Tomorrow: The day of ‘Arafah' },
    ])
    expect(remindersDue(record, day)).toMatchObject([
      { key: 'arafah-day', title: 'Today: The day of ‘Arafah' },
    ])
    expect(remindersDue(record, instantAt(record, ninth, prayerTime(record, ninth, 'isha', 20)))).toEqual(
      [],
    )
  })

  it('sends the khutbah reminder at 12:45 on Friday by the device’s clock, once', () => {
    const record = validateRecord(body({ items: { khutbah: true }, khutbah: '13:15' }))
    const friday = new Date(2026, 9, 23)
    const due = remindersDue(record, instantAt(record, friday, '12:45'))

    expect(due).toMatchObject([{ key: 'khutbah', day: '2026-10-23', path: '/jumuah' }])
    expect(
      remindersDue({ ...record, sent: { khutbah: '2026-10-23' } }, instantAt(record, friday, '12:46')),
    ).toEqual([])
    expect(remindersDue(record, instantAt(record, new Date(2026, 9, 22), '12:45'))).toEqual([])
  })
})

describe('push function', () => {
  it('stores one record when push is turned on, with rounded coordinates', async () => {
    const store = memoryStore()
    const target = device()

    const response = await handlePushRequest(request('POST', body({}, target)), store)

    expect(response.status).toBe(200)
    expect(store.data.size).toBe(1)
    const saved = store.data.get(recordId(target.subscription.endpoint))
    expect([saved.lat, saved.lng]).toEqual([6.52, 3.38])
    expect(response.headers.get('Cache-Control')).toBe('no-store')
  })

  it('replaces the record when the device sends new settings', async () => {
    const store = memoryStore()
    const target = device()
    await handlePushRequest(request('POST', body({}, target)), store)

    await handlePushRequest(
      request('POST', body({ method: 'Karachi', items: { isha: true } }, target)),
      store,
    )

    expect(store.data.size).toBe(1)
    expect([...store.data.values()][0]).toMatchObject({ method: 'Karachi', items: ['isha'] })
  })

  it('deletes the record when push is turned off', async () => {
    const store = memoryStore()
    const target = device()
    await handlePushRequest(request('POST', body({}, target)), store)

    const response = await handlePushRequest(
      request('DELETE', { endpoint: target.subscription.endpoint }),
      store,
    )

    expect(response.status).toBe(200)
    expect(store.data.size).toBe(0)
  })

  it.each([
    ['not JSON', '{"subscription":'],
    ['malformed', { subscription: { endpoint: 'nowhere' } }],
    ['an impossible location', body({ lat: 200 })],
  ])('rejects a request that is %s and stores nothing', async (name, payload) => {
    const store = memoryStore()

    const response = await handlePushRequest(request('POST', payload), store)

    expect(response.status).toBe(400)
    expect(store.setJSON).not.toHaveBeenCalled()
  })

  it('rejects an oversized request', async () => {
    const store = memoryStore()
    const oversized = JSON.stringify({ ...body(), padding: 'x'.repeat(MAX_REQUEST_BYTES) })

    const response = await handlePushRequest(request('POST', oversized), store)

    expect(response.status).toBe(413)
    expect(store.setJSON).not.toHaveBeenCalled()
  })

  it('rejects other methods and a delete with no endpoint', async () => {
    const store = memoryStore()

    expect(
      (await handlePushRequest(new Request('https://islamichub.xyz/api/push'), store)).status,
    ).toBe(405)
    expect((await handlePushRequest(request('DELETE', {}), store)).status).toBe(400)
  })
})

describe('scheduled sender', () => {
  function storeWith(...records) {
    return memoryStore(
      Object.fromEntries(records.map((record) => [recordId(record.subscription.endpoint), record])),
    )
  }

  const fajrOnly = () => validateRecord(body({ items: { fajr: true } }))

  it('sends one push at Fajr and none for the rest of the day to a device with only Fajr on', async () => {
    const record = fajrOnly()
    const store = storeWith(record)
    const send = vi.fn(async () => ({ ok: true, gone: false }))
    const start = instantOf(record, 'fajr').getTime() - 6 * 3600000

    for (let minute = 0; minute < 24 * 60; minute += 1) {
      await sendDueReminders(store, { send, now: new Date(start + minute * 60000) })
    }

    expect(send).toHaveBeenCalledOnce()
    expect(send.mock.calls[0][1]).toEqual({
      title: 'Fajr prayer',
      body: 'It is time for Fajr.',
      path: '/tracker',
      tag: 'fajr',
    })
  })

  it('sends a time arriving this minute once, and not again on the next run', async () => {
    const record = fajrOnly()
    const store = storeWith(record)
    const send = vi.fn(async () => ({ ok: true, gone: false }))

    const first = await sendDueReminders(store, { send, now: instantOf(record, 'fajr') })
    const second = await sendDueReminders(store, { send, now: instantOf(record, 'fajr', 1) })

    expect(first).toEqual({ sent: 1, removed: 0 })
    expect(second).toEqual({ sent: 0, removed: 0 })
    expect([...store.data.values()][0].sent).toEqual({ fajr: '2026-04-10' })
  })

  it('does not send a reminder it missed by more than a few minutes', async () => {
    const record = fajrOnly()
    const send = vi.fn(async () => ({ ok: true, gone: false }))

    const result = await sendDueReminders(storeWith(record), {
      send,
      now: instantOf(record, 'fajr', 10),
    })

    expect(result.sent).toBe(0)
    expect(send).not.toHaveBeenCalled()
  })

  it('uses the new time after the device changes its method', async () => {
    const target = device()
    const store = memoryStore()
    await handlePushRequest(request('POST', body({ items: { fajr: true } }, target)), store)
    const mwl = [...store.data.values()][0]
    await handlePushRequest(
      request('POST', body({ items: { fajr: true }, method: 'ISNA' }, target)),
      store,
    )
    const isna = [...store.data.values()][0]
    const send = vi.fn(async () => ({ ok: true, gone: false }))

    await sendDueReminders(store, { send, now: instantOf(mwl, 'fajr') })
    expect(send).not.toHaveBeenCalled()

    await sendDueReminders(store, { send, now: instantOf(isna, 'fajr') })
    expect(send).toHaveBeenCalledOnce()
  })

  it('deletes a subscription the push service says is gone', async () => {
    const record = fajrOnly()
    const store = storeWith(record)
    const send = vi.fn(async () => ({ ok: false, gone: true }))

    const result = await sendDueReminders(store, { send, now: instantOf(record, 'fajr') })

    expect(result).toEqual({ sent: 0, removed: 1 })
    expect(store.data.size).toBe(0)
  })

  it('keeps going when one send fails', async () => {
    const failing = fajrOnly()
    const working = fajrOnly()
    const store = storeWith(failing, working)
    const send = vi.fn(async (subscription) => {
      if (subscription.endpoint === failing.subscription.endpoint) {
        throw new TypeError('network')
      }

      return { ok: true, gone: false }
    })

    const result = await sendDueReminders(store, { send, now: instantOf(working, 'fajr') })

    expect(result.sent).toBe(1)
    expect(store.data.size).toBe(2)
  })
})

describe('hosting configuration for push', () => {
  const config = readFileSync(resolve(process.cwd(), 'netlify.toml'), 'utf8')

  it('sends /api/push to the function before the catch-all page rule', () => {
    expect(config.indexOf('from = "/api/push"')).toBeGreaterThan(-1)
    expect(config.indexOf('from = "/api/push"')).toBeLessThan(config.indexOf('from = "/*"'))
  })
})

import { getStore } from '@netlify/blobs'
import { MAX_REQUEST_BYTES, validateRecord, recordId, isPushEndpoint } from './lib/pushRecords.js'

export const STORE_NAME = 'push-subscriptions'

function reply(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

async function readBody(request) {
  const text = await request.text()
  if (text.length > MAX_REQUEST_BYTES) {
    return { tooLarge: true }
  }

  try {
    return { body: JSON.parse(text) }
  } catch {
    return { body: null }
  }
}

// POST saves or replaces a device's record; DELETE removes it.
export async function handlePushRequest(request, store) {
  if (request.method !== 'POST' && request.method !== 'DELETE') {
    return reply(405, { error: 'method_not_allowed' })
  }

  const { body, tooLarge } = await readBody(request)
  if (tooLarge) {
    return reply(413, { error: 'too_large' })
  }

  if (request.method === 'DELETE') {
    if (!isPushEndpoint(body?.endpoint)) {
      return reply(400, { error: 'bad_request' })
    }

    await store.delete(recordId(body.endpoint))
    return reply(200, { deleted: true })
  }

  const record = validateRecord(body)
  if (!record) {
    return reply(400, { error: 'bad_request' })
  }

  await store.setJSON(recordId(record.subscription.endpoint), record)
  return reply(200, { saved: true })
}

export default (request) => handlePushRequest(request, getStore(STORE_NAME))

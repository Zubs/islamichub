import process from 'node:process'
import { getStore } from '@netlify/blobs'
import { remindersDue } from './lib/pushRecords.js'
import { sendPush } from './lib/webPush.js'
import { STORE_NAME } from './push.js'

// Sends every reminder that is due this minute. Returns { sent, removed } for the log.
export async function sendDueReminders(store, { send, now = new Date() }) {
  let sent = 0
  let removed = 0
  const { blobs } = await store.list()

  for (const { key } of blobs) {
    const record = await store.get(key, { type: 'json' })
    if (!record) {
      continue
    }

    const due = remindersDue(record, now)
    let changed = false
    for (const reminder of due) {
      const result = await send(record.subscription, {
        title: reminder.title,
        body: reminder.body,
        path: reminder.path,
        tag: reminder.key,
      }).catch(() => ({ ok: false, gone: false }))

      if (result.gone) {
        await store.delete(key)
        removed += 1
        changed = false
        break
      }

      record.sent = { ...record.sent, [reminder.key]: reminder.day }
      changed = true
      sent += result.ok ? 1 : 0
    }

    if (changed) {
      await store.setJSON(key, record)
    }
  }

  return { sent, removed }
}

export default async () => {
  const vapid = {
    publicKey: process.env.VITE_VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
    subject: process.env.VAPID_SUBJECT,
  }
  if (!vapid.publicKey || !vapid.privateKey || !vapid.subject) {
    return new Response('not configured', { status: 503 })
  }

  const result = await sendDueReminders(getStore(STORE_NAME), {
    send: (subscription, payload) => sendPush(subscription, payload, vapid),
  })
  return new Response(JSON.stringify(result))
}

export const config = { schedule: '* * * * *' }

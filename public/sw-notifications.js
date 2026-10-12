// Loaded by the site's service worker. Shows a reminder pushed by the server, and opens the
// page a reminder points to when it is tapped.

self.addEventListener('push', (event) => {
  let reminder = {}
  try {
    reminder = event.data?.json() ?? {}
  } catch {
    // a push with no readable message still shows a notification
  }

  event.waitUntil(
    self.registration.showNotification(reminder.title || 'IslamicHub', {
      body: reminder.body || '',
      icon: '/icon-192.png',
      tag: reminder.tag,
      data: { path: reminder.path || '/' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  const path = event.notification.data?.path || '/'
  event.notification.close()
  event.waitUntil(openPath(path))
})

async function openPath(path) {
  const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
  const open = windows[0]
  if (open) {
    await open.focus()
    open.postMessage({ type: 'open', path })
    return
  }

  await self.clients.openWindow(path)
}

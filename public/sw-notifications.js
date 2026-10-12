// Loaded by the site's service worker. Opens the page a reminder points to when it is tapped.

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

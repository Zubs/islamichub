// Loaded by the site's service worker. The old app registered a worker at the same address
// that served its cached pages first. If its cache is still on this device, take over at
// once, delete it and reload open pages so they show the current site.

const OLD_APP_CACHE = 'islamichub-shell-v2'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.has(OLD_APP_CACHE).then((held) => {
      if (held) {
        return self.skipWaiting()
      }
    }),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clearOldApp())
})

async function clearOldApp() {
  if (!(await caches.has(OLD_APP_CACHE))) {
    return
  }

  await caches.delete(OLD_APP_CACHE)
  const windows = await self.clients.matchAll({ type: 'window' })
  await Promise.allSettled(windows.map((client) => client.navigate(client.url)))
}

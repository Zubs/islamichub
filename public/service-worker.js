// The old app registered a worker at this address that serves its cached pages first.
// This one replaces it, clears what it stored and removes itself. Keep it here until
// a real worker is served from the same address.

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(retire())
})

async function retire() {
  const cacheNames = await caches.keys()
  await Promise.all(cacheNames.map((name) => caches.delete(name)))
  await self.registration.unregister()

  const windows = await self.clients.matchAll({ type: 'window' })
  await Promise.allSettled(windows.map((client) => client.navigate(client.url)))
}

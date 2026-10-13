import { describe, it, expect, vi } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const PUBLISHED_FILES = [
  'apple-touch-icon.png',
  'favicon.ico',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'llms.txt',
  'og-image.png',
  'robots.txt',
  'sitemap.xml',
  'sw-legacy.js',
  'sw-notifications.js',
]
const OLD_APP_CACHE = 'islamichub-shell-v2'

function read(path) {
  return readFileSync(resolve(ROOT, path), 'utf8')
}

function sourceFiles(folder) {
  const entries = readdirSync(resolve(ROOT, folder), { withFileTypes: true })
  return entries
    .filter((entry) => !entry.name.startsWith('.'))
    .flatMap((entry) => {
      const path = join(folder, entry.name)
      return entry.isDirectory() ? sourceFiles(path) : [path]
    })
}

function runWorker({ cacheNames = [], windows = [] } = {}) {
  const listeners = {}
  const held = new Set(cacheNames)
  const caches = {
    has: vi.fn(async (name) => held.has(name)),
    delete: vi.fn(async (name) => held.delete(name)),
  }
  const self = {
    addEventListener: (type, listener) => {
      listeners[type] = listener
    },
    skipWaiting: vi.fn(async () => {}),
    registration: { unregister: vi.fn(async () => true) },
    clients: { matchAll: vi.fn(async () => windows) },
  }

  new Function('self', 'caches', read('public/sw-legacy.js'))(self, caches)

  async function dispatch(type) {
    let finished
    listeners[type]({
      waitUntil: (promise) => {
        finished = promise
      },
    })
    await finished
  }

  return { listeners, caches, self, held, dispatch }
}

function openWindow(url, navigate = vi.fn(async () => null)) {
  return { url, navigate }
}

describe("clean-up of the old app's worker", () => {
  it('takes over at once when the old cache is on the device', async () => {
    const { self, dispatch } = runWorker({ cacheNames: [OLD_APP_CACHE] })

    await dispatch('install')

    expect(self.skipWaiting).toHaveBeenCalledOnce()
  })

  it('waits its turn when there is no old cache', async () => {
    const { self, dispatch } = runWorker({
      cacheNames: ['workbox-precache-v2-https://islamichub.xyz/'],
    })

    await dispatch('install')

    expect(self.skipWaiting).not.toHaveBeenCalled()
  })

  it('deletes nothing and reloads nothing when there is no old cache', async () => {
    const windows = [openWindow('https://islamichub.xyz/')]
    const { caches, dispatch } = runWorker({ cacheNames: ['islamichub-fonts'], windows })

    await dispatch('activate')

    expect(caches.delete).not.toHaveBeenCalled()
    expect(windows[0].navigate).not.toHaveBeenCalled()
  })

  it('deletes the old cache, leaves the others, and reloads every open window', async () => {
    const windows = [
      openWindow('https://islamichub.xyz/'),
      openWindow('https://islamichub.xyz/prayer'),
    ]
    const { caches, held, dispatch } = runWorker({
      cacheNames: [OLD_APP_CACHE, 'islamichub-fonts', 'islamichub-hadith'],
      windows,
    })

    await dispatch('activate')

    expect(caches.delete).toHaveBeenCalledExactlyOnceWith(OLD_APP_CACHE)
    expect([...held]).toEqual(['islamichub-fonts', 'islamichub-hadith'])
    for (const client of windows) {
      expect(client.navigate).toHaveBeenCalledExactlyOnceWith(client.url)
    }
  })

  it('still deletes the old cache and reloads the rest when one window refuses to reload', async () => {
    const refused = openWindow(
      'https://islamichub.xyz/',
      vi.fn(async () => {
        throw new TypeError("This service worker is not the client's active service worker.")
      }),
    )
    const other = openWindow('https://islamichub.xyz/zakat')
    const { held, dispatch } = runWorker({
      cacheNames: [OLD_APP_CACHE],
      windows: [refused, other],
    })

    await expect(dispatch('activate')).resolves.toBeUndefined()

    expect(held.has(OLD_APP_CACHE)).toBe(false)
    expect(other.navigate).toHaveBeenCalledOnce()
  })

  it('never unregisters the worker and never answers a request itself', async () => {
    const { listeners, self, dispatch } = runWorker({ cacheNames: [OLD_APP_CACHE] })

    await dispatch('install')
    await dispatch('activate')

    expect(self.registration.unregister).not.toHaveBeenCalled()
    expect(Object.keys(listeners).sort()).toEqual(['activate', 'install'])
  })

  it("does not reuse the old app's cache name in the site's worker", () => {
    expect(read('vite.config.js')).not.toContain(OLD_APP_CACHE)
  })
})

describe('old app leftovers', () => {
  it.each(['_redirects', 'service-worker.js'])('has no %s at the root', (file) => {
    expect(existsSync(resolve(ROOT, file))).toBe(false)
  })

  it('publishes only the files the app uses', () => {
    expect(
      sourceFiles('public')
        .map((path) => path.replace('public/', ''))
        .sort(),
    ).toEqual(PUBLISHED_FILES)
  })

  it("links the built manifest, not the old app's", () => {
    expect(read('index.html')).toMatch(/rel="manifest" href="\/manifest\.webmanifest"/)
    expect(read('index.html')).not.toContain('site.webmanifest')
  })

  it("does not use the repository's old name in the site", () => {
    const offenders = sourceFiles('src').filter((path) => /pillarsofislam/i.test(read(path)))

    expect(offenders).toEqual([])
  })
})

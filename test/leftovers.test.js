import { describe, it, expect, vi } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const PUBLISHED_FILES = [
  'favicon.ico',
  'favicon.svg',
  'robots.txt',
  'service-worker.js',
  'sitemap.xml',
]

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
  const caches = {
    keys: vi.fn(async () => cacheNames),
    delete: vi.fn(async () => true),
  }
  const self = {
    addEventListener: (type, listener) => {
      listeners[type] = listener
    },
    skipWaiting: vi.fn(),
    registration: { unregister: vi.fn(async () => true) },
    clients: { matchAll: vi.fn(async () => windows) },
  }

  new Function('self', 'caches', read('public/service-worker.js'))(self, caches)

  async function activate() {
    let finished
    listeners.activate({
      waitUntil: (promise) => {
        finished = promise
      },
    })
    await finished
  }

  return { listeners, caches, self, activate }
}

function openWindow(url, navigate = vi.fn(async () => null)) {
  return { url, navigate }
}

describe('replacement service worker', () => {
  it('takes over at once when installed', () => {
    const { listeners, self } = runWorker()

    listeners.install()

    expect(self.skipWaiting).toHaveBeenCalledOnce()
  })

  it('unregisters when there are no caches and no open windows', async () => {
    const { caches, self, activate } = runWorker()

    await activate()

    expect(caches.delete).not.toHaveBeenCalled()
    expect(self.registration.unregister).toHaveBeenCalledOnce()
  })

  it('deletes the one cache the old worker left', async () => {
    const { caches, activate } = runWorker({ cacheNames: ['islamichub-shell-v2'] })

    await activate()

    expect(caches.delete).toHaveBeenCalledExactlyOnceWith('islamichub-shell-v2')
  })

  it('deletes every cache when there are several', async () => {
    const cacheNames = ['islamichub-shell-v1', 'islamichub-shell-v2', 'something-else']
    const { caches, activate } = runWorker({ cacheNames })

    await activate()

    expect(caches.delete.mock.calls.map(([name]) => name)).toEqual(cacheNames)
  })

  it('reloads every open window', async () => {
    const windows = [
      openWindow('https://islamichub.xyz/'),
      openWindow('https://islamichub.xyz/prayer'),
    ]
    const { activate } = runWorker({ windows })

    await activate()

    for (const client of windows) {
      expect(client.navigate).toHaveBeenCalledExactlyOnceWith(client.url)
    }
  })

  it('still cleans up and reloads the rest when one window refuses to reload', async () => {
    const refused = openWindow(
      'https://islamichub.xyz/',
      vi.fn(async () => {
        throw new TypeError("This service worker is not the client's active service worker.")
      }),
    )
    const other = openWindow('https://islamichub.xyz/zakat')
    const { caches, self, activate } = runWorker({
      cacheNames: ['islamichub-shell-v2'],
      windows: [refused, other],
    })

    await expect(activate()).resolves.toBeUndefined()

    expect(caches.delete).toHaveBeenCalledOnce()
    expect(self.registration.unregister).toHaveBeenCalledOnce()
    expect(other.navigate).toHaveBeenCalledOnce()
  })

  it('never answers a request itself', () => {
    const { listeners } = runWorker()

    expect(Object.keys(listeners).sort()).toEqual(['activate', 'install'])
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

  it('does not link a web manifest', () => {
    expect(read('index.html')).not.toMatch(/rel="manifest"/)
  })

  it("does not use the repository's old name in the site", () => {
    const offenders = sourceFiles('src').filter((path) => /pillarsofislam/i.test(read(path)))

    expect(offenders).toEqual([])
  })
})

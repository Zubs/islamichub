import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  fetchBooks,
  fetchChapters,
  fetchHadiths,
  loadErrorMessage,
  NOT_CONFIGURED_MESSAGE,
  OFFLINE_MESSAGE,
} from './useHadithApi.js'

function json(body, status = 200) {
  return { ok: status < 400, status, json: async () => body }
}

function stubFetch(answer) {
  const fetch = vi.fn(answer)
  vi.stubGlobal('fetch', fetch)
  return fetch
}

function stubCache(entries) {
  const keys = Object.keys(entries).map((url) => ({ url }))
  vi.stubGlobal('caches', {
    open: vi.fn(async () => ({
      keys: async () => keys,
      match: async (request) => ({ json: async () => entries[request.url] }),
    })),
  })
}

describe('useHadithApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('asks the proxy for books, chapters and hadiths, with no key', async () => {
    const fetch = stubFetch(async () => json({}))

    await fetchBooks()
    await fetchChapters('sahih-bukhari')
    await fetchHadiths({ book: 'sahih-bukhari', chapter: 3, page: 2 })

    expect(fetch.mock.calls.map(([address]) => address)).toEqual([
      '/api/hadith/books',
      '/api/hadith/sahih-bukhari/chapters',
      '/api/hadith/hadiths?paginate=25&book=sahih-bukhari&chapter=3&page=2',
    ])
    expect(fetch.mock.calls.flat().join(' ')).not.toMatch(/apiKey|hadithapi\.com/)
  })

  it('marks a "not configured" reply so the library can show its notice', async () => {
    stubFetch(async () => json({ error: 'not_configured' }, 503))

    const error = await fetchBooks().catch((caught) => caught)

    expect(error.notConfigured).toBe(true)
    expect(loadErrorMessage(error)).toBe(NOT_CONFIGURED_MESSAGE)
  })

  it('raises an ordinary error when the proxy reports hadithapi.com is down', async () => {
    stubFetch(async () => json({ error: 'upstream_error' }, 502))

    const error = await fetchBooks().catch((caught) => caught)

    expect(error.notConfigured).toBe(false)
    expect(loadErrorMessage(error)).toContain('could not be loaded (502)')
  })

  it('says the page is not saved when offline', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)

    expect(loadErrorMessage(new TypeError('Failed to fetch'))).toBe(OFFLINE_MESSAGE)
  })

  it('opens a chapter stored before the move to the proxy when the request fails', async () => {
    const stored = { hadiths: { data: [{ id: 7 }] } }
    stubFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    stubCache({
      'https://hadithapi.com/api/hadiths?apiKey=old&paginate=25&book=sahih-bukhari&chapter=3&page=1':
        stored,
      'https://hadithapi.com/api/hadiths?apiKey=old&paginate=25&book=sahih-bukhari&chapter=4&page=1':
        { hadiths: { data: [] } },
    })

    const data = await fetchHadiths({ book: 'sahih-bukhari', chapter: 3, page: 1 })

    expect(data).toEqual(stored)
  })

  it('fails as before when nothing was stored for that page', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    stubCache({
      'https://hadithapi.com/api/hadiths?apiKey=old&paginate=25&book=sahih-bukhari&chapter=4&page=1':
        {},
    })

    await expect(fetchHadiths({ book: 'sahih-bukhari', chapter: 3, page: 1 })).rejects.toThrow(
      'Failed to fetch',
    )
  })

  it('fails as before in a browser with no cache storage', async () => {
    stubFetch(async () => {
      throw new TypeError('Failed to fetch')
    })

    await expect(fetchBooks()).rejects.toThrow('Failed to fetch')
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { handleHadithRequest } from '../netlify/functions/hadith.js'

const KEY = 'secret-key-9f3a'
const CHAPTERS = { status: 200, chapters: [{ chapterNumber: '1', chapterEnglish: 'Revelation' }] }

function get(path, init) {
  return new Request(`https://islamichub.xyz${path}`, init)
}

function answering(body, status = 200) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status }))
}

async function call(path, { key = KEY, fetch = answering(CHAPTERS), init } = {}) {
  const response = await handleHadithRequest(get(path, init), { key, fetch })
  const text = await response.text()
  return { response, text, body: JSON.parse(text), fetch }
}

describe('hadith proxy', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('says it is not configured when no key is set on the server', async () => {
    const { response, body, fetch } = await call('/api/hadith/books', { key: '' })

    expect(response.status).toBe(503)
    expect(body).toEqual({ error: 'not_configured' })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('forwards the list of books with the key added on the server', async () => {
    const { response, fetch } = await call('/api/hadith/books')

    const target = new URL(fetch.mock.calls[0][0])
    expect(response.status).toBe(200)
    expect(target.origin + target.pathname).toBe('https://hadithapi.com/api/books')
    expect(target.searchParams.get('apiKey')).toBe(KEY)
  })

  it("returns one book's chapters exactly as hadithapi.com gave them", async () => {
    const { body, fetch } = await call('/api/hadith/sahih-bukhari/chapters')

    expect(new URL(fetch.mock.calls[0][0]).pathname).toBe('/api/sahih-bukhari/chapters')
    expect(body).toEqual(CHAPTERS)
  })

  it('forwards a second page of hadiths with its parameters', async () => {
    const { fetch } = await call(
      '/api/hadith/hadiths?book=sahih-bukhari&chapter=3&paginate=25&page=2',
    )

    const params = new URL(fetch.mock.calls[0][0]).searchParams
    expect(Object.fromEntries(params)).toEqual({
      book: 'sahih-bukhari',
      chapter: '3',
      paginate: '25',
      page: '2',
      apiKey: KEY,
    })
  })

  it('reads the path when Netlify passes the function address', async () => {
    const { response, fetch } = await call('/.netlify/functions/hadith/sahih-muslim/chapters')

    expect(response.status).toBe(200)
    expect(new URL(fetch.mock.calls[0][0]).pathname).toBe('/api/sahih-muslim/chapters')
  })

  it('marks a successful reply as cacheable for a day', async () => {
    const { response } = await call('/api/hadith/books')

    expect(response.headers.get('Cache-Control')).toBe('public, max-age=86400')
    expect(response.headers.get('Netlify-CDN-Cache-Control')).toContain('max-age=86400')
  })

  it.each([
    '/api/hadith/',
    '/api/hadith/users',
    '/api/hadith/sahih-bukhari',
    '/api/hadith/sahih-bukhari/chapters/extra',
    '/api/hadith/Sahih_Bukhari/chapters',
    '/api/hadith/../admin/chapters',
  ])('rejects the path %s without calling hadithapi.com', async (path) => {
    const { response, fetch } = await call(path)

    expect(response.status).toBe(404)
    expect(fetch).not.toHaveBeenCalled()
  })

  it.each([
    '/api/hadith/hadiths?apiKey=other',
    '/api/hadith/hadiths?book=sahih-bukhari&hadithEnglish=prayer',
    '/api/hadith/hadiths?book=sahih-bukhari&page=two',
    '/api/hadith/hadiths?book=sahih-bukhari&paginate=5000',
    '/api/hadith/hadiths?book=a&book=b',
    '/api/hadith/books?page=2',
    '/api/hadith/sahih-bukhari/chapters?paginate=10',
  ])('rejects %s without calling hadithapi.com', async (path) => {
    const { response, fetch } = await call(path)

    expect(response.status).toBe(400)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('rejects anything but a GET', async () => {
    const { response, fetch } = await call('/api/hadith/books', { init: { method: 'POST' } })

    expect(response.status).toBe(405)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('answers with an error, not stored and without the key, when hadithapi.com fails', async () => {
    const upstream = vi.fn(
      async () => new Response(`Invalid request for apiKey=${KEY}`, { status: 500 }),
    )
    const { response, text } = await call('/api/hadith/books', { fetch: upstream })

    expect(response.status).toBe(502)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(text).not.toContain(KEY)
  })

  it('answers with an error without the key when the connection fails', async () => {
    const upstream = vi.fn(async (target) => {
      throw new TypeError(`fetch failed: ${target}`)
    })
    const { response, text } = await call('/api/hadith/books', { fetch: upstream })

    expect(response.status).toBe(502)
    expect(text).not.toContain(KEY)
  })

  it('gives up within ten seconds when hadithapi.com does not answer', async () => {
    vi.useFakeTimers()
    const upstream = vi.fn(
      (target, { signal }) =>
        new Promise((resolvePromise, reject) => {
          signal.addEventListener('abort', () => reject(signal.reason))
        }),
    )

    const pending = handleHadithRequest(get('/api/hadith/books'), { key: KEY, fetch: upstream })
    await vi.advanceTimersByTimeAsync(9999)
    const response = await pending

    expect(upstream).toHaveBeenCalledOnce()

    expect(response.status).toBe(504)
    expect(await response.text()).not.toContain(KEY)
  })
})

describe('hosting configuration for the proxy', () => {
  const config = readFileSync(resolve(process.cwd(), 'netlify.toml'), 'utf8')

  it('sends /api/hadith/* to the function before the catch-all page rule', () => {
    const proxyRule = config.indexOf('from = "/api/hadith/*"')
    const pageRule = config.indexOf('from = "/*"')

    expect(proxyRule).toBeGreaterThan(-1)
    expect(proxyRule).toBeLessThan(pageRule)
    expect(config).toContain('to = "/.netlify/functions/hadith/:splat"')
  })

  it('no longer lets the browser connect to hadithapi.com', () => {
    const policy = config.match(/Content-Security-Policy = "(.*)"/)[1]

    expect(policy).not.toContain('hadithapi.com')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import linkPreview, { previewFor, withPreview } from '../netlify/edge-functions/link-preview.js'

const PAGE = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')

function served(body = PAGE, type = 'text/html; charset=utf-8') {
  return { next: vi.fn(async () => new Response(body, { headers: { 'content-type': type } })) }
}

function tag(html, property) {
  return html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`))?.[1]
}

describe('previewFor', () => {
  it("uses a hadith's reference as its title", () => {
    expect(previewFor('/hadith/books/sahih-bukhari/hadith/1904')).toEqual({
      title: 'Sahih Al-Bukhari 1904',
      description:
        'Hadith 1904 of Sahih Al-Bukhari, with its Arabic text, translation, grade and chapter.',
    })
  })

  it('describes a dua situation and an adhkar category', () => {
    expect(previewFor('/duas/travel').title).toBe('Duas for Travel')
    expect(previewFor('/duas/travel/').description).toContain('6 supplications')
    expect(previewFor('/adhkar/morning').title).toBe('Morning Adhkar')
  })

  it.each([
    '/hadith/books/no-such-book/hadith/1',
    '/hadith/books/sahih-bukhari/hadith/abc',
    '/hadith/books/sahih-bukhari/hadith/0',
    '/hadith/books/sahih-bukhari/3',
    '/hadith/books/sahih-bukhari',
    '/duas/no-such-situation',
    '/adhkar/no-such-category',
    '/duas',
    '/',
  ])('gives nothing of its own for %s', (path) => {
    expect(previewFor(path)).toBeNull()
  })
})

describe('withPreview', () => {
  const preview = previewFor('/hadith/books/sahih-bukhari/hadith/1904')
  const address = 'https://islamichub.xyz/hadith/books/sahih-bukhari/hadith/1904'
  const html = withPreview(PAGE, preview, address)

  it('sets the title, description, address and the site preview image', () => {
    expect(html).toContain('<title>Sahih Al-Bukhari 1904 | IslamicHub</title>')
    expect(tag(html, 'og:title')).toBe('Sahih Al-Bukhari 1904 | IslamicHub')
    expect(tag(html, 'og:description')).toContain('Hadith 1904 of Sahih Al-Bukhari')
    expect(tag(html, 'og:url')).toBe(address)
    expect(tag(html, 'og:image')).toBe('https://islamichub.xyz/og-image.png')
  })

  it('leaves exactly one title, description and preview image, and the app intact', () => {
    expect(html.match(/<title>/g)).toHaveLength(1)
    expect(html.match(/<meta name="description"/g)).toHaveLength(1)
    expect(html.match(/property="og:image"/g)).toHaveLength(1)
    expect(html.match(/name="twitter:card"/g)).toHaveLength(1)
    expect(html).toContain('<div id="app"></div>')
    expect(html).toContain('src="/src/main.js"')
  })

  it('escapes what it writes into the page', () => {
    const risky = withPreview(PAGE, { title: 'A "quoted" <b>title</b>', description: 'x & y' }, address)

    expect(risky).toContain('A &quot;quoted&quot; &lt;b&gt;title&lt;/b&gt;')
    expect(risky).not.toContain('<b>title</b>')
    expect(risky).toContain('x &amp; y')
  })
})

describe('link preview function', () => {
  it('gives a hadith link its reference as title and the site preview image', async () => {
    const response = await linkPreview(
      new Request('https://islamichub.xyz/hadith/books/sahih-muslim/hadith/2704?src=whatsapp'),
      served(),
    )
    const html = await response.text()

    expect(tag(html, 'og:title')).toBe('Sahih Muslim 2704 | IslamicHub')
    expect(tag(html, 'og:url')).toBe('https://islamichub.xyz/hadith/books/sahih-muslim/hadith/2704')
    expect(tag(html, 'og:image')).toBe('https://islamichub.xyz/og-image.png')
    expect(response.headers.get('content-type')).toContain('text/html')
  })

  it("gives an unknown hadith the site's default preview, not an error", async () => {
    const response = await linkPreview(
      new Request('https://islamichub.xyz/hadith/books/no-such-book/hadith/9'),
      served(),
    )
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(html).toBe(PAGE)
    expect(tag(html, 'og:image')).toBe('https://islamichub.xyz/og-image.png')
    expect(html).toContain('<title>IslamicHub')
  })

  it('leaves anything that is not a page untouched', async () => {
    const context = served('{"ok":true}', 'application/json')

    const response = await linkPreview(new Request('https://islamichub.xyz/duas/travel'), context)

    expect(await response.text()).toBe('{"ok":true}')
  })
})

describe('hosting configuration for link previews', () => {
  const config = readFileSync(resolve(process.cwd(), 'netlify.toml'), 'utf8')

  it('runs the function on hadith, dua and adhkar addresses', () => {
    for (const path of ['/hadith/books/*', '/duas/*', '/adhkar/*']) {
      expect(config).toContain(`function = "link-preview"\npath = "${path}"`)
    }
  })

  it('publishes the preview image the pages name', () => {
    const image = readFileSync(resolve(process.cwd(), 'public/og-image.png'))

    expect(image.subarray(1, 4).toString()).toBe('PNG')
    expect(image.readUInt32BE(16)).toBe(1200)
    expect(image.readUInt32BE(20)).toBe(630)
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import HadithView from './HadithView.vue'
import HadithChapterView from './HadithChapterView.vue'
import { gradeStyle } from '@/utils/hadith.js'
import { mountPage, headOf } from '../../../test/mountPage.js'

const FIRST = {
  id: 1,
  hadithNumber: '1',
  englishNarrator: "Narrated 'Umar bin Al-Khattab:",
  hadithEnglish: 'The reward of deeds depends upon the intentions.',
  hadithArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
  status: 'Sahih',
  bookSlug: 'sahih-bukhari',
  chapter: { chapterNumber: '1', chapterEnglish: 'Revelation' },
}

function replyWith(...hadiths) {
  return {
    ok: true,
    status: 200,
    json: async () => ({ hadiths: { data: hadiths, total: hadiths.length } }),
  }
}

function stubFetch(answer) {
  const fetch = vi.fn(answer)
  vi.stubGlobal('fetch', fetch)
  return fetch
}

async function open(path) {
  const mounted = await mountPage(HadithView, { path })
  await flushPromises()
  return mounted
}

function link(wrapper, text) {
  return wrapper.findAll('a').find((candidate) => candidate.text().includes(text))
}

function button(wrapper, text) {
  return wrapper.findAll('button').find((candidate) => candidate.text().includes(text))
}

describe('single hadith page', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    delete navigator.share
    delete navigator.clipboard
  })

  it('shows the first hadith of Sahih al-Bukhari with its texts, narrator, grade, book and chapter', async () => {
    const fetch = stubFetch(async () => replyWith(FIRST))

    const { wrapper, head } = await open('/hadith/books/sahih-bukhari/hadith/1')

    expect(fetch.mock.calls[0][0]).toBe(
      '/api/hadith/hadiths?book=sahih-bukhari&hadithNumber=1&paginate=1',
    )
    expect(wrapper.find('.hv-arabic').text()).toBe(FIRST.hadithArabic)
    expect(wrapper.find('.hv-arabic').attributes()).toMatchObject({ lang: 'ar', dir: 'rtl' })
    expect(wrapper.find('.hv-text').text()).toBe(FIRST.hadithEnglish)
    expect(wrapper.find('.hv-narrator').text()).toContain('Umar')
    expect(wrapper.find('.hv-status').text()).toBe('Sahih')
    expect(wrapper.find('.hv-ref').text()).toContain('Sahih Al-Bukhari, Hadith 1')
    expect(wrapper.find('.hv-ref').text()).toContain('Revelation')

    const seo = await headOf(head)
    expect(seo.title).toBe('Sahih Al-Bukhari 1 — Revelation | IslamicHub')
    expect(seo.descriptions).toEqual([FIRST.hadithEnglish])
    expect(seo.canonicals).toEqual(['https://islamichub.xyz/hadith/books/sahih-bukhari/hadith/1'])
    expect(seo.robots).toEqual([])
  })

  it('still shows the English text of a hadith with no Arabic text or narrator', async () => {
    stubFetch(async () => replyWith({ ...FIRST, hadithArabic: '', englishNarrator: null }))

    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')

    expect(wrapper.find('.hv-arabic').exists()).toBe(false)
    expect(wrapper.find('.hv-narrator').exists()).toBe(false)
    expect(wrapper.find('.hv-text').text()).toBe(FIRST.hadithEnglish)
  })

  it('has no previous link on the first hadith and no next link on the last', async () => {
    stubFetch(async (address) =>
      replyWith({
        ...FIRST,
        hadithNumber: new URL(address, 'https://x').searchParams.get('hadithNumber'),
      }),
    )

    const first = await open('/hadith/books/sahih-bukhari/hadith/1')
    expect(link(first.wrapper, '←')).toBeUndefined()
    expect(link(first.wrapper, 'Hadith 2 →').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/hadith/2',
    )
    first.wrapper.unmount()

    const last = await open('/hadith/books/sahih-bukhari/hadith/7563')
    expect(link(last.wrapper, '→')).toBeUndefined()
    expect(link(last.wrapper, '← Hadith 7562').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/hadith/7562',
    )
  })

  it('links back to the chapter the hadith belongs to', async () => {
    stubFetch(async () =>
      replyWith({
        ...FIRST,
        hadithNumber: '1904',
        chapter: { chapterNumber: '30', chapterEnglish: 'Fasting' },
      }),
    )

    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1904')

    expect(link(wrapper, 'Back to chapter').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/30',
    )
    expect(link(wrapper, 'Chapter 30').attributes('href')).toBe('/hadith/books/sahih-bukhari/30')
  })

  it('uses the same grade badge as the chapter list', async () => {
    stubFetch(async () => replyWith({ ...FIRST, status: 'Hasan' }))
    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')
    const single = wrapper.find('.hv-status')
    wrapper.unmount()

    const list = await mountPage(HadithChapterView, { path: '/hadith/books/sahih-bukhari/1' })
    await flushPromises()
    const inList = list.wrapper.find('.hc-status')

    expect(single.text()).toBe(inList.text())
    expect(single.attributes('style')).toBe(inList.attributes('style'))
    expect(gradeStyle('Hasan').color).toBe('#7A5A10')
  })

  it('opens from a chapter list, and the back link returns to that chapter', async () => {
    stubFetch(async () => replyWith(FIRST))
    const list = await mountPage(HadithChapterView, { path: '/hadith/books/sahih-bukhari/1' })
    await flushPromises()

    expect(list.wrapper.find('.hc-number-link').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/hadith/1',
    )
    list.wrapper.unmount()

    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')
    expect(link(wrapper, 'Back to chapter').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/1',
    )
  })

  it('copies the same text the chapter list copies', async () => {
    const writeText = vi.fn(async () => {})
    navigator.clipboard = { writeText }
    stubFetch(async () => replyWith(FIRST))
    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')

    await button(wrapper, 'Copy').trigger('click')
    await flushPromises()
    const fromPage = writeText.mock.calls[0][0]
    wrapper.unmount()

    const list = await mountPage(HadithChapterView, { path: '/hadith/books/sahih-bukhari/1' })
    await flushPromises()
    await list.wrapper.find('.hc-copy-btn').trigger('click')

    expect(fromPage).toBe(`${FIRST.hadithEnglish}\n\n— Sahih Al-Bukhari, Hadith 1`)
    expect(writeText.mock.calls[1][0]).toBe(fromPage)
  })

  it("shares the hadith's own address, tagged, with its text", async () => {
    navigator.share = vi.fn(async () => {})
    stubFetch(async () => replyWith(FIRST))
    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')

    await button(wrapper, 'Share').trigger('click')
    await flushPromises()

    const shared = navigator.share.mock.calls[0][0]
    expect(shared.title).toBe('Sahih Al-Bukhari 1')
    expect(shared.text).toContain(FIRST.hadithArabic)
    expect(shared.text).toContain(FIRST.hadithEnglish)
    expect(shared.text).toContain(
      'https://islamichub.xyz/hadith/books/sahih-bukhari/hadith/1?src=whatsapp',
    )
  })

  it('does nothing and shows no error when the share sheet is cancelled', async () => {
    navigator.share = vi.fn(async () => {
      throw new DOMException('Share canceled', 'AbortError')
    })
    stubFetch(async () => replyWith(FIRST))
    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')

    await button(wrapper, 'Share').trigger('click')
    await flushPromises()

    expect(wrapper.find('.share-panel').exists()).toBe(false)
    expect(wrapper.find('.had-error').exists()).toBe(false)
  })

  it('offers a WhatsApp link and the address to copy where the browser cannot share', async () => {
    const writeText = vi.fn(async () => {})
    navigator.clipboard = { writeText }
    stubFetch(async () => replyWith(FIRST))
    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')

    await button(wrapper, 'Share').trigger('click')
    await flushPromises()

    const whatsapp = wrapper.find('.share-panel a[href^="https://wa.me/"]')
    expect(decodeURIComponent(whatsapp.attributes('href'))).toContain(FIRST.hadithEnglish)
    await button(wrapper, 'Copy link').trigger('click')
    expect(writeText).toHaveBeenCalledExactlyOnceWith(
      'https://islamichub.xyz/hadith/books/sahih-bukhari/hadith/1?src=whatsapp',
    )
  })

  it.each([
    '/hadith/books/no-such-book/hadith/1',
    '/hadith/books/sahih-bukhari/hadith/abc',
    '/hadith/books/sahih-bukhari/hadith/0',
    '/hadith/books/sahih-bukhari/hadith/1.5',
  ])('shows "hadith not found" for %s without asking the server', async (path) => {
    const fetch = stubFetch(async () => replyWith(FIRST))

    const { wrapper, head } = await open(path)

    expect(wrapper.find('h1').text()).toBe('Hadith not found')
    expect(wrapper.find('.hv-card').exists()).toBe(false)
    expect(fetch).not.toHaveBeenCalled()
    expect((await headOf(head)).robots).toEqual(['noindex'])
  })

  it('shows "hadith not found" for a number with no hadith', async () => {
    stubFetch(async () => replyWith())

    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/999999')

    expect(wrapper.find('h1').text()).toBe('Hadith not found')
    expect(wrapper.find('.hv-missing').text()).toContain('Browse Sahih Al-Bukhari')
  })

  it('shows an error with a retry button when the request fails, and loads on retry', async () => {
    const fetch = stubFetch(async () => ({ ok: false, status: 502, json: async () => ({}) }))
    const { wrapper } = await open('/hadith/books/sahih-bukhari/hadith/1')

    expect(wrapper.find('.had-error').text()).toContain('Could not load this hadith')
    expect(wrapper.find('h1').text()).toBe('Hadith 1')

    fetch.mockImplementation(async () => replyWith(FIRST))
    await button(wrapper, 'Try again').trigger('click')
    await flushPromises()

    expect(wrapper.find('.had-error').exists()).toBe(false)
    expect(wrapper.find('.hv-text').text()).toBe(FIRST.hadithEnglish)
  })

  it('wraps long text so the page does not scroll sideways on a narrow screen', async () => {
    const source = (await import('./HadithView.vue?raw')).default

    expect(source.match(/overflow-wrap: anywhere/g)).toHaveLength(2)
    expect(source).not.toMatch(/white-space: nowrap|min-width: \d{3,}px/)
  })
})

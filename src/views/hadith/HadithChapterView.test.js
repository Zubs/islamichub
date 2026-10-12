import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import HadithChapterView from './HadithChapterView.vue'
import { mountPage, headOf } from '../../../test/mountPage.js'

describe('Hadith chapter page title', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows a holding title while loading and the chapter name once loaded', async () => {
    let answer
    vi.stubGlobal(
      'fetch',
      vi.fn((url) =>
        String(url).includes('hadiths')
          ? new Promise((resolve) => {
              answer = resolve
            })
          : Promise.resolve({ ok: true, json: async () => ({ chapters: [] }) }),
      ),
    )
    const { head } = await mountPage(HadithChapterView, { path: '/hadith/books/sahih-bukhari/3' })
    await flushPromises()

    expect((await headOf(head)).title).toBe('Chapter 3 — Sahih Al-Bukhari | IslamicHub')

    answer({
      ok: true,
      json: async () => ({
        hadiths: {
          data: [{ id: 1, hadithNumber: '59', chapter: { chapterEnglish: 'Knowledge' } }],
          total: 1,
          current_page: 1,
          last_page: 1,
        },
      }),
    })
    await flushPromises()

    const seo = await headOf(head)
    expect(seo.title).toBe('Knowledge — Sahih Al-Bukhari | IslamicHub')
    expect(seo.canonicals).toEqual(['https://islamichub.xyz/hadith/books/sahih-bukhari/3'])
  })
})

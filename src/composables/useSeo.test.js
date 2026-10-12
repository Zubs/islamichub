import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useSeo, canonicalFor } from './useSeo.js'
import { mountPage, headOf } from '../../test/mountPage.js'
import App from '@/App.vue'

function page(seo) {
  return {
    setup() {
      useSeo(seo)
      return () => null
    },
  }
}

const HOME_TITLE =
  'IslamicHub — Islamic Education, Prayer Times, Zakat Calculator & Five Pillars Guide'

describe('canonicalFor', () => {
  it.each([
    ['/', 'https://islamichub.xyz/'],
    ['/faith/articles', 'https://islamichub.xyz/faith/articles'],
    ['/hadith/books', 'https://islamichub.xyz/hadith/books'],
    ['/prayer/', 'https://islamichub.xyz/prayer'],
  ])('%s gives %s', (path, canonical) => {
    expect(canonicalFor(path)).toBe(canonical)
  })
})

describe('useSeo', () => {
  it('gives a page with no values the site defaults', async () => {
    const { head } = await mountPage(page(), { path: '/tasbih' })
    const seo = await headOf(head)

    expect(seo.title).toBe(HOME_TITLE)
    expect(seo.descriptions).toHaveLength(1)
    expect(seo.descriptions[0]).toContain('Free Islamic learning platform')
  })

  it('gives an unknown page key the site defaults', async () => {
    const { head } = await mountPage(page('no-such-page'), { path: '/tasbih' })

    expect((await headOf(head)).title).toBe(HOME_TITLE)
  })

  it('builds the canonical link from the path, not the page key', async () => {
    const { head } = await mountPage(page('hadith-books'), { path: '/hadith/books' })
    const seo = await headOf(head)

    expect(seo.canonicals).toEqual(['https://islamichub.xyz/hadith/books'])
    expect(seo.property('og:url')).toBe('https://islamichub.xyz/hadith/books')
    expect(seo.title).toBe('Hadith Library — All Collections | IslamicHub')
  })

  it('leaves the query string out of the canonical link', async () => {
    const { head } = await mountPage(page('zakat'), { path: '/zakat?src=wa#faq' })

    expect((await headOf(head)).canonicals).toEqual(['https://islamichub.xyz/zakat'])
  })

  it('shows a holding title until the real one arrives', async () => {
    const loaded = ref('')
    const { head } = await mountPage(page({ title: () => loaded.value || 'Chapter 3' }), {
      path: '/hadith/books/sahih-bukhari/3',
    })
    expect((await headOf(head)).title).toBe('Chapter 3')

    loaded.value = 'Knowledge'
    await nextTick()

    expect((await headOf(head)).title).toBe('Knowledge')
  })

  it('accepts refs and plain values, and mirrors them to the social tags', async () => {
    const { head } = await mountPage(
      page({ title: ref('A title'), description: 'A description' }),
      {
        path: '/about',
      },
    )
    const seo = await headOf(head)

    expect(seo.title).toBe('A title')
    expect(seo.descriptions).toEqual(['A description'])
    expect(seo.property('og:title')).toBe('A title')
    expect(seo.property('og:description')).toBe('A description')
  })

  it('marks a page that asks for it as not to be indexed', async () => {
    const { head } = await mountPage(page('not-found'), { path: '/nowhere' })

    expect((await headOf(head)).robots).toEqual(['noindex'])
  })

  it('does not mark other pages', async () => {
    const { head } = await mountPage(page('about'), { path: '/about' })

    expect((await headOf(head)).robots).toEqual([])
  })
})

describe('every page', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  async function settled() {
    await vi.dynamicImportSettled()
    await new Promise((resolve) => setTimeout(resolve, 20))
  }

  const ADDRESSES = [
    '/',
    '/hadith',
    '/hadith/books',
    '/hadith/books/sahih-bukhari',
    '/hadith/books/sahih-bukhari/1',
    '/adhkar',
    '/adhkar/morning',
    '/tasbih',
    '/faith',
    '/faith/articles',
    '/prayer',
    '/zakat',
    '/fasting',
    '/hajj',
    '/inheritance',
    '/about',
    '/changelog',
    '/no-such-page',
  ]

  it.each(ADDRESSES)(
    '%s has one title, one description and a canonical link matching it',
    async (path) => {
      const { head, router } = await mountPage(App, { path })
      await router.isReady()
      await settled()
      const seo = await headOf(head)

      expect(seo.title).toBeTruthy()
      expect(seo.descriptions).toHaveLength(1)
      expect(seo.canonicals).toEqual([canonicalFor(path)])
      expect(seo.robots).toEqual(path === '/no-such-page' ? ['noindex'] : [])
    },
  )

  it('changes the title and canonical link when moving from home to an adhkar category', async () => {
    const { head, router } = await mountPage(App, { path: '/' })
    await settled()
    const home = await headOf(head)

    await router.push('/adhkar/morning')
    await settled()
    const category = await headOf(head)

    expect(home.title).toBe(HOME_TITLE)
    expect(category.title).toBe('Morning Adhkar | IslamicHub')
    expect(category.canonicals).toEqual(['https://islamichub.xyz/adhkar/morning'])
  })
})

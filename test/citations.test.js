import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import { routes } from '@/router/index.js'
import { ADHKAR_CATEGORIES } from '@/data/adhkar.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { HADITH_NUMBER_MAP } from '@/data/hadithNumbering.js'
import { mountPage } from './mountPage.js'

const PAGES = [
  ...routes.map((route) => route.path).filter((path) => !path.includes(':')),
  ...ADHKAR_CATEGORIES.map((category) => `/adhkar/${category.slug}`),
].filter((path) => path !== '/changelog')

function unlinkedCitations(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const found = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const inLink = node.parentElement.closest('a[href^="/hadith/books/"]')
    if (!inLink) {
      found.push(...hadithRefsIn(node.textContent).map((part) => part.text))
    }
  }

  return found
}

function linkedCitations(root) {
  return [...root.querySelectorAll('a.hadith-ref')].map((link) => [
    link.textContent,
    link.getAttribute('href'),
  ])
}

describe('hadith citations', () => {
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

  async function open(path) {
    const { wrapper } = await mountPage(App, { path })
    await vi.dynamicImportSettled()
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 20))
    return wrapper
  }

  it.each(PAGES)('leaves no citation as plain text on %s', async (path) => {
    const wrapper = await open(path)

    expect(unlinkedCitations(wrapper.element.parentElement ?? wrapper.element)).toEqual([])
  })

  it('links every reference of every held collection it finds', async () => {
    const seen = []
    for (const path of PAGES) {
      const wrapper = await open(path)
      seen.push(...linkedCitations(wrapper.element.parentElement ?? wrapper.element))
      wrapper.unmount()
    }

    expect(seen.length).toBeGreaterThan(45)
    for (const [text, href] of seen) {
      const [reference] = hadithRefsIn(text)
      expect(reference.text).toBe(text)
      expect(href).toBe(reference.to)
    }
  })

  it('gives every cited Sahih Muslim hadith a library number, as its two numberings differ', async () => {
    const cited = new Set()
    for (const path of PAGES) {
      const wrapper = await open(path)
      for (const [text] of linkedCitations(wrapper.element.parentElement ?? wrapper.element)) {
        const [reference] = hadithRefsIn(text)
        if (reference.book === 'sahih-muslim') {
          cited.add(reference.number)
        }
      }
      wrapper.unmount()
    }

    expect(cited.size).toBeGreaterThan(10)
    for (const number of cited) {
      expect(HADITH_NUMBER_MAP['sahih-muslim'][number], `Sahih Muslim ${number}`).toBeDefined()
    }
  })

  it('takes a reader of the Fasting page from "Sahih Bukhari 1904" to that hadith', async () => {
    const wrapper = await open('/fasting')
    const link = wrapper
      .findAll('a.hadith-ref')
      .find((candidate) => candidate.text() === 'Sahih Bukhari 1904')

    expect(link.attributes('href')).toBe('/hadith/books/sahih-bukhari/hadith/1904')
    const muslim = wrapper
      .findAll('a.hadith-ref')
      .find((candidate) => candidate.text() === 'Sahih Muslim 1151')
    expect(muslim.attributes('href')).toBe('/hadith/books/sahih-muslim/hadith/2704')
    expect(link.element.closest('.hadith-block.anim-target')).not.toBeNull()
  })
})

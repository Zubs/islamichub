import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import App from '@/App.vue'
import en from '@/locales/en.js'
import { LOCALES, REQUIRED_PAGES } from '@/locales/index.js'
import { addLocale, removeLocale, setLocale, availableLocales } from '@/i18n.js'
import { addTranslation, removeTranslations } from '@/composables/useContent.js'
import { useZakatStore } from '@/stores/zakat.js'
import { useAdhkarStore } from '@/stores/adhkar.js'
import { calcInheritance } from '@/utils/inheritance.js'
import { languageGaps, messageKeys } from '@/utils/locale.js'
import { missingContent } from '@/utils/content.js'
import { foldText, searchDuas } from '@/utils/duas.js'
import { mountPage } from './mountPage.js'

const ROOT = process.cwd()

// A stand-in translation: every English message, marked so it can be told from English.
function translated(messages, mark) {
  return Object.fromEntries(
    Object.entries(messages).map(([key, value]) => [
      key,
      typeof value === 'object' ? translated(value, mark) : `${mark}${value}`,
    ]),
  )
}

function translatedPage(source, mark, reviewer = 'A. Reviewer') {
  const page = { meta: { reviewer, reviewed: '2026-10-12' }, lists: {} }
  for (const [section, texts] of Object.entries(source)) {
    if (section === 'lists') {
      for (const [name, items] of Object.entries(texts)) {
        page.lists[name] = items.map(() => ({}))
      }
    } else {
      page[section] = Object.fromEntries(
        Object.keys(texts).map((key) => [key, `${mark}${texts[key]}`]),
      )
    }
  }

  return page
}

async function pageSources() {
  const pages = {}
  for (const page of REQUIRED_PAGES) {
    pages[page] = (await import(`../src/data/content/${page}/en.js`)).default
  }

  return pages
}

async function translationOf(page, code) {
  const file = resolve(ROOT, 'src/data/content', page, `${code}.js`)
  return existsSync(file) ? (await import(`../src/data/content/${page}/${code}.js`)).default : null
}

async function gapsOf(locale) {
  const sources = await pageSources()
  const pages = {}
  for (const page of REQUIRED_PAGES) {
    pages[page] = { source: sources[page], translated: await translationOf(page, locale.code) }
  }

  return languageGaps(locale.messages, en, pages, missingContent)
}

async function open(path) {
  const mounted = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((done) => setTimeout(done, 20))
  return mounted
}

describe('what a language must hold', () => {
  it('lists every untranslated message, missing section, key, list and reviewer', () => {
    const source = {
      intro: { title: 'Title', body: 'Body' },
      more: { text: 'x' },
      lists: { faqs: [{}, {}] },
    }
    const pages = {
      faith: { source, translated: { intro: { title: 'Àkọlé' }, lists: { faqs: [{}] } } },
      zakat: { source, translated: null },
    }

    const gaps = languageGaps(
      { siteNav: { about: 'Nípa' } },
      { siteNav: { about: 'About', github: 'GitHub' } },
      pages,
      missingContent,
    )

    expect(gaps).toEqual([
      'message siteNav.github',
      'page faith: intro.body',
      'page faith: more',
      'page faith: lists.faqs',
      'page faith: reviewer',
      'page zakat: intro',
      'page zakat: more',
      'page zakat: lists.faqs',
      'page zakat: reviewer',
    ])
  })

  it('finds nothing missing in a full translation with a named reviewer', async () => {
    const sources = await pageSources()
    const pages = Object.fromEntries(
      REQUIRED_PAGES.map((page) => [
        page,
        { source: sources[page], translated: translatedPage(sources[page], 'yo:') },
      ]),
    )

    expect(languageGaps(translated(en, 'yo:'), en, pages, missingContent)).toEqual([])
  })

  it('does not accept a page with no reviewer named', async () => {
    const { faith } = await pageSources()

    expect(missingContent(faith, translatedPage(faith, 'yo:', ''))).toEqual(['reviewer'])
  })

  it.each(LOCALES.filter((locale) => locale.complete && locale.code !== 'en'))(
    '$name is marked complete only because nothing is missing',
    async (locale) => {
      expect(await gapsOf(locale)).toEqual([])
    },
  )

  it('knows Yoruba, and that it is not ready', async () => {
    const yoruba = LOCALES.find((locale) => locale.code === 'yo')

    expect(yoruba).toMatchObject({ name: 'Yorùbá', dir: 'ltr', complete: false })
    expect((await gapsOf(yoruba)).length).toBeGreaterThan(messageKeys(en).length)
  })
})

describe('Yoruba before its translation is complete', () => {
  it('is not in the switcher', async () => {
    const { wrapper } = await open('/')

    expect(availableLocales.value.map((locale) => locale.code)).toEqual(['en'])
    expect(wrapper.find('.language-switcher').exists()).toBe(false)
  })

  it.each(['/yo', '/yo/faith', '/yo/prayer', '/yo/zakat'])(
    'shows the 404 page at %s',
    async (path) => {
      const { router } = await open(path)

      expect(router.currentRoute.value.name).toBe('not-found')
    },
  )

  it('does not follow a browser set to Yoruba', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['yo-NG', 'yo'])

    const { router } = await open('/')

    expect(router.currentRoute.value.fullPath).toBe('/')
    vi.restoreAllMocks()
  })
})

describe('a complete Yoruba', () => {
  const registered = LOCALES.find((locale) => locale.code === 'yo')

  beforeEach(async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
    addLocale({ ...registered, complete: true, messages: translated(en, 'yo:') })
    const sources = await pageSources()
    for (const page of REQUIRED_PAGES) {
      addTranslation('content', page, 'yo', translatedPage(sources[page], 'yo:'))
    }
  })

  afterEach(() => {
    removeTranslations()
    removeLocale('yo')
    setLocale('en')
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('is in the switcher under its own name', async () => {
    const { wrapper } = await open('/')

    expect(wrapper.findAll('.language-select option').map((option) => option.text())).toEqual([
      'English',
      'Yorùbá',
    ])
  })

  it.each(REQUIRED_PAGES)(
    'opens the %s page in Yoruba with no section left in English',
    async (page) => {
      const { wrapper, router } = await open(`/yo/${page}`)

      expect(router.currentRoute.value.name).toBe(`yo:${page}`)
      expect(wrapper.find('h1').text()).toMatch(/^yo:/)
      expect(wrapper.find('.untranslated-note').exists()).toBe(false)
      expect(document.documentElement.lang).toBe('yo')
    },
  )

  it('shows no interface text in English in the navigation and footer', async () => {
    const { wrapper } = await open('/yo/tasbih')
    const labels = [
      ...wrapper.findAll('.nav-tools-btn').map((link) => link.text()),
      ...wrapper.findAll('.site-footer a').map((link) => link.text()),
    ].filter((text) => /[A-Za-z]{3}/.test(text) && !/GitHub|Zubair|Yusuf|IslamicHub/.test(text))

    expect(labels.length).toBeGreaterThan(10)
    expect(labels.filter((text) => !text.includes('yo:'))).toEqual([])
  })

  it("uses typefaces that hold Yoruba's letters, and the site's own again in English", async () => {
    await open('/yo/faith')
    const style = document.documentElement.style

    expect(style.getPropertyValue('--sans')).toContain('Noto Sans')
    expect(style.getPropertyValue('--serif')).toContain('Noto Serif')
    expect(document.head.querySelector('link[data-language-fonts]').href).toContain('Noto+Sans')

    setLocale('en')

    expect(style.getPropertyValue('--sans')).toBe('')
    expect(document.head.querySelector('link[data-language-fonts]')).toBeNull()
  })

  it('gives the same Zakat and inheritance numbers in both languages', async () => {
    const amounts = async (path) => {
      const { wrapper } = await open(path)
      await wrapper.find('input[placeholder="0.00"]').setValue(4000000)
      const due = wrapper.find('.rb-amount').text()
      wrapper.unmount()
      return due
    }

    const english = await amounts('/zakat')
    const yoruba = await amounts('/yo/zakat')

    expect(yoruba.replace(/[^\d]/g, '')).toBe(english.replace(/[^\d]/g, ''))
    expect(useZakatStore().nisabValue).toBeGreaterThan(0)
    expect(
      calcInheritance({ wife: 1, son: 2, daughter: 1 }, 120000).shares.map((share) => share.amount),
    ).toEqual([15000, 84000, 21000])
  })

  it('credits the Qur’an translation on the About page', async () => {
    const { wrapper } = await open('/yo/about')

    expect(wrapper.find('[data-test="quran-credits"]').text()).toContain(
      registered.quran.translator,
    )
  })

  it('brings a browser set to Yoruba to the home page in Yoruba, where morning adhkar can be completed', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['yo-NG', 'en'])
    const { wrapper, router } = await open('/')
    expect(router.currentRoute.value.fullPath).toBe('/yo')

    await router.push('/adhkar/morning')
    await vi.dynamicImportSettled()
    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/yo/adhkar/morning')

    for (const button of wrapper.findAll('.dc-tap-btn, .dc-part-btn')) {
      const [, target] = button.text().match(/\/ (\d+)/)
      for (let tap = 0; tap < Number(target); tap += 1) {
        await button.trigger('click')
      }
    }
    await wrapper.find('.adh-progress-card .btn-primary').trigger('click')

    expect(useAdhkarStore().isCategoryCompletedToday('morning')).toBe(true)
  })
})

describe('search without tone marks', () => {
  const duas = [
    {
      id: 'x',
      title: 'Ìbẹ̀rẹ̀ oúnjẹ',
      when: '',
      translation: 'Ní orúkọ Ọlọ́run',
      transliteration: 'Bismillāh',
      situations: ['eating'],
    },
  ]
  const situations = [{ slug: 'eating', name: 'Oúnjẹ' }]

  it('folds Yoruba letters with tone marks and under-dots to plain letters', () => {
    expect(foldText('Ọlọ́run')).toBe('olorun')
    expect(foldText('ẹ̀ṣẹ̀')).toBe('ese')
    expect(foldText('Ṣàngó')).toBe('sango')
  })

  it.each(['Olorun', 'Ọlọ́run', 'ounje', 'Oúnjẹ', 'ibere'])(
    'finds the dua when searching %s',
    (query) => {
      expect(searchDuas(query, duas, situations).map((dua) => dua.id)).toEqual(['x'])
    },
  )
})

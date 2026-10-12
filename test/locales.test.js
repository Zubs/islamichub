import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'
import App from '@/App.vue'
import en from '@/locales/en.js'
import { LOCALES } from '@/locales/index.js'
import {
  t,
  addLocale,
  removeLocale,
  setLocale,
  availableLocales,
  formatNumber,
  formatDate,
} from '@/i18n.js'
import { switchLocale } from '@/router/index.js'
import { useZakatStore } from '@/stores/zakat.js'
import {
  localePath,
  splitLocale,
  matchLocale,
  localizedRoutes,
  messageKeys,
} from '@/utils/locale.js'
import { mountPage, headOf } from './mountPage.js'
import { hardCodedText } from './templateText.js'

const TESTISH = {
  code: 'xx',
  name: 'Testish',
  intl: 'de-DE',
  dir: 'ltr',
  complete: true,
  messages: {
    siteNav: { about: 'Uber uns', menu: { home: 'Heim' }, pillars: { zakat: { name: 'Zakah' } } },
    zakat: { currency: 'Währung', nisabMethod: 'Nisab-Methode', due: 'Zakat ist fällig:' },
    common: { days: '{n} Tage | {n} Tag | {n} Tage', language: 'Sprache' },
  },
}

async function settled() {
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((done) => setTimeout(done, 20))
}

async function open(path) {
  const mounted = await mountPage(App, { path })
  await settled()
  return mounted
}

describe('locale paths', () => {
  it('leaves English addresses alone and prefixes other languages', () => {
    expect(localePath('/prayer', 'en')).toBe('/prayer')
    expect(localePath('/prayer', 'yo')).toBe('/yo/prayer')
    expect(localePath('/', 'yo')).toBe('/yo')
    expect(localePath('/hadith/books/sahih-bukhari/3', 'ha')).toBe(
      '/ha/hadith/books/sahih-bukhari/3',
    )
  })

  it('splits an address into its language and the rest', () => {
    expect(splitLocale('/yo/prayer', ['en', 'yo'])).toEqual({ code: 'yo', path: '/prayer' })
    expect(splitLocale('/yo', ['en', 'yo'])).toEqual({ code: 'yo', path: '/' })
    expect(splitLocale('/prayer', ['en', 'yo'])).toEqual({ code: 'en', path: '/prayer' })
    expect(splitLocale('/zz/prayer', ['en', 'yo'])).toEqual({ code: 'en', path: '/zz/prayer' })
  })

  it("matches a browser's languages to one the site has, or none", () => {
    expect(matchLocale(['yo-NG', 'en'], ['en', 'yo'])).toBe('yo')
    expect(matchLocale(['fr-FR', 'ha'], ['en', 'yo', 'ha'])).toBe('ha')
    expect(matchLocale(['fr', 'de'], ['en', 'yo'])).toBeNull()
    expect(matchLocale(undefined, ['en'])).toBeNull()
  })

  it('copies routes under a prefix with their language', () => {
    const [home, prayer] = localizedRoutes(
      [
        { path: '/', name: 'home' },
        { path: '/prayer', name: 'prayer' },
      ],
      'yo',
    )

    expect(home).toMatchObject({ path: '/yo', name: 'yo:home', meta: { locale: 'yo' } })
    expect(prayer).toMatchObject({ path: '/yo/prayer', name: 'yo:prayer' })
  })
})

describe('message files', () => {
  it('reads text with a count correctly for zero, one and many', () => {
    expect(t('common.days', 0)).toBe('0 days')
    expect(t('common.days', 1)).toBe('1 day')
    expect(t('common.days', 3)).toBe('3 days')
    expect(t('duasHome.found', 1)).toBe('1 dua found')
    expect(t('duasHome.found', 12)).toBe('12 duas found')
  })

  it('holds no empty message', () => {
    const empty = messageKeys(en).filter((key) => !String(t(key)).trim())

    expect(empty).toEqual([])
  })

  function unknownKeys(messages) {
    const known = new Set(messageKeys(en))
    return messageKeys(messages).filter((key) => !known.has(key))
  }

  it('fails a translation holding a key English does not have', () => {
    expect(
      unknownKeys({ siteNav: { about: 'x', aboute: 'typo' }, zakta: { currency: 'x' } }),
    ).toEqual(['siteNav.aboute', 'zakta.currency'])
    expect(unknownKeys(TESTISH.messages)).toEqual([])
  })

  it('finds no unknown key in any language the site knows', () => {
    for (const locale of LOCALES) {
      expect(unknownKeys(locale.messages), locale.code).toEqual([])
    }
  })

  it('has every key in every language marked complete', () => {
    for (const locale of LOCALES.filter((entry) => entry.complete)) {
      const present = new Set(messageKeys(locale.messages))

      expect(
        messageKeys(en).filter((key) => !present.has(key)),
        locale.code,
      ).toEqual([])
    }
  })

  it('registers every message file in the folder', () => {
    const files = readdirSync(resolve(process.cwd(), 'src/locales'))
      .filter((file) => file.endsWith('.js') && file !== 'index.js')
      .map((file) => file.replace('.js', ''))

    expect(files.sort()).toEqual(LOCALES.map((locale) => locale.code).sort())
  })
})

describe('with only English', () => {
  it('hides the switcher and keeps every address as it was', async () => {
    const { wrapper, router } = await open('/prayer')

    expect(wrapper.find('.language-switcher').exists()).toBe(false)
    expect(router.currentRoute.value.fullPath).toBe('/prayer')
    expect(document.documentElement.lang).toBe('en')
  })

  it('shows the 404 page for an address with an unknown language prefix', async () => {
    const { router } = await open('/yo/prayer')

    expect(router.currentRoute.value.name).toBe('not-found')
  })

  it('adds no alternate links to a page', async () => {
    const { head } = await open('/zakat')
    await headOf(head)

    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(0)
  })

  it('shows English to a browser set to a language the site does not have', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR', 'fr'])

    const { router } = await open('/prayer')

    expect(router.currentRoute.value.fullPath).toBe('/prayer')
    vi.restoreAllMocks()
  })
})

describe('with a second language', () => {
  afterEach(() => {
    removeLocale('xx')
    setLocale('en')
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  function offline() {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
  }

  it('offers both languages in the switcher', async () => {
    addLocale(TESTISH)
    const { wrapper } = await open('/')

    expect(availableLocales.value.map((locale) => locale.code)).toEqual(['en', 'xx'])
    expect(wrapper.findAll('.language-select option').map((option) => option.text())).toEqual([
      'English',
      'Testish',
    ])
  })

  it('switches the Zakat page in place: labels, result text, currency format and address', async () => {
    offline()
    addLocale(TESTISH)
    const { wrapper, router } = await open('/zakat')
    await wrapper.find('input[placeholder="0.00"]').setValue(1234567.5)
    expect(wrapper.text()).toContain('Currency')
    expect(wrapper.text()).toContain('£1,234,567.50')

    await wrapper.find('.language-select').setValue('xx')
    await settled()

    expect(router.currentRoute.value.fullPath).toBe('/xx/zakat')
    expect(wrapper.text()).toContain('Währung')
    expect(wrapper.text()).toContain('Nisab-Methode')
    expect(wrapper.text()).not.toContain('Nisab method')
    expect(wrapper.find('.nav-tools-btn[href="/about"]').text()).toBe('Uber uns')
    expect(document.documentElement.lang).toBe('xx')
    expect(useZakatStore().fmt(1234567.5)).toBe('£1.234.567,50')
    expect(localStorage.getItem('locale')).toBe('xx')
  })

  it('shows the result text of the calculator in the second language', async () => {
    offline()
    addLocale(TESTISH)
    const { wrapper } = await open('/xx/zakat')

    await wrapper.find('input[placeholder="0.00"]').setValue(1000000)

    expect(wrapper.find('.rb-label').text()).toBe('Zakat ist fällig:')
    expect(wrapper.find('.rb-amount').text()).toBe('£25.000,00')
  })

  it('shows English for a text the translation lacks, never a blank or a key', async () => {
    offline()
    addLocale(TESTISH)
    const { wrapper } = await open('/xx/zakat')

    expect(wrapper.text()).toContain('Nisab threshold')
    expect(wrapper.text()).not.toMatch(/zakat\.nisabThreshold/)
    setLocale('xx')
    expect(t('tracker.today')).toBe('Today')
    expect(t('common.days', 2)).toBe('2 Tage')
  })

  it('keeps the reader in their language when they follow a link inside the site', async () => {
    addLocale(TESTISH)
    const { router } = await open('/xx/tasbih')

    await router.push('/prayer')
    await settled()

    expect(router.currentRoute.value.fullPath).toBe('/xx/prayer')
  })

  it('selects the remembered language on the next visit', async () => {
    addLocale(TESTISH)
    localStorage.setItem('locale', 'xx')

    const { router } = await open('/adhkar')

    expect(router.currentRoute.value.fullPath).toBe('/xx/adhkar')
    expect(document.documentElement.lang).toBe('xx')
  })

  it("follows the browser's language on a first visit when the site has it", async () => {
    addLocale(TESTISH)
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['xx-AA', 'en'])

    const { router } = await open('/')

    expect(router.currentRoute.value.fullPath).toBe('/xx')
  })

  it('lets the address win over the remembered language on arrival', async () => {
    addLocale(TESTISH)
    localStorage.setItem('locale', 'en')

    const { router } = await open('/xx/tracker')

    expect(router.currentRoute.value.fullPath).toBe('/xx/tracker')
  })

  it('switches back to English at the unprefixed address', async () => {
    addLocale(TESTISH)
    const { router } = await open('/xx/duas/travel')

    await switchLocale(router, 'en')
    await settled()

    expect(router.currentRoute.value.fullPath).toBe('/duas/travel')
    expect(localStorage.getItem('locale')).toBe('en')
  })

  it('names both addresses of a page as alternates, with a default', async () => {
    addLocale(TESTISH)
    const { head } = await open('/xx/faith/articles')
    const seo = await headOf(head)
    const alternates = Object.fromEntries(
      [...document.head.querySelectorAll('link[rel="alternate"]')].map((link) => [
        link.hreflang,
        link.href,
      ]),
    )

    expect(alternates).toEqual({
      en: 'https://islamichub.xyz/faith/articles',
      xx: 'https://islamichub.xyz/xx/faith/articles',
      'x-default': 'https://islamichub.xyz/faith/articles',
    })
    expect(seo.canonicals).toEqual(['https://islamichub.xyz/xx/faith/articles'])
    expect(document.documentElement.lang).toBe('xx')
  })

  it("formats numbers and dates for the language's region", () => {
    addLocale(TESTISH)
    setLocale('xx')

    expect(formatNumber(1234.5, { minimumFractionDigits: 2 })).toBe('1.234,50')
    expect(
      formatDate(new Date(2026, 9, 12), { day: 'numeric', month: 'long', year: 'numeric' }),
    ).toBe('12. Oktober 2026')
  })
})

describe('interface components', () => {
  const ROOT = process.cwd()
  const FILES = [
    'src/App.vue',
    ...['src/components', 'src/components/adhkar', 'src/views/adhkar', 'src/views/duas'].flatMap(
      (folder) =>
        readdirSync(resolve(ROOT, folder))
          .filter((file) => file.endsWith('.vue'))
          .map((file) => join(folder, file)),
    ),
    'src/views/NotFoundView.vue',
    'src/views/hadith/HadithBooksView.vue',
    'src/views/hadith/HadithBookView.vue',
    'src/views/hadith/HadithChapterView.vue',
    'src/views/hadith/HadithView.vue',
    'src/views/tools/TrackerView.vue',
    'src/views/tools/TasbihView.vue',
  ]
  it.each(FILES)('%s holds no hard-coded text', (file) => {
    expect(hardCodedText(readFileSync(resolve(ROOT, file), 'utf8'))).toEqual([])
  })

  it('would catch text typed straight into a template', () => {
    const typed = '<template><div><p>Typed here</p><input placeholder="Search" /></div></template>'

    expect(hardCodedText(typed)).toEqual(['Typed here', 'placeholder="Search"'])
  })
})

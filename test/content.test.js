import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import App from '@/App.vue'
import faith from '@/data/content/faith/en.js'
import { addLocale, removeLocale, setLocale } from '@/i18n.js'
import { addTranslation, removeTranslations } from '@/composables/useContent.js'
import {
  lookup,
  fill,
  mergeList,
  unknownContent,
  sectionsOf,
  localizeItem,
} from '@/utils/content.js'
import { mountPage } from './mountPage.js'
import { hardCodedText } from './templateText.js'

const ROOT = process.cwd()
const TESTISH = {
  code: 'xx',
  name: 'Testish',
  intl: 'en-GB',
  dir: 'ltr',
  complete: true,
  messages: {},
}
const CONTENT_VIEWS = {
  home: 'src/views/HomeView.vue',
  faith: 'src/views/pillar/FaithView.vue',
  articlesOfFaith: 'src/views/pillar/ArticlesOfFaithView.vue',
  prayer: 'src/views/pillar/PrayerView.vue',
  zakat: 'src/views/pillar/ZakatView.vue',
  fasting: 'src/views/pillar/FastingView.vue',
  hajj: 'src/views/pillar/HajjView.vue',
  hadith: 'src/views/hadith/HadithHomeView.vue',
  inheritance: 'src/views/tools/InheritanceView.vue',
  about: 'src/views/AboutView.vue',
}

async function open(path) {
  const mounted = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((done) => setTimeout(done, 20))
  return mounted
}

describe('content helpers', () => {
  const source = {
    intro: { title: 'What is it?', body: 'It has {a} parts.' },
    lists: { faqs: [{ q: 'Why?', a: 'Because.', arabic: 'لِمَاذَا', icon: '❓' }] },
  }

  it('finds a text by section and key, or nothing', () => {
    expect(lookup(source, 'intro.title')).toBe('What is it?')
    expect(lookup(source, 'intro.missing')).toBeNull()
    expect(lookup(source, 'nowhere.title')).toBeNull()
    expect(lookup(null, 'intro.title')).toBeNull()
  })

  it('puts values into a text', () => {
    expect(fill('It has {a} parts.', { a: 2 })).toBe('It has 2 parts.')
    expect(fill('Nothing to fill', {})).toBe('Nothing to fill')
    expect(fill('Keeps {b}', { a: 1 })).toBe('Keeps {b}')
  })

  it('lays a translated list over the source, keeping Arabic and icons from the source', () => {
    const merged = mergeList(source.lists.faqs, [{ q: 'Pourquoi ?' }])

    expect(merged).toEqual([{ q: 'Pourquoi ?', a: 'Because.', arabic: 'لِمَاذَا', icon: '❓' }])
    expect(mergeList(source.lists.faqs, undefined)).toBe(source.lists.faqs)
  })

  it('finds sections and keys a translation has that the source does not', () => {
    expect(unknownContent(source, { intro: { title: 'x' } })).toEqual([])
    expect(
      unknownContent(source, {
        intro: { title: 'x', subtitle: 'y' },
        outro: { title: 'z' },
        lists: { faqs: [{}, {}], extras: [] },
      }),
    ).toEqual(['intro.subtitle', 'outro', 'lists.faqs', 'lists.extras'])
    expect(sectionsOf(source)).toEqual(['intro'])
  })

  it('gives a data item its translated text by id and leaves the rest alone', () => {
    const item = {
      id: 'farewell',
      arabic: 'أَسْتَوْدِعُ',
      translation: 'I entrust',
      reference: 'Al-Tirmidhi 3443',
    }

    expect(localizeItem(item, { farewell: { translation: 'Je confie' } })).toEqual({
      ...item,
      translation: 'Je confie',
    })
    expect(localizeItem(item, { other: { translation: 'x' } })).toBe(item)
    expect(localizeItem(item, null)).toBe(item)
  })
})

describe('content files', () => {
  const pages = readdirSync(resolve(ROOT, 'src/data/content'))

  it('exist for every content page', () => {
    expect(pages.sort()).toEqual(Object.keys(CONTENT_VIEWS).sort())
    for (const page of pages) {
      expect(existsSync(resolve(ROOT, 'src/data/content', page, 'en.js'))).toBe(true)
    }
  })

  it('hold only sections and keys the English file has, in every language', async () => {
    for (const page of pages) {
      const english = (await import(`../src/data/content/${page}/en.js`)).default
      for (const file of readdirSync(resolve(ROOT, 'src/data/content', page))) {
        if (file === 'en.js') {
          continue
        }

        const translated = (await import(`../src/data/content/${page}/${file}`)).default
        expect(unknownContent(english, translated), `${page}/${file}`).toEqual([])
      }
    }
  })

  it.each(Object.entries(CONTENT_VIEWS))(
    'the %s page keeps no long-form English in its template',
    (page, view) => {
      const source = readFileSync(resolve(ROOT, view), 'utf8')

      expect(hardCodedText(source)).toEqual([])
      expect(source).toContain(`useContent('${page}', content)`)
    },
  )
})

describe('a page in a second language', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
    addLocale(TESTISH)
  })

  afterEach(() => {
    removeTranslations()
    removeLocale('xx')
    setLocale('en')
    vi.unstubAllGlobals()
  })

  it('shows its header and no errors with an empty content file', async () => {
    addTranslation('content', 'faith', 'xx', {})

    const { wrapper } = await open('/xx/faith')

    expect(wrapper.find('h1').text()).toBe(faith.header.shahadaTheDeclarationOfFaith)
    expect(wrapper.findAll('.untranslated-note').length).toBeGreaterThan(3)
  })

  it('shows a translated section without any component being touched', async () => {
    addTranslation('content', 'faith', 'xx', {
      foundation: { foundation: 'Fondement', whatIsTheShahada: "Qu'est-ce que la Shahada ?" },
    })

    const { wrapper } = await open('/xx/faith')

    expect(wrapper.text()).toContain("Qu'est-ce que la Shahada ?")
    expect(wrapper.text()).not.toContain('What is the Shahada?')
    expect(wrapper.find('.eyebrow').text()).toBe('Fondement')
  })

  it('shows a section missing from the translation in English with a note', async () => {
    addTranslation('content', 'faith', 'xx', { foundation: { foundation: 'Fondement' } })

    const { wrapper } = await open('/xx/faith')
    const eyebrows = wrapper.findAll('.eyebrow')
    const noted = wrapper.findAll('.untranslated-note')

    expect(wrapper.text()).toContain(faith.theTwoClauses.understandingEachPart)
    expect(noted.length).toBe(eyebrows.length - 1)
    expect(noted[0].text()).toBe('Not yet translated')
    expect(eyebrows[0].element.nextElementSibling?.classList.contains('untranslated-note')).toBe(
      false,
    )
  })

  it('shows a text missing inside a translated section in English, never a blank or a key', async () => {
    addTranslation('content', 'faith', 'xx', { foundation: { foundation: 'Fondement' } })

    const { wrapper } = await open('/xx/faith')

    expect(wrapper.text()).toContain('What is the Shahada?')
    expect(wrapper.text()).not.toContain('foundation.whatIsTheShahada')
  })

  it('shows no note in English', async () => {
    const { wrapper } = await open('/faith')

    expect(wrapper.find('.untranslated-note').exists()).toBe(false)
  })

  it('shows a verse with the same Arabic and reference in every language', async () => {
    const english = await open('/faith')
    const arabic = english.wrapper.find('.quran-arabic').text()
    const reference = english.wrapper.find('.quran-block .quran-ref').text()
    english.wrapper.unmount()
    addTranslation('content', 'faith', 'xx', {
      tawhidDivineOneness: Object.fromEntries(
        Object.keys(faith.tawhidDivineOneness).map((key) => [key, `xx ${key}`]),
      ),
    })

    const { wrapper } = await open('/xx/faith')

    expect(wrapper.find('.quran-arabic').text()).toBe(arabic)
    expect(wrapper.find('.quran-arabic').attributes('lang')).toBe('ar')
    expect(wrapper.find('.quran-block .quran-ref').text()).toBe(reference)
  })

  it('translates a list item by item, keeping its Arabic', async () => {
    addTranslation('content', 'faith', 'xx', { lists: { faqs: [{ q: 'Question traduite ?' }] } })

    const { wrapper } = await open('/xx/faith')
    const questions = wrapper.findAll('.faq-q').map((question) => question.text())

    expect(questions[0]).toContain('Question traduite ?')
    expect(questions[1]).toContain(faith.lists.faqs[1].q)
    expect(wrapper.text()).toContain(faith.lists.conditions[0].arabic)
  })

  it('keeps hadith references in content as links', async () => {
    const { wrapper } = await open('/xx/faith')
    const link = wrapper.findAll('a.hadith-ref').find((ref) => ref.text() === 'Sahih Bukhari 128')

    expect(link.attributes('href')).toBe('/hadith/books/sahih-bukhari/hadith/128')
  })

  it('still opens an FAQ and keeps the blocks that animate in on scroll', async () => {
    const { wrapper } = await open('/xx/faith')

    await wrapper.find('.faq-q').trigger('click')

    expect(wrapper.find('.faq-a.open').exists()).toBe(true)
    expect(wrapper.findAll('.anim-target').length).toBeGreaterThan(2)
  })

  it('shows a translated dua and keeps its Arabic and reference', async () => {
    addTranslation('translations', 'duas', 'xx', {
      farewell: { title: 'Adieu au voyageur', translation: 'Je confie à Allah ta religion.' },
    })

    const { wrapper } = await open('/xx/duas/travel')
    const card = wrapper.find('#farewell')

    expect(card.text()).toContain('Adieu au voyageur')
    expect(card.text()).toContain('Je confie à Allah ta religion.')
    expect(card.find('[lang="ar"]').text()).toMatch(/[ء-ي]/)
    expect(card.find('.dc-ref').text()).toBe('Al-Tirmidhi 3443')
  })

  it('shows translated adhkar and category names, and English where there is none', async () => {
    addTranslation('translations', 'adhkar', 'xx', {
      'ayat-al-kursi': { translation: 'Traduction du verset du Trône.' },
    })
    addTranslation('translations', 'adhkarCategories', 'xx', {
      morning: { name: 'Adhkar du matin' },
    })

    const { wrapper } = await open('/xx/adhkar/morning')

    expect(wrapper.find('h1').text()).toBe('Adhkar du matin')
    expect(wrapper.find('#ayat-al-kursi').text()).toContain('Traduction du verset du Trône.')
    expect(wrapper.findAll('.dhikr-card')[1].text()).toMatch(/[A-Za-z]{4}/)
  })
})

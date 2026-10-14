import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import App from '@/App.vue'
import ProphetsHomeView from './ProphetsHomeView.vue'
import ProphetView from './ProphetView.vue'
import { PROPHETS, getProphet } from '@/data/prophets.js'
import { PROPHET_STORIES } from '@/data/prophetStories.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { addLocale, removeLocale, setLocale } from '@/i18n.js'
import { addTranslation, removeTranslations } from '@/composables/useContent.js'
import { mountPage, headOf } from '../../../test/mountPage.js'
import ayahCounts from '../../../test/fixtures/ayahCounts.json'

const ORDER = [
  'Adam',
  'Idris',
  'Nuh',
  'Hud',
  'Salih',
  'Ibrahim',
  'Lut',
  'Isma’il',
  'Ishaq',
  'Ya’qub',
  'Yusuf',
  'Ayyub',
  'Shu’ayb',
  'Musa',
  'Harun',
  'Dhul-Kifl',
  'Dawud',
  'Sulayman',
  'Ilyas',
  'Al-Yasa’',
  'Yunus',
  'Zakariyya',
  'Yahya',
  '‘Isa',
  'Muhammad',
]
const QURAN_REF = /Qur'an (\d+):(\d+)/g
const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')

function quranRefsIn(text) {
  return [...String(text).replaceAll('’', "'").matchAll(QURAN_REF)].map((match) => ({
    surah: Number(match[1]),
    ayah: Number(match[2]),
  }))
}

function exists({ surah, ayah }) {
  return surah >= 1 && surah <= 114 && ayah >= 1 && ayah <= ayahCounts[surah - 1]
}

async function openApp(path) {
  const mounted = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((done) => setTimeout(done, 20))
  await flushPromises()
  return mounted
}

describe('prophets data', () => {
  it('lists the 25 prophets in order, each with an Arabic name', () => {
    expect(PROPHETS.map((prophet) => prophet.name)).toEqual(ORDER)
    expect(new Set(PROPHETS.map((prophet) => prophet.slug)).size).toBe(25)
    for (const prophet of PROPHETS) {
      expect(prophet.arabic, prophet.slug).toMatch(/^[ء-ي ]+$/)
      expect(prophet.slug).toMatch(/^[a-z-]+$/)
    }
  })

  it.each(PROPHETS)('$slug is given verses of the Qur’an that exist', (prophet) => {
    const references = [...prophet.mentions, ...(prophet.peopleRefs ?? [])]

    expect(prophet.mentions.length).toBeGreaterThan(1)
    expect(Boolean(prophet.people)).toBe(Boolean(prophet.peopleRefs?.length))
    for (const reference of references) {
      const [parsed] = quranRefsIn(reference)
      expect(parsed, reference).toBeDefined()
      expect(exists(parsed), reference).toBe(true)
    }
  })

  it('has a written story for exactly the prophets marked as having one', () => {
    const marked = PROPHETS.filter((prophet) => prophet.story).map((prophet) => prophet.slug)

    expect(marked).toEqual(Object.keys(PROPHET_STORIES))
    expect(marked).toContain('ibrahim')
    for (const slug of marked) {
      expect(sitemap).toContain(`<loc>https://islamichub.xyz/prophets/${slug}</loc>`)
    }
  })
})

describe.each(Object.entries(PROPHET_STORIES))('the story of %s', (slug, { sections, content }) => {
  it.each(sections)('section $id carries a reference that exists', (section) => {
    const listed = [
      section.reference,
      ...(section.references ?? []),
      ...(Array.isArray(section.items) ? section.items.map((item) => item.reference) : []),
    ].filter(Boolean)
    const quran = quranRefsIn(listed.join(' '))
    const hadith = hadithRefsIn(listed.join(' '))

    expect(quran.length + hadith.length).toBeGreaterThan(0)
    for (const reference of quran) {
      expect(exists(reference), JSON.stringify(reference)).toBe(true)
    }
  })

  it('names in its words every reference a prose section relies on, and cites no verse that does not exist', () => {
    for (const section of sections.filter(({ type }) => type === 'prose')) {
      const words = JSON.stringify(content[section.id]).replaceAll('’', "'")
      for (const reference of section.references) {
        expect(words, `${section.id}: ${reference}`).toContain(reference)
      }
    }

    for (const reference of quranRefsIn(JSON.stringify(content))) {
      expect(exists(reference), JSON.stringify(reference)).toBe(true)
    }
  })

  it('has words for every section, and a translation for every verse', () => {
    for (const section of sections) {
      const words = content[section.id]
      expect(words, section.id).toBeDefined()
      for (let n = 1; n <= (section.paragraphs ?? 0); n += 1) {
        expect(words[`p${n}`], `${section.id}.p${n}`).toBeTruthy()
      }
      if (section.type === 'points') {
        section.items.forEach((_, index) => expect(words[`i${index + 1}`]).toBeTruthy())
      }
      if (section.type === 'verse') {
        expect(section.arabic).toMatch(/[ء-ي]/)
        expect(section.reference).toMatch(/^Qur'an \d+:\d+$/)
        expect(words.translation).toBeTruthy()
      }
    }
    expect(content.header.title && content.header.lead && content.header.description).toBeTruthy()
  })

  it('draws on the Qur’an and Sahih al-Bukhari only', () => {
    const cited = hadithRefsIn(JSON.stringify(sections) + JSON.stringify(content))

    expect(cited.length).toBeGreaterThan(0)
    expect(cited.every((reference) => reference.book === 'sahih-bukhari')).toBe(true)
  })

  it('shows every verse block with Arabic, translation and reference', async () => {
    const { wrapper } = await mountPage(ProphetView, { path: `/prophets/${slug}` })
    const verses = sections.filter((section) => section.type === 'verse')

    expect(verses.length).toBeGreaterThan(0)
    for (const verse of verses) {
      const block = wrapper.find(`#${verse.id}`)
      expect(block.find('[lang="ar"]').text()).toBe(verse.arabic)
      expect(block.text()).toContain(content[verse.id].translation)
      expect(block.text()).toContain(verse.reference)
    }
  })

  it('has its own title and description', async () => {
    const { head } = await mountPage(ProphetView, { path: `/prophets/${slug}` })
    const seo = await headOf(head)

    expect(seo.title).toContain(getProphet(slug).name)
    expect(seo.descriptions[0]).toBe(content.header.description)
    expect(seo.canonicals).toEqual([`https://islamichub.xyz/prophets/${slug}`])
  })
})

describe('prophets list', () => {
  it('shows all 25 prophets in order, with their verses', async () => {
    const { wrapper } = await mountPage(ProphetsHomeView, { path: '/prophets' })
    const cards = wrapper.findAll('.prophet-card')

    expect(cards.map((card) => card.find('.prophet-name').text())).toEqual(ORDER)
    expect(wrapper.find('ol.prophets-list').exists()).toBe(true)
    expect(cards[3].text()).toContain('Sent to ‘Ad')
    expect(cards[3].text()).toContain("Qur'an 7:65")
    expect(cards[3].find('[lang="ar"]').text()).toBe('هود')
    expect(cards[1].find('.prophet-people').exists()).toBe(false)
  })

  it('links a prophet with a story and shows one without a story with no link', async () => {
    const { wrapper } = await mountPage(ProphetsHomeView, { path: '/prophets' })
    const cards = wrapper.findAll('.prophet-card')
    const ibrahim = cards[ORDER.indexOf('Ibrahim')]
    const dawud = cards[ORDER.indexOf('Dawud')]

    expect(ibrahim.findAll('a').map((link) => link.attributes('href'))).toEqual([
      '/prophets/ibrahim',
      '/prophets/ibrahim',
    ])
    expect(dawud.find('a').exists()).toBe(false)
    expect(dawud.text()).toContain('Story not yet written')
    expect(dawud.text()).toContain("Qur'an 2:251")
  })

  it('has a title, description and canonical link', async () => {
    const { head } = await mountPage(ProphetsHomeView, { path: '/prophets' })
    const seo = await headOf(head)

    expect(seo.title).toContain('Prophets')
    expect(seo.canonicals).toEqual(['https://islamichub.xyz/prophets'])
  })
})

describe('prophet pages in the app', () => {
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
    removeTranslations()
    removeLocale('xx')
    setLocale('en')
  })

  it('opens the story of Ibrahim from the list', async () => {
    const { wrapper, router } = await openApp('/prophets')

    await wrapper.find('a[href="/prophets/ibrahim"]').trigger('click')
    await flushPromises()
    await vi.dynamicImportSettled()
    await new Promise((done) => setTimeout(done, 400))
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/prophets/ibrahim')
    expect(wrapper.find('h1').text()).toBe('Ibrahim')
    expect(wrapper.find('#fire').text()).toContain('Allah saved him from it')
    expect(wrapper.find('.page-header [lang="ar"]').text()).toContain('عليه السلام')
  })

  it('takes a reader from the story to the source of a hadith', async () => {
    const { wrapper } = await openApp('/prophets/ibrahim')
    const link = wrapper.find('#makkah a.hadith-ref')

    expect(link.text()).toBe('Sahih Bukhari 3364')
    expect(link.attributes('href')).toBe('/hadith/books/sahih-bukhari/hadith/3364')
  })

  it('links to previous and next stories in order', async () => {
    const { wrapper } = await openApp('/prophets/ibrahim')
    const links = wrapper.findAll('.prophet-nav a')

    expect(links.map((link) => link.attributes('href'))).toEqual([
      '/prophets/salih',
      '/prophets',
      '/prophets/lut',
    ])
  })

  it.each(['/prophets/dawud', '/prophets/nobody'])('shows the 404 page at %s', async (path) => {
    const { wrapper, router } = await openApp(path)

    expect(router.currentRoute.value.name).toBe('not-found')
    expect(wrapper.find('.prophet-nav').exists()).toBe(false)
  })

  it('reads a translated section in another language, keeping the Arabic and the references', async () => {
    addLocale({
      code: 'xx',
      name: 'Testish',
      intl: 'en-GB',
      dir: 'rtl',
      complete: true,
      messages: {},
    })
    addTranslation('content', 'ibrahim', 'xx', { fire: { title: 'Le feu' } })
    addTranslation('translations', 'prophets', 'xx', { ibrahim: { name: 'Abraham' } })

    const { wrapper } = await openApp('/xx/prophets/ibrahim')

    expect(document.documentElement.getAttribute('dir')).toBe('rtl')
    expect(wrapper.find('#fire h2').text()).toBe('Le feu')
    expect(wrapper.find('#fireVerse [lang="ar"]').text()).toBe(
      'قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ',
    )
    expect(wrapper.find('.prophet-breadcrumb').text()).toContain('Abraham')
    expect(wrapper.find('#makkah a.hadith-ref').text()).toBe('Sahih Bukhari 3364')
  })
})

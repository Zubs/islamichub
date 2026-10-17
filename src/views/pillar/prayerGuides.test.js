import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import { routes } from '@/router/index.js'
import adhanSections from '@/data/adhanSections.js'
import adhanContent from '@/data/content/adhan/en.js'
import stepSections from '@/data/salahStepsSections.js'
import stepContent from '@/data/content/salahSteps/en.js'
import pillarsContent from '@/data/content/pillars/en.js'
import toolsContent from '@/data/content/tools/en.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { HADITH_NUMBER_MAP } from '@/data/hadithNumbering.js'
import { mountPage } from '../../../test/mountPage.js'
import ayahCounts from '../../../test/fixtures/ayahCounts.json'

const REFERENCE = /Qur'an \d+:\d+|(Sahih Bukhari|Sahih Muslim|Abu Dawud|Al-Tirmidhi|Ibn Majah) \d+/
const GUIDES = [
  ['adhan', adhanSections, adhanContent],
  ['how-to-pray', stepSections, stepContent],
]

function referencesOf(section) {
  return [
    section.reference,
    ...(section.references ?? []),
    ...(Array.isArray(section.items) ? section.items.map((item) => item.reference) : []),
    ...(section.recitations ?? []).map((recitation) => recitation.reference),
  ].filter(Boolean)
}

function verseExists(reference) {
  const [, surah, first, last] = reference.match(/Qur'an (\d+):(\d+)(?:-(\d+))?/)
  return [first, last ?? first].every(
    (ayah) => Number(ayah) >= 1 && Number(ayah) <= ayahCounts[Number(surah) - 1],
  )
}

async function open(path) {
  const mounted = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((done) => setTimeout(done, 20))
  return mounted
}

describe.each(GUIDES)('the %s guide', (name, sections, content) => {
  it.each(sections.filter((section) => section.type !== 'slot'))(
    'carries a reference in section $id',
    (section) => {
      const references = referencesOf(section)

      expect(references.length).toBeGreaterThan(0)
      for (const reference of references) {
        expect(reference).toMatch(REFERENCE)
      }
    },
  )

  it('cites only verses that exist', () => {
    const cited = (JSON.stringify(sections) + JSON.stringify(content)).match(
      /Qur’?'?an \d+:\d+(-\d+)?/g,
    )

    for (const reference of cited) {
      expect(verseExists(reference.replace('’', "'")), reference).toBe(true)
    }
  })

  it('gives every cited Sahih Muslim hadith a library number', () => {
    const cited = hadithRefsIn(JSON.stringify(sections) + JSON.stringify(content))

    for (const { book, number } of cited.filter((ref) => ref.book === 'sahih-muslim')) {
      expect(HADITH_NUMBER_MAP[book][number], `Sahih Muslim ${number}`).toBeDefined()
    }
  })

  it('has words for every paragraph, item, phrase, recitation and question', () => {
    for (const section of sections) {
      const words = content[section.id]
      expect(words, section.id).toBeDefined()
      for (let n = 1; n <= (section.paragraphs ?? 0); n += 1) {
        expect(words[`p${n}`], `${section.id}.p${n}`).toBeTruthy()
      }
      if (section.type === 'points') {
        section.items.forEach((_, index) => expect(words[`i${index + 1}`]).toBeTruthy())
      }
      if (section.type === 'phrases') {
        section.items.forEach((_, index) => {
          expect(words[`t${index + 1}`], `${section.id}.t${index + 1}`).toBeTruthy()
          expect(words[`m${index + 1}`], `${section.id}.m${index + 1}`).toBeTruthy()
        })
      }
      if (section.type === 'step') {
        expect(words.heading && words.text, section.id).toBeTruthy()
        ;(section.recitations ?? []).forEach((_, index) => {
          expect(words[`t${index + 1}`], `${section.id}.t${index + 1}`).toBeTruthy()
          expect(words[`m${index + 1}`], `${section.id}.m${index + 1}`).toBeTruthy()
        })
      }
      if (section.type === 'faq') {
        for (let n = 1; n <= section.items; n += 1) {
          expect(words[`q${n}`] && words[`a${n}`]).toBeTruthy()
        }
      }
    }
  })

  it('says the page awaits review by a scholar', () => {
    expect(content.header.review).toMatch(/awaits review by a scholar/)
  })
})

describe('prayer guide pages', () => {
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

  it('shows each step of the prayer in order with its own illustration', async () => {
    const { wrapper } = await open('/prayer/how-to-pray')
    const steps = wrapper.findAll('.section-step')

    expect(steps).toHaveLength(stepSections.filter((section) => section.type === 'step').length)
    steps.forEach((step, index) => {
      expect(step.find('.section-step-number').text()).toBe(`Step ${index + 1}`)
      expect(step.find('svg[role="img"]').attributes('aria-label')).toBeTruthy()
    })
    expect(steps[0].find('h3').text()).toBe('Begin with the takbir')
    expect(steps.at(-1).find('h3').text()).toBe('End with the salam')
  })

  it('marks every recitation in Arabic as right-to-left Arabic', async () => {
    const { wrapper } = await open('/prayer/how-to-pray')
    const arabic = wrapper.findAll('.section-step .section-arabic')

    expect(arabic.length).toBeGreaterThan(10)
    for (const block of arabic) {
      expect(block.attributes('lang')).toBe('ar')
      expect(block.attributes('dir')).toBe('rtl')
    }
  })

  it('shows the tashahhud with its transliteration, meaning and source', async () => {
    const { wrapper } = await open('/prayer/how-to-pray')
    const step = wrapper.find('#tashahhud')

    expect(step.find('.section-arabic').text()).toContain('التَّحِيَّاتُ لِلَّهِ')
    expect(step.text()).toContain('At-taḥiyyātu li-llāhi')
    expect(step.text()).toContain('All greetings, prayers and good things are for Allah')
    expect(step.find('.section-step-recitation a.hadith-ref').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/hadith/831',
    )
  })

  it('lists the words of the adhan with how many times each is said', async () => {
    const { wrapper } = await open('/prayer/adhan')
    const phrases = wrapper.findAll('#words .section-phrase')

    expect(phrases).toHaveLength(8)
    expect(phrases[0].find('.section-phrase-times').text()).toBe('× 4')
    expect(phrases[0].find('[lang="ar"]').text()).toBe('اللَّهُ أَكْبَرُ')
    expect(wrapper.find('#iqamah').text()).toContain('The prayer has begun')
  })

  it('tells the reader what to say while the adhan is called and after it', async () => {
    const { wrapper } = await open('/prayer/adhan')

    expect(wrapper.find('#respond').text()).toContain('saying what he says')
    expect(wrapper.find('#laHawla').text()).toContain('Lā ḥawla wa lā quwwata illā bi-llāh')
    expect(wrapper.find('#afterDua [lang="ar"]').text()).toContain(
      'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ',
    )
  })

  it('links the prayer page to its guides, the tracker and the Eid prayer', async () => {
    const { wrapper } = await open('/prayer')
    const links = wrapper.findAll('#guides a').map((link) => link.attributes('href'))

    expect(links).toEqual(
      expect.arrayContaining(['/prayer/how-to-pray', '/prayer/adhan', '/tracker', '/eid']),
    )
    expect(wrapper.findAll('.on-this-page a').map((link) => link.attributes('href'))).toEqual([
      '#guides',
      '#times',
      '#qibla',
      '#importance',
      '#prayers',
      '#conditions',
      '#questions',
    ])
    for (const anchor of [
      'guides',
      'times',
      'qibla',
      'importance',
      'prayers',
      'conditions',
      'questions',
    ]) {
      expect(wrapper.find(`#${anchor}`).exists(), anchor).toBe(true)
    }
  })
})

describe('hub pages', () => {
  const served = new Set(routes.map((route) => route.path))

  it('links the five pillars in order, fasting before Hajj', () => {
    expect(pillarsContent.lists.pillars.map((pillar) => pillar.to)).toEqual([
      '/faith',
      '/prayer',
      '/zakat',
      '/fasting',
      '/hajj',
    ])
  })

  it('links every tool to a page the site serves', () => {
    const tools = Object.values(toolsContent.lists).flat()

    expect(tools.length).toBeGreaterThanOrEqual(10)
    for (const tool of tools) {
      expect(served.has(tool.to.split('#')[0]), tool.to).toBe(true)
    }
  })

  it('shows the pillars page with a card for each pillar and the hadith that names them', async () => {
    const { wrapper } = await open('/pillars')

    expect(wrapper.find('h1').text()).toBe('The Five Pillars of Islam')
    expect(wrapper.findAll('.pillar-list > li')).toHaveLength(5)
    expect(wrapper.text()).toContain('Islam is built on five')
  })

  it('shows the tools page with every tool grouped under a heading', async () => {
    const { wrapper } = await open('/tools')

    expect(wrapper.findAll('h2')).toHaveLength(4)
    expect(wrapper.findAll('.tools-grid > li')).toHaveLength(
      Object.values(toolsContent.lists).flat().length,
    )
  })
})

describe('navigation', () => {
  it('offers four main destinations, About and GitHub in the bar', async () => {
    const { wrapper } = await open('/')

    expect(wrapper.findAll('.nav-pillars a').map((link) => link.attributes('href'))).toEqual([
      '/pillars',
      '/tools',
      '/hadith',
      '/prophets',
    ])
    expect(wrapper.findAll('.nav-right a')).toHaveLength(2)
    expect(wrapper.findAll('.nav-mobile-menu a')).toHaveLength(7)
  })

  it('keeps the footer to a short list of links', async () => {
    const { wrapper } = await open('/')

    expect(wrapper.findAll('.footer-col a')).toHaveLength(8)
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import EidView from './EidView.vue'
import sections from '@/data/eidSections.js'
import content from '@/data/content/eid/en.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { addLocale, removeLocale, setLocale } from '@/i18n.js'
import { addTranslation, removeTranslations } from '@/composables/useContent.js'
import { unknownContent } from '@/utils/content.js'
import { mountPage, headOf } from '../../test/mountPage.js'

const REFERENCE = /Qur'an \d+:\d+|(Sahih Bukhari|Abu Dawud|Al-Tirmidhi) \d+/

function at(date) {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(date)
}

async function open(path = '/eid') {
  return mountPage(EidView, { path })
}

describe('Eid page content', () => {
  it.each(sections)('section $id carries a reference', (section) => {
    const references = [
      section.reference,
      ...(section.references ?? []),
      ...(Array.isArray(section.items) ? section.items.map((item) => item.reference) : []),
    ].filter(Boolean)

    expect(references.length).toBeGreaterThan(0)
    for (const reference of references) {
      expect(reference).toMatch(REFERENCE)
    }
  })

  it('cites only collections the library holds, so every hadith reference can link', () => {
    const cited = JSON.stringify(sections) + JSON.stringify(content)

    expect(hadithRefsIn(cited).length).toBeGreaterThan(15)
    expect(cited).not.toMatch(/Sahih Muslim \d|Muwatta|Ibn Abi Shaybah \d/)
  })

  it('has words for every section, paragraph, item and question the source lists', () => {
    for (const section of sections) {
      const words = content[section.id]
      expect(words, section.id).toBeDefined()
      for (let n = 1; n <= (section.paragraphs ?? 0); n += 1) {
        expect(words[`p${n}`], `${section.id}.p${n}`).toBeTruthy()
      }
      if (section.type === 'points') {
        section.items.forEach((_, index) => expect(words[`i${index + 1}`]).toBeTruthy())
      }
      if (section.type === 'faq') {
        for (let n = 1; n <= section.items; n += 1) {
          expect(words[`q${n}`] && words[`a${n}`]).toBeTruthy()
        }
      }
    }
  })
})

describe('Eid page', () => {
  afterEach(() => {
    vi.useRealTimers()
    removeTranslations()
    removeLocale('xx')
    setLocale('en')
  })

  it('counts down to the nearer Eid, with the note about moon sighting', async () => {
    at(new Date(2026, 2, 13, 9))
    const { wrapper } = await open()
    const countdown = wrapper.find('.eid-countdown')

    expect(countdown.text()).toContain('Next: Eid al-Fitr')
    expect(countdown.find('.eid-days').text()).toBe('7 days')
    expect(countdown.text()).toContain('Friday, 20 March 2026')
    expect(countdown.text()).toContain('sighting of the new moon')
  })

  it('shows "1 day" the day before Eid al-Fitr', async () => {
    at(new Date(2026, 2, 19, 9))

    expect((await open()).wrapper.find('.eid-days').text()).toBe('1 day')
  })

  it('shows a greeting in place of the countdown on 1 Shawwal', async () => {
    at(new Date(2026, 2, 20, 9))
    const { wrapper } = await open()

    expect(wrapper.find('.eid-greeting').text()).toContain('Eid al-Fitr')
    expect(wrapper.find('.eid-days').exists()).toBe(false)
  })

  it('points to Eid al-Adha on 2 Shawwal', async () => {
    at(new Date(2026, 2, 21, 9))

    expect((await open()).wrapper.find('.eid-label').text()).toBe('Next: Eid al-Adha')
  })

  it('shows both positions on the extra takbirs, each with its evidence', async () => {
    const { wrapper } = await open()
    const positions = wrapper.findAll('#takbirs .section-position')

    expect(positions).toHaveLength(2)
    expect(positions[0].text()).toContain('Seven and five')
    expect(positions[0].find('a.hadith-ref').attributes('href')).toBe(
      '/hadith/books/abu-dawood/hadith/1149',
    )
    expect(positions[1].text()).toContain('Hanafi')
    expect(positions[1].find('a.hadith-ref').text()).toBe('Abu Dawud 1153')
    expect(wrapper.find('#takbirs').text()).not.toMatch(/correct view|strongest|preferred/i)
  })

  it('shows the takbirat in Arabic, transliteration and translation', async () => {
    const { wrapper } = await open()
    const takbirat = wrapper.find('#takbirat')

    expect(takbirat.find('[lang="ar"]').attributes('dir')).toBe('rtl')
    expect(takbirat.find('[lang="ar"]').text()).toMatch(/[ء-ي]/)
    expect(takbirat.find('.section-translit').text()).toContain('Allāhu akbar')
    expect(takbirat.find('.section-translation').text()).toContain('Allah is the Greatest')
    expect(takbirat.find('.section-source').text()).toContain('awaits confirmation')
  })

  it('links every hadith reference to its hadith', async () => {
    const { wrapper } = await open()
    const links = wrapper.findAll('a.hadith-ref')

    expect(links.length).toBeGreaterThan(15)
    for (const link of links) {
      expect(link.attributes('href')).toBe(hadithRefsIn(link.text())[0].to)
    }
  })

  it('has a title, description and canonical link', async () => {
    const { head } = await open()
    const seo = await headOf(head)

    expect(seo.title).toContain('Eid al-Fitr and Eid al-Adha')
    expect(seo.descriptions[0]).toContain('takbirat')
    expect(seo.canonicals).toEqual(['https://islamichub.xyz/eid'])
  })

  it('takes a reader from how the prayer is performed to Zakat al-Fitr and the Zakat page', async () => {
    at(new Date(2026, 2, 13, 9))
    const { wrapper } = await open()

    expect(wrapper.findAll('#prayer li')).toHaveLength(6)
    expect(wrapper.find('#prayer ol').exists()).toBe(true)
    expect(wrapper.find('#zakatAlFitr').text()).toContain('before people go out to the Eid prayer')
    const links = wrapper
      .findAll('#zakatAlFitr .eid-links a')
      .map((link) => link.attributes('href'))
    expect(links).toEqual(['/zakat', '/fasting'])
  })

  it('reads a translated section in another language with the same Arabic and references', async () => {
    addLocale({
      code: 'xx',
      name: 'Testish',
      intl: 'en-GB',
      dir: 'ltr',
      complete: true,
      messages: {},
    })
    const translation = {
      takbirat: { title: 'Les takbirat', translation: 'Allah est le Plus Grand.' },
    }
    addTranslation('content', 'eid', 'xx', translation)
    const english = await open()
    const arabic = english.wrapper.find('#takbirat [lang="ar"]').text()
    english.wrapper.unmount()

    const { wrapper } = await open('/xx/eid')

    expect(unknownContent(content, translation)).toEqual([])
    expect(wrapper.find('#takbirat h2').text()).toBe('Les takbirat')
    expect(wrapper.find('#takbirat [lang="ar"]').text()).toBe(arabic)
    expect(wrapper.find('#what h2').text()).toBe(content.what.title)
    expect(wrapper.find('#what .untranslated-note').exists()).toBe(true)
  })
})

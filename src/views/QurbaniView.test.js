import { describe, it, expect } from 'vitest'
import QurbaniView from './QurbaniView.vue'
import EidView from './EidView.vue'
import HajjView from './pillar/HajjView.vue'
import sections from '@/data/qurbaniSections.js'
import content from '@/data/content/qurbani/en.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { mountPage, headOf } from '../../test/mountPage.js'

const REFERENCE = /Qur'an \d+:\d+|(Sahih Bukhari|Abu Dawud|Al-Tirmidhi|Ibn Majah|Muwatta Malik) \d+/

async function open() {
  return mountPage(QurbaniView, { path: '/qurbani' })
}

async function optionsFor(people) {
  const { wrapper } = await open()
  await wrapper.find('#qurbani-people').setValue(people)
  return wrapper
}

describe('Qurbani page content', () => {
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

  it('names in its words every reference a prose or question section relies on', () => {
    for (const section of sections.filter(({ type }) => type === 'prose' || type === 'faq')) {
      const words = JSON.stringify(content[section.id]).replaceAll('’', "'")
      for (const reference of section.references) {
        expect(words, `${section.id}: ${reference}`).toContain(reference)
      }
    }
  })

  it('has words for every section, paragraph, item and question the structure lists', () => {
    for (const section of sections) {
      const words = content[section.id]
      expect(words, section.id).toBeDefined()
      for (let n = 1; n <= (section.paragraphs ?? 0); n += 1) {
        expect(words[`p${n}`], `${section.id}.p${n}`).toBeTruthy()
      }
      if (section.type === 'points' || section.type === 'positions') {
        section.items.forEach((_, index) => {
          expect(words[`i${index + 1}`] ?? words[`text${index + 1}`]).toBeTruthy()
        })
      }
      if (section.type === 'faq') {
        for (let n = 1; n <= section.items; n += 1) {
          expect(words[`q${n}`] && words[`a${n}`]).toBeTruthy()
        }
      }
    }
  })
})

describe('Qurbani page', () => {
  it('shows both positions on whether the sacrifice is obligatory, each with its evidence', async () => {
    const { wrapper } = await open()
    const positions = wrapper.findAll('#ruling .section-position')

    expect(positions).toHaveLength(2)
    expect(positions[0].text()).toContain('Obligatory')
    expect(positions[0].text()).toContain('Hanafi')
    expect(positions[0].find('a.hadith-ref').text()).toBe('Ibn Majah 3123')
    expect(positions[1].text()).toContain('confirmed sunnah')
    expect(positions[1].find('a.hadith-ref').text()).toBe('Abu Dawud 2791')
    expect(wrapper.find('#ruling').text()).not.toMatch(/correct view|strongest|preferred/i)
  })

  it('shows both positions on the number of days', async () => {
    const { wrapper } = await open()
    const positions = wrapper.findAll('#dayCount .section-position')

    expect(positions.map((position) => position.find('h3').text())).toEqual([
      'Three days',
      'Four days',
    ])
    expect(positions[1].text()).toContain('awaits confirmation')
    expect(wrapper.find('#dayCount').text()).not.toMatch(/correct view|strongest|preferred/i)
  })

  it('links every hadith reference from a collection the library holds', async () => {
    const { wrapper } = await open()
    const links = wrapper.findAll('a.hadith-ref')

    expect(links.length).toBeGreaterThan(15)
    for (const link of links) {
      expect(link.attributes('href')).toBe(hadithRefsIn(link.text())[0].to)
    }
  })

  it('marks the Arabic verses as Arabic, right to left', async () => {
    const { wrapper } = await open()

    for (const id of ['ransom', 'piety']) {
      const arabic = wrapper.find(`#${id} [lang="ar"]`)
      expect(arabic.exists()).toBe(true)
      expect(arabic.text()).toMatch(/[ء-ي]/)
    }
  })

  it('shows no options until a number is entered, and says it is a guide', async () => {
    const { wrapper } = await open()

    expect(wrapper.find('.qurbani-options').exists()).toBe(false)
    expect(wrapper.find('.qurbani-error').exists()).toBe(false)
    expect(wrapper.find('.qurbani-guide').text()).toContain('a guide, not a ruling')
  })

  it('shows a family of five that five sheep or five shares of one cow both work', async () => {
    const wrapper = await optionsFor('5')

    expect(wrapper.findAll('.qurbani-options li').map((option) => option.text())).toEqual([
      '5 sheep or goats',
      '5 shares of one cow or camel, with 2 shares spare',
    ])
  })

  it('words the options for one, seven, eight and fourteen people', async () => {
    const texts = async (people) =>
      (await optionsFor(people)).findAll('.qurbani-options li').map((option) => option.text())

    expect(await texts('1')).toEqual([
      '1 sheep or goat',
      '1 share of one cow or camel, with 6 shares spare',
    ])
    expect(await texts('7')).toEqual(['7 sheep or goats', '1 cow or camel'])
    expect(await texts('8')).toEqual([
      '8 sheep or goats',
      '1 cow or camel and 1 sheep or goat',
      '2 cows or camels, with 6 shares spare',
    ])
    expect(await texts('14')).toEqual(['14 sheep or goats', '2 cows or camels'])
    expect(await texts('13')).toContain('2 cows or camels, with 1 share spare')
  })

  it.each(['0', '-2', '2.5', 'five'])('rejects %s with a clear message', async (value) => {
    const wrapper = await optionsFor(value)

    expect(wrapper.find('.qurbani-error').text()).toBe('Enter a whole number of people, 1 or more.')
    expect(wrapper.find('.qurbani-options').exists()).toBe(false)
    expect(wrapper.find('#qurbani-people').attributes('aria-invalid')).toBe('true')
  })

  it('has a title, description and canonical link', async () => {
    const { head } = await open()
    const seo = await headOf(head)

    expect(seo.title).toContain('Qurbani')
    expect(seo.descriptions[0]).toContain('shares')
    expect(seo.canonicals).toEqual(['https://islamichub.xyz/qurbani'])
  })

  it('is linked from the Eid and Hajj pages, and links back', async () => {
    const eid = await mountPage(EidView, { path: '/eid' })
    const hajj = await mountPage(HajjView, { path: '/hajj' })
    const { wrapper } = await open()

    expect(eid.wrapper.find('a[href="/qurbani"]').text()).toBe('The Qurbani guide')
    expect(hajj.wrapper.find('a[href="/qurbani"]').text()).toBe('Qurbani guide')
    expect(wrapper.findAll('.qurbani-links a').map((link) => link.attributes('href'))).toEqual([
      '/eid',
      '/hajj',
    ])
  })
})

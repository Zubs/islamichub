import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import sections from '@/data/jumuahSections.js'
import content from '@/data/content/jumuah/en.js'
import { KHUTBAH_KEY } from '@/stores/jumuah.js'
import { mountPage } from '../../test/mountPage.js'

async function open(path = '/jumuah') {
  const { wrapper } = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  return wrapper
}

async function enter(wrapper, value) {
  await wrapper.find('#khutbah-time').setValue(value)
  await wrapper.find('.jumuah-time').trigger('submit')
  await nextTick()
}

describe('the Friday page', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('shows every section, with each section’s references linked', async () => {
    const wrapper = await open()

    for (const section of sections) {
      expect(wrapper.find(`#${section.id}`).exists(), section.id).toBe(true)
    }
    const links = wrapper.findAll('a').map((link) => link.text())
    expect(links).toEqual(
      expect.arrayContaining(['Sahih Bukhari 877', 'Abu Dawud 1047', 'Sahih Muslim 809']),
    )
    expect(wrapper.find('a[href="/prayer/adhan"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/prayer/how-to-pray"]').exists()).toBe(true)
  })

  it('names the source and grading of the al-Kahf hadith and says it awaits the reviewer', async () => {
    const wrapper = await open()
    const kahf = wrapper.find('#kahf').text()

    expect(kahf).toContain('al-Hakim')
    expect(kahf).toContain('al-Bayhaqi')
    expect(kahf).toContain('graded')
    expect(kahf).toContain('could not be checked against our sources')
    expect(kahf).toContain('reviewer')
  })

  it('shows at least two positions with their evidence where the schools differ', async () => {
    const wrapper = await open()
    const positions = wrapper.findAll('#number .section-position')

    expect(positions.length).toBeGreaterThanOrEqual(2)
    expect(positions.every((position) => position.find('.section-ref').text())).toBe(true)
  })

  it('gives every hadith outside the two Sahihs its grade', () => {
    const texts = Object.values(content).flatMap((section) => Object.values(section))
    const cited = texts.join(' ').match(/(Abu Dawud|Al-Tirmidhi|Ibn Majah|Sunan an-Nasa'i) \d+/g)

    for (const reference of new Set(cited)) {
      expect(texts.join(' '), reference).toMatch(new RegExp(`${reference}, graded`))
    }
  })

  it('keeps a khutbah time entered on the page across a reload', async () => {
    const wrapper = await open()
    await enter(wrapper, '13:15')

    expect(wrapper.find('.jumuah-message').text()).toBe('Saved: the khutbah begins at 13:15.')
    expect(localStorage.getItem(KHUTBAH_KEY)).toBe('"13:15"')
    wrapper.unmount()

    const again = await open()
    expect(again.find('#khutbah-time').element.value).toBe('13:15')
  })

  it('refuses a value that is not a time and stores nothing', async () => {
    const wrapper = await open()
    const input = wrapper.find('#khutbah-time')
    input.element.type = 'text'
    await enter(wrapper, '25:99')

    expect(wrapper.find('.jumuah-message').text()).toContain('not a time of day')
    expect(localStorage.getItem(KHUTBAH_KEY)).toBeNull()
  })
})

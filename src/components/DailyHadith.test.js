import { describe, it, expect, vi, afterEach } from 'vitest'
import DailyHadith from './DailyHadith.vue'
import HomeView from '@/views/HomeView.vue'
import { DAILY_HADITHS } from '@/data/dailyHadith.js'
import { dailyHadithFor } from '@/utils/dailyHadith.js'
import { mountPage } from '../../test/mountPage.js'

describe('DailyHadith', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  async function cardOn(date, options = {}) {
    vi.useFakeTimers()
    vi.setSystemTime(date)
    const { wrapper } = await mountPage(DailyHadith, options)
    return wrapper
  }

  it("shows the day's hadith with its narrator and a reference linking to the library", async () => {
    const wrapper = await cardOn(new Date(2026, 9, 12, 9))
    const expected = dailyHadithFor('2026-10-12', DAILY_HADITHS)

    expect(wrapper.find('.hadith-text').text()).toContain(expected.text)
    expect(wrapper.text()).toContain(`Narrated by ${expected.narrator}`)
    const link = wrapper.find('.hadith-source a')
    expect(link.text()).toBe(expected.reference)
    expect(link.attributes('href')).toBe(`/hadith/books/sahih-bukhari/hadith/${expected.number}`)
  })

  it('shows the same hadith on every load of one date, and a different one the next day', async () => {
    const morning = (await cardOn(new Date(2026, 9, 12, 6))).find('.hadith-text').text()
    const evening = (await cardOn(new Date(2026, 9, 12, 22))).find('.hadith-text').text()
    const nextDay = (await cardOn(new Date(2026, 9, 13, 6))).find('.hadith-text').text()

    expect(evening).toBe(morning)
    expect(nextDay).not.toBe(morning)
    expect(
      (await cardOn(new Date(2026, 9, 13, 6))).find('.hadith-source a').attributes('href'),
    ).not.toBe((await cardOn(new Date(2026, 9, 12, 6))).find('.hadith-source a').attributes('href'))
  })

  it('moves on to the new day when a tab left open becomes visible again', async () => {
    const wrapper = await cardOn(new Date(2026, 9, 12, 23, 50))
    const before = wrapper.find('.hadith-text').text()

    vi.setSystemTime(new Date(2026, 9, 13, 0, 10))
    document.dispatchEvent(new Event('visibilitychange'))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.hadith-text').text()).not.toBe(before)
  })

  it('renders nothing at all for an empty list', async () => {
    const wrapper = await cardOn(new Date(2026, 9, 12), { props: { hadiths: [] } })

    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('shows on the home page with the network off, making no request', async () => {
    const fetch = vi.fn(async () => {
      throw new TypeError('offline')
    })
    vi.stubGlobal('fetch', fetch)

    const { wrapper } = await mountPage(HomeView, { path: '/' })

    expect(wrapper.find('.daily-hadith .hadith-text').text().length).toBeGreaterThan(30)
    expect(fetch).not.toHaveBeenCalled()
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import TodayPanel from './TodayPanel.vue'
import HomeView from '@/views/HomeView.vue'
import TrackerView from '@/views/tools/TrackerView.vue'
import PrayerView from '@/views/pillar/PrayerView.vue'
import { useSalahStore } from '@/stores/salah.js'
import { useAdhkarStore } from '@/stores/adhkar.js'
import { useTasbihStore } from '@/stores/tasbih.js'
import { calcPrayerTimes, getNextPrayer, getTimezoneOffset } from '@/utils/prayer.js'
import { mountPage } from '../../test/mountPage.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'MWL', asrMethod: 'standard' }

function at(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
}

async function open(component = TodayPanel, path = '/') {
  setActivePinia(createPinia())
  return (await mountPage(component, { path })).wrapper
}

function part(wrapper, name) {
  return wrapper.find(`[data-part="${name}"]`)
}

describe('TodayPanel', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('shows a first-time visitor prompts in place of data, with no request made', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    at(new Date(2026, 3, 10, 9))

    const wrapper = await open()

    expect(part(wrapper, 'next-prayer').text()).toContain('Set your location')
    expect(part(wrapper, 'next-prayer').attributes('href')).toBe('/prayer')
    expect(part(wrapper, 'prayers').text()).toContain('0 of 5 prayed')
    expect(part(wrapper, 'prayers').text()).toContain('Tap to log your prayers')
    expect(part(wrapper, 'adhkar').text()).toContain('0 of 6 done')
    expect(part(wrapper, 'tasbih').text()).toContain('Tap to start counting')
    expect(wrapper.find('.daily-hadith').exists()).toBe(true)
    expect(fetch).not.toHaveBeenCalled()
    expect(localStorage.length).toBe(0)
  })

  it('links every part to its full page', async () => {
    at(new Date(2026, 2, 1, 9))
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    const wrapper = await open()

    expect(part(wrapper, 'next-prayer').attributes('href')).toBe('/tracker')
    expect(part(wrapper, 'prayers').attributes('href')).toBe('/tracker')
    expect(part(wrapper, 'adhkar').attributes('href')).toBe('/adhkar')
    expect(part(wrapper, 'tasbih').attributes('href')).toBe('/tasbih')
    expect(part(wrapper, 'fasting').attributes('href')).toBe('/fasting')
    expect(wrapper.find('.daily-hadith a').attributes('href')).toMatch(/^\/hadith\/books\//)
  })

  it('shows the same next prayer and countdown as the Prayer page', async () => {
    at(new Date(2026, 3, 10, 14, 0))
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    const times = calcPrayerTimes(
      LAGOS.lat,
      LAGOS.lng,
      new Date(),
      getTimezoneOffset(),
      'MWL',
      'standard',
    )
    const next = getNextPrayer(times)

    const panel = await open()
    const prayerPage = await open(PrayerView, '/prayer')
    const onPrayerPage = prayerPage.text().match(/Time remaining\s*(\d+h \d+m|\d+ min)/)[1]

    expect(part(panel, 'next-prayer').text()).toContain(next.label)
    expect(part(panel, 'next-prayer').text()).toContain(`in ${onPrayerPage}`)
    expect(part(panel, 'next-prayer').text()).toContain(times[next.key])
    expect(prayerPage.text()).toContain(next.label)
  })

  it("shows tomorrow's Fajr as the next prayer after Isha", async () => {
    at(new Date(2026, 3, 10, 23, 30))
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))

    const wrapper = await open()

    expect(part(wrapper, 'next-prayer').text()).toContain('Fajr (tomorrow)')
  })

  it('shows a prayer logged on the tracker without a reload', async () => {
    at(new Date(2026, 3, 10, 22))
    setActivePinia(createPinia())
    const panel = (await mountPage(TodayPanel)).wrapper
    const tracker = (await mountPage(TrackerView, { path: '/tracker' })).wrapper

    await tracker.find('[data-prayer="fajr"] .tracker-status').trigger('click')
    await nextTick()

    expect(part(panel, 'prayers').text()).toContain('1 of 5 prayed')
    expect(panel.find('.today-prayer.status-on-time').text()).toBe('Fajr')
  })

  it('shows late and missed prayers as they were marked, and counts only those prayed', async () => {
    at(new Date(2026, 3, 10, 22))
    const wrapper = await open()
    const salah = useSalahStore()

    salah.setStatus('2026-04-10', 'fajr', 'late')
    salah.setStatus('2026-04-10', 'dhuhr', 'missed')
    await nextTick()

    expect(part(wrapper, 'prayers').text()).toContain('1 of 5 prayed')
    expect(wrapper.find('.today-prayer.status-late').text()).toBe('Fajr')
    expect(wrapper.find('.today-prayer.status-missed').text()).toBe('Dhuhr')
  })

  it('shows the morning adhkar as done once completed', async () => {
    at(new Date(2026, 3, 10, 7))
    const wrapper = await open()

    useAdhkarStore().completeCategory('morning')
    await nextTick()

    expect(part(wrapper, 'adhkar').text()).toContain('1 of 6 done')
    expect(part(wrapper, 'adhkar').text()).toContain('Morning Adhkar')
  })

  it("shows today's tasbih total across all phrases", async () => {
    at(new Date(2026, 3, 10, 7))
    const wrapper = await open()
    const tasbih = useTasbihStore()

    tasbih.tap()
    tasbih.tap()
    tasbih.selectPhrase(tasbih.phrases[1].id)
    tasbih.tap()
    await nextTick()

    expect(tasbih.todayTotalAllPhrases).toBe(3)
    expect(part(wrapper, 'tasbih').find('.today-value').text()).toBe('3')
  })

  it('shows no fasting row outside Ramadan', async () => {
    at(new Date(2026, 3, 10, 9))

    expect(part(await open(), 'fasting').exists()).toBe(false)
  })

  it("shows today's fast in Ramadan, with its status once recorded", async () => {
    at(new Date(2026, 2, 1, 9))
    const wrapper = await open()
    expect(part(wrapper, 'fasting').text()).toContain('Not recorded')

    localStorage.setItem('fasting-log', JSON.stringify({ '2026-03-01': 'fasted' }))
    const again = await open()

    expect(part(again, 'fasting').find('.today-value').text()).toBe('Fasted')
  })

  it("resets the day's progress at local midnight and keeps yesterday in the log", async () => {
    at(new Date(2026, 3, 10, 23, 58))
    const wrapper = await open()
    const salah = useSalahStore()
    salah.setStatus('2026-04-10', 'fajr', 'on-time')
    useAdhkarStore().completeCategory('morning')
    useTasbihStore().tap()
    await nextTick()
    expect(part(wrapper, 'prayers').text()).toContain('1 of 5 prayed')

    vi.setSystemTime(new Date(2026, 3, 11, 0, 1))
    await vi.advanceTimersByTimeAsync(60000)

    expect(part(wrapper, 'prayers').text()).toContain('0 of 5 prayed')
    expect(part(wrapper, 'adhkar').text()).toContain('0 of 6 done')
    expect(part(wrapper, 'tasbih').find('.today-value').text()).toBe('0')
    expect(wrapper.find('#today-heading').text()).toContain('11 April')
    expect(salah.statusOf('2026-04-10', 'fajr')).toBe('on-time')
    expect(JSON.parse(localStorage.getItem('adhkar-completion-log'))['2026-04-10']).toEqual([
      'morning',
    ])
  })

  it('stacks into one column on a narrow screen without a breakpoint', async () => {
    const source = (await import('./TodayPanel.vue?raw')).default

    expect(source).toContain(
      'grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
    )
    expect(source).toMatch(/\.today-tile \{[^}]*min-width: 0/)
  })

  it('sits near the top of the home page', async () => {
    at(new Date(2026, 3, 10, 9))
    const wrapper = await open(HomeView)
    const sections = wrapper.findAll('section')

    expect(sections[1].classes()).toContain('today')
  })

  it('lets a returning user see what is left, tap the next prayer and mark it prayed', async () => {
    at(new Date(2026, 3, 10, 14, 0))
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    localStorage.setItem(
      'salah-log',
      JSON.stringify({ '2026-04-10': { fajr: 'on-time', dhuhr: 'on-time' } }),
    )
    setActivePinia(createPinia())
    const home = (await mountPage(HomeView, { path: '/' })).wrapper
    expect(part(home, 'prayers').text()).toContain('2 of 5 prayed')
    const nextTile = part(home, 'next-prayer')
    expect(nextTile.text()).toContain('Asr')
    expect(nextTile.attributes('href')).toBe('/tracker')

    vi.setSystemTime(new Date(2026, 3, 10, 16, 30))
    const tracker = (await mountPage(TrackerView, { path: '/tracker' })).wrapper
    await tracker.find('[data-prayer="asr"] .tracker-status').trigger('click')
    await nextTick()

    expect(useSalahStore().statusOf('2026-04-10', 'asr')).toBe('on-time')
    expect(part(home, 'prayers').text()).toContain('3 of 5 prayed')
  })
})

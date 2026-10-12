import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import PrayerView from '@/views/pillar/PrayerView.vue'
import { useTasbihStore } from '@/stores/tasbih.js'
import { useAdhkarStore } from '@/stores/adhkar.js'
import { calcPrayerTimes, getNextPrayer } from '@/utils/prayer.js'
import { dayKey } from '@/utils/day.js'
import { mountPage } from './mountPage.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'MWL', asrMethod: 'standard' }

describe('with no connection', () => {
  let fetch

  beforeEach(() => {
    fetch = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    vi.stubGlobal('fetch', fetch)
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('shows prayer times for a saved location without any request', async () => {
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    setActivePinia(createPinia())

    const { wrapper } = await mountPage(PrayerView, { path: '/prayer' })

    const times = wrapper.findAll('.prayer-time').map((time) => time.text())
    expect(times.every((time) => /^\d{2}:\d{2}$/.test(time))).toBe(true)
    expect(fetch).not.toHaveBeenCalled()
  })

  it("points to tomorrow's Fajr after Isha, and can work out tomorrow's times", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 20, 23, 0))
    const today = calcPrayerTimes(LAGOS.lat, LAGOS.lng, new Date(), 1)
    const tomorrow = calcPrayerTimes(LAGOS.lat, LAGOS.lng, new Date(2026, 2, 21), 1)

    expect(getNextPrayer(today).label).toBe('Fajr (tomorrow)')
    expect(tomorrow.fajr).toMatch(/^\d{2}:\d{2}$/)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('keeps a tasbih tap and a completed adhkar category after reconnecting', () => {
    useTasbihStore().tap()
    useAdhkarStore().completeCategory('morning')

    vi.restoreAllMocks()
    setActivePinia(createPinia())

    expect(useTasbihStore().todayTotalAllPhrases).toBe(1)
    expect(useAdhkarStore().isCategoryCompletedToday('morning')).toBe(true)
    expect(Object.keys(JSON.parse(localStorage.getItem('tasbih-totals')))).toEqual([dayKey()])
  })
})

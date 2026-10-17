import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import HomeView from './HomeView.vue'
import { toHijri, daysToRamadan } from '@/utils/hijri.js'
import { dayKey } from '@/utils/day.js'
import en from '@/locales/en.js'
import { mountPage } from '../../test/mountPage.js'

const MINUTE_MS = 60000

function header(date) {
  const hijri = toHijri(date)
  return {
    date: date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    hijri: `${hijri.day} ${en.hijri.months[hijri.month]} ${hijri.year} AH`,
    countdown: `${daysToRamadan(dayKey(date))} days`,
  }
}

async function openAt(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
  const mounted = await mountPage(HomeView, { path: '/' })
  return mounted
}

describe('home page header', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('moves on to the new day at local midnight without a reload', async () => {
    const before = new Date(2026, 9, 17, 23, 59, 30)
    const after = new Date(2026, 9, 18, 0, 0, 30)
    const { wrapper } = await openAt(before)
    const shown = () => wrapper.find('.hero-section').text()

    expect(shown()).toContain(header(before).date)
    expect(shown()).toContain(header(before).hijri)
    expect(shown()).toContain(header(before).countdown)

    vi.advanceTimersByTime(MINUTE_MS)
    await nextTick()

    expect(shown()).toContain(header(after).date)
    expect(shown()).toContain(header(after).hijri)
    expect(shown()).toContain(header(after).countdown)
    expect(header(after).countdown).not.toBe(header(before).countdown)
    wrapper.unmount()
  })

  it('does not change during the day', async () => {
    const morning = new Date(2026, 9, 17, 9, 0)
    const { wrapper } = await openAt(morning)
    const first = wrapper.find('.hero-section').text()

    vi.advanceTimersByTime(12 * 60 * MINUTE_MS)
    await nextTick()

    expect(wrapper.find('.hero-section').text()).toBe(first)
    wrapper.unmount()
  })
})

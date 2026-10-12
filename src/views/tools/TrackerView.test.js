import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import TrackerView from './TrackerView.vue'
import { useSalahStore } from '@/stores/salah.js'
import { SALAH_PRAYERS } from '@/utils/salah.js'
import { mountPage } from '../../../test/mountPage.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'MWL', asrMethod: 'standard' }

function at(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
}

async function open() {
  setActivePinia(createPinia())
  return (await mountPage(TrackerView, { path: '/tracker' })).wrapper
}

function row(wrapper, prayer) {
  return wrapper.find(`[data-prayer="${prayer}"]`)
}

function statusButton(wrapper, prayer, label) {
  return row(wrapper, prayer)
    .findAll('.tracker-status')
    .find((button) => button.text() === label)
}

function stored() {
  return JSON.parse(localStorage.getItem('salah-log'))
}

describe('Prayer tracker page', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('shows five unlogged prayers and a streak of zero with nothing logged', async () => {
    const wrapper = await open()

    expect(wrapper.findAll('.tracker-row')).toHaveLength(5)
    expect(wrapper.findAll('.tracker-unlogged')).toHaveLength(5)
    expect(wrapper.find('.tracker-streak').text()).toBe('0 days')
    expect(wrapper.find('.tracker-time').exists()).toBe(false)
  })

  it("logs today's prayers in five taps and shows a streak of one day", async () => {
    at(new Date(2026, 2, 20, 23, 0))
    const wrapper = await open()

    for (const prayer of SALAH_PRAYERS) {
      await statusButton(wrapper, prayer.key, 'On time').trigger('click')
    }

    expect(Object.keys(stored()['2026-03-20'])).toHaveLength(5)
    expect(wrapper.findAll('.tracker-unlogged')).toHaveLength(0)
    expect(wrapper.find('.tracker-streak').text()).toBe('1 day')
    expect(statusButton(wrapper, 'fajr', 'On time').attributes('aria-pressed')).toBe('true')
  })

  it('lets yesterday be edited, which repairs the streak', async () => {
    at(new Date(2026, 2, 20, 23, 0))
    const allPrayed = Object.fromEntries(SALAH_PRAYERS.map((prayer) => [prayer.key, 'on-time']))
    localStorage.setItem(
      'salah-log',
      JSON.stringify({
        '2026-03-18': allPrayed,
        '2026-03-19': { ...allPrayed, asr: 'missed' },
        '2026-03-20': allPrayed,
      }),
    )
    const wrapper = await open()
    expect(wrapper.find('.tracker-streak').text()).toBe('1 day')

    const week = wrapper.findAll('.tracker-day')
    await week[5].trigger('click')
    expect(wrapper.find('#day-heading').text()).toContain('19 March')
    await statusButton(wrapper, 'asr', 'Late').trigger('click')

    expect(stored()['2026-03-19'].asr).toBe('late')
    expect(wrapper.find('.tracker-streak').text()).toBe('3 days')
  })

  it('fills the week strip after three days of five prayers', async () => {
    at(new Date(2026, 2, 20, 23, 0))
    const allPrayed = Object.fromEntries(SALAH_PRAYERS.map((prayer) => [prayer.key, 'late']))
    localStorage.setItem(
      'salah-log',
      JSON.stringify({ '2026-03-18': allPrayed, '2026-03-19': allPrayed, '2026-03-20': allPrayed }),
    )
    const wrapper = await open()
    const week = wrapper.findAll('.tracker-day')

    expect(week).toHaveLength(7)
    expect(week.slice(4).every((day) => day.classes().includes('state-complete'))).toBe(true)
    expect(week.slice(0, 4).every((day) => day.classes().includes('state-empty'))).toBe(true)
    expect(wrapper.find('.tracker-streak').text()).toBe('3 days')
  })

  it('does not let a future day be opened or logged', async () => {
    at(new Date(2026, 2, 20, 12, 0))
    const wrapper = await open()
    const cells = wrapper
      .findAll('.tracker-cell')
      .filter((cell) => cell.element.tagName === 'BUTTON')
    const tomorrow = cells.find((cell) => cell.text() === '21')
    const today = cells.find((cell) => cell.text() === '20')

    expect(tomorrow.attributes('disabled')).toBeDefined()
    expect(today.attributes('disabled')).toBeUndefined()
    await tomorrow.trigger('click')
    expect(wrapper.find('#day-heading').text()).toBe('Today')
    expect(useSalahStore().setStatus('2026-03-21', 'fajr', 'on-time')).toBe(false)
    expect(wrapper.find('button[aria-label="Next month"]').attributes('disabled')).toBeDefined()
  })

  it('shows an earlier month and lets a day in it be opened', async () => {
    at(new Date(2026, 2, 20, 12, 0))
    const wrapper = await open()

    await wrapper.find('button[aria-label="Previous month"]').trigger('click')
    expect(wrapper.find('#month-heading').text()).toBe('February 2026')

    const cells = wrapper
      .findAll('.tracker-cell')
      .filter((cell) => cell.element.tagName === 'BUTTON')
    await cells.find((cell) => cell.text() === '14').trigger('click')
    expect(wrapper.find('#day-heading').text()).toContain('14 February')
  })

  it('shows times and marks Isha "not yet" in the afternoon when a location is saved', async () => {
    at(new Date(2026, 2, 20, 15, 0))
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    const wrapper = await open()

    expect(row(wrapper, 'fajr').find('.tracker-time').text()).toMatch(/^\d{2}:\d{2}$/)
    expect(row(wrapper, 'fajr').find('.tracker-not-yet').exists()).toBe(false)
    expect(row(wrapper, 'isha').find('.tracker-not-yet').text()).toBe('not yet')
    expect(statusButton(wrapper, 'isha', 'On time').attributes('disabled')).toBeDefined()
    expect(statusButton(wrapper, 'fajr', 'On time').attributes('disabled')).toBeUndefined()
  })

  it('shows no "not yet" on a past day', async () => {
    at(new Date(2026, 2, 20, 4, 0))
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    const wrapper = await open()
    expect(wrapper.findAll('.tracker-not-yet').length).toBeGreaterThan(0)

    await wrapper.findAll('.tracker-day')[5].trigger('click')

    expect(wrapper.findAll('.tracker-not-yet')).toHaveLength(0)
    expect(wrapper.find('.tracker-time').exists()).toBe(false)
  })

  it('empties the log after a confirmation', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const wrapper = await open()
    await statusButton(wrapper, 'fajr', 'Missed').trigger('click')

    await wrapper.find('.tracker-clear button').trigger('click')

    expect(confirm).toHaveBeenCalledOnce()
    expect(localStorage.getItem('salah-log')).toBeNull()
    expect(wrapper.findAll('.tracker-unlogged')).toHaveLength(5)
  })

  it('leaves the log alone when the confirmation is declined', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    const wrapper = await open()
    await statusButton(wrapper, 'fajr', 'Late').trigger('click')

    await wrapper.find('.tracker-clear button').trigger('click')

    expect(Object.values(stored())[0]).toEqual({ fajr: 'late' })
  })

  it('treats corrupt stored data as empty', async () => {
    localStorage.setItem('salah-log', '{"2026-03-20":')

    const wrapper = await open()

    expect(wrapper.findAll('.tracker-unlogged')).toHaveLength(5)
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FastingTracker from './FastingTracker.vue'
import { useFastingStore } from '@/stores/fasting.js'
import { ramadanDays } from '@/utils/fasting.js'

const START_1447 = '2026-02-19'

function at(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
}

function open() {
  setActivePinia(createPinia())
  return mount(FastingTracker)
}

function figure(wrapper, name) {
  return wrapper.find(`[data-test="${name}"]`).text()
}

function dayButtons(wrapper) {
  return wrapper.findAll('button.ft-day')
}

function statusButton(wrapper, label) {
  return wrapper.findAll('.ft-status').find((button) => button.text() === label)
}

function stored(key = 'fasting-log') {
  return JSON.parse(localStorage.getItem(key))
}

describe('FastingTracker', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows an empty 30-day grid and zero to make up in Ramadan with nothing logged', () => {
    at(new Date(2026, 2, 1, 12))
    const wrapper = open()
    const days = dayButtons(wrapper)

    expect(days).toHaveLength(30)
    expect(days.every((day) => !/status-/.test(day.classes().join(' ')))).toBe(true)
    expect(figure(wrapper, 'to-make-up')).toBe('0')
    expect(figure(wrapper, 'voluntary')).toBe('0')
    expect(wrapper.text()).toContain('sighting of the moon')
  })

  it('fills a Ramadan day marked fasted, and keeps it after a reload', async () => {
    at(new Date(2026, 2, 1, 12))
    const wrapper = open()

    await dayButtons(wrapper)[0].trigger('click')
    await statusButton(wrapper, 'Fasted').trigger('click')

    expect(dayButtons(wrapper)[0].classes()).toContain('status-fasted')
    expect(stored()).toEqual({ [START_1447]: 'fasted' })
    expect(dayButtons(open())[0].classes()).toContain('status-fasted')
  })

  it('lets a day hold only one status', async () => {
    at(new Date(2026, 2, 1, 12))
    const wrapper = open()
    await dayButtons(wrapper)[0].trigger('click')
    await statusButton(wrapper, 'Fasted').trigger('click')

    await statusButton(wrapper, 'Missed').trigger('click')

    expect(stored()).toEqual({ [START_1447]: 'missed' })
    expect(dayButtons(wrapper)[0].classes()).toContain('status-missed')
    expect(dayButtons(wrapper)[0].classes()).not.toContain('status-fasted')
    expect(figure(wrapper, 'to-make-up')).toBe('1')
  })

  it('offers only fasted and missed inside Ramadan, and disables days that have not arrived', async () => {
    at(new Date(2026, 2, 1, 12))
    const wrapper = open()

    expect(wrapper.findAll('.ft-status').map((button) => button.text())).toEqual([
      'Fasted',
      'Missed',
    ])
    const days = dayButtons(wrapper)
    expect(days[10].attributes('disabled')).toBeUndefined()
    expect(days[11].attributes('disabled')).toBeDefined()
    expect(useFastingStore().setStatus('2026-03-02', 'fasted')).toBe(false)
    expect(useFastingStore().setStatus('2026-03-01', 'voluntary')).toBe(false)
  })

  it('shows the current month outside Ramadan and offers only made up and voluntary', () => {
    at(new Date(2026, 3, 10, 12))
    const wrapper = open()

    expect(dayButtons(wrapper)).toHaveLength(30)
    expect(wrapper.find('.ft-grid').classes()).toContain('ft-grid-month')
    expect(wrapper.find('.pill-btn.active').text()).toBe('April 2026')
    expect(wrapper.findAll('.ft-status').map((button) => button.text())).toEqual([
      'Made up',
      'Voluntary',
    ])
    expect(useFastingStore().setStatus('2026-04-10', 'fasted')).toBe(false)
  })

  it('brings one missed fast down to zero when a made-up fast is logged afterwards', async () => {
    at(new Date(2026, 3, 10, 12))
    const log = Object.fromEntries(ramadanDays(START_1447).map((day) => [day, 'fasted']))
    log['2026-03-05'] = 'missed'
    localStorage.setItem('fasting-log', JSON.stringify(log))
    const wrapper = open()
    expect(figure(wrapper, 'to-make-up')).toBe('1')
    expect(wrapper.find('.ft-years').text()).toContain(
      'Ramadan 1447 AH: 1 missed, 0 made up, 1 remaining',
    )

    await statusButton(wrapper, 'Made up').trigger('click')

    expect(stored()['2026-04-10']).toBe('made-up')
    expect(figure(wrapper, 'to-make-up')).toBe('0')
  })

  it('counts a voluntary fast separately and leaves the make-up count alone', async () => {
    at(new Date(2026, 3, 10, 12))
    localStorage.setItem('fasting-log', JSON.stringify({ '2026-03-05': 'missed' }))
    const wrapper = open()

    await statusButton(wrapper, 'Voluntary').trigger('click')

    expect(figure(wrapper, 'voluntary')).toBe('1')
    expect(figure(wrapper, 'to-make-up')).toBe('1')
  })

  it('lets the most recent Ramadan be opened after it has ended, to correct a day', async () => {
    at(new Date(2026, 3, 10, 12))
    const wrapper = open()

    await wrapper.findAll('.pill-btn')[0].trigger('click')
    expect(dayButtons(wrapper)).toHaveLength(30)
    await dayButtons(wrapper)[4].trigger('click')
    await statusButton(wrapper, 'Missed').trigger('click')

    expect(stored()).toEqual({ '2026-02-23': 'missed' })
    expect(figure(wrapper, 'to-make-up')).toBe('1')
  })

  it('shifts the grid by a day and keeps the logged days when the first day is set earlier', async () => {
    at(new Date(2026, 2, 1, 12))
    localStorage.setItem(
      'fasting-log',
      JSON.stringify({ [START_1447]: 'fasted', '2026-02-20': 'missed' }),
    )
    const wrapper = open()
    expect(dayButtons(wrapper)[0].attributes('aria-label')).toContain('19 February')

    await wrapper.find('#ramadan-start').setValue('2026-02-18')

    const days = dayButtons(wrapper)
    expect(days[0].attributes('aria-label')).toContain('18 February')
    expect(days[1].classes()).toContain('status-fasted')
    expect(days[2].classes()).toContain('status-missed')
    expect(stored('ramadan-starts')).toEqual({ 1447: '2026-02-18' })
    expect(Object.keys(stored())).toHaveLength(2)

    await wrapper.find('.ft-start-row button').trigger('click')
    expect(dayButtons(wrapper)[0].attributes('aria-label')).toContain('19 February')
    expect(localStorage.getItem('ramadan-starts')).toBeNull()
  })

  it('treats corrupt stored data as empty', () => {
    at(new Date(2026, 2, 1, 12))
    localStorage.setItem('fasting-log', '{"2026-02-19":')
    localStorage.setItem('ramadan-starts', 'null')

    const wrapper = open()

    expect(figure(wrapper, 'to-make-up')).toBe('0')
    expect(dayButtons(wrapper)).toHaveLength(30)
  })

  it('logs a full Ramadan with three missed days, two made up afterwards, and shows one remaining', async () => {
    at(new Date(2026, 2, 20, 22))
    const wrapper = open()
    const missed = [4, 9, 14]
    for (const [index, button] of dayButtons(wrapper).entries()) {
      await button.trigger('click')
      await statusButton(wrapper, missed.includes(index) ? 'Missed' : 'Fasted').trigger('click')
    }
    expect(Object.keys(stored())).toHaveLength(30)
    expect(figure(wrapper, 'to-make-up')).toBe('3')

    at(new Date(2026, 3, 2, 22))
    const later = open()
    const april = dayButtons(later)
    for (const day of [0, 1]) {
      await april[day].trigger('click')
      await statusButton(later, 'Made up').trigger('click')
    }

    expect(figure(later, 'to-make-up')).toBe('1')
  })
})

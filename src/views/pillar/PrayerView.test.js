import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import PrayerView from './PrayerView.vue'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'
import { mountPage as mountView } from '../../../test/mountPage.js'
import { setTimezone, resetTimezone } from '../../../test/timezone.js'

async function mountPage() {
  return (await mountView(PrayerView, { path: '/prayer' })).wrapper
}

function minutes(time) {
  const [hours, mins] = time.split(':').map(Number)
  return hours * 60 + mins
}

function shownTimes(wrapper) {
  return wrapper.findAll('.prayer-time').map((time) => time.text())
}

async function calculateFor(wrapper, latitude, longitude) {
  const [lat, lng] = wrapper.findAll('input[type="number"]')
  await lat.setValue(latitude)
  await lng.setValue(longitude)
  await wrapper.find('.btn-primary').trigger('click')
}

describe('Prayer page Asr method', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('offers Standard by default and names both options', async () => {
    const wrapper = await mountPage()
    const selector = wrapper.find('#asr-method')

    expect(selector.element.value).toBe('standard')
    expect(selector.text()).toContain('Standard')
    expect(selector.text()).toContain('Hanafi')
  })

  it('calculates nothing when the selector changes before a location is given', async () => {
    const wrapper = await mountPage()

    await wrapper.find('#asr-method').setValue('hanafi')

    expect(shownTimes(wrapper).every((time) => time === '—:—')).toBe(true)
    expect(wrapper.text()).not.toContain('valid coordinates')
  })

  it('moves Asr later and keeps the countdown when Hanafi is chosen', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 20, 14, 0))
    const wrapper = await mountPage()
    await calculateFor(wrapper, 51.5074, -0.1278)
    const before = shownTimes(wrapper)
    expect(wrapper.text()).toContain('Next Prayer')
    const countdownBefore = wrapper.text().match(/Time remaining\s*(\d+h \d+m|\d+ min)/)[1]

    await wrapper.find('#asr-method').setValue('hanafi')

    const after = shownTimes(wrapper)
    const asr = 3
    expect(minutes(after[asr])).toBeGreaterThan(minutes(before[asr]))
    expect(after.filter((_, index) => index !== asr)).toEqual(
      before.filter((_, index) => index !== asr),
    )
    const countdownAfter = wrapper.text().match(/Time remaining\s*(\d+h \d+m|\d+ min)/)[1]
    expect(countdownAfter).not.toBe(countdownBefore)
  })

  it('recalculates when the calculation method changes', async () => {
    const wrapper = await mountPage()
    await calculateFor(wrapper, 51.5074, -0.1278)
    const before = shownTimes(wrapper)

    await wrapper.findAll('select')[0].setValue('ISNA')

    expect(shownTimes(wrapper)[0]).not.toBe(before[0])
  })
})

describe('Prayer page saved settings', () => {
  const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'Egypt', asrMethod: 'hanafi' }

  function stored() {
    return JSON.parse(localStorage.getItem('prayer-settings'))
  }

  function button(wrapper, text) {
    return wrapper.findAll('button').find((candidate) => candidate.text() === text)
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stores nothing and asks for a location on a first visit', async () => {
    const wrapper = await mountPage()

    expect(localStorage.getItem('prayer-settings')).toBeNull()
    expect(shownTimes(wrapper).every((time) => time === '—:—')).toBe(true)
    expect(button(wrapper, 'Remember this location')).toBeUndefined()
  })

  it('stores nothing when the offer is not accepted', async () => {
    const wrapper = await mountPage()

    await calculateFor(wrapper, 6.5244, 3.3792)

    expect(button(wrapper, 'Remember this location').exists()).toBe(true)
    expect(localStorage.getItem('prayer-settings')).toBeNull()
  })

  it('stores the location on accepting, and shows times at once on the next visit', async () => {
    const first = await mountPage()
    await calculateFor(first, 6.5244, 3.3792)
    await first.findAll('select')[0].setValue('Egypt')
    const times = shownTimes(first)

    await button(first, 'Remember this location').trigger('click')

    expect(stored()).toEqual({
      lat: 6.5244,
      lng: 3.3792,
      name: '6.5244, 3.3792',
      method: 'Egypt',
      asrMethod: 'standard',
    })
    expect(first.text()).toContain('Remembered on this device')
    first.unmount()
    setActivePinia(createPinia())

    const second = await mountPage()

    expect(shownTimes(second)).toEqual(times)
    expect(second.findAll('select')[0].element.value).toBe('Egypt')
  })

  it('remembers a change of method on the next visit', async () => {
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    setActivePinia(createPinia())
    const wrapper = await mountPage()

    await wrapper.findAll('select')[0].setValue('Karachi')
    await wrapper.find('#asr-method').setValue('standard')

    expect(stored()).toEqual({ ...LAGOS, method: 'Karachi', asrMethod: 'standard' })
  })

  it.each([
    [90, 180],
    [-90, -180],
  ])('accepts latitude %d and longitude %d', async (latitude, longitude) => {
    const wrapper = await mountPage()

    await calculateFor(wrapper, latitude, longitude)

    expect(wrapper.text()).not.toContain('valid coordinates')
    expect(shownTimes(wrapper)[2]).toMatch(/^\d{2}:\d{2}$/)
  })

  it.each([
    [90.1, 0],
    [0, -180.5],
  ])('rejects latitude %d and longitude %d', async (latitude, longitude) => {
    const wrapper = await mountPage()

    await calculateFor(wrapper, latitude, longitude)

    expect(wrapper.text()).toContain('valid coordinates')
    expect(shownTimes(wrapper).every((time) => time === '—:—')).toBe(true)
    expect(button(wrapper, 'Remember this location')).toBeUndefined()
  })

  it('forgets the location, so the next visit asks again', async () => {
    localStorage.setItem('prayer-settings', JSON.stringify(LAGOS))
    setActivePinia(createPinia())
    const first = await mountPage()

    await button(first, 'Forget my location').trigger('click')

    expect(localStorage.getItem('prayer-settings')).toBeNull()
    first.unmount()
    setActivePinia(createPinia())
    const second = await mountPage()
    expect(shownTimes(second).every((time) => time === '—:—')).toBe(true)
  })

  it('treats corrupt stored settings as none', async () => {
    localStorage.setItem('prayer-settings', '{"lat":"north"')
    setActivePinia(createPinia())

    const wrapper = await mountPage()

    expect(shownTimes(wrapper).every((time) => time === '—:—')).toBe(true)
  })

  it('works for the visit and says so when storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    setActivePinia(createPinia())
    const wrapper = await mountPage()

    await calculateFor(wrapper, 6.5244, 3.3792)

    expect(shownTimes(wrapper)[0]).toMatch(/^\d{2}:\d{2}$/)
    expect(wrapper.text()).toContain('cannot be remembered')
    expect(button(wrapper, 'Remember this location')).toBeUndefined()
  })
})

describe('Prayer page while it stays open', () => {
  const LONDON = [51.5074, -0.1278]
  const MINUTE_MS = 60000

  afterEach(() => {
    vi.useRealTimers()
  })

  function timesOn(date) {
    return calcPrayerTimes(...LONDON, date, getTimezoneOffset(), 'MWL', 'standard')
  }

  function at(date, time) {
    const [hours, mins] = time.split(':').map(Number)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, mins)
  }

  it('highlights Asr within a minute of its time beginning', async () => {
    const day = new Date(2026, 2, 20)
    const asr = at(day, timesOn(day).asr)
    vi.useFakeTimers()
    vi.setSystemTime(new Date(asr.getTime() - MINUTE_MS))
    const wrapper = await mountPage()
    await calculateFor(wrapper, ...LONDON)
    expect(wrapper.find('.prayer-card.current').attributes('id')).toBe('pc-dhuhr')

    vi.advanceTimersByTime(2 * MINUTE_MS)
    await nextTick()

    expect(wrapper.find('.prayer-card.current').attributes('id')).toBe('pc-asr')
    expect(wrapper.text()).toContain('Maghrib')
    wrapper.unmount()
  })

  it("shows the new day's times after local midnight", async () => {
    const first = new Date(2026, 2, 20)
    const second = new Date(2026, 2, 21)
    const order = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']
    const expected = (date) => order.map((key) => timesOn(date)[key])
    expect(expected(second)).not.toEqual(expected(first))
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 20, 23, 59, 30))
    const wrapper = await mountPage()
    await calculateFor(wrapper, ...LONDON)
    expect(shownTimes(wrapper)).toEqual(expected(first))

    vi.advanceTimersByTime(MINUTE_MS)
    await nextTick()

    expect(shownTimes(wrapper)).toEqual(expected(second))
    wrapper.unmount()
  })

  it('stops updating when the reader leaves the page', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 20, 14, 0))
    const started = vi.spyOn(globalThis, 'setInterval')
    const cleared = vi.spyOn(globalThis, 'clearInterval')
    const wrapper = await mountPage()
    await calculateFor(wrapper, ...LONDON)
    const intervals = started.mock.results.map((result) => result.value)
    expect(intervals.length).toBeGreaterThan(0)

    wrapper.unmount()

    const stopped = cleared.mock.calls.map(([id]) => id)
    expect(intervals.every((id) => stopped.includes(id))).toBe(true)
  })
})

describe('Prayer page clock note', () => {
  afterEach(() => {
    resetTimezone()
  })

  it('is not shown before a location is given', async () => {
    const wrapper = await mountPage()

    expect(wrapper.find('.prayer-clock-note').exists()).toBe(false)
  })

  it("shows Makkah's times in Lagos time on a Lagos phone, and says so", async () => {
    setTimezone('Africa/Lagos', '2026-10-17T08:00:00Z')
    const wrapper = await mountPage()

    await calculateFor(wrapper, 21.4225, 39.8262)

    expect(wrapper.find('#pc-dhuhr .prayer-time').text()).toBe('10:06')
    expect(wrapper.find('.prayer-clock-note').text()).toContain('this device’s time')
  })
})

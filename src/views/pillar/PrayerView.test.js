import { describe, it, expect, vi, afterEach } from 'vitest'
import PrayerView from './PrayerView.vue'
import { mountPage as mountView } from '../../../test/mountPage.js'

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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import { mountPage } from '../../test/mountPage.js'
import { toHijri, firstDayOfHijriMonth } from '@/utils/hijri.js'
import { shiftMonth } from '@/utils/islamicDays.js'

const NOW = new Date(2026, 9, 17, 9)

async function open(path = '/calendar') {
  const { wrapper, router } = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  return { wrapper, router }
}

async function settle() {
  await vi.dynamicImportSettled()
  await flushPromises()
  await nextTick()
}

describe('the calendar', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('opens on the current Hijri month with today marked and the moon-sighting note', async () => {
    const { wrapper } = await open()
    const hijri = toHijri(NOW)

    expect(wrapper.find('#calendar-month').text()).toContain(String(hijri.year))
    const today = wrapper.find('.calendar-day.today')
    expect(today.find('.calendar-hijri').text()).toBe(String(hijri.day))
    expect(wrapper.text()).toContain('can differ by a day')
    expect(wrapper.find('.calendar-today-link').exists()).toBe(false)
  })

  it('moves twelve months on to the same month a year later, starting on the site’s first day', async () => {
    const { wrapper } = await open()
    const start = toHijri(NOW)
    for (let n = 0; n < 12; n += 1) {
      await wrapper.findAll('.calendar-step')[1].trigger('click')
      await settle()
    }
    const later = shiftMonth({ year: start.year, month: start.month }, 12)

    expect(wrapper.vm.$route.query.m).toBe(`${later.year}-${later.month}`)
    const firstCell = wrapper.findAll('.calendar-day')[0]
    expect(firstCell.find('.calendar-hijri').text()).toBe('1')
    expect(firstCell.attributes('aria-label')).toContain(
      String(firstDayOfHijriMonth(later.year, later.month).getFullYear()),
    )
    expect(wrapper.find('.calendar-today-link').exists()).toBe(true)
  })

  it('lists Dhul Hijjah’s marked days with their dates and references', async () => {
    const { wrapper } = await open('/calendar?m=1448-12')
    const names = wrapper.findAll('.calendar-mark-name').map((name) => name.text())

    expect(names).toEqual(
      expect.arrayContaining([
        'The first ten days of Dhul Hijjah',
        'The day of ‘Arafah',
        'The two Eids',
        'The white days',
      ]),
    )
    const arafah = wrapper.find('#kind-arafah')
    expect(arafah.text()).toContain('9 Dhū al-Ḥijjah 1448 AH')
    expect(arafah.find('a').text()).toBe('Sahih Muslim 1162')
    expect(wrapper.findAll('#kind-white-days')).toHaveLength(1)
  })

  it('brings a day’s entry into view when it is chosen in the grid', async () => {
    const { wrapper } = await open('/calendar?m=1448-1')
    const scroll = vi.fn()
    const entry = wrapper.find('#kind-ashura').element
    entry.scrollIntoView = scroll

    const ashura = wrapper
      .findAll('.calendar-day.marked')
      .find((day) => day.find('.calendar-hijri').text() === '10')
    await ashura.trigger('click')

    expect(scroll).toHaveBeenCalled()
  })

  it('opens the current month for a month it cannot read', async () => {
    const { wrapper } = await open('/calendar?m=nonsense')

    expect(wrapper.find('#calendar-month').text()).toContain(String(toHijri(NOW).year))
  })
})

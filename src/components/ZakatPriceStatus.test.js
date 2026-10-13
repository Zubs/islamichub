import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ZakatPriceStatus from './ZakatPriceStatus.vue'

function status(props) {
  const wrapper = mount(ZakatPriceStatus, {
    props: { metalsFetched: false, ratesFetched: false, date: '2026-10-12', ...props },
  })
  return { label: wrapper.find('.badge').text(), note: wrapper.find('.price-status-note').text() }
}

describe('ZakatPriceStatus', () => {
  it('says prices are loading and the calculator can be filled in', () => {
    const { label, note } = status({ loading: true })

    expect(label).toBe('loading')
    expect(note).toContain('fill in the calculator')
  })

  it('marks fetched prices as current and gives their date', () => {
    const { label, note } = status({ metalsFetched: true, ratesFetched: true, date: '2026-11-03' })

    expect(label).toBe('current')
    expect(note).toBe('Gold and silver prices for 3 November 2026.')
  })

  it('marks reference prices, gives their date and advises checking', () => {
    const { label, note } = status({})

    expect(label).toBe('reference')
    expect(note).toContain('Reference prices from 12 October 2026')
    expect(note).toContain('check the current price')
  })

  it('says the exchange rates are not current when only metals were fetched', () => {
    const { label, note } = status({ metalsFetched: true, date: '2026-11-03' })

    expect(label).toBe('rates not current')
    expect(note).toContain('prices for 3 November 2026')
    expect(note).toContain('reference exchange rates')
  })

  it('leaves the date out when none is known', () => {
    const { note } = status({ metalsFetched: true, ratesFetched: true, date: null })

    expect(note).toBe('Gold and silver prices.')
  })

  it('says nothing about custom prices when none is typed', () => {
    const wrapper = mount(ZakatPriceStatus, { props: { metalsFetched: true, ratesFetched: true } })

    expect(wrapper.find('.price-status-custom').exists()).toBe(false)
  })

  it.each([
    [['gold'], 'Your own gold price per gram'],
    [['silver'], 'Your own silver price per gram'],
    [['gold', 'silver'], 'Your own gold and silver price per gram'],
  ])('says a typed price is in use for %j', (custom, text) => {
    const wrapper = mount(ZakatPriceStatus, {
      props: { metalsFetched: true, ratesFetched: true, custom },
    })

    expect(wrapper.find('.price-status-custom').text()).toContain(text)
  })

  describe('saved prices', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it.each([
      [new Date(2026, 10, 8, 9), '5 days old'],
      [new Date(2026, 10, 4, 0, 30), '1 day old'],
      [new Date(2026, 10, 3, 23), 'fetched earlier today'],
    ])('says how old they are on %s', (now, age) => {
      vi.useFakeTimers()
      vi.setSystemTime(now)

      const { label, note } = status({ saved: true, date: '2026-11-03' })

      expect(label).toBe('saved')
      expect(note).toContain('Saved prices from 3 November 2026')
      expect(note).toContain(age)
    })

    it('prefers fetched prices over saved ones', () => {
      const { label } = status({ saved: true, metalsFetched: true, ratesFetched: true })

      expect(label).toBe('current')
    })
  })
})

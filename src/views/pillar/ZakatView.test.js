import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import ZakatView from './ZakatView.vue'
import { mountPage as mountView } from '../../../test/mountPage.js'
import { useZakatStore } from '@/stores/zakat.js'

async function mountPage() {
  return (await mountView(ZakatView, { path: '/zakat' })).wrapper
}

function currencyButton(wrapper, code) {
  return wrapper.findAll('.pill-btn').find((button) => button.text().includes(code))
}

const DATASET = {
  date: '2026-11-03',
  usd: { xau: 1 / 4000, xag: 1 / 50, gbp: 0.75, eur: 0.9, sar: 3.75, ngn: 1500 },
}

function offline() {
  return vi.fn(async () => {
    throw new TypeError('Failed to fetch')
  })
}

beforeEach(() => {
  vi.stubGlobal('fetch', offline())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Zakat page prices', () => {
  it('requests the price dataset once when the page opens', async () => {
    const fetch = vi.fn(async () => ({ ok: true, json: async () => DATASET }))
    vi.stubGlobal('fetch', fetch)

    const wrapper = await mountPage()
    await flushPromises()

    expect(fetch).toHaveBeenCalledOnce()
    expect(wrapper.find('.badge').text()).toBe('current')
  })

  it('does not fetch again when the user leaves and returns', async () => {
    const fetch = vi.fn(async () => ({ ok: true, json: async () => DATASET }))
    vi.stubGlobal('fetch', fetch)
    const first = await mountPage()
    await flushPromises()
    const price = useZakatStore().goldLocal
    first.unmount()

    const second = await mountPage()
    await flushPromises()

    expect(fetch).toHaveBeenCalledOnce()
    expect(useZakatStore().goldLocal).toBe(price)
    expect(second.find('.badge').text()).toBe('current')
  })

  it('can be filled in and gives a result while prices are still loading', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})),
    )
    const wrapper = await mountPage()

    await wrapper.find('input[placeholder="0.00"]').setValue(1000000)

    expect(wrapper.find('.badge').text()).toBe('loading')
    expect(wrapper.find('.rb-amount').text()).toBe('£25,000.00')
  })

  it('uses reference prices and says so when the price services are blocked', async () => {
    const wrapper = await mountPage()
    await flushPromises()

    expect(wrapper.find('.badge').text()).toBe('reference')
    expect(wrapper.find('.price-status-note').text()).toContain('Reference prices')
    expect(useZakatStore().goldLocal).toBeGreaterThan(0)
  })
})

describe('Zakat page in naira', () => {
  it('offers naira and keeps pounds as the default', async () => {
    const wrapper = await mountPage()

    expect(currencyButton(wrapper, 'NGN').exists()).toBe(true)
    expect(useZakatStore().currency).toBe('GBP')
    expect(wrapper.find('.rate-note').exists()).toBe(false)
  })

  it('says the official rate is used once naira is selected', async () => {
    const wrapper = await mountPage()

    await currencyButton(wrapper, 'NGN').trigger('click')

    expect(wrapper.find('.rate-note').text()).toContain('official exchange rate')
    expect(wrapper.text()).toContain('₦0.00')
    expect(wrapper.text()).toContain('Enter your assets to begin')
  })

  it('rejects a typed price of zero, a negative number or text and keeps the fetched price', async () => {
    const wrapper = await mountPage()
    const store = useZakatStore()
    const fetchedGold = store.goldLocal

    for (const entry of ['0', '-20', 'cheap']) {
      await wrapper.find('#typed-gold').setValue(entry)

      expect(wrapper.find('.hint-error').exists()).toBe(true)
      expect(store.goldLocal).toBe(fetchedGold)
    }
  })

  it('returns to the fetched price when the typed price is cleared', async () => {
    const wrapper = await mountPage()
    const store = useZakatStore()
    const fetchedGold = store.goldLocal

    await wrapper.find('#typed-gold').setValue('150000')
    expect(store.goldLocal).toBe(150000)
    expect(wrapper.find('.price-status-custom').exists()).toBe(true)

    await wrapper.find('#typed-gold').setValue('')
    expect(store.goldLocal).toBe(fetchedGold)
    expect(wrapper.find('.price-status-custom').exists()).toBe(false)
  })

  it('works out Zakat in naira from a dealer price and savings', async () => {
    const wrapper = await mountPage()

    await currencyButton(wrapper, 'NGN').trigger('click')
    await wrapper.find('#typed-gold').setValue('150000')
    await wrapper.find('input[placeholder="0.00"]').setValue(20000000)

    expect(wrapper.text()).toContain('₦12,750,000.00')
    expect(wrapper.find('.rb-amount').text()).toBe('₦500,000.00')
  })
})

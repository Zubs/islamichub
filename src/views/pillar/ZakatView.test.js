import { describe, it, expect } from 'vitest'
import ZakatView from './ZakatView.vue'
import { mountPage as mountView } from '../../../test/mountPage.js'
import { useZakatStore } from '@/stores/zakat.js'

async function mountPage() {
  return (await mountView(ZakatView, { path: '/zakat' })).wrapper
}

function currencyButton(wrapper, code) {
  return wrapper.findAll('.pill-btn').find((button) => button.text().includes(code))
}

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

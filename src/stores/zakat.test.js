import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useZakatStore } from './zakat.js'
import { calculateZakat, perGram, TROY_OUNCE_GRAMS } from '@/utils/zakat.js'

const SYMBOLS = { GBP: '£', USD: '$', EUR: '€', SAR: '﷼', NGN: '₦' }

function reply(overrides = {}) {
  return {
    date: '2026-11-03',
    usd: { xau: 1 / 4000, xag: 1 / 50, gbp: 0.75, eur: 0.9, sar: 3.75, ngn: 1500, ...overrides },
  }
}

function answering(body) {
  return async () => ({ ok: true, json: async () => body })
}

function failing() {
  return async () => {
    throw new TypeError('Failed to fetch')
  }
}

function neverAnswering() {
  return (url, { signal }) =>
    new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
    })
}

function stubFetch(...answers) {
  const fetch = vi.fn()
  answers.forEach((answer) => fetch.mockImplementationOnce(answer))
  vi.stubGlobal('fetch', fetch)
  return fetch
}

describe('zakat store prices', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('starts on reference prices, marked as not fetched', () => {
    const store = useZakatStore()

    expect(store.metalsFetched).toBe(false)
    expect(store.ratesFetched).toBe(false)
    expect(store.pricesDate).toBe('2026-10-12')
    expect(store.goldLocal).toBeGreaterThan(0)
    expect(store.silverLocal).toBeGreaterThan(0)
  })

  it('uses the first source when it answers', async () => {
    const fetch = stubFetch(answering(reply()))
    const store = useZakatStore()

    await store.fetchPrices()

    expect(fetch).toHaveBeenCalledOnce()
    expect(store.metalsFetched).toBe(true)
    expect(store.ratesFetched).toBe(true)
    expect(store.pricesDate).toBe('2026-11-03')
    expect(store.pricePerGram('gold', 'USD')).toBeCloseTo(4000 / TROY_OUNCE_GRAMS, 6)
  })

  it('uses the second source when the first fails', async () => {
    const fetch = stubFetch(failing(), answering(reply()))
    const store = useZakatStore()

    await store.fetchPrices()

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch.mock.calls[0][0]).not.toBe(fetch.mock.calls[1][0])
    expect(store.metalsFetched).toBe(true)
  })

  it('uses the second source when the first answers with an error status', async () => {
    stubFetch(async () => ({ ok: false, json: async () => ({}) }), answering(reply()))
    const store = useZakatStore()

    await store.fetchPrices()

    expect(store.metalsFetched).toBe(true)
  })

  it('keeps the reference prices when both sources fail', async () => {
    stubFetch(failing(), failing())
    const store = useZakatStore()
    const referenceGold = store.goldLocal

    await store.fetchPrices()

    expect(store.metalsFetched).toBe(false)
    expect(store.ratesFetched).toBe(false)
    expect(store.pricesDate).toBe('2026-10-12')
    expect(store.goldLocal).toBe(referenceGold)
    expect(store.pricesLoading).toBe(false)
  })

  it('abandons a source that does not answer within the time limit', async () => {
    vi.useFakeTimers()
    const fetch = stubFetch(neverAnswering(), answering(reply()))
    const store = useZakatStore()

    const finished = store.fetchPrices()
    await vi.advanceTimersByTimeAsync(6000)
    await finished

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(store.metalsFetched).toBe(true)
  })

  it('moves to the second source when the first has no valid metal price', async () => {
    const fetch = stubFetch(answering(reply({ xau: 0 })), answering(reply()))
    const store = useZakatStore()

    await store.fetchPrices()

    expect(fetch).toHaveBeenCalledTimes(2)
    expect(store.metalsFetched).toBe(true)
  })

  it('uses fetched metals with reference rates when a rate is missing', async () => {
    stubFetch(answering(reply({ sar: undefined })))
    const store = useZakatStore()
    const referenceRates = { ...store.rates }

    await store.fetchPrices()

    expect(store.metalsFetched).toBe(true)
    expect(store.ratesFetched).toBe(false)
    expect(store.rates).toEqual(referenceRates)
    expect(store.usdPerOunce.gold).toBeCloseTo(4000, 6)
  })

  it('prices pounds as the dollar price per gram times the pound rate, and nothing else', async () => {
    stubFetch(answering(reply()))
    const store = useZakatStore()

    await store.fetchPrices()

    expect(store.currency).toBe('GBP')
    expect(store.goldLocal).toBeCloseTo((4000 / TROY_OUNCE_GRAMS) * 0.75, 6)
    expect(store.silverLocal).toBeCloseTo((50 / TROY_OUNCE_GRAMS) * 0.75, 6)
  })

  it('prices pounds on the same base before any fetch', () => {
    const store = useZakatStore()

    expect(store.goldLocal).toBe(perGram(store.usdPerOunce.gold, store.rates.GBP))
  })

  it('returns to the first price after switching through every currency', async () => {
    stubFetch(answering(reply()))
    const store = useZakatStore()
    await store.fetchPrices()
    const firstPrice = store.goldLocal

    for (const code of ['USD', 'EUR', 'SAR', 'GBP']) {
      store.setCurrency(code, SYMBOLS[code])
    }

    expect(store.goldLocal).toBe(firstPrice)
  })

  it.each(['gold', 'silver'])(
    'shows the same %s nisab that the calculation uses',
    async (method) => {
      stubFetch(answering(reply()))
      const store = useZakatStore()
      await store.fetchPrices()
      store.setNisabMethod(method)

      const result = calculateZakat(
        { cashSavings: 100 },
        { goldPerGram: store.goldLocal, silverPerGram: store.silverLocal },
        store.nisabMethod,
      )

      expect(result.nisab).toBe(store.nisabValue)
    },
  )

  it('sends nothing the user entered', async () => {
    const fetch = stubFetch(answering(reply()))
    const store = useZakatStore()
    store.setCurrency('EUR', '€')
    store.setNisabMethod('silver')

    await store.fetchPrices()

    const [url, options] = fetch.mock.calls[0]
    expect(new URL(url).search).toBe('')
    expect(options.body).toBeUndefined()
    expect(options.method).toBeUndefined()
    expect(options.headers).toBeUndefined()
  })

  it('prices naira as the dollar price per gram times the naira rate', async () => {
    stubFetch(answering(reply()))
    const store = useZakatStore()
    await store.fetchPrices()

    store.setCurrency('NGN', '₦')

    expect(store.goldLocal).toBeCloseTo((4000 / TROY_OUNCE_GRAMS) * 1500, 6)
  })

  it('returns to the first naira price after switching through every currency', async () => {
    stubFetch(answering(reply()))
    const store = useZakatStore()
    await store.fetchPrices()
    store.setCurrency('NGN', '₦')
    const firstPrice = store.goldLocal

    for (const code of ['GBP', 'USD', 'EUR', 'SAR', 'NGN']) {
      store.setCurrency(code, SYMBOLS[code])
    }

    expect(store.goldLocal).toBe(firstPrice)
  })

  it('uses the built-in naira rate when rates cannot be fetched', async () => {
    stubFetch(answering(reply({ ngn: undefined })))
    const store = useZakatStore()
    await store.fetchPrices()

    store.setCurrency('NGN', '₦')

    expect(store.ratesFetched).toBe(false)
    expect(store.goldLocal).toBeCloseTo((4000 / TROY_OUNCE_GRAMS) * 1331.59, 6)
  })

  it('gives the other four currencies the figures they gave before the naira', () => {
    const store = useZakatStore()
    const expected = { GBP: 0.7555, USD: 1, EUR: 0.8928, SAR: 3.75 }

    for (const [code, rate] of Object.entries(expected)) {
      store.setCurrency(code, SYMBOLS[code])
      expect(store.goldLocal).toBe(perGram(4186.27, rate))
    }
  })

  it('shows large naira amounts in full with separators', () => {
    const store = useZakatStore()
    store.setCurrency('NGN', '₦')

    expect(store.fmt(25400000)).toBe('₦25,400,000.00')
    expect(store.fmt(0)).toBe('₦0.00')
  })

  it('uses a typed gold price for the price and the nisab', () => {
    const store = useZakatStore()
    store.setCurrency('NGN', '₦')
    const fetchedSilver = store.silverLocal

    store.setCustomPrice('gold', 150000)

    expect(store.goldLocal).toBe(150000)
    expect(store.nisabValue).toBe(85 * 150000)
    expect(store.silverLocal).toBe(fetchedSilver)
  })

  it('uses a typed silver price for the silver nisab', () => {
    const store = useZakatStore()
    store.setNisabMethod('silver')

    store.setCustomPrice('silver', 2)

    expect(store.nisabValue).toBe(595 * 2)
  })

  it('returns to the fetched price when a typed price is cleared', () => {
    const store = useZakatStore()
    const fetchedGold = store.goldLocal
    store.setCustomPrice('gold', 150000)

    store.setCustomPrice('gold', null)

    expect(store.goldLocal).toBe(fetchedGold)
  })

  it('clears typed prices when the currency changes', () => {
    const store = useZakatStore()
    store.setCustomPrice('gold', 150)

    store.setCurrency('NGN', '₦')

    expect(store.customPerGram).toEqual({ gold: null, silver: null })
    expect(store.goldLocal).toBe(store.pricePerGram('gold', 'NGN'))
  })

  it('sends no typed price with the price request', async () => {
    const fetch = stubFetch(answering(reply()))
    const store = useZakatStore()
    store.setCustomPrice('gold', 987654)

    await store.fetchPrices()

    expect(JSON.stringify(fetch.mock.calls[0])).not.toContain('987654')
  })

  it('fetches once per visit, however often prices are requested', async () => {
    const fetch = stubFetch(answering(reply()), answering(reply({ xau: 1 / 9000 })))
    const store = useZakatStore()

    await store.fetchPrices()
    await store.fetchPrices()

    expect(fetch).toHaveBeenCalledOnce()
    expect(store.usdPerOunce.gold).toBeCloseTo(4000, 6)
  })

  it('keeps fetched prices on the device and starts from them next time', async () => {
    stubFetch(answering(reply()))
    await useZakatStore().fetchPrices()
    setActivePinia(createPinia())
    stubFetch(failing(), failing())

    const store = useZakatStore()
    expect(store.pricesSaved).toBe(true)
    expect(store.pricesDate).toBe('2026-11-03')
    await store.fetchPrices()

    expect(store.metalsFetched).toBe(false)
    expect(store.usdPerOunce.gold).toBeCloseTo(4000, 6)
    expect(store.rates.NGN).toBe(1500)
  })

  it('has no saved prices before any fetch, and stores none when fetching fails', async () => {
    stubFetch(failing(), failing())
    const store = useZakatStore()

    await store.fetchPrices()

    expect(store.pricesSaved).toBe(false)
    expect(localStorage.getItem('zakat-prices')).toBeNull()
  })

  it.each(['not json', '{"usdPerOunce":{"gold":-4,"silver":50},"date":"2026-11-03"}'])(
    'ignores damaged saved prices of %s',
    (text) => {
      localStorage.setItem('zakat-prices', text)
      setActivePinia(createPinia())

      const store = useZakatStore()

      expect(store.pricesSaved).toBe(false)
      expect(store.pricesDate).toBe('2026-10-12')
    },
  )

  it('still fetches when storage refuses to keep the prices', async () => {
    stubFetch(answering(reply()))
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('full', 'QuotaExceededError')
    })
    const store = useZakatStore()

    await store.fetchPrices()
    setItem.mockRestore()

    expect(store.metalsFetched).toBe(true)
  })
})

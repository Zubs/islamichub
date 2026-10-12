import { describe, it, expect, vi, afterEach } from 'vitest'
import { useZakatStore } from './zakat.js'
import { calculateZakat, perGram, TROY_OUNCE_GRAMS } from '@/utils/zakat.js'

const SYMBOLS = { GBP: '£', USD: '$', EUR: '€', SAR: '﷼' }

function reply(overrides = {}) {
  return {
    date: '2026-11-03',
    usd: { xau: 1 / 4000, xag: 1 / 50, gbp: 0.75, eur: 0.9, sar: 3.75, ...overrides },
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
})

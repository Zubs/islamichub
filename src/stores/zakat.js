import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  perGram,
  nisabFor,
  parsePrices,
  GOLD_NISAB_GRAMS,
  SILVER_NISAB_GRAMS,
} from '@/utils/zakat.js'

const PRICE_SOURCES = [
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
  'https://latest.currency-api.pages.dev/v1/currencies/usd.json',
]
const SOURCE_TIME_LIMIT_MS = 6000

// Reference values on a US dollar base, used when today's prices cannot be fetched.
const REFERENCE_DATE = '2026-10-12'
const REFERENCE_USD_PER_OUNCE = { gold: 4186.27, silver: 60.83 }
const REFERENCE_RATES = { USD: 1, GBP: 0.7555, EUR: 0.8928, SAR: 3.75, NGN: 1331.59 }

async function fetchFrom(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SOURCE_TIME_LIMIT_MS)
  try {
    const response = await fetch(url, { cache: 'no-cache', signal: controller.signal })
    if (!response.ok) {
      throw new Error('prices fetch failed')
    }

    return parsePrices(await response.json())
  } finally {
    clearTimeout(timer)
  }
}

export const useZakatStore = defineStore('zakat', () => {
  // ── State ────────────────────────────────────────────────────
  const currency = ref('GBP')
  const sym = ref('£')
  const usdPerOunce = ref({ ...REFERENCE_USD_PER_OUNCE })
  const rates = ref({ ...REFERENCE_RATES })
  const metalsFetched = ref(false)
  const ratesFetched = ref(false)
  const pricesDate = ref(REFERENCE_DATE)
  const pricesLoading = ref(false)
  const customPerGram = ref({ gold: null, silver: null })
  const nisabMethod = ref('gold') // 'gold' | 'silver'
  const location = ref(null) // { lat, lng, name }
  const locationError = ref(null)
  const GOLD_NISAB_G = GOLD_NISAB_GRAMS
  const SILVER_NISAB_G = SILVER_NISAB_GRAMS

  // ── Computed ─────────────────────────────────────────────────
  function pricePerGram(metal, currencyCode) {
    return perGram(usdPerOunce.value[metal], rates.value[currencyCode])
  }

  const goldLocal = computed(() => customPerGram.value.gold ?? pricePerGram('gold', currency.value))
  const silverLocal = computed(
    () => customPerGram.value.silver ?? pricePerGram('silver', currency.value),
  )
  const nisabValue = computed(() =>
    nisabFor(nisabMethod.value, {
      goldPerGram: goldLocal.value,
      silverPerGram: silverLocal.value,
    }),
  )

  function fmt(n) {
    return (
      sym.value +
      Number(n).toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )
  }

  // ── Actions ──────────────────────────────────────────────────
  function setCurrency(c, s) {
    if (c !== currency.value) {
      customPerGram.value = { gold: null, silver: null }
    }
    currency.value = c
    sym.value = s
  }

  function setCustomPrice(metal, price) {
    customPerGram.value = { ...customPerGram.value, [metal]: price }
  }

  function setNisabMethod(m) {
    nisabMethod.value = m
  }

  function setLocation(loc) {
    location.value = loc
  }

  async function fetchPrices() {
    if (pricesLoading.value) {
      return
    }

    pricesLoading.value = true
    for (const url of PRICE_SOURCES) {
      try {
        const prices = await fetchFrom(url)
        if (!prices.usdPerOunce) {
          continue
        }

        usdPerOunce.value = prices.usdPerOunce
        metalsFetched.value = true
        pricesDate.value = prices.date
        if (prices.rates) {
          rates.value = prices.rates
          ratesFetched.value = true
        }
        break
      } catch {
        // try the next source; the values already held stay in use
      }
    }
    pricesLoading.value = false
  }

  async function requestLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        locationError.value = 'Geolocation not supported by your browser'
        return reject(locationError.value)
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords
          let name = 'Your location'
          try {
            const r = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            )
            if (r.ok) {
              const d = await r.json()
              name = d.address?.city || d.address?.town || d.address?.county || name
            }
          } catch {
            // ignore — use default name
          }
          location.value = { lat, lng, name }
          locationError.value = null
          resolve(location.value)
        },
        () => {
          locationError.value = 'Location access denied. Enter coordinates manually.'
          reject(locationError.value)
        },
        { timeout: 10000 },
      )
    })
  }

  return {
    currency,
    sym,
    usdPerOunce,
    rates,
    metalsFetched,
    ratesFetched,
    pricesDate,
    pricesLoading,
    customPerGram,
    nisabMethod,
    location,
    locationError,
    GOLD_NISAB_G,
    SILVER_NISAB_G,
    pricePerGram,
    goldLocal,
    silverLocal,
    nisabValue,
    fmt,
    setCurrency,
    setCustomPrice,
    setNisabMethod,
    setLocation,
    fetchPrices,
    requestLocation,
  }
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useTasbihStore } from './tasbih.js'
import { TASBIH_PHRASES } from '@/data/tasbihPhrases.js'
import { setTimezone, resetTimezone } from '../../test/timezone.js'

const CURRENT_KEY = 'tasbih-current-phrase'
const TOTALS_KEY = 'tasbih-totals'
const MIDDAY = new Date('2026-03-20T12:00:00Z')

function createStoreAgain() {
  setActivePinia(createPinia())
  return useTasbihStore()
}

function tapTimes(store, times) {
  for (let i = 0; i < times; i++) {
    store.tap()
  }
}

describe('tasbih store', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts on the first phrase with zero counts when nothing is stored', () => {
    const store = useTasbihStore()
    const [firstPhrase] = TASBIH_PHRASES

    expect(store.currentId).toBe(firstPhrase.id)
    expect(store.target).toBe(firstPhrase.defaultTarget)
    expect(store.count).toBe(0)
    expect(store.todayTotalForCurrent).toBe(0)
    expect(store.lifetimeTotalForCurrent).toBe(0)
    expect(store.todayTotalAllPhrases).toBe(0)
    expect(store.lifetimeTotalAllPhrases).toBe(0)
  })

  it('adds a tap to the session count and to the saved total for today', () => {
    const store = useTasbihStore()

    store.tap()

    expect(store.count).toBe(1)
    expect(store.todayTotalForCurrent).toBe(1)
    expect(createStoreAgain().todayTotalForCurrent).toBe(1)
  })

  it('keeps totals when the session count is reset', () => {
    const store = useTasbihStore()
    tapTimes(store, 5)

    store.reset()

    expect(store.count).toBe(0)
    expect(store.todayTotalForCurrent).toBe(5)
  })

  it.each([
    [0, 1],
    [-5, 1],
    [10.6, 11],
  ])('turns a custom target of %d into %d', (input, expected) => {
    const store = useTasbihStore()

    store.setTarget(input)

    expect(store.target).toBe(expected)
  })

  it('resets the count and target when the phrase changes, and remembers the choice', async () => {
    const store = useTasbihStore()
    const otherPhrase = TASBIH_PHRASES[3]
    tapTimes(store, 3)

    store.selectPhrase(otherPhrase.id)
    await nextTick()

    expect(store.count).toBe(0)
    expect(store.target).toBe(otherPhrase.defaultTarget)
    expect(localStorage.getItem(CURRENT_KEY)).toBe(otherPhrase.id)
    expect(createStoreAgain().currentId).toBe(otherPhrase.id)
  })

  it('adds up totals for the current phrase and for all phrases, today and overall', () => {
    vi.useFakeTimers()
    vi.setSystemTime(MIDDAY)
    localStorage.setItem(
      TOTALS_KEY,
      JSON.stringify({
        '2026-03-19': { subhanallah: 10 },
        '2026-03-20': { subhanallah: 2, alhamdulillah: 5 },
      }),
    )

    const store = useTasbihStore()

    expect(store.todayTotalForCurrent).toBe(2)
    expect(store.lifetimeTotalForCurrent).toBe(12)
    expect(store.todayTotalAllPhrases).toBe(7)
    expect(store.lifetimeTotalAllPhrases).toBe(17)
  })

  it('loads with zero totals when the stored totals are not valid JSON', () => {
    localStorage.setItem(TOTALS_KEY, '{not json')

    const store = useTasbihStore()

    expect(store.todayTotalAllPhrases).toBe(0)
    expect(store.lifetimeTotalAllPhrases).toBe(0)
  })
})

function storedTotals() {
  return JSON.parse(localStorage.getItem(TOTALS_KEY))
}

describe('tasbih store and the local day', () => {
  afterEach(resetTimezone)

  it('adds a tap at 00:30 in New York to the new local date', () => {
    setTimezone('America/New_York', '2026-03-21T04:30:00Z')
    const store = useTasbihStore()

    store.tap()

    expect(storedTotals()).toEqual({ '2026-03-21': { subhanallah: 1 } })
    expect(store.todayTotalForCurrent).toBe(1)
  })

  it('adds a tap at 21:00 in New York to the local date, not the UTC one', () => {
    setTimezone('America/New_York', '2026-03-21T01:00:00Z')
    const store = useTasbihStore()

    store.tap()

    expect(storedTotals()).toEqual({ '2026-03-20': { subhanallah: 1 } })
  })

  it('splits taps either side of local midnight between the two days', () => {
    setTimezone('Africa/Lagos', '2026-03-20T22:30:00Z')
    const store = useTasbihStore()
    tapTimes(store, 3)

    vi.setSystemTime(new Date('2026-03-20T23:30:00Z'))
    tapTimes(store, 2)

    expect(storedTotals()).toEqual({
      '2026-03-20': { subhanallah: 3 },
      '2026-03-21': { subhanallah: 2 },
    })
    expect(store.todayTotalForCurrent).toBe(2)
    expect(store.lifetimeTotalForCurrent).toBe(5)
  })
})

describe('tasbih store and stored data', () => {
  afterEach(resetTimezone)

  it('counts totals saved by the previous version towards lifetime totals', () => {
    setTimezone('UTC', '2026-03-20T12:00:00Z')
    const saved = JSON.stringify({
      '2026-03-10': { subhanallah: 33, alhamdulillah: 33 },
      '2026-03-11': { subhanallah: 10 },
    })
    localStorage.setItem(TOTALS_KEY, saved)

    const store = useTasbihStore()

    expect(store.lifetimeTotalForCurrent).toBe(43)
    expect(store.lifetimeTotalAllPhrases).toBe(76)
    expect(localStorage.getItem(TOTALS_KEY)).toBe(saved)
  })

  it.each(['null', '42', '[1, 2]'])(
    'loads with zero totals when the stored totals are %s, and still saves afterwards',
    (text) => {
      setTimezone('UTC', '2026-03-20T12:00:00Z')
      localStorage.setItem(TOTALS_KEY, text)
      const store = useTasbihStore()

      expect(store.todayTotalAllPhrases).toBe(0)
      expect(store.lifetimeTotalAllPhrases).toBe(0)

      store.tap()

      expect(storedTotals()).toEqual({ '2026-03-20': { subhanallah: 1 } })
    },
  )
})

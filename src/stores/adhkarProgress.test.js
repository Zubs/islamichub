import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAdhkarStore } from './adhkar.js'
import { useTasbihStore } from './tasbih.js'
import { getAdhkarByCategory } from '@/data/adhkar.js'
import { keepEntries } from '@/utils/storage.js'

const PROGRESS_KEY = 'adhkar-progress'
const MORNING_ONLY_WITH_EVENING = 'sayyid-al-istighfar'
const SLEEP_ONLY = 'bismika-amutu-wa-ahya'
const SHARED = 'ayat-al-kursi'
const MULTI_PART = 'tasbih-fatimah'

function reload() {
  setActivePinia(createPinia())
  return useAdhkarStore()
}

function at(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
}

describe('keepEntries', () => {
  it('keeps the entries that pass and drops the rest', () => {
    expect(keepEntries({ a: 1, b: null, c: 'x', d: 4 }, Number.isInteger)).toEqual({ a: 1, d: 4 })
    expect(keepEntries({}, Number.isInteger)).toEqual({})
  })
})

describe('adhkar progress', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('starts every card at zero when nothing is saved', () => {
    const store = useAdhkarStore()

    expect(store.progress).toEqual({})
    expect(store.progressFor(SHARED)).toBe(0)
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull()
  })

  it('shows three after three taps and a reload', () => {
    const store = useAdhkarStore()
    for (let tap = 0; tap < 3; tap += 1) {
      store.tap('subhanallahi-wa-bihamdihi', 100)
    }

    expect(reload().progressFor('subhanallahi-wa-bihamdihi')).toBe(3)
  })

  it('restores counts on several cards in different categories', () => {
    const store = useAdhkarStore()
    store.tap(MORNING_ONLY_WITH_EVENING, 1)
    store.tap(SLEEP_ONLY, 1)
    store.tap('la-hawla-wala-quwwata', 10)
    store.tap('la-hawla-wala-quwwata', 10)

    const after = reload()

    expect(after.progressFor(MORNING_ONLY_WITH_EVENING)).toBe(1)
    expect(after.progressFor(SLEEP_ONLY)).toBe(1)
    expect(after.progressFor('la-hawla-wala-quwwata')).toBe(2)
  })

  it('shows the same count in both categories of a shared dhikr', () => {
    const morning = getAdhkarByCategory('morning').find((dhikr) => dhikr.id === SHARED)
    const evening = getAdhkarByCategory('evening').find((dhikr) => dhikr.id === SHARED)
    useAdhkarStore().tap(morning.id, 3)

    expect(reload().progressFor(evening.id)).toBe(1)
  })

  it('restores the counts of each part of a multi-part dhikr', () => {
    const store = useAdhkarStore()
    store.tap(`${MULTI_PART}:0`, 33)
    store.tap(`${MULTI_PART}:1`, 33)
    store.tap(`${MULTI_PART}:1`, 33)

    const after = reload()

    expect(after.progressFor(`${MULTI_PART}:0`)).toBe(1)
    expect(after.progressFor(`${MULTI_PART}:1`)).toBe(2)
  })

  it('discards counts saved yesterday', () => {
    at(new Date(2026, 2, 20, 21, 0))
    useAdhkarStore().tap(SHARED, 3)

    at(new Date(2026, 2, 21, 6, 0))

    expect(reload().progressFor(SHARED)).toBe(0)
  })

  it('keeps counts made late at night until local midnight', () => {
    at(new Date(2026, 2, 20, 23, 59))
    useAdhkarStore().tap(SHARED, 3)

    expect(reload().progressFor(SHARED)).toBe(1)

    at(new Date(2026, 2, 21, 0, 1))
    expect(reload().progressFor(SHARED)).toBe(0)
  })

  it('reloads a card at its target, and one more tap resets it to zero', () => {
    const store = useAdhkarStore()
    for (let tap = 0; tap < 3; tap += 1) {
      store.tap(SHARED, 3)
    }

    const after = reload()
    expect(after.progressFor(SHARED)).toBe(3)

    after.tap(SHARED, 3)
    expect(after.progressFor(SHARED)).toBe(0)
    expect(reload().progressFor(SHARED)).toBe(0)
  })

  it("clears a completed category's counts, parts included, and leaves other categories alone", () => {
    const store = useAdhkarStore()
    store.tap('astaghfirullah-after-salah', 3)
    store.tap(`${MULTI_PART}:0`, 33)
    store.tap('la-hawla-wala-quwwata', 10)
    store.tap('alhamdulillah-waking', 1)

    store.completeCategory('after-salah')
    const after = reload()

    expect(after.progressFor('astaghfirullah-after-salah')).toBe(0)
    expect(after.progressFor(`${MULTI_PART}:0`)).toBe(0)
    expect(after.progressFor('la-hawla-wala-quwwata')).toBe(1)
    expect(after.progressFor('alhamdulillah-waking')).toBe(1)
    expect(after.isCategoryCompletedToday('after-salah')).toBe(true)
  })

  it.each([
    'not json',
    'null',
    '[1, 2]',
    '42',
    '{"day":"2026-03-20"}',
    '{"day":"2026-03-20","counts":null}',
    '{"day":"2026-03-20","counts":[3]}',
  ])('treats saved counts of %s as none', (text) => {
    at(new Date(2026, 2, 20, 12, 0))
    localStorage.setItem(PROGRESS_KEY, text)

    const store = reload()

    expect(store.progress).toEqual({})
    expect(() => store.tap(SHARED, 3)).not.toThrow()
    expect(reload().progressFor(SHARED)).toBe(1)
  })

  it('ignores a count that is null, a number below one, a fraction or text', () => {
    at(new Date(2026, 2, 20, 12, 0))
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({
        day: '2026-03-20',
        counts: { a: null, b: 0, c: -2, d: 1.5, e: 'three', [SHARED]: 2 },
      }),
    )

    expect(reload().progress).toEqual({ [SHARED]: 2 })
  })

  it('keeps counting for the visit when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const store = useAdhkarStore()

    expect(() => store.tap(SHARED, 3)).not.toThrow()
    expect(store.progressFor(SHARED)).toBe(1)
  })

  it('lets a user stop half-way through the morning adhkar, return and carry on', () => {
    const morning = getAdhkarByCategory('morning')
    const half = morning.slice(0, Math.ceil(morning.length / 2)).filter((dhikr) => !dhikr.parts)
    const store = useAdhkarStore()
    for (const dhikr of half) {
      for (let tap = 0; tap < dhikr.repeat; tap += 1) {
        store.tap(dhikr.id, dhikr.repeat)
      }
    }

    const back = reload()
    for (const dhikr of half) {
      expect(back.progressFor(dhikr.id)).toBe(dhikr.repeat)
    }
    const next = morning.find((dhikr) => !dhikr.parts && !half.includes(dhikr))
    back.tap(next.id, next.repeat)

    expect(reload().progressFor(next.id)).toBe(1)
  })
})

describe('damaged entries inside stored records', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([null, 7, 'morning', { morning: true }, [1, 2]])(
    'ignores a completion day whose value is %j',
    (value) => {
      at(new Date(2026, 2, 20, 12, 0))
      localStorage.setItem(
        'adhkar-completion-log',
        JSON.stringify({ '2026-03-19': value, '2026-03-20': ['morning'] }),
      )

      const store = reload()

      expect(store.isCategoryCompletedToday('morning')).toBe(true)
      expect(store.streakForCategory('morning')).toBe(1)
      expect(() => store.completeCategory('evening')).not.toThrow()
    },
  )

  it('counts a streak from the good days beside a damaged day', () => {
    at(new Date(2026, 2, 20, 12, 0))
    localStorage.setItem(
      'adhkar-completion-log',
      JSON.stringify({
        '2026-03-17': null,
        '2026-03-18': ['morning'],
        '2026-03-19': ['morning'],
        '2026-03-20': ['morning'],
      }),
    )

    expect(reload().streakForCategory('morning')).toBe(3)
  })

  it.each([null, 5, 'many', [3]])('ignores a tasbih day whose value is %j', (value) => {
    at(new Date(2026, 2, 20, 12, 0))
    localStorage.setItem(
      'tasbih-totals',
      JSON.stringify({ '2026-03-19': value, '2026-03-20': { subhanallah: 33 } }),
    )
    setActivePinia(createPinia())

    const store = useTasbihStore()

    expect(store.todayTotalAllPhrases).toBe(33)
    expect(store.lifetimeTotalAllPhrases).toBe(33)
    expect(() => store.tap()).not.toThrow()
    expect(store.todayTotalAllPhrases).toBe(34)
  })

  it('ignores a tasbih count that is not a number and totals the rest', () => {
    at(new Date(2026, 2, 20, 12, 0))
    localStorage.setItem(
      'tasbih-totals',
      JSON.stringify({ '2026-03-20': { subhanallah: 'lots', alhamdulillah: 10, other: null } }),
    )
    setActivePinia(createPinia())

    expect(useTasbihStore().todayTotalAllPhrases).toBe(10)
  })
})

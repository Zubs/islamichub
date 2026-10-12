import { describe, it, expect, vi, afterEach } from 'vitest'
import { useAdhkarStore } from './adhkar.js'
import { ADHKAR, ADHKAR_CATEGORIES, getAdhkarByCategory } from '@/data/adhkar.js'
import { setTimezone, resetTimezone } from '../../test/timezone.js'

const LOG_KEY = 'adhkar-completion-log'
const MIDDAY = new Date('2026-03-20T12:00:00Z')
const TODAY = '2026-03-20'

function storedLog() {
  return JSON.parse(localStorage.getItem(LOG_KEY))
}

describe('adhkar store', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with no counts, completions or streaks when nothing is stored', () => {
    const store = useAdhkarStore()

    for (const dhikr of ADHKAR) {
      expect(store.progressFor(dhikr.id)).toBe(0)
    }

    for (const category of ADHKAR_CATEGORIES) {
      expect(store.isCategoryCompletedToday(category.slug)).toBe(false)
      expect(store.streakForCategory(category.slug)).toBe(0)
    }
  })

  it('resets a count to zero when tapped once past its target', () => {
    const store = useAdhkarStore()

    store.tap('three-quls', 3)
    store.tap('three-quls', 3)
    store.tap('three-quls', 3)
    expect(store.progressFor('three-quls')).toBe(3)

    store.tap('three-quls', 3)
    expect(store.progressFor('three-quls')).toBe(0)
  })

  it('records a category once when completed twice in a day, and clears its counts', () => {
    vi.useFakeTimers()
    vi.setSystemTime(MIDDAY)
    const store = useAdhkarStore()
    const [firstMorningDhikr] = getAdhkarByCategory('morning')
    store.tap(firstMorningDhikr.id, firstMorningDhikr.repeat)

    store.completeCategory('morning')
    store.completeCategory('morning')

    expect(storedLog()).toEqual({ [TODAY]: ['morning'] })
    expect(store.isCategoryCompletedToday('morning')).toBe(true)
    expect(store.progressFor(firstMorningDhikr.id)).toBe(0)
  })

  it('counts a streak across consecutive days ending today', () => {
    vi.useFakeTimers()
    vi.setSystemTime(MIDDAY)
    localStorage.setItem(
      LOG_KEY,
      JSON.stringify({
        '2026-03-18': ['morning'],
        '2026-03-19': ['morning'],
        [TODAY]: ['morning'],
      }),
    )

    expect(useAdhkarStore().streakForCategory('morning')).toBe(3)
  })

  it('gives a streak of zero when today is not complete', () => {
    vi.useFakeTimers()
    vi.setSystemTime(MIDDAY)
    localStorage.setItem(
      LOG_KEY,
      JSON.stringify({ '2026-03-18': ['morning'], '2026-03-19': ['morning'] }),
    )

    expect(useAdhkarStore().streakForCategory('morning')).toBe(0)
  })

  it('loads as empty when the stored log is not valid JSON', () => {
    localStorage.setItem(LOG_KEY, '{not json')

    const store = useAdhkarStore()

    expect(store.completionLog).toEqual({})
    expect(store.isCategoryCompletedToday('morning')).toBe(false)
  })
})

describe('adhkar store and the local day', () => {
  afterEach(resetTimezone)

  it.each(['Africa/Lagos', 'Europe/London', 'America/New_York'])(
    'has nothing complete today in %s when nothing is recorded',
    (zone) => {
      setTimezone(zone, '2026-03-20T22:30:00Z')

      expect(useAdhkarStore().isCategoryCompletedToday('morning')).toBe(false)
    },
  )

  it('records a completion at 23:30 in Lagos under the local date', () => {
    setTimezone('Africa/Lagos', '2026-03-20T22:30:00Z')
    const store = useAdhkarStore()

    store.completeCategory('morning')

    expect(storedLog()).toEqual({ '2026-03-20': ['morning'] })
    expect(store.isCategoryCompletedToday('morning')).toBe(true)
  })

  it('starts a new day at local midnight', () => {
    setTimezone('Africa/Lagos', '2026-03-20T22:30:00Z')
    const store = useAdhkarStore()
    store.completeCategory('morning')

    vi.setSystemTime(new Date('2026-03-20T23:30:00Z'))

    expect(store.isCategoryCompletedToday('morning')).toBe(false)
  })

  it.each([
    ['Africa/Lagos', ['2026-03-17T23:30:00Z', '2026-03-18T23:30:00Z', '2026-03-19T23:30:00Z']],
    ['Europe/London', ['2026-03-18T12:00:00Z', '2026-03-19T12:00:00Z', '2026-03-20T12:00:00Z']],
    ['America/New_York', ['2026-03-19T01:00:00Z', '2026-03-20T01:00:00Z', '2026-03-21T01:00:00Z']],
  ])('counts a streak of 3 for three local days in a row in %s', (zone, instants) => {
    setTimezone(zone, instants[0])
    const store = useAdhkarStore()

    for (const instant of instants) {
      vi.setSystemTime(new Date(instant))
      store.completeCategory('morning')
    }

    expect(Object.keys(storedLog())).toEqual(['2026-03-18', '2026-03-19', '2026-03-20'])
    expect(store.streakForCategory('morning')).toBe(3)
  })

  it('counts a streak across a month end', () => {
    setTimezone('UTC', '2026-02-01T12:00:00Z')
    localStorage.setItem(
      LOG_KEY,
      JSON.stringify({ '2026-01-31': ['morning'], '2026-02-01': ['morning'] }),
    )

    expect(useAdhkarStore().streakForCategory('morning')).toBe(2)
  })

  it('counts a streak across the clocks going forward in London', () => {
    setTimezone('Europe/London', '2026-03-29T23:30:00Z')
    localStorage.setItem(
      LOG_KEY,
      JSON.stringify({
        '2026-03-28': ['morning'],
        '2026-03-29': ['morning'],
        '2026-03-30': ['morning'],
      }),
    )

    expect(useAdhkarStore().streakForCategory('morning')).toBe(3)
  })

  it('stops a streak at a missed day', () => {
    setTimezone('UTC', '2026-03-20T12:00:00Z')
    localStorage.setItem(
      LOG_KEY,
      JSON.stringify({ '2026-03-18': ['morning'], '2026-03-20': ['morning'] }),
    )

    expect(useAdhkarStore().streakForCategory('morning')).toBe(1)
  })
})

describe('adhkar store and stored data', () => {
  afterEach(resetTimezone)

  it('reads a log saved by the previous version without rewriting it', () => {
    setTimezone('UTC', '2026-03-20T12:00:00Z')
    const saved = JSON.stringify({
      '2026-03-18': ['morning', 'evening'],
      '2026-03-19': ['morning'],
      '2026-03-20': ['morning'],
    })
    localStorage.setItem(LOG_KEY, saved)

    const store = useAdhkarStore()

    expect(store.streakForCategory('morning')).toBe(3)
    expect(store.isCategoryCompletedToday('morning')).toBe(true)
    expect(localStorage.getItem(LOG_KEY)).toBe(saved)
  })

  it.each(['null', '42', '[1, 2]'])(
    'loads as empty when the stored log is %s, and still saves afterwards',
    (text) => {
      setTimezone('UTC', '2026-03-20T12:00:00Z')
      localStorage.setItem(LOG_KEY, text)
      const store = useAdhkarStore()

      expect(store.isCategoryCompletedToday('morning')).toBe(false)
      expect(store.streakForCategory('morning')).toBe(0)

      store.completeCategory('morning')

      expect(storedLog()).toEqual({ '2026-03-20': ['morning'] })
    },
  )
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { useAdhkarStore } from './adhkar.js'
import { ADHKAR, ADHKAR_CATEGORIES, getAdhkarByCategory } from '@/data/adhkar.js'

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

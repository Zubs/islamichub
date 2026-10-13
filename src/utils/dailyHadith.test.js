import { describe, it, expect, afterEach } from 'vitest'
import { dailyHadithFor } from './dailyHadith.js'
import { DAILY_HADITHS } from '@/data/dailyHadith.js'
import { dayKey, addDays } from '@/utils/day.js'
import { BOOKS_META } from '@/composables/useHadithApi.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { setTimezone, resetTimezone } from '../../test/timezone.js'

describe('daily hadith list', () => {
  it('holds at least 60 hadiths', () => {
    expect(DAILY_HADITHS.length).toBeGreaterThanOrEqual(60)
  })

  it('gives every entry text, a narrator and a reference that links to the library', () => {
    const held = BOOKS_META.map((book) => book.slug)

    for (const hadith of DAILY_HADITHS) {
      expect(hadith.text.length, hadith.reference).toBeGreaterThan(30)
      expect(hadith.narrator.length, hadith.reference).toBeGreaterThan(2)
      expect(held).toContain(hadith.book)
      const [reference, ...others] = hadithRefsIn(hadith.reference)
      expect(others).toEqual([])
      expect(reference).toMatchObject({ book: hadith.book, number: hadith.number })
    }
  })

  it('repeats no hadith', () => {
    expect(new Set(DAILY_HADITHS.map((hadith) => hadith.reference)).size).toBe(DAILY_HADITHS.length)
    expect(new Set(DAILY_HADITHS.map((hadith) => hadith.text)).size).toBe(DAILY_HADITHS.length)
  })

  it('keeps each text short enough to read on a card', () => {
    for (const hadith of DAILY_HADITHS) {
      expect(hadith.text.length, hadith.reference).toBeLessThanOrEqual(450)
    }
  })
})

describe('dailyHadithFor', () => {
  const list = ['a', 'b', 'c']

  afterEach(() => {
    resetTimezone()
  })

  it('gives nothing for an empty list', () => {
    expect(dailyHadithFor('2026-10-12', [])).toBeNull()
  })

  it('gives the same hadith every time on one date', () => {
    expect(dailyHadithFor('2026-10-12', DAILY_HADITHS)).toBe(
      dailyHadithFor('2026-10-12', DAILY_HADITHS),
    )
  })

  it('gives a different hadith on the next date', () => {
    expect(dailyHadithFor('2026-10-13', DAILY_HADITHS)).not.toBe(
      dailyHadithFor('2026-10-12', DAILY_HADITHS),
    )
  })

  it('starts again from the first after the last', () => {
    const first = '2026-10-12'
    const shown = [0, 1, 2, 3, 4, 5].map((days) => dailyHadithFor(addDays(first, days), list))

    expect(shown.slice(0, 3).sort()).toEqual(['a', 'b', 'c'])
    expect(shown.slice(3)).toEqual(shown.slice(0, 3))
  })

  it('shows every hadith once before any repeats', () => {
    const start = '2026-01-01'
    const shown = DAILY_HADITHS.map((_, days) =>
      dailyHadithFor(addDays(start, days), DAILY_HADITHS),
    )

    expect(new Set(shown).size).toBe(DAILY_HADITHS.length)
    expect(dailyHadithFor(addDays(start, DAILY_HADITHS.length), DAILY_HADITHS)).toBe(shown[0])
  })

  it('moves across a month end, a year end and a leap day without skipping', () => {
    for (const key of ['2026-01-31', '2026-12-31', '2028-02-28', '2028-02-29']) {
      const today = DAILY_HADITHS.indexOf(dailyHadithFor(key, DAILY_HADITHS))
      const tomorrow = DAILY_HADITHS.indexOf(dailyHadithFor(addDays(key, 1), DAILY_HADITHS))

      expect(tomorrow).toBe((today + 1) % DAILY_HADITHS.length)
    }
  })

  it.each(['Africa/Lagos', 'America/New_York', 'Asia/Tokyo'])(
    'changes at local midnight in %s, not UTC midnight',
    (zone) => {
      setTimezone(zone, '2026-10-12T12:00:00Z')
      const beforeMidnight = dayKey(new Date(2026, 9, 12, 23, 59, 59))
      const afterMidnight = dayKey(new Date(2026, 9, 13, 0, 0, 1))

      expect(dailyHadithFor(afterMidnight, DAILY_HADITHS)).not.toBe(
        dailyHadithFor(beforeMidnight, DAILY_HADITHS),
      )
      expect(dailyHadithFor(afterMidnight, DAILY_HADITHS)).toBe(
        dailyHadithFor('2026-10-13', DAILY_HADITHS),
      )
    },
  )
})

import { describe, it, expect } from 'vitest'
import {
  kindsOn,
  isKindOn,
  kindBeginsTomorrow,
  shiftMonth,
  daysOfMonth,
  monthGrid,
  marksIn,
} from './islamicDays.js'
import { firstDayOfHijriMonth, daysToRamadan, toHijri } from './hijri.js'
import { dayKey, addDays } from './day.js'
import { ISLAMIC_DAYS } from '@/data/islamicDays.js'
import content from '@/data/content/calendar/en.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { HADITH_NUMBER_MAP } from '@/data/hadithNumbering.js'
import ayahCounts from '../../test/fixtures/ayahCounts.json'

const YEAR = 1448

function hijriDay(month, day, year = YEAR) {
  const first = firstDayOfHijriMonth(year, month)
  return new Date(first.getFullYear(), first.getMonth(), first.getDate() + day - 1)
}

function keysOn(date) {
  return kindsOn(date).map((kind) => kind.key)
}

describe('the days marked', () => {
  it('marks the 9th of Muharram as Tasu‘a and the 10th as ‘Ashura', () => {
    expect(kindsOn(hijriDay(1, 9))).toContainEqual({ key: 'ashura', label: 'tasua' })
    expect(kindsOn(hijriDay(1, 10))).toContainEqual({ key: 'ashura', label: 'ashura' })
    expect(isKindOn('ashura', hijriDay(1, 11))).toBe(false)
  })

  it('marks the 13th, 14th and 15th of every month as the white days', () => {
    for (let month = 1; month <= 12; month += 1) {
      for (const day of [13, 14, 15]) {
        expect(keysOn(hijriDay(month, day)), `${month}/${day}`).toContain('white-days')
      }
      expect(keysOn(hijriDay(month, 12))).not.toContain('white-days')
    }
  })

  it('marks Dhul Hijjah’s first ten days, ‘Arafah on the 9th and Eid on the 10th', () => {
    expect(keysOn(hijriDay(12, 1))).toContain('dhul-hijjah')
    expect(keysOn(hijriDay(12, 9))).toEqual(expect.arrayContaining(['dhul-hijjah', 'arafah']))
    expect(kindsOn(hijriDay(12, 10))).toContainEqual({ key: 'eid', label: 'adha' })
    expect(keysOn(hijriDay(12, 11))).not.toContain('dhul-hijjah')
  })

  it('marks Ramadan from the 21st to its last day', () => {
    const days = daysOfMonth(YEAR, 9)
    expect(isKindOn('last-ten', days[19].date)).toBe(false)
    expect(days.slice(20).every((day) => isKindOn('last-ten', day.date))).toBe(true)
    expect(isKindOn('last-ten', hijriDay(10, 1))).toBe(false)
  })

  it('marks Mondays and Thursdays by the day of the week', () => {
    const monday = new Date(2026, 9, 19)
    expect(kindsOn(monday)).toContainEqual({ key: 'monday-thursday', label: 'monday' })
    expect(kindsOn(new Date(2026, 9, 22))).toContainEqual({
      key: 'monday-thursday',
      label: 'thursday',
    })
    expect(isKindOn('monday-thursday', new Date(2026, 9, 20))).toBe(false)
  })

  it('marks nothing in Rabi‘ al-Awwal or Sha‘ban beyond the days of every month', () => {
    for (const month of [3, 8]) {
      const keys = new Set(daysOfMonth(YEAR, month).flatMap((day) => keysOn(day.date)))
      expect([...keys].sort()).toEqual(['monday-thursday', 'white-days'])
    }
  })
})

describe('the month', () => {
  it('starts on the site’s first day of the month and runs 29 or 30 days', () => {
    for (let month = 1; month <= 12; month += 1) {
      const days = daysOfMonth(YEAR, month)
      expect(days[0].dayKey).toBe(dayKey(firstDayOfHijriMonth(YEAR, month)))
      expect([29, 30]).toContain(days.length)
      expect(days.every((day) => toHijri(day.date).day === day.hijriDay)).toBe(true)
    }
  })

  it('comes back to the same month after twelve', () => {
    expect(shiftMonth({ year: YEAR, month: 5 }, 12)).toEqual({ year: YEAR + 1, month: 5 })
    expect(shiftMonth({ year: YEAR, month: 1 }, -1)).toEqual({ year: YEAR - 1, month: 12 })
  })

  it('agrees with the Ramadan countdown', () => {
    const first = dayKey(firstDayOfHijriMonth(YEAR, 9))
    expect(daysToRamadan(addDays(first, -1))).toBe(1)
    expect(daysToRamadan(first)).toBe(0)
  })

  it('lays the month out in weeks of seven, Monday first', () => {
    const weeks = monthGrid(YEAR, 1)
    const days = weeks.flat().filter(Boolean)
    expect(weeks.every((week) => week.length === 7)).toBe(true)
    expect(days).toHaveLength(daysOfMonth(YEAR, 1).length)
    const firstCell = weeks[0].findIndex(Boolean)
    expect(firstCell).toBe((days[0].date.getDay() + 6) % 7)
  })

  it('lists a kind that recurs once, with all its days', () => {
    const marks = marksIn(YEAR, 4)
    const white = marks.filter((mark) => mark.key === 'white-days')
    expect(white).toHaveLength(1)
    expect(white[0].days.map((day) => day.hijriDay)).toEqual([13, 14, 15])
  })
})

describe('the evening reminder', () => {
  it('falls on the day before a kind begins, not inside it', () => {
    expect(kindBeginsTomorrow('arafah', hijriDay(12, 8))).toBe(true)
    expect(kindBeginsTomorrow('arafah', hijriDay(12, 9))).toBe(false)
    expect(kindBeginsTomorrow('dhul-hijjah', hijriDay(12, 1))).toBe(false)
    expect(kindBeginsTomorrow('monday-thursday', new Date(2026, 9, 18))).toBe(true)
    expect(kindBeginsTomorrow('monday-thursday', new Date(2026, 9, 19))).toBe(false)
  })
})

describe('the day data', () => {
  const QURAN = /Qur[’']an (\d+):(\d+)/

  it.each(ISLAMIC_DAYS.map((kind) => [kind.key, kind]))(
    '%s has words, and references that exist',
    (key, kind) => {
      const words = content[key]
      expect(words?.name).toBeTruthy()
      expect(words?.text).toBeTruthy()
      for (const rule of kind.rules.filter((each) => each.label)) {
        expect(words[rule.label], rule.label).toBeTruthy()
      }
      for (const reference of kind.references) {
        expect(words.text, reference).toContain(reference.replace("'", '’'))
        const verse = reference.match(QURAN)
        if (verse) {
          expect(Number(verse[2])).toBeLessThanOrEqual(ayahCounts[Number(verse[1]) - 1])
          continue
        }
        const [ref] = hadithRefsIn(reference)
        expect(ref, reference).toBeDefined()
        if (ref.book === 'sahih-muslim') {
          expect(HADITH_NUMBER_MAP['sahih-muslim'][ref.number], reference).toBeDefined()
        }
        if (!/^Sahih (Bukhari|Muslim)/.test(reference)) {
          expect(words.text, reference).toMatch(new RegExp(`${reference}, graded`))
        }
      }
    },
  )
})

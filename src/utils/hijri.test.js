import { describe, it, expect } from 'vitest'
import { toHijri, firstDayOfHijriMonth, daysToRamadan } from './hijri.js'
import { dayKey, addDays } from './day.js'

function neighbouringDays(date) {
  return [-1, 0, 1].map(
    (offset) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset),
  )
}

describe('toHijri', () => {
  it.each([
    ['1 March 2025', new Date(2025, 2, 1), { year: 1446, month: 9, day: 1 }],
    ['18 February 2026', new Date(2026, 1, 18), { year: 1447, month: 9, day: 1 }],
    ['7 July 2024', new Date(2024, 6, 7), { year: 1446, month: 1, day: 1 }],
  ])('converts %s to within one day of the expected date', (_label, date, expected) => {
    const candidates = neighbouringDays(date).map((day) => {
      const { year, month, day: hijriDay } = toHijri(day)
      return { year, month, day: hijriDay }
    })

    expect(candidates).toContainEqual(expected)
  })

  it.each([
    new Date(2024, 0, 1),
    new Date(2025, 5, 15),
    new Date(2026, 9, 12),
    new Date(2027, 11, 31),
  ])('returns a valid day and month for %s', (date) => {
    const hijri = toHijri(date)

    expect(hijri.day).toBeGreaterThanOrEqual(1)
    expect(hijri.day).toBeLessThanOrEqual(30)
    expect(hijri.month).toBeGreaterThanOrEqual(1)
    expect(hijri.month).toBeLessThanOrEqual(12)
  })
})

describe('daysToRamadan', () => {
  const RAMADAN = 9
  const DAY_MS = 86400000

  function dateOf(day) {
    const [year, month, date] = day.split('-').map(Number)
    return new Date(year, month - 1, date)
  }

  function calendarCount(day) {
    const hijri = toHijri(dateOf(day))
    if (hijri.month === RAMADAN) {
      return 0
    }
    const year = hijri.month < RAMADAN ? hijri.year : hijri.year + 1
    return Math.round((firstDayOfHijriMonth(year, RAMADAN) - dateOf(day)) / DAY_MS)
  }

  it('agrees with the calendar on every day of a Hijri year', () => {
    const first = dayKey(firstDayOfHijriMonth(1448, 1))
    const last = addDays(dayKey(firstDayOfHijriMonth(1449, 1)), -1)
    for (let day = first; day <= last; day = addDays(day, 1)) {
      expect(daysToRamadan(day), day).toBe(calendarCount(day))
    }
  })

  it('counts the last days of Sha’ban exactly', () => {
    expect(daysToRamadan('2027-01-30')).toBe(calendarCount('2027-01-30'))
    expect(daysToRamadan('2026-10-17')).toBe(calendarCount('2026-10-17'))
  })

  it('is one day on the last day of Sha’ban and zero throughout Ramadan', () => {
    const start = dayKey(firstDayOfHijriMonth(1448, RAMADAN))
    const end = dayKey(firstDayOfHijriMonth(1448, RAMADAN + 1))

    expect(daysToRamadan(addDays(start, -1))).toBe(1)
    for (let day = start; day < end; day = addDays(day, 1)) {
      expect(daysToRamadan(day), day).toBe(0)
    }
  })

  it('counts to next year’s Ramadan from 2 Shawwal', () => {
    const secondShawwal = addDays(dayKey(firstDayOfHijriMonth(1448, RAMADAN + 1)), 1)
    const nextRamadan = dayKey(firstDayOfHijriMonth(1449, RAMADAN))

    expect(daysToRamadan(secondShawwal)).toBe(
      Math.round((dateOf(nextRamadan) - dateOf(secondShawwal)) / DAY_MS),
    )
  })
})

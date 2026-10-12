import { describe, it, expect } from 'vitest'
import { toHijri, HIJRI_MONTHS } from './hijri.js'

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
  ])('returns a valid day, month and month name for %s', (date) => {
    const hijri = toHijri(date)

    expect(hijri.day).toBeGreaterThanOrEqual(1)
    expect(hijri.day).toBeLessThanOrEqual(30)
    expect(hijri.month).toBeGreaterThanOrEqual(1)
    expect(hijri.month).toBeLessThanOrEqual(12)
    expect(hijri.monthName).toBe(HIJRI_MONTHS[hijri.month - 1])
  })
})

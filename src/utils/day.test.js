import { describe, it, expect, afterEach } from 'vitest'
import { dayKey, addDays } from './day.js'
import { setTimezone, resetTimezone } from '../../test/timezone.js'

afterEach(resetTimezone)

describe('timezone test helper', () => {
  it.each([
    ['Africa/Lagos', 23],
    ['America/New_York', 18],
  ])('reads local hours in %s for the same instant', (zone, hours) => {
    setTimezone(zone, '2026-03-20T22:30:00Z')

    expect(new Date().getHours()).toBe(hours)
  })

  it('is back on UTC after a timezone test', () => {
    expect(new Date('2026-03-20T22:30:00Z').getHours()).toBe(22)
    expect(new Date().getTimezoneOffset()).toBe(0)
  })
})

describe('dayKey', () => {
  it('gives the local date at 23:30 in Lagos', () => {
    setTimezone('Africa/Lagos', '2026-03-20T22:30:00Z')

    expect(dayKey()).toBe('2026-03-20')
  })

  it('gives the new local date at 00:30 in New York', () => {
    setTimezone('America/New_York', '2026-03-21T04:30:00Z')

    expect(dayKey()).toBe('2026-03-21')
  })

  it('gives the local date when the UTC date is already the next day', () => {
    setTimezone('America/New_York', '2026-03-21T01:00:00Z')

    expect(dayKey()).toBe('2026-03-20')
  })

  it('changes by one day between a second before and a second after local midnight', () => {
    setTimezone('Africa/Lagos', '2026-03-20T22:59:59Z')
    const before = dayKey()

    setTimezone('Africa/Lagos', '2026-03-20T23:00:01Z')
    const after = dayKey()

    expect(before).toBe('2026-03-20')
    expect(after).toBe('2026-03-21')
    expect(addDays(before, 1)).toBe(after)
  })

  it('pads single-digit months and days', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})

describe('addDays', () => {
  it.each([
    ['2026-03-20', 0, '2026-03-20'],
    ['2026-01-31', 1, '2026-02-01'],
    ['2028-02-28', 1, '2028-02-29'],
    ['2026-02-28', 1, '2026-03-01'],
    ['2026-01-01', -1, '2025-12-31'],
    ['2026-03-05', -7, '2026-02-26'],
  ])('moves %s by %i to %s', (key, days, expected) => {
    expect(addDays(key, days)).toBe(expected)
  })

  it('gives each date once when the clocks go forward in London', () => {
    setTimezone('Europe/London', '2026-03-28T12:00:00Z')
    const first = '2026-03-28'
    const second = addDays(first, 1)
    const third = addDays(second, 1)

    expect([first, second, third]).toEqual(['2026-03-28', '2026-03-29', '2026-03-30'])
  })

  it('gives each date once when the clocks go back in New York', () => {
    setTimezone('America/New_York', '2026-10-31T16:00:00Z')
    const first = '2026-10-31'
    const second = addDays(first, 1)
    const third = addDays(second, 1)

    expect([first, second, third]).toEqual(['2026-10-31', '2026-11-01', '2026-11-02'])
  })
})

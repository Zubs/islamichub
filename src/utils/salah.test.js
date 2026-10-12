import { describe, it, expect } from 'vitest'
import {
  SALAH_PRAYERS,
  isDayComplete,
  dayState,
  loggedCount,
  salahStreak,
  canLog,
  weekEnding,
  parseSalahLog,
} from './salah.js'
import { addDays, monthGrid } from '@/utils/day.js'

const TODAY = '2026-03-20'
const ALL_ON_TIME = Object.fromEntries(SALAH_PRAYERS.map((prayer) => [prayer.key, 'on-time']))

function days(count, entry = ALL_ON_TIME, last = TODAY) {
  return Object.fromEntries(
    Array.from({ length: count }, (_, index) => [addDays(last, -index), { ...entry }]),
  )
}

describe('day completeness', () => {
  it('is complete only when all five are prayed, on time or late', () => {
    expect(isDayComplete(ALL_ON_TIME)).toBe(true)
    expect(isDayComplete({ ...ALL_ON_TIME, asr: 'late' })).toBe(true)
    expect(isDayComplete({ ...ALL_ON_TIME, asr: 'missed' })).toBe(false)
    expect(isDayComplete({ fajr: 'on-time' })).toBe(false)
    expect(isDayComplete(undefined)).toBe(false)
  })

  it('describes a day as complete, missed, partial or empty', () => {
    expect(dayState(ALL_ON_TIME)).toBe('complete')
    expect(dayState({ ...ALL_ON_TIME, isha: 'missed' })).toBe('missed')
    expect(dayState({ fajr: 'late' })).toBe('partial')
    expect(dayState({})).toBe('empty')
    expect(dayState(undefined)).toBe('empty')
    expect(loggedCount({ fajr: 'late', isha: 'missed', other: 'x' })).toBe(2)
  })
})

describe('salahStreak', () => {
  it('is zero with nothing logged', () => {
    expect(salahStreak({}, TODAY)).toBe(0)
  })

  it('is 1 once all five are logged today', () => {
    expect(salahStreak(days(1), TODAY)).toBe(1)
  })

  it('is 7 after seven complete days in a row', () => {
    expect(salahStreak(days(7), TODAY)).toBe(7)
  })

  it('is kept by a late prayer and ended by a missed one', () => {
    const late = { ...days(3), [addDays(TODAY, -1)]: { ...ALL_ON_TIME, dhuhr: 'late' } }
    const missed = { ...days(3), [addDays(TODAY, -1)]: { ...ALL_ON_TIME, dhuhr: 'missed' } }

    expect(salahStreak(late, TODAY)).toBe(3)
    expect(salahStreak(missed, TODAY)).toBe(1)
  })

  it('does not count a day with four prayers logged', () => {
    const { isha: _unlogged, ...four } = ALL_ON_TIME
    const log = { ...days(3), [addDays(TODAY, -1)]: four }

    expect(salahStreak(log, TODAY)).toBe(1)
  })

  it("keeps yesterday's count while today is still in progress", () => {
    const log = {
      ...days(4, ALL_ON_TIME, addDays(TODAY, -1)),
      [TODAY]: { fajr: 'on-time', dhuhr: 'late' },
    }

    expect(salahStreak(log, TODAY)).toBe(4)
    expect(salahStreak(days(4, ALL_ON_TIME, addDays(TODAY, -1)), TODAY)).toBe(4)
  })

  it('is zero when a prayer today is marked missed', () => {
    const log = { ...days(4, ALL_ON_TIME, addDays(TODAY, -1)), [TODAY]: { fajr: 'missed' } }

    expect(salahStreak(log, TODAY)).toBe(0)
  })

  it('is restored when a missed prayer yesterday is changed to late', () => {
    const yesterday = addDays(TODAY, -1)
    const broken = { ...days(5), [yesterday]: { ...ALL_ON_TIME, maghrib: 'missed' } }
    const repaired = { ...broken, [yesterday]: { ...ALL_ON_TIME, maghrib: 'late' } }

    expect(salahStreak(broken, TODAY)).toBe(1)
    expect(salahStreak(repaired, TODAY)).toBe(5)
  })

  it('counts across a month end', () => {
    expect(salahStreak(days(5, ALL_ON_TIME, '2026-03-02'), '2026-03-02')).toBe(5)
  })

  it('ignores days after a gap', () => {
    const log = { ...days(2), ...days(10, ALL_ON_TIME, addDays(TODAY, -3)) }

    expect(salahStreak(log, TODAY)).toBe(2)
  })
})

describe('days that can be logged', () => {
  it('allows today and past days, and refuses future days and bad keys', () => {
    expect(canLog(TODAY, TODAY)).toBe(true)
    expect(canLog(addDays(TODAY, -400), TODAY)).toBe(true)
    expect(canLog(addDays(TODAY, 1), TODAY)).toBe(false)
    expect(canLog('tomorrow', TODAY)).toBe(false)
    expect(canLog('', TODAY)).toBe(false)
  })
})

describe('week and month', () => {
  it('gives the seven days ending today, oldest first', () => {
    expect(weekEnding(TODAY)).toEqual([
      '2026-03-14',
      '2026-03-15',
      '2026-03-16',
      '2026-03-17',
      '2026-03-18',
      '2026-03-19',
      '2026-03-20',
    ])
  })

  it('lays a month out in weeks starting on Monday', () => {
    const march = monthGrid(2026, 3)

    expect(march[0]).toEqual([null, null, null, null, null, null, '2026-03-01'])
    expect(march.at(-1)).toEqual(['2026-03-30', '2026-03-31', null, null, null, null, null])
    expect(march.flat().filter(Boolean)).toHaveLength(31)
    expect(march.every((week) => week.length === 7)).toBe(true)
  })

  it('handles February in a leap year and a month starting on Monday', () => {
    expect(monthGrid(2028, 2).flat().filter(Boolean)).toHaveLength(29)
    expect(monthGrid(2026, 6)[0][0]).toBe('2026-06-01')
  })
})

describe('parseSalahLog', () => {
  it('reads a valid log as it is', () => {
    const log = { '2026-03-20': { fajr: 'on-time', isha: 'missed' } }

    expect(parseSalahLog(JSON.stringify(log))).toEqual(log)
  })

  it.each([null, '', 'not json', 'null', '7', '[1]', '"text"'])('reads %j as empty', (text) => {
    expect(parseSalahLog(text)).toEqual({})
  })

  it('drops days, prayers and statuses it does not know', () => {
    const text = JSON.stringify({
      '2026-03-20': { fajr: 'on-time', witr: 'on-time', asr: 'prayed' },
      '2026-03-19': null,
      '2026-03-18': 5,
      yesterday: { fajr: 'late' },
      '2026-03-17': { fajr: 'unknown' },
    })

    expect(parseSalahLog(text)).toEqual({ '2026-03-20': { fajr: 'on-time' } })
  })
})

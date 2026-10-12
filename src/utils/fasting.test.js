import { describe, it, expect } from 'vitest'
import {
  ramadanStart,
  estimatedRamadanStart,
  ramadanDays,
  ramadanYearOf,
  latestRamadanYear,
  allowedStatuses,
  makeUpSummary,
  totalToMakeUp,
  voluntaryCount,
  parseFastingLog,
  parseRamadanStarts,
} from './fasting.js'
import { firstDayOfHijriMonth, toHijri } from '@/utils/hijri.js'
import { addDays, dayKey } from '@/utils/day.js'

const START_1447 = '2026-02-19'
const START_1446 = '2025-03-01'

function ramadan(start, missedDays = []) {
  return Object.fromEntries(
    ramadanDays(start).map((day, index) => [
      day,
      missedDays.includes(index + 1) ? 'missed' : 'fasted',
    ]),
  )
}

describe('first day of a Hijri month', () => {
  it.each([1445, 1446, 1447, 1448, 1449, 1450])('finds the first day of Ramadan %i', (year) => {
    const first = firstDayOfHijriMonth(year, 9)
    const before = new Date(first.getFullYear(), first.getMonth(), first.getDate() - 1)

    expect(toHijri(first)).toMatchObject({ year, month: 9 })
    expect(toHijri(before).month).toBe(8)
  })

  it('places Ramadan 1446 and 1447 where they fell, give or take a day', () => {
    expect(estimatedRamadanStart(1446)).toBe(START_1446)
    expect(estimatedRamadanStart(1447)).toBe(START_1447)
    expect(dayKey(firstDayOfHijriMonth(1447, 10))).toBe('2026-03-20')
  })
})

describe('Ramadan days', () => {
  it('uses the estimate unless the user has set a start', () => {
    expect(ramadanStart(1447)).toBe(START_1447)
    expect(ramadanStart(1447, { 1447: '2026-02-18' })).toBe('2026-02-18')
  })

  it('gives thirty days from the start', () => {
    const days = ramadanDays(START_1447)

    expect(days).toHaveLength(30)
    expect(days[0]).toBe(START_1447)
    expect(days[29]).toBe('2026-03-20')
  })

  it('knows which Ramadan a day falls in, and that other days fall in none', () => {
    expect(ramadanYearOf(START_1447)).toBe(1447)
    expect(ramadanYearOf('2026-03-20')).toBe(1447)
    expect(ramadanYearOf('2026-03-21')).toBeNull()
    expect(ramadanYearOf('2026-02-18')).toBeNull()
    expect(ramadanYearOf('2025-03-15')).toBe(1446)
    expect(ramadanYearOf('2026-02-18', { 1447: '2026-02-18' })).toBe(1447)
    expect(ramadanYearOf('2026-03-20', { 1447: '2026-02-18' })).toBeNull()
  })

  it('finds the most recent Ramadan before a day', () => {
    expect(latestRamadanYear('2026-06-01')).toBe(1447)
    expect(latestRamadanYear('2026-02-10')).toBe(1446)
    expect(latestRamadanYear(START_1447)).toBe(1447)
  })
})

describe('statuses a day can take', () => {
  const today = '2026-03-25'

  it('offers fasted and missed inside Ramadan', () => {
    expect(allowedStatuses('2026-03-01', today)).toEqual(['fasted', 'missed'])
  })

  it('offers made up and voluntary outside Ramadan', () => {
    expect(allowedStatuses('2026-03-23', today)).toEqual(['made-up', 'voluntary'])
    expect(allowedStatuses(today, today)).toEqual(['made-up', 'voluntary'])
  })

  it('offers nothing for a future day or a bad key', () => {
    expect(allowedStatuses('2026-03-26', today)).toEqual([])
    expect(allowedStatuses('soon', today)).toEqual([])
  })
})

describe('still to make up', () => {
  it('is zero with nothing logged', () => {
    expect(makeUpSummary({})).toEqual([])
    expect(totalToMakeUp({})).toBe(0)
  })

  it('is one after 29 fasted and one missed', () => {
    expect(makeUpSummary(ramadan(START_1447, [12]))).toEqual([
      { year: 1447, missed: 1, madeUp: 0, remaining: 1 },
    ])
  })

  it('comes down to zero when a made-up fast is logged after Ramadan', () => {
    const log = { ...ramadan(START_1447, [12]), '2026-04-06': 'made-up' }

    expect(totalToMakeUp(log)).toBe(0)
  })

  it('never goes below zero', () => {
    const log = {
      ...ramadan(START_1447, [12]),
      '2026-04-06': 'made-up',
      '2026-04-09': 'made-up',
      '2026-04-13': 'made-up',
    }

    expect(makeUpSummary(log)[0]).toMatchObject({ missed: 1, madeUp: 3, remaining: 0 })
    expect(totalToMakeUp(log)).toBe(0)
  })

  it('counts last Ramadan and this Ramadan separately', () => {
    const log = {
      ...ramadan(START_1446, [3, 4]),
      '2025-05-05': 'made-up',
      ...ramadan(START_1447, [10, 11, 12]),
    }

    expect(makeUpSummary(log)).toEqual([
      { year: 1447, missed: 3, madeUp: 0, remaining: 3 },
      { year: 1446, missed: 2, madeUp: 1, remaining: 1 },
    ])
    expect(totalToMakeUp(log)).toBe(4)
  })

  it('leaves one after a whole Ramadan with three missed and two made up', () => {
    const log = {
      ...ramadan(START_1447, [5, 6, 7]),
      '2026-04-01': 'made-up',
      '2026-04-02': 'made-up',
    }

    expect(totalToMakeUp(log)).toBe(1)
  })

  it('is not changed by a voluntary fast, which is counted on its own', () => {
    const log = {
      ...ramadan(START_1447, [12]),
      '2026-04-06': 'voluntary',
      '2026-04-09': 'voluntary',
    }

    expect(totalToMakeUp(log)).toBe(1)
    expect(voluntaryCount(log)).toBe(2)
    expect(voluntaryCount({})).toBe(0)
  })

  it('keeps logged days when the first day moves a day earlier, and counts by the new range', () => {
    const log = ramadan(START_1447, [1, 30])
    const earlier = { 1447: addDays(START_1447, -1) }

    expect(ramadanDays(ramadanStart(1447, earlier))[1]).toBe(START_1447)
    expect(makeUpSummary(log, earlier)).toEqual([
      { year: 1447, missed: 1, madeUp: 0, remaining: 1 },
    ])
    expect(Object.keys(log)).toHaveLength(30)
  })
})

describe('reading stored data', () => {
  it('reads a valid log and drops unknown days and statuses', () => {
    const text = JSON.stringify({
      '2026-03-01': 'fasted',
      '2026-03-02': 'skipped',
      '2026-03-03': null,
      someday: 'fasted',
      '2026-03-04': ['fasted', 'missed'],
    })

    expect(parseFastingLog(text)).toEqual({ '2026-03-01': 'fasted' })
  })

  it.each([null, 'not json', 'null', '[]', '5'])('reads a log of %j as empty', (text) => {
    expect(parseFastingLog(text)).toEqual({})
    expect(parseRamadanStarts(text)).toEqual({})
  })

  it('reads only well-formed Ramadan starts', () => {
    const text = JSON.stringify({ 1447: '2026-02-18', 1448: 'spring', next: '2027-02-08', 1449: 5 })

    expect(parseRamadanStarts(text)).toEqual({ 1447: '2026-02-18' })
  })
})

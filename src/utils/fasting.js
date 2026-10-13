import { dayKey, addDays } from '@/utils/day.js'
import { toHijri, firstDayOfHijriMonth } from '@/utils/hijri.js'
import { parseStoredObject } from '@/utils/storage.js'

export const RAMADAN_DAYS = 30
const RAMADAN_MONTH = 9
const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/

export const FAST_STATUSES = [
  { key: 'fasted', label: 'Fasted', ramadan: true },
  { key: 'missed', label: 'Missed', ramadan: true },
  { key: 'made-up', label: 'Made up', ramadan: false },
  { key: 'voluntary', label: 'Voluntary', ramadan: false },
]

const STATUS_KEYS = FAST_STATUSES.map((status) => status.key)

function dateOf(day) {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date)
}

export function estimatedRamadanStart(hijriYear) {
  return dayKey(firstDayOfHijriMonth(hijriYear, RAMADAN_MONTH))
}

export function ramadanStart(hijriYear, starts = {}) {
  return starts[hijriYear] ?? estimatedRamadanStart(hijriYear)
}

export function ramadanDays(start) {
  return Array.from({ length: RAMADAN_DAYS }, (_, index) => addDays(start, index))
}

function nearbyYears(day) {
  const year = toHijri(dateOf(day)).year
  return [year + 1, year, year - 1]
}

// The Hijri year of the Ramadan a day falls in, or null.
export function ramadanYearOf(day, starts = {}) {
  return (
    nearbyYears(day).find((year) => {
      const start = ramadanStart(year, starts)
      return day >= start && day <= addDays(start, RAMADAN_DAYS - 1)
    }) ?? null
  )
}

// The Hijri year of the most recent Ramadan that has begun on or before a day.
export function latestRamadanYear(day, starts = {}) {
  return nearbyYears(day).find((year) => ramadanStart(year, starts) <= day)
}

export function allowedStatuses(day, today = dayKey(), starts = {}) {
  if (!DAY_KEY.test(day) || day > today) {
    return []
  }

  const inRamadan = ramadanYearOf(day, starts) !== null
  return FAST_STATUSES.filter((status) => status.ramadan === inRamadan).map((status) => status.key)
}

// One line per Ramadan that has a missed day: [{ year, missed, madeUp, remaining }], newest first.
export function makeUpSummary(log, starts = {}) {
  const years = new Map()
  const line = (year) => {
    if (!years.has(year)) {
      years.set(year, { year, missed: 0, madeUp: 0 })
    }

    return years.get(year)
  }

  for (const [day, status] of Object.entries(log)) {
    if (status === 'missed') {
      const year = ramadanYearOf(day, starts)
      if (year !== null) {
        line(year).missed += 1
      }
    } else if (status === 'made-up' && ramadanYearOf(day, starts) === null) {
      line(latestRamadanYear(day, starts)).madeUp += 1
    }
  }

  return [...years.values()]
    .filter((entry) => entry.missed > 0)
    .map((entry) => ({ ...entry, remaining: Math.max(0, entry.missed - entry.madeUp) }))
    .sort((a, b) => b.year - a.year)
}

export function totalToMakeUp(log, starts = {}) {
  return makeUpSummary(log, starts).reduce((sum, entry) => sum + entry.remaining, 0)
}

export function voluntaryCount(log) {
  return Object.values(log).filter((status) => status === 'voluntary').length
}

export function parseFastingLog(text) {
  return Object.fromEntries(
    Object.entries(parseStoredObject(text)).filter(
      ([day, status]) => DAY_KEY.test(day) && STATUS_KEYS.includes(status),
    ),
  )
}

export function parseRamadanStarts(text) {
  return Object.fromEntries(
    Object.entries(parseStoredObject(text)).filter(
      ([year, day]) => /^\d{4}$/.test(year) && typeof day === 'string' && DAY_KEY.test(day),
    ),
  )
}

export function isFastStatus(status) {
  return STATUS_KEYS.includes(status)
}

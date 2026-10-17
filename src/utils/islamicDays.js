import { toHijri, firstDayOfHijriMonth } from './hijri.js'
import { dayKey } from './day.js'
import { ISLAMIC_DAYS } from '../data/islamicDays.js'

const DAY_MS = 86400000
const WEEK_DAYS = 7
const MONTHS = 12

function matches(rule, hijri, weekday) {
  if (rule.weekdays) {
    return rule.weekdays.includes(weekday)
  }
  if (rule.month && rule.month !== hijri.month) {
    return false
  }
  return rule.from ? hijri.day >= rule.from : rule.days.includes(hijri.day)
}

// The kinds of Islamic day a local date falls on: [{ key, label }], `label` naming the day
// within its kind where it has one.
export function kindsOn(date) {
  const hijri = toHijri(date)
  return ISLAMIC_DAYS.flatMap((kind) =>
    kind.rules
      .filter((rule) => matches(rule, hijri, date.getDay()))
      .map((rule) => ({ key: kind.key, label: rule.label ?? null })),
  )
}

export function isKindOn(key, date) {
  return kindsOn(date).some((kind) => kind.key === key)
}

// True on the day before a run of the kind begins, for the evening reminder.
export function kindBeginsTomorrow(key, date) {
  const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  return isKindOn(key, tomorrow) && !isKindOn(key, date)
}

export function shiftMonth({ year, month }, months) {
  const index = year * MONTHS + (month - 1) + months
  return { year: Math.floor(index / MONTHS), month: (index % MONTHS) + 1 }
}

// The local days of a Hijri month, from the site's first day of it to the day before the next.
export function daysOfMonth(year, month) {
  const first = firstDayOfHijriMonth(year, month)
  const next = shiftMonth({ year, month }, 1)
  const length = Math.round((firstDayOfHijriMonth(next.year, next.month) - first) / DAY_MS)
  return Array.from({ length }, (_, index) => {
    const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + index)
    return { dayKey: dayKey(date), date, hijriDay: index + 1, kinds: kindsOn(date) }
  })
}

// The month as weeks of seven, Monday first, with null outside the month.
export function monthGrid(year, month) {
  const days = daysOfMonth(year, month)
  const leading = (days[0].date.getDay() + 6) % WEEK_DAYS
  const cells = [...Array.from({ length: leading }, () => null), ...days]
  while (cells.length % WEEK_DAYS) {
    cells.push(null)
  }
  return Array.from({ length: cells.length / WEEK_DAYS }, (_, week) =>
    cells.slice(week * WEEK_DAYS, (week + 1) * WEEK_DAYS),
  )
}

// The month's marked days grouped by kind, in the order each kind first falls:
// [{ key, days: [{ dayKey, date, hijriDay, label }] }]
export function marksIn(year, month) {
  const groups = new Map()
  for (const day of daysOfMonth(year, month)) {
    for (const kind of day.kinds) {
      if (!groups.has(kind.key)) {
        groups.set(kind.key, { key: kind.key, days: [] })
      }
      groups.get(kind.key).days.push({ ...day, label: kind.label })
    }
  }
  return [...groups.values()]
}

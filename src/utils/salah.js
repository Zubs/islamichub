import { dayKey, addDays } from '@/utils/day.js'
import { parseStoredObject, keepEntries, isPlainObject } from '@/utils/storage.js'

export const SALAH_PRAYERS = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'dhuhr', label: 'Dhuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
]

export const SALAH_STATUSES = [
  { key: 'on-time', label: 'On time' },
  { key: 'late', label: 'Late' },
  { key: 'missed', label: 'Missed' },
]

const PRAYER_KEYS = SALAH_PRAYERS.map((prayer) => prayer.key)
const STATUS_KEYS = SALAH_STATUSES.map((status) => status.key)
const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/
const WEEK_DAYS = 7

function isPrayed(status) {
  return status === 'on-time' || status === 'late'
}

export function isDayComplete(entry) {
  return PRAYER_KEYS.every((prayer) => isPrayed(entry?.[prayer]))
}

function hasMissed(entry) {
  return PRAYER_KEYS.some((prayer) => entry?.[prayer] === 'missed')
}

export function loggedCount(entry) {
  return PRAYER_KEYS.filter((prayer) => STATUS_KEYS.includes(entry?.[prayer])).length
}

// 'complete' (all five prayed), 'missed' (at least one missed), 'partial' or 'empty'
export function dayState(entry) {
  if (isDayComplete(entry)) {
    return 'complete'
  }

  if (hasMissed(entry)) {
    return 'missed'
  }

  return loggedCount(entry) ? 'partial' : 'empty'
}

export function salahStreak(log, today = dayKey()) {
  if (hasMissed(log[today])) {
    return 0
  }

  let day = isDayComplete(log[today]) ? today : addDays(today, -1)
  let streak = 0
  while (isDayComplete(log[day])) {
    streak += 1
    day = addDays(day, -1)
  }

  return streak
}

export function canLog(day, today = dayKey()) {
  return DAY_KEY.test(day) && day <= today
}

export function weekEnding(today = dayKey()) {
  return Array.from({ length: WEEK_DAYS }, (_, index) => addDays(today, index - (WEEK_DAYS - 1)))
}

// Weeks of a month as rows of seven day keys, Monday first, with null outside the month.
export function monthGrid(year, month) {
  const first = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  const leading = (first.getDay() + 6) % WEEK_DAYS
  const cells = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) =>
      dayKey(new Date(year, month - 1, index + 1)),
    ),
  ]
  while (cells.length % WEEK_DAYS) {
    cells.push(null)
  }

  return Array.from({ length: cells.length / WEEK_DAYS }, (_, week) =>
    cells.slice(week * WEEK_DAYS, (week + 1) * WEEK_DAYS),
  )
}

function cleanDay(entry) {
  return Object.fromEntries(
    Object.entries(entry).filter(
      ([prayer, status]) => PRAYER_KEYS.includes(prayer) && STATUS_KEYS.includes(status),
    ),
  )
}

export function parseSalahLog(text) {
  const days = keepEntries(parseStoredObject(text), isPlainObject)
  return Object.fromEntries(
    Object.entries(days)
      .filter(([day]) => DAY_KEY.test(day))
      .map(([day, entry]) => [day, cleanDay(entry)])
      .filter(([, entry]) => Object.keys(entry).length),
  )
}

export function isSalahPrayer(prayer) {
  return PRAYER_KEYS.includes(prayer)
}

export function isSalahStatus(status) {
  return STATUS_KEYS.includes(status)
}

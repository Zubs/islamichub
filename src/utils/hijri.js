import { dayKey } from './day.js'

export function toHijri(date = new Date()) {
  // Algorithm by Khalid Shaukat
  let m = date.getMonth() + 1
  let d = date.getDate()
  let y = date.getFullYear()

  if (m < 3) {
    y -= 1
    m += 12
  }

  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5

  const Z = Math.floor(JD - 1948438.5 + 0.5) / 29.53059
  const K = Math.floor(Z)
  const R = Z - K

  const hDay = Math.floor(R * 29.53059) + 1
  const hMonth = (((K % 12) + 12) % 12) + 1
  const hYear = Math.floor(K / 12) + 1

  return { day: hDay, month: hMonth, year: hYear }
}

const HIJRI_EPOCH_JD = 1948438.5
const MEAN_LUNAR_MONTH_DAYS = 29.53059
const UNIX_EPOCH_JD = 2440587.5
const DAY_MS = 86400000
const SEARCH_DAYS = 4

// The first Gregorian date this calendar places in the given Hijri month. An estimate:
// the true first day depends on moon sighting and can differ by a day.
export function firstDayOfHijriMonth(year, month) {
  const estimatedJd = HIJRI_EPOCH_JD + ((year - 1) * 12 + (month - 1)) * MEAN_LUNAR_MONTH_DAYS
  const estimate = new Date((estimatedJd - UNIX_EPOCH_JD) * DAY_MS)
  const start = new Date(estimate.getUTCFullYear(), estimate.getUTCMonth(), estimate.getUTCDate())

  for (let offset = -SEARCH_DAYS; offset <= SEARCH_DAYS; offset += 1) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset)
    const hijri = toHijri(day)
    if (hijri.year === year && hijri.month === month) {
      return day
    }
  }

  return start
}

const RAMADAN = 9

function dateOf(day) {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date)
}

// Local days from `today` (a day key) to the first day of the next Ramadan; 0 during Ramadan.
export function daysToRamadan(today = dayKey()) {
  const now = dateOf(today)
  const hijri = toHijri(now)
  if (hijri.month === RAMADAN) {
    return 0
  }

  const year = hijri.month < RAMADAN ? hijri.year : hijri.year + 1
  return Math.round((firstDayOfHijriMonth(year, RAMADAN) - now) / DAY_MS)
}

/** Is it currently Ramadan? */
export function isRamadan() {
  return toHijri(new Date()).month === 9
}

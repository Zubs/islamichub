import { dayKey, addDays } from '@/utils/day.js'
import { toHijri, firstDayOfHijriMonth } from '@/utils/hijri.js'

const SHAWWAL = 10
const DHUL_HIJJAH = 12
const DAY_MS = 86400000

function dateOf(day) {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date)
}

// The estimated dates of the two Eids of a Hijri year: 1 Shawwal and 10 Dhul Hijjah.
export function eidDates(hijriYear) {
  return {
    fitr: dayKey(firstDayOfHijriMonth(hijriYear, SHAWWAL)),
    adha: addDays(dayKey(firstDayOfHijriMonth(hijriYear, DHUL_HIJJAH)), 9),
  }
}

// The Eid that is today, or else the next one: { eid: 'fitr' | 'adha', date, days, hijriYear }
export function nextEid(today = dayKey()) {
  const year = toHijri(dateOf(today)).year
  const upcoming = [year - 1, year, year + 1]
    .flatMap((hijriYear) =>
      Object.entries(eidDates(hijriYear)).map(([eid, date]) => ({ eid, date, hijriYear })),
    )
    .filter((entry) => entry.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  return {
    ...upcoming,
    days: Math.round((dateOf(upcoming.date) - dateOf(today)) / DAY_MS),
  }
}

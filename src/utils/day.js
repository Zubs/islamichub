function pad(number) {
  return String(number).padStart(2, '0')
}

export function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function addDays(key, days) {
  const [year, month, day] = key.split('-').map(Number)
  return dayKey(new Date(year, month - 1, day + days))
}

const WEEK_DAYS = 7

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

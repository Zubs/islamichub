const DAY_MS = 86400000

function dayNumber(dayKey) {
  const [year, month, day] = dayKey.split('-').map(Number)
  return Math.round(Date.UTC(year, month - 1, day) / DAY_MS)
}

export function dailyHadithFor(dayKey, list) {
  if (!list.length) {
    return null
  }

  const index = ((dayNumber(dayKey) % list.length) + list.length) % list.length
  return list[index]
}

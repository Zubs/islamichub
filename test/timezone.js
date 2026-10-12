import process from 'node:process'
import { vi } from 'vitest'

export function setTimezone(zone, instant) {
  process.env.TZ = zone
  vi.useFakeTimers()
  vi.setSystemTime(new Date(instant))
}

export function resetTimezone() {
  vi.useRealTimers()
  process.env.TZ = 'UTC'
}

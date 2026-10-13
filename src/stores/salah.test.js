import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSalahStore } from './salah.js'
import { SALAH_PRAYERS } from '@/utils/salah.js'
import { dayKey, addDays } from '@/utils/day.js'

function reload() {
  setActivePinia(createPinia())
  return useSalahStore()
}

function at(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
}

function logAll(store, day, status = 'on-time') {
  for (const prayer of SALAH_PRAYERS) {
    store.setStatus(day, prayer.key, status)
  }
}

describe('salah store', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('starts with nothing logged, a streak of zero and nothing stored', () => {
    const store = useSalahStore()

    for (const prayer of SALAH_PRAYERS) {
      expect(store.statusOf(dayKey(), prayer.key)).toBeNull()
    }
    expect(store.streak).toBe(0)
    expect(localStorage.getItem('salah-log')).toBeNull()
  })

  it('saves Fajr as on time and still has it after a reload', () => {
    useSalahStore().setStatus(dayKey(), 'fajr', 'on-time')

    expect(reload().statusOf(dayKey(), 'fajr')).toBe('on-time')
  })

  it('gives a streak of 1 once all five are logged today', () => {
    const store = useSalahStore()
    logAll(store, dayKey())

    expect(store.streak).toBe(1)
  })

  it('replaces a status, and clears it when the same one is chosen again', () => {
    const store = useSalahStore()
    store.setStatus(dayKey(), 'asr', 'missed')
    store.setStatus(dayKey(), 'asr', 'late')
    expect(store.statusOf(dayKey(), 'asr')).toBe('late')

    store.setStatus(dayKey(), 'asr', 'late')

    expect(store.statusOf(dayKey(), 'asr')).toBeNull()
    expect(localStorage.getItem('salah-log')).toBeNull()
  })

  it('refuses a future day, an unknown prayer and an unknown status', () => {
    const store = useSalahStore()

    expect(store.setStatus(addDays(dayKey(), 1), 'fajr', 'on-time')).toBe(false)
    expect(store.setStatus(dayKey(), 'witr', 'on-time')).toBe(false)
    expect(store.setStatus(dayKey(), 'fajr', 'prayed')).toBe(false)
    expect(store.log).toEqual({})
  })

  it('repairs the streak when a missed prayer yesterday is changed to late', () => {
    at(new Date(2026, 2, 20, 21, 0))
    const store = useSalahStore()
    for (const back of [0, 1, 2]) {
      logAll(store, addDays('2026-03-20', -back))
    }
    store.setStatus('2026-03-19', 'maghrib', 'missed')
    expect(store.streak).toBe(1)

    store.setStatus('2026-03-19', 'maghrib', 'late')

    expect(store.streak).toBe(3)
  })

  it('starts a new, unlogged day at local midnight and keeps yesterday', () => {
    at(new Date(2026, 2, 20, 23, 30))
    const store = useSalahStore()
    logAll(store, dayKey())
    expect(store.streak).toBe(1)

    at(new Date(2026, 2, 21, 0, 5))
    store.refreshToday()

    expect(store.today).toBe('2026-03-21')
    expect(store.statusOf('2026-03-21', 'fajr')).toBeNull()
    expect(store.statusOf('2026-03-20', 'fajr')).toBe('on-time')
    expect(store.streak).toBe(1)
    expect(store.setStatus('2026-03-22', 'fajr', 'on-time')).toBe(false)
  })

  it('keeps a prayer logged with no connection after reconnecting', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    useSalahStore().setStatus(dayKey(), 'dhuhr', 'late')
    vi.restoreAllMocks()

    expect(reload().statusOf(dayKey(), 'dhuhr')).toBe('late')
  })

  it('empties the log and the stored copy when cleared', () => {
    const store = useSalahStore()
    logAll(store, dayKey())

    store.clear()

    expect(store.log).toEqual({})
    expect(store.streak).toBe(0)
    expect(localStorage.getItem('salah-log')).toBeNull()
    expect(reload().log).toEqual({})
  })

  it.each(['not json', 'null', '[]', '{"2026-03-20":null}', '{"2026-03-20":{"fajr":"prayed"}}'])(
    'treats a stored log of %s as empty',
    (text) => {
      localStorage.setItem('salah-log', text)

      const store = reload()

      expect(store.log).toEqual({})
      expect(() => store.setStatus(dayKey(), 'fajr', 'on-time')).not.toThrow()
    },
  )

  it('keeps working for the visit when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const store = useSalahStore()

    expect(store.setStatus(dayKey(), 'fajr', 'on-time')).toBe(true)
    expect(store.statusOf(dayKey(), 'fajr')).toBe('on-time')
  })

  it('gives a three-day streak after five prayers a day for three days', () => {
    const store = useSalahStore()
    for (const date of [
      new Date(2026, 2, 18, 22),
      new Date(2026, 2, 19, 22),
      new Date(2026, 2, 20, 22),
    ]) {
      at(date)
      store.refreshToday()
      logAll(store, dayKey())
    }

    expect(store.streak).toBe(3)
    expect(reload().streak).toBe(3)
  })
})

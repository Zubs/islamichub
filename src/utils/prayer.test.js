import { describe, it, expect, vi, afterEach } from 'vitest'
import { calcPrayerTimes, getNextPrayer } from './prayer.js'
import { LONDON_EQUINOX_2026 } from './prayer.fixture.js'

const TOLERANCE_MINUTES = 2
const PRAYERS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function londonTimes(method) {
  const { latitude, longitude } = LONDON_EQUINOX_2026.settings
  return calcPrayerTimes(
    latitude,
    longitude,
    new Date(2026, 2, 20),
    LONDON_EQUINOX_2026.utcOffset,
    method,
  )
}

describe('calcPrayerTimes', () => {
  describe.each(Object.entries(LONDON_EQUINOX_2026.times))(
    'London on 20 March 2026 with %s',
    (method, published) => {
      it.each(PRAYERS)('%s is within two minutes of the published timetable', (prayer) => {
        const difference = Math.abs(
          toMinutes(londonTimes(method)[prayer]) - toMinutes(published[prayer]),
        )

        expect(difference).toBeLessThanOrEqual(TOLERANCE_MINUTES)
      })
    },
  )

  it('falls back to Muslim World League for an unknown method', () => {
    expect(londonTimes('NotAMethod')).toEqual(londonTimes('MWL'))
  })
})

describe('getNextPrayer', () => {
  const times = {
    fajr: '04:10',
    sunrise: '06:04',
    dhuhr: '12:08',
    asr: '15:25',
    maghrib: '18:12',
    isha: '19:59',
  }

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns Asr and the gap to it between Dhuhr and Asr', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 20, 13, 0))

    expect(getNextPrayer(times)).toMatchObject({ key: 'asr', minsRemaining: 145 })
  })

  it("returns tomorrow's Fajr, counted across midnight, after Isha", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 20, 21, 0))

    expect(getNextPrayer(times)).toMatchObject({ key: 'fajr', minsRemaining: 430 })
  })
})

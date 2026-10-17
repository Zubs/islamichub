import { describe, it, expect, vi, afterEach } from 'vitest'
import { calcPrayerTimes, getNextPrayer, getCurrentPrayer } from './prayer.js'
import { LONDON_EQUINOX_2026, ASR_BY_SCHOOL_2026 } from './prayer.fixture.js'

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

describe('prayer at a given moment', () => {
  const times = {
    fajr: '04:10',
    sunrise: '06:04',
    dhuhr: '12:08',
    asr: '15:25',
    maghrib: '18:12',
    isha: '19:59',
  }

  it.each([
    ['before Asr', new Date(2026, 2, 20, 15, 24), 'dhuhr', 'asr', 1],
    ['as Asr begins', new Date(2026, 2, 20, 15, 25), 'asr', 'maghrib', 167],
    ['after Isha', new Date(2026, 2, 20, 21, 0), 'isha', 'fajr', 430],
    ['after midnight, before Fajr', new Date(2026, 2, 21, 1, 0), 'isha', 'fajr', 190],
  ])('%s', (_, now, current, next, minutes) => {
    expect(getCurrentPrayer(times, now)).toBe(current)
    expect(getNextPrayer(times, now)).toMatchObject({ key: next, minsRemaining: minutes })
  })
})

describe('Asr method', () => {
  const OTHERS = ['fajr', 'sunrise', 'dhuhr', 'maghrib', 'isha']

  function times(city, asrMethod) {
    return calcPrayerTimes(
      city.latitude,
      city.longitude,
      new Date(2026, 2, 20),
      city.utcOffset,
      'MWL',
      asrMethod,
    )
  }

  const london = ASR_BY_SCHOOL_2026.cities[0]

  it('is Standard when no option is given', () => {
    expect(times(london)).toEqual(times(london, 'standard'))
    expect(times(london).asr).toBe(londonTimes('MWL').asr)
  })

  it('is later with Hanafi and leaves the other five times alone', () => {
    const standard = times(london, 'standard')
    const hanafi = times(london, 'hanafi')

    expect(toMinutes(hanafi.asr)).toBeGreaterThan(toMinutes(standard.asr))
    for (const prayer of OTHERS) {
      expect(hanafi[prayer]).toBe(standard[prayer])
    }
  })

  describe.each(ASR_BY_SCHOOL_2026.cities)('$name on 20 March 2026', (city) => {
    it.each(['standard', 'hanafi'])('%s Asr is within two minutes of the timetable', (option) => {
      const difference = Math.abs(toMinutes(times(city, option).asr) - toMinutes(city[option]))

      expect(difference).toBeLessThanOrEqual(TOLERANCE_MINUTES)
    })
  })

  it.each(['standard', 'hanafi'])('gives a valid %s Asr at latitude 60 in winter', (option) => {
    const result = calcPrayerTimes(60, 10, new Date(2026, 11, 21), 1, 'MWL', option)

    expect(result.asr).toMatch(/^\d{2}:\d{2}$/)
    expect(toMinutes(result.asr)).toBeGreaterThan(toMinutes(result.dhuhr))
    expect(toMinutes(result.asr)).toBeLessThanOrEqual(toMinutes(result.maghrib))
  })

  it('falls back to Standard for an unknown option', () => {
    expect(times(london, 'NotAnOption')).toEqual(times(london, 'standard'))
  })
})

import { describe, it, expect } from 'vitest'
import { eidDates, nextEid } from './eid.js'
import { addDays } from '@/utils/day.js'

const FITR_1447 = '2026-03-20'
const ADHA_1447 = '2026-05-27'

// From a published Hijri calendar (Aladhan API, hToG), retrieved 13 October 2026.
const PUBLISHED = [
  { year: 1448, eid: 'fitr', date: '2027-03-09' },
  { year: 1448, eid: 'adha', date: '2027-05-16' },
  { year: 1449, eid: 'fitr', date: '2028-02-26' },
  { year: 1449, eid: 'adha', date: '2028-05-05' },
]

function daysBetween(a, b) {
  return Math.abs(Math.round((new Date(a) - new Date(b)) / 86400000))
}

describe('eidDates', () => {
  it('places Eid al-Fitr on 1 Shawwal and Eid al-Adha on 10 Dhul Hijjah', () => {
    expect(eidDates(1447)).toEqual({ fitr: FITR_1447, adha: ADHA_1447 })
  })

  it.each(PUBLISHED)(
    'puts $eid $year within a day of the published calendar',
    ({ year, eid, date }) => {
      expect(daysBetween(eidDates(year)[eid], date)).toBeLessThanOrEqual(1)
    },
  )
})

describe('nextEid', () => {
  it('counts the days to whichever Eid is nearer on an ordinary day', () => {
    expect(nextEid('2026-01-10')).toMatchObject({ eid: 'fitr', date: FITR_1447, days: 69 })
    expect(nextEid('2026-04-20')).toMatchObject({ eid: 'adha', date: ADHA_1447, days: 37 })
  })

  it('shows 1 day on the day before Eid al-Fitr', () => {
    expect(nextEid(addDays(FITR_1447, -1))).toMatchObject({ eid: 'fitr', days: 1 })
  })

  it('shows the Eid itself on 1 Shawwal', () => {
    expect(nextEid(FITR_1447)).toMatchObject({ eid: 'fitr', days: 0, hijriYear: 1447 })
  })

  it('points to Eid al-Adha on 2 Shawwal', () => {
    expect(nextEid(addDays(FITR_1447, 1))).toMatchObject({ eid: 'adha', date: ADHA_1447 })
  })

  it("points to next year's Eid al-Fitr after Eid al-Adha", () => {
    expect(nextEid(ADHA_1447)).toMatchObject({ eid: 'adha', days: 0 })
    expect(nextEid(addDays(ADHA_1447, 1))).toMatchObject({ eid: 'fitr', hijriYear: 1448 })
  })

  it('gives the next four Eids in order from today', () => {
    let day = '2026-10-13'
    const found = []
    for (let step = 0; step < 4; step += 1) {
      const next = nextEid(day)
      found.push(`${next.hijriYear} ${next.eid}`)
      day = addDays(next.date, 1)
    }

    expect(found).toEqual(['1448 fitr', '1448 adha', '1449 fitr', '1449 adha'])
  })
})

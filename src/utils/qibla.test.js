import { describe, it, expect } from 'vitest'
import { calcQibla, bearingToLabel, distanceToMakkah } from './qibla.js'

const KAABA = { lat: 21.4225, lng: 39.8262 }
const LONDON = { lat: 51.5074, lng: -0.1278 }

describe('qibla', () => {
  it('returns numbers and a distance of zero at the Kaaba itself', () => {
    const bearing = calcQibla(KAABA.lat, KAABA.lng)
    const distance = distanceToMakkah(KAABA.lat, KAABA.lng)

    expect(Number.isFinite(bearing)).toBe(true)
    expect(distance).toBe(0)
  })

  it('points south-east from London, about 4,790 km away', () => {
    const bearing = calcQibla(LONDON.lat, LONDON.lng)

    expect(bearing).toBe(119)
    expect(bearingToLabel(bearing)).toBe('SE')
    expect(Math.abs(distanceToMakkah(LONDON.lat, LONDON.lng) - 4790)).toBeLessThanOrEqual(10)
  })

  it.each([
    [0, 'N'],
    [90, 'E'],
    [180, 'S'],
    [270, 'W'],
    [359, 'N'],
  ])('labels a bearing of %i degrees as %s', (bearing, label) => {
    expect(bearingToLabel(bearing)).toBe(label)
  })
})

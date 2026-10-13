import { describe, it, expect } from 'vitest'
import { isValidCoordinates, parsePrayerSettings } from './prayerSettings.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'Egypt', asrMethod: 'hanafi' }

describe('isValidCoordinates', () => {
  it.each([
    [90, 180],
    [-90, -180],
    [90, -180],
    [-90, 180],
    [0, 0],
  ])('accepts %d, %d', (lat, lng) => {
    expect(isValidCoordinates(lat, lng)).toBe(true)
  })

  it.each([
    [90.1, 0],
    [-90.1, 0],
    [0, 180.5],
    [0, -180.5],
    [Number.NaN, 0],
    ['6.5', 3],
    [null, 3],
    [Number.POSITIVE_INFINITY, 0],
  ])('rejects %j, %j', (lat, lng) => {
    expect(isValidCoordinates(lat, lng)).toBe(false)
  })
})

describe('parsePrayerSettings', () => {
  it('reads valid settings as they are', () => {
    expect(parsePrayerSettings(JSON.stringify(LAGOS))).toEqual(LAGOS)
  })

  it.each([null, '', 'not json', 'null', '42', '"text"', '[1, 2]', '{}'])(
    'reads %j as no settings',
    (text) => {
      expect(parsePrayerSettings(text)).toBeNull()
    },
  )

  it('reads settings with an impossible location as none', () => {
    expect(parsePrayerSettings(JSON.stringify({ ...LAGOS, lat: 200 }))).toBeNull()
    expect(parsePrayerSettings(JSON.stringify({ ...LAGOS, lng: '3.3' }))).toBeNull()
  })

  it('keeps the location and falls back to the defaults for unknown methods', () => {
    const settings = parsePrayerSettings(
      JSON.stringify({ ...LAGOS, method: 'Tehran', asrMethod: 'other', name: 7 }),
    )

    expect(settings).toEqual({
      lat: 6.5244,
      lng: 3.3792,
      name: 'Saved location',
      method: 'MWL',
      asrMethod: 'standard',
    })
  })
})

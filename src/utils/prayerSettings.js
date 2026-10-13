import { ASR_SHADOW_FACTORS, PRAYER_METHODS } from '@/utils/prayer.js'
import { parseStoredObject } from '@/utils/storage.js'

export const DEFAULT_METHOD = 'MWL'
export const DEFAULT_ASR_METHOD = 'standard'

function isNumberBetween(value, low, high) {
  return typeof value === 'number' && Number.isFinite(value) && value >= low && value <= high
}

export function isValidCoordinates(lat, lng) {
  return isNumberBetween(lat, -90, 90) && isNumberBetween(lng, -180, 180)
}

export function normalisePrayerSettings(settings) {
  if (!isValidCoordinates(settings.lat, settings.lng)) {
    return null
  }

  return {
    lat: settings.lat,
    lng: settings.lng,
    name: typeof settings.name === 'string' && settings.name ? settings.name : 'Saved location',
    method: PRAYER_METHODS.includes(settings.method) ? settings.method : DEFAULT_METHOD,
    asrMethod: Object.hasOwn(ASR_SHADOW_FACTORS, settings.asrMethod)
      ? settings.asrMethod
      : DEFAULT_ASR_METHOD,
  }
}

export function parsePrayerSettings(text) {
  return normalisePrayerSettings(parseStoredObject(text))
}

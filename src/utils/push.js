const COORDINATE_PLACES = 2

export function roundCoordinate(value) {
  const factor = 10 ** COORDINATE_PLACES
  return Math.round(value * factor) / factor
}

// What the server is sent when push is turned on or the settings change. Nothing else leaves the device.
export function pushRequestBody(subscription, saved, items, timezone) {
  return {
    subscription: { endpoint: subscription.endpoint, keys: subscription.keys },
    lat: roundCoordinate(saved.lat),
    lng: roundCoordinate(saved.lng),
    timezone,
    method: saved.method,
    asrMethod: saved.asrMethod,
    items,
  }
}

export function applicationServerKey(publicKey) {
  const padded = publicKey.replace(/-/g, '+').replace(/_/g, '/')
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0))
}

export function isIosDevice(userAgent) {
  return /iPhone|iPad|iPod/.test(userAgent)
}

// 'ready', 'unsupported', 'not-configured' or 'ios-not-installed'
export function pushAvailability({ publicKey, hasPushManager, userAgent, installed }) {
  if (!publicKey) {
    return 'not-configured'
  }

  if (isIosDevice(userAgent) && !installed) {
    return 'ios-not-installed'
  }

  return hasPushManager ? 'ready' : 'unsupported'
}

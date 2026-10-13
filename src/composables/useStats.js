import { ACTIONS, sourceName, shouldCount, hitUrl, sourceTag } from '@/utils/stats.js'

const OPT_OUT_KEY = 'stats-opt-out'
const LIVE_HOST = 'islamichub.xyz'

function getEndpoint() {
  return import.meta.env.VITE_STATS_ENDPOINT || ''
}

function getHostname() {
  return location.hostname
}

function getDoNotTrack() {
  // Navigator.doNotTrack can be '1', 'yes', 'unspecified', or undefined
  return navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || 'unspecified'
}

function getGlobalPrivacyControl() {
  // Global Privacy Control signal
  return navigator.globalPrivacyControl === true
}

function getScreenWidth() {
  return window.screen?.width || 0
}

function getRandomValue() {
  // 6-character random string to defeat caching
  return Math.random().toString(36).substring(2, 8)
}

function getReferrer() {
  return document.referrer || ''
}

function isOptedOut() {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === '1'
  } catch {
    return false
  }
}

function setOptOut(on) {
  try {
    if (on) {
      localStorage.setItem(OPT_OUT_KEY, '1')
    } else {
      localStorage.removeItem(OPT_OUT_KEY)
    }
  } catch {
    // storage blocked — choice lasts for session only
  }
}

function buildHit(route, options = {}) {
  const { source, action = false } = options
  return {
    path: route.path,
    title: route.meta?.title || document.title || '',
    source,
    action,
    screenWidth: getScreenWidth(),
    random: getRandomValue(),
  }
}

function sendHit(endpoint, hit) {
  const url = hitUrl(endpoint, hit)
  if (navigator.sendBeacon) {
    try {
      navigator.sendBeacon(url)
    } catch {
      // sendBeacon threw — non-critical
    }
  }
  // If sendBeacon unavailable or threw, we drop the hit (no fallback, no queue)
}

let firstPageView = true

export function countPage(route, tag = '') {
  const endpoint = getEndpoint()
  if (
    !shouldCount({
      endpoint,
      hostname: getHostname(),
      liveHost: LIVE_HOST,
      doNotTrack: getDoNotTrack(),
      globalPrivacyControl: getGlobalPrivacyControl(),
      optedOut: isOptedOut(),
    })
  ) {
    return
  }

  const source = tag || (firstPageView ? sourceName(getReferrer(), LIVE_HOST) : '')
  firstPageView = false

  const hit = buildHit(route, { source })
  sendHit(endpoint, hit)
}

export function track(name) {
  if (!ACTIONS.includes(name)) {
    return
  }

  const endpoint = getEndpoint()
  if (
    !shouldCount({
      endpoint,
      hostname: getHostname(),
      liveHost: LIVE_HOST,
      doNotTrack: getDoNotTrack(),
      globalPrivacyControl: getGlobalPrivacyControl(),
      optedOut: isOptedOut(),
    })
  ) {
    return
  }

  const hit = buildHit(
    { path: location.pathname, meta: { title: document.title } },
    { action: true },
  )
  sendHit(endpoint, hit)
}

export { isOptedOut, setOptOut, sourceTag }

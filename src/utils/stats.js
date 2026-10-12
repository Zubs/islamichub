export const ACTIONS = [
  'prayer times shown',
  'zakat result reached',
  'inheritance result reached',
  'adhkar category completed',
  'tasbih target reached',
]

export function sourceName(referrer, ownHost) {
  if (!referrer) {
    return ''
  }

  try {
    const url = new URL(referrer)
    if (url.hostname === ownHost) {
      return ''
    }
    return url.hostname
  } catch {
    return ''
  }
}

export function shouldCount({
  endpoint,
  hostname,
  liveHost,
  doNotTrack,
  globalPrivacyControl,
  optedOut,
}) {
  if (!endpoint) {
    return false
  }
  if (hostname !== liveHost) {
    return false
  }
  if (doNotTrack === '1') {
    return false
  }
  if (globalPrivacyControl) {
    return false
  }
  if (optedOut) {
    return false
  }
  return true
}

export function hitUrl(endpoint, hit) {
  const { path, title, source, action, screenWidth, random } = hit
  const params = new URLSearchParams()

  // Path without query string
  const pathOnly = path.split('?')[0]
  params.set('p', pathOnly)

  params.set('t', title)

  if (source) {
    params.set('r', source)
  }

  params.set('e', action ? '1' : '0')

  params.set('s', String(screenWidth))

  params.set('b', random)

  return `${endpoint}?${params.toString()}`
}

export function sourceTag(search) {
  if (!search) {
    return ''
  }

  const params = new URLSearchParams(search)
  const tag = params.get('src')

  if (!tag) {
    return ''
  }

  // Only letters, digits, and hyphens allowed, max 20 characters
  if (!/^[a-zA-Z0-9-]{1,20}$/.test(tag)) {
    return ''
  }

  return tag
}

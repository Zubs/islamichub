export const SOURCE_LOCALE = 'en'

// '/prayer' in 'yo' is '/yo/prayer'; the source language has no prefix.
export function localePath(path, code) {
  if (code === SOURCE_LOCALE) {
    return path
  }

  return path === '/' ? `/${code}` : `/${code}${path}`
}

// Splits an address into its language and the address without it.
export function splitLocale(path, codes) {
  const [, first, ...rest] = path.split('/')
  if (first !== SOURCE_LOCALE && codes.includes(first)) {
    return { code: first, path: `/${rest.join('/')}` }
  }

  return { code: SOURCE_LOCALE, path }
}

// The first of the browser's languages the site has, by exact code or by language ('yo-NG' → 'yo').
export function matchLocale(preferred, codes) {
  for (const tag of preferred ?? []) {
    const lower = String(tag).toLowerCase()
    const match = codes.find((code) => lower === code || lower.startsWith(`${code}-`))
    if (match) {
      return match
    }
  }

  return null
}

export function localizedRoutes(routes, code) {
  return routes.map((route) => ({
    ...route,
    path: route.path === '/' ? `/${code}` : `/${code}${route.path}`,
    name: `${code}:${route.name}`,
    meta: { ...route.meta, locale: code },
  }))
}

// Every key of a message file as dotted paths.
export function messageKeys(messages, prefix = '') {
  return Object.entries(messages).flatMap(([key, value]) =>
    value !== null && typeof value === 'object'
      ? messageKeys(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  )
}

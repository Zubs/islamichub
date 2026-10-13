export function parseStoredObject(text) {
  try {
    const value = JSON.parse(text)
    return isPlainObject(value) ? value : {}
  } catch {
    return {}
  }
}

export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function keepEntries(record, isValid) {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => isValid(value)))
}

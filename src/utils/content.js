// A content file is { <section>: { <key>: text, … }, lists: { <name>: [ {…}, … ] } }.

export function lookup(content, path) {
  const [section, key] = path.split('.')
  const text = content?.[section]?.[key]
  return typeof text === 'string' ? text : null
}

// Puts values into a text's {name} places.
export function fill(text, params = {}) {
  return text.replace(/\{(\w+)\}/g, (place, name) =>
    name in params ? String(params[name]) : place,
  )
}

function mergeItem(base, translated) {
  if (Array.isArray(base)) {
    return base.map((entry, index) => mergeItem(entry, translated?.[index]))
  }

  if (base !== null && typeof base === 'object') {
    return Object.fromEntries(
      Object.entries(base).map(([key, value]) => [key, mergeItem(value, translated?.[key])]),
    )
  }

  return typeof translated === typeof base && translated !== '' ? translated : base
}

// A translated list gives only the text it translates; everything else, such as Arabic text,
// references and icons, comes from the source list.
export function mergeList(base, translated) {
  return Array.isArray(translated) ? mergeItem(base, translated) : base
}

const NOT_SECTIONS = ['lists', 'meta']

// A translated content file may record who checked it: meta: { reviewer: 'Name', reviewed: 'YYYY-MM-DD' }
export function sectionsOf(content) {
  return Object.keys(content ?? {}).filter((section) => !NOT_SECTIONS.includes(section))
}

// What a translation of a page still lacks: ['section', 'section.key', 'lists.name', 'reviewer']
export function missingContent(source, translated) {
  const missing = []
  for (const section of sectionsOf(source)) {
    if (!translated?.[section]) {
      missing.push(section)
      continue
    }

    for (const key of Object.keys(source[section])) {
      if (!translated[section][key]) {
        missing.push(`${section}.${key}`)
      }
    }
  }

  for (const [name, items] of Object.entries(source.lists ?? {})) {
    if ((translated?.lists?.[name]?.length ?? 0) < items.length) {
      missing.push(`lists.${name}`)
    }
  }

  if (!translated?.meta?.reviewer) {
    missing.push('reviewer')
  }

  return missing
}

// What a translated content file holds that the source does not: ['section', 'section.key', 'lists.name']
export function unknownContent(source, translated) {
  const unknown = []
  for (const section of sectionsOf(translated)) {
    if (!source[section]) {
      unknown.push(section)
      continue
    }

    for (const key of Object.keys(translated[section])) {
      if (!(key in source[section])) {
        unknown.push(`${section}.${key}`)
      }
    }
  }

  for (const name of Object.keys(translated?.lists ?? {})) {
    const base = source.lists?.[name]
    if (!base || translated.lists[name].length > base.length) {
      unknown.push(`lists.${name}`)
    }
  }

  return unknown
}

// Gives an item of a data file its translated text, by id, leaving the rest as it is.
export function localizeItem(item, translations) {
  const translated = translations?.[item.id ?? item.slug]
  return translated ? { ...item, ...translated } : item
}

export function foldText(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ʿʾ'’`-]/g, '')
    .toLowerCase()
    .trim()
}

export function searchDuas(query, duas, situations) {
  const wanted = foldText(query)
  if (!wanted) {
    return []
  }

  const situationNames = Object.fromEntries(
    situations.map((situation) => [situation.slug, foldText(situation.name)]),
  )
  return duas.filter((dua) =>
    [
      dua.title,
      dua.when,
      dua.translation,
      dua.transliteration,
      ...dua.situations.map((slug) => situationNames[slug] ?? ''),
    ].some((text) => foldText(text).includes(wanted)),
  )
}

export function situationsWithDuas(situations, duas) {
  return situations
    .map((situation) => ({
      ...situation,
      count: duas.filter((dua) => dua.situations.includes(situation.slug)).length,
    }))
    .filter((situation) => situation.count > 0)
}

export function duaPath(dua) {
  return `/duas/${dua.situations[0]}#${dua.id}`
}

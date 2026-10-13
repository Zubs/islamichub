import { HADITH_NUMBER_MAP } from '@/data/hadithNumbering.js'
import { hadithPath } from '@/utils/hadith.js'

// Spellings the site uses for the collections the library holds, longest first.
const COLLECTIONS = [
  ['sahih-bukhari', ['Sahih al-Bukhari', 'Sahih Al-Bukhari', 'Sahih Bukhari', 'Bukhari']],
  ['sahih-muslim', ['Sahih Muslim']],
  ['abu-dawood', ['Sunan Abu Dawud', 'Sunan Abu Dawood', 'Abu Dawud', 'Abu Dawood']],
  [
    'al-tirmidhi',
    ["Jami' Al-Tirmidhi", "Jami' at-Tirmidhi", 'Al-Tirmidhi', 'At-Tirmidhi', 'Tirmidhi'],
  ],
  ['sunan-nasai', ["Sunan An-Nasa'i", "Sunan an-Nasa'i", "An-Nasa'i", "Nasa'i"]],
  ['ibn-e-majah', ['Sunan Ibn Majah', 'Ibn Majah']],
  ['musnad-ahmad', ['Musnad Ahmad']],
  ['mishkat', ['Mishkat al-Masabih', 'Mishkat']],
  ['al-silsila-sahiha', ['Al-Silsila Al-Sahiha', 'Silsilah as-Sahihah']],
]

const SLUG_BY_NAME = new Map(
  COLLECTIONS.flatMap(([slug, names]) => names.map((name) => [name.toLowerCase(), slug])),
)

function escaped(name) {
  return name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const NAMES = [...SLUG_BY_NAME.keys()].sort((a, b) => b.length - a.length).map(escaped)
const CITATION = new RegExp(`(?<![\\w-])(${NAMES.join('|')}) (\\d{1,5})(?![\\d:])`, 'gi')

export function libraryNumber(book, citedNumber, map = HADITH_NUMBER_MAP) {
  return map[book]?.[citedNumber] ?? citedNumber
}

// Splits text into plain parts and hadith references: [{ text }, { text, book, number, to }, …]
export function parseHadithRefs(text, map = HADITH_NUMBER_MAP) {
  const source = String(text ?? '')
  const parts = []
  let position = 0

  for (const match of source.matchAll(CITATION)) {
    if (match.index > position) {
      parts.push({ text: source.slice(position, match.index) })
    }

    const book = SLUG_BY_NAME.get(match[1].toLowerCase())
    const number = Number(match[2])
    parts.push({
      text: match[0],
      book,
      number,
      to: hadithPath(book, libraryNumber(book, number, map)),
    })
    position = match.index + match[0].length
  }

  if (position < source.length) {
    parts.push({ text: source.slice(position) })
  }

  return parts
}

export function hadithRefsIn(text, map = HADITH_NUMBER_MAP) {
  return parseHadithRefs(text, map).filter((part) => part.book)
}

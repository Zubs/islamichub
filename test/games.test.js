// Every fact in a game is a scholarly claim, so every clue, word and question must carry a
// reference that can be followed. This test reads whatever game data exists, so it grows as each
// game's data is written.
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { hadithRefsIn } from '@/utils/hadithRefs.js'
import { HADITH_NUMBER_MAP } from '@/data/hadithNumbering.js'
import ayahCounts from './fixtures/ayahCounts.json'

const GAME_DATA = import.meta.glob('/src/data/games/*.js', { eager: true })
const QURAN_REF = /Qur[’']an (\d+):(\d+)(?:-(\d+))?/g
const COLLECTION =
  /(Sahih Bukhari|Sahih Muslim|Abu Dawud|Al-Tirmidhi|Ibn Majah|Sunan an-Nasa'i) \d+/

function itemsOf(module) {
  return Object.values(module).flatMap((value) =>
    Array.isArray(value) ? value : Object.values(value ?? {}).flat(),
  )
}

const items = Object.entries(GAME_DATA).flatMap(([file, module]) =>
  itemsOf(module)
    .filter((item) => item && typeof item === 'object' && 'reference' in item)
    .map((item) => ({ file, item })),
)

describe('game data', () => {
  it.each(items.map(({ file, item }) => [`${file} ${item.id}`, item]))(
    '%s carries a reference to a verse that exists or a hadith that links',
    (_, item) => {
      expect(item.reference).toMatch(new RegExp(`${QURAN_REF.source}|${COLLECTION.source}`))
      for (const [, surah, first, last] of item.reference.matchAll(QURAN_REF)) {
        for (const ayah of [first, last ?? first].map(Number)) {
          expect(ayah, item.reference).toBeGreaterThanOrEqual(1)
          expect(ayah, item.reference).toBeLessThanOrEqual(ayahCounts[Number(surah) - 1])
        }
      }
      for (const ref of hadithRefsIn(item.reference).filter(
        ({ book }) => book === 'sahih-muslim',
      )) {
        expect(HADITH_NUMBER_MAP['sahih-muslim'][ref.number], ref.text).toBeDefined()
      }
    },
  )

  it('gives every item an id unique within its game', () => {
    for (const [file, module] of Object.entries(GAME_DATA)) {
      const ids = itemsOf(module)
        .map((item) => item?.id)
        .filter(Boolean)
      expect(new Set(ids).size, file).toBe(ids.length)
    }
  })
})

describe('game views', () => {
  const folder = resolve(process.cwd(), 'src/views/games')
  const views = readdirSync(folder).filter((file) => file.endsWith('.vue'))

  it.each(views)('%s shows no image of a person', (file) => {
    const source = readFileSync(resolve(folder, file), 'utf8')

    expect(source).not.toMatch(/<img\b/)
    expect(source).not.toMatch(
      /[\u{1F464}-\u{1F477}\u{1F57A}\u{1F600}-\u{1F64F}\u{1F9D1}-\u{1F9DD}]/u,
    )
  })
})

describe('the prophets quiz bank', () => {
  const bank = GAME_DATA['/src/data/games/quiz.js'].default
  const MIN_QUESTIONS = 300

  it(`holds at least ${MIN_QUESTIONS} questions, with every prophet asked about at least twice`, async () => {
    const { PROPHETS } = await import('@/data/prophets.js')

    expect(bank.length).toBeGreaterThanOrEqual(MIN_QUESTIONS)
    for (const prophet of PROPHETS) {
      expect(
        bank.filter((question) => question.prophet === prophet.slug).length,
        prophet.slug,
      ).toBeGreaterThanOrEqual(2)
    }
  })

  it('gives every question a level, with enough at each level for several attempts', async () => {
    const { LEVELS } = await import('@/stores/games.js')

    for (const question of bank) {
      expect(LEVELS, question.id).toContain(question.level)
    }
    for (const level of LEVELS) {
      expect(bank.filter((question) => question.level === level).length, level).toBeGreaterThanOrEqual(
        50,
      )
    }
  })

  it('gives every question four different answers, one of them right', () => {
    for (const question of bank) {
      expect(question.answers, question.id).toHaveLength(4)
      expect(new Set(question.answers).size, question.id).toBe(4)
      expect(question.answers[question.right], question.id).toBeTruthy()
    }
  })
})

describe('the clues of Who am I?', () => {
  const clues = GAME_DATA['/src/data/games/whoAmI.js'].default

  it('has at least two clues for every prophet', async () => {
    const { PROPHETS } = await import('@/data/prophets.js')

    for (const prophet of PROPHETS) {
      expect(clues[prophet.slug]?.length ?? 0, prophet.slug).toBeGreaterThanOrEqual(2)
    }
  })

  it('never names the prophet a clue is about', async () => {
    const { PROPHETS } = await import('@/data/prophets.js')

    for (const prophet of PROPHETS) {
      const name = prophet.name.replace(/[‘’']/g, '').toLowerCase()
      for (const clue of clues[prophet.slug]) {
        expect(clue.text.replace(/[‘’']/g, '').toLowerCase(), clue.id).not.toContain(name)
      }
    }
  })
})

describe('the words of Kalimah', () => {
  const words = GAME_DATA['/src/data/games/kalimah.js'].default
  const MIN_WORDS = 365

  it(`holds at least ${MIN_WORDS} words, one for every day of a year`, () => {
    expect(words.length).toBeGreaterThanOrEqual(MIN_WORDS)
    expect(new Set(words.map((word) => word.unvocalised)).size).toBe(words.length)
  })

  it('writes every word with keys on the Arabic keyboard and every transliteration in a-z', async () => {
    const { isKey, lettersOf } = await import('@/utils/kalimah.js')

    for (const word of words) {
      expect(lettersOf(word.unvocalised).every((letter) => isKey(letter, 'arabic')), word.id).toBe(
        true,
      )
      expect(word.transliteration, word.id).toMatch(/^[a-z]{3,}$/)
      expect(word.meaning, word.id).toBeTruthy()
      expect(word.verseArabic, word.id).toBeTruthy()
      expect(word.translation, word.id).toBeTruthy()
    }
  })

  it('gives every word the Arabic that the verse holds', () => {
    const marks = /[ً-ٰٟ]/g
    const plain = (text) => text.normalize('NFD').replace(marks, '').replace(/ٱ/g, 'ا')

    for (const word of words) {
      expect(plain(word.arabic).normalize('NFD').replace(/[ٓ-ٕ]/g, ''), word.id).toBe(
        word.unvocalised,
      )
      expect(plain(word.verseArabic), word.id).toContain(plain(word.arabic))
    }
  })
})

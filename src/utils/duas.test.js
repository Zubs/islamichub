import { describe, it, expect } from 'vitest'
import { foldText, searchDuas, situationsWithDuas, duaPath } from './duas.js'
import { DUAS, DUA_SITUATIONS, getDuasBySituation, getSituation } from '@/data/duas.js'
import { hadithRefsIn } from '@/utils/hadithRefs.js'

const ARABIC_LETTERS = /[ء-ي]/
const QURAN_REFERENCE = /^Qur'an \d{1,3}:\d{1,3}(-\d{1,3})?$/

describe('duas collection', () => {
  it('holds at least 40 duas across the ten situations', () => {
    expect(DUAS.length).toBeGreaterThanOrEqual(40)
    expect(DUA_SITUATIONS.map((situation) => situation.slug)).toEqual([
      'travel',
      'eating',
      'home',
      'mosque',
      'clothing',
      'weather',
      'distress',
      'illness',
      'forgiveness',
      'parents-and-family',
    ])
    for (const situation of DUA_SITUATIONS) {
      expect(getDuasBySituation(situation.slug).length, situation.slug).toBeGreaterThanOrEqual(2)
    }
  })

  it.each(DUAS)(
    '$id has Arabic, transliteration, translation, a reference and a situation',
    (dua) => {
      expect(dua.arabic).toMatch(ARABIC_LETTERS)
      expect(dua.arabic).not.toMatch(/[A-Za-z"�]/)
      expect(dua.transliteration.length).toBeGreaterThan(5)
      expect(dua.transliteration).not.toMatch(ARABIC_LETTERS)
      expect(dua.translation.length).toBeGreaterThan(10)
      expect(dua.title.length).toBeGreaterThan(3)
      expect(dua.when.length).toBeGreaterThan(5)
      expect(Number.isInteger(dua.repeat) && dua.repeat >= 1).toBe(true)
      expect(dua.situations.length).toBeGreaterThan(0)
      for (const slug of dua.situations) {
        expect(getSituation(slug), slug).not.toBeNull()
      }

      const hadith = hadithRefsIn(dua.reference)
      expect(hadith.length === 1 || QURAN_REFERENCE.test(dua.reference), dua.reference).toBe(true)
    },
  )

  it('lists no dua twice', () => {
    expect(new Set(DUAS.map((dua) => dua.id)).size).toBe(DUAS.length)
    expect(new Set(DUAS.map((dua) => dua.arabic)).size).toBe(DUAS.length)
  })

  it('uses ids that work as page anchors', () => {
    for (const dua of DUAS) {
      expect(dua.id).toMatch(/^[a-z][a-z0-9-]*$/)
    }
  })

  it('puts a dua that fits two situations under both', () => {
    const arriving = DUAS.find((dua) => dua.id === 'arriving')

    expect(arriving.situations).toEqual(['travel', 'home'])
    expect(getDuasBySituation('travel')).toContain(arriving)
    expect(getDuasBySituation('home')).toContain(arriving)
  })
})

describe('situationsWithDuas', () => {
  const situations = [
    { slug: 'a', name: 'A' },
    { slug: 'b', name: 'B' },
    { slug: 'c', name: 'C' },
  ]
  const duas = [
    { id: 'one', situations: ['a'] },
    { id: 'two', situations: ['a', 'c'] },
  ]

  it('counts the duas in each situation and leaves out one with none', () => {
    expect(situationsWithDuas(situations, duas).map(({ slug, count }) => [slug, count])).toEqual([
      ['a', 2],
      ['c', 1],
    ])
  })

  it('gives a count to every real situation that matches its page', () => {
    for (const situation of situationsWithDuas(DUA_SITUATIONS, DUAS)) {
      expect(situation.count).toBe(getDuasBySituation(situation.slug).length)
    }
  })
})

describe('searchDuas', () => {
  const search = (query) => searchDuas(query, DUAS, DUA_SITUATIONS).map((dua) => dua.id)

  it('finds the travel duas by the name of their situation, in any letter case', () => {
    const travel = getDuasBySituation('travel').map((dua) => dua.id)

    expect(search('travel')).toEqual(expect.arrayContaining(travel))
    expect(search('TRAVEL')).toEqual(search('travel'))
    expect(search('  Travel ')).toEqual(search('travel'))
  })

  it('finds a dua by a word in its translation', () => {
    expect(search('rain')).toEqual(expect.arrayContaining(['rain', 'after-rain', 'too-much-rain']))
  })

  it('finds a transliteration whether or not its marks are typed', () => {
    expect(search('bismillah')).toEqual(search('bismillāh'))
    expect(search('bismillah')).toContain('before-eating')
    expect(search('allahumma').length).toBeGreaterThan(5)
    expect(search("a'udhu")).toEqual(search('aʿūdhu'))
  })

  it('gives nothing for an empty search', () => {
    expect(search('')).toEqual([])
    expect(search('   ')).toEqual([])
  })

  it('handles a one-letter search and a very long one without error', () => {
    expect(search('a').length).toBeGreaterThan(0)
    expect(search('rain '.repeat(2000))).toEqual([])
  })

  it('gives nothing when no dua matches', () => {
    expect(search('zzzzqqq')).toEqual([])
  })
})

describe('foldText and duaPath', () => {
  it('lower-cases and strips the marks used in transliteration', () => {
    expect(foldText('Aʿūdhu bi-kalimāti-llāh')).toBe('audhu bikalimatillah')
    expect(foldText(null)).toBe('')
  })

  it('links a dua to its anchor on its first situation', () => {
    expect(duaPath({ id: 'farewell', situations: ['travel'] })).toBe('/duas/travel#farewell')
  })
})

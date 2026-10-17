import { describe, it, expect } from 'vitest'
import { addDays } from '@/utils/day.js'
import {
  wordFor,
  answerFor,
  isComplete,
  mark,
  isWon,
  isOver,
  keyMarks,
  shareGrid,
  isKey,
  TRIES,
} from '@/utils/kalimah.js'

const words = [
  { id: 'a', unvocalised: 'نور', transliteration: 'nur' },
  { id: 'b', unvocalised: 'صبر', transliteration: 'sabr' },
  { id: 'c', unvocalised: 'رحمة', transliteration: 'rahma' },
]

describe('wordFor', () => {
  it('gives the same word for the same day, whatever the time', () => {
    expect(wordFor('2026-10-17', words)).toBe(wordFor('2026-10-17', words))
  })

  it('gives a different word on the following day', () => {
    expect(wordFor(addDays('2026-10-17', 1), words)).not.toBe(wordFor('2026-10-17', words))
  })

  it('goes through every word before repeating one', () => {
    const days = [0, 1, 2].map((offset) => wordFor(addDays('2026-10-17', offset), words).id)
    expect(new Set(days).size).toBe(3)
  })

  it('works for days before the list began', () => {
    expect(words).toContain(wordFor('2020-01-01', words))
  })
})

describe('answerFor', () => {
  it('uses the Arabic letters or the transliteration', () => {
    expect(answerFor(words[1], 'arabic')).toBe('صبر')
    expect(answerFor(words[1], 'latin')).toBe('sabr')
  })
})

describe('isComplete', () => {
  it('accepts only a guess as long as the word', () => {
    expect(isComplete('rah', 'rahma')).toBe(false)
    expect(isComplete('ruhma', 'rahma')).toBe(true)
    expect(isComplete('نار', 'نور')).toBe(true)
  })
})

describe('mark', () => {
  it('marks letters in place, elsewhere and absent', () => {
    expect(mark('bars', 'sabr')).toEqual(['present', 'right', 'present', 'present'])
    expect(mark('نار', 'نور')).toEqual(['right', 'absent', 'right'])
  })

  it('marks a repeated letter present only as often as the word has it', () => {
    expect(mark('bbxy', 'sabr')).toEqual(['present', 'absent', 'absent', 'absent'])
  })

  it('marks the place first when a repeated letter is also in place', () => {
    expect(mark('xaaxa', 'rahma')).toEqual(['absent', 'right', 'absent', 'absent', 'right'])
  })
})

describe('the end of a game', () => {
  it('is won when the word is guessed', () => {
    expect(isWon(['sabr'], 'sabr')).toBe(true)
    expect(isOver(['sabr'], 'sabr')).toBe(true)
  })

  it('is lost after six wrong tries', () => {
    const guesses = Array.from({ length: TRIES }, () => 'bars')
    expect(isWon(guesses, 'sabr')).toBe(false)
    expect(isOver(guesses, 'sabr')).toBe(true)
    expect(isOver(guesses.slice(1), 'sabr')).toBe(false)
  })
})

describe('keyMarks', () => {
  it('keeps the best mark each letter has had', () => {
    expect(keyMarks(['bxyz', 'sabr'], 'sabr')).toMatchObject({ b: 'right', x: 'absent' })
  })
})

describe('shareGrid', () => {
  it('gives one row of squares per guess and never the word', () => {
    const grid = shareGrid(['bars', 'sabr'], 'sabr')
    expect(grid).toBe('🟨🟩🟨🟨\n🟩🟩🟩🟩')
    expect(grid).not.toMatch(/[a-z]/)
  })
})

describe('isKey', () => {
  it('knows the keys of each keyboard', () => {
    expect(isKey('ص', 'arabic')).toBe(true)
    expect(isKey('أ', 'arabic')).toBe(false)
    expect(isKey('q', 'latin')).toBe(true)
    expect(isKey('ص', 'latin')).toBe(false)
  })
})

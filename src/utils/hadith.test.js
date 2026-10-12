import { describe, it, expect } from 'vitest'
import {
  gradeStyle,
  gradeLabel,
  isHadithNumber,
  hadithPath,
  hadithCopyText,
  lastHadithNumber,
  summarise,
} from './hadith.js'

describe('hadith helpers', () => {
  it('gives each known grade its own badge and anything else the neutral one', () => {
    expect(gradeStyle('Sahih').color).toBe('var(--green)')
    expect(gradeStyle('Daif')).toEqual(gradeStyle("Da'eef"))
    expect(gradeStyle(undefined)).toEqual(gradeStyle('Something new'))
    expect(gradeLabel('')).toBe('Ungraded')
    expect(gradeLabel('Hasan')).toBe('Hasan')
  })

  it.each(['1', '7563', 42])('accepts %j as a hadith number', (text) => {
    expect(isHadithNumber(text)).toBe(true)
  })

  it.each(['0', '-1', 'abc', '1.5', '', '01', '12a', ' 3', '99999999', undefined])(
    'rejects %j as a hadith number',
    (text) => {
      expect(isHadithNumber(text)).toBe(false)
    },
  )

  it('builds the address of a hadith', () => {
    expect(hadithPath('sahih-bukhari', 1904)).toBe('/hadith/books/sahih-bukhari/hadith/1904')
  })

  it('formats copied text as the English text, then the book and number', () => {
    const text = hadithCopyText(
      { hadithEnglish: 'Actions are by intentions.', hadithNumber: '1' },
      'Sahih Al-Bukhari',
    )

    expect(text).toBe('Actions are by intentions.\n\n— Sahih Al-Bukhari, Hadith 1')
  })

  it("reads a book's last hadith number, or none", () => {
    expect(lastHadithNumber({ hadithCount: '7563' })).toBe(7563)
    expect(lastHadithNumber({ hadithCount: 'many' })).toBeNull()
    expect(lastHadithNumber(null)).toBeNull()
  })

  it('shortens long text to a description and leaves short text alone', () => {
    expect(summarise('Short  text\nhere')).toBe('Short text here')
    expect(summarise('word '.repeat(80))).toHaveLength(155)
    expect(summarise('word '.repeat(80)).endsWith('…')).toBe(true)
    expect(summarise(null)).toBe('')
  })
})

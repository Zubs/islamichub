import { describe, it, expect } from 'vitest'
import { parseHadithRefs, hadithRefsIn, libraryNumber } from './hadithRefs.js'
import { BOOKS_META } from '@/composables/useHadithApi.js'

describe('parseHadithRefs', () => {
  it('reads one reference as one link', () => {
    expect(parseHadithRefs('Sahih Muslim 2691')).toEqual([
      {
        text: 'Sahih Muslim 2691',
        book: 'sahih-muslim',
        number: 2691,
        to: '/hadith/books/sahih-muslim/hadith/6842',
      },
    ])
  })

  it('reads two references and keeps the separator between them', () => {
    const parts = parseHadithRefs('Sahih Bukhari 1904 · Sahih Muslim 1151')

    expect(parts.map((part) => part.text)).toEqual([
      'Sahih Bukhari 1904',
      ' · ',
      'Sahih Muslim 1151',
    ])
    expect(parts[0].to).toBe('/hadith/books/sahih-bukhari/hadith/1904')
    expect(parts[1].to).toBeUndefined()
    expect(parts[2].to).toBe('/hadith/books/sahih-muslim/hadith/2704')
  })

  it('links only the reference inside a sentence', () => {
    const parts = parseHadithRefs('…let him pray it when he remembers it." (Sahih Muslim 684)')

    expect(parts.map((part) => part.text).join('')).toBe(
      '…let him pray it when he remembers it." (Sahih Muslim 684)',
    )
    expect(parts.filter((part) => part.to).map((part) => part.text)).toEqual(['Sahih Muslim 684'])
  })

  it.each([
    ['Sahih al-Bukhari 6736', 'sahih-bukhari'],
    ['Bukhari 6736', 'sahih-bukhari'],
    ['Abu Dawud 5072', 'abu-dawood'],
    ['Abu Dawood 5072', 'abu-dawood'],
    ['Al-Tirmidhi 3389', 'al-tirmidhi'],
    ["An-Nasa'i 1347", 'sunan-nasai'],
    ['Ibn Majah 224', 'ibn-e-majah'],
    ['Musnad Ahmad 22978', 'musnad-ahmad'],
  ])('recognises %s', (text, book) => {
    expect(hadithRefsIn(text).map((part) => part.book)).toEqual([book])
  })

  it('links only to books the library holds', () => {
    const held = BOOKS_META.map((book) => book.slug)

    for (const part of hadithRefsIn(
      "Bukhari 1, Sahih Muslim 2, Abu Dawud 3, Tirmidhi 4, Nasa'i 5, Ibn Majah 6, Musnad Ahmad 7, Mishkat 8",
    )) {
      expect(held).toContain(part.book)
    }
  })

  it.each([
    'Muwatta Malik 1617',
    "Qur'an 2:255",
    "Qur'an 112, 113, 114",
    'Ibn Qudama, Al-Mughni',
    'AAOIFI Standard No. 35',
    'Sahih Muslim',
    'narrated by Muslim scholars in 1904',
    '',
  ])('leaves %j as plain text', (text) => {
    expect(hadithRefsIn(text)).toEqual([])
    expect(
      parseHadithRefs(text)
        .map((part) => part.text)
        .join(''),
    ).toBe(text)
  })

  it('links the hadith and not the Qur’an reference beside it', () => {
    const parts = parseHadithRefs("Qur'an 9:34 · Abu Dawud 1558")

    expect(parts.map((part) => [part.text, !!part.to])).toEqual([
      ["Qur'an 9:34 · ", false],
      ['Abu Dawud 1558', true],
    ])
  })

  it('handles a comma-separated pair', () => {
    expect(hadithRefsIn('Abu Dawud 5072, Al-Tirmidhi 3389').map((part) => part.to)).toEqual([
      '/hadith/books/abu-dawood/hadith/5072',
      '/hadith/books/al-tirmidhi/hadith/3389',
    ])
  })

  it('links a mapped reference to the mapped number while showing the cited one', () => {
    const map = { 'sahih-muslim': { 1151: 2707 } }
    const [part] = parseHadithRefs('Sahih Muslim 1151', map)

    expect(part.text).toBe('Sahih Muslim 1151')
    expect(part.number).toBe(1151)
    expect(part.to).toBe('/hadith/books/sahih-muslim/hadith/2707')
    expect(libraryNumber('sahih-muslim', 1152, map)).toBe(1152)
    expect(libraryNumber('sahih-bukhari', 1151, map)).toBe(1151)
  })

  it('treats nothing as text', () => {
    expect(parseHadithRefs(null)).toEqual([])
    expect(parseHadithRefs(undefined)).toEqual([])
  })
})

import { describe, it, expect } from 'vitest'
import { parsePeople, shareOptions } from './qurbani.js'

// Counted by hand: [people, small only, large only (animals, spare shares), mixed (large + small)]
const HAND_COUNT = [
  [1, 1, [1, 6], null],
  [2, 2, [1, 5], null],
  [3, 3, [1, 4], null],
  [4, 4, [1, 3], null],
  [5, 5, [1, 2], null],
  [6, 6, [1, 1], null],
  [7, 7, [1, 0], null],
  [8, 8, [2, 6], [1, 1]],
  [9, 9, [2, 5], [1, 2]],
  [10, 10, [2, 4], [1, 3]],
  [11, 11, [2, 3], [1, 4]],
  [12, 12, [2, 2], [1, 5]],
  [13, 13, [2, 1], [1, 6]],
  [14, 14, [2, 0], null],
  [15, 15, [3, 6], [2, 1]],
  [16, 16, [3, 5], [2, 2]],
  [17, 17, [3, 4], [2, 3]],
  [18, 18, [3, 3], [2, 4]],
  [19, 19, [3, 2], [2, 5]],
  [20, 20, [3, 1], [2, 6]],
  [21, 21, [3, 0], null],
]

describe('parsePeople', () => {
  it('gives nothing when nothing is entered', () => {
    expect(parsePeople('')).toBeNull()
    expect(parsePeople('   ')).toBeNull()
    expect(parsePeople(null)).toBeNull()
  })

  it('reads a whole number of people', () => {
    expect(parsePeople('5')).toEqual({ people: 5 })
    expect(parsePeople(' 14 ')).toEqual({ people: 14 })
    expect(parsePeople(8)).toEqual({ people: 8 })
  })

  it.each(['0', '-3', '2.5', 'five', '1e3', '7 people', '99999999999999999999'])(
    'rejects %s',
    (value) => {
      expect(parsePeople(value)).toEqual({ error: true })
    },
  )
})

describe('shareOptions', () => {
  it('offers one person a sheep or goat, or one share of a larger animal', () => {
    expect(shareOptions(1)).toEqual([
      { small: 1, large: 0, spare: 0 },
      { small: 0, large: 1, spare: 6 },
    ])
  })

  it('offers five people five small animals or five shares of one large animal', () => {
    expect(shareOptions(5)).toEqual([
      { small: 5, large: 0, spare: 0 },
      { small: 0, large: 1, spare: 2 },
    ])
  })

  it('offers seven people seven small animals or one full large animal', () => {
    expect(shareOptions(7)).toEqual([
      { small: 7, large: 0, spare: 0 },
      { small: 0, large: 1, spare: 0 },
    ])
  })

  it('offers eight people a large and a small animal, or two large with six spare shares', () => {
    expect(shareOptions(8)).toEqual([
      { small: 8, large: 0, spare: 0 },
      { small: 1, large: 1, spare: 0 },
      { small: 0, large: 2, spare: 6 },
    ])
  })

  it('fills two large animals exactly with fourteen people', () => {
    expect(shareOptions(14)).toContainEqual({ small: 0, large: 2, spare: 0 })
    expect(shareOptions(14)).toHaveLength(2)
  })

  it('answers a very large number at once', () => {
    const started = performance.now()
    const options = shareOptions(7_000_000_000_001)

    expect(options).toEqual([
      { small: 7_000_000_000_001, large: 0, spare: 0 },
      { small: 1, large: 1_000_000_000_000, spare: 0 },
      { small: 0, large: 1_000_000_000_001, spare: 6 },
    ])
    expect(performance.now() - started).toBeLessThan(50)
  })

  it.each(HAND_COUNT)('matches a hand count for %i people', (people, small, large, mixed) => {
    const expected = [{ small, large: 0, spare: 0 }]
    if (mixed) {
      expected.push({ small: mixed[1], large: mixed[0], spare: 0 })
    }
    expected.push({ small: 0, large: large[0], spare: large[1] })

    expect(shareOptions(people)).toEqual(expected)
  })
})

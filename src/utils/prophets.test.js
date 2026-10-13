import { describe, it, expect } from 'vitest'
import { storyNeighbours } from './prophets.js'

const LIST = [
  { slug: 'a', story: true },
  { slug: 'b' },
  { slug: 'c', story: true },
  { slug: 'd' },
  { slug: 'e', story: true },
]

describe('storyNeighbours', () => {
  it('skips prophets without a story in both directions', () => {
    expect(storyNeighbours('c', LIST)).toEqual({ previous: LIST[0], next: LIST[4] })
  })

  it('has no previous story at the start and no next one at the end', () => {
    expect(storyNeighbours('a', LIST)).toEqual({ previous: null, next: LIST[2] })
    expect(storyNeighbours('e', LIST)).toEqual({ previous: LIST[2], next: null })
  })

  it('gives nothing for an unknown prophet or a single story', () => {
    expect(storyNeighbours('zz', LIST)).toEqual({ previous: null, next: null })
    expect(storyNeighbours('a', [LIST[0], LIST[1]])).toEqual({ previous: null, next: null })
  })
})

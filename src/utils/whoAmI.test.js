import { describe, it, expect } from 'vitest'
import {
  chooseProphet,
  startRound,
  revealClue,
  guess,
  giveUp,
  roundScore,
  guessesLeft,
  cluesInOrder,
  startRun,
  addRound,
  bestOfDay,
  GUESSES,
} from './whoAmI.js'

describe('Who am I? rounds', () => {
  it('starts with one clue shown and three guesses', () => {
    expect(startRound('nuh')).toEqual({
      prophet: 'nuh',
      shown: 1,
      wrong: [],
      guesses: 3,
      done: false,
      won: false,
    })
  })

  it('shows the next clue when asked, and no more once all are shown', () => {
    let round = startRound('nuh')
    round = revealClue(round, 3)
    round = revealClue(round, 3)
    expect(round.shown).toBe(3)
    expect(revealClue(round, 3).shown).toBe(3)
  })

  it('scores a right guess after one clue higher than after three', () => {
    const quick = guess(startRound('musa'), 'musa')
    const slow = guess(revealClue(revealClue(startRound('musa'), 5), 5), 'musa')

    expect(quick.won).toBe(true)
    expect(roundScore(quick)).toBe(50)
    expect(roundScore(slow)).toBe(30)
    expect(roundScore(quick)).toBeGreaterThan(roundScore(slow))
  })

  it('marks a wrong guess, keeps the round going, and costs points when it is won', () => {
    let round = guess(startRound('hud'), 'salih')
    expect(round.done).toBe(false)
    expect(round.wrong).toEqual(['salih'])
    round = guess(round, 'hud')
    expect(roundScore(round)).toBe(45)
  })

  it('does not count the same wrong guess twice', () => {
    const round = guess(guess(startRound('hud'), 'salih'), 'salih')
    expect(round.wrong).toEqual(['salih'])
  })

  it('ends with nothing scored when the player gives up', () => {
    const round = giveUp(revealClue(startRound('lut'), 4))
    expect(round.done).toBe(true)
    expect(roundScore(round)).toBe(0)
  })

  it('never scores below zero', () => {
    let round = startRound('musa')
    for (let n = 0; n < 5; n += 1) round = revealClue(round, 7)
    for (const slug of ['adam', 'nuh']) round = guess(round, slug)
    expect(roundScore(guess(round, 'musa'))).toBe(0)
  })

  it('ends the round, lost, when the third guess is wrong', () => {
    let round = startRound('musa')
    for (const slug of ['adam', 'nuh']) round = guess(round, slug)
    expect(round.done).toBe(false)
    expect(guessesLeft(round)).toBe(1)

    round = guess(round, 'hud')
    expect(round).toMatchObject({ done: true, won: false })
    expect(roundScore(round)).toBe(0)
  })

  it('allows two guesses on hard', () => {
    const round = guess(guess(startRound('musa', GUESSES.hard), 'adam'), 'nuh')
    expect(round).toMatchObject({ done: true, won: false })
  })

  it('shows the clues easiest first on easy and hardest first otherwise', () => {
    const clues = ['hardest', 'middle', 'easiest']
    expect(cluesInOrder(clues, 'easy')).toEqual(['easiest', 'middle', 'hardest'])
    expect(cluesInOrder(clues, 'normal')).toEqual(clues)
    expect(cluesInOrder(clues, 'hard')).toEqual(clues)
  })

  it('chooses a prophet not yet played in the run, until all have been', () => {
    for (let n = 0; n < 20; n += 1) {
      expect(chooseProphet(['adam', 'nuh', 'hud'], ['adam', 'hud'], () => n / 20)).toBe('nuh')
    }
    expect(['adam', 'nuh']).toContain(chooseProphet(['adam', 'nuh'], ['adam', 'nuh']))
  })
})

describe('Who am I? runs', () => {
  const won = (prophet) => guess(startRound(prophet), prophet)
  const lost = (prophet) => giveUp(startRound(prophet))

  it('adds up the points of each round won and goes on', () => {
    let run = addRound(startRun(), won('adam'))
    run = addRound(run, guess(revealClue(startRound('nuh'), 5), 'nuh'))

    expect(run).toEqual({ played: ['adam', 'nuh'], correct: 2, points: 90, over: false })
  })

  it('ends at the first round lost, counting it as played', () => {
    const run = addRound(addRound(startRun(), won('adam')), lost('nuh'))

    expect(run).toEqual({ played: ['adam', 'nuh'], correct: 1, points: 50, over: true })
  })

  it('keeps the run with the most points as the day’s best, until the day changes', () => {
    const big = addRound(addRound(addRound(startRun(), won('adam')), won('nuh')), lost('hud'))
    const small = addRound(startRun(), lost('adam'))

    const best = bestOfDay(null, big, '2026-10-17')
    expect(best).toEqual({ day: '2026-10-17', points: 100, rounds: 3, correct: 2 })
    expect(bestOfDay(best, small, '2026-10-17')).toBe(best)
    expect(bestOfDay(best, small, '2026-10-18')).toEqual({
      day: '2026-10-18',
      points: 0,
      rounds: 1,
      correct: 0,
    })
  })
})

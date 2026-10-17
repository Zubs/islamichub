// The rules of Who am I?: a round shows a prophet's clues one at a time, and a right guess scores
// more the fewer clues were needed and the fewer wrong guesses were made. The round is lost when
// the guesses run out. Easy shows the clues easiest first, and hard allows fewer guesses. A game
// is a run of rounds that goes on until a round is lost, adding up the points of each.
export const GUESSES = { easy: 3, normal: 3, hard: 2 }
const BEST_SCORE = 50
const COST_PER_CLUE = 10
const COST_PER_WRONG_GUESS = 5

// A prophet for a new round, drawn with `random`, not one already played in the run until all
// have been.
export function chooseProphet(slugs, played = [], random = Math.random) {
  const unplayed = slugs.filter((slug) => !played.includes(slug))
  const choices = unplayed.length ? unplayed : slugs
  return choices[Math.floor(random() * choices.length)]
}

export function cluesInOrder(clues, level) {
  return level === 'easy' ? [...clues].reverse() : clues
}

export function startRound(prophet, guesses = GUESSES.normal) {
  return { prophet, shown: 1, wrong: [], guesses, done: false, won: false }
}

export function guessesLeft(round) {
  return round.guesses - round.wrong.length
}

export function revealClue(round, clueCount) {
  if (round.done || round.shown >= clueCount) {
    return round
  }
  return { ...round, shown: round.shown + 1 }
}

export function guess(round, slug) {
  if (round.done || round.wrong.includes(slug)) {
    return round
  }
  if (slug === round.prophet) {
    return { ...round, done: true, won: true }
  }
  const wrong = [...round.wrong, slug]
  return { ...round, wrong, done: wrong.length >= round.guesses }
}

export function giveUp(round) {
  return { ...round, done: true, won: false }
}

export function roundScore(round) {
  if (!round.won) {
    return 0
  }
  const lost = COST_PER_CLUE * (round.shown - 1) + COST_PER_WRONG_GUESS * round.wrong.length
  return Math.max(0, BEST_SCORE - lost)
}

export function startRun() {
  return { played: [], correct: 0, points: 0, over: false }
}

export function addRound(run, round) {
  return {
    played: [...run.played, round.prophet],
    correct: run.correct + (round.won ? 1 : 0),
    points: run.points + roundScore(round),
    over: !round.won,
  }
}

// The best run of the day: the one with the most points, kept until the day changes.
export function bestOfDay(best, run, day) {
  if (best?.day === day && best.points >= run.points) {
    return best
  }
  return { day, points: run.points, rounds: run.played.length, correct: run.correct }
}

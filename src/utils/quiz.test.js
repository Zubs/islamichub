import { describe, it, expect } from 'vitest'
import {
  shuffle,
  drawQuestions,
  drawAtLevel,
  answerOrder,
  score,
  QUESTIONS_PER_ATTEMPT,
} from './quiz.js'

// A repeatable random source for tests.
function seeded(seed) {
  let state = seed
  return () => {
    state = (state * 1103515245 + 12345) % 2147483648
    return state / 2147483648
  }
}

const BANK = Array.from({ length: 35 }, (_, index) => `q${index + 1}`)

describe('shuffle', () => {
  it('keeps every item exactly once', () => {
    expect(shuffle(BANK, seeded(1)).sort()).toEqual([...BANK].sort())
  })

  it('does not change the list it is given', () => {
    const list = ['a', 'b', 'c']
    shuffle(list, seeded(2))
    expect(list).toEqual(['a', 'b', 'c'])
  })
})

describe('drawQuestions', () => {
  it('draws ten different questions for a new player', () => {
    const { questions, seen } = drawQuestions(BANK, [], seeded(3))

    expect(questions).toHaveLength(QUESTIONS_PER_ATTEMPT)
    expect(new Set(questions).size).toBe(QUESTIONS_PER_ATTEMPT)
    expect(seen).toEqual(questions)
  })

  it('gives a second attempt none of the first attempt’s questions', () => {
    const first = drawQuestions(BANK, [], seeded(4))
    const second = drawQuestions(BANK, first.seen, seeded(5))

    expect(second.questions.filter((id) => first.questions.includes(id))).toEqual([])
    expect(second.seen).toHaveLength(20)
  })

  it('takes the last unseen questions and fills from the bank once fewer than ten remain', () => {
    const seenAllBut = BANK.slice(0, 31)
    const { questions, seen } = drawQuestions(BANK, seenAllBut, seeded(6))
    const lastFour = BANK.slice(31)

    expect(questions).toHaveLength(10)
    expect(new Set(questions).size).toBe(10)
    expect(questions.filter((id) => lastFour.includes(id)).sort()).toEqual([...lastFour].sort())
    expect(seen).toHaveLength(6)
    expect(seen.every((id) => !lastFour.includes(id))).toBe(true)
  })

  it('draws from the whole bank again once every question has been seen', () => {
    const { questions } = drawQuestions(BANK, BANK, seeded(7))

    expect(questions).toHaveLength(10)
    expect(new Set(questions).size).toBe(10)
  })

  it('ignores remembered ids that are no longer in the bank', () => {
    const { questions } = drawQuestions(BANK, ['gone1', 'gone2'], seeded(8))

    expect(questions.every((id) => BANK.includes(id))).toBe(true)
  })
})

describe('answerOrder and score', () => {
  const question = { answers: ['a', 'b', 'c', 'd'], right: 2 }

  it('puts the four answers in some order, each once', () => {
    expect(answerOrder(question, seeded(9)).sort()).toEqual([0, 1, 2, 3])
  })

  it('counts the right answers, and none for questions left unanswered', () => {
    const questions = [question, { answers: ['w', 'x', 'y', 'z'], right: 0 }, question]

    expect(score(questions, [2, 0, 1])).toBe(2)
    expect(score(questions, [null, null, null])).toBe(0)
  })
})

describe('drawAtLevel', () => {
  const bank = Array.from({ length: 30 }, (_, index) => ({
    id: `q${index}`,
    level: ['easy', 'normal', 'hard'][index % 3],
  }))

  it('draws ten questions of the chosen level only', () => {
    const { questions } = drawAtLevel(bank, 'hard', [])
    const levels = questions.map((id) => bank.find((question) => question.id === id).level)

    expect(questions).toHaveLength(10)
    expect(new Set(levels)).toEqual(new Set(['hard']))
  })

  it('keeps what was seen at other levels', () => {
    const { seen } = drawAtLevel(bank, 'hard', ['q0', 'q1'])

    expect(seen).toEqual(expect.arrayContaining(['q0', 'q1']))
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useGamesStore, GAME_KEYS } from './games.js'

function freshStore() {
  setActivePinia(createPinia())
  return useGamesStore()
}

describe('games store', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('starts with no results and Arabic letters for Kalimah when nothing is stored', () => {
    const store = freshStore()

    expect(store.quizBest).toBeNull()
    expect(store.whoAmIBest).toBeNull()
    expect(store.quizSeen).toEqual([])
    expect(store.quizAttempt).toBeNull()
    expect(store.kalimahMode).toBe('arabic')
    expect(store.kalimahGame).toBeNull()
  })

  it('keeps results across a reload', async () => {
    const store = freshStore()
    store.quizBest = 7
    store.quizSeen = ['q1', 'q2']
    store.kalimahMode = 'latin'
    await nextTick()

    const again = freshStore()
    expect(again.quizBest).toBe(7)
    expect(again.quizSeen).toEqual(['q1', 'q2'])
    expect(again.kalimahMode).toBe('latin')
  })

  it('keeps only a better score as the best', () => {
    const store = freshStore()

    store.recordQuizScore(6)
    store.recordQuizScore(4)
    expect(store.quizBest).toBe(6)
    store.recordQuizScore(9)
    expect(store.quizBest).toBe(9)
    store.recordWhoAmIRun({ played: ['adam'], correct: 0, points: 0, over: true }, '2026-10-17')
    expect(store.whoAmIBest).toBe(0)
    store.recordWhoAmIRun(
      { played: ['adam', 'nuh', 'hud'], correct: 2, points: 90, over: true },
      '2026-10-17',
    )
    expect(store.whoAmIBest).toBe(90)
    expect(store.whoAmIToday).toEqual({ day: '2026-10-17', points: 90, rounds: 3, correct: 2 })
  })

  it.each([
    [GAME_KEYS.quizBest, '"seven"'],
    [GAME_KEYS.quizSeen, '{"not":"a list"}'],
    [GAME_KEYS.quizAttempt, '[1,2,3]'],
    [GAME_KEYS.kalimahMode, '"klingon"'],
    [GAME_KEYS.kalimahGame, 'not json'],
    [GAME_KEYS.whoAmIToday, '{"day":"2026-10-17","points":"lots"}'],
  ])('ignores corrupt data under %s and still opens', (key, stored) => {
    localStorage.setItem(key, stored)
    const store = freshStore()

    expect(store.quizBest).toBeNull()
    expect(store.quizSeen).toEqual([])
    expect(store.quizAttempt).toBeNull()
    expect(store.kalimahMode).toBe('arabic')
    expect(store.kalimahGame).toBeNull()
    expect(store.whoAmIToday).toBeNull()
  })

  it('remembers a level for each game, normal until one is chosen', async () => {
    const store = freshStore()
    expect(store.levelOf('quiz')).toBe('normal')

    store.chooseLevel('quiz', 'hard')
    await nextTick()

    const again = freshStore()
    expect(again.levelOf('quiz')).toBe('hard')
    expect(again.levelOf('kalimah')).toBe('normal')
  })

  it('ignores stored levels that are not easy, normal or hard', () => {
    localStorage.setItem(GAME_KEYS.levels, '{"quiz":"impossible"}')

    expect(freshStore().levelOf('quiz')).toBe('normal')
  })

  it('still works when storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const store = freshStore()

    store.quizBest = 5
    await nextTick()
    expect(store.quizBest).toBe(5)
  })
})

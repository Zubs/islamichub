import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { isPlainObject } from '@/utils/storage.js'
import { bestOfDay } from '@/utils/whoAmI.js'

// Each game keeps its progress and best result on this device under its own key. A value that is
// missing, corrupt or of the wrong shape is ignored, and storage that is blocked is tolerated.
const KEYS = {
  quizBest: 'quiz-best',
  quizSeen: 'quiz-seen',
  quizAttempt: 'quiz-attempt',
  whoAmIBest: 'who-am-i-best',
  whoAmIToday: 'who-am-i-today',
  kalimahMode: 'kalimah-mode',
  kalimahGame: 'kalimah-game',
  levels: 'game-levels',
}

export const LEVELS = ['easy', 'normal', 'hard']
const DEFAULT_LEVEL = 'normal'

function read(key, isValid, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return isValid(value) ? value : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  } catch {
    // storage blocked: the game still plays, but nothing is kept
  }
}

function isScore(value) {
  return Number.isInteger(value) && value >= 0
}

function isIdList(value) {
  return Array.isArray(value) && value.every((id) => typeof id === 'string')
}

function isAttempt(value) {
  return (
    isPlainObject(value) &&
    isIdList(value.questions) &&
    Array.isArray(value.answers) &&
    value.answers.every((answer) => Number.isInteger(answer) || answer === null)
  )
}

function isDayBest(value) {
  return (
    isPlainObject(value) &&
    typeof value.day === 'string' &&
    [value.points, value.rounds, value.correct].every(isScore)
  )
}

function isKalimahGame(value) {
  return (
    isPlainObject(value) &&
    typeof value.day === 'string' &&
    Array.isArray(value.guesses) &&
    value.guesses.every((guess) => typeof guess === 'string') &&
    typeof value.won === 'boolean' &&
    typeof value.counted === 'boolean'
  )
}

function isLevels(value) {
  return isPlainObject(value) && Object.values(value).every((level) => LEVELS.includes(level))
}

function persisted(key, isValid, fallback) {
  const value = ref(read(key, isValid, fallback))
  watch(value, (next) => write(key, next), { deep: true })
  return value
}

export const useGamesStore = defineStore('games', () => {
  const quizBest = persisted(KEYS.quizBest, isScore, null)
  const quizSeen = persisted(KEYS.quizSeen, isIdList, [])
  const quizAttempt = persisted(KEYS.quizAttempt, isAttempt, null)
  const whoAmIBest = persisted(KEYS.whoAmIBest, isScore, null)
  const whoAmIToday = persisted(KEYS.whoAmIToday, isDayBest, null)
  const kalimahMode = persisted(
    KEYS.kalimahMode,
    (mode) => ['arabic', 'latin'].includes(mode),
    'arabic',
  )
  const kalimahGame = persisted(KEYS.kalimahGame, isKalimahGame, null)
  const levels = persisted(KEYS.levels, isLevels, {})

  function levelOf(game) {
    return levels.value[game] ?? DEFAULT_LEVEL
  }

  function chooseLevel(game, level) {
    levels.value = { ...levels.value, [game]: level }
  }

  function better(best, score) {
    return best === null || score > best ? score : best
  }

  function recordQuizScore(score) {
    quizBest.value = better(quizBest.value, score)
  }

  // Before games became runs, `who-am-i-best` held the best single round; a run's total is never
  // less than its best round, so the old value stays a fair best until it is beaten.
  function recordWhoAmIRun(run, day) {
    whoAmIBest.value = better(whoAmIBest.value, run.points)
    whoAmIToday.value = bestOfDay(whoAmIToday.value, run, day)
  }

  return {
    quizBest,
    quizSeen,
    quizAttempt,
    whoAmIBest,
    whoAmIToday,
    kalimahMode,
    kalimahGame,
    levels,
    levelOf,
    chooseLevel,
    recordQuizScore,
    recordWhoAmIRun,
  }
})

export { KEYS as GAME_KEYS }

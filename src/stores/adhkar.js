import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ADHKAR, getAdhkarByCategory } from '@/data/adhkar.js'
import { dayKey, addDays } from '@/utils/day.js'
import { parseStoredObject, keepEntries, isPlainObject } from '@/utils/storage.js'
import { track } from '@/composables/useStats.js'

const LOG_KEY = 'adhkar-completion-log'
const PROGRESS_KEY = 'adhkar-progress' // { day: 'YYYY-MM-DD', counts: { [dhikrId]: count } }

function isCategoryList(value) {
  return Array.isArray(value) && value.every((slug) => typeof slug === 'string')
}

function isCount(value) {
  return Number.isInteger(value) && value > 0
}

function readTodaysCounts() {
  const saved = parseStoredObject(localStorage.getItem(PROGRESS_KEY))
  return saved.day === dayKey() && isPlainObject(saved.counts)
    ? keepEntries(saved.counts, isCount)
    : {}
}

export const useAdhkarStore = defineStore('adhkar', () => {
  // ── State ────────────────────────────────────────────────────
  // completionLog: { '2026-07-21': ['morning', 'after-salah'], ... }
  const completionLog = ref(
    keepEntries(parseStoredObject(localStorage.getItem(LOG_KEY)), isCategoryList),
  )
  // progress: { [dhikrId]: countDoneInCurrentPass } — today's counts, cleared when a category is marked complete
  const progress = ref(readTodaysCounts())

  // ── Persistence ──────────────────────────────────────────────
  function persistLog() {
    localStorage.setItem(LOG_KEY, JSON.stringify(completionLog.value))
  }

  function persistProgress() {
    const counts = keepEntries(progress.value, isCount)
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({ day: dayKey(), counts }))
    } catch {
      // storage is full or blocked; counts still work until the page is closed
    }
  }

  // ── Progress tracking ────────────────────────────────────────
  function tap(dhikrId, target) {
    const current = progress.value[dhikrId] || 0
    // tapping past the target resets, for a satisfying "done" state
    progress.value[dhikrId] = current >= target ? 0 : current + 1
    persistProgress()
  }

  function resetDhikr(dhikrId) {
    progress.value[dhikrId] = 0
    persistProgress()
  }

  function progressFor(dhikrId) {
    return progress.value[dhikrId] || 0
  }

  // ── Category completion & streaks ────────────────────────────
  function isCategoryCompletedToday(slug) {
    return !!completionLog.value[dayKey()]?.includes(slug)
  }

  function completeCategory(slug) {
    const key = dayKey()
    const today = completionLog.value[key] || []
    if (!today.includes(slug)) {
      completionLog.value[key] = [...today, slug]
      persistLog()
      track('adhkar category completed')
    }

    const completed = getAdhkarByCategory(slug).map((d) => d.id)
    progress.value = Object.fromEntries(
      Object.entries(progress.value).filter(([key]) => !completed.includes(key.split(':')[0])),
    )
    persistProgress()
  }

  function streakForCategory(slug) {
    let streak = 0
    let key = dayKey()
    while (completionLog.value[key]?.includes(slug)) {
      streak++
      key = addDays(key, -1)
    }

    return streak
  }

  const totalDhikrCount = computed(() => ADHKAR.length)

  return {
    completionLog,
    progress,
    tap,
    resetDhikr,
    progressFor,
    isCategoryCompletedToday,
    completeCategory,
    streakForCategory,
    totalDhikrCount,
  }
})

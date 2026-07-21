import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ADHKAR, getAdhkarByCategory } from '@/data/adhkar.js'

const LOG_KEY = 'adhkar-completion-log'
const PROGRESS_KEY = 'adhkar-session-progress'

function loadLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || '{}')
  } catch {
    return {}
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

export const useAdhkarStore = defineStore('adhkar', () => {
  // ── State ────────────────────────────────────────────────────
  // completionLog: { '2026-07-21': ['morning', 'after-salah'], ... }
  const completionLog = ref(loadLog())
  // progress: { [dhikrId]: countDoneInCurrentPass } — resets when a category is marked complete
  const progress = ref({})

  // ── Persistence ──────────────────────────────────────────────
  function persistLog() {
    localStorage.setItem(LOG_KEY, JSON.stringify(completionLog.value))
  }

  // ── Progress tracking ────────────────────────────────────────
  function tap(dhikrId, target) {
    const current = progress.value[dhikrId] || 0
    if (current >= target) {
      // allow reset-on-overtap for a satisfying "done" state
      progress.value[dhikrId] = 0
      return
    }

    progress.value[dhikrId] = current + 1
  }

  function resetDhikr(dhikrId) {
    progress.value[dhikrId] = 0
  }

  function progressFor(dhikrId) {
    return progress.value[dhikrId] || 0
  }

  // ── Category completion & streaks ────────────────────────────
  function isCategoryCompletedToday(slug) {
    const today = completionLog.value[todayKey()]
    return Array.isArray(today) && today.includes(slug)
  }

  function completeCategory(slug) {
    const key = todayKey()
    const today = completionLog.value[key] || []
    if (!today.includes(slug)) {
      completionLog.value[key] = [...today, slug]
      persistLog()
    }

    // Clear session progress for this category's adhkar
    for (const d of getAdhkarByCategory(slug)) {
      progress.value[d.id] = 0
    }
  }

  function streakForCategory(slug) {
    let streak = 0
    const cursor = new Date()
    for (;;) {
      const key = cursor.toISOString().slice(0, 10)
      const day = completionLog.value[key]
      if (day && day.includes(slug)) {
        streak++
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
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

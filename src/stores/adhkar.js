import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ADHKAR, getAdhkarByCategory } from '@/data/adhkar.js'
import { dayKey, addDays } from '@/utils/day.js'
import { parseStoredObject } from '@/utils/storage.js'

const LOG_KEY = 'adhkar-completion-log'

export const useAdhkarStore = defineStore('adhkar', () => {
  // ── State ────────────────────────────────────────────────────
  // completionLog: { '2026-07-21': ['morning', 'after-salah'], ... }
  const completionLog = ref(parseStoredObject(localStorage.getItem(LOG_KEY)))
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
    const today = completionLog.value[dayKey()]
    return Array.isArray(today) && today.includes(slug)
  }

  function completeCategory(slug) {
    const key = dayKey()
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

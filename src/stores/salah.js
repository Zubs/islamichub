import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dayKey } from '@/utils/day.js'
import { parseSalahLog, salahStreak, canLog, isSalahPrayer, isSalahStatus } from '@/utils/salah.js'

const LOG_KEY = 'salah-log' // { 'YYYY-MM-DD': { fajr: 'on-time' | 'late' | 'missed', … } }

function readLog() {
  try {
    return parseSalahLog(localStorage.getItem(LOG_KEY))
  } catch {
    return {}
  }
}

export const useSalahStore = defineStore('salah', () => {
  const log = ref(readLog())
  const today = ref(dayKey())

  const streak = computed(() => salahStreak(log.value, today.value))

  function persist() {
    try {
      if (Object.keys(log.value).length) {
        localStorage.setItem(LOG_KEY, JSON.stringify(log.value))
      } else {
        localStorage.removeItem(LOG_KEY)
      }
    } catch {
      // storage is full or blocked; the log still works until the page is closed
    }
  }

  function refreshToday() {
    today.value = dayKey()
  }

  function statusOf(day, prayer) {
    return log.value[day]?.[prayer] ?? null
  }

  // Choosing the status a prayer already has clears it.
  function setStatus(day, prayer, status) {
    refreshToday()
    if (!canLog(day, today.value) || !isSalahPrayer(prayer) || !isSalahStatus(status)) {
      return false
    }

    const entry = { ...log.value[day] }
    if (entry[prayer] === status) {
      delete entry[prayer]
    } else {
      entry[prayer] = status
    }

    const next = { ...log.value }
    if (Object.keys(entry).length) {
      next[day] = entry
    } else {
      delete next[day]
    }

    log.value = next
    persist()
    return true
  }

  function clear() {
    log.value = {}
    persist()
  }

  return { log, today, streak, refreshToday, statusOf, setStatus, clear }
})

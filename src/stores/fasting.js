import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dayKey } from '@/utils/day.js'
import {
  parseFastingLog,
  parseRamadanStarts,
  allowedStatuses,
  makeUpSummary,
  voluntaryCount,
} from '@/utils/fasting.js'

const LOG_KEY = 'fasting-log' // { 'YYYY-MM-DD': 'fasted' | 'missed' | 'made-up' | 'voluntary' }
const STARTS_KEY = 'ramadan-starts' // { '<Hijri year>': 'YYYY-MM-DD' }, only dates the user set

function read(key, parse) {
  try {
    return parse(localStorage.getItem(key))
  } catch {
    return {}
  }
}

function write(key, value) {
  try {
    if (Object.keys(value).length) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  } catch {
    // storage is full or blocked; the log still works until the page is closed
  }
}

export const useFastingStore = defineStore('fasting', () => {
  const log = ref(read(LOG_KEY, parseFastingLog))
  const starts = ref(read(STARTS_KEY, parseRamadanStarts))

  const summary = computed(() => makeUpSummary(log.value, starts.value))
  const toMakeUp = computed(() => summary.value.reduce((sum, year) => sum + year.remaining, 0))
  const voluntary = computed(() => voluntaryCount(log.value))

  function statusOf(day) {
    return log.value[day] ?? null
  }

  // Choosing the status a day already has clears it.
  function setStatus(day, status) {
    if (!allowedStatuses(day, dayKey(), starts.value).includes(status)) {
      return false
    }

    const next = { ...log.value }
    if (next[day] === status) {
      delete next[day]
    } else {
      next[day] = status
    }

    log.value = next
    write(LOG_KEY, next)
    return true
  }

  function setRamadanStart(hijriYear, day) {
    const next = { ...starts.value }
    if (day) {
      next[hijriYear] = day
    } else {
      delete next[hijriYear]
    }

    starts.value = parseRamadanStarts(JSON.stringify(next))
    write(STARTS_KEY, starts.value)
  }

  return { log, starts, summary, toMakeUp, voluntary, statusOf, setStatus, setRamadanStart }
})

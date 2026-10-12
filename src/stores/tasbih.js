import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { TASBIH_PHRASES, getPhrase } from '@/data/tasbihPhrases.js'
import { dayKey } from '@/utils/day.js'
import { parseStoredObject, keepEntries, isPlainObject } from '@/utils/storage.js'
import { track } from '@/composables/useStats.js'

const CURRENT_KEY = 'tasbih-current-phrase'
const TOTALS_KEY = 'tasbih-totals' // { [date]: { [phraseId]: count } }

function isCount(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

function readTotals() {
  const days = keepEntries(parseStoredObject(localStorage.getItem(TOTALS_KEY)), isPlainObject)
  return Object.fromEntries(
    Object.entries(days).map(([day, counts]) => [day, keepEntries(counts, isCount)]),
  )
}

export const useTasbihStore = defineStore('tasbih', () => {
  const phrases = TASBIH_PHRASES

  // ── State ────────────────────────────────────────────────────
  const currentId = ref(localStorage.getItem(CURRENT_KEY) || phrases[0].id)
  const count = ref(0) // current session count for the active phrase
  const target = ref(getPhrase(currentId.value).defaultTarget)
  const totals = ref(readTotals()) // persisted per-day, per-phrase totals

  const currentPhrase = computed(() => getPhrase(currentId.value))

  // Switching phrase resets the session counter and target to that phrase's default
  watch(currentId, (id) => {
    localStorage.setItem(CURRENT_KEY, id)
    count.value = 0
    target.value = getPhrase(id).defaultTarget
  })

  // ── Persistence ──────────────────────────────────────────────
  function persistTotals() {
    localStorage.setItem(TOTALS_KEY, JSON.stringify(totals.value))
  }

  // ── Actions ──────────────────────────────────────────────────
  function tap() {
    count.value++

    const key = dayKey()
    if (!totals.value[key]) {
      totals.value[key] = {}
    }

    totals.value[key][currentId.value] = (totals.value[key][currentId.value] || 0) + 1
    persistTotals()

    if (count.value === target.value) {
      if (navigator.vibrate) {
        try {
          navigator.vibrate(60)
        } catch {
          // vibration isn't supported/allowed — non-critical
        }
      }
      track('tasbih target reached')
    }
  }

  function reset() {
    count.value = 0
  }

  function setTarget(n) {
    const v = Math.round(Number(n))
    target.value = v > 0 ? v : 1
  }

  function selectPhrase(id) {
    currentId.value = id
  }

  // ── Stats ────────────────────────────────────────────────────
  const todayTotalForCurrent = computed(() => totals.value[dayKey()]?.[currentId.value] || 0)

  const lifetimeTotalForCurrent = computed(() =>
    Object.values(totals.value).reduce((sum, day) => sum + (day[currentId.value] || 0), 0),
  )

  const todayTotalAllPhrases = computed(() =>
    Object.values(totals.value[dayKey()] || {}).reduce((a, b) => a + b, 0),
  )

  const lifetimeTotalAllPhrases = computed(() =>
    Object.values(totals.value).reduce(
      (sum, day) => sum + Object.values(day).reduce((a, b) => a + b, 0),
      0,
    ),
  )

  return {
    phrases,
    currentId,
    currentPhrase,
    count,
    target,
    tap,
    reset,
    setTarget,
    selectPhrase,
    todayTotalForCurrent,
    lifetimeTotalForCurrent,
    todayTotalAllPhrases,
    lifetimeTotalAllPhrases,
  }
})

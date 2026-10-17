import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isClockTime } from '@/utils/reminders.js'

// The time the khutbah begins at the reader's own mosque, as "HH:MM", kept on this device only.
// It leaves the device only as part of push, when the khutbah reminder is on.
const KHUTBAH_KEY = 'khutbah-time'

function readTime() {
  try {
    const value = JSON.parse(localStorage.getItem(KHUTBAH_KEY))
    return isClockTime(value) ? value : null
  } catch {
    return null
  }
}

export const useJumuahStore = defineStore('jumuah', () => {
  const khutbahTime = ref(readTime())

  // Keeps a valid time, or clears it when given an empty value; returns false for anything else.
  function setKhutbahTime(value) {
    if (value !== '' && value !== null && !isClockTime(value)) {
      return false
    }
    khutbahTime.value = value || null
    try {
      if (khutbahTime.value) {
        localStorage.setItem(KHUTBAH_KEY, JSON.stringify(khutbahTime.value))
      } else {
        localStorage.removeItem(KHUTBAH_KEY)
      }
    } catch {
      // storage is blocked; the time lasts for this visit
    }
    return true
  }

  return { khutbahTime, setKhutbahTime }
})

export { KHUTBAH_KEY }

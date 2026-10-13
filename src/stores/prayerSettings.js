import { defineStore } from 'pinia'
import { ref } from 'vue'
import { normalisePrayerSettings, parsePrayerSettings } from '@/utils/prayerSettings.js'

const SETTINGS_KEY = 'prayer-settings' // { lat, lng, name, method, asrMethod }
const PROBE_KEY = 'prayer-settings-probe'

function readSaved() {
  try {
    return parsePrayerSettings(localStorage.getItem(SETTINGS_KEY))
  } catch {
    return null
  }
}

function storageWorks() {
  try {
    localStorage.setItem(PROBE_KEY, '1')
    localStorage.removeItem(PROBE_KEY)
    return true
  } catch {
    return false
  }
}

export const usePrayerSettingsStore = defineStore('prayerSettings', () => {
  const saved = ref(readSaved())
  const canRemember = ref(storageWorks())

  function remember(settings) {
    const next = normalisePrayerSettings(settings)
    if (!next) {
      return false
    }

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
    } catch {
      canRemember.value = false
      return false
    }

    saved.value = next
    return true
  }

  function setMethods(method, asrMethod) {
    if (saved.value) {
      remember({ ...saved.value, method, asrMethod })
    }
  }

  function forget() {
    saved.value = null
    try {
      localStorage.removeItem(SETTINGS_KEY)
    } catch {
      // storage is blocked, so nothing was kept
    }
  }

  return { saved, canRemember, remember, setMethods, forget }
})

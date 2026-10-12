import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { parseReminderSettings } from '@/utils/reminders.js'

const SETTINGS_KEY = 'reminder-settings' // { enabled, items: { fajr, dhuhr, … } }

function readSettings() {
  try {
    return parseReminderSettings(localStorage.getItem(SETTINGS_KEY))
  } catch {
    return parseReminderSettings(null)
  }
}

export const useRemindersStore = defineStore('reminders', () => {
  const settings = ref(readSettings())
  const supported = ref(typeof Notification !== 'undefined')
  const permission = ref(supported.value ? Notification.permission : 'denied')

  const active = computed(
    () => supported.value && settings.value.enabled && permission.value === 'granted',
  )

  function persist() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings.value))
    } catch {
      // storage is blocked; the choice lasts for this visit
    }
  }

  async function turnOn() {
    if (!supported.value) {
      return false
    }

    permission.value = await Notification.requestPermission()
    const granted = permission.value === 'granted'
    const items = { ...settings.value.items }
    const noneChosen = !Object.values(items).some(Boolean)
    if (granted && noneChosen) {
      for (const prayer of ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']) {
        items[prayer] = true
      }
    }

    settings.value = { enabled: granted, items }
    persist()
    return granted
  }

  function turnOff() {
    settings.value = { ...settings.value, enabled: false }
    persist()
  }

  function setItem(key, on) {
    if (key in settings.value.items) {
      settings.value = { ...settings.value, items: { ...settings.value.items, [key]: on } }
      persist()
    }
  }

  return { settings, supported, permission, active, turnOn, turnOff, setItem }
})

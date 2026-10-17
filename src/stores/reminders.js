import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { parseReminderSettings } from '@/utils/reminders.js'
import { pushRequestBody, applicationServerKey, pushAvailability } from '@/utils/push.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { useJumuahStore } from '@/stores/jumuah.js'

const SETTINGS_KEY = 'reminder-settings' // { enabled, push, items: { fajr, dhuhr, … } }
const PUSH_ADDRESS = '/api/push'
const PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']

function isInstalled() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
}

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
  const pushOn = computed(() => active.value && settings.value.push)
  const pushState = computed(() =>
    pushAvailability({
      publicKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
      hasPushManager: 'PushManager' in window && 'serviceWorker' in navigator,
      userAgent: navigator.userAgent,
      installed: isInstalled(),
    }),
  )

  function persist() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings.value))
    } catch {
      // storage is blocked; the choice lasts for this visit
    }
  }

  // Asks for permission and turns reminders on. When no switch is on yet, `firstItems` are
  // switched on: the five prayers from the Prayer page, or the one chosen elsewhere.
  async function turnOn(firstItems = PRAYERS) {
    if (!supported.value) {
      return false
    }

    permission.value = await Notification.requestPermission()
    const granted = permission.value === 'granted'
    const items = { ...settings.value.items }
    const noneChosen = !Object.values(items).some(Boolean)
    if (granted && noneChosen) {
      for (const item of firstItems) {
        items[item] = true
      }
    }

    settings.value = { ...settings.value, enabled: granted, items }
    persist()
    return granted
  }

  async function turnOff() {
    await turnPushOff()
    settings.value = { ...settings.value, enabled: false }
    persist()
  }

  async function currentSubscription() {
    const registration = await navigator.serviceWorker?.ready
    return (await registration?.pushManager?.getSubscription()) ?? null
  }

  // Saves, or replaces, this device's record on the server.
  async function savePushRecord(subscription) {
    const saved = usePrayerSettingsStore().saved
    const details = subscription.toJSON()
    const response = await fetch(PUSH_ADDRESS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        pushRequestBody(
          details,
          saved,
          settings.value.items,
          Intl.DateTimeFormat().resolvedOptions().timeZone,
          useJumuahStore().khutbahTime,
        ),
      ),
    })
    return response.ok
  }

  async function turnPushOn() {
    if (pushState.value !== 'ready' || !active.value || !usePrayerSettingsStore().saved) {
      return false
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription =
        (await registration.pushManager.getSubscription()) ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey(import.meta.env.VITE_VAPID_PUBLIC_KEY),
        }))
      if (!(await savePushRecord(subscription))) {
        return false
      }
    } catch {
      return false
    }

    settings.value = { ...settings.value, push: true }
    persist()
    return true
  }

  // Deletes this device's record from the server and unsubscribes.
  async function turnPushOff() {
    if (!settings.value.push) {
      return
    }

    settings.value = { ...settings.value, push: false }
    persist()
    try {
      const subscription = await currentSubscription()
      if (subscription) {
        await fetch(PUSH_ADDRESS, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        })
        await subscription.unsubscribe()
      }
    } catch {
      // the server drops a subscription that no longer works on its next send
    }
  }

  // Keeps the server's record in step with the device while push is on.
  async function syncPushRecord() {
    if (!settings.value.push) {
      return
    }

    if (!usePrayerSettingsStore().saved || !Object.values(settings.value.items).some(Boolean)) {
      await turnPushOff()
      return
    }

    const subscription = await currentSubscription().catch(() => null)
    if (subscription) {
      await savePushRecord(subscription).catch(() => false)
    }
  }

  function setItem(key, on) {
    if (key in settings.value.items) {
      settings.value = { ...settings.value, items: { ...settings.value.items, [key]: on } }
      persist()
    }
  }

  return {
    settings,
    supported,
    permission,
    active,
    pushOn,
    pushState,
    turnOn,
    turnOff,
    setItem,
    turnPushOn,
    turnPushOff,
    syncPushRecord,
  }
})

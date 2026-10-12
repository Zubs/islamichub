import { watch } from 'vue'
import { useRemindersStore } from '@/stores/reminders.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { dueReminders, nextMidnight } from '@/utils/reminders.js'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'

const ICON = '/icon-192.png'

let timers = []

function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

async function notify(reminder, open) {
  const options = {
    body: reminder.body,
    icon: ICON,
    tag: reminder.key,
    data: { path: reminder.path },
  }
  const registration = await navigator.serviceWorker?.getRegistration?.().catch(() => null)
  if (registration?.showNotification) {
    await registration.showNotification(reminder.title, options)
    return
  }

  const notification = new Notification(reminder.title, options)
  notification.onclick = () => {
    window.focus()
    open(reminder.path)
    notification.close()
  }
}

// Schedules today's remaining reminders and returns how many were scheduled.
export function scheduleReminders({ open = () => {}, now = new Date() } = {}) {
  const reminders = useRemindersStore()
  const saved = usePrayerSettingsStore().saved
  clearTimers()
  if (!reminders.active || !saved) {
    return 0
  }

  const times = calcPrayerTimes(
    saved.lat,
    saved.lng,
    now,
    getTimezoneOffset(),
    saved.method,
    saved.asrMethod,
  )
  const due = dueReminders(reminders.settings.items, times, now)
  for (const reminder of due) {
    timers.push(
      setTimeout(
        () => notify(reminder, open).catch(() => {}),
        reminder.at.getTime() - now.getTime(),
      ),
    )
  }

  timers.push(
    setTimeout(() => scheduleReminders({ open }), nextMidnight(now).getTime() - now.getTime()),
  )
  return due.length
}

export function startReminders(open) {
  const reminders = useRemindersStore()
  const prayerSettings = usePrayerSettingsStore()
  watch(
    [() => reminders.active, () => reminders.settings.items, () => prayerSettings.saved],
    () => scheduleReminders({ open }),
    { immediate: true, deep: true },
  )

  navigator.serviceWorker?.addEventListener?.('message', (event) => {
    if (event.data?.type === 'open' && typeof event.data.path === 'string') {
      open(event.data.path)
    }
  })
}

export function stopReminders() {
  clearTimers()
}

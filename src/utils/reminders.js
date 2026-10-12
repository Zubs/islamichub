import { parseStoredObject, isPlainObject } from '@/utils/storage.js'

const ADHKAR_DELAY_MINUTES = 20

export const REMINDERS = [
  { key: 'fajr', label: 'Fajr', follows: 'fajr', delay: 0, path: '/tracker' },
  { key: 'dhuhr', label: 'Dhuhr', follows: 'dhuhr', delay: 0, path: '/tracker' },
  { key: 'asr', label: 'Asr', follows: 'asr', delay: 0, path: '/tracker' },
  { key: 'maghrib', label: 'Maghrib', follows: 'maghrib', delay: 0, path: '/tracker' },
  { key: 'isha', label: 'Isha', follows: 'isha', delay: 0, path: '/tracker' },
  {
    key: 'morning-adhkar',
    label: 'Morning adhkar (after Fajr)',
    follows: 'fajr',
    delay: ADHKAR_DELAY_MINUTES,
    path: '/adhkar/morning',
  },
  {
    key: 'evening-adhkar',
    label: 'Evening adhkar (after Asr)',
    follows: 'asr',
    delay: ADHKAR_DELAY_MINUTES,
    path: '/adhkar/evening',
  },
]

const REMINDER_KEYS = REMINDERS.map((reminder) => reminder.key)

function message(reminder) {
  return reminder.delay
    ? { title: reminder.label.split(' (')[0], body: 'Time for your adhkar.' }
    : { title: `${reminder.label} prayer`, body: `It is time for ${reminder.label}.` }
}

function at(time, delay, now) {
  const [hours, minutes] = time.split(':').map(Number)
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes + delay, 0, 0)
}

// The switched-on reminders whose time is still ahead today: [{ key, at, title, body, path }]
export function dueReminders(items, times, now = new Date()) {
  return REMINDERS.filter((reminder) => items[reminder.key])
    .map((reminder) => ({
      key: reminder.key,
      at: at(times[reminder.follows], reminder.delay, now),
      path: reminder.path,
      ...message(reminder),
    }))
    .filter((reminder) => reminder.at.getTime() > now.getTime())
}

export function nextMidnight(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1, 0)
}

export function defaultReminderSettings() {
  return { enabled: false, items: Object.fromEntries(REMINDER_KEYS.map((key) => [key, false])) }
}

export function parseReminderSettings(text) {
  const saved = parseStoredObject(text)
  const items = isPlainObject(saved.items) ? saved.items : {}
  return {
    enabled: saved.enabled === true,
    items: Object.fromEntries(REMINDER_KEYS.map((key) => [key, items[key] === true])),
  }
}

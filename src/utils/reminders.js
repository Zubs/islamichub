import { parseStoredObject, isPlainObject } from './storage.js'
import { ISLAMIC_DAYS } from '../data/islamicDays.js'
import { isKindOn, kindBeginsTomorrow } from './islamicDays.js'
import calendar from '../data/content/calendar/en.js'

const ADHKAR_DELAY_MINUTES = 20
const AFTER_PRAYER_MINUTES = 20
const BEFORE_KHUTBAH_MINUTES = 30
const FRIDAY = 5

const CLOCK_TIME = /^([01]\d|2[0-3]):[0-5]\d$/

// A 24-hour time of day such as "13:15".
export function isClockTime(value) {
  return typeof value === 'string' && CLOCK_TIME.test(value)
}

function prayer(key, label) {
  return {
    key,
    item: key,
    follows: key,
    delay: 0,
    path: '/tracker',
    title: `${label} prayer`,
    body: `It is time for ${label}.`,
  }
}

function adhkar(key, title, follows) {
  return {
    key,
    item: key,
    follows,
    delay: ADHKAR_DELAY_MINUTES,
    path: `/adhkar/${key.split('-')[0]}`,
    title,
    body: 'Time for your adhkar.',
  }
}

function isFriday(date) {
  return date.getDay() === FRIDAY
}

const CALENDAR_NOTE = 'Tap to read about it. Calendar dates can differ by a day.'

// Each kind of Islamic day is announced after Isha on the evening before it begins, and after Fajr
// on each of its days, under one switch.
function islamicDay(key) {
  return [
    {
      key: `${key}-eve`,
      item: key,
      follows: 'isha',
      delay: AFTER_PRAYER_MINUTES,
      path: '/calendar',
      on: (date) => kindBeginsTomorrow(key, date),
      title: `Tomorrow: ${calendar[key].name}`,
      body: CALENDAR_NOTE,
    },
    {
      key: `${key}-day`,
      item: key,
      follows: 'fajr',
      delay: AFTER_PRAYER_MINUTES,
      path: '/calendar',
      on: (date) => isKindOn(key, date),
      title: `Today: ${calendar[key].name}`,
      body: CALENDAR_NOTE,
    },
  ]
}

// Every reminder the site can give. `item` is the switch it belongs to, `follows` the prayer (or
// the khutbah time) it is timed from, `delay` the minutes after it (before it when negative), and
// `on`, where present, the local days it is given on. `title` and `body` are the server's words.
export const REMINDERS = [
  prayer('fajr', 'Fajr'),
  prayer('dhuhr', 'Dhuhr'),
  prayer('asr', 'Asr'),
  prayer('maghrib', 'Maghrib'),
  prayer('isha', 'Isha'),
  adhkar('morning-adhkar', 'Morning adhkar', 'fajr'),
  adhkar('evening-adhkar', 'Evening adhkar', 'asr'),
  ...ISLAMIC_DAYS.flatMap((kind) => islamicDay(kind.key)),
  {
    key: 'kahf',
    item: 'kahf',
    follows: 'fajr',
    delay: AFTER_PRAYER_MINUTES,
    path: '/jumuah',
    on: isFriday,
    title: 'Surah al-Kahf',
    body: 'It is Friday: a reminder to read Surah al-Kahf.',
  },
  {
    key: 'salawat',
    item: 'salawat',
    follows: 'asr',
    delay: AFTER_PRAYER_MINUTES,
    path: '/jumuah',
    on: isFriday,
    title: 'Blessings on the Prophet ﷺ',
    body: 'It is Friday: send many blessings on the Prophet ﷺ.',
  },
  {
    key: 'khutbah',
    item: 'khutbah',
    follows: 'khutbah',
    delay: -BEFORE_KHUTBAH_MINUTES,
    path: '/jumuah',
    on: isFriday,
    title: 'Jumu‘ah',
    body: 'The khutbah begins in 30 minutes.',
  },
]

// The switches, in the groups the pages show them in.
export const PRAYER_ITEMS = [
  'fajr',
  'dhuhr',
  'asr',
  'maghrib',
  'isha',
  'morning-adhkar',
  'evening-adhkar',
]
export const DAY_ITEMS = ISLAMIC_DAYS.map((kind) => kind.key)
export const FRIDAY_ITEMS = ['kahf', 'salawat', 'khutbah']
export const REMINDER_ITEMS = [...PRAYER_ITEMS, ...DAY_ITEMS, ...FRIDAY_ITEMS]

function at(time, delay, now) {
  const [hours, minutes] = time.split(':').map(Number)
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes + delay, 0, 0)
}

// The reminders that apply on a day, with the clock time each follows: [{ reminder, time }]
// `isOn(item)` tells whether a switch is on, `times` are the day's prayer times and `khutbah` is
// the reader's khutbah time, if any.
export function remindersFor(isOn, times, date, khutbah = null) {
  return REMINDERS.filter((reminder) => isOn(reminder.item))
    .filter((reminder) => !reminder.on || reminder.on(date))
    .map((reminder) => ({
      reminder,
      time: reminder.follows === 'khutbah' ? khutbah : times[reminder.follows],
    }))
    .filter(({ time }) => isClockTime(time))
}

// The switched-on reminders whose time is still ahead today: [{ key, at, title, body, path }]
export function dueReminders(items, times, now = new Date(), khutbah = null) {
  return remindersFor((item) => items[item] === true, times, now, khutbah)
    .map(({ reminder, time }) => ({
      key: reminder.key,
      at: at(time, reminder.delay, now),
      path: reminder.path,
      title: reminder.title,
      body: reminder.body,
    }))
    .filter((reminder) => reminder.at.getTime() > now.getTime())
}

export function nextMidnight(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1, 0)
}

export function parseReminderSettings(text) {
  const saved = parseStoredObject(text)
  const items = isPlainObject(saved.items) ? saved.items : {}
  return {
    enabled: saved.enabled === true,
    push: saved.push === true,
    items: Object.fromEntries(REMINDER_ITEMS.map((key) => [key, items[key] === true])),
  }
}

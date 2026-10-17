import { createHash } from 'node:crypto'
import { calcPrayerTimes, PRAYER_METHODS, ASR_SHADOW_FACTORS } from '../../../src/utils/prayer.js'
import { REMINDER_ITEMS, remindersFor, isClockTime } from '../../../src/utils/reminders.js'

export const MAX_REQUEST_BYTES = 4096
const LATE_LIMIT_MINUTES = 3
const COORDINATE_PLACES = 2
const KEY = /^[A-Za-z0-9_-]{16,200}$/

export function recordId(endpoint) {
  return createHash('sha256').update(endpoint).digest('hex')
}

function round(value) {
  const factor = 10 ** COORDINATE_PLACES
  return Math.round(value * factor) / factor
}

function isNumberBetween(value, low, high) {
  return typeof value === 'number' && Number.isFinite(value) && value >= low && value <= high
}

function isTimezone(zone) {
  try {
    new Intl.DateTimeFormat('en-GB', { timeZone: zone })
    return typeof zone === 'string' && zone.length > 0 && zone.length < 64
  } catch {
    return false
  }
}

export function isPushEndpoint(endpoint) {
  try {
    const url = new URL(endpoint)
    return url.protocol === 'https:' && endpoint.length <= 2048
  } catch {
    return false
  }
}

// Returns the record to store, with coordinates rounded, or null when the request is not acceptable.
export function validateRecord(body) {
  const subscription = body?.subscription
  const acceptable =
    body !== null &&
    typeof body === 'object' &&
    isPushEndpoint(subscription?.endpoint) &&
    KEY.test(subscription.keys?.p256dh ?? '') &&
    KEY.test(subscription.keys?.auth ?? '') &&
    isNumberBetween(body.lat, -90, 90) &&
    isNumberBetween(body.lng, -180, 180) &&
    isTimezone(body.timezone) &&
    PRAYER_METHODS.includes(body.method) &&
    Object.hasOwn(ASR_SHADOW_FACTORS, body.asrMethod) &&
    body.items !== null &&
    typeof body.items === 'object' &&
    (body.khutbah === undefined || isClockTime(body.khutbah))
  if (!acceptable) {
    return null
  }

  const items = REMINDER_ITEMS.filter((key) => body.items[key] === true)
  if (!items.length) {
    return null
  }

  return {
    subscription: {
      endpoint: subscription.endpoint,
      keys: { p256dh: subscription.keys.p256dh, auth: subscription.keys.auth },
    },
    lat: round(body.lat),
    lng: round(body.lng),
    timezone: body.timezone,
    method: body.method,
    asrMethod: body.asrMethod,
    items,
    ...(body.khutbah && items.includes('khutbah') ? { khutbah: body.khutbah } : {}),
    sent: {},
  }
}

// The device's wall-clock time for an instant: { day: 'YYYY-MM-DD', minutes, offsetHours, date }
export function localTime(instant, timezone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(instant)
      .map((part) => [part.type, part.value]),
  )
  const year = Number(parts.year)
  const month = Number(parts.month)
  const day = Number(parts.day)
  const hour = Number(parts.hour)
  const minute = Number(parts.minute)
  const asUtc = Date.UTC(year, month - 1, day, hour, minute)
  const instantMinute = Math.floor(instant.getTime() / 60000) * 60000

  return {
    day: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: hour * 60 + minute,
    offsetHours: (asUtc - instantMinute) / 3600000,
    date: new Date(year, month - 1, day),
  }
}

// The reminders to send to a device now: [{ key, title, body, path }]
export function remindersDue(record, instant = new Date()) {
  const local = localTime(instant, record.timezone)
  const times = calcPrayerTimes(
    record.lat,
    record.lng,
    local.date,
    local.offsetHours,
    record.method,
    record.asrMethod,
  )

  return remindersFor((item) => record.items.includes(item), times, local.date, record.khutbah)
    .filter(({ reminder, time }) => {
      const [hours, minutes] = time.split(':').map(Number)
      const late = local.minutes - (hours * 60 + minutes + reminder.delay)
      return late >= 0 && late <= LATE_LIMIT_MINUTES && record.sent?.[reminder.key] !== local.day
    })
    .map(({ reminder }) => ({
      key: reminder.key,
      day: local.day,
      path: reminder.path,
      title: reminder.title,
      body: reminder.body,
    }))
}

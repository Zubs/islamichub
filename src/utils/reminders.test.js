import { describe, it, expect } from 'vitest'
import {
  dueReminders,
  remindersFor,
  parseReminderSettings,
  isClockTime,
  REMINDER_ITEMS,
  PRAYER_ITEMS,
} from './reminders.js'
import { firstDayOfHijriMonth } from './hijri.js'

const TIMES = { fajr: '05:10', dhuhr: '12:50', asr: '16:05', maghrib: '18:55', isha: '20:05' }
const YEAR = 1448

function hijriDay(month, day) {
  const first = firstDayOfHijriMonth(YEAR, month)
  return new Date(first.getFullYear(), first.getMonth(), first.getDate() + day - 1)
}

function keysOn(items, date, khutbah) {
  return dueReminders(items, TIMES, date, khutbah).map((reminder) => reminder.key)
}

describe('Islamic day reminders', () => {
  it('announce ‘Arafah after Isha on the 8th and after Fajr on the 9th, and on no other day', () => {
    const items = { arafah: true }
    const eighth = hijriDay(12, 8)

    expect(dueReminders(items, TIMES, eighth)).toEqual([
      expect.objectContaining({
        key: 'arafah-eve',
        at: new Date(eighth.getFullYear(), eighth.getMonth(), eighth.getDate(), 20, 25),
        path: '/calendar',
      }),
    ])
    const ninth = hijriDay(12, 9)
    expect(dueReminders(items, TIMES, ninth)).toEqual([
      expect.objectContaining({
        key: 'arafah-day',
        at: new Date(ninth.getFullYear(), ninth.getMonth(), ninth.getDate(), 5, 30),
      }),
    ])
    for (const day of [1, 7, 10, 11]) {
      expect(keysOn(items, hijriDay(12, day)), String(day)).toEqual([])
    }
  })

  it('announce the first ten of Dhul Hijjah the evening before the 1st and each morning of them', () => {
    const items = { 'dhul-hijjah': true }

    expect(keysOn(items, lastOf(11))).toEqual(['dhul-hijjah-eve'])
    for (const day of [1, 5, 10]) {
      expect(keysOn(items, hijriDay(12, day))).toEqual(['dhul-hijjah-day'])
    }
    expect(keysOn(items, hijriDay(12, 11))).toEqual([])
  })

  it('announce Mondays and Thursdays on Sunday and Wednesday evenings and their mornings', () => {
    const items = { 'monday-thursday': true }

    expect(keysOn(items, new Date(2026, 9, 18))).toEqual(['monday-thursday-eve'])
    expect(keysOn(items, new Date(2026, 9, 19))).toEqual(['monday-thursday-day'])
    expect(keysOn(items, new Date(2026, 9, 21))).toEqual(['monday-thursday-eve'])
    expect(keysOn(items, new Date(2026, 9, 22))).toEqual(['monday-thursday-day'])
    expect(keysOn(items, new Date(2026, 9, 20))).toEqual([])
  })
})

function lastOf(month) {
  const next = firstDayOfHijriMonth(YEAR, month + 1)
  return new Date(next.getFullYear(), next.getMonth(), next.getDate() - 1)
}

describe('Friday reminders', () => {
  const FRIDAY = new Date(2026, 9, 23)
  const THURSDAY = new Date(2026, 9, 22)
  const items = { kahf: true, salawat: true, khutbah: true }

  it('remind of al-Kahf after Fajr, blessings after Asr and the khutbah 30 minutes before it', () => {
    const due = dueReminders(items, TIMES, FRIDAY, '13:15')

    expect(
      due.map((reminder) => [reminder.key, reminder.at.getHours(), reminder.at.getMinutes()]),
    ).toEqual([
      ['kahf', 5, 30],
      ['salawat', 16, 25],
      ['khutbah', 12, 45],
    ])
    expect(due.every((reminder) => reminder.path === '/jumuah')).toBe(true)
  })

  it('give nothing on a day other than Friday', () => {
    expect(dueReminders(items, TIMES, THURSDAY, '13:15')).toEqual([])
  })

  it('give no khutbah reminder without a khutbah time', () => {
    expect(keysOn({ khutbah: true }, FRIDAY, null)).toEqual([])
    expect(keysOn({ khutbah: true }, FRIDAY, 'noon')).toEqual([])
  })
})

describe('remindersFor', () => {
  it('reads switches through the function it is given, as the server does', () => {
    const chosen = ['fajr', 'kahf']
    const found = remindersFor((item) => chosen.includes(item), TIMES, new Date(2026, 9, 23))

    expect(found.map(({ reminder, time }) => [reminder.key, time])).toEqual([
      ['fajr', '05:10'],
      ['kahf', '05:10'],
    ])
  })
})

describe('reminder settings', () => {
  it('read older settings with their prayer choices kept and every new switch off', () => {
    const settings = parseReminderSettings(
      JSON.stringify({ enabled: true, items: { fajr: true, 'evening-adhkar': true } }),
    )

    expect(Object.keys(settings.items)).toEqual(REMINDER_ITEMS)
    expect(settings.items.fajr).toBe(true)
    expect(settings.items['evening-adhkar']).toBe(true)
    expect(
      REMINDER_ITEMS.filter((item) => !PRAYER_ITEMS.includes(item)).every(
        (item) => settings.items[item] === false,
      ),
    ).toBe(true)
  })
})

describe('isClockTime', () => {
  it.each([
    ['13:15', true],
    ['00:00', true],
    ['23:59', true],
    ['24:00', false],
    ['25:99', false],
    ['1:15', false],
    [1315, false],
  ])('%s → %s', (value, expected) => {
    expect(isClockTime(value)).toBe(expected)
  })
})

describe('reminder words', () => {
  it('give every reminder a title and body in the message file, and a page to open', async () => {
    const { REMINDERS } = await import('./reminders.js')
    const { default: en } = await import('@/locales/en.js')

    for (const reminder of REMINDERS) {
      expect(en.reminders[reminder.key]?.title, reminder.key).toBeTruthy()
      expect(en.reminders[reminder.key]?.body, reminder.key).toBeTruthy()
      expect(['/tracker', '/calendar', '/jumuah']).toContain(
        reminder.path.startsWith('/adhkar/') ? '/tracker' : reminder.path,
      )
    }
  })
})

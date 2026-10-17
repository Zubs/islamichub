import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import ReminderSettings from '@/components/ReminderSettings.vue'
import { scheduleReminders, startReminders, stopReminders } from './useReminders.js'
import { useRemindersStore } from '@/stores/reminders.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import {
  REMINDER_ITEMS,
  dueReminders,
  parseReminderSettings,
  nextMidnight,
} from '@/utils/reminders.js'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'MWL', asrMethod: 'standard' }
const TIMES = { fajr: '05:10', dhuhr: '12:50', asr: '16:05', maghrib: '18:55', isha: '20:05' }
const ALL_PRAYERS = { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true }

let shown

function withNotifications(permission = 'granted', answer = permission) {
  shown = []
  class FakeNotification {
    static permission = permission
    static requestPermission = vi.fn(async () => {
      FakeNotification.permission = answer
      return answer
    })

    constructor(title, options) {
      this.title = title
      this.options = options
      this.close = vi.fn()
      shown.push(this)
    }
  }
  vi.stubGlobal('Notification', FakeNotification)
  return FakeNotification
}

function fresh({ location = LAGOS, settings } = {}) {
  localStorage.clear()
  if (location) {
    localStorage.setItem('prayer-settings', JSON.stringify(location))
  }
  if (settings) {
    localStorage.setItem('reminder-settings', JSON.stringify(settings))
  }
  setActivePinia(createPinia())
  useRemindersStore()
  usePrayerSettingsStore()
  timersBefore = vi.isFakeTimers() ? vi.getTimerCount() : 0
}

function at(date) {
  vi.useFakeTimers()
  vi.setSystemTime(date)
}

// Timers the reminders own, leaving out any the test tools hold.
let timersBefore = 0
function ownTimers() {
  return vi.getTimerCount() - timersBefore
}

function lagosTimes(date, method = 'MWL') {
  return calcPrayerTimes(LAGOS.lat, LAGOS.lng, date, getTimezoneOffset(), method, 'standard')
}

function minutesOf(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

describe('dueReminders', () => {
  it('gives only the prayers still to come at midday', () => {
    const due = dueReminders(ALL_PRAYERS, TIMES, new Date(2026, 3, 10, 12, 0))

    expect(due.map((reminder) => reminder.key)).toEqual(['dhuhr', 'asr', 'maghrib', 'isha'])
    expect(due[0].at).toEqual(new Date(2026, 3, 10, 12, 50))
    expect(due.every((reminder) => reminder.path === '/tracker')).toBe(true)
  })

  it('leaves out a time that passed a second ago and keeps one a second ahead', () => {
    const justAfter = dueReminders(ALL_PRAYERS, TIMES, new Date(2026, 3, 10, 16, 5, 1))
    const justBefore = dueReminders(ALL_PRAYERS, TIMES, new Date(2026, 3, 10, 16, 4, 59))
    const exactly = dueReminders(ALL_PRAYERS, TIMES, new Date(2026, 3, 10, 16, 5, 0))

    expect(justAfter.map((reminder) => reminder.key)).toEqual(['maghrib', 'isha'])
    expect(justBefore.map((reminder) => reminder.key)).toEqual(['asr', 'maghrib', 'isha'])
    expect(exactly.map((reminder) => reminder.key)).toEqual(['maghrib', 'isha'])
  })

  it('times the adhkar reminders after Fajr and after Asr, opening their categories', () => {
    const due = dueReminders(
      { 'morning-adhkar': true, 'evening-adhkar': true },
      TIMES,
      new Date(2026, 3, 10, 0, 0),
    )

    expect(due.map((reminder) => [reminder.key, reminder.path])).toEqual([
      ['morning-adhkar', '/adhkar/morning'],
      ['evening-adhkar', '/adhkar/evening'],
    ])
    expect(due[0].at.getTime()).toBeGreaterThan(new Date(2026, 3, 10, 5, 10).getTime())
    expect(due[1].at.getTime()).toBeGreaterThan(new Date(2026, 3, 10, 16, 5).getTime())
  })

  it('gives nothing when nothing is switched on', () => {
    expect(dueReminders({}, TIMES, new Date(2026, 3, 10, 0, 0))).toEqual([])
  })

  it('finds the start of the next local day', () => {
    expect(nextMidnight(new Date(2026, 3, 30, 23, 59, 59))).toEqual(new Date(2026, 4, 1, 0, 0, 1))
  })
})

describe('reminder settings', () => {
  it('are off with every switch off by default', () => {
    const settings = parseReminderSettings(null)

    expect(settings.enabled).toBe(false)
    expect(Object.keys(settings.items)).toEqual(REMINDER_ITEMS)
    expect(Object.values(settings.items).every((on) => on === false)).toBe(true)
  })

  it.each(['not json', 'null', '[]', '{"enabled":"yes","items":7}'])('reads %s as off', (text) => {
    expect(parseReminderSettings(text).enabled).toBe(false)
  })

  it('keeps only known switches that are truly on', () => {
    const settings = parseReminderSettings(
      JSON.stringify({ enabled: true, items: { fajr: true, isha: 'yes', witr: true } }),
    )

    expect(settings.enabled).toBe(true)
    expect(settings.items.fajr).toBe(true)
    expect(settings.items.isha).toBe(false)
    expect(settings.items.witr).toBeUndefined()
  })
})

describe('reminders', () => {
  beforeEach(() => {
    withNotifications()
  })

  afterEach(() => {
    stopReminders()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    delete navigator.serviceWorker
  })

  it('request no permission and schedule nothing while off', () => {
    at(new Date(2026, 3, 10, 6, 0))
    fresh()

    expect(scheduleReminders()).toBe(0)
    expect(ownTimers()).toBe(0)
    expect(Notification.requestPermission).not.toHaveBeenCalled()
  })

  it('schedule nothing with no saved location, even when switched on', () => {
    at(new Date(2026, 3, 10, 6, 0))
    fresh({ location: null, settings: { enabled: true, items: ALL_PRAYERS } })

    expect(scheduleReminders()).toBe(0)
    expect(ownTimers()).toBe(0)
  })

  it('ask for permission when turned on, switch the five prayers on, and remember it', async () => {
    withNotifications('default', 'granted')
    fresh()
    const store = useRemindersStore()

    expect(await store.turnOn()).toBe(true)

    expect(Notification.requestPermission).toHaveBeenCalledOnce()
    expect(store.active).toBe(true)
    expect(store.settings.items).toMatchObject(ALL_PRAYERS)
    expect(store.settings.items['morning-adhkar']).toBe(false)
    setActivePinia(createPinia())
    expect(useRemindersStore().settings.enabled).toBe(true)
  })

  it('turn off again when permission is refused', async () => {
    withNotifications('default', 'denied')
    fresh()
    const store = useRemindersStore()

    expect(await store.turnOn()).toBe(false)

    expect(store.settings.enabled).toBe(false)
    expect(store.active).toBe(false)
    expect(scheduleReminders()).toBe(0)
  })

  it('schedule one notification, for Maghrib, when only Maghrib is on', async () => {
    at(new Date(2026, 3, 10, 6, 0))
    fresh({ settings: { enabled: true, items: { maghrib: true } } })

    expect(scheduleReminders()).toBe(1)
    expect(ownTimers()).toBe(2)

    const maghrib = minutesOf(lagosTimes(new Date()).maghrib)
    await vi.advanceTimersByTimeAsync((maghrib - 6 * 60) * 60000 - 1000)
    expect(shown).toHaveLength(0)
    await vi.advanceTimersByTimeAsync(1000)

    expect(shown).toHaveLength(1)
    expect(shown[0].title).toBe('Maghrib prayer')
    expect(shown[0].options.data.path).toBe('/tracker')
  })

  it('schedule the khutbah reminder on a Friday from the time kept on the device, opening the Friday page', async () => {
    at(new Date(2026, 9, 23, 6, 0))
    localStorage.clear()
    fresh({ settings: { enabled: true, items: { khutbah: true } } })
    localStorage.setItem('khutbah-time', '"13:15"')
    setActivePinia(createPinia())

    expect(scheduleReminders()).toBe(1)
    await vi.advanceTimersByTimeAsync((12 * 60 + 45 - 6 * 60) * 60000)

    expect(shown).toHaveLength(1)
    expect(shown[0].title).toBe('Jumu‘ah')
    expect(shown[0].options.data.path).toBe('/jumuah')
  })

  it('schedule no Friday reminder on a Thursday', () => {
    at(new Date(2026, 9, 22, 6, 0))
    fresh({ settings: { enabled: true, items: { kahf: true, salawat: true, khutbah: true } } })
    localStorage.setItem('khutbah-time', '"13:15"')
    setActivePinia(createPinia())

    expect(scheduleReminders()).toBe(0)
  })

  it('schedule only the prayers still to come at midday', () => {
    at(new Date(2026, 3, 10, 12, 0))
    fresh({ settings: { enabled: true, items: ALL_PRAYERS } })
    const times = lagosTimes(new Date())
    const expected = Object.keys(ALL_PRAYERS).filter((prayer) => minutesOf(times[prayer]) > 12 * 60)

    expect(scheduleReminders()).toBe(expected.length)
    expect(expected).not.toContain('fajr')
  })

  it('reschedule everything to the new times when the calculation method changes', async () => {
    at(new Date(2026, 3, 10, 3, 0))
    fresh({ settings: { enabled: true, items: { fajr: true } } })
    startReminders()
    const fajrMwl = minutesOf(lagosTimes(new Date(), 'MWL').fajr)
    const fajrIsna = minutesOf(lagosTimes(new Date(), 'ISNA').fajr)
    expect(fajrIsna).toBeGreaterThan(fajrMwl)

    usePrayerSettingsStore().setMethods('ISNA', 'standard')
    await nextTick()
    await vi.advanceTimersByTimeAsync((fajrMwl - 3 * 60) * 60000)
    expect(shown).toHaveLength(0)

    await vi.advanceTimersByTimeAsync((fajrIsna - fajrMwl) * 60000)
    expect(shown.map((notification) => notification.title)).toEqual(['Fajr prayer'])
  })

  it('reschedule when a switch changes and stop when turned off', async () => {
    at(new Date(2026, 3, 10, 3, 0))
    fresh({ settings: { enabled: true, items: { fajr: true } } })
    startReminders()
    const store = useRemindersStore()

    store.setItem('isha', true)
    await nextTick()
    await vi.advanceTimersByTimeAsync(20 * 60 * 60000)
    expect(shown.map((notification) => notification.title)).toEqual(['Fajr prayer', 'Isha prayer'])

    store.turnOff()
    await nextTick()
    expect(scheduleReminders()).toBe(0)
    await vi.advanceTimersByTimeAsync(48 * 60 * 60000)
    expect(shown).toHaveLength(2)
  })

  it("schedule the next day's reminders after local midnight without a reload", async () => {
    at(new Date(2026, 3, 10, 23, 0))
    fresh({ settings: { enabled: true, items: { fajr: true } } })

    expect(scheduleReminders()).toBe(0)
    await vi.advanceTimersByTimeAsync(61 * 60000)
    expect(shown).toHaveLength(0)

    const fajr = minutesOf(lagosTimes(new Date(2026, 3, 11)).fajr)
    await vi.advanceTimersByTimeAsync(fajr * 60000)

    expect(shown.map((notification) => notification.title)).toEqual(['Fajr prayer'])
  })

  it('show the notification through the service worker where one is registered', async () => {
    at(new Date(2026, 3, 10, 3, 0))
    const showNotification = vi.fn(async () => {})
    navigator.serviceWorker = {
      getRegistration: vi.fn(async () => ({ showNotification })),
      addEventListener: vi.fn(),
    }
    fresh({ settings: { enabled: true, items: { 'morning-adhkar': true } } })
    scheduleReminders()

    await vi.advanceTimersByTimeAsync(6 * 60 * 60000)

    expect(showNotification).toHaveBeenCalledOnce()
    const [title, options] = showNotification.mock.calls[0]
    expect(title).toBe('Morning adhkar')
    expect(options.data).toEqual({ path: '/adhkar/morning' })
    expect(shown).toHaveLength(0)
  })

  it('open the page a tapped notification points to', async () => {
    at(new Date(2026, 3, 10, 3, 0))
    fresh({ settings: { enabled: true, items: { fajr: true, 'morning-adhkar': true } } })
    const open = vi.fn()
    vi.spyOn(window, 'focus').mockImplementation(() => {})
    scheduleReminders({ open })
    await vi.advanceTimersByTimeAsync(6 * 60 * 60000)

    shown.forEach((notification) => notification.onclick())

    expect(open.mock.calls.map(([path]) => path)).toEqual(['/tracker', '/adhkar/morning'])
  })

  it('open the page the service worker passes on', () => {
    fresh()
    const listeners = {}
    navigator.serviceWorker = {
      addEventListener: (type, listener) => {
        listeners[type] = listener
      },
    }
    const open = vi.fn()
    startReminders(open)

    listeners.message({ data: { type: 'open', path: '/adhkar/morning' } })
    listeners.message({ data: { type: 'other', path: '/zakat' } })
    listeners.message({ data: null })

    expect(open).toHaveBeenCalledExactlyOnceWith('/adhkar/morning')
  })
})

describe('service worker click handler', () => {
  function runWorker(windows = []) {
    const listeners = {}
    const self = {
      addEventListener: (type, listener) => {
        listeners[type] = listener
      },
      clients: { matchAll: vi.fn(async () => windows), openWindow: vi.fn(async () => null) },
    }
    const source = readFileSync(resolve(process.cwd(), 'public/sw-notifications.js'), 'utf8')
    new Function('self', source)(self)

    async function tap(path) {
      let finished
      const notification = { data: path ? { path } : undefined, close: vi.fn() }
      listeners.notificationclick({
        notification,
        waitUntil: (promise) => {
          finished = promise
        },
      })
      await finished
      return notification
    }

    return { self, tap }
  }

  it('opens the tracker in a new window when the app is not open', async () => {
    const { self, tap } = runWorker()

    const notification = await tap('/tracker')

    expect(self.clients.openWindow).toHaveBeenCalledExactlyOnceWith('/tracker')
    expect(notification.close).toHaveBeenCalledOnce()
  })

  it('focuses the open app and tells it to open the adhkar category', async () => {
    const open = { focus: vi.fn(async () => {}), postMessage: vi.fn() }
    const { self, tap } = runWorker([open])

    await tap('/adhkar/morning')

    expect(open.focus).toHaveBeenCalledOnce()
    expect(open.postMessage).toHaveBeenCalledExactlyOnceWith({
      type: 'open',
      path: '/adhkar/morning',
    })
    expect(self.clients.openWindow).not.toHaveBeenCalled()
  })

  it('opens the home page when a notification carries no path', async () => {
    const { self, tap } = runWorker()

    await tap(null)

    expect(self.clients.openWindow).toHaveBeenCalledExactlyOnceWith('/')
  })
})

describe('ReminderSettings', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function switches(wrapper) {
    return wrapper.findAll('input[type="checkbox"]')
  }

  it('disables the switch and explains why when no location is saved', () => {
    withNotifications('default')
    fresh({ location: null })
    const wrapper = mount(ReminderSettings)

    expect(switches(wrapper)).toHaveLength(1)
    expect(switches(wrapper)[0].attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Remember a location above first')
  })

  it('shows a switch for each prayer and both adhkar once turned on', async () => {
    withNotifications('default', 'granted')
    fresh()
    const wrapper = mount(ReminderSettings)
    expect(switches(wrapper)).toHaveLength(1)

    await switches(wrapper)[0].setValue(true)
    await flushPromises()

    expect(switches(wrapper)).toHaveLength(8)
    expect(wrapper.text()).toContain('Morning adhkar (after Fajr)')
    expect(wrapper.text()).toContain('Evening adhkar (after Asr)')

    await switches(wrapper)[6].setValue(true)
    expect(useRemindersStore().settings.items['morning-adhkar']).toBe(true)
    expect(JSON.parse(localStorage.getItem('reminder-settings')).items['morning-adhkar']).toBe(true)
  })

  it('turns the switches off and says how to allow notifications when permission is refused', async () => {
    withNotifications('default', 'denied')
    fresh()
    const wrapper = mount(ReminderSettings)

    await switches(wrapper)[0].setValue(true)
    await flushPromises()

    expect(switches(wrapper)).toHaveLength(1)
    expect(switches(wrapper)[0].element.checked).toBe(false)
    expect(wrapper.find('[role="alert"]').text()).toContain("browser's site settings")
  })

  it('says so and offers nothing in a browser with no notification support', () => {
    vi.stubGlobal('Notification', undefined)
    fresh()
    const wrapper = mount(ReminderSettings)

    expect(switches(wrapper)).toHaveLength(0)
    expect(wrapper.text()).toContain('cannot show notifications')
  })

  it('states that reminders arrive only while the app is open or in the background', () => {
    withNotifications()
    fresh()

    expect(mount(ReminderSettings).text()).toContain(
      'only while IslamicHub is open or running in the background',
    )
  })
})

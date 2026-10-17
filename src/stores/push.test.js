import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import ReminderSettings from '@/components/ReminderSettings.vue'
import { useRemindersStore } from './reminders.js'
import { usePrayerSettingsStore } from './prayerSettings.js'
import { scheduleReminders, startReminders, stopReminders } from '@/composables/useReminders.js'
import {
  pushRequestBody,
  roundCoordinate,
  pushAvailability,
  applicationServerKey,
} from '@/utils/push.js'
import { validateRecord } from '../../netlify/functions/lib/pushRecords.js'

const LAGOS = {
  lat: 6.524379,
  lng: 3.379206,
  name: 'Ikeja, Lagos',
  method: 'MWL',
  asrMethod: 'standard',
}
const ENDPOINT = 'https://fcm.googleapis.com/fcm/send/device-1'
const KEYS = { p256dh: 'B'.repeat(87), auth: 'a'.repeat(22) }
const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'

let fetch
let subscription
let pushManager

function withPush({ subscribed = false } = {}) {
  subscription = {
    endpoint: ENDPOINT,
    toJSON: () => ({ endpoint: ENDPOINT, keys: KEYS }),
    unsubscribe: vi.fn(async () => true),
  }
  pushManager = {
    getSubscription: vi.fn(async () => (subscribed ? subscription : null)),
    subscribe: vi.fn(async () => {
      subscribed = true
      return subscription
    }),
  }
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: {
      ready: Promise.resolve({ pushManager }),
      getRegistration: async () => null,
      addEventListener: vi.fn(),
    },
  })
  vi.stubGlobal('PushManager', class {})
}

function fresh({
  location = LAGOS,
  settings = { enabled: true, items: { fajr: true, maghrib: true } },
} = {}) {
  localStorage.clear()
  if (location) {
    localStorage.setItem('prayer-settings', JSON.stringify(location))
  }
  localStorage.setItem('reminder-settings', JSON.stringify(settings))
  setActivePinia(createPinia())
  return useRemindersStore()
}

function sent(method) {
  return fetch.mock.calls
    .filter(([, options]) => options.method === method)
    .map(([address, options]) => ({ address, body: JSON.parse(options.body) }))
}

describe('push request', () => {
  it('rounds coordinates to two decimal places', () => {
    expect(roundCoordinate(6.524379)).toBe(6.52)
    expect(roundCoordinate(-0.1278)).toBe(-0.13)
    expect(roundCoordinate(3.379206)).toBe(3.38)
  })

  it('holds only what the server needs, which the server accepts', () => {
    const body = pushRequestBody(
      { endpoint: ENDPOINT, keys: KEYS },
      LAGOS,
      { fajr: true, isha: false },
      'Africa/Lagos',
    )

    expect(Object.keys(body).sort()).toEqual(
      ['asrMethod', 'items', 'lat', 'lng', 'method', 'subscription', 'timezone'].sort(),
    )
    expect(JSON.stringify(body)).not.toMatch(/Ikeja|6\.524379|3\.379206/)
    expect(validateRecord(body)).toMatchObject({ lat: 6.52, lng: 3.38, items: ['fajr'] })
  })

  it('sends the khutbah time only while the khutbah reminder is on', () => {
    const subscription = { endpoint: ENDPOINT, keys: KEYS }
    const on = pushRequestBody(subscription, LAGOS, { khutbah: true }, 'Africa/Lagos', '13:15')
    const off = pushRequestBody(subscription, LAGOS, { fajr: true }, 'Africa/Lagos', '13:15')

    expect(on.khutbah).toBe('13:15')
    expect(off).not.toHaveProperty('khutbah')
  })

  it('turns the public key into the bytes the browser asks for', () => {
    const key = applicationServerKey(
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
    )

    expect(key).toBeInstanceOf(Uint8Array)
    expect(key).toHaveLength(65)
    expect(key[0]).toBe(4)
  })

  it.each([
    [
      { publicKey: '', hasPushManager: true, userAgent: 'Android', installed: false },
      'not-configured',
    ],
    [
      { publicKey: 'k', hasPushManager: false, userAgent: 'Firefox', installed: false },
      'unsupported',
    ],
    [
      { publicKey: 'k', hasPushManager: true, userAgent: IPHONE, installed: false },
      'ios-not-installed',
    ],
    [{ publicKey: 'k', hasPushManager: true, userAgent: IPHONE, installed: true }, 'ready'],
    [
      { publicKey: 'k', hasPushManager: true, userAgent: 'Android Chrome', installed: false },
      'ready',
    ],
  ])('reports %j as %s', (state, expected) => {
    expect(pushAvailability(state)).toBe(expected)
  })
})

describe('push on the device', () => {
  beforeEach(() => {
    class FakeNotification {
      static permission = 'granted'
      static requestPermission = vi.fn(async () => 'granted')
    }
    vi.stubGlobal('Notification', FakeNotification)
    vi.stubEnv(
      'VITE_VAPID_PUBLIC_KEY',
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
    )
    fetch = vi.fn(async () => ({ ok: true }))
    vi.stubGlobal('fetch', fetch)
    withPush()
  })

  afterEach(() => {
    stopReminders()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
    delete navigator.serviceWorker
    delete navigator.standalone
  })

  it('sends nothing to the server while push is off', async () => {
    const store = fresh()
    startReminders()

    store.setItem('isha', true)
    usePrayerSettingsStore().setMethods('Karachi', 'hanafi')
    await nextTick()
    await flushPromises()

    expect(fetch).not.toHaveBeenCalled()
    expect(pushManager.subscribe).not.toHaveBeenCalled()
  })

  it('stores one record with rounded coordinates when push is turned on', async () => {
    const store = fresh()

    expect(await store.turnPushOn()).toBe(true)

    const saved = sent('POST')
    expect(saved).toHaveLength(1)
    expect(saved[0].address).toBe('/api/push')
    expect(saved[0].body).toMatchObject({
      lat: 6.52,
      lng: 3.38,
      method: 'MWL',
      asrMethod: 'standard',
    })
    expect(saved[0].body.items).toMatchObject({ fajr: true, maghrib: true })
    expect(saved[0].body.subscription).toEqual({ endpoint: ENDPOINT, keys: KEYS })
    expect(JSON.stringify(saved[0].body)).not.toContain('Ikeja')
    expect(store.settings.push).toBe(true)
    expect(JSON.parse(localStorage.getItem('reminder-settings')).push).toBe(true)
    expect(pushManager.subscribe.mock.calls[0][0].userVisibleOnly).toBe(true)
  })

  it('stays off when the server does not accept the record', async () => {
    fetch.mockResolvedValue({ ok: false })
    const store = fresh()

    expect(await store.turnPushOn()).toBe(false)
    expect(store.settings.push).toBe(false)
  })

  it('does not turn on without a saved location or with reminders off', async () => {
    expect(await fresh({ location: null }).turnPushOn()).toBe(false)
    expect(await fresh({ settings: { enabled: false, items: { fajr: true } } }).turnPushOn()).toBe(
      false,
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it('updates the stored record when the method or a switch changes', async () => {
    withPush({ subscribed: true })
    const store = fresh({ settings: { enabled: true, push: true, items: { fajr: true } } })
    startReminders()

    usePrayerSettingsStore().setMethods('Karachi', 'hanafi')
    await nextTick()
    await flushPromises()
    store.setItem('isha', true)
    await nextTick()
    await flushPromises()

    const saved = sent('POST')
    expect(saved).toHaveLength(2)
    expect(saved[0].body).toMatchObject({ method: 'Karachi', asrMethod: 'hanafi' })
    expect(saved[1].body.items).toMatchObject({ fajr: true, isha: true })
  })

  it('deletes the server record when push is turned off', async () => {
    withPush({ subscribed: true })
    const store = fresh({ settings: { enabled: true, push: true, items: { fajr: true } } })

    await store.turnPushOff()

    expect(sent('DELETE')).toEqual([{ address: '/api/push', body: { endpoint: ENDPOINT } }])
    expect(subscription.unsubscribe).toHaveBeenCalledOnce()
    expect(store.settings.push).toBe(false)
  })

  it('deletes the server record when the location is forgotten', async () => {
    withPush({ subscribed: true })
    const store = fresh({ settings: { enabled: true, push: true, items: { fajr: true } } })
    startReminders()

    usePrayerSettingsStore().forget()
    await nextTick()
    await flushPromises()

    expect(sent('DELETE')).toHaveLength(1)
    expect(store.settings.push).toBe(false)
  })

  it('deletes the server record when reminders are turned off altogether', async () => {
    withPush({ subscribed: true })
    const store = fresh({ settings: { enabled: true, push: true, items: { fajr: true } } })

    await store.turnOff()

    expect(sent('DELETE')).toHaveLength(1)
    expect(store.settings).toMatchObject({ enabled: false, push: false })
  })

  it('keeps the on-device reminders silent while push is on, so one notification arrives', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 3, 10, 3, 0))
    fresh({ settings: { enabled: true, push: true, items: { fajr: true, isha: true } } })
    expect(scheduleReminders()).toBe(0)

    fresh({ settings: { enabled: true, push: false, items: { fajr: true, isha: true } } })
    expect(scheduleReminders()).toBe(2)
  })
})

describe('push switch', () => {
  beforeEach(() => {
    class FakeNotification {
      static permission = 'granted'
      static requestPermission = vi.fn(async () => 'granted')
    }
    vi.stubGlobal('Notification', FakeNotification)
    fetch = vi.fn(async () => ({ ok: true }))
    vi.stubGlobal('fetch', fetch)
    withPush()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
    delete navigator.serviceWorker
  })

  it('is not offered until the site has a push key', () => {
    vi.stubEnv('VITE_VAPID_PUBLIC_KEY', '')
    fresh()

    expect(mount(ReminderSettings).find('[data-test="push"]').exists()).toBe(false)
  })

  it('says what is stored, and turns push on', async () => {
    vi.stubEnv(
      'VITE_VAPID_PUBLIC_KEY',
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
    )
    const store = fresh()
    const wrapper = mount(ReminderSettings)

    expect(wrapper.text()).toContain('rounded to about 1 km')
    expect(wrapper.text()).toContain('No name, email or account')
    expect(wrapper.text()).toContain('deletes it')

    await wrapper.find('[data-test="push"]').setValue(true)
    await flushPromises()

    expect(store.settings.push).toBe(true)
    expect(sent('POST')).toHaveLength(1)
  })

  it('is disabled on an iPhone where the app is not installed, with an explanation', () => {
    vi.stubEnv('VITE_VAPID_PUBLIC_KEY', 'key')
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(IPHONE)
    fresh()
    const wrapper = mount(ReminderSettings)

    expect(wrapper.find('[data-test="push"]').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Add to Home Screen')
  })

  it('says so when push could not be turned on', async () => {
    vi.stubEnv(
      'VITE_VAPID_PUBLIC_KEY',
      'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
    )
    fetch.mockRejectedValue(new TypeError('offline'))
    fresh()
    const wrapper = mount(ReminderSettings)

    await wrapper.find('[data-test="push"]').setValue(true)
    await flushPromises()

    expect(wrapper.find('[data-test="push"]').element.checked).toBe(false)
    expect(wrapper.text()).toContain('could not be turned on')
  })
})

describe('service worker push handler', () => {
  function runWorker() {
    const listeners = {}
    const self = {
      addEventListener: (type, listener) => {
        listeners[type] = listener
      },
      registration: { showNotification: vi.fn(async () => {}) },
      clients: { matchAll: vi.fn(async () => []), openWindow: vi.fn(async () => null) },
    }
    new Function(
      'self',
      readFileSync(resolve(process.cwd(), 'public/sw-notifications.js'), 'utf8'),
    )(self)

    async function push(data) {
      let finished
      listeners.push({
        data,
        waitUntil: (promise) => {
          finished = promise
        },
      })
      await finished
    }

    return { self, listeners, push }
  }

  it('shows the reminder with the page it opens', async () => {
    const { self, push } = runWorker()

    await push({
      json: () => ({
        title: 'Maghrib prayer',
        body: 'It is time for Maghrib.',
        path: '/tracker',
        tag: 'maghrib',
      }),
    })

    expect(self.registration.showNotification).toHaveBeenCalledExactlyOnceWith('Maghrib prayer', {
      body: 'It is time for Maghrib.',
      icon: '/icon-192.png',
      tag: 'maghrib',
      data: { path: '/tracker' },
    })
  })

  it('opens the tracker when that reminder is tapped', async () => {
    const { self, listeners } = runWorker()
    let finished

    listeners.notificationclick({
      notification: { data: { path: '/tracker' }, close: vi.fn() },
      waitUntil: (promise) => {
        finished = promise
      },
    })
    await finished

    expect(self.clients.openWindow).toHaveBeenCalledExactlyOnceWith('/tracker')
  })

  it('still shows a notification when the message cannot be read', async () => {
    const { self, push } = runWorker()

    await push({
      json: () => {
        throw new SyntaxError('bad')
      },
    })
    await push(null)

    expect(self.registration.showNotification).toHaveBeenCalledTimes(2)
    expect(self.registration.showNotification.mock.calls[0][0]).toBe('IslamicHub')
  })
})

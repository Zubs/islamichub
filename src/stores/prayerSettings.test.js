import { describe, it, expect, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePrayerSettingsStore } from './prayerSettings.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'MWL', asrMethod: 'standard' }

function reloaded() {
  setActivePinia(createPinia())
  return usePrayerSettingsStore()
}

describe('prayer settings store', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('has nothing saved on a first visit and stores nothing by itself', () => {
    const store = usePrayerSettingsStore()

    expect(store.saved).toBeNull()
    expect(store.canRemember).toBe(true)
    expect(localStorage.length).toBe(0)
  })

  it('remembers a location across a reload', () => {
    expect(usePrayerSettingsStore().remember(LAGOS)).toBe(true)

    expect(reloaded().saved).toEqual(LAGOS)
  })

  it('refuses to remember an impossible location', () => {
    const store = usePrayerSettingsStore()

    expect(store.remember({ ...LAGOS, lat: 91 })).toBe(false)
    expect(localStorage.getItem('prayer-settings')).toBeNull()
  })

  it('remembers a change of method only when a location is saved', () => {
    const store = usePrayerSettingsStore()
    store.setMethods('Karachi', 'hanafi')
    expect(localStorage.getItem('prayer-settings')).toBeNull()

    store.remember(LAGOS)
    store.setMethods('Karachi', 'hanafi')

    expect(reloaded().saved).toEqual({ ...LAGOS, method: 'Karachi', asrMethod: 'hanafi' })
  })

  it('forgets the location', () => {
    const store = usePrayerSettingsStore()
    store.remember(LAGOS)

    store.forget()

    expect(store.saved).toBeNull()
    expect(localStorage.getItem('prayer-settings')).toBeNull()
    expect(reloaded().saved).toBeNull()
  })

  it.each(['not json', 'null', '[1]', '{"lat":200,"lng":0}'])(
    'treats stored settings of %s as none',
    (text) => {
      localStorage.setItem('prayer-settings', text)

      expect(reloaded().saved).toBeNull()
    },
  )

  it('works for the visit when storage is blocked, and says it cannot remember', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const store = reloaded()

    expect(store.saved).toBeNull()
    expect(store.canRemember).toBe(false)
    expect(store.remember(LAGOS)).toBe(false)
    expect(store.saved).toBeNull()
    expect(() => store.forget()).not.toThrow()
  })
})

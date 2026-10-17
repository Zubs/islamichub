import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { i18n } from '@/i18n.js'
import ReminderSwitches from './ReminderSwitches.vue'
import { useRemindersStore } from '@/stores/reminders.js'

const LAGOS = { lat: 6.5244, lng: 3.3792, name: 'Lagos', method: 'MWL', asrMethod: 'standard' }
const ITEMS = [
  { key: 'arafah', label: 'The day of ‘Arafah' },
  { key: 'khutbah', label: 'Before the khutbah', disabled: true, why: 'Enter a time first.' },
]

function notifications(answer) {
  class FakeNotification {
    static permission = 'default'
    static requestPermission = vi.fn(async () => {
      FakeNotification.permission = answer
      return answer
    })
  }
  vi.stubGlobal('Notification', FakeNotification)
}

function open({ location = LAGOS, settings } = {}) {
  localStorage.clear()
  if (location) {
    localStorage.setItem('prayer-settings', JSON.stringify(location))
  }
  if (settings) {
    localStorage.setItem('reminder-settings', JSON.stringify(settings))
  }
  setActivePinia(createPinia())
  return mount(ReminderSwitches, {
    props: { items: ITEMS },
    global: { plugins: [i18n], stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('ReminderSwitches', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
  })

  it('asks for permission and turns on only the chosen reminder when reminders are off', async () => {
    notifications('granted')
    const wrapper = open()

    await wrapper.find('[data-item="arafah"]').setValue(true)
    await flushPromises()

    const store = useRemindersStore()
    expect(Notification.requestPermission).toHaveBeenCalledOnce()
    expect(store.active).toBe(true)
    expect(store.settings.items.arafah).toBe(true)
    expect(store.settings.items.fajr).toBe(false)
  })

  it('leaves the switch off and explains when permission is refused', async () => {
    notifications('denied')
    const wrapper = open()

    await wrapper.find('[data-item="arafah"]').setValue(true)
    await flushPromises()

    expect(useRemindersStore().settings.items.arafah).toBe(false)
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.find('[data-item="arafah"]').element.checked).toBe(false)
  })

  it('switches a reminder on and off directly once reminders are on', async () => {
    notifications('granted')
    Notification.permission = 'granted'
    const wrapper = open({ settings: { enabled: true, items: { fajr: true } } })

    await wrapper.find('[data-item="arafah"]').setValue(true)
    expect(useRemindersStore().settings.items.arafah).toBe(true)
    expect(Notification.requestPermission).not.toHaveBeenCalled()

    await wrapper.find('[data-item="arafah"]').setValue(false)
    expect(useRemindersStore().settings.items.arafah).toBe(false)
  })

  it('disables a switch that cannot be on yet and says why', () => {
    notifications('granted')
    const wrapper = open()
    const khutbah = wrapper.find('[data-item="khutbah"]')

    expect(khutbah.element.disabled).toBe(true)
    expect(wrapper.find('.switches-why').text()).toBe('Enter a time first.')
  })

  it('points to the Prayer page when no location is saved', () => {
    notifications('granted')
    const wrapper = open({ location: null })

    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.findComponent(RouterLinkStub).props('to')).toBe('/prayer')
  })

  it('says so when the browser cannot show notifications', () => {
    vi.stubGlobal('Notification', undefined)
    const wrapper = open()

    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.text()).toContain('cannot show notifications')
  })
})

import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import FastingView from './FastingView.vue'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'
import { mountPage } from '../../../test/mountPage.js'

describe('Fasting page saved location', () => {
  it('asks for a location when none is saved', async () => {
    const { wrapper } = await mountPage(FastingView, { path: '/fasting' })

    expect(wrapper.text()).toContain('—:—')
  })

  it('shows suhoor and iftar from the saved location and method without asking', async () => {
    const saved = {
      lat: 6.5244,
      lng: 3.3792,
      name: 'Lagos',
      method: 'Egypt',
      asrMethod: 'standard',
    }
    localStorage.setItem('prayer-settings', JSON.stringify(saved))
    setActivePinia(createPinia())
    const expected = calcPrayerTimes(saved.lat, saved.lng, new Date(), getTimezoneOffset(), 'Egypt')

    const { wrapper } = await mountPage(FastingView, { path: '/fasting' })

    expect(wrapper.text()).toContain(expected.fajr)
    expect(wrapper.text()).toContain(expected.maghrib)
    expect(wrapper.text()).not.toContain('—:—')
  })
})

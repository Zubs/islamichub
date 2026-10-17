import { describe, it, expect, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useJumuahStore, KHUTBAH_KEY } from './jumuah.js'

function freshStore() {
  setActivePinia(createPinia())
  return useJumuahStore()
}

describe('jumuah store', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('has no khutbah time until one is entered, and keeps it across a reload', () => {
    const store = freshStore()
    expect(store.khutbahTime).toBeNull()

    expect(store.setKhutbahTime('13:15')).toBe(true)
    expect(freshStore().khutbahTime).toBe('13:15')
  })

  it.each(['25:99', '1:15', 'noon', '13:15:00'])('refuses %s and keeps what it had', (value) => {
    const store = freshStore()
    store.setKhutbahTime('13:15')

    expect(store.setKhutbahTime(value)).toBe(false)
    expect(freshStore().khutbahTime).toBe('13:15')
  })

  it('clears the time when it is emptied', () => {
    const store = freshStore()
    store.setKhutbahTime('13:15')
    store.setKhutbahTime('')

    expect(freshStore().khutbahTime).toBeNull()
    expect(localStorage.getItem(KHUTBAH_KEY)).toBeNull()
  })

  it.each(['not json', '"noon"', '1315', '{"time":"13:15"}'])('ignores %s stored', (stored) => {
    localStorage.setItem(KHUTBAH_KEY, stored)

    expect(freshStore().khutbahTime).toBeNull()
  })
})

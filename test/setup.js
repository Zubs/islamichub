import { beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { i18n, setLocale } from '@/i18n.js'

config.global.plugins = [i18n]

beforeEach(() => {
  localStorage.clear()
  document.head.innerHTML =
    '<title>IslamicHub</title><meta name="description" content="Static fallback from index.html">'
  setActivePinia(createPinia())
  setLocale('en')
})

globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

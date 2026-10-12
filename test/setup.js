import { beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  localStorage.clear()
  document.head.innerHTML =
    '<title>IslamicHub</title><meta name="description" content="Static fallback from index.html">'
  setActivePinia(createPinia())
})

globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

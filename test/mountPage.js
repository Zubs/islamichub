import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead, renderDOMHead } from '@unhead/vue/client'
import { routes } from '@/router/index.js'

export async function mountPage(component, { path = '/', ...options } = {}) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const head = createHead()
  router.push(path)
  await router.isReady()

  const wrapper = mount(component, {
    ...options,
    global: { ...options.global, plugins: [router, head, ...(options.global?.plugins ?? [])] },
  })
  return { wrapper, router, head }
}

export async function headOf(head) {
  await renderDOMHead(head)
  const all = (selector) => [...document.head.querySelectorAll(selector)]
  return {
    title: document.title,
    descriptions: all('meta[name="description"]').map((tag) => tag.content),
    canonicals: all('link[rel="canonical"]').map((tag) => tag.href),
    robots: all('meta[name="robots"]').map((tag) => tag.content),
    property: (name) => all(`meta[property="${name}"]`)[0]?.content,
  }
}

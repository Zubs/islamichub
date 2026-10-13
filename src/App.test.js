import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { routes } from '@/router/index.js'
import App from './App.vue'
import { mountPage } from '../test/mountPage.js'

describe('App loading screen', () => {
  let fetch

  beforeEach(() => {
    fetch = vi.fn(() => new Promise(() => {}))
    vi.stubGlobal('fetch', fetch)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  async function open(path) {
    vi.useFakeTimers()
    const { wrapper } = await mountPage(App, { path })
    await flushPromises()
    await vi.dynamicImportSettled()
    await flushPromises()
    return wrapper
  }

  it('clears once the first page is ready, with no timer advanced and prices never answering', async () => {
    const wrapper = await open('/prayer')

    expect(wrapper.find('.loading-screen').exists()).toBe(false)
    expect(wrapper.text()).toContain('Prayer')
  })

  it('makes no request for prices or rates on a page that does not use them', async () => {
    await open('/prayer')

    expect(fetch).not.toHaveBeenCalled()
  })

  it('requests prices when the Zakat page is opened', async () => {
    await open('/zakat')

    expect(fetch).toHaveBeenCalledOnce()
    expect(String(fetch.mock.calls[0][0])).toContain('currency-api')
  })

  it('lets a user who opens a link to the morning adhkar start counting', async () => {
    const wrapper = await open('/adhkar/morning')

    expect(wrapper.find('.loading-screen').exists()).toBe(false)
    expect(wrapper.text()).toContain('Morning Adhkar')
    expect(fetch).not.toHaveBeenCalled()
  })
})

describe('App loading screen while showing', () => {
  it('is announced to screen readers as a status', () => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    const wrapper = mount(App, { global: { plugins: [router, createHead()] } })

    const screen = wrapper.find('.loading-screen')
    expect(screen.attributes('role')).toBe('status')
    expect(screen.attributes('aria-label')).toBe('Loading IslamicHub')
    expect(screen.find('[lang="ar"]').exists()).toBe(true)
  })
})

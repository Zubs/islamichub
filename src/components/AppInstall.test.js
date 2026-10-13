import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AppInstall from './AppInstall.vue'
import {
  startPwa,
  needRefresh,
  canInstall,
  showIosNote,
  loadedFontAddresses,
} from '@/composables/usePwa.js'
import { registered } from '../../test/pwa-register.stub.js'

const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'

function withWorkerSupport() {
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: { ready: new Promise(() => {}) },
  })
}

function installSignal() {
  const event = new Event('beforeinstallprompt', { cancelable: true })
  event.prompt = vi.fn(async () => {})
  window.dispatchEvent(event)
  return event
}

describe('AppInstall', () => {
  beforeEach(() => {
    needRefresh.value = false
    canInstall.value = false
    showIosNote.value = false
    registered.options = null
    registered.update.mockClear()
    withWorkerSupport()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    delete navigator.standalone
  })

  it('shows nothing by default', () => {
    startPwa()

    expect(mount(AppInstall).find('.app-bar').exists()).toBe(false)
  })

  it('registers no worker in a browser without support, and the page still works', () => {
    delete navigator.serviceWorker

    startPwa()

    expect(registered.options).toBeNull()
    expect(mount(AppInstall).find('.app-bar').exists()).toBe(false)
  })

  it('offers an update after a new deploy and refreshes into it', async () => {
    startPwa()
    const wrapper = mount(AppInstall)

    registered.options.onNeedRefresh()
    await nextTick()
    expect(wrapper.text()).toContain('Update available')

    await wrapper.find('button').trigger('click')

    expect(registered.update).toHaveBeenCalledExactlyOnceWith(true)
    expect(wrapper.find('.app-bar').exists()).toBe(false)
  })

  it('shows Install on the browser signal and opens the prompt once', async () => {
    startPwa()
    const wrapper = mount(AppInstall)

    const event = installSignal()
    await nextTick()
    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.find('button').text()).toBe('Install')

    await wrapper.find('button').trigger('click')

    expect(event.prompt).toHaveBeenCalledOnce()
    expect(wrapper.find('.app-bar').exists()).toBe(false)
  })

  it('hides Install once the app is installed', async () => {
    startPwa()
    const wrapper = mount(AppInstall)
    installSignal()
    await nextTick()

    window.dispatchEvent(new Event('appinstalled'))
    await nextTick()

    expect(wrapper.find('.app-bar').exists()).toBe(false)
  })

  it('explains Add to Home Screen on an iPhone, and can be dismissed', async () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(IPHONE)
    startPwa()
    const wrapper = mount(AppInstall)

    expect(wrapper.text()).toContain('Add to Home Screen')

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.app-bar').exists()).toBe(false)
  })

  it('shows no note on an iPhone where the app is already installed', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(IPHONE)
    navigator.standalone = true

    startPwa()

    expect(mount(AppInstall).find('.app-bar').exists()).toBe(false)
  })

  it('re-requests only the font addresses the page loaded', () => {
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([
      { name: 'https://fonts.googleapis.com/css2?family=Amiri' },
      { name: 'https://fonts.gstatic.com/s/amiri/v1/a.woff2' },
      { name: 'https://islamichub.xyz/assets/index.js' },
      { name: 'https://hadithapi.com/api/books?apiKey=secret' },
    ])

    expect(loadedFontAddresses()).toEqual([
      'https://fonts.googleapis.com/css2?family=Amiri',
      'https://fonts.gstatic.com/s/amiri/v1/a.woff2',
    ])
  })
})

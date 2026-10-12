import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ACTIONS } from '@/utils/stats.js'

const LIVE_HOST = 'islamichub.xyz'

// Ensure navigator.sendBeacon exists for testing
Object.defineProperty(navigator, 'sendBeacon', {
  value: vi.fn(),
  writable: true,
  configurable: true,
})

function setLocation(hostname = 'localhost', pathname = '/prayer', search = '') {
  Object.defineProperty(window, 'location', {
    value: { hostname, pathname, search, href: `https://${hostname}${pathname}${search}` },
    writable: true,
    configurable: true,
  })
}

function setReferrer(referrer) {
  Object.defineProperty(document, 'referrer', {
    value: referrer,
    writable: true,
    configurable: true,
  })
}

function setDoNotTrack(value) {
  Object.defineProperty(navigator, 'doNotTrack', {
    value,
    writable: true,
    configurable: true,
  })
}

function setGlobalPrivacyControl(value) {
  Object.defineProperty(navigator, 'globalPrivacyControl', {
    value,
    writable: true,
    configurable: true,
  })
}

function setScreenWidth(width) {
  Object.defineProperty(window, 'screen', {
    value: { width },
    writable: true,
    configurable: true,
  })
}

function setDocumentTitle(title) {
  Object.defineProperty(document, 'title', {
    value: title,
    writable: true,
    configurable: true,
  })
}

function mockSendBeacon(returnValue = true) {
  navigator.sendBeacon.mockReturnValue(returnValue)
  return navigator.sendBeacon
}

describe('useStats composable', () => {
  let sendBeaconSpy

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    setLocation('localhost')
    setReferrer('')
    setDoNotTrack('unspecified')
    setGlobalPrivacyControl(false)
    setScreenWidth(390)
    setDocumentTitle('Test Page')
    sendBeaconSpy = mockSendBeacon(true)
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function loadUseStats() {
    const module = await import('@/composables/useStats.js')
    return module
  }

  describe('countPage', () => {
    it('sends nothing on localhost', async () => {
      setLocation('localhost')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('sends nothing on Netlify preview host', async () => {
      setLocation('deploy-preview-123.islamichub.xyz')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('sends one request when all conditions met on live host', async () => {
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })

      expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
      const url = sendBeaconSpy.mock.calls[0][0]
      expect(url).toContain('https://islamichub.goatcounter.com/count')
      expect(url).toContain('p=%2Fprayer')
      expect(url).toContain('t=Prayer+Times')
      expect(url).toContain('e=0')
    })

    it('sends nothing when Do Not Track is "1"', async () => {
      setLocation(LIVE_HOST)
      setDoNotTrack('1')
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('sends nothing when Global Privacy Control is on', async () => {
      setLocation(LIVE_HOST)
      setGlobalPrivacyControl(true)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('sends nothing when opted out', async () => {
      setLocation(LIVE_HOST)
      localStorage.setItem('stats-opt-out', '1')
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('includes source on first page view only', async () => {
      setLocation(LIVE_HOST)
      setReferrer('https://www.google.com/search?q=prayer')
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')

      const { countPage } = await loadUseStats()

      // First page view
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
      let url = sendBeaconSpy.mock.calls[0][0]
      expect(url).toContain('r=www.google.com')

      // Second page view - same module instance
      sendBeaconSpy.mockClear()
      countPage({ path: '/adhkar', meta: { title: 'Adhkar' } })
      expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
      url = sendBeaconSpy.mock.calls[0][0]
      expect(url).not.toContain('r=')
    })

    it('drops query string from path', async () => {
      setLocation(LIVE_HOST, '/prayer?foo=bar')
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { countPage } = await loadUseStats()
      countPage({ path: '/prayer?foo=bar', meta: { title: 'Prayer Times' } })

      expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
      const url = sendBeaconSpy.mock.calls[0][0]
      expect(url).toContain('p=%2Fprayer')
      expect(url).not.toContain('foo=bar')
    })

    it('does not error when sendBeacon throws', async () => {
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      sendBeaconSpy.mockImplementation(() => {
        throw new Error('blocked')
      })
      const { countPage } = await loadUseStats()

      expect(() => countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })).not.toThrow()
    })

    it('does not error when sendBeacon returns false', async () => {
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      sendBeaconSpy.mockReturnValue(false)
      const { countPage } = await loadUseStats()

      expect(() => countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })).not.toThrow()
    })
  })

  describe('track', () => {
    it('sends for each of the five action names', async () => {
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { track } = await loadUseStats()

      for (const action of ACTIONS) {
        sendBeaconSpy.mockClear()
        track(action)
        expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
        const url = sendBeaconSpy.mock.calls[0][0]
        expect(url).toContain('e=1')
      }
    })

    it('sends nothing for an unknown action name', async () => {
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { track } = await loadUseStats()
      track('unknown action')
      track('')
      track('prayer times')
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('has function length of 1', async () => {
      const { track } = await loadUseStats()
      expect(track.length).toBe(1)
    })

    it('sends nothing on localhost', async () => {
      setLocation('localhost')
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { track } = await loadUseStats()
      track('prayer times shown')
      expect(sendBeaconSpy).not.toHaveBeenCalled()
    })

    it('does not send entered data values', async () => {
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { track } = await loadUseStats()

      // Simulate a Zakat calculation with sample data
      track('zakat result reached')

      expect(sendBeaconSpy).toHaveBeenCalledTimes(1)
      const url = sendBeaconSpy.mock.calls[0][0]
      const urlString = url.toString()
      expect(urlString).not.toContain('100000') // sample savings
      expect(urlString).not.toContain('85') // sample gold grams
      expect(urlString).not.toContain('22k') // sample karat
      expect(urlString).not.toContain('Lagos') // sample location
    })
  })

  describe('opt-out', () => {
    it('isOptedOut returns false by default', async () => {
      const { isOptedOut } = await loadUseStats()
      expect(isOptedOut()).toBe(false)
    })

    it('isOptedOut returns true after setOptOut(true)', async () => {
      const { setOptOut, isOptedOut } = await loadUseStats()
      setOptOut(true)
      expect(isOptedOut()).toBe(true)
    })

    it('isOptedOut returns false after setOptOut(false)', async () => {
      const { setOptOut, isOptedOut } = await loadUseStats()
      setOptOut(true)
      setOptOut(false)
      expect(isOptedOut()).toBe(false)
    })

    it('opt-out choice persists across module reloads', async () => {
      const { setOptOut } = await loadUseStats()
      setOptOut(true)
      // Simulate module reload by importing again
      const { isOptedOut } = await loadUseStats()
      expect(isOptedOut()).toBe(true)
    })

    it('does not error when localStorage throws', async () => {
      const { isOptedOut } = await loadUseStats()
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('storage blocked')
      })

      expect(() => isOptedOut()).not.toThrow()
      expect(isOptedOut()).toBe(false)

      vi.spyOn(Storage.prototype, 'getItem').mockRestore()
    })

    it('setOptOut does not error when localStorage throws', async () => {
      const { setOptOut } = await loadUseStats()
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('storage blocked')
      })
      expect(() => setOptOut(true)).not.toThrow()
      vi.spyOn(Storage.prototype, 'setItem').mockRestore()
    })
  })

  describe('no cookies or extra localStorage', () => {
    it('does not write to document.cookie', async () => {
      const cookieSpy = vi.spyOn(document, 'cookie', 'set')
      setLocation(LIVE_HOST)
      vi.stubEnv('VITE_STATS_ENDPOINT', 'https://islamichub.goatcounter.com/count')
      const { countPage, track } = await loadUseStats()
      countPage({ path: '/prayer', meta: { title: 'Prayer Times' } })
      track('prayer times shown')
      expect(cookieSpy).not.toHaveBeenCalled()
    })

    it('only touches stats-opt-out in localStorage', async () => {
      const { setOptOut } = await loadUseStats()
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

      setOptOut(true)
      setOptOut(false)

      for (const call of setItemSpy.mock.calls) {
        expect(call[0]).toBe('stats-opt-out')
      }
      for (const call of removeItemSpy.mock.calls) {
        expect(call[0]).toBe('stats-opt-out')
      }
    })
  })
})

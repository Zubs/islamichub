import { describe, it, expect } from 'vitest'
import { ACTIONS, sourceName, shouldCount, hitUrl, sourceTag } from './stats.js'

describe('stats utils', () => {
  describe('ACTIONS', () => {
    it('contains exactly the five expected action names', () => {
      expect(ACTIONS).toEqual([
        'prayer times shown',
        'zakat result reached',
        'inheritance result reached',
        'adhkar category completed',
        'tasbih target reached',
      ])
    })
  })

  describe('sourceName', () => {
    it('returns empty string when no referrer', () => {
      expect(sourceName(null, 'islamichub.xyz')).toBe('')
      expect(sourceName('', 'islamichub.xyz')).toBe('')
      expect(sourceName(undefined, 'islamichub.xyz')).toBe('')
    })

    it('returns empty string when referrer is on the same host', () => {
      expect(sourceName('https://islamichub.xyz/prayer', 'islamichub.xyz')).toBe('')
      expect(sourceName('https://islamichub.xyz/adhkar/morning', 'islamichub.xyz')).toBe('')
      expect(sourceName('http://islamichub.xyz/', 'islamichub.xyz')).toBe('')
    })

    it('returns host name only when referrer is on another site, dropping path and search', () => {
      expect(sourceName('https://www.google.com/search?q=zakat+calculator', 'islamichub.xyz')).toBe(
        'www.google.com',
      )
      expect(sourceName('https://duckduckgo.com/?q=prayer+times', 'islamichub.xyz')).toBe(
        'duckduckgo.com',
      )
      expect(sourceName('https://example.com/path/to/page?foo=bar', 'islamichub.xyz')).toBe(
        'example.com',
      )
      expect(sourceName('https://m.facebook.com/some/path', 'islamichub.xyz')).toBe(
        'm.facebook.com',
      )
    })

    it('returns empty string for malformed referrer', () => {
      expect(sourceName('not-a-url', 'islamichub.xyz')).toBe('')
      expect(sourceName('javascript:alert(1)', 'islamichub.xyz')).toBe('')
      expect(sourceName('://missing-scheme', 'islamichub.xyz')).toBe('')
    })
  })

  describe('shouldCount', () => {
    const baseConditions = {
      endpoint: 'https://example.goatcounter.com/count',
      hostname: 'islamichub.xyz',
      liveHost: 'islamichub.xyz',
      doNotTrack: 'unspecified',
      globalPrivacyControl: false,
      optedOut: false,
    }

    it('returns true when all conditions are met', () => {
      expect(shouldCount(baseConditions)).toBe(true)
    })

    it('returns false when no endpoint', () => {
      expect(shouldCount({ ...baseConditions, endpoint: '' })).toBe(false)
      expect(shouldCount({ ...baseConditions, endpoint: undefined })).toBe(false)
      expect(shouldCount({ ...baseConditions, endpoint: null })).toBe(false)
    })

    it('returns false when hostname is not the live host', () => {
      expect(shouldCount({ ...baseConditions, hostname: 'localhost' })).toBe(false)
      expect(
        shouldCount({ ...baseConditions, hostname: 'deploy-preview-123.islamichub.xyz' }),
      ).toBe(false)
      expect(shouldCount({ ...baseConditions, hostname: 'staging.example.com' })).toBe(false)
    })

    it('returns false when Do Not Track is "1"', () => {
      expect(shouldCount({ ...baseConditions, doNotTrack: '1' })).toBe(false)
    })

    it('returns false when Global Privacy Control is on', () => {
      expect(shouldCount({ ...baseConditions, globalPrivacyControl: true })).toBe(false)
    })

    it('returns false when opted out', () => {
      expect(shouldCount({ ...baseConditions, optedOut: true })).toBe(false)
    })
  })

  describe('hitUrl', () => {
    const endpoint = 'https://islamichub.goatcounter.com/count'
    const baseHit = {
      path: '/prayer',
      title: 'Prayer Times',
      source: 'www.google.com',
      action: false,
      screenWidth: 390,
      random: 'abc123',
    }

    it('includes exactly the expected fields and no others', () => {
      const url = hitUrl(endpoint, baseHit)
      const params = new URLSearchParams(url.split('?')[1])
      expect([...params.keys()].sort()).toEqual(['b', 'e', 'p', 'r', 'rnd', 's', 't'])
    })

    it('drops query string from path', () => {
      const url = hitUrl(endpoint, { ...baseHit, path: '/prayer?foo=bar' })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.get('p')).toBe('/prayer')
    })

    it('omits r when source is empty', () => {
      const url = hitUrl(endpoint, { ...baseHit, source: '' })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.has('r')).toBe(false)
    })

    it('omits r when source is undefined', () => {
      const url = hitUrl(endpoint, { ...baseHit, source: undefined })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.has('r')).toBe(false)
    })

    it('sets e=true for an action', () => {
      const url = hitUrl(endpoint, { ...baseHit, action: true })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.get('e')).toBe('true')
    })

    it('sets e=false for a page view', () => {
      const url = hitUrl(endpoint, { ...baseHit, action: false })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.get('e')).toBe('false')
    })

    it('escapes characters that need escaping', () => {
      const url = hitUrl(endpoint, {
        ...baseHit,
        title: 'Prayer & Times',
        path: '/adhkar/morning?foo=bar',
      })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.get('t')).toBe('Prayer & Times')
      expect(params.get('p')).toBe('/adhkar/morning')
    })

    it('marks the hit as from a person and sends the random value as rnd', () => {
      const url = hitUrl(endpoint, { ...baseHit, random: 'xyz789' })
      const params = new URLSearchParams(url.split('?')[1])
      expect(params.get('b')).toBe('0')
      expect(params.get('rnd')).toBe('xyz789')
    })
  })

  describe('sourceTag', () => {
    it('returns empty string when no search', () => {
      expect(sourceTag('')).toBe('')
      expect(sourceTag(null)).toBe('')
      expect(sourceTag(undefined)).toBe('')
    })

    it('returns empty string when no src parameter', () => {
      expect(sourceTag('?foo=bar')).toBe('')
    })

    it('returns the tag when valid', () => {
      expect(sourceTag('?src=whatsapp')).toBe('whatsapp')
      expect(sourceTag('?src=qr-code')).toBe('qr-code')
      expect(sourceTag('?src=source123')).toBe('source123')
    })

    it('returns empty string when tag has invalid characters', () => {
      expect(sourceTag("?src=what'sapp")).toBe('')
      expect(sourceTag('?src=what.sapp')).toBe('')
      expect(sourceTag('?src=what_sapp')).toBe('')
    })

    it('returns empty string when tag is over 20 characters', () => {
      expect(sourceTag('?src=' + 'a'.repeat(21))).toBe('')
    })

    it('returns the tag when among other parameters', () => {
      expect(sourceTag('?foo=bar&src=whatsapp&baz=qux')).toBe('whatsapp')
      expect(sourceTag('?src=qr-code&utm_source=test')).toBe('qr-code')
    })
  })
})

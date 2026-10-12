import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'

vi.mock('@/composables/useStats.js', async (original) => ({
  ...(await original()),
  countPage: vi.fn(),
}))

describe('source tag on arriving links', () => {
  let router
  let countPage

  beforeEach(async () => {
    vi.resetModules()
    ;({ countPage } = await import('@/composables/useStats.js'))
    router = (await import('@/router/index.js')).default
    countPage.mockClear()
  })

  it('counts a tagged visit once under the tag and removes the tag from the address', async () => {
    await router.push('/duas/travel?src=whatsapp#farewell')
    await flushPromises()

    expect(countPage).toHaveBeenCalledOnce()
    expect(countPage.mock.calls[0][0].path).toBe('/duas/travel')
    expect(countPage.mock.calls[0][1]).toBe('whatsapp')
    expect(router.currentRoute.value.fullPath).toBe('/duas/travel#farewell')
    expect(window.location.search).toBe('')
  })

  it('keeps other query values and removes only the tag', async () => {
    await router.push('/zakat?src=whatsapp&ref=friend')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/zakat?ref=friend')
    expect(countPage).toHaveBeenCalledOnce()
  })

  it('counts an untagged visit with no tag and leaves the address alone', async () => {
    await router.push('/tasbih?x=1')
    await flushPromises()

    expect(countPage).toHaveBeenCalledOnce()
    expect(countPage.mock.calls[0][1]).toBe('')
    expect(router.currentRoute.value.fullPath).toBe('/tasbih?x=1')
  })

  it('ignores a tag with characters outside the allowed set', async () => {
    await router.push('/about?src=bad.tag')
    await flushPromises()

    expect(countPage.mock.calls[0][1]).toBe('')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsOptOut from '@/components/StatsOptOut.vue'
import { isOptedOut, setOptOut } from '@/composables/useStats.js'

vi.mock('@/composables/useStats.js', () => ({
  isOptedOut: vi.fn(),
  setOptOut: vi.fn(),
}))

describe('StatsOptOut.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('is off by default', () => {
    isOptedOut.mockReturnValue(false)
    const wrapper = mount(StatsOptOut)
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(false)
  })

  it('shows as on when the choice is stored', () => {
    isOptedOut.mockReturnValue(true)
    const wrapper = mount(StatsOptOut)
    expect(wrapper.find('input[type="checkbox"]').element.checked).toBe(true)
  })

  it('calls setOptOut(true) when turning on', async () => {
    isOptedOut.mockReturnValue(false)
    const wrapper = mount(StatsOptOut)
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(setOptOut).toHaveBeenCalledWith(true)
  })

  it('calls setOptOut(false) when turning off', async () => {
    isOptedOut.mockReturnValue(true)
    const wrapper = mount(StatsOptOut)
    await wrapper.find('input[type="checkbox"]').setValue(false)
    expect(setOptOut).toHaveBeenCalledWith(false)
  })

  it('is reachable by keyboard and has an accessible name', () => {
    isOptedOut.mockReturnValue(false)
    const wrapper = mount(StatsOptOut)
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.attributes('aria-describedby')).toBe('stats-opt-out-desc')
    expect(wrapper.find('#stats-opt-out-desc').exists()).toBe(true)
  })
})

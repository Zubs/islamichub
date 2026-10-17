import { describe, it, expect } from 'vitest'
import HajjView from './HajjView.vue'
import content from '@/data/content/hajj/en.js'
import { mountPage } from '../../../test/mountPage.js'

describe('Hajj page', () => {
  it('shows the rites of each day when its tab is pressed', async () => {
    const { wrapper } = await mountPage(HajjView, { path: '/hajj' })
    const tabs = wrapper.findAll('.btn-group .pill-btn')

    expect(tabs).toHaveLength(content.lists.days.length)
    for (const [index, day] of content.lists.days.entries()) {
      await tabs[index].trigger('click')

      expect(tabs[index].classes()).toContain('active')
      expect(wrapper.text()).toContain(day.title)
      expect(wrapper.text()).toContain(day.rites[0].name)
    }
  })
})

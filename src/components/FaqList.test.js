import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FaqList from './FaqList.vue'

describe('FaqList', () => {
  it('opens only the answer whose question was clicked', async () => {
    const wrapper = mount(FaqList, {
      props: {
        faqs: [
          { q: 'First question', a: 'First answer' },
          { q: 'Second question', a: 'Second answer' },
        ],
      },
    })

    await wrapper.findAll('.faq-q')[0].trigger('click')

    const answers = wrapper.findAll('.faq-a')
    expect(answers[0].classes()).toContain('open')
    expect(answers[1].classes()).not.toContain('open')
  })
})

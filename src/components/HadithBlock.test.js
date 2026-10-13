import { describe, it, expect } from 'vitest'
import HadithBlock from './HadithBlock.vue'
import HadithRef from './HadithRef.vue'
import { mountPage } from '../../test/mountPage.js'

async function block(props, text = '"Fasting is a shield."') {
  const { wrapper } = await mountPage(HadithBlock, { props, slots: { default: text } })
  return wrapper
}

function links(wrapper) {
  return wrapper.findAll('a').map((link) => [link.text(), link.attributes('href')])
}

describe('HadithBlock', () => {
  it('shows its text and no empty source line when it has no reference', async () => {
    const wrapper = await block({})

    expect(wrapper.find('.hadith-text').text()).toBe('"Fasting is a shield."')
    expect(wrapper.find('.hadith-source').exists()).toBe(false)
  })

  it('shows one link for one reference', async () => {
    const wrapper = await block({ reference: 'Sahih Muslim 2691' })

    expect(links(wrapper)).toEqual([
      ['Sahih Muslim 2691', '/hadith/books/sahih-muslim/hadith/6842'],
    ])
  })

  it('shows two links, each to the right book', async () => {
    const wrapper = await block({ reference: 'Sahih Bukhari 1904 · Sahih Muslim 1151' })

    expect(links(wrapper)).toEqual([
      ['Sahih Bukhari 1904', '/hadith/books/sahih-bukhari/hadith/1904'],
      ['Sahih Muslim 1151', '/hadith/books/sahih-muslim/hadith/2704'],
    ])
    expect(wrapper.find('.hadith-source').text()).toBe('Sahih Bukhari 1904 · Sahih Muslim 1151')
  })

  it('shows a collection outside the library as text, not a broken link', async () => {
    const wrapper = await block({ reference: 'Muwatta Malik 1617' })

    expect(wrapper.find('.hadith-source').text()).toBe('Muwatta Malik 1617')
    expect(links(wrapper)).toEqual([])
  })

  it('shows a source that is not a hadith reference as text', async () => {
    const wrapper = await block({ reference: 'Imam Abdullah ibn al-Mubarak (d. 181 AH)' })

    expect(wrapper.find('.hadith-source').text()).toBe('Imam Abdullah ibn al-Mubarak (d. 181 AH)')
    expect(links(wrapper)).toEqual([])
  })

  it('keeps the classes that style it and animate it in on scroll', async () => {
    const wrapper = await block({ reference: 'Sahih Muslim 2691' })

    expect(wrapper.classes()).toEqual(['hadith-block', 'anim-target'])
    expect(wrapper.find('.hadith-source').exists()).toBe(true)
    expect(wrapper.find('.hadith-text').exists()).toBe(true)
  })
})

describe('HadithRef', () => {
  it('links a mapped reference to the mapped number while displaying the cited one', async () => {
    const { wrapper } = await mountPage(HadithRef, {
      props: { text: 'Sahih Muslim 1151', numbering: { 'sahih-muslim': { 1151: 2707 } } },
    })

    expect(links(wrapper)).toEqual([
      ['Sahih Muslim 1151', '/hadith/books/sahih-muslim/hadith/2707'],
    ])
  })

  it('renders text with no reference unchanged and without a link', async () => {
    const { wrapper } = await mountPage(HadithRef, { props: { text: "Qur'an 2:255" } })

    expect(wrapper.text()).toBe("Qur'an 2:255")
    expect(wrapper.find('a').exists()).toBe(false)
  })
})

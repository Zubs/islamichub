import { describe, it, expect } from 'vitest'
import InheritanceView from './InheritanceView.vue'
import { mountPage as mountView } from '../../../test/mountPage.js'

async function mountPage() {
  return (await mountView(InheritanceView, { path: '/inheritance' })).wrapper
}

async function add(wrapper, label, count) {
  await wrapper.find(`button[aria-label="Add ${label}"]`).trigger('click')
  if (count) {
    const row = wrapper.findAll('.heir-toggle').find((toggle) => toggle.text().includes(label))
    await row.find('input').setValue(count)
  }
}

describe('Inheritance page', () => {
  it('asks for at least one heir and shows no result', async () => {
    const wrapper = await mountPage()

    expect(wrapper.find('.inh-message').text()).toBe('Select at least one heir.')
    expect(wrapper.findAll('.inh-row')).toHaveLength(0)
  })

  it('says the result is a guide and not a ruling', async () => {
    expect((await mountPage()).text()).toContain('a guide, not a ruling')
  })

  it('rejects a husband and a wife together', async () => {
    const wrapper = await mountPage()

    await add(wrapper, 'Husband')
    await add(wrapper, 'Wife / Wives')

    expect(wrapper.find('.inh-message').text()).toContain('not both')
    expect(wrapper.findAll('.inh-row')).toHaveLength(0)
  })

  it('rejects five wives and a negative count', async () => {
    const wrapper = await mountPage()

    await add(wrapper, 'Wife / Wives', 5)
    expect(wrapper.find('.inh-message').text()).toContain('no more than 4')

    await add(wrapper, 'Son(s)', -2)
    expect(wrapper.find('.inh-message').text()).toContain('whole number')
  })

  it('rejects an estate that is not a number', async () => {
    const wrapper = await mountPage()
    await add(wrapper, 'Son(s)')

    await wrapper.find('input[step="1000"]').setValue('')

    expect(wrapper.find('.inh-message').text()).toContain('estate')
  })

  it('divides 120,000 between a wife, two sons and a daughter', async () => {
    const wrapper = await mountPage()

    await wrapper.find('input[step="1000"]').setValue(120000)
    await add(wrapper, 'Wife / Wives')
    await add(wrapper, 'Son(s)', 2)
    await add(wrapper, 'Daughter(s)')

    const rows = wrapper.findAll('.inh-row').map((row) => row.text())
    expect(rows).toHaveLength(3)
    expect(rows[0]).toContain('1/8 (12.5%)')
    expect(rows[0]).toContain('£15,000.00')
    expect(rows[1]).toContain('£84,000.00')
    expect(rows[1]).toContain('£42,000.00 each')
    expect(rows[2]).toContain('£21,000.00')
    expect(rows[2]).toContain('Residue, two parts to each male')
  })
})

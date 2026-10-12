import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import DuasHomeView from './DuasHomeView.vue'
import DuasSituationView from './DuasSituationView.vue'
import { DUAS, DUA_SITUATIONS, getDuasBySituation } from '@/data/duas.js'
import { scrollBehavior } from '@/router/index.js'
import { mountPage } from '../../../test/mountPage.js'

async function settled() {
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 20))
}

describe('Duas page', () => {
  it('lists every situation with the number of duas in it', async () => {
    const { wrapper } = await mountPage(DuasHomeView, { path: '/duas' })
    const cards = wrapper.findAll('.duas-card')

    expect(cards).toHaveLength(DUA_SITUATIONS.length)
    for (const [index, situation] of DUA_SITUATIONS.entries()) {
      expect(cards[index].attributes('href')).toBe(`/duas/${situation.slug}`)
      expect(cards[index].text()).toContain(situation.name)
      expect(cards[index].text()).toContain(`${getDuasBySituation(situation.slug).length} duas`)
    }
  })

  it('does not list a situation with no duas, and shows "1 dua" for one', async () => {
    const { wrapper } = await mountPage(DuasHomeView, {
      path: '/duas',
      props: { duas: [DUAS.find((dua) => dua.id === 'farewell')] },
    })
    const cards = wrapper.findAll('.duas-card')

    expect(cards).toHaveLength(1)
    expect(cards[0].text()).toContain('Travel')
    expect(cards[0].text()).toContain('1 dua')
    expect(cards[0].text()).not.toContain('1 duas')
  })

  it('searches, shows the matches, and returns to the situations when cleared', async () => {
    const { wrapper } = await mountPage(DuasHomeView, { path: '/duas' })

    await wrapper.find('#dua-search').setValue('TRAVEL')

    expect(wrapper.findAll('.duas-result').length).toBeGreaterThanOrEqual(
      getDuasBySituation('travel').length,
    )
    expect(wrapper.find('.duas-card').exists()).toBe(false)

    await wrapper.find('.duas-search-row button').trigger('click')

    expect(wrapper.find('#dua-search').element.value).toBe('')
    expect(wrapper.findAll('.duas-card')).toHaveLength(DUA_SITUATIONS.length)
  })

  it('says no duas were found and offers to clear the search', async () => {
    const { wrapper } = await mountPage(DuasHomeView, { path: '/duas' })

    await wrapper.find('#dua-search').setValue('zzzzqqq')

    expect(wrapper.find('.duas-empty').text()).toContain('No duas found')
    await wrapper.find('.duas-empty button').trigger('click')
    expect(wrapper.find('.duas-empty').exists()).toBe(false)
  })
})

describe('Duas situation page', () => {
  it('shows one card for each dua of the situation, each with its own anchor', async () => {
    const { wrapper } = await mountPage(DuasSituationView, { path: '/duas/travel' })
    const travel = getDuasBySituation('travel')

    expect(wrapper.findAll('.dhikr-card')).toHaveLength(travel.length)
    for (const dua of travel) {
      const card = wrapper.find(`#${dua.id}`)
      expect(card.exists()).toBe(true)
      expect(card.find('[lang="ar"]').text()).toBe(dua.arabic)
      expect(card.find('[lang="ar"]').attributes('dir')).toBe('rtl')
      expect(card.text()).toContain(dua.title)
      expect(card.text()).toContain(dua.transliteration)
      expect(card.text()).toContain(dua.translation)
    }
  })

  it('shows a dua that fits two situations on both pages', async () => {
    const travel = await mountPage(DuasSituationView, { path: '/duas/travel' })
    const home = await mountPage(DuasSituationView, { path: '/duas/home' })

    expect(travel.wrapper.find('#arriving').exists()).toBe(true)
    expect(home.wrapper.find('#arriving').exists()).toBe(true)
  })

  it('gives no counter to a dua said once and a counter to one said seven times', async () => {
    const { wrapper } = await mountPage(DuasSituationView, { path: '/duas/illness' })

    expect(wrapper.find('#healing .dc-counters').exists()).toBe(false)
    const counted = wrapper.find('#asking-for-a-cure .dc-tap-btn')
    expect(counted.text()).toContain('0 / 7')

    await counted.trigger('click')
    expect(wrapper.find('#asking-for-a-cure .dc-tap-btn').text()).toContain('1 / 7')
  })

  it('links a hadith reference to the library and leaves a Qur’an reference as text', async () => {
    const { wrapper } = await mountPage(DuasSituationView, { path: '/duas/illness' })

    expect(wrapper.find('#healing .dc-ref a').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/hadith/5743',
    )
    expect(wrapper.find('#ayyub .dc-ref').text()).toBe("Qur'an 21:83")
    expect(wrapper.find('#ayyub .dc-ref a').exists()).toBe(false)
  })
})

describe('Duas journeys', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('shows the 404 page for an unknown situation', async () => {
    const { wrapper, router } = await mountPage(App, { path: '/duas/no-such-situation' })
    await settled()

    expect(router.currentRoute.value.name).toBe('not-found')
    expect(router.currentRoute.value.path).toBe('/duas/no-such-situation')
    expect(wrapper.text()).toMatch(/not found/i)
  })

  it('scrolls to a single dua when its link is opened', async () => {
    vi.useFakeTimers()

    const position = scrollBehavior({ hash: '#farewell', path: '/duas/travel' }, {}, null)
    vi.advanceTimersByTime(400)

    expect(await position).toEqual({ el: '#farewell', top: 84 })
    expect(scrollBehavior({ hash: '', path: '/duas' }, {}, null)).toEqual({
      top: 0,
      behavior: 'instant',
    })
  })

  it('takes a user from searching "rain" to the dua and on to its source hadith', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
    const { wrapper, router } = await mountPage(App, { path: '/duas' })
    await settled()

    await wrapper.find('#dua-search').setValue('rain')
    const result = wrapper
      .findAll('.duas-result')
      .find((candidate) => candidate.text().includes('When it rains'))
    expect(result.attributes('href')).toBe('/duas/weather#rain')

    await router.push(result.attributes('href'))
    await settled()
    const reference = wrapper.find('#rain .dc-ref a')
    expect(reference.text()).toBe('Sahih Bukhari 1032')

    await router.push(reference.attributes('href'))
    await settled()
    expect(router.currentRoute.value.params).toEqual({
      bookSlug: 'sahih-bukhari',
      hadithNumber: '1032',
    })
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import { GAME_KEYS } from '@/stores/games.js'
import { dayKey } from '@/utils/day.js'
import { mountPage } from '../../../test/mountPage.js'

async function open() {
  const mounted = await mountPage(App, { path: '/games' })
  await vi.dynamicImportSettled()
  await flushPromises()
  return mounted.wrapper
}

describe('games page', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('lists the three games with no result for a new player', async () => {
    const wrapper = await open()
    const cards = wrapper.findAll('.games-card')

    expect(cards.map((card) => card.attributes('href'))).toEqual([
      '/games/quiz',
      '/games/who-am-i',
      '/games/kalimah',
    ])
    expect(cards[0].find('.games-result').text()).toBe('Not played yet')
    expect(cards[2].find('.games-result').text()).toBe('Not played today')
  })

  it('shows a returning player their best results on this device', async () => {
    localStorage.setItem(GAME_KEYS.quizBest, '8')
    localStorage.setItem(GAME_KEYS.whoAmIBest, '40')
    localStorage.setItem(
      GAME_KEYS.kalimahGame,
      JSON.stringify({ day: dayKey(), guesses: ['a', 'b', 'c'], won: true, counted: true }),
    )
    const wrapper = await open()
    const results = wrapper.findAll('.games-result').map((result) => result.text())

    expect(results).toEqual(['Best: 8 of 10', 'Best game: 40 points', 'Solved today in 3 tries'])
  })

  it('is found under Tools in the navigation and on the Tools page', async () => {
    const wrapper = await open()

    expect(wrapper.find('.nav-pillars a.active').attributes('href')).toBe('/tools')
  })
})

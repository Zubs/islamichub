import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import clues from '@/data/games/whoAmI.js'
import { GAME_KEYS } from '@/stores/games.js'
import { mountPage } from '../../../test/mountPage.js'

// With Math.random at 0, the first prophet in the list, Adam, is chosen.
async function open({ level } = {}) {
  vi.spyOn(Math, 'random').mockReturnValue(0)
  const { wrapper } = await mountPage(App, { path: '/games/who-am-i' })
  await vi.dynamicImportSettled()
  await flushPromises()
  if (level) {
    await wrapper.find(`.game-intro input[value="${level}"]`).setValue(true)
  }
  await wrapper.find('.game-intro-start').trigger('click')
  await nextTick()
  return wrapper
}

async function pick(wrapper, name) {
  await wrapper
    .findAll('.who-name')
    .find((button) => button.text() === name)
    .trigger('click')
  await nextTick()
}

describe('Who am I?', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('shows one clue, then names the prophet and his clues with references when guessed', async () => {
    const wrapper = await open()
    expect(wrapper.findAll('.who-clue')).toHaveLength(1)
    expect(wrapper.find('.who-clue').text()).toBe(clues.adam[0].text)

    await pick(wrapper, 'Adam')

    expect(wrapper.find('.who-heading').text()).toBe('Yes, Adam.')
    expect(wrapper.find('.who-score').text()).toBe('50 points')
    expect(wrapper.findAll('.who-clue')).toHaveLength(clues.adam.length)
    expect(wrapper.findAll('.who-ref')).toHaveLength(clues.adam.length)
    expect(wrapper.find('a[href="/prophets/adam"]').exists()).toBe(true)
    expect(wrapper.find('.who-next').exists()).toBe(true)
    expect(wrapper.find('.who-result').exists()).toBe(false)
  })

  it('goes on to the next prophet after a right guess, adding up the points', async () => {
    const wrapper = await open()
    await pick(wrapper, 'Adam')
    await wrapper.find('.who-next').trigger('click')
    await nextTick()

    expect(wrapper.find('.who-heading').text()).toBe('Who am I?')
    expect(wrapper.find('.who-clue').text()).toBe(clues.idris[0].text)
    expect(wrapper.find('.who-level').text()).toBe('Normal · Prophet 2 · 50 points')
  })

  it('ends the game at the first prophet not named, with the count, the total and the day’s best', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 17, 9))
    const wrapper = await open()
    await pick(wrapper, 'Adam')
    await wrapper.find('.who-next').trigger('click')
    await nextTick()
    await pick(wrapper, 'Idris')
    await wrapper.find('.who-next').trigger('click')
    await nextTick()
    await wrapper.findAll('.who-actions .btn')[1].trigger('click')
    await nextTick()
    vi.useRealTimers()

    expect(wrapper.find('.who-heading').text()).toBe('It was Nuh.')
    expect(wrapper.find('.who-next').exists()).toBe(false)
    expect(wrapper.find('.who-result h2').text()).toBe('You answered 2 correctly')
    expect(wrapper.find('.who-result .who-score').text()).toBe('100 points in 3 rounds')
    expect(wrapper.find('.who-today').text()).toBe('Today’s best: 100 points in 3 rounds')
    expect(localStorage.getItem(GAME_KEYS.whoAmIBest)).toBe('100')
    expect(JSON.parse(localStorage.getItem(GAME_KEYS.whoAmIToday))).toEqual({
      day: '2026-10-17',
      points: 100,
      rounds: 3,
      correct: 2,
    })

    await wrapper.find('.who-again').trigger('click')
    await nextTick()
    expect(wrapper.find('.game-intro').exists()).toBe(true)
  })

  it('marks a wrong guess, lets the round go on, and scores less', async () => {
    const wrapper = await open()
    await pick(wrapper, 'Nuh')

    const nuh = wrapper.findAll('.who-name').find((button) => button.text() === 'Nuh')
    expect(nuh.classes()).toContain('wrong')
    expect(nuh.element.disabled).toBe(true)

    await wrapper.find('.who-actions .btn').trigger('click')
    await nextTick()
    expect(wrapper.findAll('.who-clue')).toHaveLength(2)

    await pick(wrapper, 'Adam')
    expect(wrapper.find('.who-score').text()).toBe('35 points')
  })

  it('reveals the answer and scores nothing when the player gives up', async () => {
    const wrapper = await open()
    await wrapper.findAll('.who-actions .btn')[1].trigger('click')
    await nextTick()

    expect(wrapper.find('.who-heading').text()).toBe('It was Adam.')
    expect(wrapper.find('.who-result h2').text()).toBe('You did not name any prophets this time')
    expect(localStorage.getItem(GAME_KEYS.whoAmIBest)).toBe('0')
  })

  it('explains the game before it starts', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { wrapper } = await mountPage(App, { path: '/games/who-am-i' })
    await vi.dynamicImportSettled()
    await flushPromises()

    expect(wrapper.find('.game-intro h2').text()).toBe('How to play')
    expect(wrapper.find('.who-clue').exists()).toBe(false)
  })

  it('ends the round after three wrong guesses', async () => {
    const wrapper = await open()
    expect(wrapper.find('.who-left').text()).toBe('3 guesses left')
    for (const name of ['Nuh', 'Hud', 'Salih']) await pick(wrapper, name)

    expect(wrapper.find('.who-heading').text()).toBe('It was Adam.')
    expect(localStorage.getItem(GAME_KEYS.whoAmIBest)).toBe('0')
  })

  it('allows two guesses on hard', async () => {
    const wrapper = await open({ level: 'hard' })
    expect(wrapper.find('.who-left').text()).toBe('2 guesses left')
    for (const name of ['Nuh', 'Hud']) await pick(wrapper, name)

    expect(wrapper.find('.who-heading').text()).toBe('It was Adam.')
  })

  it('shows the easiest clue first on easy', async () => {
    const wrapper = await open({ level: 'easy' })

    expect(wrapper.find('.who-clue').text()).toBe(clues.adam.at(-1).text)
  })

  it('offers a way back to the games page while playing', async () => {
    const wrapper = await open()

    expect(wrapper.find('.who-bar a[href="/games"]').text()).toBe('Quit to games')
  })

  it('shares the count and points without naming a prophet', async () => {
    const share = vi.fn(async () => {})
    navigator.share = share
    const wrapper = await open()
    await pick(wrapper, 'Adam')
    await wrapper.find('.who-next').trigger('click')
    await nextTick()
    for (const name of ['Nuh', 'Hud', 'Salih']) await pick(wrapper, name)

    await wrapper.find('.who-result .share-button').trigger('click')
    await flushPromises()
    delete navigator.share

    const text = share.mock.calls[0][0].text
    expect(text).toContain('I named 1 prophet in Who am I? on IslamicHub (Normal), 50 points.')
    expect(text).toContain('https://islamichub.xyz/games/who-am-i?src=whatsapp')
    expect(text).not.toMatch(/Adam|Idris/)
  })
})

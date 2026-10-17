import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import words from '@/data/games/kalimah.js'
import { GAME_KEYS } from '@/stores/games.js'
import { wordFor, lettersOf } from '@/utils/kalimah.js'
import { mountPage } from '../../../test/mountPage.js'

const TODAY = '2026-10-17'
const word = wordFor(TODAY, words)

async function open({ mode, level } = {}) {
  const { wrapper } = await mountPage(App, { path: '/games/kalimah' })
  await vi.dynamicImportSettled()
  await flushPromises()
  if (wrapper.find('.game-intro').exists()) {
    if (mode) {
      await wrapper.find(`.game-intro input[value="${mode}"]`).setValue(true)
    }
    if (level) {
      await wrapper.find(`.game-intro input[value="${level}"]`).setValue(true)
    }
    await wrapper.find('.game-intro-start').trigger('click')
    await nextTick()
  }
  return wrapper
}

function wrongGuess(answer, letter) {
  return lettersOf(answer)
    .map(() => letter)
    .join('')
}

async function typeOnScreen(wrapper, text) {
  for (const letter of lettersOf(text)) {
    await wrapper
      .findAll('.kalimah-key')
      .find((key) => key.text() === letter)
      .trigger('click')
  }
  await wrapper.findAll('.kalimah-key.wide')[0].trigger('click')
  await nextTick()
}

async function typeOnKeyboard(text) {
  for (const key of [...lettersOf(text), 'Enter']) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }
  await nextTick()
}

function rowText(wrapper, index) {
  return wrapper
    .findAll('.kalimah-row')
    [index].findAll('.kalimah-cell')
    .map((cell) => cell.text())
    .join('')
}

describe('Kalimah', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 9, 17, 9))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    delete navigator.share
    localStorage.clear()
  })

  it('plays in Arabic letters by default, right to left, and shows the word in its verse when solved', async () => {
    const wrapper = await open()
    const grid = wrapper.find('.kalimah-grid')
    expect(grid.attributes('dir')).toBe('rtl')
    expect(grid.attributes('lang')).toBe('ar')
    expect(wrapper.findAll('.kalimah-row')[0].findAll('.kalimah-cell')).toHaveLength(
      lettersOf(word.unvocalised).length,
    )

    const wrong = wrongGuess(word.unvocalised, word.unvocalised.includes('ظ') ? 'ذ' : 'ظ')
    await typeOnScreen(wrapper, wrong)
    expect(rowText(wrapper, 0)).toBe(wrong)
    expect(wrapper.findAll('.kalimah-row')[0].findAll('.absent').length).toBeGreaterThan(0)

    await typeOnScreen(wrapper, word.unvocalised)
    expect(wrapper.find('.kalimah-message').text()).toBe('Solved in 2 of 6 tries.')
    expect(wrapper.find('.kalimah-word').text()).toBe(word.arabic)
    expect(wrapper.find('.kalimah-end').text()).toContain(word.reference)
    expect(wrapper.find('.kalimah-end .quran-block').classes()).not.toContain('anim-target')
    expect(wrapper.find('.kalimah-keyboard').exists()).toBe(false)

    const saved = JSON.parse(localStorage.getItem(GAME_KEYS.kalimahGame))
    expect(saved).toEqual({
      day: TODAY,
      guesses: [wrong, word.unvocalised],
      won: true,
      counted: true,
    })
  })

  it('plays in transliteration when chosen, typed on the device keyboard, and remembers the choice', async () => {
    const wrapper = await open({ mode: 'latin' })
    expect(localStorage.getItem(GAME_KEYS.kalimahMode)).toBe('"latin"')
    expect(wrapper.find('.kalimah-grid').attributes('dir')).toBe('ltr')

    await typeOnKeyboard(word.transliteration.slice(0, -1))
    expect(wrapper.find('.kalimah-message').text()).toBe(
      `Type all ${word.transliteration.length} letters, then press Enter.`,
    )

    await typeOnKeyboard(word.transliteration.slice(-1))
    expect(wrapper.find('.kalimah-message').text()).toBe('Solved in 1 of 6 tries.')
  })

  it('keeps the day’s guesses across a reload and holds the chosen way of typing', async () => {
    const guesses = ['q', 'x'].map((letter) => wrongGuess(word.transliteration, letter))
    localStorage.setItem(GAME_KEYS.kalimahMode, '"latin"')
    localStorage.setItem(
      GAME_KEYS.kalimahGame,
      JSON.stringify({ day: TODAY, guesses, won: false, counted: false }),
    )

    const wrapper = await open()
    expect(rowText(wrapper, 0)).toBe(guesses[0])
    expect(rowText(wrapper, 1)).toBe(guesses[1])
    expect(rowText(wrapper, 2)).toBe('')
    expect(wrapper.find('.game-intro').exists()).toBe(false)
    expect(wrapper.find('.kalimah-level').text()).toBe('Transliteration · Normal')
  })

  it('shares the grid and the link but never the word', async () => {
    navigator.share = vi.fn(async () => {})
    localStorage.setItem(GAME_KEYS.kalimahMode, '"latin"')
    const wrapper = await open()
    await typeOnKeyboard(wrongGuess(word.transliteration, 'q'))
    await typeOnKeyboard(word.transliteration)

    await wrapper.find('.share-button').trigger('click')
    await flushPromises()

    const shared = navigator.share.mock.calls[0][0]
    expect(shared.files).toBeUndefined()
    expect(shared.text).toContain('Kalimah 2026-10-17: 2/6, Transliteration, Normal')
    expect(shared.text).toContain('Can you find today’s word?')
    expect(shared.text).toContain('⬜')
    expect(shared.text).toContain('🟩🟩')
    expect(shared.text).toContain('https://islamichub.xyz/games/kalimah?src=whatsapp')
    expect(shared.text).not.toContain(word.transliteration)
    expect(shared.text).not.toContain(word.unvocalised)
  })

  it('starts a new word on the next day', async () => {
    localStorage.setItem(
      GAME_KEYS.kalimahGame,
      JSON.stringify({ day: '2026-10-16', guesses: ['x'], won: false, counted: true }),
    )
    vi.setSystemTime(new Date(2026, 9, 18, 9))
    const tomorrow = wordFor('2026-10-18', words)
    expect(tomorrow).not.toBe(word)

    const wrapper = await open()
    expect(rowText(wrapper, 0)).toBe('')
    expect(wrapper.findAll('.kalimah-row')[0].findAll('.kalimah-cell')).toHaveLength(
      lettersOf(tomorrow.unvocalised).length,
    )
    expect(JSON.parse(localStorage.getItem(GAME_KEYS.kalimahGame)).day).toBe('2026-10-18')
  })

  it('explains the game and offers both ways of typing before it starts', async () => {
    const { wrapper } = await mountPage(App, { path: '/games/kalimah' })
    await vi.dynamicImportSettled()
    await flushPromises()

    expect(wrapper.find('.game-intro h2').text()).toBe('How to play')
    expect(wrapper.find('.game-intro input[value="arabic"]').element.checked).toBe(true)
    expect(wrapper.find('.game-intro input[value="latin"]').exists()).toBe(true)
    expect(wrapper.find('.kalimah-grid').exists()).toBe(false)
  })

  it('shows the meaning as a hint on easy only', async () => {
    const easy = await open({ level: 'easy' })
    expect(easy.find('.kalimah-meaning').text()).toBe(`Hint: it means “${word.meaning}”.`)
    easy.unmount()
    localStorage.clear()

    const normal = await open({ level: 'normal' })
    expect(normal.find('.kalimah-meaning').exists()).toBe(false)
  })

  it('does not mark tried letters on the keyboard on hard', async () => {
    const wrapper = await open({ mode: 'latin', level: 'hard' })
    await typeOnKeyboard(wrongGuess(word.transliteration, 'q'))

    expect(rowText(wrapper, 0)).toBe(wrongGuess(word.transliteration, 'q'))
    expect(wrapper.findAll('.kalimah-key.absent')).toHaveLength(0)
  })

  it('offers a way back to the games page while playing', async () => {
    const wrapper = await open()

    expect(wrapper.find('.kalimah-bar a[href="/games"]').text()).toBe('Quit to games')
  })
})

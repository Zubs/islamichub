import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import bank from '@/data/games/quiz.js'
import { GAME_KEYS } from '@/stores/games.js'
import { mountPage } from '../../../test/mountPage.js'

const byText = new Map(bank.map((question) => [question.question, question]))

async function open({ start = true } = {}) {
  const { wrapper } = await mountPage(App, { path: '/games/quiz' })
  await vi.dynamicImportSettled()
  await flushPromises()
  if (start && wrapper.find('.game-intro-start').exists()) {
    await wrapper.find('.game-intro-start').trigger('click')
    await nextTick()
  }
  return wrapper
}

function currentQuestion(wrapper) {
  return byText.get(wrapper.find('.quiz-question').text())
}

async function answer(wrapper, right) {
  const question = currentQuestion(wrapper)
  const wanted = question.answers[right ? question.right : (question.right + 1) % 4]
  const button = wrapper.findAll('.quiz-answer').find((each) => each.text() === wanted)
  await button.trigger('click')
  await nextTick()
  await wrapper.find('.quiz-submit').trigger('click')
  await nextTick()
  return question
}

async function next(wrapper) {
  await wrapper.find('.quiz-feedback .btn').trigger('click')
  await nextTick()
}

describe('prophets quiz', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('requires submitting an answer before revealing whether it is right or wrong', async () => {
    const wrapper = await open()
    const submitBtn = wrapper.find('.quiz-submit')

    expect(submitBtn.exists()).toBe(true)
    expect(submitBtn.element.disabled).toBe(true)
    expect(wrapper.find('.quiz-feedback').exists()).toBe(false)

    const answers = wrapper.findAll('.quiz-answer')
    expect(answers).toHaveLength(4)

    await answers[0].trigger('click')
    await nextTick()

    expect(answers[0].classes()).toContain('is-selected')
    expect(answers[0].attributes('aria-checked')).toBe('true')
    expect(answers[0].classes()).not.toContain('is-right')
    expect(answers[0].classes()).not.toContain('is-wrong')
    expect(wrapper.find('.quiz-feedback').exists()).toBe(false)
    expect(submitBtn.element.disabled).toBe(false)

    await answers[1].trigger('click')
    await nextTick()

    expect(answers[0].classes()).not.toContain('is-selected')
    expect(answers[1].classes()).toContain('is-selected')
    expect(wrapper.find('.quiz-feedback').exists()).toBe(false)

    await submitBtn.trigger('click')
    await nextTick()

    expect(wrapper.find('.quiz-feedback').exists()).toBe(true)
    expect(wrapper.find('.quiz-submit').exists()).toBe(false)
    expect(wrapper.findAll('.quiz-answer').every((btn) => btn.element.disabled)).toBe(true)
  })

  it('asks ten different questions, showing the evidence after each, then the score', async () => {
    const wrapper = await open()
    const asked = []
    for (let n = 0; n < 10; n += 1) {
      expect(wrapper.find('.quiz-progress').text()).toBe(`Question ${n + 1} of 10`)
      const question = await answer(wrapper, n < 7)
      asked.push(question.id)
      expect(wrapper.find('.quiz-verdict').text()).toContain(n < 7 ? 'Right.' : 'Not quite.')
      expect(wrapper.find('.quiz-evidence').text()).toContain(question.reference.split(' · ')[0])
      if (question.verse) {
        expect(wrapper.find('.quiz-feedback [lang="ar"]').text()).toBe(question.verse.verseArabic)
        expect(wrapper.find('.quiz-feedback .quran-block').classes()).not.toContain('anim-target')
      }
      await next(wrapper)
    }

    expect(new Set(asked).size).toBe(10)
    expect(wrapper.find('.quiz-result h2').text()).toBe('You scored 7 of 10')
    expect(wrapper.findAll('.quiz-missed li')).toHaveLength(3)
    expect(localStorage.getItem(GAME_KEYS.quizBest)).toBe('7')
  })

  it('shows the right answer when a wrong one is chosen, and locks the answers', async () => {
    const wrapper = await open()
    const question = await answer(wrapper, false)

    expect(wrapper.find('.quiz-verdict').text()).toContain(question.answers[question.right])
    expect(wrapper.findAll('.quiz-answer').every((button) => button.element.disabled)).toBe(true)
  })

  it('continues at the same question after a reload', async () => {
    const first = await open()
    await answer(first, true)
    await next(first)
    await answer(first, true)
    await next(first)
    const third = first.find('.quiz-question').text()
    first.unmount()

    const again = await open()
    expect(again.find('.quiz-progress').text()).toBe('Question 3 of 10')
    expect(again.find('.quiz-question').text()).toBe(third)
  })

  it('gives a second attempt none of the first attempt’s questions', async () => {
    const wrapper = await open()
    const first = []
    for (let n = 0; n < 10; n += 1) {
      first.push((await answer(wrapper, true)).id)
      await next(wrapper)
    }
    await wrapper.find('.quiz-again').trigger('click')
    await nextTick()
    await wrapper.find('.game-intro-start').trigger('click')
    await nextTick()

    const second = []
    for (let n = 0; n < 10; n += 1) {
      second.push((await answer(wrapper, true)).id)
      await next(wrapper)
    }
    expect(second.filter((id) => first.includes(id))).toEqual([])
  })

  it('explains the game and offers the levels before it starts', async () => {
    const wrapper = await open({ start: false })

    expect(wrapper.find('.game-intro h2').text()).toBe('How to play')
    expect(wrapper.findAll('.game-intro-rules li')).toHaveLength(3)
    expect(wrapper.findAll('.game-intro input[type="radio"]')).toHaveLength(3)
    expect(wrapper.find('.quiz-question').exists()).toBe(false)
  })

  it('asks only questions of the chosen level', async () => {
    const wrapper = await open({ start: false })
    await wrapper.find('.game-intro input[value="easy"]').setValue(true)
    await wrapper.find('.game-intro-start').trigger('click')
    await nextTick()

    expect(wrapper.find('.quiz-level').text()).toBe('Easy')
    for (let n = 0; n < 10; n += 1) {
      expect((await answer(wrapper, true)).level).toBe('easy')
      await next(wrapper)
    }
  })

  it('lets the player quit back to the games page, leaving no attempt behind', async () => {
    const wrapper = await open()
    await answer(wrapper, true)

    await wrapper.find('.quiz-quit').trigger('click')
    await vi.dynamicImportSettled()
    await flushPromises()

    expect(wrapper.vm.$router.currentRoute.value.path).toBe('/games')
    expect(localStorage.getItem(GAME_KEYS.quizAttempt)).toBeNull()
  })

  it('shares the score with a link to the quiz', async () => {
    const share = vi.fn(async () => {})
    navigator.share = share
    const wrapper = await open()
    for (let n = 0; n < 10; n += 1) {
      await answer(wrapper, n < 8)
      await next(wrapper)
    }

    await wrapper.find('.share-button').trigger('click')
    await flushPromises()
    delete navigator.share

    expect(share.mock.calls[0][0].text).toBe(
      'I scored 8 of 10 in the Prophets quiz on IslamicHub (Normal). Can you beat it?\n\nhttps://islamichub.xyz/games/quiz?src=whatsapp',
    )
  })
})

<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('games.badge') }}
        </div>
        <h1>{{ $t('games.quiz.name') }}</h1>
        <p>{{ $t('games.quiz.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <p class="quiz-note">{{ $t('games.note') }}</p>

      <GameIntro v-if="!playing" game="quiz" :rule-count="3" @start="begin" />

      <div v-else class="quiz-bar">
        <span class="quiz-level">{{ $t(`games.levels.${attempt?.level ?? 'normal'}`) }}</span>
        <button type="button" class="btn btn-secondary quiz-quit" @click="quit">
          {{ $t('games.quit') }}
        </button>
      </div>

      <section v-if="playing && !finished && current" class="card quiz-card" aria-live="polite">
        <span class="quiz-progress">{{
          $t('games.quiz.progress', { n: attempt.position + 1, total: questions.length })
        }}</span>
        <h2 class="quiz-question">{{ current.question }}</h2>
        <ul class="quiz-answers" role="radiogroup" :aria-label="current.question">
          <li v-for="index in attempt.orders[attempt.position]" :key="index">
            <button
              type="button"
              class="quiz-answer"
              :class="answerClass(index)"
              :disabled="answered"
              role="radio"
              :aria-checked="selected === index"
              @click="choose(index)"
            >
              {{ current.answers[index] }}
            </button>
          </li>
        </ul>

        <div v-if="!answered" class="quiz-submit-bar">
          <button
            type="button"
            class="btn btn-primary quiz-submit"
            :disabled="selected === null"
            @click="submit"
          >
            {{ $t('games.quiz.submit') }}
          </button>
        </div>

        <div v-if="answered" class="quiz-feedback">
          <p class="quiz-verdict" :class="chosenRight ? 'right' : 'wrong'">
            {{ chosenRight ? $t('games.quiz.right') : $t('games.quiz.wrong') }}
            <span v-if="!chosenRight">{{
              $t('games.quiz.rightAnswer', { answer: current.answers[current.right] })
            }}</span>
          </p>
          <QuranBlock
            :animate="false"
            v-if="current.verse"
            :arabic="current.verse.verseArabic"
            :reference="current.verse.reference"
            :translation="current.verse.translation"
          />
          <p class="quiz-evidence">
            {{ $t('games.quiz.evidence') }} <HadithRef :text="current.reference" />
          </p>
          <button type="button" class="btn btn-primary" @click="next">
            {{ isLast ? $t('games.quiz.finish') : $t('games.quiz.next') }}
          </button>
        </div>
      </section>

      <section v-else-if="playing && finished" class="card quiz-card quiz-result">
        <h2 class="quiz-question">{{ $t('games.quiz.score', { score: result }) }}</h2>
        <p>{{ $t('games.quiz.best', { score: store.quizBest }) }}</p>
        <template v-if="missed.length">
          <h3 class="quiz-missed-title">{{ $t('games.quiz.missed') }}</h3>
          <ul class="quiz-missed">
            <li v-for="question in missed" :key="question.id">
              <span class="quiz-missed-question">{{ question.question }}</span>
              <span>{{ question.answers[question.right] }}</span>
              <span class="quiz-evidence"><HadithRef :text="question.reference" /></span>
            </li>
          </ul>
        </template>
        <p v-else>{{ $t('games.quiz.allRight') }}</p>
        <div class="quiz-actions">
          <ShareButton :item="shareable" />
          <button type="button" class="btn btn-primary quiz-again" @click="playing = false">
            {{ $t('games.quiz.again') }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo.js'
import { useGamesStore } from '@/stores/games.js'
import { track } from '@/composables/useStats.js'
import { drawAtLevel, answerOrder, score } from '@/utils/quiz.js'
import bank from '@/data/games/quiz.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import HadithRef from '@/components/HadithRef.vue'
import GameIntro from '@/components/GameIntro.vue'
import ShareButton from '@/components/ShareButton.vue'

useSeo('quiz')

const { t } = useI18n()
const router = useRouter()
const store = useGamesStore()
const byId = new Map(bank.map((question) => [question.id, question]))

function isUsable(attempt) {
  return (
    attempt &&
    attempt.questions.every((id) => byId.has(id)) &&
    Array.isArray(attempt.orders) &&
    attempt.orders.length === attempt.questions.length &&
    Number.isInteger(attempt.position)
  )
}

const playing = ref(isUsable(store.quizAttempt) && !store.quizAttempt.finished)

function begin() {
  const level = store.levelOf('quiz')
  const { questions, seen } = drawAtLevel(bank, level, store.quizSeen)
  store.quizSeen = seen
  store.quizAttempt = {
    questions,
    orders: questions.map((id) => answerOrder(byId.get(id))),
    answers: questions.map(() => null),
    position: 0,
    finished: false,
    level,
  }
  selected.value = null
  playing.value = true
}

function quit() {
  playing.value = false
  selected.value = null
  store.quizAttempt = null
  router.push('/games')
}

const attempt = computed(() => store.quizAttempt)
const questions = computed(() => attempt.value?.questions.map((id) => byId.get(id)) ?? [])
const current = computed(() => questions.value[attempt.value?.position])
const finished = computed(() => attempt.value?.finished === true)
const chosen = computed(() => attempt.value?.answers[attempt.value.position])
const answered = computed(() => chosen.value !== null && chosen.value !== undefined)
const chosenRight = computed(() => chosen.value === current.value?.right)
const isLast = computed(() => attempt.value?.position === questions.value.length - 1)
const result = computed(() => score(questions.value, attempt.value?.answers ?? []))
const missed = computed(() =>
  questions.value.filter((question, index) => attempt.value.answers[index] !== question.right),
)
const shareable = computed(() => ({
  textOnly: true,
  path: '/games/quiz',
  translation: t('games.quiz.share', {
    score: result.value,
    level: t(`games.levels.${attempt.value?.level ?? 'normal'}`),
  }),
}))

const selected = ref(chosen.value ?? null)

watch(
  () => attempt.value?.position,
  () => {
    selected.value = chosen.value ?? null
  },
)

function answerClass(index) {
  if (!answered.value) {
    return selected.value === index ? 'is-selected' : ''
  }
  if (index === current.value.right) {
    return 'is-right'
  }
  return index === chosen.value ? 'is-wrong' : ''
}

function choose(index) {
  if (!answered.value) {
    selected.value = index
  }
}

function submit() {
  if (selected.value !== null && !answered.value) {
    store.quizAttempt.answers[attempt.value.position] = selected.value
  }
}

function next() {
  selected.value = null
  if (!isLast.value) {
    store.quizAttempt.position += 1
    return
  }
  store.quizAttempt.finished = true
  store.recordQuizScore(result.value)
  track('quiz finished')
}
</script>

<style scoped>
.quiz-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.quiz-card {
  margin-top: var(--space-4);
}

.quiz-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.quiz-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--space-3);
}

.quiz-progress,
.quiz-level {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--green);
}

.quiz-question {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin: var(--space-2) 0 var(--space-4);
}

.quiz-answers {
  display: grid;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.quiz-answer {
  width: 100%;
  min-height: 48px;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--cream);
  color: var(--ink);
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background-color 0.15s;
}

.quiz-answer:hover:not(:disabled) {
  border-color: var(--green);
}

.quiz-answer:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 2px;
}

.quiz-answer:disabled {
  cursor: default;
}

.quiz-answer.is-selected {
  border-color: var(--green);
  background: var(--cream-dark);
  font-weight: 600;
}

.quiz-answer.is-right {
  border-color: var(--green);
  background: var(--green-light);
  font-weight: 600;
}

.quiz-answer.is-wrong {
  border-color: var(--red);
  color: var(--red);
}

.quiz-submit-bar {
  margin-top: var(--space-4);
}

.quiz-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quiz-feedback {
  margin-top: var(--space-5);
}

.quiz-verdict {
  font-weight: 600;
}

.quiz-verdict.right {
  color: var(--green);
}

.quiz-verdict.wrong {
  color: var(--red);
}

.quiz-verdict span {
  display: block;
  font-weight: 400;
  color: var(--ink);
}

.quiz-evidence {
  margin: var(--space-3) 0 var(--space-4);
  font-size: 13px;
  color: var(--muted);
}

.quiz-missed-title {
  font-family: var(--serif);
  font-size: 1.2rem;
  margin: var(--space-5) 0 var(--space-3);
}

.quiz-missed {
  display: grid;
  gap: var(--space-3);
  padding-inline-start: var(--space-5);
  margin-bottom: var(--space-5);
}

.quiz-missed li {
  display: flex;
  flex-direction: column;
}

.quiz-missed-question {
  font-weight: 600;
}
</style>

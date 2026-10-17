<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('games.badge') }}
        </div>
        <h1>{{ $t('games.kalimah.name') }}</h1>
        <p>{{ $t('games.kalimah.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <p class="kalimah-note">{{ $t('games.note') }}</p>

      <GameIntro v-if="!playing" game="kalimah" :rule-count="3" @start="begin">
        <fieldset class="kalimah-modes">
          <legend>{{ $t('games.kalimah.modeLabel') }}</legend>
          <label v-for="option in MODES" :key="option" class="game-intro-option">
            <input v-model="store.kalimahMode" type="radio" name="kalimah-mode" :value="option" />
            {{ $t(`games.kalimah.modes.${option}`) }}
          </label>
        </fieldset>
      </GameIntro>

      <div v-else class="kalimah-bar">
        <span class="kalimah-level"
          >{{ $t(`games.kalimah.modes.${store.kalimahMode}`) }} ·
          {{ $t(`games.levels.${level}`) }}</span
        >
        <RouterLink to="/games" class="btn btn-secondary kalimah-quit">{{
          $t('games.quit')
        }}</RouterLink>
      </div>

      <section v-if="playing" class="card kalimah-card">
        <p class="kalimah-hint">{{ $t('games.kalimah.letters', { n: length }) }}</p>
        <p v-if="level === 'easy' && !over" class="kalimah-hint kalimah-meaning">
          {{ $t('games.kalimah.hint', { meaning: word.meaning }) }}
        </p>

        <div
          class="kalimah-grid"
          :class="{ arabic: isArabic }"
          :style="{ '--letters': length }"
          :dir="isArabic ? 'rtl' : 'ltr'"
          :lang="isArabic ? 'ar' : undefined"
        >
          <div
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="kalimah-row"
            :style="{ gridTemplateColumns: `repeat(${length}, 1fr)` }"
            role="group"
            :aria-label="$t('games.kalimah.try', { n: rowIndex + 1 })"
          >
            <span
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="kalimah-cell"
              :class="cell.mark"
              :aria-label="
                cell.mark
                  ? `${cell.letter}: ${$t(`games.kalimah.marks.${cell.mark}`)}`
                  : cell.letter || undefined
              "
              >{{ cell.letter }}</span
            >
          </div>
        </div>

        <p class="kalimah-message" aria-live="polite">{{ message }}</p>

        <div v-if="!over" class="kalimah-keyboard" :aria-label="$t('games.kalimah.keyboard')">
          <div v-for="(keys, rowIndex) in keyRows" :key="rowIndex" class="kalimah-keys">
            <button
              v-if="rowIndex === keyRows.length - 1"
              type="button"
              class="kalimah-key wide"
              @click="submit"
            >
              {{ $t('games.kalimah.enter') }}
            </button>
            <button
              v-for="key in keys"
              :key="key"
              type="button"
              class="kalimah-key"
              :class="[used[key], { arabic: isArabic }]"
              :lang="isArabic ? 'ar' : undefined"
              @click="type(key)"
            >
              {{ key }}
            </button>
            <button
              v-if="rowIndex === keyRows.length - 1"
              type="button"
              class="kalimah-key wide"
              @click="erase"
            >
              {{ $t('games.kalimah.delete') }}
            </button>
          </div>
        </div>

        <div v-else class="kalimah-end">
          <p class="kalimah-word" lang="ar" dir="rtl">{{ word.arabic }}</p>
          <p class="kalimah-reading">
            <em>{{ word.transliteration }}</em> — {{ word.meaning }}
          </p>
          <p>{{ $t('games.kalimah.verse') }}</p>
          <QuranBlock
            :arabic="word.verseArabic"
            :reference="word.reference"
            :translation="word.translation"
          />
          <ShareButton :item="shareable" />
          <p class="kalimah-hint">{{ $t('games.kalimah.tomorrow') }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo.js'
import { useGamesStore } from '@/stores/games.js'
import { track } from '@/composables/useStats.js'
import { dayKey } from '@/utils/day.js'
import {
  TRIES,
  MODES,
  ARABIC_KEYS,
  LATIN_KEYS,
  wordFor,
  answerFor,
  lettersOf,
  isKey,
  isComplete,
  mark,
  isWon,
  isOver,
  keyMarks,
  shareGrid,
} from '@/utils/kalimah.js'
import words from '@/data/games/kalimah.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import ShareButton from '@/components/ShareButton.vue'
import GameIntro from '@/components/GameIntro.vue'

useSeo('kalimah')

const { t } = useI18n()
const store = useGamesStore()
const today = dayKey()
const word = wordFor(today, words)

if (store.kalimahGame?.day !== today) {
  store.kalimahGame = { day: today, guesses: [], won: false, counted: false }
}

const game = computed(() => store.kalimahGame)
const isArabic = computed(() => store.kalimahMode === 'arabic')
const answer = computed(() => answerFor(word, store.kalimahMode))
const length = computed(() => lettersOf(answer.value).length)
const keyRows = computed(() => (isArabic.value ? ARABIC_KEYS : LATIN_KEYS))
const over = computed(() => isOver(game.value.guesses, answer.value))
const playing = ref(game.value.guesses.length > 0)
const level = ref(store.levelOf('kalimah'))
const used = computed(() =>
  level.value === 'hard' ? {} : keyMarks(game.value.guesses, answer.value),
)
const current = ref('')
const notice = ref('')

const rows = computed(() =>
  Array.from({ length: TRIES }, (_, index) => {
    const guess = game.value.guesses[index]
    const letters = lettersOf(guess ?? (index === game.value.guesses.length ? current.value : ''))
    const marks = guess ? mark(guess, answer.value) : []
    return Array.from({ length: length.value }, (_, place) => ({
      letter: letters[place] ?? '',
      mark: marks[place],
    }))
  }),
)

const message = computed(() => {
  if (game.value.won) {
    return t('games.kalimah.won', { n: game.value.guesses.length, total: TRIES })
  }
  if (over.value) {
    return t('games.kalimah.lost')
  }
  return notice.value
})

const shareable = computed(() => ({
  textOnly: true,
  path: '/games/kalimah',
  translation: [
    t('games.kalimah.shareTitle', {
      day: today,
      result: game.value.won ? game.value.guesses.length : 'X',
      total: TRIES,
      mode: t(`games.kalimah.modes.${store.kalimahMode}`),
      level: t(`games.levels.${level.value}`),
    }),
    shareGrid(game.value.guesses, answer.value),
    t('games.kalimah.invite'),
  ].join('\n\n'),
}))

function begin() {
  level.value = store.levelOf('kalimah')
  playing.value = true
}

function type(letter) {
  notice.value = ''
  if (!over.value && lettersOf(current.value).length < length.value) {
    current.value += letter
  }
}

function erase() {
  current.value = lettersOf(current.value).slice(0, -1).join('')
}

function submit() {
  if (over.value) {
    return
  }
  if (!isComplete(current.value, answer.value)) {
    notice.value = t('games.kalimah.tooShort', { n: length.value })
    return
  }
  store.kalimahGame.guesses.push(current.value)
  current.value = ''
  if (isOver(game.value.guesses, answer.value)) {
    store.kalimahGame.won = isWon(game.value.guesses, answer.value)
    if (!store.kalimahGame.counted) {
      store.kalimahGame.counted = true
      track('kalimah finished')
    }
  }
}

function onKey(event) {
  if (
    !playing.value ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.target.closest?.('input, a')
  ) {
    return
  }
  if (event.key === 'Enter') {
    submit()
  } else if (event.key === 'Backspace') {
    erase()
  } else if (isKey(event.key.toLowerCase(), store.kalimahMode)) {
    type(event.key.toLowerCase())
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.kalimah-note,
.kalimah-hint {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.kalimah-card {
  margin-top: var(--space-4);
}

.kalimah-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.kalimah-level {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--green);
}

.kalimah-meaning {
  color: var(--ink);
  font-weight: 600;
}

.kalimah-modes {
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--space-4);
}

.kalimah-grid {
  display: grid;
  gap: var(--space-2);
  max-width: calc(var(--letters) * 60px);
  margin: var(--space-4) auto;
}

.kalimah-row {
  display: grid;
  gap: var(--space-2);
}

.kalimah-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: clamp(1.1rem, 4vw, 1.6rem);
  font-weight: 600;
  text-transform: uppercase;
}

.kalimah-grid.arabic .kalimah-cell,
.kalimah-key.arabic {
  font-family: var(--arabic);
  text-transform: none;
}

.right {
  background: var(--green);
  border-color: var(--green);
  color: var(--cream);
}

.present {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--ink);
}

.absent {
  background: var(--muted);
  border-color: var(--muted);
  color: var(--cream);
}

.kalimah-message {
  min-height: 1.6em;
  text-align: center;
  font-weight: 600;
}

.kalimah-keyboard {
  display: grid;
  gap: var(--space-2);
}

.kalimah-keys {
  display: flex;
  justify-content: center;
  gap: var(--space-1);
}

.kalimah-key {
  flex: 1 1 0;
  max-width: 44px;
  min-height: 48px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--cream);
  color: var(--ink);
  font: inherit;
  font-size: 1.05rem;
  cursor: pointer;
}

.kalimah-key.right {
  background: var(--green);
  border-color: var(--green);
  color: var(--cream);
}

.kalimah-key.present {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--ink);
}

.kalimah-key.absent {
  background: var(--muted);
  border-color: var(--muted);
  color: var(--cream);
}

.kalimah-key.wide {
  flex-grow: 1.6;
  max-width: 72px;
  font-size: 12px;
  font-weight: 600;
}

.kalimah-end {
  margin-top: var(--space-4);
}

.kalimah-word {
  font-family: var(--arabic);
  font-size: 2.6rem;
  text-align: center;
  margin: 0;
}

.kalimah-reading {
  text-align: center;
  font-size: 1.1rem;
}
</style>

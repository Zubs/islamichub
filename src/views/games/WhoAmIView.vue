<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('games.badge') }}
        </div>
        <h1>{{ $t('games.whoAmI.name') }}</h1>
        <p>{{ $t('games.whoAmI.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <p class="who-note">{{ $t('games.note') }}</p>

      <GameIntro v-if="!run" game="whoAmI" :rule-count="3" @start="start" />

      <div v-else class="who-bar">
        <span class="who-level">{{
          $t('games.whoAmI.status', {
            level: $t(`games.levels.${level}`),
            n: played.length + (round.done ? 0 : 1),
            points: total,
          })
        }}</span>
        <RouterLink to="/games" class="btn btn-secondary who-quit">{{
          $t('games.quit')
        }}</RouterLink>
      </div>

      <section v-if="run" class="card who-card" aria-live="polite">
        <h2 class="who-heading">
          {{
            round.done
              ? round.won
                ? $t('games.whoAmI.won', { name: prophetName })
                : $t('games.whoAmI.lost', { name: prophetName })
              : $t('games.whoAmI.question')
          }}
        </h2>
        <p v-if="round.done && round.won" class="who-score">
          {{ $t('games.whoAmI.score', { score }) }}
        </p>

        <ol class="who-clues">
          <li v-for="clue in visibleClues" :key="clue.id" class="who-clue">
            <span>{{ clue.text }}</span>
            <span v-if="round.done" class="who-ref"><HadithRef :text="clue.reference" /></span>
          </li>
        </ol>

        <template v-if="!round.done">
          <div class="who-actions">
            <button
              type="button"
              class="btn btn-secondary"
              :disabled="round.shown >= clues.length"
              @click="round = revealClue(round, clues.length)"
            >
              {{ $t('games.whoAmI.nextClue', { n: round.shown, total: clues.length }) }}
            </button>
            <button type="button" class="btn btn-secondary" @click="finish(giveUp(round))">
              {{ $t('games.whoAmI.giveUp') }}
            </button>
          </div>
          <p class="who-guess-label">
            {{ $t('games.whoAmI.guess') }}
            <span class="who-left">{{ $t('games.whoAmI.guessesLeft', guessesLeft(round)) }}</span>
          </p>
          <ul class="who-names">
            <li v-for="prophet in PROPHETS" :key="prophet.slug">
              <button
                type="button"
                class="who-name"
                :class="{ wrong: round.wrong.includes(prophet.slug) }"
                :disabled="round.wrong.includes(prophet.slug)"
                @click="choose(prophet.slug)"
              >
                {{ prophet.name }}
              </button>
            </li>
          </ul>
        </template>

        <div v-else class="who-actions">
          <RouterLink :to="`/prophets/${round.prophet}`" class="btn btn-secondary">{{
            $t('games.whoAmI.readStory', { name: prophetName })
          }}</RouterLink>
          <button
            v-if="!run.over"
            type="button"
            class="btn btn-primary who-next"
            @click="nextRound"
          >
            {{ $t('games.whoAmI.next') }}
          </button>
        </div>
      </section>

      <section v-if="run?.over" class="card who-card who-result">
        <h2 class="who-heading">{{ $t('games.whoAmI.correct', run.correct) }}</h2>
        <p class="who-score">
          {{
            $t(
              'games.whoAmI.total',
              { points: run.points, rounds: run.played.length },
              run.played.length,
            )
          }}
        </p>
        <p v-if="store.whoAmIToday" class="who-today">
          {{
            $t(
              'games.whoAmI.today',
              { points: store.whoAmIToday.points, rounds: store.whoAmIToday.rounds },
              store.whoAmIToday.rounds,
            )
          }}
        </p>
        <div class="who-actions">
          <ShareButton :item="shareable" />
          <button type="button" class="btn btn-primary who-again" @click="run = null">
            {{ $t('games.whoAmI.again') }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo.js'
import { dayKey } from '@/utils/day.js'
import { useGamesStore } from '@/stores/games.js'
import { track } from '@/composables/useStats.js'
import { PROPHETS, getProphet } from '@/data/prophets.js'
import allClues from '@/data/games/whoAmI.js'
import {
  GUESSES,
  chooseProphet,
  cluesInOrder,
  startRound,
  revealClue,
  guess,
  guessesLeft,
  giveUp,
  roundScore,
  startRun,
  addRound,
} from '@/utils/whoAmI.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import GameIntro from '@/components/GameIntro.vue'
import ShareButton from '@/components/ShareButton.vue'

useSeo('who-am-i')

const { t } = useI18n()
const store = useGamesStore()
const slugs = PROPHETS.map((prophet) => prophet.slug)
const run = ref(null)
const round = ref(null)
const level = ref(store.levelOf('whoAmI'))

const clues = computed(() => cluesInOrder(allClues[round.value.prophet], level.value))
const visibleClues = computed(() =>
  round.value.done ? clues.value : clues.value.slice(0, round.value.shown),
)
const prophetName = computed(() => getProphet(round.value.prophet).name)
const score = computed(() => roundScore(round.value))
const played = computed(() => run.value.played)
const total = computed(() => run.value.points)

function finish(ended) {
  round.value = ended
  run.value = addRound(run.value, ended)
  if (run.value.over) {
    store.recordWhoAmIRun(run.value, dayKey())
    track('who am i finished')
  }
}

function choose(slug) {
  const next = guess(round.value, slug)
  if (next.done) {
    finish(next)
  } else {
    round.value = next
  }
}

const shareable = computed(() => ({
  textOnly: true,
  path: '/games/who-am-i',
  translation: t(
    'games.whoAmI.share',
    { n: run.value.correct, points: run.value.points, level: t(`games.levels.${level.value}`) },
    run.value.correct,
  ),
}))

function nextRound() {
  round.value = startRound(chooseProphet(slugs, run.value.played), GUESSES[level.value])
}

function start() {
  level.value = store.levelOf('whoAmI')
  run.value = startRun()
  nextRound()
}
</script>

<style scoped>
.who-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.who-card {
  margin-top: var(--space-4);
}

.who-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.who-level {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--green);
}

.who-today {
  color: var(--muted);
}

.who-left {
  display: block;
  font-weight: 400;
  font-size: 13px;
  color: var(--muted);
}

.who-heading {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin-bottom: var(--space-3);
}

.who-score {
  font-weight: 600;
  color: var(--green);
}

.who-clues {
  display: grid;
  gap: var(--space-3);
  padding-inline-start: var(--space-5);
  margin: var(--space-4) 0;
  line-height: 1.6;
}

.who-clue {
  display: flex;
  flex-direction: column;
}

.who-ref {
  font-size: 12px;
  font-weight: 600;
  color: var(--gold-dark);
}

.who-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.who-guess-label {
  margin: var(--space-5) 0 var(--space-2);
  font-weight: 600;
}

.who-names {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.who-name {
  width: 100%;
  min-height: 44px;
  padding: var(--space-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--cream);
  color: var(--ink);
  font: inherit;
  cursor: pointer;
}

.who-name:hover:not(:disabled) {
  border-color: var(--green);
}

.who-name.wrong {
  color: var(--muted);
  text-decoration: line-through;
  cursor: default;
}
</style>

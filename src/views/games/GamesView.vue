<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('games.badge') }}
        </div>
        <h1>{{ $t('games.title') }}</h1>
        <p>{{ $t('games.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <p class="games-note">{{ $t('games.note') }}</p>
      <ul class="games-list">
        <li v-for="game in games" :key="game.key">
          <RouterLink :to="game.to" class="card games-card">
            <span class="games-icon" aria-hidden="true">{{ game.icon }}</span>
            <span class="games-body">
              <span class="games-name">{{ $t(`games.${game.key}.name`) }}</span>
              <span class="games-text">{{ $t(`games.${game.key}.text`) }}</span>
              <span class="games-result">{{ game.result }}</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useGamesStore } from '@/stores/games.js'
import { dayKey } from '@/utils/day.js'
import { t } from '@/i18n.js'
import GeoPattern from '@/components/GeoPattern.vue'

useSeo('games')

const store = useGamesStore()

function kalimahResult() {
  const game = store.kalimahGame
  if (!game || game.day !== dayKey()) {
    return t('games.kalimah.notPlayed')
  }
  return game.won ? t('games.kalimah.solved', game.guesses.length) : t('games.kalimah.played')
}

function whoAmIResult() {
  const today = store.whoAmIToday
  if (today?.day === dayKey()) {
    return t('games.whoAmI.today', { points: today.points, rounds: today.rounds }, today.rounds)
  }
  return store.whoAmIBest === null
    ? t('games.noResult')
    : t('games.whoAmI.best', { score: store.whoAmIBest })
}

const games = computed(() => [
  {
    key: 'quiz',
    to: '/games/quiz',
    icon: '📜',
    result:
      store.quizBest === null
        ? t('games.noResult')
        : t('games.quiz.best', { score: store.quizBest }),
  },
  {
    key: 'whoAmI',
    to: '/games/who-am-i',
    icon: '❔',
    result: whoAmIResult(),
  },
  { key: 'kalimah', to: '/games/kalimah', icon: '🔤', result: kalimahResult() },
])
</script>

<style scoped>
.games-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.games-list {
  display: grid;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;
}

.games-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  color: var(--ink);
  text-decoration: none;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.games-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.games-icon {
  font-size: 2rem;
  line-height: 1;
}

.games-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.games-name {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 600;
}

.games-text {
  font-size: 14.5px;
  line-height: 1.6;
}

.games-result {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--green);
}
</style>

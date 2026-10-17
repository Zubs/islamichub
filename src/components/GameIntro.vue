<template>
  <section class="card game-intro">
    <h2 class="game-intro-title">{{ $t('games.howToPlay') }}</h2>
    <ul class="game-intro-rules">
      <li v-for="n in ruleCount" :key="n">{{ $t(`games.${game}.rules.r${n}`) }}</li>
    </ul>
    <slot />
    <fieldset class="game-intro-choice">
      <legend>{{ $t('games.level') }}</legend>
      <label v-for="level in LEVELS" :key="level" class="game-intro-option">
        <input
          type="radio"
          :name="`${game}-level`"
          :value="level"
          :checked="store.levelOf(game) === level"
          @change="store.chooseLevel(game, level)"
        />
        <span
          ><strong>{{ $t(`games.levels.${level}`) }}</strong> —
          {{ $t(`games.${game}.levels.${level}`) }}</span
        >
      </label>
    </fieldset>
    <button type="button" class="btn btn-primary game-intro-start" @click="$emit('start')">
      {{ $t('games.start') }}
    </button>
  </section>
</template>

<script setup>
import { useGamesStore, LEVELS } from '@/stores/games.js'

defineProps({
  game: { type: String, required: true },
  ruleCount: { type: Number, required: true },
})
defineEmits(['start'])

const store = useGamesStore()
</script>

<style scoped>
.game-intro {
  margin-top: var(--space-6);
}

.game-intro-title {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin: 0 0 var(--space-3);
}

.game-intro-rules {
  display: grid;
  gap: var(--space-2);
  padding-inline-start: var(--space-5);
  margin: 0 0 var(--space-5);
  line-height: 1.6;
}

.game-intro :deep(fieldset) {
  border: 0;
  padding: 0;
  margin: 0 0 var(--space-5);
}

.game-intro :deep(legend) {
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.game-intro :deep(.game-intro-option) {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) 0;
  line-height: 1.5;
}

.game-intro :deep(.game-intro-option input) {
  margin-top: 5px;
}
</style>

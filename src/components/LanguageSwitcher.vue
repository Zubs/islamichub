<template>
  <label v-if="availableLocales.length > 1" class="language-switcher">
    <span class="language-label">{{ $t('common.language') }}</span>
    <select
      class="language-select"
      :value="currentLocale.code"
      @change="choose($event.target.value)"
    >
      <option
        v-for="locale in availableLocales"
        :key="locale.code"
        :value="locale.code"
        :lang="locale.code"
      >
        {{ locale.name }}
      </option>
    </select>
  </label>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { availableLocales, currentLocale } from '@/i18n.js'
import { switchLocale } from '@/router/index.js'

const router = useRouter()

function choose(code) {
  switchLocale(router, code)
}
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
}

.language-label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.language-select {
  min-height: 36px;
  padding: var(--space-1) var(--space-2);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: 13px;
  color: inherit;
}
</style>

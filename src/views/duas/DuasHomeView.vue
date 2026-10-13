<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('duasHome.dailyWorship') }} <span lang="ar">الدعاء</span>
        </div>
        <h1>{{ $t('duasHome.duas') }}</h1>
        <p>
          {{ $t('duasHome.supplicationsFromTheQurAnAnd') }}
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <div class="duas-search">
        <label for="dua-search">{{ $t('duasHome.searchDuas') }}</label>
        <div class="duas-search-row">
          <input
            id="dua-search"
            v-model="query"
            type="search"
            class="input-field"
            :placeholder="$t('duasHome.tryTravelRainOrBismillah')"
            autocomplete="off"
          />
          <button v-if="query" class="btn btn-secondary" @click="query = ''">
            {{ $t('duasHome.clear') }}
          </button>
        </div>
      </div>

      <template v-if="query.trim()">
        <p class="duas-result-count" role="status">
          {{ $t('duasHome.found', results.length) }}
        </p>
        <div v-if="results.length" class="duas-results">
          <RouterLink v-for="dua in results" :key="dua.id" :to="duaPath(dua)" class="duas-result">
            <span class="duas-result-title">{{ dua.title }}</span>
            <span class="duas-result-text">{{ dua.translation }}</span>
            <span class="duas-result-ref">{{ dua.reference }}</span>
          </RouterLink>
        </div>
        <div v-else class="duas-empty">
          <p>{{ $t('duasHome.noDuasFoundFor', { a: query }) }}</p>
          <button class="btn btn-primary" @click="query = ''">
            {{ $t('duasHome.clearSearch') }}
          </button>
        </div>
      </template>

      <div v-else class="duas-grid">
        <RouterLink
          v-for="situation in situations"
          :key="situation.slug"
          :to="'/duas/' + situation.slug"
          class="duas-card"
        >
          <div class="duas-card-icon" aria-hidden="true">{{ situation.icon }}</div>
          <h2 class="duas-card-name">{{ situation.name }}</h2>
          <p class="duas-card-desc">{{ situation.description }}</p>
          <span class="duas-card-count">
            {{ $t('duasHome.count', situation.count) }}
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { DUAS, DUA_SITUATIONS } from '@/data/duas.js'
import { searchDuas, situationsWithDuas, duaPath } from '@/utils/duas.js'
import { useDataTranslations } from '@/composables/useContent.js'

const props = defineProps({
  duas: { type: Array, default: () => DUAS },
  allSituations: { type: Array, default: () => DUA_SITUATIONS },
})

useSeo('duas')

const query = ref('')
const duaText = useDataTranslations('duas')
const situationText = useDataTranslations('duaSituations')
const shownDuas = computed(() => props.duas.map(duaText.localized))
const shownSituations = computed(() => props.allSituations.map(situationText.localized))
const situations = computed(() => situationsWithDuas(shownSituations.value, shownDuas.value))
const results = computed(() => searchDuas(query.value, shownDuas.value, shownSituations.value))
</script>

<style scoped>
.duas-search {
  margin: var(--space-6) 0;
}

.duas-search label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: var(--space-2);
}

.duas-search-row {
  display: flex;
  gap: var(--space-2);
}

.duas-search-row .input-field {
  flex: 1;
  min-width: 0;
}

.duas-result-count {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: var(--space-3);
}

.duas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.duas-card,
.duas-result {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.duas-card:hover,
.duas-result:hover {
  border-color: var(--gold);
  box-shadow: var(--shadow);
}

.duas-card-icon {
  font-size: 1.6rem;
}

.duas-card-name,
.duas-result-title {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
}

.duas-card-desc,
.duas-result-text {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.55;
}

.duas-card-count,
.duas-result-ref {
  margin-top: var(--space-2);
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
}

.duas-results {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.duas-empty {
  display: grid;
  gap: var(--space-3);
  justify-items: start;
  color: var(--muted);
  margin-bottom: var(--space-8);
}
</style>

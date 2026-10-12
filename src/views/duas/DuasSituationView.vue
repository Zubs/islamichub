<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('duasSituation.duas') }}
        </div>
        <h1>{{ situation?.name }}</h1>
        <p>{{ situation?.description }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <nav class="duas-breadcrumb" :aria-label="$t('duasSituation.breadcrumb')">
        <RouterLink to="/duas" class="duas-breadcrumb-link">{{
          $t('duasSituation.allDuas')
        }}</RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ situation?.name }}</span>
      </nav>

      <div class="duas-list">
        <AdhkarCard
          v-for="dua in duas"
          :id="dua.id"
          :key="dua.id"
          :dhikr="{ ...dua, id: 'dua:' + dua.id }"
          :counter="dua.repeat > 1"
          :share-path="`/duas/${slug}#${dua.id}`"
        />
      </div>

      <nav class="duas-nav" :aria-label="$t('duasSituation.situations')">
        <RouterLink v-if="previous" :to="'/duas/' + previous.slug" class="btn btn-secondary">
          ← {{ previous.name }}
        </RouterLink>
        <RouterLink to="/duas" class="btn btn-secondary duas-nav-middle">{{
          $t('duasSituation.allSituations')
        }}</RouterLink>
        <RouterLink v-if="next" :to="'/duas/' + next.slug" class="btn btn-secondary">
          {{ next.name }} →
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import GeoPattern from '@/components/GeoPattern.vue'
import AdhkarCard from '@/components/adhkar/AdhkarCard.vue'
import { DUAS, DUA_SITUATIONS, getDuasBySituation, getSituation } from '@/data/duas.js'
import { situationsWithDuas } from '@/utils/duas.js'
import { useDataTranslations } from '@/composables/useContent.js'

const route = useRoute()
const slug = computed(() => route.params.situationSlug)
const duaText = useDataTranslations('duas')
const situationText = useDataTranslations('duaSituations')
const situation = computed(() => {
  const found = getSituation(slug.value)
  return found ? situationText.localized(found) : null
})
const duas = computed(() => getDuasBySituation(slug.value).map(duaText.localized))

const listed = situationsWithDuas(DUA_SITUATIONS, DUAS)
const position = computed(() => listed.findIndex((entry) => entry.slug === slug.value))
const previous = computed(() => listed[position.value - 1] ?? null)
const next = computed(() => (position.value >= 0 ? (listed[position.value + 1] ?? null) : null))

useSeo({
  title: () => `Duas for ${situation.value?.name ?? 'Everyday Situations'} | IslamicHub`,
  description: () =>
    `${duas.value.length} supplications for ${(situation.value?.name ?? '').toLowerCase()}: ${(situation.value?.description ?? '').toLowerCase()}. Arabic, transliteration, translation and source.`,
})
</script>

<style scoped>
.duas-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--muted);
  margin: var(--space-6) 0;
}

.duas-breadcrumb-link {
  color: var(--gold);
  text-decoration: none;
  font-weight: 500;
}

.duas-list {
  display: grid;
  gap: var(--space-4);
}

.duas-list > * {
  scroll-margin-top: calc(var(--nav-height) + var(--space-4));
}

.duas-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin: var(--space-8) 0 var(--space-10);
}

.duas-nav-middle {
  margin-inline: auto;
}
</style>

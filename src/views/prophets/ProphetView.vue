<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('prophets.badge') }} ·
          <span lang="ar">{{ prophet.arabic }} {{ honorific }}</span>
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <nav class="prophet-breadcrumb" :aria-label="$t('prophets.breadcrumb')">
        <RouterLink to="/prophets">{{ $t('prophets.all') }}</RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ prophet.name }}</span>
      </nav>

      <p class="prophet-sources">{{ $t('prophets.sources') }}</p>

      <ContentSections :sections="story.sections" :c="c" :untranslated="untranslated" />

      <JourneyMap
        v-if="stops.length"
        :stops="stops"
        :joined="story.journey === true"
        :title="c('places.title') || $t('prophets.placesTitle')"
        :intro="c('places.intro')"
      />
      <section v-else class="prophet-places-unknown" aria-labelledby="places-title">
        <h2 id="places-title" class="section-title">{{ $t('prophets.placesTitle') }}</h2>
        <p class="prose">{{ $t('prophets.placesUnknown') }}</p>
      </section>

      <nav class="prophet-nav" :aria-label="$t('prophets.stories')">
        <RouterLink
          v-if="neighbours.previous"
          :to="'/prophets/' + neighbours.previous.slug"
          class="btn btn-secondary"
          rel="prev"
          >{{ $t('prophets.previous', { name: neighbours.previous.name }) }}</RouterLink
        >
        <RouterLink to="/prophets" class="btn btn-secondary prophet-nav-middle">{{
          $t('prophets.allProphets')
        }}</RouterLink>
        <RouterLink
          v-if="neighbours.next"
          :to="'/prophets/' + neighbours.next.slug"
          class="btn btn-secondary"
          rel="next"
          >{{ $t('prophets.next', { name: neighbours.next.name }) }}</RouterLink
        >
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useContent, useDataTranslations } from '@/composables/useContent.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ContentSections from '@/components/ContentSections.vue'
import JourneyMap from '@/components/JourneyMap.vue'
import { PROPHETS, getProphet } from '@/data/prophets.js'
import { PROPHET_STORIES } from '@/data/prophetStories.js'
import { storyNeighbours } from '@/utils/prophets.js'
import { t } from '@/i18n.js'

const slug = useRoute().params.slug
const honorific = computed(() => (slug === 'muhammad' ? 'ﷺ' : 'عليه السلام'))
const story = PROPHET_STORIES[slug]
const { c, untranslated } = useContent(slug, story.content)
const { localized } = useDataTranslations('prophets')

const stops = computed(() =>
  (story.places ?? []).map((stop) => ({
    ...stop,
    name: c(`places.${stop.id}Name`),
    text: c(`places.${stop.id}Text`),
  })),
)
const prophet = computed(() => localized(getProphet(slug)))
const neighbours = computed(() => {
  const { previous, next } = storyNeighbours(slug, PROPHETS)
  return { previous: previous && localized(previous), next: next && localized(next) }
})

useSeo({
  title: () => t('prophets.storyTitle', { name: prophet.value.name }),
  description: () => c('header.description'),
})
useScrollReveal()
</script>

<style scoped>
.prophet-places-unknown {
  margin-top: var(--space-10);
}

.prophet-places-unknown h2 {
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  margin-bottom: var(--space-3);
}

.prophet-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--muted);
  margin: var(--space-6) 0 var(--space-3);
}

.prophet-breadcrumb a {
  color: var(--gold);
  text-decoration: none;
  font-weight: 500;
}

.prophet-sources {
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}

.prophet-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  margin-top: var(--space-10);
}

.prophet-nav-middle {
  margin-inline: auto;
}
</style>

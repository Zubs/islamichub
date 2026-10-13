<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.badge') }} · <span lang="ar">العيدان</span>
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <div class="card eid-countdown" role="status">
        <template v-if="next.days === 0">
          <div class="eid-greeting">{{ $t('eid.greeting.' + next.eid) }}</div>
          <div class="eid-date">{{ dateText }}</div>
        </template>
        <template v-else>
          <div class="eid-label">{{ $t('eid.next.' + next.eid) }}</div>
          <div class="eid-days">{{ $t('common.days', next.days) }}</div>
          <div class="eid-date">{{ $t('eid.expected', { date: dateText }) }}</div>
        </template>
        <p class="eid-note">{{ c('header.moonNote') }}</p>
      </div>

      <ContentSections :sections="sections" :c="c" :untranslated="untranslated">
        <template #zakatAlFitr>
          <div class="eid-links">
            <RouterLink to="/zakat" class="btn btn-primary">{{
              c('zakatAlFitr.linkZakat')
            }}</RouterLink>
            <RouterLink to="/fasting" class="btn btn-secondary">{{
              c('zakatAlFitr.linkFasting')
            }}</RouterLink>
            <RouterLink to="/qurbani" class="btn btn-secondary">{{
              c('zakatAlFitr.linkQurbani')
            }}</RouterLink>
          </div>
        </template>
      </ContentSections>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useContent } from '@/composables/useContent.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ContentSections from '@/components/ContentSections.vue'
import sections from '@/data/eidSections.js'
import content from '@/data/content/eid/en.js'
import { nextEid } from '@/utils/eid.js'
import { formatDate } from '@/i18n.js'

const { c, untranslated } = useContent('eid', content)

useSeo('eid')
useScrollReveal()

const next = nextEid()
const dateText = computed(() => {
  const [year, month, day] = next.date.split('-').map(Number)
  return formatDate(new Date(year, month - 1, day), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})
</script>

<style scoped>
.eid-countdown {
  margin-top: var(--space-6);
  text-align: center;
}

.eid-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--green);
}

.eid-days,
.eid-greeting {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 600;
  color: var(--green);
}

.eid-date {
  color: var(--ink);
}

.eid-note {
  margin-top: var(--space-3);
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted);
}

.eid-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}
</style>

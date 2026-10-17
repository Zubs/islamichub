<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.badge') }}
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <ContentSections :sections="sections" :c="c" :untranslated="untranslated">
        <template #list>
          <ul class="pillar-list">
            <li v-for="pillar in pillars" :key="pillar.to">
              <RouterLink :to="pillar.to" class="card pillar-row" :class="pillar.cardClass">
                <span class="pillar-row-num" lang="ar" aria-hidden="true">{{ pillar.num }}</span>
                <span class="pillar-row-icon" aria-hidden="true">{{ pillar.icon }}</span>
                <span class="pillar-row-body">
                  <span class="pillar-row-name">
                    {{ pillar.name }}
                    <span class="pillar-row-arabic" lang="ar" dir="rtl">{{ pillar.arabic }}</span>
                  </span>
                  <span class="pillar-row-meaning">{{ pillar.meaning }}</span>
                  <span class="pillar-row-text">{{ pillar.text }}</span>
                  <span class="pillar-row-ref">{{ pillar.reference }}</span>
                </span>
                <span class="pillar-row-open">{{ c('list.open') }} →</span>
              </RouterLink>
            </li>
          </ul>
        </template>
        <template #related>
          <ul class="related-grid">
            <li v-for="guide in related" :key="guide.to">
              <RouterLink :to="guide.to" class="tool-card">
                <span class="tc-icon" aria-hidden="true">{{ guide.icon }}</span>
                <span>
                  <span class="tc-name">{{ guide.name }}</span>
                  <span class="tc-desc">{{ guide.text }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>
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
import sections from '@/data/pillarsSections.js'
import content from '@/data/content/pillars/en.js'

const { c, list, untranslated } = useContent('pillars', content)

useSeo('pillars')
useScrollReveal()

const pillars = computed(() => list('pillars'))
const related = computed(() => list('related'))
</script>

<style scoped>
.pillar-list {
  display: grid;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
  margin: 0;
}

.pillar-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  text-decoration: none;
  color: var(--ink);
  overflow: hidden;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.pillar-row:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.pillar-row-num {
  position: absolute;
  inset-inline-end: var(--space-4);
  top: -6px;
  font-family: var(--serif);
  font-size: 4rem;
  line-height: 1;
  opacity: 0.06;
}

.pillar-row-icon {
  font-size: 2rem;
  line-height: 1;
}

.pillar-row-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-1);
}

.pillar-row-name {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 600;
}

.pillar-row-arabic {
  margin-inline-start: var(--space-2);
  font-family: var(--arabic);
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--muted);
}

.pillar-row-meaning {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--muted);
}

.pillar-row-text {
  font-size: 14.5px;
  line-height: 1.6;
}

.pillar-row-ref {
  font-size: 12px;
  font-weight: 600;
  color: var(--gold-dark);
}

.pillar-row-open {
  align-self: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--green);
  white-space: nowrap;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-grid > li {
  display: flex;
}

.related-grid .tool-card {
  flex: 1;
}

.related-grid .tc-name,
.related-grid .tc-desc {
  display: block;
}

@media (max-width: 600px) {
  .pillar-row {
    flex-wrap: wrap;
    padding: var(--space-5);
  }

  .pillar-row-open {
    align-self: flex-start;
    margin-inline-start: calc(2rem + var(--space-4));
  }
}
</style>

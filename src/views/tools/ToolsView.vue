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
      <p class="tools-note">{{ c('header.note') }}</p>
      <ContentSections :sections="sections" :c="c" :untranslated="untranslated">
        <template v-for="section in sections" :key="section.id" #[section.id]>
          <ul class="tools-grid">
            <li v-for="tool in list(section.id)" :key="tool.to">
              <RouterLink :to="tool.to" class="tool-card">
                <span class="tc-icon" aria-hidden="true">{{ tool.icon }}</span>
                <span>
                  <span class="tc-name">{{ tool.name }}</span>
                  <span class="tc-desc">{{ tool.text }}</span>
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
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useContent } from '@/composables/useContent.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ContentSections from '@/components/ContentSections.vue'
import sections from '@/data/toolsSections.js'
import content from '@/data/content/tools/en.js'

const { c, list, untranslated } = useContent('tools', content)

useSeo('tools')
useScrollReveal()
</script>

<style scoped>
.tools-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
}

.tools-grid > li {
  display: flex;
}

.tools-grid .tool-card {
  flex: 1;
}

.tools-grid .tc-name,
.tools-grid .tc-desc {
  display: block;
}
</style>

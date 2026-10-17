<template>
  <div>
    <div class="page-header pillar-header-prayer">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--prayer-light); color: var(--prayer-color)"
        >
          {{ c('header.badge') }}
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <nav class="guide-breadcrumb" :aria-label="$t('prayerGuides.breadcrumb')">
        <RouterLink to="/prayer">{{ $t('prayerGuides.prayer') }}</RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ $t('prayerGuides.adhan') }}</span>
      </nav>
      <p class="guide-review">{{ c('header.review') }}</p>

      <ContentSections :sections="sections" :c="c" :untranslated="untranslated">
        <template #next>
          <div class="guide-links">
            <RouterLink to="/prayer/how-to-pray" class="btn btn-primary">{{
              c('next.howToPray')
            }}</RouterLink>
            <RouterLink to="/prayer#times" class="btn btn-secondary">{{
              c('next.times')
            }}</RouterLink>
            <RouterLink to="/eid" class="btn btn-secondary">{{ c('next.eid') }}</RouterLink>
          </div>
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
import sections from '@/data/adhanSections.js'
import content from '@/data/content/adhan/en.js'

const { c, untranslated } = useContent('adhan', content)

useSeo('adhan')
useScrollReveal()
</script>

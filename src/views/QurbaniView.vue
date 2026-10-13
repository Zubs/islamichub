<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.badge') }} · <span lang="ar">الأضحية</span>
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <ContentSections :sections="sections" :c="c" :untranslated="untranslated">
        <template #shares>
          <div class="card qurbani-helper">
            <label for="qurbani-people">{{ $t('qurbani.people') }}</label>
            <input
              id="qurbani-people"
              v-model="typed"
              class="input-field"
              inputmode="numeric"
              autocomplete="off"
              :aria-invalid="entry?.error ? 'true' : 'false'"
              aria-describedby="qurbani-result"
            />
            <div id="qurbani-result" role="status">
              <p v-if="entry?.error" class="qurbani-error">{{ $t('qurbani.invalid') }}</p>
              <template v-else-if="entry">
                <h3>{{ $t('qurbani.options') }}</h3>
                <ul class="qurbani-options">
                  <li v-for="option in options" :key="option">{{ option }}</li>
                </ul>
              </template>
            </div>
            <p class="qurbani-guide"><HadithRef :text="c('shares.guide')" /></p>
          </div>
        </template>
        <template #faq>
          <div class="qurbani-links">
            <RouterLink to="/eid" class="btn btn-primary">{{ c('links.eid') }}</RouterLink>
            <RouterLink to="/hajj" class="btn btn-secondary">{{ c('links.hajj') }}</RouterLink>
          </div>
        </template>
      </ContentSections>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useContent } from '@/composables/useContent.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ContentSections from '@/components/ContentSections.vue'
import HadithRef from '@/components/HadithRef.vue'
import sections from '@/data/qurbaniSections.js'
import content from '@/data/content/qurbani/en.js'
import { parsePeople, shareOptions } from '@/utils/qurbani.js'
import { t } from '@/i18n.js'

const { c, untranslated } = useContent('qurbani', content)

useSeo('qurbani')
useScrollReveal()

const typed = ref('')
const entry = computed(() => parsePeople(typed.value))

function wording({ small, large, spare }, people) {
  if (large === 0) {
    return t('qurbani.small', small)
  }

  if (small > 0) {
    return t('qurbani.mixed', {
      large: t('qurbani.large', large),
      small: t('qurbani.small', small),
    })
  }

  if (spare === 0) {
    return t('qurbani.large', large)
  }

  const animals = large === 1 ? t('qurbani.sharesOfOne', people) : t('qurbani.large', large)
  return t('qurbani.spare', { animals, n: spare }, spare)
}

const options = computed(() =>
  entry.value?.people
    ? shareOptions(entry.value.people).map((option) => wording(option, entry.value.people))
    : [],
)
</script>

<style scoped>
.qurbani-helper {
  margin-top: var(--space-4);
}

.qurbani-helper label,
.qurbani-helper h3 {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-2);
}

.qurbani-helper h3 {
  margin-top: var(--space-4);
}

.qurbani-options {
  display: grid;
  gap: var(--space-2);
  padding-inline-start: var(--space-6);
  line-height: 1.6;
  color: var(--ink);
}

.qurbani-error {
  margin-top: var(--space-3);
  font-size: 14px;
  font-weight: 600;
  color: var(--gold);
}

.qurbani-guide {
  margin-top: var(--space-4);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}

.qurbani-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);
}
</style>

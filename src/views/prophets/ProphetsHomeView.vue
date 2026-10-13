<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('prophets.badge') }} · <span lang="ar">الأنبياء</span>
        </div>
        <h1>{{ $t('prophets.title') }}</h1>
        <p>{{ $t('prophets.lead') }}</p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <ol class="prophets-list">
        <li v-for="(prophet, index) in prophets" :key="prophet.slug" class="card prophet-card">
          <div class="prophet-head">
            <span class="prophet-number">{{ index + 1 }}</span>
            <h2 class="prophet-name">
              <RouterLink v-if="prophet.story" :to="'/prophets/' + prophet.slug">{{
                prophet.name
              }}</RouterLink>
              <template v-else>{{ prophet.name }}</template>
            </h2>
            <span class="prophet-arabic" lang="ar" dir="rtl">{{ prophet.arabic }}</span>
          </div>
          <p v-if="prophet.people" class="prophet-people">
            {{ prophet.people }}
            <span class="prophet-refs">{{ prophet.peopleRefs.join(' · ') }}</span>
          </p>
          <p class="prophet-mentions">
            {{ $t('prophets.namedIn') }}
            <span class="prophet-refs">{{ prophet.mentions.join(' · ') }}</span>
          </p>
          <RouterLink
            v-if="prophet.story"
            :to="'/prophets/' + prophet.slug"
            class="btn btn-secondary prophet-link"
            >{{ $t('prophets.readStory', { name: prophet.name }) }}</RouterLink
          >
          <p v-else class="prophet-pending">{{ $t('prophets.storyComing') }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useDataTranslations } from '@/composables/useContent.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { PROPHETS } from '@/data/prophets.js'

const { localized } = useDataTranslations('prophets')
const prophets = computed(() => PROPHETS.map(localized))

useSeo('prophets')
</script>

<style scoped>
.prophets-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: var(--space-4);
  padding: 0;
  margin-top: var(--space-6);
}

.prophet-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.prophet-number {
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
}

.prophet-name {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 600;
  flex: 1;
}

.prophet-name a {
  color: var(--green);
  text-decoration: none;
}

.prophet-arabic {
  font-family: var(--arabic);
  font-size: 1.4rem;
  color: var(--ink);
}

.prophet-people,
.prophet-mentions {
  margin-top: var(--space-2);
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
}

.prophet-people {
  color: var(--ink);
}

.prophet-refs {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
}

.prophet-link {
  margin-top: var(--space-3);
}

.prophet-pending {
  margin-top: var(--space-3);
  font-size: 12px;
  color: var(--muted);
}
</style>

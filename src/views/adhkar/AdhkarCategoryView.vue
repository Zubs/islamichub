<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ meta?.timeHint || 'Adhkar' }}
        </div>
        <h1>{{ meta?.name || 'Adhkar' }}</h1>
        <p v-if="meta">{{ meta.description }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <!-- Breadcrumb -->
      <div class="adh-breadcrumb">
        <RouterLink to="/adhkar" class="adh-breadcrumb-link">← All Adhkar</RouterLink>
        <span class="adh-sep" aria-hidden="true">/</span>
        <span>{{ meta?.name || categorySlug }}</span>
      </div>

      <div v-if="!meta" class="had-empty">Category not found.</div>

      <template v-else>
        <!-- Progress summary -->
        <div class="adh-progress-card anim-target">
          <div class="apc-top">
            <div>
              <div class="apc-label">Today's progress</div>
              <div class="apc-count">{{ completedCount }} / {{ dhikrList.length }} recited</div>
            </div>
            <div v-if="streak > 0" class="apc-streak">🔥 {{ streak }}-day streak</div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
          </div>
          <button
            v-if="!isCompletedToday"
            class="btn btn-primary"
            style="margin-top: 12px"
            :disabled="completedCount < dhikrList.length"
            @click="markComplete"
          >
            {{
              completedCount < dhikrList.length
                ? `Complete all ${dhikrList.length} to finish`
                : 'Mark ' + meta.name + ' complete for today'
            }}
          </button>
          <div v-else class="apc-done-msg">
            ✓ {{ meta.name }} completed today — جَزَاكَ اللَّهُ خَيْرًا
          </div>
        </div>

        <!-- Dhikr list -->
        <div class="adh-list">
          <AdhkarCard v-for="d in dhikrList" :key="d.id" :dhikr="d" />
        </div>

        <!-- Category nav -->
        <div class="adh-cat-nav">
          <RouterLink
            v-if="prevCategory"
            :to="'/adhkar/' + prevCategory.slug"
            class="btn btn-secondary"
          >
            ← {{ prevCategory.name }}
          </RouterLink>
          <RouterLink to="/adhkar" class="btn btn-secondary" style="margin: 0 auto">
            All categories
          </RouterLink>
          <RouterLink
            v-if="nextCategory"
            :to="'/adhkar/' + nextCategory.slug"
            class="btn btn-secondary"
          >
            {{ nextCategory.name }} →
          </RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import AdhkarCard from '@/components/adhkar/AdhkarCard.vue'
import { ADHKAR_CATEGORIES, getAdhkarByCategory, getCategoryMeta } from '@/data/adhkar.js'
import { useAdhkarStore } from '@/stores/adhkar.js'

useScrollReveal()

const route = useRoute()
const store = useAdhkarStore()
const categorySlug = computed(() => route.params.categorySlug)
const meta = computed(() => getCategoryMeta(categorySlug.value))
const dhikrList = computed(() => getAdhkarByCategory(categorySlug.value))

useHead(
  computed(() => ({
    title: `${meta.value?.name || 'Adhkar'} | IslamicHub`,
    meta: [
      {
        name: 'description',
        content:
          meta.value?.description ||
          'Daily Islamic supplications with Arabic, transliteration, and translation.',
      },
    ],
  })),
)

function isDhikrFullyDone(d) {
  if (d.parts) {
    return d.parts.every((part, i) => store.progressFor(`${d.id}:${i}`) >= part.count)
  }

  return store.progressFor(d.id) >= d.repeat
}

const completedCount = computed(() => dhikrList.value.filter(isDhikrFullyDone).length)
const progressPct = computed(() =>
  dhikrList.value.length ? Math.round((completedCount.value / dhikrList.value.length) * 100) : 0,
)

const isCompletedToday = computed(() => store.isCategoryCompletedToday(categorySlug.value))
const streak = computed(() => store.streakForCategory(categorySlug.value))

function markComplete() {
  store.completeCategory(categorySlug.value)
}

// Prev/next category for quick navigation
const currentIndex = computed(() =>
  ADHKAR_CATEGORIES.findIndex((c) => c.slug === categorySlug.value),
)

const prevCategory = computed(() =>
  currentIndex.value > 0 ? ADHKAR_CATEGORIES[currentIndex.value - 1] : null,
)

const nextCategory = computed(() =>
  currentIndex.value !== -1 && currentIndex.value < ADHKAR_CATEGORIES.length - 1
    ? ADHKAR_CATEGORIES[currentIndex.value + 1]
    : null,
)
</script>

<style scoped>
.adh-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  margin: 1.5rem 0 2rem;
}

.adh-breadcrumb-link {
  color: var(--gold);
  text-decoration: none;
  font-weight: 500;
}

.adh-breadcrumb-link:hover {
  text-decoration: underline;
}

.adh-sep {
  color: var(--border);
}

.adh-progress-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
}

.apc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
  gap: 8px;
}

.apc-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  margin-bottom: 3px;
}

.apc-count {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ink);
}

.apc-streak {
  font-size: 13px;
  font-weight: 600;
  color: var(--gold);
}

.apc-done-msg {
  margin-top: 12px;
  font-size: 13.5px;
  color: var(--green);
  font-weight: 500;
}

.adh-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.adh-cat-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  border-top: 1px solid var(--border);
}

.had-empty {
  color: var(--muted);
  font-size: 14px;
  padding: 2rem 0;
  text-align: center;
}
</style>

<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          Daily Worship &nbsp;·&nbsp; الأذكار
        </div>
        <h1>Adhkar &amp; Duas</h1>
        <p>
          Morning and evening supplications, remembrance after prayer, and daily dhikr — with
          Arabic, transliteration, translation, and a tap-to-count tracker for each.
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <!-- Streak summary -->
      <div class="adhkar-streak-strip anim-target">
        <div v-for="cat in categoriesWithStreak" :key="cat.slug" class="streak-pill">
          <span class="streak-icon" aria-hidden="true">{{ cat.icon }}</span>
          <span class="streak-name">{{ cat.name }}</span>
          <span v-if="cat.streak > 0" class="streak-count">🔥 {{ cat.streak }}</span>
        </div>
      </div>

      <!-- Category cards -->
      <div class="adhkar-cat-grid anim-target">
        <RouterLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="'/adhkar/' + cat.slug"
          class="adhkar-cat-card"
        >
          <div class="acc-top">
            <div class="acc-icon" aria-hidden="true">{{ cat.icon }}</div>
            <div v-if="store.isCategoryCompletedToday(cat.slug)" class="acc-done-badge">
              ✓ Done today
            </div>
          </div>
          <div class="acc-arabic" lang="ar" dir="rtl">{{ cat.arabicName }}</div>
          <h2 class="acc-name">{{ cat.name }}</h2>
          <p class="acc-desc">{{ cat.description }}</p>
          <div class="acc-footer">
            <span class="acc-time">{{ cat.timeHint }}</span>
            <span class="acc-count">{{ countFor(cat.slug) }} adhkar</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { ADHKAR_CATEGORIES, getAdhkarByCategory } from '@/data/adhkar.js'
import { useAdhkarStore } from '@/stores/adhkar.js'

useHead({
  title: 'Adhkar & Duas — Morning, Evening & Daily Supplications | IslamicHub',
  meta: [
    {
      name: 'description',
      content:
        'Morning and evening adhkar, remembrance after prayer, before sleep, and daily dhikr — with Arabic, transliteration, translation, and a tap-to-count tracker.',
    },
  ],
})
useScrollReveal()

const store = useAdhkarStore()
const categories = ADHKAR_CATEGORIES

function countFor(slug) {
  return getAdhkarByCategory(slug).length
}

const categoriesWithStreak = computed(() =>
  categories
    .map((c) => ({ ...c, streak: store.streakForCategory(c.slug) }))
    .filter((c) => c.streak > 0 || ['morning', 'evening'].includes(c.slug)),
)
</script>

<style scoped>
.adhkar-streak-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.75rem 0;
}

.streak-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
}

.streak-icon {
  font-size: 15px;
}

.streak-count {
  font-size: 12px;
  color: var(--gold);
  font-weight: 600;
}

.adhkar-cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.1rem;
  margin-bottom: 2rem;
}

.adhkar-cat-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.4rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  position: relative;
}

.adhkar-cat-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
  border-color: var(--gold);
}

.acc-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.6rem;
}

.acc-icon {
  font-size: 1.8rem;
}

.acc-done-badge {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--green);
  background: var(--green-light);
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
}

.acc-arabic {
  font-family: var(--arabic, var(--serif));
  font-size: 1.1rem;
  color: var(--muted);
  margin-bottom: 0.2rem;
}

.acc-name {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.4rem;
}

.acc-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
  flex: 1;
  margin-bottom: 1rem;
}

.acc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
  color: var(--muted);
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.acc-count {
  font-weight: 600;
  color: var(--gold);
}
</style>

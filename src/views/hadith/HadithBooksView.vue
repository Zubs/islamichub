<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          Hadith Library &nbsp;·&nbsp; كتب الحديث
        </div>
        <h1>The Nine Collections</h1>
        <p>
          Browse authenticated hadith from the major collections — Sahih Bukhari, Sahih Muslim, the
          four Sunan, and more.
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <!-- Breadcrumb -->
      <div class="had-breadcrumb">
        <RouterLink to="/hadith" class="had-breadcrumb-link">← Hadith</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <span>All Books</span>
      </div>

      <!-- API key notice if missing -->
      <div v-if="!hasApiKey" class="api-key-notice">
        <div class="akn-icon" aria-hidden="true">🔑</div>
        <div>
          <div class="akn-title">API key required</div>
          <div class="akn-desc">
            Add <code>VITE_HADITH_API_KEY=your_key</code> to your <code>.env</code> file. Get a free
            key at
            <a href="https://hadithapi.com/register" target="_blank" rel="noopener noreferrer"
              >hadithapi.com/register</a
            >. The book cards below use static metadata — live chapter counts require your key.
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="had-loading" aria-live="polite">
        <div class="had-spinner" aria-hidden="true"></div>
        <span>Loading collections…</span>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="had-error">
        <div class="had-error-icon" aria-hidden="true">⚠</div>
        <div>
          <div class="had-error-title">Could not load live data</div>
          <div class="had-error-desc">
            {{ error }} — Showing static metadata. Check your API key in <code>.env</code>.
          </div>
        </div>
      </div>

      <!-- Grade filter -->
      <div class="had-filter-bar">
        <span class="had-filter-label">Filter by grade:</span>
        <div class="btn-group">
          <button
            v-for="f in filters"
            :key="f"
            class="pill-btn"
            :class="{ active: activeFilter === f }"
            @click="activeFilter = f"
          >
            {{ f }}
          </button>
        </div>
        <span class="had-book-count">{{ filteredBooks.length }} collections</span>
      </div>

      <!-- Book cards grid -->
      <div class="had-books-grid">
        <RouterLink
          v-for="book in filteredBooks"
          :key="book.slug"
          :to="'/hadith/books/' + book.slug"
          class="had-book-card"
        >
          <div class="hbc-top">
            <div class="hbc-initials" aria-hidden="true">{{ getInitials(book.name) }}</div>
            <div class="hbc-grade" :style="{ background: book.gradeBg, color: book.gradeColor }">
              {{ book.grade }}
            </div>
          </div>

          <div class="hbc-arabic" lang="ar">{{ book.arabicName }}</div>
          <h2 class="hbc-name">{{ book.name }}</h2>
          <div class="hbc-author">{{ book.author }}</div>
          <div class="hbc-death">d. {{ book.death }}</div>

          <p class="hbc-about">{{ book.about.slice(0, 140) }}…</p>

          <div class="hbc-footer">
            <div class="hbc-count">
              <span class="hbc-count-num">{{ getLiveCount(book.slug) || book.hadithCount }}</span>
              <span class="hbc-count-label">hadiths</span>
            </div>
            <div class="hbc-arrow" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { fetchBooks, BOOKS_META } from '@/composables/useHadithApi.js'

useHead({
  title: 'Hadith Library — All Collections | IslamicHub',
  meta: [
    {
      name: 'description',
      content:
        'Browse all 9 major hadith collections including Sahih Bukhari, Sahih Muslim, and the four Sunan — by chapter and individual hadith.',
    },
  ],
})
useScrollReveal()

const hasApiKey = !!import.meta.env.VITE_HADITH_API_KEY
const loading = ref(false)
const error = ref(null)
const liveBooks = ref([]) // from API
const activeFilter = ref('All')
const filters = ['All', 'Sahih', 'Hasan / Mixed', 'Compiled']

const filteredBooks = computed(() => {
  if (activeFilter.value === 'All') {
    return BOOKS_META
  }

  if (activeFilter.value === 'Sahih') {
    return BOOKS_META.filter((b) => b.grade === 'Sahih')
  }

  if (activeFilter.value === 'Hasan / Mixed') {
    return BOOKS_META.filter((b) => b.grade.includes('Hasan') || b.grade === 'Mixed')
  }

  if (activeFilter.value === 'Compiled') {
    return BOOKS_META.filter((b) => b.grade === 'Compiled collection')
  }

  return BOOKS_META
})

function getLiveCount(slug) {
  const live = liveBooks.value.find((b) => b.bookSlug === slug || b.slug === slug)
  return live?.numberOfHadith || live?.hadithCount || null
}

function getInitials(name) {
  return name
    .replace(/^(Sahih|Sunan|Jami'|Musnad|Al-|Al)\s*/i, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

onMounted(async () => {
  if (!hasApiKey) {
    return
  }

  loading.value = true
  try {
    const data = await fetchBooks()
    liveBooks.value = data.books || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.had-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  margin: 1.5rem 0 2rem;
}
.had-breadcrumb-link {
  color: var(--gold);
  text-decoration: none;
  font-weight: 500;
}
.had-breadcrumb-link:hover {
  text-decoration: underline;
}
.had-sep {
  color: var(--border);
}

/* API key notice */
.api-key-notice {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #fffae0;
  border: 1px solid #e8d05a;
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 13.5px;
  color: #6a5200;
  line-height: 1.55;
}
.akn-icon {
  font-size: 22px;
  flex-shrink: 0;
}
.akn-title {
  font-weight: 600;
  margin-bottom: 4px;
}
.akn-desc a {
  color: var(--gold);
}
code {
  background: rgba(0, 0, 0, 0.07);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 12px;
}

/* Loading / error */
.had-loading {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-size: 14px;
  padding: 2rem 0;
}
.had-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.had-error {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #fde9e7;
  border: 1px solid #f0b0a8;
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 13.5px;
  color: #7a1a1a;
}
.had-error-icon {
  font-size: 20px;
}
.had-error-title {
  font-weight: 600;
  margin-bottom: 4px;
}

/* Filter bar */
.had-filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.had-filter-label {
  font-size: 13px;
  color: var(--muted);
  font-weight: 500;
}
.had-book-count {
  font-size: 12px;
  color: var(--muted);
  margin-left: auto;
}

/* Book grid */
.had-books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.1rem;
}

/* Book card */
.had-book-card {
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
  overflow: hidden;
}
.had-book-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), var(--green));
  opacity: 0;
  transition: opacity 0.2s;
}
.had-book-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
  border-color: var(--gold);
}
.had-book-card:hover::before {
  opacity: 1;
}

.hbc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}
.hbc-initials {
  width: 44px;
  height: 44px;
  background: var(--ink);
  color: var(--gold);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 700;
}
.hbc-grade {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
}

.hbc-arabic {
  font-family: var(--serif);
  font-size: 1.1rem;
  direction: rtl;
  text-align: right;
  color: var(--muted);
  margin-bottom: 0.2rem;
}
.hbc-name {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.15rem;
}
.hbc-author {
  font-size: 12px;
  color: var(--green);
  font-weight: 500;
  margin-bottom: 2px;
}
.hbc-death {
  font-size: 11.5px;
  color: var(--muted);
  margin-bottom: 0.85rem;
}
.hbc-about {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
}

.hbc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
  margin-top: auto;
}
.hbc-count-num {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ink);
}
.hbc-count-label {
  font-size: 11px;
  color: var(--muted);
  margin-left: 4px;
}
.hbc-arrow {
  color: var(--muted);
  transition: all 0.2s;
}
.had-book-card:hover .hbc-arrow {
  color: var(--gold);
  transform: translateX(3px);
}

@media (max-width: 480px) {
  .had-books-grid {
    grid-template-columns: 1fr;
  }
}
</style>

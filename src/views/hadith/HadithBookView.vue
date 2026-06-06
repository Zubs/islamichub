<template>
  <div>
    <!-- Page header — uses book metadata once loaded -->
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ meta?.grade || 'Hadith Collection' }}
        </div>
        <h1 :lang="meta ? 'en' : undefined">
          {{ meta?.name || bookSlug.replace(/-/g, ' ') }}
        </h1>
        <p v-if="meta" style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center">
          <span>{{ meta.author }}</span>
          <span style="opacity: 0.4">·</span>
          <span>d. {{ meta.death }}</span>
          <span style="opacity: 0.4">·</span>
          <span>{{ meta.hadithCount }} hadiths</span>
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1000px">
      <!-- Breadcrumb -->
      <div class="had-breadcrumb">
        <RouterLink to="/hadith" class="had-breadcrumb-link">Hadith</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <RouterLink to="/hadith/books" class="had-breadcrumb-link">All Books</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <span>{{ meta?.name || bookSlug }}</span>
      </div>

      <!-- About the book -->
      <div v-if="meta" class="book-about-card anim-target">
        <div class="bac-arabic" lang="ar">{{ meta.arabicName }}</div>
        <p class="bac-text">{{ meta.about }}</p>
        <div class="bac-stats">
          <div class="bac-stat">
            <div class="bac-stat-num">{{ chapters.length || '—' }}</div>
            <div class="bac-stat-label">Chapters</div>
          </div>
          <div class="bac-stat">
            <div class="bac-stat-num">{{ meta.hadithCount }}</div>
            <div class="bac-stat-label">Hadiths</div>
          </div>
          <div class="bac-stat">
            <div class="bac-stat-num" :style="{ color: meta.gradeColor }">{{ meta.grade }}</div>
            <div class="bac-stat-label">Grade</div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="had-loading" aria-live="polite">
        <div class="had-spinner" aria-hidden="true"></div>
        <span>Loading chapters…</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="had-error">
        <div>
          <div class="had-error-title">Could not load chapters</div>
          <div class="had-error-desc">{{ error }}</div>
          <div v-if="!hasApiKey" style="margin-top: 8px; font-size: 13px">
            Add <code>VITE_HADITH_API_KEY=your_key</code> to your <code>.env</code> file. Get a free
            key at
            <a href="https://hadithapi.com/register" target="_blank" rel="noopener noreferrer"
              >hadithapi.com</a
            >.
          </div>
        </div>
      </div>

      <!-- Chapters -->
      <div v-else-if="chapters.length">
        <!-- Search filter -->
        <div class="chap-search-bar">
          <input
            v-model="search"
            type="search"
            class="input-field"
            placeholder="Filter chapters…"
            aria-label="Filter chapters by name"
          />
          <span class="chap-count">{{ filteredChapters.length }} chapters</span>
        </div>

        <div class="chap-grid">
          <RouterLink
            v-for="chapter in filteredChapters"
            :key="chapter.chapterNumber"
            :to="`/hadith/books/${bookSlug}/${chapter.chapterNumber}`"
            class="chap-card"
          >
            <div class="chap-num">{{ chapter.chapterNumber }}</div>
            <div class="chap-body">
              <div class="chap-en">{{ chapter.chapterEnglish }}</div>
              <div class="chap-ar" lang="ar">{{ chapter.chapterArabic }}</div>
              <div v-if="chapter.hadithCount" class="chap-count-badge">
                {{ chapter.hadithCount }} hadith
              </div>
            </div>
            <div class="chap-arrow" aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- No results after filter -->
      <div v-else-if="!loading && search && chapters.length" class="had-empty">
        No chapters match "{{ search }}"
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  watch
} from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { fetchChapters, BOOKS_META } from '@/composables/useHadithApi.js'

useScrollReveal()

const route = useRoute()
const bookSlug = computed(() => route.params.bookSlug)
const meta = computed(() => BOOKS_META.find((b) => b.slug === bookSlug.value) || null)

useHead(
  computed(() => ({
    title: `${meta.value?.name || bookSlug.value} — Chapters | IslamicHub`,
    meta: [
      {
        name: 'description',
        content: `Browse all chapters of ${meta.value?.name || bookSlug.value} — ${meta.value?.hadithCount || ''} hadiths from ${meta.value?.author || ''}.`,
      },
    ],
  })),
)

const hasApiKey = !!import.meta.env.VITE_HADITH_API_KEY
const loading = ref(false)
const error = ref(null)
const chapters = ref([])
const search = ref('')

const filteredChapters = computed(() => {
  if (!search.value.trim()) {
    return chapters.value
  }

  const q = search.value.toLowerCase()
  return chapters.value.filter(
    (c) => c.chapterEnglish?.toLowerCase().includes(q) || c.chapterArabic?.includes(search.value),
  )
})

async function load() {
  loading.value = true
  error.value = null
  chapters.value = []
  try {
    const data = await fetchChapters(bookSlug.value)
    chapters.value = data.chapters || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(bookSlug, load)
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

/* About card */
.book-about-card {
  background: linear-gradient(135deg, #1a2a35 0%, var(--ink) 100%);
  border-radius: var(--radius-xl);
  padding: 1.5rem 1.75rem;
  margin-bottom: 2rem;
}
.bac-arabic {
  font-family: var(--serif);
  font-size: 1.4rem;
  direction: rtl;
  text-align: right;
  color: var(--gold);
  margin-bottom: 0.75rem;
}
.bac-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}
.bac-stats {
  display: flex;
  gap: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}
.bac-stat-num {
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}
.bac-stat-label {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2px;
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
  background: #fde9e7;
  border: 1px solid #f0b0a8;
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  font-size: 13.5px;
  color: #7a1a1a;
  margin-bottom: 1.5rem;
}
.had-error-title {
  font-weight: 600;
  margin-bottom: 4px;
}
.had-empty {
  color: var(--muted);
  font-size: 14px;
  padding: 2rem 0;
  text-align: center;
}
code {
  background: rgba(0, 0, 0, 0.07);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 12px;
}
a {
  color: var(--gold);
}

/* Search bar */
.chap-search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
}
.chap-count {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
}

/* Chapter grid */
.chap-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chap-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all 0.15s;
}
.chap-card:hover {
  border-color: var(--gold);
  background: var(--cream);
  transform: translateX(3px);
}
.chap-num {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: var(--gold-light);
  color: var(--gold);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 0.9rem;
  font-weight: 600;
}
.chap-body {
  flex: 1;
  min-width: 0;
}
.chap-en {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 2px;
}
.chap-ar {
  font-family: var(--serif);
  font-size: 13px;
  color: var(--muted);
  direction: rtl;
  text-align: right;
}
.chap-count-badge {
  display: inline-block;
  margin-top: 4px;
  font-size: 11px;
  padding: 1px 7px;
  background: var(--cream-dark);
  border-radius: 100px;
  color: var(--muted);
}
.chap-arrow {
  color: var(--muted);
  flex-shrink: 0;
  transition: all 0.15s;
}
.chap-card:hover .chap-arrow {
  color: var(--gold);
}
</style>

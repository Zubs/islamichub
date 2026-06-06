<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ meta?.name || bookSlug }} · Chapter {{ chapterNumber }}
        </div>
        <h1>{{ chapterTitle || 'Loading…' }}</h1>
        <p
          v-if="chapterArabic"
          lang="ar"
          style="
            font-family: var(--serif);
            font-size: 1.2rem;
            direction: rtl;
            text-align: right;
            opacity: 0.8;
          "
        >
          {{ chapterArabic }}
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 860px">
      <!-- Breadcrumb -->
      <div class="had-breadcrumb">
        <RouterLink to="/hadith" class="had-breadcrumb-link">Hadith</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <RouterLink to="/hadith/books" class="had-breadcrumb-link">All Books</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <RouterLink :to="'/hadith/books/' + bookSlug" class="had-breadcrumb-link">{{
          meta?.name || bookSlug
        }}</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <span>Chapter {{ chapterNumber }}</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="had-loading" aria-live="polite">
        <div class="had-spinner" aria-hidden="true"></div>
        <span>Loading hadiths…</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="had-error">
        <div class="had-error-title">Could not load hadiths</div>
        <div>{{ error }}</div>
        <div v-if="!hasApiKey" style="margin-top: 8px; font-size: 13px">
          Add <code>VITE_HADITH_API_KEY=your_key</code> to <code>.env</code> and restart the dev
          server. Get a free key at
          <a href="https://hadithapi.com/register" target="_blank" rel="noopener noreferrer"
            >hadithapi.com</a
          >.
        </div>
      </div>

      <!-- Hadith list -->
      <div v-else>
        <!-- Summary bar -->
        <div class="hcv-summary">
          <span>{{ total }} hadiths in this chapter</span>
          <span class="hcv-page-info">Page {{ currentPage }} of {{ lastPage }}</span>
        </div>

        <!-- Individual hadith cards -->
        <div class="hcv-list">
          <article
            v-for="h in hadiths"
            :key="h.id"
            class="hadith-card"
            :class="{ 'hc-expanded': expanded.has(h.id) }"
          >
            <!-- Header row -->
            <div class="hc-header" @click="toggleExpand(h.id)">
              <div class="hc-meta-left">
                <div class="hc-number"># {{ h.hadithNumber }} {{ h.headingEnglish }}</div>
                <div class="hc-status" :style="gradeStyle(h.status)">
                  {{ h.status || 'Ungraded' }}
                </div>
              </div>
              <button
                class="hc-expand-btn"
                :aria-label="expanded.has(h.id) ? 'Collapse hadith' : 'Expand hadith'"
                :aria-expanded="String(expanded.has(h.id))"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  :style="{
                    transform: expanded.has(h.id) ? 'rotate(180deg)' : 'none',
                    transition: 'transform .2s',
                  }"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            <!-- Arabic text — always visible -->
            <div class="hc-arabic" lang="ar" dir="rtl">{{ h.hadithArabic }}</div>

            <!-- English + Urdu — shown when expanded -->
            <Transition name="hc-expand">
              <div v-if="expanded.has(h.id)" class="hc-body">
                <div class="hc-english">
                  <div class="hc-lang-label">English</div>
                  <div class="hc-text">{{ h.englishNarrator }} "{{ h.hadithEnglish }}"</div>
                </div>
                <div class="hc-footer">
                  <div class="hc-ref">
                    <span class="hc-ref-label">Reference</span>
                    {{ meta?.name || bookSlug }}, Hadith {{ h.hadithNumber }}
                  </div>
                  <button
                    class="hc-copy-btn"
                    @click.stop="copy(h)"
                    :class="{ copied: copied === h.id }"
                  >
                    {{ copied === h.id ? '✓ Copied' : 'Copy' }}
                  </button>
                </div>
              </div>
            </Transition>
          </article>
        </div>

        <!-- Pagination -->
        <div v-if="lastPage > 1" class="hcv-pagination">
          <button
            class="btn btn-secondary"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            ← Previous
          </button>

          <div class="hcv-page-pills">
            <button
              v-for="p in visiblePages"
              :key="p"
              class="hcv-page-pill"
              :class="{ active: p === currentPage, ellipsis: p === '…' }"
              :disabled="p === '…' || p === currentPage"
              @click="p !== '…' && goToPage(p)"
            >
              {{ p }}
            </button>
          </div>

          <button
            class="btn btn-secondary"
            :disabled="currentPage === lastPage"
            @click="goToPage(currentPage + 1)"
          >
            Next →
          </button>
        </div>

        <!-- Chapter nav -->
        <div class="hcv-chapter-nav">
          <RouterLink
            v-if="prevChapter"
            :to="`/hadith/books/${bookSlug}/${prevChapter}`"
            class="btn btn-secondary"
            >← Chapter {{ prevChapter }}</RouterLink
          >
          <RouterLink
            :to="'/hadith/books/' + bookSlug"
            class="btn btn-secondary"
            style="margin: 0 auto"
            >All chapters</RouterLink
          >
          <RouterLink
            v-if="nextChapter"
            :to="`/hadith/books/${bookSlug}/${nextChapter}`"
            class="btn btn-secondary"
            >Chapter {{ nextChapter }} →</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { fetchHadiths, fetchChapters, BOOKS_META } from '@/composables/useHadithApi.js'

useScrollReveal()

const route = useRoute()
const bookSlug = computed(() => route.params.bookSlug)
const chapterNumber = computed(() => route.params.chapterNumber)
const meta = computed(() => BOOKS_META.find((b) => b.slug === bookSlug.value) || null)
const hasApiKey = !!import.meta.env.VITE_HADITH_API_KEY
const loading = ref(false)
const error = ref(null)
const hadiths = ref([])
const total = ref(0)
const currentPage = ref(1)
const lastPage = ref(1)
const chapterTitle = ref('')
const chapterArabic = ref('')

// Chapter nav (prev / next)
const allChapterNums = ref([])
const prevChapter = computed(() => {
  const idx = allChapterNums.value.indexOf(Number(chapterNumber.value))
  return idx > 0 ? allChapterNums.value[idx - 1] : null
})
const nextChapter = computed(() => {
  const idx = allChapterNums.value.indexOf(Number(chapterNumber.value))
  return idx !== -1 && idx < allChapterNums.value.length - 1 ? allChapterNums.value[idx + 1] : null
})

useHead(
  computed(() => ({
    title: `${chapterTitle.value || 'Chapter ' + chapterNumber.value} — ${meta.value?.name || bookSlug.value} | IslamicHub`,
    meta: [
      {
        name: 'description',
        content: `Read hadiths from Chapter ${chapterNumber.value} of ${meta.value?.name || bookSlug.value}: ${chapterTitle.value}`,
      },
    ],
  })),
)

// Expand / collapse individual hadith
const expanded = reactive(new Set())
function toggleExpand(id) {
  if (expanded.has(id)) {
    expanded.delete(id)
  } else {
    expanded.add(id)
  }
}

// Copy hadith to clipboard
const copied = ref(null)
async function copy(h) {
  const text = `${h.hadithEnglish}\n\n— ${meta.value?.name || bookSlug.value}, Hadith ${h.hadithNumber}`
  await navigator.clipboard.writeText(text).catch(() => {})
  copied.value = h.id
  setTimeout(() => {
    copied.value = null
  }, 2000)
}

// Grade badge styling
const GRADE_STYLES = {
  Sahih: { background: 'var(--green-light)', color: 'var(--green)' },
  Hasan: { background: 'var(--gold-light)', color: '#7A5A10' },
  "Da'eef": { background: '#FDE9E7', color: '#c0392b' },
  Daif: { background: '#FDE9E7', color: '#c0392b' },
  Mawdu: { background: '#fde8e8', color: '#922b21' },
}

function gradeStyle(status) {
  return GRADE_STYLES[status] || { background: 'var(--cream-dark)', color: 'var(--muted)' }
}

// Visible page numbers with ellipsis
const visiblePages = computed(() => {
  const total = lastPage.value,
    cur = currentPage.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = []
  if (cur <= 4) {
    pages.push(1, 2, 3, 4, 5, '…', total)
  } else if (cur >= total - 3) {
    pages.push(1, '…', total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '…', cur - 1, cur, cur + 1, '…', total)
  }
  return pages
})

async function goToPage(page) {
  currentPage.value = page
  await loadHadiths()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function loadHadiths() {
  loading.value = true
  error.value = null
  hadiths.value = []
  try {
    const data = await fetchHadiths({
      book: bookSlug.value,
      chapter: chapterNumber.value,
      paginate: 25,
      page: currentPage.value,
    })
    const p = data.hadiths
    hadiths.value = p.data || []
    total.value = p.total || 0
    lastPage.value = p.last_page || 1
    // Extract chapter title from first hadith
    if (hadiths.value[0]) {
      chapterTitle.value = hadiths.value[0].chapter?.chapterEnglish || ''
      chapterArabic.value = hadiths.value[0].chapter?.chapterArabic || ''
    }
    // Auto-expand all if only a few
    if (hadiths.value.length <= 5) {
      hadiths.value.forEach((h) => expanded.add(h.id))
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function loadChapterList() {
  try {
    const data = await fetchChapters(bookSlug.value)
    allChapterNums.value = (data.chapters || []).map((c) => Number(c.chapterNumber))
  } catch {
    /* non-critical */
  }
}

onMounted(() => {
  loadHadiths()
  loadChapterList()
})

watch([bookSlug, chapterNumber], () => {
  currentPage.value = 1
  expanded.clear()
  loadHadiths()
  loadChapterList()
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
  flex-wrap: wrap;
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

/* Summary bar */
.hcv-summary {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 8px;
}
.hcv-page-info {
  font-weight: 500;
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
code {
  background: rgba(0, 0, 0, 0.07);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 12px;
}
a {
  color: var(--gold);
}

/* Hadith list */
.hcv-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

/* Hadith card */
.hadith-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: border-color 0.15s;
}
.hadith-card:hover {
  border-color: var(--gold);
}
.hc-expanded {
  border-color: var(--gold);
}

.hc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: background 0.15s;
}
.hc-expanded .hc-header {
  border-bottom-color: var(--border);
  background: var(--cream);
}
.hc-header:hover {
  background: var(--cream);
}

.hc-meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hc-number {
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
}
.hc-status {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 100px;
}

.hc-expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  padding: 4px;
  display: flex;
  transition: color 0.15s;
}
.hc-expand-btn:hover {
  color: var(--gold);
}

/* Arabic — always visible */
.hc-arabic {
  font-family: var(--serif);
  font-size: clamp(1.05rem, 2.5vw, 1.3rem);
  line-height: 2.1;
  color: var(--ink);
  padding: 1rem 1.25rem;
  text-align: right;
}

/* Expanded body */
.hc-expand-enter-active,
.hc-expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.hc-expand-enter-from,
.hc-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.hc-expand-enter-to,
.hc-expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}

.hc-body {
  padding: 0 1.25rem 1rem;
}

.hc-lang-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  margin-bottom: 6px;
}
.hc-english {
  margin-bottom: 1rem;
}
.hc-text {
  font-size: 15px;
  color: var(--ink);
  line-height: 1.75;
}
.hc-urdu {
  margin-bottom: 1rem;
}
.hc-urdu .hc-text {
  text-align: right;
  font-family: var(--serif);
  font-size: 1.05rem;
}

.hc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 8px;
}
.hc-ref {
  font-size: 12.5px;
  color: var(--muted);
}
.hc-ref-label {
  font-weight: 600;
  color: var(--gold);
  margin-right: 5px;
}
.hc-copy-btn {
  font-size: 12px;
  padding: 4px 12px;
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  color: var(--muted);
  transition: all 0.15s;
}
.hc-copy-btn:hover {
  border-color: var(--green);
  color: var(--green);
}
.hc-copy-btn.copied {
  background: var(--green-light);
  color: var(--green);
  border-color: var(--green);
}

/* Pagination */
.hcv-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.hcv-page-pills {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.hcv-page-pill {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.hcv-page-pill:hover:not(:disabled) {
  border-color: var(--gold);
  color: var(--gold);
}
.hcv-page-pill.active {
  background: var(--gold);
  color: #fff;
  border-color: var(--gold);
  font-weight: 600;
}
.hcv-page-pill.ellipsis {
  border: none;
  cursor: default;
}
.hcv-page-pill:disabled {
  opacity: 0.4;
  cursor: default;
}

/* Chapter navigation */
.hcv-chapter-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}
</style>

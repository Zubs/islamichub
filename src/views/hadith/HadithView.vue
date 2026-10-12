<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ bookName }}
        </div>
        <h1>
          {{
            notFound ? $t('hadith.notFound') : $t('hadith.hadithNumber', { number: hadithNumber })
          }}
        </h1>
        <p v-if="chapterName">{{ chapterName }}</p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 860px">
      <nav class="had-breadcrumb" :aria-label="$t('hadith.breadcrumb')">
        <RouterLink to="/hadith" class="had-breadcrumb-link">{{ $t('hadith.hadith') }}</RouterLink>
        <span class="had-sep" aria-hidden="true">/</span>
        <RouterLink to="/hadith/books" class="had-breadcrumb-link">{{
          $t('hadith.allBooks')
        }}</RouterLink>
        <template v-if="book">
          <span class="had-sep" aria-hidden="true">/</span>
          <RouterLink :to="'/hadith/books/' + bookSlug" class="had-breadcrumb-link">{{
            book.name
          }}</RouterLink>
        </template>
        <template v-if="chapterPath">
          <span class="had-sep" aria-hidden="true">/</span>
          <RouterLink :to="chapterPath" class="had-breadcrumb-link">{{
            $t('hadith.chapter', { a: hadith.chapter.chapterNumber })
          }}</RouterLink>
        </template>
      </nav>

      <div v-if="loading" class="had-loading" aria-live="polite">
        <div class="had-spinner" aria-hidden="true"></div>
        <span>{{ $t('hadith.loadingHadith') }}</span>
      </div>

      <div v-else-if="notFound" class="hv-missing">
        <p>
          {{ $t('hadith.thereIsNoHadithAtThis') }}
        </p>
        <RouterLink
          :to="book ? '/hadith/books/' + bookSlug : '/hadith/books'"
          class="btn btn-primary"
        >
          {{ book ? $t('hadith.browseBook', { name: book.name }) : $t('hadith.browseAll') }}
        </RouterLink>
      </div>

      <div v-else-if="error" class="had-error" role="alert">
        <div class="had-error-title">{{ $t('hadith.couldNotLoadThisHadith') }}</div>
        <div>{{ error }}</div>
        <div v-if="notConfigured" class="hv-error-note">
          {{ $t('hadith.set') }} <code>HADITH_API_KEY</code>
          {{ $t('hadith.whereTheSiteIsHostedSee') }}
        </div>
        <button class="btn btn-secondary hv-retry" @click="load">
          {{ $t('hadith.tryAgain') }}
        </button>
      </div>

      <article v-else-if="hadith" class="hv-card">
        <header class="hv-head">
          <span class="hv-number"># {{ hadith.hadithNumber }}</span>
          <span class="hv-status" :style="gradeStyle(hadith.status)">{{
            gradeLabel(hadith.status)
          }}</span>
        </header>

        <p v-if="hadith.hadithArabic" class="hv-arabic" lang="ar" dir="rtl">
          {{ hadith.hadithArabic }}
        </p>

        <div class="hv-english">
          <p v-if="hadith.englishNarrator" class="hv-narrator">{{ hadith.englishNarrator }}</p>
          <p class="hv-text">{{ hadith.hadithEnglish }}</p>
        </div>

        <footer class="hv-foot">
          <div class="hv-ref">
            <span class="hv-ref-label">{{ $t('hadith.reference') }}</span>
            {{ $t('hadith.hadith2', { a: bookName, b: hadith.hadithNumber }) }}
            <template v-if="chapterName"> · {{ chapterName }}</template>
          </div>
          <div class="hv-actions">
            <button class="btn btn-secondary" @click="copy">
              {{ notice === 'copied' ? $t('common.copied') : $t('common.copy') }}
            </button>
            <ShareButton :item="shareable" />
          </div>
        </footer>
      </article>

      <nav v-if="hadith && !notFound" class="hv-nav" :aria-label="$t('hadith.hadithNavigation')">
        <RouterLink v-if="previousPath" :to="previousPath" class="btn btn-secondary">{{
          $t('hadith.hadith3', { a: Number(hadithNumber) - 1 })
        }}</RouterLink>
        <RouterLink v-if="chapterPath" :to="chapterPath" class="btn btn-secondary hv-nav-middle">{{
          $t('hadith.backToChapter')
        }}</RouterLink>
        <RouterLink v-if="nextPath" :to="nextPath" class="btn btn-secondary">{{
          $t('hadith.hadith4', { a: Number(hadithNumber) + 1 })
        }}</RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useDataTranslations } from '@/composables/useContent.js'
import { ref, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import ShareButton from '@/components/ShareButton.vue'
import GeoPattern from '@/components/GeoPattern.vue'
import { fetchHadith, BOOKS_META, loadErrorMessage } from '@/composables/useHadithApi.js'
import {
  gradeStyle,
  gradeLabel,
  isHadithNumber,
  hadithPath,
  hadithCopyText,
  lastHadithNumber,
  summarise,
} from '@/utils/hadith.js'

const NOTICE_MS = 2000

const route = useRoute()
const bookText = useDataTranslations('hadithBooks')

function localizedBook(found) {
  return found ? bookText.localized(found) : null
}
const bookSlug = computed(() => route.params.bookSlug)
const hadithNumber = computed(() => route.params.hadithNumber)
const book = computed(() => localizedBook(BOOKS_META.find((b) => b.slug === bookSlug.value)))
const bookName = computed(() => book.value?.name || 'Hadith library')

const loading = ref(false)
const error = ref(null)
const notConfigured = ref(false)
const notFound = ref(false)
const hadith = ref(null)
const notice = ref(null)

const chapterName = computed(() => hadith.value?.chapter?.chapterEnglish || '')
const chapterPath = computed(() => {
  const chapterNumber = hadith.value?.chapter?.chapterNumber
  return chapterNumber ? `/hadith/books/${bookSlug.value}/${chapterNumber}` : null
})
const previousPath = computed(() =>
  Number(hadithNumber.value) > 1
    ? hadithPath(bookSlug.value, Number(hadithNumber.value) - 1)
    : null,
)
const nextPath = computed(() => {
  const last = lastHadithNumber(book.value)
  return last === null || Number(hadithNumber.value) < last
    ? hadithPath(bookSlug.value, Number(hadithNumber.value) + 1)
    : null
})

useSeo({
  title: () => {
    if (notFound.value) {
      return 'Hadith not found | IslamicHub'
    }

    const chapter = chapterName.value ? ` — ${chapterName.value}` : ''
    return `${bookName.value} ${hadithNumber.value}${chapter} | IslamicHub`
  },
  description: () =>
    hadith.value
      ? summarise(hadith.value.hadithEnglish)
      : `Hadith ${hadithNumber.value} of ${bookName.value}, with Arabic text, translation, grade and chapter.`,
  noindex: notFound,
})

async function load() {
  hadith.value = null
  error.value = null
  notConfigured.value = false
  notFound.value = !book.value || !isHadithNumber(hadithNumber.value)
  if (notFound.value) {
    return
  }

  loading.value = true
  try {
    const data = await fetchHadith(bookSlug.value, hadithNumber.value)
    const found = (data.hadiths?.data || []).find(
      (candidate) => String(candidate.hadithNumber) === String(hadithNumber.value),
    )
    hadith.value = found || null
    notFound.value = !found
  } catch (e) {
    notConfigured.value = !!e.notConfigured
    error.value = loadErrorMessage(e)
  } finally {
    loading.value = false
  }
}

function showNotice(kind) {
  notice.value = kind
  setTimeout(() => {
    notice.value = null
  }, NOTICE_MS)
}

async function copy() {
  await navigator.clipboard?.writeText(hadithCopyText(hadith.value, bookName.value)).catch(() => {})
  showNotice('copied')
}

const shareable = computed(() => ({
  arabic: hadith.value.hadithArabic,
  translation: hadith.value.hadithEnglish,
  reference: `${bookName.value} ${hadith.value.hadithNumber}`,
  path: route.path,
}))

watch([bookSlug, hadithNumber], load, { immediate: true })
</script>

<style scoped>
.had-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--muted);
  margin: var(--space-6) 0 var(--space-8);
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

.had-loading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--muted);
  font-size: 14px;
  padding: var(--space-8) 0;
}

.had-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: hv-spin 0.7s linear infinite;
}

@keyframes hv-spin {
  to {
    transform: rotate(360deg);
  }
}

.had-error {
  background: #fde9e7;
  border: 1px solid #f0b0a8;
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  font-size: 13.5px;
  color: #7a1a1a;
  margin-bottom: var(--space-6);
}

.had-error-title {
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.hv-error-note,
.hv-retry {
  margin-top: var(--space-3);
}

.hv-missing {
  display: grid;
  gap: var(--space-4);
  justify-items: start;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: var(--space-8);
}

.hv-card {
  background: #fff;
  border: 1px solid var(--gold);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.hv-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  border-bottom: 1px solid var(--border);
}

.hv-number {
  font-weight: 600;
  color: var(--ink);
}

.hv-status {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 100px;
}

.hv-arabic {
  font-family: var(--arabic);
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
  line-height: 2.1;
  color: var(--ink);
  padding: var(--space-4) var(--space-5);
  text-align: right;
  overflow-wrap: anywhere;
}

.hv-english {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border);
}

.hv-narrator {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: var(--space-2);
}

.hv-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--ink);
  overflow-wrap: anywhere;
}

.hv-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-5);
  border-top: 1px solid var(--border);
}

.hv-ref {
  font-size: 12.5px;
  color: var(--muted);
}

.hv-ref-label {
  font-weight: 600;
  margin-right: var(--space-1);
}

.hv-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--space-2);
}

.hv-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin: var(--space-6) 0 var(--space-10);
}

.hv-nav-middle {
  margin-inline: auto;
}
</style>

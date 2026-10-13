import { t } from '@/i18n.js'

const BASE = '/api/hadith'
const OFFLINE_CACHE = 'islamichub-hadith'
const FORMER_HOST = 'hadithapi.com'

export function loadErrorMessage(error) {
  if (error.notConfigured) {
    return t('hadithApi.notConfigured')
  }

  if (navigator.onLine === false) {
    return t('hadithApi.offline')
  }

  return error.status ? t('hadithApi.failed', { status: error.status }) : error.message
}

function buildUrl(path, params = {}) {
  const query = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') {
      query.set(k, v)
    }
  }

  const text = query.toString()
  return `${BASE}${path}${text ? `?${text}` : ''}`
}

// Pages stored for offline use before the proxy existed were kept under hadithapi.com addresses.
async function storedBeforeProxy(path, params) {
  if (!('caches' in globalThis)) {
    return null
  }

  const wanted = new URLSearchParams(buildUrl(path, params).split('?')[1] ?? '')
  wanted.sort()
  const cache = await caches.open(OFFLINE_CACHE)
  for (const request of await cache.keys()) {
    const address = new URL(request.url)
    address.searchParams.delete('apiKey')
    address.searchParams.sort()
    const matches =
      address.hostname === FORMER_HOST &&
      address.pathname === `/api${path}` &&
      address.searchParams.toString() === wanted.toString()
    if (matches) {
      return (await cache.match(request)).json()
    }
  }

  return null
}

async function request(path, params) {
  const res = await fetch(buildUrl(path, params))
  if (res.ok) {
    return res.json()
  }

  const body = await res.json().catch(() => ({}))
  const error = new Error(`The hadith library could not be loaded (${res.status}).`)
  error.status = res.status
  error.notConfigured = body.error === 'not_configured'
  throw error
}

async function get(path, params = {}) {
  try {
    return await request(path, params)
  } catch (error) {
    const stored = error.notConfigured
      ? null
      : await storedBeforeProxy(path, params).catch(() => null)
    if (stored) {
      return stored
    }

    throw error
  }
}

// ── Books ──────────────────────────────────────────────────────────────────
// Returns: { status, books: [{ id, bookName, writerName, writerDeath, aboutWriter, aboutBook, hadithCount, ... }] }
export async function fetchBooks() {
  return get('/books')
}

// ── Chapters ───────────────────────────────────────────────────────────────
// Returns: { status, book: {...}, chapters: [{ id, bookSlug, chapterNumber, chapterEnglish, chapterUrdu, chapterArabic, hadithCount }] }
export async function fetchChapters(bookSlug, { paginate } = {}) {
  return get(`/${bookSlug}/chapters`, { paginate })
}

// ── Hadiths ────────────────────────────────────────────────────────────────
// Returns: { status, hadiths: { current_page, data: [...], last_page, total, ... } }
export async function fetchHadiths(params = {}) {
  // params: { book, chapter, hadithNumber, hadithEnglish, status, paginate, page }
  return get('/hadiths', { paginate: 25, ...params })
}

// ── Single hadith by number ────────────────────────────────────────────────
export async function fetchHadith(bookSlug, hadithNumber) {
  return get('/hadiths', { book: bookSlug, hadithNumber, paginate: 1 })
}

export { BOOKS_META } from '@/data/hadithBooks.js'

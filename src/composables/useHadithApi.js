const BASE = 'https://hadithapi.com/api'

function key() {
  return import.meta.env.VITE_HADITH_API_KEY || ''
}

function buildUrl(path, params = {}) {
  const u = new URL(`${BASE}${path}`)
  u.searchParams.set('apiKey', key())
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') {
      u.searchParams.set(k, v)
    }
  }

  return u.toString()
}

async function get(path, params = {}) {
  const url = buildUrl(path, params)
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`hadithapi ${res.status}: ${text.slice(0, 120)}`)
  }

  return res.json()
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

// ── Known book metadata (static — avoids unnecessary API calls) ────────────
export const BOOKS_META = [
  {
    slug: 'sahih-bukhari',
    name: 'Sahih Al-Bukhari',
    arabicName: 'صحيح البخاري',
    author: "Imam Muhammad ibn Isma'il al-Bukhari",
    death: '256 AH / 870 CE',
    grade: 'Sahih',
    gradeColor: 'var(--green)',
    gradeBg: 'var(--green-light)',
    hadithCount: '7563',
    about:
      "The most authentic book after the Qur'an, according to the majority of Sunni scholars. Al-Bukhari examined over 600,000 hadith and selected only those that met his exceptionally rigorous conditions — each narrator must have provably met the next in the chain and been known for precision.",
  },
  {
    slug: 'sahih-muslim',
    name: 'Sahih Muslim',
    arabicName: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj al-Naysaburi',
    death: '261 AH / 875 CE',
    grade: 'Sahih',
    gradeColor: 'var(--green)',
    gradeBg: 'var(--green-light)',
    hadithCount: '7563',
    about:
      'The second most authentic hadith collection. Muslim organised his work thematically — each topic groups all related narrations together, making it especially useful for fiqh research. He also prefaced it with a detailed discussion of hadith methodology.',
  },
  {
    slug: 'al-tirmidhi',
    name: "Jami' Al-Tirmidhi",
    arabicName: 'جامع الترمذي',
    author: 'Imam Muhammad ibn Isa al-Tirmidhi',
    death: '279 AH / 892 CE',
    grade: "Sahih / Hasan / Da'eef",
    gradeColor: '#7A5A10',
    gradeBg: 'var(--gold-light)',
    hadithCount: '3956',
    about:
      "Unique for classifying every hadith with its own grade (sahih, hasan, da'eef). Al-Tirmidhi also notes scholarly disagreements and mentions which scholars acted on each narration, making it invaluable for comparative fiqh.",
  },
  {
    slug: 'abu-dawood',
    name: 'Sunan Abu Dawood',
    arabicName: 'سنن أبي داود',
    author: "Imam Sulayman ibn al-Ash'ath Abu Dawood",
    death: '275 AH / 889 CE',
    grade: "Sahih / Hasan / Da'eef",
    gradeColor: '#7A5A10',
    gradeBg: 'var(--gold-light)',
    hadithCount: '5274',
    about:
      'Contains 5,274 hadith selected from 500,000. Abu Dawood focused heavily on legal (fiqh) narrations and is considered the primary reference for Islamic jurisprudence alongside Sahih Bukhari. He noted weak hadith where stronger ones were not available.',
  },
  {
    slug: 'ibn-e-majah',
    name: 'Sunan Ibn Majah',
    arabicName: 'سنن ابن ماجه',
    author: 'Imam Muhammad ibn Yazid Ibn Majah al-Qazwini',
    death: '273 AH / 887 CE',
    grade: "Sahih / Hasan / Da'eef",
    gradeColor: '#7A5A10',
    gradeBg: 'var(--gold-light)',
    hadithCount: '4341',
    about:
      'The sixth of the major six hadith collections (Al-Kutub Al-Sittah). Contains unique narrations not found in the other five. Includes a valuable chapter on jurisprudence and a preface on the authority of the Sunnah.',
  },
  {
    slug: 'sunan-nasai',
    name: "Sunan An-Nasa'i",
    arabicName: 'سنن النسائي',
    author: "Imam Ahmad ibn Shu'ayb al-Nasa'i",
    death: '303 AH / 915 CE',
    grade: "Sahih / Hasan / Da'eef",
    gradeColor: '#7A5A10',
    gradeBg: 'var(--gold-light)',
    hadithCount: '5761',
    about:
      "Known for its rigorous conditions — al-Nasa'i was stricter than Abu Dawood in rejecting narrators. His Al-Sunan Al-Kubra was later condensed into Al-Mujtaba (Al-Sunan Al-Sughra), which is the commonly transmitted version.",
  },
  {
    slug: 'mishkat',
    name: 'Mishkat Al-Masabih',
    arabicName: 'مشكاة المصابيح',
    author: 'Imam Wali al-Din Muhammad al-Khatib al-Tibrizi',
    death: '741 AH / 1340 CE',
    grade: 'Compiled collection',
    gradeColor: 'var(--muted)',
    gradeBg: 'var(--cream-dark)',
    hadithCount: '6294',
    about:
      'An expanded and reorganised version of Masabih al-Sunnah by al-Baghawi. Al-Tibrizi added chain of transmission information and grading notes. Widely used as a teaching text in madrasas across South Asia and beyond.',
  },
  {
    slug: 'musnad-ahmad',
    name: 'Musnad Ahmad',
    arabicName: 'مسند أحمد',
    author: 'Imam Ahmad ibn Muhammad ibn Hanbal al-Shaybani',
    death: '241 AH / 855 CE',
    grade: 'Mixed',
    gradeColor: 'var(--muted)',
    gradeBg: 'var(--cream-dark)',
    hadithCount: '27647',
    about:
      "One of the largest hadith collections, organised by Companion narrator rather than by topic. Contains over 27,000 narrations. Imam Ahmad reportedly said he only included hadith that could serve as evidence. Analysed and graded extensively by Shu'ayb al-Arna'ut in the 20th century.",
  },
  {
    slug: 'al-silsila-sahiha',
    name: 'Al-Silsila Al-Sahiha',
    arabicName: 'السلسلة الصحيحة',
    author: 'Sheikh Muhammad Nasir al-Din al-Albani',
    death: '1420 AH / 1999 CE',
    grade: 'Sahih',
    gradeColor: 'var(--green)',
    gradeBg: 'var(--green-light)',
    hadithCount: '4035',
    about:
      "A modern collection of authentic hadith compiled by Sheikh al-Albani, one of the 20th century's foremost hadith scholars. Each hadith is accompanied by a detailed chain analysis justifying its grading. Complements his Al-Silsila Al-Da'eefa (weak hadith collection).",
  },
]

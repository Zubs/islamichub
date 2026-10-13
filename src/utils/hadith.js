const GRADE_STYLES = {
  Sahih: { background: 'var(--green-light)', color: 'var(--green)' },
  Hasan: { background: 'var(--gold-light)', color: '#7A5A10' },
  "Da'eef": { background: '#FDE9E7', color: '#c0392b' },
  Daif: { background: '#FDE9E7', color: '#c0392b' },
  Mawdu: { background: '#fde8e8', color: '#922b21' },
}
const UNGRADED_STYLE = { background: 'var(--cream-dark)', color: 'var(--muted)' }

export function gradeStyle(status) {
  return GRADE_STYLES[status] || UNGRADED_STYLE
}

export function gradeLabel(status) {
  return status || 'Ungraded'
}

export function isHadithNumber(text) {
  return /^[1-9]\d{0,6}$/.test(String(text))
}

export function hadithPath(bookSlug, hadithNumber) {
  return `/hadith/books/${bookSlug}/hadith/${hadithNumber}`
}

export function hadithCopyText(hadith, bookName) {
  return `${hadith.hadithEnglish}\n\n— ${bookName}, Hadith ${hadith.hadithNumber}`
}

export function lastHadithNumber(book) {
  const count = Number(book?.hadithCount)
  return Number.isInteger(count) && count > 0 ? count : null
}

export function summarise(text, limit = 155) {
  const clean = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim()
  return clean.length <= limit ? clean : `${clean.slice(0, limit - 1).trimEnd()}…`
}

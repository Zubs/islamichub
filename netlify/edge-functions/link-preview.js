// Gives hadith, dua and adhkar addresses their own title, description and preview image.
// Services such as WhatsApp read a link's page without running its scripts, so the head
// the app sets in the browser never reaches them.
import { BOOKS_META } from '../../src/composables/useHadithApi.js'
import { DUA_SITUATIONS, DUAS } from '../../src/data/duas.js'
import { ADHKAR_CATEGORIES } from '../../src/data/adhkar.js'

const SITE = 'https://islamichub.xyz'
const IMAGE = `${SITE}/og-image.png`
const SUFFIX = ' | IslamicHub'

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Returns { title, description } for an address this function knows, or null.
export function previewFor(pathname) {
  const path = pathname.replace(/\/+$/, '')

  const hadith = path.match(/^\/hadith\/books\/([a-z0-9-]+)\/hadith\/([1-9]\d{0,6})$/)
  if (hadith) {
    const book = BOOKS_META.find((entry) => entry.slug === hadith[1])
    return book
      ? {
          title: `${book.name} ${hadith[2]}`,
          description: `Hadith ${hadith[2]} of ${book.name}, with its Arabic text, translation, grade and chapter.`,
        }
      : null
  }

  const duas = path.match(/^\/duas\/([a-z-]+)$/)
  if (duas) {
    const situation = DUA_SITUATIONS.find((entry) => entry.slug === duas[1])
    const count = DUAS.filter((dua) => dua.situations.includes(duas[1])).length
    return situation
      ? {
          title: `Duas for ${situation.name}`,
          description: `${count} supplications from the Qur'an and the Sunnah: ${situation.description.toLowerCase()}. Arabic, transliteration, translation and source.`,
        }
      : null
  }

  const adhkar = path.match(/^\/adhkar\/([a-z-]+)$/)
  if (adhkar) {
    const category = ADHKAR_CATEGORIES.find((entry) => entry.slug === adhkar[1])
    return category ? { title: category.name, description: category.description } : null
  }

  return null
}

export function withPreview(html, preview, address) {
  const title = escapeHtml(preview.title + SUFFIX)
  const description = escapeHtml(preview.description)
  const tags = [
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="IslamicHub">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${escapeHtml(address)}">`,
    `<meta property="og:image" content="${IMAGE}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ].join('\n    ')

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description"[\s\S]*?>/,
      `<meta name="description" content="${description}">`,
    )
    .replace(/\s*<meta property="og:[^>]*>/g, '')
    .replace(/\s*<meta name="twitter:card"[^>]*>/g, '')
    .replace('</head>', `    ${tags}\n</head>`)
}

export default async function linkPreview(request, context) {
  const response = await context.next()
  const address = new URL(request.url)
  const preview = previewFor(address.pathname)
  const isPage = (response.headers.get('content-type') ?? '').includes('text/html')
  if (!preview || !isPage) {
    return response
  }

  const page = withPreview(await response.text(), preview, SITE + address.pathname)
  const headers = new Headers(response.headers)
  headers.delete('content-length')
  return new Response(page, { status: response.status, headers })
}

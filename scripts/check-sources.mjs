// Checks the site's religious content against the open fawazahmed0 Qur'an and hadith datasets.
// Run by hand when content changes (it needs the network the first time):
//   node scripts/check-sources.mjs            verse Arabic and unmapped Sahih Muslim numbers
//   node scripts/check-sources.mjs --hadith   also print every cited hadith beside its citation
// The datasets are kept in .cache/sources, which git ignores.
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { createServer } from 'vite'

const ROOT = resolve(import.meta.dirname, '..')
const CACHE = resolve(ROOT, '.cache/sources')
const QURAN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions'
const HADITH = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions'
const BOOKS = {
  'sahih-bukhari': 'bukhari',
  'sahih-muslim': 'muslim',
  'abu-dawood': 'abudawud',
  'al-tirmidhi': 'tirmidhi',
  'sunan-nasai': 'nasai',
  'ibn-e-majah': 'ibnmajah',
}
const VERSE_REFERENCE = /Qur[’']an (\d+):(\d+)(?:-(\d+))?/
const AYAH_MARK = /﴿[^﴾]*﴾/g
const SHOW_HADITH = process.argv.includes('--hadith')

async function cached(name, url) {
  const file = resolve(CACHE, name)
  if (!existsSync(file)) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`${url} answered ${response.status}`)
    }
    await writeFile(file, await response.text())
  }
  return JSON.parse(await readFile(file, 'utf8'))
}

// Unicode allows the same marks in more than one order (shadda before or after a vowel), so both
// sides are normalised before they are compared.
function plain(text) {
  return text.normalize('NFC').replace(AYAH_MARK, ' ').replace(/\s+/g, ' ').trim()
}

async function quranText() {
  const edition = await cached('ara-quransimple.json', `${QURAN}/ara-quransimple.min.json`)
  const verses = new Map()
  for (const { chapter, verse, text } of edition.quran) {
    verses.set(`${chapter}:${verse}`, text)
  }
  return verses
}

function verseText(verses, surah, first, last) {
  const parts = []
  for (let ayah = first; ayah <= last; ayah += 1) {
    const text = verses.get(`${surah}:${ayah}`)
    if (!text) {
      return null
    }
    const basmalah = plain('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ')
    const verse = plain(text)
    parts.push(ayah === 1 && surah !== 1 && verse.startsWith(basmalah) ? verse.slice(basmalah.length) : verse)
  }
  return plain(parts.join(' '))
}

async function hadithText(book) {
  const name = BOOKS[book]
  if (!name) {
    return null
  }
  const edition = await cached(`eng-${name}.json`, `${HADITH}/eng-${name}.min.json`)
  return edition.hadiths
}

// Every verse block and every string in the content and data files, with where it came from.
async function contentOf(server) {
  const files = [
    ...(await readdir(resolve(ROOT, 'src/data')))
      .filter((file) => file.endsWith('Sections.js') || file.endsWith('Places.js'))
      .map((file) => `/src/data/${file}`),
    ...(await readdir(resolve(ROOT, 'src/data/content'))).map((page) => `/src/data/content/${page}/en.js`),
  ]
  if (existsSync(resolve(ROOT, 'src/data/games'))) {
    files.push(...(await readdir(resolve(ROOT, 'src/data/games'))).map((file) => `/src/data/games/${file}`))
  }

  const blocks = []
  const strings = []
  // A quotation of the Qur'an: a verse section, a recitation inside a step, or a game item's verse.
  // A recitation marked `derived` is wording taken from a verse rather than a quotation of it.
  function isQuotation(value, parentKey) {
    return (
      value.type === 'verse' ||
      (parentKey === 'recitations' && !value.derived) ||
      typeof value.verseArabic === 'string'
    )
  }

  function walk(value, file, parentKey) {
    if (typeof value === 'string') {
      strings.push({ file, text: value })
    } else if (Array.isArray(value)) {
      value.forEach((item) => walk(item, file, parentKey))
    } else if (value && typeof value === 'object') {
      const arabic = value.verseArabic ?? value.arabic
      const reference = value.reference
      if (isQuotation(value, parentKey) && VERSE_REFERENCE.test(reference ?? '')) {
        blocks.push({ file, arabic, reference })
      }
      Object.entries(value).forEach(([key, item]) => walk(item, file, key))
    }
  }

  for (const file of files) {
    const module = await server.ssrLoadModule(file)
    walk(Object.values(module), file)
  }
  return { blocks, strings }
}

async function main() {
  await mkdir(CACHE, { recursive: true })
  const server = await createServer({
    root: ROOT,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  })
  let problems = 0
  try {
    const { blocks, strings } = await contentOf(server)
    const { hadithRefsIn } = await server.ssrLoadModule('/src/utils/hadithRefs.js')
    const { HADITH_NUMBER_MAP } = await server.ssrLoadModule('/src/data/hadithNumbering.js')

    const verses = await quranText()
    for (const block of blocks) {
      const [, surah, first, last] = block.reference.match(VERSE_REFERENCE).map(Number)
      const expected = verseText(verses, surah, first, last || first)
      if (expected === null) {
        problems += 1
        console.log(`✗ ${block.file}: ${block.reference} is not a verse`)
      } else if (!expected.includes(plain(block.arabic))) {
        problems += 1
        console.log(`✗ ${block.file}: the Arabic for ${block.reference} does not match the dataset`)
        console.log(`    site:    ${plain(block.arabic)}`)
        console.log(`    dataset: ${expected}`)
      }
    }
    console.log(`Verse blocks checked: ${blocks.length}`)

    const cited = new Map()
    for (const { file, text } of strings) {
      for (const ref of hadithRefsIn(text)) {
        const key = `${ref.book} ${ref.number}`
        // prefer the sentence that cites it over a bare reference in a sections file
        if (!cited.has(key) || cited.get(key).around.length < text.length) {
          cited.set(key, { ...ref, file, around: text })
        }
      }
    }

    for (const ref of cited.values()) {
      const hadiths = await hadithText(ref.book)
      if (!hadiths) {
        continue
      }
      const byArabic = ref.book === 'sahih-muslim'
      const found = hadiths.find((hadith) =>
        byArabic
          ? Math.floor(Number(hadith.arabicnumber)) === ref.number
          : hadith.hadithnumber === ref.number,
      )
      if (!found) {
        problems += 1
        console.log(`✗ ${ref.file}: ${ref.text} is not in the dataset`)
        continue
      }
      if (byArabic && !HADITH_NUMBER_MAP['sahih-muslim'][ref.number]) {
        problems += 1
        console.log(`✗ ${ref.text} has no library number; the dataset counts it as ${found.hadithnumber}`)
      }
      if (SHOW_HADITH) {
        console.log(`\n${ref.text} (${ref.file})`)
        console.log(`  cited in: ${ref.around.slice(0, 300)}`)
        console.log(`  dataset:  ${found.text.slice(0, 600)}`)
      }
    }
    console.log(`Hadith references checked: ${cited.size}`)
  } finally {
    await server.close()
  }

  console.log(problems ? `${problems} problem(s) found` : 'No problems found')
  process.exitCode = problems ? 1 : 0
}

await main()

// Requests every hadith the site cites through the hadith proxy and fails on any not found.
// Skipped unless a base address is given:
//   CITATIONS_BASE=http://localhost:8888 npx vitest run test/citations.live.test.js
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { hadithRefsIn, libraryNumber } from '@/utils/hadithRefs.js'

const BASE = process.env.CITATIONS_BASE
const NOT_CONTENT = ['src/composables/useHadithApi.js', 'src/views/ChangelogView.vue']

function sourceFiles(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name)
    if (entry.isDirectory()) {
      return sourceFiles(path)
    }

    return /\.(vue|js)$/.test(entry.name) && !entry.name.includes('.test.') ? [path] : []
  })
}

export function citedHadiths() {
  const cited = new Map()
  for (const file of sourceFiles('src').filter((path) => !NOT_CONTENT.includes(path))) {
    for (const { book, number } of hadithRefsIn(readFileSync(file, 'utf8'))) {
      cited.set(`${book} ${number}`, { book, number, file })
    }
  }

  return [...cited.values()]
}

describe('cited hadiths', () => {
  it('finds the citations the site makes', () => {
    expect(citedHadiths().length).toBeGreaterThan(35)
  })

  describe.skipIf(!BASE)('in the library', () => {
    it.each(citedHadiths())('$book $number (cited in $file) is found', async ({ book, number }) => {
      const wanted = String(libraryNumber(book, number))
      const reply = await fetch(
        `${BASE}/api/hadith/hadiths?book=${book}&hadithNumber=${wanted}&paginate=1`,
      )
      const data = await reply.json()
      const numbers = (data.hadiths?.data ?? []).map((hadith) => String(hadith.hadithNumber))

      expect(numbers).toContain(wanted)
    })
  })
})

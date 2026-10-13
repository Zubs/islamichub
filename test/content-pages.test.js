// Every content page must read exactly as it did before its writing moved into content files.
// The fixtures in test/fixtures/pages hold each page's text as it was. To record them again
// after an intended change of wording: CAPTURE_PAGES=1 npx vitest run test/content-pages.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import App from '@/App.vue'
import { mountPage } from './mountPage.js'

export const CONTENT_PAGES = {
  home: '/',
  faith: '/faith',
  articlesOfFaith: '/faith/articles',
  prayer: '/prayer',
  zakat: '/zakat',
  fasting: '/fasting',
  hajj: '/hajj',
  hadith: '/hadith',
  inheritance: '/inheritance',
  about: '/about',
}

export async function pageText(path) {
  const { wrapper } = await mountPage(App, { path })
  await vi.dynamicImportSettled()
  await flushPromises()
  const main = wrapper.find('main')
  const text = main.element.textContent.replace(/\s+/g, ' ').trim()
  wrapper.unmount()
  return text
}

// Spacing between blocks changes with how a template is written; the wording must not.
function wording(text) {
  return text.replace(/\s+/g, '')
}

function fixturePath(name) {
  return resolve(process.cwd(), 'test/fixtures/pages', `${name}.txt`)
}

describe('content pages read as they did', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 3, 10, 9, 0))
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it.each(Object.entries(CONTENT_PAGES))('%s', async (name, path) => {
    const text = await pageText(path)
    if (process.env.CAPTURE_PAGES) {
      writeFileSync(fixturePath(name), `${text}\n`)
    }

    expect(existsSync(fixturePath(name))).toBe(true)
    expect(wording(text)).toBe(wording(readFileSync(fixturePath(name), 'utf8')))
  })
})

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '@/router/index.js'
import { SITE_URL } from '@/composables/useSeo.js'
import { ADHKAR_CATEGORIES } from '@/data/adhkar.js'
import { LOCALES } from '@/locales/index.js'
import { localePath } from '@/utils/locale.js'

const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const listedPaths = listed.map((address) => address.slice(SITE_URL.length) || '/')
const fixedPaths = routes
  .map((route) => route.path)
  .filter((path) => !path.includes(':') && !path.includes('*'))
const router = createRouter({ history: createMemoryHistory(), routes })

describe('sitemap', () => {
  it('lists only addresses on the site', () => {
    expect(listed.every((address) => address.startsWith(SITE_URL))).toBe(true)
  })

  it.each(fixedPaths)('lists the fixed route %s', (path) => {
    expect(listedPaths).toContain(path === '/' ? '/' : path)
  })

  it.each(listedPaths)('lists %s, which the router serves', (path) => {
    expect(router.resolve(path).name).not.toBe('not-found')
  })

  it('lists no address twice', () => {
    expect(new Set(listedPaths).size).toBe(listedPaths.length)
  })

  it('lists every adhkar category and no unknown one', () => {
    const categories = listedPaths
      .filter((path) => path.startsWith('/adhkar/'))
      .map((path) => path.slice('/adhkar/'.length))

    expect(categories.sort()).toEqual(ADHKAR_CATEGORIES.map((category) => category.slug).sort())
  })

  it("lists every page of a complete language under its prefix, and none of an incomplete one's", () => {
    const englishPaths = listedPaths.filter(
      (path) =>
        !LOCALES.some((locale) => locale.code !== 'en' && path.startsWith(`/${locale.code}`)),
    )

    for (const locale of LOCALES.filter((entry) => entry.code !== 'en')) {
      const own = listedPaths.filter(
        (path) => path === `/${locale.code}` || path.startsWith(`/${locale.code}/`),
      )
      const expected = locale.complete
        ? englishPaths.map((path) => localePath(path, locale.code))
        : []

      expect(own.sort(), locale.code).toEqual(expected.sort())
    }
  })
})

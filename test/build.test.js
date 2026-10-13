import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdtempSync, rmSync, readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { build } from 'vite'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '@/router/index.js'

const HOME_PAGE_LIMIT_BYTES = 600 * 1024
const SERVER_KEY = 'server-only-key-51c7'
const FORMER_CLIENT_KEY = 'former-client-key-88d2'

let dist

function read(path) {
  return readFileSync(join(dist, path), 'utf8')
}

function size(path) {
  return statSync(join(dist, path)).size
}

function localAddresses(html) {
  return [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css))"/g)].map((match) => match[1])
}

function staticImports(script, seen = new Set()) {
  if (seen.has(script)) {
    return seen
  }

  seen.add(script)
  const source = read(script)
  const imports = [...source.matchAll(/(?:from|import)\s*"\.\/([^"]+\.js)"/g)].map(
    (match) => `/assets/${match[1]}`,
  )
  const dynamic = new Set(
    [...source.matchAll(/import\("\.\/([^"]+\.js)"\)/g)].map((match) => `/assets/${match[1]}`),
  )
  imports.filter((path) => !dynamic.has(path)).forEach((path) => staticImports(path, seen))
  return seen
}

describe('built site', () => {
  beforeAll(async () => {
    dist = mkdtempSync(join(tmpdir(), 'islamichub-build-'))
    process.env.HADITH_API_KEY = SERVER_KEY
    process.env.VITE_HADITH_API_KEY = FORMER_CLIENT_KEY
    await build({ logLevel: 'silent', build: { outDir: dist, emptyOutDir: true } })
  }, 120000)

  afterAll(() => {
    rmSync(dist, { recursive: true, force: true })
    delete process.env.HADITH_API_KEY
    delete process.env.VITE_HADITH_API_KEY
  })

  function builtFiles(folder = '') {
    return readdirSync(join(dist, folder), { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory() ? builtFiles(join(folder, entry.name)) : [join(folder, entry.name)],
    )
  }

  it('holds the hadith API key in no built file', () => {
    const files = builtFiles()

    expect(files.length).toBeGreaterThan(20)
    for (const file of files) {
      const content = readFileSync(join(dist, file), 'latin1')
      expect(content.includes(SERVER_KEY) || content.includes(FORMER_CLIENT_KEY), file).toBe(false)
      expect(content.includes('hadithapi.com/api'), file).toBe(false)
    }
  })

  it('contains the worker at the old address, its clean-up script and the manifest', () => {
    expect(existsSync(join(dist, 'service-worker.js'))).toBe(true)
    expect(read('service-worker.js')).toMatch(
      /importScripts\(\s*"\/sw-legacy\.js",\s*"\/sw-notifications\.js"\s*\)/,
    )
    expect(existsSync(join(dist, 'sw-legacy.js'))).toBe(true)
    expect(existsSync(join(dist, 'manifest.webmanifest'))).toBe(true)
  })

  it('contains nothing from the old app', () => {
    for (const file of ['site.webmanifest', '_redirects', 'CHANGELOG.md', 'CONTRIBUTING.md']) {
      expect(existsSync(join(dist, file))).toBe(false)
    }
  })

  it('names only icons that exist, at 192px and 512px with a maskable one', () => {
    const manifest = JSON.parse(read('manifest.webmanifest'))

    for (const icon of manifest.icons) {
      expect(existsSync(join(dist, icon.src))).toBe(true)
    }
    expect(manifest.icons.map((icon) => icon.sizes)).toEqual(['192x192', '512x512', '512x512'])
    expect(manifest.icons.some((icon) => icon.purpose === 'maskable')).toBe(true)
    expect(manifest.theme_color).toBe('#1b5c42')
  })

  it('has clean shortcut addresses the site serves, for Prayer, Adhkar and Tasbih', () => {
    const manifest = JSON.parse(read('manifest.webmanifest'))
    const router = createRouter({ history: createMemoryHistory(), routes })
    const addresses = manifest.shortcuts.map((shortcut) => shortcut.url)

    expect(addresses).toEqual(expect.arrayContaining(['/prayer', '/adhkar', '/tasbih', '/tracker']))
    for (const address of addresses) {
      expect(address).not.toContain('#')
      expect(router.resolve(address).name).not.toBe('not-found')
    }
  })

  it('stores every script and stylesheet for offline use, so every route opens', () => {
    const worker = read('service-worker.js')
    const assets = readdirSync(join(dist, 'assets')).filter((file) => /\.(js|css)$/.test(file))

    expect(assets.length).toBeGreaterThan(routes.length)
    for (const asset of assets) {
      expect(worker).toContain(`assets/${asset}`)
    }
    expect(worker).toContain('index.html')
  })

  it('downloads no more than 600 KB on a first visit to the home page', () => {
    const html = read('index.html')
    const entry = localAddresses(html).filter((path) => path.endsWith('.js'))
    const styles = localAddresses(html).filter((path) => path.endsWith('.css'))
    const home = readdirSync(join(dist, 'assets')).find((file) => /^HomeView-.*\.js$/.test(file))
    const scripts = new Set()
    for (const script of [...entry, `/assets/${home}`]) {
      staticImports(script, scripts)
    }
    const homeStyles = readdirSync(join(dist, 'assets'))
      .filter((file) => /^HomeView-.*\.css$/.test(file))
      .map((file) => `/assets/${file}`)

    const total =
      size('index.html') +
      [...scripts, ...styles, ...homeStyles].reduce((sum, path) => sum + size(path), 0)

    expect(home).toBeDefined()
    expect(total).toBeLessThanOrEqual(HOME_PAGE_LIMIT_BYTES)
  })

  it("does not load other pages' code with the home page", () => {
    const html = read('index.html')
    const scripts = new Set()
    for (const script of localAddresses(html).filter((path) => path.endsWith('.js'))) {
      staticImports(script, scripts)
    }

    for (const page of ['ZakatView', 'HajjView', 'HadithChapterView', 'InheritanceView']) {
      expect([...scripts].some((path) => path.includes(page))).toBe(false)
    }
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'
import App from '@/App.vue'
import en from '@/locales/en.js'
import { addLocale, removeLocale, setLocale } from '@/i18n.js'
import { mountPage } from './mountPage.js'

const ROOT = process.cwd()
const RTL = { code: 'ar', name: 'العربية', intl: 'ar', dir: 'rtl', complete: true, messages: en }

// Styles that keep a physical side, and why. A selector or inline style is matched by its text.
const KEPT = [
  {
    match: /arabic|chap-ar|hc-urdu|direction: rtl/,
    reason: 'Arabic text is right-aligned in every language',
  },
  { match: /compass|transform-origin/, reason: 'a compass does not mirror' },
  { match: /toggle-switch|switch-slider/, reason: 'the knob travels by a physical transform' },
  { match: /left: 50%/, reason: 'centred with a physical offset and transform' },
  {
    match: /corner-ornament|ornament-hanging|nf-ornament/,
    reason: 'symmetric ornaments named by side',
  },
]
const PHYSICAL =
  /(?<![\w-])((?:margin|padding|border)-(?:left|right)(?:-(?:width|color|style))?|border-(?:top|bottom)-(?:left|right)-radius|left|right)\s*:|text-align\s*:\s*(?:left|right)|float\s*:\s*(?:left|right)/

function sourceFiles(folder) {
  return readdirSync(resolve(ROOT, folder), { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name)
    if (entry.isDirectory()) {
      return sourceFiles(path)
    }

    return /\.(css|vue)$/.test(entry.name) ? [path] : []
  })
}

function rules(css) {
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selector: match[1].trim(),
    declarations: match[2],
  }))
}

function styleBlocks(file) {
  const source = readFileSync(resolve(ROOT, file), 'utf8')
  if (file.endsWith('.css')) {
    return rules(source)
  }

  const scoped = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].flatMap((match) =>
    rules(match[1]),
  )
  const inline = [...source.matchAll(/(?<![:\w-])style="([^"]*)"/g)].map((match) => ({
    selector: 'inline',
    declarations: match[1],
  }))
  return [...scoped, ...inline]
}

function isKept(block) {
  return KEPT.some((kept) => kept.match.test(`${block.selector} ${block.declarations}`))
}

describe('physical sides in styles', () => {
  const blocks = sourceFiles('src').flatMap((file) =>
    styleBlocks(file).map((block) => ({ file, ...block })),
  )

  it('remain only in the listed exceptions', () => {
    const offenders = blocks
      .filter((block) => PHYSICAL.test(block.declarations) && !isKept(block))
      .map((block) => `${block.file} ${block.selector.slice(0, 50)}`)

    expect(offenders).toEqual([])
  })

  it('gives every exception a reason, and uses every one of them', () => {
    for (const kept of KEPT) {
      expect(kept.reason.length).toBeGreaterThan(10)
      expect(
        blocks.some(
          (block) =>
            PHYSICAL.test(block.declarations) &&
            kept.match.test(`${block.selector} ${block.declarations}`),
        ),
        String(kept.match),
      ).toBe(true)
    }
  })

  it('would catch a physical side added to a new style', () => {
    const added = { selector: '.new-card', declarations: 'margin-left: 8px;' }

    expect(PHYSICAL.test(added.declarations) && !isKept(added)).toBe(true)
    expect(PHYSICAL.test('margin-inline-start: 8px; inset-inline: 0; text-align: start;')).toBe(
      false,
    )
  })

  it('uses logical properties in the shared stylesheets', () => {
    const base = readFileSync(resolve(ROOT, 'src/assets/css/base.css'), 'utf8')
    const components = readFileSync(resolve(ROOT, 'src/assets/css/components.css'), 'utf8')

    expect(base).toContain('border-inline-start: 4px solid var(--gold)')
    expect(base).toContain('padding-inline-start: 24px')
    expect(components).toMatch(/\.site-nav \{[^}]*inset-inline: 0/)
  })
})

describe('what does not mirror', () => {
  const base = readFileSync(resolve(ROOT, 'src/assets/css/base.css'), 'utf8')

  it('draws the compass, the tasbih counter and times left to right in every language', () => {
    expect(base).toMatch(/\.compass-ring,\s*\.tsb-ring,\s*\.prayer-time \{\s*direction: ltr;/)
  })

  it('keeps Arabic verse text right to left and right-aligned', () => {
    expect(base).toMatch(
      /\.quran-arabic \{[^}]*direction: rtl;[^}]*text-align: right;|\.quran-arabic \{[^}]*text-align: right;[^}]*direction: rtl;/,
    )
  })

  it('isolates a reference inside right-to-left text', () => {
    expect(base).toMatch(/\.hadith-ref,\s*\.quran-ref \{\s*unicode-bidi: isolate;/)
  })

  it('mirrors only icons marked as pointing a direction', () => {
    expect(base).toMatch(/\[dir='rtl'\] \.flip-rtl \{\s*transform: scaleX\(-1\);/)
  })
})

describe('direction of the page', () => {
  afterEach(() => {
    removeLocale('ar')
    setLocale('en')
    vi.unstubAllGlobals()
  })

  async function open(path) {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('offline')
      }),
    )
    const mounted = await mountPage(App, { path })
    await vi.dynamicImportSettled()
    await flushPromises()
    return mounted
  }

  it('is left to right in English', async () => {
    await open('/faith')

    expect(document.documentElement.dir).toBe('ltr')
  })

  it('is right to left in a right-to-left language, with Arabic blocks unchanged', async () => {
    addLocale(RTL)
    const english = await open('/faith')
    const arabicBefore = english.wrapper.find('.quran-arabic').attributes()
    english.wrapper.unmount()

    const { wrapper } = await open('/ar/faith')

    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('ar')
    expect(wrapper.find('.quran-arabic').attributes()).toEqual(arabicBefore)
    expect(wrapper.find('.quran-arabic').attributes('lang')).toBe('ar')
  })

  it('lets a user of a right-to-left language use the Zakat calculator from start to finish', async () => {
    addLocale(RTL)
    const { wrapper } = await open('/ar/zakat')

    await wrapper.find('input[placeholder="0.00"]').setValue(1000000)

    expect(document.documentElement.dir).toBe('rtl')
    expect(
      wrapper
        .find('.rb-amount')
        .text()
        .replace(/[^\d٠-٩]/g, '').length,
    ).toBeGreaterThan(4)
    expect(wrapper.find('.pfx-wrap .pfx').exists()).toBe(true)
  })

  it('returns to left to right when the reader switches back', async () => {
    addLocale(RTL)
    await open('/ar/prayer')
    expect(document.documentElement.dir).toBe('rtl')

    setLocale('en')

    expect(document.documentElement.dir).toBe('ltr')
  })
})

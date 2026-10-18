import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import HomeView from '@/views/HomeView.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import App from '@/App.vue'
import { mountPage } from './mountPage.js'

const ROOT = process.cwd()

function sRGBtoLin(c) {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function luminance(r, g, b) {
  return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b)
}

function contrastRatio(rgb1, rgb2) {
  const l1 = luminance(...rgb1)
  const l2 = luminance(...rgb2)
  const max = Math.max(l1, l2)
  const min = Math.min(l1, l2)
  return (max + 0.05) / (min + 0.05)
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim()
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ]
}

function blend(fg, bg, alpha) {
  return [
    Math.round(fg[0] * alpha + bg[0] * (1 - alpha)),
    Math.round(fg[1] * alpha + bg[1] * (1 - alpha)),
    Math.round(fg[2] * alpha + bg[2] * (1 - alpha)),
  ]
}

function parseTokens() {
  const css = readFileSync(resolve(ROOT, 'src/assets/css/tokens.css'), 'utf8')
  const tokens = {}
  for (const match of css.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    tokens[match[1]] = match[2].trim()
  }
  return tokens
}

describe('Feature 37: Accessibility and loading fixes', () => {
  describe('Contrast', () => {
    const tokens = parseTokens()

    it('each colour pair named meets 4.5 to 1, checked from the token values', () => {
      const ink = hexToRgb(tokens['ink'])
      const cream = hexToRgb(tokens['cream'])
      const green = hexToRgb(tokens['green'])
      const zakatLight = hexToRgb(tokens['zakat-light'])
      const zakatColor = hexToRgb(tokens['zakat-color'])
      const goldDark = hexToRgb(tokens['gold-dark'])

      // 1. Dark footer text on ink
      const footerText = blend([255, 255, 255], ink, 0.7)
      expect(contrastRatio(footerText, ink)).toBeGreaterThanOrEqual(4.5)

      // 2. Dark footer disclaimer on ink
      const footerDisc = blend([255, 255, 255], ink, 0.6)
      expect(contrastRatio(footerDisc, ink)).toBeGreaterThanOrEqual(4.5)

      // 3. Gold verse reference on cream
      expect(contrastRatio(goldDark, cream)).toBeGreaterThanOrEqual(4.5)

      // 4. Gold tag on pillar cards (zakat-color on zakat-light and on cream)
      expect(contrastRatio(zakatColor, zakatLight)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(zakatColor, cream)).toBeGreaterThanOrEqual(4.5)

      // 5. Paragraph in green call-to-action strip
      const ctaParagraph = blend([255, 255, 255], green, 0.8)
      expect(contrastRatio(ctaParagraph, green)).toBeGreaterThanOrEqual(4.5)
    })
  })

  describe('Roles on the home page', () => {
    it('holds no role="listitem" on a link or an article, and each card group is a list with the same number of items as before', async () => {
      const { wrapper } = await mountPage(HomeView, { path: '/' })

      expect(wrapper.findAll('a[role="listitem"]').length).toBe(0)
      expect(wrapper.findAll('article[role="listitem"]').length).toBe(0)

      const pillarsList = wrapper.find('ul.pillars-hub')
      expect(pillarsList.exists()).toBe(true)
      expect(pillarsList.findAll(':scope > li').length).toBe(5)

      const toolsList = wrapper.find('ul.tools-strip')
      expect(toolsList.exists()).toBe(true)
      expect(toolsList.findAll(':scope > li').length).toBe(9)

      const featuresList = wrapper.find('ul.card-grid-3')
      expect(featuresList.exists()).toBe(true)
      expect(featuresList.findAll(':scope > li').length).toBe(6)

      wrapper.unmount()
    })

    it('a user tabs through the home page with a screen reader and hears each group of cards announced as a list with its count', async () => {
      const { wrapper } = await mountPage(HomeView, { path: '/' })

      const lists = wrapper.findAll('ul.pillars-hub, ul.tools-strip, ul.card-grid-3')
      expect(lists.length).toBe(3)
      for (const list of lists) {
        expect(list.element.tagName.toLowerCase()).toBe('ul')
        expect(list.findAll(':scope > li').length).toBeGreaterThan(0)
      }

      wrapper.unmount()
    })
  })

  describe('Headings', () => {
    const pages = [
      '/',
      '/faith',
      '/prayer',
      '/zakat',
      '/fasting',
      '/hajj',
      '/hadith',
      '/inheritance',
      '/about',
      '/tracker',
      '/tasbih',
      '/eid',
      '/qurbani',
      '/prophets',
      '/pillars',
      '/tools',
      '/prayer/adhan',
      '/prayer/how-to-pray',
      '/calendar',
      '/jumuah',
      '/games',
      '/games/quiz',
      '/games/kalimah',
      '/games/who-am-i',
    ]

    it.each(pages)('heading levels on %s go down one step at a time, footer included', async (path) => {
      const { wrapper } = await mountPage(App, { path })
      const headings = wrapper.findAll('h1, h2, h3, h4, h5, h6')

      expect(headings.length).toBeGreaterThan(0)
      expect(headings[0].element.tagName.toLowerCase()).toBe('h1')

      let prevLevel = 1
      for (let i = 1; i < headings.length; i++) {
        const currLevel = parseInt(headings[i].element.tagName.charAt(1), 10)
        expect(
          currLevel,
          `Heading ${headings[i].text()} (${headings[i].element.tagName}) skipped level from h${prevLevel} on ${path}`,
        ).toBeLessThanOrEqual(prevLevel + 1)
        prevLevel = currLevel
      }

      // Footer column titles must not be headings that jump
      const footerHeadings = wrapper.findAll('footer h1, footer h2, footer h3, footer h4, footer h5, footer h6')
      expect(footerHeadings.length).toBe(0)

      wrapper.unmount()
    })
  })

  describe('Footer links', () => {
    it('the footer credit links are underlined', async () => {
      const { wrapper } = await mountPage(SiteFooter)
      const links = wrapper.findAll('.footer-bottom a')

      expect(links.length).toBe(2)
      for (const link of links) {
        expect(link.attributes('style')).toContain('text-decoration: underline')
      }

      wrapper.unmount()
    })
  })

  describe('Fonts and loading', () => {
    it('the font stylesheet is not a render-blocking link in the built page, and the page text is visible before fonts load', () => {
      const html = readFileSync(resolve(ROOT, 'index.html'), 'utf8')

      // Check non-blocking font stylesheet pattern
      expect(html).toContain('rel="preload" as="style"')
      expect(html).toContain('media="print"')
      expect(html).toContain('onload="this.media=\'all\'"')
      expect(html).toContain('<noscript>')

      // Check unused preconnect is removed
      expect(html).not.toMatch(/<link\s+rel="preconnect"\s+href="https:\/\/fonts\.googleapis\.com"\s*>/)

      // Fallback font families in tokens
      const tokens = parseTokens()
      expect(tokens['sans']).toContain('sans-serif')
      expect(tokens['serif']).toContain('serif')
      expect(tokens['arabic']).toContain('serif')
    })

    it('Arabic text still shows in the Arabic typeface once fonts arrive, and offline after a first visit', () => {
      const tokens = parseTokens()
      expect(tokens['arabic']).toMatch(/^'Amiri'/)

      const viteConfig = readFileSync(resolve(ROOT, 'vite.config.js'), 'utf8')
      expect(viteConfig).toContain('fonts.googleapis.com')
      expect(viteConfig).toContain('fonts.gstatic.com')
      expect(viteConfig).toContain("handler: 'CacheFirst'")
    })
  })

  describe('llms.txt', () => {
    it('provides a real llms.txt file with title and links to main pages', () => {
      const file = resolve(ROOT, 'public/llms.txt')
      expect(existsSync(file)).toBe(true)

      const content = readFileSync(file, 'utf8')
      expect(content).toContain('# IslamicHub')
      expect(content).toContain('https://islamichub.xyz/faith')
      expect(content).toContain('https://islamichub.xyz/prayer')
      expect(content).toContain('https://islamichub.xyz/zakat')
    })
  })

  describe('Quiz accessibility', () => {
    it('answers have radiogroup semantics, each answer button is role radio, and submission is announced', async () => {
      const { wrapper } = await mountPage(App, { path: '/games/quiz' })
      const startBtn = wrapper.find('.game-intro-start')
      if (startBtn.exists()) {
        await startBtn.trigger('click')
      }

      const radiogroup = wrapper.find('.quiz-answers[role="radiogroup"]')
      expect(radiogroup.exists()).toBe(true)
      expect(radiogroup.attributes('aria-label')).toBeTruthy()

      const radios = wrapper.findAll('.quiz-answer[role="radio"]')
      expect(radios.length).toBe(4)
      for (const radio of radios) {
        expect(radio.attributes('aria-checked')).toBe('false')
      }

      await radios[0].trigger('click')
      expect(radios[0].attributes('aria-checked')).toBe('true')

      const submit = wrapper.find('.quiz-submit')
      expect(submit.exists()).toBe(true)
      expect(submit.element.disabled).toBe(false)

      await submit.trigger('click')
      const verdict = wrapper.find('.quiz-verdict')
      expect(verdict.exists()).toBe(true)

      wrapper.unmount()
    })
  })
})

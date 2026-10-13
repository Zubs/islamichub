import { describe, it, expect, vi } from 'vitest'
import {
  SOURCE_TAG,
  CARD_SIZE,
  shareAddress,
  shareText,
  whatsappLink,
  layoutCard,
  drawCard,
} from './share.js'
import { DAILY_HADITHS } from '@/data/dailyHadith.js'
import { DUAS } from '@/data/duas.js'
import { ADHKAR } from '@/data/adhkar.js'
import { sourceTag } from '@/utils/stats.js'

// A stand-in for the canvas: every character is half as wide as the type is tall.
function measure(text, font) {
  return text.length * Number(font.match(/(\d+)px/)[1]) * 0.5
}

function kinds(layout) {
  return [...new Set(layout.lines.map((line) => line.kind))]
}

function textOf(layout, kind) {
  return layout.lines
    .filter((line) => line.kind === kind)
    .map((line) => line.text)
    .join(' ')
}

function words(count) {
  return Array.from({ length: count }, () => 'kalimah').join(' ')
}

const HADITH = {
  arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
  translation: 'The reward of deeds depends upon the intentions.',
  reference: 'Sahih Bukhari 1',
  path: '/hadith/books/sahih-bukhari/hadith/1',
}

describe('shared address and text', () => {
  it('uses the canonical address with the source tag', () => {
    expect(shareAddress(HADITH.path)).toBe(
      'https://islamichub.xyz/hadith/books/sahih-bukhari/hadith/1?src=whatsapp',
    )
    expect(sourceTag(new URL(shareAddress(HADITH.path)).search)).toBe(SOURCE_TAG)
  })

  it('keeps an anchor after the tag and drops any other query', () => {
    expect(shareAddress('/duas/travel#farewell')).toBe(
      'https://islamichub.xyz/duas/travel?src=whatsapp#farewell',
    )
    expect(shareAddress('/duas/travel?x=1#farewell')).toBe(
      'https://islamichub.xyz/duas/travel?src=whatsapp#farewell',
    )
  })

  it('puts the Arabic, translation, reference and address in the text', () => {
    expect(shareText(HADITH)).toBe(
      `${HADITH.arabic}\n\n${HADITH.translation}\n\n— Sahih Bukhari 1\n\n${shareAddress(HADITH.path)}`,
    )
  })

  it('leaves out what an item does not have', () => {
    expect(
      shareText({ arabic: 'سُبْحَانَ اللَّهِ', reference: 'Sahih Muslim 2691', path: '/tasbih' }),
    ).toBe('سُبْحَانَ اللَّهِ\n\n— Sahih Muslim 2691\n\nhttps://islamichub.xyz/tasbih?src=whatsapp')
  })

  it('fills a WhatsApp link with the text', () => {
    const link = whatsappLink(shareText(HADITH))

    expect(link.startsWith('https://wa.me/?text=')).toBe(true)
    expect(decodeURIComponent(link.split('text=')[1])).toBe(shareText(HADITH))
  })
})

describe('layoutCard', () => {
  it('lays out the Arabic, the translation and the reference', () => {
    const layout = layoutCard(HADITH, measure)

    expect(layout.size).toBe(CARD_SIZE)
    expect(kinds(layout)).toEqual(['arabic', 'text', 'reference'])
    expect(textOf(layout, 'arabic')).toBe(HADITH.arabic)
    expect(textOf(layout, 'text')).toBe(`“${HADITH.translation}”`)
    expect(textOf(layout, 'reference')).toBe('Sahih Bukhari 1')
  })

  it('lays out the Arabic and the reference only when there is no translation', () => {
    const layout = layoutCard({ ...HADITH, translation: '' }, measure)

    expect(kinds(layout)).toEqual(['arabic', 'reference'])
  })

  it('keeps every line inside the card, in order, with nothing cut off', () => {
    const medium = { ...HADITH, arabic: words(18), translation: words(30) }
    const layout = layoutCard(medium, measure)
    const positions = layout.lines.map((line) => line.y)

    expect(layout.lines.map((line) => line.text).join(' ')).toContain(words(3))
    expect(textOf(layout, 'arabic')).toBe(medium.arabic)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(Math.min(...positions)).toBeGreaterThan(120)
    expect(Math.max(...positions)).toBeLessThan(CARD_SIZE - 150)
    for (const line of layout.lines) {
      expect(measure(line.text, line.font)).toBeLessThanOrEqual(CARD_SIZE - 192)
    }
  })

  it('uses smaller type for longer text', () => {
    const size = (layout) => Number(layout.lines[0].font.match(/(\d+)px/)[1])

    expect(size(layoutCard(HADITH, measure))).toBeGreaterThan(
      size(layoutCard({ ...HADITH, arabic: words(20), translation: words(25) }, measure)),
    )
  })

  it('gives a card to text just short enough and none to text just too long', () => {
    let longest = 0
    for (let count = 1; count < 400; count += 1) {
      if (layoutCard({ ...HADITH, arabic: '', translation: words(count) }, measure)) {
        longest = count
      } else {
        break
      }
    }

    expect(longest).toBeGreaterThan(40)
    expect(
      layoutCard({ ...HADITH, arabic: '', translation: words(longest) }, measure),
    ).not.toBeNull()
    expect(
      layoutCard({ ...HADITH, arabic: '', translation: words(longest + 1) }, measure),
    ).toBeNull()
  })

  it('gives no card to a single word wider than the card', () => {
    expect(layoutCard({ ...HADITH, translation: 'x'.repeat(400) }, measure)).toBeNull()
  })

  it('fits every short dhikr and most daily hadiths and duas on a card', () => {
    const fits = (item) => layoutCard(item, measure) !== null
    const shortDhikr = ADHKAR.filter((dhikr) => dhikr.arabic.length < 120)

    expect(shortDhikr.length).toBeGreaterThan(5)
    expect(shortDhikr.every(fits)).toBe(true)
    const daily = DAILY_HADITHS.map((hadith) => ({ ...hadith, translation: hadith.text }))
    expect(daily.filter(fits).length).toBeGreaterThan(daily.length * 0.6)
    expect(DUAS.filter(fits).length).toBeGreaterThan(DUAS.length * 0.8)
  })
})

describe('drawCard', () => {
  function recordingContext() {
    const drawn = []
    const context = {
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      fillText(text, x, y) {
        drawn.push({
          text,
          x,
          y,
          direction: this.direction,
          font: this.font,
          align: this.textAlign,
        })
      },
    }
    return { context, drawn }
  }

  it('draws the Arabic right to left in the Arabic typeface', () => {
    const { context, drawn } = recordingContext()

    drawCard(context, layoutCard(HADITH, measure))

    const arabic = drawn.filter((line) => HADITH.arabic.includes(line.text))
    expect(arabic.map((line) => line.text).join(' ')).toBe(HADITH.arabic)
    for (const line of arabic) {
      expect(line.direction).toBe('rtl')
      expect(line.font).toContain('Amiri')
      expect(line.align).toBe('center')
    }
  })

  it('draws the translation and reference left to right, with the site name and address', () => {
    const { context, drawn } = recordingContext()

    drawCard(context, layoutCard(HADITH, measure))

    const translation = drawn.find((line) => line.text.includes('reward'))
    expect(translation.direction).toBe('ltr')
    expect(translation.font).toContain('Cormorant Garamond')
    expect(drawn.map((line) => line.text)).toEqual(
      expect.arrayContaining(['Sahih Bukhari 1', 'IslamicHub', 'islamichub.xyz']),
    )
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, CARD_SIZE, CARD_SIZE)
  })
})

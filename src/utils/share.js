import { canonicalFor, SITE_URL } from '@/composables/useSeo.js'

export const SOURCE_TAG = 'whatsapp'
export const CARD_SIZE = 1080

const MARGIN = 96
const TEXT_WIDTH = CARD_SIZE - MARGIN * 2
const HEADER_HEIGHT = 120
const FOOTER_HEIGHT = 150
const TEXT_HEIGHT = CARD_SIZE - HEADER_HEIGHT - FOOTER_HEIGHT - MARGIN
const GAP = 44
const REFERENCE_SIZE = 30

export const CARD_FONTS = {
  arabic: "'Amiri', 'Scheherazade New', serif",
  text: "'Cormorant Garamond', Georgia, serif",
  label: "'DM Sans', sans-serif",
}

export const CARD_COLOURS = {
  ground: '#f7f3ec',
  frame: '#1b5c42',
  gold: '#c4932a',
  ink: '#1a1a18',
  muted: '#6b6860',
}

// Arabic and translation sizes tried from largest to smallest; below the last pair the text
// is too small to read on a phone, and the item is shared as text.
const TYPE_SIZES = [
  { arabic: 64, text: 44 },
  { arabic: 54, text: 38 },
  { arabic: 46, text: 33 },
  { arabic: 40, text: 29 },
  { arabic: 34, text: 26 },
]
const ARABIC_LINE = 1.9
const TEXT_LINE = 1.45

// The address a shared item is sent with: canonical, tagged, and keeping any anchor.
export function shareAddress(path) {
  const [withoutHash, hash] = path.split('#')
  const [pathname] = withoutHash.split('?')
  return `${canonicalFor(pathname)}?src=${SOURCE_TAG}${hash ? `#${hash}` : ''}`
}

export function shareText(item) {
  const address = shareAddress(item.path)
  return [item.arabic, item.translation, item.reference && `— ${item.reference}`, address]
    .filter(Boolean)
    .join('\n\n')
}

export function whatsappLink(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function fontFor(kind, size) {
  const weight = kind === 'label' ? '600' : '400'
  return `${weight} ${size}px ${CARD_FONTS[kind]}`
}

function wrap(text, font, measure) {
  const lines = []
  let line = ''
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word
    if (line && measure(candidate, font) > TEXT_WIDTH) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }

  return line ? [...lines, line] : lines
}

// Returns where every line of the card goes, or null when the text cannot fit at a readable size.
// `measure(text, font)` gives a line's width in pixels.
export function layoutCard(item, measure) {
  const translation = item.translation ? `“${item.translation}”` : ''

  for (const size of TYPE_SIZES) {
    const arabicFont = fontFor('arabic', size.arabic)
    const textFont = fontFor('text', size.text)
    const arabicLines = item.arabic ? wrap(item.arabic, arabicFont, measure) : []
    const textLines = translation ? wrap(translation, textFont, measure) : []
    const widest = Math.max(
      0,
      ...arabicLines.map((line) => measure(line, arabicFont)),
      ...textLines.map((line) => measure(line, textFont)),
    )
    const arabicHeight = arabicLines.length * size.arabic * ARABIC_LINE
    const textHeight = textLines.length * size.text * TEXT_LINE
    const gap = arabicLines.length && textLines.length ? GAP : 0
    const height = arabicHeight + gap + textHeight + GAP + REFERENCE_SIZE

    if (height <= TEXT_HEIGHT && widest <= TEXT_WIDTH) {
      const top = HEADER_HEIGHT + (TEXT_HEIGHT - height) / 2
      const lines = []
      arabicLines.forEach((text, index) => {
        lines.push({
          kind: 'arabic',
          text,
          font: arabicFont,
          y: top + (index + 0.7) * size.arabic * ARABIC_LINE,
        })
      })
      textLines.forEach((text, index) => {
        lines.push({
          kind: 'text',
          text,
          font: textFont,
          y: top + arabicHeight + gap + (index + 0.8) * size.text * TEXT_LINE,
        })
      })
      lines.push({
        kind: 'reference',
        text: item.reference ?? '',
        font: fontFor('label', REFERENCE_SIZE),
        y: top + height,
      })

      return { size: CARD_SIZE, lines }
    }
  }

  return null
}

export function drawCard(context, layout) {
  const { size, lines } = layout
  const centre = size / 2

  context.fillStyle = CARD_COLOURS.ground
  context.fillRect(0, 0, size, size)
  context.strokeStyle = CARD_COLOURS.frame
  context.lineWidth = 12
  context.strokeRect(30, 30, size - 60, size - 60)
  context.strokeStyle = CARD_COLOURS.gold
  context.lineWidth = 3
  context.strokeRect(48, 48, size - 96, size - 96)

  context.textAlign = 'center'
  context.textBaseline = 'alphabetic'
  for (const line of lines) {
    context.direction = line.kind === 'arabic' ? 'rtl' : 'ltr'
    context.font = line.font
    context.fillStyle = line.kind === 'reference' ? CARD_COLOURS.gold : CARD_COLOURS.ink
    context.fillText(line.text, centre, line.y)
  }

  context.direction = 'ltr'
  context.fillStyle = CARD_COLOURS.frame
  context.font = fontFor('label', 34)
  context.fillText('IslamicHub', centre, size - 128)
  context.fillStyle = CARD_COLOURS.muted
  context.font = fontFor('label', 26).replace('600', '400')
  context.fillText(SITE_URL.replace('https://', ''), centre, size - 88)
}

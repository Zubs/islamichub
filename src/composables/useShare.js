import {
  CARD_SIZE,
  layoutCard,
  drawCard,
  shareAddress,
  shareText,
  whatsappLink,
} from '@/utils/share.js'

const CARD_FILE_NAME = 'islamichub.png'

async function fontsReady(layout) {
  if (!document.fonts?.load) {
    return
  }

  await Promise.allSettled(layout.lines.map((line) => document.fonts.load(line.font, line.text)))
}

async function makeCard(item) {
  const canvas = document.createElement('canvas')
  canvas.width = CARD_SIZE
  canvas.height = CARD_SIZE
  const context = canvas.getContext?.('2d')
  if (!context) {
    return null
  }

  const measure = (text, font) => {
    context.font = font
    return context.measureText(text).width
  }
  const layout = layoutCard(item, measure)
  if (!layout) {
    return null
  }

  await fontsReady(layout)
  drawCard(context, layoutCard(item, measure) ?? layout)
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

// Shares through the device's share sheet when it can, and otherwise returns what the
// fallback panel needs: { image, text, address, whatsapp }. Returns null once shared or cancelled.
export async function shareItem(item) {
  const address = shareAddress(item.path)
  const text = shareText(item)
  const image = await makeCard(item).catch(() => null)
  const title = item.reference ?? 'IslamicHub'

  try {
    if (image) {
      const file = new File([image], CARD_FILE_NAME, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title, text })
        return null
      }
    } else if (navigator.share) {
      await navigator.share({ title, text })
      return null
    }
  } catch (error) {
    if (error?.name === 'AbortError') {
      return null
    }
  }

  return { image, text, address, whatsapp: whatsappLink(text) }
}

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ShareButton from './ShareButton.vue'
import DailyHadith from './DailyHadith.vue'
import AdhkarCategoryView from '@/views/adhkar/AdhkarCategoryView.vue'
import DuasSituationView from '@/views/duas/DuasSituationView.vue'
import { dailyHadithFor } from '@/utils/dailyHadith.js'
import { DAILY_HADITHS } from '@/data/dailyHadith.js'
import { mountPage } from '../../test/mountPage.js'

const DHIKR = {
  arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
  translation: 'Glory be to Allah and praise be to Him.',
  reference: 'Sahih Bukhari 6405',
  path: '/adhkar/general#subhanallahi-wa-bihamdihi',
}
const ADDRESS = 'https://islamichub.xyz/adhkar/general?src=whatsapp#subhanallahi-wa-bihamdihi'

function withCanvas() {
  const drawn = []
  const context = {
    font: '',
    measureText(text) {
      return { width: text.length * Number(this.font.match(/(\d+)px/)?.[1] ?? 10) * 0.5 }
    },
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText(text) {
      drawn.push({ text, direction: this.direction, font: this.font })
    },
  }
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context)
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((done) =>
    done(new Blob(['png'], { type: 'image/png' })),
  )
  return drawn
}

async function share(item = DHIKR) {
  const wrapper = mount(ShareButton, { props: { item } })
  await wrapper.find('.share-button').trigger('click')
  await flushPromises()
  return wrapper
}

describe('ShareButton', () => {
  let fetch

  beforeEach(() => {
    fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    URL.createObjectURL = vi.fn(() => 'blob:card')
    URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    delete navigator.share
    delete navigator.canShare
    delete navigator.clipboard
  })

  it('opens the share sheet with the image card attached where the browser can share images', async () => {
    const drawn = withCanvas()
    navigator.canShare = vi.fn(() => true)
    navigator.share = vi.fn(async () => {})

    const wrapper = await share()

    const shared = navigator.share.mock.calls[0][0]
    expect(shared.files).toHaveLength(1)
    expect(shared.files[0].type).toBe('image/png')
    expect(shared.text).toContain(ADDRESS)
    expect(wrapper.find('.share-panel').exists()).toBe(false)
    expect(drawn.map((line) => line.text)).toEqual(
      expect.arrayContaining(['Sahih Bukhari 6405', 'IslamicHub', 'islamichub.xyz']),
    )
    expect(drawn.find((line) => line.direction === 'rtl').font).toContain('Amiri')
  })

  it('offers Save image and a filled-in WhatsApp link where the browser cannot share images', async () => {
    withCanvas()
    navigator.share = vi.fn(async () => {})

    const wrapper = await share()

    expect(navigator.share).not.toHaveBeenCalled()
    const save = wrapper.find('.share-panel a[download]')
    expect(save.text()).toBe('Save image')
    expect(save.attributes('href')).toBe('blob:card')
    expect(save.attributes('download')).toBe('islamichub.png')
    const whatsapp = wrapper.find('.share-panel a[href^="https://wa.me/"]')
    const text = decodeURIComponent(whatsapp.attributes('href').split('text=')[1])
    expect(text).toContain(DHIKR.arabic)
    expect(text).toContain(DHIKR.translation)
    expect(text).toContain(ADDRESS)
  })

  it('shares text too long for a card as text and a link, with no image', async () => {
    withCanvas()
    navigator.canShare = vi.fn(() => true)
    navigator.share = vi.fn(async () => {})
    const long = { ...DHIKR, translation: 'word '.repeat(600).trim() }

    await share(long)

    const shared = navigator.share.mock.calls[0][0]
    expect(shared.files).toBeUndefined()
    expect(shared.text).toContain(ADDRESS)
  })

  it('says a long text is shared without an image when there is no share sheet', async () => {
    withCanvas()
    const wrapper = await share({ ...DHIKR, translation: 'word '.repeat(600).trim() })

    expect(wrapper.find('.share-preview').exists()).toBe(false)
    expect(wrapper.find('.share-note').text()).toContain('too long for an image card')
    expect(wrapper.find('a[download]').exists()).toBe(false)
    expect(wrapper.find('a[href^="https://wa.me/"]').exists()).toBe(true)
  })

  it('does nothing and shows no error when the share sheet is cancelled', async () => {
    withCanvas()
    navigator.canShare = vi.fn(() => true)
    navigator.share = vi.fn(async () => {
      throw new DOMException('Share canceled', 'AbortError')
    })

    const wrapper = await share()

    expect(wrapper.find('.share-panel').exists()).toBe(false)
    expect(wrapper.find('.share-button').text()).toBe('Share')
  })

  it('falls back to the panel when the share sheet fails for another reason', async () => {
    withCanvas()
    navigator.canShare = vi.fn(() => true)
    navigator.share = vi.fn(async () => {
      throw new DOMException('Not allowed', 'NotAllowedError')
    })

    const wrapper = await share()

    expect(wrapper.find('.share-panel a[download]').exists()).toBe(true)
  })

  it('makes and saves a card with no connection, making no request', async () => {
    withCanvas()
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)

    const wrapper = await share()

    expect(wrapper.find('a[download]').attributes('href')).toBe('blob:card')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('copies the tagged link and can be closed', async () => {
    withCanvas()
    const writeText = vi.fn(async () => {})
    navigator.clipboard = { writeText }
    const wrapper = await share()

    await wrapper.findAll('.share-actions button')[0].trigger('click')
    expect(writeText).toHaveBeenCalledExactlyOnceWith(ADDRESS)

    await wrapper.find('button[aria-label="Close share options"]').trigger('click')
    expect(wrapper.find('.share-panel').exists()).toBe(false)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:card')
  })
})

describe('where sharing is offered', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    delete navigator.share
    delete navigator.canShare
  })

  it('shares the daily hadith as a card with its Arabic, translation and reference', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 9, 12, 9))
    const today = dailyHadithFor('2026-10-12', DAILY_HADITHS)
    const drawn = withCanvas()
    navigator.canShare = vi.fn(() => true)
    navigator.share = vi.fn(async () => {})
    const { wrapper } = await mountPage(DailyHadith)

    await wrapper.find('.share-button').trigger('click')
    vi.useRealTimers()
    await flushPromises()

    const shared = navigator.share.mock.calls[0][0]
    expect(shared.text).toContain(today.arabic)
    expect(shared.text).toContain(today.text)
    expect(shared.text).toContain(
      `https://islamichub.xyz/hadith/books/sahih-bukhari/hadith/${today.number}?src=whatsapp`,
    )
    if (shared.files) {
      expect(drawn.map((line) => line.text)).toContain(today.reference)
      expect(drawn.some((line) => line.direction === 'rtl')).toBe(true)
    }
  })

  it('gives every daily hadith Arabic text to share', () => {
    for (const hadith of DAILY_HADITHS) {
      expect(hadith.arabic, hadith.reference).toMatch(/[ء-ي]/)
      expect(hadith.arabic, hadith.reference).not.toMatch(/[A-Za-z"�]/)
    }
  })

  it('shares each dhikr from its own anchor on its category page', async () => {
    navigator.share = vi.fn(async () => {})
    const { wrapper } = await mountPage(AdhkarCategoryView, { path: '/adhkar/morning' })
    const card = wrapper.find('#ayat-al-kursi')

    expect(card.exists()).toBe(true)
    await card.find('.share-button').trigger('click')
    await flushPromises()

    expect(navigator.share.mock.calls[0][0].text).toContain(
      'https://islamichub.xyz/adhkar/morning?src=whatsapp#ayat-al-kursi',
    )
  })

  it('shares each dua from its own anchor on its situation page', async () => {
    navigator.share = vi.fn(async () => {})
    const { wrapper } = await mountPage(DuasSituationView, { path: '/duas/travel' })

    await wrapper.find('#farewell .share-button').trigger('click')
    await flushPromises()

    const text = navigator.share.mock.calls[0][0].text
    expect(text).toContain('https://islamichub.xyz/duas/travel?src=whatsapp#farewell')
    expect(text).toContain('Al-Tirmidhi 3443')
  })
})

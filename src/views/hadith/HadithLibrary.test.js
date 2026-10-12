import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import App from '@/App.vue'
import HadithBooksView from './HadithBooksView.vue'
import HadithBookView from './HadithBookView.vue'
import { mountPage } from '../../../test/mountPage.js'

function json(body, status = 200) {
  return { ok: status < 400, status, json: async () => body }
}

async function settled() {
  await vi.dynamicImportSettled()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 20))
}

describe('Hadith library through the proxy', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows the "no API key" notice when the proxy is not configured', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => json({ error: 'not_configured' }, 503)),
    )

    const { wrapper } = await mountPage(HadithBooksView, { path: '/hadith/books' })
    await flushPromises()

    expect(wrapper.find('.api-key-notice').text()).toContain('HADITH_API_KEY')
    expect(wrapper.find('.had-error').exists()).toBe(false)
    expect(wrapper.text()).toContain('Sahih Al-Bukhari')
  })

  it('shows no notice when the proxy answers', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => json({ books: [] })),
    )

    const { wrapper } = await mountPage(HadithBooksView, { path: '/hadith/books' })
    await flushPromises()

    expect(wrapper.find('.api-key-notice').exists()).toBe(false)
  })

  it('shows its error state when hadithapi.com is down', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => json({ error: 'upstream_error' }, 502)),
    )

    const { wrapper } = await mountPage(HadithBookView, { path: '/hadith/books/sahih-bukhari' })
    await flushPromises()

    expect(wrapper.find('.had-error').text()).toContain('could not be loaded (502)')
    expect(wrapper.find('.had-error').text()).not.toContain('HADITH_API_KEY')
  })

  it('takes a user from the book list to a chapter with every request going to /api/hadith', async () => {
    const fetch = vi.fn(async (address) => {
      if (address.endsWith('/chapters')) {
        return json({ chapters: [{ id: 1, chapterNumber: '1', chapterEnglish: 'Revelation' }] })
      }

      if (address.includes('/hadiths')) {
        return json({
          hadiths: {
            data: [
              {
                id: 1,
                hadithNumber: '1',
                hadithEnglish: 'Actions are judged by intentions.',
                chapter: { chapterEnglish: 'Revelation' },
              },
            ],
            total: 1,
            current_page: 1,
            last_page: 1,
          },
        })
      }

      return json({ books: [] })
    })
    vi.stubGlobal('fetch', fetch)
    const { wrapper, router } = await mountPage(App, { path: '/hadith/books' })
    await settled()

    await router.push('/hadith/books/sahih-bukhari')
    await settled()
    expect(wrapper.text()).toContain('Revelation')

    await router.push('/hadith/books/sahih-bukhari/1')
    await settled()
    expect(wrapper.text()).toContain('Actions are judged by intentions.')

    const addresses = fetch.mock.calls.map(([address]) => String(address))
    expect(addresses.length).toBeGreaterThanOrEqual(3)
    expect(addresses.every((address) => address.startsWith('/api/hadith/'))).toBe(true)
    expect(addresses.join(' ')).not.toContain('apiKey')
  })
})

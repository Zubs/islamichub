import { computed, toValue } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { availableLocales, currentLocale, localeCodes, i18n, t } from '@/i18n.js'
import { SOURCE_LOCALE, localePath, splitLocale } from '@/utils/locale.js'

export const SITE_URL = 'https://islamichub.xyz'

// Pages with fixed titles and descriptions; their text is in the message file under `seo`.
const PAGE_KEYS = [
  'games',
  'quiz',
  'who-am-i',
  'kalimah',
  'calendar',
  'jumuah',
  'pillars',
  'tools',
  'adhan',
  'how-to-pray',
  'eid',
  'qurbani',
  'prophets',
  'hadith',
  'hadith-books',
  'adhkar',
  'duas',
  'tracker',
  'tasbih',
  'home',
  'faith',
  'prayer',
  'zakat',
  'fasting',
  'hajj',
  'inheritance',
  'about',
  'changelog',
  'articles-of-faith',
  'not-found',
]
const NOT_INDEXED = ['not-found']

const te = i18n.global.te

export function canonicalFor(path) {
  return SITE_URL + (path === '/' ? '/' : path.replace(/\/+$/, ''))
}

// `page` is a key of PAGE_META, or { title, description, noindex } whose values may be refs or getters.
export function useSeo(page = {}) {
  const route = useRoute()
  const source =
    typeof page === 'string'
      ? PAGE_KEYS.includes(page)
        ? {
            title: () => t(`seo.${page}.title`),
            description: () => (te(`seo.${page}.description`) ? t(`seo.${page}.description`) : ''),
            noindex: NOT_INDEXED.includes(page),
          }
        : {}
      : page

  useHead(
    computed(() => {
      const title = toValue(source.title) || t('seo.home.title')
      const description = toValue(source.description) || t('seo.home.description')
      const canonical = canonicalFor(route.path)
      const { path: sourcePath } = splitLocale(route.path, localeCodes())
      const alternates =
        availableLocales.value.length > 1
          ? [
              ...availableLocales.value.map((locale) => ({
                rel: 'alternate',
                hreflang: locale.code,
                href: canonicalFor(localePath(sourcePath, locale.code)),
              })),
              {
                rel: 'alternate',
                hreflang: 'x-default',
                href: canonicalFor(localePath(sourcePath, SOURCE_LOCALE)),
              },
            ]
          : []

      return {
        title,
        meta: [
          { name: 'description', content: description },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:url', content: canonical },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          ...(toValue(source.noindex) ? [{ name: 'robots', content: 'noindex' }] : []),
        ],
        htmlAttrs: { lang: currentLocale.value.code, dir: currentLocale.value.dir },
        link: [{ rel: 'canonical', href: canonical }, ...alternates],
      }
    }),
  )
}

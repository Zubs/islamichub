import { computed, toValue } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { availableLocales, currentLocale, localeCodes } from '@/i18n.js'
import { SOURCE_LOCALE, localePath, splitLocale } from '@/utils/locale.js'

export const SITE_URL = 'https://islamichub.xyz'

const PAGE_META = {
  hadith: {
    title: 'Hadith — Prophetic Tradition, Sciences & Library | IslamicHub',
    description:
      "Learn what Hadith is, how it was preserved, the six grades (Sahih, Hasan, Da'eef), the great hadith scholars, and browse 9 authenticated collections including Sahih Bukhari and Sahih Muslim.",
  },
  'hadith-books': {
    title: 'Hadith Library — All Collections | IslamicHub',
    description:
      'Browse all 9 major hadith collections — Sahih Bukhari, Sahih Muslim, the four Sunan, Musnad Ahmad, and more — by chapter and individual hadith.',
  },
  adhkar: {
    title: 'Adhkar & Duas — Morning, Evening & Daily Supplications | IslamicHub',
    description:
      'Morning and evening adhkar, remembrance after prayer, before sleep, and daily dhikr — with Arabic, transliteration, translation, and a tap-to-count tracker.',
  },
  duas: {
    title: 'Duas for Everyday Situations — Travel, Eating, Illness & More | IslamicHub',
    description:
      "Supplications from the Qur'an and Sunnah for travel, eating, home, the mosque, clothing, weather, distress, illness, forgiveness, and parents and family — with Arabic, transliteration, translation and source.",
  },
  tracker: {
    title: 'Prayer Tracker — Log Your Five Daily Prayers | IslamicHub',
    description:
      'Record each of the five daily prayers as on time, late or missed, see your week and month at a glance, and keep a streak. Private: everything stays on your device.',
  },
  tasbih: {
    title: 'Tasbih Counter — Digital Dhikr Counter | IslamicHub',
    description:
      'A free digital tasbih counter for dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar, and more. Set a target, tap to count, and track your daily and lifetime totals.',
  },
  home: {
    title: 'IslamicHub — Islamic Education, Prayer Times, Zakat Calculator & Five Pillars Guide',
    description:
      "Free Islamic learning platform covering all Five Pillars of Islam. Accurate prayer times and Qibla direction, Zakat calculator with live gold prices, Islamic inheritance (Fara'id) calculator, and Hadith-based scholarly guides. No account needed.",
  },
  faith: {
    title: 'Shahada — Declaration of Faith, Tawhid & First Pillar of Islam | IslamicHub',
    description:
      "Learn about the Shahada, the first pillar of Islam — Tawhid, the seven conditions, Risala, and all three dimensions of divine oneness, with Qur'anic verses and Hadith.",
  },
  prayer: {
    title: 'Prayer Times, Qibla Direction & Salah Guide | IslamicHub',
    description:
      'Get accurate Islamic prayer times for your location with 5 calculation methods. Find the Qibla direction with a live compass. Learn the second pillar of Islam with Hadith references.',
  },
  zakat: {
    title: 'Accurate Zakat Calculator Online — Live Gold & Silver Prices | IslamicHub',
    description:
      'Calculate your annual Zakat with live gold and silver prices. Supports cash, gold/silver by weight, shares, ISAs, pensions, business inventory, and debt deductions. Dual Nisab methods. Free and private.',
  },
  fasting: {
    title: 'Ramadan Fasting Tracker, Suhoor & Iftar Times | IslamicHub',
    description:
      'Live Suhoor and Iftar times for your location, fasting progress bar, Ramadan countdown, and a comprehensive Hadith-based guide to Sawm rulings.',
  },
  hajj: {
    title: 'Hajj Rites Guide — Complete Step-by-Step Pilgrimage to Makkah | IslamicHub',
    description:
      'Day-by-day Hajj rites for all five days, three types of Hajj (Tamattu, Qiran, Ifrad), full Umrah guide, conditions of obligation, and rulings from all four schools.',
  },
  inheritance: {
    title: "Islamic Inheritance Calculator (Fara'id) | IslamicHub",
    description:
      "Calculate Qur'anic inheritance shares for all 13 heir types based on Qur'an 4:11–12. Automatic blocking rules, awl reduction, and visual breakdown.",
  },
  about: {
    title: 'About IslamicHub — Open Source Islamic Education Platform',
    description:
      'Open-source Islamic education platform built by Zubair Idris Aweda and Yusuf Saif. Learn our mission, methodology, scholarly sources, and how to contribute on GitHub.',
  },
  changelog: {
    title: 'Changelog — IslamicHub Updates & Fixes',
    description:
      'Full changelog for IslamicHub: version history, new features, bug fixes, and improvements.',
  },
  'articles-of-faith': {
    title: 'The Six Articles of Faith (Arkan al-Iman) | IslamicHub',
    description:
      "Learn the six articles of Islamic faith — belief in Allah, angels, scriptures, prophets, the Day of Judgement, and divine decree (Qadr). Grounded in Qur'an and the Hadith of Jibril.",
  },
  'not-found': {
    title: 'Page Not Found — IslamicHub',
    noindex: true,
  },
}

export function canonicalFor(path) {
  return SITE_URL + (path === '/' ? '/' : path.replace(/\/+$/, ''))
}

// `page` is a key of PAGE_META, or { title, description, noindex } whose values may be refs or getters.
export function useSeo(page = {}) {
  const route = useRoute()
  const source = typeof page === 'string' ? (PAGE_META[page] ?? {}) : page

  useHead(
    computed(() => {
      const title = toValue(source.title) || PAGE_META.home.title
      const description = toValue(source.description) || PAGE_META.home.description
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

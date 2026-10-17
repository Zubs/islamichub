import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { countPage, sourceTag } from '@/composables/useStats.js'
import { getSituation } from '@/data/duas.js'
import { getProphet } from '@/data/prophets.js'
import { localeCodes, isAvailable, setLocale, rememberedLocale, rememberLocale } from '@/i18n.js'
import {
  SOURCE_LOCALE,
  localePath,
  splitLocale,
  matchLocale,
  localizedRoutes,
} from '@/utils/locale.js'

const HASH_SCROLL_DELAY_MS = 350

function notFound(to) {
  return { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') }, replace: true }
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/hadith',
    name: 'hadith',
    component: () => import('@/views/hadith/HadithHomeView.vue'),
  },
  {
    path: '/hadith/books',
    name: 'hadith-books',
    component: () => import('@/views/hadith/HadithBooksView.vue'),
  },
  {
    path: '/hadith/books/:bookSlug',
    name: 'hadith-book',
    component: () => import('@/views/hadith/HadithBookView.vue'),
  },
  {
    path: '/hadith/books/:bookSlug/hadith/:hadithNumber',
    name: 'hadith-single',
    component: () => import('@/views/hadith/HadithView.vue'),
  },
  {
    path: '/hadith/books/:bookSlug/:chapterNumber',
    name: 'hadith-chapter',
    component: () => import('@/views/hadith/HadithChapterView.vue'),
  },
  {
    path: '/adhkar',
    name: 'adhkar',
    component: () => import('@/views/adhkar/AdhkarHomeView.vue'),
  },
  {
    path: '/adhkar/:categorySlug',
    name: 'adhkar-category',
    component: () => import('@/views/adhkar/AdhkarCategoryView.vue'),
  },
  {
    path: '/duas',
    name: 'duas',
    component: () => import('@/views/duas/DuasHomeView.vue'),
  },
  {
    path: '/duas/:situationSlug',
    name: 'duas-situation',
    component: () => import('@/views/duas/DuasSituationView.vue'),
    beforeEnter: (to) => (getSituation(to.params.situationSlug) ? true : notFound(to)),
  },
  {
    path: '/prophets',
    name: 'prophets',
    component: () => import('@/views/prophets/ProphetsHomeView.vue'),
  },
  {
    path: '/prophets/:slug',
    name: 'prophet',
    component: () => import('@/views/prophets/ProphetView.vue'),
    beforeEnter: (to) => (getProphet(to.params.slug)?.story ? true : notFound(to)),
  },
  {
    path: '/qurbani',
    name: 'qurbani',
    component: () => import('@/views/QurbaniView.vue'),
  },
  {
    path: '/eid',
    name: 'eid',
    component: () => import('@/views/EidView.vue'),
  },
  {
    path: '/tracker',
    name: 'tracker',
    component: () => import('@/views/tools/TrackerView.vue'),
  },
  {
    path: '/tasbih',
    name: 'tasbih',
    component: () => import('@/views/tools/TasbihView.vue'),
  },
  {
    path: '/faith',
    name: 'faith',
    component: () => import('@/views/pillar/FaithView.vue'),
  },
  {
    path: '/faith/articles',
    name: 'articles-of-faith',
    component: () => import('@/views/pillar/ArticlesOfFaithView.vue'),
  },
  {
    path: '/pillars',
    name: 'pillars',
    component: () => import('@/views/PillarsView.vue'),
  },
  {
    path: '/games',
    name: 'games',
    component: () => import('@/views/games/GamesView.vue'),
  },
  {
    path: '/games/quiz',
    name: 'quiz',
    component: () => import('@/views/games/QuizView.vue'),
  },
  {
    path: '/games/kalimah',
    name: 'kalimah',
    component: () => import('@/views/games/KalimahView.vue'),
  },
  {
    path: '/games/who-am-i',
    name: 'who-am-i',
    component: () => import('@/views/games/WhoAmIView.vue'),
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/tools/ToolsView.vue'),
  },
  {
    path: '/prayer',
    name: 'prayer',
    component: () => import('@/views/pillar/PrayerView.vue'),
  },
  {
    path: '/prayer/adhan',
    name: 'adhan',
    component: () => import('@/views/pillar/AdhanView.vue'),
  },
  {
    path: '/prayer/how-to-pray',
    name: 'how-to-pray',
    component: () => import('@/views/pillar/SalahStepsView.vue'),
  },
  {
    path: '/zakat',
    name: 'zakat',
    component: () => import('@/views/pillar/ZakatView.vue'),
  },
  {
    path: '/fasting',
    name: 'fasting',
    component: () => import('@/views/pillar/FastingView.vue'),
  },
  {
    path: '/hajj',
    name: 'hajj',
    component: () => import('@/views/pillar/HajjView.vue'),
  },
  {
    path: '/inheritance',
    name: 'inheritance',
    component: () => import('@/views/tools/InheritanceView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: () => import('@/views/ChangelogView.vue'),
  },
  // 404 — must be last
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    // wait for the page transition, so the element is on the page
    return new Promise((resolve) => {
      setTimeout(() => resolve({ el: to.hash, top: 84 }), HASH_SCROLL_DELAY_MS)
    })
  }

  return { top: 0, behavior: 'instant' }
}

let switchingTo = null

// Decides the language of every navigation. On arrival the address wins, then the remembered
// choice, then the browser's languages. Inside the site the current language is kept, so links
// written without a prefix stay in the reader's language.
export function localeGuard(to, from) {
  const isArrival = from === START_LOCATION
  const addressed = to.meta.locale ?? SOURCE_LOCALE
  let wanted = addressed
  if (switchingTo) {
    wanted = switchingTo
    switchingTo = null
  } else if (isArrival && !to.meta.locale) {
    wanted = rememberedLocale() ?? matchLocale(navigator.languages, localeCodes()) ?? SOURCE_LOCALE
  } else if (!isArrival) {
    wanted = from.meta.locale ?? SOURCE_LOCALE
  }

  if (!isAvailable(wanted)) {
    wanted = SOURCE_LOCALE
  }

  if (to.name !== 'not-found' && addressed !== wanted) {
    const { path } = splitLocale(to.path, localeCodes())
    return { path: localePath(path, wanted), query: to.query, hash: to.hash, replace: isArrival }
  }

  setLocale(to.name === 'not-found' ? wanted : addressed)
  return true
}

// Adds a language's pages under its prefix.
export function addLocaleRoutes(target, code) {
  localizedRoutes(
    routes.filter((route) => route.name !== 'not-found'),
    code,
  ).forEach((route) => target.addRoute(route))
}

// Takes the reader to the same page in another language and remembers the choice.
export function switchLocale(target, code) {
  const current = target.currentRoute.value
  const { path } = splitLocale(current.path, localeCodes())
  rememberLocale(code)
  switchingTo = code
  return target.push({ path: localePath(path, code), query: current.query, hash: current.hash })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
})

localeCodes()
  .filter((code) => code !== SOURCE_LOCALE)
  .forEach((code) => addLocaleRoutes(router, code))
router.beforeEach(localeGuard)

let previousPath = ''

router.afterEach((to) => {
  if (to.path === previousPath) {
    return
  }

  previousPath = to.path
  const tag = sourceTag(new URLSearchParams(to.query).toString())
  countPage(to, tag)
  if (tag) {
    const { src: _tag, ...query } = to.query
    router.replace({ path: to.path, query, hash: to.hash })
  }
})

export default router

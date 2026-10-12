import { createRouter, createWebHistory } from 'vue-router'
import { countPage, sourceTag } from '@/composables/useStats.js'

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
    path: '/prayer',
    name: 'prayer',
    component: () => import('@/views/pillar/PrayerView.vue'),
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0, behavior: 'instant' }
  },
})

let previousPath = ''

router.afterEach((to) => {
  // Only count when path actually changes
  if (to.path !== previousPath) {
    // Handle source tag from incoming link (e.g., WhatsApp shares)
    const tag = sourceTag(to.path.split('?')[1] || '')
    if (tag) {
      // Remove the tag from the URL without triggering navigation
      const cleanPath = to.path.split('?')[0]
      const cleanSearch = new URLSearchParams(to.path.split('?')[1] || '')
      cleanSearch.delete('src')
      const newSearch = cleanSearch.toString()
      const newUrl = cleanPath + (newSearch ? '?' + newSearch : '')
      window.history.replaceState({}, '', newUrl)
    }
    countPage(to)
    previousPath = to.path
  }
})

export default router

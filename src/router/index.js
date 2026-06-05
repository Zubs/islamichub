import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
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
  {
    path: '/hadith',
    name: 'hadith',
    component: () => import('@/views/hadith/HadithHomeView.vue'),
  },
  {
    path: '/hadith/books',
    name: 'hadith-books',
    component: () => import('@/views/hadith/HadithHomeView.vue'),
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
  scrollBehavior(
    to,
    from,
    savedPosition
  ) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0, behavior: 'instant' }
  },
})

export default router

<template>
  <header class="site-nav" role="banner">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo" :aria-label="$t('siteNav.islamichubHome')">
        <div class="nav-logo-mark" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            stroke-width="1.5"
          >
            <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
            <polygon points="12,6 17,9 17,15 12,18 7,15 7,9" />
          </svg>
        </div>
        <span class="nav-logo-text"
          >{{ $t('siteNav.islamic') }}<span>{{ $t('siteNav.hub') }}</span></span
        >
      </RouterLink>

      <!-- Desktop pillar nav -->
      <nav class="nav-pillars" :aria-label="$t('siteNav.fivePillarsNavigation')">
        <RouterLink
          v-for="p in pillars"
          :key="p.to"
          :to="p.to"
          class="nav-pill"
          :aria-label="$t('siteNav.pillars.' + p.key + '.label')"
        >
          <span class="nav-pill-icon" aria-hidden="true">{{ p.icon }}</span>
          <span class="nav-pill-label">{{ $t('siteNav.pillars.' + p.key + '.name') }}</span>
        </RouterLink>
      </nav>

      <!-- Desktop right links -->
      <div class="nav-right">
        <RouterLink to="/adhkar" class="nav-tools-btn">{{ $t('siteNav.adhkar') }}</RouterLink>
        <RouterLink to="/duas" class="nav-tools-btn">{{ $t('siteNav.duas') }}</RouterLink>
        <RouterLink to="/tracker" class="nav-tools-btn">{{ $t('siteNav.tracker') }}</RouterLink>
        <RouterLink to="/tasbih" class="nav-tools-btn">{{ $t('siteNav.tasbih') }}</RouterLink>
        <RouterLink to="/inheritance" class="nav-tools-btn">{{
          $t('siteNav.inheritance')
        }}</RouterLink>
        <LanguageSwitcher />
        <RouterLink to="/about" class="nav-tools-btn">{{ $t('siteNav.about') }}</RouterLink>
        <a
          :href="GITHUB_REPO"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-tools-btn"
          :aria-label="$t('siteNav.islamichubOnGithub')"
          style="display: inline-flex; align-items: center; gap: 5px; text-decoration: none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          {{ $t('siteNav.github') }}
        </a>
      </div>

      <!-- Hamburger -->
      <button
        class="nav-hamburger"
        @click="menuOpen = !menuOpen"
        :aria-expanded="String(menuOpen)"
        :aria-label="$t('siteNav.toggleNavigationMenu')"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      class="nav-mobile-menu"
      :class="{ open: menuOpen }"
      role="dialog"
      :aria-label="$t('siteNav.navigationMenu')"
    >
      <RouterLink
        v-for="item in allLinks"
        :key="item.to"
        :to="item.to"
        class="nav-mobile-item"
        @click="menuOpen = false"
      >
        <span class="icon" aria-hidden="true">{{ item.icon }}</span>
        {{ $t('siteNav.menu.' + item.key) }}
      </RouterLink>

      <hr style="border: none; border-top: 1px solid var(--border); margin: 6px 0" />

      <a
        :href="GITHUB_REPO"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-mobile-item"
        @click="menuOpen = false"
        style="text-decoration: none; color: inherit"
      >
        <span class="icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
        </span>
        {{ $t('siteNav.viewSourceOnGithub') }}
      </a>
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const GITHUB_REPO = 'https://github.com/Zubs/islamichub'
const menuOpen = ref(false)

const pillars = [
  {
    to: '/faith',
    key: 'faith',
    icon: '☪️',
  },
  {
    to: '/prayer',
    key: 'prayer',
    icon: '🕌',
  },
  {
    to: '/zakat',
    key: 'zakat',
    icon: '✦',
  },
  {
    to: '/fasting',
    key: 'fasting',
    icon: '🌙',
  },
  {
    to: '/hajj',
    key: 'hajj',
    icon: '🕋',
  },
  {
    to: '/hadith',
    key: 'hadith',
    icon: '📖',
  },
]

const allLinks = [
  {
    to: '/',
    key: 'home',
    icon: '🏠',
  },
  {
    to: '/faith',
    key: 'faith',
    icon: '☪️',
  },
  {
    to: '/prayer',
    key: 'prayer',
    icon: '🕌',
  },
  {
    to: '/zakat',
    key: 'zakat',
    icon: '✦',
  },
  {
    to: '/fasting',
    key: 'fasting',
    icon: '🌙',
  },
  {
    to: '/hajj',
    key: 'hajj',
    icon: '🕋',
  },
  {
    to: '/hadith',
    key: 'hadith',
    icon: '📖',
  },
  {
    to: '/hadith/books',
    key: 'hadithBooks',
    icon: '📚',
  },
  {
    to: '/adhkar',
    key: 'adhkar',
    icon: '📿',
  },
  {
    to: '/duas',
    key: 'duas',
    icon: '🤲',
  },
  {
    to: '/eid',
    key: 'eid',
    icon: '🌙',
  },
  {
    to: '/qurbani',
    key: 'qurbani',
    icon: '🐑',
  },
  {
    to: '/tracker',
    key: 'tracker',
    icon: '✅',
  },
  {
    to: '/tasbih',
    key: 'tasbih',
    icon: '🔢',
  },
  {
    to: '/inheritance',
    key: 'inheritance',
    icon: '⚖️',
  },
  {
    to: '/about',
    key: 'about',
    icon: 'ℹ️',
  },
  {
    to: '/changelog',
    key: 'changelog',
    icon: '📋',
  },
]
</script>

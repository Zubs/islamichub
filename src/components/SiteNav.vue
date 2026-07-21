<template>
  <header class="site-nav" role="banner">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo" aria-label="IslamicHub home">
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
        <span class="nav-logo-text">Islamic<span>Hub</span></span>
      </RouterLink>

      <!-- Desktop pillar nav -->
      <nav class="nav-pillars" aria-label="Five Pillars navigation">
        <RouterLink
          v-for="p in pillars"
          :key="p.to"
          :to="p.to"
          class="nav-pill"
          :aria-label="p.label"
        >
          <span class="nav-pill-icon" aria-hidden="true">{{ p.icon }}</span>
          <span class="nav-pill-label">{{ p.name }}</span>
        </RouterLink>
      </nav>

      <!-- Desktop right links -->
      <div class="nav-right">
        <RouterLink to="/adhkar" class="nav-tools-btn">📿 Adhkar</RouterLink>
        <RouterLink to="/inheritance" class="nav-tools-btn">⚖️ Inheritance</RouterLink>
        <RouterLink to="/about" class="nav-tools-btn">About</RouterLink>
        <a
          :href="GITHUB_REPO"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-tools-btn"
          aria-label="IslamicHub on GitHub"
          style="display: inline-flex; align-items: center; gap: 5px; text-decoration: none"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          GitHub
        </a>
      </div>

      <!-- Hamburger -->
      <button
        class="nav-hamburger"
        @click="menuOpen = !menuOpen"
        :aria-expanded="String(menuOpen)"
        aria-label="Toggle navigation menu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      class="nav-mobile-menu"
      :class="{ open: menuOpen }"
      role="dialog"
      aria-label="Navigation menu"
    >
      <RouterLink
        v-for="item in allLinks"
        :key="item.to"
        :to="item.to"
        class="nav-mobile-item"
        @click="menuOpen = false"
      >
        <span class="icon" aria-hidden="true">{{ item.icon }}</span>
        {{ item.label }}
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
        View source on GitHub
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const GITHUB_REPO = 'https://github.com/Zubs/pillarsofislam'
const menuOpen = ref(false)

const pillars = [
  {
    to: '/faith',
    icon: '☪️',
    name: 'Faith',
    label: 'Faith — Shahada'
  },
  {
    to: '/prayer',
    icon: '🕌',
    name: 'Prayer',
    label: 'Prayer — Salah and prayer times'
  },
  {
    to: '/zakat',
    icon: '✦',
    name: 'Zakat',
    label: 'Zakat calculator'
  },
  {
    to: '/fasting',
    icon: '🌙',
    name: 'Fasting',
    label: 'Fasting — Sawm and Ramadan'
  },
  {
    to: '/hajj',
    icon: '🕋',
    name: 'Hajj',
    label: 'Hajj — Pilgrimage guide'
  },
  {
    to: '/hadith',
    icon: '📖',
    name: 'Hadith',
    label: 'Hadith — Prophetic tradition and library'
  },
]

const allLinks = [
  {
    to: '/',
    icon: '🏠',
    label: 'Home'
  },
  {
    to: '/faith',
    icon: '☪️',
    label: 'Faith (Shahada)'
  },
  {
    to: '/prayer',
    icon: '🕌',
    label: 'Prayer (Salah) & Prayer Times'
  },
  {
    to: '/zakat',
    icon: '✦',
    label: 'Zakat Calculator'
  },
  {
    to: '/fasting',
    icon: '🌙',
    label: 'Fasting (Sawm) & Ramadan'
  },
  {
    to: '/hajj',
    icon: '🕋',
    label: 'Hajj — Pilgrimage Guide'
  },
  {
    to: '/hadith',
    icon: '📖',
    label: 'Hadith — Prophetic Tradition'
  },
  {
    to: '/hadith/books',
    icon: '📚',
    label: 'Hadith Library'
  },
  {
    to: '/adhkar',
    icon: '📿',
    label: 'Adhkar & Duas',
  },
  {
    to: '/inheritance',
    icon: '⚖️',
    label: "Inheritance (Fara'id) Calculator"
  },
  {
    to: '/about',
    icon: 'ℹ️',
    label: 'About & Contributors'
  },
  {
    to: '/changelog',
    icon: '📋',
    label: 'Changelog'
  },
]
</script>

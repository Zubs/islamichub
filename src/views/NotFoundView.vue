<template>
  <div class="nf-page">
    <!-- Geometric background -->
    <div class="nf-bg" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" class="nf-bg-svg">
        <defs>
          <pattern id="nf-gp" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <polygon points="60,5 115,33 115,87 60,115 5,87 5,33"
                     fill="none" stroke="var(--green)" stroke-width="0.6" opacity="0.18"/>
            <polygon points="60,20 100,42 100,78 60,100 20,78 20,42"
                     fill="none" stroke="var(--gold)" stroke-width="0.35" opacity="0.12"/>
            <line x1="60" y1="5" x2="60" y2="115" stroke="var(--green)" stroke-width="0.2"
                  opacity="0.1"/>
            <line x1="5" y1="33" x2="115" y2="87" stroke="var(--green)" stroke-width="0.2"
                  opacity="0.1"/>
            <line x1="115" y1="33" x2="5" y2="87" stroke="var(--green)" stroke-width="0.2"
                  opacity="0.1"/>
            <rect x="57" y="57" width="6" height="6" fill="var(--gold)" opacity="0.2"
                  transform="rotate(45 60 60)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nf-gp)"/>
      </svg>
    </div>

    <!-- Hanging ornaments -->
    <div class="nf-ornament nf-ornament-left" aria-hidden="true"></div>
    <div class="nf-ornament nf-ornament-right" aria-hidden="true"></div>

    <div class="nf-inner">

      <!-- Top kufic divider -->
      <div class="nf-divider-top" aria-hidden="true">
        <div class="nf-divider-line"></div>
        <div class="nf-divider-gem"></div>
        <div class="nf-divider-line"></div>
      </div>

      <!-- Arabic 404 -->
      <div class="nf-numerals" aria-hidden="true">
        <span class="nf-digit nf-digit-4a">٤</span>
        <span class="nf-digit nf-digit-0">٠</span>
        <span class="nf-digit nf-digit-4b">٤</span>
      </div>

      <!-- Latin 404 -->
      <div class="nf-latin-num" aria-label="404">404</div>

      <!-- Ornament divider -->
      <div class="nf-gem-row" aria-hidden="true">
        <div class="nf-gem-line"></div>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <polygon points="16,2 30,16 16,30 2,16" fill="none" stroke="var(--gold)"
                   stroke-width="1.2"/>
          <polygon points="16,7 25,16 16,25 7,16" fill="none" stroke="var(--gold)"
                   stroke-width="0.6" opacity="0.5"/>
          <circle cx="16" cy="16" r="2" fill="var(--gold)" opacity="0.7"/>
        </svg>
        <div class="nf-gem-line"></div>
      </div>

      <!-- Heading + body -->
      <div class="nf-text">
        <h1 class="nf-heading">Page not found</h1>
        <p class="nf-arabic" lang="ar">وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ</p>
        <p class="nf-ayah-ref">Qur'an 65:3</p>
        <p class="nf-body">
          "And whoever relies upon Allah — then He is sufficient for him."
          <br>
          The page you were looking for doesn't exist — but you're always in the right place with
          Allah.
        </p>
      </div>

      <!-- Navigation options -->
      <div class="nf-actions">
        <RouterLink to="/" class="btn btn-primary btn-lg nf-btn-home">
          ← Return home
        </RouterLink>
        <div class="nf-pillar-links" role="navigation" aria-label="Quick pillar links">
          <span class="nf-links-label">Or go directly to:</span>
          <div class="nf-links-grid">
            <RouterLink v-for="p in pillars" :key="p.to" :to="p.to" class="nf-pillar-link">
              <span class="nf-pl-icon" aria-hidden="true">{{ p.icon }}</span>
              <span class="nf-pl-name">{{ p.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Bottom divider -->
      <div class="nf-divider-top" style="margin-top:3rem" aria-hidden="true">
        <div class="nf-divider-line"></div>
        <div class="nf-divider-gem"></div>
        <div class="nf-divider-line"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Page Not Found — IslamicHub',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const pillars = [
  {
    to: '/faith',
    icon: '☪️',
    name: 'Faith'
  },
  {
    to: '/prayer',
    icon: '🕌',
    name: 'Prayer'
  },
  {
    to: '/zakat',
    icon: '✦',
    name: 'Zakat'
  },
  {
    to: '/fasting',
    icon: '🌙',
    name: 'Fasting'
  },
  {
    to: '/hajj',
    icon: '🕋',
    name: 'Hajj'
  },
  {
    to: '/inheritance',
    icon: '⚖️',
    name: "Inheritance"
  },
]
</script>

<style scoped>
/* ── Page shell ───────────────────────────────────────────────────────────── */
.nf-page {
  min-height: calc(100vh - var(--nav-height, 64px));
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-16) var(--space-6);
}

/* ── Geometric background ─────────────────────────────────────────────────── */
.nf-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.nf-bg-svg {
  width: 100%;
  height: 100%;
}

/* ── Hanging ornaments ────────────────────────────────────────────────────── */
.nf-ornament {
  position: absolute;
  top: 0;
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  z-index: 1;
  opacity: 0.45;
}

.nf-ornament::after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--gold);
  opacity: 0.7;
}

.nf-ornament-left {
  left: clamp(24px, 6vw, 80px);
}

.nf-ornament-right {
  right: clamp(24px, 6vw, 80px);
}

/* ── Inner content ────────────────────────────────────────────────────────── */
.nf-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 680px;
  width: 100%;
  animation: nfFadeUp .7s cubic-bezier(.4, 0, .2, 1) both;
}

@keyframes nfFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Top / bottom dividers ────────────────────────────────────────────────── */
.nf-divider-top {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 320px;
  margin-bottom: 2.5rem;
}

.nf-divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(196, 147, 42, .4), transparent);
}

.nf-divider-gem {
  width: 8px;
  height: 8px;
  background: var(--gold);
  transform: rotate(45deg);
  opacity: .65;
  flex-shrink: 0;
}

/* ── Arabic 404 numerals ──────────────────────────────────────────────────── */
.nf-numerals {
  display: flex;
  align-items: baseline;
  gap: 0.1em;
  line-height: 1;
  margin-bottom: 0.15em;
  direction: rtl;
}

.nf-digit {
  font-family: var(--serif);
  font-size: clamp(7rem, 18vw, 13rem);
  font-weight: 600;
  color: var(--green);
  opacity: 0.12;
  letter-spacing: -0.02em;
  display: block;
  animation: nfDigit .9s cubic-bezier(.4, 0, .2, 1) both;
}

.nf-digit-4a {
  animation-delay: .05s;
}

.nf-digit-0 {
  animation-delay: .15s;
}

.nf-digit-4b {
  animation-delay: .25s;
}

@keyframes nfDigit {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 0.12;
    transform: translateY(0);
  }
}

/* ── Latin 404 (overlaid over the Arabic) ────────────────────────────────── */
.nf-latin-num {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 600;
  color: var(--muted);
  letter-spacing: .35em;
  text-transform: uppercase;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: nfFadeUp .6s ease .4s both;
}

/* ── Gem row ──────────────────────────────────────────────────────────────── */
.nf-gem-row {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 260px;
  margin-bottom: 2.25rem;
  opacity: 0;
  animation: nfFadeUp .5s ease .5s both;
}

.nf-gem-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(196, 147, 42, .35), transparent);
}

/* ── Text block ───────────────────────────────────────────────────────────── */
.nf-text {
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: nfFadeUp .6s ease .55s both;
}

.nf-heading {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 1.25rem;
  line-height: 1.1;
}

.nf-arabic {
  font-family: var(--arabic, var(--serif));
  font-size: clamp(1.2rem, 3vw, 1.7rem);
  color: var(--green);
  direction: rtl;
  line-height: 1.8;
  margin-bottom: .25rem;
}

.nf-ayah-ref {
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: .5px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.nf-body {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto;
}

/* ── Actions ──────────────────────────────────────────────────────────────── */
.nf-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  opacity: 0;
  animation: nfFadeUp .6s ease .7s both;
}

.nf-btn-home {
  min-width: 200px;
}

/* ── Pillar quick-links ───────────────────────────────────────────────────── */
.nf-pillar-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .75rem;
  width: 100%;
}

.nf-links-label {
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: var(--muted);
}

.nf-links-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: .5rem;
}

.nf-pillar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  transition: all .15s;
}

.nf-pillar-link:hover {
  border-color: var(--green);
  color: var(--green);
  background: var(--green-light);
  transform: translateY(-1px);
}

.nf-pl-icon {
  font-size: 14px;
}

.nf-pl-name {
  font-size: 13px;
}

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 500px) {
  .nf-ornament {
    display: none;
  }

  .nf-digit {
    font-size: clamp(5rem, 20vw, 7rem);
  }
}
</style>

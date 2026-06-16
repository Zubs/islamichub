<template>
  <footer class="site-footer" role="contentinfo">
    <div class="bg-kufic-grid dark" aria-hidden="true"></div>
    <div class="footer-inner" style="position: relative; z-index: 1">
      <div class="divider-kufic" style="margin-bottom: var(--space-8)" aria-hidden="true">
        <span class="divider-kufic-icon"></span>
      </div>
      <div class="footer-top">
        <div class="footer-brand">
          <RouterLink to="/" class="nav-logo" style="text-decoration: none">
            <div class="nav-logo-mark" aria-hidden="true">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="1.5"
              >
                <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
                <polygon points="12,6 17,9 17,15 12,18 7,15 7,9" />
              </svg>
            </div>
            <span class="nav-logo-text" style="color: #fff">Islamic<span>Hub</span></span>
          </RouterLink>
          <p>
            Free Islamic education and tools for the Muslim community — prayer times, Zakat
            calculator, Qibla finder, inheritance calculator, Hadith library, Islamic calendar, and
            scholarly guides for all Five Pillars.
          </p>
          <div style="display: flex; gap: 10px; margin-top: 1rem; flex-wrap: wrap">
            <a
              href="https://github.com/Zubs/pillarsofislam"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-link"
              aria-label="IslamicHub on GitHub"
              style="display: inline-flex; align-items: center; gap: 5px"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Five Pillars</h4>
          <RouterLink v-for="p in pillars" :key="p.to" :to="p.to">{{ p.label }}</RouterLink>
        </div>

        <div class="footer-col">
          <h4>Tools</h4>
          <RouterLink to="/zakat">Zakat Calculator</RouterLink>
          <RouterLink to="/prayer">Prayer Times</RouterLink>
          <RouterLink to="/prayer">Qibla Finder</RouterLink>
          <RouterLink to="/inheritance">Inheritance Calculator</RouterLink>
          <RouterLink to="/fasting">Ramadan Tracker</RouterLink>
          <RouterLink to="/hadith/books">Hadith Library</RouterLink>
          <RouterLink to="/calendar">Islamic Calendar</RouterLink>
        </div>

        <div class="footer-col">
          <h4>Project</h4>
          <RouterLink to="/about">About &amp; Team</RouterLink>
          <RouterLink to="/changelog">Changelog</RouterLink>
          <a href="https://github.com/Zubs/pillarsofislam" target="_blank" rel="noopener noreferrer"
            >GitHub Repository</a
          >
          <a
            href="https://github.com/Zubs/pillarsofislam/issues"
            target="_blank"
            rel="noopener noreferrer"
            >Report an issue</a
          >
          <a
            href="https://github.com/Zubs/pillarsofislam/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            >Contribute</a
          >
        </div>
      </div>

      <div class="footer-bottom">
        <span>
          © 2026 IslamicHub — Built by
          <a
            href="https://github.com/Zubs"
            target="_blank"
            rel="noopener noreferrer"
            style="color: rgba(255, 255, 255, 0.55); text-decoration: none"
            >Zubair</a
          >
          &amp;
          <a
            href="https://github.com/yusuf-saif"
            target="_blank"
            rel="noopener noreferrer"
            style="color: rgba(255, 255, 255, 0.55); text-decoration: none"
            >Yusuf</a
          >
        </span>
        <span style="direction: rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
      </div>

      <p class="footer-disc">
        Disclaimer: IslamicHub is an educational and guidance tool — not a fatwa or formal religious
        ruling. Prayer times are calculated astronomically and may differ from local mosque
        announcements. For personal religious rulings, consult a qualified Islamic scholar (mufti).
        Built with sincerity for the Muslim community.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const pillars = [
  { to: '/faith', label: 'Faith (Shahada)' },
  { to: '/prayer', label: 'Prayer (Salah)' },
  { to: '/zakat', label: 'Zakat' },
  { to: '/fasting', label: 'Fasting (Sawm)' },
  { to: '/hajj', label: 'Hajj' },
  { to: '/hadith', label: 'Hadith' },
]
</script>

<style scoped>
.footer-social-link {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  transition: all 0.15s;
}
.footer-social-link:hover {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>

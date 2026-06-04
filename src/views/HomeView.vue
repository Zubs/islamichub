<template>
  <div>
    <!-- HERO -->
    <section class="hero-section" aria-label="IslamicHub — Islamic education and tools">
      <div class="bg-kufic-grid" aria-hidden="true"></div>
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="hero-inner">
        <div>
          <div class="hero-badge" role="note">Free · Scholarly · No account needed</div>
          <h1 class="hero-title">
            Learn &amp; live the<br><em>Five Pillars of Islam</em>
          </h1>
          <p class="hero-body">
            IslamicHub is a free Islamic education and tools platform — accurate prayer times with
            Qibla
            finder, Zakat calculator with live gold and silver prices, Islamic inheritance (Fara'id)
            calculator, and in-depth guides for all five pillars, grounded in Qur'an, Hadith, and
            all four
            schools of thought.
          </p>
          <div class="btn-group">
            <RouterLink to="/faith" class="btn btn-primary btn-lg">Explore the Five Pillars
            </RouterLink>
            <RouterLink to="/zakat" class="btn btn-secondary btn-lg">Zakat Calculator</RouterLink>
          </div>
          <div class="hero-stats" aria-label="Platform highlights">
            <div>
              <div class="stat-num">5</div>
              <div class="stat-lbl">Pillars covered</div>
            </div>
            <div>
              <div class="stat-num">{{ hijri.monthName.split(' ')[0] }}</div>
              <div class="stat-lbl">{{ hijri.year }} AH · today</div>
            </div>
            <div>
              <div class="stat-num">{{ inRamadan ? '🌙' : daysLeft + 'd' }}</div>
              <div class="stat-lbl">{{ inRamadan ? 'Ramadan Mubarak' : 'until Ramadan' }}</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="card" style="border-left:4px solid var(--green)"
               aria-label="Today's Islamic date">
            <div
              style="font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:6px">
              Today
            </div>
            <div
              style="font-family:var(--serif);font-size:1.35rem;font-weight:600;margin-bottom:2px">
              {{ today }}
            </div>
            <div style="font-size:13.5px;color:var(--muted)">{{ hijri.formatted }}</div>
            <div v-if="inRamadan"
                 style="margin-top:8px;font-size:12px;background:var(--fasting-light);color:var(--fasting-color);padding:4px 10px;border-radius:10px;display:inline-block;font-weight:500">
              🌙 Ramadan Day {{ hijri.day }}
            </div>
          </div>

          <QuranBlock
            arabic="وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ"
            reference="Qur'an 2:43"
            translation="Establish prayer and give Zakat."
            note="The two pillars most frequently paired in the Qur'an, named together in over 30 verses."
            :framed="true"
            :animate="false"
          />
        </div>
      </div>
    </section>

    <!-- FIVE PILLARS HUB -->
    <section class="section" style="background:var(--cream-dark)" aria-labelledby="pillars-heading">
      <div class="section-wide">
        <span class="eyebrow">The Five Pillars of Islam · أركان الإسلام</span>
        <h2 class="section-title" id="pillars-heading">Understand and practise each pillar</h2>
        <p class="section-sub">Every pillar has a dedicated page with scholarly education
          <em>and</em> a
          practical tool — learn the ruling, understand the evidence, and fulfil the obligation.</p>
        <div class="pillars-hub" style="margin-top:var(--space-8)" role="list">
          <RouterLink
            v-for="p in pillars" :key="p.to"
            :to="p.to"
            class="pillar-hub-card" :class="p.cardClass"
            :data-num="p.num"
            role="listitem"
            :aria-label="p.ariaLabel"
          >
            <div class="phc-icon" aria-hidden="true">{{ p.icon }}</div>
            <div class="phc-name">{{ p.name }}</div>
            <div class="phc-sub">{{ p.sub }}</div>
            <span class="phc-tag">{{ p.tag }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- TOOLS -->
    <section class="section" aria-labelledby="tools-heading">
      <div class="section-wide">
        <span class="eyebrow">Islamic Tools</span>
        <h2 class="section-title" id="tools-heading">Practical tools for daily Islamic practice</h2>
        <p class="section-sub">Accurate, free, and private — every tool runs entirely in your
          browser with no account required and no data stored.</p>
        <div class="tools-strip" style="margin-top:var(--space-8)" role="list">
          <RouterLink v-for="t in tools" :key="t.to" :to="t.to" class="tool-card" role="listitem"
                      :aria-label="t.aria">
            <span class="tc-icon" aria-hidden="true">{{ t.icon }}</span>
            <div>
              <div class="tc-name">{{ t.name }}</div>
              <div class="tc-desc">{{ t.desc }}</div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- WHY -->
    <section class="section" style="background:var(--cream-dark)" aria-labelledby="why-heading">
      <div class="section-wide">
        <span class="eyebrow">Why IslamicHub</span>
        <h2 class="section-title" id="why-heading">Scholarly accuracy meets modern tools</h2>
        <div class="why-grid"
             style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;margin-top:var(--space-8)">
          <div class="prose">
            <p>IslamicHub is a free Islamic learning platform that combines in-depth education with
              practical digital tools. Unlike apps that give you a number with no explanation, every
              section here gives you both: the ruling and the evidence behind it.</p>
            <p>Our <strong>Zakat calculator</strong> fetches live gold and silver spot prices,
              applies your chosen Nisab method (85g gold or 595g silver), deducts valid debts, and
              shows a precise figure — alongside the Qur'anic verse and Hadith references that
              establish each rule.</p>
            <p>Our <strong>prayer times calculator</strong> uses a full astronomical algorithm to
              compute prayer times for any coordinates on Earth — with five calculation methods. The
              same tool gives you the <strong>Qibla direction</strong> as an exact compass bearing.
            </p>
            <p>Our <strong>Islamic inheritance calculator</strong> implements the complete Fara'id
              system from Qur'an 4:11–12 and 4:176 — all 13 heir types, automatic hijab (blocking)
              rules, and awl (proportional reduction).</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:1rem">
            <div v-for="f in features" :key="f.title" class="card"
                 style="display:flex;gap:14px;align-items:flex-start;padding:1rem 1.25rem">
              <div style="font-size:20px;flex-shrink:0;margin-top:2px" aria-hidden="true">{{
                  f.icon
                }}
              </div>
              <div>
                <div
                  style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:.25rem">
                  {{ f.title }}
                </div>
                <div style="font-size:13px;color:var(--muted);line-height:1.6">{{ f.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DARK FEATURE GRID -->
    <section class="section" style="background:var(--ink)" aria-labelledby="features-heading">
      <div class="section-wide">
        <span class="eyebrow" style="color:#8BC4A8">What's inside</span>
        <h2 class="section-title" style="color:#fff;margin-bottom:var(--space-8)"
            id="features-heading">
          Everything a Muslim needs in one place
        </h2>
        <div class="card-grid card-grid-3" role="list">
          <article v-for="f in darkFeatures" :key="f.title"
                   class="card card-dark" style="border:1px solid rgba(255,255,255,.08)"
                   role="listitem">
            <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">{{ f.icon }}</div>
            <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
              {{ f.title }}</h3>
            <p
              style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
              {{ f.desc }}</p>
            <RouterLink :to="f.to" class="btn btn-sm"
                        style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none">
              {{ f.cta }} →
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <!-- BUILDERS -->
    <section class="section" aria-labelledby="team-heading">
      <div class="section-wide">
        <span class="eyebrow">Open source project</span>
        <h2 class="section-title" id="team-heading" style="margin-bottom:.75rem">Built by the
          community, for the community</h2>
        <p class="section-sub" style="margin-bottom:var(--space-8)">IslamicHub is open source, built
          by Zubair Idris Aweda and Yusuf Saif, and open to contributions from any Muslim who wants
          to help improve it.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:640px">
          <a v-for="b in builders" :key="b.login"
             :href="'https://github.com/' + b.login"
             target="_blank" rel="noopener noreferrer"
             class="builder-mini-card">
            <img :src="b.avatar" :alt="'Photo of ' + b.name" width="44" height="44"
                 style="border-radius:50%;border:2px solid var(--border);flex-shrink:0"
                 loading="lazy"
                 @error="(e) => e.target.style.display = 'none'">
            <div>
              <div
                style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:1px">
                {{ b.name }}
              </div>
              <div style="font-size:11.5px;color:var(--muted)">{{ b.role }}</div>
            </div>
          </a>
        </div>
        <div style="margin-top:1.5rem">
          <RouterLink to="/about" class="btn btn-secondary">About the project &amp; how to
            contribute →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="padding-top:0">
      <div class="section-wide">
        <div class="cta-strip">
          <div class="ornament-hanging left" aria-hidden="true"></div>
          <div class="ornament-hanging right" aria-hidden="true"></div>
          <GeoPattern/>
          <h2>Begin with the first pillar</h2>
          <p>Start with the Shahada — the declaration that anchors everything in Islam — then work
            through each pillar with education and practical tools.</p>
          <div class="btn-group" style="justify-content:center">
            <RouterLink to="/faith" class="btn btn-white btn-lg">Start with Faith →</RouterLink>
            <RouterLink to="/prayer" class="btn btn-secondary btn-lg"
                        style="color:#fff;border-color:rgba(255,255,255,.3)">Prayer Times &amp;
              Qibla
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import QuranBlock from '@/components/QuranBlock.vue'
import GeoPattern from '@/components/GeoPattern.vue'
import {
  toHijri,
  daysToRamadan,
  isRamadan
} from '@/utils/hijri.js'

useSeo('home')
useScrollReveal()

const hijri = toHijri()
const inRamadan = isRamadan()
const daysLeft = Math.round(daysToRamadan())
const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
})

const pillars = [
  {
    to: '/faith',
    num: '١',
    cardClass: 'phc-faith',
    icon: '☪️',
    name: 'Shahada',
    sub: 'Declaration of Faith · Tawhid',
    tag: 'Educational',
    ariaLabel: 'Faith — Shahada'
  },
  {
    to: '/prayer',
    num: '٢',
    cardClass: 'phc-prayer',
    icon: '🕌',
    name: 'Salah',
    sub: 'Prayer Times & Qibla',
    tag: '+ Live calculator',
    ariaLabel: 'Prayer — Salah and prayer times'
  },
  {
    to: '/zakat',
    num: '٣',
    cardClass: 'phc-zakat',
    icon: '✦',
    name: 'Zakat',
    sub: 'Almsgiving · Live prices',
    tag: '+ Calculator',
    ariaLabel: 'Zakat calculator'
  },
  {
    to: '/fasting',
    num: '٤',
    cardClass: 'phc-fasting',
    icon: '🌙',
    name: 'Sawm',
    sub: 'Ramadan & Fasting',
    tag: '+ Ramadan tracker',
    ariaLabel: 'Fasting — Sawm and Ramadan'
  },
  {
    to: '/hajj',
    num: '٥',
    cardClass: 'phc-hajj',
    icon: '🕋',
    name: 'Hajj',
    sub: 'Pilgrimage to Makkah',
    tag: '+ Rites guide',
    ariaLabel: 'Hajj — Pilgrimage guide'
  },
]

const tools = [
  {
    to: '/zakat',
    icon: '⚖️',
    name: 'Zakat Calculator',
    desc: 'Live gold & silver prices · dual Nisab methods · all asset types including shares, ISAs, and pension',
    aria: 'Open Zakat calculator'
  },
  {
    to: '/prayer',
    icon: '🕐',
    name: 'Prayer Times',
    desc: 'Fajr, Dhuhr, Asr, Maghrib & Isha for your city · 5 calculation methods · live countdown',
    aria: 'Prayer times for your city'
  },
  {
    to: '/prayer',
    icon: '🧭',
    name: 'Qibla Finder',
    desc: "Precise compass bearing to the Ka'bah · distance to Makkah in km · works from any location",
    aria: 'Find Qibla direction'
  },
  {
    to: '/inheritance',
    icon: '📜',
    name: "Inheritance (Fara'id)",
    desc: "Qur'anic shares for all heirs · automatic blocking rules · visual breakdown by amount and percentage",
    aria: 'Islamic inheritance calculator'
  },
]

const features = [
  {
    icon: '📖',
    title: "Qur'an & Hadith first",
    desc: "Every ruling is cited back to its primary source. We don't just give you an answer; we tell you why."
  },
  {
    icon: '🕌',
    title: 'All four schools',
    desc: 'Hanafi, Maliki, Shafi\'i, and Hanbali positions are considered. Disagreements are surfaced, not hidden.'
  },
  {
    icon: '🔒',
    title: 'Private by design',
    desc: 'No account. No tracking. Everything runs in your browser. Your financial and religious information stays with you.'
  },
  {
    icon: '🌍',
    title: 'Multi-currency',
    desc: 'GBP, USD, EUR, or SAR — with live exchange rates fetched automatically alongside metal prices.'
  },
  {
    icon: '🤝',
    title: 'Open source',
    desc: 'The entire platform is open source on GitHub. Contributions, corrections, and translations are welcome.'
  },
]

const darkFeatures = [
  {
    icon: '⚖️',
    title: 'Accurate Zakat Calculator with Live Gold Prices',
    desc: 'Calculate Zakat on cash, savings, gold and silver (by weight and purity), shares, ISAs, pensions, and business inventory. Live spot prices. Dual Nisab. Full debt deduction.',
    to: '/zakat',
    cta: 'Open calculator'
  },
  {
    icon: '🕌',
    title: 'Reliable Prayer Times for Any City + Qibla',
    desc: 'Fajr, Dhuhr, Asr, Maghrib, Isha for your exact coordinates. Five calculation methods. Live countdown. Animated Qibla compass.',
    to: '/prayer',
    cta: 'Find prayer times'
  },
  {
    icon: '📜',
    title: "Free Islamic Inheritance Calculator (Fara'id)",
    desc: "Qur'anic shares for all 13 heir types. Auto-applies blocking rules. Visual percentage and amount breakdown. Based on Qur'an 4:11–12.",
    to: '/inheritance',
    cta: 'Calculate inheritance'
  },
  {
    icon: '☪️',
    title: 'Understand the First Pillar — Shahada & Tawhid',
    desc: "The declaration of faith, its seven conditions, the three dimensions of Tawhid, and Risala — with Qur'anic verses and Hadith.",
    to: '/faith',
    cta: 'Learn about faith'
  },
  {
    icon: '🌙',
    title: 'Ramadan Fasting Tracker — Suhoor & Iftar Times',
    desc: 'Live Suhoor and Iftar times for your location. Fasting progress bar. Ramadan countdown. Comprehensive Sawm rulings.',
    to: '/fasting',
    cta: 'Track your fast'
  },
  {
    icon: '🕋',
    title: 'Pilgrimage to Makkah — Complete Hajj Rites Guide',
    desc: 'Day-by-day rites for all five days. Three types of Hajj explained. Full Umrah guide. Scholarly rulings from all four schools.',
    to: '/hajj',
    cta: 'Read the Hajj guide'
  },
]

const builders = [
  {
    name: 'Zubair Idris Aweda',
    role: 'Software Engineer & Technical Writer',
    login: 'Zubs',
    avatar: 'https://avatars.githubusercontent.com/u/53227444?v=4'
  },
  {
    name: 'Yusuf Saif',
    role: 'Project Manager & Technical Strategist',
    login: 'yusuf-saif',
    avatar: 'https://avatars.githubusercontent.com/u/54576722?v=4'
  },
]
</script>

<style scoped>
.why-grid {
}

.builder-mini-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: box-shadow .15s;
}

.builder-mini-card:hover {
  box-shadow: var(--shadow);
}

@media (max-width: 900px) {
  .hero-inner > div:last-child {
    display: none;
  }

  .why-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 640px) {
  .builder-mini-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>

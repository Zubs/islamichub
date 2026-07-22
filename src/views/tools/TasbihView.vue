<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          Daily Worship &nbsp;·&nbsp; السبحة
        </div>
        <h1>Tasbih Counter</h1>
        <p>
          A digital dhikr counter — pick a phrase, set a target, and tap to count. Your daily and
          lifetime totals are saved on this device.
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <!-- Phrase picker -->
      <div class="tsb-phrase-picker anim-target">
        <button
          v-for="p in store.phrases"
          :key="p.id"
          class="tsb-phrase-pill"
          :class="{ active: store.currentId === p.id }"
          @click="store.selectPhrase(p.id)"
        >
          <span class="tpp-arabic" lang="ar" dir="rtl">{{ p.arabic }}</span>
          <span class="tpp-translit">{{ p.transliteration }}</span>
        </button>
      </div>

      <!-- Counter -->
      <div class="tsb-counter-card">
        <div class="bg-kufic-grid dark" aria-hidden="true"></div>

        <div class="tsb-current-arabic" lang="ar" dir="rtl">{{ store.currentPhrase.arabic }}</div>
        <div class="tsb-current-translit">{{ store.currentPhrase.transliteration }}</div>
        <div class="tsb-current-translation">{{ store.currentPhrase.translation }}</div>

        <button
          class="tsb-ring"
          :style="ringStyle"
          @click="store.tap()"
          :aria-label="`Tap to count — ${store.count} of ${store.target}`"
        >
          <div class="tsb-ring-inner">
            <div class="tsb-count">{{ store.count }}</div>
            <div class="tsb-target">/ {{ store.target }}</div>
          </div>
        </button>

        <div class="tsb-actions">
          <button class="btn btn-secondary tsb-reset-btn" @click="store.reset()">↺ Reset</button>
          <div class="tsb-target-field">
            <label for="tsb-target-input">Target</label>
            <input
              id="tsb-target-input"
              type="number"
              class="input-field"
              min="1"
              :value="store.target"
              @change="store.setTarget($event.target.value)"
            />
          </div>
        </div>

        <div class="tsb-presets">
          <span class="tsb-presets-label">Quick set:</span>
          <button
            v-for="n in [33, 99, 100]"
            :key="n"
            class="pill-btn"
            :class="{ active: store.target === n }"
            @click="store.setTarget(n)"
          >
            {{ n }}
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="tsb-stats anim-target">
        <div class="tsb-stat">
          <div class="tsb-stat-num">{{ store.todayTotalForCurrent }}</div>
          <div class="tsb-stat-label">Today · this phrase</div>
        </div>
        <div class="tsb-stat">
          <div class="tsb-stat-num">{{ store.lifetimeTotalForCurrent }}</div>
          <div class="tsb-stat-label">Lifetime · this phrase</div>
        </div>
        <div class="tsb-stat">
          <div class="tsb-stat-num">{{ store.todayTotalAllPhrases }}</div>
          <div class="tsb-stat-label">Today · all dhikr</div>
        </div>
        <div class="tsb-stat">
          <div class="tsb-stat-num">{{ store.lifetimeTotalAllPhrases }}</div>
          <div class="tsb-stat-label">Lifetime · all dhikr</div>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Educational -->
      <span class="eyebrow">The virtue of dhikr</span>
      <h2 class="section-title" style="font-size: clamp(1.5rem, 2.5vw, 1.9rem)">
        Why count your dhikr?
      </h2>
      <div class="prose">
        <p>
          Tasbih (تَسْبِيح) — glorifying Allah through repeated remembrance — is one of the simplest
          and most rewarded acts of worship. Traditionally counted on prayer beads (misbaha) or the
          fingers of the right hand, a digital counter serves the same purpose: keeping an accurate,
          distraction-free tally so the heart stays focused on the words rather than the count.
        </p>
      </div>

      <div class="hadith-block anim-target">
        <div class="hadith-source">Sahih Muslim 2691</div>
        <div class="hadith-text">
          "Whoever says 'Glory be to Allah and praise Him' one hundred times a day will have their
          sins forgiven, even if they were like the foam of the sea." — The Prophet Muhammad ﷺ
        </div>
      </div>

      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>Pair it with your daily adhkar</h2>
        <p>
          The tasbih counter works well alongside the morning, evening, and after-prayer adhkar —
          each has its own recommended repetitions built in.
        </p>
        <RouterLink to="/adhkar" class="btn btn-white btn-lg">Open Adhkar &amp; Duas →</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { useTasbihStore } from '@/stores/tasbih.js'

useHead({
  title: 'Tasbih Counter — Digital Dhikr Counter | IslamicHub',
  meta: [
    {
      name: 'description',
      content:
        'A free digital tasbih counter for dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar, and more. Set a target, tap to count, and track your daily and lifetime totals.',
    },
  ],
})
useScrollReveal()

const store = useTasbihStore()

const ringStyle = computed(() => {
  const pct = Math.min(100, Math.round((store.count / store.target) * 100))
  const color = pct >= 100 ? 'var(--gold)' : 'var(--green-mid)'
  return {
    background: `conic-gradient(${color} ${pct}%, rgba(255,255,255,.12) ${pct}%)`,
  }
})
</script>

<style scoped>
/* ── Phrase picker ─────────────────────────────────────────────── */
.tsb-phrase-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.75rem 0;
}

.tsb-phrase-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--sans);
}

.tsb-phrase-pill:hover {
  border-color: var(--gold);
}

.tsb-phrase-pill.active {
  background: var(--gold-light);
  border-color: var(--gold);
}

.tpp-arabic {
  font-family: var(--arabic, var(--serif));
  font-size: 1rem;
  color: var(--ink);
}

.tpp-translit {
  font-size: 10.5px;
  color: var(--muted);
}

/* ── Counter card ──────────────────────────────────────────────── */
.tsb-counter-card {
  background: var(--ink);
  border-radius: var(--radius-xl);
  padding: 2.5rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.tsb-current-arabic {
  font-family: var(--arabic, var(--serif));
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: #fff;
  position: relative;
  z-index: 1;
  margin-bottom: 0.3rem;
}

.tsb-current-translit {
  font-size: 13px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.55);
  position: relative;
  z-index: 1;
}

.tsb-current-translation {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1.75rem;
  position: relative;
  z-index: 1;
}

/* Tappable ring */
.tsb-ring {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.75rem;
  position: relative;
  z-index: 1;
  transition: transform 0.08s ease;
}

.tsb-ring:active {
  transform: scale(0.96);
}

.tsb-ring-inner {
  width: 168px;
  height: 168px;
  border-radius: 50%;
  background: var(--ink);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tsb-count {
  font-family: var(--serif);
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  line-height: 1;
}

.tsb-target {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 4px;
}

.tsb-actions {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  position: relative;
  z-index: 1;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.tsb-reset-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: none;
}

.tsb-reset-btn:hover {
  background: rgba(255, 255, 255, 0.16);
}

.tsb-target-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.tsb-target-field label {
  font-size: 10.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.tsb-target-field input {
  width: 90px;
  text-align: center;
}

.tsb-presets {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.tsb-presets-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.tsb-presets .pill-btn {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
}

.tsb-presets .pill-btn.active,
.tsb-presets .pill-btn:hover {
  background: var(--gold);
  border-color: var(--gold);
  color: #fff;
}

/* ── Stats ─────────────────────────────────────────────────────── */
.tsb-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin: 1.5rem 0 2rem;
}

.tsb-stat {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1rem 0.75rem;
  text-align: center;
}

.tsb-stat-num {
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--green);
  line-height: 1;
  margin-bottom: 4px;
}

.tsb-stat-label {
  font-size: 10.5px;
  color: var(--muted);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .tsb-stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>

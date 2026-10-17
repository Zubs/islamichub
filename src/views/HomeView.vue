<template>
  <div>
    <!-- HERO -->
    <section class="hero-section" :aria-label="c('header.islamichubIslamicEducationAndTools')">
      <div class="bg-kufic-grid" aria-hidden="true"></div>
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="hero-inner">
        <div>
          <div class="hero-badge" role="note">{{ c('header.freeScholarlyNoAccountNeeded') }}</div>
          <h1 class="hero-title">
            {{ c('header.learnLiveThe') }}<br /><em>{{ c('header.fivePillars') }}</em>
          </h1>
          <p class="hero-body">
            {{ c('header.islamichubIsAFreeIslamicEducation') }}
          </p>
          <div class="btn-group">
            <RouterLink to="/faith" class="btn btn-primary btn-lg"
              >{{ c('header.exploreTheFivePillars') }}
            </RouterLink>
            <RouterLink to="/zakat" class="btn btn-secondary btn-lg">{{
              c('header.zakatCalculator')
            }}</RouterLink>
          </div>
          <div class="hero-stats" :aria-label="c('header.platformHighlights')">
            <div>
              <div class="stat-num">5</div>
              <div class="stat-lbl">{{ c('header.pillarsCovered') }}</div>
            </div>
            <div>
              <div class="stat-num">{{ hijri.monthName }}</div>
              <div class="stat-lbl">{{ c('header.ahToday', { a: hijri.year }) }}</div>
            </div>
            <div>
              <div class="stat-num">{{ inRamadan ? '🌙' : $t('common.days', daysLeft) }}</div>
              <div class="stat-lbl">
                {{ inRamadan ? c('header.ramadanMubarak') : c('header.untilRamadan') }}
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px">
          <div
            class="card"
            style="border-inline-start: 4px solid var(--green)"
            :aria-label="c('header.todaySIslamicDate')"
          >
            <div
              style="
                font-size: 10.5px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.6px;
                color: var(--muted);
                margin-bottom: 6px;
              "
            >
              {{ c('header.today') }}
            </div>
            <div
              style="
                font-family: var(--serif);
                font-size: 1.35rem;
                font-weight: 600;
                margin-bottom: 2px;
              "
            >
              {{ today }}
            </div>
            <div style="font-size: 13.5px; color: var(--muted)">{{ hijri.formatted }}</div>
            <div
              v-if="inRamadan"
              style="
                margin-top: 8px;
                font-size: 12px;
                background: var(--fasting-light);
                color: var(--fasting-color);
                padding: 4px 10px;
                border-radius: 10px;
                display: inline-block;
                font-weight: 500;
              "
            >
              {{ c('header.ramadanDay', { a: hijri.day }) }}
            </div>
          </div>

          <QuranBlock
            arabic="وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ"
            reference="Qur'an 2:43"
            :translation="c('header.establishPrayerAndGiveZakat')"
            :note="c('header.theTwoPillarsMostFrequentlyPaired')"
            :framed="true"
            :animate="false"
          />
        </div>
      </div>
    </section>
    <TodayPanel />

    <!-- FIVE PILLARS HUB -->
    <section
      class="section"
      style="background: var(--cream-dark)"
      aria-labelledby="pillars-heading"
    >
      <div class="section-wide">
        <span class="eyebrow">{{ c('theFivePillarsOf.theFivePillars') }}</span
        ><UntranslatedNote v-if="untranslated('theFivePillarsOf')" />
        <h2 class="section-title" id="pillars-heading">
          {{ c('theFivePillarsOf.understandAndPractiseEachPillar') }}
        </h2>
        <p class="section-sub">
          {{ c('theFivePillarsOf.everyPillarHasADedicatedPage') }}
          <em>{{ c('theFivePillarsOf.and') }}</em>
          {{ c('theFivePillarsOf.aPracticalToolLearnTheRuling') }}
        </p>
        <ul class="pillars-hub" style="margin-top: var(--space-8)">
          <li v-for="p in pillars" :key="p.to">
            <RouterLink
              :to="p.to"
              class="pillar-hub-card"
              :class="p.cardClass"
              :data-num="p.num"
              :aria-label="p.ariaLabel"
            >
              <div class="phc-icon" aria-hidden="true">{{ p.icon }}</div>
              <div class="phc-name">{{ p.name }}</div>
              <div class="phc-sub">{{ p.sub }}</div>
              <span class="phc-tag">{{ p.tag }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- TOOLS -->
    <section class="section" aria-labelledby="tools-heading">
      <div class="section-wide">
        <span class="eyebrow">{{ c('islamicTools.islamicTools') }}</span
        ><UntranslatedNote v-if="untranslated('islamicTools')" />
        <h2 class="section-title" id="tools-heading">
          {{ c('islamicTools.practicalToolsForDailyIslamicPractice') }}
        </h2>
        <p class="section-sub">
          {{ c('islamicTools.accurateFreeAndPrivateEveryTool') }}
        </p>
        <ul class="tools-strip" style="margin-top: var(--space-8)">
          <li v-for="t in tools" :key="t.to">
            <RouterLink :to="t.to" class="tool-card" :aria-label="t.aria">
              <span class="tc-icon" aria-hidden="true">{{ t.icon }}</span>
              <div>
                <div class="tc-name">{{ t.name }}</div>
                <div class="tc-desc"><HadithRef :text="t.desc" /></div>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- WHY -->
    <section class="section" style="background: var(--cream-dark)" aria-labelledby="why-heading">
      <div class="section-wide">
        <span class="eyebrow">{{ c('whyIslamichub.whyIslamichub') }}</span
        ><UntranslatedNote v-if="untranslated('whyIslamichub')" />
        <h2 class="section-title" id="why-heading">
          {{ c('whyIslamichub.scholarlyAccuracyMeetsModernTools') }}
        </h2>
        <div
          class="why-grid"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
            margin-top: var(--space-8);
          "
        >
          <div class="prose">
            <p>
              {{ c('whyIslamichub.islamichubIsAFreeIslamicLearning') }}
            </p>
            <p>
              {{ c('whyIslamichub.our') }} <strong>{{ c('whyIslamichub.zakatCalculator') }}</strong>
              {{ c('whyIslamichub.fetchesLiveGoldAndSilverSpot') }}
            </p>
            <p>
              {{ c('whyIslamichub.our') }}
              <strong>{{ c('whyIslamichub.prayerTimesCalculator') }}</strong>
              {{ c('whyIslamichub.usesAFullAstronomicalAlgorithmTo') }}
              <strong>{{ c('whyIslamichub.qiblaDirection') }}</strong>
              {{ c('whyIslamichub.asAnExactCompassBearing') }}
            </p>
            <p>
              {{ c('whyIslamichub.our') }}
              <strong>{{ c('whyIslamichub.islamicInheritanceCalculator') }}</strong>
              {{ c('whyIslamichub.implementsTheCompleteFaraIdSystem') }}
            </p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <div
              v-for="f in features"
              :key="f.title"
              class="card"
              style="display: flex; gap: 14px; align-items: flex-start; padding: 1rem 1.25rem"
            >
              <div style="font-size: 20px; flex-shrink: 0; margin-top: 2px" aria-hidden="true">
                {{ f.icon }}
              </div>
              <div>
                <div
                  style="
                    font-family: var(--serif);
                    font-size: 0.95rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                  "
                >
                  {{ f.title }}
                </div>
                <div style="font-size: 13px; color: var(--muted); line-height: 1.6">
                  <HadithRef :text="f.desc" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DARK FEATURE GRID -->
    <section class="section" style="background: var(--ink)" aria-labelledby="features-heading">
      <div class="section-wide">
        <span class="eyebrow" style="color: #8bc4a8">{{ c('whatSInside.whatSInside') }}</span
        ><UntranslatedNote v-if="untranslated('whatSInside')" />
        <h2
          class="section-title"
          style="color: #fff; margin-bottom: var(--space-8)"
          id="features-heading"
        >
          {{ c('whatSInside.everythingAMuslimNeedsInOne') }}
        </h2>
        <ul class="card-grid card-grid-3">
          <li v-for="f in darkFeatures" :key="f.title">
            <article class="card card-dark" style="border: 1px solid rgba(255, 255, 255, 0.08)">
              <div style="font-size: 26px; margin-bottom: 0.75rem" aria-hidden="true">
                {{ f.icon }}
              </div>
              <h3
                style="
                  font-family: var(--serif);
                  font-size: 1.05rem;
                  color: #fff;
                  margin-bottom: 0.5rem;
                "
              >
                {{ f.title }}
              </h3>
              <p
                style="
                  font-size: 13.5px;
                  color: rgba(255, 255, 255, 0.7);
                  line-height: 1.65;
                  margin-bottom: 1rem;
                "
              >
                <HadithRef :text="f.desc" />
              </p>
              <RouterLink
                :to="f.to"
                class="btn btn-sm"
                style="
                  background: rgba(255, 255, 255, 0.08);
                  color: rgba(255, 255, 255, 0.7);
                  border: none;
                "
              >
                {{ f.cta }} →
              </RouterLink>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <!-- BUILDERS -->
    <section class="section" aria-labelledby="team-heading">
      <div class="section-wide">
        <span class="eyebrow">{{ c('openSourceProject.openSourceProject') }}</span
        ><UntranslatedNote v-if="untranslated('openSourceProject')" />
        <h2 class="section-title" id="team-heading" style="margin-bottom: 0.75rem">
          {{ c('openSourceProject.builtByTheCommunityForThe') }}
        </h2>
        <p class="section-sub" style="margin-bottom: var(--space-8)">
          {{ c('openSourceProject.islamichubIsOpenSourceBuiltBy') }}
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 640px">
          <a
            v-for="b in builders"
            :key="b.login"
            :href="'https://github.com/' + b.login"
            target="_blank"
            rel="noopener noreferrer"
            class="builder-mini-card"
          >
            <img
              :src="b.avatar"
              :alt="'Photo of ' + b.name"
              width="44"
              height="44"
              style="border-radius: 50%; border: 2px solid var(--border); flex-shrink: 0"
              loading="lazy"
              @error="(e) => (e.target.style.display = 'none')"
            />
            <div>
              <div
                style="
                  font-family: var(--serif);
                  font-size: 0.95rem;
                  font-weight: 600;
                  margin-bottom: 1px;
                "
              >
                {{ b.name }}
              </div>
              <div style="font-size: 11.5px; color: var(--muted)">{{ b.role }}</div>
            </div>
          </a>
        </div>
        <div style="margin-top: 1.5rem">
          <RouterLink to="/about" class="btn btn-secondary"
            >{{ c('openSourceProject.aboutTheProjectHowToContribute') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="padding-top: 0">
      <div class="section-wide">
        <div class="cta-strip">
          <div class="ornament-hanging left" aria-hidden="true"></div>
          <div class="ornament-hanging right" aria-hidden="true"></div>
          <GeoPattern />
          <h2>{{ c('openSourceProject.beginWithTheFirstPillar') }}</h2>
          <p>
            {{ c('openSourceProject.startWithTheShahadaTheDeclaration') }}
          </p>
          <div class="btn-group" style="justify-content: center">
            <RouterLink to="/faith" class="btn btn-white btn-lg">{{
              c('openSourceProject.startWithFaith')
            }}</RouterLink>
            <RouterLink
              to="/prayer"
              class="btn btn-secondary btn-lg"
              style="color: #fff; border-color: rgba(255, 255, 255, 0.3)"
              >{{ c('openSourceProject.prayerTimesQibla') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/home/en.js'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import QuranBlock from '@/components/QuranBlock.vue'
import GeoPattern from '@/components/GeoPattern.vue'
import TodayPanel from '@/components/TodayPanel.vue'
import HadithRef from '@/components/HadithRef.vue'
import { toHijri, daysToRamadan, isRamadan } from '@/utils/hijri.js'

const { c, list, untranslated } = useContent('home', content)

useSeo('home')
useScrollReveal()

const hijri = toHijri()
const inRamadan = isRamadan()
const daysLeft = Math.round(daysToRamadan())
const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const pillars = computed(() => list('pillars'))

const tools = computed(() => list('tools'))

const features = computed(() => list('features'))

const darkFeatures = computed(() => list('darkFeatures'))

const builders = computed(() => list('builders'))
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
  transition: box-shadow 0.15s;
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

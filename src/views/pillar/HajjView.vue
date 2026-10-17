<template>
  <div>
    <div class="page-header pillar-header-hajj">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--hajj-light); color: var(--hajj-color)"
        >
          {{ c('header.pillar5Of5') }}
        </div>
        <h1>{{ c('header.hajjThePilgrimage') }}</h1>
        <p>
          {{ c('header.theFifthAndFinalPillarThe') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <QuranBlock
        arabic="وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا"
        reference="Qur'an 3:97"
        :translation="c('header.andDueToAllahFromThe')"
        class="anim-target"
      />

      <!-- Conditions -->
      <div style="margin-top: 2.5rem">
        <span class="eyebrow">{{ c('theObligation.theObligation') }}</span
        ><UntranslatedNote v-if="untranslated('theObligation')" />
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
        >
          {{ c('theObligation.conditionsOfObligation') }}
        </h2>
        <p class="prose" style="margin-bottom: 1.5rem">
          {{ c('theObligation.hajjIsObligatoryOnceInA') }}
        </p>
        <div
          class="card-grid anim-target"
          style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))"
        >
          <div v-for="c in conditions" :key="c.title" class="card">
            <h3
              style="
                font-family: var(--serif);
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.35rem;
                color: var(--hajj-color);
              "
            >
              {{ c.title }}
            </h3>
            <p style="font-size: 12.5px; color: var(--muted); line-height: 1.55">
              <HadithRef :text="c.desc" />
            </p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Types of Hajj -->
      <span class="eyebrow">{{ c('typesOfHajj.typesOfHajj') }}</span
      ><UntranslatedNote v-if="untranslated('typesOfHajj')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('typesOfHajj.threeValidWaysToPerformHajj') }}
      </h2>
      <div class="card-grid card-grid-3 anim-target">
        <div class="card card-green" style="border-color: #b0d8c4">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1.05rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: var(--green);
            "
          >
            {{ c('typesOfHajj.tamattu') }}
          </h3>
          <div
            style="
              font-size: 11px;
              background: var(--green-light);
              color: var(--green);
              padding: 2px 8px;
              border-radius: 10px;
              display: inline-block;
              margin-bottom: 0.75rem;
              font-weight: 600;
            "
          >
            {{ c('typesOfHajj.recommendedForNonMakkans') }}
          </div>
          <p style="font-size: 13.5px; color: var(--muted); line-height: 1.6">
            {{ c('typesOfHajj.performUmrahFirstExitIhramThen') }}
          </p>
        </div>
        <div class="card card-gold" style="border-color: #e0c87a">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1.05rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
              color: var(--gold);
            "
          >
            {{ c('typesOfHajj.qiran') }}
          </h3>
          <div
            style="
              font-size: 11px;
              background: var(--gold-light);
              color: #7a5a10;
              padding: 2px 8px;
              border-radius: 10px;
              display: inline-block;
              margin-bottom: 0.75rem;
              font-weight: 600;
            "
          >
            {{ c('typesOfHajj.combinedHajjUmrah') }}
          </div>
          <p style="font-size: 13.5px; color: var(--muted); line-height: 1.6">
            {{ c('typesOfHajj.enterIhramForBothHajjAnd') }}
          </p>
        </div>
        <div class="card">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1.05rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            "
          >
            {{ c('typesOfHajj.ifrad') }}
          </h3>
          <div
            style="
              font-size: 11px;
              background: var(--cream-dark);
              color: var(--muted);
              padding: 2px 8px;
              border-radius: 10px;
              display: inline-block;
              margin-bottom: 0.75rem;
              font-weight: 600;
            "
          >
            {{ c('typesOfHajj.hajjOnly') }}
          </div>
          <p style="font-size: 13.5px; color: var(--muted); line-height: 1.6">
            {{ c('typesOfHajj.enterIhramForHajjOnlyNo') }}
          </p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Rites guide -->
      <span class="eyebrow">{{ c('theRites.theRites') }}</span
      ><UntranslatedNote v-if="untranslated('theRites')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0.75rem"
      >
        {{ c('theRites.stepByStepGuideToThe') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('theRites.hajjSpansFiveDaysFromThe') }}
      </p>

      <!-- Day tabs -->
      <div class="btn-group" style="margin-bottom: 1.5rem">
        <button
          v-for="(day, i) in days"
          :key="i"
          class="pill-btn"
          :class="{ active: activeDay === i }"
          @click="showRitesForDay(i)"
        >
          {{ day.tab }}
        </button>
      </div>

      <!-- Day panels -->
      <div>
        <div class="timeline anim-target">
          <div v-for="rite in currentDay.rites" :key="rite.name" class="tl-item">
            <div
              class="tl-marker"
              :style="{ background: 'var(--hajj-light)', color: 'var(--hajj-color)' }"
            >
              🕋
            </div>
            <div class="tl-content">
              <h3>{{ rite.name }}</h3>
              <p><HadithRef :text="rite.desc" /></p>
            </div>
          </div>
        </div>
        <div style="font-size: 13px; font-weight: 600; color: var(--hajj-color); margin-top: 8px">
          {{ currentDay.title }}
        </div>
      </div>

      <div class="divider"></div>

      <!-- Umrah -->
      <span class="eyebrow">{{ c('lesserPilgrimage.lesserPilgrimage') }}</span
      ><UntranslatedNote v-if="untranslated('lesserPilgrimage')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('lesserPilgrimage.umrah') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('lesserPilgrimage.umrahIsTheLesserPilgrimageThat') }}
      </p>
      <div class="card-grid card-grid-4 anim-target">
        <div v-for="u in umrahRites" :key="u.num" class="card" style="text-align: center">
          <div
            style="
              width: 36px;
              height: 36px;
              background: var(--hajj-light);
              color: var(--hajj-color);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--serif);
              font-size: 1.1rem;
              font-weight: 600;
              margin: 0 auto var(--space-3);
            "
          >
            {{ u.num }}
          </div>
          <div
            style="
              font-family: var(--serif);
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.3rem;
            "
          >
            {{ u.title }}
          </div>
          <div style="font-size: 12.5px; color: var(--muted); line-height: 1.5">
            <HadithRef :text="u.desc" />
          </div>
        </div>
      </div>

      <div class="divider"></div>
      <FaqList :faqs="faqs" />

      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>{{ c('lesserPilgrimage.exploreIslamicTools') }}</h2>
        <p>
          {{ c('lesserPilgrimage.calculateYourZakatCheckPrayerTimes') }}
        </p>
        <div class="btn-group" style="justify-content: center">
          <RouterLink to="/zakat" class="btn btn-white btn-lg">{{
            c('lesserPilgrimage.zakatCalculator')
          }}</RouterLink>
          <RouterLink
            to="/inheritance"
            class="btn btn-secondary btn-lg"
            style="color: #fff; border-color: rgba(255, 255, 255, 0.3)"
            >{{ c('lesserPilgrimage.inheritance') }}
          </RouterLink>
          <RouterLink
            to="/qurbani"
            class="btn btn-secondary btn-lg"
            style="color: #fff; border-color: rgba(255, 255, 255, 0.3)"
            >{{ c('lesserPilgrimage.qurbani') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/hajj/en.js'
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

const { c, list, untranslated } = useContent('hajj', content)

useSeo('hajj')
useScrollReveal()

const activeDay = ref(0)
const conditions = computed(() => list('conditions'))

const days = computed(() => list('days'))

const currentDay = computed(() => days.value[activeDay.value])

const umrahRites = computed(() => list('umrahRites'))

const faqs = computed(() => list('faqs'))

const showRitesForDay = (dayIndex) => {
  activeDay.value = dayIndex
}
</script>

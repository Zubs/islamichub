<template>
  <div>
    <div class="page-header pillar-header-faith">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--faith-light); color: var(--faith-color)"
        >
          {{ c('header.pillar1Of5') }}
        </div>
        <h1>{{ c('header.shahadaTheDeclarationOfFaith') }}</h1>
        <p>
          {{ c('header.theFirstAndFoundationalPillarOf') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <!-- Main Shahada -->
      <div
        class="quran-block frame-calligraphy anim-target"
        style="text-align: center; padding: 2.5rem 2rem"
      >
        <div class="corner-ornament top-left" aria-hidden="true"></div>
        <div class="corner-ornament top-right" aria-hidden="true"></div>
        <div class="corner-ornament bottom-left" aria-hidden="true"></div>
        <div class="corner-ornament bottom-right" aria-hidden="true"></div>
        <div
          class="quran-arabic"
          style="font-size: 2rem; text-align: center; letter-spacing: 2px"
          lang="ar"
        >
          أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ
        </div>
        <div class="quran-ref" style="text-align: center; margin-top: 0.75rem">
          {{ c('header.theShahada') }}
        </div>
        <div class="quran-trans" style="text-align: center; font-size: 16px">
          {{ c('header.iBearWitnessThatThereIs') }}
        </div>
      </div>

      <div style="margin-top: 2.5rem">
        <span class="eyebrow">{{ c('foundation.foundation') }}</span
        ><UntranslatedNote v-if="untranslated('foundation')" />
        <h2 class="section-title" style="font-size: clamp(1.6rem, 3vw, 2.1rem)">
          {{ c('foundation.whatIsTheShahada') }}
        </h2>
        <div class="prose">
          <p>
            {{ c('foundation.theShahadaMeaningTestimonyIsThe') }}
          </p>
          <p>
            {{ c('foundation.pronouncingTheShahadaWithSincereBelief')
            }}<HadithRef text="Sahih Bukhari 128" />).
          </p>
        </div>
      </div>

      <HadithBlock reference="Sahih Bukhari 128 · Sahih Muslim 26">
        {{ c('foundation.whoeverDiesKnowingThatThereIs') }}
      </HadithBlock>

      <div class="divider"></div>

      <!-- Two parts -->
      <span class="eyebrow">{{ c('theTwoClauses.theTwoClauses') }}</span
      ><UntranslatedNote v-if="untranslated('theTwoClauses')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1.5rem"
      >
        {{ c('theTwoClauses.understandingEachPart') }}
      </h2>
      <div class="card-grid card-grid-2 anim-target">
        <div class="card card-green" style="border-color: #b0d8c4">
          <div
            style="
              font-family: var(--serif);
              font-size: 1.6rem;
              direction: rtl;
              text-align: right;
              margin-bottom: 0.75rem;
              color: var(--green);
            "
            lang="ar"
          >
            لَا إِلَهَ إِلَّا اللَّهُ
          </div>
          <h3 style="font-family: var(--serif); margin-bottom: 0.5rem; color: var(--green)">
            {{ c('theTwoClauses.lIlHaIllallH') }}
          </h3>
          <p style="font-size: 13.5px; color: var(--muted); line-height: 1.65">
            {{ c('theTwoClauses.thereIsNoGodButAllah') }}
            <strong>{{ c('theTwoClauses.tawhid') }}</strong>
            {{ c('theTwoClauses.theAbsoluteOnenessAndUniquenessOf') }}
          </p>
        </div>
        <div class="card card-gold" style="border-color: #e0c87a">
          <div
            style="
              font-family: var(--serif);
              font-size: 1.6rem;
              direction: rtl;
              text-align: right;
              margin-bottom: 0.75rem;
              color: var(--gold);
            "
            lang="ar"
          >
            مُحَمَّدٌ رَسُولُ اللَّهِ
          </div>
          <h3 style="font-family: var(--serif); margin-bottom: 0.5rem; color: var(--gold)">
            {{ c('theTwoClauses.muhammadunRasLullH') }}
          </h3>
          <p style="font-size: 13.5px; color: var(--muted); line-height: 1.65">
            {{ c('theTwoClauses.muhammadIsTheMessengerOfAllah') }}
            <strong>{{ c('theTwoClauses.risala') }}</strong>
            {{ c('theTwoClauses.theAffirmationOfProphethoodItMeans') }}
          </p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Seven conditions -->
      <span class="eyebrow">{{ c('conditionsOfValidity.conditionsOfValidity') }}</span
      ><UntranslatedNote v-if="untranslated('conditionsOfValidity')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('conditionsOfValidity.sevenConditionsForTheShahadaTo') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('conditionsOfValidity.scholarsHaveExtractedSevenConditionsFrom') }}
      </p>
      <div
        class="card-grid anim-target"
        style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))"
      >
        <div v-for="c in conditions" :key="c.title" class="card">
          <div
            style="
              font-family: var(--serif);
              font-size: 1.3rem;
              color: var(--green);
              direction: rtl;
              margin-bottom: 0.4rem;
            "
            lang="ar"
          >
            {{ c.arabic }}
          </div>
          <h3
            style="
              font-family: var(--serif);
              font-size: 0.9rem;
              font-weight: 600;
              margin-bottom: 0.4rem;
            "
          >
            {{ c.title }}
          </h3>
          <p style="font-size: 12.5px; color: var(--muted); line-height: 1.5">
            <HadithRef :text="c.desc" />
          </p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Tawhid -->
      <span class="eyebrow">{{ c('tawhidDivineOneness.tawhidDivineOneness') }}</span
      ><UntranslatedNote v-if="untranslated('tawhidDivineOneness')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('tawhidDivineOneness.theThreeDimensionsOfTawhid') }}
      </h2>

      <QuranBlock
        arabic="قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ"
        reference="Qur'an 112:1–2"
        :translation="c('tawhidDivineOneness.sayHeIsAllahWhoIs')"
        :note="c('tawhidDivineOneness.surahAlIkhlasDescribedByThe')"
      />

      <div class="timeline anim-target" style="margin-top: 1.5rem">
        <div v-for="t in tawhidDimensions" :key="t.title" class="tl-item">
          <div class="tl-marker">{{ t.num }}</div>
          <div class="tl-content">
            <h3>{{ t.title }}</h3>
            <p><HadithRef :text="t.desc" /></p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- FAQ -->
      <span class="eyebrow">{{ c('commonQuestions.commonQuestions') }}</span
      ><UntranslatedNote v-if="untranslated('commonQuestions')" />
      <h2 class="section-title" style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0">
        {{ c('commonQuestions.faq') }}
      </h2>
      <FaqList :faqs="faqs" />

      <!-- Six Articles of Faith card -->
      <div class="divider"></div>
      <span class="eyebrow">{{ c('goDeeper.goDeeper') }}</span
      ><UntranslatedNote v-if="untranslated('goDeeper')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('goDeeper.theSixArticlesOfFaithArkan') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('goDeeper.alongsideTheShahadaAMuslimMust') }}
      </p>
      <RouterLink to="/faith/articles" class="aof-teaser-card anim-target">
        <div class="aof-teaser-left">
          <div class="aof-teaser-badge">أركان الإيمان</div>
          <h3 class="aof-teaser-title">{{ c('goDeeper.theSixArticlesOfFaith') }}</h3>
          <p class="aof-teaser-desc">
            {{ c('goDeeper.aFullInDepthGuideTo') }}
          </p>
          <div class="aof-teaser-pills">
            <span v-for="a in articlePreviews" :key="a" class="aof-teaser-pill">{{ a }}</span>
          </div>
        </div>
        <div class="aof-teaser-arrow" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </RouterLink>

      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>{{ c('goDeeper.continueToTheSecondPillar') }}</h2>
        <p>
          {{ c('goDeeper.prayerSalahFiveTimesDailyFacing') }}
        </p>
        <RouterLink to="/prayer" class="btn btn-white btn-lg">{{
          c('goDeeper.exploreSalah')
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/faith/en.js'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import HadithBlock from '@/components/HadithBlock.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

const { c, list, untranslated } = useContent('faith', content)

useSeo('faith')
useScrollReveal()

const conditions = computed(() => list('conditions'))

const tawhidDimensions = computed(() => list('tawhidDimensions'))

const faqs = computed(() => list('faqs'))

const articlePreviews = computed(() => list('articlePreviews'))
</script>

<style scoped>
.aof-teaser-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  background: linear-gradient(135deg, var(--faith-light) 0%, #fff 100%);
  border: 1.5px solid var(--faith-color);
  border-radius: var(--radius-xl);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
}

.aof-teaser-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #e8e4f8 0%, #fff 100%);
}

.aof-teaser-left {
  flex: 1;
}

.aof-teaser-badge {
  font-family: var(--serif);
  font-size: 0.95rem;
  color: var(--faith-color);
  opacity: 0.7;
  margin-bottom: 0.4rem;
  direction: rtl;
  display: inline-block;
}

.aof-teaser-title {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.4rem;
}

.aof-teaser-desc {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 0.75rem;
  max-width: 520px;
}

.aof-teaser-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.aof-teaser-pill {
  font-size: 11.5px;
  padding: 3px 10px;
  background: rgba(99, 71, 178, 0.08);
  color: var(--faith-color);
  border-radius: 100px;
  font-weight: 500;
}

.aof-teaser-arrow {
  color: var(--faith-color);
  opacity: 0.6;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.aof-teaser-card:hover .aof-teaser-arrow {
  opacity: 1;
  transform: translateX(4px);
}

@media (max-width: 540px) {
  .aof-teaser-arrow {
    display: none;
  }
}
</style>

<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.islamicSciences') }}
        </div>
        <h1>{{ c('header.hadithThePropheticTradition') }}</h1>
        <p>
          {{ c('header.theSecondSourceOfIslamicLaw') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <!-- CTA to library -->
      <div class="hadith-library-banner anim-target">
        <div class="hlb-left">
          <div class="hlb-eyebrow">{{ c('hadithLibrary.hadithLibrary') }}</div>
          <UntranslatedNote v-if="untranslated('hadithLibrary')" />
          <div class="hlb-title">{{ c('hadithLibrary.browse9AuthenticCollections') }}</div>
          <div class="hlb-desc">
            {{ c('hadithLibrary.over70000HadithAcrossSahih') }}
          </div>
        </div>
        <RouterLink to="/hadith/books" class="btn btn-primary hlb-btn">
          {{ c('hadithLibrary.openLibrary') }}
        </RouterLink>
      </div>

      <!-- Foundation verse -->
      <QuranBlock
        arabic="وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا"
        reference="Qur'an 59:7"
        :translation="c('hadithLibrary.whateverTheMessengerGivesYouTake')"
        :note="c('hadithLibrary.theFoundationalQurAnicCommandTo')"
        class="anim-target"
      />

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- What is Hadith -->
      <span class="eyebrow">{{ c('definition.definition') }}</span
      ><UntranslatedNote v-if="untranslated('definition')" />
      <h2 class="section-title" style="font-size: clamp(1.5rem, 2.5vw, 1.9rem)">
        {{ c('definition.whatIsAHadith') }}
      </h2>
      <div class="prose anim-target">
        <p>
          A <strong>{{ c('definition.hadith') }}</strong>
          {{ c('definition.pluralAhadithIsARecordedReport') }}
        </p>
        <p>
          {{ c('definition.eachHadithHasTwoComponentsThe') }}
          <strong>{{ c('definition.isnad') }}</strong>
          {{ c('definition.chainOfTransmissionWhichListsEvery') }}
          <strong>{{ c('definition.matn') }}</strong>
          {{ c('definition.theActualTextOfTheNarration') }}
        </p>
        <p>
          {{ c('definition.theHadithSciencesUlumAlHadith') }}
        </p>
      </div>

      <!-- Two components -->
      <div class="card-grid card-grid-2 anim-target" style="margin-top: 1.5rem">
        <div class="card card-green" style="border-color: #b0d8c4">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1.1rem;
              font-weight: 600;
              color: var(--green);
              margin-bottom: 0.5rem;
            "
          >
            {{ c('definition.isnad2') }}
          </h3>
          <p
            style="
              font-size: 13.5px;
              color: var(--muted);
              line-height: 1.65;
              margin-bottom: 0.75rem;
            "
          >
            {{ c('definition.theChainOfTransmissionEveryPerson') }}
          </p>
          <div style="font-size: 12px; color: var(--green); font-style: italic">
            {{ c('definition.theIsnadIsExaminedForCompleteness') }}
          </div>
        </div>
        <div class="card card-gold" style="border-color: #e0c87a">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1.1rem;
              font-weight: 600;
              color: var(--gold);
              margin-bottom: 0.5rem;
            "
          >
            {{ c('definition.matn2') }}
          </h3>
          <p
            style="
              font-size: 13.5px;
              color: var(--muted);
              line-height: 1.65;
              margin-bottom: 0.75rem;
            "
          >
            {{ c('definition.theActualContentOfTheNarration') }}
          </p>
          <div style="font-size: 12px; color: #7a5a10; font-style: italic">
            {{ c('definition.theMatnIsExaminedForConformity') }}
          </div>
        </div>
      </div>

      <HadithBlock reference="Imam Abdullah ibn al-Mubarak (d. 181 AH)" style="margin-top: 1.5rem">
        {{ c('definition.theIsnadIsPartOfThe') }}
      </HadithBlock>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Three types -->
      <span class="eyebrow">{{ c('typesOfHadith.typesOfHadith') }}</span
      ><UntranslatedNote v-if="untranslated('typesOfHadith')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('typesOfHadith.whatAHadithRecords') }}
      </h2>
      <div
        class="card-grid anim-target"
        style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))"
      >
        <div v-for="t in hadithTypes" :key="t.title" class="card">
          <div
            style="
              font-family: var(--serif);
              font-size: 1.5rem;
              color: var(--green);
              margin-bottom: 0.5rem;
            "
            aria-hidden="true"
          >
            {{ t.icon }}
          </div>
          <h4
            style="
              font-family: var(--serif);
              font-size: 0.95rem;
              font-weight: 600;
              margin-bottom: 0.3rem;
            "
          >
            {{ t.title }}
          </h4>
          <div style="font-size: 12px; color: var(--gold); font-weight: 500; margin-bottom: 0.3rem">
            {{ t.arabic }}
          </div>
          <p style="font-size: 13px; color: var(--muted); line-height: 1.55">
            <HadithRef :text="t.desc" />
          </p>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Grades -->
      <span class="eyebrow">{{ c('authentication.authentication') }}</span
      ><UntranslatedNote v-if="untranslated('authentication')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0.75rem"
      >
        {{ c('authentication.gradesOfHadith') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('authentication.hadithScholarsDevelopedPreciseCriteriaFor') }}
      </p>

      <div
        style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem"
        class="anim-target"
      >
        <div v-for="g in grades" :key="g.title" class="hadith-grade-card">
          <div class="hgc-grade" :style="{ background: g.bg, color: g.color }">{{ g.title }}</div>
          <div class="hgc-arabic" lang="ar">{{ g.arabic }}</div>
          <div class="hgc-body">
            <div class="hgc-title">{{ g.meaning }}</div>
            <div class="hgc-desc"><HadithRef :text="g.desc" /></div>
          </div>
          <div class="hgc-ruling" :style="{ color: g.color }">{{ g.ruling }}</div>
        </div>
      </div>

      <!-- Conditions for Sahih -->
      <div class="card anim-target" style="margin-bottom: 2rem">
        <span class="eyebrow" style="display: block; margin-bottom: 0.5rem">{{
          c('fiveConditionsForSahih.fiveConditionsForSahih')
        }}</span
        ><UntranslatedNote v-if="untranslated('fiveConditionsForSahih')" />
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 0.75rem;
          "
        >
          <div
            v-for="c in sahihConditions"
            :key="c.num"
            style="display: flex; gap: 10px; align-items: flex-start"
          >
            <div
              style="
                width: 24px;
                height: 24px;
                background: var(--green-light);
                color: var(--green);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 600;
                flex-shrink: 0;
              "
            >
              {{ c.num }}
            </div>
            <div>
              <div style="font-size: 13.5px; font-weight: 600; margin-bottom: 2px">
                {{ c.title }}
              </div>
              <div style="font-size: 12px; color: var(--muted)"><HadithRef :text="c.desc" /></div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Scholars -->
      <span class="eyebrow">{{ c('theGreatScholars.theGreatScholars') }}</span
      ><UntranslatedNote v-if="untranslated('theGreatScholars')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('theGreatScholars.hadithScholarsOfTheGoldenAge') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('theGreatScholars.betweenThe2ndAnd4thCenturies') }}
      </p>

      <div
        class="card-grid anim-target"
        style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))"
      >
        <div v-for="s in scholars" :key="s.name" class="card">
          <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 0.75rem">
            <div class="scholar-badge">{{ s.initials }}</div>
            <div>
              <div
                style="
                  font-family: var(--serif);
                  font-size: 1rem;
                  font-weight: 600;
                  line-height: 1.2;
                  margin-bottom: 2px;
                "
              >
                {{ s.name }}
              </div>
              <div style="font-size: 12px; color: var(--muted)">{{ s.death }}</div>
            </div>
          </div>
          <div
            style="
              font-size: 11px;
              font-weight: 600;
              color: var(--gold);
              text-transform: uppercase;
              letter-spacing: 0.4px;
              margin-bottom: 0.35rem;
            "
          >
            {{ s.work }}
          </div>
          <p style="font-size: 13px; color: var(--muted); line-height: 1.55">
            <HadithRef :text="s.desc" />
          </p>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Sciences of Hadith -->
      <span class="eyebrow">{{ c('hadithSciences.hadithSciences') }}</span
      ><UntranslatedNote v-if="untranslated('hadithSciences')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('hadithSciences.ulumAlHadith') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ c('hadithSciences.theStudyOfHadithEncompassesMultiple') }}
      </p>

      <div
        class="card-grid anim-target"
        style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); margin-bottom: 2rem"
      >
        <div v-for="sci in sciences" :key="sci.title" class="card">
          <div
            style="
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: var(--gold);
              margin-bottom: 0.3rem;
            "
          >
            {{ sci.arabic }}
          </div>
          <h4
            style="
              font-family: var(--serif);
              font-size: 0.95rem;
              font-weight: 600;
              margin-bottom: 0.35rem;
            "
          >
            {{ sci.title }}
          </h4>
          <p style="font-size: 13px; color: var(--muted); line-height: 1.55">
            <HadithRef :text="sci.desc" />
          </p>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- FAQ -->
      <FaqList :faqs="faqs" />

      <!-- CTA to library -->
      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>{{ c('hadithSciences.exploreTheHadithLibrary') }}</h2>
        <p>
          {{ c('hadithSciences.browseAll9CollectionsSahihBukhari') }}
        </p>
        <RouterLink to="/hadith/books" class="btn btn-white btn-lg">{{
          c('hadithSciences.openTheLibrary')
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/hadith/en.js'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import HadithBlock from '@/components/HadithBlock.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

const { c, list, untranslated } = useContent('hadith', content)

useSeo('hadith')
useScrollReveal()

const hadithTypes = computed(() => list('hadithTypes'))

const grades = computed(() => list('grades'))

const sahihConditions = computed(() => list('sahihConditions'))

const scholars = computed(() => list('scholars'))

const sciences = computed(() => list('sciences'))

const faqs = computed(() => list('faqs'))
</script>

<style scoped>
.hadith-library-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: linear-gradient(135deg, var(--ink) 0%, #2c3e50 100%);
  border-radius: var(--radius-xl);
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}
.hlb-eyebrow {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--gold);
  margin-bottom: 0.3rem;
}
.hlb-title {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.35rem;
}
.hlb-desc {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.55;
  max-width: 480px;
}
.hlb-btn {
  flex-shrink: 0;
  white-space: nowrap;
}

.hadith-grade-card {
  display: grid;
  grid-template-columns: 90px 80px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
.hgc-grade {
  font-size: 13px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  text-align: center;
  white-space: nowrap;
}
.hgc-arabic {
  font-family: var(--serif);
  font-size: 1.2rem;
  text-align: right;
  direction: rtl;
  color: var(--muted);
}
.hgc-title {
  font-family: var(--serif);
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 3px;
}
.hgc-desc {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}
.hgc-ruling {
  font-size: 11.5px;
  font-weight: 600;
  text-align: right;
  white-space: nowrap;
  flex-shrink: 0;
}

.scholar-badge {
  width: 40px;
  height: 40px;
  background: var(--gold-light);
  color: var(--gold);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
  border: 1px solid #e0c87a;
}

@media (max-width: 700px) {
  .hadith-grade-card {
    grid-template-columns: 1fr 1fr;
  }
  .hgc-ruling {
    text-align: left;
  }
}
@media (max-width: 480px) {
  .hadith-grade-card {
    grid-template-columns: 1fr;
  }
  .hadith-library-banner {
    flex-direction: column;
  }
}
</style>

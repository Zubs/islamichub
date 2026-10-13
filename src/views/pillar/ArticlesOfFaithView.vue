<template>
  <div>
    <!-- Page header -->
    <div class="page-header pillar-header-faith">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--faith-light); color: var(--faith-color)"
        >
          {{ c('header.pillar1Aqeedah') }}
        </div>
        <h1>{{ c('header.theSixArticlesOfFaith') }}</h1>
        <p>
          {{ c('header.theSixFundamentalBeliefsEveryMuslim') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <!-- Breadcrumb -->
      <div class="aof-breadcrumb">
        <RouterLink to="/faith" class="aof-breadcrumb-link">{{
          c('header.faithShahada')
        }}</RouterLink>
        <span class="aof-breadcrumb-sep" aria-hidden="true">/</span>
        <span>{{ c('header.sixArticlesOfFaith') }}</span>
      </div>

      <!-- Foundation hadith -->
      <div class="quran-block frame-calligraphy anim-target">
        <div class="corner-ornament top-left" aria-hidden="true"></div>
        <div class="corner-ornament top-right" aria-hidden="true"></div>
        <div class="corner-ornament bottom-left" aria-hidden="true"></div>
        <div class="corner-ornament bottom-right" aria-hidden="true"></div>
        <div class="quran-arabic" lang="ar">
          أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ
          وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ
        </div>
        <div class="quran-ref">
          {{ c('header.hadithOfJibril') }} <HadithRef text="Sahih Muslim 8" />
        </div>
        <div class="quran-trans">
          {{ c('header.toBelieveInAllahHisAngels') }}
        </div>
      </div>

      <!-- Intro -->
      <div style="margin-top: 2rem" class="prose anim-target">
        <p>
          {{ c('header.theSixArticlesOfFaithArkan') }}<HadithRef text="Sahih Muslim 8" />;
          <HadithRef text="Sahih Bukhari 50" />{{ c('header.whereTheAngelJibrilAppearedIn') }}
        </p>
        <p>
          {{ c('header.holdingTheseBeliefsWithConvictionAnd') }}
        </p>
      </div>

      <!-- Overview strip -->
      <div class="aof-overview anim-target">
        <RouterLink
          v-for="a in articles"
          :key="a.num"
          :to="'#article-' + a.num"
          class="aof-overview-pill"
          @click.prevent="scrollTo('article-' + a.num)"
        >
          <span class="aof-ov-num">{{ a.numAr }}</span>
          <span class="aof-ov-label">{{ a.titleShort }}</span>
        </RouterLink>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Articles -->
      <div
        v-for="(article, i) in articles"
        :key="article.num"
        :id="'article-' + article.num"
        class="aof-article anim-target"
      >
        <!-- Article header -->
        <div class="aof-article-header">
          <div class="aof-article-num-wrap">
            <span class="aof-article-num-ar" lang="ar">{{ article.numAr }}</span>
            <span class="aof-article-num-en">{{ article.num }}</span>
          </div>
          <div>
            <h2 class="aof-article-title">{{ article.title }}</h2>
            <p class="aof-article-arabic" lang="ar">{{ article.arabic }}</p>
          </div>
        </div>

        <!-- Qur'anic anchor verse -->
        <div class="aof-verse">
          <div class="aof-verse-arabic" lang="ar">{{ article.verse.arabic }}</div>
          <div class="aof-verse-ref">{{ article.verse.ref }}</div>
          <div class="aof-verse-trans">"{{ article.verse.translation }}"</div>
        </div>

        <!-- Body paragraphs -->
        <div class="prose" style="margin-bottom: 1.25rem">
          <p v-for="(para, pi) in article.body" :key="pi"><HadithRef :text="para" /></p>
        </div>

        <!-- Key points -->
        <div class="aof-points">
          <div class="aof-points-label">{{ c('header.keyPoints') }}</div>
          <div class="aof-points-grid">
            <div v-for="pt in article.points" :key="pt.title" class="aof-point-card">
              <div class="aof-point-icon" aria-hidden="true">{{ pt.icon }}</div>
              <div>
                <div class="aof-point-title">{{ pt.title }}</div>
                <div class="aof-point-desc"><HadithRef :text="pt.desc" /></div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="i < articles.length - 1"
          class="divider-kufic"
          aria-hidden="true"
          style="margin-top: 3rem"
        >
          <span class="divider-kufic-icon"></span>
        </div>
      </div>

      <!-- Qur'an 2:177 — the comprehensive verse -->
      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
      <span class="eyebrow">{{ c('theComprehensiveVerse.theComprehensiveVerse') }}</span
      ><UntranslatedNote v-if="untranslated('theComprehensiveVerse')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('theComprehensiveVerse.allSixInOneVerse') }}
      </h2>

      <QuranBlock
        arabic="لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ"
        reference="Qur'an 2:177"
        :translation="c('theComprehensiveVerse.righteousnessIsNotThatYouTurn')"
        :note="c('theComprehensiveVerse.allahDefinesTrueRighteousnessBeginningWith')"
        class="anim-target"
      />

      <!-- FAQ -->
      <div class="divider-kufic" aria-hidden="true" style="margin-top: 2.5rem">
        <span class="divider-kufic-icon"></span>
      </div>
      <span class="eyebrow">{{ c('commonQuestions.commonQuestions') }}</span
      ><UntranslatedNote v-if="untranslated('commonQuestions')" />
      <h2 class="section-title" style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0">
        {{ c('commonQuestions.faq') }}
      </h2>
      <FaqList :faqs="faqs" />

      <!-- CTA -->
      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>{{ c('commonQuestions.continueExploringFaith') }}</h2>
        <p>
          {{ c('commonQuestions.returnToTheFullShahadaGuide') }}
        </p>
        <div class="btn-group" style="justify-content: center">
          <RouterLink to="/faith" class="btn btn-white btn-lg">{{
            c('commonQuestions.backToShahada')
          }}</RouterLink>
          <RouterLink
            to="/prayer"
            class="btn btn-secondary btn-lg"
            style="color: #fff; border-color: rgba(255, 255, 255, 0.3)"
            >{{ c('commonQuestions.continueToPrayer') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/articlesOfFaith/en.js'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

const { c, list, untranslated } = useContent('articlesOfFaith', content)

useSeo('articles-of-faith')

useScrollReveal()

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const articles = computed(() => list('articles'))

const faqs = computed(() => list('faqs'))
</script>

<style scoped>
/* ── Breadcrumb ──────────────────────────────────────────────── */
.aof-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  margin: 1.5rem 0 2rem;
}

.aof-breadcrumb-link {
  color: var(--green);
  text-decoration: none;
  font-weight: 500;
}

.aof-breadcrumb-link:hover {
  text-decoration: underline;
}

.aof-breadcrumb-sep {
  color: var(--border);
}

/* ── Overview pills ──────────────────────────────────────────── */
.aof-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
}

.aof-overview-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 100px;
  text-decoration: none;
  color: var(--ink);
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
  cursor: pointer;
}

.aof-overview-pill:hover {
  border-color: var(--faith-color);
  color: var(--faith-color);
  background: var(--faith-light);
}

.aof-ov-num {
  font-family: var(--serif);
  font-size: 1.1rem;
  color: var(--faith-color);
  opacity: 0.7;
}

/* ── Article block ───────────────────────────────────────────── */
.aof-article {
  scroll-margin-top: calc(var(--nav-height, 64px) + 24px);
}

.aof-article-header {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.aof-article-num-wrap {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 52px;
  height: 52px;
  background: var(--faith-light);
  border: 1px solid rgba(var(--faith-color-rgb, 99, 71, 178), 0.2);
  border-radius: 14px;
  justify-content: center;
  padding: 4px;
}

.aof-article-num-ar {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--faith-color);
  line-height: 1;
}

.aof-article-num-en {
  font-size: 10px;
  color: var(--faith-color);
  opacity: 0.6;
  font-weight: 600;
}

.aof-article-title {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: 0.3rem;
}

.aof-article-arabic {
  font-family: var(--serif);
  font-size: 1.05rem;
  color: var(--muted);
  direction: rtl;
}

/* ── Verse box ───────────────────────────────────────────────── */
.aof-verse {
  background: var(--cream-dark);
  border-inline-start: 3px solid var(--faith-color);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.aof-verse-arabic {
  font-family: var(--serif);
  font-size: 1.25rem;
  color: var(--faith-color);
  direction: rtl;
  text-align: right;
  line-height: 1.9;
  margin-bottom: 0.4rem;
}

.aof-verse-ref {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--gold-dark);
  margin-bottom: 0.4rem;
}

.aof-verse-trans {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  font-style: italic;
}

/* ── Key points ──────────────────────────────────────────────── */
.aof-points {
  margin-top: 1.25rem;
}

.aof-points-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.aof-points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.aof-point-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 0.9rem 1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.aof-point-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.aof-point-title {
  font-family: var(--serif);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: var(--ink);
}

.aof-point-desc {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 600px) {
  .aof-article-header {
    flex-direction: column;
  }

  .aof-points-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div>
    <div class="page-header" style="background: var(--ink)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <span class="page-eyebrow">{{ c('aboutIslamichub.aboutIslamichub') }}</span
        ><UntranslatedNote v-if="untranslated('aboutIslamichub')" />
        <h1>
          {{ c('aboutIslamichub.builtWithSincerity') }}<br />{{
            c('aboutIslamichub.groundedInScholarship')
          }}
        </h1>
        <p>
          {{ c('aboutIslamichub.islamichubBeganAsTwoSeparateProjects') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <!-- Builders -->
      <span class="eyebrow" style="margin-top: 2.5rem; display: block">{{
        c('theTeam.theTeam')
      }}</span
      ><UntranslatedNote v-if="untranslated('theTeam')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 0.5rem"
      >
        {{ c('theTeam.builtByMuslimsForMuslims') }}
      </h2>
      <p class="prose" style="margin-bottom: 2rem">
        {{ c('theTeam.islamichubIsAPassionProjectBy') }}
      </p>

      <div class="builder-grid">
        <div v-for="b in builders" :key="b.login" class="builder-card">
          <div class="builder-top">
            <img
              :src="b.avatar"
              :alt="b.name + ' — GitHub profile photo'"
              class="builder-avatar"
              width="64"
              height="64"
              loading="lazy"
              @error="(e) => (e.target.style.display = 'none')"
            />
            <div class="builder-meta">
              <div class="builder-name">{{ b.name }}</div>
              <div class="builder-role">{{ b.role }}</div>
              <a
                :href="'https://github.com/' + b.login"
                target="_blank"
                rel="noopener noreferrer"
                class="builder-github-link"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
                @{{ b.login }}
              </a>
            </div>
          </div>
          <p class="builder-bio">{{ b.bio }}</p>
          <div>
            <div class="builder-contribs-label">{{ c('theTeam.contributions') }}</div>
            <div class="builder-contribs-list">
              <span v-for="c in b.contributions" :key="c" class="contrib-tag">{{ c }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Open source -->
      <span class="eyebrow">{{ c('openSource.openSource') }}</span
      ><UntranslatedNote v-if="untranslated('openSource')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('openSource.contributionsWelcome') }}
      </h2>
      <div class="prose" style="margin-bottom: 2rem">
        <p>
          {{ c('openSource.islamichubIsOpenSourceAndWe') }}
        </p>
        <p>
          {{ c('openSource.ifYouNoticeAnErrorIn') }}
        </p>
      </div>

      <div class="oss-grid">
        <a :href="GITHUB_REPO" target="_blank" rel="noopener noreferrer" class="oss-card">
          <div class="oss-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="color: var(--green)"
            >
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
          </div>
          <div class="oss-name">{{ c('openSource.viewOnGithub') }}</div>
          <div class="oss-desc">
            {{ c('openSource.browseTheSourceCodeForkThe') }}
          </div>
        </a>
        <a
          :href="GITHUB_REPO + '/issues'"
          target="_blank"
          rel="noopener noreferrer"
          class="oss-card"
        >
          <div class="oss-icon" style="font-size: 22px">🐛</div>
          <div class="oss-name">{{ c('openSource.reportAnIssue') }}</div>
          <div class="oss-desc">
            {{ c('openSource.foundABugACalculationError') }}
          </div>
        </a>
        <a
          :href="GITHUB_REPO + '/blob/main/CONTRIBUTING.md'"
          target="_blank"
          rel="noopener noreferrer"
          class="oss-card"
        >
          <div class="oss-icon" style="font-size: 22px">🤝</div>
          <div class="oss-name">{{ c('openSource.howToContribute') }}</div>
          <div class="oss-desc">
            {{ c('openSource.readTheContributionGuideAllSkill') }}
          </div>
        </a>
      </div>

      <div
        class="card card-green"
        style="border-color: #b0d8c4; margin-bottom: 2rem; margin-top: 1.25rem"
      >
        <h3
          style="
            font-family: var(--serif);
            font-size: 1rem;
            font-weight: 600;
            color: var(--green);
            margin-bottom: 1rem;
          "
        >
          {{ c('openSource.waysYouCanContribute') }}
        </h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem">
          <div
            v-for="w in ways"
            :key="w.text"
            style="
              display: flex;
              align-items: flex-start;
              gap: 8px;
              font-size: 13.5px;
              color: var(--muted);
              padding: 4px 0;
            "
          >
            <span style="flex-shrink: 0">{{ w.icon }}</span>
            <span>{{ w.text }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Mission -->
      <span class="eyebrow">{{ c('mission.mission') }}</span
      ><UntranslatedNote v-if="untranslated('mission')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1.25rem"
      >
        {{ c('mission.whyWeBuiltThis') }}
      </h2>
      <div class="prose">
        <p>
          {{ c('mission.tooManyIslamicToolsAreEither') }}
        </p>
        <p>
          {{ c('mission.theFivePillarsAreNotJust') }}
        </p>
        <p>
          {{ c('mission.thisProjectBeganAs') }} <strong>{{ c('mission.zakatcalc') }}</strong>
          {{ c('mission.anAccurateLivePricedZakatCalculator') }}
          <strong>{{ c('mission.kushirik') }}</strong>
          {{ c('mission.anInheritanceSharingApplicationTwoSeparate') }}
        </p>
      </div>

      <div class="divider"></div>

      <!-- Principles -->
      <span class="eyebrow">{{ c('principles.principles') }}</span
      ><UntranslatedNote v-if="untranslated('principles')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1.5rem"
      >
        {{ c('principles.whatWeStandFor') }}
      </h2>
      <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2.5rem">
        <div v-for="p in principles" :key="p.title" style="display: flex; gap: 1rem">
          <div
            style="
              font-family: var(--serif);
              font-size: 2rem;
              font-weight: 600;
              color: var(--green);
              opacity: 0.2;
              line-height: 1;
              flex-shrink: 0;
              width: 32px;
            "
          >
            {{ p.num }}
          </div>
          <div>
            <div
              style="
                font-family: var(--serif);
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 0.3rem;
              "
            >
              {{ p.title }}
            </div>
            <div style="font-size: 14px; color: var(--muted); line-height: 1.6">
              <HadithRef :text="p.desc" />
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Usage Statistics -->
      <span class="eyebrow" id="statistics">{{ c('usageStatistics.usageStatistics') }}</span
      ><UntranslatedNote v-if="untranslated('usageStatistics')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1.5rem"
      >
        {{ c('usageStatistics.howWeUnderstandUsage') }}
      </h2>
      <div class="prose" style="margin-bottom: 1.5rem">
        <p>
          {{ c('usageStatistics.toUnderstandHowIslamichubIsUsed') }}
        </p>
        <p>
          <strong>{{ c('usageStatistics.whatIsCounted') }}</strong>
        </p>
        <ul>
          <li>{{ c('usageStatistics.pageViewsByAddressThePath') }}</li>
          <li>
            {{ c('usageStatistics.whereAVisitCameFromThe') }} <code>google.com</code>
            {{ c('usageStatistics.neverTheFullUrl') }}
          </li>
          <li>
            {{ c('usageStatistics.fiveNamedActionsPrayerTimesShown') }}
          </li>
        </ul>
        <p>
          <strong>{{ c('usageStatistics.whatIsNeverSent') }}</strong>
        </p>
        <ul>
          <li>
            {{ c('usageStatistics.anyAmountWeightCoordinatePlaceName') }}
          </li>
          <li>
            {{ c('usageStatistics.yourNameEmailOrAnyIdentifier') }}
          </li>
          <li>{{ c('usageStatistics.whichSpecificHadithOrArticleYou') }}</li>
        </ul>
        <p>
          {{ c('usageStatistics.statisticsAreSentTo') }}
          <strong>{{ c('usageStatistics.goatcounter') }}</strong
          >{{ c('usageStatistics.aCookielessOpenSourceAnalyticsService') }}
        </p>
        <p>
          {{ c('usageStatistics.countingHappensOnlyOnTheLive') }}<code>islamichub.xyz</code
          >{{ c('usageStatistics.andOnlyWhenConfiguredItIs') }}
          <strong>{{ c('usageStatistics.doNotTrack') }}</strong> {{ c('usageStatistics.and') }}
          <strong>{{ c('usageStatistics.globalPrivacyControl') }}</strong>
          {{ c('usageStatistics.areHonouredAutomatically') }}
        </p>
      </div>
      <StatsOptOut />
      <div class="card" style="margin-top: 1rem">
        <p>
          <strong>{{ c('usageStatistics.yourLocation') }}</strong>
        </p>
        <p style="font-size: 13.5px; color: var(--muted); line-height: 1.7">
          {{ c('usageStatistics.yourLocationIsAskedForOnly') }}
        </p>
      </div>
      <div class="card" style="margin-top: 1rem">
        <p>
          <strong>{{ c('usageStatistics.notificationsWhenTheAppIsClosed') }}</strong>
        </p>
        <p style="font-size: 13.5px; color: var(--muted); line-height: 1.7">
          {{ c('usageStatistics.prayerRemindersWorkOnYourDevice') }}
        </p>
      </div>
      <p style="font-size: 12px; color: var(--muted); margin-top: 1rem">
        {{ c('usageStatistics.thisIsAChangeFromOur') }}
      </p>

      <div
        v-if="quranCredits.length"
        class="card"
        style="margin-top: 1rem"
        data-test="quran-credits"
      >
        <p>
          <strong>{{ $t('about.quranTranslations') }}</strong>
        </p>
        <ul
          style="
            font-size: 13.5px;
            color: var(--muted);
            line-height: 1.7;
            padding-inline-start: 1.2rem;
          "
        >
          <li v-for="locale in quranCredits" :key="locale.code">
            {{ locale.name }}: {{ locale.quran.translator }} ({{ locale.quran.edition }})
          </li>
        </ul>
      </div>

      <div class="divider"></div>
      <span class="eyebrow" id="scholars">{{ c('scholarlySources.scholarlySources') }}</span
      ><UntranslatedNote v-if="untranslated('scholarlySources')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1.5rem"
      >
        {{ c('scholarlySources.whatWeDrawFrom') }}
      </h2>
      <div class="card-grid card-grid-2" style="margin-bottom: 2.5rem">
        <div v-for="s in sources" :key="s.title" class="card">
          <div
            style="
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: var(--green);
              margin-bottom: 0.75rem;
            "
          >
            {{ s.title }}
          </div>
          <div
            style="font-size: 13.5px; color: var(--muted); line-height: 2"
            v-html="s.content"
          ></div>
        </div>
      </div>

      <div class="card card-gold" style="border-color: #e0c87a; margin-bottom: 3rem">
        <div
          style="
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #7a5a10;
            margin-bottom: 8px;
          "
        >
          {{ c('scholarlySources.disclaimer') }}
        </div>
        <p style="font-size: 13.5px; color: #5a3e0a; line-height: 1.7">
          {{ c('scholarlySources.islamichubIsAnEducationalAndGuidance') }}
        </p>
      </div>

      <div class="cta-strip anim-target">
        <GeoPattern />
        <h2>{{ c('scholarlySources.joinUsInBuildingThis') }}</h2>
        <p>
          {{ c('scholarlySources.starTheRepoOpenAnIssue') }}
        </p>
        <div class="btn-group" style="justify-content: center">
          <a
            :href="GITHUB_REPO"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-white btn-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
            {{ c('scholarlySources.viewOnGithub') }}
          </a>
          <RouterLink
            to="/zakat"
            class="btn btn-secondary btn-lg"
            style="color: #fff; border-color: rgba(255, 255, 255, 0.35)"
            >{{ c('scholarlySources.tryTheZakatCalculator') }}
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
import content from '@/data/content/about/en.js'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import StatsOptOut from '@/components/StatsOptOut.vue'
import { availableLocales } from '@/i18n.js'

const { c, list, untranslated } = useContent('about', content)
const quranCredits = computed(() => availableLocales.value.filter((locale) => locale.quran))

useSeo('about')
useScrollReveal()

const GITHUB_REPO = 'https://github.com/Zubs/islamichub'

const builders = computed(() => list('builders'))

const ways = computed(() => list('ways'))

const principles = computed(() => list('principles'))

const sources = computed(() => list('sources'))
</script>

<style scoped>
.builder-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 3rem;
}

.builder-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s;
}

.builder-card:hover {
  box-shadow: var(--shadow);
}

.builder-top {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.builder-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
  object-fit: cover;
}

.builder-name {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.builder-role {
  font-size: 12.5px;
  color: var(--muted);
  margin-bottom: 6px;
  line-height: 1.3;
}

.builder-github-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: var(--green);
  text-decoration: none;
  padding: 3px 8px;
  background: var(--green-light);
  border-radius: 10px;
  transition: background 0.15s;
}

.builder-github-link:hover {
  background: #c8e8d8;
}

.builder-bio {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.65;
}

.builder-contribs-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  margin-bottom: 6px;
}

.builder-contribs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.contrib-tag {
  font-size: 11.5px;
  padding: 3px 9px;
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--muted);
}

.oss-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.oss-card {
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.15s;
  color: inherit;
}

.oss-card:hover {
  background: #fff;
  box-shadow: var(--shadow-sm);
  border-color: var(--green);
  transform: translateY(-2px);
}

.oss-icon {
  width: 40px;
  height: 40px;
  background: var(--green-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
}

.oss-name {
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
}

.oss-desc {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .builder-grid {
    grid-template-columns: 1fr;
  }

  .oss-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div>
    <div class="page-header pillar-header-fasting">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--fasting-light); color: var(--fasting-color)"
        >
          {{ c('header.pillar4Of5') }}
        </div>
        <h1>{{ c('header.sawmFasting') }}</h1>
        <p>
          {{ c('header.theFourthPillarFastingDuringThe') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <QuranBlock
        arabic="يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ"
        reference="Qur'an 2:183"
        :translation="c('header.oYouWhoHaveBelievedDecreed')"
        :framed="true"
        class="anim-target"
      />

      <!-- Ramadan status -->
      <div style="margin-top: 2.5rem">
        <span class="eyebrow">{{ $t('fasting.ramadanAh', { a: hijri.year }) }}</span>
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0.75rem"
        >
          {{ inRamadan ? $t('fasting.ramadanMubarak') : $t('fasting.daysUntilRamadan', daysLeft) }}
        </h2>

        <div
          class="card"
          style="
            background: var(--ink);
            color: #fff;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
          "
        >
          <div class="bg-kufic-grid dark" aria-hidden="true"></div>
          <div
            style="
              position: relative;
              z-index: 1;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 1.5rem;
              flex-wrap: wrap;
            "
          >
            <div style="text-align: center">
              <div
                style="
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.6px;
                  color: rgba(255, 255, 255, 0.5);
                  margin-bottom: 6px;
                "
              >
                {{ $t('fasting.currentHijriDate') }}
              </div>
              <div
                style="font-family: var(--serif); font-size: 1.4rem; font-weight: 600; color: #fff"
              >
                {{ hijri.day }} {{ hijri.monthName }}
              </div>
              <div style="font-size: 13px; color: rgba(255, 255, 255, 0.5)">
                {{ $t('fasting.ah', { a: hijri.year }) }}
              </div>
            </div>
            <div style="text-align: center">
              <div
                style="
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.6px;
                  color: rgba(255, 255, 255, 0.5);
                  margin-bottom: 6px;
                "
              >
                {{ inRamadan ? $t('fasting.ramadanDay') : $t('fasting.monthsRemaining') }}
              </div>
              <div
                style="font-family: var(--serif); font-size: 2rem; font-weight: 600"
                :style="{ color: inRamadan ? '#8BC4A8' : 'var(--gold)' }"
              >
                {{ inRamadan ? hijri.day : Math.max(0, 9 - hijri.month) }}
              </div>
              <div style="font-size: 13px; color: rgba(255, 255, 255, 0.5)">
                {{ inRamadan ? $t('fasting.ofDays') : $t('fasting.untilRamadan') }}
              </div>
            </div>
            <div style="text-align: center">
              <div
                style="
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.6px;
                  color: rgba(255, 255, 255, 0.5);
                  margin-bottom: 6px;
                "
              >
                {{ $t('fasting.status') }}
              </div>
              <div style="font-size: 1.5rem">{{ inRamadan ? '🌙' : '⭐' }}</div>
              <div style="font-size: 13px; color: rgba(255, 255, 255, 0.5)">
                {{ inRamadan ? $t('fasting.ramadanIsHere') : $t('fasting.waiting') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Suhoor / Iftar times -->
        <div class="card" style="margin-bottom: 1.5rem">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 12px;
            "
          >
            {{ $t('fasting.suhoorIftarTimesToday') }}
          </h3>
          <p style="font-size: 13.5px; color: var(--muted); margin-bottom: 14px">
            {{ $t('fasting.enterYourCoordinatesToCalculateToday') }}
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: flex-end">
            <div class="field" style="flex: 1; min-width: 130px">
              <label>{{ $t('fasting.latitude') }}</label
              ><input
                v-model.number="lat"
                type="number"
                class="input-field"
                placeholder="51.5074"
                step="0.0001"
              />
            </div>
            <div class="field" style="flex: 1; min-width: 130px">
              <label>{{ $t('fasting.longitude') }}</label
              ><input
                v-model.number="lng"
                type="number"
                class="input-field"
                placeholder="-0.1278"
                step="0.0001"
              />
            </div>
            <button class="btn btn-primary" @click="calculate">
              {{ $t('fasting.calculate') }}
            </button>
            <button class="btn btn-secondary" @click="locate">
              {{ $t('fasting.myLocation') }}
            </button>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem">
            <div
              style="
                background: var(--cream-dark);
                border-radius: var(--radius);
                padding: 1rem;
                text-align: center;
              "
            >
              <div
                style="
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  color: var(--muted);
                  margin-bottom: 6px;
                "
              >
                {{ $t('fasting.suhoorEndsFajr') }}
              </div>
              <div
                style="
                  font-family: var(--serif);
                  font-size: 1.8rem;
                  font-weight: 600;
                  color: var(--green);
                "
              >
                {{ suhoorTime }}
              </div>
              <div style="font-size: 12px; color: var(--muted)">
                {{ $t('fasting.lastMomentToEat') }}
              </div>
            </div>
            <div
              style="
                background: var(--gold-light);
                border: 1px solid #e0c87a;
                border-radius: var(--radius);
                padding: 1rem;
                text-align: center;
              "
            >
              <div
                style="
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                  color: #7a5a10;
                  margin-bottom: 6px;
                "
              >
                {{ $t('fasting.iftarMaghrib') }}
              </div>
              <div
                style="
                  font-family: var(--serif);
                  font-size: 1.8rem;
                  font-weight: 600;
                  color: var(--gold);
                "
              >
                {{ iftarTime }}
              </div>
              <div style="font-size: 12px; color: #7a5a10">{{ $t('fasting.timeToBreakFast') }}</div>
            </div>
          </div>
          <div v-if="fastStatus" style="margin-top: 10px; font-size: 13px; color: var(--muted)">
            {{ fastStatus }}
          </div>
          <div v-if="showProgress" style="margin-top: 14px">
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 11.5px;
                color: var(--muted);
                margin-bottom: 5px;
              "
            >
              <span>{{ $t('fasting.fastingInProgress') }}</span
              ><span>{{ fastPct }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: fastPct + '%', background: 'var(--gold)' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <FastingTracker />

      <div class="divider"></div>

      <span class="eyebrow">{{ c('whatIsSawm.whatIsSawm') }}</span
      ><UntranslatedNote v-if="untranslated('whatIsSawm')" />
      <h2 class="section-title" style="font-size: clamp(1.5rem, 2.5vw, 1.9rem)">
        {{ c('whatIsSawm.theObligationOfFasting') }}
      </h2>
      <div class="prose">
        <p>
          {{ c('whatIsSawm.sawmFastingInIslamicLawRefers') }}
        </p>
        <p>
          {{ c('whatIsSawm.theFastBeginsAtTheBreak') }}<HadithRef text="Sahih Bukhari 1903" />).
        </p>
      </div>

      <HadithBlock reference="Sahih Bukhari 1904 · Sahih Muslim 1151">
        {{ c('whatIsSawm.everyDeedOfTheSonOf') }}
      </HadithBlock>

      <div class="divider"></div>

      <span class="eyebrow">{{ c('rulings.rulings') }}</span
      ><UntranslatedNote v-if="untranslated('rulings')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('rulings.whoMustFastValidExcuses') }}
      </h2>
      <div class="card-grid card-grid-2 anim-target">
        <div class="card card-green" style="border-color: #b0d8c4">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.75rem;
              color: var(--green);
            "
          >
            {{ c('rulings.mustFast') }}
          </h3>
          <div
            v-for="c in mustFast"
            :key="c"
            style="
              font-size: 13.5px;
              color: var(--muted);
              padding: 4px 0;
              border-bottom: 1px solid #e5f5ee;
            "
          >
            · {{ c }}
          </div>
        </div>
        <div class="card card-warn" style="border-color: #f0b0a8">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.75rem;
              color: var(--red);
            "
          >
            {{ c('rulings.validExcusesMakeUpLater') }}
          </h3>
          <div
            v-for="c in excuses"
            :key="c"
            style="
              font-size: 13.5px;
              color: var(--muted);
              padding: 4px 0;
              border-bottom: 1px solid #fde9e7;
            "
          >
            · {{ c }}
          </div>
        </div>
      </div>

      <!-- Invalidators of the fast -->
      <div style="margin-top: 1.5rem">
        <span class="eyebrow">{{ c('invalidators.invalidators') }}</span
        ><UntranslatedNote v-if="untranslated('invalidators')" />
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
        >
          {{ c('invalidators.invalidatorsOfTheFastMuftirat') }}
        </h2>
        <div
          class="card-grid anim-target"
          style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))"
        >
          <div v-for="m in muftirat" :key="m.title" class="card">
            <h3
              style="
                font-family: var(--serif);
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.35rem;
              "
            >
              {{ m.title }}
            </h3>
            <p style="font-size: 12.5px; color: var(--muted); line-height: 1.55">
              <HadithRef :text="m.desc" />
            </p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <span class="eyebrow">{{ c('virtuesOfRamadan.virtuesOfRamadan') }}</span
      ><UntranslatedNote v-if="untranslated('virtuesOfRamadan')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('virtuesOfRamadan.theBlessedMonth') }}
      </h2>

      <QuranBlock
        arabic="شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ"
        reference="Qur'an 2:185"
        :translation="c('virtuesOfRamadan.theMonthOfRamadanInWhich')"
        class="anim-target"
      />

      <div class="timeline anim-target" style="margin-top: 1.5rem">
        <div v-for="v in virtues" :key="v.title" class="tl-item">
          <div class="tl-marker">{{ v.icon }}</div>
          <div class="tl-content">
            <h3>{{ v.title }}</h3>
            <p><HadithRef :text="v.desc" /></p>
          </div>
        </div>
      </div>

      <div class="divider"></div>
      <FaqList :faqs="faqs" />

      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>{{ c('virtuesOfRamadan.continueToTheFifthPillar') }}</h2>
        <p>
          {{ c('virtuesOfRamadan.hajjThePilgrimageToTheSacred') }}
        </p>
        <RouterLink to="/hajj" class="btn btn-white btn-lg">{{
          c('virtuesOfRamadan.exploreHajj')
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/fasting/en.js'
import { ref, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import { t } from '@/i18n.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { isValidCoordinates } from '@/utils/prayerSettings.js'
import GeoPattern from '@/components/GeoPattern.vue'
import FastingTracker from '@/components/FastingTracker.vue'
import HadithRef from '@/components/HadithRef.vue'
import HadithBlock from '@/components/HadithBlock.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import { toHijri, daysToRamadan, isRamadan } from '@/utils/hijri.js'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'

const { c, list, untranslated } = useContent('fasting', content)

useSeo('fasting')
useScrollReveal()

const store = useZakatStore()
const hijri = toHijri()
const inRamadan = isRamadan()
const daysLeft = Math.round(daysToRamadan())
const settings = usePrayerSettingsStore()
const lat = ref(settings.saved?.lat ?? store.location?.lat ?? '')
const lng = ref(settings.saved?.lng ?? store.location?.lng ?? '')
const suhoorTime = ref('—:—')
const iftarTime = ref('—:—')
const fastStatus = ref('')
const fastPct = ref(0)
const showProgress = ref(false)

let fastTimer = null

async function locate() {
  try {
    const loc = await store.requestLocation()
    lat.value = parseFloat(loc.lat.toFixed(4))
    lng.value = parseFloat(loc.lng.toFixed(4))
    calculate()
  } catch {
    /* user denied */
  }
}

function calculate() {
  const latV = parseFloat(lat.value)
  const lngV = parseFloat(lng.value)
  if (!isValidCoordinates(latV, lngV)) {
    return
  }

  const tz = getTimezoneOffset()
  const times = calcPrayerTimes(latV, lngV, new Date(), tz, settings.saved?.method ?? 'MWL')
  suhoorTime.value = times.fajr
  iftarTime.value = times.maghrib

  const t2m = (t) => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1])
  const fajrM = t2m(times.fajr)
  const magM = t2m(times.maghrib)

  clearInterval(fastTimer)
  const update = () => {
    const now = new Date().getHours() * 60 + new Date().getMinutes()
    if (now >= fajrM && now < magM) {
      showProgress.value = true
      const pct = Math.round(((now - fajrM) / (magM - fajrM)) * 100)
      fastPct.value = pct
      const rem = magM - now
      const h = Math.floor(rem / 60),
        m = rem % 60
      fastStatus.value = t('fasting.untilIftar', { hours: h, minutes: m })
    } else if (now >= magM) {
      showProgress.value = true
      fastPct.value = 100
      fastStatus.value = t('fasting.iftarTime')
    } else {
      showProgress.value = false
      const rem = fajrM - now
      const h = Math.floor(rem / 60),
        m = rem % 60
      fastStatus.value = t('fasting.suhoorIn', { hours: h, minutes: m })
    }
  }
  update()
  fastTimer = setInterval(update, 60000)
}

if (settings.saved || store.location) {
  calculate()
}

onUnmounted(() => clearInterval(fastTimer))

const mustFast = computed(() => list('mustFast'))
const excuses = computed(() => list('excuses'))

const muftirat = computed(() => list('muftirat'))

const virtues = computed(() => list('virtues'))

const faqs = computed(() => list('faqs'))
</script>

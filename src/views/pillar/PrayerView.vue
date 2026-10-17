<template>
  <div>
    <div class="page-header pillar-header-prayer">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--prayer-light); color: var(--prayer-color)"
        >
          {{ c('header.pillar2Of5') }}
        </div>
        <h1>{{ c('header.salahTheFiveDailyPrayers') }}</h1>
        <p>
          {{ c('header.theSecondPillarAndTheMost') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <QuranBlock
        arabic="إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا"
        reference="Qur'an 4:103"
        :translation="c('header.indeedPrayerHasBeenDecreedUpon')"
        :note="c('header.prayerHasSpecificDivinelyOrdainedTimes')"
        class="anim-target"
      />

      <nav class="on-this-page" :aria-label="c('onThisPage.label')">
        <a v-for="link in onThisPage" :key="link" :href="'#' + link">{{
          c('onThisPage.' + link)
        }}</a>
      </nav>

      <section id="guides" class="prayer-section">
        <span class="eyebrow">{{ c('guides.eyebrow') }}</span
        ><UntranslatedNote v-if="untranslated('guides')" />
        <h2 class="section-title prayer-section-title">{{ c('guides.title') }}</h2>
        <p class="prose prayer-section-intro">{{ c('guides.intro') }}</p>
        <ul class="prayer-guides">
          <li v-for="guide in guides" :key="guide.to">
            <RouterLink :to="guide.to" class="tool-card">
              <span class="tc-icon" aria-hidden="true">{{ guide.icon }}</span>
              <span>
                <span class="tc-name">{{ guide.name }}</span>
                <span class="tc-desc">{{ guide.text }}</span>
              </span>
            </RouterLink>
          </li>
        </ul>
      </section>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- ── PRAYER TIMES TOOL ─────────────────────────────── -->
      <div id="times" class="prayer-section">
        <span class="eyebrow">{{ $t('prayer.prayerTimesTool') }}</span>
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0.75rem"
        >
          {{ $t('prayer.todaySPrayerTimes') }}
        </h2>
        <p class="prose" style="margin-bottom: 1.5rem">
          {{ $t('prayer.enterYourLocationToGetAccurate') }}
        </p>

        <div class="card" style="margin-bottom: 1rem">
          <div style="display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap">
            <div class="field" style="flex: 1; min-width: 130px">
              <label>{{ $t('prayer.latitude') }}</label>
              <input
                v-model.number="lat"
                type="number"
                class="input-field"
                placeholder="51.5074"
                step="0.0001"
              />
            </div>
            <div class="field" style="flex: 1; min-width: 130px">
              <label>{{ $t('prayer.longitude') }}</label>
              <input
                v-model.number="lng"
                type="number"
                class="input-field"
                placeholder="-0.1278"
                step="0.0001"
              />
            </div>
            <div class="field" style="min-width: 160px">
              <label>{{ $t('prayer.calculationMethod') }}</label>
              <select v-model="method" class="select-field">
                <option value="MWL">{{ $t('prayer.muslimWorldLeague') }}</option>
                <option value="ISNA">{{ $t('prayer.isnaNorthAmerica') }}</option>
                <option value="Egypt">{{ $t('prayer.egyptianAuthority') }}</option>
                <option value="Makkah">{{ $t('prayer.ummAlQuraMakkah') }}</option>
                <option value="Karachi">{{ $t('prayer.karachiUniversity') }}</option>
              </select>
            </div>
            <div class="field" style="min-width: 160px">
              <label for="asr-method">{{ $t('prayer.asrTime') }}</label>
              <select id="asr-method" v-model="asrMethod" class="select-field">
                <option value="standard">{{ $t('prayer.standardShafiIMalikiHanbali') }}</option>
                <option value="hanafi">{{ $t('prayer.hanafi') }}</option>
              </select>
            </div>
            <button class="btn btn-secondary" @click="locate" :disabled="locating">
              {{ locating ? $t('prayer.locating') : $t('prayer.useMyLocation') }}
            </button>
            <button class="btn btn-primary" @click="calculate">{{ $t('prayer.calculate') }}</button>
          </div>
          <div v-if="locationStatus" style="margin-top: 8px; font-size: 13px; color: var(--muted)">
            {{ locationStatus }}
          </div>
          <div v-if="shownLocation || settings.saved" class="remember-row">
            <span v-if="isRemembered" class="remember-state">
              {{ $t('prayer.rememberedOnThisDevice', { a: settings.saved.name }) }}
            </span>
            <button
              v-else-if="shownLocation && settings.canRemember"
              class="btn btn-secondary"
              @click="rememberLocation"
            >
              {{ $t('prayer.rememberThisLocation') }}
            </button>
            <span v-else-if="shownLocation" class="remember-state" role="status">
              {{ $t('prayer.yourBrowserIsBlockingStorageSo') }}
            </span>
            <button v-if="settings.saved" class="btn btn-secondary" @click="settings.forget()">
              {{ $t('prayer.forgetMyLocation') }}
            </button>
            <span v-if="settings.canRemember" class="remember-note">
              {{ $t('prayer.keptOnThisDeviceOnlyAnd') }}
            </span>
          </div>
          <ReminderSettings />
        </div>

        <!-- Next prayer banner -->
        <div
          v-if="prayerTimes"
          class="card card-green"
          style="border-color: #b0d8c4; margin-bottom: 1rem"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 12px;
            "
          >
            <div>
              <div
                style="
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.6px;
                  color: var(--green);
                  margin-bottom: 3px;
                "
              >
                {{ $t('prayer.nextPrayer') }}
              </div>
              <div style="font-family: var(--serif); font-size: 1.4rem; font-weight: 600">
                {{ nextPrayerLabel }}
              </div>
            </div>
            <div style="text-align: end">
              <div
                style="font-size: 11px; font-weight: 600; color: var(--green); margin-bottom: 3px"
              >
                {{ $t('prayer.timeRemaining') }}
              </div>
              <div
                style="
                  font-family: var(--serif);
                  font-size: 1.8rem;
                  font-weight: 600;
                  color: var(--green);
                "
              >
                {{ countdown }}
              </div>
            </div>
          </div>
        </div>

        <!-- Prayer cards -->
        <div class="prayer-grid">
          <div
            v-for="p in prayerOrder"
            :key="p.key"
            class="prayer-card"
            :class="{ current: currentPrayer === p.key }"
            :id="'pc-' + p.key"
          >
            <div class="prayer-name">{{ $t('common.prayers.' + p.key) }}</div>
            <div class="prayer-time">{{ prayerTimes ? prayerTimes[p.key] : '—:—' }}</div>
            <div class="prayer-sub">{{ p.key === 'sunrise' ? $t('prayer.notAPrayer') : '' }}</div>
          </div>
        </div>
      </div>

      <!-- ── QIBLA ────────────────────────────────────────── -->
      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
      <span id="qibla" class="eyebrow prayer-anchor">{{ $t('prayer.qiblaFinder') }}</span>
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 0.75rem"
      >
        {{ $t('prayer.directionOfTheKaBah') }}
      </h2>
      <p class="prose" style="margin-bottom: 1.5rem">
        {{ $t('prayer.theQiblaIsTheDirectionOf') }}
      </p>

      <div class="card" style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap">
        <div class="qibla-wrap">
          <div class="compass-ring">
            <span class="compass-n" aria-hidden="true">N</span>
            <span class="compass-s" aria-hidden="true">S</span>
            <span class="compass-e" aria-hidden="true">E</span>
            <span class="compass-w" aria-hidden="true">W</span>
            <!-- Fixed pivot geometry: zero-size element at ring centre -->
            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                overflow: visible;
              "
            >
              <div
                ref="needleArm"
                style="
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 4px;
                  height: 100px;
                  margin-left: -2px;
                  background: linear-gradient(to top, rgba(27, 92, 66, 0.15) 0%, var(--green) 100%);
                  border-radius: 2px 2px 0 0;
                  transform-origin: bottom center;
                  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
                "
              ></div>
              <div
                ref="needleTail"
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 4px;
                  height: 40px;
                  margin-left: -2px;
                  background: linear-gradient(
                    to bottom,
                    rgba(160, 160, 160, 0.55) 0%,
                    transparent 100%
                  );
                  border-radius: 0 0 2px 2px;
                  transform-origin: top center;
                  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
                "
              ></div>
            </div>
            <div class="compass-kaaba" :aria-label="$t('prayer.kaBah')">🕋</div>
            <div
              aria-hidden="true"
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                margin: -5px 0 0 -5px;
                background: var(--green);
                border-radius: 50%;
                border: 2px solid #fff;
                z-index: 3;
              "
            ></div>
          </div>
        </div>
        <div style="flex: 1; min-width: 200px">
          <div style="margin-bottom: 20px">
            <div
              style="
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: var(--muted);
                margin-bottom: 5px;
              "
            >
              {{ $t('prayer.qiblaBearing') }}
            </div>
            <div
              style="
                font-family: var(--serif);
                font-size: 2.4rem;
                font-weight: 600;
                color: var(--green);
                line-height: 1;
              "
            >
              {{ qiblaBearing !== null ? qiblaBearing + '°' : '—°' }}
            </div>
            <div style="font-size: 14px; color: var(--muted); margin-top: 4px">{{ qiblaDir }}</div>
          </div>
          <div style="margin-bottom: 20px">
            <div
              style="
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: var(--muted);
                margin-bottom: 5px;
              "
            >
              {{ $t('prayer.distanceToMakkah') }}
            </div>
            <div
              style="font-family: var(--serif); font-size: 1.5rem; font-weight: 600; line-height: 1"
            >
              {{ qiblaDist !== null ? qiblaDist.toLocaleString() + ' km' : '—' }}
            </div>
          </div>
          <div
            style="
              background: var(--green-light);
              border: 1px solid #b0d8c4;
              border-radius: var(--radius-sm);
              padding: 10px 12px;
              font-size: 12.5px;
              color: var(--green);
              line-height: 1.5;
            "
          >
            {{ $t('prayer.faceTheBearingShownAboveThe') }}
          </div>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <section id="importance">
        <span class="eyebrow">{{ c('importance.eyebrow') }}</span
        ><UntranslatedNote v-if="untranslated('importance')" />
        <h2 class="section-title prayer-section-title">{{ c('importance.title') }}</h2>
        <QuranBlock
          arabic="اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ ۗ وَاللَّهُ يَعْلَمُ مَا تَصْنَعُونَ"
          reference="Qur'an 29:45"
          :translation="c('importance.recite')"
          :note="c('importance.reciteNote')"
        />
        <ul class="prayer-points">
          <li v-for="n in 4" :key="n"><HadithRef :text="c('importance.i' + n)" /></li>
        </ul>
      </section>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <span id="prayers" class="eyebrow prayer-anchor">{{
        c('understandingSalah.understandingSalah')
      }}</span
      ><UntranslatedNote v-if="untranslated('understandingSalah')" />
      <h2 class="section-title" style="font-size: clamp(1.5rem, 2.5vw, 1.9rem)">
        {{ c('understandingSalah.theFiveDailyPrayers') }}
      </h2>
      <div
        class="card-grid anim-target"
        style="grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); margin-bottom: 1.5rem"
      >
        <div v-for="p in prayerInfo" :key="p.en" class="card" style="text-align: center">
          <div
            style="
              font-family: var(--serif);
              font-size: 1.3rem;
              direction: rtl;
              color: var(--green);
              margin-bottom: 4px;
            "
            lang="ar"
          >
            {{ p.ar }}
          </div>
          <div
            style="
              font-family: var(--serif);
              font-size: 0.95rem;
              font-weight: 600;
              margin-bottom: 2px;
            "
          >
            {{ p.en }}
          </div>
          <div style="font-size: 11.5px; color: var(--muted); margin-bottom: 6px">
            {{ p.meaning }} ·
            {{ p.rakahs }}
          </div>
          <div
            style="
              font-size: 11px;
              background: var(--green-light);
              color: var(--green);
              padding: 2px 8px;
              border-radius: 10px;
              display: inline-block;
            "
          >
            {{ p.time }}
          </div>
        </div>
      </div>

      <HadithBlock reference="Sahih Bukhari 8 · Sahih Muslim 16">
        {{ c('understandingSalah.islamIsBuiltOnFivePillars') }}
      </HadithBlock>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <span id="conditions" class="eyebrow prayer-anchor">{{
        c('conditionsStructure.conditionsStructure')
      }}</span
      ><UntranslatedNote v-if="untranslated('conditionsStructure')" />
      <h2
        class="section-title"
        style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
      >
        {{ c('conditionsStructure.prerequisitesForAValidPrayer') }}
      </h2>
      <div class="card-grid card-grid-2 anim-target">
        <div class="card">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.75rem;
              color: var(--green);
            "
          >
            {{ c('conditionsStructure.conditionsShurut') }}
          </h3>
          <div
            v-for="c in shurut"
            :key="c"
            style="
              font-size: 13.5px;
              color: var(--muted);
              padding: 4px 0;
              border-bottom: 1px solid #f5f5f5;
            "
          >
            · {{ c }}
          </div>
        </div>
        <div class="card">
          <h3
            style="
              font-family: var(--serif);
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.75rem;
              color: var(--green);
            "
          >
            {{ c('conditionsStructure.pillarsArkan') }}
          </h3>
          <div
            v-for="a in arkan"
            :key="a"
            style="
              font-size: 13.5px;
              color: var(--muted);
              padding: 4px 0;
              border-bottom: 1px solid #f5f5f5;
            "
          >
            · {{ a }}
          </div>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
      <div id="questions" class="prayer-anchor">
        <FaqList :faqs="faqs" />
      </div>

      <div class="cta-strip anim-target" style="margin-top: 2.5rem">
        <GeoPattern />
        <h2>{{ c('conditionsStructure.continueToTheThirdPillar') }}</h2>
        <p>
          {{ c('conditionsStructure.zakatTheObligationOfAlmsgivingCalculated') }}
        </p>
        <RouterLink to="/zakat" class="btn btn-white btn-lg">{{
          c('conditionsStructure.exploreZakat')
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/prayer/en.js'
import { ref, computed, watch, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { isValidCoordinates } from '@/utils/prayerSettings.js'
import { track } from '@/composables/useStats.js'
import { t } from '@/i18n.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ReminderSettings from '@/components/ReminderSettings.vue'
import HadithBlock from '@/components/HadithBlock.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import HadithRef from '@/components/HadithRef.vue'
import {
  calcPrayerTimes,
  getCurrentPrayer,
  getNextPrayer,
  getTimezoneOffset,
} from '@/utils/prayer.js'
import { calcQibla, bearingToLabel, distanceToMakkah } from '@/utils/qibla.js'

const { c, list, untranslated } = useContent('prayer', content)

useSeo('prayer')
useScrollReveal()

const store = useZakatStore()

// ── Form state ───────────────────────────────────────────────
const settings = usePrayerSettingsStore()
const lat = ref(settings.saved?.lat ?? store.location?.lat ?? '')
const lng = ref(settings.saved?.lng ?? store.location?.lng ?? '')
const method = ref(settings.saved?.method ?? 'MWL')
const asrMethod = ref(settings.saved?.asrMethod ?? 'standard')
const shownLocation = ref(null)
const isRemembered = computed(
  () =>
    !!settings.saved &&
    settings.saved.lat === shownLocation.value?.lat &&
    settings.saved.lng === shownLocation.value?.lng,
)

function rememberLocation() {
  const { lat: shownLat, lng: shownLng } = shownLocation.value
  const found = store.location
  const wasFound =
    found &&
    parseFloat(found.lat.toFixed(4)) === shownLat &&
    parseFloat(found.lng.toFixed(4)) === shownLng
  settings.remember({
    lat: shownLat,
    lng: shownLng,
    name: wasFound ? found.name : `${shownLat}, ${shownLng}`,
    method: method.value,
    asrMethod: asrMethod.value,
  })
}
const locating = ref(false)
const locationStatus = ref('')

// ── Results ───────────────────────────────────────────────────
const prayerTimes = ref(null)
const currentPrayer = ref(null)
const nextPrayer = ref(null)
const countdown = ref('')
const nextPrayerLabel = computed(() => {
  if (!nextPrayer.value) {
    return ''
  }

  const name = t(`common.prayers.${nextPrayer.value.key}`)
  return nextPrayer.value.label.includes('tomorrow')
    ? t('todayPanel.tomorrow', { prayer: name })
    : name
})
const qiblaBearing = ref(null)
const qiblaDir = ref(t('prayer.qiblaPrompt'))
const qiblaDist = ref(null)

// ── DOM refs for needle ───────────────────────────────────────
const needleArm = ref(null)
const needleTail = ref(null)

let countdownTimer = null

const prayerOrder = [
  { key: 'fajr', label: 'Fajr' },
  { key: 'sunrise', label: 'Sunrise' },
  { key: 'dhuhr', label: 'Dhuhr' },
  { key: 'asr', label: 'Asr' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isha' },
]

// ── Locate ─────────────────────────────────────────────────────
async function locate() {
  locating.value = true
  locationStatus.value = t('prayer.requestingLocation')
  try {
    const loc = await store.requestLocation()
    lat.value = parseFloat(loc.lat.toFixed(4))
    lng.value = parseFloat(loc.lng.toFixed(4))
    locationStatus.value = `📍 ${loc.name}`
    calculate()
  } catch {
    locationStatus.value = store.locationError || t('prayer.locationFailed')
  } finally {
    locating.value = false
  }
}

// ── Calculate prayer times + Qibla ────────────────────────────
function calculate() {
  if (showTimes()) {
    track('prayer times shown')
  }
}

function showTimes() {
  const latV = parseFloat(lat.value)
  const lngV = parseFloat(lng.value)
  if (!isValidCoordinates(latV, lngV)) {
    locationStatus.value = t('prayer.invalidCoordinates')
    return false
  }

  shownLocation.value = { lat: latV, lng: lngV }

  const tz = getTimezoneOffset()
  const times = calcPrayerTimes(latV, lngV, new Date(), tz, method.value, asrMethod.value)
  prayerTimes.value = times
  currentPrayer.value = getCurrentPrayer(times)

  // Countdown
  clearInterval(countdownTimer)

  function tick() {
    const next = getNextPrayer(times)
    nextPrayer.value = next
    const h = Math.floor(next.minsRemaining / 60)
    const m = next.minsRemaining % 60
    countdown.value =
      h > 0
        ? t('common.hoursMinutes', { hours: h, minutes: m })
        : t('common.minutes', { minutes: m })
  }

  tick()
  countdownTimer = setInterval(tick, 60000)

  // Qibla
  const bearing = calcQibla(latV, lngV)
  qiblaBearing.value = bearing
  qiblaDir.value = t('prayer.qiblaFrom', { direction: bearingToLabel(bearing) })
  qiblaDist.value = distanceToMakkah(latV, lngV)

  // Rotate needle via DOM refs (reactive style binding causes repaint issues with transitions)
  if (needleArm.value) {
    needleArm.value.style.transform = `rotate(${bearing}deg)`
  }

  if (needleTail.value) {
    needleTail.value.style.transform = `rotate(${bearing}deg)`
  }

  return true
}

watch([method, asrMethod], () => {
  settings.setMethods(method.value, asrMethod.value)
  if (prayerTimes.value) {
    showTimes()
  }
})

// Pre-calculate if location already known
if (settings.saved || store.location) {
  calculate()
}

onUnmounted(() => clearInterval(countdownTimer))

// ── Static data ────────────────────────────────────────────────
const prayerInfo = computed(() => list('prayerInfo'))

const shurut = computed(() => list('shurut'))
const arkan = computed(() => list('arkan'))

const faqs = computed(() => list('faqs'))

const guides = computed(() => list('guides'))

const onThisPage = ['guides', 'times', 'qibla', 'importance', 'prayers', 'conditions', 'questions']
</script>

<style scoped>
.on-this-page {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);
}

.on-this-page a {
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: var(--green);
  text-decoration: none;
}

.on-this-page a:hover {
  background: var(--green-light);
}

.prayer-section {
  margin-top: var(--space-10);
}

#guides,
#times,
#importance,
.prayer-anchor {
  scroll-margin-top: calc(var(--nav-height) + var(--space-4));
}

.prayer-section-title {
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  margin-bottom: var(--space-3);
}

.prayer-section-intro {
  margin-bottom: var(--space-5);
}

.prayer-guides {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
}

.prayer-guides > li {
  display: flex;
}

.prayer-guides .tool-card {
  flex: 1;
}

.prayer-guides .tc-name,
.prayer-guides .tc-desc {
  display: block;
}

.prayer-points {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding-inline-start: var(--space-6);
  line-height: 1.7;
  color: var(--ink);
}

.remember-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-3);
  margin-top: var(--space-3);
  font-size: 13px;
  color: var(--muted);
}

.remember-state {
  color: var(--ink);
}

.remember-note {
  flex-basis: 100%;
  font-size: 12px;
}
</style>

<template>
  <section class="today" aria-labelledby="today-heading">
    <div class="today-head">
      <span class="eyebrow">{{ $t('todayPanel.today') }}</span>
      <h2 id="today-heading" class="today-title">{{ dateTitle }}</h2>
    </div>

    <div class="today-grid">
      <RouterLink v-if="nextPrayer" to="/tracker" class="today-tile" data-part="next-prayer">
        <span class="today-label">{{ $t('todayPanel.nextPrayer') }}</span>
        <span class="today-value">{{ nextPrayerLabel }}</span>
        <span class="today-note">{{
          $t('todayPanel.inAt', { a: countdown, b: nextPrayerTime })
        }}</span>
      </RouterLink>
      <RouterLink v-else to="/prayer" class="today-tile today-tile-start" data-part="next-prayer">
        <span class="today-label">{{ $t('todayPanel.nextPrayer') }}</span>
        <span class="today-value">{{ $t('todayPanel.setYourLocation') }}</span>
        <span class="today-note">{{ $t('todayPanel.rememberALocationOnThePrayer') }}</span>
      </RouterLink>

      <RouterLink to="/tracker" class="today-tile" data-part="prayers">
        <span class="today-label">{{ $t('todayPanel.todaySPrayers') }}</span>
        <span class="today-value">{{ $t('todayPanel.of5Prayed', { a: prayedCount }) }}</span>
        <span class="today-prayers">
          <span
            v-for="prayer in prayers"
            :key="prayer.key"
            class="today-prayer"
            :class="'status-' + (salah.statusOf(today, prayer.key) ?? 'none')"
            :title="`${$t('common.prayers.' + prayer.key)}: ${statusLabel(prayer.key)}`"
          >
            {{ $t('common.prayers.' + prayer.key) }}
          </span>
        </span>
        <span v-if="!loggedCount" class="today-note">{{
          $t('todayPanel.tapToLogYourPrayers')
        }}</span>
      </RouterLink>

      <RouterLink to="/adhkar" class="today-tile" data-part="adhkar">
        <span class="today-label">{{ $t('todayPanel.adhkar') }}</span>
        <span class="today-value">{{
          $t('todayPanel.ofDone', { a: adhkarDone.length, b: categories.length })
        }}</span>
        <span class="today-note">
          {{
            adhkarDone.length
              ? adhkarDone.map((category) => category.name).join(' · ')
              : $t('todayPanel.tapToBeginAdhkar')
          }}
        </span>
      </RouterLink>

      <RouterLink to="/tasbih" class="today-tile" data-part="tasbih">
        <span class="today-label">{{ $t('todayPanel.tasbih') }}</span>
        <span class="today-value">{{ tasbihTotal }}</span>
        <span class="today-note">{{
          tasbihTotal ? $t('todayPanel.countedToday') : $t('todayPanel.tapToStartCounting')
        }}</span>
      </RouterLink>

      <RouterLink v-if="inRamadan" to="/fasting" class="today-tile" data-part="fasting">
        <span class="today-label">{{ $t('todayPanel.todaySFast') }}</span>
        <span class="today-value">{{ fastLabel }}</span>
        <span v-if="!fasting.statusOf(today)" class="today-note">{{
          $t('todayPanel.tapToRecordTodaySFast')
        }}</span>
      </RouterLink>
    </div>

    <DailyHadith />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import DailyHadith from './DailyHadith.vue'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { useSalahStore } from '@/stores/salah.js'
import { useAdhkarStore } from '@/stores/adhkar.js'
import { useTasbihStore } from '@/stores/tasbih.js'
import { useFastingStore } from '@/stores/fasting.js'
import { ADHKAR_CATEGORIES } from '@/data/adhkar.js'
import { SALAH_PRAYERS, loggedCount as countLogged } from '@/utils/salah.js'
import { ramadanYearOf } from '@/utils/fasting.js'
import { calcPrayerTimes, getNextPrayer, getTimezoneOffset } from '@/utils/prayer.js'
import { dayKey } from '@/utils/day.js'
import { t, formatDate } from '@/i18n.js'

const MINUTE_MS = 60000

const settings = usePrayerSettingsStore()
const salah = useSalahStore()
const adhkar = useAdhkarStore()
const tasbih = useTasbihStore()
const fasting = useFastingStore()

const prayers = SALAH_PRAYERS
const categories = ADHKAR_CATEGORIES
const now = ref(new Date())
const today = computed(() => dayKey(now.value))

const dateTitle = computed(() =>
  formatDate(now.value, { weekday: 'long', day: 'numeric', month: 'long' }),
)

const times = computed(() => {
  const saved = settings.saved
  return saved
    ? calcPrayerTimes(
        saved.lat,
        saved.lng,
        now.value,
        getTimezoneOffset(),
        saved.method,
        saved.asrMethod,
      )
    : null
})
const nextPrayer = computed(() => (times.value && now.value ? getNextPrayer(times.value) : null))
const nextPrayerLabel = computed(() =>
  nextPrayer.value.label.includes('tomorrow')
    ? t('todayPanel.tomorrow', { prayer: t(`common.prayers.${nextPrayer.value.key}`) })
    : t(`common.prayers.${nextPrayer.value.key}`),
)
const nextPrayerTime = computed(() => times.value?.[nextPrayer.value?.key])
const countdown = computed(() => {
  const minutes = nextPrayer.value?.minsRemaining ?? 0
  const hours = Math.floor(minutes / 60)
  return hours > 0
    ? t('common.hoursMinutes', { hours, minutes: minutes % 60 })
    : t('common.minutes', { minutes })
})

const todaysEntry = computed(() => salah.log[today.value])
const loggedCount = computed(() => countLogged(todaysEntry.value))
const prayedCount = computed(
  () =>
    prayers.filter((prayer) => ['on-time', 'late'].includes(todaysEntry.value?.[prayer.key]))
      .length,
)

function statusLabel(prayer) {
  const status = salah.statusOf(today.value, prayer)
  return t(`common.salahStatus.${status ?? 'none'}`).toLowerCase()
}

const adhkarDone = computed(() =>
  categories.filter((category) => adhkar.completionLog[today.value]?.includes(category.slug)),
)
const tasbihTotal = computed(() =>
  Object.values(tasbih.totals[today.value] ?? {}).reduce((sum, count) => sum + count, 0),
)

const inRamadan = computed(() => ramadanYearOf(today.value, fasting.starts) !== null)
const fastLabel = computed(() => t(`common.fastStatus.${fasting.statusOf(today.value) ?? 'none'}`))

function tick() {
  now.value = new Date()
  salah.refreshToday()
}

let timer = null
onMounted(() => {
  timer = setInterval(tick, MINUTE_MS)
  document.addEventListener('visibilitychange', tick)
})
onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('visibilitychange', tick)
})
</script>

<style scoped>
.today {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4) 0;
}

.today-head {
  margin-bottom: var(--space-4);
}

.today-title {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 600;
  color: var(--ink);
}

.today-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: var(--space-3);
}

.today-tile {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
  padding: var(--space-4);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.today-tile:hover,
.today-tile:focus-visible {
  border-color: var(--gold);
  box-shadow: var(--shadow-sm);
}

.today-tile-start {
  border-style: dashed;
}

.today-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--green);
}

.today-value {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--ink);
}

.today-note {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.45;
}

.today-prayers {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.today-prayer {
  padding: 2px var(--space-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 11.5px;
  color: var(--muted);
}

.status-on-time {
  background: var(--green-light);
  border-color: var(--green);
  color: var(--green);
}

.status-late {
  background: var(--gold-light);
  border-color: var(--gold);
  color: var(--ink);
}

.status-missed {
  background: var(--cream-dark);
  border-color: var(--red);
  color: var(--red);
}

.today :deep(.daily-hadith) {
  max-width: none;
  padding: var(--space-5) 0 0;
}
</style>

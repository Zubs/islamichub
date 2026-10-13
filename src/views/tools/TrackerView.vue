<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ $t('tracker.dailyWorship') }}
        </div>
        <h1>{{ $t('tracker.prayerTracker') }}</h1>
        <p>
          {{ $t('tracker.recordEachOfTheFiveDaily') }}
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <section class="card tracker-summary" :aria-label="$t('tracker.streak')">
        <div>
          <div class="tracker-label">{{ $t('tracker.currentStreak') }}</div>
          <div class="tracker-streak">
            {{ $t('common.days', salah.streak) }}
          </div>
        </div>
        <p class="tracker-hint">{{ $t('tracker.aDayCountsWhenAllFive') }}</p>
      </section>

      <section aria-labelledby="week-heading">
        <h2 id="week-heading" class="tracker-heading">{{ $t('tracker.lastSevenDays') }}</h2>
        <div class="tracker-week">
          <button
            v-for="day in week"
            :key="day"
            class="tracker-day"
            :class="['state-' + stateOf(day), { selected: day === selectedDay }]"
            :aria-pressed="day === selectedDay"
            :aria-label="`${longDate(day)}: ${stateLabel(day)}`"
            @click="selectDay(day)"
          >
            <span class="tracker-day-name">{{ weekdayOf(day) }}</span>
            <span class="tracker-day-number">{{ dayNumberOf(day) }}</span>
          </button>
        </div>
      </section>

      <section class="card" aria-labelledby="day-heading">
        <h2 id="day-heading" class="tracker-heading">
          {{ selectedDay === salah.today ? $t('tracker.today') : longDate(selectedDay) }}
        </h2>
        <p v-if="selectedDay === salah.today && !settings.saved" class="tracker-hint">
          <RouterLink to="/prayer">{{ $t('tracker.rememberALocationOnThePrayer') }}</RouterLink>
          {{ $t('tracker.toSeeEachPrayerSTime') }}
        </p>
        <div
          v-for="prayer in prayers"
          :key="prayer.key"
          class="tracker-row"
          :data-prayer="prayer.key"
        >
          <div class="tracker-prayer">
            <span class="tracker-prayer-name">{{ $t('common.prayers.' + prayer.key) }}</span>
            <span v-if="timeOf(prayer.key)" class="tracker-time">{{ timeOf(prayer.key) }}</span>
            <span v-if="isNotYet(prayer.key)" class="tracker-not-yet">{{
              $t('tracker.notYet')
            }}</span>
            <span v-else-if="!salah.statusOf(selectedDay, prayer.key)" class="tracker-unlogged">{{
              $t('tracker.notLogged')
            }}</span>
          </div>
          <div
            class="tracker-statuses"
            role="group"
            :aria-label="$t('tracker.statusOf', { prayer: $t('common.prayers.' + prayer.key) })"
          >
            <button
              v-for="status in statuses"
              :key="status.key"
              class="tracker-status"
              :class="[
                'status-' + status.key,
                { active: salah.statusOf(selectedDay, prayer.key) === status.key },
              ]"
              :aria-pressed="salah.statusOf(selectedDay, prayer.key) === status.key"
              :disabled="isNotYet(prayer.key)"
              @click="salah.setStatus(selectedDay, prayer.key, status.key)"
            >
              {{ $t('common.salahStatus.' + status.key) }}
            </button>
          </div>
        </div>
      </section>

      <section class="card" aria-labelledby="month-heading">
        <div class="tracker-month-head">
          <button
            class="btn btn-secondary"
            :aria-label="$t('tracker.previousMonth')"
            @click="moveMonth(-1)"
          >
            ←
          </button>
          <h2 id="month-heading" class="tracker-heading">{{ monthTitle }}</h2>
          <button
            class="btn btn-secondary"
            :aria-label="$t('tracker.nextMonth')"
            :disabled="isCurrentMonth"
            @click="moveMonth(1)"
          >
            →
          </button>
        </div>
        <div class="tracker-month" role="grid" :aria-label="monthTitle">
          <div v-for="name in WEEKDAY_NAMES" :key="name" class="tracker-month-name">{{ name }}</div>
          <template v-for="(weekRow, w) in grid" :key="w">
            <template v-for="(day, d) in weekRow" :key="w + '-' + d">
              <button
                v-if="day"
                class="tracker-cell"
                :class="['state-' + stateOf(day), { selected: day === selectedDay }]"
                :disabled="!canLog(day, salah.today)"
                :aria-label="`${longDate(day)}: ${stateLabel(day)}`"
                @click="selectDay(day)"
              >
                {{ dayNumberOf(day) }}
              </button>
              <span v-else class="tracker-cell tracker-cell-empty" aria-hidden="true"></span>
            </template>
          </template>
        </div>
        <ul class="tracker-legend">
          <li>
            <span class="tracker-dot state-complete"></span> {{ $t('tracker.allFivePrayed') }}
          </li>
          <li><span class="tracker-dot state-partial"></span> {{ $t('tracker.partlyLogged') }}</li>
          <li><span class="tracker-dot state-missed"></span> {{ $t('tracker.aPrayerMissed') }}</li>
        </ul>
      </section>

      <section class="tracker-clear">
        <p class="tracker-hint">
          {{ $t('tracker.yourLogIsKeptOnlyIn') }}
        </p>
        <button class="btn btn-secondary" :disabled="!hasData" @click="clearLog">
          {{ $t('tracker.clearMyData') }}
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import GeoPattern from '@/components/GeoPattern.vue'
import { useSalahStore } from '@/stores/salah.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { SALAH_PRAYERS, SALAH_STATUSES, dayState, canLog, weekEnding } from '@/utils/salah.js'
import { monthGrid } from '@/utils/day.js'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'
import { t, formatDate } from '@/i18n.js'

// A Monday, so the seven dates that follow give the weekday names in order.
const A_MONDAY = new Date(2024, 0, 1)
const WEEKDAY_NAMES = computed(() =>
  Array.from({ length: 7 }, (_, index) =>
    formatDate(new Date(2024, 0, A_MONDAY.getDate() + index), { weekday: 'short' }),
  ),
)
const MINUTE_MS = 60000

useSeo('tracker')

const salah = useSalahStore()
const settings = usePrayerSettingsStore()
const prayers = SALAH_PRAYERS
const statuses = SALAH_STATUSES

salah.refreshToday()
const selectedDay = ref(salah.today)
const now = ref(new Date())
const shownMonth = ref({ year: now.value.getFullYear(), month: now.value.getMonth() + 1 })

function dateOf(day) {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date)
}

function longDate(day) {
  return formatDate(dateOf(day), { weekday: 'long', day: 'numeric', month: 'long' })
}

function weekdayOf(day) {
  return formatDate(dateOf(day), { weekday: 'short' })
}

function dayNumberOf(day) {
  return dateOf(day).getDate()
}

function stateOf(day) {
  return dayState(salah.log[day])
}

function stateLabel(day) {
  return t(`tracker.state.${stateOf(day)}`)
}

function selectDay(day) {
  if (canLog(day, salah.today)) {
    selectedDay.value = day
  }
}

const week = computed(() => weekEnding(salah.today))
const grid = computed(() => monthGrid(shownMonth.value.year, shownMonth.value.month))
const monthTitle = computed(() =>
  formatDate(new Date(shownMonth.value.year, shownMonth.value.month - 1, 1), {
    month: 'long',
    year: 'numeric',
  }),
)
const isCurrentMonth = computed(() => {
  const today = dateOf(salah.today)
  return (
    shownMonth.value.year === today.getFullYear() && shownMonth.value.month === today.getMonth() + 1
  )
})
const hasData = computed(() => Object.keys(salah.log).length > 0)

function moveMonth(step) {
  const moved = new Date(shownMonth.value.year, shownMonth.value.month - 1 + step, 1)
  shownMonth.value = { year: moved.getFullYear(), month: moved.getMonth() + 1 }
}

const todaysTimes = computed(() => {
  const saved = settings.saved
  return saved
    ? calcPrayerTimes(
        saved.lat,
        saved.lng,
        dateOf(salah.today),
        getTimezoneOffset(),
        saved.method,
        saved.asrMethod,
      )
    : null
})

function timeOf(prayer) {
  return selectedDay.value === salah.today ? (todaysTimes.value?.[prayer] ?? null) : null
}

function isNotYet(prayer) {
  const time = timeOf(prayer)
  if (!time) {
    return false
  }

  const [hours, minutes] = time.split(':').map(Number)
  return now.value.getHours() * 60 + now.value.getMinutes() < hours * 60 + minutes
}

function clearLog() {
  if (window.confirm(t('tracker.confirmClear'))) {
    salah.clear()
  }
}

function tick() {
  now.value = new Date()
  const wasToday = selectedDay.value === salah.today
  salah.refreshToday()
  if (wasToday) {
    selectedDay.value = salah.today
  }
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
.content-narrow > section {
  margin-bottom: var(--space-5);
}

.tracker-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.tracker-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--green);
}

.tracker-streak {
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--green);
}

.tracker-heading {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-3);
}

.tracker-hint {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.tracker-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-2);
}

.tracker-day,
.tracker-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 44px;
  padding: var(--space-2) 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: 13px;
  color: var(--ink);
  cursor: pointer;
}

.tracker-day-name {
  font-size: 11px;
  color: var(--muted);
}

.tracker-day-number {
  font-weight: 600;
}

.tracker-cell:disabled {
  color: var(--border);
  cursor: default;
}

.tracker-cell-empty {
  border: none;
  background: none;
  cursor: default;
}

.state-complete {
  background: var(--green-light);
  border-color: var(--green);
}

.state-partial {
  background: var(--gold-light);
  border-color: var(--gold);
}

.state-missed {
  background: var(--cream-dark);
  border-color: var(--red);
}

.selected {
  outline: 2px solid var(--ink);
  outline-offset: 1px;
}

.tracker-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-3) 0;
  border-top: 1px solid var(--border);
}

.tracker-prayer {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.tracker-prayer-name {
  font-weight: 600;
  color: var(--ink);
}

.tracker-time,
.tracker-unlogged,
.tracker-not-yet {
  font-size: 12.5px;
  color: var(--muted);
}

.tracker-not-yet {
  font-weight: 600;
  color: var(--gold);
}

.tracker-statuses {
  display: flex;
  gap: var(--space-1);
}

.tracker-status {
  min-height: 40px;
  padding: var(--space-2) var(--space-3);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 100px;
  font: inherit;
  font-size: 13px;
  color: var(--ink);
  cursor: pointer;
}

.tracker-status:disabled {
  color: var(--border);
  cursor: default;
}

.tracker-status.active.status-on-time {
  background: var(--green);
  border-color: var(--green);
  color: #fff;
}

.tracker-status.active.status-late {
  background: var(--gold);
  border-color: var(--gold);
  color: #fff;
}

.tracker-status.active.status-missed {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
}

.tracker-month-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.tracker-month-head .tracker-heading {
  margin: 0;
}

.tracker-month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-1);
  margin-top: var(--space-3);
}

.tracker-month-name {
  font-size: 11px;
  text-align: center;
  color: var(--muted);
}

.tracker-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-3);
  padding: 0;
  list-style: none;
  font-size: 12px;
  color: var(--muted);
}

.tracker-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid var(--border);
  border-radius: 50%;
  vertical-align: middle;
}

.tracker-clear {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
}
</style>

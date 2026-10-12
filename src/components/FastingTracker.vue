<template>
  <section class="fasting-tracker" aria-labelledby="fasting-tracker-heading">
    <span class="eyebrow">Fasting tracker</span>
    <h2 id="fasting-tracker-heading" class="section-title ft-title">Your fasts</h2>
    <p class="ft-hint">
      Record each fast and see what is still to be made up. Everything stays on this device.
    </p>

    <div class="ft-summary">
      <div class="card">
        <div class="ft-label">Still to make up</div>
        <div class="ft-figure" data-test="to-make-up">{{ fasting.toMakeUp }}</div>
        <ul v-if="fasting.summary.length" class="ft-years">
          <li v-for="entry in fasting.summary" :key="entry.year">
            Ramadan {{ entry.year }} AH: {{ entry.missed }} missed, {{ entry.madeUp }} made up,
            {{ entry.remaining }} remaining
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="ft-label">Voluntary fasts</div>
        <div class="ft-figure" data-test="voluntary">{{ fasting.voluntary }}</div>
      </div>
    </div>

    <div class="btn-group ft-views">
      <button class="pill-btn" :class="{ active: view === 'ramadan' }" @click="view = 'ramadan'">
        Ramadan {{ ramadanYear }} AH
      </button>
      <button class="pill-btn" :class="{ active: view === 'month' }" @click="view = 'month'">
        {{ monthTitle }}
      </button>
    </div>

    <div v-if="view === 'ramadan'" class="ft-start">
      <label for="ramadan-start">First day of Ramadan {{ ramadanYear }} AH</label>
      <div class="ft-start-row">
        <input
          id="ramadan-start"
          type="date"
          class="input-field"
          :value="start"
          @change="fasting.setRamadanStart(ramadanYear, $event.target.value)"
        />
        <button
          v-if="fasting.starts[ramadanYear]"
          class="btn btn-secondary"
          @click="fasting.setRamadanStart(ramadanYear, null)"
        >
          Use the estimate
        </button>
      </div>
      <p class="ft-hint">
        This date is an estimate. The month begins with the sighting of the moon, so set it to the
        day Ramadan began where you are.
      </p>
    </div>

    <div class="ft-grid" :class="'ft-grid-' + view">
      <template v-for="(day, index) in days" :key="view + index">
        <button
          v-if="day"
          class="ft-day"
          :class="[
            fasting.statusOf(day) ? 'status-' + fasting.statusOf(day) : '',
            { selected: day === selectedDay },
          ]"
          :disabled="day > today"
          :aria-label="`${longDate(day)}: ${statusLabel(fasting.statusOf(day))}`"
          :aria-pressed="day === selectedDay"
          @click="selectedDay = day"
        >
          <span class="ft-day-number">{{ view === 'ramadan' ? index + 1 : dayNumber(day) }}</span>
          <span v-if="view === 'ramadan'" class="ft-day-date">{{ shortDate(day) }}</span>
        </button>
        <span v-else class="ft-day ft-day-empty" aria-hidden="true"></span>
      </template>
    </div>

    <div v-if="selectedDay" class="card ft-selected">
      <div class="ft-selected-day">{{ longDate(selectedDay) }}</div>
      <div class="ft-statuses" role="group" aria-label="Fast status">
        <button
          v-for="status in offered"
          :key="status.key"
          class="ft-status"
          :class="[
            'status-' + status.key,
            { active: fasting.statusOf(selectedDay) === status.key },
          ]"
          :aria-pressed="fasting.statusOf(selectedDay) === status.key"
          @click="fasting.setStatus(selectedDay, status.key)"
        >
          {{ status.label }}
        </button>
      </div>
      <p class="ft-hint">
        {{
          isRamadanDay
            ? 'A day in Ramadan is marked fasted or missed.'
            : 'A day outside Ramadan is marked as a made-up fast or a voluntary one.'
        }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFastingStore } from '@/stores/fasting.js'
import { dayKey, monthGrid } from '@/utils/day.js'
import {
  FAST_STATUSES,
  allowedStatuses,
  ramadanStart,
  ramadanDays,
  ramadanYearOf,
  latestRamadanYear,
} from '@/utils/fasting.js'

const fasting = useFastingStore()
const today = dayKey()

const ramadanYear = computed(
  () => ramadanYearOf(today, fasting.starts) ?? latestRamadanYear(today, fasting.starts),
)
const start = computed(() => ramadanStart(ramadanYear.value, fasting.starts))
const view = ref(ramadanYearOf(today, fasting.starts) === null ? 'month' : 'ramadan')
const selectedDay = ref(today)

function dateOf(day) {
  const [year, month, date] = day.split('-').map(Number)
  return new Date(year, month - 1, date)
}

const now = dateOf(today)
const monthTitle = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

const days = computed(() =>
  view.value === 'ramadan'
    ? ramadanDays(start.value)
    : monthGrid(now.getFullYear(), now.getMonth() + 1).flat(),
)

const offered = computed(() => {
  const allowed = allowedStatuses(selectedDay.value, today, fasting.starts)
  return FAST_STATUSES.filter((status) => allowed.includes(status.key))
})
const isRamadanDay = computed(() => ramadanYearOf(selectedDay.value, fasting.starts) !== null)

function longDate(day) {
  return dateOf(day).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function shortDate(day) {
  return dateOf(day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function dayNumber(day) {
  return dateOf(day).getDate()
}

function statusLabel(status) {
  return FAST_STATUSES.find((entry) => entry.key === status)?.label ?? 'not logged'
}
</script>

<style scoped>
.fasting-tracker {
  margin: var(--space-10) 0;
}

.ft-title {
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  margin-bottom: var(--space-2);
}

.ft-hint {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.ft-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin: var(--space-4) 0;
}

.ft-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--fasting-color);
}

.ft-figure {
  font-family: var(--serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--ink);
}

.ft-years {
  margin: var(--space-2) 0 0;
  padding: 0;
  list-style: none;
  font-size: 12.5px;
  color: var(--muted);
}

.ft-views,
.ft-start {
  margin-bottom: var(--space-4);
}

.ft-start label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: var(--space-2);
}

.ft-start-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.ft-grid {
  display: grid;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
}

.ft-grid-ramadan {
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
}

.ft-grid-month {
  grid-template-columns: repeat(7, 1fr);
}

.ft-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: var(--space-1);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font: inherit;
  color: var(--ink);
  cursor: pointer;
}

.ft-day:disabled {
  color: var(--border);
  cursor: default;
}

.ft-day-empty {
  border: none;
  background: none;
}

.ft-day-number {
  font-weight: 600;
  font-size: 14px;
}

.ft-day-date {
  font-size: 10.5px;
  color: var(--muted);
}

.status-fasted,
.status-made-up {
  background: var(--green-light);
  border-color: var(--green);
}

.status-missed {
  background: var(--cream-dark);
  border-color: var(--red);
}

.status-voluntary {
  background: var(--fasting-light);
  border-color: var(--fasting-color);
}

.selected {
  outline: 2px solid var(--ink);
  outline-offset: 1px;
}

.ft-selected-day {
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.ft-statuses {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.ft-status {
  min-height: 40px;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border);
  border-radius: 100px;
  font: inherit;
  font-size: 13px;
  color: var(--ink);
  cursor: pointer;
}

.ft-status.active {
  border-width: 2px;
  font-weight: 600;
}
</style>

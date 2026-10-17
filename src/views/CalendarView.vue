<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.badge') }} · <span lang="ar">التقويم الهجري</span>
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <p class="calendar-note">{{ c('header.moonNote') }}</p>

      <section class="card calendar-card" aria-labelledby="calendar-month">
        <div class="calendar-nav">
          <button
            type="button"
            class="btn btn-secondary calendar-step"
            :aria-label="$t('calendar.previous')"
            @click="go(-1)"
          >
            <span class="flip-rtl" aria-hidden="true">‹</span>
          </button>
          <div class="calendar-heading">
            <h2 id="calendar-month" class="calendar-month">
              {{
                $t('calendar.month', { month: $t('hijri.months.' + shown.month), year: shown.year })
              }}
            </h2>
            <span class="calendar-range">{{ gregorianRange }}</span>
          </div>
          <button
            type="button"
            class="btn btn-secondary calendar-step"
            :aria-label="$t('calendar.next')"
            @click="go(1)"
          >
            <span class="flip-rtl" aria-hidden="true">›</span>
          </button>
        </div>
        <button v-if="!isCurrent" type="button" class="calendar-today-link" @click="goToday">
          {{ $t('calendar.backToToday') }}
        </button>

        <table class="calendar-grid">
          <thead>
            <tr>
              <th v-for="name in weekdayNames" :key="name" scope="col">{{ name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in weeks" :key="index">
              <td v-for="(day, place) in week" :key="place">
                <template v-if="day">
                  <button
                    v-if="day.kinds.length"
                    type="button"
                    class="calendar-day marked"
                    :class="{ today: day.dayKey === today }"
                    :aria-label="dayLabel(day)"
                    @click="showKind(day.kinds[0].key)"
                  >
                    <span class="calendar-hijri">{{ day.hijriDay }}</span>
                    <span class="calendar-gregorian">{{ shortDate(day.date) }}</span>
                    <span class="calendar-dots" aria-hidden="true">
                      <span v-for="kind in day.kinds" :key="kind.key" class="calendar-dot"></span>
                    </span>
                  </button>
                  <div
                    v-else
                    class="calendar-day"
                    :class="{ today: day.dayKey === today }"
                    :aria-label="dayLabel(day)"
                  >
                    <span class="calendar-hijri">{{ day.hijriDay }}</span>
                    <span class="calendar-gregorian">{{ shortDate(day.date) }}</span>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="calendar-marks" aria-labelledby="calendar-marks-title">
        <h2 id="calendar-marks-title" class="calendar-marks-title">
          {{ $t('calendar.marked') }}
        </h2>
        <p class="calendar-note">{{ c('header.marked') }}</p>
        <article
          v-for="mark in marks"
          :id="`kind-${mark.key}`"
          :key="mark.key"
          :ref="(element) => (entries[mark.key] = element)"
          class="card calendar-mark"
          tabindex="-1"
        >
          <h3 class="calendar-mark-name">{{ c(`${mark.key}.name`) }}</h3>
          <ul class="calendar-mark-dates">
            <li v-for="day in mark.days" :key="day.dayKey">
              <span v-if="day.label" class="calendar-mark-label">{{
                c(`${mark.key}.${day.label}`)
              }}</span>
              {{
                $t('hijri.date', {
                  day: day.hijriDay,
                  month: $t('hijri.months.' + shown.month),
                  year: shown.year,
                })
              }}
              · {{ longDate(day.date) }}
            </li>
          </ul>
          <p class="calendar-mark-text"><HadithRef :text="c(`${mark.key}.text`)" /></p>
        </article>
      </section>

      <section class="card calendar-reminders" aria-labelledby="calendar-reminders-title">
        <h2 id="calendar-reminders-title" class="calendar-marks-title">
          {{ $t('calendar.remindersTitle') }}
        </h2>
        <p class="calendar-note">{{ $t('calendar.remindersIntro') }}</p>
        <ReminderSwitches :items="reminderItems" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo.js'
import { useContent } from '@/composables/useContent.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import ReminderSwitches from '@/components/ReminderSwitches.vue'
import { DAY_ITEMS } from '@/utils/reminders.js'
import content from '@/data/content/calendar/en.js'
import { toHijri } from '@/utils/hijri.js'
import { dayKey } from '@/utils/day.js'
import { monthGrid, marksIn, shiftMonth, daysOfMonth } from '@/utils/islamicDays.js'
import { formatDate } from '@/i18n.js'

const { c } = useContent('calendar', content)
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

useSeo('calendar')

const MONTH_QUERY = /^(\d{3,4})-(\d{1,2})$/
const today = dayKey()
const current = toHijri(new Date())

function fromQuery(value) {
  const match = MONTH_QUERY.exec(String(value ?? ''))
  const month = match ? Number(match[2]) : 0
  return match && month >= 1 && month <= 12
    ? { year: Number(match[1]), month }
    : { year: current.year, month: current.month }
}

const shown = computed(() => fromQuery(route.query.m))
const isCurrent = computed(
  () => shown.value.year === current.year && shown.value.month === current.month,
)
const days = computed(() => daysOfMonth(shown.value.year, shown.value.month))
const weeks = computed(() => monthGrid(shown.value.year, shown.value.month))
const marks = computed(() => marksIn(shown.value.year, shown.value.month))

const weekdayNames = computed(() =>
  Array.from({ length: 7 }, (_, index) =>
    formatDate(new Date(2026, 0, 5 + index), { weekday: 'short' }),
  ),
)

function shortDate(date) {
  return formatDate(date, { day: 'numeric', month: 'short' })
}

function longDate(date) {
  return formatDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

const gregorianRange = computed(() => {
  const list = days.value
  return `${longDate(list[0].date)} – ${longDate(list.at(-1).date)}`
})

function dayLabel(day) {
  const names = day.kinds.map((kind) =>
    kind.label ? c(`${kind.key}.${kind.label}`) : c(`${kind.key}.name`),
  )
  return [
    t('hijri.date', {
      day: day.hijriDay,
      month: t('hijri.months.' + shown.value.month),
      year: shown.value.year,
    }),
    longDate(day.date),
    ...names,
  ].join(', ')
}

function go(months) {
  const next = shiftMonth(shown.value, months)
  router.push({ query: { m: `${next.year}-${next.month}` } })
}

function goToday() {
  router.push({ query: {} })
}

const reminderItems = computed(() => DAY_ITEMS.map((key) => ({ key, label: c(`${key}.name`) })))

const entries = {}

function showKind(key) {
  const entry = entries[key]
  entry?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
  entry?.focus?.({ preventScroll: true })
}
</script>

<style scoped>
.calendar-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.calendar-card {
  margin-top: var(--space-4);
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.calendar-step {
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  font-size: 1.4rem;
}

.calendar-heading {
  text-align: center;
}

.calendar-month {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  margin: 0;
}

.calendar-range {
  font-size: 12.5px;
  color: var(--muted);
}

.calendar-today-link {
  display: block;
  margin: var(--space-2) auto 0;
  padding: var(--space-2);
  border: 0;
  background: none;
  color: var(--green);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.calendar-grid {
  width: 100%;
  margin-top: var(--space-4);
  border-collapse: separate;
  border-spacing: var(--space-1);
  table-layout: fixed;
}

.calendar-grid th {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted);
  padding-bottom: var(--space-1);
}

.calendar-grid td {
  padding: 0;
  vertical-align: top;
}

.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: var(--space-1) 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--cream);
  color: var(--ink);
  font: inherit;
}

.calendar-day.marked {
  border-color: var(--gold);
  background: var(--gold-light);
  cursor: pointer;
}

.calendar-day.today {
  border: 2px solid var(--green);
}

.calendar-hijri {
  font-size: 1.05rem;
  font-weight: 600;
}

.calendar-gregorian {
  font-size: 10.5px;
  color: var(--muted);
}

.calendar-dots {
  display: flex;
  gap: 2px;
  margin-top: 2px;
}

.calendar-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold-dark);
}

.calendar-marks {
  margin-top: var(--space-8);
}

.calendar-reminders {
  margin-top: var(--space-8);
}

.calendar-marks-title {
  font-family: var(--serif);
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin: 0;
}

.calendar-mark {
  margin-top: var(--space-4);
  scroll-margin-top: calc(var(--nav-height) + var(--space-4));
}

.calendar-mark-name {
  font-family: var(--serif);
  font-size: 1.25rem;
  margin: 0 0 var(--space-2);
}

.calendar-mark-dates {
  display: grid;
  gap: var(--space-1);
  padding: 0;
  margin: 0 0 var(--space-3);
  list-style: none;
  font-size: 13px;
  color: var(--muted);
}

.calendar-mark-label {
  font-weight: 600;
  color: var(--ink);
}

.calendar-mark-text {
  line-height: 1.7;
}
</style>

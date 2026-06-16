<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          Islamic Tools &nbsp;·&nbsp; التَّقْوِيم الهِجْرِي
        </div>
        <h1>Islamic Hijri Calendar</h1>
        <p>
          Browse every month of the Islamic lunar calendar — significant days, blessed nights,
          fasting, and historical events, all grounded in Qur'an and Hadith.
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <!-- Today banner -->
      <div class="ical-today-banner anim-target">
        <div class="itb-left">
          <div class="itb-label">Today</div>
          <div class="itb-hijri">{{ today.day }} {{ currentMonthMeta.en }} {{ today.year }} AH</div>
          <div class="itb-hijri-ar" lang="ar">
            {{ today.day }} {{ currentMonthMeta.ar }} {{ today.year }}
          </div>
        </div>
        <div class="itb-right">
          <div class="itb-greg">{{ todayGreg }}</div>
          <button class="btn btn-secondary itb-btn" @click="goToToday">Go to today</button>
        </div>
      </div>

      <!-- Month navigation -->
      <div class="ical-nav">
        <button class="ical-nav-btn" @click="prevMonth" aria-label="Previous month">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div class="ical-month-title">
          <div class="ical-month-ar" lang="ar">{{ currentMonthMeta.ar }}</div>
          <div class="ical-month-en">{{ currentMonthMeta.en }} {{ viewYear }} AH</div>
        </div>
        <button class="ical-nav-btn" @click="nextMonth" aria-label="Next month">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <!-- Month picker -->
      <div class="ical-month-picker">
        <button
          v-for="m in HIJRI_MONTHS"
          :key="m.num"
          class="imp-btn"
          :class="{ active: m.num === viewMonth }"
          @click="
            viewMonth = m.num;
            selectedDay = null
          "
        >
          {{ m.en.split(' ')[0] }}
        </button>
      </div>

      <!-- Legend -->
      <div class="ical-legend">
        <div v-for="(cat, key) in CATEGORIES" :key="key" class="ical-legend-item">
          <div class="ical-legend-dot" :style="{ background: cat.dot }"></div>
          <span>{{ cat.label }}</span>
        </div>
      </div>

      <!-- Calendar grid -->
      <div class="ical-grid-wrap">
        <!-- Weekday headers -->
        <div class="ical-weekdays">
          <div
            v-for="d in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
            :key="d"
            class="ical-wd"
            :class="{ friday: d === 'Fri' }"
          >
            {{ d }}
          </div>
        </div>

        <!-- Day cells -->
        <div class="ical-grid">
          <div
            v-for="(cell, idx) in gridCells"
            :key="idx"
            class="ical-cell"
            :class="{
              'ical-cell-empty': !cell,
              'ical-cell-today': cell && isToday(cell),
              'ical-cell-selected': cell && isSelected(cell),
              'ical-cell-friday': cell && cell.weekday === 5,
              'ical-cell-has-event': cell && getSignificance(viewMonth, cell.hijriDay),
              ['ical-cat-' + (cell && getSignificance(viewMonth, cell.hijriDay)?.category)]:
                cell && getSignificance(viewMonth, cell.hijriDay),
            }"
            @click="cell && selectDay(cell)"
            :tabindex="cell ? 0 : -1"
            :aria-label="cell ? cellAriaLabel(cell) : undefined"
            @keydown.enter="cell && selectDay(cell)"
            @keydown.space.prevent="cell && selectDay(cell)"
          >
            <template v-if="cell">
              <div class="ical-cell-hijri">{{ cell.hijriDay }}</div>
              <div class="ical-cell-greg">{{ cell.gregorian.day }}</div>
              <div class="ical-cell-dots">
                <span
                  v-if="getSignificance(viewMonth, cell.hijriDay)"
                  class="ical-event-dot"
                  :style="{
                    background:
                      CATEGORIES[getSignificance(viewMonth, cell.hijriDay).category]?.dot || '#aaa',
                  }"
                ></span>
                <span
                  v-if="cell.hijriDay === 13 || cell.hijriDay === 14 || cell.hijriDay === 15"
                  class="ical-white-dot"
                  title="White day (Ayyam al-Bid)"
                  >🌕</span
                >
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Selected day detail panel -->
      <Transition name="day-panel">
        <div v-if="selectedDay && selectedSignificance" class="ical-detail-panel" ref="detailPanel">
          <!-- Header -->
          <div class="idp-header" :style="{ borderTopColor: catColor }">
            <div class="idp-header-left">
              <div class="idp-date">
                <span class="idp-hijri-date"
                  >{{ selectedDay.hijriDay }} {{ currentMonthMeta.en }}</span
                >
                <span class="idp-greg-date"> · {{ formatGreg(selectedDay.gregorian) }}</span>
              </div>
              <div class="idp-category-badge" :style="{ background: catBg, color: catColor }">
                {{ CATEGORIES[selectedSignificance.category]?.label }}
              </div>
            </div>
            <button class="idp-close" @click="selectedDay = null" aria-label="Close day details">
              ✕
            </button>
          </div>

          <!-- Title -->
          <div class="idp-body">
            <div class="idp-arabic" lang="ar">{{ selectedSignificance.arabic }}</div>
            <h2 class="idp-title">{{ selectedSignificance.title }}</h2>

            <!-- White day bonus badge -->
            <div v-if="selectedSignificance.whiteDay" class="idp-white-tag">
              🌕 Also a White Day (Ayyam al-Bid) — fasting is recommended
            </div>

            <!-- Fasting badge -->
            <div v-if="selectedSignificance.fasting" class="idp-fasting-tag">
              🌙 Voluntary fasting recommended on this day
            </div>

            <!-- Summary -->
            <p class="idp-summary">{{ selectedSignificance.summary }}</p>

            <!-- Quranic reference -->
            <div v-if="selectedSignificance.quranRef" class="idp-quran">
              <div class="idp-quran-arabic" lang="ar">
                {{ selectedSignificance.quranRef.arabic }}
              </div>
              <div class="idp-quran-ref">{{ selectedSignificance.quranRef.ref }}</div>
              <div class="idp-quran-trans">"{{ selectedSignificance.quranRef.translation }}"</div>
            </div>

            <!-- Detail -->
            <div class="idp-detail">
              <p v-for="(para, i) in selectedSignificance.detail.split('\n\n')" :key="i">
                {{ para }}
              </p>
            </div>

            <!-- Hadiths -->
            <div v-if="selectedSignificance.hadiths?.length" class="idp-hadiths">
              <div class="idp-hadiths-label">Hadith Evidence</div>
              <div v-for="(h, i) in selectedSignificance.hadiths" :key="i" class="idp-hadith">
                <div class="idp-hadith-text">"{{ h.text }}"</div>
                <div class="idp-hadith-source">
                  <span v-if="h.narrator">{{ h.narrator }} — </span>{{ h.source }}
                </div>
              </div>
            </div>

            <!-- Scholarly note -->
            <div v-if="selectedSignificance.note" class="idp-note">
              <span class="idp-note-icon">📌</span> {{ selectedSignificance.note }}
            </div>
          </div>
        </div>

        <!-- Selected but no significance -->
        <div v-else-if="selectedDay && !selectedSignificance" class="ical-no-event">
          <div class="ical-no-event-inner">
            <div class="ical-no-event-date">
              {{ selectedDay.hijriDay }} {{ currentMonthMeta.en }} {{ viewYear }} AH
              <span class="ical-no-event-greg"> · {{ formatGreg(selectedDay.gregorian) }}</span>
            </div>
            <div
              v-if="
                selectedDay.hijriDay === 13 ||
                selectedDay.hijriDay === 14 ||
                selectedDay.hijriDay === 15
              "
              class="idp-white-tag"
              style="margin-top: 8px"
            >
              🌕 White Day (Ayyam al-Bid) — voluntary fasting is recommended on the 13th, 14th, and
              15th of every Hijri month
            </div>
            <div v-else style="font-size: 14px; color: var(--muted)">
              No specific Islamic significance recorded for this day. Every day is an opportunity
              for worship, dhikr, and good deeds.
            </div>
          </div>
        </div>
      </Transition>

      <!-- Month overview: all significant days this month -->
      <div class="ical-month-events">
        <div class="ical-me-title">
          Significant days in {{ currentMonthMeta.en }} {{ viewYear }}
        </div>
        <div
          v-if="monthSignificantDays.length === 0"
          style="font-size: 14px; color: var(--muted); padding: 0.5rem 0"
        >
          No specifically recorded significant days this month — the white days (13th, 14th, 15th)
          still apply.
        </div>
        <div v-else class="ical-me-list">
          <button
            v-for="sig in monthSignificantDays"
            :key="sig.day"
            class="ical-me-item"
            :style="{ borderLeftColor: CATEGORIES[sig.data.category]?.dot || '#aaa' }"
            @click="jumpToDay(sig.day)"
          >
            <div
              class="ical-me-day"
              :style="{
                background: CATEGORIES[sig.data.category]?.bg,
                color: CATEGORIES[sig.data.category]?.color,
              }"
            >
              {{ sig.day }}
            </div>
            <div class="ical-me-info">
              <div class="ical-me-name">{{ sig.data.title }}</div>
              <div class="ical-me-sum">{{ sig.data.summary.slice(0, 90) }}…</div>
            </div>
            <div class="ical-me-fast" v-if="sig.data.fasting" title="Fasting recommended">🌙</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  nextTick
} from 'vue'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import {
  HIJRI_MONTHS,
  CATEGORIES,
  SIGNIFICANT_DAYS,
  buildHijriMonthGrid,
  prevHijriMonth,
  nextHijriMonth,
  todayHijri,
  getSignificance,
  hijriToGregorian,
} from '@/utils/islamicCalendar.js'

useHead({
  title: 'Islamic Hijri Calendar — Significant Days & Events | IslamicHub',
  meta: [
    {
      name: 'description',
      content:
        "Full Islamic Hijri calendar with significant days, blessed nights, fasting days, Eid dates, and historical events — all with Qur'anic and Hadith references.",
    },
  ],
})
useScrollReveal()

// ── State ─────────────────────────────────────────────────────────────────
const today = todayHijri()
const viewYear = ref(today.year)
const viewMonth = ref(today.month)
const selectedDay = ref(null)
const detailPanel = ref(null)

// ── Today's Gregorian date string ─────────────────────────────────────────
const todayGreg = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

// ── Computed ──────────────────────────────────────────────────────────────
const currentMonthMeta = computed(() => HIJRI_MONTHS[viewMonth.value - 1])

const { cells: gridCells, days } = computed(() =>
  buildHijriMonthGrid(viewYear.value, viewMonth.value),
).value

// Re-compute grid when month/year changes
const gridData = computed(() => buildHijriMonthGrid(viewYear.value, viewMonth.value))

const selectedSignificance = computed(() =>
  selectedDay.value ? getSignificance(viewMonth.value, selectedDay.value.hijriDay) : null,
)

const catColor = computed(
  () => CATEGORIES[selectedSignificance.value?.category]?.color || '#1B5C42',
)
const catBg = computed(() => CATEGORIES[selectedSignificance.value?.category]?.bg || '#e5f5ee')

const monthSignificantDays = computed(() => {
  const result = []
  const monthDays = gridData.value.days
  for (const d of monthDays) {
    const sig = getSignificance(viewMonth.value, d.hijriDay)
    if (sig && sig.category !== 'white') {
      result.push({ day: d.hijriDay, data: sig, cell: d })
    }
  }
  return result
})

// ── Navigation ─────────────────────────────────────────────────────────────
function prevMonth() {
  const p = prevHijriMonth(viewYear.value, viewMonth.value)
  viewYear.value = p.year
  viewMonth.value = p.month
  selectedDay.value = null
}

function nextMonth() {
  const n = nextHijriMonth(viewYear.value, viewMonth.value)
  viewYear.value = n.year
  viewMonth.value = n.month
  selectedDay.value = null
}

function goToToday() {
  viewYear.value = today.year
  viewMonth.value = today.month
  selectedDay.value = null
}

// ── Day selection ─────────────────────────────────────────────────────────
function selectDay(cell) {
  if (selectedDay.value?.hijriDay === cell.hijriDay) {
    selectedDay.value = null
  } else {
    selectedDay.value = cell
    nextTick(() => detailPanel.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }
}

function jumpToDay(hijriDay) {
  const cell = gridData.value.days.find((d) => d.hijriDay === hijriDay)
  if (cell) {
    selectDay(cell)
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function isToday(cell) {
  return (
    cell.hijriDay === today.day && viewMonth.value === today.month && viewYear.value === today.year
  )
}

function isSelected(cell) {
  return selectedDay.value?.hijriDay === cell.hijriDay
}

function formatGreg(g) {
  if (!g) {
    return ''
  }

  const d = new Date(g.year, g.month - 1, g.day)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

function cellAriaLabel(cell) {
  const sig = getSignificance(viewMonth.value, cell.hijriDay)
  const base = `${cell.hijriDay} ${currentMonthMeta.value.en}, ${formatGreg(cell.gregorian)}`
  return sig ? `${base} — ${sig.title}` : base
}

// Reset selected day on month change
watch([viewMonth, viewYear], () => {
  selectedDay.value = null
})
</script>

<style scoped>
/* ── Today banner ──────────────────────────────────────────────────────── */
.ical-today-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, var(--ink) 0%, #1a2e28 100%);
  border-radius: var(--radius-xl);
  padding: 1.25rem 1.5rem;
  margin: 1.75rem 0 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.itb-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--gold);
  margin-bottom: 4px;
}
.itb-hijri {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
}
.itb-hijri-ar {
  font-family: var(--serif);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  direction: rtl;
  margin-top: 2px;
}
.itb-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.itb-greg {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}
.itb-btn {
  white-space: nowrap;
}

/* ── Month navigation ─────────────────────────────────────────────────── */
.ical-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
}
.ical-nav-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  transition: all 0.15s;
}
.ical-nav-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.ical-month-title {
  text-align: center;
}
.ical-month-ar {
  font-family: var(--serif);
  font-size: 1.5rem;
  color: var(--ink);
  direction: rtl;
}
.ical-month-en {
  font-size: 13.5px;
  color: var(--muted);
  font-weight: 500;
}

/* ── Month picker ─────────────────────────────────────────────────────── */
.ical-month-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
.imp-btn {
  font-size: 12px;
  padding: 5px 11px;
  border: 1px solid var(--border);
  border-radius: 100px;
  background: #fff;
  cursor: pointer;
  color: var(--muted);
  transition: all 0.15s;
}
.imp-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.imp-btn.active {
  background: var(--gold);
  color: #fff;
  border-color: var(--gold);
  font-weight: 600;
}

/* ── Legend ───────────────────────────────────────────────────────────── */
.ical-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}
.ical-legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--muted);
}
.ical-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* ── Grid ─────────────────────────────────────────────────────────────── */
.ical-grid-wrap {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.ical-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: var(--ink);
}
.ical-wd {
  text-align: center;
  padding: 0.6rem 0.25rem;
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: rgba(255, 255, 255, 0.6);
}
.ical-wd.friday {
  color: var(--gold);
}
.ical-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

/* ── Cell ─────────────────────────────────────────────────────────────── */
.ical-cell {
  min-height: 72px;
  padding: 0.5rem 0.4rem 0.3rem;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.12s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ical-cell:nth-child(7n) {
  border-right: none;
}
.ical-cell:hover:not(.ical-cell-empty) {
  background: var(--cream-dark);
}
.ical-cell-empty {
  cursor: default;
  background: var(--cream);
}

.ical-cell-today {
  background: var(--green-light) !important;
  border: 2px solid var(--green) !important;
  border-radius: 8px;
  z-index: 1;
}
.ical-cell-selected {
  background: var(--gold-light) !important;
  border: 2px solid var(--gold) !important;
  border-radius: 8px;
  z-index: 1;
}
.ical-cell-friday .ical-cell-hijri {
  color: var(--gold);
}

/* Category tints */
.ical-cat-eid {
  background: #fff0f0;
}
.ical-cat-blessed {
  background: #f0fbf5;
}
.ical-cat-fasting {
  background: #fffbf0;
}
.ical-cat-white {
  background: #f0f5ff;
}
.ical-cat-historical {
  background: #f8f0ff;
}
.ical-cat-sacred-months {
  background: #fffbf0;
}
.ical-cell-today.ical-cat-eid,
.ical-cell-today.ical-cat-blessed {
  background: var(--green-light) !important;
}

.ical-cell-hijri {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 2px;
}
.ical-cell-today .ical-cell-hijri {
  color: var(--green);
}
.ical-cell-selected .ical-cell-hijri {
  color: #7a5a10;
}

.ical-cell-greg {
  font-size: 10px;
  color: var(--muted);
  line-height: 1;
}
.ical-cell-dots {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 4px;
}
.ical-event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}
.ical-white-dot {
  font-size: 8px;
  line-height: 1;
}

/* ── Detail panel ─────────────────────────────────────────────────────── */
.day-panel-enter-active,
.day-panel-leave-active {
  transition: all 0.25s ease;
}
.day-panel-enter-from,
.day-panel-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.ical-detail-panel {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.idp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: var(--cream-dark);
  border-top: 4px solid var(--gold);
  border-bottom: 1px solid var(--border);
}
.idp-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.idp-date {
  font-size: 13.5px;
  color: var(--ink);
  font-weight: 500;
}
.idp-hijri-date {
  font-family: var(--serif);
  font-weight: 600;
}
.idp-greg-date {
  color: var(--muted);
}
.idp-category-badge {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 100px;
}
.idp-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--muted);
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.15s;
}
.idp-close:hover {
  color: var(--ink);
}

.idp-body {
  padding: 1.5rem;
}

.idp-arabic {
  font-family: var(--serif);
  font-size: 1.6rem;
  direction: rtl;
  color: var(--gold);
  margin-bottom: 0.3rem;
}
.idp-title {
  font-family: var(--serif);
  font-size: clamp(1.2rem, 2.5vw, 1.65rem);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.idp-fasting-tag,
.idp-white-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 100px;
  margin-bottom: 0.75rem;
  margin-right: 0.5rem;
}
.idp-fasting-tag {
  background: var(--gold-light);
  color: #7a5a10;
}
.idp-white-tag {
  background: #eaf2ff;
  color: #1a5276;
}

.idp-summary {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-style: italic;
  border-left: 3px solid var(--gold);
  padding-left: 0.85rem;
}

.idp-quran {
  background: var(--cream-dark);
  border: 1px solid #e5d8a0;
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
}
.idp-quran-arabic {
  font-family: var(--serif);
  font-size: 1.2rem;
  direction: rtl;
  text-align: right;
  color: var(--green);
  line-height: 1.9;
  margin-bottom: 0.4rem;
}
.idp-quran-ref {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--gold);
  margin-bottom: 0.4rem;
}
.idp-quran-trans {
  font-size: 13.5px;
  color: var(--muted);
  font-style: italic;
  line-height: 1.6;
}

.idp-detail {
  font-size: 14.5px;
  color: var(--ink);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}
.idp-detail p {
  margin-bottom: 0.85rem;
}
.idp-detail p:last-child {
  margin-bottom: 0;
}

.idp-hadiths {
  margin-bottom: 1.25rem;
}
.idp-hadiths-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--muted);
  margin-bottom: 0.75rem;
}
.idp-hadith {
  background: var(--ink);
  border-radius: var(--radius-lg);
  padding: 1rem 1.15rem;
  margin-bottom: 0.6rem;
}
.idp-hadith-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.65;
  margin-bottom: 0.4rem;
  font-style: italic;
}
.idp-hadith-source {
  font-size: 11.5px;
  color: var(--gold);
  font-weight: 500;
}

.idp-note {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  background: var(--cream-dark);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.idp-note-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── No event panel ───────────────────────────────────────────────────── */
.ical-no-event {
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
}
.ical-no-event-date {
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.4rem;
}
.ical-no-event-greg {
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 400;
}

/* ── Month events list ─────────────────────────────────────────────────── */
.ical-month-events {
  margin-top: 1rem;
}
.ical-me-title {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 1rem;
}
.ical-me-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ical-me-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-left: 3px solid;
  border-radius: var(--radius-lg);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
  width: 100%;
}
.ical-me-item:hover {
  box-shadow: var(--shadow-sm);
  transform: translateX(3px);
}
.ical-me-day {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
  flex-shrink: 0;
}
.ical-me-info {
  flex: 1;
  min-width: 0;
}
.ical-me-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}
.ical-me-sum {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ical-me-fast {
  font-size: 16px;
  flex-shrink: 0;
}

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .ical-cell {
    min-height: 54px;
    padding: 0.35rem 0.2rem 0.2rem;
  }
  .ical-cell-hijri {
    font-size: 0.9rem;
  }
  .ical-cell-greg {
    display: none;
  }
  .ical-white-dot {
    display: none;
  }
  .ical-month-picker {
    gap: 0.25rem;
  }
  .imp-btn {
    font-size: 11px;
    padding: 4px 8px;
  }
}
</style>

<template>
  <section v-if="stops.length" class="journey" aria-labelledby="journey-title">
    <h2 id="journey-title" class="section-title journey-title">{{ title }}</h2>
    <p class="prose">{{ intro }}</p>

    <svg
      v-if="placed.length"
      class="journey-map"
      :viewBox="`${view.x} ${view.y} ${view.width} ${view.height}`"
      role="group"
      :aria-label="$t('journey.map', placed.length)"
    >
      <rect class="journey-sea" :width="MAP_WIDTH" :height="MAP_HEIGHT" />
      <path class="journey-land" :d="REGION_LAND" />
      <path v-if="route" class="journey-route" :d="route" />
      <g
        v-for="stop in placed"
        :key="stop.id"
        class="journey-marker"
        :class="{ selected: stop.id === selected }"
        :transform="`translate(${stop.x} ${stop.y}) scale(${view.scale})`"
        role="button"
        tabindex="0"
        :aria-label="$t('journey.stop', { n: stop.number, name: stop.name })"
        :aria-pressed="stop.id === selected ? 'true' : 'false'"
        @click="select(stop.id)"
        @keydown.enter.prevent="select(stop.id)"
        @keydown.space.prevent="select(stop.id)"
      >
        <circle class="journey-reach" :r="MARKER_REACH" />
        <circle class="journey-dot" r="7" />
        <text class="journey-dot-number" y="2.6" aria-hidden="true">{{ stop.number }}</text>
      </g>
    </svg>

    <ol class="journey-stops">
      <li
        v-for="(stop, index) in stops"
        :id="'journey-' + stop.id"
        :key="stop.id"
        class="card journey-stop"
        :class="{ selected: stop.id === selected }"
      >
        <button
          type="button"
          class="journey-stop-name"
          :aria-pressed="stop.id === selected ? 'true' : 'false'"
          @click="select(stop.id)"
        >
          <span class="journey-number">{{ index + 1 }}</span>
          {{ stop.name }}
        </button>
        <span v-if="stop.kind" class="badge">{{ $t('journey.kind.' + stop.kind) }}</span>
        <span class="badge" :class="stop.known === 'scripture' ? 'badge-green' : 'badge-gold'">{{
          $t('journey.known.' + stop.known)
        }}</span>
        <span v-if="stop.source" class="journey-source">{{
          $t('journey.source', { source: stop.source })
        }}</span>
        <p class="journey-text"><HadithRef :text="stop.text" /></p>
        <span class="journey-ref"><HadithRef :text="stop.reference" /></span>
        <span v-if="stop.lat === undefined" class="journey-unplaced">{{
          $t('journey.notOnMap')
        }}</span>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import HadithRef from './HadithRef.vue'
import { REGION_LAND } from '@/data/regionMap.js'
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  MARKER_REACH,
  project,
  routePath,
  viewFor,
} from '@/utils/journey.js'

// Places as a map and a list: [{ id, lat, lon, known, reference, name, text }]. A place with no
// coordinates is listed but not drawn. `joined` draws a line through the places in order, for a
// journey whose order the sources give.
const props = defineProps({
  stops: { type: Array, required: true },
  joined: { type: Boolean, default: false },
  title: { type: String, required: true },
  intro: { type: String, default: '' },
})

const selected = ref(null)
const placed = computed(() =>
  props.stops
    .map((stop, index) => ({ ...stop, number: index + 1 }))
    .filter((stop) => stop.lat !== undefined && stop.lon !== undefined)
    .map((stop) => ({ ...stop, ...project(stop) })),
)
const route = computed(() => (props.joined ? routePath(placed.value) : ''))
const view = computed(() => viewFor(placed.value))

function select(id) {
  selected.value = id
  document.getElementById('journey-' + id)?.scrollIntoView?.({ block: 'nearest' })
}
</script>

<style scoped>
.journey-source,
.journey-unplaced {
  display: block;
  font-size: 12px;
  color: var(--muted);
}

.journey {
  margin-top: var(--space-10);
}

.journey-title {
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  margin-bottom: var(--space-3);
}

.journey-map {
  display: block;
  width: 100%;
  max-width: 520px;
  margin: var(--space-4) auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  direction: ltr;
}

.journey-sea {
  fill: var(--green-light);
}

/* Lines keep their width on screen however far the map is zoomed. */
.journey-land {
  fill: var(--cream);
  stroke: var(--border);
  stroke-width: 1px;
  vector-effect: non-scaling-stroke;
}

.journey-route {
  fill: none;
  stroke: var(--gold);
  stroke-width: 2.5px;
  stroke-dasharray: 8 6;
  vector-effect: non-scaling-stroke;
}

.journey-marker {
  cursor: pointer;
  outline: none;
}

.journey-reach {
  fill: transparent;
}

.journey-dot {
  fill: var(--green);
  stroke: #fff;
  stroke-width: 1.2;
}

.journey-marker.selected .journey-dot {
  fill: var(--gold);
}

.journey-marker:focus-visible .journey-dot {
  stroke: var(--ink);
  stroke-width: 2;
}

.journey-dot-number {
  fill: #fff;
  font-size: 7.5px;
  font-weight: 700;
  text-anchor: middle;
  pointer-events: none;
}

.journey-stops {
  list-style: none;
  display: grid;
  gap: var(--space-3);
  padding: 0;
}

.journey-stop.selected {
  border-color: var(--gold);
}

.journey-stop-name {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-inline-end: var(--space-2);
  padding: var(--space-2) 0;
  border: 0;
  background: none;
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
}

.journey-number {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--green);
  color: #fff;
  font-family: var(--sans);
  font-size: 13px;
}

.journey-stop.selected .journey-number {
  background: var(--gold);
}

.journey-text {
  margin-top: var(--space-2);
  font-size: 14px;
  line-height: 1.7;
  color: var(--muted);
}

.journey-ref {
  display: block;
  margin-top: var(--space-2);
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
}
</style>

<template>
  <svg
    class="prayer-figure"
    viewBox="0 0 200 200"
    role="img"
    :aria-label="$t('prayerFigure.' + pose)"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect class="prayer-figure-mat" x="14" y="182" width="172" height="8" rx="4" stroke="none" />
    <path class="prayer-figure-qibla" d="M168 28 l12 8 l-12 8" stroke-width="4" />
    <circle :cx="shape.head[0]" :cy="shape.head[1]" r="13" fill="currentColor" stroke="none" />
    <path
      v-for="(line, index) in shape.lines"
      :key="index"
      :d="line[1]"
      :stroke-width="WIDTHS[line[0]]"
    />
    <path
      v-if="pose === 'taslim'"
      class="prayer-figure-turn"
      d="M66 52 q24 -22 48 0 M60 46 l6 6 l-8 2 M120 46 l-6 6 l8 2"
      stroke-width="4"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pose: { type: String, required: true },
})

const WIDTHS = { body: 17, leg: 13, arm: 9, finger: 5 }

const SITTING = {
  head: [90, 80],
  lines: [
    ['leg', 'M84 158 L128 170 L78 178'],
    ['body', 'M86 156 L88 100'],
    ['arm', 'M88 106 L100 136 L122 158'],
  ],
}

// Each pose is drawn side-on, facing the Qibla on the right: a head, and the body, legs and
// arms as lines of different weights.
const POSES = {
  takbir: {
    head: [100, 34],
    lines: [
      ['leg', 'M100 108 L100 178 L112 178'],
      ['body', 'M100 54 L100 108'],
      ['arm', 'M101 60 L118 70 L121 38'],
    ],
  },
  standing: {
    head: [100, 34],
    lines: [
      ['leg', 'M100 108 L100 178 L112 178'],
      ['body', 'M100 54 L100 108'],
      ['arm', 'M101 60 L107 90 L121 78'],
    ],
  },
  bowing: {
    head: [155, 104],
    lines: [
      ['leg', 'M80 108 L80 178 L92 178'],
      ['body', 'M80 108 L138 106'],
      ['arm', 'M132 110 L88 142'],
    ],
  },
  rising: {
    head: [100, 34],
    lines: [
      ['leg', 'M100 108 L100 178 L112 178'],
      ['body', 'M100 54 L100 108'],
      ['arm', 'M103 60 L108 106'],
    ],
  },
  prostrating: {
    head: [150, 168],
    lines: [
      ['leg', 'M88 130 L94 176 L58 177 L54 166'],
      ['body', 'M88 130 L134 158'],
      ['arm', 'M126 158 L130 178'],
    ],
  },
  sitting: SITTING,
  tashahhud: {
    head: SITTING.head,
    lines: [...SITTING.lines, ['finger', 'M122 158 L128 146']],
  },
  taslim: SITTING,
}

const shape = computed(() => POSES[props.pose])
</script>

<style scoped>
.prayer-figure {
  display: block;
  width: 100%;
  height: auto;
  color: var(--green);
}

.prayer-figure-mat {
  fill: var(--gold-light);
}

.prayer-figure-qibla,
.prayer-figure-turn {
  color: var(--gold);
}
</style>

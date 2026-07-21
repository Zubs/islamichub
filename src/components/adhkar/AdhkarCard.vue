<template>
  <article class="dhikr-card anim-target" :class="{ 'dc-done': isFullyDone }">
    <!-- Reference badge -->
    <div class="dc-top">
      <span class="dc-ref">{{ dhikr.reference }}</span>
      <span v-if="isFullyDone" class="dc-done-badge">✓ Done</span>
    </div>

    <!-- Arabic -->
    <div class="dc-arabic" lang="ar" dir="rtl">{{ dhikr.arabic }}</div>

    <!-- Transliteration & translation -->
    <div class="dc-translit">{{ dhikr.transliteration }}</div>
    <div class="dc-translation">{{ dhikr.translation }}</div>

    <!-- Optional note (e.g. evening variant wording) -->
    <div v-if="dhikr.note" class="dc-note">💡 {{ dhikr.note }}</div>

    <!-- Virtue -->
    <div v-if="dhikr.virtue" class="dc-virtue">{{ dhikr.virtue }}</div>

    <!-- Counter controls -->
    <div class="dc-counters">
      <!-- Compound dhikr (e.g. Tasbih Fatimah, Astaghfirullah x3) -->
      <template v-if="dhikr.parts">
        <button
          v-for="(part, i) in dhikr.parts"
          :key="i"
          class="dc-part-btn"
          :class="{ 'dc-part-done': partsDone[i] >= part.count }"
          @click="tapPart(i, part.count)"
        >
          <span class="dc-part-arabic" lang="ar" dir="rtl">{{ part.text }}</span>
          <span class="dc-part-count">{{ partsDone[i] }} / {{ part.count }}</span>
        </button>
      </template>

      <!-- Simple repeat count -->
      <button v-else class="dc-tap-btn" @click="tapSimple">
        <span class="dc-tap-count">{{ simpleDone }} / {{ dhikr.repeat }}</span>
        <span class="dc-tap-hint">{{
          simpleDone >= dhikr.repeat ? 'Tap to reset' : 'Tap to count'
        }}</span>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useAdhkarStore } from '@/stores/adhkar.js'

const props = defineProps({
  dhikr: { type: Object, required: true },
})

const store = useAdhkarStore()

// ── Simple (non-compound) dhikr ──────────────────────────────────
const simpleDone = computed(() => store.progressFor(props.dhikr.id))

function tapSimple() {
  store.tap(props.dhikr.id, props.dhikr.repeat)
}

// ── Compound dhikr (parts) ────────────────────────────────────────
// Track each part's count under a derived key so parts don't collide
// with the store's per-dhikr progress map.
const partsDone = reactive(
  (props.dhikr.parts || []).map((_, i) => store.progressFor(`${props.dhikr.id}:${i}`)),
)

function tapPart(i, target) {
  const key = `${props.dhikr.id}:${i}`
  store.tap(key, target)
  partsDone[i] = store.progressFor(key)
}

// ── Overall completion for this card ─────────────────────────────
const isFullyDone = computed(() => {
  if (props.dhikr.parts) {
    return props.dhikr.parts.every((part, i) => partsDone[i] >= part.count)
  }

  return simpleDone.value >= props.dhikr.repeat
})
</script>

<style scoped>
.dhikr-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.4rem 1.5rem;
  transition: border-color 0.2s;
}

.dc-done {
  border-color: var(--green);
  background: var(--green-light);
}

.dc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.dc-ref {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--gold);
}

.dc-done-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
  background: #d4f5e8;
  padding: 2px 9px;
  border-radius: 12px;
}

.dc-arabic {
  font-family: var(--arabic, var(--serif));
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  line-height: 2.1;
  color: var(--ink);
  text-align: right;
  margin-bottom: 0.85rem;
}

.dc-translit {
  font-size: 13px;
  font-style: italic;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.dc-translation {
  font-size: 14.5px;
  color: var(--ink);
  line-height: 1.7;
  margin-bottom: 0.6rem;
}

.dc-note {
  font-size: 12.5px;
  color: var(--green);
  background: var(--green-light);
  border-radius: var(--radius-sm);
  padding: 7px 10px;
  margin-bottom: 0.6rem;
  line-height: 1.5;
}

.dc-virtue {
  font-size: 12.5px;
  color: #7a5a10;
  background: var(--gold-light);
  border-left: 3px solid var(--gold);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 8px 11px;
  margin-bottom: 1rem;
  line-height: 1.55;
}

.dc-counters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid var(--border);
  padding-top: 0.9rem;
}

.dc-tap-btn,
.dc-part-btn {
  flex: 1;
  min-width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 12px;
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.15s;
  font-family: var(--sans);
}

.dc-tap-btn:hover,
.dc-part-btn:hover {
  border-color: var(--green);
  background: var(--green-light);
}

.dc-tap-count,
.dc-part-count {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--green);
}

.dc-tap-hint {
  font-size: 10.5px;
  color: var(--muted);
}

.dc-part-arabic {
  font-family: var(--arabic, var(--serif));
  font-size: 1rem;
  color: var(--ink);
}

.dc-part-done {
  border-color: var(--green);
  background: var(--green-light);
}

@media (max-width: 480px) {
  .dc-tap-btn,
  .dc-part-btn {
    min-width: 100%;
  }
}
</style>

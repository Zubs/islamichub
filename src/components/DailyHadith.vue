<template>
  <section v-if="hadith" class="daily-hadith" aria-labelledby="daily-hadith-title">
    <span id="daily-hadith-title" class="eyebrow">Hadith of the day</span>
    <HadithBlock :reference="hadith.reference">
      {{ hadith.text }}
      <span class="daily-hadith-narrator">Narrated by {{ hadith.narrator }}</span>
    </HadithBlock>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HadithBlock from './HadithBlock.vue'
import { DAILY_HADITHS } from '@/data/dailyHadith.js'
import { dailyHadithFor } from '@/utils/dailyHadith.js'
import { dayKey } from '@/utils/day.js'

const props = defineProps({
  hadiths: { type: Array, default: () => DAILY_HADITHS },
})

const today = ref(dayKey())
const hadith = computed(() => dailyHadithFor(today.value, props.hadiths))

function refreshDay() {
  today.value = dayKey()
}

onMounted(() => document.addEventListener('visibilitychange', refreshDay))
onUnmounted(() => document.removeEventListener('visibilitychange', refreshDay))
</script>

<style scoped>
.daily-hadith {
  max-width: 860px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6) 0;
}

.daily-hadith-narrator {
  display: block;
  margin-top: var(--space-2);
  font-size: 13px;
  font-style: normal;
  color: #7a5a10;
}
</style>

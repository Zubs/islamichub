<template>
  <section v-if="hadith" class="daily-hadith" aria-labelledby="daily-hadith-title">
    <span id="daily-hadith-title" class="eyebrow">{{ $t('dailyHadith.hadithOfTheDay') }}</span>
    <HadithBlock :reference="hadith.reference">
      {{ hadith.text }}
      <span class="daily-hadith-narrator">{{
        $t('dailyHadith.narratedBy', { a: hadith.narrator })
      }}</span>
    </HadithBlock>
    <ShareButton :item="shareable" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HadithBlock from './HadithBlock.vue'
import ShareButton from './ShareButton.vue'
import { DAILY_HADITHS } from '@/data/dailyHadith.js'
import { dailyHadithFor } from '@/utils/dailyHadith.js'
import { dayKey } from '@/utils/day.js'
import { hadithPath } from '@/utils/hadith.js'
import { useDataTranslations } from '@/composables/useContent.js'

const props = defineProps({
  hadiths: { type: Array, default: () => DAILY_HADITHS },
})

const today = ref(dayKey())
const hadithText = useDataTranslations('dailyHadith')
const hadith = computed(() => {
  const chosen = dailyHadithFor(today.value, props.hadiths)
  return chosen ? hadithText.localized({ ...chosen, id: chosen.reference }) : null
})

const shareable = computed(() => ({
  arabic: hadith.value.arabic,
  translation: hadith.value.text,
  reference: hadith.value.reference,
  path: hadithPath(hadith.value.book, hadith.value.number),
}))

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

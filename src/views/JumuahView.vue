<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.badge') }} · <span lang="ar">الجمعة</span>
        </div>
        <h1>{{ c('header.title') }}</h1>
        <p>{{ c('header.lead') }}</p>
      </div>
    </div>

    <div class="content-narrow">
      <ContentSections :sections="sections" :c="c" :untranslated="untranslated">
        <template #prayer>
          <div class="jumuah-links">
            <RouterLink to="/prayer/adhan" class="btn btn-secondary">{{
              $t('jumuah.adhanLink')
            }}</RouterLink>
            <RouterLink to="/prayer/how-to-pray" class="btn btn-secondary">{{
              $t('jumuah.howToPrayLink')
            }}</RouterLink>
          </div>
        </template>
        <template #khutbah>
          <form class="card jumuah-time" @submit.prevent="save">
            <label for="khutbah-time" class="jumuah-label">{{ $t('jumuah.khutbahTime') }}</label>
            <div class="jumuah-row">
              <input
                id="khutbah-time"
                v-model="entered"
                type="time"
                class="jumuah-input"
                :aria-describedby="message ? 'khutbah-message' : undefined"
              />
              <button type="submit" class="btn btn-primary">{{ $t('jumuah.save') }}</button>
            </div>
            <p
              v-if="message"
              id="khutbah-message"
              class="jumuah-message"
              :class="{ warning: refused }"
              role="status"
            >
              {{ message }}
            </p>
          </form>
          <h3 class="jumuah-reminders-title">{{ $t('jumuah.remindersTitle') }}</h3>
          <ReminderSwitches :items="reminderItems" />
        </template>
      </ContentSections>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo.js'
import { useContent } from '@/composables/useContent.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useJumuahStore } from '@/stores/jumuah.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ContentSections from '@/components/ContentSections.vue'
import ReminderSwitches from '@/components/ReminderSwitches.vue'
import { FRIDAY_ITEMS } from '@/utils/reminders.js'
import sections from '@/data/jumuahSections.js'
import content from '@/data/content/jumuah/en.js'

const { c, untranslated } = useContent('jumuah', content)
const { t } = useI18n()
const jumuah = useJumuahStore()

useSeo('jumuah')
useScrollReveal()

const entered = ref(jumuah.khutbahTime ?? '')
const refused = ref(false)
const saved = ref(false)

const message = computed(() => {
  if (refused.value) {
    return t('jumuah.notATime')
  }
  if (saved.value) {
    return jumuah.khutbahTime
      ? t('jumuah.savedTime', { time: jumuah.khutbahTime })
      : t('jumuah.cleared')
  }
  return ''
})

const reminderItems = computed(() =>
  FRIDAY_ITEMS.map((key) => ({
    key,
    label: t(`jumuah.reminders.${key}`),
    disabled: key === 'khutbah' && !jumuah.khutbahTime,
    why: t('jumuah.needsTime'),
  })),
)

function save() {
  const accepted = jumuah.setKhutbahTime(entered.value)
  refused.value = !accepted
  saved.value = accepted
}
</script>

<style scoped>
.jumuah-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.jumuah-time {
  margin-top: var(--space-4);
}

.jumuah-label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.jumuah-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.jumuah-input {
  min-height: 44px;
  padding: 0 var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--cream);
  color: var(--ink);
  font: inherit;
}

.jumuah-reminders-title {
  font-family: var(--serif);
  font-size: 1.2rem;
  margin: var(--space-6) 0 var(--space-2);
}

.jumuah-message {
  margin-top: var(--space-2);
  font-size: 13px;
  color: var(--green);
}

.jumuah-message.warning {
  color: var(--red);
}
</style>

<template>
  <p class="price-status" role="status">
    <span class="badge" :class="current ? 'badge-green' : 'badge-gold'">{{ label }}</span>
    <span class="price-status-note">{{ note }}</span>
    <span v-if="customNote" class="price-status-custom">{{ customNote }}</span>
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { t, formatDate } from '@/i18n.js'

const props = defineProps({
  metalsFetched: { type: Boolean, required: true },
  ratesFetched: { type: Boolean, required: true },
  date: { type: String, default: null },
  loading: { type: Boolean, default: false },
  custom: { type: Array, default: () => [] },
  saved: { type: Boolean, default: false },
})

const current = computed(() => !props.loading && props.metalsFetched && props.ratesFetched)

const dateText = computed(() => {
  if (!props.date) {
    return null
  }

  const [year, month, day] = props.date.split('-').map(Number)
  return formatDate(new Date(year, month - 1, day), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const customNote = computed(() =>
  props.custom.length ? t(`zakatPriceStatus.custom.${props.custom.join('-')}`) : null,
)

const ageDays = computed(() => {
  if (!props.date) {
    return null
  }

  const [year, month, day] = props.date.split('-').map(Number)
  const today = new Date()
  const from = Date.UTC(year, month - 1, day)
  const to = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.max(0, Math.round((to - from) / 86400000))
})

const state = computed(() => {
  if (props.loading) {
    return 'loading'
  }

  if (!props.metalsFetched) {
    return props.saved ? 'saved' : 'reference'
  }

  return props.ratesFetched ? 'current' : 'ratesNotCurrent'
})

const label = computed(() => t(`zakatPriceStatus.label.${state.value}`))

const note = computed(() => {
  const dated = dateText.value ? 'dated' : 'undated'
  const age = ageDays.value === null ? '' : t('zakatPriceStatus.age', ageDays.value)
  return t(`zakatPriceStatus.note.${state.value}.${dated}`, { date: dateText.value, age })
})
</script>

<style scoped>
.price-status {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin: var(--space-2) 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--muted);
}

.price-status-custom {
  flex-basis: 100%;
  color: var(--gold);
  font-weight: 600;
}
</style>

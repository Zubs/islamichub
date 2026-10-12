<template>
  <p class="price-status" role="status">
    <span class="badge" :class="current ? 'badge-green' : 'badge-gold'">{{ label }}</span>
    <span class="price-status-note">{{ note }}</span>
    <span v-if="customNote" class="price-status-custom">{{ customNote }}</span>
  </p>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  metalsFetched: { type: Boolean, required: true },
  ratesFetched: { type: Boolean, required: true },
  date: { type: String, default: null },
  loading: { type: Boolean, default: false },
  custom: { type: Array, default: () => [] },
})

const current = computed(() => !props.loading && props.metalsFetched && props.ratesFetched)

const dateText = computed(() => {
  if (!props.date) {
    return null
  }

  const [year, month, day] = props.date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const customNote = computed(() => {
  if (!props.custom.length) {
    return null
  }

  const metals = props.custom.join(' and ')
  return `Your own ${metals} price per gram is in use in place of the fetched one.`
})

const label = computed(() => {
  if (props.loading) {
    return 'loading'
  }

  if (!props.metalsFetched) {
    return 'reference'
  }

  return props.ratesFetched ? 'current' : 'rates not current'
})

const note = computed(() => {
  const forDate = dateText.value ? ` for ${dateText.value}` : ''
  const fromDate = dateText.value ? ` from ${dateText.value}` : ''

  if (props.loading) {
    return "Fetching today's prices. You can fill in the calculator meanwhile."
  }

  if (!props.metalsFetched) {
    return `Reference prices${fromDate}. Today's prices could not be loaded, so check the current price before relying on this result.`
  }

  if (!props.ratesFetched) {
    return `Gold and silver prices${forDate}, converted with reference exchange rates that are not current.`
  }

  return `Gold and silver prices${forDate}.`
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

<template>
  <template v-for="(part, index) in parts" :key="index">
    <RouterLink v-if="part.to" :to="part.to" class="hadith-ref">{{ part.text }}</RouterLink>
    <template v-else>{{ part.text }}</template>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { parseHadithRefs } from '@/utils/hadithRefs.js'

const props = defineProps({
  text: { type: String, default: '' },
  numbering: { type: Object, default: undefined },
})

const parts = computed(() => parseHadithRefs(props.text, props.numbering))
</script>

<style>
.hadith-ref {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--gold);
  text-underline-offset: 2px;
}

.hadith-ref:hover,
.hadith-ref:focus-visible {
  color: var(--gold);
}
</style>

<template>
  <div class="hadith-block" :class="{ 'anim-target': animate }">
    <div v-if="reference" class="hadith-source"><HadithRef :text="reference" /></div>
    <div class="hadith-text"><slot /></div>
  </div>
</template>

<script setup>
import HadithRef from './HadithRef.vue'

defineProps({
  reference: { type: String, default: '' },
  animate: { type: Boolean, default: true },
})
</script>

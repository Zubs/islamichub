<template>
  <div class="acc-card">
    <div class="acc-header" @click="open = !open">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="acc-icon" :class="iconClass">{{ icon }}</div>
        <div>
          <div class="acc-name">{{ title }}</div>
          <div class="acc-sub">{{ sub }}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="acc-total" v-if="total && hasValue">{{ total }}</span>
        <span class="acc-chev" :class="{ open }">▼</span>
      </div>
    </div>
    <div class="acc-body" :class="{ open }">
      <div class="ref-box" v-if="$slots.reference">
        <slot name="reference"/>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  sub: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconClass: { type: String, default: '' },
  total: { type: String, default: '' },
  startOpen: { type: Boolean, default: false },
})

const open = ref(props.startOpen)

// Only show total when it's a real value (not "£0.00")
const hasValue = computed(() => {
  if (!props.total) {
    return false
  }

  const num = parseFloat(props.total.replace(/[^0-9.-]/g, ''))
  return num > 0
})
</script>

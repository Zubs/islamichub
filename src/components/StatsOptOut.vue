<template>
  <div class="stats-opt-out">
    <label class="switch-label">
      <input
        type="checkbox"
        class="switch-input"
        :checked="optedOut"
        @change="handleChange"
        aria-describedby="stats-opt-out-desc"
      />
      <span class="switch-slider" aria-hidden="true"></span>
      <span class="switch-text">{{ $t('statsOptOut.donTCountMyVisits') }}</span>
    </label>
    <p id="stats-opt-out-desc" class="opt-out-desc">
      {{ $t('statsOptOut.whenOnIslamichubSendsNoUsage') }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { isOptedOut, setOptOut } from '@/composables/useStats.js'

const optedOut = ref(isOptedOut())

function handleChange(event) {
  setOptOut(event.target.checked)
  optedOut.value = event.target.checked
}

onMounted(() => {
  optedOut.value = isOptedOut()
})
</script>

<style scoped>
.stats-opt-out {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: var(--border);
  border-radius: 12px;
  transition: background 0.2s;
}

.switch-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.switch-input:checked + .switch-slider {
  background: var(--green);
}

.switch-input:checked + .switch-slider::after {
  transform: translateX(20px);
}

.switch-input:focus-visible + .switch-slider {
  outline: 2px solid var(--green);
  outline-offset: 2px;
}

.switch-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

.opt-out-desc {
  font-size: 12.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}
</style>

<template>
  <div class="switches">
    <p v-if="!reminders.supported" class="switches-note" role="status">
      {{ $t('reminderSwitches.unsupported') }}
    </p>
    <p v-else-if="!prayerSettings.saved" class="switches-note">
      {{ $t('reminderSwitches.needsLocation') }}
      <RouterLink to="/prayer">{{ $t('reminderSwitches.toPrayerPage') }}</RouterLink>
    </p>
    <template v-else>
      <label v-for="item in items" :key="item.key" class="switches-item">
        <input
          type="checkbox"
          :checked="reminders.active && reminders.settings.items[item.key]"
          :disabled="item.disabled || busy"
          :data-item="item.key"
          @change="toggle(item.key, $event.target)"
        />
        <span>
          {{ item.label }}
          <span v-if="item.disabled && item.why" class="switches-why">{{ item.why }}</span>
        </span>
      </label>
      <p v-if="refused" class="switches-note switches-warning" role="alert">
        {{ $t('reminderSettings.notificationsAreBlockedForThisSite') }}
      </p>
      <p class="switches-note">{{ $t('reminderSwitches.when') }}</p>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRemindersStore } from '@/stores/reminders.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'

// Switches for some of the reminders, shown on the page they belong to. Each item is
// { key, label, disabled?, why? }; switching one on while reminders are off asks for permission
// first and turns reminders on with only that switch.
defineProps({
  items: { type: Array, required: true },
})

const reminders = useRemindersStore()
const prayerSettings = usePrayerSettingsStore()
const busy = ref(false)
const refused = ref(false)

async function toggle(key, input) {
  if (!input.checked) {
    reminders.setItem(key, false)
    return
  }
  if (reminders.active) {
    reminders.setItem(key, true)
    return
  }

  busy.value = true
  const granted = await reminders.turnOn([key])
  busy.value = false
  refused.value = !granted
  if (granted) {
    reminders.setItem(key, true)
  } else {
    input.checked = false
  }
}
</script>

<style scoped>
.switches {
  display: grid;
  gap: var(--space-2);
}

.switches-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) 0;
  line-height: 1.5;
}

.switches-item input {
  margin-top: 5px;
}

.switches-why {
  display: block;
  font-size: 12.5px;
  color: var(--muted);
}

.switches-note {
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
}

.switches-warning {
  color: var(--red);
}
</style>

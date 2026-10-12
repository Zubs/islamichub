<template>
  <section class="reminders" aria-labelledby="reminders-heading">
    <h3 id="reminders-heading" class="reminders-title">Reminders</h3>

    <p v-if="!reminders.supported" class="reminders-note" role="status">
      This browser cannot show notifications, so reminders are not available here.
    </p>

    <template v-else>
      <label class="reminders-switch">
        <input
          type="checkbox"
          :checked="reminders.settings.enabled"
          :disabled="!prayerSettings.saved"
          @change="toggle($event.target)"
        />
        <span>Remind me at prayer times</span>
      </label>

      <p v-if="!prayerSettings.saved" class="reminders-note">
        Remember a location above first. Reminder times are worked out from it.
      </p>
      <p v-else-if="refused" class="reminders-note reminders-warning" role="alert">
        Notifications are blocked for this site, so reminders were turned off. Allow notifications
        for islamichub.xyz in your browser's site settings, then turn this on again.
      </p>

      <div v-if="reminders.settings.enabled && prayerSettings.saved" class="reminders-items">
        <label v-for="reminder in list" :key="reminder.key" class="reminders-switch">
          <input
            type="checkbox"
            :checked="reminders.settings.items[reminder.key]"
            @change="reminders.setItem(reminder.key, $event.target.checked)"
          />
          <span>{{ reminder.label }}</span>
        </label>
      </div>

      <p class="reminders-note">
        These reminders arrive only while IslamicHub is open or running in the background. They do
        not arrive once the app is fully closed.
      </p>

      <template v-if="reminders.settings.enabled && prayerSettings.saved">
        <template
          v-if="reminders.pushState === 'ready' || reminders.pushState === 'ios-not-installed'"
        >
          <label class="reminders-switch">
            <input
              type="checkbox"
              data-test="push"
              :checked="reminders.settings.push"
              :disabled="reminders.pushState !== 'ready' || pushBusy"
              @change="togglePush($event.target)"
            />
            <span>Also notify me when the app is closed</span>
          </label>
          <p v-if="reminders.pushState === 'ios-not-installed'" class="reminders-note">
            On iPhone, notifications for a closed app only work once IslamicHub is installed. Tap
            Share, then &ldquo;Add to Home Screen&rdquo;, and turn this on from the installed app.
          </p>
          <p v-else-if="pushFailed" class="reminders-note reminders-warning" role="alert">
            This could not be turned on. Check your connection and try again.
          </p>
          <p class="reminders-note">
            Turning this on stores, on our server, what is needed to send the reminder at the right
            time: your location rounded to about 1 km, your timezone, your calculation and Asr
            methods, and the reminders you chose. No name, email or account. Turning it off, or
            &ldquo;Forget my location&rdquo;, deletes it.
          </p>
        </template>
        <p v-else-if="reminders.pushState === 'unsupported'" class="reminders-note">
          This browser cannot receive notifications when the app is closed.
        </p>
      </template>
    </template>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRemindersStore } from '@/stores/reminders.js'
import { usePrayerSettingsStore } from '@/stores/prayerSettings.js'
import { REMINDERS } from '@/utils/reminders.js'

const reminders = useRemindersStore()
const prayerSettings = usePrayerSettingsStore()
const list = REMINDERS
const refused = ref(false)
const pushBusy = ref(false)
const pushFailed = ref(false)

async function togglePush(input) {
  pushBusy.value = true
  pushFailed.value = false
  if (input.checked) {
    pushFailed.value = !(await reminders.turnPushOn())
  } else {
    await reminders.turnPushOff()
  }

  input.checked = reminders.settings.push
  pushBusy.value = false
}

async function toggle(input) {
  if (!input.checked) {
    refused.value = false
    reminders.turnOff()
    return
  }

  refused.value = !(await reminders.turnOn())
  input.checked = reminders.settings.enabled
}
</script>

<style scoped>
.reminders {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
}

.reminders-title {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.reminders-switch {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 36px;
  font-size: 14px;
  color: var(--ink);
}

.reminders-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  margin: var(--space-2) 0 var(--space-2) var(--space-6);
}

.reminders-note {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted);
  margin-top: var(--space-1);
}

.reminders-warning {
  color: var(--red);
}
</style>

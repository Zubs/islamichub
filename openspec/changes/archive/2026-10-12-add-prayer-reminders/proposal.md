# Proposal

## Why

A user who has saved their location still has to open the site to learn that a prayer time has arrived. A reminder at each prayer time is the most asked-for thing a prayer app does, and a first version needs no server.

## What Changes

- A Reminders section in the prayer settings, off by default. Turning it on asks for notification permission.
- A switch for each of the five prayers, plus morning adhkar (after Fajr) and evening adhkar (after Asr).
- While the app is running it schedules a notification for each remaining time today, and again at local midnight or when settings change.
- Tapping a prayer notification opens the tracker; tapping an adhkar one opens that adhkar category.
- Choices are stored under `reminder-settings`. Reminders need a saved location (feature 11).
- The settings say plainly that these reminders only arrive while the app is open or in the background.
- If permission is refused the switches turn off with a note on how to allow it; in a browser with no notification support the section says so and offers nothing.

## Capabilities

### New Capabilities

- `prayer-reminders`: on-device reminders at prayer and adhkar times.

### Modified Capabilities

None.

## Impact

- New `src/utils/reminders.js`, `src/stores/reminders.js`, `src/composables/useReminders.js`, `src/components/ReminderSettings.vue`, `public/sw-notifications.js`, tests.
- `PrayerView.vue`, `App.vue`, `vite.config.js`, `test/leftovers.test.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`. The real-phone check is Zubair's.

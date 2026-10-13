# Design

## Decisions

- **`utils/reminders.js` is pure:** the list of seven reminders (each with a label, the time it follows, an offset in minutes and the page it opens), `dueReminders(enabled, times, now)` and `parseReminderSettings(text)`.
- **Adhkar reminders follow their prayer by 20 minutes**, long enough to have prayed. `Features.md` says "after Fajr" and "after Asr" without a figure.
- **`stores/reminders.js`** holds `{ enabled, items }` under `reminder-settings` and the permission state. Turning on calls `Notification.requestPermission()`; anything but "granted" turns it back off.
- **`useReminders.js` owns the timers.** One `setTimeout` per due reminder and one for the next local midnight. A `watch` on the reminder settings and the prayer settings reschedules. It is started once from `App.vue`.
- **Notifications are shown through the service worker's registration** (`showNotification`), which is what works on Android, with `new Notification` as the fallback where no worker is active. Each carries the path to open.
- **`public/sw-notifications.js`**, loaded by the worker with `importScripts` like `sw-legacy.js`, handles `notificationclick`: it focuses an open window and sends it the path, or opens a new one.
- **`ReminderSettings.vue`** sits in the prayer settings card, below the location controls.

## Risks / Trade-offs

- [Browsers suspend timers in background tabs and when the phone sleeps] → stated in the settings; feature 24 is the answer. The real-phone check is listed under "Final" and the feature stays unticked.

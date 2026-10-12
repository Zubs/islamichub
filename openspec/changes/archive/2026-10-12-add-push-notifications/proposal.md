# Proposal

## Why

On-device reminders (feature 23) stop when the app is closed, which is when a reminder matters most. Delivering one then needs a server to send a push at the right minute, and that means holding something about the user for the first time.

## What Changes

- A second switch under Reminders: "Also notify me when the app is closed". Turning it on registers the device for Web Push. It is strictly opt-in.
- A Netlify function saves the push subscription with what is needed to work out the times: latitude and longitude rounded to two decimal places (about 1 km), timezone, calculation method, Asr method and the chosen reminders. No name, email or account.
- A scheduled Netlify function runs every minute, works out prayer times with the same `utils/prayer.js`, and sends a push to each device whose prayer time has arrived. A time is sent once, and never more than a few minutes late.
- Turning the switch off, or "Forget my location", deletes the record from the server. A subscription the push service reports as expired is deleted.
- While push is on, the in-page reminders stay silent, so the user is not notified twice.
- On iPhone, push only works once the app is installed, and the settings say so.
- The privacy text on the About page and in Spec section 9 states exactly what is stored and how to delete it.
- The decision "May a server hold rounded coordinates for push?" is taken at its proposed default (yes, by choice only, rounded, deleted on request) and listed under "Final".
- One new dependency, `@netlify/blobs`, Netlify's own storage for functions, added without asking and listed under "Final". Web Push signing and encryption are written against Node's built-in `crypto`, so no push library is added.

## Capabilities

### New Capabilities

- `push-notifications`: opt-in reminders delivered when the app is closed, what the server stores to do it, and how that is deleted.

### Modified Capabilities

- `prayer-reminders`: on-device reminders stay silent while push is on.

## Impact

- New `netlify/functions/push.js`, `netlify/functions/push-send.js`, `netlify/functions/lib/{webPush,pushRecords}.js`, `src/utils/push.js`, `scripts/make-vapid-keys.js`, tests.
- `src/stores/reminders.js`, `src/composables/useReminders.js`, `ReminderSettings.vue`, `public/sw-notifications.js`, `netlify.toml`, `.env.example`, `AboutView.vue`.
- `README.md`, `Spec.md`, `CHANGELOG.md`, `Features.md`. Keys, deployment and real-phone checks are Zubair's.

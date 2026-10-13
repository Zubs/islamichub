# Proposal

## Why

A daily companion should let a Muslim see, honestly and privately, how they are keeping the five prayers. Nothing on the site records prayers today.

## What Changes

- A new store with a stored key, `salah-log`, holding for each local day a status for each of the five prayers: on time, late or missed. A prayer with no status is "not logged".
- A new route, `/tracker`: today's five prayers with one-tap status buttons, a seven-day strip and a month view.
- A streak of consecutive days on which all five were prayed, on time or late. Today counts once all five are logged.
- Past days can be edited; future days cannot.
- With a saved location (feature 11), each prayer shows its time, and prayers whose time has not arrived are marked "not yet".
- Nothing leaves the device. "Clear my data" removes the log after a confirmation.
- A Tracker shortcut is added to the installed app.

## Capabilities

### New Capabilities

- `salah-tracker`: recording the five daily prayers on the device and showing consistency.

### Modified Capabilities

- `offline-install`: the installed app gains a Tracker shortcut.

## Impact

- New `src/utils/salah.js`, `src/stores/salah.js`, `src/views/tools/TrackerView.vue` and tests.
- `src/router/index.js`, `src/composables/useSeo.js`, navigation, footer, home page, `vite.config.js`, `public/sitemap.xml`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

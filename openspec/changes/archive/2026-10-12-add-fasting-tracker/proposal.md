# Proposal

## Why

Fasts missed in Ramadan have to be made up, and people lose count. The Fasting page shows times and rulings but records nothing.

## What Changes

- A new store with a stored key, `fasting-log`, holding for each local day one of: fasted, missed, made up or voluntary.
- The Fasting page gains a tracker section. In Ramadan it shows a 30-day grid; outside Ramadan it shows the current month, with the most recent Ramadan one tap away.
- Whether a day falls in Ramadan comes from `utils/hijri.js`. As that estimate can be a day out, the user can set the first day of Ramadan themselves (a second stored key, `ramadan-starts`).
- "Still to make up" is the number of missed Ramadan days minus the number of made-up days, never below zero, kept per Ramadan year.
- Voluntary fasts are counted separately.
- A day holds one status; a future day cannot be logged; a Ramadan status cannot be given to a day outside Ramadan, nor the reverse.
- Nothing leaves the device.

## Capabilities

### New Capabilities

- `fasting-tracker`: recording fasts on the device and counting what is still to be made up.

### Modified Capabilities

None.

## Impact

- `src/utils/hijri.js` (first day of a Hijri month), `src/utils/day.js` (the shared month grid), new `src/utils/fasting.js`, `src/stores/fasting.js`, `src/components/FastingTracker.vue` and tests; `FastingView.vue`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

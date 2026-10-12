# Proposal

## Why

Asr is timed in two ways: when an object's shadow equals its length (the majority) or twice its length (the Hanafi school). The site only offers the first, so Hanafi users see an Asr time roughly an hour early with no way to change it. `Spec.md` lists this under Known gaps.

## What Changes

- `calcPrayerTimes` takes an Asr option: `standard` (the default, unchanged) or `hanafi`. An unknown option falls back to `standard`.
- The Prayer page gains an Asr selector beside the calculation method. Changing it, or the method, recalculates the times and the countdown at once when times are already shown.
- The file header in `utils/prayer.js` lists only the methods that exist.
- The Fasting page is untouched: it uses Fajr and Maghrib only.

## Capabilities

### New Capabilities

- `prayer-times`: how prayer times are calculated from a location, date, method and Asr option, and how the Prayer page lets the user choose them.

### Modified Capabilities

None.

## Impact

- `src/utils/prayer.js`, `prayer.fixture.js`, `prayer.test.js`, `src/views/pillar/PrayerView.vue` and a new page test.
- `Spec.md` 5.2 and Known gaps, `CHANGELOG.md`, the changelog page, `Features.md`.

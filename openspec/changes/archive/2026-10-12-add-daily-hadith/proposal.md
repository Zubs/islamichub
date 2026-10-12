# Proposal

## Why

The home page gives a returning visitor nothing new. One short, sourced hadith a day is a reason to open the site each morning, and it is the first thing a user will want to share.

## What Changes

- `data/dailyHadith.js` holds 67 short hadiths from Sahih al-Bukhari, each with its text, narrator and reference. The texts are taken word for word from an open hadith dataset and checked against it.
- The home page shows one each day in a card. The day's hadith is chosen from the local date, so everyone sees the same one on the same date, it changes at local midnight, and the list starts again after its last entry.
- The text is in the list, so the card makes no request and works offline.
- The card uses `HadithBlock`, so its reference links to the full hadith.
- With an empty list the home page shows no card and no gap.

## Capabilities

### New Capabilities

- `daily-hadith`: the curated list, how the day's hadith is chosen, and how it is shown.

### Modified Capabilities

None.

## Impact

- New `src/data/dailyHadith.js`, `src/utils/dailyHadith.js`, `src/components/DailyHadith.vue` and tests; `HomeView.vue`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

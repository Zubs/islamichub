# Proposal

## Why

Counts on adhkar cards live in memory only, so reloading the page or closing the tab half-way through the morning adhkar loses every count. A stored record with one damaged entry can also still stop the adhkar and tasbih pages loading.

## What Changes

- In-progress counts are saved under a new key, `adhkar-progress`, as today's day key plus a count for each dhikr.
- On load, counts are restored only if the saved day is today; an older day is discarded.
- Completing a category clears its saved counts, including the counts of multi-part adhkar, and leaves other categories' counts alone.
- A damaged entry inside a valid record (a day whose value is `null` or a number) is ignored in `adhkar-progress`, `adhkar-completion-log` and `tasbih-totals`.

## Capabilities

### New Capabilities

- `adhkar-progress`: keeping a user's place in the day's adhkar across reloads.

### Modified Capabilities

- `device-storage`: damaged entries inside a valid stored record are ignored.

## Impact

- `src/utils/storage.js`, `src/stores/adhkar.js`, `src/stores/tasbih.js` and their tests.
- `Spec.md` section 6 and Known gaps, `CHANGELOG.md`, `Features.md`.

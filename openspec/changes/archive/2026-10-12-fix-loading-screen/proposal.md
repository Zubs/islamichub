# Proposal

## Why

Every entry to the site, including a link to an adhkar page, waits at least two seconds behind a full-screen loading screen while gold prices are fetched that only the Zakat page uses.

## What Changes

- The app no longer fetches prices on start. The Zakat page requests them when it opens.
- Prices are fetched once per visit and reused when the user returns to the Zakat page.
- The Bismillah screen shows only until the first page is ready to draw, with no minimum time. It stays announced to screen readers while it shows.
- The Zakat page keeps its own "fetching prices" state and is usable on reference prices meanwhile (already built in feature 5).

## Capabilities

### New Capabilities

- `app-shell`: what wraps every page: the loading screen and when it clears.

### Modified Capabilities

- `zakat-calculator`: prices are requested only by the Zakat page, and once per visit.

## Impact

- `src/App.vue`, `src/stores/zakat.js`, `src/views/pillar/ZakatView.vue` and tests.
- `Spec.md` section 4 and Known gaps, `CHANGELOG.md`, `Features.md`.

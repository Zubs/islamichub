# Tasks

## 1. Settings

- [x] 1.1 Create `src/utils/prayerSettings.js` (`isValidCoordinates`, `parsePrayerSettings`) with tests for the limits, values beyond them, corrupt text, wrong kinds and unknown methods. Verify the tests pass
- [x] 1.2 Create `src/stores/prayerSettings.js` with `saved`, `canRemember`, `remember`, `setMethods` and `forget`, with tests for nothing stored, remember then reload, method change persisted, forget, corrupt data and blocked storage. Verify the tests pass

## 2. Pages

- [x] 2.1 In `PrayerView.vue`: validate coordinates, start from saved settings and show times at once, offer "Remember this location", show "Forget my location", persist method changes, and say when storage is blocked. Extend `PrayerView.test.js` for first visit, declining, accepting and returning, method remembered, limits, forgetting, corrupt settings, blocked storage. Verify the tests pass
- [x] 2.2 In `FastingView.vue`: use the saved location and method to show suhoor and iftar without asking, with a test. Verify it passes

## 3. Documentation

- [x] 3.1 Update the privacy text on the About page and in `Spec.md` sections 5.2, 6 and 9, add the changelog entry, record the decision under "Final" and tick feature 11 in `Features.md`. Verify `Spec.md` no longer says location is never persisted

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

# Tasks

## 1. Rules and store

- [x] 1.1 Add `firstDayOfHijriMonth` to `src/utils/hijri.js` and move `monthGrid` to `src/utils/day.js`, with tests. Verify the tests pass
- [x] 1.2 Create `src/utils/fasting.js` and `src/stores/fasting.js` with tests for every scenario in the spec, including a whole Ramadan with three missed days and two made up. Verify the tests pass

## 2. Page

- [x] 2.1 Create `src/components/FastingTracker.vue`, place it in `FastingView.vue`, and test: empty grid and zero; marking a Ramadan day; the 30-day grid in Ramadan and the month outside it; statuses offered by season; future days disabled; setting the first day a day earlier; the make-up and voluntary counts shown. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md` (Fasting section, storage keys), `CHANGELOG.md` and `Features.md`. Verify they name both keys

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

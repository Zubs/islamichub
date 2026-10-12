# Tasks

## 1. Calculation

- [x] 1.1 Add the Asr option to `calcPrayerTimes` in `src/utils/prayer.js`, export the option list, correct the file header, add published Standard and Hanafi Asr times for London, Lagos and Karachi to `prayer.fixture.js`, and test: default equals Standard; Hanafi is later with the other five unchanged; both within two minutes of the published times for all three cities; latitude 60° in December; unknown option. Verify the tests pass

## 2. Page

- [x] 2.1 Add the Asr selector to `PrayerView.vue`, recalculate when it or the method changes while times are shown, and add `PrayerView.test.js` checking that switching to Hanafi moves Asr later and keeps a countdown. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md` 5.2 and remove the "Asr is Shafi'i only" gap, add the changelog entries, tick feature 8 in `Features.md`. Verify the gap entry is gone

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

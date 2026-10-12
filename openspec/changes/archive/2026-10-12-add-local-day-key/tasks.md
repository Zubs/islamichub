# Tasks

## 1. Day key utility

- [x] 1.1 Add a test helper beside the utility tests that sets `process.env.TZ` to a given zone, freezes the clock at a given UTC instant, and restores `TZ` to `UTC` and real timers afterwards; prove it with a test that reads local hours in `Africa/Lagos` and `America/New_York` for the same instant, and verify that test passes and that a test run after it still sees UTC
- [x] 1.2 Create `src/utils/day.js` with `dayKey(date = new Date())` returning the local date as zero-padded `YYYY-MM-DD`, and `src/utils/day.test.js` covering the four "local calendar day" scenarios in `specs/local-day/spec.md` (Lagos 23:30, New York 00:30, either side of midnight, single-digit month and day), and verify the file passes
- [x] 1.3 Add `addDays(key, n)` using calendar arithmetic, with tests for the five "days step by the calendar" scenarios (month end, leap day, year end, clocks forward in London, clocks back in New York) plus `n = 0` and a negative `n`, and verify the file passes

## 2. Stored record parser

- [x] 2.1 Create `src/utils/storage.js` with `parseStoredObject(text)` and `src/utils/storage.test.js` covering: missing (`null` input), empty text, text that is not JSON, the texts `null`, `42`, `"text"`, `true` and `[1, 2]`, and a valid object returned unchanged, and verify the file passes

## 3. Adhkar store

- [x] 3.1 Replace `loadLog` and `todayKey` in `src/stores/adhkar.js` with `parseStoredObject` and `dayKey`, rewrite `streakForCategory` to walk keys with `addDays`, and verify the existing tests in `src/stores/adhkar.test.js` pass unchanged
- [x] 3.2 Add tests for the "adhkar completion follows the local day" scenarios (nothing recorded, Lagos 23:30 stored under the local date, not complete at 00:30 the next day), and verify they pass
- [x] 3.3 Add tests for the streak scenarios: three local days in a row run with `it.each` over `Africa/Lagos`, `Europe/London` and `America/New_York`; across a month end; across the London clock change of 29 March 2026; and a missed day, and verify they pass
- [x] 3.4 Add tests that a log saved in the old form is read and counted with the stored text unchanged, and that the texts `null`, `42` and `[1, 2]` under `adhkar-completion-log` load as empty and a completion afterwards saves a valid record, and verify they pass

## 4. Tasbih store

- [x] 4.1 Replace `loadTotals` and `todayKey` in `src/stores/tasbih.js` with `parseStoredObject` and `dayKey`, and verify the existing tests in `src/stores/tasbih.test.js` pass unchanged
- [x] 4.2 Add tests for the "tasbih totals follow the local day" scenarios (New York tap at 00:30 lands on the new local date; three taps before local midnight and two after give 3, 2 and 5), and verify they pass
- [x] 4.3 Add tests that totals saved in the old form count towards lifetime totals, and that the texts `null`, `42` and `[1, 2]` under `tasbih-totals` load as zero totals and a tap afterwards saves a valid record, and verify they pass

## 5. Documentation

- [x] 5.1 Update `Spec.md`: add `day` and `storage` to the `utils/` line in section 3, state the local-day rule in sections 5.7 and 5.8, add the wrong-shape rule to section 6, and remove the "Day keys are UTC" and "Stored data of the wrong shape is not handled" entries from Known gaps, and verify neither entry remains
- [x] 5.2 Add a Fixed entry to `CHANGELOG.md` and the changelog page saying the day now changes at local midnight, including the one-off one-day shift for existing entries, and verify the changelog page shows it in `npm run dev`
- [x] 5.3 Note under feature 17 in `Features.md` that a damaged entry inside a valid stored record is still not handled, and verify the note names the two keys

## 6. Final checks

- [x] 6.1 Run `grep -rn "toISOString" src --include="*.js" --include="*.vue"` and verify it finds nothing outside test files, and that no file other than `src/utils/day.js` builds a `YYYY-MM-DD` key
- [x] 6.2 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, fix anything reported, and verify all four finish with no errors and format changes no files
- [x] 6.3 Run the suite in shuffled order three times (`npx vitest run --sequence.shuffle`) and verify no failures, confirming the timezone switching does not leak between tests
- [x] 6.4 Tick "2. Local day key" in the `Features.md` progress list, and verify the box is ticked and no other box changed

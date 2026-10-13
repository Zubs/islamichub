# Tasks

## 1. Storage

- [x] 1.1 Add `keepEntries` to `src/utils/storage.js` with tests, and use it when the adhkar and tasbih stores read `adhkar-completion-log` and `tasbih-totals`, with tests for a day that is `null`, a number or text, a count that is not a number, and a streak beside a damaged day. Verify the tests pass

## 2. Progress

- [x] 2.1 Save and restore counts under `adhkar-progress` in `src/stores/adhkar.js`, clear a completed category's counts including parts, and test: nothing saved; three taps then reload; several categories; a shared dhikr; yesterday's counts; at target then one more tap; completing one category; corrupt data; blocked storage; half-way through, close, return and carry on. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md` section 6 and remove the two gaps this closes, add the changelog entry and tick feature 17 in `Features.md`. Verify the gap entries are gone

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

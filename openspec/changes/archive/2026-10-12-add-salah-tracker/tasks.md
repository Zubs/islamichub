# Tasks

## 1. Rules and store

- [x] 1.1 Create `src/utils/salah.js` with tests for every streak scenario, day completeness, the week, the month grid, future days and reading damaged logs. Verify the tests pass
- [x] 1.2 Create `src/stores/salah.js` with tests: nothing logged; save and reload; change and clear a status; future day refused; clear; corrupt data; blocked storage; three days of five prayers. Verify the tests pass

## 2. Page

- [x] 2.1 Create `src/views/tools/TrackerView.vue` with its route, page metadata, navigation, footer, home page, sitemap entry and manifest shortcut, and test: five unlogged prayers; five taps; editing yesterday repairs the streak; future days disabled; times and "not yet" with a saved location; none without; clear with confirm and decline; the week strip filled after three days. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md` (route, section, storage key, privacy), `CHANGELOG.md` and `Features.md`. Verify the sitemap and build tests pass

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

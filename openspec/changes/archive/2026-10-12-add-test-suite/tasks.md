# Tasks

## 1. Test runner setup

- [x] 1.1 Install `vitest`, `@vue/test-utils` and `jsdom` as dev dependencies, and verify `npm ls vitest @vue/test-utils jsdom` lists all three with no peer dependency warnings against Vite 8
- [x] 1.2 Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json`, and verify `npm test` runs and exits (reporting no test files is expected at this point)
- [x] 1.3 Add a `test` block to `vite.config.js` (import `defineConfig` from `vitest/config`; `environment: 'jsdom'`; include `src/**/*.test.js`; `globalSetup` and `setupFiles` pointing at the files from 1.4 and 1.5), and verify `npm run build` and `npm run dev` still work
- [x] 1.4 Create `test/global-setup.js` that sets `process.env.TZ = 'UTC'`, and verify with a temporary test that `new Date().getTimezoneOffset()` is 0 when the shell runs `TZ=America/New_York npm test`
- [x] 1.5 Create `test/setup.js` that, before each test, clears `localStorage` and installs a fresh Pinia, and verify with a temporary pair of tests that data written to `localStorage` in the first is absent in the second
- [x] 1.6 Remove the temporary tests from 1.4 and 1.5, and verify `npm run lint` passes with the new files and that `npm run build` output in `dist/` contains no test files

## 2. Qibla and Hijri tests

- [x] 2.1 Create `src/utils/qibla.test.js` covering the three Qibla scenarios in the spec (the Kaaba itself, London, compass labels), and verify the file passes with `npx vitest run src/utils/qibla.test.js`
- [x] 2.2 Create `src/utils/hijri.test.js` covering the known-date scenario (comparing by total days so a one-day difference across a month or year boundary counts as within one day) and the result-shape scenario, and verify the file passes

## 3. Prayer time tests

- [x] 3.1 Obtain the six prayer times for London (51.5074, -0.1278) on 20 March 2026, UTC+0, standard Asr, for MWL, ISNA, Egypt, Makkah and Karachi from one named published timetable, save them as `src/utils/prayer.fixture.js` with the source name, its settings and the retrieval date as fields, and verify the fixture holds 30 times and names its source
- [x] 3.2 Create `src/utils/prayer.test.js` asserting each calculated time is within two minutes of the fixture for all five methods, and verify the file passes. If any time is more than two minutes out, stop, leave this task unticked, and report both sets of numbers to Zubair without changing the tolerance or `utils/prayer.js`
- [x] 3.3 Add the unknown-method test (equals MWL), and verify it passes
- [x] 3.4 Add the next-prayer tests using fake timers set to a fixed instant (between Dhuhr and Asr, and after Isha), restoring real timers afterwards, and verify they pass and still pass when the file is run alone and as part of the whole suite

## 4. Store tests

- [x] 4.1 Create `src/stores/adhkar.test.js` covering the five adhkar scenarios in the spec (nothing stored, tapping past the target, completing twice, streak across days with fake timers, corrupt stored log), and verify the file passes
- [x] 4.2 Create `src/stores/tasbih.test.js` covering the seven tasbih scenarios in the spec (nothing stored, a tap counts twice, reset keeps totals, target limits, switching phrase, totals across phrases and days, corrupt stored totals), and verify the file passes
- [x] 4.3 Verify isolation by running the store tests in reverse and shuffled order (`npx vitest run --sequence.shuffle`) three times with no failures

## 5. Component test

- [x] 5.1 Create `src/components/FaqList.test.js` that mounts the FAQ list with two questions, clicks the first and checks that only the first answer is open, and verify the file passes

## 6. Deploy gate and documentation

- [x] 6.1 Change the build command in `netlify.toml` to `npm test && npm run build`, and verify locally that running that command builds the site, and that with one test temporarily made to fail it stops before building and exits non-zero (then restore the test)
- [x] 6.2 Update `Spec.md`: the "no test runner" sentence and the Scripts table in section 2, the build command in section 10, and remove "No automated tests" from Known gaps, and verify no line in `Spec.md` still says there is no test runner
- [x] 6.3 Add a `CHANGELOG.md` entry for the test suite and mirror it in `ChangelogView.vue` in the same form as existing entries, and verify the changelog page renders the new entry in `npm run dev`
- [x] 6.4 Record in `Features.md`, under feature 2 or 17 as fits, that valid JSON of the wrong shape in storage is not handled by the stores today (found while writing these tests), and verify the note names the stores and keys affected

## 7. Lint and format clean-up

- [x] 7.1 Remove the unused parameters and variable in `src/utils/inheritance.js`, the unused `PROGRESS_KEY` in `src/stores/adhkar.js`, and the unused `catch` bindings in `FastingView.vue` and `PrayerView.vue`, and verify `npx oxlint .` reports no errors and all tests still pass
- [x] 7.2 Move the "No chapters match" message in `src/views/hadith/HadithBookView.vue` inside the chapter list block so it shows when a search matches nothing, and verify `npx eslint .` reports no errors
- [x] 7.3 Format `src/` with the project's Prettier config, and verify `npm run format` then changes no files
- [x] 7.4 Build the site before and after 7.1 to 7.3 and compare the rendered text of every static route in a headless browser, and verify the only difference is the new changelog entry
- [x] 7.5 Add the lint and format clean-up and the hadith filter fix to `CHANGELOG.md` and the changelog page, and to feature 1 in `Features.md`; remove the `adhkar-session-progress` bullet from feature 4, and verify each file mentions the change

## 8. Final checks

- [x] 8.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, fix anything reported, and verify all four finish with no errors
- [x] 8.2 Run `TZ=Africa/Lagos npm test`, `TZ=Europe/London npm test` and `TZ=America/New_York npm test`, and verify the same tests pass in all three
- [x] 8.3 Run `npm test` with the network off and `VITE_HADITH_API_KEY` unset, and verify every test passes
- [x] 8.4 Tick "1. Test suite" in the `Features.md` progress list, and verify the box is ticked and no other box changed

## Workflow follow-up

- Archive the change once the pull request for it is merged and the production deploy has passed with the new build command.

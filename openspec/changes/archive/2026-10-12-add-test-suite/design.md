# Design

## Context

See `proposal.md` for motivation. What shapes the approach:

- The project runs Vite 8.0.13, Vue 3.5, Pinia 3, plain JavaScript, Node 20.19+ or 22.12+. Vitest 4.1.11 is used: its peer range includes Vite 8 and it supports Node 20. Vitest 5.0.4 was released on the day this was built and drops Node 20, which the project still supports.
- `vite.config.js` is a dozen lines: the Vue plugin and the `@` alias. The stores import through `@/`, so tests must resolve that alias.
- The code under test, as it is today:
  - `utils/qibla.js` and `calcPrayerTimes` and `toHijri` are pure and take all their inputs as arguments.
  - `getNextPrayer`, `getCurrentPrayer` and `daysToRamadan` call `new Date()` internally.
  - Both stores read `localStorage` when the store is created, and build "today" from `new Date().toISOString()`, which is a UTC date.
  - `stores/tasbih.js` calls `navigator.vibrate` only if it exists.
- `netlify.toml` builds with `command = "npm run build"`. Vite is already a dev dependency, so Netlify installs dev dependencies today.
- ESLint is configured with browser globals only. `.gitignore` already ignores `coverage` and Vitest's `__screenshots__/`.

I ran the current utilities to see what they return, so the baseline is known before any test is written:

| Call | Result today |
|---|---|
| Qibla from London (51.5074, -0.1278) | 119°, SE, 4,794 km |
| Qibla from the Kaaba | 0°, 0 km |
| London, 20 March 2026, UTC+0, MWL | 04:10, 06:04, 12:08, 15:25, 18:12, 19:59 |
| Same, unknown method | identical to MWL |
| `toHijri` for 1 Mar 2025 / 18 Feb 2026 / 7 Jul 2024 | 1 Ramadan 1446 / 30 Sha'ban 1447 / 30 Dhu al-Hijjah 1445 |

## Goals / Non-Goals

**Goals:**
- A test setup later features can add to by creating one file, with no configuration.
- Deterministic tests: same result on any machine, at any time, in any order.
- Baseline tests that describe what the code does correctly today, so features 2 to 10 can change it safely.

**Non-Goals:**
- Changing what any calculation or store returns. If a baseline test fails against today's code, that is a finding to report, not something to fix here. The lint and format clean-up below is the one place existing code is touched.
- Coverage numbers or thresholds.
- End-to-end browser tests. Features that need a real phone say so in their own done check.
- Testing views. Views are large templates that feature 26 rewrites; one small component test proves the pipeline.

## Decisions

### Vitest, configured inside `vite.config.js`
Vitest reuses the Vite config, so the Vue plugin and the `@` alias apply to tests with nothing duplicated. The `test` block goes in the existing `vite.config.js`, importing `defineConfig` from `vitest/config`.

- *Alternative: a separate `vitest.config.js`.* Rejected: it would have to merge or repeat the alias and plugin for no gain at this size.
- *Alternative: Jest.* Rejected: needs its own transform setup for Vue files and ES modules, and does not share the Vite config.

### jsdom for every test
One environment, `jsdom`, for the whole suite. It supplies `localStorage`, `navigator` and a DOM, which the stores and components need. The pure utility tests do not need it but run fine in it, and one environment is simpler than per-file overrides.

- *Alternative: `happy-dom`.* Faster, but `Features.md` names jsdom and the suite is small.

### Explicit imports, no test globals
Test files import `describe`, `it`, `expect` and `vi` from `vitest`. With globals off, ESLint and oxlint need no new configuration and a test file reads like any other module.

### Pin the timezone to UTC and freeze the clock where code reads it
- A Vitest `globalSetup` file sets `process.env.TZ = 'UTC'` before any worker starts. Both stores build day keys in UTC and `calcPrayerTimes` reads local date parts, so pinning UTC makes local and UTC agree and removes any dependence on the machine.
- Tests of anything that calls `new Date()` (`getNextPrayer`, store day keys, streaks) use `vi.useFakeTimers()` and `vi.setSystemTime()` with a fixed instant, and restore real timers afterwards.
- *Alternative: change the utilities to accept a `now` argument.* Cleaner, but it is an application change. Feature 2 replaces the day-key code and can make that choice then.
- Feature 2 needs tests in several timezones. Because its new `dayKey(date)` takes a date argument, those tests can construct dates directly and will not conflict with the UTC pin.

### A setup file resets shared state before each test
One `setupFiles` entry clears `localStorage` and installs a fresh Pinia with `setActivePinia(createPinia())` before every test. Both stores read storage when created, so a test that needs pre-existing data writes to `localStorage` first and then calls `useXStore()`. "Created again" in the specs means installing a fresh Pinia and calling the store again.

The global setup and the per-test setup live in a top-level `test/` folder, since they cover no single source file. Test files themselves sit beside their source.

### Expected prayer times come from a published timetable, recorded as a fixture
The London times are taken once, at authoring time, from one named published source for the fixed date 20 March 2026 (equinox, UTC+0, so no daylight-saving ambiguity), standard Asr, for each of the five methods. They are stored in a fixture file beside the test, with the source name, its settings and the date retrieved as fields. The tests make no network calls.

The tolerance is two minutes per time, as `Features.md` states. Asserting the values the code returns today would only prove the code equals itself, so the fixture must come from the outside source.

If any method is more than two minutes out, the implementer stops and reports the difference to Zubair with both sets of numbers. The tolerance is not widened and `utils/prayer.js` is not changed in this change.

### Corrupt storage means invalid JSON
Both stores wrap `JSON.parse` in `try/catch`, so text that is not JSON loads as empty. That is what the baseline tests pin down. Valid JSON of the wrong shape (for example the text `null`) is not handled by today's code and is not asserted here; it is noted under Risks for the features that rework these stores.

### The deploy gate lives in `netlify.toml`
The build command becomes `npm test && npm run build`. Local `npm run build` stays as it is.

- *Alternative: a `prebuild` script in `package.json`.* Rejected: it would run the tests on every local build, including `npm run preview` workflows, and hide the gate inside npm lifecycle behaviour instead of stating it where the deploy is configured.
- *Alternative: a GitHub Action.* Rejected for now: Netlify already builds every pull request, so one gate is enough, and an Action would not stop Netlify from publishing.

### Lint and format are cleaned up in this change
The project's checks are `npm run lint`, `npm run format`, `npm test` and `npm run build`. Before this change lint failed with seven errors in existing files and about 30 files in `src/` did not match the Prettier config, so no feature could finish with a clean run. Zubair chose to fix that here instead of in feature 4.

- Six of the lint errors are unused variables or parameters and are removed with no change in behaviour: two unused parameters and one unused variable in `utils/inheritance.js`, the unused `PROGRESS_KEY` in `stores/adhkar.js`, and an unused `catch (e)` binding in `FastingView.vue` and `PrayerView.vue`.
- The seventh is an unreachable `v-else-if` in `HadithBookView.vue`: the "No chapters match" message was chained after a branch with the same condition. It moves inside the chapter list block and shows when a search is entered and no chapter matches. This is the one user-visible change.
- Formatting is applied with the project's existing Prettier config and nothing else. To check it changed no content, the site is built before and after and the rendered text of each page is compared in a headless browser.
- *Alternative: leave it for feature 4.* Rejected by Zubair: every feature in between would finish with failing checks.
- *Alternative: also add lint to the Netlify build command.* Not done: the lint scripts run with `--fix`, which suits local use, not a build. It can be added later with a check-only script.

### One component smoke test
`FaqList.vue` is the smallest interactive component (a prop and a toggle). One test mounts it, clicks a question and checks the open state, which proves Vue files compile and mount under test.

## Risks / Trade-offs

- **The current prayer calculation may not match a published timetable within two minutes for every method** → Stop and report, as above. The feature cannot be ticked until Zubair decides whether the gap is a bug to fix in a later feature or the source needs different settings.
- **Published timetables differ from each other by a minute or two** (rounding, elevation, high-latitude rules) → Use one source, record its settings in the fixture, and choose the equinox in London, where high-latitude adjustments do not apply.
- **Pinning UTC hides timezone bugs in the stores** → Accepted here. The UTC day key is a known gap that feature 2 fixes, with its own multi-timezone tests.
- **Wrong-shaped but valid JSON in storage would crash a store** → Not covered by today's code or these tests. Recorded for features 2 and 17, which touch that loading code.
- **Vitest is one major version behind the latest** → Vitest 4 is kept until the project drops Node 20. The suite uses only core APIs, so moving to 5 later should need no test changes.
- **npm 11.5.2 fails to install Vitest 4** with an internal error (`Cannot read properties of null (reading 'edgesOut')`), and asked for the latest it silently picks Vitest 3, which does not support Vite 8 → The install was done with npm 12 (`npx npm@latest install`). The lockfile format is unchanged, and `npm ci` works with npm 11.
- **The formatting pass makes a large diff** (about 30 files) that buries the real changes in review and will conflict with other open branches → Keep the formatting in its own commit, separate from the tests and the lint fixes, when this is committed.
- **The hadith filter fix is not covered by a test** → It is a three-line template move confirmed by the lint rule no longer firing. A component test for that view needs the router and the hadith API mocked, which belongs with feature 13.
- **Every deploy gets slower** → A few seconds for a suite this size. Accepted.
- **The deploy gate is not exercised on Netlify itself** → Zubair decided a failing deploy does not need to be staged. The gate is verified locally by running the exact build command with a failing test (task 6.1). Netlify runs that same command, so the remaining risk is only a misconfigured site setting overriding `netlify.toml`.

## Migration Plan

Nothing to migrate. To roll back, restore `command = "npm run build"` in `netlify.toml`; the tests and dev dependencies can stay without affecting the site.

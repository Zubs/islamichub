# Proposal

## Why

IslamicHub has no automated tests, so nothing proves that prayer times, the Qibla bearing, the Hijri date or the adhkar and tasbih counters are correct, and nothing stops a broken build from being deployed. This is feature 1 in `Features.md`: the next features fix calculation bugs and rework stored data, and they need tests to prove the fix and to prove nothing else broke.

## What Changes

- Add a test runner with a browser-like environment, so pure functions, Pinia stores and Vue components can all be tested.
- Add `npm test` (runs everything once) and `npm run test:watch` (re-runs on change).
- Establish the convention that a test file sits beside the code it covers (`src/utils/prayer.test.js`).
- Add the first tests, covering behaviour that already works today: `utils/prayer.js`, `utils/qibla.js`, `utils/hijri.js`, the adhkar store and the tasbih store, plus one component test that proves components can be mounted.
- Make the Netlify build run the tests before building, so a failing test stops a deploy.
- Make `npm run lint` and `npm run format` pass across the whole project, so this and every later feature can run the full set of checks. That means fixing the seven lint errors already in the code and formatting every file in `src/` with Prettier.
- One of those lint errors is a real bug: on the hadith book page the "No chapters match" message sits in a branch that can never run. It is fixed so the message shows when a filter matches nothing. Apart from that, there is no change to how the site behaves for users.

Out of scope: tests for the Zakat store and the inheritance engine (features 5 and 7 add them with their fixes), browser end-to-end tests, coverage thresholds, and any fix to behaviour the new tests reveal as wrong. The lint fixes remove unused variables and parameters only; they do not change what the inheritance engine or any calculation returns.

## Capabilities

### New Capabilities
- `automated-testing`: how the project's automated tests are run, where they live, what baseline behaviour they pin down, and how they gate a deploy.

### Modified Capabilities

None. `openspec/specs/` is empty.

## Impact

- **Dependencies:** three new dev dependencies: Vitest, `@vue/test-utils` and `jsdom`. All are named in `Features.md` and the `CLAUDE.md` tech stack. No runtime dependency is added, so the site bundle is unchanged.
- **Configuration:** `package.json` (two scripts), `vite.config.js` (test settings), `netlify.toml` (build command).
- **Existing code:** about 30 files in `src/` change in formatting only. Five files get small lint fixes: `utils/inheritance.js`, `stores/adhkar.js`, `views/pillar/FastingView.vue`, `views/pillar/PrayerView.vue` and `views/hadith/HadithBookView.vue` (the unreachable branch), plus the removal of the unused `adhkar-session-progress` constant that feature 4 had listed.
- **New files:** test files under `src/utils/`, `src/stores/` and `src/components/`, and a small test setup file.
- **Deploys:** every Netlify build, including deploy previews, takes a few seconds longer and fails if any test fails.
- **Docs:** `Spec.md` section 2 ("no test runner"), its Scripts table and the "No automated tests" entry under Known gaps become out of date and are updated. `CHANGELOG.md` gains an entry.

# Tasks

## 1. List and choice

- [x] 1.1 Create `src/data/dailyHadith.js` (at least 60 entries copied from the dataset) and `src/utils/dailyHadith.js`, with tests: every entry complete and unique; same date same hadith; next date different; wrap after the last; local midnight in Lagos and New York; empty list. Verify the tests pass

## 2. Card

- [x] 2.1 Create `src/components/DailyHadith.vue`, add it to the home page, and test: card shown with narrator and linked reference; no request made; nothing rendered for an empty list; two consecutive days show two different hadiths. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md`, `CHANGELOG.md` and `Features.md`. Verify the citation check still passes on the home page

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

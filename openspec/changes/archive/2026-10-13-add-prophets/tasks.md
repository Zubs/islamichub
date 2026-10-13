# Tasks

## 1. Data

- [x] 1.1 Create `data/prophets.js` with the 25 prophets and their verified references, `utils/prophets.js` and `test/fixtures/ayahCounts.json`, with tests: 25 in order; every reference a verse that exists; previous and next story. Verify the tests pass

## 2. Story

- [x] 2.1 Write Ibrahim's story as `data/ibrahimSections.js` and `data/content/ibrahim/en.js`, with tests: every section referenced; every verse block complete; only the Qur'an and Sahih al-Bukhari cited. Verify the tests pass

## 3. Pages

- [x] 3.1 Create `ProphetsHomeView.vue`, `ProphetView.vue`, their routes with the 404 guard, page metadata, navigation, footer, home page and sitemap entries, with tests: the list; linked and unlinked prophets; opening Ibrahim from the list; following a hadith reference; 404 for an unwritten or unknown prophet; own title and description; a right-to-left language. Verify the tests pass

## 4. Documentation

- [x] 4.1 Update `Spec.md`, `CHANGELOG.md` and `Features.md`; list the reviewer and the open points under "Final" and leave feature 32 unticked

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

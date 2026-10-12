# Tasks

## 1. Content system

- [x] 1.1 Record each content page's rendered wording in `test/fixtures/pages/` and add `test/content-pages.test.js`. Verify it passes before any page is changed
- [x] 1.2 Create `src/utils/content.js`, `src/composables/useContent.js` and `UntranslatedNote.vue`, with tests for lookup, filling values, list merging, unknown sections and keys, and data items. Verify the tests pass

## 2. Moving the writing

- [x] 2.1 Move the Faith page's writing into `src/data/content/faith/en.js` as the pattern. Verify the page's wording is unchanged
- [x] 2.2 Move the Articles of Faith, Prayer, Zakat, Fasting, Hajj, hadith overview, Inheritance, About and Home pages. Verify every page's wording is unchanged and no content page holds writing in its template
- [x] 2.3 Apply data translations to adhkar, adhkar categories, duas, dua situations, tasbih phrases and the daily hadith, and move page titles and descriptions to the message file. Verify the tests pass

## 3. Translation behaviour

- [x] 3.1 Test with a made-up language: an empty content file; one translated section; a missing section with its note; a missing text; the same Arabic and reference for a verse; list items; hadith links; FAQs and animated blocks; a translated dua and dhikr. Verify the tests pass

## 4. Documentation

- [x] 4.1 Update `Spec.md`, `CONTRIBUTING.md` (how to add and translate content), `CHANGELOG.md` and `Features.md`, and tick features 25 and 26 if their checks are met. Verify the docs test passes

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

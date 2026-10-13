# Tasks

## 1. Content and search

- [x] 1.1 Add `src/data/duas.js` (at least 40 duas, Arabic copied from its source) and `src/utils/duas.js`, with tests: every dua complete with a recognised reference and known situations; no duplicates; each situation's count; a dua in two situations; search by situation, in any case, by transliteration without marks, one letter, very long, no matches. Verify the tests pass

## 2. Pages

- [x] 2.1 Extend `AdhkarCard` (title, when, optional counter, anchor), add the two views and routes with the 404 guard and hash scrolling, add page metadata, navigation, footer, home page and sitemap entries, and test: situations listed with counts; empty situation not listed; unknown situation shows the 404 page; cards without and with counters; anchor present; search with clear; the "rain" journey to its hadith. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md`, `CHANGELOG.md` and `Features.md`, record the reviewer notes under "Final". Verify the sitemap and citation tests pass

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

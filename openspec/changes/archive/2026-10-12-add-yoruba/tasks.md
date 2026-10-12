# Tasks

## 1. Language registry

- [x] 1.1 Register Yoruba (not complete) with `src/locales/yo.js`, its typefaces and its proposed Qur'an translation; apply and remove a language's typefaces in `setLocale`; add `languageGaps` and the `meta` reviewer record. Test: gaps found for missing messages, sections, keys, list items and reviewers; none for a complete language; typefaces applied and removed. Verify the tests pass

## 2. Behaviour

- [x] 2.1 Add `test/languages.test.js`: Yoruba absent from the switcher and `/yo/` showing 404; a language marked complete with gaps failing; with a made-up complete Yoruba, the switcher, the pillar pages, the browser-language arrival and morning adhkar journey, equal calculator results, and the About page credit; tone-mark-insensitive search; the sitemap rule. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md`, `CONTRIBUTING.md` (how to complete a language), `CHANGELOG.md` and `Features.md`; list the translation, reviewer and Qur'an translation decisions under "Final" and leave feature 27 unticked. Verify the docs test passes

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

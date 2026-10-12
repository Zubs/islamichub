# Tasks

## 1. Foundation

- [x] 1.1 Add `vue-i18n`, `src/locales/en.js`, `src/locales/index.js`, `src/i18n.js` and `src/utils/locale.js`, install the plugin in `main.js` and in the test setup, with tests for path helpers, browser-language matching, fallback to English and counts. Verify the tests pass
- [x] 1.2 Add localized routes, the navigation guard, the remembered choice and `LanguageSwitcher.vue`, and extend `useSeo` with `lang`, direction and alternates, with tests using a made-up second language: prefix routes, unknown prefix, switching in place, remembering, browser language, staying in a language, alternates. Verify the tests pass

## 2. Moving the text

- [x] 2.1 Move the text of the shell, shared components, 404 page and the adhkar, duas, hadith library, tracker and tasbih views into `en.js`, and add the check that no hard-coded text is left in them. Verify every existing test still passes
- [x] 2.2 Move the text of the calculators on the Prayer, Zakat, Fasting and Inheritance pages, format amounts for the current language, and test that switching language on the Zakat page changes labels, currency format and result text. Verify the tests pass
- [x] 2.3 Add the check that fails on a translation key English lacks. Verify it fails for a deliberately wrong file and passes otherwise

## 3. Documentation

- [x] 3.1 Update `Spec.md`, `CONTRIBUTING.md` (how to add interface text and a language), `CHANGELOG.md` and `Features.md`. Verify the docs test passes

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

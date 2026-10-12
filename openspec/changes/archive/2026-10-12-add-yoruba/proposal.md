# Proposal

## Why

Yoruba is the first language the site is meant to speak besides English. Features 25 and 26 made translation possible; this change prepares everything that shipping Yoruba needs except the translation itself, which has to be written by a Yoruba speaker and checked by a named reviewer.

## What Changes

- Yoruba is registered as a language at the `/yo/` prefix with an empty message file, marked not complete. Until it is complete it is not in the switcher and `/yo/` addresses show the 404 page.
- A completeness check decides when a language may be marked complete: every interface message translated, the five pillar pages fully translated, and a reviewer's name recorded on each translated page.
- Typefaces: the site's body typeface (DM Sans) cannot draw Yoruba's under-dotted letters (ẹ, ọ, ṣ), so a language can name replacement typefaces, which are loaded and applied only when that language is read. Yoruba uses Noto Sans and Noto Serif, which draw every Yoruba letter and tone mark.
- Dua search ignores tone marks and under-dots.
- A language can credit the published Qur'an translation it uses; the credit is shown on the About page once the language is available.
- The sitemap must list a language's pages once it is complete; a test enforces it.
- The translation, the reviewer's name and the choice of Qur'an translation are Zubair's, and are listed under "Final". The feature is not ticked.

## Capabilities

### New Capabilities

- `languages`: which languages the site knows, when one becomes available, what it must hold first, and how its letters are drawn.

### Modified Capabilities

None.

## Impact

- `src/locales/index.js`, new `src/locales/yo.js`, `src/i18n.js`, `src/utils/locale.js`, `src/utils/content.js`, `src/utils/duas.js`, `AboutView.vue`, new `test/languages.test.js`, `test/sitemap.test.js`.
- `Spec.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `Features.md`.

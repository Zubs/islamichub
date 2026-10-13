# Proposal

## Why

Feature 25 made the interface translatable, but the writing on every content page, which is most of the site, is still typed into its template in English. A translator cannot reach it, and a page cannot be shown in another language.

## What Changes

- Each content page's writing moves into `src/data/content/<page>/en.js`, grouped into the page's sections, with the page's lists (FAQs, cards, steps, tables). The pages are Faith, Articles of Faith, Prayer, Zakat, Fasting, Hajj, the hadith overview, Inheritance, About and Home.
- A page reads its writing through `useContent`: one text by section and key, a list by name. A translation is a file beside the English one holding the same sections; nothing else is edited.
- Arabic text, references and icons are stored once. A translated list gives only the text it translates and inherits the rest.
- A section missing from a translation is shown in English with a small "Not yet translated" note.
- Static data (adhkar, adhkar categories, duas, dua situations, tasbih phrases, the daily hadith) gains translations by id in `src/data/translations/<set>/<code>.js`.
- Page titles and descriptions move into the message file.
- Automated checks: a translation holding a section or key English lacks fails; a content page with writing left in its template fails; every page must read word for word as it did before the move.

## Capabilities

### New Capabilities

- `translatable-content`: where the site's writing is held, how a page draws it in the reader's language, and what happens where a translation is missing.

### Modified Capabilities

None.

## Impact

- New `src/data/content/`, `src/utils/content.js`, `src/composables/useContent.js`, `src/components/UntranslatedNote.vue`, `test/content.test.js`, `test/content-pages.test.js` and its fixtures.
- Ten views, the adhkar and duas views, `DailyHadith.vue`, `TasbihView.vue`, `useSeo.js`, `src/locales/en.js`.
- `Spec.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `Features.md`.

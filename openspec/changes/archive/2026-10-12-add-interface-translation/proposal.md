# Proposal

## Why

The site is being built for Yoruba- and Hausa-speaking Muslims, yet every word of its interface is written into its components in English. Nothing can be translated until the text lives somewhere a translator can reach.

## What Changes

- `vue-i18n` with one message file per language in `src/locales/`. English is the source and the fallback.
- Interface text moves out of the shell, the shared components and the tools into the message file: navigation, footer, buttons, form labels, tool results, empty and error states.
- English stays at the current addresses. Other languages sit under a prefix, such as `/yo/prayer`. An unknown prefix shows the 404 page.
- A language switcher in the navigation, hidden while only one language is available. The choice is remembered, and a first visit follows the browser's language where that language is available.
- Each page names its other language versions for search engines, and `<html lang>` and its direction follow the current language.
- Numbers, dates and currency use the current language's formatting.
- An automated check fails if a translation file holds a key English does not have, and another fails if hard-coded text is left in an interface component.
- Long-form page content is not covered here; that is feature 26.

## Capabilities

### New Capabilities

- `interface-translation`: how interface text is held, chosen, addressed and formatted by language.

### Modified Capabilities

None.

## Impact

- New dependency `vue-i18n` (named in the tech stack). New `src/locales/`, `src/i18n.js`, `src/utils/locale.js`, `src/components/LanguageSwitcher.vue`, tests.
- `src/main.js`, `src/router/index.js`, `src/composables/useSeo.js`, `src/stores/zakat.js`, the shell and shared components, the tool views, `test/setup.js`.
- `Spec.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `Features.md`.

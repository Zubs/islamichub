# Proposal

## Why

Hausa is the second language the site is meant to speak. Adding it is also the test of features 25 and 26: a new language should need files, and no change to any component.

## What Changes

- Hausa is registered at the `/ha/` prefix with an empty message file, marked not complete, so it is not offered yet.
- Hausa is written in the Latin (Boko) script with hooked letters (ɓ, ɗ, ƙ, ƴ). None of the site's typefaces can draw them, so Hausa uses Noto Sans and Noto Serif, which were checked to hold all of them.
- Search finds the same results whether the user types the hooked letters or the plain ones.
- The registry names Abubakar Mahmoud Gumi's published translation of the Qur'an as the proposed source for Hausa.
- No component is edited.
- The translation, its reviewer and the choice of Qur'an translation are Zubair's, and are listed under "Final". The feature is not ticked.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `languages`: adds Hausa and search that ignores hooked letters.

## Impact

- `src/locales/index.js`, new `src/locales/ha.js`, `src/utils/duas.js`, `test/languages.test.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

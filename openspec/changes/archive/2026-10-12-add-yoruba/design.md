# Design

## Decisions

- **The registry entry carries everything about a language:** code, own name, `Intl` locale, direction, `complete`, messages, optional `fonts` (`sans`, `serif`, a stylesheet address) and optional `quran` (translator and edition).
- **`complete` is set by hand and policed by a test.** `languageGaps(locale, …)` in `utils/locale.js` lists what a language lacks: untranslated messages, missing sections, keys or list items of the five pillar pages, and pages with no reviewer. `test/languages.test.js` fails if a language marked complete has any gap. Nothing at run time depends on the check, so a broken translation file cannot take the site down.
- **A reviewer is recorded in the content file itself,** as `meta: { reviewer, reviewed }`, beside the sections it vouches for.
- **Typefaces were checked against the font files, not assumed.** Each family was requested from Google Fonts for the letters in question and its character map read: DM Sans lacks ẹ ọ ṣ and Amiri lacks ẹ ọ; Cormorant Garamond has them. Noto Sans and Noto Serif hold every Yoruba and Hausa letter, so Yoruba uses that pair. `setLocale` sets the `--sans` and `--serif` properties and adds the stylesheet when such a language is read, and removes both otherwise.
- **`foldText` already strips combining marks;** precomposed under-dotted letters decompose to a base letter plus a combining dot under NFD, so no table is needed for Yoruba.
- **Yoruba's Qur'an translation is proposed, not chosen:** the entry names Shaykh Abu Rahimah Mikael Aykyuni's translation as published by QuranEnc, pending Zubair's decision.

## Risks / Trade-offs

- [No translation is written here] → writing religious text in Yoruba without a Yoruba speaker and a reviewer would break the project's own content rules. Everything else is in place, and adding the files is all that remains.
- [Typeface coverage on real phones] → listed under "Final".

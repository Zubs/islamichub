# Design

## Decisions

- **`src/data/eidSections.js`** lists the sections in order. Each has an `id`, a `type` and what all languages share: Arabic text, references, and how many paragraphs or items it has. **`en.js`** holds the words under the same ids, read through the existing `useContent`.
- **`ContentSections.vue`** draws seven kinds of section: `prose`, `verse` (a `QuranBlock`), `hadith` (a `HadithBlock`), `points` (a list, each item with its reference), `positions` (where schools differ: one card per position, each with its evidence), `recitation` (Arabic, transliteration, translation) and `faq`. Qurbani and Prophets will reuse it.
- **`utils/eid.js` is pure:** `eidDates(hijriYear)` and `nextEid(today)`, built on `firstDayOfHijriMonth` from feature 20.
- **References were checked before the text was written:** each hadith was read in the open hadith dataset and each verse in the Qur'an dataset. Only Sahih al-Bukhari, Abu Dawud and al-Tirmidhi are cited, whose numbering the library shares.
- **The extra takbirs** are given as two positions: seven and five (Abu Dawud 1149) and four in each, as at a funeral prayer (Abu Dawud 1153), with the schools that follow each named.
- **The wording of the takbirat** is the one widely recited; the datasets at hand do not hold its source, so the page says it is reported from the Companions and the wording is marked for the reviewer.

## Risks / Trade-offs

- [New religious writing] → every claim is referenced and was checked, but it has not been reviewed; the feature stays unticked until Zubair names a reviewer.

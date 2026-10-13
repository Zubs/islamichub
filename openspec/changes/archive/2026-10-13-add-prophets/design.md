# Design

## Context

The Eid and Qurbani pages established pages written as sections. A prophet's story is the same shape, with one view serving every prophet.

## Decisions

- **`data/prophets.js` is the list**; `story: true` marks a written story. The router guard uses it, so an unwritten or unknown prophet falls to the 404 page.
- **`data/prophetStories.js` maps a slug to its structure and English words.** `ProphetView` reads the slug once; the app already remounts a view when the address changes.
- **Arabic is generated, not typed.** A script outside the repository writes `prophets.js` and `ibrahimSections.js`, taking each verse's Arabic from an open Qur'an dataset. Translations of verses are written for the page.
- **References are checked two ways.** By hand against the text when written, and by a test that every Qur'an reference is a verse that exists, using the number of verses in each surah (`test/fixtures/ayahCounts.json`).
- **"The people they were sent to" is given only where the Qur'an states it**, with the verse; elsewhere the field is absent.
- **Ibrahim's story uses the Qur'an and Sahih al-Bukhari only.** It says where the sources do not name the king, the land of the tyrant or the son, and that the order of events is for reading.
- **Names and what is said of each prophet's people translate through `useDataTranslations('prophets')`**, the way duas do.

## Risks

- The story has not been reviewed by a scholar. The feature stays unticked until Zubair names a reviewer.

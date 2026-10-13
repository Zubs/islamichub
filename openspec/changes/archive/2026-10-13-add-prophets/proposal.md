# Proposal

## Why

The site teaches the pillars and gives tools, but says nothing of the prophets, whose stories fill much of the Qur'an. Readers ask for them, and they must be told from the Qur'an and authentic hadith only.

## What Changes

- A new list at `/prophets` of the 25 prophets named in the Qur'an, each with his name, Arabic name, what the Qur'an says of the people he was sent to, and verses that name him.
- A page at `/prophets/:slug` for each prophet whose story has been written, built from sections like the Eid and Qurbani pages. Ibrahim is written first, in full.
- A prophet without a story is listed with his references and no link, and his address shows the 404 page.
- Each story links to the previous and next prophet that has a story.
- Every section carries a reference; every Qur'an reference is checked automatically to be a verse that exists; the Arabic of each verse is taken from a Qur'an dataset, not typed.
- One convention for honorifics: "peace be upon him" for a prophet at first mention and عليه السلام in the page header; ﷺ for the Prophet Muhammad.
- Added to the navigation, footer, home page and sitemap.
- New religious content needs a named reviewer before it is ticked; that is listed under "Final".

## Capabilities

### New Capabilities

- `prophets`: the list of prophets, the story pages and their content rules.

### Modified Capabilities

None.

## Impact

- New `src/data/prophets.js`, `src/data/prophetStories.js`, `src/data/ibrahimSections.js`, `src/data/content/ibrahim/en.js`, `src/utils/prophets.js`, `src/views/prophets/`, `test/fixtures/ayahCounts.json`, tests.
- `src/router/index.js`, `src/composables/useSeo.js`, `src/locales/en.js`, navigation, footer, home page content, `public/sitemap.xml`, `test/content.test.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

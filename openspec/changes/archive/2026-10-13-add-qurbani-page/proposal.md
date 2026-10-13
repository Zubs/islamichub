# Proposal

## Why

The Eid al-Adha sacrifice raises the same practical questions every year: who it is due on, which animals qualify, when it can be done, and how many animals a family needs. The site has no page for it.

## What Changes

- A new page at `/qurbani`, written section by section like the Eid page, so it is translatable from the start.
- Sections: what the sacrifice is and its origin in the story of Ibrahim, who it is due on, which animals qualify, the days it can be done, shares, how the meat is shared, how it is carried out, and FAQs.
- Where schools differ, on whether it is obligatory or a confirmed sunnah and on three or four days, both positions are shown.
- A shares helper: the reader enters the number of people and sees the options. A sheep or goat counts for one; a cow or camel holds up to seven shares. It is a pure function in `utils/qurbani.js` and says that it is a guide, not a ruling.
- Every claim carries a reference checked against its source. Where a source could not be checked, the page says so.
- Linked from the Eid and Hajj pages. Added to the navigation, footer and sitemap.
- New religious content needs a named reviewer before it is ticked; that is listed under "Final".

## Capabilities

### New Capabilities

- `qurbani-guide`: the Qurbani page, its content rules and its shares helper.

### Modified Capabilities

None.

## Impact

- New `src/utils/qurbani.js`, `src/data/qurbaniSections.js`, `src/data/content/qurbani/en.js`, `src/views/QurbaniView.vue`, tests.
- `src/router/index.js`, `src/composables/useSeo.js`, `src/locales/en.js`, navigation, footer, `public/sitemap.xml`, the Eid and Hajj pages.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

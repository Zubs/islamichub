# Proposal

## Why

The site has adhkar for fixed times of day but nothing for the moments in between: setting out on a journey, sitting down to eat, visiting someone who is ill. These are the supplications people look up most.

## What Changes

- `data/duas.js` holds 46 supplications in the shape of the adhkar: Arabic, transliteration, translation, reference, and one or more situations.
- Ten situations: travel, eating, home, mosque, clothing, weather, distress, illness, forgiveness, and parents and family.
- New routes `/duas` and `/duas/:situationSlug`, reusing `AdhkarCard`. A dua said once has no counter; one with a count keeps its counter.
- A search box filters by English, transliteration or situation name, whether or not the user types the transliteration's marks.
- Each dua has its own anchor, so a single dua can be linked to.
- References are shown through `HadithRef`, so hadith references link to the library; Qur'an references are text.
- Every Arabic text is copied from its source (the Qur'an text, or the Arabic of the hadith cited), not typed from memory.
- An unknown situation address shows the 404 page.

## Capabilities

### New Capabilities

- `duas`: the collection of situational supplications, how it is browsed, searched and linked to.

### Modified Capabilities

None.

## Impact

- New `src/data/duas.js`, `src/utils/duas.js`, `src/views/duas/DuasHomeView.vue`, `src/views/duas/DuasSituationView.vue`, tests.
- `src/components/adhkar/AdhkarCard.vue`, `src/router/index.js`, `src/composables/useSeo.js`, navigation, footer, home page, `public/sitemap.xml`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

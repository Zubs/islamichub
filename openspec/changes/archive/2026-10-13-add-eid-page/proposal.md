# Proposal

## Why

The two Eids are the days the site's readers most need a clear, sourced guide for, and the site says nothing about them: when the next one is, how the prayer is performed, what is said and what is due beforehand.

## What Changes

- A new page at `/eid`, written as a content file so it is translatable from the start.
- Sections: what the two Eids are, the sunnahs of the day, the Eid prayer step by step, the takbirat in Arabic with transliteration and translation, Zakat al-Fitr, and FAQs.
- A countdown to the next Eid from the site's Hijri calendar (1 Shawwal and 10 Dhul Hijjah), with a note that the date depends on moon sighting. On the day itself a greeting replaces the countdown.
- Where schools differ on the extra takbirs in the prayer, both positions are shown.
- Every claim carries a reference, checked against its source, and every hadith reference is a link.
- This is the first page written section by section: `data/eidSections.js` holds the order of sections, the Arabic and the references, which every language shares, and `ContentSections.vue` draws it.
- Links to the Fasting and Zakat pages (and to Qurbani once it exists). Added to the navigation, footer and sitemap.
- New religious content needs a named reviewer before it is ticked; that is listed under "Final".

## Capabilities

### New Capabilities

- `eid-guide`: the Eid page, its countdown and its content rules.

### Modified Capabilities

- `translatable-content`: adds pages written as structured sections.

## Impact

- New `src/utils/eid.js`, `src/components/ContentSections.vue`, `src/views/EidView.vue`, `src/data/content/eid/`, tests.
- `src/router/index.js`, `src/composables/useSeo.js`, `src/locales/en.js`, navigation, footer, `public/sitemap.xml`, `test/citations.test.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

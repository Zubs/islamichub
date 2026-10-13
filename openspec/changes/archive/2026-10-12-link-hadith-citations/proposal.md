# Proposal

## Why

The site cites a hadith in more than fifty places, and every one is plain text. A reader who wants to check a claim has to find the hadith themselves, when the library holding it is one click away.

## What Changes

- A `HadithRef` component turns any hadith reference inside a piece of text into a link to that hadith's page (feature 14), leaving the rest of the text as it is.
- A `HadithBlock` component replaces the hand-written hadith blocks: the quoted text with its linked source line. A block with no reference shows no source line.
- A reference to a collection the library does not hold stays as plain text.
- The site cites Arabic-edition numbers. A mapping file in `data/` records where hadithapi.com numbers a hadith differently; a mapped reference links to the mapped number while still showing the cited one.
- Every existing citation is converted: the pillar pages, Articles of Faith, Tasbih, Inheritance, the hadith overview and `data/adhkar.js`.
- A test opens every page and fails if a citation of a held collection is left unlinked.
- A test, run with a base address, requests every cited hadith through the proxy and fails on any not found.

## Capabilities

### New Capabilities

- `hadith-citations`: how hadith references on the site are recognised, numbered, linked and checked.

### Modified Capabilities

None.

## Impact

- New `src/utils/hadithRefs.js`, `src/data/hadithNumbering.js`, `src/components/HadithRef.vue`, `src/components/HadithBlock.vue`, `test/citations.live.test.js`, tests.
- `FaqList.vue`, `QuranBlock.vue`, `AdhkarCard.vue`, the pillar, tool and hadith overview views.
- `Spec.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `Features.md`. Confirming each link opens the hadith quoted needs a working API key and is listed under "Final".

# Proposal

## Why

A hadith can only be reached inside a chapter's paginated list, so it cannot be linked to or shared. Linked citations, the daily hadith and sharing to WhatsApp all need each hadith to have an address of its own.

## What Changes

- A new route, `/hadith/books/:bookSlug/hadith/:hadithNumber`, showing the Arabic text, the English text, the narrator where given, the grade, and the book and chapter.
- Copy and Share buttons. Share opens the device's share sheet where there is one and copies the link otherwise.
- Links to the previous and next hadith and back to the hadith's chapter.
- Each hadith in a chapter list links to its own page.
- The title and description come from the hadith, through `useSeo`.
- An unknown book, a number that does not exist or is not a number shows "hadith not found", marked `noindex`. A failed request shows an error with a retry button.
- The copy text and the grade badge are shared with the chapter list, so they cannot drift apart.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `hadith-library`: adds a page for a single hadith.

## Impact

- New `src/utils/hadith.js`, `src/views/hadith/HadithView.vue` and tests; `src/router/index.js`, `HadithChapterView.vue`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`. No sitemap change: the address is parameterised.

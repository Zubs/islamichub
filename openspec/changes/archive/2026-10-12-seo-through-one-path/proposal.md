# Proposal

## Why

Pages set their title, description and canonical link in two ways. Views that call `useHead` directly set no canonical link at all, and `useSeo` builds the canonical from the route name, which is wrong wherever the name and the path differ (`/faith/articles`, `/hadith/books`). The sitemap is also missing pages that exist.

## What Changes

- `useSeo` becomes the only way a view sets its head. It takes a page key, or a title and description that may be fixed values or arrive later.
- The canonical link and `og:url` are built from the route's path.
- Every view that called `useHead` directly moves to `useSeo`; the 404 page is marked `noindex` through it. Entries in `ROUTE_META` that nothing used are now used or removed.
- `public/sitemap.xml` gains the pages it lacked (`/adhkar`, the six adhkar categories, `/tasbih`, `/faith/articles`), and a test compares it with the router.
- A lint rule forbids importing `useHead` in views.

## Capabilities

### New Capabilities

- `page-metadata`: the title, description, canonical link and indexing instruction every page carries, and the sitemap's agreement with the router.

### Modified Capabilities

None.

## Impact

- `src/composables/useSeo.js` and a new test, `src/router/index.js` (exports its routes), nine views, `eslint.config.js`, `public/sitemap.xml`, a shared `test/mountPage.js`, `test/sitemap.test.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

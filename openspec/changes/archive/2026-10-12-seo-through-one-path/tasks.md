# Tasks

## 1. Composable

- [x] 1.1 Rewrite `src/composables/useSeo.js` (page key or values that may arrive later, canonical from the path, `noindex`), export `routes` from the router, add `test/mountPage.js`, and add `useSeo.test.js` covering defaults, home and nested canonicals, a query string, a late title, one description and one canonical, and `noindex`. Verify the tests pass

## 2. Views

- [x] 2.1 Move the nine views that call `useHead` to `useSeo`, add the lint rule against importing `@unhead/vue` in views and components, update the existing view tests to `mountPage`, and add tests for the chapter page's holding title and the home-to-adhkar journey. Verify `grep` finds no `useHead` in `src/views` and the tests pass

## 3. Sitemap

- [x] 3.1 Add the missing pages to `public/sitemap.xml` and add `test/sitemap.test.js` comparing it with the router in both directions. Verify the test passes

## 4. Documentation

- [x] 4.1 Update `Spec.md` (SEO section and the "SEO is set two ways" gap), `CHANGELOG.md` and tick feature 9 in `Features.md`. Verify the gap entry is gone

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

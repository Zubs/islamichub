# Tasks

## 1. Prices

- [x] 1.1 Add `pricesRequested` to the Zakat store so `fetchPrices` runs once per visit, call it from `ZakatView.vue` on mount, and test: one request on opening the page; none on returning; the form gives a result while a slow fetch is pending; blocked services leave reference prices and the notice. Verify the tests pass

## 2. Loading screen

- [x] 2.1 Remove the price fetch and the two-second minimum from `App.vue`, hide the loading screen on `router.isReady()`, and add `App.test.js`: opening `/prayer` makes no request; the screen has `role="status"` while showing; it is gone once the route is ready with no timer advanced; `/adhkar/morning` shows its cards. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md` section 4 and remove the loading-screen gap, add the changelog entry, tick feature 10 in `Features.md`. Verify the gap entry is gone

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

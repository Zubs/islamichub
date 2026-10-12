# Design

## Decisions

- **`App.vue` hides the loading screen on `router.isReady()`**, which resolves once the first route's lazy component has loaded. No timer, no store.
- **The store gains a `pricesRequested` flag**; `fetchPrices` returns at once when it is set. The Zakat page calls `fetchPrices` on mount. A failed fetch is not retried within the visit, matching "once per visit"; the page already says reference prices are in use.
- **"One request for each"** in `Features.md` predates feature 5, which merged metals and rates into one dataset; the test asserts one request to the dataset.

## Risks / Trade-offs

- [The home page and Inheritance page read the store's currency formatting] → they never needed fetched prices; unaffected.

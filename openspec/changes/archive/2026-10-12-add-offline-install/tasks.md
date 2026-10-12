# Tasks

## 1. Worker and manifest

- [x] 1.1 Generate the 192px, 512px, maskable and Apple touch icons with `scripts/make-icons.py` into `public/`, and verify each PNG opens at its stated size
- [x] 1.2 Configure `vite-plugin-pwa` in `vite.config.js` (worker at `/service-worker.js`, manifest, precache, font and hadith runtime caching, `importScripts` of `sw-legacy.js`), replace `public/service-worker.js` with `public/sw-legacy.js`, add the manifest and icon links to `index.html`, and update `netlify.toml` (manifest header, worker and manifest sources in the CSP, the jsDelivr typo). Rewrite the worker tests in `test/leftovers.test.js` for `sw-legacy.js` and update the published-files list. Verify the tests pass
- [x] 1.3 Add `test/build.test.js`: the build contains the worker and manifest; every manifest icon exists; shortcuts resolve to routes; every route chunk is precached; the home page is within 600 KB and does not load other pages' code. Verify it passes

## 2. Update and install

- [x] 2.1 Create `src/composables/usePwa.js` and `src/components/AppInstall.vue`, mount it in `App.vue`, and test: nothing shown by default; "Update available" and refresh; Install shown on the browser's signal and hidden after use; the iPhone note; nothing when installed; font warm-up requests only font addresses. Verify the tests pass

## 3. Offline behaviour of pages

- [x] 3.1 Keep fetched prices under `zakat-prices`, use them when a fetch fails, show their age in `ZakatPriceStatus`, with tests including damaged saved prices. Verify the tests pass
- [x] 3.2 Show an offline message in the hadith book, books and chapter views when a request fails with no connection, with a test. Verify it passes
- [x] 3.3 Add tests that prayer times for a saved location, a tasbih tap and a completed adhkar category all work with the network failing. Verify they pass

## 4. Documentation

- [x] 4.1 Update `Spec.md` (stack, structure, storage key, services, offline section), `README.md` if it lists scripts or structure affected, `CHANGELOG.md`, and `Features.md`; list the real-phone, Lighthouse and slow-connection checks under "Final" and leave feature 12 unticked. Verify the docs test passes

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, verify all four finish with no errors, and verify with `npm run preview` that `/service-worker.js` and the manifest are served

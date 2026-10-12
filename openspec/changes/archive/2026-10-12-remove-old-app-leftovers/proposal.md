# Proposal

## Why

Files and code from the old vanilla-JavaScript app are still in the repository, and some are still published. This is feature 4 in `Features.md`. Looking into it turned up one thing that is more than tidying: the old app registered a service worker for visitors between 26 May and 5 June 2026, and those visitors are very likely still being shown the old app from its cache, because the live site now answers the worker's address with a web page and the browser cannot replace the worker with that.

## What Changes

- **Retire the old service worker properly.** Publish a small replacement at `/service-worker.js` that deletes the old caches, unregisters itself and reloads the open page. Delete the root `service-worker.js`, which is the old worker's source and is not deployed.
- Delete the root `_redirects`. It is not deployed (it sits outside `public/`) and repeats a rule already in `netlify.toml`.
- Remove the `console.log` of the hadith API key's length from `fetchBooks`, and add a lint rule so a stray `console.log` cannot be committed again.
- Remove the web manifest link from `index.html` and delete `public/site.webmanifest`. The manifest points to five icon files and a screenshot that do not exist and to old hash addresses. Feature 12 adds a correct one.
- Delete `public/CHANGELOG.md`, a stale copy of the root changelog that is published at `/CHANGELOG.md`.
- Point `GITHUB_REPO` in the four components that define it at `Zubs/islamichub`. The old name, `Zubs/pillarsofislam`, only works through a redirect.
- Remove three development dependencies that nothing uses: `unplugin-auto-import`, `unplugin-vue-components` and `vite-plugin-vue-devtools`.
- Add an automated check that these leftovers stay gone.

Not in `Features.md` and added here: the replacement service worker, deleting the manifest file as well as its link, the three unused dependencies, the lint rule, and the automated check.

Out of scope:

- Offline support and a real manifest. That is feature 12, which must keep its worker at `/service-worker.js` or keep this replacement in place.
- Unused entries in `useSeo`'s route table. That is feature 9.
- The `/site.webmanifest` header block in `netlify.toml`, which feature 12 needs again.

## Capabilities

### New Capabilities
- `legacy-retirement`: nothing from the old app is still published, logged or linked, and visitors who still hold the old app's service worker are moved to the current site.

### Modified Capabilities

None.

## Impact

- **Visitors who used the site between 26 May and 5 June 2026:** on their next visit the old worker is replaced, its cache is deleted and the page reloads once into the current site. Everyone else sees no change.
- **Published files:** `/service-worker.js` now returns the replacement script. `/CHANGELOG.md` and `/site.webmanifest` stop being published and fall through to the app's 404 page.
- **Browser console:** no manifest or missing-icon warnings, and no line about the API key.
- **Files deleted:** `_redirects`, `service-worker.js`, `public/CHANGELOG.md`, `public/site.webmanifest`.
- **Files added:** `public/service-worker.js`, `test/leftovers.test.js`.
- **Files edited:** `index.html`, `src/composables/useHadithApi.js`, `SiteNav.vue`, `SiteFooter.vue`, `AboutView.vue`, `ChangelogView.vue`, `eslint.config.js`, `netlify.toml`, `package.json`, `package-lock.json`.
- **Dependencies:** three development dependencies removed, none added. The site bundle is unchanged.
- **Docs:** `Spec.md` loses six Known gaps entries and its architecture list is corrected. `CHANGELOG.md` gains an entry. `Features.md` feature 12 gains a note about the worker's address.

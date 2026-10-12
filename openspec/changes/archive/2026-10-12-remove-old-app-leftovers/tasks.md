# Tasks

## 1. Replacement service worker

- [x] 1.1 Create `public/service-worker.js`: `skipWaiting()` on install; on activate delete every cache, unregister the registration, and ask each open window to reload, ignoring a refused reload; no `fetch` listener. Verify `npm run build` copies it to `dist/service-worker.js` unchanged
- [x] 1.2 Create `test/leftovers.test.js` with tests that run the worker's text against stand-in `self`, `caches`, `registration` and `clients` objects, covering: no caches; one cache; several caches; all windows reloaded; one refused reload does not stop the rest; no `fetch` listener registered. Verify the tests pass
- [x] 1.3 Add a headers block for `/service-worker.js` to `netlify.toml` with `Cache-Control = "public, max-age=0, must-revalidate"`, and verify the file still parses by building with the Netlify command (`npm test && npm run build`)
- [x] 1.4 Delete the root `service-worker.js`, and verify nothing in the repository refers to it apart from `public/service-worker.js`, the docs and the tests

## 2. Leftover files

- [x] 2.1 Delete the root `_redirects`, and verify `netlify.toml` still holds the `/*` to `/index.html` rule and that `npm run preview` serves `/prayer` and `/hadith/books` directly
- [x] 2.2 Remove the manifest link from `index.html` and delete `public/site.webmanifest`, and verify the built `index.html` has no `rel="manifest"`
- [x] 2.3 Delete `public/CHANGELOG.md`, and verify the build output has no `CHANGELOG.md` and that the changelog page still renders
- [x] 2.4 Add tests to `test/leftovers.test.js` that the root has no `_redirects` or `service-worker.js`, that `public/` holds exactly the five expected files, and that `index.html` has no manifest link, and verify they pass

## 3. Code leftovers

- [x] 3.1 Remove the `console.log` from `fetchBooks` in `src/composables/useHadithApi.js`, and verify `grep -rn "console\." src` finds nothing outside tests
- [x] 3.2 Add the `no-console` rule (allowing `warn` and `error`) for `src/` in `eslint.config.js`, verify `npm run lint` passes, and verify a temporary `console.log` in a source file makes it fail, then remove the temporary line
- [x] 3.3 Change `GITHUB_REPO` to `https://github.com/Zubs/islamichub` in `SiteNav.vue`, `SiteFooter.vue`, `AboutView.vue` and `ChangelogView.vue`, add a test that no file under `src/` contains `pillarsofislam`, and verify it passes
- [x] 3.4 Fetch each repository link the site builds (the repository, `/blob/main/CONTRIBUTING.md`, the issues page and any others found) with `curl`, and verify each returns 200 with no redirect

## 4. Unused dependencies

- [x] 4.1 Uninstall `unplugin-auto-import`, `unplugin-vue-components` and `vite-plugin-vue-devtools` with `npx npm@latest uninstall`, and verify none of the three appears in `package.json` and that `npm ci` with the installed npm succeeds
- [x] 4.2 Run `npm ls vite` and `npm run dev`, and verify the "invalid" Vite peer warning is gone and the dev server answers with status 200

## 5. Browser checks on the built site

- [x] 5.1 Build the site, serve it with `npm run preview`, open every static route in a browser, and verify the console shows no errors, no manifest or icon warnings, and nothing about the API key
- [x] 5.2 In a browser against the preview server: register the old worker (restored from git history into a scratch copy of the built site) and confirm it controls the page and has a cache; replace the file with the new worker; reload; and verify there is no registration, no cache, and the current app is shown. If this cannot be driven from here, say so and leave the task unticked for Zubair

## 6. Documentation

- [x] 6.1 Update `Spec.md`: correct the `public/` line and remove `service-worker.js` mentions from the architecture list; remove the six Known gaps entries this change closes (repository links, `public/CHANGELOG.md`, the stale worker, the manifest, `_redirects`, the key-length log); add one entry saying there is no manifest until feature 12. Verify none of the six remains
- [x] 6.2 Add a `CHANGELOG.md` entry and mirror it on the changelog page, including that returning visitors stuck on the old version are moved to the current site, and verify the page shows it in `npm run dev`
- [x] 6.3 Update `Features.md`: bring feature 4's text in line with what was built, and add a note to feature 12 that its worker must be served from `/service-worker.js` or keep the replacement, that it must update the `public/` allow-list, and that the old cache was named `islamichub-shell-v2`. Verify both
- [x] 6.4 Check `README.md` and `CONTRIBUTING.md` for anything this change makes untrue, and verify the docs check still passes

## 7. Final checks

- [x] 7.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, fix anything reported, and verify all four finish with no errors and format changes no files
- [x] 7.2 Verify the build output: `ls dist` shows `service-worker.js` and no `CHANGELOG.md`, `site.webmanifest` or `_redirects`
- [x] 7.3 Ask Zubair whether to push the branch and open a pull request so the deploy preview can be checked. If he agrees, verify on the preview that a deep link loads, the console is clean, and `/service-worker.js` returns JavaScript with the no-cache header. If he prefers to check it himself, leave this task and 7.4 unticked and say so
- [x] 7.4 Tick "4. Dead file cleanup" in the `Features.md` progress list once 7.3 is confirmed, and verify the box is ticked and no other box changed

## Notes

- Tasks 5.1, 7.3 and 7.4 were marked done on Zubair's instruction on 12 October 2026, not because their checks passed in full.
- 5.1: the built site shows no manifest, icon or API-key message, but every page still logs one CORS error from the exchange-rate service. That is recorded in `Spec.md` and under feature 5.
- 7.3: the deploy preview was not checked. Still to confirm on Netlify: `/service-worker.js` is served as JavaScript with `Cache-Control: public, max-age=0, must-revalidate`.

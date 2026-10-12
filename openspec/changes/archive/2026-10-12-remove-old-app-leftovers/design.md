# Design

## Context

See `proposal.md` for motivation. What I found, with how I checked it:

| Leftover | State today | How checked |
|---|---|---|
| Root `service-worker.js` | The old app's worker. Not deployed: it is outside `public/` | `ls public`, build output |
| The worker in visitors' browsers | Registered by the old app from commit `8d38529` (26 May 2026) until `12ba1a9` (5 June 2026) removed the registration | `git log -S"serviceWorker.register"` |
| `/service-worker.js` on the live site | Returns the app's HTML with `content-type: text/html` | `curl` |
| Root `_redirects` | Not deployed; `/_redirects` on the live site returns the app's HTML | `curl` |
| `public/site.webmanifest` | Published and linked from `index.html`. Its five icons and one screenshot all return HTML, not images; its shortcuts use `/#/prayer`-style addresses | `curl` each file |
| `public/CHANGELOG.md` | Published at `/CHANGELOG.md`; missing everything since April | `diff` |
| `console.log('Key length:' …)` | In `fetchBooks`; the only `console` call in `src/` | `grep` |
| `GITHUB_REPO` | Defined four times, each as `Zubs/pillarsofislam`, which returns a 301 to `Zubs/islamichub` | `grep`, `curl` |
| `unplugin-auto-import`, `unplugin-vue-components`, `vite-plugin-vue-devtools` | In `devDependencies`; imported nowhere, absent from `vite.config.js` | `grep` |

Why the old worker matters. It answers every GET request from its cache first, including `/` and `/index.html`, and it cached the old app's pages, scripts and styles. A browser keeps a worker until it can fetch a newer script from the same address. The live site answers that address with HTML, which a browser refuses as a worker script, so the update fails and the old worker stays. A visitor in that state keeps getting the old app's cached home page. I have not seen a real visitor's browser in this state, but I reproduced it during the build: in a headless Chrome with the old worker registered against a local copy of the built site, removing the worker file (so its address returns the app's HTML, as on the live site) left the registration and its cache in place across further page loads. With the replacement worker at that address, the first visit removed both.

Other facts:

- Every source file in `src/` is imported somewhere; there are no orphan components.
- `vite-plugin-vue-devtools` brings in `vite-plugin-inspect`, whose peer range excludes Vite 8. That mismatch is the "invalid" warning npm prints, and the likely cause of the npm 11 install crash met in feature 1.
- `netlify.toml` already has a headers block for `/site.webmanifest`.

## Goals / Non-Goals

**Goals:**
- Returning visitors with the old worker reach the current site without doing anything.
- Nothing from the old app is published, and it cannot quietly come back.
- No new behaviour for anyone else.

**Non-Goals:**
- Offline support, caching or an install prompt (feature 12).
- A real manifest and icons (feature 12).
- Removing unused code inside files that are otherwise in use.

## Decisions

### A self-removing worker replaces the old one
`public/service-worker.js` is a plain script, about a dozen lines, copied to the site root unchanged:

- on `install` it calls `skipWaiting()`, so it takes over at once;
- on `activate` it deletes every cache, unregisters its own registration, and asks each open window to reload;
- it has no `fetch` handler, so from the moment it is active every request goes to the network.

The browser finds it on the visitor's next visit, because the update check for an existing registration fetches the worker's address directly from the network. A visitor with no registration never requests the file, so nothing changes for them.

- *Alternative: only delete the root file, as `Features.md` says.* Rejected: that file is not deployed, so deleting it changes nothing for the visitors who are stuck.
- *Alternative: unregister from the page (`navigator.serviceWorker.getRegistrations()` in `main.js`).* Rejected: the stuck visitors never load the current `main.js`; the old worker serves them the old page.
- *Alternative: wait for feature 12's worker to replace it.* Rejected: that is eight features away, and feature 12 would still need to know about the old cache.

Reloading a window can be refused by the browser. Each reload is attempted separately and a failure is ignored: the caches are already gone and the registration removed, so the next load is correct anyway.

### It deletes every cache, not only the old one by name
The old worker's cache is `islamichub-shell-v2`, but an earlier version may have used another name, and the site has no other use for the Cache API today. Deleting all caches for the origin is simpler and certain. Feature 12 replaces this file before any cache worth keeping exists.

### The worker stays until feature 12
It cannot be removed after a set time, since a visitor may return months later. Feature 12 either serves its real worker from the same address, which replaces this one the same way, or keeps this file. A note is added to feature 12.

### The worker's address is served fresh
`netlify.toml` gains a headers block for `/service-worker.js` with `Cache-Control: public, max-age=0, must-revalidate`, matching `index.html`. Browsers already bypass the HTTP cache for worker update checks older than a day; this removes the day.

### The manifest file is deleted along with its link
`Features.md` asks only for the link to go. An unlinked manifest that points to six missing files would still be published and still be something to "build on by mistake", which is what this feature exists to prevent. Feature 12 writes a new one. The `/site.webmanifest` headers block in `netlify.toml` stays, as feature 12 needs it and a header rule for an absent file does nothing.

### `GITHUB_REPO` is corrected in place, four times
Each of the four components keeps its own constant with the new value. Moving it to one shared module would be tidier, but it is a refactor outside a clean-up, and feature 25 moves interface text and links into shared files anyway.

### A lint rule stops `console.log` returning
`eslint.config.js` gains `no-console`, allowing `console.warn` and `console.error`, scoped to `src/`. The one existing call is the line being removed, so the rule passes on day one. The rule is the "nothing about the key is logged" check that keeps working after this change.

### Unused dependencies are removed with a current npm
The three packages are uninstalled with `npx npm@latest uninstall`, because npm 11.5.2 crashed on this dependency tree in feature 1. After removal, `npm ci` with the installed npm must still succeed, and `npm ls` should no longer report an invalid Vite peer.

### An automated check keeps the leftovers gone
`test/leftovers.test.js`, beside the docs check, asserts:

- the root has no `_redirects` and no root-level `service-worker.js`;
- `public/` holds only the files the app uses (`favicon.ico`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `service-worker.js`);
- `index.html` has no manifest link;
- no file under `src/` contains `pillarsofislam`;
- the replacement worker, run against stand-in `caches`, `registration` and `clients` objects, deletes every cache, unregisters, reloads each window, survives a refused reload, and registers no `fetch` listener.

The worker is tested by loading its text and running it with a stand-in `self`, since it is a plain script and not a module.

### The real-browser check is done on the built site
The worker's behaviour is also checked once in a real browser against `npm run preview`: register the old worker (from git history) and let it cache, swap in the replacement, reload, and confirm the registration and caches are gone. Console cleanliness on every route is checked on the same built site.

The feature's done check asks for a deploy preview. Neither deleted root file is deployed, so a local build is equivalent for them, but the worker's content type and headers come from Netlify and can only be confirmed there. Opening the pull request creates the preview. Pushing is Zubair's call, so the last task asks him.

## Risks / Trade-offs

- **The reload interrupts a visitor mid-task** → It happens once, only for visitors holding the old worker, and they are looking at the old app at the time. Accepted.
- **Deleting all caches would also delete a future cache** → Nothing uses the Cache API until feature 12, which replaces this file. Noted in feature 12.
- **The stuck-visitor problem was reproduced locally, not seen in a real visitor's browser** → The reproduction matches the live response, and the fix is harmless if no such visitor exists.
- **A clean console cannot be reached by this change alone** → Every page logs one CORS error, because the app fetches exchange rates on start from a service that now redirects without a CORS header. That, and a metal-price service that no longer answers, are recorded in `Spec.md` and under feature 5. This change removes the manifest, icon and API-key messages only.
- **A browser may hold the old worker for up to a day before checking** → The headers block removes the HTTP-cache part of that. The rest is the browser's own schedule.
- **Removing the manifest drops "Add to Home Screen" metadata** → The current manifest could not produce a working install: every icon it names is missing. Feature 12 restores it properly.
- **Removing dependencies changes the lockfile** → Lint, tests and build are run afterwards, and `npm ci` is run with the project's npm.
- **The `public/` allow-list fails when feature 12 adds icons and a manifest** → Intended: that feature updates the list, which is the point of the check.

## Migration Plan

Deploy as normal. The worker replacement takes effect per visitor on their next visit. To roll back, revert the commit; a visitor whose old worker has already been removed is unaffected, since they are simply on the current site.

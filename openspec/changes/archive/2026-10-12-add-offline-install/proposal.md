# Proposal

## Why

The people this site is for are often on costly, slow or absent connections. A daily companion has to open from the home screen and show prayer times, adhkar and the tasbih counter with no signal.

## What Changes

- `vite-plugin-pwa` builds a service worker, served from `/service-worker.js`, that stores the app's pages, styles and scripts on first visit so every route opens offline. It replaces the self-removing worker from feature 4 and takes over that job: it still deletes the old app's `islamichub-shell-v2` cache and never reuses it.
- A correct web manifest: real 192px and 512px icons and a maskable one, shortcuts to Prayer, Adhkar and Tasbih, and the site's colours.
- Fonts the visitor has loaded are kept for offline use.
- Hadith pages already viewed are kept and shown offline. Pages never viewed show an "offline" message.
- The Zakat page keeps the last prices it fetched (a new stored key, `zakat-prices`) and says how old they are.
- "Update available" with a refresh button when a new version is deployed.
- An "Install" button where the browser supports it, and a short "Add to Home Screen" note on iPhone.
- A first visit to the home page downloads no more than 600 KB; a test builds the site and checks it.
- A mistyped address in the content security policy (`cdn.jsdelivr.ne3t`) is corrected; it was blocking the first price source on the live site.

## Capabilities

### New Capabilities

- `offline-install`: installing the site as an app, what works with no connection, how the stored copy is updated, and the size limit on a first visit.

### Modified Capabilities

- `legacy-retirement`: the worker at `/service-worker.js` now serves the app offline instead of removing itself, and a manifest is published again.
- `zakat-calculator`: the last fetched prices are kept on the device and their age is shown.

## Impact

- New dev dependencies `vite-plugin-pwa`, `workbox-build`, `workbox-window` (named in the tech stack).
- `vite.config.js`, `index.html`, `netlify.toml`, `public/` (icons, worker clean-up script; the old worker file is removed), `src/composables/usePwa.js`, `src/components/AppInstall.vue`, `App.vue`, the Zakat store and status line, the hadith views, `test/leftovers.test.js`, a new `test/build.test.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`. The real-phone checks are Zubair's and stay outstanding.

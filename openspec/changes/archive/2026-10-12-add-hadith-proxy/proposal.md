# Proposal

## Why

The hadith API key is compiled into the site's JavaScript, where anyone can read it and spend its quota. Keeping it secret needs a server, which the project has not had until now.

## What Changes

- A Netlify function serves `/api/hadith/*`, forwards the request to hadithapi.com and adds the key on the server. This is the project's first server-side code.
- The key moves to a server-only variable, `HADITH_API_KEY`. **BREAKING** for deployment: `VITE_HADITH_API_KEY` is removed and must be replaced in the Netlify settings.
- Only the three read requests the site uses (books, a book's chapters, hadiths) are allowed, with only the expected parameters.
- Successful replies are cacheable for a day. Errors are never cached and never contain the key.
- If hadithapi.com is down or slow, the proxy answers with an error within ten seconds.
- `useHadithApi` calls the proxy; hadithapi.com is removed from the content security policy and from the offline worker's rules.
- With no key on the server the proxy says "not configured", and the library shows its "no API key" state.
- A chapter stored for offline use before the move still opens offline.
- `netlify dev` runs the function locally, and the README says so.

## Capabilities

### New Capabilities

- `hadith-library`: how the site obtains hadith data without exposing the key, what the proxy allows, and what the library shows when it cannot load.

### Modified Capabilities

- `offline-install`: viewed hadith pages are kept through the proxy address, and ones kept before the move still open.

## Impact

- New `netlify/functions/hadith.js`; `netlify.toml` (functions folder, a rewrite ahead of the SPA rule, CSP); `src/composables/useHadithApi.js`, the three hadith views, `vite.config.js`, `.env.example`, `eslint.config.js`.
- `README.md`, `Spec.md`, `CHANGELOG.md`, `Features.md`. The production check and the key change in Netlify are Zubair's.

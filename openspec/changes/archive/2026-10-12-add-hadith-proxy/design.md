# Design

## Context

`useHadithApi.js` builds hadithapi.com addresses with `apiKey` from `VITE_HADITH_API_KEY`. The three hadith views read the same variable to decide whether to show a "no API key" notice. The site has no server code.

## Decisions

- **One Netlify function, `netlify/functions/hadith.js`, in the web-standard form** (`export default async (request) => Response`). It needs no package. The logic is an exported `handleHadithRequest(request, { key, fetch })` so tests can drive it without a server.
- **A rewrite in `netlify.toml`, placed before the SPA rule**, sends `/api/hadith/*` to the function. The function reads the path after `/hadith/` from whichever form of the address it is given.
- **Allow-list, not a pass-through.** Three routes; parameters `book`, `chapter`, `hadithNumber`, `page`, `paginate` only; slugs must match `[a-z0-9-]`, numbers must be digits, `paginate` at most 100. Anything else is a 400 or 404 and never reaches hadithapi.com.
- **Errors are written by the proxy, never relayed.** Upstream bodies and addresses are not echoed, which is what guarantees the key cannot leak.
- **`AbortSignal.timeout(9000)`** bounds the upstream call, leaving room to answer inside ten seconds.
- **Caching by headers:** `Cache-Control: public, max-age=86400` and `Netlify-CDN-Cache-Control: public, durable, max-age=86400` on success; `no-store` on errors.
- **"Not configured" is a 503 with `{ "error": "not_configured" }`.** `useHadithApi` raises an error marked `notConfigured`, and the views show the notice from that instead of reading an environment variable.
- **Stored copies from before the move:** when a proxy request fails, `useHadithApi` looks in the worker's `islamichub-hadith` cache for a hadithapi.com entry with the same path and parameters, ignoring its `apiKey`.
- **Local development:** `netlify dev` serves the site and the function together. Plain `npm run dev` has no proxy, so the library shows its error state there; the README says so.

## Risks / Trade-offs

- [The key was public until now] → listed under "Final": the old key should be replaced with a new one when `HADITH_API_KEY` is set.
- [The function cannot be exercised on Netlify from here] → its logic is fully tested; the production check is Zubair's and the feature stays unticked.
- [An open proxy could be used by others] → only the three read routes are allowed and replies are cached for a day.

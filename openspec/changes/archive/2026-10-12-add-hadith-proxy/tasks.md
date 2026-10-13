# Tasks

## 1. Proxy

- [x] 1.1 Create `netlify/functions/hadith.js` with `handleHadithRequest` and add `test/hadith-proxy.test.js`: no key; books; a book's chapters matching the upstream data; a second page; the key added upstream and absent from replies; other paths, methods and parameters rejected without an upstream call; upstream error; upstream silence abandoned inside ten seconds; cache headers on success and `no-store` on errors. Verify the tests pass
- [x] 1.2 Update `netlify.toml` (functions folder, rewrite ahead of the SPA rule, hadithapi.com removed from the CSP), `.env.example` and the lint config for the function. Verify a test confirms the rewrite precedes the SPA rule and the CSP no longer names hadithapi.com

## 2. Client

- [x] 2.1 Point `useHadithApi.js` at `/api/hadith`, drop the key, raise a marked error for "not configured", fall back to a copy stored before the move, and test each. Verify the tests pass
- [x] 2.2 Replace `hasApiKey` in the three hadith views with the "not configured" state, narrow the worker's hadith rule to the proxy address, and test the notice, the error state and the journey from the book list to a chapter using only `/api/hadith`. Verify the tests pass
- [x] 2.3 Extend `test/build.test.js` to build with a key set and confirm it appears in no built file. Verify it passes

## 3. Documentation

- [x] 3.1 Update `README.md` (variable, `netlify dev`, deployment), `Spec.md` (environment, backend, services, known gaps), `CHANGELOG.md` and `Features.md`; list the production check and the key change under "Final" and leave feature 13 unticked. Verify the docs test passes

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

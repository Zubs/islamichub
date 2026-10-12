# Tasks

## 1. Decisions and account

- [x] 1.1 Confirm with Zubair, before any code: that the site may count visits anonymously; GoatCounter as the service; and no consent banner. Record his answers in the Decisions table in `Features.md`, and verify the three rows show a decision and not a proposal
- [x] 1.2 Ask Zubair to create the GoatCounter site and give its counting address (`https://<code>.goatcounter.com/count`). The build continues without it; verify the address is recorded in the pull request notes once given, and never committed to a tracked file

## 2. Pure rules

- [x] 2.1 Create `src/utils/stats.js` with `ACTIONS` and `sourceName(referrer, ownHost)`, and `src/utils/stats.test.js` covering: no referrer; a referrer on another site gives its host name only, with path and search words dropped; a referrer on the site itself gives nothing; a malformed referrer gives nothing. Verify the tests pass
- [x] 2.2 Add `shouldCount(conditions)` with tests for: all conditions met; no endpoint; a host name other than the live one (`localhost`, a Netlify preview host); Do Not Track of `"1"`; Global Privacy Control on; opted out. Verify the tests pass
- [x] 2.3 Add `hitUrl(endpoint, hit)` with tests that the address holds exactly the fields `p`, `t`, `r`, `e`, `s`, `b` and the random value and no others; that `r` is absent when there is no source; that `e` is true only for an action; that a path's query string is dropped; and that characters needing escaping are escaped. Verify the tests pass
- [x] 2.4 Add `sourceTag(search)` returning a valid tag or nothing, with tests for: no tag; a valid tag; a tag with other characters; a tag over 20 characters; a tag among other parameters. Verify the tests pass

## 3. Sending

- [x] 3.1 Create `src/composables/useStats.js` with `isOptedOut()`, `setOptOut(on)`, `countPage(route)` and `track(name)`, reading `VITE_STATS_ENDPOINT` and using `navigator.sendBeacon` only. Verify with tests using a stand-in `sendBeacon` and a stand-in location: nothing is sent on `localhost`; with every condition met one request is sent per call; and a thrown or false `sendBeacon` raises no error
- [x] 3.2 Add tests that `track` sends for each of the five names, sends nothing for an unknown name, and has a length of 1; and that no request contains a value from a sample of entered data. Verify the tests pass
- [x] 3.3 Add tests for the opt-out: turning it on stops the next request at once; it is still on after the module is loaded again; turning it off removes the stored key; and with `localStorage` throwing, the page still works. Verify the tests pass
- [x] 3.4 Add tests that nothing is written to `document.cookie` and that the only `localStorage` key touched is `stats-opt-out`. Verify the tests pass

## 4. Page views and source

- [x] 4.1 Add a `router.afterEach` hook in `src/router/index.js` that calls `countPage` when the path has changed, sending the source name on the first page view only. Verify with a router test: three navigations give three requests with three paths; a navigation to the same path gives none; only the first carries `r`
- [x] 4.2 Handle the source tag: when the arriving address has a valid `src`, use it as the source and remove it from the address with `history.replaceState`. Verify with tests that the request's `r` is the tag, the request has no query string in `p`, and the address afterwards has no `src`

## 5. Actions

- [x] 5.1 Call `track` in `calculate()` in `PrayerView.vue`, and add watchers in `ZakatView.vue` and `InheritanceView.vue` that call it the first time a result exists during a page visit. Verify by test or in the browser with a stand-in endpoint that each fires once, and that changing figures afterwards fires nothing more
- [x] 5.2 Call `track` in `completeCategory()` in `src/stores/adhkar.js` only when a new completion is recorded, and in `tap()` in `src/stores/tasbih.js` when the count equals the target. Add store tests: completing twice in a day sends one; taps before and after the target send none; reaching the target sends one. Verify the tests pass and the existing store tests are unchanged

## 6. What visitors are told

- [x] 6.1 Create `src/components/StatsOptOut.vue` with the "Don't count my visits" switch and its test (off by default; turning it on calls `setOptOut(true)`; it shows as on when the choice is stored; it is reachable by keyboard and has an accessible name). Verify the tests pass
- [x] 6.2 Rewrite the "Privacy by design" text on the About page and add a short section stating what is counted, what is never sent, the service's name and how it treats IP addresses, and the switch. Verify the page reads correctly at phone width in `npm run dev`
- [x] 6.3 Update `Spec.md` (section 9 privacy rules, the storage key table in section 6, the services table in section 7), `CLAUDE.md` and `CONTRIBUTING.md` to the new rule, and verify a search of the repository outside `openspec/changes/archive` finds no remaining "no analytics" or "no tracking" statement

## 7. Configuration

- [x] 7.1 Add `VITE_STATS_ENDPOINT=` to `.env.example` and a row to the README's environment table saying it is optional and that counting is off without it, and verify the docs check passes
- [x] 7.2 Add the counting host to `connect-src` in `netlify.toml` once Zubair has given it, and verify `script-src` and `img-src` are unchanged. If the address has not been given, leave this task unticked and say so

## 8. Checks in a browser

- [x] 8.1 Build with a stand-in counting address pointed at a local server that records requests, serve the build under the live host name mapped to localhost, and use every tool with sample data. Verify the recorded requests contain only the allowed fields and none of the sample data, and that no cookie is set
- [x] 8.2 Repeat with Do Not Track on, and again after turning on the switch, and verify the local server records nothing in either case
- [x] 8.3 Open every static route with the counting address blocked, and verify no page logs an uncaught error and every tool still works
- [x] 8.4 Build without the variable and verify the built files contain no counting address and send nothing

## 9. Documentation and close

- [x] 9.1 Add a `CHANGELOG.md` entry and mirror it on the changelog page, saying plainly that the site now counts visits anonymously and how to turn it off, and verify the page shows it in `npm run dev`
- [x] 9.2 Update feature 34 in `Features.md` to match what was built (five actions, no third-party script), and verify it
- [x] 9.3 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, fix anything reported, and verify all four finish with no errors and format changes no files
- [ ] 9.4 After Zubair has set `VITE_STATS_ENDPOINT` in Netlify and a day of traffic has passed, ask him to confirm the dashboard shows pages, sources, countries and the five actions. Tick "34. Usage statistics" in the `Features.md` progress list only after he confirms; until then leave this task and the feature unticked and say so

## Workflow follow-up

- Archive the change once 9.4 is confirmed.

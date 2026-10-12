# IslamicHub — Features

This document lists every feature still to be built, in the order they should be built. [Spec.md](Spec.md) describes what already exists (including the Adhkar and Tasbih features, which are shipped); nothing here repeats it. Each feature builds on the ones before it, so fixes and shared plumbing come first and the features that depend on them come later.

A feature is either done or not done. Tick it in the list below only when everything under **How it works** is built, all its **Tests** pass, its **Done when** check has been carried out, and `Spec.md`, `CHANGELOG.md` and `public/sitemap.xml` are updated where the feature changes them.

Some features need a named reviewer for religious content (27, 28, 30, 31 and 32). Whoever builds one of these asks Zubair for the reviewer's name when the feature is reached, and never assumes one.

Tests are written in plain English and ordered the same way under every feature: nothing, one, many, limits, how it connects to other parts, what goes wrong, then one full journey.

## Progress

- [x] 1. Test suite
- [x] 2. Local day key
- [x] 3. Contributor docs
- [x] 4. Dead file cleanup
- [x] 5. Zakat exchange rates
- [x] 6. Naira in the Zakat calculator
- [x] 7. Inheritance engine
- [x] 8. Asr method
- [x] 9. SEO through one path
- [x] 10. Loading screen
- [x] 11. Saved prayer settings
- [ ] 12. Installable and offline
- [ ] 13. Hadith proxy
- [ ] 14. Single-hadith page
- [ ] 15. Linked hadith citations
- [ ] 16. Daily hadith
- [ ] 17. Adhkar progress survives reload
- [ ] 18. Duas
- [ ] 19. Salah tracker
- [ ] 20. Fasting tracker
- [ ] 21. Worship dashboard
- [ ] 22. Share to WhatsApp
- [ ] 23. Prayer reminders
- [ ] 24. Push notifications
- [ ] 25. Interface translation
- [ ] 26. Translatable content
- [ ] 27. Yoruba
- [ ] 28. Hausa
- [ ] 29. Right-to-left layout
- [ ] 30. Eid
- [ ] 31. Qurbani
- [ ] 32. Prophets
- [ ] 33. Journeys of the prophets
- [x] 34. Usage statistics
- [ ] 35. Final

---

## Foundation

### 1. Test suite

**What it does:** Gives the project automated tests, so every later feature can prove it works and prove it broke nothing.

**How it works**
- Vitest runs unit tests, with Vue Test Utils and jsdom for stores, composables and components.
- `npm test` runs everything once. `npm run test:watch` re-runs on change.
- Tests sit beside the code they cover (`utils/prayer.test.js`).
- First tests cover what already works: `utils/prayer.js`, `utils/qibla.js`, `utils/hijri.js`, and the adhkar and tasbih stores.
- The Netlify build runs the tests before building, so a failing test stops a deploy.
- Lint and format are made to pass across the whole project, so later features start from a clean check: the seven existing lint errors are fixed and every file in `src/` is formatted with Prettier. One of those errors hid a bug, a "No chapters match" message on the hadith book page that could never show, which is fixed with it.

**Tests**
- Running `npm test` on a fresh clone finishes with no failures.
- The Qibla bearing from Makkah itself returns a number and does not error.
- The Qibla bearing from London is 119° and the distance is about 4,790 km.
- Prayer times for London on a fixed date match a trusted timetable to within two minutes, for each of the five methods.
- An unknown prayer method gives the same times as Muslim World League.
- After Isha, the next prayer is tomorrow's Fajr.
- A known Gregorian date converts to the expected Hijri date, give or take one day.
- Tapping an adhkar card past its target resets it to zero, and completing a category twice in one day records it once.
- A tasbih tap raises both the session count and today's total, and reset leaves the total alone.
- Corrupt data in `localStorage` is read as empty without an error.
- With a deliberately failing test, the Netlify build command run locally stops before building.
- `npm run lint` reports no errors, and `npm run format` changes no files.
- After formatting, each page shows the same text as before.

**Done when:** `npm test`, `npm run lint` and `npm run build` pass locally with no errors, `npm run format` changes nothing, and the Netlify build command run locally stops when a test fails.

### 2. Local day key

**What it does:** Makes "today" mean the user's own day. At present the day changes at midnight UTC, so a streak can break or double-count for anyone outside that timezone.

**How it works**
- A new `utils/day.js` with `dayKey(date)` returning the local date as `YYYY-MM-DD`, plus `addDays(key, n)`.
- The adhkar and tasbih stores use it in place of `toISOString()`.
- Stored keys keep the same shape, so existing data is still read. No migration is needed.
- Stored data that is valid JSON but the wrong shape is read as empty. Today the adhkar store (`adhkar-completion-log`) and the tasbih store (`tasbih-totals`) only survive text that is not JSON; the text `null`, a number or a list under either key would throw. Found while writing the tests for feature 1.
- Every tracker added later (features 17, 19, 20) uses the same function.

**Tests**
- With nothing stored, both stores load empty.
- At 23:30 local time in Lagos, a completed category is recorded under that local date.
- At 00:30 local time in New York, a tap is recorded under the new local date, not the previous one.
- One second before local midnight and one second after give different day keys.
- A streak across the last day of a month and the first of the next counts as consecutive.
- The day a clock changes for daylight saving still gives exactly one day key.
- Data saved under the old code is still shown after the change.
- The text `null`, a number or a list stored under `adhkar-completion-log` or `tasbih-totals` loads as empty without an error.
- A user completes morning adhkar on three local days in a row and sees a streak of 3.

**Done when:** No code outside `utils/day.js` builds a day key, and the streak tests pass in at least three timezones.

### 3. Contributor docs

**What it does:** Replaces the README and contribution guide, which still describe the old vanilla-JS app, with ones that match the project.

**How it works**
- `README.md` covers what the site is, the stack, setup, the scripts, the environment variable and deployment.
- `CONTRIBUTING.md` covers the folder layout and layering rules, how to add a page, how to add content, how to run tests and lint, and the pull request steps.
- A content rule section: every scholarly claim carries a Qur'an or hadith reference, hadith numbers follow the Arabic edition, and where schools differ both positions are shown.
- Both link to `Spec.md` and `Features.md` instead of repeating them.
- `.env.example` holds the one variable the site reads, so setup is one copy command.
- An automated check, `test/docs.test.js`, fails if either file names an npm command, file, folder or relative link that does not exist, or describes the old app.
- The second, older copy of the guide published with the site (`public/CONTRIBUTING.md`) is deleted.
- The project is licensed under the GNU General Public License, version 3, with the text in `LICENSE`.

**Tests**
- Neither file mentions the hash router, a `js/` or `pages/` folder, or "no build step".
- Every command in the README exists in `package.json`.
- Every folder named in the guide exists in the repository.
- Every link in both files opens.
- Someone following only the README on a clean machine gets the site running locally.

**Done when:** A new contributor can clone, run, test and open a pull request using only these two files.

### 4. Dead file cleanup

**What it does:** Removes files and code left over from the old app, so nobody builds on them by mistake, and moves visitors who are still being served the old app onto the current site.

**How it works**
- The old app registered a service worker for visitors between 26 May and 5 June 2026. It serves its cached pages first, and the site answered the worker's address with a web page, which a browser will not accept as a replacement, so those visitors stayed on the old app. A small replacement at `public/service-worker.js` deletes every cache, unregisters itself and reloads the open page. It has no `fetch` handler and caches nothing.
- Delete the root `service-worker.js`, the old worker's source, which was not deployed.
- Delete the root `_redirects` (the rule is already in `netlify.toml`).
- Remove the `console.log` of the API key length in `fetchBooks`, and add a lint rule against `console.log` in `src/`.
- Remove the web manifest link and delete `public/site.webmanifest`, since it points to icons that do not exist and old hash URLs. Feature 12 supplies a correct one.
- Delete `public/CHANGELOG.md`, a stale copy of the root changelog that was published at `/CHANGELOG.md`.
- Update `GITHUB_REPO` in `src/components/SiteNav.vue`, `src/components/SiteFooter.vue`, `src/views/AboutView.vue` and `src/views/ChangelogView.vue` from `Zubs/pillarsofislam` to `Zubs/islamichub`.
- Remove three unused development dependencies: `unplugin-auto-import`, `unplugin-vue-components` and `vite-plugin-vue-devtools`.
- An automated check, `test/leftovers.test.js`, keeps these gone. It includes a list of the only files `public/` may hold.

**Tests**
- A browser with no service worker registers none and nothing reloads.
- A browser holding the old worker and its cache has no registration and no cache after its next visit, and shows the current app.
- With several caches, every one is deleted.
- When a window refuses to reload, the caches are still deleted and the registration is still removed.
- The replacement worker registers no `fetch` listener.
- A deep link such as `/prayer` still loads after `_redirects` is gone.
- Opening the hadith library logs nothing about the API key, and a `console.log` left in `src/` fails lint.
- The browser console shows no manifest or missing-icon warnings on any page.
- The build output contains `service-worker.js` and no `CHANGELOG.md`, `site.webmanifest` or `_redirects`.
- No file in `src/` contains the repository's old name.
- Lint and tests still pass.

**Done when:** A deploy preview loads every route with no manifest, icon or API-key message in the console, and serves `/service-worker.js` as JavaScript that is not cached.

---

## Fixes

### 5. Zakat exchange rates

**What it does:** Makes the Zakat calculator use correct gold and silver prices in every currency. Both price services had stopped working, so everyone was shown old built-in prices (the gold nisab about 12% too high and the silver nisab about 27% too low), and a second bug would have made pounds about 24% too low once prices loaded.

**How it works**
- Gold, silver and the exchange rates come from one free daily dataset (`@fawazahmed0/currency-api`), fetched from jsDelivr and, if that fails, from its mirror. Each attempt has a six-second limit. Daily prices were chosen over live spot prices.
- All exchange rates are held against one base, US dollars, because metal prices arrive in dollars.
- Fallback rates and fallback metal prices use the same base, so a failed fetch cannot mix the two. They are dated, and the page shows the date.
- One function, `pricePerGram(metal, currency)`, does the conversion, and the nisab and the calculation both use it.
- The calculation lives in `utils/zakat.js` as pure functions, not in the page.
- Metals and rates are flagged separately as fetched or not, and the page says which is in use and the date the prices are from.
- A price that is missing, zero, negative or not a number counts as a failure. Fetched rates are used only when all four are valid.
- The content security policy allows the two new addresses and no longer lists the two dead ones.

**Tests**
- With every input empty, Zakat due is zero and the page says it is not obligatory.
- With dollars selected, the gold price per gram is the dollar price per ounce divided by 31.1035.
- With pounds selected, it is that figure multiplied by the dollar-to-pound rate, and by nothing else.
- Switching between all four currencies and back to the first gives the first price again.
- Wealth exactly equal to the nisab is obligatory, and one penny under is not.
- Debts larger than wealth give zero, never a negative figure.
- The nisab shown and the nisab used in the calculation are the same number.
- If the first address fails, the second is used.
- A source that does not answer within six seconds is abandoned.
- If rates fail but metals load, fallback rates are used and the page says rates are not current.
- If both fail, fallback prices are used and the page says they are reference prices and gives their date.
- With the network on, the Zakat page shows the day's prices and no page logs a CORS error.
- A reply with missing or non-numeric prices is treated as a failure.
- The price request carries nothing the user entered.
- A user enters 100 g of 22k gold in pounds and sees a value that matches the day's gold price worked out by hand.

**Done when:** With fetched prices, the gold nisab shown in pounds, dollars, euros and riyals each matches 85 g at the day's live spot price to within 1%.

### 6. Naira in the Zakat calculator

**What it does:** Lets users work out their Zakat in Nigerian naira.

**How it works**
- Naira (NGN, ₦) is added to the currency list beside pounds, dollars, euros and riyals. Pounds stay the default.
- The price dataset adopted in feature 5 already includes the naira, so no change of service is needed. `NGN` is added to the list of currencies read from it, and fetched rates are used only when all five are valid.
- The naira's official rate and its street rate can differ. The calculator uses the official rate and says so.
- For that reason the user can also type their own local price per gram for gold and for silver. A typed price replaces the fetched one for the calculation and the nisab, and the page shows that a custom price is in use.
- A fallback naira rate is built in on the same dollar base as the others (feature 5).
- A typed price can be entered in any currency, not only naira, and is cleared when the currency changes, since it was quoted in the previous one. It is never stored or sent.
- Naira amounts are shown with the ₦ sign, thousands separators and two decimals.

**Tests**
- With every input empty and naira selected, Zakat due is ₦0.00.
- With naira selected, the gold price per gram is the dollar price per gram multiplied by the dollar-to-naira rate.
- Switching from naira to each other currency and back gives the first figure again.
- A total in the tens of millions of naira is shown in full with separators, such as ₦25,400,000.00.
- Wealth exactly equal to the naira nisab is obligatory, and one kobo under is not.
- A typed gold price per gram replaces the fetched price in both the calculation and the nisab.
- Clearing the typed price returns to the fetched price.
- A typed price of zero, a negative number or text is rejected and the fetched price is kept.
- If the rate service fails, the fallback naira rate is used and the page says rates are not live.
- The other four currencies give the same results as before the naira was added.
- A user in Lagos selects naira, types the price their local dealer quoted for a gram of gold, enters their savings and sees the Zakat due in naira.

**Done when:** A user can complete the calculator in naira, with either the fetched or a typed gold price, and the result matches a calculation done by hand.

### 7. Inheritance engine

**What it does:** Makes the inheritance calculator follow the rules set out in Spec section 5.9. Today it gives wrong shares for sisters with brothers, granddaughters with a daughter, and several residuary cases.

**How it works**
- Shares are calculated as exact fractions and converted to percentages and amounts only at the end.
- The steps run in a fixed, separate order: blocking, fixed shares, reduction when shares exceed the estate ('awl), residue, and return of any remainder (radd).
- A sister shares the residue with a brother, two parts to one. A granddaughter takes 1/6 beside one daughter.
- Residuaries follow a priority order: sons and daughters, then grandsons, then father, then grandfather, then brothers and sisters.
- Radd goes to fixed-share heirs other than the spouse. This is the proposed default; see Decisions needed.
- Each result line says which rule produced it, and the share label always matches the percentage.
- Amounts are rounded to the penny, with any leftover penny added to the largest share so the total equals the estate.
- Where the Spec 5.9 table was silent or at odds with Qur'an 4:11 and 4:176 and Sahih al-Bukhari 6736, the engine follows those sources and the table was corrected: parents take a sixth beside any child, a father beside daughters only takes a sixth plus the residue, a sister beside a daughter takes the residue, two grandmothers share one sixth, and beside a spouse and the father the mother takes a third of the remainder. Each is listed under Final for confirmation.
- A spouse who is the only heir keeps the fixed share, and the rest is shown as a "Remainder" line.

**Tests**
- With no heirs chosen, the page asks for at least one heir and shows no result.
- An estate of zero shows the shares with zero amounts.
- A son alone takes everything.
- A husband and a son take 25% and 75%.
- A son and a daughter take two parts and one part.
- A full brother and a full sister take two parts and one part.
- One daughter and one granddaughter take 1/2 and 1/6, and after radd 75% and 25%.
- Two daughters block a granddaughter, unless a grandson is present.
- A husband, a mother and two full sisters are reduced to 37.5%, 12.5% and 50%.
- A wife and one daughter take 12.5% and 87.5%, and the wife's label reads 1/8.
- A mother takes 1/3 with one sibling present and 1/6 with two.
- A son blocks grandsons, brothers and sisters. A father blocks the grandfather, brothers and sisters.
- Three sons sharing £100 receive amounts that add up to exactly £100.
- For every combination tested, the percentages total 100 and the amounts total the estate.
- A husband and a wife together, more than four wives, a negative count or a non-numeric estate are each rejected with a clear message.
- A user enters a wife, two sons and a daughter on £120,000 and sees £15,000, £42,000, £42,000 and £21,000.

**Done when:** Every row of the table in Spec 5.9 has a passing test, and the "Inheritance engine" entry is removed from Known gaps.

### 8. Asr method

**What it does:** Lets users choose between the two ways of timing Asr, since the Hanafi school starts it later.

**How it works**
- `calcPrayerTimes` takes an Asr option: Standard (shadow equal to the object's length, the default) or Hanafi (twice the length).
- The Prayer page has a selector beside the calculation method. Changing it, or the method, recalculates times that are already shown.
- The Fasting page is unaffected, as it uses only Fajr and Maghrib.
- The file header in `utils/prayer.js` is corrected to list only the methods that exist.

**Tests**
- With no option given, Asr is the same as it is today.
- With Hanafi chosen, Asr is later and the other five times do not change.
- For London on a fixed date, Hanafi Asr matches a trusted timetable to within two minutes.
- At a latitude of 60° in winter, both options still return a valid time.
- An unknown Asr option falls back to Standard.
- Changing the selector updates the times and the next-prayer countdown straight away.
- A user switches to Hanafi and sees Asr move later while the countdown stays correct.

**Done when:** Both Asr times for three cities match a published timetable to within two minutes.

### 9. SEO through one path

**What it does:** Gives every page a correct title, description and canonical link, set in one way.

**How it works**
- `useSeo` becomes the only way a view sets its head. It accepts fixed values or values that arrive later, such as a hadith chapter name.
- The canonical URL is built from the route's path, not its name.
- Views that call `useHead` directly are moved over, and unused entries in `ROUTE_META` are removed.
- A test compares the router with `public/sitemap.xml`, so a route added later cannot be left out. The sitemap gains the pages it lacked: `/adhkar` and its six categories, `/tasbih` and `/faith/articles`.
- A lint rule forbids importing `@unhead/vue` in views and components.

**Tests**
- A page given no values still gets the site's default title and description.
- The home page's canonical link is the site address with no trailing path.
- `/faith/articles` and `/hadith/books` have canonical links matching their paths.
- A hadith chapter page shows a holding title while loading and the chapter name once loaded.
- Every page has exactly one canonical link and one description.
- Every fixed route in the router appears in the sitemap, and nothing in the sitemap is missing from the router.
- The 404 page is marked as not to be indexed.
- No view imports `useHead` directly.
- A user moves from the home page to an adhkar category and the tab title and canonical link change to match.

**Done when:** Every route has one title, one description and one canonical link that matches its address, and the sitemap test passes.

### 10. Loading screen

**What it does:** Stops every page waiting two seconds for gold prices it may never use.

**How it works**
- The app no longer fetches prices on start. The Zakat page fetches them when it opens.
- The Bismillah screen shows only until the app is ready to draw, with no minimum time.
- The Zakat page shows its own "fetching prices" state and is usable with fallback prices meanwhile.
- Prices are fetched once per visit and reused if the user returns to the page.

**Tests**
- Opening `/prayer` makes no request for metal prices or exchange rates.
- Opening `/zakat` makes one request, as metals and rates now come from one dataset (feature 5).
- Leaving the Zakat page and returning does not fetch again.
- On a fast connection the loading screen is gone in under half a second.
- On a slow connection the Zakat form can be filled in while prices load.
- With the price services blocked, the Zakat page loads, uses fallback prices and says so.
- The loading screen is still announced to screen readers while it shows.
- A user opens a link to `/adhkar/morning` and can start counting within a second.

**Done when:** Only the Zakat page requests prices, and a first visit to any other page is usable in under a second on a normal connection.

---

## App

### 11. Saved prayer settings

**What it does:** Remembers where the user is and how they calculate prayer times, so times appear without asking each visit.

**How it works**
- After the user finds or enters a location, the page offers "Remember this location". Nothing is saved unless they accept.
- A new stored key, `prayer-settings`, holds latitude, longitude, place name, calculation method and Asr method. It stays on the device.
- A Pinia store owns the settings. The Prayer and Fasting pages read from it, and later the dashboard, offline mode and reminders do too.
- A "Forget my location" button removes it.
- The privacy text on the site and in Spec sections 6 and 9 is updated to say location can be saved on the device by choice.

**Tests**
- On a first visit nothing is stored and the page asks for a location as it does today.
- Declining the offer stores nothing.
- Accepting stores the location, and the next visit shows prayer times without asking.
- Changing the calculation method is remembered on the next visit.
- Latitudes of 90 and −90 and longitudes of 180 and −180 are accepted, and anything beyond is rejected.
- The Fasting page shows suhoor and iftar times from the saved location without asking again.
- "Forget my location" removes the stored data and the next visit asks again.
- Corrupt stored settings are treated as none.
- With browser storage blocked, the page works for that visit and says the location cannot be remembered.
- A user saves a location, closes the browser, reopens the Prayer page and sees today's times immediately.

**Done when:** A returning user who opted in sees prayer times with no prompt, and a user who never opted in has nothing stored.

### 12. Installable and offline

**What it does:** Lets users install IslamicHub on their phone and use the main tools with no connection.

**How it works**
- `vite-plugin-pwa` builds a new service worker.
- The new worker is served from `/service-worker.js`, where it replaces the self-removing worker from feature 4 (or that file is kept). The old app's cache was named `islamichub-shell-v2` and must not be reused. The list of published files in `test/leftovers.test.js` is updated for the manifest and icons.
- A corrected manifest: real icons at 192px and 512px including a maskable one, clean shortcut URLs for Prayer, Adhkar and Tasbih, and the site's colours.
- The app's pages, styles, scripts and fonts are stored on first visit, so every route opens offline.
- Prayer times, Qibla, adhkar and tasbih work fully offline, as they need no server. Prayer times offline need a saved location (feature 11).
- Every feature built after this one must also work offline, unless it says it needs a connection.
- The site is kept light for costly and slow connections: a first visit to the home page downloads no more than 600 KB, and a page downloads only the code it needs.
- Hadith pages already viewed are kept and shown offline. Pages not yet viewed show an "offline" message.
- The Zakat page uses the last prices it fetched and says how old they are.
- When a new version is deployed, the user sees "Update available" with a refresh button.
- An "Install" button shows where the browser supports it. On iPhone, a short note explains "Add to Home Screen".
- Built, with every automated test passing. The feature stays unticked until Zubair has carried out the real-phone, Lighthouse and slow-connection checks listed under Final.

**Tests**
- A first visit while offline shows the browser's own offline page, as nothing is stored yet.
- After one visit online, reloading the home page offline works.
- After one visit online, every route in the router opens offline.
- Prayer times for a saved location show offline, including for tomorrow.
- A tasbih tap and a completed adhkar category made offline are still there after reconnecting.
- A first visit to the home page downloads no more than 600 KB.
- On a slow 3G connection, a first visit to the home page is usable within five seconds.
- A hadith chapter viewed online opens offline, and one never viewed shows the offline message.
- Going offline on the Zakat page shows the last prices with their age.
- After a new deploy, an open tab offers the update and refreshing loads the new version.
- The manifest has no missing icons, and Lighthouse reports the site as installable.
- With storage full or blocked, the site still works online.
- On a real Android phone and a real iPhone, a user installs the app, turns on flight mode, opens it from the home screen and reads the morning adhkar.

**Done when:** The app installs on a real Android phone and a real iPhone, and prayer times, adhkar and tasbih all work in flight mode.

---

## Hadith

### 13. Hadith proxy

**What it does:** Keeps the hadith API key off the user's device. This is the project's first server-side code.

**How it works**
- A Netlify function at `/api/hadith/*` forwards requests to hadithapi.com and adds the key on the server.
- The key moves to a server-only variable, `HADITH_API_KEY`. `VITE_HADITH_API_KEY` is removed.
- Only the three read requests the site uses (books, chapters, hadiths) are allowed, with only the expected parameters.
- Replies are cached for a day, as the collections do not change.
- `useHadithApi` calls the proxy. hadithapi.com is removed from the site's allowed connections.
- `netlify dev` runs the function locally, and the README says so.
- Built, with every automated test passing. The feature stays unticked until Zubair has set `HADITH_API_KEY` in Netlify and confirmed the library on production, as listed under Final.

**Tests**
- With no key set on the server, the proxy returns a clear "not configured" reply and the library shows its existing "no API key" state.
- A request for one book's chapters returns the same data the direct call did.
- A request for a second page of hadiths returns that page.
- A repeated request is served from the cache.
- A request for any other path, or with an unexpected parameter, is rejected.
- When hadithapi.com is down or slow, the proxy returns an error within ten seconds and the library shows its error state.
- A chapter viewed online before the move to the proxy, or after it, still opens offline (feature 12).
- An error reply never contains the key.
- Searching the built site's files for the key finds nothing.
- A user browses from the book list to a chapter and reads hadiths, with every request going to `/api/hadith`.

**Done when:** The hadith library works on production and the key appears nowhere in the built files or in the browser's network panel.

### 14. Single-hadith page

**What it does:** Gives every hadith its own address, so it can be linked to and shared.

**How it works**
- A new route: `/hadith/books/:bookSlug/hadith/:hadithNumber`.
- The page shows the Arabic text, the English text, the grade, the book and chapter, and the narrator where given.
- Copy and share buttons. Share uses the device's share sheet where there is one and copies the link otherwise.
- Links to the previous and next hadith and back to the chapter.
- Each hadith in a chapter list links to its own page.
- The title and description come from the hadith, through `useSeo`.

**Tests**
- A hadith with no Arabic text still shows its English text.
- `/hadith/books/sahih-bukhari/hadith/1` shows the first hadith of Sahih al-Bukhari.
- The first hadith of a book has no "previous" link and the last has no "next".
- A long hadith is readable at 360px wide without sideways scrolling.
- The grade badge matches the one shown in the chapter list.
- Clicking a hadith in a chapter list opens its page, and the back link returns to that chapter.
- Copy produces the same text format as the chapter list does.
- An unknown book, a number that does not exist, or a number that is not a number shows a "hadith not found" page.
- If the request fails, an error with a retry button is shown.
- A user opens a hadith, shares it, and the person receiving the link sees the same hadith.

**Done when:** Any hadith in the nine collections can be opened at its own address and that address works when pasted into a new browser.

### 15. Linked hadith citations

**What it does:** Turns every hadith reference on the site into a link to that hadith.

**How it works**
- A `HadithBlock` component replaces the hand-written hadith blocks. It takes the text and a list of references, each a book and a number.
- A small `HadithRef` component does the same for references that appear inline or in a list.
- Each reference links to its page from feature 14. A reference to a collection the library does not hold is shown as plain text.
- The site cites Arabic-edition numbers. Where hadithapi.com numbers a hadith differently, a mapping file in `data/` records the right one.
- Every existing citation is converted: the pillar pages, Articles of Faith, Tasbih, Inheritance and `data/adhkar.js`.
- Each converted link is checked by hand to confirm it opens the hadith actually quoted.

**Tests**
- A block with no references shows its text and no empty source line.
- A block with one reference shows one link.
- "Sahih Bukhari 1904 · Sahih Muslim 1151" shows two links, each to the right book.
- A reference to a collection outside the library shows as text, not a broken link.
- A reference with a mapping entry links to the mapped number while still displaying the cited number.
- A search of the views finds no hadith citation left as plain text.
- An automated check requests every cited hadith through the proxy and each one is found.
- The blocks look the same as before and still animate in on scroll.
- A user reading the Fasting page clicks "Sahih Bukhari 1904" and lands on that hadith.

**Done when:** Every hadith citation on the site is a link, and each has been opened and confirmed to show the hadith quoted.

### 16. Daily hadith

**What it does:** Shows one hadith on the home page each day.

**How it works**
- A curated list of at least 60 short, authentic hadiths in `data/dailyHadith.js`, each with its text, narrator and reference.
- The day's hadith is chosen from the local date (feature 2), so everyone sees the same one on the same date and it changes at local midnight.
- The text is stored in the list, so the card needs no network request and works offline.
- The card uses `HadithBlock`, so its reference links to the full hadith (features 14 and 15).

**Tests**
- With an empty list, the home page shows no card and no gap.
- On a given date, the card shows the same hadith on every load and every device.
- On the next date it shows a different one.
- On the day after the last entry, the list starts again from the first.
- The hadith changes at local midnight, not UTC midnight.
- The card's reference opens the same hadith in the library.
- Every entry has text, a narrator and a reference, and no entry appears twice.
- With the network off, the card still shows.
- A user visits on two consecutive days and sees two different hadiths, each linking to its source.

**Done when:** The home page shows a different sourced hadith on consecutive days, and it still shows with the network off.

---

## Daily worship

### 17. Adhkar progress survives reload

**What it does:** Keeps the counts on adhkar cards if the page is reloaded or closed part-way through.

**How it works**
- In-progress counts are saved under a new key, `adhkar-progress`, as today's day key plus a count for each dhikr.
- On load, counts are restored only if the saved day is today. An older day is discarded.
- Completing a category clears its saved counts, as it clears the in-memory ones today.
- Stored records are read with `parseStoredObject` (feature 2), which handles a record of the wrong kind. A damaged entry inside a valid record is still not handled: a day whose value is `null` under `adhkar-completion-log` or `tasbih-totals` would throw. This feature checks each entry of the record it adds, and of those two.

**Tests**
- With nothing saved, every card starts at zero.
- Tapping one card three times and reloading shows three.
- Counts on several cards in different categories are all restored.
- A dhikr that belongs to two categories shows the same count in both.
- Counts saved yesterday are gone today.
- A card at its target reloads at its target, and one more tap resets it to zero.
- Completing a category clears its counts but leaves other categories' counts alone.
- Corrupt saved data is treated as none.
- A day whose value is `null` or a number inside `adhkar-progress`, `adhkar-completion-log` or `tasbih-totals` is ignored without an error.
- A user gets half-way through morning adhkar, closes the tab, returns and carries on from where they stopped.

**Done when:** Reloading mid-way through a category loses no counts, and the next day starts clean.

### 18. Duas

**What it does:** Adds supplications for everyday situations alongside the existing adhkar.

**How it works**
- A new data file, `data/duas.js`, in the same shape as the adhkar: Arabic, transliteration, translation, reference, and a situation.
- Situations to start with: travel, eating, home, mosque, clothing, weather, distress, illness, forgiveness, and parents and family.
- New routes `/duas` and `/duas/:situationSlug`, reusing `AdhkarCard`. Cards for duas said once have no counter.
- A search box filters by English, transliteration or situation name.
- Each dua has its own anchor, so one dua can be linked to.
- References use `HadithRef` (feature 15) or a Qur'an reference.

**Tests**
- A situation with no duas is not listed.
- A situation with one dua shows one card.
- The duas page lists every situation with a count of its duas.
- A dua that fits two situations appears under both.
- Searching "travel" finds the travel duas, in any letter case.
- A one-letter search and a very long search both work without errors.
- A search with no matches shows "no duas found" and a way to clear it.
- Every dua has Arabic, transliteration, translation and a reference, checked automatically.
- An unknown situation address shows the 404 page.
- A link to a single dua scrolls to it.
- A user searches "rain", opens the dua and follows its reference to the source hadith.

**Done when:** At least 40 sourced duas across the ten situations are browsable and searchable, and each reference links to its source.

### 19. Salah tracker

**What it does:** Lets the user record each of the five daily prayers and see how consistent they have been.

**How it works**
- A new store with a stored key, `salah-log`, holding for each day a status for each prayer: on time, late or missed. A prayer with no status is "not logged".
- A new route, `/tracker`, showing today's five prayers with one-tap status buttons, a seven-day strip and a month view.
- A streak counts consecutive days on which all five were prayed, on time or late. Today counts once all five are logged.
- Past days can be edited. Future days cannot.
- Nothing leaves the device. A "Clear my data" button removes the log.
- A Tracker shortcut is added to the installed app (feature 12).
- With a saved location (feature 11), each prayer shows its time, and prayers whose time has not arrived are marked "not yet".

**Tests**
- With nothing logged, today shows five unlogged prayers and a streak of zero.
- Marking Fajr as on time saves it and it is still there after a reload.
- Logging all five today gives a streak of 1.
- Seven complete days in a row give a streak of 7.
- A day with one missed prayer ends the streak, and a day with one late prayer does not.
- A day with four prayers logged does not count towards the streak.
- Changing yesterday's missed prayer to late repairs the streak.
- A future day cannot be logged.
- The day changes at local midnight (feature 2).
- With a saved location, Isha shows as "not yet" in the afternoon.
- A prayer logged with no connection is still there after reconnecting.
- Corrupt stored data is treated as empty, and "Clear my data" empties the log after a confirmation.
- A user logs five prayers a day for three days and sees a three-day streak and a filled week strip.

**Done when:** A user can log today's prayers in five taps, edit a past day, and see a streak that matches a count done by hand.

### 20. Fasting tracker

**What it does:** Lets the user record their fasts and see how many missed Ramadan fasts are still to be made up.

**How it works**
- A new store with a stored key, `fasting-log`, holding for each day one of: fasted, missed, made up or voluntary.
- The Fasting page gains a tracker section. In Ramadan it shows a 30-day grid. Outside Ramadan it shows the current month.
- Whether a day falls in Ramadan comes from `utils/hijri.js`. As that can be a day out, the user can set the first day of Ramadan themselves.
- "Still to make up" is the number of missed Ramadan days minus the number of made-up days, never below zero, and is kept per Ramadan year.
- Voluntary fasts are counted separately.
- Nothing leaves the device.

**Tests**
- With nothing logged, the grid is empty and "still to make up" is zero.
- Marking one Ramadan day as fasted fills that day.
- Marking 29 days fasted and one missed shows one still to make up.
- Logging a made-up fast after Ramadan brings that down to zero.
- More made-up fasts than missed ones still shows zero, not a negative number.
- Missed days from last Ramadan and this Ramadan are counted separately.
- A voluntary fast adds to the voluntary count and does not change the make-up count.
- Setting the first day of Ramadan one day earlier shifts the grid by one day and keeps the logged days.
- A day cannot hold two statuses, and a future day cannot be logged.
- Outside Ramadan, a day cannot be marked as a Ramadan fast.
- Corrupt stored data is treated as empty.
- A user logs a full Ramadan with three missed days, makes up two afterwards and sees one remaining.

**Done when:** A user can log a whole Ramadan, and the make-up count matches a count done by hand.

### 21. Worship dashboard

**What it does:** Shows the user's day in one place on the home page.

**How it works**
- A "Today" panel near the top of the home page, built from existing stores: the next prayer and its countdown, today's five prayers, adhkar categories completed, today's tasbih total, and the daily hadith.
- Each part links to its full page.
- A part with nothing to show offers a way to start. A user with no saved location is offered the Prayer page.
- In Ramadan, today's fast appears too.
- The panel reads from the stores only and saves nothing of its own.

**Tests**
- A first-time visitor sees the panel with a prompt to set a location and no errors.
- With a saved location, the next prayer and its countdown match the Prayer page.
- Logging a prayer on the tracker updates the dashboard without a reload.
- Completing morning adhkar shows it as done on the dashboard.
- The tasbih figure matches today's total across all phrases on the Tasbih page.
- After Isha, the next prayer is tomorrow's Fajr.
- At local midnight the day's progress resets and yesterday's is kept in the log.
- Outside Ramadan no fasting row is shown.
- At 360px wide the panel stacks into one column with no sideways scrolling.
- A returning user opens the home page, sees what is left for today, taps the next prayer and marks it prayed.

**Done when:** A returning user can see the whole day's state on the home page and reach any part of it in one tap.

---

## Sharing and reminders

### 22. Share to WhatsApp

**What it does:** Lets users send a hadith, a dua or a dhikr to someone else as an image card or a link. This is how the site reaches new people.

**How it works**
- A Share button on the daily hadith, every single-hadith page, every dua and every adhkar card.
- Sharing offers two things: an image card, and a link to the item's own address.
- Shared links carry a short source tag, so usage statistics (feature 34), if built, can tell WhatsApp visits from direct ones.
- The card is a square image drawn on the user's device: the Arabic text, the translation, the reference, and the site's name and address, in the site's colours and typefaces. Nothing is uploaded.
- On phones the device's share sheet opens with the image attached, so WhatsApp is one tap away. Where a browser cannot share images, the user gets "Save image" and a "Share on WhatsApp" link that sends the text and the address.
- Text too long for a card is shared as text and a link, with no image.
- Links to hadith and dua pages show a proper preview when pasted into WhatsApp. The site is drawn in the browser, which WhatsApp does not run, so a small Netlify edge function adds the title, description and preview image to those addresses for link previews.
- The card is drawn in whichever language the user is reading once translations exist (features 25 to 28).

**Tests**
- An item with no translation produces a card with the Arabic and the reference only.
- Sharing the daily hadith produces a card with its Arabic, translation and reference.
- A short dhikr and a medium-length hadith both fit the card with nothing cut off.
- A hadith just short enough for a card gets one, and one just too long is shared as text and a link.
- Arabic on the card is right to left with its letters joined and its marks in place.
- The link shared for a hadith opens that same hadith.
- A hadith link pasted into WhatsApp shows the reference as its title and the site's preview image.
- A link to an unknown hadith shows the site's default preview, not an error.
- In a browser that cannot share images, "Save image" downloads the card and the WhatsApp link opens with the text filled in.
- If the user cancels the share sheet, nothing happens and no error shows.
- With no connection, a card can still be made and saved.
- On a real Android phone and a real iPhone, a user shares the daily hadith to a WhatsApp chat and the person receiving it opens the link to the same hadith.

**Done when:** On a real phone, a hadith and a dua can each be sent to a WhatsApp chat as a readable card in two taps, and a pasted link shows a preview.

### 23. Prayer reminders

**What it does:** Notifies the user at each prayer time while the app is open or running in the background. No server is involved.

**How it works**
- A Reminders section in the prayer settings, off by default. Turning it on asks for notification permission.
- A switch for each of the five prayers, plus morning adhkar (after Fajr) and evening adhkar (after Asr).
- While the app is running, it schedules a notification for each remaining time today and again at local midnight or when settings change.
- Tapping a notification opens the tracker for a prayer, or the adhkar category for an adhkar reminder.
- Choices are stored under `reminder-settings`. Requires a saved location (feature 11).
- The settings state plainly that these reminders only arrive while the app is open, and point to feature 24 for the rest.

**Tests**
- With reminders off, no permission is requested and nothing is scheduled.
- With no saved location, the switch is disabled with a note explaining why.
- With only Maghrib on, one notification is scheduled, for Maghrib.
- With all five on at midday, only the prayers still to come today are scheduled.
- A prayer time that passed one second ago is not notified, and one a second ahead is.
- Changing the calculation method reschedules everything to the new times.
- After local midnight, the next day's reminders are scheduled without a reload.
- Tapping a Fajr notification opens the tracker, and tapping a morning adhkar one opens `/adhkar/morning`.
- If permission is refused, the switches turn off and a note explains how to allow it in the browser.
- In a browser with no notification support, the section says so and offers nothing.
- A user turns on Asr, leaves the app open in the background and is notified at Asr.

**Done when:** With the app open in the background on a real phone, a notification arrives within a minute of a prayer time and opens the tracker when tapped.

### 24. Push notifications

**What it does:** Delivers prayer reminders when the app is closed. This is the first feature that stores anything about a user on a server, and it is strictly opt-in.

**How it works**
- A second switch under Reminders: "Also notify me when the app is closed". Turning it on registers the device for Web Push.
- A Netlify function saves the push subscription with what is needed to work out the times: latitude and longitude rounded to two decimal places (about 1 km), timezone, calculation method, Asr method and the chosen reminders. No name, email or account.
- A scheduled Netlify function runs every minute, works out prayer times with the same `utils/prayer.js`, and sends a push to each device whose prayer time has arrived.
- Turning the switch off, or "Forget my location", deletes the record from the server.
- A subscription the push service reports as expired is deleted.
- While push is on, the in-page reminders from feature 23 stay silent, so the user is not notified twice.
- On iPhone, push only works once the app is installed, and the settings say so.
- The privacy text on the site and in Spec section 9 states exactly what is stored and how to delete it.

**Tests**
- With push off, no request is sent to the server and nothing is stored there.
- Turning push on stores one record, with coordinates rounded to two decimal places.
- Two devices with different locations each get their reminder at their own local prayer time.
- A device with only Fajr on receives one push a day.
- A prayer time arriving in the current minute is sent once, and is not sent again on the next run.
- Changing the method on the device updates the stored record and the next push uses the new time.
- With push on and the app open, one notification arrives, not two.
- Turning push off, or forgetting the location, deletes the server record.
- An expired subscription is deleted after the first failed send.
- A malformed or oversized subscription request is rejected.
- If the scheduled function misses a run, it does not send reminders that are more than a few minutes late.
- On an iPhone where the app is not installed, the switch is disabled with an explanation.
- On a real Android phone and an installed iPhone app, with the app fully closed, a reminder arrives at Maghrib and opens the tracker.

**Done when:** With the app closed on a real Android phone and an installed iPhone app, a prayer reminder arrives within two minutes of the prayer time, and turning the switch off deletes the server record.

---

## Languages

### 25. Interface translation

**What it does:** Makes the site's navigation, buttons, labels and tool text translatable, with a language switcher.

**How it works**
- `vue-i18n` with one message file per language in `src/locales/`. English is the source and the fallback.
- All interface text moves out of components into the message files: navigation, footer, buttons, form labels, tool results, empty and error states, notifications.
- English stays at the current addresses. Other languages sit under a prefix, such as `/yo/prayer`.
- A language switcher in the navigation. The choice is remembered, and a first visit follows the browser's language where that language is available.
- Each page tells search engines about its other language versions, and `<html lang>` is set to the current language.
- Numbers, dates and currency use the current language's formatting.
- Long-form page content is not covered here. That is feature 26.

**Tests**
- With only English available, the switcher is hidden and every address works as before.
- A component test finds no hard-coded English text left in interface components.
- With a second language added, switching to it changes the navigation and the address prefix, and stays on the same page.
- A text missing from a translation falls back to English, not to a blank or a key name.
- A translation file with a key that English does not have fails an automated check.
- The chosen language is still selected on the next visit.
- A first visit from a browser set to an unavailable language gets English.
- An address with an unknown language prefix shows the 404 page.
- Text with a count reads correctly for zero, one and many ("1 day", "3 days").
- A user switches language on the Zakat page and the labels, currency format and result text all change.

**Done when:** A complete second message file can be added and every piece of interface text changes, with no component edited.

### 26. Translatable content

**What it does:** Moves the long-form writing on each page out of the page templates, so it can be translated.

**How it works**
- Each content page's writing moves into `data/content/<page>/<language>.js` as structured sections: headings, paragraphs, lists, verse blocks, hadith blocks and FAQs.
- Arabic source text and references are stored once and shared by every language. Only the translation and commentary differ.
- A small set of components draws a page from its content file, so a page looks the same in every language.
- Static data files (adhkar, duas, tasbih phrases, daily hadith) gain translations by language in the same way.
- A section missing in a language is shown in English with a small "not yet translated" note.
- Order of work: Faith first, as the pattern, then Prayer, Zakat, Fasting, Hajj, Articles of Faith, Hadith overview and About.

**Tests**
- A page with an empty content file shows its header and no errors.
- The Faith page drawn from its content file matches the old page side by side.
- Every pillar page is drawn from a content file and no long-form English remains in the templates.
- A verse appears with the same Arabic and reference in every language.
- A section missing from a translation appears in English with the note.
- A content file whose sections do not match the English ones fails an automated check.
- Hadith references in content still link to their hadith (feature 15).
- The FAQ accordions and scroll animations still work.
- A contributor adds one translated section to a content file and sees it on the page without touching a component.

**Done when:** Every content page is drawn from a content file, and adding a translation means adding a file and nothing else.

### 27. Yoruba

**What it does:** Ships the site in Yoruba, its first language other than English.

**How it works**
- A full Yoruba translation of the interface messages (feature 25), under the `/yo/` address prefix.
- A Yoruba translation of the pillar pages, the adhkar and dua translations, and the tasbih phrases (feature 26).
- Yoruba is written with its full tone marks and under-dots (ẹ, ọ, ṣ), and the heading and body typefaces are checked to draw them. A typeface that cannot is replaced for Yoruba.
- Qur'an translations in Yoruba come from one named, published translation, credited on the About page.
- Every translated page of religious content is checked by a named reviewer before it goes live. The person building this feature asks Zubair for the reviewer's name and does not invent or assume one.
- Yoruba appears in the switcher only when the interface and the five pillar pages are complete.
- The sitemap lists the Yoruba pages.

**Tests**
- Before the translation is complete, Yoruba is not in the switcher and `/yo/` addresses show the 404 page.
- Once complete, Yoruba appears in the switcher and every pillar page opens in it.
- No interface text appears in English on any Yoruba page.
- Letters with tone marks and under-dots display as single, correctly formed letters in headings, body text and buttons, on Android and iPhone.
- Searching duas works whether or not the user types the tone marks.
- The automated checks from features 25 and 26 report no missing messages or sections for the pillar pages.
- Every calculator gives the same numbers in both languages.
- Each translated page records its reviewer's name.
- The sitemap and each page's language links include Yoruba.
- A user whose browser is set to Yoruba arrives on the home page in Yoruba and completes morning adhkar.

**Done when:** A Yoruba reader can use every tool and read all five pillar pages with no English fallback, and every page records the reviewer Zubair named.

### 28. Hausa

**What it does:** Ships the site in Hausa, its second language after Yoruba.

**How it works**
- A full Hausa translation of the interface messages (feature 25), under the `/ha/` address prefix.
- A Hausa translation of the pillar pages, the adhkar and dua translations, and the tasbih phrases (feature 26).
- Hausa is written in the Latin (Boko) script with its hooked letters (ɓ, ɗ, ƙ, ƴ), and the typefaces are checked to draw them. A typeface that cannot is replaced for Hausa.
- Qur'an translations in Hausa come from one named, published translation, credited on the About page.
- Every translated page of religious content is checked by a named reviewer before it goes live. The person building this feature asks Zubair for the reviewer's name and does not invent or assume one.
- Hausa is added with files only. If a component has to change to make room for it, the gap is fixed in feature 25 or 26, not worked around here.
- Hausa appears in the switcher only when the interface and the five pillar pages are complete.

**Tests**
- Before the translation is complete, Hausa is not in the switcher and `/ha/` addresses show the 404 page.
- Once complete, Hausa appears in the switcher and every pillar page opens in it.
- With three languages, switching between any two keeps the user on the same page.
- No interface text appears in English or Yoruba on any Hausa page.
- The hooked letters display as single, correctly formed letters in headings, body text and buttons, on Android and iPhone.
- Searching duas works whether the user types the hooked letters or the plain ones.
- The automated checks from features 25 and 26 report no missing messages or sections for the pillar pages.
- Every calculator gives the same numbers in all three languages.
- Each translated page records its reviewer's name.
- The sitemap and each page's language links include Hausa.
- A user whose browser is set to Hausa arrives on the home page in Hausa and works out their Zakat in naira.

**Done when:** A Hausa reader can use every tool and read all five pillar pages with no English fallback, every page records the reviewer Zubair named, and no component was edited to add the language.

### 29. Right-to-left layout

**What it does:** Makes the whole layout mirror correctly for right-to-left languages such as Arabic and Urdu.

**How it works**
- The page direction is set from the current language.
- Styles change from left and right to logical start and end throughout the four stylesheets and the scoped styles.
- Icons that point a direction (arrows, chevrons, previous and next) flip. Icons that do not (clock, compass) stay.
- The navigation, cards, accordions, pagination, tables and form fields all mirror.
- Arabic verse and hadith blocks keep their existing right-to-left rendering in every language.
- Numbers, the Qibla compass and the tasbih counter are not mirrored.

**Tests**
- In English, every page looks exactly as it did before this feature.
- In a right-to-left language, the navigation starts from the right and the menu opens from the right.
- A stylesheet check finds no physical left or right properties remaining, apart from a listed few with reasons.
- "Previous" and "next" swap sides in pagination, and their arrows point the right way.
- A table of prayer times reads right to left with the columns in mirrored order.
- English text inside a right-to-left page, such as a hadith reference, displays correctly.
- The Qibla compass points the same direction in both layouts.
- At 360px wide there is no sideways scrolling in either direction.
- A user switches to a right-to-left language and uses the Zakat calculator from start to finish.

**Done when:** Every page has been checked in a right-to-left language at phone and desktop widths with nothing misaligned or clipped.

---

## Content

### 30. Eid

**What it does:** A guide to the two Eids, with a countdown to the next one.

**How it works**
- A new route, `/eid`, written as a content file (feature 26) so it is translatable from the start.
- Sections: what the two Eids are, the sunnahs of the day, the Eid prayer step by step, the takbirat in Arabic with transliteration and translation, Zakat al-Fitr, and FAQs.
- A countdown to the next Eid from `utils/hijri.js`: 1 Shawwal for Eid al-Fitr and 10 Dhul Hijjah for Eid al-Adha, with a note that the date depends on moon sighting.
- Where schools differ, such as the number of extra takbirs in the prayer, both positions are shown.
- Links to the Fasting, Zakat and Qurbani pages. Added to the navigation and the sitemap.

**Tests**
- On an ordinary day the countdown shows the days to whichever Eid is nearer.
- The day before Eid al-Fitr shows "1 day".
- On 1 Shawwal the page shows an Eid al-Fitr greeting in place of the countdown.
- On 2 Shawwal the countdown points to Eid al-Adha.
- After Eid al-Adha, the countdown points to next year's Eid al-Fitr.
- Every claim on the page carries a reference, and every hadith reference is a link.
- The takbirat show Arabic, transliteration and translation.
- The page has a title, description and canonical link, and is in the sitemap.
- The page reads correctly at 360px wide and in a right-to-left language.
- A user opens the page a week before Eid, reads how the prayer is performed and follows the link to Zakat al-Fitr.

**Done when:** The page is live, fully referenced, reviewed by the reviewer Zubair named, and its countdown is correct for the next four Eids.

### 31. Qurbani

**What it does:** A guide to the Eid al-Adha sacrifice, with a helper for working out shares.

**How it works**
- A new route, `/qurbani`, written as a content file.
- Sections: what it is and its origin in the story of Ibrahim, who it is due on, which animals qualify and their minimum ages, the days it can be done, how the meat is shared, and FAQs.
- Where schools differ, such as whether it is obligatory or a confirmed sunnah, and whether there are three or four days, both positions are shown.
- A shares helper: the user enters the number of people, and it shows the options. A sheep or goat counts for one person. A cow or camel holds up to seven shares.
- The helper is a pure function in `utils/qurbani.js`. It states that it is a guide and not a ruling.
- Linked from the Eid and Hajj pages. Added to the navigation and the sitemap.

**Tests**
- With no number entered, the helper shows nothing.
- One person is offered one sheep or goat, or one share of a larger animal.
- Seven people are offered seven small animals or one cow or camel.
- Eight people are offered one large animal plus one small one, or two large animals with six spare shares.
- Fourteen people fill exactly two large animals.
- Zero, a negative number, a fraction or text is rejected with a clear message.
- A very large number gives an answer without slowing the page.
- Every claim on the page carries a reference.
- The Eid and Hajj pages both link here.
- A family of five opens the page, uses the helper and sees that five shares of one cow or five sheep both work.

**Done when:** The page is live, fully referenced, reviewed by the reviewer Zubair named, and the helper's answers match a hand count for 1 to 21 people.

### 32. Prophets

**What it does:** A section on the prophets named in the Qur'an, each with their story and the verses it comes from.

**How it works**
- New routes: `/prophets` listing them, and `/prophets/:slug` for each one.
- A data file lists all 25 prophets named in the Qur'an, with name, Arabic name, the people they were sent to and where they are mentioned.
- A prophet with a full story has a page built from a content file: sections, Qur'an verse blocks and hadith blocks.
- Ibrahim is written first, in full. A prophet without a story yet appears in the list with their Qur'an references and no link.
- Stories draw on the Qur'an and authentic hadith only. Details from other sources are left out or clearly labelled as such.
- Honorifics follow one convention across the section.
- Added to the navigation, the home page and the sitemap.

**Tests**
- The list shows all 25 prophets in order.
- A prophet with no story is shown without a link, and their address shows the 404 page.
- Ibrahim's page opens from the list and shows his story.
- Each prophet page links to the previous and next prophet that has a story.
- Every section of a story carries at least one Qur'an or hadith reference, checked automatically.
- Every verse block shows Arabic, translation and reference.
- An unknown prophet address shows the 404 page.
- Each prophet page has its own title and description.
- The page reads correctly in a right-to-left language.
- A user opens the list, reads Ibrahim's story and follows a hadith reference to its source.

**Done when:** All 25 prophets are listed with their Qur'an references, and Ibrahim's story is live, fully referenced and reviewed by the reviewer Zubair named.

### 33. Journeys of the prophets

**What it does:** Shows where a prophet travelled, on a map with a timeline, starting with Ibrahim.

**How it works**
- A journey is a list of stops in the prophet's data: place name, coordinates, what happened there, the reference, and how the place is known.
- "How the place is known" is one of: named in the Qur'an or hadith, or identified by historians. The second kind is labelled on the page.
- Ibrahim's stops to start with: Ur, Harran, Canaan, Egypt and Makkah.
- The map is drawn inside the site as an SVG of the region, with no outside map service. It works offline and sends no location anywhere.
- The stops are numbered and joined in order. Selecting a stop on the map or the timeline highlights it on the other.
- The same list is readable as plain text below the map.
- Journeys for Musa and Yusuf follow once their stories exist.

**Tests**
- A prophet with no journey shows no map and no gap.
- A journey with one stop shows one marker and no line.
- Ibrahim's journey shows its stops in order, joined by a line.
- Selecting a stop on the timeline highlights it on the map, and the other way round.
- Two stops close together can both be selected at 360px wide.
- A stop identified by historians carries its label, and every stop carries a reference.
- The page makes no request to any outside map service.
- With the network off, the map still shows.
- Every stop can be reached and read with the keyboard and by a screen reader.
- A user opens Ibrahim's page, steps through the stops in order and reads what happened at each.

**Done when:** Ibrahim's journey can be followed stop by stop on a phone, each stop is sourced, and the map works offline.

---

## Insight

### 34. Usage statistics

**What it does:** Shows how many people visit, where they come from and which parts of the site they use, without identifying anyone. It does not depend on any other feature and can be built at any point.

**How it works**
- This reverses a rule the project states in four places: "no analytics, no tracking". The rule becomes "no tracking of people: anonymous counts only", and `Spec.md` section 9, `CLAUDE.md`, `CONTRIBUTING.md` and the About page are changed to say exactly what is counted.
- **No third-party script is loaded.** The site sends its own small request to GoatCounter's counting address. The service's own script would send the address's query string and the full referring address, and would run someone else's code on pages where people enter their finances.
- It counts three things: page views by address, where a visit came from (the referring site's name only), and the country, browser and screen size the service derives without storing an IP address.
- It also counts a short, fixed list of actions, to show what is used: prayer times shown, a Zakat result reached, an inheritance result reached, an adhkar category completed, and a tasbih target reached.
- An action is a name and nothing else. No amount, coordinate, place name, count, heir, search text or other input is ever sent, and one function, `track(name)`, is the only way to send one, so this can be tested.
- Nothing is stored on the device to recognise a returning visitor: no cookie, no `localStorage` entry, no fingerprint.
- Addresses are sent without their query string.
- A visitor whose browser sends Do Not Track or Global Privacy Control is not counted. A "Don't count my visits" switch on the About page does the same for anyone else, and is remembered on the device.
- Visits from WhatsApp arrive with no referrer and would show as "direct". Links made by Share to WhatsApp (feature 22) therefore carry a short source tag, which is counted and then removed from the address bar.
- The counting address is added to the content security policy. If the request is blocked or the service is down, nothing breaks and nothing is retried.
- Local development, tests and deploy previews are not counted.

**Tests**
- With the script blocked, every page works and the console shows no uncaught error.
- Opening one page records one page view with its address and no query string.
- Moving between three pages inside the app records three page views, one for each address.
- Reaching a Zakat result records the action's name once, and the request holds none of the amounts entered.
- Each action in the fixed list is recorded when it happens, and a name outside the list is refused.
- A hadith chapter address is recorded as it is, and a search or filter typed on a page is not sent.
- No cookie is set and nothing is added to `localStorage` by the statistics script.
- With Do Not Track or Global Privacy Control on, no request is sent.
- Turning on "Don't count my visits" stops requests at once, and it is still on after a reload.
- A link shared with a source tag is counted under that source, and the tag is gone from the address bar afterwards.
- On a deploy preview and in local development, no request is sent.
- The script adds no more than 5 KB to a first visit and does not delay the page becoming usable.
- A request to any address other than the statistics service is blocked by the content security policy.
- A visitor arrives from a shared WhatsApp link, completes the morning adhkar, and the dashboard shows one visit from WhatsApp and one adhkar completion, with nothing that could identify them.

**Done when:** The service's dashboard shows a day of real traffic by page, source and country and the five actions, and an inspection of the requests on every tool page finds nothing a visitor entered.

---

## Final

### 35. Final

**What it does:** Collects every decision and real-world check that was left for Zubair while features 6 to 33 were built without him. Each feature was built to the safe default named here. Nothing in this list blocks the code from running; each item is either a default to confirm or reverse, or a check that needs a real phone, the live site or a named person.

**How it works**
- Zubair goes through the two lists below, confirms or changes each decision, and carries out each outstanding check.
- A decision that is reversed is changed in the feature it belongs to, and that feature's tests are updated.
- A feature left unticked in the progress list is ticked once its outstanding check is done.

**Decisions to confirm**

| # | Feature | Decision | Built as | To reverse it |
|---|---|---|---|---|
| 1 | 6 | Which naira rate does the calculator use? | The official rate from the price dataset, with a note saying so and a typed price per gram as the way round it | Would need a street-rate source; none is free and reliable |
| 2 | 6 | Is a typed price offered only in naira, or in every currency? | Every currency | Hide the two fields unless naira is selected, in `ZakatView.vue` |
| 3 | 7 | Do spouses take part in radd? | No. The remainder returns to the other fixed-share heirs only. A spouse who is the only heir takes their fixed share and the rest is shown as a "Remainder" line with no recipient | Set `SPOUSE_TAKES_RADD` to true in `utils/inheritance.js` and update its tests |
| 4 | 7 | Does a grandfather exclude brothers and sisters? | Yes | Set `GRANDFATHER_EXCLUDES_SIBLINGS` to false; the grandfather-with-siblings sharing rules of the other schools would then need building |
| 5 | 7 | The Spec 5.9 table gave the mother 1/6 only beside a son, grandson or two siblings. Qur'an 4:11 gives each parent a sixth beside any child | Mother takes 1/6 beside any child or son's child, daughters included. Spec table corrected | Restore the old row; not advised, as it contradicts 4:11 |
| 6 | 7 | The table made the father a pure residuary beside daughters only | Father (or grandfather in his place) takes 1/6 plus the residue beside daughters or granddaughters only, so he keeps his sixth when shares are reduced | Remove the fixed sixth in `assignShares` |
| 7 | 7 | The table gave a sister 1/2 or 2/3 even beside a daughter | Beside a daughter or granddaughter, sisters take the residue (Sahih al-Bukhari 6736, verified against the text) | Remove the `sisterWithDaughters` branch |
| 8 | 7 | The table gave each grandmother 1/6 | Two grandmothers share one sixth between them. No reference is attached to this on the page beyond the existing "Hadith" label, because I could not verify a numbered source; a reviewer should supply one | Give each 1/6 in `assignShares` |
| 9 | 7 | Husband or wife with both parents (not covered by the table) | The mother takes a third of what is left after the spouse, so the father takes twice her share. This is the position of the four schools; no numbered source is cited on the page | Remove the `motherTakesThirdOfRemainder` branch |
| 10 | 7 | The whole inheritance engine | Built and tested against Spec 5.9, but not reviewed by a scholar. It should be before people rely on it | Name a reviewer |
| 11 | 11 | May location be saved on the device? (Reverses "location is never persisted" in Spec section 6) | Yes, only when the user presses "Remember this location"; kept on the device under `prayer-settings`; removed by "Forget my location". Privacy text updated on the About page and in Spec 6 and 9 | Remove the offer and the store; features 12, 19, 21, 23 and 24 depend on a saved location |
| 12 | 12 | How are fonts kept for offline use? | Google Fonts stay as they are; the worker keeps the font files a visitor has loaded. Self-hosting them would be more robust offline but adds files to maintain | Self-host the three typefaces and drop the Google Fonts links |
| 13 | 12 | The content security policy had a mistyped address, `cdn.jsdelivr.ne3t`, which blocked the first Zakat price source on the live site (the mirror was covering for it) | Corrected to `cdn.jsdelivr.net` | None needed; noted so you know prices on the live site were coming from the mirror |

**Checks only Zubair can do**

| # | Feature | Check |
|---|---|---|
| 1 | 12 | On a real Android phone and a real iPhone: install the app, turn on flight mode, open it from the home screen and read the morning adhkar; confirm prayer times (with a saved location) and tasbih also work. Then tick feature 12 |
| 2 | 12 | Run Lighthouse on the live site and confirm it reports the site as installable with no manifest or icon warnings |
| 3 | 12 | On a throttled "Slow 3G" connection, confirm a first visit to the home page is usable within five seconds, and that the Arabic and heading fonts still show after going offline on a second visit |
| 4 | 12 | After the next deploy, with a tab already open, confirm "Update available" appears and Refresh loads the new version |
| 5 | 13 | In Netlify, add `HADITH_API_KEY` (scoped to Functions) and delete `VITE_HADITH_API_KEY`. The old key was readable in the site's JavaScript, so get a fresh key from hadithapi.com and retire the old one |
| 6 | 13 | On production (or a deploy preview), browse from the book list to a chapter and confirm in the network panel that every request goes to `/api/hadith/` and no key appears. Also confirm a repeated request is served from the cache. Then tick feature 13 |
| 7 | 13 | Run `npx netlify-cli dev` once locally to confirm the function is picked up and the rewrite in `netlify.toml` reaches it. I could not run the Netlify CLI in this session |

**Done when:** Every row above is marked confirmed, changed or carried out, and every feature in the progress list is ticked.

---

## Decisions needed

Each of these blocks the feature named. A proposed default is given where there is one; the feature is written to that default.

| Decision | Blocks | Proposed default |
|---|---|---|
| Do spouses take part in radd? | 7 | No. Remainder returns to the other fixed-share heirs only |
| Does a grandfather exclude brothers and sisters? | 7 | Yes, he takes priority as residuary |
| Which naira rate does the calculator use? | 6 | The official rate, with the user able to type their own price per gram |
| May location be saved on the device? | 11 | Yes, by choice only. Reverses a rule in Spec section 6 |
| May a server hold rounded coordinates for push? | 24 | Yes, by choice only, rounded to about 1 km, deleted on request |
| May the site count visits at all? | 34 | **Decided:** Yes, as anonymous counts only. Reverses the "no analytics" rule in `Spec.md`, `CLAUDE.md`, `CONTRIBUTING.md` and the About page |
| Which statistics service? | 34 | **Decided:** GoatCounter: open source, no cookies, counts named actions, free for non-commercial sites |
| Are visitors asked first? | 34 | **Decided:** No banner. Nothing identifying is collected; Do Not Track is honoured and an opt-out switch is offered |
| Who reviews translations and new religious content? | 27, 28, 30 to 32 | Ask Zubair when the feature is reached. These features cannot be ticked without a named reviewer |

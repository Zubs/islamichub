# IslamicHub — Specification

This document describes what IslamicHub is, how it is built, and how each feature is expected to behave. It reflects the
codebase as of October 2026 (Vue 3 rewrite, after the Adhkar and Tasbih features landed).

Where the code and this spec disagree, treat it as a bug in one of them and fix whichever is wrong.
[Known gaps](#11-known-gaps) lists the disagreements already identified.

---

## 1. Overview

IslamicHub is a free, open-source Islamic education and utility site, served at `https://islamichub.xyz`. It combines
long-form guides to the Five Pillars with practical tools (prayer times, Qibla, Zakat, inheritance, adhkar, tasbih) and
a browsable hadith library.

### Goals

- Present authentic, sourced Islamic content: every scholarly claim carries a Qur'an or hadith reference.
- Provide tools that work without an account.
- Treat what users enter as private. Today nothing a user enters is sent to a server.
- Be fast and readable on mobile, with correct Arabic rendering.

### Non-goals

- Issuing religious rulings. Calculators are aids and say so; users are directed to a qualified scholar.
- Imposing a single madhab. Where schools differ, both positions are presented.

---

## 2. Tech stack

| Concern      | Choice                                                            |
|--------------|-------------------------------------------------------------------|
| Framework    | Vue 3 (`<script setup>`, Composition API), plain JavaScript       |
| Build        | Vite 8, `@` aliased to `src/`                                     |
| Routing      | Vue Router 5, `createWebHistory` (clean URLs, no hash)            |
| State        | Pinia setup stores                                                |
| Head / SEO   | `@unhead/vue`                                                     |
| Styling      | Global CSS with custom properties; scoped styles inside views     |
| Lint/format  | oxlint, ESLint (`eslint-plugin-vue`), Prettier                    |
| Offline      | `vite-plugin-pwa` (workbox)                                       |
| Testing      | Vitest with Vue Test Utils and jsdom; tests sit beside their code |
| Hosting      | Netlify (`npm test && npm run build` → `dist/`)                   |
| Node         | `^20.19.0 \|\| >=22.12.0`                                         |

There is no TypeScript. Server-side code is limited to Netlify Functions, added only where a feature needs one (see
[Server-side code](#server-side-code)).

### Scripts

| Command           | Purpose                                   |
|-------------------|-------------------------------------------|
| `npm run dev`     | Vite dev server                           |
| `npm run build`   | Production build to `dist/`               |
| `npm run preview` | Serve the production build locally        |
| `npm test`        | Run every test once                       |
| `npm run test:watch` | Re-run tests as files change           |
| `npm run lint`    | oxlint then ESLint, both with `--fix`     |
| `npm run format`  | Prettier over `src/`                      |

### Environment

| Variable              | Required | Purpose                                              |
|-----------------------|----------|------------------------------------------------------|
| `HADITH_API_KEY` | For the hadith library | API key for hadithapi.com, read only by the server-side proxy. Without it the proxy answers "not configured" and the library views show a "no API key" state. |

Copy `.env.example` to `.env` to set it for `netlify dev`. `.env` is git-ignored. The key is never compiled into the client bundle: `test/build.test.js` builds the site with a key set and fails if it appears in any built file.

---

## 3. Architecture

```
index.html              App shell; loads fonts and src/main.js
src/
  main.js               Creates the app; installs Pinia, router, unhead; imports global CSS
  App.vue               Loading screen, SiteNav, <RouterView> with page-fade transition, SiteFooter
  router/index.js       Route table (all views lazy-loaded)
  views/                One component per route
    pillar/             Faith, ArticlesOfFaith, Prayer, Zakat, Fasting, Hajj
    hadith/             HadithHome, HadithBooks, HadithBook, HadithChapter
    adhkar/             AdhkarHome, AdhkarCategory
    tools/              Inheritance, Tasbih
  components/           SiteNav, SiteFooter, QuranBlock, FaqList, GeoPattern, ZakatAccordion, adhkar/AdhkarCard
  stores/               zakat, adhkar, tasbih
  composables/          useSeo, useScrollReveal, useHadithApi
  utils/                prayer, qibla, hijri, inheritance, zakat, day, storage (pure functions, no Vue imports)
  data/                 adhkar, tasbihPhrases (static content)
  assets/css/           tokens, base, components, ornament
public/                 robots.txt, sitemap.xml, favicons, app icons, sw-legacy.js (clears the old app's cache)
scripts/                make-icons.py (draws the app icons)
netlify.toml            Build, SPA redirect, security and cache headers
```

### Layering rules

- **`utils/`** holds calculation logic as pure, framework-free functions. Views call them; they never touch the DOM or
  stores.
- **`data/`** holds static religious content. Content changes should not require touching view logic.
- **`stores/`** own state that is shared across views or persisted. View-local form state stays in the view.
- **Views** compose the above and call `useSeo` and `useScrollReveal`.

### App shell behaviour

- `App.vue` shows a full-screen Bismillah loading screen only until the first route is ready to draw
  (`router.isReady()`), with no minimum time. It waits for no outside service.
- Prices are requested by the Zakat page when it opens, once per visit; no other page requests them.
- Route changes use an `out-in` fade keyed on `route.path`.
- Navigation scrolls to the top instantly, except on back/forward, where the saved position is restored.

### Server-side code

Server-side code lives in `netlify/functions/` and is added only where a feature calls for it.

- **`hadith.js`** serves `/api/hadith/*` (a rewrite in `netlify.toml`, placed before the SPA rule). It forwards three
  read requests to hadithapi.com with `HADITH_API_KEY` added: `books`, `<book>/chapters`, and `hadiths` with only
  `book`, `chapter`, `hadithNumber`, `page` and `paginate` (at most 100). Anything else is rejected without an upstream
  call. Successful replies are cacheable for a day; errors are `no-store`, written by the proxy and never contain the
  key. The upstream call is abandoned after nine seconds. With no key it answers 503 `not_configured`.
- `netlify dev` runs functions locally. Plain `npm run dev` has no proxy.

Still open: proxying and caching metal prices and exchange rates, and optional sync of streaks and totals across devices.

---

## 4. Routes

| Path                                      | Name                | View                  |
|-------------------------------------------|---------------------|-----------------------|
| `/`                                       | `home`              | HomeView              |
| `/faith`                                  | `faith`             | FaithView             |
| `/faith/articles`                         | `articles-of-faith` | ArticlesOfFaithView   |
| `/prayer`                                 | `prayer`            | PrayerView            |
| `/zakat`                                  | `zakat`             | ZakatView             |
| `/fasting`                                | `fasting`           | FastingView           |
| `/hajj`                                   | `hajj`              | HajjView              |
| `/hadith`                                 | `hadith`            | HadithHomeView        |
| `/hadith/books`                           | `hadith-books`      | HadithBooksView       |
| `/hadith/books/:bookSlug`                 | `hadith-book`       | HadithBookView        |
| `/hadith/books/:bookSlug/hadith/:hadithNumber` | `hadith-single` | HadithView          |
| `/hadith/books/:bookSlug/:chapterNumber`  | `hadith-chapter`    | HadithChapterView     |
| `/adhkar`                                 | `adhkar`            | AdhkarHomeView        |
| `/adhkar/:categorySlug`                   | `adhkar-category`   | AdhkarCategoryView    |
| `/tasbih`                                 | `tasbih`            | TasbihView            |
| `/inheritance`                            | `inheritance`       | InheritanceView       |
| `/about`                                  | `about`             | AboutView             |
| `/changelog`                              | `changelog`         | ChangelogView         |
| `/:pathMatch(.*)*`                        | `not-found`         | NotFoundView          |

All views are code-split via dynamic import. The catch-all must remain last.

---

## 5. Features

### 5.1 Pillar guides

Each of Faith, Prayer, Zakat, Fasting, and Hajj has an educational page built from the same parts: a page header with
ornaments, Qur'anic verse blocks (Arabic + translation + reference), hadith blocks, structured prose, and an FAQ
accordion. `/faith/articles` covers the articles of faith as a sub-page of Faith.

Requirements:

- Arabic text is marked `lang="ar"`, rendered right-to-left in the Arabic typeface.
- Every verse and hadith shows its reference (surah:ayah, or collection + Arabic-edition number).

### 5.2 Prayer times (`/prayer`)

Computed locally by `utils/prayer.js` from latitude, longitude, date, UTC offset, method and Asr option.

- **Outputs:** Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha as `HH:MM` in the device's timezone.
- **Methods:**

  | Key       | Authority                 | Fajr  | Isha                    |
  |-----------|---------------------------|-------|-------------------------|
  | `MWL`     | Muslim World League       | 18°   | 17°                     |
  | `ISNA`    | Islamic Society of NA     | 15°   | 15°                     |
  | `Egypt`   | Egyptian Authority        | 19.5° | 17.5°                   |
  | `Makkah`  | Umm al-Qura               | 18.5° | 90 minutes after Maghrib |
  | `Karachi` | University of Karachi     | 18°   | 18°                     |

  Default is `MWL`; an unknown key falls back to `MWL`.
- **Sunrise/Maghrib** use a sun altitude of −0.833°.
- **Asr** takes an option: `standard` (shadow factor 1, the default, followed by the Shafi'i, Maliki and Hanbali
  schools) or `hanafi` (shadow factor 2). An unknown option falls back to `standard`. The Prayer page has a selector
  for it beside the calculation method; changing either recalculates times that are already shown. The Fasting page
  is unaffected.
- **Next prayer:** `getNextPrayer` returns the next upcoming time and minutes remaining; after Isha it returns
  tomorrow's Fajr. The countdown must recompute on each tick rather than cache the first value.
- **Location** comes from the browser Geolocation API (10 s timeout), reverse-geocoded to a place name via Nominatim.
  If permission is denied, the user is told to enter coordinates manually.
- **Coordinates** are accepted from −90 to 90 latitude and −180 to 180 longitude.
- **Saved settings:** once times are shown, the page offers "Remember this location". Accepting saves the location,
  method and Asr method through `stores/prayerSettings.js`; later visits to the Prayer and Fasting pages show times
  without asking, and a change of method is remembered. `utils/prayerSettings.js` validates what is read.

### 5.3 Qibla (`/prayer`)

`utils/qibla.js`, using the Kaaba at 21.4225° N, 39.8262° E.

- Bearing: initial great-circle bearing, degrees clockwise from true north, rounded to the nearest degree.
- Compass label: one of eight points (N, NE, E, SE, S, SW, W, NW).
- Distance: haversine distance in km (Earth radius 6371 km), rounded.

### 5.4 Zakat calculator (`/zakat`)

**Inputs** (all in the selected currency unless noted):

| Group        | Fields                                                              |
|--------------|---------------------------------------------------------------------|
| Cash         | at home, current account, savings, foreign currency                 |
| Owed to you  | loans given, unpaid income, other                                   |
| Metals       | gold (grams + purity, default 22k = 0.9167), silver (grams), direct value |
| Investments  | shares, ISAs, business inventory, pension                           |
| Debts        | loans due, credit cards, bills, other                               |

**Calculation:**

```
metals     = goldGrams × goldPrice × purity + silverGrams × silverPrice + metalsDirect
gross      = cash + owed + metals + investments
net        = max(0, gross − debts)
nisab      = 85 g × goldPrice      (gold method, default)
           = 595 g × silverPrice   (silver method)
zakat due  = net × 2.5%   if net ≥ nisab, otherwise 0
```

The page shows a line-by-line breakdown, whether Zakat is obligatory and progress toward the nisab (capped at 100%).

**Currencies:** GBP (default), USD, EUR, SAR, NGN. Amounts are formatted with the currency symbol, thousands separators
and two decimals. Naira prices use the official exchange rate, and the page says so when naira is selected.

**Typed prices:** the user can type their own price per gram for gold and for silver in the selected currency. A typed
price replaces the fetched one for both the calculation and the nisab, and the page marks it as in use. Zero, a negative
number or text is rejected and the fetched price kept. Typed prices are cleared when the currency changes and are never
stored or sent.

**Prices:** `stores/zakat.js` fetches one daily dataset that holds gold, silver and the exchange rates on a US dollar
base. Metal prices are kept in dollars per troy ounce and rates as units per dollar, and `pricePerGram(metal, currency)`
is the only conversion: dollars per ounce ÷ 31.1035 × the currency's rate. The dataset is tried at jsDelivr and then at
its mirror, each with a six-second limit. A price or rate is used only if it is a positive number; rates are used only
when all five are valid. Otherwise the built-in reference values are used (gold $4,186.27 and silver $60.83 per ounce,
GBP 0.7555, EUR 0.8928, SAR 3.75, NGN 1,331.59, dated 12 October 2026). Metals and rates are flagged separately (`metalsFetched`,
`ratesFetched`), and the page states which are in use and the date the prices are from.

The arithmetic lives in `utils/zakat.js` (`calculateZakat`, `nisabFor`, `perGram`, `parsePrices`, `parseCustomPrice`). Net wealth is
compared with the nisab to the penny.

Nothing entered into the calculator is persisted or transmitted.

### 5.5 Fasting (`/fasting`)

- Current Hijri date from `utils/hijri.js` (arithmetic approximation; may differ from a sighted calendar by a day or
  so).
- Days until Ramadan, or an "it is Ramadan" state when the Hijri month is 9.
- Suhoor and Iftar times derived from Fajr and Maghrib for the user's location, with a fasting-progress bar.

### 5.6 Hadith library (`/hadith/*`)

- `/hadith` — educational overview: what hadith is, isnad, grades, major scholars.
- `/hadith/books` — nine collections from static `BOOKS_META`: Sahih al-Bukhari, Sahih Muslim, Jami' al-Tirmidhi,
  Sunan Abu Dawood, Sunan Ibn Majah, Sunan an-Nasa'i, Mishkat al-Masabih, Musnad Ahmad, Al-Silsila al-Sahiha. Each
  shows the author, death date, grade, hadith count, and a description.
- `/hadith/books/:bookSlug` — chapter list fetched from hadithapi.com through the proxy.
- `/hadith/books/:bookSlug/:chapterNumber` — hadiths in the chapter, 25 per page, with:
  - numbered pagination with ellipsis (all pages shown when there are 7 or fewer),
  - previous/next chapter links,
  - a grade badge per hadith (Sahih, Hasan, Da'eef, Mawdu', or neutral for unknown),
  - expand/collapse per hadith,
  - copy to clipboard as `<English text>\n\n— <Book name>, Hadith <number>`.
  - a link from each hadith's number to its own page.
- `/hadith/books/:bookSlug/hadith/:hadithNumber` — one hadith: Arabic text, English text, narrator where given, grade,
  book and chapter; Copy (the same text as the chapter list) and Share (the device's share sheet with the canonical
  address, or the address copied where there is none); links to the previous and next hadith and back to its chapter.
  The first hadith has no previous link, and the last (the book's `hadithCount` in `BOOKS_META`) no next link. An
  unknown book, a number that is not a whole positive number, or a number with no hadith shows "Hadith not found",
  marked `noindex`; a failed request shows an error with a retry button. Title and description come from the hadith.
  `utils/hadith.js` holds what this page and the chapter list share (address, copy text, grade badge).

**Citations.** Every hadith reference on the site is written as a collection name and Arabic-edition number and
rendered through `HadithRef` (inline text) or `HadithBlock` (a quoted hadith with its source line). `utils/hadithRefs.js`
parses the text: a reference to a collection the library holds becomes a link to its single-hadith page, and anything
else stays text. `data/hadithNumbering.js` maps cited numbers to library numbers where they differ; Sahih Muslim is
cited by the 'Abd al-Baqi numbering while the library counts its narrations sequentially, so every Sahih Muslim
reference has an entry (provisional until confirmed against the library). `test/citations.test.js` opens every page and
fails on a reference left as plain text; `test/citations.live.test.js`, given `CITATIONS_BASE`, requests every cited
hadith through the proxy.

Views must handle these non-happy states: no API key configured on the server, request in flight, request failed, and
offline with nothing saved.

**Daily hadith.** `data/dailyHadith.js` holds 67 short hadiths from Sahih al-Bukhari, each with its text (copied word
for word from the open fawazahmed0/hadith-api dataset), narrator and reference. `dailyHadithFor(dayKey, list)` in
`utils/dailyHadith.js` picks one from the local day key, so every visitor sees the same hadith on the same date, it
changes at local midnight, and the list starts again after its last entry. `DailyHadith.vue` shows it on the home page
in a `HadithBlock`, whose reference links to the hadith in the library. It makes no request, so it works offline; an
empty list renders nothing.

### 5.7 Adhkar (`/adhkar`, `/adhkar/:categorySlug`)

Static content from `data/adhkar.js`: 18 adhkar across six categories.

| Slug          | Category        | When                              |
|---------------|-----------------|-----------------------------------|
| `morning`     | Morning Adhkar  | After Fajr until sunrise          |
| `evening`     | Evening Adhkar  | After Asr until Maghrib           |
| `after-salah` | After Prayer    | After each of the five prayers    |
| `sleep`       | Before Sleep    | Before sleeping                   |
| `waking`      | Upon Waking     | Upon waking                       |
| `general`     | General Dhikr   | Any time                          |

Each dhikr has: `id`, `categories[]`, `arabic`, `transliteration`, `translation`, `reference`, `repeat`, and `virtue`.
A dhikr may belong to several categories.

Behaviour (`stores/adhkar.js`):

- **Tap to count.** Each tap on a card increments its count toward `repeat`. Tapping once more after reaching the
  target resets it to 0. Counts are held in memory for the session only.
- **Complete a category.** Marks the category done for today, records it in the completion log, and clears the
  session counts for that category's adhkar. Completing twice in one day is a no-op.
- **Streak.** The number of consecutive days, counting back from today, on which the category was completed. A streak
  is zero if today is not yet complete.
- **Today** is the device's local calendar day (see [State and persistence](#6-state-and-persistence)).

### 5.8 Tasbih counter (`/tasbih`)

Six preset phrases from `data/tasbihPhrases.js`, each with Arabic, transliteration, translation, and a default target:

| Phrase                                | Default target |
|---------------------------------------|----------------|
| SubḥānAllāh                           | 33             |
| Alḥamdulillāh                         | 33             |
| Allāhu Akbar                          | 34             |
| Lā ilāha illallāh                     | 100            |
| Astaghfirullāh                        | 100            |
| Lā ḥawla wa lā quwwata illā billāh    | 100            |

Behaviour (`stores/tasbih.js`):

- **Tap** increments the session count and the persisted total for today and the active phrase.
- **Target reached:** the device vibrates for 60 ms when the count equals the target, where supported. Counting
  continues past the target.
- **Reset** zeroes the session count only; totals are untouched.
- **Custom target:** rounded to an integer, minimum 1.
- **Switching phrase** resets the session count and target to the new phrase's default, and remembers the selection.
- **Stats:** today and lifetime totals, for the current phrase and across all phrases. "Today" is the device's local
  calendar day.

### 5.9 Inheritance calculator (`/inheritance`)

`utils/inheritance.js` takes a map of heir counts and an estate value and returns each heir's share label, percentage,
and amount.

**Heirs and fixed shares (13 types):**

| Heir                  | Share                                                                          | Excluded by                                  |
|-----------------------|--------------------------------------------------------------------------------|----------------------------------------------|
| Husband               | 1/4 with descendants, else 1/2                                                 | —                                            |
| Wife / wives          | 1/8 with descendants, else 1/4 (shared)                                        | —                                            |
| Father                | 1/6 with a son or grandson; 1/6 plus the residue with daughters or granddaughters only; else residuary | —                    |
| Mother                | 1/6 with descendants or 2+ siblings; else 1/3 (a third of the remainder beside a spouse and the father) | —                   |
| Son(s)                | Residuary                                                                      | —                                            |
| Daughter(s)           | 1/2 (one), 2/3 (two or more); residuary alongside a son                        | —                                            |
| Grandson (son's son)  | Residuary                                                                      | son                                          |
| Granddaughter         | 1/2 (one), 2/3 (two or more); 1/6 with one daughter; residuary with a grandson | son; two or more daughters unless a grandson is present |
| Full brother(s)       | Residuary                                                                      | son, grandson, father, paternal grandfather  |
| Full sister(s)        | 1/2 (one), 2/3 (two or more); residuary alongside a brother, or beside a daughter or granddaughter | son, grandson, father, paternal grandfather |
| Paternal grandfather  | As the father, in his absence                                                  | father                                       |
| Paternal grandmother  | 1/6, shared with the other grandmother if both inherit                         | father, mother                               |
| Maternal grandmother  | 1/6, shared with the other grandmother if both inherit                         | mother                                       |

"Descendants" means a son, daughter, son's son or son's daughter. Sources: Qur'an 4:11, 4:12 and 4:176, and Sahih
al-Bukhari 6736 for the granddaughter's sixth and the sister's residue beside a daughter.

**Algorithm** (`calcInheritance` returns `{ error, shares }`; shares are exact fractions until the last step):

1. Validate: at least one heir; not a husband and a wife together; at most four wives; whole, non-negative counts; a
   non-negative numeric estate. Otherwise return a message and no shares.
2. Drop excluded heirs (hijab).
3. Assign fixed shares and pick the residuary class.
4. If fixed shares exceed the estate, reduce them proportionally ('awl).
5. Give any remainder to the first residuary class present: sons with daughters; grandsons with granddaughters; father;
   paternal grandfather; brothers with sisters; sisters beside daughters. Within a class a male receives twice the share
   of a female.
6. If there is a remainder and no residuary, return it to the fixed-share heirs other than the spouse, in proportion to
   their shares (radd). A spouse who is the only heir keeps the fixed share and the rest is shown as a "Remainder" line.
7. Report, per line: the share label (the final fraction, so it always matches the percentage), the rule that produced
   it, the percentage (1 dp, totalling 100) and the amount. Each person's amount is rounded to the penny and any
   leftover penny goes to the largest share, so the amounts total the estate.

Two points of scholarly difference are fixed by named constants in `utils/inheritance.js`: spouses take no part in
radd, and a paternal grandfather excludes brothers and sisters. Half-siblings, distant kindred and bequests are not
covered.

The page must state prominently that the result is a guide and not a ruling.

### 5.10 About, Changelog, 404

- **About** — mission, guiding principles, scholarly sources, contributors.
- **Changelog** — version history, mirroring `CHANGELOG.md`.
- **404** — shown for any unmatched path, with a route back to the home page.

---

## 6. State and persistence

All persistence is currently `localStorage`. There are no cookies and no remote storage.

| Key                      | Shape                                         | Owner         |
|--------------------------|-----------------------------------------------|---------------|
| `adhkar-completion-log`  | `{ "YYYY-MM-DD": ["morning", ...] }`          | adhkar store  |
| `tasbih-current-phrase`  | phrase id string                              | tasbih store  |
| `tasbih-totals`          | `{ "YYYY-MM-DD": { [phraseId]: count } }`     | tasbih store  |
| `stats-opt-out`          | `"1"` when opted out, absent otherwise        | useStats      |
| `zakat-prices`           | `{ usdPerOunce, rates, date }` as last fetched | zakat store   |
| `prayer-settings`        | `{ lat, lng, name, method, asrMethod }`, only after the user chooses "Remember this location" | prayerSettings store |

Rules:

- Reads must tolerate missing or corrupt JSON, and valid JSON that is not a keyed record (`null`, a number, a string,
  a list), and fall back to an empty value. `utils/storage.js` provides `parseStoredObject` for this.
- Anything recorded by day is keyed by the device's local date as `YYYY-MM-DD`, so the day changes at local midnight.
  `utils/day.js` is the only place a day key is built (`dayKey`) or stepped (`addDays`).
- Zakat and inheritance inputs are never persisted. The user's location is persisted only when they choose "Remember
  this location" on the Prayer page, under `prayer-settings`, and "Forget my location" removes it. Settings with an
  impossible location are read as none; an unknown method falls back to the default. If the browser blocks storage the
  page works for the visit and says the location cannot be remembered.
- Changing a stored shape requires a migration or a new key, since existing users have data under the current keys.

---

## 6a. Installable and offline

- `vite-plugin-pwa` builds a service worker (workbox, `generateSW`) served from `/service-worker.js`, and
  `manifest.webmanifest` with 192px, 512px and maskable icons and shortcuts to Prayer, Adhkar and Tasbih.
- Every built file is precached on the first visit, so every route opens offline; `index.html` answers any navigation.
- Google Fonts files are kept `CacheFirst` once loaded. Because the first page loads before the worker controls it,
  `usePwa.js` re-requests the font addresses the page has already loaded once the worker is ready.
- Hadith requests (`/api/hadith/`) are `NetworkFirst` with a three-second limit,
  so a book or chapter viewed online opens offline. One never viewed shows an "offline, not saved yet" message.
- The Zakat store keeps the last fetched prices under `zakat-prices`. When a fetch fails they are used in preference to
  the built-in reference prices, and the page marks them "saved" with their age in days.
- Prayer times, Qibla, adhkar and tasbih need no server. Prayer times offline need a saved location.
- A new deploy shows "Update available" with a Refresh button (`registerType: 'prompt'`); nothing reloads by itself.
  `AppInstall.vue` also shows an Install button when the browser offers installation, and an "Add to Home Screen" note
  in Safari on iPhone.
- `public/sw-legacy.js` is loaded by the worker. If the old app's `islamichub-shell-v2` cache is on the device it takes
  over at once, deletes that cache and reloads open pages. That name must never be reused.
- `test/build.test.js` builds the site and fails if the home page's document, scripts and styles exceed 600 KB, if a
  manifest icon is missing, or if any script or stylesheet is left out of the precache.
- Every feature built from here on must work offline unless it says it needs a connection.

---

## 7. External services

| Service                         | Used for                         | On failure                                  |
|---------------------------------|----------------------------------|---------------------------------------------|
| `cdn.jsdelivr.net`              | Daily gold, silver and FX rates (currency-api dataset) | Tries the mirror, then reference prices; flagged |
| `latest.currency-api.pages.dev` | Mirror of the same dataset       | Reference prices; flagged as not current    |
| `nominatim.openstreetmap.org`   | Reverse geocoding a place name   | Shows "Your location"                       |
| `hadithapi.com` (server-side only, through `/api/hadith/`) | Books, chapters, hadiths | The proxy answers with an error within ten seconds; error state in the view |
| `islamichub.goatcounter.com`    | Anonymous usage statistics       | Dropped silently; page works normally       |
| Google Fonts                    | Amiri, Cormorant Garamond, DM Sans | System font fallbacks                     |

Every external call must fail soft: the page stays usable and no error is thrown to the user unhandled. Adding a new
origin requires updating `connect-src` (or the relevant directive) in the CSP in `netlify.toml`.

---

## 8. Design system

Tokens live in `src/assets/css/tokens.css`. Components must use tokens rather than hard-coded values.

- **Colour:** cream background (`--cream`), green primary (`--green`), gold accent (`--gold`), ink text (`--ink`),
  muted text (`--muted`). Each pillar has an accent pair: faith (purple), prayer (green), zakat (gold), fasting (blue),
  hajj (brown).
- **Type:** `--serif` Cormorant Garamond for headings, `--sans` DM Sans for UI, `--arabic` Amiri for all Arabic. Base
  size 17 px.
- **Spacing:** 4 px scale, `--space-1` through `--space-16`.
- **Radii:** 6 / 10 / 14 / 20 px. **Shadows:** three levels.
- **Ornament** (`ornament.css`): 8-pointed star background grid, Kufic dividers, hanging ornaments, calligraphy frame
  with corner accents.
- **Motion:** elements with `.anim-target` fade up when 10% visible, staggered by 70 ms, once per page view. Page
  headers animate in on every route load.

Stylesheet responsibilities: `tokens.css` (variables), `base.css` (reset, typography, layout), `components.css`
(nav, footer, cards, tools), `ornament.css` (Islamic geometric elements).

---

## 9. SEO, accessibility, and privacy

### SEO

- Every route sets a title, description, Open Graph and Twitter tags, and a canonical URL through `useSeo`, the only
  way a view sets its head (a lint rule forbids importing `@unhead/vue` in views and components). `useSeo` takes a key
  into its `PAGE_META` table, or a title and description that may be values, refs or getters, so a title can arrive
  after the page opens. A page that gives neither gets the site's defaults.
- The canonical URL is the site address plus the route's path, with no query string. The 404 page is marked `noindex`.
- `test/sitemap.test.js` fails if a fixed route is missing from `sitemap.xml` or the sitemap lists an address no route
  serves.
- `robots.txt` and `sitemap.xml` are served from `public/` and must be updated when routes are added.

### Accessibility

- Semantic landmarks (`<nav>`, `<main>`, `<footer>`) and a logical heading order.
- All interactive elements are keyboard-reachable and have accessible names.
- Decorative ornaments and icons carry `aria-hidden="true"`.
- The loading screen is exposed as `role="status"`.

### Privacy

- No tracking of people: anonymous counts only, and currently no accounts.
- Location is requested only on user action and sent only to Nominatim for a place name. It is kept in memory unless
  the user chooses to remember it, in which case it is saved on the device only (`prayer-settings`) and can be removed
  with "Forget my location". It never reaches a server of ours.
- Financial and family details entered into calculators do not leave the device.
- Anonymous usage statistics (page views, referring site name, and five named tool actions) are sent to GoatCounter, a cookieless statistics service, only on the live site and only when configured. Do Not Track and Global Privacy Control are honoured; an opt-out switch is on the About page.
- Nothing a visitor enters (amounts, coordinates, heirs, search text) is ever included in a counting request.
- If a backend is added, anything it stores about a user must be opt-in, and the tools must keep working without
  signing in.

---

## 10. Deployment

Netlify runs the tests and then builds (`npm test && npm run build`), and publishes `dist/`. A failing test stops the
deploy.

- **SPA fallback:** every path rewrites to `/index.html` with status 200.
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, strict referrer policy, a
  permissions policy allowing only same-origin geolocation, and a CSP restricting scripts to self and connections to
  the services in section 7.
- **Caching:** hashed `/assets/*` are immutable for a year; `index.html` and `service-worker.js` are never cached;
  sitemap and robots for a day; favicons for a week.

---

## 11. Known gaps

Places where the code does not yet meet this spec, or where supporting files are out of date.

### Correctness

- **Zakat prices are daily, and the built-in reference prices age.** Prices come from one dataset maintained by one
  person. If it is unavailable the calculator falls back to reference prices dated 12 October 2026, and says so.

### Housekeeping

- **In-progress adhkar counts are lost on reload.** They are held in memory only.
- **Tests cover only part of the code.** `utils/prayer.js`, `utils/qibla.js`, `utils/hijri.js` and the adhkar and tasbih
  stores are tested. The composables and most views are not yet.
- **A damaged entry inside a stored record is not handled.** A stored record of the wrong kind is read as empty, but
  a valid record holding a bad entry (for example a day whose value is `null` under `adhkar-completion-log` or
  `tasbih-totals`) would still throw.
- **"Today" is not refreshed while a page stays open.** A page left open past local midnight shows the previous
  day's state until it is next re-read.

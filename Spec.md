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
| Testing      | Vitest with Vue Test Utils and jsdom; tests sit beside their code |
| Hosting      | Netlify (`npm test && npm run build` → `dist/`)                   |
| Node         | `^20.19.0 \|\| >=22.12.0`                                         |

There is no TypeScript. The app is currently client-only; a backend is not ruled out (see
[Backend](#backend-open)).

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
| `VITE_HADITH_API_KEY` | For the hadith library | API key for hadithapi.com. Without it the library views show a "no API key" state instead of fetching. |

Copy `.env.example` to `.env` to set it. `.env` is git-ignored. Because the variable is `VITE_`-prefixed it is compiled into the client bundle and is visible to
anyone who loads the site.

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
  utils/                prayer, qibla, hijri, inheritance, day, storage (pure functions, no Vue imports)
  data/                 adhkar, tasbihPhrases (static content)
  assets/css/           tokens, base, components, ornament
public/                 robots.txt, sitemap.xml, favicons, service-worker.js (retires the old app's worker)
netlify.toml            Build, SPA redirect, security and cache headers
```

### Layering rules

- **`utils/`** holds calculation logic as pure, framework-free functions. Views call them; they never touch the DOM or
  stores.
- **`data/`** holds static religious content. Content changes should not require touching view logic.
- **`stores/`** own state that is shared across views or persisted. View-local form state stays in the view.
- **Views** compose the above and call `useSeo` (or `useHead` directly for dynamic titles) and `useScrollReveal`.

### App shell behaviour

- On mount, `App.vue` calls `zakat.fetchPrices()` and shows a full-screen Bismillah loading screen until it settles,
  with a minimum display time of 2 seconds.
- Route changes use an `out-in` fade keyed on `route.path`.
- Navigation scrolls to the top instantly, except on back/forward, where the saved position is restored.

### Backend (open)

The project is open to adding a backend; none exists yet, and its shape is undecided. Things in the current code that
would benefit from one:

- Proxying hadithapi.com so the API key stays out of the client bundle.
- Proxying and caching metal prices and FX rates, so there is one consistent rate base and fewer third-party failures.
- Optional sync of adhkar streaks and tasbih totals across devices.

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

Computed locally by `utils/prayer.js` from latitude, longitude, date, UTC offset, and method.

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
- **Asr** uses the standard (Shafi'i) shadow factor of 1.
- **Next prayer:** `getNextPrayer` returns the next upcoming time and minutes remaining; after Isha it returns
  tomorrow's Fajr. The countdown must recompute on each tick rather than cache the first value.
- **Location** comes from the browser Geolocation API (10 s timeout), reverse-geocoded to a place name via Nominatim.
  If permission is denied, the user is told to enter coordinates manually.

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

**Currencies:** GBP (default), USD, EUR, SAR. Amounts are formatted to two decimals with the currency symbol.

**Prices:** `stores/zakat.js` fetches gold and silver spot prices (USD per troy ounce) from metals.live and FX rates
from frankfurter.app, converting to a per-gram price. If the price fetch fails, fallback values are used (gold
£113.42/g, silver £1.07/g) and `pricesLive` is `false`; the UI must make clear when prices are not live.

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
- `/hadith/books/:bookSlug` — chapter list fetched from hadithapi.com.
- `/hadith/books/:bookSlug/:chapterNumber` — hadiths in the chapter, 25 per page, with:
  - numbered pagination with ellipsis (all pages shown when there are 7 or fewer),
  - previous/next chapter links,
  - a grade badge per hadith (Sahih, Hasan, Da'eef, Mawdu', or neutral for unknown),
  - expand/collapse per hadith,
  - copy to clipboard as `<English text>\n\n— <Book name>, Hadith <number>`.

Views must handle three non-happy states: no API key configured, request in flight, and request failed.

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

| Heir                  | Share                                                              | Blocked by                     |
|-----------------------|--------------------------------------------------------------------|--------------------------------|
| Husband               | 1/4 with descendants, else 1/2                                     | —                              |
| Wife / wives          | 1/8 with descendants, else 1/4 (shared)                            | —                              |
| Father                | 1/6 with son or grandson, else residuary                           | —                              |
| Mother                | 1/6 with son, grandson, or 2+ siblings; else 1/3                   | —                              |
| Son(s)                | Residuary                                                          | —                              |
| Daughter(s)           | 1/2 (one), 2/3 (two or more); residuary alongside a son            | —                              |
| Grandson (son's son)  | Residuary                                                          | son                            |
| Granddaughter         | 1/2 alone; 1/6 with one daughter; residuary with grandson          | son, two or more daughters     |
| Full brother(s)       | Residuary                                                          | son, grandson, father          |
| Full sister(s)        | 1/2 (one), 2/3 (two or more); residuary alongside a brother        | son, grandson, father          |
| Paternal grandfather  | 1/6 with son or grandson, else residuary                           | father                         |
| Paternal grandmother  | 1/6                                                                | father, mother                 |
| Maternal grandmother  | 1/6                                                                | mother                         |

**Algorithm:**

1. Drop blocked heirs (hijab).
2. Assign fixed shares; collect the rest as residuaries.
3. If fixed shares exceed the estate, reduce them proportionally ('awl).
4. Distribute any remainder to the residuaries. Within a class, a male receives twice the share of a female (son and
   daughter, brother and sister).
5. If there is a remainder and no residuary, return it to the fixed-share heirs in proportion to their shares (radd).
6. Report percentage (1 dp) and amount (2 dp).

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

Rules:

- Reads must tolerate missing or corrupt JSON, and valid JSON that is not a keyed record (`null`, a number, a string,
  a list), and fall back to an empty value. `utils/storage.js` provides `parseStoredObject` for this.
- Anything recorded by day is keyed by the device's local date as `YYYY-MM-DD`, so the day changes at local midnight.
  `utils/day.js` is the only place a day key is built (`dayKey`) or stepped (`addDays`).
- Zakat inputs, inheritance inputs, and the user's location are never persisted.
- Changing a stored shape requires a migration or a new key, since existing users have data under the current keys.

---

## 7. External services

| Service                         | Used for                         | On failure                                  |
|---------------------------------|----------------------------------|---------------------------------------------|
| `api.metals.live`               | Gold and silver spot prices      | Fallback prices; flagged as not live        |
| `api.frankfurter.app`           | FX rates                         | Built-in fallback rates                     |
| `nominatim.openstreetmap.org`   | Reverse geocoding a place name   | Shows "Your location"                       |
| `hadithapi.com`                 | Books, chapters, hadiths         | Error state in the view                     |
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

- Every route sets a title, description, Open Graph and Twitter tags, and a canonical URL matching its path. Static
  routes do this through `useSeo`; dynamic routes (hadith book and chapter, adhkar category) use `useHead` with loaded
  data.
- `robots.txt` and `sitemap.xml` are served from `public/` and must be updated when routes are added.

### Accessibility

- Semantic landmarks (`<nav>`, `<main>`, `<footer>`) and a logical heading order.
- All interactive elements are keyboard-reachable and have accessible names.
- Decorative ornaments and icons carry `aria-hidden="true"`.
- The loading screen is exposed as `role="status"`.

### Privacy

- No analytics or tracking, and currently no accounts.
- Location is requested only on user action, used in memory, and sent only to Nominatim for a place name.
- Financial and family details entered into calculators do not leave the device.
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

- **Neither price service works, so the Zakat calculator always uses its built-in fallback prices.**
  `api.metals.live` no longer answers (its TLS handshake fails). `api.frankfurter.app` now redirects to
  `api.frankfurter.dev`, and the redirect carries no CORS header, so the browser blocks it; the new address is not in
  the content security policy either, and its reply no longer includes SAR. Because prices are fetched when the app
  starts, every page logs a CORS error to the console. Found on 12 October 2026.
- **Zakat FX rates mix two bases.** The store's initial `FX` table is relative to GBP, but `fetchFX` overwrites GBP,
  EUR, and SAR with USD-based rates while leaving `USD` at its GBP-based value. After a successful fetch, selecting GBP
  multiplies prices by roughly 0.77 instead of 1.
- **Inheritance engine departs from the table in 5.9.**
  - A sister is blocked outright by a brother and receives nothing, instead of sharing the residue 2:1.
  - A granddaughter is blocked by a single daughter, so her 1/6 share is unreachable.
  - Residuaries other than son + daughter split equally per head, with no priority order between classes.
  - Radd happens implicitly through normalisation and includes the spouse: a wife and one daughter come out at 20% and
    80%, while the share label still reads 1/8. Whether spouses take part in radd is a point of scholarly difference
    and should be an explicit decision.
  - Arithmetic is floating-point, not fractional.
- **SEO is set two ways.** The hadith, adhkar, tasbih, and articles-of-faith views call `useHead` directly, so their
  entries in `useSeo`'s `ROUTE_META` are unused. `useSeo` also builds canonical URLs from the route name, which is only
  correct while name and path match; it would be wrong for `hadith-books` or `articles-of-faith` if they adopted it. The hadith, adhkar, and tasbih views set no canonical link
  at all.
- **Asr is Shafi'i only.** There is no Hanafi option, and the file header mentions Tehran and Jafari methods that do
  not exist.

### Housekeeping

- **There is no web manifest and no offline support.** The old manifest pointed to icons that did not exist and was
  removed. `public/service-worker.js` exists only to retire the old app's worker in returning visitors' browsers: it
  clears their caches, unregisters itself and caches nothing. It must stay until a real worker is served from the same
  address.
- **The hadith API key ships in the client bundle.** Keeping it secret needs a server-side proxy, which is the most immediate
  reason to add a backend.
- **In-progress adhkar counts are lost on reload.** They are held in memory only.
- **The loading screen blocks every entry route** for at least 2 seconds on the price fetch, including pages that do
  not use prices.
- **Tests cover only part of the code.** `utils/prayer.js`, `utils/qibla.js`, `utils/hijri.js` and the adhkar and tasbih
  stores are tested. The Zakat store, the inheritance engine, the composables and the views are not yet.
- **A damaged entry inside a stored record is not handled.** A stored record of the wrong kind is read as empty, but
  a valid record holding a bad entry (for example a day whose value is `null` under `adhkar-completion-log` or
  `tasbih-totals`) would still throw.
- **"Today" is not refreshed while a page stays open.** A page left open past local midnight shows the previous
  day's state until it is next re-read.

# Tasks

## 1. One Ramadan countdown

- [x] 1.1 Write a failing test in `src/utils/hijri.test.js`: for every day of Hijri year 1448, `daysToRamadan(dayKey)` equals the local days to `firstDayOfHijriMonth` of the next Ramadan; 30 January 2027 gives the calendar's count (9, not 8); the last day of Sha'ban gives 1; every day of Ramadan gives 0; 2 Shawwal counts to next year. Verify it fails against the current code
- [x] 1.2 Rebuild `daysToRamadan(today = dayKey())` on `firstDayOfHijriMonth` and day-key arithmetic as in `utils/eid.js` (design decision 3), and drop the home page's own rounding; verify the 1.1 tests and the existing Eid tests pass

## 2. Hijri month names as interface text

- [x] 2.1 Add `hijri.months` (the twelve names now in `HIJRI_MONTHS`, unchanged) and a `hijri.date` message (`{day} {month} {year} AH`) to `src/locales/en.js`; verify the locales tests pass
- [x] 2.2 Remove `monthName` and `formatted` from `toHijri` (and `HIJRI_MONTHS` if nothing else needs it), and make `HomeView.vue` and `FastingView.vue` build the month and date from the messages; verify a search finds no other user and the home and fasting page fixtures still read the same
- [x] 2.3 Add a test that in a test language with its own month names the home page shows that language's month, and that a missing name falls back to English; verify it passes

## 3. Home header follows the language and the day

- [x] 3.1 Write a failing test that mounts the home page at 23:59 with fake timers, advances past midnight, and expects the new date, Hijri date and a countdown one day shorter within a minute; and that nothing changes between 09:00 and 21:00. Verify it fails
- [x] 3.2 Give `HomeView.vue` a `now` ref with a one-minute interval cleared on unmount, compute the Hijri date, Ramadan state, countdown and header date from it, and format the date with `formatDate` instead of `en-GB` (design decision 5); verify 3.1 passes
- [x] 3.3 Add a test that in a test language with another date format the header date follows it; verify it passes and recapture the home fixture only if its text changed, checking the diff

## 4. Prayer page: clock note and staying current

- [x] 4.1 Give `getCurrentPrayer` and `getNextPrayer` in `utils/prayer.js` an optional `now` argument defaulting to `new Date()`, with unit tests for a time before Asr, after Asr and after Isha; verify existing prayer tests still pass
- [x] 4.2 Write failing tests for the Prayer page with fake timers: crossing the Asr time moves the highlight to Asr within a minute; crossing local midnight shows the new day's times; leaving the page stops the interval. Verify they fail
- [x] 4.3 Add a `now` ref and day tracking to `PrayerView.vue`: recompute the current and next prayer every tick and recompute the times when the day changes (design decision 1); verify 4.2 passes
- [x] 4.4 Add the clock note message to `en.js` and show it under the prayer cards whenever times are shown; test that it is absent before a location and present after, and that with Makkah's coordinates on a Lagos-time device Dhuhr shows Lagos time beside the note; verify the tests pass
- [x] 4.5 Format the Qibla distance with `formatNumber` and a `{distance} km` message, with a test in a test language; recapture the prayer page fixture, checking the diff shows only the note and formatting

## 5. Navigation shows the current section

- [x] 5.1 Add a pure `navSection(path)` in `utils/` with unit tests covering every scenario of the `site-navigation` spec: `/zakat`, `/prayer/how-to-pray`, `/faith/articles`, `/pillars` give pillars; `/adhkar/morning`, `/tracker`, `/qurbani` give tools; `/hadith/books` gives hadith; `/prophets/nuh` gives prophets; `/` and `/about` give none. Verify the tests pass
- [x] 5.2 Add a test that every page the `/tools` page links to, other than pillar pages and `/hadith/books`, maps to tools, so the list and the function cannot drift apart; verify it passes
- [x] 5.3 Use `navSection` with `splitLocale` in `SiteNav.vue` to set `active` and `aria-current="page"` on one main link, removing `active-class` from the four; test that on `/zakat` only Pillars is active, under a language prefix too, and on `/` none is; verify the tests pass

## 6. Documents and checks

- [x] 6.1 Update `Spec.md` (Prayer page clock note and live updating, the home header, Hijri month names as messages, navigation highlighting) and `CHANGELOG.md` (one Fixed entry per bug); verify `test/docs.test.js` passes
- [x] 6.2 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, and fix anything they report until all four pass
- [x] 6.3 Tick feature 38 in `Features.md` only once its Done when check is met; the reading of the clock note on a real phone is Zubair's to do, so if it has not been done, leave 38 unticked and say so

## Workflow follow-up

- Zubair reads the clock note on a real phone with a saved location, then feature 38 is ticked.
- Archive the change after review, so the `hijri-dates` and `site-navigation` specs are created and `prayer-times` and `interface-translation` are updated.

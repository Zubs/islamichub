# Design

## Context

See proposal.md for why. The relevant current state:

- **Prayer page.** `showTimes()` in `PrayerView.vue` works out `times` once for `new Date()` and sets `currentPrayer` once. A one-minute `tick()` updates only `nextPrayer` and `countdown`, from the same `times`. `getCurrentPrayer` and `getNextPrayer` in `utils/prayer.js` read `new Date()` themselves. Times use `getTimezoneOffset()`, the device's offset.
- **Today panel.** `TodayPanel.vue` already solves "follow the clock": a `now` ref refreshed by a one-minute interval, with the day as `dayKey(now)`, and everything else computed from `now`. It is the pattern to copy.
- **Home header.** `HomeView.vue` computes `hijri`, `inRamadan`, `daysLeft` and `today` once in `setup`. `today` uses `toLocaleDateString('en-GB', …)`. The month stat now shows `hijri.monthName` in full, but the names come from `HIJRI_MONTHS` in `utils/hijri.js`, in English only. `FastingView.vue` also shows `hijri.monthName`.
- **Ramadan count.** `daysToRamadan()` adds `30 - day` and 29.5 per month. The Eid page uses `firstDayOfHijriMonth(year, month)` and `dayKey` arithmetic (`utils/eid.js`).
- **Navigation.** `SiteNav.vue` uses `RouterLink` with `active-class="active"`, which matches by path prefix, so Pillars is active only on `/pillars`. Routes may carry a language prefix (`/yo/zakat`), removed by `splitLocale` in `utils/locale.js`.
- Calculations live in `utils/` as pure functions with no Vue imports (CLAUDE.md), and tests use Vitest with fake timers.

## Goals / Non-Goals

**Goals:**
- Each of the five bugs has a test that fails before its fix and passes after.
- Reuse the existing patterns (the Today panel's `now` ref, `firstDayOfHijriMonth`, the message files, `formatDate` and `formatNumber`) rather than adding new machinery.

**Non-Goals:**
- Showing a place's own local time, or any timezone lookup or setting (Zubair chose the clock note).
- Changing how prayer times are calculated, or `getNextPrayer`'s handling of the time after Isha.
- Making the reminder timers survive device sleep (a separate known limit of on-device reminders).
- Translating the Hijri month names into Yoruba or Hausa (that is features 27 and 28); this change only makes it possible.

## Decisions

### 1. The prayer page keeps a `now` ref, like the Today panel
`PrayerView` holds `now` (refreshed every minute) and the last computed day. Each tick sets `now`; if `dayKey(now)` differs from the day the times were computed for, the times are recomputed for the new day with the same coordinates and methods. `currentPrayer` and `nextPrayer` are recomputed on every tick.

*Alternative:* schedule a single timer for midnight plus one for each prayer start. More exact, but more state, and timers drift when the device sleeps. A one-minute tick is what the Today panel already does and what the spec allows ("within a minute").

To keep this testable without fake timers leaking into `utils/`, `getCurrentPrayer` and `getNextPrayer` gain an optional `now` argument that defaults to `new Date()`. Existing callers are unchanged.

### 2. The clock note is a message under the times, not a new setting
A single message, for example "Times are shown in this device's time", rendered under the prayer cards whenever `prayerTimes` is set. It names no timezone, because the browser's zone name (`Intl…timeZone`) is often unfriendly ("Africa/Lagos") and the point is only that it is the device's clock.

*Alternative:* include the UTC offset ("UTC+1"). Rejected: it adds text most readers do not need, and it can be added later without changing the spec.

### 3. `daysToRamadan` is rebuilt on `firstDayOfHijriMonth`
`daysToRamadan(today = dayKey())` finds the next first of Ramadan: this Hijri year's when the month is before 9, the next year's when after 9, and returns 0 during Ramadan. It counts local days between the two day keys, using the same day arithmetic as `utils/eid.js`, so no rounding and no DST drift. `isRamadan` stays as it is. The home page's own `Math.round` goes away.

*Alternative:* have the home page call `nextEid`-style code directly. Rejected: the countdown belongs with the calendar in `utils/hijri.js`, where feature 40 will also need it.

### 4. Hijri month names move to the message files; `utils/hijri.js` stays pure
`toHijri` keeps returning `day`, `month` and `year`. The views get the name with `t('hijri.months.' + month)` from a new `hijri.months` block in `en.js` that holds the twelve names currently in `HIJRI_MONTHS`. The `formatted` string and `monthName` are dropped from `toHijri`, and their two users (`HomeView`, `FastingView`) build the text from a message such as `hijri.date: '{day} {month} {year} AH'`.

*Alternative:* keep `HIJRI_MONTHS` in the util and look it up in a translation table. Rejected: it would be a second place for interface text, and `utils/` must not import the i18n layer.

`HIJRI_MONTHS` remains exported only if a test or other code still needs it; otherwise it is removed.

### 5. The home header follows a `now` ref
`HomeView` gets a `now` ref with a one-minute interval (cleared on unmount), and `hijri`, `inRamadan`, `daysLeft` and the header date become computed values from `now`. The date uses `formatDate(now, { weekday, day, month })` from `@/i18n.js`, as the Today panel does. The Qibla distance uses `formatNumber` and a message for "{distance} km".

### 6. Navigation sections are matched by a small pure function
A pure function, for example `navSection(path)` in `utils/`, takes a path without its language prefix and returns `'pillars'`, `'tools'`, `'hadith'`, `'prophets'` or `null`:

```
/pillars, /faith*, /prayer*, /zakat*, /fasting*, /hajj*  -> pillars
/tools, /tracker, /adhkar*, /duas*, /tasbih,
/inheritance, /qurbani                                   -> tools
/hadith*                                                 -> hadith
/prophets*                                               -> prophets
anything else                                            -> null
```

`SiteNav` computes the section from `splitLocale(route.path)` and sets the `active` class and `aria-current="page"` on that one link. `RouterLink`'s own `active-class` is removed from the four main links, so prefix matching cannot highlight a second one. The tool paths are written in the function next to the comment that they mirror the `/tools` page; a test checks that every page `/tools` links to (other than pillar pages and `/hadith/books`) maps to `tools`, so the two cannot drift apart.

*Alternative:* add `meta.section` to each route in `router/index.js`. Cleaner in principle, but it spreads the rule over twenty routes and the prefixed copies made by `localizedRoutes`; a single function is easier to test and read.

## Risks / Trade-offs

- [A one-minute tick shows a new prayer up to a minute late] → Accepted; the spec allows a minute, and it matches the Today panel and countdown.
- [The clock note does not fix times for another city; it only stops them misleading] → This is Zubair's choice for launch; showing a place's own time stays in Decisions needed for a later feature.
- [Removing `monthName` and `formatted` from `toHijri` could break a caller missed in review] → Only `HomeView` and `FastingView` use them (checked with a search); the build and the page text fixtures catch any other.
- [Page text fixtures fail because wording changed] → The prayer fixture gains the clock note and is recaptured on purpose; the home fixture is recaptured only if its date text changes. Each recapture is checked by diff so nothing else slips in.
- [The Ramadan count changes by a day on some dates] → Intended; it now agrees with the Eid page. The CHANGELOG says so.

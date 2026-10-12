# Design

## Decisions

- **`fasting-log` is `{ "YYYY-MM-DD": "fasted" | "missed" | "made-up" | "voluntary" }`**, keyed by the Gregorian local day, so moving the start of Ramadan never touches what was logged.
- **`ramadan-starts` is `{ "<Hijri year>": "YYYY-MM-DD" }`**, a second key holding only dates the user set. `Features.md` names one key; the override has to live somewhere and does not belong inside a day-keyed log.
- **`firstDayOfHijriMonth(year, month)` is added to `utils/hijri.js`**: it starts from the mean-month estimate and scans the neighbouring days for the first one `toHijri` places in that month. Feature 30's Eid countdown will reuse it.
- **`utils/fasting.js` is pure:** `ramadanStart`, `ramadanDays`, `ramadanYearOf(day)`, `latestRamadanYear(day)`, `allowedStatuses(day, today)`, `makeUpSummary(log)`, `voluntaryCount(log)` and the two parsers.
- **A made-up fast belongs to the most recent Ramadan before it.** A missed day that no longer falls inside any Ramadan after the start is moved is kept but not counted.
- **`monthGrid` moves from `utils/salah.js` to `utils/day.js`**, since two trackers now share it.
- **`FastingTracker.vue`** is a component placed in the Fasting page; the page itself stays a composition of sections.

## Risks / Trade-offs

- [Made-up fasts for an older Ramadan performed after a newer one are credited to the newer] → rare, and the per-year lines make it visible; the simple rule is what `Features.md` asks for.

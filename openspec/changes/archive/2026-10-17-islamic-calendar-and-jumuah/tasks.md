# Tasks

## 1. Islamic days

- [x] 1.1 Verify the sources for each kind of day against the datasets (`scripts/check-sources.mjs --hadith`), keeping only hadiths whose text says what the page will say, with grades for those outside the two Sahihs; add any Sahih Muslim numbers to `data/hadithNumbering.js`. Verify the source script reports no problems
- [x] 1.2 Write `data/islamicDays.js` (seven kinds with their date rules and references) and `data/content/calendar/en.js` (each kind's name, explanation, and the page text including the moon-sighting note). Verify `test/games`-style data checks: every reference exists and links, every non-Sahih hadith has a grade
- [x] 1.3 Write `utils/islamicDays.js` (`kindsOn`, `monthGrid`, `marksIn`) with tests: 10 Muharram is 'Ashura and 9 is Tasu'a, every month's 13th-15th are white days, a month's first day equals `firstDayOfHijriMonth`, twelve months on returns the same month, Ramadan agrees with `daysToRamadan`, no day in Rabi' al-Awwal or Sha'ban is marked beyond the recurring kinds, recurring kinds are grouped. Verify they pass

## 2. Calendar page

- [x] 2.1 Build `CalendarView.vue` at `/calendar` (month in the route query, previous, next and today, grid with Hijri and Gregorian dates, today marked, marked days list, choosing a day scrolls to its entry, the moon-sighting note), with SEO key `calendar`, messages in `locales/en.js`, a Tools page entry, sitemap and `llms.txt` lines. Test opening the current month, moving twelve months, Dhul Hijjah's list, and choosing a day. Verify they pass

## 3. Friday page

- [x] 3.1 Verify the Friday sources (ghusl, going early, the hour, blessings, who must attend, Qur'an 62:9) against the datasets; record the al-Kahf hadith's sources (al-Hakim, al-Bayhaqi) and its reported grading as not verified against the site's sources. Verify the source script reports no problems
- [x] 3.2 Write `data/jumuahSections.js` and `data/content/jumuah/en.js`: the sunnahs, al-Kahf with its unverified note, the Friday prayer with both positions where the schools differ, links to the adhan page and prayer guide. Verify the story-style section checks pass (every section has a reference, every verse block complete)
- [x] 3.3 Add the khutbah time to the device under `khutbah-time` (a store or a small persisted value) with a time input on the page; refuse non-times; ignore corrupt data. Test entry, reload, a refused value and corrupt data. Verify they pass
- [x] 3.4 Build `JumuahView.vue` at `/jumuah` with SEO key `jumuah`, linked from the prayer page's guides, in the sitemap and `llms.txt`. Test it renders every section and the links. Verify they pass

## 4. Reminders

- [x] 4.1 Extend `utils/reminders.js`: entries carry `item` (their switch), optional `on(date)` and `follows: 'khutbah'`; add the Islamic day entries (`<kind>:eve` after Isha + 20 min when tomorrow begins the kind, `<kind>:day` after Fajr + 20 min on each day of it) and the Friday entries (al-Kahf after Fajr, blessings after Asr, khutbah 30 minutes before the entered time); `parseReminderSettings` reads the new switches as off on old settings. Test 'Arafah (8 Dhul Hijjah evening, 9 morning, nothing else), Monday and Thursday, the first ten of Dhul Hijjah, Friday only, khutbah at 13:15 gives 12:45, and old settings. Verify they pass
- [x] 4.2 Update `useReminders.js` and the store so the device schedules the new entries with the khutbah time, and the Prayer page's settings list only prayer and adhkar switches. Verify the existing reminder tests and new scheduling tests pass
- [x] 4.3 Build `ReminderSwitches.vue` for a list of switch keys (turns reminders on when off, links to the Prayer page with no saved location, disables the khutbah switch without a time and says why), placed on the calendar and Friday pages. Test each state. Verify they pass
- [x] 4.4 Notifications for the new entries open `/calendar` or `/jumuah`, with titles and bodies in `locales/en.js`. Test the paths. Verify they pass

## 5. Push

- [x] 5.1 `pushRequestBody` sends `khutbah` only when the khutbah switch is on; `validateRecord` accepts a valid optional `khutbah` and rejects any other value; old records stay valid. Test each. Verify they pass
- [x] 5.2 `remindersDue` handles the new entries with the record's local date and khutbah time, keyed by entry in `sent`. Test 'Arafah in two timezones, khutbah at 13:15 on Friday by the device's clock, not twice, and nothing on other days. Verify they pass
- [x] 5.3 Update the push note in `ReminderSettings` and the About page's privacy text to include the khutbah time; recapture the About page fixture. Verify the content tests pass

## 6. Today panel

- [x] 6.1 Add the Islamic day part (named, linking to `/calendar`, only on marked days) and the Friday tile (linking to `/jumuah`, with the khutbah time if entered, only on Fridays) to `TodayPanel.vue`. Test 'Arafah, an ordinary day, Friday with and without a time, and Thursday. Verify they pass

## 7. Documents and checks

- [x] 7.1 Update `Spec.md` (routes, the two pages, Islamic days, the new reminders, storage keys, push record), `CHANGELOG.md`, `Features.md` (40 and 41: the 'Arafah test now evening before and morning; Decisions rows for days and al-Kahf marked decided; Final rows for the day list, the al-Kahf source, the Friday positions and a Hijri shift setting), and confirm `CLAUDE.md`'s privacy rules still describe what push stores. Verify `test/docs.test.js` passes
- [x] 7.2 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, and `node scripts/check-sources.mjs`, fixing everything until all pass
- [x] 7.3 Screenshot `/calendar` (current month and Dhul Hijjah) and `/jumuah` at desktop width and fix any layout fault found
- [x] 7.4 Leave features 40 and 41 unticked: they need the reviewer Zubair names, a twelve-month comparison with a published Hijri calendar, and 'Arafah and Friday reminders arriving on a real phone. Say so in the summary

## Workflow follow-up

- Zubair names the reviewer; the reviewer reads both pages and the day list; Zubair compares the calendar with a published one and checks the reminders on a phone; then features 40 and 41 are ticked and the change is archived.

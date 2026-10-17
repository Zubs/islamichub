# Design

## Context

See proposal.md for why. The parts this change builds on:

- **Hijri dates.** `utils/hijri.js` gives a calculated Hijri date for a local day (`toHijri`) and the first local day of a Hijri month (`firstDayOfHijriMonth`). The home page, the Ramadan countdown and the Eid page all use them, so the calendar must use them too.
- **Reminders.** `utils/reminders.js` holds `REMINDERS`. Each entry follows a prayer (`follows`) after a `delay`, and has a `path` to open. `dueReminders` turns the switched-on ones into today's remaining times.
  - The device schedules them in `composables/useReminders.js`, again at local midnight, and stays silent while push is on.
  - The server (`netlify/functions/lib/pushRecords.js`) imports the same `REMINDERS` and prayer calculation. `remindersDue` runs every minute per stored record and marks each send in `record.sent[key] = day`.
- **Settings.** Reminder settings live under `reminder-settings` as `{ enabled, push, items }`. `parseReminderSettings` keeps only known keys, so new keys read as off on old settings.
- **Push records.** These hold the rounded location, timezone, methods and the list of chosen keys. `validateRecord` drops unknown keys.
- **Today panel.** `components/TodayPanel.vue` reads stores only.
- **Pages.** Long-form pages (Eid, adhan, prayer guide) are a sections file in `data/` plus a content file, drawn by `ContentSections`, with `HadithRef` linking citations.

## Goals / Non-Goals

**Goals:**
- One description of each Islamic day, used by the calendar grid, the list, the Today panel, the device reminders and the server.
- One reminder model that covers "after a prayer on certain days" and "before a time the reader entered", shared by device and server so they can't disagree.
- No change to how existing prayer and adhkar reminders behave, and no new outside address.

**Non-Goals:**
- **A setting to shift the Hijri date by a day** to match local sighting. It would change every date on the site, so it's left for a later feature and noted in Final.
- **Disputed days**, which are not marked at all (Zubair's decision).
- **Translating the new pages.** They go through the existing content files, ready for features 27 and 28.
- **Reminder times other than the ones specified** (for example, a chosen time for the al-Kahf reminder).

## Decisions

### 1. Islamic days as data with simple date rules
`data/islamicDays.js` lists the kinds:

| Key | Days |
|---|---|
| `arafah` | 9 Dhul Hijjah |
| `ashura` | 9 and 10 Muharram, named Tasu'a and 'Ashura |
| `dhul-hijjah` | 1 to 10 Dhul Hijjah |
| `white-days` | 13 to 15 of every month |
| `monday-thursday` | weekdays 1 and 4 |
| `last-ten` | 21 Ramadan to the month's end |
| `eid` | 1 Shawwal and 10 Dhul Hijjah |

Each kind has a rule (`{ month, days }`, `{ days }` for every month, `{ weekdays }`, or `{ month, from }` to the month's end), its references, and its words in `data/content/calendar/en.js`.

`utils/islamicDays.js` is pure and has three functions:
- `kindsOn(date)`: the kinds for a local date, through `toHijri`.
- `monthGrid(year, month)`: weeks of `{ dayKey, hijriDay, gregorian, kinds }`. The month runs from `firstDayOfHijriMonth(year, month)` to the day before the next month's first day, so the calendar can't disagree with Ramadan or Eid.
- `marksIn(year, month)`: the list below the grid, with recurring kinds grouped.

*Alternative considered:* a table of precomputed dates. It would go stale and could drift from `toHijri`.

### 2. Reminders gain "on which days" and "which moment"
Each `REMINDERS` entry may now carry:
- `on(date)`: a pure test on the local date; when absent, the reminder applies every day.
- `follows`: a prayer name, or `'khutbah'` to follow the entered time.

An Islamic day kind becomes two entries sharing one switch:
- `arafah:eve`: follows Isha + 20 min, when `kindsOn(tomorrow)` includes it and today does not.
- `arafah:day`: follows Fajr + 20 min, when `kindsOn(today)` includes it.

`dueReminders` filters by `on(now)` and resolves `'khutbah'` from the settings. Settings `items` stay keyed by the switch (`arafah`), and each entry names its switch in `item`.

The server's `remindersDue` uses the same entries:
- the record's local date comes from `localTime`;
- `sent` is keyed by entry key (`arafah:eve`), so the evening and day reminders never block each other.

*Alternative considered:* separate code paths for calendar and Friday reminders on the server. That doubles what has to agree.

### 3. Friday reminders
`on(date)` is `date.getDay() === 5` for all three:

| Reminder | When |
|---|---|
| `kahf` | Fajr + 20 min |
| `salawat` | Asr + 20 min |
| `khutbah` | 30 min before the entered time |

The khutbah switch is disabled while no time is entered.

### 4. Khutbah time storage
The time is kept on the device under a new key, `khutbah-time` (a `"HH:MM"` string). A read that isn't a valid 24-hour time is ignored.

`pushRequestBody` adds `khutbah` only when `items.khutbah` is on. `validateRecord` accepts an optional `khutbah` matching `^([01]\d|2[0-3]):[0-5]\d$` and rejects any other value. Records without it stay valid.

### 5. Switches live with their pages
A small `ReminderSwitches.vue` takes a list of switch keys and renders them with the existing store's `setItem`:
- If reminders are off, it offers to turn them on (`turnOn`).
- If no location is saved, it links to the Prayer page, since times follow prayer times.

The Prayer page's `ReminderSettings` keeps the prayer and adhkar switches, the master switch and push. The calendar shows its switches beside the list of kinds, and the Friday page in its reminders section.

### 6. Pages
- **`CalendarView.vue`:** month state in the route query (`?m=1447-12`), so a month can be linked and back/forward work. A grid, the marked days list, the switches, and the moon-sighting note.
- **`JumuahView.vue`:** `data/jumuahSections.js` and `data/content/jumuah/en.js` through `ContentSections`, using the existing kinds (prose, hadith, positions, faq), plus the khutbah time input and the switches.

Routes: `/calendar` (Tools) and `/jumuah` (prayer page guides), each lazy-loaded, with SEO keys `calendar` and `jumuah`.

### 7. Sources, checked at build time, not from memory
The candidates below are checked against the datasets with `scripts/check-sources.mjs --hadith` and kept only when the text says what the page says. Grades for collections outside the two Sahihs are stated as given by the dataset or the collection's editors.
- **'Arafah and 'Ashura fasting:** Sahih Muslim (the hadith on the expiation of fasting 'Arafah and 'Ashura).
- **Tasu'a:** Sahih Muslim.
- **'Ashura:** Sahih al-Bukhari.
- **The first ten of Dhul Hijjah:** Sahih al-Bukhari.
- **Three days each month:** Sahih al-Bukhari. The 13th to 15th specifically: Sunan al-Tirmidhi or al-Nasa'i, with grade.
- **Mondays:** Sahih Muslim. Thursdays: al-Tirmidhi, with grade.
- **The last ten nights and seeking Laylat al-Qadr:** Sahih al-Bukhari.
- **No fasting on the two Eids:** Sahih al-Bukhari.
- **Friday:** ghusl, going early and the hour of answered supplication from Sahih al-Bukhari; many blessings on the Prophet ﷺ from Abu Dawud, with grade.
- **Who must attend:** Abu Dawud, with grade, and the Qur'an (62:9).
- **Surah al-Kahf on Friday:** recorded by al-Hakim and al-Bayhaqi, which the library doesn't hold. It's named in plain text with the grading reported for it, marked as not verified against the site's sources, and listed in Final for the reviewer.

## Risks / Trade-offs

- **[Calculated dates can be a day off local sighting, so an 'Arafah reminder can arrive a day early or late]** → The calendar and the reminder text both say dates follow the calculation and can differ by a day. A shift setting is a non-goal, recorded in Final.
- **[Ten new switches crowd the settings]** → They live on their own pages, grouped by kind, not in the Prayer page's list.
- **[Server and device disagree on the day near midnight or across timezones]** → Both use the device's local date and `toHijri`, from the same shared module. Tests run the server function with fixed instants in two timezones.
- **[The khutbah time leaves the device with push]** → Only when the khutbah reminder and push are both on. The privacy text and push note say so, and turning either off removes it from the record.
- **[The al-Kahf hadith can't be checked against the site's datasets]** → It's labelled as unverified on the page and in Final, and the reviewer settles it.

## Migration Plan

- **Device:** old `reminder-settings` read with the new switches off. `khutbah-time` is a new key. Nothing to migrate.
- **Server:**
  - Old records have no `khutbah` and only old keys, and stay valid.
  - `sent` entries for old keys are unaffected.
  - A record holding a key the server no longer knows is ignored for that key, as now.
- **Rollback:** reverting the code leaves new keys in some stored records. The old `validateRecord` drops them on the next save, and the old `remindersDue` ignores them.

## Open Questions

- The exact wording of each reminder's title and body. It can be settled while writing the content files without changing the specs.

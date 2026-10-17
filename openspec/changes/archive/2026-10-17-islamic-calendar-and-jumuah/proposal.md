# Proposal

## Why

The site shows today's Hijri date but nothing about the Islamic year around it. A reader can't see when 'Arafah, 'Ashura or the white days fall, or be reminded of them. Friday, the most regular day of worship, has no page of its own and no reminders. Features 40 and 41 both build on the reminders and push already in place (features 23 and 24), so they are planned together.

## What Changes

- **Hijri calendar, `/calendar`.**
  - A month grid shows each Hijri day with its Gregorian date. The reader moves month by month and can come back to today.
  - It says plainly that dates are an estimate and can differ by a day with the sighting of the moon.
  - Linked from Tools, in the sitemap and `llms.txt`.
- **Islamic days.** The calendar marks only days with a sunnah in authentic sources, as Zubair decided on 17 October 2026: 'Arafah, Tasu'a and 'Ashura, the first ten days of Dhul Hijjah, the white days (13th to 15th), Mondays and Thursdays, the last ten nights of Ramadan, and the two Eids. Disputed days (such as the Mawlid or the 15th of Sha'ban) are not marked.
  - Each kind of day has a short explanation and a reference checked against its source.
  - A grading is stated wherever the hadith is not in Sahih al-Bukhari or Sahih Muslim.
  - The list lives in `data/` and is settled with the reviewer.
- **Jumu'ah companion, `/jumuah`.**
  - **The sunnahs of Friday**, each with a checked reference: ghusl, going early, many blessings on the Prophet ﷺ, and the hour when supplication is answered.
  - **Reciting Surah al-Kahf**, included with its source named and a note of its grading (Zubair's decision, 17 October 2026).
  - **The Friday prayer itself**: who it is due on (both positions where the schools differ), the adhan, listening to the khutbah in silence, and the two rak'at. It links to the adhan page and the prayer guide.
  - Linked from the prayer page's guides, in the sitemap and `llms.txt`.
- **Khutbah time.** The reader may enter the time of the khutbah at their own mosque. It is kept on the device, and it is sent to the server only if they choose push.
- **New reminders** use the existing reminder switch and push:
  - **Calendar:** each kind of Islamic day has its own switch. A switched-on day is announced twice, as Zubair decided: the evening before (after Isha: "Tomorrow is the day of 'Arafah") and on the day itself (after Fajr).
  - **Friday:** Surah al-Kahf (Friday morning), blessings on the Prophet ﷺ (Friday afternoon), and a reminder before the khutbah time the reader entered. The khutbah reminder can't be switched on until a time is entered.
- **Today panel.**
  - On an Islamic day it names the day and links to the calendar.
  - On a Friday it shows a Jumu'ah tile linking to `/jumuah`.
- **Push.** The stored record may also hold the khutbah time, and only when push is on and the khutbah reminder is chosen. The privacy text on the About page and in the push settings says so.

## Capabilities

### New Capabilities
- `islamic-calendar`: the Hijri month grid, the Islamic days it marks with their references, moving between months, and how the estimate is stated.
- `jumuah-companion`: the Friday page, its sunnahs and the Friday prayer, the al-Kahf note, and the khutbah time kept on the device.

### Modified Capabilities
- `prayer-reminders`:
  - Reminders cover Islamic days (the evening before and the day itself) and Friday (al-Kahf, blessings, before the khutbah), each with its own switch.
  - The khutbah reminder needs a khutbah time.
  - Tapping these reminders opens the calendar or the Friday page.
- `push-notifications`:
  - The record may hold the khutbah time.
  - The server sends day and Friday reminders at the device's own local times, once each.
  - The privacy text covers the khutbah time.
- `worship-dashboard`: the Today panel names today's Islamic day and shows a Jumu'ah tile on Fridays.

## Impact

- **New code:**
  - `src/data/islamicDays.js`
  - `src/utils/islamicDays.js` (pure)
  - `src/views/CalendarView.vue`
  - `src/views/JumuahView.vue` with `src/data/jumuahSections.js` and `src/data/content/jumuah/en.js`
  - `src/data/content/calendar/en.js`
  - tests beside each
- **Changed:**
  - `src/utils/reminders.js`: new reminder kinds, and a date rule for when each applies.
  - `src/stores/reminders.js` and `src/components/ReminderSettings.vue`: the new switches and the khutbah time.
  - `src/composables/useReminders.js`
  - `src/components/TodayPanel.vue`
  - `netlify/functions/lib/pushRecords.js`: validation, and the new kinds in `remindersDue`.
  - `src/router/index.js`, `useSeo`, `src/locales/en.js`
  - Tools and prayer page links
  - `public/sitemap.xml`, `public/llms.txt`, the About page's privacy text, `Spec.md`, `CHANGELOG.md`, `Features.md`
- **Stored data:**
  - New keys and new reminder items in `reminder-settings` are added with defaults, so existing settings read unchanged.
  - The push record gains an optional field, and older records stay valid.
- **No new dependency and no new outside address.**
- **Review:** the reviewer Zubair names has to read both pages and the day list. 'Arafah and Friday reminders arriving on a real phone, and a twelve-month comparison with a published Hijri calendar, are checks for Zubair. Features 40 and 41 stay unticked until those are done.

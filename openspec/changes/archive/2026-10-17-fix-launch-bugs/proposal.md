# Proposal

## Why

A review on 17 October 2026, after the navigation and prayer guides changed, found five bugs that a reader can hit on the live site (feature 38 in `Features.md`). Two give wrong or out-of-date prayer information, one gives two different Ramadan countdowns, one would block the Yoruba and Hausa releases, and one leaves readers with no sign of where they are in the menu. They should be fixed before launch, ahead of any new feature.

## What Changes

- **Prayer times say which clock they are in.** Times are worked out in the device's timezone whatever coordinates are entered, so times for another city appear in the reader's own clock (Makkah's Dhuhr shows as 10:06 on a phone set to Lagos time, not 12:06). The Prayer page states that the times are shown in this device's time. Zubair chose this over a timezone lookup or a timezone setting, so no outside service and no stored field are added.
- **The Prayer page stays current while open.** The highlighted current prayer moves on with the countdown, and after local midnight the page shows the new day's times.
- **One Ramadan countdown.** The home page's countdown is worked out from the same Hijri calendar as the Eid page, so the two never disagree (today they differ by a day in places, including the last days of Sha'ban).
- **The home page follows the reader's language and the day.** The header's Gregorian date, Hijri month name and the Qibla distance go through the language's formats and message files instead of fixed English. The header's dates and countdown move on at local midnight on a page left open.
- **The menu shows where the reader is.** Pillars is highlighted on every pillar page and the pages beneath them, not only on `/pillars`.

## Capabilities

### New Capabilities
- `hijri-dates`: the site's one Hijri calendar and what is shown from it outside the Eid page: the Hijri date and the Ramadan countdown on the home page, agreeing with the Eid page and following the local day.
- `site-navigation`: the navigation bar and phone menu: their destinations and how the current section is shown.

### Modified Capabilities
- `prayer-times`: the Prayer page states which clock its times are in, keeps its current prayer and times up to date while open, and moves to the new day's times after midnight.
- `interface-translation`: the requirement that numbers and dates follow the language gains the home page header and the Qibla distance, and Hijri month names become translatable text.

## Impact

- Code: `src/views/pillar/PrayerView.vue`, `src/views/HomeView.vue`, `src/utils/hijri.js`, `src/components/SiteNav.vue`, `src/locales/en.js`; possibly `src/utils/prayer.js` for a pure helper.
- Tests: new tests for each bug, each failing without its fix; the home page text fixture is recaptured for the clock note and formats.
- No new dependency, outside address, stored data or server change. Stored data is untouched.
- `Spec.md` and `CHANGELOG.md` are updated; the sitemap is not affected.

# Spec Delta

## Purpose

Defines the site's one Hijri calendar as seen outside the Eid page: the Hijri date and the Ramadan countdown on the home page, so every page that names a Hijri date or counts to one agrees.

## ADDED Requirements

### Requirement: The Ramadan countdown agrees with the site's Hijri calendar
The number of days to Ramadan SHALL be the number of local days from today to the first day of Ramadan as the site's Hijri calendar places it, the same calendar the Eid page counts from. During Ramadan the home page SHALL say Ramadan has begun instead of a count.

#### Scenario: Ordinary day
- **WHEN** the home page is opened on 17 October 2026
- **THEN** the count equals the days from that date to the first day of Ramadan 1448 on the site's calendar

#### Scenario: Last days of Sha'ban
- **WHEN** it is 30 January 2027
- **THEN** the count equals the days to the first day of Ramadan on the site's calendar, with no rounding of month lengths

#### Scenario: Day before Ramadan
- **WHEN** it is the last day of Sha'ban on the site's calendar
- **THEN** the count reads "1 day"

#### Scenario: During Ramadan
- **WHEN** it is any day of Ramadan
- **THEN** no count is shown and the page says Ramadan has begun

#### Scenario: After Ramadan
- **WHEN** it is 2 Shawwal
- **THEN** the count is to the first day of next year's Ramadan

#### Scenario: Agrees with the Eid page for a whole year
- **WHEN** the count is worked out for every day of a Hijri year
- **THEN** each count matches the first day of Ramadan used by the Eid page's calendar

### Requirement: The home page names the Hijri month in full
The home page SHALL show the current Hijri month by its full name, never a shortened part of it.

#### Scenario: A two-word month
- **WHEN** it is Jumada al-Akhirah
- **THEN** the home page shows the whole name, not only "Jumādā"

#### Scenario: A one-word month
- **WHEN** it is Rajab
- **THEN** the home page shows "Rajab"

### Requirement: The home page's dates follow the local day
The home page header's Gregorian date, Hijri date and Ramadan countdown SHALL change at local midnight on a page that stays open, with no reload.

#### Scenario: Open across midnight
- **WHEN** the home page is open at 23:59 and the clock passes local midnight
- **THEN** within a minute the header shows the new date and Hijri date and a countdown one day shorter

#### Scenario: No change during the day
- **WHEN** the home page stays open from 09:00 to 21:00 on one day
- **THEN** the header's dates and countdown do not change

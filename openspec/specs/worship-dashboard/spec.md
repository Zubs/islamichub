# worship-dashboard Specification

## Purpose

Shows a returning user the state of their day in one place on the home page, drawn from what the site already keeps on their device, with each part one tap from its full page.

## Requirements

### Requirement: The home page shows today at a glance
A "Today" panel near the top of the home page SHALL show the next prayer and its countdown, today's five prayers and their statuses, which adhkar categories are completed today, today's tasbih total across all phrases, and the daily hadith. Each part SHALL link to its full page. The panel SHALL read from existing stores only, store nothing of its own and make no network request.

#### Scenario: Saved location
- **WHEN** a location is saved
- **THEN** the next prayer and its countdown are the same as on the Prayer page

#### Scenario: After Isha
- **WHEN** it is after Isha
- **THEN** the next prayer is tomorrow's Fajr

#### Scenario: Prayer logged elsewhere
- **WHEN** a prayer is logged on the tracker
- **THEN** the panel shows it without a reload

#### Scenario: Adhkar completed
- **WHEN** the morning adhkar are completed
- **THEN** the panel shows morning as done

#### Scenario: Tasbih
- **WHEN** the user has counted tasbih today
- **THEN** the panel's figure equals today's total across all phrases

#### Scenario: One tap
- **WHEN** the user selects any part of the panel
- **THEN** they reach that part's full page

### Requirement: A part with nothing to show offers a way to start
A first-time visitor SHALL see the panel with prompts in place of data and no errors. With no saved location the panel SHALL offer the Prayer page in place of the next prayer.

#### Scenario: First-time visitor
- **WHEN** nothing is stored
- **THEN** the panel shows a prompt to set a location, five unlogged prayers, no adhkar done and a tasbih total of zero

### Requirement: The fasting row appears only in Ramadan
In Ramadan the panel SHALL show today's fast and its status. Outside Ramadan no fasting row SHALL be shown.

#### Scenario: In Ramadan
- **WHEN** today is in Ramadan
- **THEN** the panel shows today's fast, linking to the Fasting page

#### Scenario: Outside Ramadan
- **WHEN** today is outside Ramadan
- **THEN** there is no fasting row

### Requirement: The panel follows the local day and fits a phone
At local midnight the day's progress SHALL reset while yesterday's records stay in their logs. At 360px wide the panel SHALL stack into one column with no sideways scrolling.

#### Scenario: Midnight
- **WHEN** local midnight passes with the home page open
- **THEN** the panel shows a new day with nothing done, and yesterday's prayers remain in the log

#### Scenario: Narrow screen
- **WHEN** the panel is shown at 360px wide
- **THEN** its parts stack in one column

### Requirement: The panel names today's Islamic day
When today is one of the Islamic days the calendar marks, the Today panel SHALL name it (for example "The day of 'Arafah") and link to the calendar. On other days no such part SHALL be shown. The panel SHALL use the same Hijri date as the calendar and make no network request.

#### Scenario: The day of 'Arafah
- **WHEN** today is 9 Dhul Hijjah
- **THEN** the panel names the day of 'Arafah, linking to `/calendar`

#### Scenario: An ordinary day
- **WHEN** today is not a marked day
- **THEN** the panel shows no Islamic day part

### Requirement: A Jumu'ah tile appears only on Fridays
On a Friday the Today panel SHALL show a Jumu'ah tile linking to `/jumuah`, with the khutbah time if the reader has entered one. On any other day no Jumu'ah tile SHALL be shown.

#### Scenario: Friday
- **WHEN** today is a Friday
- **THEN** the panel shows the Jumu'ah tile, linking to the Friday page

#### Scenario: Friday with a khutbah time
- **WHEN** today is a Friday and the reader entered 13:15
- **THEN** the tile shows the khutbah at 13:15

#### Scenario: Thursday
- **WHEN** today is a Thursday
- **THEN** there is no Jumu'ah tile

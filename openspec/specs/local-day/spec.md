# local-day Specification

## Purpose

Defines what "today" means for everything the site records by day, so completions, totals and streaks follow the calendar of the device the user is holding.

## Requirements

### Requirement: The day is the device's local calendar day
Anything the site records or shows by day SHALL use the local calendar date of the device, written as `YYYY-MM-DD`. The day MUST change at local midnight and at no other time.

#### Scenario: Late evening east of UTC
- **WHEN** a user in Lagos records something at 23:30 local time on 20 March
- **THEN** it is recorded under 2026-03-20

#### Scenario: Just after midnight west of UTC
- **WHEN** a user in New York records something at 00:30 local time on 21 March
- **THEN** it is recorded under 2026-03-21, not 2026-03-20

#### Scenario: Either side of midnight
- **WHEN** the time is one second before local midnight and then one second after
- **THEN** the two moments give different days, one day apart

#### Scenario: Single-digit months and days
- **WHEN** the local date is 5 January 2026
- **THEN** the day is written 2026-01-05

### Requirement: Days step by the calendar
Moving from one day to the next or the previous SHALL follow the calendar, giving exactly one day per calendar date regardless of month length, leap years or daylight-saving changes.

#### Scenario: Month end
- **WHEN** one day is added to 2026-01-31
- **THEN** the result is 2026-02-01

#### Scenario: Leap day
- **WHEN** one day is added to 2028-02-28 and to 2026-02-28
- **THEN** the results are 2028-02-29 and 2026-03-01

#### Scenario: Year end
- **WHEN** one day is taken from 2026-01-01
- **THEN** the result is 2025-12-31

#### Scenario: Clocks go forward
- **WHEN** the device is on London time and the days from 28 to 30 March 2026 are stepped through
- **THEN** each date appears exactly once, including the 23-hour day

#### Scenario: Clocks go back
- **WHEN** the device is on New York time and the days from 31 October to 2 November 2026 are stepped through
- **THEN** each date appears exactly once, including the 25-hour day

### Requirement: Adhkar completion follows the local day
A category completed by the user SHALL be recorded under the local day it was completed on, and "completed today" SHALL refer to the local day.

#### Scenario: Nothing recorded
- **WHEN** nothing is stored
- **THEN** no category is complete today in any timezone

#### Scenario: Completed late in the evening
- **WHEN** a user in Lagos completes morning adhkar at 23:30 on 20 March
- **THEN** it shows as completed today, and it is stored under 2026-03-20

#### Scenario: A new day starts at local midnight
- **WHEN** that same user looks again at 00:30 on 21 March
- **THEN** morning adhkar is not complete today

### Requirement: Adhkar streaks count consecutive local days
A category's streak SHALL be the number of consecutive local days, counting back from today, on which it was completed. The streak is zero when today is not complete.

#### Scenario: Three days in a row
- **WHEN** a user completes morning adhkar on three local days in a row, the third being today
- **THEN** the streak is 3

#### Scenario: Across a month end
- **WHEN** a category was completed on 31 January and 1 February, and today is 1 February
- **THEN** the streak is 2

#### Scenario: Across a clock change
- **WHEN** a user in London completed a category on 28, 29 and 30 March 2026, and today is 30 March
- **THEN** the streak is 3

#### Scenario: A missed day
- **WHEN** a category was completed today and two days ago but not yesterday
- **THEN** the streak is 1

#### Scenario: Same result in every timezone
- **WHEN** the three-days-in-a-row case is run on Lagos, London and New York time
- **THEN** the streak is 3 in each

### Requirement: Tasbih totals follow the local day
Each tasbih tap SHALL be added to the total for the local day it was made on, and "today's total" SHALL refer to the local day.

#### Scenario: Tap just after local midnight
- **WHEN** a user in New York taps at 00:30 local time on 21 March
- **THEN** the tap is added to 2026-03-21 and counts in today's total

#### Scenario: Taps either side of midnight
- **WHEN** a user taps three times before local midnight and twice after
- **THEN** yesterday's total is 3, today's total is 2 and the lifetime total is 5

### Requirement: Existing day records are kept
Data recorded before this change SHALL still be read and shown. The stored keys and the `YYYY-MM-DD` form of each day MUST NOT change.

#### Scenario: Older completions still count
- **WHEN** a completion log saved by the previous version holds entries for the last three days
- **THEN** those entries are shown and counted, and nothing is rewritten or removed on load

#### Scenario: Older totals still count
- **WHEN** tasbih totals saved by the previous version exist for earlier days
- **THEN** the lifetime totals include them

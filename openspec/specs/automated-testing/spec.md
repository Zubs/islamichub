# automated-testing Specification

## Purpose

Defines how IslamicHub's automated tests are run, where they live, which existing behaviour they pin down, and how they stop a broken build from being deployed.

## Requirements

### Requirement: One command runs every test
The project SHALL provide a single command, `npm test`, that runs every automated test once and exits with a non-zero status if any test fails.

#### Scenario: Fresh clone passes
- **WHEN** a contributor clones the repository, installs dependencies and runs `npm test`
- **THEN** every test runs once, none fail, and the command exits with status zero

#### Scenario: A failing test fails the command
- **WHEN** any test fails
- **THEN** `npm test` names the failing test and exits with a non-zero status

#### Scenario: No network or secrets needed
- **WHEN** `npm test` runs with no network connection and no environment variables set
- **THEN** every test still passes

### Requirement: Tests re-run while developing
The project SHALL provide a command, `npm run test:watch`, that keeps running and re-runs the affected tests when a source or test file changes.

#### Scenario: Editing a file re-runs its tests
- **WHEN** `npm run test:watch` is running and a contributor saves a change to a source file
- **THEN** the tests covering that file run again without the command being restarted

### Requirement: Tests sit beside the code they cover
A test file SHALL live in the same folder as the file it covers and carry the same name with a `.test.js` suffix. Test files MUST NOT be included in the built site.

#### Scenario: Test file is discovered by location
- **WHEN** a file named `prayer.test.js` is added next to `prayer.js`
- **THEN** `npm test` runs it with no further configuration

#### Scenario: Tests are not shipped
- **WHEN** the site is built
- **THEN** the build output contains no test files and no test-only dependencies

### Requirement: Tests give the same result everywhere
Test results SHALL NOT depend on the machine's timezone, the current date or time, or data left behind by another test.

#### Scenario: Different timezones
- **WHEN** `npm test` is run on machines set to Lagos, London and New York time
- **THEN** the same tests pass on all three

#### Scenario: Tests do not leak into each other
- **WHEN** one test stores data on the device and a later test starts
- **THEN** the later test starts with empty storage and fresh state

### Requirement: Stores and components can be tested
The test environment SHALL allow a Pinia store to be created and used, a Vue component to be mounted and interacted with, and device storage to be read and written, all without a real browser.

#### Scenario: Mounting a component
- **WHEN** a test mounts the FAQ list with two questions and clicks the first
- **THEN** the first answer is shown as open and the second is not

### Requirement: Qibla behaviour is pinned down
The tests SHALL verify the Qibla bearing, compass label and distance for known locations.

#### Scenario: At the Kaaba itself
- **WHEN** the bearing and distance are requested for the Kaaba's own coordinates
- **THEN** both return a number, the distance is 0 km, and no error is thrown

#### Scenario: From London
- **WHEN** the bearing and distance are requested for London (51.5074, -0.1278)
- **THEN** the bearing is 119 degrees, the label is SE, and the distance is within 10 km of 4,790 km

#### Scenario: Compass labels
- **WHEN** a label is requested for bearings of 0, 90, 180, 270 and 359 degrees
- **THEN** the labels are N, E, S, W and N

### Requirement: Prayer time behaviour is pinned down
The tests SHALL verify prayer times against a published timetable for each calculation method, the fallback for an unknown method, and the next-prayer result.

#### Scenario: London against a published timetable
- **WHEN** prayer times are calculated for London on a fixed date with each of the five methods
- **THEN** each of the six times is within two minutes of a named, published timetable for that method

#### Scenario: Unknown method
- **WHEN** prayer times are requested with a method key that does not exist
- **THEN** the times equal those for Muslim World League

#### Scenario: Next prayer during the day
- **WHEN** the time is between Dhuhr and Asr
- **THEN** the next prayer is Asr and the minutes remaining equal the gap to Asr

#### Scenario: Next prayer after Isha
- **WHEN** the time is after Isha
- **THEN** the next prayer is tomorrow's Fajr, with the minutes remaining counted across midnight

### Requirement: Hijri date behaviour is pinned down
The tests SHALL verify that known Gregorian dates convert to the expected Hijri date, allowing a difference of one day.

#### Scenario: Known dates
- **WHEN** 1 March 2025, 18 February 2026 and 7 July 2024 are converted
- **THEN** each result is within one day of 1 Ramadan 1446, 1 Ramadan 1447 and 1 Muharram 1446 respectively

#### Scenario: Result shape
- **WHEN** any date is converted
- **THEN** the day is between 1 and 30, the month is between 1 and 12, and the month name matches the month number

### Requirement: Adhkar counting behaviour is pinned down
The tests SHALL verify tap-to-count, category completion and streaks in the adhkar store.

#### Scenario: Nothing stored
- **WHEN** the store is created with empty storage
- **THEN** every count is zero, no category is complete and every streak is zero

#### Scenario: Tapping past the target
- **WHEN** a dhikr with a target of 3 is tapped three times and then once more
- **THEN** the count reads 3 after the third tap and 0 after the fourth

#### Scenario: Completing a category twice in a day
- **WHEN** a category is completed twice on the same day
- **THEN** it is recorded once for that day and the counts for its adhkar are cleared

#### Scenario: Streak across days
- **WHEN** a category was completed on each of the last three days including today
- **THEN** its streak is 3, and it is 0 if today is not complete

#### Scenario: Corrupt stored log
- **WHEN** the stored completion log is not valid JSON
- **THEN** the store loads as empty without throwing an error

### Requirement: Tasbih counting behaviour is pinned down
The tests SHALL verify tapping, reset, targets, phrase switching and totals in the tasbih store.

#### Scenario: Nothing stored
- **WHEN** the store is created with empty storage
- **THEN** the first phrase is selected with its default target, and the count and all totals are zero

#### Scenario: A tap counts twice
- **WHEN** the counter is tapped once
- **THEN** the session count is 1 and today's total for that phrase is 1, and the total is still 1 after the store is created again

#### Scenario: Reset keeps totals
- **WHEN** the counter is tapped five times and then reset
- **THEN** the session count is 0 and today's total is still 5

#### Scenario: Custom target limits
- **WHEN** the target is set to 0, to a negative number, and to 10.6
- **THEN** the target becomes 1, 1 and 11

#### Scenario: Switching phrase
- **WHEN** a different phrase is selected after some taps
- **THEN** the session count returns to 0, the target becomes the new phrase's default, and the selection is remembered when the store is created again

#### Scenario: Totals across phrases and days
- **WHEN** taps exist for two phrases today and one phrase yesterday
- **THEN** today's and lifetime totals are correct both for the current phrase and across all phrases

#### Scenario: Corrupt stored totals
- **WHEN** the stored totals are not valid JSON
- **THEN** the store loads with zero totals without throwing an error

### Requirement: A failing test stops a deploy
The hosting build SHALL run every test before building the site and MUST NOT publish when any test fails. This applies to production deploys and to deploy previews.

#### Scenario: Passing tests deploy
- **WHEN** a commit whose tests all pass is pushed
- **THEN** the tests run, the site builds and the deploy is published

#### Scenario: Failing test stops the build command
- **WHEN** the hosting build command is run while a test fails
- **THEN** the command names the failing test, exits with a non-zero status, and does not build the site

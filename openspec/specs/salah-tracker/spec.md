# salah-tracker Specification

## Purpose

Lets a user record each of the five daily prayers on their own device, correct past days, and see how consistent they have been, without anything leaving the device.

## Requirements

### Requirement: Each prayer of a day has one status
For each local day the tracker SHALL hold, for each of Fajr, Dhuhr, Asr, Maghrib and Isha, one of: on time, late, missed, or not logged. Choosing a status SHALL save it at once, and choosing the same status again SHALL clear it. The log SHALL stay on the device and survive a reload and a period with no connection.

#### Scenario: Nothing logged
- **WHEN** nothing has been logged
- **THEN** today shows five unlogged prayers

#### Scenario: Logging Fajr
- **WHEN** the user marks Fajr as on time and reloads
- **THEN** Fajr is still marked on time

#### Scenario: Changing a status
- **WHEN** the user marks a prayer missed and then late
- **THEN** it is late, not both

#### Scenario: Five taps
- **WHEN** the user marks each of today's five prayers with one tap each
- **THEN** all five are logged

### Requirement: The streak counts days on which all five were prayed
The streak SHALL be the number of consecutive days, ending today or yesterday, on which all five prayers were marked on time or late. Today SHALL count once all five are logged. A day with a missed prayer, or with fewer than five logged, SHALL end the streak.

#### Scenario: First complete day
- **WHEN** all five prayers are logged today as prayed
- **THEN** the streak is 1

#### Scenario: A week
- **WHEN** seven days in a row are complete
- **THEN** the streak is 7

#### Scenario: Late and missed
- **WHEN** a day has one late prayer, and another has one missed prayer
- **THEN** the late day keeps the streak and the missed day ends it

#### Scenario: Four logged
- **WHEN** a past day has four prayers logged
- **THEN** it does not count towards the streak

#### Scenario: Today still in progress
- **WHEN** yesterday was complete and today has two prayers logged as prayed
- **THEN** the streak still shows yesterday's count

#### Scenario: Repairing yesterday
- **WHEN** yesterday's missed prayer is changed to late
- **THEN** the streak is restored

### Requirement: Past days can be edited and future days cannot
The user SHALL be able to open any past day from the seven-day strip or the month view and change its statuses. A future day MUST NOT be selectable or loggable. The day SHALL change at local midnight.

#### Scenario: Future day
- **WHEN** the user tries to open or log tomorrow
- **THEN** nothing is recorded

#### Scenario: Local midnight
- **WHEN** it passes local midnight
- **THEN** today's prayers are a new, unlogged day and yesterday's log is kept

### Requirement: Prayer times are shown when a location is saved
With a saved location, each of today's prayers SHALL show its time, and a prayer whose time has not arrived SHALL be marked "not yet" and not loggable. With no saved location the tracker SHALL work without times.

#### Scenario: Afternoon
- **WHEN** it is the afternoon and a location is saved
- **THEN** Isha shows its time and "not yet"

#### Scenario: No location
- **WHEN** no location is saved
- **THEN** all five prayers can be logged and no times are shown

### Requirement: The user can clear the log
"Clear my data" SHALL remove the whole log after the user confirms, and do nothing if they decline. Stored data that is unreadable or holds unknown values SHALL be treated as empty.

#### Scenario: Confirmed
- **WHEN** the user chooses "Clear my data" and confirms
- **THEN** the log is empty and nothing remains stored

#### Scenario: Declined
- **WHEN** the user declines the confirmation
- **THEN** the log is unchanged

#### Scenario: Corrupt data
- **WHEN** the stored log is not valid, or holds an unknown prayer or status
- **THEN** the unreadable parts are ignored and the page works

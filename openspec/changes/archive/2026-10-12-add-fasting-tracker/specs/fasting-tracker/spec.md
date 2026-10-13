# Spec Delta

## Purpose

Lets a user record their fasts on their own device and see how many missed Ramadan fasts are still to be made up, year by year, without anything leaving the device.

## ADDED Requirements

### Requirement: Each day holds one fasting status
A day SHALL hold at most one status. A day inside Ramadan SHALL accept "fasted" or "missed"; a day outside Ramadan SHALL accept "made up" or "voluntary". A future day MUST NOT be logged. Choosing the status a day already has SHALL clear it. The log SHALL stay on the device and survive a reload.

#### Scenario: Nothing logged
- **WHEN** nothing has been logged
- **THEN** the grid is empty and "still to make up" is zero

#### Scenario: One Ramadan day fasted
- **WHEN** a Ramadan day is marked fasted
- **THEN** that day is shown as fasted, and still is after a reload

#### Scenario: Two statuses
- **WHEN** a day marked fasted is then marked missed
- **THEN** it is missed, not both

#### Scenario: Future day
- **WHEN** the user tries to log a day that has not arrived
- **THEN** nothing is recorded

#### Scenario: Ramadan status outside Ramadan
- **WHEN** the user tries to mark a day outside Ramadan as a Ramadan fast
- **THEN** nothing is recorded, and only "made up" and "voluntary" are offered

### Requirement: Missed fasts are counted per Ramadan and reduced by made-up fasts
For each Ramadan, "still to make up" SHALL be the number of its days marked missed, less the number of days marked made up between the end of that Ramadan and the start of the next, and never below zero. Each Ramadan year SHALL be counted separately, and the page SHALL show the total.

#### Scenario: One missed
- **WHEN** 29 Ramadan days are fasted and one is missed
- **THEN** one fast is still to make up

#### Scenario: Made up afterwards
- **WHEN** a made-up fast is logged after that Ramadan
- **THEN** none is still to make up

#### Scenario: More made up than missed
- **WHEN** more made-up fasts are logged than were missed
- **THEN** zero is shown, not a negative number

#### Scenario: Two Ramadans
- **WHEN** days were missed last Ramadan and this Ramadan
- **THEN** each year's count is shown separately

#### Scenario: A whole Ramadan
- **WHEN** a Ramadan is logged with three missed days and two are made up afterwards
- **THEN** one fast is still to make up

### Requirement: Voluntary fasts are counted separately
Days marked voluntary SHALL be counted on their own and MUST NOT change what is still to make up.

#### Scenario: Voluntary fast
- **WHEN** a voluntary fast is logged
- **THEN** the voluntary count rises by one and the make-up count is unchanged

### Requirement: The user can set the first day of Ramadan
The start of each Ramadan SHALL be estimated from the site's Hijri calendar, and the user SHALL be able to set it to another date, since the estimate can be a day out. Changing it SHALL move the 30-day grid and keep every logged day. The page SHALL say the date depends on moon sighting.

#### Scenario: One day earlier
- **WHEN** the first day is set one day earlier
- **THEN** the grid starts one day earlier and the logged days are still logged

#### Scenario: Back to the estimate
- **WHEN** the user removes their own date
- **THEN** the estimate is used again

### Requirement: The grid follows the season
In Ramadan the tracker SHALL show that Ramadan's 30 days. Outside Ramadan it SHALL show the current month, with the most recent Ramadan still reachable so its days can be corrected. Unreadable stored data SHALL be treated as empty.

#### Scenario: In Ramadan
- **WHEN** today is in Ramadan
- **THEN** a 30-day grid is shown

#### Scenario: Outside Ramadan
- **WHEN** today is outside Ramadan
- **THEN** the current month is shown

#### Scenario: Corrupt data
- **WHEN** the stored log is not valid or holds an unknown status
- **THEN** it is ignored and the page works

# Spec Delta

## Purpose

Shows the Hijri calendar month by month beside the Gregorian dates and marks the days of the Islamic year that carry a sunnah in authentic sources, each with its evidence.

## ADDED Requirements

### Requirement: The calendar shows a Hijri month beside the Gregorian dates
The site SHALL have a calendar page at `/calendar` that opens on the current Hijri month and shows it as a grid of weeks, each day with its Hijri day number and its Gregorian date. The reader SHALL be able to move to the previous and next month and return to the current one, and today SHALL be marked.

#### Scenario: Opening the calendar
- **WHEN** a reader opens `/calendar`
- **THEN** the current Hijri month is shown with today marked and each day's Gregorian date

#### Scenario: Twelve months on
- **WHEN** the reader moves forward twelve months
- **THEN** the same Hijri month of the next year is shown, and its first day is the date the site gives for that month's start

### Requirement: The calendar's dates agree with the rest of the site and are stated as estimates
The calendar's Hijri dates SHALL agree with those used elsewhere on the site (the home page, the Ramadan countdown and the Eid page). The page SHALL say that the dates are calculated and can differ by a day from those announced after the moon is sighted.

#### Scenario: Agreeing with Ramadan
- **WHEN** the reader moves to Ramadan
- **THEN** its first day is the day the Ramadan countdown and the Eid page use

#### Scenario: The estimate is stated
- **WHEN** any month is shown
- **THEN** the page says the dates can differ by a day with the sighting of the moon

### Requirement: Only days with a sunnah in authentic sources are marked
The calendar SHALL mark only these kinds of day: the day of 'Arafah (9 Dhul Hijjah), Tasu'a and 'Ashura (9 and 10 Muharram), the first ten days of Dhul Hijjah, the white days (13 to 15 of every month), Mondays and Thursdays, the last ten nights of Ramadan, and the two Eids. A day whose observance the schools dispute SHALL NOT be marked as a day of worship.

#### Scenario: 'Ashura
- **WHEN** the reader views Muharram
- **THEN** the 10th is marked as 'Ashura and the 9th as Tasu'a, with their references

#### Scenario: White days
- **WHEN** any month is shown
- **THEN** its 13th, 14th and 15th are marked as the white days

#### Scenario: A disputed day
- **WHEN** the reader views Rabi' al-Awwal or Sha'ban
- **THEN** no day is marked for the Mawlid or the 15th of Sha'ban

### Requirement: Each kind of day carries its evidence
Each kind of day SHALL carry a short explanation and at least one reference to the Qur'an or to a hadith that links to the library. A hadith outside Sahih al-Bukhari and Sahih Muslim SHALL have its grading stated beside it.

#### Scenario: Evidence
- **WHEN** the day data is checked
- **THEN** every kind of day has a reference that is a verse that exists or a hadith that links, and every hadith outside the two Sahihs has a grading beside it

### Requirement: Each month lists its marked days
Below the grid the page SHALL list the month's marked days in order, each with its Hijri and Gregorian dates, its explanation and its reference. A kind that recurs (the white days, Mondays and Thursdays) SHALL appear once in the list with all its dates in the month, not once per day. Choosing a marked day in the grid SHALL bring its entry into view.

#### Scenario: Dhul Hijjah
- **WHEN** the reader views Dhul Hijjah
- **THEN** the list includes the first ten days, the day of 'Arafah and Eid al-Adha with their dates and references

#### Scenario: Choosing a day
- **WHEN** the reader chooses a marked day in the grid
- **THEN** that day's entry in the list is brought into view

### Requirement: The calendar is easy to reach and works offline
The calendar SHALL be linked from the Tools page, listed in the sitemap, and work offline once the site is installed. It SHALL make no outside request.

#### Scenario: From Tools
- **WHEN** a reader opens the Tools page
- **THEN** it links to the calendar

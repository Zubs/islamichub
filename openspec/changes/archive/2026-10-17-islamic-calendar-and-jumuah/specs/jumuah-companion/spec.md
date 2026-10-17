# Spec Delta

## Purpose

Helps a reader keep the sunnahs of Friday and understand the Friday prayer, with every point referenced, and lets them record their own mosque's khutbah time for reminders.

## ADDED Requirements

### Requirement: The Friday page sets out the sunnahs of Friday with their evidence
The site SHALL have a page at `/jumuah` setting out the sunnahs of Friday, each with a reference checked against its source: ghusl, going early, sending many blessings on the Prophet ﷺ, and the hour in which supplication is answered. A hadith outside Sahih al-Bukhari and Sahih Muslim SHALL have its grading beside it.

#### Scenario: Reading the sunnahs
- **WHEN** a reader opens `/jumuah`
- **THEN** each sunnah is shown with its reference, and each reference links to the library, names a verse that exists, or is marked as not verified against the site's sources

### Requirement: Surah al-Kahf is included with its source and grading
Reciting Surah al-Kahf on Friday SHALL be included with the source of the hadith it rests on named and its grading stated plainly. A source the site's hadith library does not hold SHALL be named in plain text and marked as not verified against the site's sources until the reviewer has checked it.

#### Scenario: Surah al-Kahf
- **WHEN** the reader reaches the section on Surah al-Kahf
- **THEN** it names where the hadith is recorded, states its grading, and says it awaits the reviewer's check

### Requirement: The page explains the Friday prayer without taking a side
The page SHALL explain the Friday prayer: on whom it is due, the adhan, listening to the khutbah in silence, and the two rak'at. Where the schools differ (for example on who must attend or how many must be present), it SHALL show each position with its evidence and not choose between them. It SHALL link to the adhan page and the prayer guide.

#### Scenario: Who must attend
- **WHEN** the reader reaches the section on who the prayer is due on
- **THEN** every point the schools differ on shows at least two positions with their evidence

#### Scenario: Related guides
- **WHEN** the reader reaches the section on the prayer
- **THEN** it links to `/prayer/adhan` and `/prayer/how-to-pray`

### Requirement: The reader can record their mosque's khutbah time on the device
The page SHALL let the reader enter the time the khutbah begins at their own mosque, since it differs from mosque to mosque; the site SHALL NOT guess it. The time SHALL be kept on the device only, under its own storage key, and leave the device only as part of push if the reader turns push on and chooses the khutbah reminder. A value that is not a time SHALL be refused, and stored data that is missing or corrupt SHALL be ignored.

#### Scenario: Entering a time
- **WHEN** the reader enters 13:15
- **THEN** it is kept after a reload and shown on the page

#### Scenario: Not a time
- **WHEN** the reader enters something that is not a time of day
- **THEN** it is refused with a message and nothing is stored

#### Scenario: Corrupt data
- **WHEN** the stored khutbah time cannot be read
- **THEN** the page opens with no time entered

### Requirement: The Friday page is easy to reach
The page SHALL be linked from the prayer page's guides, listed in the sitemap, and work offline once the site is installed.

#### Scenario: From the prayer page
- **WHEN** a reader opens the prayer page
- **THEN** its guides link to `/jumuah`

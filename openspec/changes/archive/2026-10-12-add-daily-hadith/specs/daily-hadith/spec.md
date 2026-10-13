# Spec Delta

## Purpose

Gives the home page one short, sourced hadith each day from a curated list, chosen by the visitor's local date and shown without any network request.

## ADDED Requirements

### Requirement: The list is curated, sourced and free of repeats
The daily hadith list SHALL hold at least 60 hadiths, each with its text, its narrator and a reference to a collection and number, and no hadith SHALL appear twice.

#### Scenario: Every entry complete
- **WHEN** the list is checked
- **THEN** every entry has text, a narrator and a reference, and no reference or text is repeated

### Requirement: The day's hadith follows the local date
The hadith shown SHALL be chosen from the visitor's local date alone, so the same date gives the same hadith on every load and every device, the next date gives a different one, and the date after the last entry gives the first again. It SHALL change at local midnight, not UTC midnight.

#### Scenario: Same date
- **WHEN** the home page is loaded several times on one date, or on two devices
- **THEN** the same hadith is shown

#### Scenario: Next date
- **WHEN** the date moves on by one day
- **THEN** a different hadith is shown

#### Scenario: End of the list
- **WHEN** the day after the last entry's day arrives
- **THEN** the first entry is shown again

#### Scenario: Local midnight
- **WHEN** it is 00:30 in Lagos and still the previous day in UTC
- **THEN** the hadith shown is the one for the new Lagos date

### Requirement: The card needs no network and links to its source
The home page SHALL show the day's hadith in a card with its narrator and its reference, without any network request. The reference SHALL link to that hadith in the library. With an empty list no card and no gap SHALL be shown.

#### Scenario: Network off
- **WHEN** the home page is opened with no connection
- **THEN** the card still shows

#### Scenario: Reference
- **WHEN** the user selects the card's reference
- **THEN** the same hadith opens in the library

#### Scenario: Empty list
- **WHEN** the list is empty
- **THEN** the home page shows no card and no gap

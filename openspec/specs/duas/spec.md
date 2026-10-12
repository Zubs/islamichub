# duas Specification

## Purpose

Offers supplications for everyday situations, each with its Arabic text, transliteration, translation and source, and lets a user browse them by situation, search them and link to any one of them.

## Requirements

### Requirement: Every dua is complete and sourced
Each dua SHALL have Arabic text, a transliteration, a translation, a reference to the Qur'an (surah and ayah) or to a hadith (collection and number), and at least one situation. The collection SHALL hold at least 40 duas across the ten situations.

#### Scenario: Automated check
- **WHEN** the collection is checked
- **THEN** every dua has all four parts, a recognised reference and a known situation, and no dua is listed twice

### Requirement: Duas are browsed by situation
The duas page SHALL list every situation that has at least one dua, with the number of duas in it, and each situation SHALL have its own page of cards. A dua that fits two situations SHALL appear under both. An unknown situation address SHALL show the 404 page.

#### Scenario: Situation with no duas
- **WHEN** a situation has no duas
- **THEN** it is not listed

#### Scenario: Counts
- **WHEN** the duas page is opened
- **THEN** each situation shows how many duas it holds

#### Scenario: Two situations
- **WHEN** a dua belongs to travel and home
- **THEN** it appears on both situation pages

#### Scenario: Unknown situation
- **WHEN** `/duas/no-such-situation` is opened
- **THEN** the 404 page is shown

### Requirement: Duas can be searched
A search box SHALL filter duas by their English text, their transliteration and their situation's name, ignoring letter case and the marks used in transliteration. A search with no matches SHALL say so and offer a way to clear it.

#### Scenario: Searching a situation
- **WHEN** the user searches "travel" or "TRAVEL"
- **THEN** the travel duas are shown

#### Scenario: Transliteration without marks
- **WHEN** the user searches "bismillah"
- **THEN** duas whose transliteration reads "Bismillāh" are found

#### Scenario: One letter and very long
- **WHEN** the user searches one letter, or a very long text
- **THEN** results are shown or the empty state, without error

#### Scenario: No matches
- **WHEN** the search matches nothing
- **THEN** the page says no duas were found and offers to clear the search

### Requirement: A single dua can be linked to
Each dua SHALL have its own anchor on its situation page, and opening an address with that anchor SHALL bring the dua into view.

#### Scenario: Link to one dua
- **WHEN** `/duas/travel#farewell` is opened
- **THEN** the page scrolls to that dua

### Requirement: Cards show the source and count only what is counted
A dua's reference SHALL link to the hadith in the library where it cites one. A dua said once SHALL have no counter; one with a count SHALL have a counter.

#### Scenario: Said once
- **WHEN** a dua is said once
- **THEN** its card has no counter

#### Scenario: Said seven times
- **WHEN** a dua is said seven times
- **THEN** its card has a counter to seven

#### Scenario: Rain
- **WHEN** a user searches "rain", opens the dua and selects its reference
- **THEN** they reach that hadith in the library

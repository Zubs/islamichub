# Spec Delta

## Purpose

Gives readers a sourced guide to Eid al-Fitr and Eid al-Adha and tells them how long it is until the next one.

## ADDED Requirements

### Requirement: The page counts down to the next Eid
The page SHALL show the number of days to whichever Eid comes next, Eid al-Fitr on 1 Shawwal or Eid al-Adha on 10 Dhul Hijjah, worked out from the site's Hijri calendar, with a note that the date depends on moon sighting. On the day of an Eid it SHALL show a greeting in place of the countdown.

#### Scenario: Ordinary day
- **WHEN** the page is opened on an ordinary day
- **THEN** it shows the days to whichever Eid is nearer

#### Scenario: Day before
- **WHEN** it is the day before Eid al-Fitr
- **THEN** it shows "1 day"

#### Scenario: Eid day
- **WHEN** it is 1 Shawwal
- **THEN** an Eid al-Fitr greeting is shown in place of the countdown

#### Scenario: Day after Eid al-Fitr
- **WHEN** it is 2 Shawwal
- **THEN** the countdown points to Eid al-Adha

#### Scenario: After Eid al-Adha
- **WHEN** Eid al-Adha has passed
- **THEN** the countdown points to next year's Eid al-Fitr

#### Scenario: The next four Eids
- **WHEN** the dates of the next four Eids are worked out
- **THEN** each is within a day of a published Hijri calendar

### Requirement: The guide is sourced and takes no side between schools
The page SHALL explain what the two Eids are, the sunnahs of the day, the Eid prayer step by step, the takbirat, and Zakat al-Fitr, and answer common questions. Every section SHALL carry at least one reference to the Qur'an or a hadith, every hadith reference SHALL be a link, and where schools differ both positions SHALL be shown.

#### Scenario: References
- **WHEN** the page's sections are checked
- **THEN** each carries a reference, and each hadith reference links to its hadith

#### Scenario: Extra takbirs
- **WHEN** the reader reaches the number of extra takbirs in the prayer
- **THEN** both positions are shown with their evidence, and neither is presented as the correct one

#### Scenario: Takbirat
- **WHEN** the takbirat are shown
- **THEN** they appear in Arabic, in transliteration and in translation

### Requirement: The page is part of the site
The page SHALL have a title, description and canonical link, be listed in the sitemap and the navigation, link to the Fasting and Zakat pages, and read correctly on a narrow screen and in a right-to-left language.

#### Scenario: Reader a week before Eid
- **WHEN** a user opens the page a week before Eid, reads how the prayer is performed and follows the link to Zakat al-Fitr
- **THEN** each step is on the page and the link opens the Zakat page

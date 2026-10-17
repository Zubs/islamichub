# Spec Delta

## MODIFIED Requirements

### Requirement: Numbers, dates, currency and counts follow the language
Numbers, dates and currency SHALL be formatted for the current language. Text with a count SHALL read correctly for zero, one and many.

#### Scenario: Counts
- **WHEN** a count of days is shown
- **THEN** it reads "0 days", "1 day" and "3 days"

#### Scenario: Currency
- **WHEN** the language changes on the Zakat page
- **THEN** amounts are formatted for that language

#### Scenario: Home page date
- **WHEN** the home page is shown in a second language whose region writes dates differently
- **THEN** the header's date is written in that language and its format, not in fixed British English

#### Scenario: Qibla distance
- **WHEN** the Qibla distance is shown in a second language
- **THEN** the number is formatted for that language and its unit comes from the message files

## ADDED Requirements

### Requirement: Hijri month names are interface text
The names of the Hijri months SHALL be held in the message files, so every language can give its own spelling. A language that lacks a month name SHALL show the English one, as for any other text.

#### Scenario: English
- **WHEN** the Hijri date is shown in English
- **THEN** the month names are those the site uses today, such as "Jumādā al-Ākhirah"

#### Scenario: A second language
- **WHEN** a second language gives its own month names and is selected
- **THEN** the home page's Hijri date uses that language's name for the month

#### Scenario: A missing name
- **WHEN** a second language lacks the name of one month
- **THEN** the English name is shown for that month, never a blank or a key

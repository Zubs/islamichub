# Spec Delta

## Purpose

Gives readers a sourced guide to the Eid al-Adha sacrifice and helps them work out how many animals a group needs.

## ADDED Requirements

### Requirement: The guide is sourced and takes no side between schools
The page SHALL explain what the sacrifice is and its origin, who it is due on, which animals qualify, the days it can be done, how the meat is shared and how it is carried out, and answer common questions. Every section SHALL carry at least one reference to the Qur'an or a hadith, and where schools differ both positions SHALL be shown.

#### Scenario: References
- **WHEN** the page's sections are checked
- **THEN** each carries a reference

#### Scenario: Obligatory or sunnah
- **WHEN** the reader reaches the ruling on the sacrifice
- **THEN** both positions are shown with their evidence, and neither is presented as the correct one

#### Scenario: Three or four days
- **WHEN** the reader reaches the days of sacrifice
- **THEN** both positions are shown

### Requirement: The shares helper lists the ways a group can sacrifice
Given a number of people, the helper SHALL list the options, counting a sheep or goat for one person and a cow or camel for up to seven: small animals only, large animals only with any spare shares, and, when the number is above seven and not a multiple of seven, full large animals with small animals for the rest. It SHALL state that it is a guide and not a ruling.

#### Scenario: Nothing entered
- **WHEN** no number is entered
- **THEN** the helper shows nothing

#### Scenario: One person
- **WHEN** the number is 1
- **THEN** the options are one sheep or goat, or one share of a larger animal

#### Scenario: Seven people
- **WHEN** the number is 7
- **THEN** the options are seven small animals or one cow or camel

#### Scenario: Eight people
- **WHEN** the number is 8
- **THEN** the options include one large animal with one small one, and two large animals with six spare shares

#### Scenario: Fourteen people
- **WHEN** the number is 14
- **THEN** two large animals are filled exactly

#### Scenario: Not a whole number of people
- **WHEN** zero, a negative number, a fraction or text is entered
- **THEN** a clear message is shown and no options

#### Scenario: Very large number
- **WHEN** a very large number is entered
- **THEN** the answer is given at once

#### Scenario: Family of five
- **WHEN** a family of five uses the helper
- **THEN** it shows five sheep or goats, or five shares of one cow or camel

### Requirement: The page is part of the site
The page SHALL have a title, description and canonical link, be listed in the sitemap and the navigation, and be linked from the Eid and Hajj pages.

#### Scenario: Links
- **WHEN** the Eid page or the Hajj page is opened
- **THEN** it links to the Qurbani page

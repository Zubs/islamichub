# rtl-layout Specification

## Purpose

Makes the whole layout mirror correctly when the site is read in a right-to-left language, while leaving unmirrored the things that must not change side.

## Requirements

### Requirement: The layout follows the language's direction
The page's direction SHALL be set from the current language. Styles SHALL use logical start and end in place of left and right, so the navigation, cards, accordions, pagination, tables and form fields mirror in a right-to-left language and are unchanged in a left-to-right one.

#### Scenario: English
- **WHEN** the site is read in English
- **THEN** every page looks as it did before

#### Scenario: Right-to-left language
- **WHEN** the site is read in a right-to-left language
- **THEN** the document's direction is right to left, the navigation starts from the right and "previous" and "next" swap sides

#### Scenario: No physical sides left
- **WHEN** the styles are checked
- **THEN** no physical left or right property remains apart from a listed few, each with a reason

### Requirement: Some things do not mirror
Arabic verse and hadith blocks SHALL keep their right-to-left rendering in every language. Numbers, the Qibla compass and the tasbih counter SHALL NOT be mirrored. Text in a left-to-right script inside a right-to-left page, such as a hadith reference, SHALL display correctly.

#### Scenario: Arabic text
- **WHEN** a verse is shown in English and in a right-to-left language
- **THEN** its Arabic is right to left and right-aligned in both

#### Scenario: Compass
- **WHEN** the Qibla compass is shown in a right-to-left language
- **THEN** it points the same direction as in English

#### Scenario: Reference inside right-to-left text
- **WHEN** "Sahih Bukhari 1904" appears in a right-to-left paragraph
- **THEN** it reads in its own order and is not broken up

### Requirement: Icons that point a direction flip
An icon that points forwards or backwards SHALL be mirrored in a right-to-left language. An icon that does not point a direction SHALL stay as it is.

#### Scenario: Directional icon
- **WHEN** an icon marked as directional is shown in a right-to-left language
- **THEN** it is mirrored

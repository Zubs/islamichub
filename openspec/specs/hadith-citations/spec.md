# hadith-citations Specification

## Purpose

Defines how references to hadiths anywhere on the site are recognised, turned into links to the hadith library, reconciled with the library's numbering, and kept from regressing to plain text.

## Requirements

### Requirement: A hadith reference links to that hadith
Wherever the site cites a hadith from a collection the library holds, by collection name and number, the reference SHALL be a link to that hadith's page, and the text around it SHALL be unchanged. A reference to a collection the library does not hold SHALL be shown as plain text, not a broken link.

#### Scenario: One reference
- **WHEN** a source line reads "Sahih Muslim 2691"
- **THEN** it is one link, to hadith 2691 of Sahih Muslim

#### Scenario: Two references
- **WHEN** a source line reads "Sahih Bukhari 1904 · Sahih Muslim 1151"
- **THEN** it shows two links, each to the right book, with the separator between them kept

#### Scenario: Reference inside a sentence
- **WHEN** a paragraph ends "…when he remembers it (Sahih Muslim 684)."
- **THEN** only "Sahih Muslim 684" is a link and the sentence reads as before

#### Scenario: Collection outside the library
- **WHEN** a reference names Muwatta Malik
- **THEN** it is shown as text

#### Scenario: Qur'an reference
- **WHEN** a reference line reads "Qur'an 9:34 · Abu Dawud 1558"
- **THEN** the Qur'an reference is text and the hadith reference is a link

### Requirement: A quoted hadith is shown as a block with its source
A quoted hadith SHALL be shown as a block holding its text and a source line of linked references. A block with no reference SHALL show its text and no empty source line. Blocks SHALL look as they did before and still animate in on scroll.

#### Scenario: Block with no reference
- **WHEN** a block is given text and no reference
- **THEN** the text is shown and there is no source line

#### Scenario: Block with a reference
- **WHEN** a block is given text and "Sahih Bukhari 8 · Sahih Muslim 16"
- **THEN** the source line shows two links above the text

### Requirement: Cited numbers follow the Arabic edition
The site SHALL display the Arabic-edition number of a hadith. Where the library numbers that hadith differently, a mapping SHALL record the library's number, and the link SHALL go to the mapped number while the cited number is still displayed.

#### Scenario: Mapped reference
- **WHEN** a reference has a mapping entry
- **THEN** the link opens the mapped number and the text shows the cited number

#### Scenario: Unmapped reference
- **WHEN** a reference has no mapping entry
- **THEN** the link opens the cited number

### Requirement: No citation is left as plain text
An automated check SHALL open every page of the site and fail if a reference to a held collection appears outside a link. A second check SHALL request every cited hadith from the library and report any that is not found.

#### Scenario: A new citation typed as plain text
- **WHEN** a page gains a hadith citation that is not passed through the reference component
- **THEN** the automated check fails and names the page

#### Scenario: Reader follows a citation
- **WHEN** a user reading the Fasting page selects "Sahih Bukhari 1904"
- **THEN** they land on that hadith's page

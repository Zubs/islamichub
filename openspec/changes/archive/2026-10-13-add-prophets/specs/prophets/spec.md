# Spec Delta

## Purpose

Lists the prophets named in the Qur'an with the verses that name them, and tells their stories from the Qur'an and authentic hadith.

## ADDED Requirements

### Requirement: The list shows the 25 prophets named in the Qur'an
The page at `/prophets` SHALL list all 25 prophets in order, each with his name, his Arabic name, verses of the Qur'an that name him and, where the Qur'an states it, the people he was sent to with its reference. A prophet whose story has been written SHALL link to it; one without SHALL be shown with no link.

#### Scenario: All in order
- **WHEN** the list is opened
- **THEN** it shows 25 prophets from Adam to Muhammad in order

#### Scenario: No story yet
- **WHEN** a prophet has no story
- **THEN** he is shown with his references and no link, and his address shows the 404 page

#### Scenario: Unknown prophet
- **WHEN** an address names no prophet
- **THEN** the 404 page is shown

### Requirement: A story is told from the Qur'an and authentic hadith, section by section
A prophet's page SHALL be built from sections with Qur'an verse blocks and hadith references. Every section SHALL carry at least one Qur'an or hadith reference, every Qur'an reference SHALL be a verse that exists, and every verse block SHALL show Arabic, translation and reference. Where the sources are silent the story SHALL say so and not fill the gap from elsewhere. Honorifics SHALL follow one convention.

#### Scenario: Ibrahim's story
- **WHEN** a reader opens Ibrahim from the list
- **THEN** his story is shown

#### Scenario: References checked
- **WHEN** the sections of a story are checked
- **THEN** each carries a reference, and each Qur'an reference is a verse that exists

#### Scenario: Verse blocks
- **WHEN** a verse block is shown
- **THEN** it has Arabic, a translation and its reference

#### Scenario: Following a hadith
- **WHEN** a reader follows a hadith reference in the story
- **THEN** it opens that hadith in the library

### Requirement: Story pages are part of the site
Each story SHALL have its own title and description, link to the previous and next prophet that has a story, be listed in the sitemap, and read correctly in a right-to-left language. The section SHALL be in the navigation and on the home page.

#### Scenario: Neighbours
- **WHEN** a story page is shown
- **THEN** it links to the nearest earlier and later prophets with stories, skipping those without

#### Scenario: Own metadata
- **WHEN** a story page is opened
- **THEN** its title names the prophet and its description is that story's

# prophets Specification

## Purpose

Lists the prophets named in the Qur'an with the verses that name them, and tells their stories from the Qur'an and authentic hadith.

## Requirements

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

### Requirement: Each story is as full as its sources allow
Each prophet's story SHALL include every event the Qur'an and authentic hadith tell of him, in its own section, with Ibrahim's story as the measure of depth. A prophet the sources say little about SHALL keep a short story that says the sources say no more; nothing SHALL be added to make it longer. Details from outside the Qur'an and authentic hadith SHALL be left out.

#### Scenario: A prophet with a long account
- **WHEN** Musa's story is read
- **THEN** it covers each episode the Qur'an tells of him, from his birth to the wandering of the Children of Israel, each with its verses

#### Scenario: A prophet with a short account
- **WHEN** Dhul-Kifl's story is read
- **THEN** it gives what the verses say and states that the sources say no more

#### Scenario: Every event covered
- **WHEN** a story is compared with the list of passages the Qur'an gives that prophet
- **THEN** every passage is cited in some section of the story

### Requirement: Each story names the places of the prophet's life, labelled by how they are known
Each story SHALL have a Places part listing where the prophet was born, lived, was sent, travelled or died, wherever the sources or historians place it. Each place SHALL be labelled as named in the Qur'an or hadith, with the reference, or as identified by historians, with its text saying so. Each historians' identification SHALL be listed for the reviewer, who may add its source. Where nothing is known, the Places part SHALL say so.

#### Scenario: A place named in the sources
- **WHEN** Shu'ayb's story is read
- **THEN** Madyan is listed as named in the Qur'an, with its verse

#### Scenario: A place identified by historians
- **WHEN** a place is known only from historians
- **THEN** it is labelled as identified by historians, its text says so, and it is listed in Final for the reviewer

#### Scenario: Nothing known
- **WHEN** the sources and historians give no place for a prophet
- **THEN** the Places part says where he lived is not known, and no map is shown

#### Scenario: Birthplace
- **WHEN** a source names where a prophet was born
- **THEN** the birthplace is listed and labelled like any other place

### Requirement: The people each prophet was sent to are shown wherever a verse states them
The list and each story SHALL show the people a prophet was sent to, with its verse, for every prophet whose people a verse of the Qur'an names. A prophet for whom no verse names a people SHALL show none, with no gap.

#### Scenario: Checked against the verses
- **WHEN** the ten prophets with no people today are checked against the Qur'an
- **THEN** each that has a verse naming his people now shows it with that verse

#### Scenario: No verse
- **WHEN** no verse names a prophet's people
- **THEN** nothing is shown for it

# Spec Delta

## ADDED Requirements

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

# Spec Delta

## Purpose

Defines Who am I?, a game in which the player names a prophet from clues revealed one at a time, each clue drawn from his story and its sources.

## ADDED Requirements

### Requirement: A round reveals clues about one prophet one at a time
Each round SHALL choose one of the 25 prophets and show his first clue only. The player SHALL be able to ask for the next clue or make a guess from the list of the 25 prophets. Clues SHALL run from hardest to easiest, or from easiest to hardest on the Easy level.

#### Scenario: Start of a round
- **WHEN** a round starts
- **THEN** one clue is shown and the others are hidden

#### Scenario: Asking for another clue
- **WHEN** the player asks for the next clue
- **THEN** the next clue is shown beneath the earlier ones

#### Scenario: Last clue
- **WHEN** every clue is shown and the player has not guessed
- **THEN** no further clue is offered and the player must guess or give up

### Requirement: Fewer clues score more
A right guess SHALL score more the fewer clues were shown. The player SHALL have three guesses (two on Hard). A wrong guess SHALL cost points, and the round SHALL end, lost, when the guesses run out or the player gives up. The answer SHALL be revealed at the end with a link to the prophet's story.

#### Scenario: Right after one clue
- **WHEN** the player names the prophet after the first clue
- **THEN** they score more than a player who needed three

#### Scenario: Wrong guess
- **WHEN** the player names the wrong prophet
- **THEN** the guess is marked wrong and the round continues while guesses remain

#### Scenario: Out of guesses
- **WHEN** the player's third guess is wrong
- **THEN** the round ends, the prophet is named and nothing is scored

#### Scenario: End of round
- **WHEN** a round ends by a right guess, by running out of guesses or by giving up
- **THEN** the prophet is named, every clue is shown with its reference, and his story is linked

### Requirement: Clues come from the stories and their sources
Every clue SHALL be written from the prophet's story and carry the reference of the verse or hadith it rests on. A prophet with few sources SHALL have fewer clues; none SHALL be added from outside the Qur'an and authentic hadith. Every prophet SHALL have at least two clues.

#### Scenario: Reference on every clue
- **WHEN** the clue data is checked
- **THEN** every clue has a reference that is a verse that exists or a hadith that links

#### Scenario: A prophet with little in the sources
- **WHEN** Al-Yasa' is chosen
- **THEN** his round has only the clues the sources support

### Requirement: A game runs until a prophet is not named
A game of Who am I? SHALL be a run of rounds: after a right guess the player SHALL go on to a prophet not yet played in the run, and the game SHALL end at the first round lost. The end SHALL show how many prophets were named, the total points and the number of rounds, and the best run of the day on this device, with Share and Play again.

#### Scenario: Going on
- **WHEN** the player names the prophet
- **THEN** a "Next prophet" button starts a round with another prophet, and the points are added up

#### Scenario: The end of a game
- **WHEN** the player names two prophets and then gives up on the third
- **THEN** they see "You answered 2 correctly", 100 points in 3 rounds, and the day's best

#### Scenario: The day's best
- **WHEN** a player plays a second game that day with fewer points
- **THEN** the day's best stays the first game's


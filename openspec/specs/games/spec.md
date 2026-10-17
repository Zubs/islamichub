# games Specification

## Purpose

Defines the games page and the rules every game on the site follows, so that games teach from verified sources, respect the prophets, and keep what a player does on their own device.

## Requirements

### Requirement: A games page lists every game
The site SHALL have a games page at `/games` listing Who am I?, Kalimah and the Prophets quiz, each with a short description and the player's best result on this device, if any. The page SHALL be linked from the Tools page and listed in the sitemap.

#### Scenario: A new player
- **WHEN** a player who has never played opens `/games`
- **THEN** all three games are listed with no result shown

#### Scenario: A returning player
- **WHEN** a player who has finished a quiz opens `/games`
- **THEN** the quiz shows their best score on this device

#### Scenario: Found from Tools
- **WHEN** a reader opens the Tools page
- **THEN** it links to the games page

### Requirement: Every fact in a game carries checked evidence
Every clue, word, question and answer in a game SHALL carry a reference to the Qur'an (surah:ayah) or to a hadith in a collection the library holds, checked against its text. A Qur'an reference SHALL be a verse that exists, and a hadith reference SHALL link to the library. Evidence SHALL be shown to the player after each answer or at the end of a game.

#### Scenario: Evidence shown
- **WHEN** a player answers a question or finishes a game
- **THEN** the reference behind it is shown and can be followed

#### Scenario: A reference that does not exist
- **WHEN** the game data is checked
- **THEN** a Qur'an reference to a verse that does not exist fails an automated check

### Requirement: Games score knowledge, never worship
A game SHALL score only what the player knows. Nothing about a player's prayers, fasts, adhkar or other worship SHALL be scored, shown or compared in a game.

#### Scenario: Worship records untouched
- **WHEN** a player with tracked prayers and fasts plays a game
- **THEN** no game shows or uses those records

### Requirement: Prophets are never pictured
No game SHALL show a drawing, image, icon or emoji meant to depict a prophet. Games about the prophets SHALL be text only.

#### Scenario: Who am I?
- **WHEN** any game screen is shown
- **THEN** it contains no image of a person

### Requirement: Progress and scores stay on the device
Game progress and scores SHALL be kept on the device only, under their own storage keys, with no account and no leaderboard. Missing or corrupt stored data SHALL be ignored and the game SHALL still open.

#### Scenario: Corrupt data
- **WHEN** a game's stored data cannot be read
- **THEN** the game opens as for a new player

#### Scenario: Nothing leaves the device
- **WHEN** a player finishes a game
- **THEN** no guess, answer or score is sent anywhere

### Requirement: Games await review
Each game SHALL say that its content awaits review by a scholar until the reviewer Zubair names has read it, as the guides do.

#### Scenario: Before review
- **WHEN** a game page is shown before its review is recorded
- **THEN** it says its content awaits review

### Requirement: Each game explains itself before it starts
Each game SHALL open on a screen that explains how it is played and lets the player choose a level, with a Start button. A game already in progress (a quiz attempt or the day's Kalimah with a guess made) SHALL open where it was left.

#### Scenario: First visit
- **WHEN** a player opens a game with nothing in progress
- **THEN** they see how to play, the levels and a Start button, and no question, clue or grid

#### Scenario: A game in progress
- **WHEN** a player reloads during a quiz attempt
- **THEN** the attempt continues at the same question without the intro

### Requirement: Each game has three levels
Each game SHALL offer Easy, Normal and Hard, remembered for each game on the device, Normal until one is chosen. In the quiz each question has a level and an attempt draws only from the chosen level. In Who am I? Easy shows the easiest clue first, Normal and Hard the hardest first, and Hard allows two guesses instead of three. In Kalimah Easy shows the word's meaning as a hint, and Hard does not mark tried letters on the keyboard; the day's word is the same at every level.

#### Scenario: An easy quiz
- **WHEN** a player chooses Easy and starts the quiz
- **THEN** every question asked is an easy one

#### Scenario: A remembered level
- **WHEN** a player who chose Hard for a game opens it again
- **THEN** Hard is already chosen

### Requirement: A game can be quit at any time
While a game is being played, a "Quit to games" control SHALL take the player back to `/games`. Quitting a quiz SHALL discard the attempt; the questions already asked stay seen. Quitting Kalimah SHALL keep the day's guesses.

#### Scenario: Quitting a quiz
- **WHEN** a player quits a quiz part way through
- **THEN** they are on `/games` and no attempt is kept

### Requirement: A result can be shared to invite others
At the end of each game the player SHALL be able to share their result as text with a link to that game, through the share feature, inviting others to play. The shared text SHALL NOT give away a Kalimah word, a guess, or the prophet of a Who am I? round.

#### Scenario: Sharing a quiz score
- **WHEN** a player who scored 8 shares their result
- **THEN** the text gives the score, the level, an invitation to beat it and the link to the quiz

#### Scenario: Sharing a Who am I? round
- **WHEN** a player shares a round they won
- **THEN** the text gives how many clues they needed and the link, and does not name the prophet

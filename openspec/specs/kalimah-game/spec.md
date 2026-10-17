# kalimah-game Specification

## Purpose

Defines Kalimah, a daily puzzle in which every player guesses the same Qur'anic word, in Arabic letters or in transliteration, and learns the verse it comes from.

## Requirements

### Requirement: One word a day, the same for everyone
Each local day SHALL have one Kalimah word, the same for every player on that day and different on the next day, chosen from a fixed list of Qur'anic words. The word for a day SHALL depend only on the date.

#### Scenario: Two players, one day
- **WHEN** two players open Kalimah on the same local day
- **THEN** they get the same word

#### Scenario: The next day
- **WHEN** a player opens Kalimah on the following day
- **THEN** a different word is set and yesterday's game is over

### Requirement: The player chooses Arabic letters or transliteration
The player SHALL be able to play in Arabic letters, typed on an on-screen Arabic keyboard, or in transliteration, typed in Latin letters. The choice SHALL be made on the intro screen, remembered on the device, and fixed for the day once a guess is made. Each word SHALL have one agreed transliteration written in plain Latin letters, so a fair guess is always possible. Both modes SHALL use the same word on the same day.

#### Scenario: Arabic mode
- **WHEN** the player chooses Arabic letters
- **THEN** guesses are entered on an Arabic keyboard and shown right to left

#### Scenario: Transliteration mode
- **WHEN** the player chooses transliteration
- **THEN** guesses are entered in Latin letters and the word's length is that of its transliteration

#### Scenario: Remembered choice
- **WHEN** the player returns the next day
- **THEN** the mode they chose last is selected

### Requirement: Six tries, with each letter marked
The player SHALL have six tries. After each guess, every letter SHALL be marked as right and in place, in the word elsewhere, or not in the word, counting repeated letters correctly. Only guesses of the right length SHALL be accepted. The on-screen keyboard SHALL mark each tried letter with the best mark it has had.

#### Scenario: A repeated letter
- **WHEN** a guess repeats a letter the word has once
- **THEN** only one of the two is marked as in the word

#### Scenario: Wrong length
- **WHEN** a guess is shorter than the word
- **THEN** it is refused and no try is used

#### Scenario: Out of tries
- **WHEN** six wrong guesses are made
- **THEN** the game ends and shows the word

### Requirement: The word is shown in its verse
When a game ends, the word SHALL be shown in Arabic with its transliteration and meaning, in the verse it was taken from, with that verse's reference and translation and a link to it.

#### Scenario: Solved
- **WHEN** the player guesses the word
- **THEN** the word, its meaning and its verse with reference are shown

### Requirement: The result can be shared without giving the word away
A finished game SHALL be shareable as a grid of squares showing how each guess was marked, the number of tries and a link to Kalimah, and SHALL NOT include the word or any guess.

#### Scenario: Sharing
- **WHEN** the player shares a solved game
- **THEN** the shared text holds the grid and the link, and not the word

### Requirement: A game in progress survives a reload
A day's guesses SHALL be kept on the device, so reloading continues the same game. A new local day SHALL start a new game.

#### Scenario: Reload
- **WHEN** the player reloads after two guesses
- **THEN** the two guesses are still shown and four tries remain

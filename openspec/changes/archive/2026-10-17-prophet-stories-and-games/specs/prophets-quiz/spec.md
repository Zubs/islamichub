# Spec Delta

## Purpose

Defines the Prophets quiz: a bank of questions on the lives of the 25 prophets, from which each attempt draws ten at random, every answer backed by its verse or hadith.

## ADDED Requirements

### Requirement: A bank of about 300 questions covers every prophet
The quiz SHALL draw from a bank of at least 300 questions on the lives of the prophets. Every one of the 25 prophets SHALL have at least two questions, in proportion to what the sources say of him. Each question SHALL have one right answer and three wrong ones.

#### Scenario: Size of the bank
- **WHEN** the question bank is checked
- **THEN** it holds at least 300 questions, and every prophet has at least two

#### Scenario: One right answer
- **WHEN** any question is checked
- **THEN** it has exactly four answers, one marked right, with no two the same

### Requirement: Each attempt asks ten questions at random
Each attempt SHALL ask ten different questions chosen at random from the questions of the chosen level, with their answers in random order. Every question SHALL be tagged easy, normal or hard, with at least 50 at each level. A player SHALL not see a question again until they have seen the rest of its level, as far as this device can tell.

#### Scenario: Ten different questions
- **WHEN** an attempt starts
- **THEN** it has ten questions and none appears twice

#### Scenario: Two attempts
- **WHEN** a player finishes an attempt and starts another
- **THEN** the second has none of the first attempt's questions

#### Scenario: Whole bank seen
- **WHEN** a player has seen every question of a level
- **THEN** the next attempt at that level draws from the whole level again

### Requirement: Every answer shows its evidence
After each answer, the quiz SHALL say whether it was right, show the right answer, and show the verse or hadith it rests on, with its reference, before the next question. A verse SHALL be shown in Arabic with its translation.

#### Scenario: A right answer
- **WHEN** the player chooses the right answer
- **THEN** it is marked right and the evidence is shown

#### Scenario: A wrong answer
- **WHEN** the player chooses a wrong answer
- **THEN** it is marked wrong, the right answer is shown, and so is the evidence

#### Scenario: Evidence check
- **WHEN** the question bank is checked
- **THEN** every question carries a reference that is a verse that exists or a hadith that links

### Requirement: The attempt ends with a score
After the tenth question, the quiz SHALL show the score out of ten, the best score on this device, and a list of the questions answered wrong with their right answers and references.

#### Scenario: End of an attempt
- **WHEN** the tenth question is answered
- **THEN** the score, the best score and the missed questions with their evidence are shown

#### Scenario: Leaving mid-attempt
- **WHEN** the player reloads during an attempt
- **THEN** the attempt continues at the same question

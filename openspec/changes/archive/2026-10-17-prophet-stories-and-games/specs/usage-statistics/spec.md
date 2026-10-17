# Spec Delta

## MODIFIED Requirements

### Requirement: A fixed list of actions is counted by name
The site SHALL count each of these actions when it happens: prayer times shown, a Zakat result reached, an inheritance result reached, an adhkar category completed, a tasbih target reached, a Who am I? game finished, a Kalimah game finished, and a Prophets quiz attempt finished. A name outside this list MUST be refused.

#### Scenario: Prayer times shown
- **WHEN** a visitor has prayer times calculated for a location
- **THEN** the prayer-times action is recorded

#### Scenario: A result reached once per page visit
- **WHEN** a visitor reaches a Zakat result and goes on changing the figures
- **THEN** the Zakat action is recorded once for that page visit, not once per change

#### Scenario: An adhkar category completed
- **WHEN** a visitor completes a category for the first time that day
- **THEN** the adhkar action is recorded once, and completing it again that day records nothing

#### Scenario: A tasbih target reached
- **WHEN** a visitor's count reaches the target
- **THEN** the tasbih action is recorded once, and taps past the target record nothing

#### Scenario: A game finished
- **WHEN** a visitor finishes a Who am I? game, a Kalimah game or a quiz attempt
- **THEN** that game's action is recorded once, carrying no guess, answer, word or score

#### Scenario: Kalimah finished twice in a day
- **WHEN** a visitor reloads a Kalimah game they have already finished that day
- **THEN** nothing further is recorded

#### Scenario: An unknown name
- **WHEN** code asks to count a name that is not in the list
- **THEN** nothing is sent

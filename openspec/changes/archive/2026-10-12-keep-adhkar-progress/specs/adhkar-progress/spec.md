# Spec Delta

## Purpose

Keeps a user's place in the day's adhkar on their device, so a reload or a closed tab does not lose the counts they have reached, and each new day starts clean.

## ADDED Requirements

### Requirement: Counts in progress survive a reload
Each count on an adhkar card SHALL be saved on the device as it changes and restored when the page is loaded again on the same local day. A dhikr that belongs to two categories SHALL show the same count in both. Nothing leaves the device.

#### Scenario: Nothing saved
- **WHEN** nothing is saved
- **THEN** every card starts at zero

#### Scenario: One card
- **WHEN** a card is tapped three times and the page is reloaded
- **THEN** it shows three

#### Scenario: Several cards
- **WHEN** cards in different categories have counts and the page is reloaded
- **THEN** all of them are restored

#### Scenario: Shared dhikr
- **WHEN** a dhikr that belongs to two categories is counted in one
- **THEN** the other shows the same count after a reload

#### Scenario: At the target
- **WHEN** a card at its target is reloaded and tapped once more
- **THEN** it reloads at its target and the tap resets it to zero

### Requirement: Each day starts clean
Counts saved on an earlier local day SHALL be discarded.

#### Scenario: Yesterday's counts
- **WHEN** counts were saved yesterday and the page is opened today
- **THEN** every card starts at zero

### Requirement: Completing a category clears only its own counts
Completing a category SHALL clear the saved counts of that category's adhkar, including each part of a multi-part dhikr, and SHALL leave the counts of other categories as they are.

#### Scenario: Completing morning adhkar
- **WHEN** the morning category is completed while an evening card has a count
- **THEN** after a reload the morning cards are at zero and the evening card keeps its count

### Requirement: Damaged saved counts are treated as none
Saved counts that are unreadable, of the wrong kind, or hold a count that is not a positive whole number SHALL be ignored without an error.

#### Scenario: Corrupt data
- **WHEN** the saved counts are not valid JSON, or `null`, or a list
- **THEN** every card starts at zero and the page works

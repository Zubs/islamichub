# Spec Delta

## ADDED Requirements

### Requirement: A damaged entry inside a valid record is ignored
When a stored keyed record is valid but one of its entries is of the wrong kind, that entry SHALL be ignored and the rest of the record used. This applies to `adhkar-progress`, `adhkar-completion-log` and `tasbih-totals`.

#### Scenario: A day that is null or a number
- **WHEN** a day's value inside `adhkar-completion-log` or `tasbih-totals` is `null` or a number
- **THEN** that day is ignored, the other days are read, and no error is thrown

#### Scenario: Streak beside a damaged day
- **WHEN** the completion log holds three good days and one damaged day
- **THEN** the streak is counted from the good days

#### Scenario: A count that is not a number
- **WHEN** a phrase's count inside a day of `tasbih-totals` is text
- **THEN** that count is ignored and the other counts are totalled

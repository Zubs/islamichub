# device-storage Specification

## Purpose

Defines how data kept on the user's device is read, so that missing, damaged or unexpected stored data never stops a page from working.

## Requirements

### Requirement: Unreadable stored data is treated as empty
When stored data that should be a keyed record is missing, is not valid JSON, or is valid JSON of another kind (null, a number, a string, a true or false value, or a list), the site SHALL treat it as empty and MUST NOT show an error or stop working.

#### Scenario: Nothing stored
- **WHEN** nothing is stored under `adhkar-completion-log` or `tasbih-totals`
- **THEN** the adhkar and tasbih pages load with no completions and zero totals

#### Scenario: Not valid JSON
- **WHEN** the text stored under either key is not valid JSON
- **THEN** it is read as empty and no error is thrown

#### Scenario: Valid JSON of the wrong kind
- **WHEN** the text stored under either key is `null`, `42`, `"text"`, `true` or `[1, 2]`
- **THEN** it is read as empty and no error is thrown

#### Scenario: The page keeps working afterwards
- **WHEN** the stored data was read as empty and the user then completes a category or taps the counter
- **THEN** the action is recorded and saved as a valid record, replacing the unreadable data

### Requirement: Readable stored data is left alone
Stored data that is a valid keyed record SHALL be read as it is. Reading MUST NOT rewrite, reorder or remove anything.

#### Scenario: A valid record
- **WHEN** a valid completion log is stored and the adhkar page loads
- **THEN** every entry is available and the stored text is unchanged

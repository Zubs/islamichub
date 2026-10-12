# Spec Delta

## ADDED Requirements

### Requirement: The last fetched prices are kept and their age is shown
The calculator SHALL keep the last prices and rates it fetched on the device. When today's prices cannot be fetched, it SHALL use the kept ones in preference to the built-in reference prices and say how old they are. Kept prices that are unreadable or invalid SHALL be ignored.

#### Scenario: Offline after an earlier visit
- **WHEN** prices were fetched on 3 November and the page is opened offline on 8 November
- **THEN** the 3 November prices are used and the page says they are saved prices, 5 days old

#### Scenario: Never fetched
- **WHEN** prices have never been fetched and cannot be now
- **THEN** the built-in reference prices are used, as before

#### Scenario: Damaged kept prices
- **WHEN** the kept prices are unreadable or hold a zero or negative price
- **THEN** they are ignored

# Spec Delta

## ADDED Requirements

### Requirement: The Prayer page says which clock its times are in
Whenever the Prayer page shows times, it SHALL state that they are shown in this device's time, so a reader who enters coordinates for a place in another timezone is not misled. The note SHALL be in the message files like all interface text.

#### Scenario: Times shown
- **WHEN** coordinates are entered and the times are shown
- **THEN** a note beside the times says they are in this device's time

#### Scenario: No times yet
- **WHEN** no location has been given
- **THEN** no clock note is shown

#### Scenario: Another timezone
- **WHEN** a device set to Lagos time is given Makkah's coordinates
- **THEN** Dhuhr is shown in Lagos time and the note says the times are in this device's time

#### Scenario: Second language
- **WHEN** the page is shown in a second language
- **THEN** the note is in that language

### Requirement: The Prayer page stays current while it is open
While the Prayer page is open with times shown, the highlighted current prayer SHALL change when a new prayer time begins, within a minute. When the local day changes, the page SHALL show the new day's times without a reload.

#### Scenario: A prayer time begins
- **WHEN** the page is open before Asr and the clock passes the Asr time
- **THEN** within a minute Asr is highlighted and the countdown points to Maghrib

#### Scenario: After Isha
- **WHEN** the page is open after Isha
- **THEN** Isha is highlighted and the countdown points to the next Fajr

#### Scenario: Past midnight
- **WHEN** the page is open at 23:59 and the clock passes local midnight
- **THEN** within a minute the times shown are the new day's, and the countdown to Fajr is worked out from them

#### Scenario: Leaving the page
- **WHEN** the reader leaves the Prayer page
- **THEN** it stops updating

# prayer-times Specification

## Purpose

Defines how the site works out the daily prayer times on the device from a location, a date, a calculation method and an Asr option, and how the Prayer page lets the user choose between them.

## Requirements

### Requirement: Asr can be timed by either shadow length
Prayer times SHALL be calculated with an Asr option of Standard, where Asr begins when an object's shadow equals its length plus its noon shadow, or Hanafi, where it begins at twice its length plus its noon shadow. Standard SHALL be the default, and an unknown option SHALL be treated as Standard. The option MUST NOT change any other time.

#### Scenario: No option given
- **WHEN** times are calculated with no Asr option
- **THEN** Asr is the same as with Standard

#### Scenario: Hanafi chosen
- **WHEN** Hanafi is chosen
- **THEN** Asr is later than with Standard and Fajr, Sunrise, Dhuhr, Maghrib and Isha are unchanged

#### Scenario: Published timetable
- **WHEN** times are calculated for London, Lagos and Karachi on 20 March 2026 with each option
- **THEN** each Asr time is within two minutes of a published timetable

#### Scenario: High latitude in winter
- **WHEN** times are calculated at latitude 60° in December with each option
- **THEN** both return a valid Asr between Dhuhr and Maghrib

#### Scenario: Unknown option
- **WHEN** an unrecognised Asr option is given
- **THEN** the Standard time is returned

### Requirement: The Prayer page offers the Asr option
The Prayer page SHALL show an Asr selector beside the calculation method, with Standard selected by default. When times are already shown, changing the Asr option or the calculation method SHALL update the times and the next-prayer countdown without a further button press.

#### Scenario: Switching to Hanafi
- **WHEN** times are shown and the user selects Hanafi
- **THEN** the Asr time moves later and the countdown reflects the new times

#### Scenario: Before any calculation
- **WHEN** no times are shown and the user changes the selector
- **THEN** nothing is calculated until a location is given

#### Scenario: Both positions are named
- **WHEN** the selector is shown
- **THEN** it names both options without presenting either as the correct one

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

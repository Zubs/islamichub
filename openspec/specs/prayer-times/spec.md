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

# Spec Delta

## ADDED Requirements

### Requirement: The panel names today's Islamic day
When today is one of the Islamic days the calendar marks, the Today panel SHALL name it (for example "The day of 'Arafah") and link to the calendar. On other days no such part SHALL be shown. The panel SHALL use the same Hijri date as the calendar and make no network request.

#### Scenario: The day of 'Arafah
- **WHEN** today is 9 Dhul Hijjah
- **THEN** the panel names the day of 'Arafah, linking to `/calendar`

#### Scenario: An ordinary day
- **WHEN** today is not a marked day
- **THEN** the panel shows no Islamic day part

### Requirement: A Jumu'ah tile appears only on Fridays
On a Friday the Today panel SHALL show a Jumu'ah tile linking to `/jumuah`, with the khutbah time if the reader has entered one. On any other day no Jumu'ah tile SHALL be shown.

#### Scenario: Friday
- **WHEN** today is a Friday
- **THEN** the panel shows the Jumu'ah tile, linking to the Friday page

#### Scenario: Friday with a khutbah time
- **WHEN** today is a Friday and the reader entered 13:15
- **THEN** the tile shows the khutbah at 13:15

#### Scenario: Thursday
- **WHEN** today is a Thursday
- **THEN** there is no Jumu'ah tile

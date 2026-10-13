# prayer-settings Specification

## Purpose

Lets a user choose to keep their location and prayer calculation choices on their own device, so prayer and fasting times appear without asking, and lets them remove that again.

## Requirements

### Requirement: Location is remembered only by choice
After a location has been found or entered and times are shown, the Prayer page SHALL offer to remember it. Nothing SHALL be stored unless the user accepts. The saved settings SHALL hold latitude, longitude, place name, calculation method and Asr method, stay on the device, and never be sent anywhere.

#### Scenario: First visit
- **WHEN** a user opens the Prayer page for the first time
- **THEN** nothing is stored and the page asks for a location

#### Scenario: Declining
- **WHEN** times are shown and the user does not accept the offer
- **THEN** nothing is stored

#### Scenario: Accepting
- **WHEN** the user accepts the offer
- **THEN** the location and the two methods are stored on the device

### Requirement: Saved settings show times without asking
When settings are saved, the Prayer page SHALL show today's times on opening with the saved method and Asr method, and the Fasting page SHALL show suhoor and iftar times from the saved location. A change to either method while a location is saved SHALL be remembered.

#### Scenario: Returning user
- **WHEN** a user who saved a location reopens the Prayer page
- **THEN** today's times are shown immediately with no prompt

#### Scenario: Method remembered
- **WHEN** a user with a saved location changes the calculation method and returns later
- **THEN** the changed method is selected and used

#### Scenario: Fasting page
- **WHEN** a user with a saved location opens the Fasting page
- **THEN** suhoor and iftar times are shown without asking

### Requirement: The user can forget the saved location
A "Forget my location" control SHALL remove the saved settings from the device.

#### Scenario: Forgetting
- **WHEN** the user chooses "Forget my location"
- **THEN** the stored settings are removed and the next visit asks for a location again

### Requirement: Coordinates are checked
Latitude SHALL be accepted from −90 to 90 and longitude from −180 to 180, limits included. Anything else SHALL be rejected with a message and never stored.

#### Scenario: Limits
- **WHEN** latitude 90 or −90 with longitude 180 or −180 is entered
- **THEN** times are calculated

#### Scenario: Beyond the limits
- **WHEN** latitude 90.1 or longitude −180.5 is entered
- **THEN** the page asks for valid coordinates and nothing is calculated or stored

### Requirement: Damaged or unavailable storage does not break the page
Saved settings that are missing, unreadable or hold impossible values SHALL be treated as none. When the browser blocks storage, the page SHALL work for the visit and say the location cannot be remembered.

#### Scenario: Corrupt settings
- **WHEN** the stored settings are not valid, or hold a latitude of 200
- **THEN** the page behaves as on a first visit

#### Scenario: Unknown method stored
- **WHEN** the stored settings hold a valid location and an unknown method
- **THEN** the location is used with the default method

#### Scenario: Storage blocked
- **WHEN** the browser refuses to store data
- **THEN** times are still shown for the visit, and the page says the location cannot be remembered

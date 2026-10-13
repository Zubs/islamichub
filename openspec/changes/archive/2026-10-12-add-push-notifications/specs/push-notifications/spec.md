# Spec Delta

## Purpose

Delivers prayer and adhkar reminders when the app is closed, for users who choose it, by keeping the least a server needs to send a push at the right minute, and removes that again on request.

## ADDED Requirements

### Requirement: Push is opt-in and stores the minimum
With push off, no request SHALL be sent to the server and nothing SHALL be stored there. Turning push on SHALL store one record for the device holding only: the push subscription, latitude and longitude rounded to two decimal places, the timezone, the calculation method, the Asr method and the chosen reminders. No name, email, account or precise location SHALL be stored.

#### Scenario: Push off
- **WHEN** push is off
- **THEN** no request is sent to the server and nothing is stored there

#### Scenario: Turning push on
- **WHEN** the user turns push on
- **THEN** one record is stored, with coordinates rounded to two decimal places

#### Scenario: Settings change
- **WHEN** the user changes the calculation method or a reminder switch while push is on
- **THEN** the stored record is updated and the next push uses the new time

### Requirement: The stored record can be deleted
Turning push off, or choosing "Forget my location", SHALL delete the device's record from the server. A subscription the push service reports as gone SHALL be deleted after the first failed send.

#### Scenario: Turning off
- **WHEN** the user turns push off or forgets their location
- **THEN** the server record is deleted

#### Scenario: Expired subscription
- **WHEN** the push service answers that a subscription no longer exists
- **THEN** its record is deleted

### Requirement: A reminder is sent at the device's own prayer time, once
Every minute the server SHALL work out each stored device's prayer times in that device's timezone, with the same calculation the site uses, and send a push for each chosen reminder whose time has arrived. A reminder SHALL be sent once for its day. A reminder more than three minutes late SHALL NOT be sent.

#### Scenario: Two devices
- **WHEN** two devices have different locations and timezones
- **THEN** each receives its reminder at its own local prayer time

#### Scenario: Only Fajr
- **WHEN** a device has only Fajr on
- **THEN** it receives one push a day

#### Scenario: Not twice
- **WHEN** a prayer time arrives in the current minute and the function runs again a minute later
- **THEN** the reminder was sent once

#### Scenario: Missed runs
- **WHEN** the function did not run for ten minutes
- **THEN** it does not send the reminders it missed

### Requirement: Requests to the server are checked
A subscription request that is malformed, oversized, or holds an impossible location, an unknown method or an unknown timezone SHALL be rejected and nothing stored.

#### Scenario: Malformed
- **WHEN** a request lacks a subscription endpoint or keys, or is not valid JSON
- **THEN** it is rejected

#### Scenario: Oversized
- **WHEN** a request is larger than the limit
- **THEN** it is rejected

### Requirement: The user is told what push needs and stores
The settings SHALL say what is stored on the server when push is on. On an iPhone where the app is not installed, the push switch SHALL be disabled with an explanation. In a browser without push support the switch SHALL not be offered. The privacy text on the site SHALL state exactly what is stored and how to delete it.

#### Scenario: iPhone, not installed
- **WHEN** the site is open in Safari on an iPhone and is not installed
- **THEN** the switch is disabled and the note says to add the app to the Home Screen first

#### Scenario: Reading the settings
- **WHEN** the push switch is shown
- **THEN** it says the rounded location, timezone, methods and chosen reminders are kept on the server until push is turned off

### Requirement: A push opens the right page
A push reminder SHALL show the prayer's name and open the tracker when tapped; an adhkar reminder SHALL open its adhkar category.

#### Scenario: Maghrib push
- **WHEN** a Maghrib push is tapped
- **THEN** the tracker opens

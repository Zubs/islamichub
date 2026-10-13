# Spec Delta

## Purpose

Notifies a user at each prayer time and at the times for the morning and evening adhkar while the app is open or running in the background, using only what is on the device.

## ADDED Requirements

### Requirement: Reminders are off until the user turns them on
Reminders SHALL be off by default. With reminders off, no notification permission SHALL be requested and nothing SHALL be scheduled. Turning them on SHALL ask for notification permission. The user's choices SHALL be kept on the device under `reminder-settings`.

#### Scenario: Off
- **WHEN** reminders are off
- **THEN** no permission is requested and nothing is scheduled

#### Scenario: Turning on
- **WHEN** the user turns reminders on and grants permission
- **THEN** reminders are scheduled and the choice is still on after a reload

#### Scenario: Permission refused
- **WHEN** the user refuses permission
- **THEN** the switches turn off and a note explains how to allow notifications in the browser

#### Scenario: No notification support
- **WHEN** the browser has no notification support
- **THEN** the section says so and offers no switches

### Requirement: Reminders need a saved location
Reminders SHALL be available only when a location is saved, since the times are worked out from it.

#### Scenario: No saved location
- **WHEN** no location is saved
- **THEN** the switch is disabled with a note explaining why

### Requirement: Each reminder has its own switch
There SHALL be a switch for each of Fajr, Dhuhr, Asr, Maghrib and Isha, for the morning adhkar (after Fajr) and for the evening adhkar (after Asr). Only reminders that are switched on SHALL be scheduled.

#### Scenario: Only Maghrib
- **WHEN** only Maghrib is on
- **THEN** one notification is scheduled, for Maghrib

### Requirement: Only times still to come today are scheduled
The app SHALL schedule a notification for each switched-on reminder whose time is still ahead today, and none for a time that has passed. It SHALL schedule again when the calculation method, the Asr method, the location or a switch changes, and at local midnight for the new day, without a reload.

#### Scenario: Midday
- **WHEN** all five prayers are on at midday
- **THEN** only the prayers still to come today are scheduled

#### Scenario: One second either side
- **WHEN** a prayer time passed one second ago, and another is one second ahead
- **THEN** the first is not notified and the second is

#### Scenario: Method changed
- **WHEN** the calculation method changes
- **THEN** every reminder is rescheduled to the new times

#### Scenario: Midnight
- **WHEN** local midnight passes with the app running
- **THEN** the new day's reminders are scheduled

### Requirement: A notification opens the right page
Tapping a prayer reminder SHALL open the prayer tracker. Tapping an adhkar reminder SHALL open that adhkar category.

#### Scenario: Fajr
- **WHEN** the user taps a Fajr reminder
- **THEN** the tracker opens

#### Scenario: Morning adhkar
- **WHEN** the user taps a morning adhkar reminder
- **THEN** `/adhkar/morning` opens

### Requirement: The limits are stated
The settings SHALL say plainly that these reminders arrive only while the app is open or running in the background.

#### Scenario: Reading the settings
- **WHEN** the Reminders section is shown
- **THEN** it says reminders arrive only while the app is open or in the background

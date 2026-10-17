# prayer-reminders Specification

## Purpose

Notifies a user at each prayer time and at the times for the morning and evening adhkar while the app is open or running in the background, using only what is on the device.

## Requirements

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
There SHALL be a switch for each of Fajr, Dhuhr, Asr, Maghrib and Isha, for the morning adhkar (after Fajr) and for the evening adhkar (after Asr), for each kind of Islamic day the calendar marks, and for each Friday reminder (Surah al-Kahf, blessings on the Prophet ﷺ, and before the khutbah). Only reminders that are switched on SHALL be scheduled. Settings saved before these switches existed SHALL read with the new switches off.

#### Scenario: Only Maghrib
- **WHEN** only Maghrib is on
- **THEN** one notification is scheduled, for Maghrib

#### Scenario: Older settings
- **WHEN** a device has reminder settings saved before the new switches existed
- **THEN** its prayer and adhkar choices are kept and every new switch is off

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
Tapping a prayer reminder SHALL open the prayer tracker. Tapping an adhkar reminder SHALL open that adhkar category. Tapping an Islamic day reminder SHALL open the calendar, and tapping a Friday reminder SHALL open the Friday page.

#### Scenario: Fajr
- **WHEN** the user taps a Fajr reminder
- **THEN** the tracker opens

#### Scenario: Morning adhkar
- **WHEN** the user taps a morning adhkar reminder
- **THEN** `/adhkar/morning` opens

#### Scenario: 'Arafah
- **WHEN** the user taps an 'Arafah reminder
- **THEN** `/calendar` opens

#### Scenario: Surah al-Kahf
- **WHEN** the user taps the al-Kahf reminder
- **THEN** `/jumuah` opens

### Requirement: The limits are stated
The settings SHALL say plainly that these reminders arrive only while the app is open or running in the background.

#### Scenario: Reading the settings
- **WHEN** the Reminders section is shown
- **THEN** it says reminders arrive only while the app is open or in the background

### Requirement: On-device reminders stay silent while push is on
While push notifications are on for the device, the on-device reminders SHALL NOT be scheduled, so a reminder arrives once.

#### Scenario: Push on with the app open
- **WHEN** push is on and the app is open at a prayer time
- **THEN** one notification arrives, not two

### Requirement: An Islamic day is announced the evening before and on the day
For each kind of Islamic day switched on, a reminder SHALL arrive on the evening before the day, after Isha, saying that tomorrow is that day, and another on the day itself, after Fajr. For a kind that spans several days (the first ten of Dhul Hijjah, the last ten nights of Ramadan, the white days), the evening reminder SHALL come before the first day and the day reminder on each day. Reminders SHALL follow the same Hijri dates the calendar shows.

#### Scenario: 'Arafah
- **WHEN** the 'Arafah reminder is on
- **THEN** one reminder is scheduled after Isha on 8 Dhul Hijjah and one after Fajr on 9 Dhul Hijjah, and none on any other day

#### Scenario: Mondays and Thursdays
- **WHEN** the Monday and Thursday reminder is on
- **THEN** a reminder is scheduled after Isha each Sunday and Wednesday and after Fajr each Monday and Thursday

#### Scenario: Switched off
- **WHEN** no Islamic day reminder is on
- **THEN** none is scheduled on any day

### Requirement: Friday reminders follow Friday and the khutbah time
On a Friday, the al-Kahf reminder SHALL arrive after Fajr, the blessings reminder after Asr, and the khutbah reminder thirty minutes before the khutbah time the reader entered. The khutbah reminder SHALL NOT be switchable on until a khutbah time is entered, and SHALL say why. No Friday reminder SHALL be scheduled on any other day.

#### Scenario: Khutbah at 13:15
- **WHEN** the khutbah time is 13:15 and its reminder is on
- **THEN** a reminder is scheduled at 12:45 on Friday and on no other day

#### Scenario: No khutbah time
- **WHEN** no khutbah time is entered
- **THEN** the khutbah reminder's switch is disabled with a note saying a time is needed

#### Scenario: Not Friday
- **WHEN** it is Thursday
- **THEN** no Friday reminder is scheduled

### Requirement: Each page carries its own switches
The prayer and adhkar switches SHALL be on the Prayer page, the Islamic day switches on the calendar page and the Friday switches on the Friday page. Switching one on while reminders are off SHALL ask for permission and turn reminders on with only that switch.

#### Scenario: Switching on from the calendar
- **WHEN** reminders are off and the reader switches on the 'Arafah reminder on the calendar page
- **THEN** they are asked for notification permission, and once it is granted the 'Arafah reminder is on

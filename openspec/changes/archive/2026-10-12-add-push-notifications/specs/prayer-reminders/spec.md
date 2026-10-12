# Spec Delta

## ADDED Requirements

### Requirement: On-device reminders stay silent while push is on
While push notifications are on for the device, the on-device reminders SHALL NOT be scheduled, so a reminder arrives once.

#### Scenario: Push on with the app open
- **WHEN** push is on and the app is open at a prayer time
- **THEN** one notification arrives, not two

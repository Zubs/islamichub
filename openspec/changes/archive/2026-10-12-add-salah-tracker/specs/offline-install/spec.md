# Spec Delta

## ADDED Requirements

### Requirement: The installed app has a Tracker shortcut
The web manifest SHALL include a shortcut to the prayer tracker at `/tracker`, beside those for Prayer, Adhkar and Tasbih.

#### Scenario: Shortcuts
- **WHEN** the built manifest is read
- **THEN** it lists a shortcut to `/tracker`, and the address is one the site serves

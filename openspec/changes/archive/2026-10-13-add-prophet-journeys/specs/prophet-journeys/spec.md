# Spec Delta

## Purpose

Shows where a prophet travelled, on a map and as a list, and says how each place is known.

## ADDED Requirements

### Requirement: A journey is shown as a map and a list of the same stops
A prophet's page SHALL show his journey, when he has one, as numbered stops on a map of the region joined in order, and as a list below it giving each stop's name, what happened there, its reference and how the place is known. A prophet with no journey SHALL show no map and leave no gap. A journey of one stop SHALL show one marker and no line.

#### Scenario: No journey
- **WHEN** a prophet has no journey
- **THEN** no map is shown

#### Scenario: One stop
- **WHEN** a journey has one stop
- **THEN** one marker is shown and no line

#### Scenario: Ibrahim's journey
- **WHEN** Ibrahim's page is opened
- **THEN** Ur, Harran, Canaan, Egypt and Makkah are shown in order, joined by a line

#### Scenario: Reading in order
- **WHEN** a reader steps through the stops in order
- **THEN** each shows what happened there and its reference

### Requirement: Each stop says how the place is known
Each stop SHALL carry a reference and SHALL be labelled either as named in the Qur'an or hadith, or as identified by historians.

#### Scenario: Identified by historians
- **WHEN** a stop's place is identified by historians
- **THEN** it carries that label, and its text says so

### Requirement: Selecting a stop links the map and the list
Selecting a stop on the map SHALL highlight it in the list, and selecting it in the list SHALL highlight it on the map. Every stop SHALL be reachable and operable with the keyboard and named for a screen reader, and two stops SHALL be far enough apart to be selected separately at 360px wide.

#### Scenario: From the list
- **WHEN** a stop is chosen in the list
- **THEN** its marker is highlighted

#### Scenario: From the map
- **WHEN** a marker is chosen
- **THEN** its entry in the list is highlighted

#### Scenario: Keyboard
- **WHEN** a marker has focus and Enter or Space is pressed
- **THEN** that stop is selected

#### Scenario: Close stops
- **WHEN** the journey is shown at 360px wide
- **THEN** every marker's touch target is at least 44px and no two overlap

### Requirement: The map uses no outside service
The map SHALL be drawn inside the site as an SVG, make no request to any outside service, and show with the network off.

#### Scenario: No requests
- **WHEN** the page is opened
- **THEN** no request is made for the map

#### Scenario: Offline
- **WHEN** the network is off and the site has been visited before
- **THEN** the map still shows

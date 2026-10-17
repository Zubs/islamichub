# Spec Delta

## MODIFIED Requirements

### Requirement: A journey is shown as a map and a list of the same stops
A prophet's page SHALL show his places, when he has any with a known location, as numbered markers on a map of the region and as a list below it giving each place's name, what happened there, its reference and how the place is known. The markers SHALL be joined by a line in order only when the places form a journey whose order the sources give. A prophet with no located place SHALL show no map and leave no gap. A single place SHALL show one marker and no line.

#### Scenario: No journey
- **WHEN** a prophet has no place with a known location
- **THEN** no map is shown

#### Scenario: One stop
- **WHEN** a prophet has one located place
- **THEN** one marker is shown and no line

#### Scenario: Ibrahim's journey
- **WHEN** Ibrahim's page is opened
- **THEN** Ur, Harran, Canaan, Egypt and Makkah are shown in order, joined by a line

#### Scenario: Places that are not a journey
- **WHEN** a prophet has several places whose order the sources do not give
- **THEN** they are shown as markers with no line joining them

#### Scenario: Reading in order
- **WHEN** a reader steps through the stops in order
- **THEN** each shows what happened there and its reference

## ADDED Requirements

### Requirement: The map covers the lands of every story
The map's region SHALL include every located place in any story, from the Nile in the west to Mesopotamia in the east and from Anatolia in the north to southern Arabia in the south. A place outside the region SHALL fail an automated check rather than be drawn off the map.

#### Scenario: Southern Arabia
- **WHEN** a story places events in Saba' or among 'Ad
- **THEN** its markers appear on the map with the coastline around them

#### Scenario: Out of bounds
- **WHEN** a place's coordinates lie outside the map's region
- **THEN** an automated check fails and names the place

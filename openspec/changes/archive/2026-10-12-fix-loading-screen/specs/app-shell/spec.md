# Spec Delta

## Purpose

Defines what surrounds every page of the site, starting with the loading screen shown while the first page is prepared.

## ADDED Requirements

### Requirement: The loading screen clears as soon as the first page can draw
The Bismillah loading screen SHALL show only until the first page is ready to draw, with no minimum display time, and MUST NOT wait for any outside service. While it shows it SHALL be announced to assistive technology as a status.

#### Scenario: First page ready
- **WHEN** the first page's code has loaded
- **THEN** the loading screen is removed without further delay

#### Scenario: Price service down
- **WHEN** the price services do not answer
- **THEN** the loading screen still clears and the page is usable

#### Scenario: Screen reader
- **WHEN** the loading screen is showing
- **THEN** it is exposed as a status labelled as loading

#### Scenario: Deep link
- **WHEN** a user opens a link to `/adhkar/morning`
- **THEN** they can start counting without waiting for prices

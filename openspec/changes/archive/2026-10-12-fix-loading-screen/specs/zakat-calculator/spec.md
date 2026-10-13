# Spec Delta

## ADDED Requirements

### Requirement: Only the Zakat page requests prices, once per visit
Gold and silver prices and exchange rates SHALL be requested only when the Zakat page is opened, and at most once per visit to the site. Returning to the Zakat page SHALL reuse what the first request gave.

#### Scenario: Another page
- **WHEN** a visitor opens `/prayer` and never opens the Zakat page
- **THEN** no request for prices or rates is made

#### Scenario: Zakat page
- **WHEN** a visitor opens `/zakat`
- **THEN** one request for the price dataset is made

#### Scenario: Returning
- **WHEN** the visitor leaves the Zakat page and returns
- **THEN** no further request is made and the earlier prices are shown

#### Scenario: Filling in while loading
- **WHEN** prices are still loading on a slow connection
- **THEN** the form can be filled in and gives a result on reference prices

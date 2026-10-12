# Spec Delta

## ADDED Requirements

### Requirement: Naira is an offered currency
The calculator SHALL offer Nigerian naira (NGN, ₦) beside pounds, dollars, euros and riyals, with pounds as the default. Naira prices SHALL be the dollar price per gram multiplied by the dollar-to-naira rate, and naira amounts SHALL be shown with the ₦ sign, thousands separators and two decimals.

#### Scenario: Nothing entered in naira
- **WHEN** naira is selected and every input is empty
- **THEN** Zakat due is shown as ₦0.00

#### Scenario: Naira gold price
- **WHEN** naira is selected, gold is 4,000 dollars per ounce and a dollar buys 1,500 naira
- **THEN** gold is 4,000 ÷ 31.1035 × 1,500 naira per gram

#### Scenario: Round trip from naira
- **WHEN** the user switches from naira to each other currency and back to naira
- **THEN** the naira price is the same as at the start

#### Scenario: Large amounts
- **WHEN** a total is 25,400,000 naira
- **THEN** it is shown as ₦25,400,000.00

#### Scenario: Exactly at the naira nisab
- **WHEN** net wealth in naira equals the nisab exactly
- **THEN** Zakat is obligatory, and one kobo less is not

#### Scenario: Other currencies unchanged
- **WHEN** pounds, dollars, euros or riyals are selected
- **THEN** every figure is the same as before naira was added

### Requirement: The page says the official naira rate is used
When naira is selected, the page SHALL state that the official exchange rate is used, that local prices can differ, and that the user can type their own price per gram.

#### Scenario: Naira selected
- **WHEN** the user selects naira
- **THEN** the page shows a note that the official rate is in use and points to the typed price fields

#### Scenario: Another currency selected
- **WHEN** any other currency is selected
- **THEN** the note is not shown

### Requirement: The user can type their own price per gram
The user SHALL be able to type a price per gram for gold and for silver in the selected currency. A typed price SHALL replace the fetched one in both the calculation and the nisab, and the page SHALL show that a custom price is in use. Typed prices MUST NOT be stored or sent anywhere, and SHALL be cleared when the currency changes.

#### Scenario: Typed gold price
- **WHEN** the user types a gold price of 150,000 per gram
- **THEN** gold holdings and the gold nisab (85 g) are both valued at 150,000 per gram, and the page marks the gold price as custom

#### Scenario: Typed silver price
- **WHEN** the user types a silver price per gram
- **THEN** silver holdings and the silver nisab (595 g) use it, and the gold price is unaffected

#### Scenario: Clearing a typed price
- **WHEN** the user clears a typed price
- **THEN** the fetched price is used again and the custom mark is gone

#### Scenario: Invalid typed price
- **WHEN** the user types zero, a negative number or text
- **THEN** the entry is rejected with a message and the fetched price is kept

#### Scenario: Currency changes
- **WHEN** the user changes currency after typing a price
- **THEN** the typed price is cleared, as it was quoted in the previous currency

## MODIFIED Requirements

### Requirement: Prices are fetched and checked before use
The calculator SHALL fetch the day's gold and silver prices and exchange rates when prices are requested, and use a fetched value only if it is a positive, finite number. If the first source fails or times out it SHALL try a second. The request MUST NOT include anything the user entered.

#### Scenario: Prices load
- **WHEN** the source answers with valid prices and rates
- **THEN** they are used, and the date they are for is recorded

#### Scenario: First source fails
- **WHEN** the first source fails or does not answer in time and the second answers
- **THEN** the second source's prices are used

#### Scenario: A price is missing or not a number
- **WHEN** a reply has no gold price, or a price that is zero, negative or not a number
- **THEN** that reply is treated as a failure for metals

#### Scenario: A rate is missing
- **WHEN** a reply has valid metal prices but lacks a valid rate for one of the five offered currencies, the naira included
- **THEN** the fetched metals are used and the built-in rates are used for all currencies

#### Scenario: Nothing is sent
- **WHEN** prices are fetched after the user has filled in the calculator or typed a price per gram
- **THEN** the requests contain none of the amounts entered

### Requirement: The calculator works without live prices
When prices or rates cannot be fetched, the calculator SHALL use built-in reference values on the same dollar base, stay fully usable, and show no error. Metals and rates fall back independently. The built-in rates SHALL include the naira.

#### Scenario: Both fail
- **WHEN** neither source answers
- **THEN** the built-in metal prices and rates are used and the calculator gives a result

#### Scenario: Rates fail, metals load
- **WHEN** valid metal prices arrive without valid rates
- **THEN** fetched metal prices are used with built-in rates

#### Scenario: Naira on built-in rates
- **WHEN** naira is selected and rates could not be fetched
- **THEN** the built-in naira rate is used and the page says the rates are not current

#### Scenario: A slow source does not hold the page
- **WHEN** a source has not answered within the time limit
- **THEN** the attempt is abandoned and the next step proceeds

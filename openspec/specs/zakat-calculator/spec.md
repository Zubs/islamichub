# zakat-calculator Specification

## Purpose

Defines how the Zakat calculator works out what is due, how the nisab is set, where gold and silver prices come from, how they are converted between currencies, and what the page tells the user about those prices.

## Requirements

### Requirement: Zakat is 2.5% of net wealth at or above the nisab
The calculator SHALL add cash, money owed to the user, metals and investments, subtract debts to give net wealth (never below zero), and report Zakat due as 2.5% of net wealth when net wealth is at or above the nisab, and zero otherwise.

#### Scenario: Nothing entered
- **WHEN** every input is empty
- **THEN** Zakat due is zero and the page says Zakat is not obligatory

#### Scenario: One kind of wealth
- **WHEN** the user enters 10,000 in savings and nothing else, and the nisab is below 10,000
- **THEN** Zakat due is 250

#### Scenario: Several kinds of wealth and debts
- **WHEN** the user enters cash, money owed, investments and debts
- **THEN** net wealth is their sum less the debts, and each group's total is shown in the breakdown

#### Scenario: Exactly at the nisab
- **WHEN** net wealth equals the nisab exactly
- **THEN** Zakat is obligatory and due at 2.5%

#### Scenario: One penny under the nisab
- **WHEN** net wealth is one penny below the nisab
- **THEN** Zakat is not obligatory and the amount due is zero

#### Scenario: Debts larger than wealth
- **WHEN** debts are greater than the user's wealth
- **THEN** net wealth is zero, never a negative figure, and nothing is due

### Requirement: Gold and silver are valued by weight, purity and price
The value of gold SHALL be its weight in grams multiplied by its purity and the price of pure gold per gram. The value of silver SHALL be its weight multiplied by the price per gram. A value entered directly is added as it is.

#### Scenario: 22-carat gold
- **WHEN** the user enters 100 g of gold at 22 carat (0.9167) and the gold price is 100 per gram
- **THEN** the gold is valued at 9,167

#### Scenario: Gold, silver and a direct value together
- **WHEN** the user enters gold, silver and a directly entered value
- **THEN** the metals total is the sum of the three

### Requirement: The nisab follows the chosen metal
The nisab SHALL be the value of 85 g of pure gold when the gold method is chosen, which is the default, and the value of 595 g of silver when the silver method is chosen, in the selected currency. The nisab shown on the page and the nisab used to decide whether Zakat is due MUST be the same number.

#### Scenario: Gold method
- **WHEN** the gold method is selected and gold is 100 per gram
- **THEN** the nisab is 8,500

#### Scenario: Silver method
- **WHEN** the silver method is selected and silver is 1.50 per gram
- **THEN** the nisab is 892.50

#### Scenario: Shown and used agree
- **WHEN** the nisab is displayed
- **THEN** it is the same figure the calculation compares net wealth against

### Requirement: Prices convert through one base
Gold and silver prices SHALL be held in US dollars per troy ounce and exchange rates as units of each currency per dollar. The price per gram in a currency SHALL be the dollar price per ounce divided by 31.1035 and multiplied by that currency's rate, and by nothing else. Fetched and built-in values MUST use this same base.

#### Scenario: Dollars
- **WHEN** dollars are selected and gold is 4,000 dollars per ounce
- **THEN** gold is 128.60 per gram

#### Scenario: Pounds
- **WHEN** pounds are selected, gold is 4,000 dollars per ounce and a dollar buys 0.75 pounds
- **THEN** gold is 96.45 per gram, which is the dollar price per gram times 0.75

#### Scenario: Round trip through every currency
- **WHEN** the user switches from pounds to dollars, euros and riyals and back to pounds
- **THEN** the pound price is the same as at the start

#### Scenario: Fetched and built-in values agree on the base
- **WHEN** fetched prices replace the built-in ones, or the built-in ones are used after a failed fetch
- **THEN** a price in pounds is never multiplied by a pound rate twice or by a rate on another base

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

### Requirement: The page says which prices are in use
The page SHALL tell the user whether the gold and silver prices are the day's fetched prices or built-in reference prices, and the same for exchange rates, and SHALL show the date the prices are from.

#### Scenario: Fetched prices
- **WHEN** fetched prices are in use
- **THEN** the page says the prices are for a named date and marks them as current

#### Scenario: Reference prices
- **WHEN** built-in metal prices are in use
- **THEN** the page says these are reference prices, gives their date, and advises checking the current price

#### Scenario: Reference rates only
- **WHEN** fetched metal prices are in use with built-in rates
- **THEN** the page says the exchange rates are not current

#### Scenario: While loading
- **WHEN** prices are still being fetched
- **THEN** the page shows that prices are loading and the calculator can already be filled in

### Requirement: No price request is blocked by the browser
Price requests SHALL go only to addresses the site's content security policy allows and that answer browsers with a cross-origin header.

#### Scenario: Opening any page
- **WHEN** a visitor opens any page of the site with the network on
- **THEN** the console shows no blocked or failed price request

#### Scenario: Opening the Zakat page
- **WHEN** a visitor opens the Zakat page with the network on
- **THEN** the day's prices are shown, marked as current

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

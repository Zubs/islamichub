# interface-translation Specification

## Purpose

Makes the site's navigation, buttons, labels and tool text translatable: where that text is held, how a language is chosen and remembered, how each language is addressed, and how numbers, dates and currency follow it.

## Requirements

### Requirement: Interface text lives in message files
Interface text SHALL be held in one message file per language, with English as the source. Interface components MUST NOT hold hard-coded text. A text missing from a translation SHALL be shown in English, never as a blank or a key name. A translation file holding a key that English does not have SHALL fail an automated check.

#### Scenario: No hard-coded text
- **WHEN** the interface components are checked
- **THEN** none holds text outside the message files

#### Scenario: Missing translation
- **WHEN** a text is missing from the current language's file
- **THEN** the English text is shown

#### Scenario: Unknown key in a translation
- **WHEN** a translation file has a key English does not have
- **THEN** an automated check fails

#### Scenario: A second language
- **WHEN** a complete second message file is added
- **THEN** every piece of interface text changes with no component edited

### Requirement: Each language has its own addresses
English SHALL stay at the current addresses. Every other available language SHALL be served under its code as a prefix, with the same pages. An address with an unknown language prefix SHALL show the 404 page.

#### Scenario: English unchanged
- **WHEN** only English is available
- **THEN** every address works as before

#### Scenario: Prefixed address
- **WHEN** a second language is available and `/<code>/prayer` is opened
- **THEN** the Prayer page is shown in that language

#### Scenario: Unknown prefix
- **WHEN** an address with an unknown language prefix is opened
- **THEN** the 404 page is shown

### Requirement: The user can switch language and the choice is kept
A language switcher SHALL be shown in the navigation when more than one language is available, and hidden otherwise. Switching SHALL change the interface text and the address prefix and stay on the same page. The choice SHALL be remembered on the device. A first visit SHALL follow the browser's language where that language is available, and English otherwise.

#### Scenario: Only English
- **WHEN** only English is available
- **THEN** the switcher is hidden

#### Scenario: Switching
- **WHEN** the user switches to a second language on the Zakat page
- **THEN** the navigation and the page's labels change, the address gains the prefix, and the user is still on the Zakat page

#### Scenario: Next visit
- **WHEN** the user returns after choosing a language
- **THEN** that language is selected

#### Scenario: Browser set to an unavailable language
- **WHEN** a first visit comes from a browser set to a language the site does not have
- **THEN** the site is shown in English

#### Scenario: Staying in a language
- **WHEN** a user reading in a second language follows a link inside the site
- **THEN** the next page is in that language

### Requirement: Pages declare their language and their other versions
The document's language and direction SHALL follow the current language. When more than one language is available, each page SHALL name its address in every available language for search engines.

#### Scenario: Document language
- **WHEN** a page is shown in a second language
- **THEN** `<html lang>` is that language's code

#### Scenario: Other versions
- **WHEN** two languages are available
- **THEN** each page lists both addresses as alternates, and a default

### Requirement: Numbers, dates, currency and counts follow the language
Numbers, dates and currency SHALL be formatted for the current language. Text with a count SHALL read correctly for zero, one and many.

#### Scenario: Counts
- **WHEN** a count of days is shown
- **THEN** it reads "0 days", "1 day" and "3 days"

#### Scenario: Currency
- **WHEN** the language changes on the Zakat page
- **THEN** amounts are formatted for that language

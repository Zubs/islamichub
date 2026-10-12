# usage-statistics Specification

## Purpose
Defines what the site counts about how it is used, what it must never send, when it does not count at all, and what visitors are told, so that usage can be understood without following or identifying anyone.

## Requirements

### Requirement: Page views are counted by address
The site SHALL count one page view each time a visitor arrives at a page or moves to another page within the site, recording the page's path and title.

#### Scenario: Arriving at a page
- **WHEN** a visitor opens `/prayer` directly
- **THEN** one page view is recorded for `/prayer`

#### Scenario: Moving between pages
- **WHEN** a visitor moves from the home page to `/adhkar` and then to `/adhkar/morning` without reloading
- **THEN** three page views are recorded, one for each path

#### Scenario: The same page again
- **WHEN** a navigation ends on the path the visitor is already on
- **THEN** no further page view is recorded

#### Scenario: Query strings are not sent
- **WHEN** a visitor opens a page whose address has a query string
- **THEN** the path is recorded without the query string

### Requirement: The source of a visit is counted by name only
The site SHALL record where a visit came from as the referring site's host name, on the first page view of a visit only. It MUST NOT send the referring page's full address.

#### Scenario: Arriving from another site
- **WHEN** a visitor arrives from `https://www.google.com/search?q=zakat+calculator`
- **THEN** the source is recorded as `www.google.com` and the search words are not sent

#### Scenario: Arriving directly
- **WHEN** a visitor arrives with no referring site
- **THEN** the page view is recorded with no source

#### Scenario: Later pages in the same visit
- **WHEN** the visitor moves to a second page within the site
- **THEN** no source is sent with that page view

#### Scenario: A link carrying a source tag
- **WHEN** a visitor arrives by a link whose address carries the site's source tag, such as one shared on WhatsApp
- **THEN** the source is recorded as the tag's value, and the tag is removed from the address shown in the browser

### Requirement: A fixed list of actions is counted by name
The site SHALL count each of these actions when it happens: prayer times shown, a Zakat result reached, an inheritance result reached, an adhkar category completed, and a tasbih target reached. A name outside this list MUST be refused.

#### Scenario: Prayer times shown
- **WHEN** a visitor has prayer times calculated for a location
- **THEN** the prayer-times action is recorded

#### Scenario: A result reached once per page visit
- **WHEN** a visitor reaches a Zakat result and goes on changing the figures
- **THEN** the Zakat action is recorded once for that page visit, not once per change

#### Scenario: An adhkar category completed
- **WHEN** a visitor completes a category for the first time that day
- **THEN** the adhkar action is recorded once, and completing it again that day records nothing

#### Scenario: A tasbih target reached
- **WHEN** a visitor's count reaches the target
- **THEN** the tasbih action is recorded once, and taps past the target record nothing

#### Scenario: An unknown name
- **WHEN** code asks to count a name that is not in the list
- **THEN** nothing is sent

### Requirement: Nothing a visitor enters is ever sent
A counting request SHALL contain only the page path, the page title, the source name, the action name, the screen width and a marker for automated browsers. It MUST NOT contain any amount, weight, coordinate, place name, heir, count, phrase, search text or other input, and the function that counts an action MUST NOT accept any value other than the action's name.

#### Scenario: After filling in the Zakat calculator
- **WHEN** a visitor enters their savings and gold and reaches a result
- **THEN** the request for that action contains none of the figures entered and none of the results

#### Scenario: After finding prayer times
- **WHEN** a visitor's location is used to show prayer times
- **THEN** the request contains no coordinate and no place name

#### Scenario: Every tool page inspected
- **WHEN** every counting request sent while using each tool is inspected
- **THEN** each contains only the fields listed in this requirement

### Requirement: No visitor is recognised
The site SHALL NOT set a cookie, store an identifier, or build a fingerprint for counting. The only thing it stores on the device for this feature is the visitor's choice not to be counted.

#### Scenario: After a visit
- **WHEN** a visitor has browsed several pages and used a tool
- **THEN** no cookie has been set and nothing has been stored on the device by the counting code

#### Scenario: No third-party code
- **WHEN** any page is loaded
- **THEN** no script is loaded from the statistics service or any other outside address

### Requirement: Visitors who ask not to be counted are not counted
The site SHALL send no counting request for a visitor whose browser sends Do Not Track or Global Privacy Control, or who has turned on "Don't count my visits".

#### Scenario: Do Not Track
- **WHEN** the visitor's browser has Do Not Track turned on
- **THEN** no counting request is sent

#### Scenario: Global Privacy Control
- **WHEN** the visitor's browser sends Global Privacy Control
- **THEN** no counting request is sent

#### Scenario: Turning the switch on
- **WHEN** a visitor turns on "Don't count my visits" on the About page
- **THEN** no further counting request is sent, starting at once

#### Scenario: The choice is remembered
- **WHEN** that visitor returns later on the same device
- **THEN** the switch is still on and nothing is counted

#### Scenario: Turning the switch off again
- **WHEN** the visitor turns the switch off
- **THEN** counting resumes and the stored choice is removed

### Requirement: Counting happens only on the live site
The site SHALL count only when it is served from its live address and a counting address has been configured. Local development, automated tests, deploy previews and copies of the project without the configuration MUST send nothing.

#### Scenario: Local development
- **WHEN** the site is run locally
- **THEN** no counting request is sent

#### Scenario: A deploy preview
- **WHEN** the site is opened on a preview address
- **THEN** no counting request is sent

#### Scenario: Not configured
- **WHEN** the site is built without a counting address
- **THEN** no counting request is sent on any address

### Requirement: Counting never gets in the way
A counting request SHALL be sent without delaying the page, and its failure MUST NOT be noticed by the visitor: no error is shown, nothing is retried, and nothing is queued for later.

#### Scenario: The service is blocked
- **WHEN** the counting request is blocked or the service is down
- **THEN** every page and tool works as normal and no uncaught error is logged

#### Scenario: No connection
- **WHEN** the visitor has no connection
- **THEN** nothing is stored to be sent later

#### Scenario: Only the counting address is contacted
- **WHEN** the counting code runs
- **THEN** its request goes to the one configured counting address, which the content security policy allows

### Requirement: Visitors are told what is counted
The site SHALL state in plain words, on the About page, what is counted, what is never sent, which service receives it and how that service treats IP addresses, and how to turn counting off.

#### Scenario: Reading the About page
- **WHEN** a visitor reads the privacy section of the About page
- **THEN** they find what is counted, that nothing they enter is sent, the name of the service, and the "Don't count my visits" switch

#### Scenario: The old promise is not left standing
- **WHEN** the site's text and the project's documents are searched
- **THEN** none still says the site has no analytics or statistics

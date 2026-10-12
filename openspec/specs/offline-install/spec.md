# offline-install Specification

## Purpose

Lets people install the site on their phone and use its main tools with no connection, keeps the stored copy up to date, and keeps a first visit light enough for slow and costly connections.

## Requirements

### Requirement: Every page opens offline after one visit
After one visit online, the site SHALL store its pages, styles and scripts on the device so that every route opens with no connection. Fonts the visitor has loaded SHALL be kept too. A first visit made offline shows the browser's own offline page, as nothing is stored yet.

#### Scenario: Home page offline
- **WHEN** a visitor who has visited once reloads the home page with no connection
- **THEN** the home page loads

#### Scenario: Every route
- **WHEN** the visitor opens any route of the site with no connection
- **THEN** it loads, because the code for every route was stored on the first visit

#### Scenario: Storage full or blocked
- **WHEN** the browser cannot store the site
- **THEN** the site still works online

### Requirement: The device tools work fully offline
Prayer times, the Qibla direction, adhkar and the tasbih counter SHALL work with no connection. Prayer times offline need a saved location. What a user records offline SHALL still be there after reconnecting.

#### Scenario: Prayer times
- **WHEN** a user with a saved location opens the Prayer page offline
- **THEN** today's times are shown, and after Isha the next prayer is tomorrow's Fajr

#### Scenario: Counting offline
- **WHEN** a user taps the tasbih counter and completes an adhkar category offline
- **THEN** both are still recorded after reconnecting

### Requirement: Viewed hadith pages are kept, and others say they are offline
A hadith book or chapter viewed online SHALL open offline, whether it was viewed before the library moved to the `/api/hadith/` proxy or after. One never viewed SHALL show a message saying the page needs a connection, not a generic error.

#### Scenario: Viewed chapter
- **WHEN** a chapter viewed online is opened offline
- **THEN** its hadiths are shown

#### Scenario: Chapter viewed before the proxy
- **WHEN** a chapter that was stored from hadithapi.com before the move is opened offline
- **THEN** its hadiths are shown from that stored copy

#### Scenario: Chapter never viewed
- **WHEN** a chapter never viewed is opened offline
- **THEN** the page says the user is offline and that this page has not been saved

### Requirement: A new version is offered, not forced
When a new version of the site has been deployed, an open page SHALL show "Update available" with a refresh control, and SHALL keep running the version it has until the user refreshes.

#### Scenario: New deploy
- **WHEN** a new version is found while a page is open
- **THEN** "Update available" appears, and choosing refresh loads the new version

### Requirement: The site can be installed
The site SHALL publish a web manifest with its name, colours, a 192px icon, a 512px icon, a maskable icon and shortcuts to Prayer, Adhkar and Tasbih, with no missing files. An Install control SHALL show where the browser offers installation, and on iPhone a short note SHALL explain "Add to Home Screen". Neither shows once the site is installed.

#### Scenario: Manifest
- **WHEN** the built site's manifest is read
- **THEN** every icon it names exists in the build and every shortcut is a clean address the site serves

#### Scenario: Browser offers installation
- **WHEN** the browser signals that the site can be installed
- **THEN** an Install control is shown, and using it opens the browser's install prompt

#### Scenario: iPhone
- **WHEN** the site is open in Safari on an iPhone and is not installed
- **THEN** a note explains how to add it to the Home Screen

### Requirement: A first visit to the home page is light
A first visit to the home page SHALL download no more than 600 KB of the site's own files, and a page SHALL download only the code it needs.

#### Scenario: Home page weight
- **WHEN** the site is built
- **THEN** the home page's document, styles and scripts together are no more than 600 KB

#### Scenario: Code per page
- **WHEN** the home page loads
- **THEN** it does not load the code of the Zakat, Hajj or hadith pages

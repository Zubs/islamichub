# Spec Delta

## Purpose

Defines the title, description, canonical link and indexing instruction each page presents to browsers, search engines and link previews, and keeps the sitemap in step with the pages that exist.

## ADDED Requirements

### Requirement: Every page has one title, one description and one canonical link
Each page SHALL present exactly one title, one description and one canonical link. A page that gives no title or description SHALL get the site's defaults. Open Graph and Twitter titles and descriptions SHALL match the page's own.

#### Scenario: Page with no values
- **WHEN** a page sets no title or description
- **THEN** it shows the site's default title and description

#### Scenario: One of each
- **WHEN** any page is open
- **THEN** the document has exactly one canonical link and one description

#### Scenario: Moving between pages
- **WHEN** a user moves from the home page to an adhkar category
- **THEN** the tab title and the canonical link change to that category's

### Requirement: The canonical link matches the page's address
The canonical link SHALL be the site's address followed by the page's path, without a query string or fragment. The home page's canonical link SHALL be the site's address alone.

#### Scenario: Home
- **WHEN** the home page is open
- **THEN** its canonical link is `https://islamichub.xyz/`

#### Scenario: Nested paths
- **WHEN** `/faith/articles` or `/hadith/books` is open
- **THEN** the canonical link ends with that same path

#### Scenario: Query string
- **WHEN** a page is opened with a query string
- **THEN** the canonical link does not include it

### Requirement: Titles can arrive after the page opens
A page whose title depends on loaded data SHALL show a holding title until the data arrives and the real title afterwards.

#### Scenario: Hadith chapter
- **WHEN** a hadith chapter page is loading
- **THEN** the title names the chapter by number, and once loaded it names the chapter

### Requirement: The not-found page is not indexed
The 404 page SHALL carry a `noindex` instruction, and no other page does.

#### Scenario: Unknown address
- **WHEN** an unknown address is opened
- **THEN** the page is marked as not to be indexed

### Requirement: The sitemap and the router agree
Every page with a fixed address SHALL appear in the sitemap, and every address in the sitemap SHALL be a page that exists.

#### Scenario: Route missing from the sitemap
- **WHEN** a fixed route is added without a sitemap entry
- **THEN** an automated check fails

#### Scenario: Stale sitemap entry
- **WHEN** the sitemap lists an address no route serves
- **THEN** an automated check fails

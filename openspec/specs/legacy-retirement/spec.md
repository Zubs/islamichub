# legacy-retirement Specification

## Purpose

Makes sure nothing from the old version of the app is still published, logged or linked, and that visitors who still hold the old app's service worker are moved to the current site.

## Requirements

### Requirement: The old service worker retires itself
A visitor's browser that still holds the service worker registered by the old app SHALL, on its next visit, delete every cache that worker created, remove the worker's registration, and show the current site. The visitor MUST NOT have to clear site data by hand.

#### Scenario: Returning visitor with the old worker
- **WHEN** a visitor whose browser holds the old worker and its cache opens the site
- **THEN** the old caches are deleted, the registration is removed, and the open page reloads into the current site

#### Scenario: Visitor without the old worker
- **WHEN** a visitor whose browser never registered a worker opens the site
- **THEN** no worker is registered and nothing reloads

#### Scenario: The replacement never serves pages
- **WHEN** the replacement worker is active, even for a moment
- **THEN** every request goes to the network and nothing is answered from a cache

#### Scenario: A reload cannot be triggered
- **WHEN** the replacement worker cannot reload an open page
- **THEN** the caches are still deleted and the registration is still removed, so the next page load shows the current site

#### Scenario: The worker's address returns a script
- **WHEN** a browser requests `/service-worker.js`
- **THEN** it receives a JavaScript file that is not served from a long-lived cache

### Requirement: No files from the old app are published
The published site SHALL contain only files the current app uses. It MUST NOT publish a web manifest that points to files that do not exist, or a copy of a document that is kept elsewhere in the repository.

#### Scenario: Built site contents
- **WHEN** the site is built
- **THEN** the output contains no `CHANGELOG.md`, no `CONTRIBUTING.md` and no `site.webmanifest`

#### Scenario: No manifest warnings
- **WHEN** any page of the site is opened
- **THEN** the browser console shows no manifest or missing-icon warning

#### Scenario: Deep links still work
- **WHEN** a visitor opens a deep link such as `/prayer` directly
- **THEN** the page loads, as it did before the leftover redirect file was removed

### Requirement: Nothing about the API key is logged
The site SHALL NOT write anything about the hadith API key, including its length, to the browser console.

#### Scenario: Opening the hadith library
- **WHEN** a visitor opens the hadith library, with or without a key configured
- **THEN** the console shows nothing about the key

#### Scenario: A debugging line is left in
- **WHEN** a contributor leaves a `console.log` in the site's source
- **THEN** the lint check fails

### Requirement: Links to the repository use its current name
Every link from the site to its source repository SHALL use the repository's current address.

#### Scenario: Following a repository link
- **WHEN** a visitor follows the source, contribution or changelog link from the site
- **THEN** it opens `github.com/Zubs/islamichub` without passing through a redirect

#### Scenario: The old name is not used
- **WHEN** the site's source is searched for the repository's old name
- **THEN** nothing is found

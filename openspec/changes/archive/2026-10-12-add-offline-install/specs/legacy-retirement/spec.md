# Spec Delta

## ADDED Requirements

### Requirement: The site's worker clears what the old app stored
A browser that still holds the old app's `islamichub-shell-v2` cache SHALL have it deleted on its next visit and SHALL be shown the current site, without the visitor clearing site data by hand. The site's own offline worker does this from the address the old worker used, and MUST NOT reuse the old cache name.

#### Scenario: Returning visitor with the old worker
- **WHEN** a browser holding the old worker and its `islamichub-shell-v2` cache visits the site
- **THEN** the new worker takes over at once, the old cache is deleted and open pages reload onto the current site

#### Scenario: Visitor without the old cache
- **WHEN** a browser with no old cache visits the site
- **THEN** nothing is deleted and no page is reloaded

#### Scenario: A reload cannot be triggered
- **WHEN** an open window refuses to reload
- **THEN** the old cache is still deleted

#### Scenario: The worker's address returns a script
- **WHEN** a browser requests `/service-worker.js`
- **THEN** it receives a JavaScript file that is not served from a long-lived cache

## REMOVED Requirements

### Requirement: The old service worker retires itself
**Reason**: The address now serves the site's own offline worker (feature 12), which must stay registered and does answer requests from its cache. A worker that unregisters itself and never serves pages can no longer be required.
**Migration**: The clean-up it performed is carried by "The site's worker clears what the old app stored".

## MODIFIED Requirements

### Requirement: No files from the old app are published
The published site SHALL contain only files the current app uses. It MUST NOT publish a web manifest that points to files that do not exist, or a copy of a document that is kept elsewhere in the repository.

#### Scenario: Built site contents
- **WHEN** the site is built
- **THEN** the output contains no `CHANGELOG.md`, no `CONTRIBUTING.md` and no `site.webmanifest`

#### Scenario: No manifest warnings
- **WHEN** any page of the site is opened
- **THEN** the browser console shows no manifest or missing-icon warning, because the manifest now published names only icons that exist in the build

#### Scenario: Deep links still work
- **WHEN** a visitor opens a deep link such as `/prayer` directly
- **THEN** the page loads, as it did before the leftover redirect file was removed

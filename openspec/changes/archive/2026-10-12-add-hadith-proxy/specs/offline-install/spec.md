# Spec Delta

## MODIFIED Requirements

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

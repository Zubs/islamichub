# Spec Delta

## Purpose

Defines how the hadith library obtains its books, chapters and hadiths through a server-side proxy that keeps the API key off the visitor's device, what that proxy accepts, and what the library shows when data cannot be loaded.

## ADDED Requirements

### Requirement: The API key never reaches the visitor
Hadith data SHALL be requested from the site's own `/api/hadith/` address, which adds the key on the server. The key MUST NOT appear in the built site's files, in any address the browser requests, or in any reply, including error replies.

#### Scenario: Built files
- **WHEN** the site is built with a key set
- **THEN** the key appears in none of the built files

#### Scenario: Browsing the library
- **WHEN** a user goes from the book list to a chapter and reads hadiths
- **THEN** every request goes to `/api/hadith/` and none carries a key

#### Scenario: Error reply
- **WHEN** the proxy answers with an error
- **THEN** the reply does not contain the key

### Requirement: The proxy forwards only what the site uses
The proxy SHALL accept only GET requests for the list of books, one book's chapters, and hadiths filtered by book, chapter, hadith number, page and page size. Any other path, method or parameter, or a malformed value, SHALL be rejected without contacting hadithapi.com.

#### Scenario: A book's chapters
- **WHEN** one book's chapters are requested
- **THEN** the reply holds the same data hadithapi.com returns for that book

#### Scenario: Second page
- **WHEN** a second page of a chapter's hadiths is requested
- **THEN** that page is returned

#### Scenario: Unknown path
- **WHEN** any other path is requested
- **THEN** the request is rejected

#### Scenario: Unexpected parameter
- **WHEN** a request carries a parameter the site does not use, or a page size above the limit
- **THEN** the request is rejected

### Requirement: Replies are cached for a day
A successful reply SHALL be marked cacheable for one day, so a repeated request is served from the cache. An error reply SHALL be marked not to be stored.

#### Scenario: Repeated request
- **WHEN** the same request is made twice within a day
- **THEN** the second is served from the cache

#### Scenario: Errors
- **WHEN** the proxy answers with an error
- **THEN** the reply is marked not to be stored

### Requirement: Failures are reported promptly and plainly
With no key set on the server the proxy SHALL answer "not configured", and the library SHALL show its "no API key" state. When hadithapi.com fails or does not answer in time, the proxy SHALL answer with an error within ten seconds and the library SHALL show its error state.

#### Scenario: No key
- **WHEN** no key is set on the server
- **THEN** the proxy answers "not configured" and the library shows the "no API key" notice

#### Scenario: Upstream down
- **WHEN** hadithapi.com answers with an error
- **THEN** the proxy answers with an error and the library shows its error state

#### Scenario: Upstream slow
- **WHEN** hadithapi.com does not answer
- **THEN** the proxy gives up and answers with an error within ten seconds

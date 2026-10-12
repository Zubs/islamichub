# translatable-content Specification

## Purpose

Holds the site's long-form writing and the text of its static data apart from the pages that show it, so a page can be drawn in any language and a translation is added as a file with nothing else changed.

## Requirements

### Requirement: Every content page is drawn from a content file
The writing of each content page SHALL be held in a content file for that page and language, grouped into the page's sections and lists. A content page's template MUST NOT hold long-form writing. Moving the writing MUST NOT change what a page says in English.

#### Scenario: Pages read as before
- **WHEN** a content page is opened in English
- **THEN** its wording is exactly what it was before the writing moved

#### Scenario: No writing in templates
- **WHEN** the content pages are checked
- **THEN** none holds writing in its template

#### Scenario: Empty translation
- **WHEN** a page is opened in a language whose content file is empty
- **THEN** the page shows its header and no error

### Requirement: Adding a translation means adding a file
A translation of a page SHALL be a content file for that language with the same sections and keys as the English one, and adding it SHALL change the page with no component edited. A content file with a section or key the English file does not have SHALL fail an automated check.

#### Scenario: One translated section
- **WHEN** a contributor adds one translated section to a language's content file
- **THEN** the page shows it in that language without a component being touched

#### Scenario: Sections do not match
- **WHEN** a content file has a section or key English lacks
- **THEN** an automated check fails

### Requirement: Arabic and references are shared by every language
Arabic source text and references SHALL be stored once and shown the same in every language. Only the translation and commentary differ.

#### Scenario: A verse
- **WHEN** a verse is shown in two languages
- **THEN** its Arabic and its reference are the same in both

#### Scenario: A translated list
- **WHEN** a translation gives the text of a list's items
- **THEN** each item keeps the Arabic, reference and icon of the source

### Requirement: A missing section is shown in English with a note
A section missing from the current language SHALL be shown in English with a small "not yet translated" note. A text missing inside a translated section SHALL be shown in English. Neither SHALL appear as a blank or a key name.

#### Scenario: Missing section
- **WHEN** a section is missing from the translation
- **THEN** it is shown in English with the note

#### Scenario: English
- **WHEN** the page is read in English
- **THEN** no note is shown

### Requirement: Static data is translated in the same way
The text of the adhkar, adhkar categories, duas, dua situations, tasbih phrases and the daily hadith SHALL be translatable by language, by item, with untranslated items shown in English.

#### Scenario: A translated dua
- **WHEN** a dua has a translation in the current language
- **THEN** its title and translation are shown in that language, with its Arabic and reference unchanged

### Requirement: What worked before still works
Hadith references in content SHALL still link to their hadith, FAQ accordions SHALL still open, and blocks SHALL still animate in on scroll.

#### Scenario: Reference in content
- **WHEN** content holds "Sahih Bukhari 128"
- **THEN** it is a link to that hadith in any language

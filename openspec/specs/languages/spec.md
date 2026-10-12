# languages Specification

## Purpose

Defines the languages the site knows beyond English, what a language must hold before it is offered to readers, and how its letters are drawn correctly.

## Requirements

### Requirement: A language is offered only when it is complete
A language SHALL appear in the switcher, and its prefixed addresses SHALL work, only when it is marked complete. Before that its addresses SHALL show the 404 page. A language MUST NOT be marked complete unless every interface message is translated, the five pillar pages are fully translated, and each translated page records the name of its reviewer.

#### Scenario: Yoruba before its translation is complete
- **WHEN** Yoruba is registered but not complete
- **THEN** it is not in the switcher and `/yo/` addresses show the 404 page

#### Scenario: Marked complete too early
- **WHEN** a language is marked complete while a message, a pillar page section or a reviewer's name is missing
- **THEN** an automated check fails and names what is missing

#### Scenario: Complete
- **WHEN** a language is complete
- **THEN** it is in the switcher, every pillar page opens in it, and no interface text appears in English

#### Scenario: Browser language
- **WHEN** a browser set to a complete language opens the home page
- **THEN** the page is shown in that language

### Requirement: A language's letters are drawn correctly
Where one of the site's typefaces cannot draw a language's letters, that language SHALL use a typeface that can, loaded only when the language is read. Yoruba's tone marks and under-dotted letters SHALL each display as a single, correctly formed letter.

#### Scenario: Yoruba typefaces
- **WHEN** a page is read in Yoruba
- **THEN** headings and body text use typefaces that hold ẹ, ọ, ṣ and the tone marks

#### Scenario: Back to English
- **WHEN** the reader switches back to English
- **THEN** the site's own typefaces are used again

### Requirement: Search ignores tone marks and under-dots
Searching SHALL find the same results whether or not the user types a language's tone marks and under-dots.

#### Scenario: Yoruba search
- **WHEN** the user searches "Olorun" or "Ọlọ́run"
- **THEN** the same results are found

### Requirement: Calculators give the same numbers in every language
A calculator SHALL give the same result whatever language it is read in.

#### Scenario: Zakat in two languages
- **WHEN** the same amounts are entered in English and in another language
- **THEN** the Zakat due is the same amount

### Requirement: A language credits its Qur'an translation and is listed for search engines
A language SHALL name the one published Qur'an translation it uses, credited on the About page once the language is available. Once a language is complete, the sitemap SHALL list its pages.

#### Scenario: Credit
- **WHEN** a language with a named Qur'an translation is available
- **THEN** the About page credits that translation

#### Scenario: Sitemap
- **WHEN** a language is complete and the sitemap lacks its pages
- **THEN** an automated check fails

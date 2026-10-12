# Spec Delta

## ADDED Requirements

### Requirement: Hausa is a registered language, offered when complete
Hausa SHALL be registered under the `/ha/` prefix and offered on the same terms as any language: only when complete. Its hooked letters (ɓ, ɗ, ƙ, ƴ) SHALL be drawn by typefaces that hold them.

#### Scenario: Hausa before its translation is complete
- **WHEN** Hausa is registered but not complete
- **THEN** it is not in the switcher and `/ha/` addresses show the 404 page

#### Scenario: Hausa typefaces
- **WHEN** a page is read in Hausa
- **THEN** headings and body text use typefaces that hold ɓ, ɗ, ƙ and ƴ

#### Scenario: Three languages
- **WHEN** three languages are available and the reader switches between any two
- **THEN** they stay on the same page

### Requirement: Search ignores hooked letters
Searching SHALL find the same results whether the user types Hausa's hooked letters or the plain ones.

#### Scenario: Hausa search
- **WHEN** the user searches "ƙofa" or "kofa"
- **THEN** the same results are found

### Requirement: A language is added with files only
Adding a language SHALL need its message file, its content files and its registry entry, and no change to any component.

#### Scenario: Hausa added
- **WHEN** Hausa is added
- **THEN** no component is changed to make room for it

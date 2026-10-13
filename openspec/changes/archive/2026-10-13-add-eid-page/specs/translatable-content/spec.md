# Spec Delta

## ADDED Requirements

### Requirement: New pages are written section by section
A page written after the content system existed SHALL be described by a source file, holding the order and kind of its sections with their Arabic text and references, and a content file per language holding only the words. One component SHALL draw any such page.

#### Scenario: A sectioned page in another language
- **WHEN** a sectioned page is read in a language with a translation
- **THEN** its sections appear in the same order with the same Arabic and references, in that language's words

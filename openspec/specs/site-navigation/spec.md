# site-navigation Specification

## Purpose

Defines the navigation bar and phone menu shown on every page: which destinations they offer, and how they show the reader which part of the site they are in.

## Requirements

### Requirement: The navigation offers four main destinations
The navigation bar SHALL offer Pillars, Tools, Hadith and Prophets, followed by About and the source code link. The phone menu SHALL offer Home and the same destinations.

#### Scenario: Desktop bar
- **WHEN** any page is opened at desktop width
- **THEN** the bar shows Pillars, Tools, Hadith and Prophets, then About and GitHub

#### Scenario: Phone menu
- **WHEN** the menu is opened on a phone
- **THEN** it lists Home, Pillars, Tools, Hadith, Prophets and About

### Requirement: The current section is highlighted
The navigation SHALL highlight the section of the current page: Pillars for `/pillars` and the five pillar pages and pages beneath them; Tools for `/tools` and the tool pages it lists that are not pillar pages; Hadith and Prophets for their pages and pages beneath them. At most one SHALL be highlighted, and none outside the four sections.

#### Scenario: A pillar page
- **WHEN** `/zakat` is opened
- **THEN** Pillars is highlighted and no other destination is

#### Scenario: A page beneath a pillar
- **WHEN** `/prayer/how-to-pray` or `/faith/articles` is opened
- **THEN** Pillars is highlighted

#### Scenario: The pillars page
- **WHEN** `/pillars` is opened
- **THEN** Pillars is highlighted

#### Scenario: A tool page
- **WHEN** `/adhkar/morning` or `/tracker` is opened
- **THEN** Tools is highlighted

#### Scenario: A tool inside a pillar page
- **WHEN** `/zakat`, which holds the Zakat calculator, is opened
- **THEN** Pillars is highlighted, not Tools

#### Scenario: Another section
- **WHEN** `/hadith/books` is opened
- **THEN** Hadith is highlighted and Pillars is not

#### Scenario: Outside every section
- **WHEN** the home page or `/about` is opened
- **THEN** no main destination is highlighted

#### Scenario: In a second language
- **WHEN** a pillar page is opened under a language prefix
- **THEN** Pillars is highlighted as in English

#### Scenario: Screen reader
- **WHEN** a destination is highlighted
- **THEN** it is announced as the current page or section

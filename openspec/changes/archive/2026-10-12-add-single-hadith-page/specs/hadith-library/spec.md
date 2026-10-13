# Spec Delta

## ADDED Requirements

### Requirement: Every hadith has its own address
A hadith SHALL be reachable at `/hadith/books/<book>/hadith/<number>`, showing its Arabic text, its English text, the narrator where given, its grade, and its book and chapter. The same address SHALL show the same hadith in any browser. The page's title and description SHALL come from the hadith.

#### Scenario: First hadith of Sahih al-Bukhari
- **WHEN** `/hadith/books/sahih-bukhari/hadith/1` is opened
- **THEN** the first hadith of Sahih al-Bukhari is shown with its text, grade, book and chapter

#### Scenario: No Arabic text
- **WHEN** a hadith has no Arabic text
- **THEN** its English text is still shown and no empty Arabic block appears

#### Scenario: Grade badge
- **WHEN** a hadith is shown on its own page and in its chapter list
- **THEN** the grade badge is the same in both

#### Scenario: Narrow screen
- **WHEN** a long hadith is read at 360px wide
- **THEN** the text wraps and the page does not scroll sideways

### Requirement: A hadith page links to its neighbours and its chapter
The page SHALL link to the previous and the next hadith in the book, and back to the hadith's chapter. The first hadith of a book SHALL have no previous link and the last no next link. Each hadith in a chapter list SHALL link to its own page.

#### Scenario: First and last
- **WHEN** the first hadith of a book is open, or the last
- **THEN** there is no previous link on the first and no next link on the last

#### Scenario: From a chapter and back
- **WHEN** a user opens a hadith from a chapter list and follows the back link
- **THEN** they return to that chapter

### Requirement: A hadith can be copied and shared
Copy SHALL place the same text on the clipboard as the chapter list does. Share SHALL open the device's share sheet with the hadith's address where the browser has one, and copy the address otherwise. Cancelling the share sheet SHALL do nothing and show no error.

#### Scenario: Copy
- **WHEN** the user copies a hadith from its page
- **THEN** the text is the English text followed by the book name and hadith number, as in the chapter list

#### Scenario: Share sheet
- **WHEN** the browser can share and the user chooses Share
- **THEN** the share sheet opens with the hadith's own address

#### Scenario: No share sheet
- **WHEN** the browser cannot share
- **THEN** the address is copied and the page says so

#### Scenario: Share cancelled
- **WHEN** the user closes the share sheet without sharing
- **THEN** nothing happens and no error is shown

### Requirement: A missing hadith and a failed request are told apart
An unknown book, a number that is not a whole positive number, or a number with no hadith SHALL show a "hadith not found" page that is not indexed. A request that fails SHALL show an error with a retry control.

#### Scenario: Not found
- **WHEN** the book is unknown, the number is `abc`, or the number has no hadith
- **THEN** the page says the hadith was not found, without asking the server for an impossible one

#### Scenario: Request fails
- **WHEN** the request for a hadith fails
- **THEN** an error and a retry control are shown, and retrying loads the hadith once the request succeeds

# sharing Specification

## Purpose

Lets a user send a hadith, a dua or a dhikr to someone else as an image card or a link, entirely from their own device, and makes links shared this way show a proper preview.

## Requirements

### Requirement: Items can be shared from where they are read
The daily hadith, every single-hadith page, every dua and every adhkar card SHALL have a Share control. Sharing SHALL offer an image card and a link to the item's own address, and the link SHALL open that same item.

#### Scenario: Hadith link
- **WHEN** a hadith is shared and the receiver opens the link
- **THEN** they see the same hadith

#### Scenario: Dua and dhikr links
- **WHEN** a dua or a dhikr is shared
- **THEN** the link opens its page at that item

### Requirement: The card is drawn on the device
The image card SHALL be a square image drawn on the user's device holding the Arabic text, the translation, the reference, and the site's name and address, in the site's colours and typefaces. Arabic SHALL be drawn right to left. Nothing SHALL be uploaded, and a card SHALL be producible with no connection.

#### Scenario: Daily hadith
- **WHEN** the daily hadith is shared
- **THEN** the card holds its Arabic, its translation and its reference

#### Scenario: No translation
- **WHEN** an item has no translation
- **THEN** the card holds the Arabic and the reference only

#### Scenario: Short and medium text
- **WHEN** a short dhikr or a medium-length hadith is shared
- **THEN** all of its text fits the card with nothing cut off

#### Scenario: No connection
- **WHEN** the device is offline
- **THEN** a card can still be made and saved

### Requirement: Text too long for a card is shared as text
When an item's text cannot fit the card at a readable size, it SHALL be shared as text and a link, with no image.

#### Scenario: At the limit
- **WHEN** a hadith is just short enough to fit
- **THEN** it gets a card

#### Scenario: Past the limit
- **WHEN** a hadith is just too long to fit
- **THEN** it is shared as text and a link

### Requirement: Sharing uses the share sheet where it can
Where the browser can share files, the device's share sheet SHALL open with the image attached. Where it cannot, the user SHALL be offered "Save image" and a "Share on WhatsApp" link carrying the text and the address. Cancelling the share sheet SHALL do nothing and show no error.

#### Scenario: Phone
- **WHEN** the browser can share images
- **THEN** the share sheet opens with the card attached

#### Scenario: Browser that cannot share images
- **WHEN** the browser cannot share images
- **THEN** "Save image" downloads the card and the WhatsApp link opens with the text filled in

#### Scenario: Cancelled
- **WHEN** the user closes the share sheet
- **THEN** nothing happens and no error is shown

### Requirement: Shared links show a proper preview
Addresses of hadiths, duas and adhkar SHALL be served with a title, description and preview image of their own, for services that read links without running scripts. An address the site does not recognise SHALL get the site's default preview, not an error.

#### Scenario: Hadith link in WhatsApp
- **WHEN** a hadith link is pasted into WhatsApp
- **THEN** the preview shows the hadith's reference as its title and the site's preview image

#### Scenario: Unknown hadith
- **WHEN** a link to an unknown book or a malformed number is previewed
- **THEN** the site's default preview is shown

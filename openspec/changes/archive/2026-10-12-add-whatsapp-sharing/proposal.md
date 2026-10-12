# Proposal

## Why

The people this site is for share religious reminders on WhatsApp every day. Today a hadith or dua can only be copied as text, and a link pasted into WhatsApp shows the site's generic title. Sharing is how the site will reach new people.

## What Changes

- A Share button on the daily hadith, every single-hadith page, every dua and every adhkar card.
- Sharing offers an image card and a link to the item's own address.
- The card is a square image drawn on the user's device: the Arabic text, the translation, the reference, and the site's name and address, in the site's colours and typefaces. Nothing is uploaded.
- On phones the device's share sheet opens with the image attached. Where a browser cannot share images, the user gets "Save image" and a "Share on WhatsApp" link that sends the text and the address.
- Text too long for a card is shared as text and a link, with no image.
- Shared links carry a short source tag, which is counted as the visit's source and then removed from the address bar. The existing handling of that tag never ran (it looked for a query string inside the path); it is corrected.
- A Netlify edge function gives hadith, dua and adhkar addresses their own title, description and preview image for link previews, since WhatsApp does not run the site's scripts.
- Each adhkar card gains an anchor, and each daily hadith its Arabic text, so both can be shared and linked to.

## Capabilities

### New Capabilities

- `sharing`: sharing an item as an image card or a link, and how shared links are previewed.

### Modified Capabilities

- `usage-statistics`: a visit that arrives by a tagged link is counted under that tag.

## Impact

- New `src/utils/share.js`, `src/composables/useShare.js`, `src/components/ShareButton.vue`, `netlify/edge-functions/link-preview.js`, `public/og-image.png`, tests.
- `DailyHadith.vue`, `HadithView.vue`, `AdhkarCard.vue`, the adhkar and duas views, `src/data/dailyHadith.js`, `src/router/index.js`, `src/composables/useStats.js`, `netlify.toml`, `index.html`, `scripts/make-icons.py`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`. Checks on real phones and of live link previews are Zubair's.

# Tasks

## 1. Sharing logic

- [x] 1.1 Create `src/utils/share.js` with tests: the shared address and its tag with and without a hash; the text; the WhatsApp link; a card for Arabic with and without translation; a short dhikr and a medium hadith fitting; the limit either side; right-to-left drawing in the Arabic typeface. Verify the tests pass
- [x] 1.2 Create `src/composables/useShare.js` and `src/components/ShareButton.vue` with tests: share sheet with the image; fallback with Save image and the WhatsApp link; long text shared without an image; cancel; no request made. Verify the tests pass

## 2. Placement and links

- [x] 2.1 Add the Arabic to the daily hadiths, anchors to adhkar cards, and the Share control to the daily hadith, the single-hadith page and `AdhkarCard`, with tests that each shares its own address. Verify the tests pass
- [x] 2.2 Correct the source tag handling in the router and `countPage`, with tests that a tagged visit is counted once under the tag and the tag leaves the address while other query values stay. Verify the tests pass

## 3. Link previews

- [x] 3.1 Add `netlify/edge-functions/link-preview.js`, its `netlify.toml` entries, `public/og-image.png` and the default `og:image`, with tests for hadith, dua, adhkar, unknown and malformed addresses and for the rewritten page. Verify the tests pass

## 4. Documentation

- [x] 4.1 Update `Spec.md`, `CHANGELOG.md` and `Features.md`; list the real-phone and live-preview checks under "Final" and leave feature 22 unticked. Verify the leftovers test lists the new published file

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

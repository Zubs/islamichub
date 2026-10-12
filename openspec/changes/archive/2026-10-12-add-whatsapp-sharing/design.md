# Design

## Decisions

- **`utils/share.js` holds everything that can be pure:** `shareAddress(path)` (canonical address plus `src=whatsapp`, before any hash), `shareText(item)`, `whatsappLink(text)`, and `layoutCard(item, measure)`. The layout takes a `measure(text, font)` function, so it runs with the canvas in the browser and with a stand-in in tests. It tries decreasing type sizes and returns `null` when the text does not fit at the smallest readable size, which is the "too long for a card" rule.
- **`drawCard(context, layout)`** issues the canvas calls: cream ground, green frame, Arabic in the `--arabic` typeface with `direction = 'rtl'`, translation in the serif, reference and site address in the sans. Fonts are awaited with `document.fonts.load` first.
- **`useShare.js`** orchestrates: build the card, then `navigator.share({ files, text, url })` when `navigator.canShare({ files })` allows; otherwise return the image and links for the fallback panel. An `AbortError` is swallowed.
- **`ShareButton.vue`** is the one control, placed in `DailyHadith`, `HadithView` and `AdhkarCard` (which serves adhkar and duas). Its fallback panel has "Save image" (a download link to the image), "Share on WhatsApp" (`https://wa.me/?text=…`) and "Copy link".
- **Source tag:** the router reads `src` from `to.query`, passes it to `countPage`, and replaces the address without it. The earlier code read the query from `to.path`, which never holds one.
- **Link previews: `netlify/edge-functions/link-preview.js`** runs on `/hadith/books/*`, `/duas/*` and `/adhkar/*`, lets the page through and rewrites its `<title>` and description and adds Open Graph tags. `previewFor(pathname)` is pure and tested; it needs no request to hadithapi.com, so a preview never waits on another service. A hadith's title is its reference ("Sahih Al-Bukhari 1904").
- **`public/og-image.png`** (1200×630) is drawn by `scripts/make-icons.py` and is also set as the site's default `og:image` in `index.html`.
- **Daily hadiths gain `arabic`**, the quoted saying cut from the Arabic edition of the same hadith.

## Risks / Trade-offs

- [Arabic shaping in canvas and file sharing differ between browsers] → the fallback panel always works; real-phone checks are listed under "Final" and the feature stays unticked.
- [The edge function cannot be run here] → its logic is unit tested; the live preview check is listed under "Final".

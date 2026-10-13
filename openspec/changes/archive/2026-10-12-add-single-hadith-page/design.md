# Design

## Context

`fetchHadith(bookSlug, hadithNumber)` already exists in `useHadithApi.js` and is unused. The chapter view holds the copy text and grade badge styles inline.

## Decisions

- **`utils/hadith.js`** takes the pieces both views need: `hadithPath`, `isHadithNumber`, `hadithCopyText`, `gradeStyle` and `lastHadithNumber`. Pure, no Vue.
- **The route sits beside the chapter route.** `/hadith/books/:bookSlug/hadith/:hadithNumber` has one more segment than `/hadith/books/:bookSlug/:chapterNumber`, so the two cannot collide.
- **Not found is decided before any request** for an unknown book or a number that is not a whole positive number; an empty reply decides the rest.
- **"Last hadith" comes from the book's `hadithCount` in `BOOKS_META`**, the only count available without another request.
- **Share uses the canonical address**, so a shared link is the one search engines index. `navigator.share` rejections named `AbortError` are swallowed.
- **Title:** `<Book> <number> — <chapter> | IslamicHub`; description: the first 155 characters of the English text.

## Risks / Trade-offs

- [`hadithCount` in `BOOKS_META` may not match hadithapi.com's last number] → a "next" link past the end lands on "hadith not found", which is harmless. The live check is listed under "Final", as the local API key was rejected and no live request could be made.

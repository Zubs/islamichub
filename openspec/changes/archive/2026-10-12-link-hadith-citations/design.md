# Design

## Context

Citations appear in four shapes: hand-written `.hadith-block` markup, inline template text, strings in view data (`faqs`, `desc`, `note`) rendered with `{{ }}`, and `reference` strings in `data/adhkar.js`.

## Decisions

- **One parser, `parseHadithRefs(text)` in `utils/hadithRefs.js`**, splits a string into text and reference parts. It knows the held collections and their common spellings ("Sahih Bukhari", "Sahih al-Bukhari", "Bukhari", "Abu Dawud", "Abu Dawood", "Al-Tirmidhi" …). Anything it does not recognise stays text, which is how collections outside the library and Qur'an references are handled without special cases.
- **`HadithRef` takes a `text` string, not a structured list.** Content stays readable where it is written (`reference: 'Abu Dawud 5072, Al-Tirmidhi 3389'`), and one component covers source lines, sentences and data strings. `Features.md` describes "a list of references, each a book and a number"; the parser produces exactly that list from the string.
- **`HadithBlock`** renders the existing `.hadith-block`, `.hadith-source` and `.hadith-text` classes with `anim-target`, so appearance and scroll animation are untouched.
- **Shared renderers do the conversion for data strings:** `FaqList` (answers), `QuranBlock` (note) and `AdhkarCard` (reference) pass their text through `HadithRef`, as do the `{{ x.desc }}` bindings in the content pages.
- **`data/hadithNumbering.js`** maps `book slug → cited number → library number`. It holds provisional entries for Sahih Muslim, found by matching texts in an open dataset that counts that book the way the library does; each needs confirming against the library, which needs a working API key.
- **The plain-text check walks the rendered pages**, not the source: it mounts every route and looks for a citation pattern in any text node that is not inside a link to `/hadith/books/`. This catches every shape, including ones added later.
- **`test/citations.live.test.js`** collects citations from `src/` with the same parser and requests each through a given base address (`netlify dev` or the live site).

## Risks / Trade-offs

- [hadithapi.com's numbering, for Sahih Muslim in particular, may differ from the Arabic-edition numbers cited, so a link may open a different hadith] → the mapping exists for this, the check script reports what is missing, and confirming each link by hand is listed under "Final". The feature stays unticked until then.

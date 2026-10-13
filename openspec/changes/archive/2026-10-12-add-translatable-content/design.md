# Design

## Context

`Features.md` describes content as "structured sections: headings, paragraphs, lists, verse blocks, hadith blocks and FAQs" drawn by "a small set of components". The ten existing pages each have a hand-built layout (timelines, comparison cards, condition grids, tables) that a small set of generic section components could not reproduce without redesigning them.

## Decisions

- **Existing pages keep their layout and take their words from a content file.** Each page's template stays as it is; every piece of writing in it becomes `c('section.key')`, and each list in its script becomes `list('name')`. This meets what the feature is for (a translation is one file, no component edited) with no visible change, which a generic renderer could not promise. It departs from the literal "set of components draws a page", and is listed under "Final". New pages (features 30 to 32) are written section by section from the start.
- **The move was done by a script**, and guarded by `test/content-pages.test.js`: each page's rendered wording was recorded before the move and must be identical after it.
- **Sections follow the page's eyebrow headings**; the text before the first is `header`. The note for an untranslated section sits beside its eyebrow.
- **`useContent(page, english)`** imports nothing but the page's English file; another language's file is loaded on demand with `import.meta.glob`, so no page downloads another page's writing.
- **Lists merge by position.** A translated list holds only the fields it translates; Arabic, references, icons and links come from the English list.
- **Data translations are keyed by id** in `src/data/translations/<set>/<code>.js` and laid over the items by `localizeItem`.
- **Page titles and descriptions** are interface-sized text and go in the message file under `seo`.

## Risks / Trade-offs

- [Sentences with inline markup are split into fragments] → the same trade-off as feature 25; a translator can ask for a sentence to be merged.
- [Changelog entries stay in English] → the changelog is for contributors.
- [Keys are generated from the English wording] → they are stable identifiers from now on; rewording English does not require renaming a key.

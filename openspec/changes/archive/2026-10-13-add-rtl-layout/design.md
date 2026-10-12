# Design

## Decisions

- **Logical properties do the work.** `margin-left` becomes `margin-inline-start`, `left` becomes `inset-inline-start`, `text-align: left` becomes `start`, and a matching `left`/`right` pair becomes `inset-inline`. In a left-to-right language these mean exactly what they replaced, so English is unchanged by construction.
- **The conversion was done by a script** over stylesheets, scoped styles and inline styles, skipping the exceptions below.
- **Exceptions, each for a reason, are listed in `test/rtl.test.js`:** Arabic text (it is right-aligned in every language); the compass and its needle (a compass does not mirror); toggle knobs (they travel by a physical transform); centring with `left: 50%`; and the hanging, corner and 404 ornaments (symmetric pairs named by side).
- **`direction: ltr` on the compass, the tasbih ring and prayer times** keeps them the same in every language.
- **`unicode-bidi: isolate` on hadith references** keeps a Latin-script reference intact inside right-to-left text.
- **Arrows written in text belong to the message,** so a right-to-left translation writes its own; `flip-rtl` is for icons drawn as images.

## Risks / Trade-offs

- [No right-to-left language is planned yet, and a browser was not available here] → the mirroring itself has not been looked at. Listed under "Final"; the feature stays unticked.

# Design

## Decisions

- **A registry entry and an empty message file,** exactly as for Yoruba. The gate, the completeness check, the typeface mechanism, the credit on the About page and the sitemap rule all come from feature 27 unchanged.
- **Hooked letters do not decompose** under Unicode normalisation, so `foldText` maps ɓ, ɗ, ƙ and ƴ to b, d, k and y explicitly.
- **Typefaces:** the font files of DM Sans, Cormorant Garamond and Amiri were read and hold none of the eight hooked letters; Noto Sans and Noto Serif hold all of them.
- **"No component edited" is checked** by a test that fails if this change's own registry entry needed anything but files: it registers a third made-up language at run time and switches between all three.

# Proposal

## Why

The language work so far covers left-to-right languages. Arabic and Urdu read right to left, and a page that only sets its direction comes out half mirrored wherever a style says "left" or "right".

## What Changes

- The page's direction follows the current language (already set with feature 25).
- Styles that named a side now name a logical start or end, across the four stylesheets, the scoped styles and the inline styles, so the layout mirrors by itself in a right-to-left language and is unchanged in a left-to-right one.
- What must not mirror keeps its side, each with a stated reason: Arabic verse and hadith text, the Qibla compass, the tasbih counter, toggle knobs, and symmetric ornaments.
- The compass, the tasbih counter and times are drawn left to right in every language, and a hadith reference inside right-to-left text is isolated so it reads correctly.
- A class, `flip-rtl`, mirrors an icon that points a direction.
- A check fails if a physical left or right property is added outside the listed exceptions.

## Capabilities

### New Capabilities

- `rtl-layout`: how the layout follows a right-to-left language, and what stays as it is.

### Modified Capabilities

None.

## Impact

- `src/assets/css/*.css`, scoped and inline styles in thirteen components and views, new `test/rtl.test.js`.
- `Spec.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `Features.md`. Looking at every page in a right-to-left language is Zubair's check.

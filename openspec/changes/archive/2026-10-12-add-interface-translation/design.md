# Design

## Decisions

- **`vue-i18n` in composition mode with `$t` in templates.** Components read text with `$t('namespace.key')`, so most need no script change. English is both `locale` and `fallbackLocale`.
- **`src/locales/index.js` is the registry:** each language has a code, its own name, an `Intl` locale, a direction, its messages and a `complete` flag. Only complete languages are available. `en.js` is grouped by component.
- **Text was moved by a script** that rewrote each static text node and attribute of the listed components to a `$t` call and collected the messages. Text built from values keeps its values as named parameters (`{a}`, `{b}`). Sentences split by inline markup become fragments; that is a known cost, to be merged with `<i18n-t>` where a translator finds one awkward.
- **Routes:** `localizedRoutes(routes, code)` copies every route under `/<code>` with `meta.locale`. English keeps the unprefixed routes. An unknown prefix matches nothing and falls to the 404 route.
- **One navigation guard decides the language.** On arrival the address wins; an unprefixed arrival follows the remembered choice, then the browser's languages, then English. Inside the site the current language is kept, so the hundreds of existing links need no change. The switcher announces a change before it navigates.
- **The choice is remembered under a new key, `locale`.**
- **`useSeo` adds `hreflang` alternates and `x-default`** when more than one language is available, and sets `lang` and `dir` on `<html>`.
- **`utils/locale.js` is pure** (paths, matching a browser language); formatting uses `Intl` with the registry's `Intl` locale.
- **Scope of this change:** the shell (navigation, footer, install bar, loading screen), every shared component, the 404 page, and the adhkar, duas, hadith library, tracker and tasbih views, plus the calculators on the Prayer, Zakat, Fasting and Inheritance pages. Long-form writing and the labels held in `data/` and `utils/` move in feature 26.
- **Tests add a made-up language** to exercise switching, prefixes, fallback and formatting without shipping one.

## Risks / Trade-offs

- [Messages returned by pure functions in `utils/` (for example inheritance rules and validation messages) are still English] → they are content-like and move with feature 26's data translations; listed in `Features.md`.
- [Links inside a second-language page still point at English addresses in the markup and are redirected by the guard] → correct for users; alternates tell search engines the real addresses.

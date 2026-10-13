# Design

## Context

`useSeo(routeName)` looks up a table and derives the canonical from the name. Nine views bypass it with `useHead`.

## Decisions

- **`useSeo(page)`** where `page` is a key into `PAGE_META` or `{ title, description, noindex }`, each of which may be a value, a ref or a getter (read with Vue's `toValue`). One `useHead(computed(...))` call inside.
- **Canonical from `useRoute().path`** through an exported `canonicalFor(path)`. The home page is `https://islamichub.xyz/`, matching the sitemap.
- **Static pages keep their text in `PAGE_META`**; the entries the direct `useHead` calls had made dead are now the ones in use. Dynamic pages (adhkar category, hadith book, hadith chapter) pass getters.
- **The static description in `index.html` stays** as the pre-JavaScript fallback; unhead replaces it rather than adding a second.
- **`no-restricted-imports` for `@unhead/vue` in `src/views/` and `src/components/`** enforces "no view imports `useHead`".
- **The router exports `routes`.** The sitemap test reads fixed routes (no parameter, not the catch-all) and checks both directions; sitemap entries for parameterised pages must resolve to a real route and, for adhkar categories, a real category.
- **A shared `test/mountPage.js`** mounts a view with the real routes on a memory history and a head, since views now need a route.

## Risks / Trade-offs

- [Canonical for an unknown adhkar category or hadith book still points at itself] → those pages show not-found states; out of scope here.

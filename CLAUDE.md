# CLAUDE.md

## Project

IslamicHub (https://islamichub.xyz) is a free, open-source Islamic education and utility site. It combines long-form guides to the Five Pillars with practical tools (prayer times, Qibla, Zakat, inheritance, adhkar, tasbih) and a browsable hadith library. Everything works without an account, and what a user enters stays on their device unless they opt in to something that says otherwise. The site is being built towards a daily companion for Yoruba- and Hausa-speaking Muslims: installable, usable offline and on slow connections, and easy to share on WhatsApp. It is built mobile-first, with correct Arabic rendering, accessibility, privacy and SEO in mind from the start.

- [Spec.md](Spec.md) describes what exists today.
- [Features.md](Features.md) lists every feature still to build, in build order, with how it works, its tests and its done check. Build features in that order and tick each one in the progress list once it's complete.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Vue 3 (`<script setup>`, Composition API), plain JavaScript, no TypeScript |
| Build | Vite, with `@` aliased to `src/` |
| Routing | Vue Router, clean URLs, every view lazy-loaded |
| State | Pinia setup stores |
| Head / SEO | `@unhead/vue`, through the `useSeo` composable |
| Styling | Global CSS with custom properties in `src/assets/css/tokens.css`, scoped styles in views |
| Persistence | `localStorage` on the device only |
| Testing | Vitest with Vue Test Utils *(added by feature 1)* |
| Offline | `vite-plugin-pwa` *(added by feature 12)* |
| Server-side code | Netlify Functions, only where a feature calls for one *(first added by feature 13)* |
| Translation | `vue-i18n` *(added by feature 25)* |
| Linting | oxlint and ESLint (`eslint-plugin-vue`) |
| Formatting | Prettier |
| Hosting | Netlify |

## Coding rules

- **No comments.** Write code that explains itself through clear names. Only add a comment when the code is genuinely complicated or something is deliberately set up for a future change.
- **Keep it simple.** Write the simplest code that meets the requirement. Don't add abstractions, layers or options that aren't needed yet.
- **Use what's built in first.** Before writing custom logic, use what Vue, Vue Router, Pinia, the browser and plain CSS already provide. Only install a third-party package when the built-in options can't do the job, and prefer packages already listed in the tech stack. Ask before adding any other dependency.
- **Respect the layers.** Calculations are pure functions in `utils/` with no Vue imports. Religious content lives in `data/`, not in view logic. Shared or persisted state lives in `stores/`. Views compose these.
- **Use the design tokens.** Colours, spacing, radii and typefaces come from `tokens.css`, never hard-coded values.
- **Stored data is a contract.** Existing users have data under the current `localStorage` keys. Changing a stored shape needs a migration or a new key. Reads must tolerate missing or corrupt data.
- **Every outside call fails soft.** The page stays usable when a service is down. A new outside address must be added to the CSP in `netlify.toml`.

## Content rules

- **Every scholarly claim carries a reference**, to the Qur'an (surah:ayah) or to a hadith (collection and Arabic-edition number). Don't write a claim, quote a hadith or give a number from memory; verify it against the source, and say so plainly when it could not be verified.
- **Don't take a side between schools.** Where they differ, show both positions. Calculators are guides, not rulings, and say so.
- **Arabic text** is marked `lang="ar"`, set right-to-left and uses the `--arabic` typeface.
- **Ask for the reviewer.** Features that add or translate religious content need a named reviewer before they can be ticked. When one is reached, ask Zubair for the name. Never invent or assume one.
- **Decisions belong to Zubair.** Where `Features.md` lists a decision with a proposed default, confirm it with him before building the feature it blocks.

## Privacy rules

- No tracking of people: anonymous counts only, and no accounts.
- Nothing a user enters leaves their device, and location is not stored, unless a feature in `Features.md` says so and the user has opted in.
- Anonymous usage statistics (page views, referring site name, and five named tool actions) are sent to GoatCounter, a cookieless statistics service, only on the live site and only when configured. Do Not Track and Global Privacy Control are honoured; an opt-out switch is on the About page.
- Nothing a visitor enters (amounts, coordinates, heirs, search text) is ever included in a counting request.
- Any server-side storage is opt-in, holds the minimum needed, and can be deleted by the user.

## After every plan

Once a plan has been applied, run these checks and fix every issue they report:

```bash
npm run lint
npm run format
npm test
npm run build
```

Repeat until all four pass with no errors. Don't consider the work finished until they do. `npm test` exists once feature 1 is built; until then run the other three.

Then update `Spec.md`, `CHANGELOG.md` and `public/sitemap.xml` wherever the change affects them, and tick the feature in `Features.md` only when its **Done when** check has actually been carried out. A check that needs a real phone or the live site is Zubair's to do: say that it is outstanding and leave the feature unticked.

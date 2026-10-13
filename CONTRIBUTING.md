# Contributing to IslamicHub

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

Thank you for wanting to contribute. IslamicHub exists to make authentic Islamic education and tools freely available, and every contribution helps, whether it is code, a corrected reference or a translation.

- [README.md](README.md) explains how to install and run the site.
- [Spec.md](Spec.md) describes how the site is built and how each feature behaves.
- [Features.md](Features.md) lists what is planned, in the order it will be built.

## Conduct

Contribute in good faith, and be kind and constructive in every discussion. Harassment, dishonesty and bad-faith edits are not accepted.

## Ways to contribute

| Kind | Examples |
|---|---|
| Code | Fix a bug, build a feature from [Features.md](Features.md), add tests |
| Content | Write or improve a guide |
| Scholarship | Correct a Qur'an or hadith reference, flag an inaccurate statement |
| Translation | Yoruba and Hausa are the first languages planned |
| Design and accessibility | Layout, contrast, keyboard and screen reader use |
| Testing | Try the site on your phone and report what breaks |

For anything larger than a small fix, open an issue first so the work is not duplicated.

## How the code is laid out

Everything lives under `src/`. Each folder has one job:

| Folder | What belongs there |
|---|---|
| `src/utils/` | Calculations as pure functions: no Vue imports, no stores, no DOM |
| `src/data/` | Static religious content, such as the adhkar and tasbih phrases |
| `src/stores/` | Pinia stores for state that is shared between pages or saved on the device |
| `src/composables/` | Reusable Vue logic, such as page titles and scroll animations |
| `src/components/` | Reusable interface pieces |
| `src/views/` | One component per page, which puts the above together |
| `src/assets/css/` | The global stylesheets |
| `test/` | Shared test setup, and checks that cover no single source file |

Keep to the layers. A calculation goes in `src/utils/`, not in a view. Content goes in `src/data/`, so it can change without touching page logic. State that only one page uses stays in that page.

Three more rules:

- **Cite hadiths so they link.** Write a hadith reference as the collection's name and the Arabic-edition number ("Sahih Bukhari 1904", "Abu Dawud 5072") and render the text through `HadithRef`, or quote it in a `HadithBlock`; the reference then links to that hadith in the library. A test opens every page and fails if a reference is left as plain text. Sahih Muslim is counted differently by the library, so a new Sahih Muslim reference also needs an entry in `src/data/hadithNumbering.js`.
- **Interface text goes in the message file.** Do not type button labels, headings of tools, form labels or messages into a component. Add the text to `src/locales/en.js` under the component's group and show it with `$t('group.key')` (or `t(...)` from `src/i18n.js` in a script). A test fails if an interface component holds hard-coded text.
- **Adding a language** means adding a file to `src/locales/` named after the language's code, with the same keys as `src/locales/en.js`, and an entry in `src/locales/index.js`. Leave `complete` false until every key is translated; an incomplete language is not offered. A translation may leave a key out (English is shown) but may not hold a key English lacks.
- **A page's writing goes in its content file.** Long-form text is not typed into a view. Add it to the page's file in `src/data/content/`, under the section it belongs to, and show it with `c('section.key')`; put FAQs and other repeated items in `lists` and read them with `list('name')`. Arabic text and references stay in the English file and are shared by every language. If you change what a page says, record its wording again with `CAPTURE_PAGES=1 npx vitest run test/content-pages.test.js`.
- **Translating a page** means adding a file named after the language's code beside the page's English file (for the Faith page, beside `src/data/content/faith/en.js`), with the same sections and keys. Leave out what is not translated yet; it is shown in English with a note.
- **A language goes live only when it is complete.** Every interface message must be translated, the Faith, Prayer, Zakat, Fasting and Hajj pages must be translated in full, and each translated page must record who reviewed it (`meta: { reviewer: 'Name', reviewed: 'YYYY-MM-DD' }` in its content file). Only then is `complete` set to true in `src/locales/index.js`, and the language's pages added to `public/sitemap.xml`. A test fails if either is done early. Religious text is never translated without a named reviewer.
- **Write styles with start and end, not left and right.** Use `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `border-inline-start` and `text-align: start` so the layout mirrors in a right-to-left language. A test fails on a physical side unless it is one of the listed exceptions (Arabic text, the compass, centring). Give an icon that points forwards or backwards the class `flip-rtl`.
- **Saved data is a contract.** Visitors already have data saved under the current keys. Changing its shape needs a migration or a new key, and anything read from the device must cope with missing or damaged data.
- **Every outside request fails soft.** The page must stay usable when a service is down. A new outside address must be added to the content security policy in `netlify.toml`.
- **What a visitor enters stays on their device.** Anonymous usage statistics (page views, referring site name, and five named tool actions) are sent to GoatCounter, a cookieless statistics service, only on the live site and only when configured. Do Not Track and Global Privacy Control are honoured; an opt-out switch is on the About page. Nothing a visitor enters (amounts, coordinates, heirs, search text) is ever included in a counting request. No accounts, no personal tracking.

## Adding a page

1. Create the view under `src/views/`.
2. Add its route to `src/router/index.js`, above the catch-all route, which must stay last.
3. Give it a title and description by adding an entry to `src/composables/useSeo.js` and calling `useSeo` in the view.
4. Add its address to `public/sitemap.xml`.
5. Add tests for any calculation or store it introduces.
6. Link to it from the navigation or the page it belongs with.

A view starts like this:

```vue
<script setup>
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

useSeo('my-page')
useScrollReveal()
</script>
```

## Adding content

- Put new adhkar, phrases and similar lists in `src/data/`, in the shape the existing entries use.
- Mark Arabic text with `lang="ar"`. It is set right to left in the Arabic typeface.
- Use the existing components for verses and FAQs, so every page looks the same.
- Follow the content rules below. They matter more than anything else in this guide.

## Content rules

- **Every scholarly claim carries a reference.** For the Qur'an, give the surah and ayah (Qur'an 9:103). For a hadith, give the collection and number (Sahih Bukhari 1454).
- **Hadith numbers follow the Arabic edition.** Some English translations number differently. Check the number against the Arabic-edition numbering.
- **Check every citation against its source.** Do not quote a verse, a hadith or a number from memory.
- **Where the schools differ, show both positions.** IslamicHub informs; it does not choose a madhab.
- **Calculators are guides, not rulings.** Any page that calculates something says so and directs the reader to a qualified scholar.
- **If you are not sure a statement is correct, open an issue** instead of publishing it. A discussion is better than an error.
- **Translations of religious content are reviewed** by a named reviewer before they go live.

## Style

- Plain JavaScript with Vue's `<script setup>`. No TypeScript.
- Write code that explains itself through clear names. Add a comment only where the logic is genuinely hard to follow.
- Write the simplest code that meets the need, and use what Vue, the browser and plain CSS already provide before adding anything.
- Take colours, spacing, radii and typefaces from `src/assets/css/tokens.css`. Do not hard-code them.
- Use semantic HTML. Every interactive element must be reachable by keyboard and have an accessible name. Decorative elements carry `aria-hidden="true"`.
- Check your change at phone width. Most visitors are on a phone.

## Checks

Run these before opening a pull request, and fix anything they report:

```bash
npm run lint
npm run format
npm test
npm run build
```

All four must finish without errors. Netlify runs the tests before every deploy, so a failing test stops the site from being published.

A test sits beside the file it covers and takes its name: `src/utils/prayer.test.js` covers `src/utils/prayer.js`. Tests need no network and give the same result in any timezone. `npm run test:watch` re-runs them as you work.

One check reads this guide and the README: it fails if either names an npm command, a file or a folder that does not exist. If you rename something, update the docs with it.

### Adding a dependency

Ask in an issue before adding one. The project keeps its dependencies few. After adding one, commit `package.json` and `package-lock.json` together.

## Opening a pull request

1. Fork the repository and create a branch from `main`.
2. Make your change, with tests for any new behaviour.
3. Run the four checks.
4. Update `CHANGELOG.md` if a visitor would notice the change, and [Spec.md](Spec.md) if it changes how a feature behaves.
5. Open a pull request that says what changed and why, and links its issue.

Before you ask for review, confirm:

- [ ] The four checks pass.
- [ ] It works at phone width and with the keyboard alone.
- [ ] The browser console shows no errors.
- [ ] Every scholarly claim has a reference, checked against its source.
- [ ] Nothing a visitor enters is sent anywhere new.

## Reporting a bug

Open an issue at [github.com/Zubs/islamichub/issues](https://github.com/Zubs/islamichub/issues) with:

1. What you expected to happen.
2. What happened, with any error from the browser console.
3. The steps to reproduce it: which page, and what you did.
4. Your browser and device.
5. A screenshot, if the problem is visual.

For a scholarly error, such as a wrong hadith number or a misattributed quote, include the correct source.

Questions are welcome as issues too.

جَزَاكُمُ اللَّهُ خَيْرًا — May Allah reward you with good.

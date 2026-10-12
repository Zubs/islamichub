# Design

## Context

See `proposal.md` for motivation. What I found reading the two files against the repository:

| The docs say | The repository has |
|---|---|
| Vanilla JS, hash router, no build step, `js/` and `pages/` | Vue 3, Vite, Vue Router with clean URLs, `src/` |
| Serve with `npx serve .` or `python3 -m http.server` | `npm run dev` |
| Clone `Zubs/pillarsofislam` or `your-username/islamichub` | The remote is `Zubs/islamichub`; the old name returns a redirect to it |
| Ask in GitHub Discussions | Discussions is disabled (the link returns 404); Issues is enabled |
| A "Fasting Tracker" | Suhoor and iftar times and a Ramadan countdown; the tracker is feature 20 |
| Nothing about them | The hadith library, adhkar and tasbih, which are live |
| "Test in two browsers" as the only check | `npm test`, `npm run lint`, `npm run format`, `npm run build` |
| A vague "License" section | No licence file; GitHub reports none |

Other facts that shape the work:

- `public/CONTRIBUTING.md` is a second copy of the guide, different from the root one, and Vite copies everything in `public/` to the site root. The footer and About page link to the guide on GitHub (`/blob/main/CONTRIBUTING.md`), not to this copy.
- There is no `.env.example`. The one variable is `VITE_HADITH_API_KEY`; without it the hadith views show a "no API key" state and everything else works.
- `package.json` requires Node `^20.19.0 || >=22.12.0`.
- Installing dependencies hit an npm 11.5.2 bug in feature 1 when adding a package. `npm ci` against the committed lockfile worked with that version.
- Tests are discovered by `include: ['src/**/*.test.js']`. Shared test helpers already live in `test/`.
- `CLAUDE.md` holds the working rules for AI agents and overlaps with what a human contributor needs (layering, content rules, the four checks).

## Goals / Non-Goals

**Goals:**
- A newcomer can go from clone to open pull request with these two files.
- The files cannot quietly drift from the repository again.
- Short files that point to `Spec.md` and `Features.md` for detail.

**Non-Goals:**
- A full architecture document. `Spec.md` is that.
- Explaining the OpenSpec workflow to contributors. One line says where plans live.
- Checking outside links automatically. Tests must run without a network.
- Fixing the old repository name inside the site's components.

## Decisions

### What goes in which file
- **README** is for someone deciding whether to use or run the project: what it is, what works today, stack, setup, scripts, environment, deployment, links onward. No emoji headings, and no design description that repeats `Spec.md` section 8.
- **CONTRIBUTING** is for someone about to change something: ways to help, layout and layering, adding a page, adding content, content rules, checks, pull request steps, reporting bugs.
- Anything both need (setup) lives in the README, and the guide links to it.

### The feature list in the README is short and current
One line per thing a visitor can use today, taken from `Spec.md` section 5. Planned work is one sentence linking to `Features.md`. This keeps the README from going stale each time a feature ships: the automated check cannot test prose claims, so there should be few of them.

### Setup uses `npm ci`
The README's install step is `npm ci`, which installs exactly what the lockfile records and is what worked with npm 11. A note in the contribution guide covers adding a dependency. The clean-clone run (below) decides this for certain: if `npm ci` fails on a supported setup, the step is changed to what works and the reason recorded.

### `.env.example` is added
`cp .env.example .env` is one command and cannot drift from a description. The file holds `VITE_HADITH_API_KEY=` and nothing else. `.gitignore` ignores `.env` only, so the example is committed. The README says where a key comes from (hadithapi.com) and that the site runs without one. It also carries the warning already in `Spec.md`: the key is compiled into the client bundle.

### The licence is Zubair's choice: GPL-3.0
The repository had no licence. Asked during the build, Zubair chose the GNU General Public License, version 3. The `LICENSE` file is the text published by the Free Software Foundation, downloaded from gnu.org and not retyped. The README names the licence and links to the file. `package.json` records `GPL-3.0-only`, since version 3 is what was chosen and "or any later version" was not.

### `public/CONTRIBUTING.md` is deleted here, not in feature 4
It is a contribution guide, it describes the old app, and it is published. Leaving it would mean the feature's own test ("neither file mentions the hash router") passes while a third copy on the live site still does. `public/CHANGELOG.md` is the same kind of leftover but is not a contributor doc, so it is noted for feature 4.

### An automated check keeps the docs true
`test/docs.test.js` reads both files and asserts:

- every `npm run <name>` and `npm test` they mention is a script in `package.json`;
- every relative Markdown link target exists;
- every backticked path that starts with `src/`, `public/`, `test/` or `openspec/`, or names a root file such as `netlify.toml`, exists;
- both link to `Spec.md` and `Features.md`;
- neither contains the old app's markers: "hash router", "hash-based", "no build step", a top-level `js/` or `pages/` folder, `pillarsofislam`, or `your-username`.

It reads files with Node's `fs`, which is available in the jsdom test environment.

- *Alternative: check by hand once.* Rejected: the files went stale precisely because nothing checked them.
- *Alternative: a Markdown link-checking package.* Rejected: a new dependency for what is thirty lines, and it would want the network.

### The check lives in `test/`, and discovery widens to match
The test covers no source file, so "beside the code it covers" has no answer. `test/` already holds the shared setup. `vite.config.js` gains `test/**/*.test.js` in `include`, and the `automated-testing` spec gains the matching exception.

### Outside links and the clean-machine test are checked by hand, once
- Outside links are fetched with `curl` when the files are written, and each must return 200.
- The clean-machine test is done by cloning the working tree into a scratch folder with no `node_modules` and running the README's commands exactly as written, then requesting the dev server.

Both are recorded as tasks because they cannot run in the suite.

### `CLAUDE.md` is left as it is
The contribution guide states the same rules in its own words for people. Merging the two would make one of them worse for its reader. The rules are short; the docs check does not cover `CLAUDE.md`.

## Risks / Trade-offs

- **The check tests names, not meaning** → It catches a renamed script or a moved folder, not a paragraph that has become untrue. Keeping prose claims few (the short feature list) is the mitigation.
- **The path check could flag an example path that is not meant to exist** (for example `src/views/MyPageView.vue` in "how to add a page") → Example paths are written in a fenced code block, which the check skips; only inline backticked paths are checked.
- **Deleting `public/CONTRIBUTING.md` breaks anyone who bookmarked `/CONTRIBUTING.md` on the site** → Nothing on the site links to it. Accepted.
- **`GPL-3.0-only` against "or later"** → `package.json` says version 3 only, which is the narrower reading of the choice. If "or any later version" is wanted, it is a one-word change there and a sentence in the README.
- **Contributions made before the licence was added** (one other contributor appears in the site's credits) were made without one → Worth a word with them; not something the docs can settle.
- **The README's install step may behave differently on a contributor's npm version** → The clean-clone task runs it for real, and the README names the Node versions supported.

## Migration Plan

Nothing to migrate. To roll back, restore the two files and `public/CONTRIBUTING.md` from git.

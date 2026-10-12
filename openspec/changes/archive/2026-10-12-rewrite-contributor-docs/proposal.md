# Proposal

## Why

`README.md` and `CONTRIBUTING.md` describe an app that no longer exists: vanilla JavaScript, a hash router, no build step, and `js/` and `pages/` folders. Someone following them today cannot run the site. This is feature 3 in `Features.md`. It comes now because the test suite and the checks from features 1 and 2 are in place, so there is finally a real workflow to document.

## What Changes

- Rewrite `README.md`: what the site is, what it offers today, the stack, setup, the scripts, the environment variable, deployment, and where to go next.
- Rewrite `CONTRIBUTING.md`: the folder layout and layering rules, how to add a page, how to add content, how to run the checks, and the pull request steps.
- Add a content rules section to `CONTRIBUTING.md`: every scholarly claim carries a Qur'an or hadith reference, hadith numbers follow the Arabic edition, and where schools differ both positions are shown.
- Both files link to `Spec.md` and `Features.md` instead of repeating them.
- Add `.env.example` with the one variable the site reads, so setup is "copy this file" instead of a description.
- Delete `public/CONTRIBUTING.md`. It is a second, older copy of the guide that is published at `/CONTRIBUTING.md` on the live site. Nothing links to it; the site links to the copy on GitHub.
- Add an automated check that keeps the two files true: every npm command they name exists, every file and folder they name exists, every relative link resolves, and neither mentions the old app.
- Add a licence. The repository was public with none; Zubair chose the GNU General Public License, version 3, when asked during the build. The text is in `LICENSE`, the README states it, and `package.json` records `GPL-3.0-only`.
- Fix what the old files got wrong about the project itself: the repository is `Zubs/islamichub` (the old name redirects), GitHub Discussions is not enabled, and there is no "Fasting Tracker" yet.

Out of scope:

- The repository links inside the site (`GITHUB_REPO` in four components still uses the old name, which redirects). Noted for feature 4.
- `public/CHANGELOG.md`, another stale published copy. Noted for feature 4.
- Documentation for AI agents. `CLAUDE.md` already covers that.

## Capabilities

### New Capabilities
- `contributor-docs`: what the README and the contribution guide must cover, and the rule that they stay true to the repository.

### Modified Capabilities
- `automated-testing`: the requirement that a test sits beside the code it covers gains one exception, for checks that cover no single source file, which live in `test/`.

## Impact

- **Files rewritten:** `README.md`, `CONTRIBUTING.md`.
- **Files added:** `.env.example`, `test/docs.test.js`, `LICENSE`.
- **Files deleted:** `public/CONTRIBUTING.md`. The address `/CONTRIBUTING.md` on the live site stops returning the old guide and falls through to the app's 404 page.
- **Configuration:** `vite.config.js` test `include` gains `test/**/*.test.js`.
- **Site behaviour:** none, apart from the deleted file.
- **Dependencies:** none.
- **Docs:** `Spec.md` Known gaps loses the "README and CONTRIBUTING describe the old app" entry, and its Environment section points to `.env.example`. `CHANGELOG.md` gains an entry. `Features.md` feature 4 gains two notes.

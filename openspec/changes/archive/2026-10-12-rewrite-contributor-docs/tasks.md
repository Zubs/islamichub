# Tasks

## 1. Docs check

- [x] 1.1 Add `test/**/*.test.js` to the test `include` in `vite.config.js`, and verify `npm test` still finds and passes the existing tests
- [x] 1.2 Create `test/docs.test.js` with the five assertions in `design.md` (npm scripts exist, relative links resolve, inline backticked paths exist, both files link to `Spec.md` and `Features.md`, no old-app markers), and verify it fails against the current `README.md` and `CONTRIBUTING.md` with messages that name what is wrong
- [x] 1.3 Prove each assertion catches its case with a temporary edit (a made-up `npm run` name, a made-up path, a broken relative link), and verify each fails with the made-up name in the message, then undo the edits

## 2. Environment example

- [x] 2.1 Create `.env.example` containing `VITE_HADITH_API_KEY=` and a one-line pointer to the README, and verify `git check-ignore .env.example` reports it is not ignored and `.env` still is

## 3. README

- [x] 3.1 Ask Zubair whether he wants to choose a licence now. If he names one, add the `LICENSE` file and use it in the README; if not, the README states that no licence has been chosen yet. Verify the README's licence section matches his answer
- [x] 3.2 Rewrite `README.md` with: what the site is; what it offers today (one line each, from `Spec.md` section 5, nothing unbuilt); the stack; setup (`npm ci`, `cp .env.example .env`, `npm run dev`) with the supported Node versions; a table of every npm script; the environment variable, where a key comes from, that the site runs without one, and that the key ships in the client bundle; deployment on Netlify; links to `Spec.md`, `Features.md` and `CONTRIBUTING.md`; the licence section from 3.1. Verify the docs check passes for the README
- [x] 3.3 Fetch every outside link in the README with `curl` and verify each returns 200

## 4. Contribution guide

- [x] 4.1 Rewrite `CONTRIBUTING.md` with: ways to contribute; a link to the README for setup; the folder layout and layering rules (`utils`, `data`, `stores`, `composables`, `components`, `views`); how to add a page (view, route, `useSeo`, `public/sitemap.xml`, tests); how to add content; the content rules section; design tokens and accessibility basics; how to run the four checks and where tests live; adding a dependency; pull request steps and checklist; reporting bugs through GitHub Issues at `Zubs/islamichub`. Verify the docs check passes for the guide
- [x] 4.2 Check the content rules section against the `contributor-docs` spec (reference on every claim, Arabic-edition numbers, both positions where schools differ, calculators are guides, open an issue when unsure), and verify each of the five is stated
- [x] 4.3 Fetch every outside link in the guide with `curl` and verify each returns 200, and that no link points to GitHub Discussions
- [x] 4.4 Delete `public/CONTRIBUTING.md`, and verify `npm run build` produces no `dist/CONTRIBUTING.md` and that nothing in `src/` linked to `/CONTRIBUTING.md`

## 5. Clean-machine run

- [x] 5.1 Copy the working tree, without `node_modules`, `dist` and `.env`, into a scratch folder; run the README's setup commands exactly as written; and verify the dev server answers with status 200. If a command fails, fix the README, not the scratch copy, and run again
- [x] 5.2 In the same scratch copy, run each check the contribution guide lists exactly as written, and verify all pass

## 6. Related documents

- [x] 6.1 Update `Spec.md`: point the Environment section to `.env.example`, and remove the "`README.md` and `CONTRIBUTING.md` describe the old app" entry from Known gaps. Verify the entry is gone
- [x] 6.2 Add a `CHANGELOG.md` entry and mirror it on the changelog page, and verify the page shows it in `npm run dev`
- [x] 6.3 Add two notes under feature 4 in `Features.md`: `public/CHANGELOG.md` is a stale published copy, and `GITHUB_REPO` in four components uses the repository's old name. Verify both notes name the files

## 7. Final checks

- [x] 7.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, fix anything reported, and verify all four finish with no errors and format changes no files
- [x] 7.2 Search both files for "hash", "no build step", "js/", "pages/", "pillarsofislam" and "Discussions", and verify nothing is found that refers to the old app
- [x] 7.3 Tick "3. Contributor docs" in the `Features.md` progress list, and verify the box is ticked and no other box changed

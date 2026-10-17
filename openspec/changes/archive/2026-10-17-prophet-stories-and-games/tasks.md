# Tasks

## 1. Source-checking tool

- [x] 1.1 Write `scripts/check-sources.mjs` (design decision 1): download the fawazahmed0 Qur'an and hadith editions into a git-ignored cache, check every verse block's Arabic in stories, quiz and Kalimah data against the dataset, print each cited hadith's text beside its citing sentence, and list unmapped Sahih Muslim numbers with their sequential numbers; add the cache folder to `.gitignore`. Verify it runs on the current stories and reports no Arabic mismatch, or lists the mismatches found
- [x] 1.2 Document the script in `CONTRIBUTING.md` (when to run it and how to read its output); verify `test/docs.test.js` passes

## 2. Places for every prophet, and a wider map

- [x] 2.1 Write `scripts/make-region-map.mjs` (design decision 3) that builds `data/regionMap.js` from Natural Earth 1:50m land for 26°–52° E, 12°–40° N; change `MAP_BOUNDS` to match and regenerate the outline. Verify the map renders with the Red Sea, Gulf and Yemen coast in a screenshot of Ibrahim's page, and the journey tests still pass
- [x] 2.2 Rename `ibrahimJourney.js` to `ibrahimPlaces.js` with a `kind` on each stop and `journey: true`, move its content keys under `places`, and update `prophetStories.js` and tests; verify Ibrahim's page reads exactly as before (map, list, line) and the page tests pass
- [x] 2.3 Give `JourneyMap.vue` a `joined` flag (line only when true) and support places without coordinates (in the list, not on the map); add tests for: several places with no line, a place with no coordinates, and the existing one-stop and Ibrahim cases. Verify they pass
- [x] 2.4 Add the Places part to `ProphetView.vue`: the map and list when the prophet has located places, a "where he lived is not known" line when he has none; each place shows its kind (born, lived, sent, travelled, died) and its label (named in the Qur'an or hadith, with reference; or identified by historians, with the source when the reviewer has supplied one). Test both cases. Verify they pass
- [x] 2.5 Add a test that every place in every places file lies inside `MAP_BOUNDS` (when it has coordinates), carries a reference, has a kind, and, when `known` is 'historians', has words that say so and an entry in Final; verify it passes

## 3. Fuller stories: the long accounts

For each prophet: list every Qur'anic passage about him and the relevant hadith in the two Sahih collections (and Sunan hadith graded sahih or hasan, with the grade shown); extend the sections and content files to cover each; write his places file; run `scripts/check-sources.mjs` and fix every mismatch; add Final rows for open points; and verify the story tests (references present, verses exist, hadiths link, Muslim numbers mapped) pass.

- [x] 3.1 Musa and Harun (each telling his own part and linking to the other)
- [x] 3.2 Yusuf and Ya'qub
- [x] 3.3 Nuh and Adam
- [x] 3.4 'Isa, Zakariyya and Yahya
- [x] 3.5 Muhammad ﷺ (an outline of his life's main events from the Qur'an and the two Sahih collections, with Makkah and Madinah as places)
- [x] 3.6 Dawud and Sulayman (including Saba' in the places)

## 4. Fuller stories: the rest

Same steps as group 3.

- [x] 4.1 Hud, Salih and Shu'ayb (with al-Ahqaf, al-Hijr and Madyan in the places)
- [x] 4.2 Lut, Isma'il and Ishaq
- [x] 4.3 Ayyub, Yunus and Ilyas
- [x] 4.4 Idris, Dhul-Kifl and Al-Yasa' (short stories that say the sources say no more)
- [x] 4.5 Fill `people` and `peopleRefs` in `data/prophets.js` for each of the ten prophets without them wherever a verse names his people; add a test listing which prophets have a people and which do not, matching what was found. Verify it passes
- [x] 4.6 Recapture any story page fixtures that changed, add each story's new places to the sitemap check if needed, and verify `npm test` passes

## 5. Games: shared parts

- [x] 5.1 Add the route `/games` (lazy) with its SEO entry, sitemap and `llms.txt` lines (each game's own route, SEO, sitemap and `llms.txt` lines are added with its view in groups 6 to 8, so no route points at a view that does not exist yet); add the games page with the three games and each best result on this device; link it from the Tools page. Test the page for a new and a returning player. Verify the sitemap, SEO and navigation tests pass (`/games` highlighted as Tools)
- [x] 5.2 Add a small storage helper for game keys that ignores missing or corrupt data, with tests; verify they pass
- [x] 5.3 Add 'who am i finished', 'kalimah finished' and 'quiz finished' to `ACTIONS`, with tests that each sends no other data; update CLAUDE.md, the About page and `Spec.md` from five to eight named actions. Verify the statistics tests pass
- [x] 5.4 Add a test across all game data: every reference is a verse that exists or a hadith that links, every Sahih Muslim number is mapped, and no game view contains an image; verify it passes (it grows as groups 6 to 8 add data)

## 6. Prophets quiz

- [x] 6.1 Write the pure quiz logic in `utils/` (draw ten unseen with a given random source, fill and reset when fewer remain, shuffle answers, score), with tests for every scenario in the `prophets-quiz` spec. Verify they pass
- [x] 6.2 Write the first 100 questions in `data/games/quiz.js` from the finished stories, covering all 25 prophets, each with four answers, one right, and its reference; run `scripts/check-sources.mjs` on them. Verify the data test passes
- [x] 6.3 Write questions 101 to 300 the same way, keeping every prophet at two or more and in proportion to his account; verify the data test checks at least 300 questions and passes
- [x] 6.4 Build the quiz view: one question at a time, evidence after each answer (verse in Arabic with translation, or hadith link), score at the end with the best score and missed questions, attempt kept across a reload, and the "awaits review" note. Test a full attempt, a reload mid-attempt and two attempts with no repeat. Verify they pass

## 7. Who am I?

- [x] 7.1 Write the clues in `data/games/whoAmI.js` from the finished stories, at least two per prophet, hardest first, each with its reference; verify the data test passes
- [x] 7.2 Write the pure round logic (choose a prophet, reveal, score by clues used and wrong guesses) with tests for each `who-am-i-game` scenario; verify they pass
- [x] 7.3 Build the view: clues one at a time, a guess from the 25 names, the reveal with every clue's reference and a link to the story, text only. Test a round won on the first clue, one with a wrong guess, and one given up. Verify they pass

## 8. Kalimah

- [x] 8.1 Choose at least 365 Qur'anic words in `data/games/kalimah.js`, each with Arabic, unvocalised form in base letters, one plain a–z transliteration, meaning, verse reference, verse Arabic from the dataset and translation; run the source script; add a test that every unvocalised form uses only keys on the Arabic keyboard and every transliteration only a–z. Verify they pass
- [x] 8.2 Write the pure logic (word of the day from the date, marking with repeated letters, length check, six tries) with tests for each `kalimah-game` scenario; verify they pass
- [x] 8.3 Build the view: a mode switch remembered on the device, an Arabic keyboard (right to left) and a Latin keyboard, the grid, the end screen with the word in its verse, the game kept across a reload, and the share text with no word. Test both modes, a reload after two guesses, sharing and the next day. Verify they pass

## 9. Documents and checks

- [x] 9.1 Update `Spec.md` (stories, places, map region, games), `CHANGELOG.md`, and `Features.md`: feature 42 rewritten for three games, its Decisions needed rows marked decided (games for adults and older children; Kalimah in Arabic or transliteration by choice), and Final rows for each story's open points. Verify `test/docs.test.js` passes
- [x] 9.2 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and fix everything they report until all four pass
- [x] 9.3 Screenshot the stories of Musa, Hud and Sulayman (map with southern Arabia) and each game at desktop width, and fix any layout fault found; the 360px check on a real phone is Zubair's
- [x] 9.4 Leave features 36 and 42 unticked: both need the reviewer Zubair names, and 42 also a shared Kalimah result opened from WhatsApp on a real phone. Say so in the summary

## 10. Game follow-ups (requested 17 October 2026)

- [x] 10.1 Tag every quiz question easy, normal or hard, remember a level per game under `game-levels`, and draw quiz attempts from the chosen level; test the draw, the store and the data
- [x] 10.2 Who am I?: three guesses (two on Hard), the round lost when they run out, and the easiest clue first on Easy; test the rules and the view
- [x] 10.3 Kalimah: the meaning as a hint on Easy and no keyboard marks on Hard; test both
- [x] 10.4 An intro screen for each game (how to play, the level, and Kalimah's way of typing) before Start, skipped when a game is in progress; test each
- [x] 10.5 A "Quit to games" control while playing (a quit quiz is discarded); test each
- [x] 10.6 Share the quiz score and the Who am I? result as text with the game's link and an invitation, and add the invitation to Kalimah's share; test each
- [x] 10.7 Update `Spec.md`, `CHANGELOG.md` and `Features.md`; run the four checks

## 11. Second follow-ups (requested 17 October 2026)

- [x] 11.1 Who am I? as a run of rounds until a prophet is not named, with the count, total points and rounds, and the day's best under `who-am-i-today`; share and play again at the end; test the run, the store and the view
- [x] 11.2 Colour Kalimah's keyboard like the grid (the colour classes were overridden by the key style), with absent letters dark grey; check in a browser
- [x] 11.3 Update `Spec.md`, `CHANGELOG.md`, `Features.md`; run the four checks

## Workflow follow-up

- Zubair names the reviewer; the reviewer reads every story, clue, word and question; their name and date are recorded; then features 36 and 42 are ticked.
- Archive the change after review, so the four new game specs are created and `prophets`, `prophet-journeys` and `usage-statistics` are updated.

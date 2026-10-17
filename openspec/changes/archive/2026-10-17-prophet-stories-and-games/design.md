# Design

## Context

See proposal.md for why. The relevant current state:

- **Stories.** Each prophet has `data/<slug>Sections.js` (order, kind, Arabic, references) and `data/content/<slug>/en.js` (words), registered in `data/prophetStories.js` and drawn by `ContentSections` in `ProphetView.vue`. Section kinds already cover prose, verse, hadith, points, positions, recitation, FAQ and the new `step` and `phrases`. Ibrahim's story has 21 sections and about 2,100 words; the other 24 have 4 to 12 sections and 256 to 1,154 words.
- **Journeys.** Only Ibrahim has one: `data/ibrahimJourney.js` lists stops with `lat`, `lon`, `known` ('scripture' or 'historians') and `reference`, and `JourneyMap.vue` always joins them with a line. The map's region (`utils/journey.js`) is 26°–50° E and 16°–40° N, and the land outline in `data/regionMap.js` was made by hand from Natural Earth with no script kept.
- **Verification so far.** References were checked by hand against the open fawazahmed0 hadith and Qur'an datasets. In CI, tests check that Qur'an references exist (`test/fixtures/ayahCounts.json`), that hadith references link, and that Sahih Muslim numbers have a library mapping (`data/hadithNumbering.js`).
- **Translations.** Page words live in content files; data items (duas, adhkar) are translated by id through `useDataTranslations` and `data/translations/`.
- **Statistics.** `utils/stats.js` holds the fixed `ACTIONS` list.

## Goals / Non-Goals

**Goals:**
- Stories as full as the sources allow, each fact referenced and checked, using only the existing section kinds plus a Places part.
- One places model for every prophet, with Ibrahim's journey as a special case.
- Three games built from the same verified material, with pure logic in `utils/` and content in `data/`.
- A repeatable way to check ~1,000 references, rather than one-off searches.

**Non-Goals:**
- Rewriting Ibrahim's story (only his journey moves to the places model).
- Leaderboards, accounts or sharing of quiz scores.
- Translating the stories or games (features 27 and 28); this change only keeps them translatable.
- Recording the scholarly review itself (Zubair names the reviewer; feature 36).
- Showing graves or shrines as places to visit. A place of death is listed only where an authentic hadith or verse states it.

## Decisions

### 1. A source-check script, run by hand, beside the CI checks
`scripts/check-sources.mjs` downloads the fawazahmed0 Qur'an (`ara-quransimple`, `eng-ummmuhammad`) and hadith editions into a git-ignored cache, then:
- checks that the Arabic of every verse block in every story, quiz question and Kalimah word matches the dataset exactly;
- prints, for every hadith reference, the dataset's English text beside the sentence that cites it, for a person to confirm;
- reports every Sahih Muslim number with no entry in `HADITH_NUMBER_MAP`, with its sequential number from the dataset.

It is a development tool, not part of `npm test`, because tests must run offline. CI keeps the existing offline checks (verses exist, hadiths link, Muslim numbers mapped), extended to the new data.

*Alternative:* commit the datasets as fixtures so tests can check text. Rejected: tens of megabytes in the repository for a check that matters only when content changes.

### 2. Places replace journeys, with a `journey` flag
Each prophet may have `data/<slug>Places.js`: `[{ id, kind, lat, lon, known, reference, source }]`, where `kind` is 'born', 'lived', 'sent', 'travelled' or 'died'; `known` is 'scripture' or 'historians'; `source` is optional and names the historian or work only once the reviewer has supplied it (Zubair chose this on 17 October 2026, because classical histories cannot be checked against their text the way hadith can); and `lat`/`lon` may be absent for a place with no known location. Its words are in the story's content file under `places`. A places file may export `journey: true` when the sources give the order, which draws the line. `ibrahimJourney.js` becomes `ibrahimPlaces.js` with `journey: true`, and its content keys move under `places`, so Ibrahim's page reads as before.

`JourneyMap` takes `stops` and a `joined` flag, plotting only stops with coordinates; the list shows every place, including those without coordinates. A prophet with no places file shows a short "where he lived is not known" line from the Places part instead of a map.

*Alternative:* add places to `data/prophets.js`. Rejected: it would mix the list with story-level detail and words that need translating.

### 3. The map region grows south to 12° N, with a script to remake the outline
`MAP_BOUNDS` becomes 26°–52° E, 12°–40° N, so Marib (Saba') and Hadramawt (al-Ahqaf) fit. `scripts/make-region-map.mjs` downloads Natural Earth 1:50m land (public domain), clips it to the bounds, simplifies it and writes `data/regionMap.js`, so the outline can be remade if the bounds change again. A test fails if any place's coordinates fall outside `MAP_BOUNDS`.

*Alternative:* keep the bounds and list southern places without markers. Rejected: the 'Ad and Saba' stories would be the only ones whose places cannot be seen.

Added while building: places can lie close together (Madyan and Mount Sinai are about 100 km apart), and on the whole region their markers overlap at 360px. So each map zooms to its prophet's places (`viewFor` in `utils/journey.js`): the box around them plus a margin, never narrower than about 6.5°, in the map's proportions and kept inside it. Markers are drawn at the zoom's scale so they keep their 44px touch target on screen, and lines keep a fixed screen width. Ibrahim's journey spans the region, so his map is unchanged.

### 4. Stories are extended section by section, prophet by prophet
For each prophet, the builder lists every Qur'anic passage about him (from the dataset's search and the existing `mentions`), and every hadith in Sahih al-Bukhari and Sahih Muslim, plus Sunan hadith only where graded sahih or hasan in the dataset's grades, with the grading shown. New sections reuse the existing kinds. Where the sources are silent, the story says so. Open points for the reviewer (identifications, disputed details, gradings) are added as rows to Final in `Features.md`, as before.

Order of work: the long accounts first (Musa, Yusuf, Nuh, Isa, Muhammad ﷺ, Sulayman, Dawud), then the rest. Muhammad's ﷺ story stays an outline of his life's main events from the Qur'an and the two Sahih collections; it is not a full sira.

### 5. Game content lives in `data/games/`, logic in `utils/`
- `data/games/whoAmI.js`: clues per prophet slug, `{ id, text, reference }`, ordered hardest first.
- `data/games/kalimah.js`: words `{ id, arabic, unvocalised, transliteration, meaning, reference, verseArabic }`, with the verse's translation from Saheeh International.
- `data/games/quiz.js`: questions `{ id, prophet, question, answers: [four], right, reference, verseArabic? }`.

Text is held by id so that `useDataTranslations` can translate it later. Pure functions in `utils/games.js` (or one file per game) handle scoring, drawing questions, the daily word and marking guesses, each taking a random source or date so tests are exact.

### 6. Quiz draws avoid repeats until the bank is used up
The ids of questions already seen are kept on the device (`quiz-seen`). An attempt draws ten from the unseen; if fewer than ten remain, it takes those and fills from the whole bank, then resets the seen list. A shuffled draw uses a seeded generator in tests. The attempt in progress is kept (`quiz-attempt`), so a reload continues it; the best score is kept (`quiz-best`).

### 7. Kalimah: one word per day by date, two ways to type it
The day's word is `words[daysSince(EPOCH, today) % words.length]`, using local day keys, so every device agrees without a server. The list holds at least 365 words. Guesses are compared on the unvocalised Arabic (base letters only, with the word list chosen so that no hamza or alif form needs special handling) or on the lower-case transliteration in plain a–z. Marking handles repeated letters the standard way: exact matches first, then present letters up to the count left. Game state per day is kept under `kalimah-game`; the chosen mode under `kalimah-mode`; finishing a day is counted once.

The shared result goes through the existing share feature (feature 22) as text: the mode, the tries used, a grid of squares and the link with `?src=` tag, never the word.

### 8. Routes and navigation
`/games`, `/games/who-am-i`, `/games/kalimah` and `/games/quiz`, each lazy-loaded with its own title and description, in the sitemap and `llms.txt`. `/games` is added to the Tools section in `utils/navigation.js`; the existing test that keeps navigation in step with the Tools page covers it once the Tools page links to it.

### 9. Statistics
`ACTIONS` gains 'who am i finished', 'kalimah finished' and 'quiz finished', sent with no other data. CLAUDE.md, the About page and `Spec.md` change from "five named tool actions" to "eight named actions".

## Risks / Trade-offs

- [The volume of content (24 stories, ~300 questions, 365+ words) is far larger than any earlier feature] → Tasks are split by prophet and by batch, each batch checked by the source script before the next starts; the change can be applied over several sessions.
- [Historians' identifications cannot be checked against a dataset] → They are shown labelled "identified by historians" with no named source, each is listed in Final, and the reviewer may add a source, which the list then shows.
- [Content written by the builder may carry errors a dataset check cannot catch (a wrong summary of a true hadith)] → Every story, clue and question waits for the named reviewer before features 36 and 42 are ticked, and the pages say so.
- [A sound game rule could still trivialise sacred content] → Games score knowledge only, never picture prophets, and show evidence with every answer.
- [Changing the map bounds changes Ibrahim's map] → His markers and route are re-checked visually and by the existing journey tests.
- [Arabic word matching can be unfair if letter forms differ] → Words are chosen from base letters only, and a test checks every word's unvocalised form uses only keys on the Arabic keyboard.

## Migration Plan

No stored data changes shape; the new keys are new. `ibrahimJourney.js` is renamed in one step with its importers and tests. Rollback is reverting the change.

## Open Questions

- Which historian or work to cite for each place is settled per place during the story work and confirmed by the reviewer; it does not change the approach.

# Proposal

## Why

All 25 prophet stories are live, but apart from Ibrahim's (about 2,100 words in 21 sections) most are short: between 256 and 1,154 words, with Musa, whose account fills more of the Qur'an than any other prophet's, at 917. None says where the prophet lived or which lands his story is set in, and ten still have no "people they were sent to". Zubair wants the stories as full as the sources allow, with the places of each life, before the games of feature 42 are built, because the games are written from the stories and a thin story makes thin questions.

## What Changes

- **Fuller stories for the 24 prophets other than Ibrahim.** Each story is extended from the Qur'an and authentic hadith to the depth its sources allow, with Ibrahim's story as the measure. A prophet the sources say little about keeps a short story and says so; nothing is added to fill it out.
- **The places of each life.** Each story gains a "Places" part listing where the prophet was born, lived, was sent, travelled or died, wherever a source or historians place it. Each place is labelled, as Ibrahim's journey is: named in the Qur'an or hadith, or identified by historians (naming the historian or work it comes from). Where nothing is known, the story says so.
- **The map serves every prophet.** The map from feature 33 shows any prophet's places, with a line joining them only when they form a journey in a known order. Its region grows south to include southern Arabia, where the stories of Hud ('Ad) and Saba' are set.
- **"The people they were sent to"** is filled in for the ten prophets who lack it, wherever a verse states it, and left empty where none does.
- **Feature 42: three games** on a new games page:
  - **Who am I?** Clues about one prophet are revealed one at a time; the fewer needed, the higher the score.
  - **Kalimah.** A daily Qur'anic word puzzle in six tries, played in Arabic letters or in transliteration as the player chooses, shared as a grid that gives nothing away.
  - **Prophets quiz.** A bank of about 300 questions on the prophets' lives; each attempt draws 10 at random, and every answer shows its verse or hadith.
- Every clue, word and question carries a reference checked against its source. Games score knowledge only, keep scores on the device, and never picture a prophet.
- Three named actions are added to the anonymous usage statistics, one per game finished, carrying no answer or score. CLAUDE.md, the About page and `Spec.md` say "eight named actions" instead of five.
- The stories and games await review by the reviewer Zubair names (features 36 and 42).

## Capabilities

### New Capabilities
- `games`: the games page and the rules every game follows: evidence for every fact, scores on the device only, knowledge not worship, no pictures of prophets.
- `who-am-i-game`: the prophet guessing game.
- `kalimah-game`: the daily Qur'anic word puzzle, in Arabic or transliteration.
- `prophets-quiz`: the 300-question quiz with 10 random questions per attempt.

### Modified Capabilities
- `prophets`: stories become as full as the sources allow, gain a Places part with labelled places, and the list fills in "the people they were sent to" wherever a verse states it.
- `prophet-journeys`: the map shows any prophet's places, joins them only when they form a journey, and covers southern Arabia.
- `usage-statistics`: the fixed list of counted actions gains three game actions.

## Impact

- Content: the 24 story sections and content files under `src/data/`, `src/data/prophets.js`, new places files per prophet, and new data files for the clues, the Kalimah words and the quiz bank. This is most of the work.
- Code: `JourneyMap.vue` and `utils/journey.js` (any prophet, optional route, wider bounds), `data/regionMap.js` regenerated for the wider region, `ProphetView.vue`, new game views and pure game logic in `utils/`, the router, `useStats.js` and `utils/stats.js`.
- No new dependency or outside address at run time. The wider map outline is made once from Natural Earth (public domain) by a script kept in `scripts/`.
- Stored data: new keys for game progress and scores only; no existing key changes shape.
- Documents: `Spec.md`, `CHANGELOG.md`, `public/sitemap.xml`, `public/llms.txt`, CLAUDE.md (privacy line), the About page, and `Features.md` (feature 42 rewritten to three games; Decisions needed rows for feature 42 marked decided; Final rows for each story's open points).

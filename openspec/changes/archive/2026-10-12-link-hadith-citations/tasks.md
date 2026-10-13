# Tasks

## 1. Parser and components

- [x] 1.1 Create `src/utils/hadithRefs.js` and `src/data/hadithNumbering.js` with tests for one and two references, a reference inside a sentence, spellings, a collection outside the library, a Qur'an reference, text with none, and a mapped number. Verify the tests pass
- [x] 1.2 Create `HadithRef.vue` and `HadithBlock.vue` with tests for a block with no reference, one, two, a collection outside the library and a mapped reference. Verify the tests pass

## 2. Conversion

- [x] 2.1 Convert every hand-written hadith block and inline citation in the pillar pages, Articles of Faith, Tasbih, Inheritance and the hadith overview, and pass FAQ answers, Qur'an block notes, description strings and adhkar references through `HadithRef`. Verify no `class="hadith-source"` remains in `src/views`
- [x] 2.2 Add `test/citations.test.js`, which mounts every route and fails on a citation of a held collection outside a link, and follows the Fasting page's "Sahih Bukhari 1904" to its address. Verify it passes

## 3. Checks against the sources

- [x] 3.1 Add `test/citations.live.test.js` (run with `CITATIONS_BASE`), and compare each cited number with the text quoted beside it using an open hadith dataset, recording any mismatch under "Final". Verify it finds the citations and skips the requests when no base address is given

## 4. Documentation

- [x] 4.1 Update `CONTRIBUTING.md` (how to cite), `Spec.md`, `CHANGELOG.md` and `Features.md`; leave feature 15 unticked with the hand check listed under "Final". Verify the docs test passes

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

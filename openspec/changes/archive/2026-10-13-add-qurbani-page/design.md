# Design

## Context

The Eid page introduced pages written as sections: a shared structure file, a words file per language and `ContentSections.vue`. This page reuses all three.

## Decisions

- **Structure in `data/qurbaniSections.js`, words in `data/content/qurbani/en.js`.** Same split as the Eid page; no new component kinds are needed. The helper sits in the `shares` section's slot.
- **`shareOptions(people)` is plain arithmetic**, so a very large number costs the same as a small one. It returns `{ small, large, spare }` rows; the view words them.
- **`parsePeople` accepts only digits.** Empty gives nothing; anything else that is not a whole number above zero gives an error.
- **Sources.** Hadith are cited from collections the library holds wherever one exists. The report of Ibn Umar on the days of sacrifice is in the Muwatta, which the library does not hold; it is cited without a link. The report used for four days is in Musnad Ahmad and could not be checked against a text, and the page says so.
- **Ages of animals** come from the jurists' reading of "full-grown" and differ slightly between schools; the page gives the hadith and says the ages await review.

## Risks

- The content has not been reviewed by a scholar. The feature stays unticked until Zubair names a reviewer.

# Design

## Decisions

- **`dailyHadithFor(dayKey, list)` in `utils/dailyHadith.js`** turns a local day key into a whole number of days and takes it modulo the list length. Pure, so every rule in the spec is a one-line test.
- **The day key comes from `utils/day.js`** (feature 2), the one place "today" is defined.
- **All entries are from Sahih al-Bukhari.** That keeps the grade beyond argument, and its numbering in the library matches the cited numbering, so links need no mapping. Texts are copied from the open `fawazahmed0/hadith-api` dataset by number, not typed from memory.
- **`DailyHadith.vue`** renders a `HadithBlock`; it re-reads the date when the page becomes visible again, so a tab left open overnight moves on.
- **No Arabic text is stored.** The dataset's Arabic includes the full chain of narration, which is too long for a card; the link leads to the Arabic in the library.

## Risks / Trade-offs

- [The English translation's licence is not stated in the dataset] → listed under "Final".

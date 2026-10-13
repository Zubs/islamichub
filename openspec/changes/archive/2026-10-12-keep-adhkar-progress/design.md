# Design

## Decisions

- **`adhkar-progress` is `{ day, counts }`**, with `day` a local day key from `utils/day.js` and `counts` keyed by the ids the store already uses (`<dhikrId>` and `<dhikrId>:<part>`). One day key for the whole record makes "yesterday's counts are gone" a single comparison.
- **`keepEntries(record, isValid)` in `utils/storage.js`** returns a record with only the entries that pass, and each store supplies its own test of an entry: a list of text for the completion log, a record of positive numbers for tasbih totals, a positive whole number for a count. Reading never rewrites storage.
- **Counts of zero are not stored**, so resetting a card or completing a category removes its key.
- **Completing a category also clears part counts.** Today it clears `<dhikrId>` only, so a multi-part dhikr keeps its counts; this is corrected with it.
- **Writes are wrapped**, so blocked storage leaves the counts working in memory.

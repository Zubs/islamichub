# Proposal

## Why

The adhkar and tasbih stores decide what "today" is from the UTC date, so the day changes at midnight UTC instead of the user's own midnight. In Lagos the day turns over at 1am; in New York at 7pm or 8pm the evening before. A streak can break, or a count can land on the wrong day, for anyone not on UTC. This is feature 2 in `Features.md`, and every tracker planned after it (adhkar progress, salah, fasting, daily hadith) needs one shared, correct definition of the day before it is built.

## What Changes

- Add `src/utils/day.js` with `dayKey(date)`, which returns the device's local date as `YYYY-MM-DD`, and `addDays(key, n)`, which steps a day key forwards or backwards by whole calendar days.
- The adhkar store uses it for today's completions and for streaks. The tasbih store uses it for today's totals. Both stores lose their own `todayKey()` and every use of `toISOString()`.
- Stored keys and shapes do not change: `adhkar-completion-log` and `tasbih-totals` are still keyed by `YYYY-MM-DD`. Existing data is read as it is, with no migration.
- Stored data that is valid JSON but not an object (the text `null`, a number, a list, a string) is read as empty. Today that throws; it was found while writing the tests for feature 1.
- Tests cover the day key and both stores in Lagos, London and New York time, across midnight, month ends and daylight-saving changes.

Out of scope:

- Re-dating entries already stored under UTC dates. They carry no time, so the local date cannot be recovered. See the one-off effect under Impact.
- Updating a page that is left open across midnight. The stores work out today when they are asked, as they do now; nothing re-draws on the stroke of midnight.
- Prayer times and the Hijri date, which already use the device's local date.
- Repairing damaged entries inside an otherwise valid stored object.

## Capabilities

### New Capabilities
- `local-day`: what counts as "today" for anything the site records by day, and how completions, totals and streaks follow the device's local calendar.
- `device-storage`: how data kept on the device is read safely, starting with tolerance of missing, invalid and wrong-shaped data.

### Modified Capabilities

None. `automated-testing` gains new tests but none of its requirements change.

## Impact

- **Code:** new `src/utils/day.js` and `src/utils/storage.js`; edits to `src/stores/adhkar.js` and `src/stores/tasbih.js`. No view changes: the views already read "today" and streaks from the stores.
- **Tests:** new `day.test.js` and `storage.test.js`; additions to the two store test files. Existing store tests keep passing unchanged.
- **Existing users, once, on the first day after the change:** an entry made before the change sits under its UTC date. For a user west of UTC who made it in the evening, it now reads as tomorrow's; for a user east of UTC who made it just after midnight, as yesterday's. The effect is at most one day, for entries made in the hours between local and UTC midnight, and can break or shift a streak by one day. Nothing is lost or deleted.
- **Dependencies:** none.
- **Docs:** `Spec.md` section 6 (rules for stored data), section 5.7 and 5.8 (streak and totals wording), the architecture list, and two Known gaps entries ("Day keys are UTC" and "Stored data of the wrong shape is not handled") are updated. `CHANGELOG.md` and the changelog page gain a Fixed entry.

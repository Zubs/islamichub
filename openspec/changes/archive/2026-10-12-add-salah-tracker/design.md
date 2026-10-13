# Design

## Decisions

- **`salah-log` is `{ "YYYY-MM-DD": { fajr: "on-time" | "late" | "missed", … } }`.** An unlogged prayer has no entry, and a day with no entries is removed, so an untouched log stays empty.
- **`utils/salah.js` is pure:** the prayer and status lists, `isDayComplete`, `streak(log, today)`, `weekOf(today)`, `monthGrid(year, month)`, `canLog(day, today)`, `dayState(entry)` and `parseSalahLog(text)`. The store and the page add no rules of their own.
- **Streak with today in progress:** if today is complete it counts; if today holds a missed prayer the streak is 0; otherwise counting starts from yesterday, so the number does not drop to zero each morning.
- **`stores/salah.js`** owns the log: `setStatus(day, prayer, status)` (same status again clears), `clear()`, and a `streak` computed. Writes are wrapped so blocked storage degrades to memory.
- **"Not yet"** compares the device's clock with `calcPrayerTimes` for the saved location and methods, for today only. Past days never show it.
- **One page, `/tracker`, in `views/tools/`.** The selected day drives the five rows; the week strip and month grid are buttons that select a day.
- **Confirmation uses `window.confirm`,** the built-in the browser provides.

## Risks / Trade-offs

- [A user may feel judged by a "missed" mark] → the wording stays neutral, nothing is shared, and the log can be cleared in one step.

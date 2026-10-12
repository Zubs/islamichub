# Design

## Context

See `proposal.md` for motivation. What the code does today:

- `stores/adhkar.js` and `stores/tasbih.js` each define their own `todayKey()` as `new Date().toISOString().slice(0, 10)`, a UTC date.
- The adhkar streak loop mixes the two clocks: it steps a `Date` back with `setDate()` (local calendar) and reads the key from it with `toISOString()` (UTC).
- Both stores load with `JSON.parse(localStorage.getItem(KEY) || '{}')` inside `try/catch`. Text that is not JSON falls back to `{}`; the text `null` parses to `null` and the next property read throws.
- No view builds a day key. The adhkar and tasbih views read today's state and streaks from the stores. Other `new Date()` uses (prayer times, Hijri date, the home page date line) already use local date parts.
- The test suite pins `TZ=UTC` in `test/global-setup.js` and runs in Vitest's default `forks` pool. In Node, assigning `process.env.TZ` at run time changes the timezone for dates created afterwards; checked with Node 23.

## Goals / Non-Goals

**Goals:**
- One place that defines a day key, used by both stores now and by every tracker later.
- Day arithmetic that cannot be thrown by month ends, leap years or daylight saving.
- Stored data stays byte-compatible.

**Non-Goals:**
- Re-dating existing entries (see Risks).
- Making "today" reactive to the clock while a page sits open.
- Validating the inside of a stored record, such as a day whose value is not a list.
- Any timezone setting. The device's own timezone is the only one used.

## Decisions

### `dayKey` reads local date parts
`dayKey(date = new Date())` builds the key from `getFullYear()`, `getMonth() + 1` and `getDate()`, zero-padded. These are the device's local calendar fields, which is exactly the definition wanted.

- *Alternative: `toLocaleDateString('en-CA')`.* Returns `YYYY-MM-DD` today, but depends on locale data and reads as a trick.
- *Alternative: `Intl.DateTimeFormat` with an explicit timezone.* Only needed if the user could pick a timezone, which is a non-goal.

### `addDays` does calendar arithmetic, not millisecond arithmetic
`addDays(key, n)` splits the key into year, month and day, builds `new Date(year, month - 1, day + n)` and returns its `dayKey`. The `Date` constructor normalises overflow (day 32, day 0, negative days), and because it works on calendar fields a 23-hour or 25-hour day still moves exactly one date.

- *Alternative: add `n × 86,400,000` ms.* Wrong on daylight-saving days: it can skip or repeat a date.

A key that is not in `YYYY-MM-DD` form is a programming error, not user input, so `addDays` does not guard against it.

### The streak walks keys, not dates
`streakForCategory` starts from `dayKey()` and repeatedly calls `addDays(key, -1)` while the log has the category under that key. This removes the mixed local/UTC stepping and makes the loop a few lines.

### A pure parser for stored records
`src/utils/storage.js` exports `parseStoredObject(text)`. It returns the parsed value when it is a plain keyed object, and `{}` when the text is missing, is not JSON, or parses to `null`, a primitive or an array. It takes text and returns a value, so it stays a pure function as the layering rules require; the stores still own the `localStorage` call:

```
completionLog = ref(parseStoredObject(localStorage.getItem(LOG_KEY)))
```

Both stores drop their near-identical `loadLog` / `loadTotals`.

- *Alternative: a helper that reads `localStorage` itself.* Rejected: it would not be pure, and `utils/` is for framework-free, side-effect-free functions.
- *Alternative: fix each store inline.* Rejected: the same five lines twice, and features 11, 17, 19 and 20 each add another stored record.

### Timezone tests switch `process.env.TZ` inside the test
The suite stays pinned to UTC. Tests that need another timezone set `process.env.TZ` in the test, freeze the clock with `vi.setSystemTime()` at a fixed UTC instant, and restore `TZ` to `UTC` in `afterEach`. A small helper, `test/timezone.js` (`setTimezone(zone, instant)` and `resetTimezone()`), keeps this in one place; it lives with the other shared test setup because both the utility tests and the store tests use it.

- For `dayKey` and `addDays` the function is called directly.
- For the stores, the store is created after the timezone and clock are set, and the same streak case is run with `it.each` over `Africa/Lagos`, `Europe/London` and `America/New_York`. That is the "at least three timezones" in the feature's done check.
- *Alternative: run the whole suite three times with `TZ=...`.* Does not work: the global setup overrides it, and it would only prove the tests pass, not that the key is local.
- The first task proves the switch works inside Vitest before anything else is built on it.

### No migration
Keys and shapes stay as they are. The stored keys were always `YYYY-MM-DD`; only the clock used to pick one changes.

## Risks / Trade-offs

- **One-day shift for existing users on the day the change ships** → Entries made between local and UTC midnight were filed under the UTC date. West of UTC an evening completion will read as tomorrow's (tomorrow shows as already done); east of UTC a just-after-midnight one reads as yesterday's. A streak can drop or shift by one day, once. Accepted: the entries hold no time, so they cannot be re-dated correctly, and guessing would be worse. It is recorded in the changelog.
- **A user who travels across timezones** can see a day repeat or skip → Accepted. The local day is the rule the feature asks for.
- **A page left open past midnight keeps showing yesterday's state until something re-reads it** → Unchanged from today. Feature 21 (the dashboard) is where a midnight refresh belongs.
- **Setting `process.env.TZ` in a test could leak into later tests** → Always restored in `afterEach`, and each test file runs in its own forked process. If Vitest's pool is ever changed to `threads`, run-time `TZ` changes stop working; the first task's check would fail and say so.
- **Damaged entries inside a valid record still throw** (for example a day whose value is `null`) → Out of scope; it needs hand-edited storage. Noted for feature 17, which adds the next stored record.

## Migration Plan

No data migration. To roll back, revert the two stores; entries written under local dates remain valid `YYYY-MM-DD` keys and are read by the old code, with the same one-day shift in reverse.

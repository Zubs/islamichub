# Proposal

## Why

The inheritance calculator gives wrong shares in several common cases: a sister beside a brother gets nothing, a granddaughter beside one daughter gets nothing, residuaries have no priority order, and a remainder is silently handed to the spouse while the label still reads 1/8. `Spec.md` lists these under Known gaps. People act on these numbers.

## What Changes

- `utils/inheritance.js` is rewritten as five separate steps in a fixed order: blocking, fixed shares, reduction ('awl), residue, return (radd), using exact fractions.
- A sister shares the residue with a brother two to one; a granddaughter takes 1/6 beside one daughter; residuaries follow one priority order.
- Radd goes to fixed-share heirs other than the spouse (proposed default). A grandfather excludes brothers and sisters (proposed default).
- Each result line says which rule produced it, and its share label is the final fraction, so it always matches the percentage.
- Amounts are rounded to the penny and always total the estate. Invalid input (husband and wife together, more than four wives, a negative count, a non-numeric estate) is rejected with a message.
- Four places where the table in Spec 5.9 was silent or at odds with Qur'an 4:11, 4:176 and Sahih al-Bukhari 6736 are built to the position the four schools share, and listed under "Final" for Zubair to confirm: parents take 1/6 beside any child, not only a son; a father beside daughters only takes 1/6 plus the residue; a sister beside a daughter takes the residue; two grandmothers share one sixth. A fifth is listed too: with a spouse and both parents, the mother takes a third of what is left after the spouse.
- **BREAKING** for callers: `calcInheritance` returns `{ error, shares }` instead of an array.

## Capabilities

### New Capabilities

- `inheritance-calculator`: how heirs are blocked, what each takes, how over- and under-subscribed estates are settled, how amounts are rounded, and what the page tells the user.

### Modified Capabilities

None.

## Impact

- `src/utils/inheritance.js` (rewritten), new `src/utils/inheritance.test.js`, `src/views/tools/InheritanceView.vue`.
- `Spec.md` 5.9 and Known gaps, `CHANGELOG.md`, the changelog page, `Features.md`.

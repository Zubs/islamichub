# Design

## Context

The current engine mixes blocking, shares and distribution in one pass with floating-point numbers. See proposal.md for what it gets wrong. Spec 5.9 holds the table this must follow.

## Goals / Non-Goals

**Goals:** five named steps, each testable alone; exact arithmetic; one result shape the page renders without doing sums.

**Non-Goals:** half-siblings, uterine siblings, distant kindred, bequests, the grandfather-with-siblings positions of the other schools (a listed decision), missing or unborn heirs.

## Decisions

- **Fractions as `{ n, d }` integers with `gcd` reduction.** Counts are small, so plain numbers are safe. No library.
- **Steps as functions:** `excluded(heirs)` → `fixedShares(heirs)` → `reduce` ('awl) → `residue` → `giveBack` (radd). `calcInheritance` composes them and returns `{ error, shares }`.
- **Share label is the final fraction**, with a separate `rule` sentence. This is the only way "label always matches percentage" survives 'awl and radd. The wife's line still reads 1/8 because she takes no radd.
- **Per-person pennies.** Each person's fraction is rounded to pence, the difference from the estate is added to the largest, and a line carries `amount` (its total) and `each`. Percentages are settled the same way in tenths.
- **Radd excludes the spouse; grandfather excludes siblings.** Both are the proposed defaults in `Features.md`, held as two named constants so reversing either is a one-line change plus tests.
- **Spouse alone:** the remainder appears as its own line rather than being handed to the spouse or dropped, because the schools differ on where it goes and totals must still reach 100%.
- **Where the Spec table was silent or wrong** (see proposal), the engine follows Qur'an 4:11 and 4:176 and Sahih al-Bukhari 6736 (verified against the text), which the four schools share, and the table in Spec 5.9 is corrected to match. Each is recorded under "Final".

## Risks / Trade-offs

- [A reader takes the output as a ruling] → the notice stays, and each line names its rule so a scholar can check it.
- [Corrections beyond the listed gaps change results users saw before] → they are the consensus positions; listed for Zubair, and in the changelog.

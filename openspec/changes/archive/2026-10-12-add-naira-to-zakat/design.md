# Design

## Context

Feature 5 left one conversion (`pricePerGram`), a `CURRENCIES` list in `utils/zakat.js` that `parsePrices` reads rates for, and built-in rates in the store. The page keeps its own list of `{ code, sym }`. The dataset already returns `usd.ngn` (1,331.59 on 12 October 2026).

## Goals / Non-Goals

**Goals:** naira end to end with the smallest change; typed prices that flow through the same `goldLocal` / `silverLocal` the nisab and the calculation already share.

**Non-Goals:** a street-rate service; storing typed prices; per-currency number formats (feature 25).

## Decisions

- **Add `NGN` to `CURRENCIES`.** `parsePrices` then requires five valid rates with no other change. The built-in rate is the dataset's figure for the reference date already in the store, so the fallback set stays internally dated.
- **Typed prices live in the store as `customPerGram: { gold, silver }` (numbers or `null`).** `goldLocal` and `silverLocal` return the typed price when set, else `pricePerGram`. The nisab and the calculation read those two, so "shown and used agree" holds without touching either. Alternative: pass overrides into `calculateZakat`; rejected, as the nisab shown would need the same override separately.
- **Validation is a pure `parseCustomPrice(text)` in `utils/zakat.js`** returning a positive finite number, `null` for empty, or `undefined` for invalid. The page shows a message on `undefined` and leaves the store untouched.
- **Typed prices are offered in every currency**, not only naira: the fields cost nothing extra and a dealer's quote is useful anywhere.
- **Changing currency clears typed prices.** A price typed in naira is meaningless in pounds. Alternative: remember one per currency; more state for no stated need.
- **`ZakatPriceStatus` gains a `custom` prop** naming which metals are typed, and says so beside the existing fetched/reference text.
- **Formatting stays `en-GB` grouping with the symbol in front**, which already gives ₦25,400,000.00.
- **One kobo under** uses the existing to-the-hundredth comparison; no change.

## Risks / Trade-offs

- [The official rate understates local gold prices] → the page says so when naira is selected and offers the typed price.
- [A user forgets a typed price is in use] → the status line and the price tiles both mark it as custom.

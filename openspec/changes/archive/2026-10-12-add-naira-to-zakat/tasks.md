# Tasks

## 1. Conversion and validation

- [x] 1.1 Add `NGN` to `CURRENCIES` in `src/utils/zakat.js` and extend `zakat.test.js`: a reply with valid `ngn` yields five rates; a reply missing `ngn` yields no rates; the naira gold price is dollars per gram times the naira rate. Verify the tests pass
- [x] 1.2 Add `parseCustomPrice(text)` with tests for a positive number, a decimal, empty, zero, a negative number and text. Verify the tests pass
- [x] 1.3 Add `calculateZakat` tests in naira: nothing entered gives 0; exactly at the nisab is obligatory and one kobo under is not. Verify the tests pass

## 2. Store

- [x] 2.1 Add the built-in naira rate (dataset figure for the reference date) to `REFERENCE_RATES` in `src/stores/zakat.js`, add `customPerGram` with `setCustomPrice(metal, value)`, make `goldLocal`/`silverLocal` prefer it, and clear it in `setCurrency`
- [x] 2.2 Extend `zakat.test.js` for the store: round trip from naira through every currency; fallback naira rate when rates fail; a typed gold price changes the price and the nisab; clearing restores the fetched price; changing currency clears it; the other four currencies give the figures they gave before; `fmt` shows ₦25,400,000.00; the fetch carries no typed price. Verify the tests pass

## 3. Page

- [x] 3.1 Add naira to the currency buttons in `ZakatView.vue`, the official-rate note shown only for naira, and two "your own price per gram" fields with a rejection message, wired through `parseCustomPrice` and `setCustomPrice`
- [x] 3.2 Add the `custom` prop to `ZakatPriceStatus.vue` with tests for gold, silver and both typed, and pass it from the page. Verify the tests pass
- [x] 3.3 Add a page test for the journey: select naira, type a gold price, enter savings, and the Zakat due in naira matches a hand calculation. Verify it passes

## 4. Documentation

- [x] 4.1 Update `Spec.md` section 5.4 (currencies, five rates, built-in naira rate, typed prices), add a `CHANGELOG.md` entry and the changelog page entry, and verify each names the naira
- [x] 4.2 In `Features.md`, add the "Final" feature holding decisions awaiting Zubair, record the naira-rate decision there, and tick feature 6 once the checks pass

## 5. Final checks

- [x] 5.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

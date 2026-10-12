# Proposal

## Why

The Zakat calculator's prices are wrong for everyone, in two ways. First, both services it fetches from have stopped working (found on 12 October 2026), so it always falls back to prices built into the code, and those are out of date: against that day's market the gold nisab comes out about 12% too high and the silver nisab about 27% too low, which can tell someone they owe nothing when they do, or the reverse. Second, the bug `Features.md` describes is waiting behind that: the code keeps exchange rates on a pound base until a fetch succeeds and on a dollar base afterwards, so the moment prices load again, pounds, the default currency, would come out about 24% too low. This is feature 5.

## What Changes

- **Replace both price sources with one that works.** Gold, silver and the exchange rates come from a single free, keyless, daily dataset (the `@fawazahmed0/currency-api` data, served by jsDelivr, with its Cloudflare mirror as a second attempt). It answers browsers with the right CORS header and already includes the naira, which feature 6 needs.
- **Hold every rate on one base, the US dollar.** Metal prices are kept in dollars per troy ounce and rates as units per dollar, both when fetched and in the fallback, so the two can never be mixed.
- **One conversion function.** `pricePerGram(metal, currency)` in the store is the only place a metal price is converted. The nisab, the metals total and every price shown on the page use it.
- **Move the calculation out of the page** into a pure `src/utils/zakat.js`, where it can be tested: totals, net wealth, nisab, whether Zakat is due, and the amount.
- **Say plainly what the prices are.** Metals and rates are flagged separately as fetched or built in. The page shows the date the prices are from, and says when it is using built-in reference prices and from what date.
- **Refresh the built-in fallback** to the prices of the day this is built, with that date recorded, on the dollar base.
- **Fail soft and fast.** Each attempt is given a time limit, and a reply with a missing, zero, negative or non-numeric price counts as a failure.
- Update the content security policy: add the two new addresses, remove the two dead ones.
- Tests for the conversion, the calculation, the reply checking, the fallbacks, and the price note on the page.

Out of scope:

- The naira and typed-in prices (feature 6). The new source is chosen so that feature needs no change of service.
- Fetching prices only on the Zakat page instead of at app start (feature 10).
- Remembering the last fetched prices between visits (feature 12).
- The location code that also lives in the Zakat store (feature 11).

## Capabilities

### New Capabilities
- `zakat-calculator`: how Zakat is worked out, how the nisab is set, where gold and silver prices come from, how they are converted between currencies, and what the page tells the user about them.

### Modified Capabilities

None.

## Impact

- **Visitors:** the nisab and gold and silver values change for everyone, to the day's prices. In pounds on 12 October 2026 the gold nisab moves from about £9,641 to about £8,600, and the silver nisab from about £637 to about £870. Results that were "below threshold" may become "Zakat due" and the reverse. The console's CORS error on every page goes away.
- **Code:** `src/stores/zakat.js` (prices, rates, flags, conversion), new `src/utils/zakat.js`, `src/views/pillar/ZakatView.vue` (uses the new functions and shows the price note), a new small component for the price note, `src/views/AboutView.vue` (the source credit).
- **Store's public shape:** `goldGBP`, `silverGBP`, `FX`, `pricesLive` and `fetchFX` go; `goldLocal`, `silverLocal`, `nisabValue`, `fmt`, `setCurrency` and `fetchPrices` stay, so the Inheritance page and `App.vue` are unaffected.
- **Configuration:** `netlify.toml` content security policy.
- **Outside services:** `cdn.jsdelivr.net` and `latest.currency-api.pages.dev` are added; `api.metals.live` and `api.frankfurter.app` are removed. Requests carry nothing the user entered.
- **Dependencies:** none added.
- **Docs:** `Spec.md` sections 5.4 and 7 and three Known gaps entries; `CHANGELOG.md`; `Features.md` features 5 and 6.

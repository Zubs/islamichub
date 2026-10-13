# Proposal

## Why

The site is being built for Yoruba- and Hausa-speaking Muslims, most of whom hold their wealth in naira, yet the Zakat calculator offers only pounds, dollars, euros and riyals. The naira's official rate also differs from the price a local gold dealer quotes, so a fetched price alone is not enough for a result people can trust.

## What Changes

- Naira (NGN, ₦) joins the currency list. Pounds stay the default.
- `NGN` is read from the price dataset already in use, and fetched rates are used only when all five are valid.
- A built-in fallback naira rate is added on the same dollar base as the others.
- With naira selected, the page says the official exchange rate is used.
- The user can type their own local price per gram for gold and for silver, in any currency. A typed price replaces the fetched one in both the calculation and the nisab, and the page shows that a custom price is in use. An invalid entry is rejected and the fetched price kept.
- Feature 6 of `Features.md`. The decision "Which naira rate does the calculator use?" is taken at its proposed default (official rate, with a typed price as the way round it) and listed under "Final" for Zubair to confirm.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `zakat-calculator`: adds naira as an offered currency, widens the "all rates valid" rule from four currencies to five, and adds user-typed prices per gram.

## Impact

- `src/utils/zakat.js`, `src/stores/zakat.js`, `src/views/pillar/ZakatView.vue`, `src/components/ZakatPriceStatus.vue` and their tests.
- `Spec.md` section 5.4, `CHANGELOG.md`, the changelog page, `Features.md`.
- No new dependency, no new outside address, nothing new stored on the device.

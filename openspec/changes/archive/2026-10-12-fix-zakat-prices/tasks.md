# Tasks

## 1. Conversion and calculation

- [x] 1.1 Create `src/utils/zakat.js` with `perGram(usdPerOunce, rate)` and `src/utils/zakat.test.js` covering the dollar and pound scenarios in the spec (4,000 per ounce gives 128.60 per gram; times 0.75 gives 96.45), and verify the file passes
- [x] 1.2 Add `calculateZakat(amounts, prices, nisabMethod)` returning group totals, gross, net, nisab, whether Zakat is due, the amount and capped progress, with tests for: nothing entered; one kind of wealth; several kinds with debts; exactly at the nisab; one penny under; debts larger than wealth; 22-carat gold; gold, silver and a direct value together; the gold and silver nisab methods. Verify the tests pass
- [x] 1.3 Add `parsePrices(reply)` with tests for: a full valid reply (metals as reciprocals of `xau` and `xag`, rates and date read); missing `xau`; `xau` of zero, a negative number, text and `null`; valid metals with one of the four rates missing; a reply that is not an object. Verify the tests pass

## 2. Store

- [x] 2.1 Fetch the dataset once and write its gold, silver, GBP, EUR and SAR figures and date into `src/stores/zakat.js` as the built-in values on the dollar base, and verify the built-in pound price of gold equals `perGram` of the built-in figures by hand
- [x] 2.2 Replace `goldGBP`, `silverGBP`, `FX` and `pricesLive` with `usdPerOunce`, `rates`, `metalsFetched`, `ratesFetched` and `pricesDate`; add `pricePerGram(metal, currency)`; compute `goldLocal`, `silverLocal` and `nisabValue` from it; remove `fetchFX`. Verify `grep` finds no remaining use of the removed names anywhere in `src/`
- [x] 2.3 Rewrite `fetchPrices` to try the jsDelivr address with `cache: 'no-cache'` and then the mirror, each with a six-second limit, using `parsePrices`, never throwing, and setting the two flags and the date
- [x] 2.4 Create `src/stores/zakat.test.js` with a stand-in `fetch`, covering: first source succeeds; first fails and the second succeeds; both fail (built-in values, both flags false); a source that never answers is abandoned at the limit; valid metals with a missing rate (fetched metals, built-in rates); the price in pounds after a successful fetch equals the dollar price per gram times the pound rate; switching through all four currencies and back returns the first price; the nisab shown equals the nisab `calculateZakat` uses. Verify the tests pass
- [x] 2.5 Add a test that the request address and options contain no amount from the form, and verify it passes

## 3. Page

- [x] 3.1 Create `src/components/ZakatPriceStatus.vue` and its test, covering the four states: loading; fetched prices with their date; reference prices with their date and advice to check; fetched metals with reference rates. Verify the tests pass
- [x] 3.2 In `src/views/pillar/ZakatView.vue`, replace the computed totals with one `calculateZakat` call and the two "live / reference" badges with `ZakatPriceStatus`, and verify in `npm run dev` that every figure the page showed before is still shown and that entering 100 g of 22-carat gold gives the weight times 0.9167 times the gold price shown
- [x] 3.3 Update the price source credit on the About page from metals.live to the new source, and verify the page names it
- [x] 3.4 Confirm the Inheritance, Prayer and Fasting pages still work with the store (`fmt`, currency, `requestLocation`), and verify each loads in `npm run dev` with no console error

## 4. Configuration

- [x] 4.1 In `netlify.toml`, add `https://cdn.jsdelivr.net` and `https://latest.currency-api.pages.dev` to `connect-src` and remove `https://api.metals.live` and `https://api.frankfurter.app`, and verify `script-src` is unchanged

## 5. Checks with the network on

- [x] 5.1 Build the site, serve it with `npm run preview`, open every static route in a headless browser, and verify no page logs a CORS error or a blocked request, and that the Zakat page shows the day's prices marked as current
- [x] 5.2 Fetch the dataset and `api.gold-api.com` together, and verify the gold nisab the calculator gives in pounds, dollars, euros and riyals is each within 1% of 85 g at the live spot price converted at the day's rate. Record the eight figures in the pull request description or the changelog entry
- [x] 5.3 Work out by hand the value of 100 g of 22-carat gold in pounds from the day's price, and verify it matches the page to the penny
- [x] 5.4 Block both price addresses (for example by serving the site with the network off) and verify the Zakat page loads, shows reference prices with their date, logs no uncaught error, and still gives a result

## 6. Documentation

- [x] 6.1 Update `Spec.md`: the Prices paragraph in section 5.4 (source, base, the two flags, the date, the built-in values and their date); the two service rows in section 7; and remove the "Neither price service works" and "Zakat FX rates mix two bases" entries from Known gaps. Verify neither entry remains and no line mentions metals.live or frankfurter as current
- [x] 6.2 Add a Fixed entry to `CHANGELOG.md` and the changelog page saying prices are current again, that results will have changed, and by roughly how much for the gold and silver nisab in pounds. Verify the page shows it in `npm run dev`
- [x] 6.3 Update `Features.md`: bring feature 5's text in line with what was built, and change feature 6's second bullet to say the service already covers the naira. Verify both

## 7. Final checks

- [x] 7.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build`, fix anything reported, and verify all four finish with no errors and format changes no files
- [x] 7.2 Run the suite with the network blocked and verify every test passes, confirming no test reaches a price service
- [x] 7.3 Tick "5. Zakat exchange rates" in the `Features.md` progress list once 5.1 to 5.4 are verified, and verify the box is ticked and no other box changed

## Notes

- Zubair chose daily prices over live spot, and accepted that every visitor's result changes and that the dataset has one maintainer (12 October 2026).
- Task 5.2, measured on 12 October 2026 at 16:31 UTC. The dataset's gold was $4,186.27 per ounce and live spot (`api.gold-api.com`) was $4,164.40. Gold nisab from the calculator against 85 g at live spot: GBP 8,643.47 against 8,598.31; USD 11,440.29 against 11,380.52; EUR 10,214.14 against 10,160.78; SAR 42,901.08 against 42,676.95. Each differs by 0.53%. These figures are recorded here instead of in the changelog entry, which would be too long with them; they belong in the pull request description.
- Task 5.3: 100 g of 22-carat gold in pounds is 100 × 0.9167 × £101.6879 = £9,321.73 by hand, and the page showed £9,321.73.
- Task 5.4: with both price addresses blocked, the page showed reference prices from 12 October 2026, gave a result, and logged only the browser's own two "failed to load resource" lines.

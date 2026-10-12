# Design

## Context

See `proposal.md` for motivation. What the code does today (`src/stores/zakat.js`, `src/views/pillar/ZakatView.vue`, `src/App.vue`):

- The store holds `goldGBP` and `silverGBP` (pounds per gram) and an `FX` table that starts on a **pound** base (`GBP: 1, USD: 1.294, EUR: 1.167, SAR: 4.851`). The price in the selected currency is `goldGBP × FX[currency]`.
- `fetchFX` overwrites `GBP`, `EUR` and `SAR` with **dollar**-based rates and leaves `USD` at its pound-based 1.294. After a successful fetch, pounds would be `goldGBP × 0.75`.
- `fetchPrices` asks `api.metals.live` for gold and silver, then calls `fetchFX`. On failure it sets gold to £113.42 and silver to £1.07 per gram.
- `App.vue` awaits `fetchPrices()` on start, behind the loading screen, on every page.
- All the arithmetic (group totals, net, Zakat due, progress towards the nisab) is in computed properties inside `ZakatView.vue`.
- The page shows one badge, "live" or "reference", from a single `pricesLive` flag.
- The Inheritance page uses the store only for `fmt`, `sym` and the currency. The Prayer and Fasting pages use its `requestLocation`.

What I measured on 12 October 2026:

| Service | Result |
|---|---|
| `api.metals.live` | TLS handshake fails; no reply |
| `api.frankfurter.app` | 301 to `api.frankfurter.dev` with no CORS header, so a browser blocks it. The new address answers, but only with EUR and GBP: no SAR, no NGN |
| currency-api on `cdn.jsdelivr.net` | 200, `access-control-allow-origin: *`; one reply holds GBP, EUR, SAR, NGN, and gold (`xau`) and silver (`xag`) as ounces per dollar; dated daily |
| Its mirror on `latest.currency-api.pages.dev` | 200, same data, `access-control-allow-origin: *` |
| `api.gold-api.com` | 200, `access-control-allow-origin: *`; live spot gold $4,166.10, silver $60.47 per ounce |
| `open.er-api.com` | 200, CORS; GBP, EUR, SAR, NGN; no metals; attribution required |

Because both current services fail, `fetchFX` never succeeds, so the mixed-base bug is not what visitors see today. They see the built-in £113.42 and £1.07. Against the day's prices (gold about £101.20 per gram, silver about £1.47) the gold nisab is about 12% too high and the silver nisab about 27% too low.

## Goals / Non-Goals

**Goals:**
- Correct prices in every currency, with one base and one conversion.
- A source that works from a browser today and covers what feature 6 needs.
- The calculation testable without mounting a page.
- The page never blocked or broken by a price service.

**Non-Goals:**
- Minute-by-minute prices. One price per day is enough to work out Zakat.
- Naira, typed-in prices, remembering prices between visits, or moving the fetch off app start.
- Changing which nisab weights or purities are offered.

## Decisions

### One source for metals and rates: the currency-api dataset
A single request to `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json` returns everything needed, on a dollar base, with a date. Gold and silver arrive as ounces per dollar, so the dollar price per ounce is the reciprocal (`1 / xau`).

- It needs no key and has no stated request limit.
- It is one request and a few kilobytes, which matters for visitors on costly connections.
- It includes the naira, so feature 6 adds a currency without changing service.
- The project publishes a mirror for exactly this purpose, which becomes the second attempt.

Alternatives:

- *`api.gold-api.com` for metals plus a rates service.* Live spot prices, but three requests to two unrelated providers, and the last small free metals service this site relied on is the one that just disappeared. Kept in reserve: it is the independent source the done check compares against.
- *`api.frankfurter.dev` for rates.* Does not carry SAR or NGN.
- *`open.er-api.com` for rates.* Covers the currencies but not metals, and requires an attribution link.
- *A serverless proxy that caches prices.* The right long-term home, and the project's spec already anticipates it, but it would make this fix the project's first backend code. Feature 13 introduces that.

On the day measured, the dataset's gold figure was 0.5% above the live spot price, inside the feature's 1% done check.

### jsDelivr is asked to revalidate
jsDelivr serves `@latest` with a browser cache lifetime of a week. The request is made with `cache: 'no-cache'`, which makes the browser check with the server each time and reuse its copy only if unchanged. The mirror already sends `max-age=0`.

### State on a dollar base
The store holds:

- `usdPerOunce`: `{ gold, silver }`
- `rates`: `{ USD: 1, GBP, EUR, SAR }`, units of the currency per dollar
- `metalsFetched` and `ratesFetched`: booleans
- `pricesDate`: the date of the prices in use, fetched or built in

`pricePerGram(metal, currency)` returns `usdPerOunce[metal] / 31.1035 × rates[currency]`. `goldLocal`, `silverLocal` and `nisabValue` are computed from it, so their names and meaning are unchanged for the page. `goldGBP`, `silverGBP`, `FX`, `pricesLive` and `fetchFX` are removed; nothing outside the store and the Zakat page reads them.

- *Alternative: keep pounds as the base and fix `fetchFX`.* Rejected: metal prices arrive in dollars, so a pound base means converting on the way in and again on the way out, which is how the bug arose.

### Pure functions in `src/utils/zakat.js`
- `perGram(usdPerOunce, rate)`: the conversion.
- `parsePrices(reply)`: takes the source's reply and returns `{ usdPerOunce, rates, date }`, with `usdPerOunce` or `rates` set to `null` when any needed value is missing, zero, negative or not finite. Metals and rates are judged separately, which is what makes two flags meaningful with one source.
- `calculateZakat(amounts, prices, nisabMethod)`: takes the entered amounts and per-gram prices and returns the group totals, gross, net, nisab, whether Zakat is due, the amount, and progress towards the nisab capped at 100.

`ZakatView.vue` keeps its form fields and replaces its dozen computed properties with one call. The store keeps the fetching, since that is where shared state and outside requests live.

Money is compared in the smallest unit: "exactly at the nisab" and "one penny under" are tested with values chosen so floating-point rounding cannot decide the outcome, and the comparison is made on amounts rounded to two decimals, which is also what the page displays.

### Fetching: two attempts, each with a time limit
`fetchPrices` tries the jsDelivr address, then the mirror, each with `AbortSignal.timeout(6000)`. The first reply that parses with valid metals wins. If neither gives valid metals, the built-in values stay. Rates are taken from the same reply when valid, otherwise the built-in rates stay. Nothing throws out of the function; `App.vue` goes on awaiting it as before.

All four currencies' rates must be valid for fetched rates to be used. Mixing a fetched pound rate with a built-in euro rate would be a small version of the bug being fixed.

### Built-in values are dated
The fallback is the dataset's own figures on the day this is built, written into the store with that date. The page shows the date, so a visitor on fallback prices can see how old they are. They will age; that is inherent, and saying so on the page is the mitigation.

### A small component states what the prices are
`src/components/ZakatPriceStatus.vue` takes the two flags, the date and the loading state, and renders the note: current prices for a date, reference prices from a date with advice to check the current price, or current metals with reference rates. It replaces the two "live / reference" badges' logic and is small enough to test by mounting. The existing badge styles are reused.

### Content security policy
`connect-src` gains `https://cdn.jsdelivr.net` and `https://latest.currency-api.pages.dev` and loses `https://api.metals.live` and `https://api.frankfurter.app`. `script-src` is unchanged: jsDelivr is allowed for data requests only, not for loading scripts.

### Tests
- `src/utils/zakat.test.js`: conversion, reply checking, and the calculation, covering every scenario in the spec that does not need a network.
- `src/stores/zakat.test.js`: `fetch` replaced with a stand-in; first source succeeds, first fails and second succeeds, both fail, a timeout, valid metals with a missing rate, and the round trip through all four currencies.
- `src/components/ZakatPriceStatus.test.js`: the four states of the note.
- A check that the request URL and options contain nothing from the form.

### Checks that need the network
Done once at build time, outside the suite: fetch the dataset and `api.gold-api.com` at the same moment and confirm the gold nisab in all four currencies is within 1% of 85 g at the live spot price; and open every page of the built site in a headless browser and confirm no blocked request is logged. The header that matters for CORS comes from the service, not from Netlify, so a local build is a fair test.

## Risks / Trade-offs

- **The dataset is maintained by one person** → It is widely used, served by two independent hosts, and the built-in dated fallback covers an outage. The proxy in feature 13 is the place to add a second provider if this one proves unreliable.
- **Daily prices can differ from the price at the moment of use** → Typically well under 1%. The page gives the date, and feature 6 lets the user type their own price.
- **The dataset's gold figure is not an exchange quote** → It tracked spot to 0.5% on the day measured. The done check compares against an independent live source.
- **jsDelivr appears in the content security policy** → Only under `connect-src`. Scripts still load from the site alone.
- **Every visitor's result changes** → That is the fix. The changelog says so, with the size of the change.
- **Built-in prices age** → Dated on the page. Feature 12 keeps the last fetched prices on the device, which shortens how often the fallback is seen.
- **The fetch still runs on every page at start** → Unchanged here; feature 10 moves it. With a working source it is one small request, and the time limit stops it holding the loading screen.

## Migration Plan

Nothing is stored, so there is nothing to migrate. To roll back, revert the commit; the calculator returns to its old built-in prices.

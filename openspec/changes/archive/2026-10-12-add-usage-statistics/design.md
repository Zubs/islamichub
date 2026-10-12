# Design

## Context

See `proposal.md` for motivation. What exists and what I checked:

- The rule being changed appears in `Spec.md` section 9 ("No analytics or tracking"), `CLAUDE.md` ("No analytics, no tracking and no accounts"), `CONTRIBUTING.md` ("No analytics, no tracking, no accounts") and the About page ("No accounts, no tracking, no data storage").
- The content security policy allows scripts from the site only (`script-src 'self' 'unsafe-inline'`) and connections to four named addresses.
- Routing is Vue Router with clean URLs; `src/router/index.js` has no navigation hook yet.
- Where the five actions happen: `calculate()` in `PrayerView.vue`; the computed result in `ZakatView.vue` and in `InheritanceView.vue`; `completeCategory()` in `stores/adhkar.js`; the target check in `tap()` in `stores/tasbih.js`.
- Environment variables are read through `import.meta.env`; `.env.example` and the README list one today.

What I read about GoatCounter on its own site and in its script (12 October 2026):

| Point | Finding |
|---|---|
| Terms | "Offered for free for reasonable public usage"; a personal site or small-to-medium business is fine |
| What it stores | Path, title, referrer, browser and system from the browser's headers, location from the IP address, screen width. A site can turn off collecting any of these |
| IP addresses | Not stored. Site, IP and browser type are held in memory for up to eight hours, mapped to a random ID, to count visits |
| In the browser | States it stores nothing: no cookies, no `localStorage` |
| Its script, `count.js` | 9.2 KB, 3.3 KB compressed. Always sends the address's query string (`q: location.search`); sends the full referring address unless overridden; takes the path from the page's canonical link; does not check Do Not Track; reads `localStorage` for its own opt-out flag |
| How a hit is sent | `navigator.sendBeacon` to `https://<code>.goatcounter.com/count` with the fields as a query string, falling back to an image request |
| Law | Its terms leave compliance with local data laws to the site owner |

## Goals / Non-Goals

**Goals:**
- Answer three questions: how much traffic, from where, and which tools are used.
- Make it structurally hard to send anything a visitor entered.
- Add no third-party code and no weight worth measuring.
- Off by default everywhere except the configured live site.

**Non-Goals:**
- Unique-visitor tracking across days, funnels, or session replays.
- A consent banner. The design collects nothing identifying; whether that is enough in law is recorded as Zubair's decision.
- Queuing counts made offline.

## Decisions

### GoatCounter, as proposed in `Features.md`
It is open source, stores no IP address, sets nothing in the browser, counts named events, and is free for a site of this kind. It can also be self-hosted later without changing the site's code, since only the counting address would change.

- *Netlify Analytics.* No script and no request from the browser at all, which is the most private option, but it is paid and counts pages and sources only. It cannot answer "which tools are used" for tools that share a page, such as prayer times and Qibla.
- *Plausible.* Comparable to GoatCounter; paid.
- *A Netlify function writing to the project's own store.* No third party at all, but it would be the project's first backend code and first stored data, ahead of feature 13.

### The site sends the request itself; the service's script is not loaded
The counting request is one `navigator.sendBeacon(url)` call to the configured address, built by the site's own code. The service's `count.js` is not used, for four reasons found by reading it:

1. It always sends `location.search`. The site promises not to send query strings.
2. It sends the full referring address by default. The site sends the host name only.
3. It reads the path from the canonical link. Canonical links are wrong on several routes today (a known gap that feature 9 fixes).
4. Loading it means adding an outside address to `script-src` and running outside code on pages where people type their finances. Sending the request ourselves needs only one address in `connect-src`.

The request carries: `p` (path), `t` (title), `r` (source name, first page view only), `e` (true for an action), `s` (screen width), `b` (the automated-browser marker the service expects) and a random value to defeat caching. These are the service's documented fields; nothing else is added.

The service still sees the IP address and browser headers of the request, as any server does, and derives country, browser and system from them. That is disclosed on the About page.

### Two modules: pure decisions, and sending
- `src/utils/stats.js` holds pure functions with no browser access, so every rule is testable with plain values:
  - `ACTIONS`: the fixed list of five names.
  - `sourceName(referrer, ownHost)`: the host name of an outside referring address, or empty.
  - `shouldCount({ endpoint, hostname, liveHost, doNotTrack, globalPrivacyControl, optedOut })`: the single yes or no.
  - `hitUrl(endpoint, { path, title, source, action, screenWidth, random })`: the request address.
- `src/composables/useStats.js` reads the browser (`navigator`, `location`, `localStorage`), and exports `countPage(route)`, `track(name)`, `setOptOut(on)` and `isOptedOut()`. It follows `useHadithApi.js`, the existing module in that folder that talks to an outside service.

`track(name)` takes one argument. It returns without sending if the name is not in `ACTIONS`. There is no parameter through which a value could travel, which is the guarantee the spec asks for; a test also asserts the function's length is 1.

### Page views from one router hook
`router.afterEach` calls `countPage(to)` when the path differs from the previous one. The first call of a visit includes the source name; later calls do not. Titles are read on the next tick, after the page has set its own.

### Actions are counted at the point they happen, once
- Prayer times: in `calculate()` in `PrayerView.vue`.
- Zakat and inheritance results: a watcher that fires the first time a result exists during that page visit.
- Adhkar: in `completeCategory()`, inside the branch that records a new completion, so a repeat on the same day counts nothing.
- Tasbih: in `tap()`, beside the existing vibration, when the count equals the target.

Calling `track` from the two stores is the one place state code reaches the sending module. It is a single line each and keeps "once per completion" tied to the same condition that records it.

### Counting is off unless every condition holds
`shouldCount` returns true only when: `VITE_STATS_ENDPOINT` is set; the page's host name equals the live host (`islamichub.xyz`); Do Not Track is not `"1"`; Global Privacy Control is not on; and the visitor has not opted out. Tests run on `localhost` with no endpoint, so nothing in the suite can send. A fork that does not set the variable sends nothing, and cannot send to Zubair's counter by accident.

- *Alternative: read Netlify's build context to detect previews.* Not needed; the host name check covers previews, local use and any other copy.

### The opt-out is a stored preference
"Don't count my visits" stores `stats-opt-out` = `1` in `localStorage`, and removes the key when turned off. It is read through a guarded access so a browser that blocks storage still works; in that case the choice lasts for the visit. A small `StatsOptOut.vue` component on the About page holds the switch, beside the text describing what is counted.

### The WhatsApp source tag
An arriving address with `?src=<name>` (letters, digits and hyphens only, 20 characters at most) sets the source to that name. The tag is then removed with `history.replaceState`, so it is not copied onward and is not sent as a query string. Nothing on the site makes such links until feature 22; this change specifies and tests the receiving side only.

### Content security policy
`connect-src` gains the one counting host, `https://<code>.goatcounter.com`, once Zubair has the code. `script-src` and `img-src` do not change, because no script is loaded and the image fallback is not used: if `sendBeacon` is unavailable, the hit is dropped.

### What Zubair has to do
Create the GoatCounter site, give its counting address, set `VITE_STATS_ENDPOINT` in Netlify, and after a day of traffic confirm the dashboard shows pages, sources, countries and the five actions. The build can be completed and tested without the account; only the live check waits on it. In the service's settings, the collection of anything he does not want (for example region below country level) can be turned off.

## Risks / Trade-offs

- **The project reverses a public promise** → The About page and all four documents are changed in the same release, in plain words, with the switch beside them.
- **A third party receives visitors' IP addresses in transit** → Disclosed. The service states it does not store them. Self-hosting or Netlify Analytics remain available if that is not acceptable.
- **A legal duty to ask first may apply in some places** → Not settled here. The design avoids cookies, identifiers and personal data, which is the basis on which such tools are usually run without a banner, but that is Zubair's decision to make.
- **Building our own request means following the service's wire format** → It is a handful of documented query fields. A test pins the format, and the live check confirms hits arrive.
- **Visitors with blockers or Do Not Track are not counted, so totals read low** → Accepted. The numbers are for direction, not accounting.
- **A future contributor passes a value into `track`** → The function takes one argument and refuses unknown names; the lint-level guard is a test on its signature plus the fixed list.
- **The free service could change its terms or close** → Only the counting address is specific to it. Nothing else in the site depends on it.

## Migration Plan

Deploy with the variable unset: nothing is counted and the new About text is not yet shown as active. Set `VITE_STATS_ENDPOINT` and redeploy to start counting. To stop, unset the variable and redeploy; to roll back fully, revert the commit and restore the four documents' wording.

## Open Questions

- Which of the service's optional data (region, language) Zubair wants collected. It is a setting on the service's side and changes nothing in the site.

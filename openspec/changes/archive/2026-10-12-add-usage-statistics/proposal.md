# Proposal

## Why

Nobody can say how many people use IslamicHub, where they come from, or which tools they use, so decisions such as which language to add first or which feature to build next are made blind. This is feature 34 in `Features.md`. It reverses a rule the project states in four places ("no analytics, no tracking"), so it has to be done in a way that keeps the promise behind that rule: what a visitor enters stays on their device, and nobody is followed.

## What Changes

- **The rule changes**, from "no analytics, no tracking" to "no tracking of people: anonymous counts only". `Spec.md` section 9, `CLAUDE.md`, `CONTRIBUTING.md` and the About page are updated to say exactly what is counted and how to turn it off.
- **Page views are counted** by address, with the referring site's name, sent to GoatCounter, a cookieless statistics service.
- **Five named actions are counted**, to show what is used: prayer times shown, a Zakat result reached, an inheritance result reached, an adhkar category completed, and a tasbih target reached.
- **No third-party script is loaded.** The site sends its own small request to the service's counting address. The service's own script would send the address's query string and the full referring address, and would run someone else's code on pages where people enter their finances.
- **Nothing a visitor enters can be sent.** One function, `track(name)`, accepts only names from a fixed list and takes no other argument.
- **Nothing is stored to recognise a visitor**: no cookie, no identifier.
- **Do Not Track and Global Privacy Control are honoured**, and the About page gains a "Don't count my visits" switch.
- **Counting is off unless configured.** It runs only on the live site's address and only when `VITE_STATS_ENDPOINT` is set, so local development, tests, deploy previews and forks send nothing.
- The content security policy allows the one counting address.

Changed from `Features.md` as written:

- "A hadith chapter opened" is dropped as an action. It is already a page view of that chapter's address.
- The "5 KB script" limit becomes "no third-party script at all".
- The WhatsApp source tag is specified here, but nothing produces tagged links until feature 22 is built.

Out of scope:

- Any account, sign-in or per-visitor history.
- Counting searches, filters, amounts, locations or which hadith a visitor reads beyond the page address.
- A statistics page inside the site. The numbers are read on the service's own dashboard.

## Capabilities

### New Capabilities
- `usage-statistics`: what the site counts about its use, what it must never send, when it does not count at all, and what visitors are told.

### Modified Capabilities

None.

## Impact

- **Visitors:** one small request per page view and per counted action, sent after the page is usable. No visible change apart from the About page's privacy text and switch.
- **Privacy:** the service sees each request's IP address and browser type, as any server does. It states that it never stores them and holds a scrambled form in memory for up to eight hours so the same visit is not counted twice. The About page says this.
- **Code:** new `src/utils/stats.js` (pure) and `src/composables/useStats.js` (sending); a hook in `src/router/index.js`; one `track` call each in the Prayer, Zakat and Inheritance pages and the adhkar and tasbih stores; a switch component on the About page.
- **Stored on the device:** one new key, `stats-opt-out`, holding the visitor's choice. It is a preference, not an identifier.
- **Configuration:** `netlify.toml` content security policy; a new `VITE_STATS_ENDPOINT` variable in `.env.example` and in Netlify's settings.
- **Outside services:** one added, the site's own GoatCounter address.
- **Needs Zubair:** a GoatCounter account and site code, the variable set in Netlify, and the final check on the service's dashboard after a day of traffic.
- **Dependencies:** none added.
- **Docs:** `Spec.md` sections 6, 7 and 9; `CLAUDE.md`; `CONTRIBUTING.md`; `README.md`; `CHANGELOG.md`; `Features.md`.

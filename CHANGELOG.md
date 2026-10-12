# Changelog

All notable changes to IslamicHub are documented here.

---

## Unreleased

### Added
- **Share to WhatsApp** *(Hadith, duas and adhkar)* — Every hadith, dua and dhikr now has a Share button. It makes an image card on your own device, with the Arabic, the translation, the source and the site's address, and opens your phone's share sheet so WhatsApp is one tap away. Where a browser cannot share images you can save the card or send the text. Nothing is uploaded. Shared links now show a proper title and picture when pasted into a chat.
- **Your day on the home page** *(Home page)* — The home page now opens with a "Today" panel: the next prayer and how long until it, today's five prayers, the adhkar you have completed, your tasbih count, the hadith of the day, and in Ramadan today's fast. Each part is one tap from its page. It is built from what is already kept on your device and sends nothing anywhere.
- **Fasting tracker** *(Fasting page)* — The Fasting page can now record your fasts: fasted or missed for each day of Ramadan, and made-up or voluntary fasts for the rest of the year. It shows how many missed fasts are still to be made up, for each Ramadan separately, and lets you set the day Ramadan began where you are. Everything stays on your device.
- **Prayer tracker** *(Tracker)* — A new tracker lets you mark each of the five daily prayers as on time, late or missed, see the last seven days and the month at a glance, correct past days, and keep a streak. With a remembered location it shows each prayer's time. Everything stays on your device, and "Clear my data" removes it.
- **Duas for everyday situations** *(Duas)* — A new Duas section holds 46 supplications from the Qur'an and the Sunnah for travel, eating, home, the mosque, clothing, weather, distress, illness, forgiveness, and parents and family. Each has its Arabic text, transliteration, translation and source, with hadith sources linked to the library. You can search them in English or by transliteration, and link straight to any one of them.
- **Hadith of the day** *(Home page)* — The home page now shows one short hadith from Sahih al-Bukhari each day, with its narrator and a link to the full hadith. It changes at your own midnight and works with no connection.
- **Hadith references are now links** *(Whole site)* — Every hadith reference on the site, on the pillar pages, the Articles of Faith, the adhkar, the Tasbih and Inheritance pages, now links to that hadith in the library, so a claim can be checked in one tap.
- **Every hadith has its own page** *(Hadith library)* — Each hadith can now be opened at its own address, with its Arabic text, translation, narrator, grade, book and chapter, and links to the previous and next hadith. It can be copied or shared, and every hadith in a chapter list links to its page.
- **Install IslamicHub and use it offline** *(Whole site)* — IslamicHub can now be installed on a phone from the browser, and after one visit every page opens with no connection. Prayer times (with a remembered location), the Qibla, adhkar and the tasbih counter work fully offline. Hadith books and chapters you have already opened are kept; the Zakat page uses the last prices it fetched and says how old they are. When a new version is released, an open page offers "Update available" instead of changing under you.
- **Remember my location** *(Prayer and Fasting pages)* — Once prayer times are shown you can choose to remember the location, calculation method and Asr method. Later visits to the Prayer and Fasting pages then show today's times straight away. It is saved on your device only, never sent anywhere, and "Forget my location" removes it. Coordinates outside the valid range are now refused.
- **Hanafi Asr time** *(Prayer page)* — A new selector beside the calculation method chooses how Asr is timed: Standard (when an object's shadow equals its length, followed by the Shafi'i, Maliki and Hanbali schools) or Hanafi (twice its length). Standard remains the default. Changing it, or the calculation method, now updates the times and the countdown straight away.
- **Naira in the Zakat calculator** *(Zakat page)* — Zakat can now be worked out in Nigerian naira (₦). Naira prices use the official exchange rate, and the page says so. Because a local dealer's price can differ, you can also type your own price per gram for gold and for silver, in any currency; it replaces the fetched price for both the calculation and the nisab, and the page shows that it is in use.
- **Anonymous usage statistics** — The site now counts page views (by path, no query strings), the referring site's name, and five named tool actions (prayer times shown, Zakat result reached, inheritance result reached, adhkar category completed, tasbih target reached). Statistics are sent to GoatCounter, a cookieless, open-source service, only on the live site and only when configured. Do Not Track and Global Privacy Control are honoured; an opt-out switch is on the About page. Nothing a visitor enters (amounts, coordinates, heirs, search text) is ever included in a counting request. No cookies, no identifiers, no fingerprinting.
- **Automated test suite** — Vitest with Vue Test Utils and jsdom. `npm test` runs every test once and `npm run test:watch` re-runs them on change. First tests cover prayer times (checked against a published London timetable for all five methods), the Qibla bearing and distance, Hijri date conversion, and the adhkar and tasbih stores. Netlify now runs the tests before building, so a failing test stops a deploy.
- **Licence** — IslamicHub is now licensed under the GNU General Public License, version 3.

### Changed
- **The hadith library's key is no longer public** *(Hadith library)* — The hadith library now asks the site's own server for books, chapters and hadiths, and the server adds the API key. The key used to be readable in the site's code. Replies are cached for a day, so pages you have opened load faster.
- **Lint and format pass across the project** — Fixed the seven existing lint errors (unused variables and parameters) and formatted every file in `src/` with Prettier. No change to any calculation.
- **README and contribution guide rewritten** — Both now describe the Vue and Vite project: setup, scripts, the folder layout, how to add a page or content, the content rules and the pull request steps. An automated check fails if either names a command, file or folder that does not exist. The old copy of the guide published at `/CONTRIBUTING.md` is removed.

### Removed
- **Leftovers from the old app** — The broken web manifest (its icons did not exist), the stale copy of this changelog published at `/CHANGELOG.md`, a console line that logged the length of the hadith API key, an undeployed redirects file, and three unused development dependencies. A proper manifest returns with offline support.

### Fixed
- **Visits from shared links are counted as such** *(Usage statistics)* — A link shared from the site carries a short tag so the visit can be counted as coming from WhatsApp. The code that read the tag never ran; it does now, and the tag is removed from the address bar after it is counted.
- **Adhkar counts are kept if you reload** *(Adhkar)* — Counts on adhkar cards used to vanish if the page was reloaded or closed part-way through. They are now kept on your device for the day, so you can leave and carry on where you stopped, and each new day starts clean. Completing a category also now clears the counts of its multi-part adhkar.
- **Three hadith citations corrected** *(Faith, Hajj and Inheritance pages)* — While linking every citation, each was compared with its source. The hadith on Surah al-Ikhlas being a third of the Qur'an is now cited as Sahih Bukhari 5013, and Hajj on behalf of someone who has died as Sahih Bukhari 1852. The Inheritance page quoted a narration that is not in the two collections it named; it now quotes Sahih Bukhari 6732, also found in Abu Dawud 2898.
- **No more two-second wait on every page** *(Whole site)* — Every visit used to sit behind the loading screen for at least two seconds while gold prices were fetched, even on pages that never use them. The loading screen now clears as soon as the page is ready, and prices are fetched only when the Zakat page is opened, once per visit.
- **Every page now has a correct canonical link** *(Search engines)* — Titles, descriptions and canonical links are now set one way on every page. The hadith, adhkar, tasbih and Articles of Faith pages had no canonical link, and the sitemap was missing the adhkar, tasbih and Articles of Faith pages; both are corrected, and a test keeps the sitemap in step with the pages that exist.
- **Inheritance shares corrected** *(Inheritance calculator)* — The calculator was rebuilt and several results have changed. A sister now shares with a brother, two parts to one, instead of receiving nothing. A granddaughter beside one daughter now receives her sixth. Residuary heirs follow one order of priority. A remainder with no residuary heir now returns to the fixed-share heirs other than the spouse, so a wife beside one daughter takes 12.5%, as her 1/8 label always said, not 20%. Parents take a sixth beside any child, a father beside daughters only takes a sixth plus the residue, a sister beside a daughter takes the residue (Sahih al-Bukhari 6736), and two grandmothers share one sixth. Every line now names the rule behind it, amounts always add up to the estate to the penny, and impossible input (a husband and a wife together, more than four wives) is refused with a message. The result remains a guide, not a ruling.
- **Zakat prices are current again, and results have changed** *(Zakat page)* — Both services the calculator fetched prices from had stopped working, so it was using old built-in prices: in pounds the gold nisab showed about £9,641 where the day's price gave about £8,640, and the silver nisab about £637 where it should have been about £880. Gold, silver and exchange rates now come from one daily source, with a second address to fall back on. A hidden bug that would have made pound prices about 24% too low once prices loaded is fixed with it: every price now converts through one US dollar base. The page states the date its prices are from, and says so when it has to use reference prices.
- **"No chapters match" never showed** *(Hadith book page)* — The message for a chapter filter with no results sat in a branch that could never run. It now shows when a search matches no chapter.
- **The day now changes at your own midnight** *(Adhkar and Tasbih)* — Completions, streaks and daily totals were filed by the UTC date, so the day turned over at 1am in Lagos and in the evening in New York. They now follow the device's local date. Entries made before this change keep the date they were saved under, so a streak may shift by one day, once.
- **Visitors stuck on the old version are moved to the current site** — The old app registered a service worker between 26 May and 5 June 2026 that kept serving its own cached pages, and the site gave browsers no way to replace it. A small replacement worker now clears those caches and removes itself on the visitor's next visit, and the page reloads once.
- **Repository links** — Links to the source, the issues page and the contribution guide now use the repository's current address.
- **Unreadable saved data no longer breaks the page** *(Adhkar and Tasbih)* — Saved data of an unexpected kind is now read as empty instead of causing an error.

---

## v1.1 — Design & Content Polish *(April 2026)*

### Added
- **Calligraphy grid background** — Faint Islamic 8-pointed star geometric pattern (two overlapping squares at 45°, connected by cardinal lines, with a gold diamond at each centre) tiled at 100×100 px on the site body and preloader. Uses `background-attachment: fixed` so it behaves as a fixed wallpaper behind scrolling content.
- **Amiri Arabic font** — Added the *Amiri* Naskh-style typeface (Google Fonts) for all Arabic text via a new `--arabic` CSS variable. Previously, Arabic characters fell back to the Latin-only Cormorant Garamond font with no Arabic-specific rendering.
- **Scroll-triggered animations** — `IntersectionObserver`-based fade-up reveal on all major content blocks (Qur'an blocks, hadith blocks, card grids, timelines, FAQ lists, CTA strips). 70 ms stagger between elements. Wired via a new `router.afterRender` hook so animations re-run on every page navigation.
- **Page header entrance animation** — `.page-header-inner` fades up on every route load.
- **Changelog page** — New route `#/changelog` documenting every change, accessible from the footer and mobile menu.

### Changed
- **Page headers taller** — Padding increased from `48px/32px` to `64px/48px`. Heading font scaled from `clamp(2rem,4vw,3rem)` to `clamp(2.5rem,5vw,3.8rem)`. Sub-text bumped to 17.5 px.
- **Global font size** — Base raised from 16 px to 17 px, scaling all `rem` units. Additional explicit bumps: prose 17 px, section-sub 17.5 px, hadith text 16 px, Qur'an translation 16 px, hero body 18 px.
- **Preloader redesigned** — Bismillah (`بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم`) in Amiri at 2.4 rem leads the screen. Gold ornament divider, geometric logo, and app name in Amiri below. All elements stagger in via `fadeUp` keyframe animation. Minimum display time enforced at 2.8 s.
- **Qur'an translation legibility** — `.quran-trans` was `rgba(255,255,255,.62)` — near-invisible on both dark and light backgrounds. Now context-aware: `var(--muted)` (dark grey) on light `.frame-calligraphy` blocks; `rgba(255,255,255,.88)` on dark-only `.quran-block` elements.
- **Quran block Arabic font** — `.quran-arabic` and `.frame-calligraphy > .quran-arabic` now use `var(--arabic)` (Amiri) instead of `var(--serif)` (Cormorant Garamond).

### Fixed
- **Prayer times — Asr calculation broken** *(Prayer page)* — A stray negative sign on `asrAngle` caused `cos(hourAngle) < -1` for virtually all latitudes, forcing `hourAngle()` to return its maximum of 12 hours and placing Asr at midnight (`noon + 12 h`). Removed the negation so the solar altitude angle is correctly positive. Asr now calculates correctly (e.g. ~16:50 BST for London in April).
- **Prayer times — countdown frozen** *(Prayer page)* — `next.minsRemaining` was captured once at calculation time; every subsequent `setInterval` tick redisplayed the same value. Fixed by calling `getNextPrayer(times)` fresh inside each tick, so the banner counts down in real time and also updates the prayer label if the period changes.
- **Sahih Muslim 29 → 26** *(Faith page)* — Hadith of Uthman ibn Affan RA: *"Whoever dies knowing that there is no god but Allah will enter Paradise."* Correct citation in Sahih Muslim is hadith **26**.
- **Sahih Bukhari 5015 → 6267** *(Faith page)* — Hadith that Surah Al-Ikhlas equals one-third of the Qur'an. Correct Bukhari number in the standard Arabic-edition numbering is **6267**.
- **Hadith Qudsi attribution** *(Fasting page)* — Attribution reworded from *"Allah says (in a Qudsi hadith narrated by Abu Hurayrah RA)"* to the cleaner *"Hadith Qudsi, narrated by Abu Hurayrah RA"*.
- **Inheritance calculator UI** *(Inheritance page)* — Rebuilt page layout to match the visual language of the pillar pages: page header uses `position:relative` with hanging ornament divs; Qur'anic verse block converted from dark `.quran-block` to light `.frame-calligraphy` with four corner accents; group labels upgraded to `.eyebrow` class; plain `.divider` replaced with `.divider-kufic`; "Important note" sidebar uses `.card-gold` with consistent type sizing; "Quick reference" eyebrow label added above the fixed shares table.

---

## v1.0 — Initial Launch *(2024)*

### Added
- **Five Pillars pages** — Full educational guides for Faith (Shahada), Prayer (Salah), Zakat, Fasting (Sawm), and Hajj. Each includes Qur'anic verse with Arabic text, hadith blocks, scholarly conditions, structured prose, and FAQ accordions.
- **Zakat calculator** — Multi-asset calculator with live gold/silver prices via metals.live. Supports cash, loans, metals, investments, and debt deductions. Dual Nisab methods (gold 85 g / silver 595 g) with live FX rates.
- **Prayer times tool** — Astronomical calculator supporting five calculation methods (MWL, ISNA, Egyptian, Umm al-Qura, Karachi) with browser Geolocation and a countdown to the next prayer.
- **Qibla finder** — Great-circle bearing to Makkah with animated compass and distance display.
- **Fasting / Ramadan tracker** — Current Hijri date, days until Ramadan, Suhoor/Iftar times, and a live fasting-progress bar.
- **Islamic inheritance calculator** — Full Fara'id calculator covering all 13 heir types with automatic blocking (hijab) rules, fractional shares, and a visual results panel. Based on Qur'an 4:11–12.
- **About page** — Platform mission, six guiding principles, complete scholarly-source list, and feature overview.
- **Hash-based router** — Single-page app with `#/` routing, page transition fade, and per-page cleanup callbacks.
- **Cormorant Garamond + DM Sans typography** — Serif for headings and Qur'anic display; sans-serif for UI.
- **Islamic ornament system** — Hanging ornaments, Kufic dividers, calligraphy frame (`.frame-calligraphy`), corner accents, and geometric background grid (`.bg-kufic-grid`).

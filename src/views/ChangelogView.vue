<template>
  <div>
    <div class="page-header" style="background: var(--ink)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <span class="page-eyebrow">Project history</span>
        <h1>Changelog</h1>
        <p>
          All notable changes to IslamicHub documented here, from initial launch through every
          improvement.
        </p>
      </div>
    </div>

    <div class="content-narrow">
      <div v-for="(release, ri) in releases" :key="release.version" style="margin-bottom: 3.5rem">
        <!-- Version header -->
        <div
          style="
            display: flex;
            align-items: baseline;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
          "
        >
          <h2
            style="
              font-family: var(--serif);
              font-size: clamp(1.6rem, 3vw, 2.2rem);
              font-weight: 600;
            "
          >
            {{ release.version }}
          </h2>
          <span style="font-size: 13px; color: var(--muted)">{{ release.date }}</span>
          <span class="badge" :style="{ background: release.badgeBg, color: release.badgeColor }">{{
            release.badge
          }}</span>
        </div>

        <!-- Sections: Added / Changed / Fixed -->
        <div v-for="section in release.sections" :key="section.title" style="margin-bottom: 1.5rem">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem">
            <span style="font-size: 18px">{{ section.icon }}</span>
            <h3
              style="
                font-family: var(--serif);
                font-size: 1.05rem;
                font-weight: 600;
                color: var(--ink);
              "
            >
              {{ section.title }}
            </h3>
          </div>
          <div v-for="entry in section.entries" :key="entry.title" class="changelog-entry">
            <div class="changelog-dot" :style="{ background: section.dotColor }"></div>
            <div>
              <div class="changelog-title">
                <strong>{{ entry.title }}</strong>
                <span v-if="entry.scope" class="changelog-scope">{{ entry.scope }}</span>
              </div>
              <p class="changelog-desc">{{ entry.desc }}</p>
            </div>
          </div>
        </div>

        <div v-if="ri < releases.length - 1" class="divider-kufic" aria-hidden="true">
          <span class="divider-kufic-icon"></span>
        </div>
      </div>

      <div class="cta-strip anim-target" style="margin-top: 2rem">
        <GeoPattern />
        <h2>Help us improve</h2>
        <p>
          Found a bug, have an idea, or spotted a scholarly error? Open an issue on GitHub — every
          report helps.
        </p>
        <div class="btn-group" style="justify-content: center">
          <a
            :href="GITHUB_REPO + '/issues'"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-white btn-lg"
            >Open an issue</a
          >
          <RouterLink
            to="/about"
            class="btn btn-secondary btn-lg"
            style="color: #fff; border-color: rgba(255, 255, 255, 0.3)"
            >About the project
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'

useSeo('changelog')
useScrollReveal()

const GITHUB_REPO = 'https://github.com/Zubs/islamichub'

const releases = [
  {
    version: 'v2.0 — Vue 3 Migration',
    date: 'May 2026',
    badge: 'Latest',
    badgeBg: 'var(--green-light)',
    badgeColor: 'var(--green)',
    sections: [
      {
        title: 'Added',
        icon: '✨',
        dotColor: 'var(--green)',
        entries: [
          {
            title: 'Qurbani guide',
            scope: 'Qurbani',
            desc: 'A new page explains the Eid al-Adha sacrifice: its origin in the story of Ibrahim, who it is due on, which animals qualify, when it can be done, how the meat is shared and how it is carried out. Where the schools differ, on whether it is obligatory and on three or four days, both positions are shown with their evidence. A helper works out the ways a group can sacrifice: enter the number of people and it lists sheep or goats, shares of a cow or camel, or a mix. The page awaits scholarly review.',
          },
          {
            title: 'Eid guide',
            scope: 'Eid',
            desc: 'A new page explains Eid al-Fitr and Eid al-Adha: what they are, the sunnahs of the day, how the Eid prayer is performed, the takbirat in Arabic with transliteration and translation, and Zakat al-Fitr. Where the schools differ on the extra takbirs, both positions are shown with their evidence. A countdown shows the days to the next Eid, with a reminder that the day itself depends on the sighting of the moon. The page awaits scholarly review.',
          },
          {
            title: 'Reminders when the app is closed',
            scope: 'Prayer page',
            desc: 'A new switch, "Also notify me when the app is closed", delivers prayer reminders even when IslamicHub is not open. It is off unless you turn it on. To send a reminder at the right minute a server keeps your location rounded to about 1 km, your timezone, your calculation methods and the reminders you chose, and nothing else: no name, no email, no account. Turning the switch off, or "Forget my location", deletes it. On iPhone it works once the app is installed.',
          },
          {
            title: 'Prayer reminders',
            scope: 'Prayer page',
            desc: 'With a remembered location you can now turn on reminders for each of the five prayers and for the morning and evening adhkar. A reminder opens the prayer tracker, or the adhkar, when tapped. They are off until you turn them on, and they arrive only while IslamicHub is open or running in the background.',
          },
          {
            title: 'Share to WhatsApp',
            scope: 'Hadith, duas and adhkar',
            desc: "Every hadith, dua and dhikr now has a Share button. It makes an image card on your own device, with the Arabic, the translation, the source and the site's address, and opens your phone's share sheet so WhatsApp is one tap away. Where a browser cannot share images you can save the card or send the text. Nothing is uploaded. Shared links now show a proper title and picture when pasted into a chat.",
          },
          {
            title: 'Your day on the home page',
            scope: 'Home page',
            desc: 'The home page now opens with a "Today" panel: the next prayer and how long until it, today\'s five prayers, the adhkar you have completed, your tasbih count, the hadith of the day, and in Ramadan today\'s fast. Each part is one tap from its page. It is built from what is already kept on your device and sends nothing anywhere.',
          },
          {
            title: 'Fasting tracker',
            scope: 'Fasting page',
            desc: 'The Fasting page can now record your fasts: fasted or missed for each day of Ramadan, and made-up or voluntary fasts for the rest of the year. It shows how many missed fasts are still to be made up, for each Ramadan separately, and lets you set the day Ramadan began where you are. Everything stays on your device.',
          },
          {
            title: 'Prayer tracker',
            scope: 'Tracker',
            desc: 'A new tracker lets you mark each of the five daily prayers as on time, late or missed, see the last seven days and the month at a glance, correct past days, and keep a streak. With a remembered location it shows each prayer\'s time. Everything stays on your device, and "Clear my data" removes it.',
          },
          {
            title: 'Duas for everyday situations',
            scope: 'Duas',
            desc: "A new Duas section holds 46 supplications from the Qur'an and the Sunnah for travel, eating, home, the mosque, clothing, weather, distress, illness, forgiveness, and parents and family. Each has its Arabic text, transliteration, translation and source, with hadith sources linked to the library. You can search them in English or by transliteration, and link straight to any one of them.",
          },
          {
            title: 'Hadith of the day',
            scope: 'Home page',
            desc: 'The home page now shows one short hadith from Sahih al-Bukhari each day, with its narrator and a link to the full hadith. It changes at your own midnight and works with no connection.',
          },
          {
            title: 'Hadith references are now links',
            scope: 'Whole site',
            desc: 'Every hadith reference on the site, on the pillar pages, the Articles of Faith, the adhkar, the Tasbih and Inheritance pages, now links to that hadith in the library, so a claim can be checked in one tap.',
          },
          {
            title: 'Every hadith has its own page',
            scope: 'Hadith library',
            desc: 'Each hadith can now be opened at its own address, with its Arabic text, translation, narrator, grade, book and chapter, and links to the previous and next hadith. It can be copied or shared, and every hadith in a chapter list links to its page.',
          },
          {
            title: 'Install IslamicHub and use it offline',
            scope: 'Whole site',
            desc: 'IslamicHub can now be installed on a phone from the browser, and after one visit every page opens with no connection. Prayer times (with a remembered location), the Qibla, adhkar and the tasbih counter work fully offline. Hadith books and chapters you have already opened are kept; the Zakat page uses the last prices it fetched and says how old they are. When a new version is released, an open page offers "Update available" instead of changing under you.',
          },
          {
            title: 'Remember my location',
            scope: 'Prayer and Fasting pages',
            desc: 'Once prayer times are shown you can choose to remember the location, calculation method and Asr method. Later visits to the Prayer and Fasting pages then show today\'s times straight away. It is saved on your device only, never sent anywhere, and "Forget my location" removes it. Coordinates outside the valid range are now refused.',
          },
          {
            title: 'Hanafi Asr time',
            scope: 'Prayer page',
            desc: "A new selector beside the calculation method chooses how Asr is timed: Standard (when an object's shadow equals its length, followed by the Shafi'i, Maliki and Hanbali schools) or Hanafi (twice its length). Standard remains the default. Changing it, or the calculation method, now updates the times and the countdown straight away.",
          },
          {
            title: 'Naira in the Zakat calculator',
            scope: 'Zakat page',
            desc: "Zakat can now be worked out in Nigerian naira (₦), at the official exchange rate. Because a local dealer's price can differ, you can also type your own price per gram for gold and silver, in any currency, and the calculator and the nisab both use it.",
          },
          {
            title: 'Vue 3 + Vite + Pinia',
            scope: 'Architecture',
            desc: 'Full rewrite from vanilla ES modules to Vue 3 Composition API with Vite bundling and Pinia state management. All utility functions (prayer, qibla, hijri, inheritance) moved unchanged to src/utils/.',
          },
          {
            title: 'Vue Router with clean URLs',
            scope: 'Routing',
            desc: 'Replaced hash-based routing (#/zakat) with Vue Router createWebHistory, giving clean paths (/zakat) that search engines index normally.',
          },
          {
            title: '@unhead/vue SEO',
            scope: 'SEO',
            desc: 'Per-route <title>, <meta description>, Open Graph, Twitter card, and canonical links via @unhead/vue composable called inside each view.',
          },
          {
            title: 'Reusable Vue components',
            scope: 'Components',
            desc: 'GeoPattern, QuranBlock, FaqList, ZakatAccordion, SiteNav, SiteFooter extracted into proper .vue SFCs with defineProps and scoped styles.',
          },
          {
            title: 'useScrollReveal composable',
            scope: 'UX',
            desc: 'IntersectionObserver scroll animations encapsulated in a Vue composable using onMounted/onUnmounted lifecycle hooks.',
          },
          {
            title: 'Automated test suite',
            scope: 'Testing',
            desc: 'Vitest with Vue Test Utils and jsdom. First tests cover prayer times (checked against a published London timetable for all five methods), the Qibla bearing and distance, Hijri date conversion, and the adhkar and tasbih stores. Netlify now runs the tests before building, so a failing test stops a deploy.',
          },
        ],
      },
      {
        title: 'Changed',
        icon: '🔧',
        dotColor: 'var(--gold)',
        entries: [
          {
            title: 'Ready for right-to-left languages',
            scope: 'Layout',
            desc: 'The site\'s styles no longer say "left" and "right" but "start" and "end", so the whole layout will mirror by itself for a right-to-left language such as Arabic or Urdu. Arabic verses, the Qibla compass and the tasbih counter stay as they are. Nothing changes in English.',
          },
          {
            title: 'Groundwork for Hausa',
            scope: 'Languages',
            desc: 'Hausa is now a registered language of the site, waiting for its translation, and stays hidden until it is translated and reviewed. Search will find Hausa words whether or not the hooked letters are typed.',
          },
          {
            title: 'Groundwork for Yoruba',
            scope: 'Languages',
            desc: "Yoruba is now a registered language of the site, waiting for its translation. It stays hidden until every part is translated and reviewed. The site's body typeface cannot draw Yoruba's under-dotted letters, so Yoruba will be shown in typefaces that can.",
          },
          {
            title: "Every page's writing can now be translated",
            scope: 'Whole site',
            desc: 'The writing on the Faith, Prayer, Zakat, Fasting, Hajj, Articles of Faith, hadith, Inheritance, About and home pages, and the text of the adhkar, duas and daily hadith, now lives in content files, one per page and language. A page can be translated by adding a file. Where a translation is missing, the section is shown in English with a small note. Nothing changes for English readers.',
          },
          {
            title: 'The site is ready to be translated',
            scope: 'Whole site',
            desc: 'The text of the navigation, the tools and the calculators now lives in one message file per language instead of inside the pages, and the site can serve each language at its own address, with a language switcher that appears once a second language is ready. Nothing changes for English readers yet.',
          },
          {
            title: "The hadith library's key is no longer public",
            scope: 'Hadith library',
            desc: "The hadith library now asks the site's own server for books, chapters and hadiths, and the server adds the API key. The key used to be readable in the site's code. Replies are cached for a day, so pages you have opened load faster.",
          },
          {
            title: 'Lint and format pass across the project',
            scope: 'Code quality',
            desc: 'Fixed the seven existing lint errors (unused variables and parameters) and formatted every source file with Prettier. No change to any calculation.',
          },
          {
            title: 'README and contribution guide rewritten',
            scope: 'Docs',
            desc: 'Both now describe the Vue and Vite project: setup, scripts, the folder layout, how to add a page or content, the content rules and the pull request steps. An automated check fails if either names a command, file or folder that does not exist.',
          },
          {
            title: 'Licence',
            scope: 'Project',
            desc: 'IslamicHub is now licensed under the GNU General Public License, version 3.',
          },
        ],
      },
      {
        title: 'Fixed',
        icon: '🐛',
        dotColor: '#c0392b',
        entries: [
          {
            title: 'Visits from shared links are counted as such',
            scope: 'Usage statistics',
            desc: 'A link shared from the site carries a short tag so the visit can be counted as coming from WhatsApp. The code that read the tag never ran; it does now, and the tag is removed from the address bar after it is counted.',
          },
          {
            title: 'Adhkar counts are kept if you reload',
            scope: 'Adhkar',
            desc: 'Counts on adhkar cards used to vanish if the page was reloaded or closed part-way through. They are now kept on your device for the day, so you can leave and carry on where you stopped, and each new day starts clean. Completing a category also now clears the counts of its multi-part adhkar.',
          },
          {
            title: 'Three hadith citations corrected',
            scope: 'Faith, Hajj and Inheritance pages',
            desc: "While linking every citation, each was compared with its source. The hadith on Surah al-Ikhlas being a third of the Qur'an is now cited as Sahih Bukhari 5013, and Hajj on behalf of someone who has died as Sahih Bukhari 1852. The Inheritance page quoted a narration that is not in the two collections it named; it now quotes Sahih Bukhari 6732, also found in Abu Dawud 2898.",
          },
          {
            title: 'No more two-second wait on every page',
            scope: 'Whole site',
            desc: 'Every visit used to sit behind the loading screen for at least two seconds while gold prices were fetched, even on pages that never use them. The loading screen now clears as soon as the page is ready, and prices are fetched only when the Zakat page is opened, once per visit.',
          },
          {
            title: 'Every page now has a correct canonical link',
            scope: 'Search engines',
            desc: 'Titles, descriptions and canonical links are now set one way on every page. The hadith, adhkar, tasbih and Articles of Faith pages had no canonical link, and the sitemap was missing the adhkar, tasbih and Articles of Faith pages; both are corrected, and a test keeps the sitemap in step with the pages that exist.',
          },
          {
            title: 'Inheritance shares corrected',
            scope: 'Inheritance calculator',
            desc: 'The calculator was rebuilt and several results have changed. A sister now shares with a brother, two parts to one. A granddaughter beside one daughter receives her sixth. A remainder with no residuary heir returns to the fixed-share heirs other than the spouse, so a wife beside one daughter takes 12.5%, not 20%. Every line names the rule behind it and amounts always add up to the estate. The result remains a guide, not a ruling.',
          },
          {
            title: '"No chapters match" never showed',
            scope: 'Hadith book page',
            desc: 'The message for a chapter filter with no results sat in a branch that could never run. It now shows when a search matches no chapter.',
          },
          {
            title: 'Zakat prices are current again, and results have changed',
            scope: 'Zakat page',
            desc: "Both services the calculator fetched prices from had stopped working, so it was using old built-in prices: in pounds the gold nisab showed about £9,641 where the day's price gave about £8,640, and the silver nisab about £637 where it should have been about £880. Gold, silver and exchange rates now come from one daily source. A hidden bug that would have made pound prices about 24% too low once prices loaded is fixed with it. The page states the date its prices are from.",
          },
          {
            title: 'Visitors stuck on the old version are moved to the current site',
            scope: 'Whole site',
            desc: 'The old app registered a service worker between 26 May and 5 June 2026 that kept serving its own cached pages, and the site gave browsers no way to replace it. A small replacement worker now clears those caches and removes itself on the next visit, and the page reloads once.',
          },
          {
            title: 'Leftovers from the old app removed',
            scope: 'Housekeeping',
            desc: 'The broken web manifest, a stale published copy of this changelog, a console line that logged the length of the hadith API key, and three unused development dependencies are gone. Repository links now use the current address.',
          },
          {
            title: 'The day now changes at your own midnight',
            scope: 'Adhkar and Tasbih',
            desc: "Completions, streaks and daily totals were filed by the UTC date, so the day turned over at 1am in Lagos and in the evening in New York. They now follow the device's local date. Entries made before this change keep the date they were saved under, so a streak may shift by one day, once.",
          },
          {
            title: 'Unreadable saved data no longer breaks the page',
            scope: 'Adhkar and Tasbih',
            desc: 'Saved data of an unexpected kind is now read as empty instead of causing an error.',
          },
        ],
      },
    ],
  },
  {
    version: 'v1.1 — Design & Content Polish',
    date: 'April 2026',
    badge: 'Stable',
    badgeBg: 'var(--gold-light)',
    badgeColor: '#7A5A10',
    sections: [
      {
        title: 'Added',
        icon: '✨',
        dotColor: 'var(--green)',
        entries: [
          {
            title: 'Calligraphy grid background',
            scope: null,
            desc: 'Faint Islamic 8-pointed star geometric pattern tiled at 100×100 px on the site body and preloader. Uses background-attachment: fixed so it behaves as a fixed wallpaper behind scrolling content.',
          },
          {
            title: 'Amiri Arabic font',
            scope: null,
            desc: 'Added the Amiri Naskh-style typeface for all Arabic text via a new --arabic CSS variable. Previously, Arabic characters fell back to the Latin-only Cormorant Garamond font.',
          },
          {
            title: 'Scroll-triggered animations',
            scope: null,
            desc: 'IntersectionObserver-based fade-up reveal on all major content blocks. 70ms stagger between elements. Wired via router.afterRender hook so animations re-run on every page navigation.',
          },
          {
            title: 'Page header entrance animation',
            scope: null,
            desc: '.page-header-inner fades up on every route load.',
          },
          {
            title: 'Changelog page',
            scope: null,
            desc: 'New route #/changelog documenting every change, accessible from the footer and mobile menu.',
          },
        ],
      },
      {
        title: 'Changed',
        icon: '🔧',
        dotColor: 'var(--gold)',
        entries: [
          {
            title: 'Page headers taller',
            scope: null,
            desc: 'Padding increased from 48px/32px to 64px/48px. Heading font scaled from clamp(2rem,4vw,3rem) to clamp(2.5rem,5vw,3.8rem). Sub-text bumped to 17.5px.',
          },
          {
            title: 'Global font size',
            scope: null,
            desc: "Base raised from 16px to 17px, scaling all rem units. Additional explicit bumps: prose 17px, section-sub 17.5px, hadith text 16px, Qur'an translation 16px, hero body 18px.",
          },
          {
            title: 'Preloader redesigned',
            scope: null,
            desc: 'Bismillah (بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم) in Amiri at 2.4rem leads the screen. Gold ornament divider, geometric logo, and app name in Amiri below. All elements stagger in via fadeUp keyframe animation. Minimum display time enforced at 2.8s.',
          },
          {
            title: "Qur'an translation legibility",
            scope: null,
            desc: '.quran-trans was rgba(255,255,255,.62) — near-invisible on both backgrounds. Now context-aware: var(--muted) on light .frame-calligraphy blocks; rgba(255,255,255,.88) on dark .quran-block elements.',
          },
          {
            title: 'Quran block Arabic font',
            scope: null,
            desc: '.quran-arabic and .frame-calligraphy > .quran-arabic now use var(--arabic) (Amiri) instead of var(--serif) (Cormorant Garamond).',
          },
        ],
      },
      {
        title: 'Fixed',
        icon: '🐛',
        dotColor: '#c0392b',
        entries: [
          {
            title: 'Asr calculation broken',
            scope: 'Prayer page',
            desc: 'A stray negative sign on asrAngle caused cos(hourAngle) < -1 for virtually all latitudes, placing Asr at midnight. Removed the negation so the solar altitude angle is correctly positive. Asr now calculates correctly (e.g. ~16:50 BST for London in April).',
          },
          {
            title: 'Prayer countdown frozen',
            scope: 'Prayer page',
            desc: 'next.minsRemaining was captured once at calculation time; every subsequent setInterval tick redisplayed the same value. Fixed by calling getNextPrayer(times) fresh inside each tick.',
          },
          {
            title: 'Qibla needle geometry broken',
            scope: 'Prayer page',
            desc: 'The needle was pivoting 100px below the compass ring centre due to incorrect transform-origin geometry. Fixed with a zero-size pivot div at top:50% left:50% with the needle arm extending upward from bottom:0.',
          },
          {
            title: 'Sahih Muslim 29 → 26',
            scope: 'Faith page',
            desc: 'Hadith of Uthman ibn Affan RA: "Whoever dies knowing that there is no god but Allah will enter Paradise." Correct citation in Sahih Muslim is hadith 26.',
          },
          {
            title: 'Sahih Bukhari 5015 → 6267',
            scope: 'Faith page',
            desc: "Hadith that Surah Al-Ikhlas equals one-third of the Qur'an. Correct Bukhari number in the standard Arabic-edition numbering is 6267.",
          },
          {
            title: 'Hadith Qudsi attribution',
            scope: 'Fasting page',
            desc: 'Attribution reworded to the cleaner "Hadith Qudsi, narrated by Abu Hurayrah RA".',
          },
          {
            title: 'Inheritance calculator UI',
            scope: 'Inheritance page',
            desc: "Rebuilt page layout to match the visual language of the pillar pages: page header with hanging ornament divs, Qur'anic verse converted to light .frame-calligraphy, group labels upgraded to .eyebrow class, plain .divider replaced with .divider-kufic.",
          },
          {
            title: 'Arabic box style in Home',
            scope: 'Home page',
            desc: "The Qur'an verse card on the home hero was switching between light (frame-calligraphy) and dark styles across patch versions. Stabilised to always use frame-calligraphy on the home hero.",
          },
        ],
      },
    ],
  },
  {
    version: 'v1.0 — Initial Launch',
    date: '2024',
    badge: 'Foundation',
    badgeBg: 'var(--cream-dark)',
    badgeColor: 'var(--muted)',
    sections: [
      {
        title: 'Added',
        icon: '✨',
        dotColor: 'var(--green)',
        entries: [
          {
            title: 'Five Pillars pages',
            scope: null,
            desc: "Full educational guides for Faith (Shahada), Prayer (Salah), Zakat, Fasting (Sawm), and Hajj. Each includes Qur'anic verse with Arabic text, hadith blocks, scholarly conditions, structured prose, and FAQ accordions.",
          },
          {
            title: 'Zakat calculator',
            scope: null,
            desc: 'Multi-asset calculator with live gold/silver prices via metals.live. Supports cash, loans, metals, investments, and debt deductions. Dual Nisab methods (gold 85g / silver 595g) with live FX rates.',
          },
          {
            title: 'Prayer times tool',
            scope: null,
            desc: 'Astronomical calculator supporting five calculation methods (MWL, ISNA, Egyptian, Umm al-Qura, Karachi) with browser Geolocation and a countdown to the next prayer.',
          },
          {
            title: 'Qibla finder',
            scope: null,
            desc: 'Great-circle bearing to Makkah with animated compass and distance display.',
          },
          {
            title: 'Fasting / Ramadan tracker',
            scope: null,
            desc: 'Current Hijri date, days until Ramadan, Suhoor/Iftar times, and a live fasting-progress bar.',
          },
          {
            title: 'Islamic inheritance calculator',
            scope: null,
            desc: "Full Fara'id calculator covering all 13 heir types with automatic blocking (hijab) rules, fractional shares, and a visual results panel. Based on Qur'an 4:11–12.",
          },
          {
            title: 'About page',
            scope: null,
            desc: 'Platform mission, six guiding principles, complete scholarly-source list, and feature overview.',
          },
          {
            title: 'Hash-based router',
            scope: null,
            desc: 'Single-page app with #/ routing, page transition fade, and per-page cleanup callbacks.',
          },
          {
            title: 'Cormorant Garamond + DM Sans typography',
            scope: null,
            desc: "Serif for headings and Qur'anic display; sans-serif for UI.",
          },
          {
            title: 'Islamic ornament system',
            scope: null,
            desc: 'Hanging ornaments, Kufic dividers, calligraphy frame (.frame-calligraphy), corner accents, and geometric background grid (.bg-kufic-grid).',
          },
        ],
      },
    ],
  },
]
</script>

<style scoped>
.changelog-entry {
  display: flex;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  align-items: flex-start;
}

.changelog-entry:last-child {
  border-bottom: none;
}

.changelog-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.changelog-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 3px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}

.changelog-scope {
  font-size: 11px;
  padding: 1px 7px;
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--muted);
  font-weight: 500;
}

.changelog-desc {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.65;
}
</style>

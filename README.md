# IslamicHub

IslamicHub is a free, open-source Islamic education and utility site, live at [islamichub.xyz](https://islamichub.xyz). It combines sourced guides to the Five Pillars with practical tools. Everything works without an account, and nothing you enter into the calculators leaves your device.

- [Spec.md](Spec.md) describes how the site is built and how each feature behaves.
- [Features.md](Features.md) lists what is planned next, in build order.
- [CONTRIBUTING.md](CONTRIBUTING.md) explains how to make a change.

## What it offers

- **Pillar guides:** Faith, Prayer, Zakat, Fasting and Hajj, each with Qur'an verses, hadith and FAQs, plus the articles of faith.
- **Prayer times:** calculated on your device from your location, with five calculation methods and a countdown to the next prayer.
- **Qibla:** bearing and distance to the Kaaba.
- **Zakat calculator:** cash, gold, silver, investments and debts, with gold and silver prices and a choice of nisab.
- **Fasting:** the Hijri date, days until Ramadan, and suhoor and iftar times.
- **Hadith library:** nine collections, browsable by book and chapter.
- **Adhkar:** morning, evening, after-prayer, sleep, waking and general adhkar, with counters and streaks.
- **Tasbih counter:** six phrases with targets and daily totals.
- **Inheritance calculator:** shares for thirteen kinds of heir. It is a guide, not a ruling.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Vue 3 with `<script setup>`, plain JavaScript |
| Build | Vite |
| Routing | Vue Router, clean URLs |
| State | Pinia |
| Page titles and SEO | `@unhead/vue` |
| Styling | Plain CSS with custom properties |
| Tests | Vitest, Vue Test Utils, jsdom |
| Lint and format | oxlint, ESLint, Prettier |
| Hosting | Netlify |

## Getting started

You need [Node.js](https://nodejs.org) 20.19 or later, or 22.12 or later.

```bash
git clone https://github.com/Zubs/islamichub.git
cd islamichub
npm ci
cp .env.example .env
npm run dev
```

The site is then running at the address Vite prints, normally `http://localhost:5173`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the site into `dist/` |
| `npm run preview` | Serves the built site locally |
| `npm test` | Runs every test once |
| `npm run test:watch` | Re-runs tests as files change |
| `npm run lint` | Runs oxlint and ESLint, fixing what they can |
| `npm run format` | Formats `src/` with Prettier |

## Environment

The site reads two variables, set in `.env`:

| Variable | Needed for | Notes |
|---|---|---|
| `VITE_HADITH_API_KEY` | The hadith library | A key from [hadithapi.com](https://hadithapi.com) |
| `VITE_STATS_ENDPOINT` | Anonymous usage statistics | Optional — counting is off without it. Set to your GoatCounter counting address (e.g., `https://yourcode.goatcounter.com/count`). |

The site runs without a key. Only the hadith book and chapter pages need one, and they show a "no API key" message until it is set.

The key is compiled into the site's JavaScript, so anyone who loads the site can read it. Moving it to a server is planned; see [Features.md](Features.md).

## Deployment

The site is hosted on Netlify, configured in `netlify.toml`. Each deploy runs the tests and then builds:

```bash
npm test && npm run build
```

A failing test stops the deploy. The contents of `dist/` are published, and every path is served by `index.html` so that clean URLs work. Set `VITE_HADITH_API_KEY` in the Netlify site settings.

## Licence

IslamicHub is licensed under the GNU General Public License, version 3. See [LICENSE](LICENSE).

The religious content cites its sources on each page. The scholarly sources are listed on the site's About page.

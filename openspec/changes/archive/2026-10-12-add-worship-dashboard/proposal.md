# Proposal

## Why

Prayer times, the prayer tracker, adhkar, tasbih, the fasting tracker and the daily hadith each live on their own page. A returning user has to visit five pages to see how their day stands.

## What Changes

- A "Today" panel near the top of the home page, built only from existing stores: the next prayer and its countdown, today's five prayers, adhkar categories completed, today's tasbih total, and the daily hadith.
- In Ramadan, today's fast appears too.
- Each part links to its full page. A part with nothing to show offers a way to start; a user with no saved location is offered the Prayer page.
- The panel saves nothing of its own and makes no request.
- The day's progress resets at local midnight while the page is open.

## Capabilities

### New Capabilities

- `worship-dashboard`: the home page's summary of the user's day.

### Modified Capabilities

None.

## Impact

- New `src/components/TodayPanel.vue` and test; `HomeView.vue` (the daily hadith moves inside the panel).
- `Spec.md`, `CHANGELOG.md`, `Features.md`.

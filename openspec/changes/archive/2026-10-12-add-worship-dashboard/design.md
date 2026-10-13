# Design

## Decisions

- **One component, `TodayPanel.vue`,** reading the prayer settings, salah, adhkar, tasbih and fasting stores. It has no store and no stored key.
- **Next prayer uses the same functions as the Prayer page** (`calcPrayerTimes`, `getNextPrayer`) with the saved location and methods, so the two cannot disagree.
- **A minute tick** updates the countdown and re-reads the day, which is what resets the panel at local midnight; it also runs when the tab becomes visible again.
- **The daily hadith card moves inside the panel** so the home page has one "today" area.
- **Layout: a CSS grid with `repeat(auto-fit, minmax(min(100%, 240px), 1fr))`,** which is one column at 360px without a media query.
- **The next-prayer tile links to the tracker**, where that prayer is marked; the tile for a visitor with no location links to the Prayer page.

## Risks / Trade-offs

- [The home page grows] → the panel is a few hundred bytes of markup and reuses code already loaded for other pages only when they are opened; the 600 KB test still guards the total.

# Design

## Context

Location lives in memory in the Zakat store (`location`, `requestLocation`), a leftover of where it was first needed. The Prayer page keeps method and Asr method as local refs.

## Decisions

- **Pure reading and validation in `utils/prayerSettings.js`:** `isValidCoordinates(lat, lng)` and `parsePrayerSettings(text)`, which returns a complete settings object or `null`. An invalid location discards everything; an unknown method or Asr option falls back to the default and keeps the location.
- **`stores/prayerSettings.js`** holds `saved` (settings or `null`) and `canRemember` (a write probe at start-up), with `remember(settings)`, `setMethods(method, asrMethod)` and `forget()`. Every storage call is wrapped, so a blocked browser degrades to "not saved".
- **The geolocation request stays in the Zakat store for now.** Moving it is a refactor no test asks for.
- **The offer is a button below the status line, shown once times are on screen and the shown location is not the saved one.** No modal; declining is doing nothing.
- **The Fasting page reads the saved location and method** but offers no saving of its own; the Prayer page is the one place settings are managed.
- **Place name** is the reverse-geocoded name when the browser found the location, otherwise the coordinates as typed.

## Risks / Trade-offs

- [Reverses "location is never persisted"] → opt-in only, device only, one-tap removal, and the privacy text is updated in the same change.

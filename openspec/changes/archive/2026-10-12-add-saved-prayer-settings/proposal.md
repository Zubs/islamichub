# Proposal

## Why

The Prayer and Fasting pages ask for a location on every visit. A daily companion has to show today's times the moment it opens, and offline mode, the dashboard and reminders all need a remembered location to work from.

## What Changes

- After a location is found or entered, the Prayer page offers "Remember this location". Nothing is saved unless the user accepts.
- A new stored key, `prayer-settings`, holds latitude, longitude, place name, calculation method and Asr method, on the device only.
- A Pinia store owns the settings. The Prayer and Fasting pages read from it and show times without asking when a location is saved.
- "Forget my location" removes it.
- Coordinates are validated: latitude −90 to 90 and longitude −180 to 180.
- With browser storage blocked, the page works for the visit and says the location cannot be remembered.
- The privacy text on the About page and in `Spec.md` sections 6 and 9 says location can be saved on the device by choice.
- This reverses "location is never persisted" in Spec section 6. The decision is taken at its proposed default (yes, by choice only) and listed under "Final".

## Capabilities

### New Capabilities

- `prayer-settings`: remembering a user's location and calculation choices on their device, by choice, and forgetting them.

### Modified Capabilities

None.

## Impact

- New `src/utils/prayerSettings.js`, `src/stores/prayerSettings.js` and tests; `PrayerView.vue`, `FastingView.vue`, `AboutView.vue`.
- `Spec.md` sections 5.2, 6 and 9, `CLAUDE.md` privacy rule wording is already compatible ("unless a feature says so and the user has opted in"), `CHANGELOG.md`, `Features.md`.

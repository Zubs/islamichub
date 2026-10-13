# Proposal

## Why

Ibrahim's story crosses the whole region, from Iraq to Makkah. A reader follows it better on a map, as long as the map is honest about which places the sources name and which historians identify.

## What Changes

- A prophet's story can carry a journey: a list of stops with coordinates, what happened there, a reference, and how the place is known.
- "How the place is known" is either named in the Qur'an or hadith, or identified by historians. Each stop is labelled.
- Ibrahim's journey: Ur, Harran, Canaan, Egypt and Makkah.
- The map is an SVG drawn inside the site from a public-domain outline of the region. No outside map service is used, it works offline, and nothing is sent anywhere.
- Stops are numbered and joined in order. Selecting a stop on the map or in the list highlights it on the other. The list below the map is the same journey as plain text.
- A prophet with no journey shows no map.

## Capabilities

### New Capabilities

- `prophet-journeys`: the journey map and list on a prophet's page.

### Modified Capabilities

None.

## Impact

- New `src/utils/journey.js`, `src/data/regionMap.js`, `src/data/ibrahimJourney.js`, `src/components/JourneyMap.vue`, tests.
- `src/data/prophetStories.js`, `src/views/prophets/ProphetView.vue`, `src/data/content/ibrahim/en.js`, `src/locales/en.js`.
- `Spec.md`, `CHANGELOG.md`, `Features.md`. No new dependency and no new outside address.

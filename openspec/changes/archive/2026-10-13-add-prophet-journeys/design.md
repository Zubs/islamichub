# Design

## Decisions

- **The outline is a generated path.** A script outside the repository clips Natural Earth's public-domain land outline to the region (26° to 50° east, 16° to 40° north), simplifies it and writes one SVG path to `data/regionMap.js`, about 3 KB. Nothing is fetched at run time, so it is offline by construction and needs no dependency.
- **One projection in `utils/journey.js`**, equirectangular with longitude narrowed for 30° north. The outline and the stops use the same units.
- **Stops live beside the story**: `data/ibrahimJourney.js` holds id, coordinates, how the place is known and the reference; the name and text are in the story's content file under `journey`, so they translate with it.
- **The list is always fully visible.** Selecting only highlights, so the list is the plain-text version and nothing is hidden from a screen reader.
- **Markers are SVG groups with `role="button"`, `tabindex="0"` and Enter and Space handlers**, each with a transparent circle of 14 map units as its touch target: 44px at 360px wide.
- **Only Makkah is labelled as named in the Qur'an.** The sources describe what happened elsewhere without naming the place, so Ur, Harran, Canaan and Egypt are labelled as identified by historians, and each text says so.

## Risks

- The coordinates and identifications are from general historical knowledge, not a cited work. Listed under "Final" for the reviewer.
- How the map looks on a real phone has not been checked.

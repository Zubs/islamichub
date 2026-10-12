# Design

## Context

`calcPrayerTimes(lat, lng, date, timezone, method)` already computes Asr from a hard-coded shadow factor of 1. The page calculates only when "Calculate" is pressed.

## Goals / Non-Goals

**Goals:** one extra argument, no change to existing callers or results.

**Non-Goals:** remembering the choice (feature 11), high-latitude adjustment rules.

## Decisions

- **A sixth positional argument `asrMethod = 'standard'`**, mapped through `ASR_SHADOW_FACTORS = { standard: 1, hanafi: 2 }` with a fallback to 1. An options object would be tidier but would change every caller for one value.
- **A `watch` on method and Asr option recalculates only when times are already shown**, so the selector never triggers a "please enter valid coordinates" message.
- **Published times come from the Aladhan API** (school 0 and 1) for three cities, stored in `prayer.fixture.js` beside the existing London fixture.
- **Selector labels:** "Standard (Shafi'i, Maliki, Hanbali)" and "Hanafi". Both are named; neither is described as correct.

## Risks / Trade-offs

- [The recalculation also counts another "prayer times shown" action] → tracking moves so it fires only on an explicit calculate.

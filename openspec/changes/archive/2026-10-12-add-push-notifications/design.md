# Design

## Decisions

- **Storage: Netlify Blobs, one record per device** in a store named `push-subscriptions`, keyed by the SHA-256 of the subscription's endpoint. The endpoint is the only identifier; the client deletes by sending it. `@netlify/blobs` is the one new dependency.
- **`netlify/functions/lib/pushRecords.js` is pure:** `validateRecord(body)` (size, shape, ranges, known method, Asr method, timezone and reminder keys; coordinates rounded here, so the server never keeps more than two decimal places whatever the client sends) and `remindersDue(record, now)`.
- **Local time without a timezone library:** `Intl.DateTimeFormat` with the record's `timeZone` gives the device's wall-clock date and time for "now"; the offset is the difference between that and UTC. `calcPrayerTimes` then runs exactly as in the browser.
- **Sent once, never late:** a reminder is due when the device's local time is 0 to 3 minutes past it and the record's `sent[key]` is not already today's local date. `sent` is written back after a send.
- **Web Push without a library:** `lib/webPush.js` builds the VAPID token (ES256) and encrypts the payload (RFC 8291, `aes128gcm`) with Node's `crypto`. A round-trip test decrypts what it encrypts and verifies the token's signature.
- **Two functions:** `push.js` (POST to save or update, DELETE to remove) behind `/api/push`, and `push-send.js` with `schedule: '* * * * *'`. Both take their store and sender as arguments so tests need neither Netlify nor a push service.
- **Client:** `reminder-settings` gains an optional `push` flag. `utils/push.js` holds the pure parts (rounding, the request body, iPhone and support checks). The reminders store subscribes with the public key in `VITE_VAPID_PUBLIC_KEY`, saves, and deletes. A watcher re-saves when prayer settings or switches change and deletes when the location is forgotten.
- **The worker's `push` handler** is added to `public/sw-notifications.js`.
- **`src/utils/reminders.js` switches to relative imports,** so the server functions can share the reminder list.

## Risks / Trade-offs

- [First server-side store of anything about a user] → opt-in, minimal, rounded, deleted on request, and described on the About page.
- [Web Push crypto written by hand] → tested by round trip here; it must be confirmed against real push services, which is listed under "Final". The feature stays unticked.
- [A scan of every record each minute] → fine at this scale; noted for later.
- [Without VAPID keys the feature is inert] → the switch is not offered until `VITE_VAPID_PUBLIC_KEY` is set.

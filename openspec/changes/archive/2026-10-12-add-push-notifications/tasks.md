# Tasks

## 1. Server

- [x] 1.1 Create `netlify/functions/lib/webPush.js` and `scripts/make-vapid-keys.js`, with tests that decrypt an encrypted payload, verify the VAPID token and check the request's headers. Verify the tests pass
- [x] 1.2 Create `netlify/functions/lib/pushRecords.js` with tests for validation (malformed, oversized, ranges, unknown values, rounding) and for `remindersDue` (two timezones, only Fajr, not twice, missed runs, adhkar offsets). Verify the tests pass
- [x] 1.3 Create `netlify/functions/push.js` and `push-send.js` with an in-memory store and a fake sender, testing save, update, delete, send once, expiry deletion and no late sends; add the `/api/push` rewrite and environment variables. Verify the tests pass

## 2. Client

- [x] 2.1 Add `src/utils/push.js`, the push flag and actions in the reminders store, the watcher, the second switch in `ReminderSettings.vue`, the worker's `push` handler and the silence of on-device reminders, with tests: no request while off; one record on; update on change; delete on off and on forgetting the location; iPhone note; one notification, not two. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update the About page privacy text, `Spec.md` (sections 6 and 9, server-side code, environment), `README.md`, `CHANGELOG.md` and `Features.md`; record the decision, the dependency and the checks under "Final" and leave feature 24 unticked. Verify the docs test passes

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

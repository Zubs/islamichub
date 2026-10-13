# Tasks

## 1. Rules, store and scheduler

- [x] 1.1 Create `src/utils/reminders.js` and `src/stores/reminders.js` with tests: off by default; turning on with permission granted, refused and unsupported; switches; stored and corrupt settings; which reminders are due at midday; one second either side. Verify the tests pass
- [x] 1.2 Create `src/composables/useReminders.js` and `public/sw-notifications.js`, start the scheduler from `App.vue`, and test with fake timers: nothing scheduled when off or with no location; only Maghrib; rescheduling on a method change; rescheduling at midnight; a notification fired at its time carrying its path; the click handler opening the tracker and `/adhkar/morning`. Verify the tests pass

## 2. Settings

- [x] 2.1 Create `src/components/ReminderSettings.vue`, place it in the prayer settings, and test: disabled with a note when no location is saved; switches; the refusal note; the unsupported note; the statement of limits. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md`, `CHANGELOG.md` and `Features.md`; list the real-phone check under "Final" and leave feature 23 unticked. Verify the leftovers and build tests pass

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

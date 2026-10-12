# Tasks

## 1. Styles

- [x] 1.1 Convert physical left and right properties to logical ones in the stylesheets, scoped styles and inline styles, keeping the listed exceptions; add `direction: ltr` to the compass, tasbih ring and prayer times, isolation to hadith references, and the `flip-rtl` class. Verify every page still reads as before

## 2. Checks

- [x] 2.1 Add `test/rtl.test.js`: no physical property outside the listed exceptions, each with a reason; the document's direction in English and in a made-up right-to-left language; Arabic blocks, the compass and the counter unmirrored; references isolated; the directional icon class. Verify the tests pass

## 3. Documentation

- [x] 3.1 Update `Spec.md`, `CONTRIBUTING.md`, `CHANGELOG.md` and `Features.md`; list the visual check under "Final" and leave feature 29 unticked. Verify the docs test passes

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

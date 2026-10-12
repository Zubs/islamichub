# Tasks

## 1. Engine

- [x] 1.1 Rewrite `src/utils/inheritance.js` with fraction helpers, the five steps, validation and the `{ error, shares }` result, and create `src/utils/inheritance.test.js` covering every scenario in the spec and every test listed under feature 7. Verify the tests pass
- [x] 1.2 Add a table-driven test with one case per row of the Spec 5.9 table, and a sweep over many heir combinations asserting percentages total 100 and amounts total the estate. Verify it passes

## 2. Page

- [x] 2.1 Update `InheritanceView.vue` to the new result shape: error message, share label, rule line, per-person amount; update heir descriptions and the radd FAQ to match the engine. Add `InheritanceView.test.js` for no heirs, husband and wife together, and the wife, two sons and a daughter journey. Verify the tests pass

## 3. Documentation

- [x] 3.1 Correct the Spec 5.9 table and algorithm, remove the "Inheritance engine" entry from Known gaps, add the changelog entries, record the decisions under "Final" in `Features.md` and tick feature 7. Verify the Known gaps entry is gone

## 4. Final checks

- [x] 4.1 Run `npm run lint`, `npm run format`, `npm test` and `npm run build` and verify all four finish with no errors

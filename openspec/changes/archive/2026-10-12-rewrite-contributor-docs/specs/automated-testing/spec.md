# Spec Delta

## MODIFIED Requirements

### Requirement: Tests sit beside the code they cover
A test file SHALL live in the same folder as the file it covers and carry the same name with a `.test.js` suffix. A check that covers no single source file, such as a check on the project's documentation, SHALL live in the top-level `test/` folder. Test files MUST NOT be included in the built site.

#### Scenario: Test file is discovered by location
- **WHEN** a file named `prayer.test.js` is added next to `prayer.js`
- **THEN** `npm test` runs it with no further configuration

#### Scenario: Project-wide check is discovered
- **WHEN** a file named `docs.test.js` is added to the top-level `test/` folder
- **THEN** `npm test` runs it with no further configuration

#### Scenario: Tests are not shipped
- **WHEN** the site is built
- **THEN** the build output contains no test files and no test-only dependencies

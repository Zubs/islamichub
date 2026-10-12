# Spec Delta

## Purpose

Defines what the project's README and contribution guide must tell a newcomer, and the rule that both stay true to the repository as it changes.

## ADDED Requirements

### Requirement: The README gets a newcomer running
`README.md` SHALL state what the site is and what it offers today, the technology it is built with, how to install and run it locally, what each npm script does, which environment variable it reads, and how it is deployed.

#### Scenario: Running the site from the README alone
- **WHEN** someone with a supported version of Node clones the repository and follows only the README's setup steps
- **THEN** the site is running locally and opens in their browser

#### Scenario: Without the hadith API key
- **WHEN** someone follows the setup steps without supplying a hadith API key
- **THEN** the README has told them the site still runs and that only the hadith library needs the key

#### Scenario: Only what exists is listed
- **WHEN** the README lists the site's features
- **THEN** every feature listed is one a visitor can use today

### Requirement: The contribution guide gets a newcomer to a pull request
`CONTRIBUTING.md` SHALL describe the folder layout and what belongs in each layer, how to add a page, how to add content, how to run the tests and other checks, and the steps to open a pull request.

#### Scenario: Opening a first pull request
- **WHEN** a new contributor follows only the README and the contribution guide
- **THEN** they can make a change, run every check, and open a pull request without asking how

#### Scenario: Adding a page
- **WHEN** a contributor wants to add a page
- **THEN** the guide names each place that must change: the view, the route, the page's title and description, the sitemap and the tests

#### Scenario: Where to ask
- **WHEN** a contributor wants to report a bug or ask a question
- **THEN** the guide points to a channel that exists and is open to them

### Requirement: The content rules are stated
`CONTRIBUTING.md` SHALL state the rules for religious content: every scholarly claim carries a Qur'an or hadith reference, hadith numbers follow the Arabic edition, where schools differ both positions are shown, and calculators are guides and not rulings.

#### Scenario: Adding a hadith
- **WHEN** a contributor adds a hadith to a page
- **THEN** the guide has told them to cite the collection and the Arabic-edition number, and to check the citation against the source

#### Scenario: A point of difference between schools
- **WHEN** a contributor writes about a matter on which the schools differ
- **THEN** the guide has told them to present both positions and not to choose one

#### Scenario: Unsure of a ruling
- **WHEN** a contributor is not sure a ruling is correct
- **THEN** the guide tells them to open an issue instead of publishing it

### Requirement: The docs point to the spec and the feature list
Both files SHALL link to `Spec.md` and `Features.md` for the detail of what exists and what is planned, and MUST NOT repeat that detail.

#### Scenario: Looking for what is planned
- **WHEN** a reader wants to know what will be built next
- **THEN** both files send them to `Features.md`

### Requirement: The docs stay true to the repository
Every npm command, file, folder and relative link named in `README.md` or `CONTRIBUTING.md` SHALL exist in the repository, and an automated check MUST fail when one does not.

#### Scenario: A script is renamed
- **WHEN** an npm script named in either file is removed from `package.json`
- **THEN** the automated check fails and names the missing script

#### Scenario: A folder is moved
- **WHEN** a file or folder named in either file no longer exists
- **THEN** the automated check fails and names the missing path

#### Scenario: The old app is described again
- **WHEN** either file mentions the hash router, a top-level `js/` or `pages/` folder, "no build step", or the repository's old name
- **THEN** the automated check fails

#### Scenario: Everything is in order
- **WHEN** both files name only commands, paths and links that exist
- **THEN** the automated check passes

### Requirement: One contribution guide
The project SHALL have one contribution guide. No second copy may be published with the site.

#### Scenario: Building the site
- **WHEN** the site is built
- **THEN** the build output contains no `CONTRIBUTING.md`

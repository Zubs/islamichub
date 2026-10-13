# Spec Delta

## ADDED Requirements

### Requirement: Shared links carry a source tag
Links produced by the site's Share control SHALL carry a short source tag. A visit that arrives by such a link SHALL be counted under that tag as its source, and the tag SHALL then be removed from the address shown in the browser without counting the page twice.

#### Scenario: Arriving from a shared link
- **WHEN** a visitor opens a link shared on WhatsApp that carries the tag
- **THEN** one page view is counted with the tag as its source, and the address bar no longer shows the tag

#### Scenario: Other query values
- **WHEN** the address carries other query values beside the tag
- **THEN** they are kept and only the tag is removed

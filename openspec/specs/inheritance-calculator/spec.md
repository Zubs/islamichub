# inheritance-calculator Specification

## Purpose

Defines how the inheritance calculator divides an estate among the heirs a user selects: who is excluded, what each heir takes, how shares that exceed or fall short of the estate are settled, and how the result is shown. It is a guide, not a ruling.

## Requirements

### Requirement: Nearer heirs exclude more distant ones
The calculator SHALL drop excluded heirs before any share is assigned. A son excludes grandsons, granddaughters, brothers and sisters. A grandson excludes brothers and sisters. A father excludes the paternal grandfather, the paternal grandmother, brothers and sisters. A mother excludes both grandmothers. A paternal grandfather excludes brothers and sisters. Two or more daughters exclude a granddaughter unless a grandson is present.

#### Scenario: Son with grandsons and siblings
- **WHEN** a son, a grandson, a brother and a sister are selected
- **THEN** only the son receives a share

#### Scenario: Father with grandfather and siblings
- **WHEN** a father, a paternal grandfather, a brother and a sister are selected
- **THEN** only the father receives a share

#### Scenario: Two daughters and a granddaughter
- **WHEN** two daughters and a granddaughter are selected with no grandson
- **THEN** the granddaughter receives nothing

#### Scenario: Two daughters, a granddaughter and a grandson
- **WHEN** two daughters, a granddaughter and a grandson are selected
- **THEN** the granddaughter shares the residue with the grandson, one part to his two

#### Scenario: Brother and sister
- **WHEN** a brother and a sister are selected
- **THEN** the sister is not excluded by the brother

### Requirement: Spouses and parents take fixed shares
A husband SHALL take 1/4 when the deceased leaves a child or a son's child and 1/2 otherwise. Wives SHALL share 1/8 when there is such a descendant and 1/4 otherwise. A mother SHALL take 1/6 when there is such a descendant or two or more siblings, and 1/3 otherwise. A father or, in his absence, a paternal grandfather SHALL take 1/6 beside a son or grandson, 1/6 plus any residue beside daughters or granddaughters only, and the residue otherwise.

#### Scenario: Husband and son
- **WHEN** a husband and a son are selected
- **THEN** they take 25% and 75%

#### Scenario: Mother with one sibling and with two
- **WHEN** a mother is selected with one sibling, and then with two
- **THEN** she takes 1/3 with one and 1/6 with two

#### Scenario: Mother and a daughter
- **WHEN** a mother, a father and a daughter are selected
- **THEN** the mother takes 1/6, the daughter 1/2 and the father 1/6 plus the remaining 1/6

#### Scenario: Spouse and both parents
- **WHEN** a husband, a mother and a father are selected
- **THEN** the husband takes 1/2, the mother a third of the remainder (1/6) and the father the rest (1/3)

#### Scenario: Grandmothers
- **WHEN** both grandmothers are selected with neither parent
- **THEN** they share one sixth between them

### Requirement: Daughters, granddaughters and sisters take fixed shares unless a male of their class is present
One daughter SHALL take 1/2 and two or more 2/3. Granddaughters take the same when there is no daughter, and share 1/6 beside one daughter. One full sister SHALL take 1/2 and two or more 2/3 when there is no descendant; beside a daughter or granddaughter, sisters take the residue. Beside a male of the same class each becomes a residuary with him.

#### Scenario: One daughter and one granddaughter
- **WHEN** one daughter and one granddaughter are selected
- **THEN** they take 1/2 and 1/6 before any return

#### Scenario: Two daughters and a sister
- **WHEN** two daughters and a full sister are selected
- **THEN** the daughters take 2/3 and the sister the remaining 1/3

### Requirement: The residue goes to the nearest residuary class
What is left after fixed shares SHALL go to the first class present, in this order: sons with daughters; grandsons with granddaughters; father; paternal grandfather; brothers with sisters; sisters beside daughters. Within a class a male SHALL receive twice the share of a female.

#### Scenario: Son alone
- **WHEN** only a son is selected
- **THEN** he takes everything

#### Scenario: Son and daughter
- **WHEN** a son and a daughter are selected
- **THEN** they take two parts and one part

#### Scenario: Brother and sister
- **WHEN** a full brother and a full sister are selected
- **THEN** they take two parts and one part

#### Scenario: Father ahead of brothers
- **WHEN** a wife, a father and a brother are selected
- **THEN** the father takes the whole residue and the brother nothing

### Requirement: Shares that exceed the estate are reduced in proportion
When the fixed shares add up to more than the estate, every fixed share SHALL be reduced in the same proportion so that they total the estate ('awl).

#### Scenario: Husband, mother and two sisters
- **WHEN** a husband, a mother and two full sisters are selected
- **THEN** they take 37.5%, 12.5% and 50%

### Requirement: A remainder with no residuary returns to the fixed-share heirs other than the spouse
When fixed shares leave a remainder and no residuary is present, the remainder SHALL be returned to the fixed-share heirs other than the spouse, in proportion to their shares (radd). When a spouse is the only heir, the remainder SHALL be shown on its own line and not given to the spouse.

#### Scenario: Daughter and granddaughter
- **WHEN** one daughter and one granddaughter are selected
- **THEN** after the return they take 75% and 25%

#### Scenario: Wife and daughter
- **WHEN** a wife and one daughter are selected
- **THEN** the wife takes 12.5% with the label 1/8 and the daughter 87.5%

#### Scenario: Spouse alone
- **WHEN** a husband is the only heir
- **THEN** he takes 50% and the other 50% is shown as a remainder with no heir to receive it

### Requirement: Every result line states its share and its rule
Each line SHALL show the heir, a share label that is the final fraction of the estate, the percentage, the amount and the rule that produced it. The label MUST match the percentage.

#### Scenario: Label matches percentage
- **WHEN** a result shows a share of 7/8
- **THEN** its percentage is 87.5%

#### Scenario: Rule shown
- **WHEN** a share was reduced, or includes a returned remainder
- **THEN** the line says so

### Requirement: Amounts are exact to the penny and total the estate
Shares SHALL be worked out as exact fractions and turned into percentages and amounts only at the end. Each person's amount SHALL be rounded to the penny, with any leftover added to the largest share, so the amounts total the estate and the percentages total 100.

#### Scenario: Three sons and one hundred pounds
- **WHEN** three sons share an estate of 100.00
- **THEN** their amounts add up to exactly 100.00

#### Scenario: Wife, two sons and a daughter
- **WHEN** a wife, two sons and a daughter share 120,000
- **THEN** they receive 15,000, 42,000 each and 21,000

#### Scenario: Estate of zero
- **WHEN** the estate is zero
- **THEN** the shares are shown with zero amounts

### Requirement: Invalid input is rejected with a message
The calculator SHALL show no result and a clear message when no heir is selected, a husband and a wife are both selected, more than four wives are entered, a count is negative or not a whole number, or the estate is negative or not a number.

#### Scenario: No heirs
- **WHEN** no heir is selected
- **THEN** the page asks for at least one heir and shows no result

#### Scenario: Husband and wife together
- **WHEN** both a husband and a wife are selected
- **THEN** the page says the deceased can leave one or the other, and shows no result

#### Scenario: Five wives
- **WHEN** five wives are entered
- **THEN** the page says no more than four, and shows no result

### Requirement: The page says the result is a guide
The page SHALL state prominently that the result is a guide and not a ruling.

#### Scenario: Result shown
- **WHEN** shares are displayed
- **THEN** the guide notice is visible beside them

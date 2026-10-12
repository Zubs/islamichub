// Shares follow Qur'an 4:11, 4:12 and 4:176 and Sahih al-Bukhari 6736.
// The two constants below are points on which scholars differ; each is a decision recorded in Features.md.
const SPOUSE_TAKES_RADD = false
const GRANDFATHER_EXCLUDES_SIBLINGS = true

const MAX_WIVES = 4

export const HEIR_DEFS = [
  { key: 'husband', label: 'Husband', group: 'Spouse', quran: '4:12' },
  { key: 'wife', label: 'Wife / Wives', group: 'Spouse', quran: '4:12', countable: true },
  { key: 'father', label: 'Father', group: 'Parents', quran: '4:11' },
  { key: 'mother', label: 'Mother', group: 'Parents', quran: '4:11' },
  { key: 'son', label: 'Son(s)', group: 'Children', quran: '4:11', countable: true },
  { key: 'daughter', label: 'Daughter(s)', group: 'Children', quran: '4:11', countable: true },
  {
    key: 'grandson',
    label: "Grandson (son's son)",
    group: 'Children',
    quran: '4:11',
    countable: true,
  },
  {
    key: 'granddaughter',
    label: "Granddaughter (son's daughter)",
    group: 'Children',
    quran: '4:11 · Bukhari 6736',
    countable: true,
  },
  { key: 'brother', label: 'Full Brother(s)', group: 'Siblings', quran: '4:176', countable: true },
  { key: 'sister', label: 'Full Sister(s)', group: 'Siblings', quran: '4:176', countable: true },
  { key: 'paternal_grandfather', label: 'Paternal Grandfather', group: 'Extended', quran: '4:11' },
  {
    key: 'paternal_grandmother',
    label: 'Paternal Grandmother',
    group: 'Extended',
    quran: 'Hadith',
  },
  {
    key: 'maternal_grandmother',
    label: 'Maternal Grandmother',
    group: 'Extended',
    quran: 'Hadith',
  },
]

const SPOUSES = ['husband', 'wife']
const ZERO = { n: 0, d: 1 }
const ONE = { n: 1, d: 1 }

export function gcd(a, b) {
  return b ? gcd(b, a % b) : a
}

function frac(n, d = 1) {
  const divisor = gcd(Math.abs(n), Math.abs(d)) || 1
  return { n: n / divisor, d: d / divisor }
}

function add(a, b) {
  return frac(a.n * b.d + b.n * a.d, a.d * b.d)
}

function subtract(a, b) {
  return frac(a.n * b.d - b.n * a.d, a.d * b.d)
}

function multiply(a, b) {
  return frac(a.n * b.n, a.d * b.d)
}

function divide(a, b) {
  return frac(a.n * b.d, a.d * b.n)
}

function sumOf(fractions) {
  return fractions.reduce(add, ZERO)
}

function isPositive(fraction) {
  return fraction.n > 0
}

function exceedsOne(fraction) {
  return fraction.n > fraction.d
}

function text(fraction) {
  if (fraction.n === 0) {
    return '0'
  }

  return fraction.d === 1 ? 'All' : `${fraction.n}/${fraction.d}`
}

const PROBLEM_TEXT = {
  estate: () => 'Enter the estate as a number of zero or more.',
  count: ({ heir }) => `Enter a whole number of zero or more for ${heir}.`,
  onlyOne: ({ heir }) => `There can be only one ${heir}.`,
  spouses: () => 'The deceased leaves either a husband or a wife, not both. Remove one.',
  wives: ({ max }) => `Enter no more than ${max} wives.`,
  none: () => 'Select at least one heir.',
}

// What is wrong with the input, as { code, params }, or null when it can be calculated.
export function inheritanceProblem(heirs, estate) {
  if (typeof estate !== 'number' || !Number.isFinite(estate) || estate < 0) {
    return { code: 'estate', params: {} }
  }

  for (const def of HEIR_DEFS) {
    const count = heirs[def.key] ?? 0
    if (!Number.isInteger(count) || count < 0) {
      return { code: 'count', params: { heir: def.label, heirKey: def.key } }
    }

    if (count > 1 && !def.countable) {
      return { code: 'onlyOne', params: { heir: def.label, heirKey: def.key } }
    }
  }

  if (heirs.husband && heirs.wife) {
    return { code: 'spouses', params: {} }
  }

  if (heirs.wife > MAX_WIVES) {
    return { code: 'wives', params: { max: MAX_WIVES } }
  }

  if (!HEIR_DEFS.some((def) => heirs[def.key] > 0)) {
    return { code: 'none', params: {} }
  }

  return null
}

export function validateInheritance(heirs, estate) {
  const problem = inheritanceProblem(heirs, estate)
  return problem ? PROBLEM_TEXT[problem.code](problem.params) : null
}

export function excludedHeirs(heirs) {
  const has = (key) => heirs[key] > 0
  const excluded = new Set()
  const exclude = (...keys) => keys.forEach((key) => excluded.add(key))

  if (has('son')) {
    exclude('grandson', 'granddaughter', 'brother', 'sister')
  }

  if (has('grandson')) {
    exclude('brother', 'sister')
  }

  if (has('father')) {
    exclude('paternal_grandfather', 'paternal_grandmother', 'brother', 'sister')
  }

  if (has('mother')) {
    exclude('paternal_grandmother', 'maternal_grandmother')
  }

  if (GRANDFATHER_EXCLUDES_SIBLINGS && has('paternal_grandfather')) {
    exclude('brother', 'sister')
  }

  if (heirs.daughter >= 2 && !has('grandson')) {
    exclude('granddaughter')
  }

  return excluded
}

function oneOrMany(count) {
  return count === 1 ? frac(1, 2) : frac(2, 3)
}

// Returns the fixed share of every heir who has one, and the class that takes the residue.
export function assignShares(all, present) {
  const has = (key) => present[key] > 0
  const hasDescendant = ['son', 'daughter', 'grandson', 'granddaughter'].some((key) => all[key] > 0)
  const hasMaleDescendant = all.son > 0 || all.grandson > 0
  const siblingCount = (all.brother ?? 0) + (all.sister ?? 0)
  const fixed = {}

  const spouse = SPOUSES.find(has)
  if (spouse === 'husband') {
    fixed.husband = hasDescendant ? frac(1, 4) : frac(1, 2)
  }

  if (spouse === 'wife') {
    fixed.wife = hasDescendant ? frac(1, 8) : frac(1, 4)
  }

  const ancestor = ['father', 'paternal_grandfather'].find(has)
  if (ancestor && hasDescendant) {
    fixed[ancestor] = frac(1, 6)
  }

  let motherTakesThirdOfRemainder = false
  if (has('mother')) {
    if (hasDescendant || siblingCount >= 2) {
      fixed.mother = frac(1, 6)
    } else if (spouse && has('father')) {
      fixed.mother = multiply(subtract(ONE, fixed[spouse]), frac(1, 3))
      motherTakesThirdOfRemainder = true
    } else {
      fixed.mother = frac(1, 3)
    }
  }

  const grandmothers = ['paternal_grandmother', 'maternal_grandmother'].filter(has)
  for (const key of grandmothers) {
    fixed[key] = frac(1, 6 * grandmothers.length)
  }

  if (has('daughter') && !has('son')) {
    fixed.daughter = oneOrMany(present.daughter)
  }

  if (has('granddaughter') && !has('grandson')) {
    fixed.granddaughter = has('daughter') ? frac(1, 6) : oneOrMany(present.granddaughter)
  }

  const sisterWithDaughters = has('sister') && !has('brother') && hasDescendant
  if (has('sister') && !has('brother') && !hasDescendant) {
    fixed.sister = oneOrMany(present.sister)
  }

  let residuaries = []
  if (has('son')) {
    residuaries = ['son', 'daughter'].filter(has)
  } else if (has('grandson')) {
    residuaries = ['grandson', 'granddaughter'].filter(has)
  } else if (ancestor && !hasMaleDescendant) {
    residuaries = [ancestor]
  } else if (has('brother')) {
    residuaries = ['brother', 'sister'].filter(has)
  } else if (sisterWithDaughters) {
    residuaries = ['sister']
  }

  return { fixed, residuaries, motherTakesThirdOfRemainder, sharedSixth: grandmothers.length > 1 }
}

const MALES = new Set(['son', 'grandson', 'brother'])

function residueParts(residuaries, present) {
  const mixed = residuaries.length > 1
  return Object.fromEntries(
    residuaries.map((key) => [key, present[key] * (mixed && MALES.has(key) ? 2 : 1)]),
  )
}

function settleToTotal(values, total) {
  const leftover = total - values.reduce((sum, value) => sum + value, 0)
  if (leftover !== 0 && values.length) {
    values[values.indexOf(Math.max(...values))] += leftover
  }

  return values
}

const RULE_TEXT = {
  fixed: ({ share }) => `Fixed share of ${share}`,
  motherThird: () => "A third of what remains after the spouse's share",
  grandmothers: () => 'Half of the one sixth the grandmothers share',
  residueNone: () => 'Residuary, but the fixed shares used the whole estate',
  residueMixed: () => 'Residue, two parts to each male and one to each female',
  residueWithDaughters: () => 'Residue beside a daughter or granddaughter',
  residue: () => 'Residue after the fixed shares',
  remainder: () => 'No other heir was selected to receive this. Ask a scholar where it goes.',
}
const EXTRA_TEXT = {
  awl: ", reduced in proportion because the fixed shares exceed the estate ('awl)",
  plusResidue: ', plus the residue',
  radd: ', plus a part of the remainder returned to the fixed-share heirs (radd)',
}

// The English sentence for a rule; the page builds the same sentence in the reader's language.
export function ruleText({ base, share, extras, source }) {
  const sentence = RULE_TEXT[base]({ share }) + extras.map((extra) => EXTRA_TEXT[extra]).join('')
  if (!source) {
    return sentence
  }

  return `${sentence} · ${source === 'Hadith' ? 'Hadith' : `Qur'an ${source}`}`
}

export function calcInheritance(heirs, estate = 100) {
  const problem = inheritanceProblem(heirs, estate)
  if (problem) {
    return { error: PROBLEM_TEXT[problem.code](problem.params), problem, shares: [] }
  }

  const excluded = excludedHeirs(heirs)
  const present = Object.fromEntries(
    HEIR_DEFS.filter((def) => heirs[def.key] > 0 && !excluded.has(def.key)).map((def) => [
      def.key,
      heirs[def.key],
    ]),
  )
  const { fixed, residuaries, motherTakesThirdOfRemainder, sharedSixth } = assignShares(
    heirs,
    present,
  )

  const final = { ...fixed }
  const rule = {}
  for (const [key, share] of Object.entries(fixed)) {
    rule[key] = { base: 'fixed', share: text(share), extras: [] }
  }

  if (motherTakesThirdOfRemainder) {
    rule.mother.base = 'motherThird'
  }

  if (sharedSixth) {
    rule.paternal_grandmother.base = 'grandmothers'
    rule.maternal_grandmother.base = 'grandmothers'
  }

  const fixedTotal = sumOf(Object.values(fixed))
  if (exceedsOne(fixedTotal)) {
    for (const key of Object.keys(fixed)) {
      final[key] = divide(fixed[key], fixedTotal)
      rule[key].extras.push('awl')
    }
  }

  const remainder = exceedsOne(fixedTotal) ? ZERO : subtract(ONE, fixedTotal)
  let unclaimed = ZERO

  if (residuaries.length) {
    const parts = residueParts(residuaries, present)
    const totalParts = Object.values(parts).reduce((sum, value) => sum + value, 0)
    const mixed = residuaries.length > 1
    for (const key of residuaries) {
      const share = multiply(remainder, frac(parts[key], totalParts))
      final[key] = add(final[key] ?? ZERO, share)
      if (fixed[key]) {
        if (isPositive(share)) {
          rule[key].extras.push('plusResidue')
        }
      } else if (!isPositive(remainder)) {
        rule[key] = { base: 'residueNone', extras: [] }
      } else if (mixed) {
        rule[key] = { base: 'residueMixed', extras: [] }
      } else if (key === 'sister') {
        rule[key] = { base: 'residueWithDaughters', extras: [] }
      } else {
        rule[key] = { base: 'residue', extras: [] }
      }
    }
  } else if (isPositive(remainder)) {
    const returnedTo = Object.keys(fixed).filter(
      (key) => SPOUSE_TAKES_RADD || !SPOUSES.includes(key),
    )
    const returnedBase = sumOf(returnedTo.map((key) => fixed[key]))
    for (const key of returnedTo) {
      final[key] = add(fixed[key], multiply(remainder, divide(fixed[key], returnedBase)))
      rule[key].extras.push('radd')
    }
    if (!returnedTo.length) {
      unclaimed = remainder
    }
  }

  const lines = HEIR_DEFS.filter((def) => final[def.key]).map((def) => {
    const ruleParts = { ...rule[def.key], source: def.quran }
    return {
      key: def.key,
      label: def.label,
      count: present[def.key],
      fraction: final[def.key],
      ruleParts,
      rule: ruleText(ruleParts),
    }
  })
  if (isPositive(unclaimed)) {
    const ruleParts = { base: 'remainder', extras: [], source: null }
    lines.push({
      key: 'remainder',
      label: 'Remainder',
      count: 1,
      fraction: unclaimed,
      ruleParts,
      rule: ruleText(ruleParts),
    })
  }

  const estatePence = Math.round(estate * 100)
  const people = lines.flatMap((line, index) =>
    Array.from({ length: line.count }, () => ({
      index,
      pence: Math.round((estatePence * line.fraction.n) / (line.fraction.d * line.count)),
    })),
  )
  const pence = settleToTotal(
    people.map((person) => person.pence),
    estatePence,
  )
  const tenths = settleToTotal(
    lines.map((line) => Math.round((1000 * line.fraction.n) / line.fraction.d)),
    1000,
  )

  const shares = lines.map((line, index) => {
    const each = pence.filter((_, person) => people[person].index === index)
    return {
      ...line,
      share: text(line.fraction),
      percent: tenths[index] / 10,
      amount: each.reduce((sum, value) => sum + value, 0) / 100,
      each: each.map((value) => value / 100),
    }
  })

  return { error: null, shares }
}

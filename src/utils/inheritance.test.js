import { describe, it, expect } from 'vitest'
import { calcInheritance, validateInheritance, excludedHeirs, HEIR_DEFS } from './inheritance.js'

function percents(heirs, estate = 100) {
  const { shares } = calcInheritance(heirs, estate)
  return Object.fromEntries(shares.map((share) => [share.key, share.percent]))
}

function line(heirs, key, estate = 100) {
  return calcInheritance(heirs, estate).shares.find((share) => share.key === key)
}

describe('validation', () => {
  it('asks for at least one heir', () => {
    expect(calcInheritance({}, 1000)).toEqual({ error: 'Select at least one heir.', shares: [] })
    expect(calcInheritance({ son: 0 }, 1000).error).toBe('Select at least one heir.')
  })

  it('rejects a husband and a wife together', () => {
    expect(calcInheritance({ husband: 1, wife: 1 }, 1000).error).toContain('not both')
  })

  it('accepts four wives and rejects five', () => {
    expect(calcInheritance({ wife: 4 }, 1000).error).toBeNull()
    expect(calcInheritance({ wife: 5 }, 1000).error).toContain('no more than 4')
  })

  it.each([-1, 1.5, 'two', Number.NaN])('rejects a count of %j', (count) => {
    expect(validateInheritance({ son: count }, 1000)).toContain('whole number')
  })

  it.each([-1, 'lots', Number.NaN, Number.POSITIVE_INFINITY, null, undefined])(
    'rejects an estate of %j',
    (estate) => {
      expect(validateInheritance({ son: 1 }, estate)).toContain('estate')
    },
  )

  it('rejects two of an heir there can be only one of', () => {
    expect(validateInheritance({ father: 2 }, 1000)).toContain('only one')
  })
})

describe('exclusion', () => {
  it('lets a son exclude grandsons, granddaughters, brothers and sisters', () => {
    const heirs = { son: 1, grandson: 1, granddaughter: 1, brother: 1, sister: 1 }

    expect([...excludedHeirs(heirs)].sort()).toEqual([
      'brother',
      'granddaughter',
      'grandson',
      'sister',
    ])
    expect(percents(heirs)).toEqual({ son: 100 })
  })

  it('lets a father exclude the grandfather, brothers and sisters', () => {
    expect(percents({ father: 1, paternal_grandfather: 1, brother: 1, sister: 2 })).toEqual({
      father: 100,
    })
  })

  it('lets a grandson exclude brothers and sisters', () => {
    expect(percents({ grandson: 1, brother: 1, sister: 1 })).toEqual({ grandson: 100 })
  })

  it('lets a grandfather exclude brothers and sisters', () => {
    expect(percents({ paternal_grandfather: 1, brother: 1 })).toEqual({ paternal_grandfather: 100 })
  })

  it('lets two daughters exclude a granddaughter', () => {
    expect(percents({ daughter: 2, granddaughter: 1 })).toEqual({ daughter: 100 })
  })

  it('keeps the granddaughter beside two daughters when a grandson is present', () => {
    const shares = percents({ daughter: 2, granddaughter: 1, grandson: 1 })

    expect(shares.daughter).toBe(66.7)
    expect(shares.grandson).toBe(22.2)
    expect(shares.granddaughter).toBe(11.1)
  })

  it('lets a mother exclude both grandmothers, and a father the paternal one', () => {
    expect(
      percents({ mother: 1, paternal_grandmother: 1, maternal_grandmother: 1, son: 1 }),
    ).toEqual({ mother: 16.7, son: 83.3 })
    expect(
      percents({ father: 1, paternal_grandmother: 1, maternal_grandmother: 1, son: 1 }),
    ).toEqual({ father: 16.7, maternal_grandmother: 16.7, son: 66.6 })
  })

  it('does not let a brother exclude a sister', () => {
    expect(excludedHeirs({ brother: 1, sister: 1 }).size).toBe(0)
  })
})

describe('the table in Spec 5.9', () => {
  it.each([
    ['husband with descendants', { husband: 1, daughter: 1 }, 'husband', 25],
    ['husband without', { husband: 1, brother: 1 }, 'husband', 50],
    ['wives with descendants', { wife: 2, son: 1 }, 'wife', 12.5],
    ['wife without', { wife: 1, brother: 1 }, 'wife', 25],
    ['father with a son', { father: 1, son: 1 }, 'father', 16.7],
    ['father with a grandson', { father: 1, grandson: 1 }, 'father', 16.7],
    ['father as residuary', { father: 1, wife: 1 }, 'father', 75],
    ['father beside a daughter', { father: 1, daughter: 1 }, 'father', 50],
    ['mother with a son', { mother: 1, son: 1 }, 'mother', 16.7],
    ['mother with a daughter', { mother: 1, daughter: 1, father: 1 }, 'mother', 16.7],
    ['mother with two siblings', { mother: 1, brother: 2 }, 'mother', 16.7],
    ['mother with one sibling', { mother: 1, brother: 1 }, 'mother', 33.3],
    ['son', { son: 2, wife: 1 }, 'son', 87.5],
    ['one daughter', { daughter: 1, brother: 1 }, 'daughter', 50],
    ['two daughters', { daughter: 2, brother: 1 }, 'daughter', 66.7],
    ['daughter beside a son', { daughter: 1, son: 1 }, 'daughter', 33.3],
    ['grandson', { grandson: 1, daughter: 1 }, 'grandson', 50],
    ['granddaughter alone', { granddaughter: 1, brother: 1 }, 'granddaughter', 50],
    ['two granddaughters', { granddaughter: 2, brother: 1 }, 'granddaughter', 66.7],
    [
      'granddaughter with one daughter',
      { granddaughter: 1, daughter: 1, brother: 1 },
      'granddaughter',
      16.7,
    ],
    ['granddaughter with a grandson', { granddaughter: 1, grandson: 1 }, 'granddaughter', 33.3],
    ['brother', { brother: 1, wife: 1 }, 'brother', 75],
    ['one sister', { sister: 1, husband: 1 }, 'sister', 50],
    ['two sisters', { sister: 2, wife: 1 }, 'sister', 75],
    ['sister beside a brother', { sister: 1, brother: 1 }, 'sister', 33.3],
    ['sister beside two daughters', { sister: 1, daughter: 2 }, 'sister', 33.3],
    ['grandfather with a son', { paternal_grandfather: 1, son: 1 }, 'paternal_grandfather', 16.7],
    ['grandfather as residuary', { paternal_grandfather: 1, wife: 1 }, 'paternal_grandfather', 75],
    ['paternal grandmother', { paternal_grandmother: 1, son: 1 }, 'paternal_grandmother', 16.7],
    ['maternal grandmother', { maternal_grandmother: 1, son: 1 }, 'maternal_grandmother', 16.7],
    [
      'two grandmothers',
      { maternal_grandmother: 1, paternal_grandmother: 1, son: 1 },
      'maternal_grandmother',
      8.3,
    ],
  ])('%s', (name, heirs, key, percent) => {
    expect(percents(heirs)[key]).toBe(percent)
  })
})

describe('worked cases', () => {
  it('gives a son alone everything', () => {
    expect(line({ son: 1 }, 'son').share).toBe('All')
    expect(percents({ son: 1 })).toEqual({ son: 100 })
  })

  it('gives a husband and a son 25% and 75%', () => {
    expect(percents({ husband: 1, son: 1 })).toEqual({ husband: 25, son: 75 })
  })

  it('gives a son and a daughter two parts and one', () => {
    expect(line({ son: 1, daughter: 1 }, 'son').share).toBe('2/3')
    expect(line({ son: 1, daughter: 1 }, 'daughter').share).toBe('1/3')
  })

  it('gives a full brother and a full sister two parts and one', () => {
    expect(line({ brother: 1, sister: 1 }, 'brother').share).toBe('2/3')
    expect(line({ brother: 1, sister: 1 }, 'sister').share).toBe('1/3')
  })

  it('gives a daughter and a granddaughter 1/2 and 1/6, and 75% and 25% after radd', () => {
    const heirs = { daughter: 1, granddaughter: 1 }

    expect(percents(heirs)).toEqual({ daughter: 75, granddaughter: 25 })
    expect(line(heirs, 'daughter').rule).toContain('Fixed share of 1/2')
    expect(line(heirs, 'granddaughter').rule).toContain('Fixed share of 1/6')
    expect(line(heirs, 'granddaughter').rule).toContain('radd')
    expect(line(heirs, 'daughter').share).toBe('3/4')
  })

  it("reduces a husband, a mother and two sisters to 37.5%, 12.5% and 50% ('awl)", () => {
    const heirs = { husband: 1, mother: 1, sister: 2 }

    expect(percents(heirs)).toEqual({ husband: 37.5, mother: 12.5, sister: 50 })
    expect(line(heirs, 'husband').share).toBe('3/8')
    expect(line(heirs, 'husband').rule).toContain("'awl")
  })

  it('keeps the wife at 1/8 beside one daughter, and returns the rest to the daughter', () => {
    const heirs = { wife: 1, daughter: 1 }

    expect(percents(heirs)).toEqual({ wife: 12.5, daughter: 87.5 })
    expect(line(heirs, 'wife').share).toBe('1/8')
    expect(line(heirs, 'wife').rule).not.toContain('radd')
    expect(line(heirs, 'daughter').share).toBe('7/8')
  })

  it('shows what a lone spouse does not take as a remainder', () => {
    expect(percents({ husband: 1 })).toEqual({ husband: 50, remainder: 50 })
    expect(percents({ wife: 3 })).toEqual({ wife: 25, remainder: 75 })
  })

  it('gives the mother a third of the remainder beside a spouse and the father', () => {
    expect(percents({ husband: 1, mother: 1, father: 1 })).toEqual({
      husband: 50,
      father: 33.3,
      mother: 16.7,
    })
    expect(percents({ wife: 1, mother: 1, father: 1 })).toEqual({
      wife: 25,
      father: 50,
      mother: 25,
    })
  })

  it("gives the father his sixth under 'awl beside daughters", () => {
    const shares = calcInheritance({ husband: 1, daughter: 2, mother: 1, father: 1 }, 100).shares

    expect(shares.find((share) => share.key === 'father').share).toBe('2/15')
    expect(shares.find((share) => share.key === 'daughter').share).toBe('8/15')
  })

  it('gives the father nothing more than his sixth when no residue is left', () => {
    expect(line({ husband: 1, daughter: 2, mother: 1, father: 1 }, 'father').rule).not.toContain(
      'residue',
    )
  })

  it('shows a residuary left with nothing', () => {
    const brother = line({ husband: 1, sister: 0, mother: 1, daughter: 2, brother: 1 }, 'brother')

    expect(brother.percent).toBe(0)
    expect(brother.rule).toContain('used the whole estate')
  })

  it('shares the residue among sisters beside a daughter (Bukhari 6736)', () => {
    expect(percents({ daughter: 1, granddaughter: 1, sister: 1 })).toEqual({
      daughter: 50,
      granddaughter: 16.7,
      sister: 33.3,
    })
  })
})

describe('amounts', () => {
  it('shows zero amounts for an estate of zero', () => {
    const { shares } = calcInheritance({ wife: 1, son: 1 }, 0)

    expect(shares.map((share) => share.amount)).toEqual([0, 0])
    expect(shares.map((share) => share.percent)).toEqual([12.5, 87.5])
  })

  it('makes three sons sharing 100 add up to exactly 100', () => {
    const sons = line({ son: 3 }, 'son', 100)

    expect(sons.each).toEqual([33.34, 33.33, 33.33])
    expect(sons.amount).toBe(100)
  })

  it('gives a wife, two sons and a daughter 15,000, 42,000 each and 21,000 of 120,000', () => {
    const { shares } = calcInheritance({ wife: 1, son: 2, daughter: 1 }, 120000)
    const byKey = Object.fromEntries(shares.map((share) => [share.key, share.each]))

    expect(byKey).toEqual({ wife: [15000], son: [42000, 42000], daughter: [21000] })
  })

  it('totals 100% and the estate for every combination tried', () => {
    const keys = HEIR_DEFS.map((def) => def.key)
    let tried = 0
    for (let mask = 1; mask < 1 << keys.length; mask += 1) {
      const heirs = {}
      keys.forEach((key, bit) => {
        if (mask & (1 << bit)) {
          heirs[key] = HEIR_DEFS[bit].countable ? (bit % 3) + 1 : 1
        }
      })
      if (heirs.husband && heirs.wife) {
        continue
      }

      const { error, shares } = calcInheritance(heirs, 98765.43)
      expect(error).toBeNull()
      const percent = shares.reduce((sum, share) => sum + Math.round(share.percent * 10), 0)
      const pence = shares.reduce((sum, share) => sum + Math.round(share.amount * 100), 0)
      const fractions = shares.reduce((sum, share) => sum + share.fraction.n / share.fraction.d, 0)
      if (percent !== 1000 || pence !== 9876543 || Math.abs(fractions - 1) > 1e-9) {
        throw new Error(`does not total for ${JSON.stringify(heirs)}`)
      }
      for (const share of shares) {
        expect(share.fraction.n).toBeGreaterThanOrEqual(0)
        expect(share.rule).toBeTruthy()
      }
      tried += 1
    }

    expect(tried).toBeGreaterThan(5000)
  })
})

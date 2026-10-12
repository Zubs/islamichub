import { describe, it, expect } from 'vitest'
import { perGram, nisabFor, parsePrices, calculateZakat } from './zakat.js'

const PRICES = { goldPerGram: 100, silverPerGram: 1.5 }

function validReply() {
  return {
    date: '2026-10-12',
    usd: { xau: 1 / 4000, xag: 1 / 50, gbp: 0.75, eur: 0.9, sar: 3.75, ngn: 1330 },
  }
}

describe('perGram', () => {
  it('divides the dollar price per ounce by the grams in a troy ounce', () => {
    expect(perGram(4000, 1)).toBeCloseTo(128.6, 2)
  })

  it('multiplies by the currency rate and nothing else', () => {
    expect(perGram(4000, 0.75)).toBeCloseTo(96.45, 2)
    expect(perGram(4000, 0.75)).toBe(perGram(4000, 1) * 0.75)
  })
})

describe('nisabFor', () => {
  it('is 85 g of gold by default', () => {
    expect(nisabFor('gold', PRICES)).toBe(8500)
  })

  it('is 595 g of silver for the silver method', () => {
    expect(nisabFor('silver', PRICES)).toBe(892.5)
  })
})

describe('parsePrices', () => {
  it('reads metals as dollars per ounce, the four rates and the date', () => {
    const { usdPerOunce, rates, date } = parsePrices(validReply())

    expect(usdPerOunce.gold).toBeCloseTo(4000, 6)
    expect(usdPerOunce.silver).toBeCloseTo(50, 6)
    expect(rates).toEqual({ USD: 1, GBP: 0.75, EUR: 0.9, SAR: 3.75 })
    expect(date).toBe('2026-10-12')
  })

  it.each([null, undefined, 'text', 42, [], {}, { usd: null }])(
    'gives no metals and no rates for a reply of %j',
    (reply) => {
      expect(parsePrices(reply)).toEqual({ usdPerOunce: null, rates: null, date: null })
    },
  )

  it.each([undefined, 0, -0.00025, 'cheap', null, Number.NaN, Number.POSITIVE_INFINITY])(
    'treats a gold figure of %j as no metal prices, and keeps the rates',
    (xau) => {
      const reply = validReply()
      reply.usd.xau = xau

      const { usdPerOunce, rates } = parsePrices(reply)

      expect(usdPerOunce).toBeNull()
      expect(rates).not.toBeNull()
    },
  )

  it('treats a missing silver figure as no metal prices', () => {
    const reply = validReply()
    delete reply.usd.xag

    expect(parsePrices(reply).usdPerOunce).toBeNull()
  })

  it.each(['gbp', 'eur', 'sar'])(
    'gives no rates when %s is missing, and keeps the metals',
    (code) => {
      const reply = validReply()
      delete reply.usd[code]

      const { usdPerOunce, rates } = parsePrices(reply)

      expect(rates).toBeNull()
      expect(usdPerOunce).not.toBeNull()
    },
  )

  it('gives no date when the reply has none', () => {
    const reply = validReply()
    delete reply.date

    expect(parsePrices(reply).date).toBeNull()
  })
})

describe('calculateZakat', () => {
  it('owes nothing and is not obligatory when nothing is entered', () => {
    const result = calculateZakat({}, PRICES, 'gold')

    expect(result.net).toBe(0)
    expect(result.obligated).toBe(false)
    expect(result.zakatDue).toBe(0)
    expect(result.progressPct).toBe(0)
  })

  it('is 2.5% of one kind of wealth above the nisab', () => {
    const result = calculateZakat({ cashSavings: 10000 }, PRICES, 'gold')

    expect(result.obligated).toBe(true)
    expect(result.zakatDue).toBe(250)
  })

  it('adds each group and subtracts debts', () => {
    const result = calculateZakat(
      {
        cashHome: 500,
        cashCurrent: 1500,
        loansGiven: 1000,
        shares: 4000,
        pension: 6000,
        loansDue: 2000,
        bills: 500,
      },
      PRICES,
      'gold',
    )

    expect(result).toMatchObject({
      cashTotal: 2000,
      owedTotal: 1000,
      investTotal: 10000,
      debtsTotal: 2500,
      gross: 13000,
      net: 10500,
      zakatDue: 262.5,
    })
  })

  it('is obligatory when net wealth equals the nisab exactly', () => {
    const result = calculateZakat({ cashSavings: 8500 }, PRICES, 'gold')

    expect(result.obligated).toBe(true)
    expect(result.zakatDue).toBe(212.5)
    expect(result.progressPct).toBe(100)
  })

  it('is not obligatory one penny under the nisab', () => {
    const result = calculateZakat({ cashSavings: 8499.99 }, PRICES, 'gold')

    expect(result.obligated).toBe(false)
    expect(result.zakatDue).toBe(0)
  })

  it('gives zero, never a negative figure, when debts exceed wealth', () => {
    const result = calculateZakat({ cashSavings: 1000, loansDue: 5000 }, PRICES, 'gold')

    expect(result.net).toBe(0)
    expect(result.zakatDue).toBe(0)
    expect(result.obligated).toBe(false)
  })

  it('values 100 g of 22-carat gold at weight times purity times price', () => {
    const result = calculateZakat({ goldGrams: 100, goldPurity: 0.9167 }, PRICES, 'gold')

    expect(result.metalsTotal).toBeCloseTo(9167, 6)
  })

  it('adds gold, silver and a directly entered value', () => {
    const result = calculateZakat(
      { goldGrams: 10, goldPurity: 1, silverGrams: 200, metalsDirect: 50 },
      PRICES,
      'gold',
    )

    expect(result.metalsTotal).toBe(1350)
  })

  it('uses the silver nisab when the silver method is chosen', () => {
    const amounts = { cashSavings: 1000 }

    expect(calculateZakat(amounts, PRICES, 'gold').obligated).toBe(false)
    expect(calculateZakat(amounts, PRICES, 'silver')).toMatchObject({
      nisab: 892.5,
      obligated: true,
      zakatDue: 25,
    })
  })

  it('caps progress towards the nisab at 100', () => {
    expect(calculateZakat({ cashSavings: 50000 }, PRICES, 'gold').progressPct).toBe(100)
    expect(calculateZakat({ cashSavings: 4250 }, PRICES, 'gold').progressPct).toBe(50)
  })

  it('treats text and empty fields as zero', () => {
    const result = calculateZakat(
      { cashSavings: '', cashHome: 'abc', shares: 9000 },
      PRICES,
      'gold',
    )

    expect(result.gross).toBe(9000)
  })
})

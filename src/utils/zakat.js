import { parseStoredObject } from '@/utils/storage.js'

export const TROY_OUNCE_GRAMS = 31.1035
export const GOLD_NISAB_GRAMS = 85
export const SILVER_NISAB_GRAMS = 595
export const ZAKAT_RATE = 0.025
export const CURRENCIES = ['USD', 'GBP', 'EUR', 'SAR', 'NGN']

function isPrice(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

function toPence(amount) {
  return Math.round(amount * 100)
}

function sum(...amounts) {
  return amounts.reduce((total, amount) => total + (Number(amount) || 0), 0)
}

export function parseCustomPrice(text) {
  if (text === '' || text === null || text === undefined) {
    return null
  }

  const price = Number(text)
  return isPrice(price) ? price : undefined
}

export function perGram(usdPerOunce, rate) {
  return (usdPerOunce / TROY_OUNCE_GRAMS) * rate
}

export function nisabFor(method, { goldPerGram, silverPerGram }) {
  return method === 'silver' ? SILVER_NISAB_GRAMS * silverPerGram : GOLD_NISAB_GRAMS * goldPerGram
}

export function parsePrices(reply) {
  const usd = reply?.usd
  if (!usd || typeof usd !== 'object') {
    return { usdPerOunce: null, rates: null, date: null }
  }

  const usdPerOunce =
    isPrice(usd.xau) && isPrice(usd.xag) ? { gold: 1 / usd.xau, silver: 1 / usd.xag } : null

  const fetchedRates = Object.fromEntries(
    CURRENCIES.map((code) => [code, code === 'USD' ? 1 : usd[code.toLowerCase()]]),
  )
  const rates = Object.values(fetchedRates).every(isPrice) ? fetchedRates : null

  return { usdPerOunce, rates, date: typeof reply.date === 'string' ? reply.date : null }
}

export function parseSavedPrices(text) {
  const saved = parseStoredObject(text)
  const metals = saved.usdPerOunce
  if (
    !isPrice(metals?.gold) ||
    !isPrice(metals?.silver) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(saved.date)
  ) {
    return null
  }

  const ratesValid = CURRENCIES.every((code) => isPrice(saved.rates?.[code]))
  return {
    usdPerOunce: { gold: metals.gold, silver: metals.silver },
    rates: ratesValid
      ? Object.fromEntries(CURRENCIES.map((code) => [code, saved.rates[code]]))
      : null,
    date: saved.date,
  }
}

export function calculateZakat(amounts, prices, nisabMethod) {
  const cashTotal = sum(
    amounts.cashHome,
    amounts.cashCurrent,
    amounts.cashSavings,
    amounts.cashForeign,
  )
  const owedTotal = sum(amounts.loansGiven, amounts.unpaidIncome, amounts.otherOwed)
  const metalsTotal = sum(
    (Number(amounts.goldGrams) || 0) * (Number(amounts.goldPurity) || 0) * prices.goldPerGram,
    (Number(amounts.silverGrams) || 0) * prices.silverPerGram,
    amounts.metalsDirect,
  )
  const investTotal = sum(amounts.shares, amounts.isas, amounts.inventory, amounts.pension)
  const debtsTotal = sum(amounts.loansDue, amounts.creditCards, amounts.bills, amounts.otherDebts)

  const gross = cashTotal + owedTotal + metalsTotal + investTotal
  const net = Math.max(0, gross - debtsTotal)
  const nisab = nisabFor(nisabMethod, prices)
  const obligated = net > 0 && toPence(net) >= toPence(nisab)

  return {
    cashTotal,
    owedTotal,
    metalsTotal,
    investTotal,
    debtsTotal,
    gross,
    net,
    nisab,
    obligated,
    zakatDue: obligated ? net * ZAKAT_RATE : 0,
    progressPct: nisab > 0 ? Math.min(100, (net / nisab) * 100) : 0,
  }
}

// The writing of the inheritance page, in English: the source every translation follows.
// Sections follow the page from top to bottom. A translation gives the same sections and keys;
// in a list it gives only the text it translates, and Arabic, references and icons are shared.
export default {
  header: {
    islamicTool: 'Islamic Tool · الميراث',
    faraIdIslamicInheritanceCalculator: "Fara'id — Islamic Inheritance Calculator",
    calculateTheQurAnicSharesOf:
      "Calculate the Qur'anic shares of inheritance based on the heirs present. Each heir's share is derived directly from Qur'an 4:11–12 and 4:176.",
    allahInstructsYouConcerningYourChildren:
      'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
    theFoundationalVerseOfIslamicInheritance: 'The foundational verse of Islamic inheritance law.',
  },
  understandingFaraId: {
    understandingFaraId: "Understanding Fara'id",
    theQurAnicSystemOfInheritance: "The Qur'anic system of inheritance",
    faraIdFromTheRootMeaning:
      'Fara\'id (فَرَائِض) — from the root meaning "obligatory portions" — is the Islamic law of inheritance derived primarily from Qur\'an 4:11–12 and 4:176. It is one of the most precisely legislated areas of Islamic law, with specific fractional shares assigned directly by divine revelation.',
    theSystemHasTwoMainCategories: 'The system has two main categories of heirs:',
    dhawuAlFurud: 'Dhawu al-furud',
    thoseWithFixedQurAnicShares: "(those with fixed Qur'anic shares) and",
    asaba: 'Asaba',
    residuariesWhoReceiveTheRemainderAfter:
      '(residuaries who receive the remainder after fixed shares are distributed). Males generally receive double the share of their equivalent female relative, reflecting the greater financial obligations Islam places on men.',
    giveTheFaraIdTheShares:
      '"Give the Fara\'id (the shares of the inheritance that are prescribed in the Qur\'an) to those who are entitled to receive it. Then whatever remains, should be given to the closest male relative of the deceased." — The Prophet Muhammad ﷺ (narrated by Ibn Abbas RA)',
    fixedQurAnicSharesAtA: "Fixed Qur'anic shares at a glance",
    heir: 'Heir',
    withChildren: 'With children',
    withoutChildren: 'Without children',
    source: 'Source',
  },
  lists: {
    sharesTable: [
      ['Husband', '1/4', '1/2', "Qur'an 4:12"],
      ['Wife (or wives)', '1/8', '1/4', "Qur'an 4:12"],
      ['Father', '1/6 (plus any residue beside daughters only)', 'Residue', "Qur'an 4:11"],
      ['Mother', '1/6', '1/3', "Qur'an 4:11"],
      ['Daughter (1)', '1/2 (no sons)', '1/2', "Qur'an 4:11"],
      ['Daughters (2+)', '2/3 (no sons)', '2/3', "Qur'an 4:11"],
      ['Son', 'Residue (double daughter)', 'Residue', "Qur'an 4:11"],
      ['Full Sister (1)', '1/2 (if no closer heirs)', '1/2', "Qur'an 4:176"],
    ],
    faqs: [
      {
        q: 'What is awl (proportional reduction)?',
        a: 'When the sum of all fixed shares exceeds the estate, the shares are proportionally reduced so they sum to the estate. This is called awl (العَوْل) — the consensus of the Companions, adopted by all schools.',
      },
      {
        q: 'What is radd (return)?',
        a: 'When the fixed shares do not exhaust the estate and there are no residuary heirs, the remainder is returned proportionally to the fixed-share heirs. This is called radd (الرَّدّ). Scholars differ on whether the husband or wife shares in it; this calculator returns it to the other fixed-share heirs only, and shows it as a remainder when a spouse is the only heir.',
      },
      {
        q: 'Who is excluded from inheritance?',
        a: 'A murderer of the deceased, an apostate (those who leave Islam), and non-Muslims cannot inherit from a Muslim. These are the three main exclusions.',
      },
      {
        q: "Does a will override Qur'anic shares?",
        a: "No — the Qur'anic shares (fara'id) are mandatory and cannot be altered by a will. However, a Muslim may leave up to one-third of their estate to non-heirs through a valid wasiyyah (bequest).",
      },
    ],
  },
}

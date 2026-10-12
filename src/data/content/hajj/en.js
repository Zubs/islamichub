// The writing of the hajj page, in English: the source every translation follows.
// Sections follow the page from top to bottom. A translation gives the same sections and keys;
// in a list it gives only the text it translates, and Arabic, references and icons are shared.
export default {
  header: {
    pillar5Of5: 'Pillar 5 of 5 · الحج',
    hajjThePilgrimage: 'Hajj — The Pilgrimage',
    theFifthAndFinalPillarThe:
      'The fifth and final pillar — the pilgrimage to Makkah, obligatory once in a lifetime for every Muslim who is physically and financially able. Over 2 million pilgrims gather annually in the largest human gathering on Earth.',
    andDueToAllahFromThe:
      'And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way.',
  },
  theObligation: {
    theObligation: 'The Obligation',
    conditionsOfObligation: 'Conditions of obligation',
    hajjIsObligatoryOnceInA:
      'Hajj is obligatory once in a lifetime when all of the following conditions are met. "Istita\'ah" (ability) is the key criterion.',
  },
  typesOfHajj: {
    typesOfHajj: 'Types of Hajj',
    threeValidWaysToPerformHajj: 'Three valid ways to perform Hajj',
    tamattu: "Tamattu' (متمتع)",
    recommendedForNonMakkans: 'Recommended for non-Makkans',
    performUmrahFirstExitIhramThen:
      'Perform Umrah first, exit ihram, then re-enter ihram for Hajj on the 8th of Dhul Hijjah. Requires slaughtering a hadiyah (sacrificial animal).',
    qiran: 'Qiran (قارن)',
    combinedHajjUmrah: 'Combined Hajj & Umrah',
    enterIhramForBothHajjAnd:
      'Enter ihram for both Hajj and Umrah simultaneously at the Miqat. Do not exit ihram between the two. Also requires a hadiyah.',
    ifrad: 'Ifrad (مفرد)',
    hajjOnly: 'Hajj only',
    enterIhramForHajjOnlyNo:
      'Enter ihram for Hajj only. No Umrah is performed alongside it. No hadiyah required (though recommended).',
  },
  theRites: {
    theRites: 'The Rites',
    stepByStepGuideToThe: 'Step-by-step guide to the rites',
    hajjSpansFiveDaysFromThe:
      'Hajj spans five days — from the 8th to the 13th of Dhū al-Ḥijjah. Each rite corresponds to an action of the Prophet Ibrahim ﷺ or Muhammad ﷺ.',
  },
  lesserPilgrimage: {
    lesserPilgrimage: 'Lesser Pilgrimage',
    umrah: 'Umrah — العمرة',
    umrahIsTheLesserPilgrimageThat:
      "Umrah is the lesser pilgrimage that can be performed at any time of year. It consists of four rites and is highly recommended (Sunnah mu'akkadah), though scholars differ on whether it is obligatory (Shafi'i and Hanbali: obligatory once; Hanafi and Maliki: Sunnah).",
    exploreIslamicTools: 'Explore Islamic tools',
    calculateYourZakatCheckPrayerTimes:
      'Calculate your Zakat, check prayer times, find the Qibla, or plan your inheritance — all in one place.',
    zakatCalculator: 'Zakat Calculator',
    inheritance: 'Inheritance',
  },
  lists: {
    conditions: [
      {
        title: 'Islam',
        desc: 'Must be Muslim — Hajj performed by a non-Muslim is not valid.',
      },
      {
        title: 'Adulthood',
        desc: "Must be a baligh (pubescent) adult; children's Hajj is valid but does not fulfil the obligation.",
      },
      {
        title: 'Sanity',
        desc: 'Must be of sound mind (aqil).',
      },
      {
        title: 'Freedom',
        desc: 'Historically: not enslaved. Today: applicable as personal autonomy',
      },
      {
        title: 'Physical ability',
        desc: 'Must be physically capable of completing the rites.',
      },
      {
        title: 'Financial ability',
        desc: 'Must be able to finance the journey with expenses for dependants covered.',
      },
      {
        title: 'Safety of route',
        desc: 'The journey must be reasonably safe.',
      },
      {
        title: 'Mahram (for women)',
        desc: 'Majority view: women must have a mahram (husband or unmarriageable male relative). Hanafi: required at all times. Others: optional if safe group travel.',
      },
    ],
    days: [
      {
        tab: 'Day 8',
        title: 'Day 8 — Yawm al-Tarwiyah (8 Dhul Hijjah)',
        rites: [
          {
            name: 'Ihram',
            desc: 'Enter the state of ritual consecration at the Miqat. Men wear two white unstitched cloths. Women wear modest everyday clothing. Make the intention and recite the Talbiyah: "Labbayk Allahumma labbayk..."',
          },
          {
            name: 'Travel to Mina',
            desc: 'Proceed to the valley of Mina, approximately 8km from Masjid al-Haram. Spend the night in Mina — this is Sunnah, not obligatory.',
          },
          {
            name: 'Prayers in Mina',
            desc: 'Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina (shortened but not combined, per majority scholars).',
          },
        ],
      },
      {
        tab: 'Day 9',
        title: 'Day 9 — Yawm Arafah (9 Dhul Hijjah) — THE HEART OF HAJJ',
        rites: [
          {
            name: 'Standing at Arafah (Wuquf)',
            desc: "The single most important rite of Hajj. The Prophet ﷺ said: 'Hajj is Arafah' (Ibn Majah). Must be present in the plain of Arafah at any time between Dhuhr and Maghrib. Spend time in dua, dhikr, and tawbah (repentance).",
          },
          {
            name: 'Combined Dhuhr & Asr',
            desc: 'Pray Dhuhr and Asr combined and shortened at Masjid Namirah, following the Sunnah of the Prophet ﷺ.',
          },
          {
            name: 'Muzdalifah',
            desc: 'After sunset, travel to Muzdalifah. Pray combined Maghrib and Isha. Collect 49–70 pebbles for the stoning. Spend the night under the open sky.',
          },
        ],
      },
      {
        tab: 'Day 10',
        title: 'Day 10 — Yawm al-Nahr (Eid al-Adha)',
        rites: [
          {
            name: 'Stoning the Large Jamarat',
            desc: 'Cast 7 pebbles at the largest pillar (Jamarat al-Aqabah) while saying "Allahu Akbar" with each throw. This symbolises the rejection of Shaytan.',
          },
          {
            name: 'Animal sacrifice (Nusuk)',
            desc: "Slaughter a sacrificial animal (or arrange for one to be slaughtered). This commemorates Ibrahim's ﷺ willingness to sacrifice his son.",
          },
          {
            name: 'Shaving or cutting hair (Halq/Taqsir)',
            desc: 'Men shave their head or cut hair. Women cut a finger-length from their hair. This marks partial exit from ihram.',
          },
          {
            name: 'Tawaf al-Ifadah',
            desc: "Perform 7 circuits of the Ka'bah (tawaf) — this is an obligatory pillar (rukn) of Hajj.",
          },
          {
            name: "Sa'i",
            desc: "Walk 7 times between Safa and Marwah, commemorating Hajar's search for water for her son Ismail ﷺ.",
          },
        ],
      },
      {
        tab: 'Days 11–13',
        title: 'Days 11–13 — Ayyam al-Tashreeq (Staying in Mina)',
        rites: [
          {
            name: 'Stoning all three Jamaraat',
            desc: 'On each of the 11th, 12th, and (optionally) 13th, stone all three pillars with 7 pebbles each (21 pebbles per day), after Dhuhr.',
          },
          {
            name: 'Leaving early (Nafr Awwal)',
            desc: 'Those who wish may depart Mina on the 12th after stoning, before sunset. Those who remain must stone on the 13th as well.',
          },
          {
            name: 'Tawaf al-Wida (Farewell Tawaf)',
            desc: "The final rite before leaving Makkah — a farewell tawaf of 7 circuits. This is obligatory per majority scholars (Hanafi, Shafi'i, Hanbali); Maliki considers it Sunnah.",
          },
        ],
      },
    ],
    umrahRites: [
      {
        num: '1',
        title: 'Ihram',
        desc: 'Enter ihram at the Miqat boundary with intention for Umrah',
      },
      {
        num: '2',
        title: 'Tawaf',
        desc: "Seven circuits of the Ka'bah counter-clockwise",
      },
      {
        num: '3',
        title: "Sa'i",
        desc: 'Seven walks between Safa and Marwah',
      },
      {
        num: '4',
        title: 'Halq/Taqsir',
        desc: 'Shave or cut hair to exit ihram',
      },
    ],
    faqs: [
      {
        q: 'What happens if someone cannot perform Hajj?',
        a: 'If a person meets the conditions of ability but genuinely cannot go due to illness or other circumstances, they may send someone (a proxy/badal) to perform Hajj on their behalf. If they later recover, they must still perform Hajj themselves if able.',
      },
      {
        q: 'Is Hajj valid if I committed sins before?',
        a: "Yes. The Prophet ﷺ said: 'Whoever performs Hajj without engaging in sexual relations or sinning, returns [home pure] as on the day his mother gave birth to him.' (Sahih Bukhari 1521)",
      },
      {
        q: 'What is Miqat?',
        a: 'Miqat (مِيقَات) refers to the five geographical boundaries designated by the Prophet ﷺ, within which pilgrims must enter ihram before proceeding to Makkah. Flying pilgrims should enter ihram at or before the point above the Miqat.',
      },
      {
        q: 'Can Hajj be performed on behalf of a deceased?',
        a: 'Yes — proxy Hajj (hajj al-badal) is valid for a deceased person who met the conditions of obligation but died before performing Hajj. Ibn Abbas RA reported a woman asking the Prophet ﷺ about this and he permitted it (Sahih Bukhari 1852).',
      },
    ],
  },
}

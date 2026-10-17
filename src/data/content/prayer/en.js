// The writing of the prayer page, in English: the source every translation follows.
// Sections follow the page from top to bottom. A translation gives the same sections and keys;
// in a list it gives only the text it translates, and Arabic, references and icons are shared.
export default {
  header: {
    pillar2Of5: 'Pillar 2 of 5 · الصلاة',
    salahTheFiveDailyPrayers: 'Salah — The Five Daily Prayers',
    theSecondPillarAndTheMost:
      "The second pillar and the most repeated act of worship in Islam — five prayers daily, at prescribed times, facing the Ka'bah in Makkah.",
    indeedPrayerHasBeenDecreedUpon:
      'Indeed, prayer has been decreed upon the believers a decree of specified times.',
    prayerHasSpecificDivinelyOrdainedTimes:
      'Prayer has specific, divinely-ordained times; it is not flexible or approximate.',
  },
  onThisPage: {
    label: 'On this page',
    times: 'Prayer times',
    qibla: 'Qibla',
    guides: 'Learn to pray',
    importance: 'Why it matters',
    prayers: 'The five prayers',
    conditions: 'Conditions',
    questions: 'Questions',
  },
  guides: {
    eyebrow: 'Learn to pray',
    title: 'Guides to the prayer',
    intro: 'Step-by-step guides to the prayer and the call to it, and the tools that go with them.',
  },
  importance: {
    eyebrow: 'Its place in Islam',
    title: 'Why the prayer matters',
    recite:
      'Recite what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater. And Allah knows that which you do.',
    reciteNote: 'Translation: Saheeh International.',
    i1: 'Allah commands it to be kept with care: “Maintain with care the [obligatory] prayers and [in particular] the middle prayer and stand before Allah, devoutly obedient” (Qur’an 2:238).',
    i2: 'It is for His remembrance: “Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance” (Qur’an 20:14).',
    i3: 'Asked which deed is dearest to Allah, the Prophet ﷺ answered: “To offer the prayers at their early stated fixed times” (Sahih Bukhari 527).',
    i4: 'He compared the five prayers to a river at a person’s door in which they bathe five times a day: “That is the example of the five prayers with which Allah blots out evil deeds” (Sahih Bukhari 528).',
  },
  understandingSalah: {
    understandingSalah: 'Understanding Salah',
    theFiveDailyPrayers: 'The five daily prayers',
    islamIsBuiltOnFivePillars:
      '"Islam is built on five [pillars]: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying the Zakat, making the pilgrimage to the House, and fasting in Ramadan."',
  },
  conditionsStructure: {
    conditionsStructure: 'Conditions & Structure',
    prerequisitesForAValidPrayer: 'Prerequisites for a valid prayer',
    conditionsShurut: 'Conditions (Shurut)',
    pillarsArkan: 'Pillars (Arkan)',
    continueToTheThirdPillar: 'Continue to the third pillar',
    zakatTheObligationOfAlmsgivingCalculated:
      'Zakat — the obligation of almsgiving, calculated on your wealth at 2.5% once the Nisab threshold is met.',
    exploreZakat: 'Explore Zakat →',
  },
  lists: {
    guides: [
      {
        to: '/prayer/how-to-pray',
        icon: '🕌',
        name: 'How to pray, step by step',
        text: 'Every position illustrated, with what to recite in Arabic, transliteration and translation, from the takbir to the salam.',
      },
      {
        to: '/prayer/adhan',
        icon: '📣',
        name: 'The adhan',
        text: 'The words of the call to prayer and the iqamah, how the first adhan began, and what to say when you hear it.',
      },
      {
        to: '/tracker',
        icon: '✅',
        name: 'Prayer tracker',
        text: 'Mark each prayer as you pray it and keep a streak on your device.',
      },
      {
        to: '/adhkar/after-salah',
        icon: '📿',
        name: 'Remembrance after the prayer',
        text: 'The adhkar said after the salam, with a counter for each.',
      },
      {
        to: '/eid',
        icon: '🌙',
        name: 'The Eid prayer',
        text: 'How the two Eid prayers are performed, with their extra takbirs and sermon.',
      },
      {
        to: '/duas',
        icon: '🤲',
        name: 'Duas',
        text: 'Supplications for everyday situations, each with its source.',
      },
    ],
    prayerInfo: [
      {
        en: 'Fajr',
        ar: 'الفجر',
        meaning: 'Dawn',
        rakahs: "2 rak'ahs",
        time: 'Before sunrise',
      },
      {
        en: 'Dhuhr',
        ar: 'الظهر',
        meaning: 'Midday',
        rakahs: "4 rak'ahs",
        time: 'After solar noon',
      },
      {
        en: 'Asr',
        ar: 'العصر',
        meaning: 'Afternoon',
        rakahs: "4 rak'ahs",
        time: 'Mid-afternoon',
      },
      {
        en: 'Maghrib',
        ar: 'المغرب',
        meaning: 'Sunset',
        rakahs: "3 rak'ahs",
        time: 'After sunset',
      },
      {
        en: 'Isha',
        ar: 'العشاء',
        meaning: 'Night',
        rakahs: "4 rak'ahs",
        time: 'After twilight',
      },
    ],
    shurut: [
      'Ritual purity (Wudu or Ghusl)',
      'Entering prayer time',
      'Facing the Qibla',
      'Covering the Awrah',
      'Intention (Niyyah) in the heart',
      'Clean body, clothes, and place',
    ],
    arkan: [
      'Opening Takbir (Allahu Akbar)',
      'Standing (Qiyam)',
      'Reciting Surah Al-Fatiha',
      'Bowing (Ruku)',
      'Rising from Ruku',
      'Prostration (Sujud) × 2',
      'Sitting between prostrations',
      'Final Tashahhud',
      'Tasleem (Assalamu Alaykum)',
    ],
    faqs: [
      {
        q: 'What breaks Wudu?',
        a: "Natural discharge (urine, stool, wind), deep sleep lying down, loss of consciousness. Touching private parts: does not break Wudu per Hanafi; does break it per Shafi'i/Hanbali. Sexual intercourse requires Ghusl.",
      },
      {
        q: 'Can I pray in congregation at home?',
        a: "Yes — congregation (jama'ah) in the mosque is highly recommended for men, especially Fajr and Isha. Women may pray at home. The reward of congregation is 27 times that of praying alone (Sahih Bukhari 645).",
      },
      {
        q: 'What if I miss a prayer?',
        a: 'A missed prayer (qada) must be made up as soon as remembered. Deliberately missing a prayer is a major sin. The Prophet ﷺ said: "Whoever forgets a prayer, or sleeps through it, let him pray it when he remembers it." (Sahih Muslim 684)',
      },
      {
        q: 'How is prayer time calculated?',
        a: "Prayer times are derived from the sun's position relative to the observer. Fajr and Isha require the sun a specific number of degrees below the horizon. Dhuhr is solar noon; Maghrib is sunset; Asr is based on shadow length.",
      },
    ],
  },
}

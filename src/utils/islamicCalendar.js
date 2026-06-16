// ── Hijri month names ──────────────────────────────────────────────────────
export const HIJRI_MONTHS = [
  {
    en: 'Muharram',
    ar: 'مُحَرَّم',
    num: 1
  },
  {
    en: "Safar",
    ar: 'صَفَر',
    num: 2
  },
  {
    en: "Rabi' al-Awwal",
    ar: 'رَبِيع الأَوَّل',
    num: 3
  },
  {
    en: "Rabi' al-Akhir",
    ar: 'رَبِيع الآخِر',
    num: 4
  },
  {
    en: "Jumada al-Ula",
    ar: 'جُمَادَى الأُولَى',
    num: 5
  },
  {
    en: "Jumada al-Akhira",
    ar: 'جُمَادَى الآخِرَة',
    num: 6
  },
  {
    en: "Rajab",
    ar: 'رَجَب',
    num: 7
  },
  {
    en: "Sha'ban",
    ar: 'شَعْبَان',
    num: 8
  },
  {
    en: "Ramadan",
    ar: 'رَمَضَان',
    num: 9
  },
  {
    en: "Shawwal",
    ar: 'شَوَّال',
    num: 10
  },
  {
    en: "Dhul Qi'dah",
    ar: "ذُو القَعْدَة",
    num: 11
  },
  {
    en: "Dhul Hijjah",
    ar: 'ذُو الحِجَّة',
    num: 12
  },
]

// ── Gregorian ↔ Hijri conversion ─────────────────────────────────────────
// Full astronomical algorithm (same as hijri.js but extended)
export function gregorianToHijri(year, month, day) {
  const jd = gregorianToJD(year, month, day)
  return jdToHijri(jd)
}

export function hijriToGregorian(hy, hm, hd) {
  const jd = hijriToJD(hy, hm, hd)
  return jdToGregorian(jd)
}

function gregorianToJD(year, month, day) {
  if (month <= 2) {
    year -= 1;
    month += 12

  }
  const A = Math.floor(year / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5
}

function jdToGregorian(jd) {
  const z = Math.floor(jd + 0.5)
  const a = Math.floor((z - 1867216.25) / 36524.25)
  const A = z + 1 + a - Math.floor(a / 4)
  const B = A + 1524
  const C = Math.floor((B - 122.1) / 365.25)
  const D = Math.floor(365.25 * C)
  const E = Math.floor((B - D) / 30.6001)
  const day   = B - D - Math.floor(30.6001 * E)
  const month = E < 14 ? E - 1 : E - 13
  const year  = month > 2 ? C - 4716 : C - 4715
  return { year, month, day }
}

function jdToHijri(jd) {
  const z = Math.floor(jd) + 0.5
  const era = Math.floor((z - 1948439.5) / 10631)
  const cycle = Math.floor((z - (10631 * era + 1948438.5)) / 354)
  let remaining = z - (10631 * era + 354 * cycle + 1948438.5)
  let month = 0, day = 0
  const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]
  // Is it a leap year?
  const year = 30 * era + cycle
  const leapYears = [2,5,7,10,13,15,18,21,24,26,29]
  if (leapYears.includes(year % 30)) monthLengths[11] = 30
  for (let m = 0; m < 12; m++) {
    if (remaining <= monthLengths[m]) { month = m + 1; day = Math.ceil(remaining); break }
    remaining -= monthLengths[m]
  }
  return { year: Math.round(year), month, day }
}

function hijriToJD(hy, hm, hd) {
  return Math.floor((11 * hy + 3) / 30) + 354 * hy + 30 * hm
    - Math.floor((hm - 1) / 2) + hd + 1948440 - 385
}

// ── Build a full Hijri month grid ─────────────────────────────────────────
// Returns array of { hijriDay, gregorian: {year,month,day}, weekday (0=Sun) }
export function buildHijriMonthGrid(hijriYear, hijriMonth) {
  // Find first day of this Hijri month
  const firstGreg = hijriToGregorian(hijriYear, hijriMonth, 1)
  const firstDate = new Date(firstGreg.year, firstGreg.month - 1, firstGreg.day)
  const startWeekday = firstDate.getDay() // 0=Sun

  // Find length of this month (check if 30th converts back correctly)
  let monthLength = 29
  const check30 = gregorianToHijri(
    ...(() => { const d = hijriToGregorian(hijriYear, hijriMonth, 30); return [d.year, d.month, d.day] })()
  )
  if (check30.month === hijriMonth && check30.year === hijriYear) monthLength = 30

  const days = []
  for (let hd = 1; hd <= monthLength; hd++) {
    const g = hijriToGregorian(hijriYear, hijriMonth, hd)
    const dt = new Date(g.year, g.month - 1, g.day)
    days.push({
      hijriDay: hd,
      gregorian: g,
      weekday: dt.getDay(),
      iso: `${g.year}-${String(g.month).padStart(2,'0')}-${String(g.day).padStart(2,'0')}`,
    })
  }

  // Pad before start
  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  cells.push(...days)
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  return { days, cells, monthLength, startWeekday }
}

// ── Navigate months ────────────────────────────────────────────────────────
export function prevHijriMonth(year, month) {
  return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 }
}
export function nextHijriMonth(year, month) {
  return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 }
}

// ── Today in Hijri ─────────────────────────────────────────────────────────
export function todayHijri() {
  const now = new Date()
  return gregorianToHijri(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

// ── Significant days database ──────────────────────────────────────────────
// Key: `${hijriMonth}:${hijriDay}`  (month 1-12, day 1-30)
// category:  eid | blessed | fasting | white | mourning | historical | sacred-months

export const SIGNIFICANT_DAYS = {

  // ════════════════════════════════════════
  // 1 MUHARRAM — Sacred month, Islamic New Year
  '1:1': {
    title: 'Islamic New Year — 1 Muharram',
    arabic: 'رَأْس السَّنَة الهِجْرِيَّة',
    category: 'blessed',
    summary: 'The first day of the Islamic lunar calendar year. Muharram is one of the four sacred months (al-ashhur al-hurum) in which fighting and sin are more grave.',
    detail: `Muharram is declared sacred in the Qur'an: "The number of months in the sight of Allah is twelve — ordained by Him the day He created the heavens and the earth; of them four are sacred." (Qur'an 9:36). The first day marks the new Hijri year — named after the migration (Hijra) of the Prophet ﷺ from Makkah to Madinah in 622 CE, which became the reference point of the Islamic calendar.`,
    hadiths: [
      {
        text: "The best fasting after Ramadan is in Allah's month of Muharram.",
        source: 'Sahih Muslim 1163',
        narrator: 'Abu Hurayrah RA'
      },
    ],
    fasting: false,
  },

  '1:9': {
    title: "Tasu'a — 9 Muharram",
    arabic: 'تَاسُوعَاء',
    category: 'fasting',
    summary: "The day before Ashura. The Prophet ﷺ intended to fast on this day as well to differ from Jewish practice. Fasting on this day alongside Ashura is highly recommended.",
    detail: `When the Prophet ﷺ was informed that the Jews fasted on the 10th of Muharram (Ashura) to commemorate Moses, he said: "If I live until next year, I will certainly fast the ninth as well." Scholars understand this as a desire to fast both the 9th and 10th, or the 10th and 11th, to distinguish from Jewish observance.`,
    hadiths: [
      {
        text: "If I live until next year, I will certainly fast the ninth of Muharram as well.",
        source: 'Sahih Muslim 1134',
        narrator: 'Ibn Abbas RA'
      },
    ],
    fasting: true,
  },

  '1:10': {
    title: "Ashura — 10 Muharram",
    arabic: 'عَاشُورَاء',
    category: 'fasting',
    summary: "The Day of Ashura — one of the most significant days in the Islamic calendar. Fasting expiates the sins of the previous year. Commemorates Allah's salvation of Moses and the Israelites from Pharaoh.",
    detail: `When the Prophet ﷺ arrived in Madinah, he found the Jews fasting on this day. They told him: "This is the day on which Allah saved Moses and the Children of Israel from their enemy, so Moses fasted it." The Prophet ﷺ said: "We have more right to Moses than you," and fasted that day and commanded fasting. For Shia Muslims, this day also commemorates the martyrdom of Imam Husayn ibn Ali RA at Karbala (61 AH). Sunni Islam does not mark it as a day of mourning rituals, but it is a day of significant voluntary fasting.`,
    hadiths: [
      {
        text: "Fasting the day of Ashura — I hope that Allah will accept it as expiation for the year that came before it.",
        source: 'Sahih Muslim 1162',
        narrator: 'Abu Qatada RA'
      },
      {
        text: "This is a great day on which Allah saved Moses and drowned Pharaoh's people. Moses fasted it out of thanks, so we fast it too.",
        source: 'Sahih Bukhari 3943',
        narrator: 'Ibn Abbas RA'
      },
    ],
    fasting: true,
  },

  // ════════════════════════════════════════
  // 2 SAFAR
  '2:1': {
    title: 'Safar Begins',
    arabic: 'أَوَّل صَفَر',
    category: 'historical',
    summary: "Safar is the second month of the Islamic calendar. The pre-Islamic Arabs believed it to be an ominous month — a superstition explicitly rejected by the Prophet ﷺ.",
    detail: `The Prophet ﷺ stated: "There is no 'adwa (contagion), no tiyara (bad omen), no hama (bad omen from an owl), and no Safar." (Sahih Muslim 2220). Safar holds no special religious observance in authentic Sunnah practice. Innovations around Safar — such as performing specific prayers at its start or treating it as unlucky — are rejected by mainstream Islamic scholarship.`,
    hadiths: [
      {
        text: "There is no 'adwa (contagion beyond Allah's will), no tiyara (bad omen), no hama, and no (ill omen in the month of) Safar.",
        source: 'Sahih Muslim 2220',
        narrator: 'Abu Hurayrah RA'
      },
    ],
    fasting: false,
  },

  // ════════════════════════════════════════
  // 3 RABI' AL-AWWAL — Birth of the Prophet ﷺ
  '3:12': {
    title: "12 Rabi' al-Awwal — Birth of the Prophet ﷺ",
    arabic: 'مَوْلِد النَّبِي صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    category: 'historical',
    summary: "The majority scholarly opinion is that the Prophet Muhammad ﷺ was born on this date (circa 570 CE), known as Mawlid al-Nabi. The permissibility of observing this day is debated among scholars.",
    detail: `The Prophet Muhammad ﷺ was born in Makkah, approximately 570 CE, the Year of the Elephant. He was orphaned early — his father Abdullah died before his birth, and his mother Aminah died when he was six. He was raised by his grandfather Abd al-Muttalib, then his uncle Abu Talib.\n\nThe question of celebrating Mawlid: Scholars who permit commemoration cite the fact that the Prophet ﷺ fasted Mondays because he was born on a Monday (Sahih Muslim 1162). Scholars who do not permit formal celebration argue it was not observed by the Companions or early generations. Both positions exist within mainstream Sunni scholarship.`,
    hadiths: [
      {
        text: "The Prophet was asked about fasting on Monday. He said: 'That is the day I was born and the day I received revelation.'",
        source: 'Sahih Muslim 1162',
        narrator: 'Abu Qatada RA'
      },
    ],
    fasting: false,
    note: 'The precise date of the Prophet\'s birth is historically debated. The 12th Rabi\' al-Awwal is the most widely cited opinion.',
  },

  // ════════════════════════════════════════
  // 7 RAJAB — Sacred month, Isra' wal Mi'raj
  '7:1': {
    title: "Rajab Begins — Sacred Month",
    arabic: 'رَجَب',
    category: 'sacred-months',
    summary: "Rajab is one of the four sacred months of Islam (along with Muharram, Dhul Qi'dah, and Dhul Hijjah). Voluntary fasting is encouraged throughout it.",
    detail: `The four sacred months (al-ashhur al-hurum) are mentioned in Qur'an 9:36. Rajab is particularly distinguished as the month preceding Sha'ban, which precedes Ramadan. The Prophet ﷺ would pray upon entering Rajab: "O Allah, bless us in Rajab and Sha'ban, and bring us to Ramadan." Many Muslims use Rajab as a time to begin increasing their worship in preparation for Ramadan.`,
    hadiths: [
      {
        text: "O Allah, bless us in Rajab and Sha'ban, and bring us to Ramadan.",
        source: "Musnad Ahmad / Al-Bazzar (weak chain; widely quoted)",
        narrator: "Anas ibn Malik RA"
      },
    ],
    fasting: false,
  },

  '7:27': {
    title: "Isra' wal Mi'raj — 27 Rajab (traditional)",
    arabic: "الإسْرَاء وَالمِعْرَاج",
    category: 'historical',
    summary: "The Night Journey and Ascension of the Prophet ﷺ — from Makkah to Jerusalem, then through the seven heavens to the presence of Allah, where the five daily prayers were prescribed.",
    detail: `The Isra' (night journey) took the Prophet ﷺ from Masjid al-Haram in Makkah to Masjid al-Aqsa in Jerusalem in a single night, riding al-Buraq. The Mi'raj (ascension) then took him through the seven heavens, where he met the prophets, saw Paradise and Hell, and received the command of fifty prayers — reduced through intercession to five.\n\nThe precise date of the Isra' wal Mi'raj is uncertain. The 27th of Rajab is the most commonly cited date but it is not definitively established. The event itself is confirmed in the Qur'an.`,
    quranRef: { arabic: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا', ref: "Qur'an 17:1", translation: "Exalted is He who took His servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa." },
    hadiths: [
      {
        text: "Then Allah revealed what He revealed to me, and He made obligatory upon me fifty prayers every day and night...",
        source: 'Sahih Bukhari 3887',
        narrator: 'Anas ibn Malik RA'
      },
    ],
    fasting: false,
    note: 'The exact date of the Isra\' wal Mi\'raj is not conclusively established by hadith. 27 Rajab is a widely held traditional view.',
  },

  // ════════════════════════════════════════
  // 8 SHA'BAN — Night of Bara'ah
  '8:15': {
    title: "Laylat al-Bara'ah — 15 Sha'ban",
    arabic: "لَيْلَة البَرَاءَة",
    category: 'blessed',
    summary: "The night of the 15th of Sha'ban (Laylat al-Bara'ah or Shab-e-Barat). Hadith evidence for its significance is debated — some consider it a blessed night of forgiveness; others regard the specific hadiths as weak.",
    detail: `A number of hadiths mention that Allah looks upon His creation on the night of 15 Sha'ban with special mercy. The famous hadith from Ibn Hibban (rated hasan by al-Albani) states Allah forgives all on this night except those who associate partners with Him and those who harbour enmity.\n\nThe scholarly position varies: Imam Ibn Taymiyyah and others held that this night has some virtue; Ibn Rajab al-Hanbali acknowledged it; many others including Ibn Waddah rejected specific observances on this night as innovation. Fasting on the 15th of Sha'ban has a weak hadith basis but is practised by many scholars.`,
    hadiths: [
      {
        text: "Allah looks at His creation on the night of the 15th of Sha'ban and forgives all His slaves except one who associates partners with Him or one who has rancour.",
        source: 'Ibn Hibban 5665 (graded hasan by some scholars)',
        narrator: "Mu'adh ibn Jabal RA"
      },
    ],
    fasting: false,
    note: "Scholars differ on the authenticity of specific narrations about this night. Follow your scholar's guidance.",
  },

  // ════════════════════════════════════════
  // 9 RAMADAN — The blessed month
  '9:1': {
    title: 'Ramadan Begins — رَمَضَان',
    arabic: 'بِدَايَة رَمَضَان',
    category: 'fasting',
    summary: "The first day of the blessed month of Ramadan — the month of fasting, Qur'an, prayer, and increased worship. Fasting is one of the Five Pillars of Islam.",
    detail: `Ramadan is the ninth month of the Islamic calendar and the month in which the Qur'an was revealed. Fasting its days is obligatory upon every adult Muslim who is sane, healthy, resident, and not menstruating. The month is one of immense reward — the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained (Sahih Bukhari 1899).`,
    quranRef: {
      arabic: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ',
      ref: "Qur'an 2:185",
      translation: "The month of Ramadan in which was revealed the Qur'an, a guidance for the people."
    },
    hadiths: [
      {
        text: "When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.",
        source: 'Sahih Bukhari 1899',
        narrator: 'Abu Hurayrah RA'
      },
    ],
    fasting: true,
  },

  '9:17': {
    title: "Battle of Badr — 17 Ramadan",
    arabic: 'غَزْوَة بَدْر',
    category: 'historical',
    summary: "The Battle of Badr took place on 17 Ramadan, 2 AH (624 CE) — the first major military engagement between the Muslims of Madinah and the Quraysh of Makkah. The outnumbered Muslim army achieved a decisive victory.",
    detail: `313 Muslims faced approximately 1,000 Qurayshi soldiers at the wells of Badr. The Qur'an calls this day "Yawm al-Furqan" — the Day of Distinction. 70 Qurayshi leaders were killed and 70 captured. It was a foundational moment for the early Muslim community, establishing the viability of the Islamic state in Madinah.`,
    quranRef: {
      arabic: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ',
      ref: "Qur'an 3:123",
      translation: "And Allah had already given you victory at Badr while you were few in number."
    },
    hadiths: [],
    fasting: true,
  },

  '9:21': {
    title: "Last Ten Nights Begin — Laylat al-Qadr Season",
    arabic: 'لَيَالِي العَشْر الأَوَاخِر',
    category: 'blessed',
    summary: "The last ten nights of Ramadan begin. The Prophet ﷺ would increase his worship and wake his family for these nights. Laylat al-Qadr (the Night of Power) is hidden within these nights.",
    detail: `The Prophet ﷺ would tighten his belt, stay up all night, and wake his family during the last ten nights. He would perform I'tikaf (seclusion in the mosque). Laylat al-Qadr — which is better than a thousand months — falls in one of these nights, most likely on an odd night (21st, 23rd, 25th, 27th, or 29th).`,
    quranRef: {
      arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
      ref: "Qur'an 97:3",
      translation: "The Night of Power is better than a thousand months."
    },
    hadiths: [
      {
        text: "Seek Laylat al-Qadr in the odd nights of the last ten of Ramadan.",
        source: 'Sahih Bukhari 2017',
        narrator: "A'ishah RA"
      },
    ],
    fasting: true,
  },

  '9:27': {
    title: "27th Night of Ramadan — Likely Laylat al-Qadr",
    arabic: 'لَيْلَة سَبْع وَعِشْرِين',
    category: 'blessed',
    summary: "The 27th night is the most widely narrated as Laylat al-Qadr, though it can fall on any odd night in the last ten. Increase worship, dua, and Qur'an recitation throughout this night.",
    detail: `Ubayy ibn Ka'b RA was most certain Laylat al-Qadr falls on the 27th. The wisdom of its concealment is that Muslims strive in worship throughout the entire last ten nights rather than just one. The recommended dua for this night is: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni" — "O Allah, You are Pardoning, You love to pardon, so pardon me."`,
    quranRef: {
      arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
      ref: "Qur'an 97:1",
      translation: "Indeed, We sent it [the Qur'an] down during the Night of Power."
    },
    hadiths: [
      {
        text: "O Allah, you are Pardoning (Afuww), You love to pardon, so pardon me.",
        source: "Al-Tirmidhi 3513",
        narrator: "A'ishah RA"
      },
      {
        text: "Whoever stands in prayer on Laylat al-Qadr out of faith and seeking reward will have his previous sins forgiven.",
        source: 'Sahih Bukhari 2014',
        narrator: 'Abu Hurayrah RA'
      },
    ],
    fasting: true,
  },

  // ════════════════════════════════════════
  // 10 SHAWWAL — Eid al-Fitr & six fasts
  '10:1': {
    title: "Eid al-Fitr — 1 Shawwal",
    arabic: 'عِيدُ الفِطْر',
    category: 'eid',
    summary: "Eid al-Fitr — the celebration marking the end of Ramadan. It is forbidden (haram) to fast on this day. It begins with the Eid prayer and is a day of joy, gratitude, giving Zakat al-Fitr, and community.",
    detail: `Eid al-Fitr is the first of the two major Islamic celebrations. Before the Eid prayer, every Muslim must pay Zakat al-Fitr (a purification charity) on behalf of themselves and their dependants. The Eid prayer consists of two rak'ahs with additional takbirat and is followed by a sermon. Muslims exchange greetings of "Eid Mubarak" or "Taqabbal Allahu minna wa minkum" (May Allah accept from us and from you).`,
    quranRef: {
      arabic: 'وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ',
      ref: "Qur'an 2:185",
      translation: "...and that you complete the period and glorify Allah for that to which He has guided you; and perhaps you will be grateful."
    },
    hadiths: [
      {
        text: "The Prophet ﷺ forbade fasting on two days: the Day of Fitr and the Day of Adha.",
        source: 'Sahih Bukhari 1993',
        narrator: "Abu Sa'id al-Khudri RA"
      },
    ],
    fasting: false,
  },

  '10:2': {
    title: "Shawwal Fasting — 6 Days",
    arabic: 'صِيَام سِتَّة أَيَّام مِن شَوَّال',
    category: 'fasting',
    summary: "The six voluntary fasts of Shawwal may begin. Fasting six days of Shawwal after Ramadan carries the reward of fasting the entire year. They may be fasted consecutively or separately.",
    detail: `The hadith: "Whoever fasts Ramadan then follows it with six days of Shawwal — it is as if he fasted the entire year." (Sahih Muslim 1164). The scholars explain: Ramadan = 10 months of reward; six days = 2 months of reward (each good deed × 10). Total = 12 months = a year. This applies every year, so it is equivalent to perpetual fasting. They can be fasted on any six days of Shawwal — they do not have to be consecutive nor immediately after Eid.`,
    hadiths: [
      {
        text: "Whoever fasts Ramadan then follows it with six days of Shawwal, it is as if he fasted the entire year.",
        source: 'Sahih Muslim 1164',
        narrator: 'Abu Ayyub al-Ansari RA'
      },
    ],
    fasting: true,
  },

  // ════════════════════════════════════════
  // 11 DHUL QI'DAH — Sacred month
  '11:1': {
    title: "Dhul Qi'dah Begins — Sacred Month",
    arabic: "ذُو القَعْدَة",
    category: 'sacred-months',
    summary: "Dhul Qi'dah is one of the four sacred months. Its name means 'the month of sitting/truce' — historically a month of peace before Hajj when travel to Makkah was safe.",
    detail: `Dhul Qi'dah, Dhul Hijjah, Muharram, and Rajab are the four sacred months mentioned in Qur'an 9:36. In these months, fighting was forbidden even in pre-Islamic Arabia, allowing pilgrims to travel to Makkah safely. In the Islamic tradition, sins in these months are considered more grave, and worship is especially encouraged.`,
    quranRef: {
      arabic: 'إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا',
      ref: "Qur'an 9:36",
      translation: "Indeed, the number of months with Allah is twelve lunar months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred."
    },
    hadiths: [],
    fasting: false,
  },

  // ════════════════════════════════════════
  // 12 DHUL HIJJAH — Eid al-Adha, Hajj, blessed 10 days
  '12:1': {
    title: "Dhul Hijjah Begins — The Blessed 10 Days",
    arabic: 'أَوَّل أَيَّام الحِجَّة',
    category: 'blessed',
    summary: "The first ten days of Dhul Hijjah are the best days of the entire year according to the Prophet ﷺ. Good deeds in these days are more beloved to Allah than at any other time.",
    detail: `Ibn Abbas RA narrated that the Prophet ﷺ said: "No good deeds done on other days are superior to those done on these (first ten days of Dhul Hijjah)." The Companions asked: "Not even jihad?" He said: "Not even jihad in Allah's cause, except for a man who goes out with himself and his wealth and returns with nothing." (Sahih Bukhari 969). These ten days encompass the Day of Arafah (9th), Eid al-Adha (10th), and the days of Tashreeq.`,
    quranRef: {
      arabic: 'وَالْفَجْرِ ۝ وَلَيَالٍ عَشْرٍ',
      ref: "Qur'an 89:1-2",
      translation: "By the dawn — and by the ten nights."
    },
    hadiths: [
      {
        text: "There are no days on which righteous deeds are more beloved to Allah than these ten days.",
        source: 'Sahih Bukhari 969',
        narrator: 'Ibn Abbas RA'
      },
    ],
    fasting: false,
  },

  '12:2': {
    title: "2 Dhul Hijjah — Best Days Continue",
    arabic: 'الأَيَّام العَشْر',
    category: 'blessed',
    summary: "Continue increasing worship — Qur'an recitation, dhikr (takbir, tahmid, tahlil, tasbih), charity, and fasting. These are among the most beloved days to Allah.",
    detail: `Recommended dhikr during these ten days: "Allahu Akbar, Allahu Akbar, la ilaha illallah, Allahu Akbar, Allahu Akbar, wa lillahil hamd." (Takbirat al-Tashreeq). Ibn Umar RA and Abu Hurayrah RA would go to the marketplace reciting takbir, and the people would follow them.`,
    hadiths: [
      {
        text: "Increase your recitation of Tahlil (La ilaha illallah), Takbir (Allahu Akbar), and Tahmid (Alhamdulillah) during these ten days.",
        source: "Musnad Ahmad (authenticated)",
        narrator: 'Ibn Umar RA'
      },
    ],
    fasting: true,
  },

  '12:3': {
    title: "3 Dhul Hijjah",
    arabic: 'الأَيَّام العَشْر',
    category: 'blessed',
    summary: "Third of the blessed ten days. Increase dhikr and voluntary deeds — fasting, charity, and Qur'an recitation.",
    detail: "The Prophet ﷺ said these are the best days of the year for righteous deeds. Fast if able, give charity, recite much takbir and tahmid.",
    hadiths: [],
    fasting: true
  },

  '12:4': {
    title: "4 Dhul Hijjah",
    arabic: 'الأَيَّام العَشْر',
    category: 'blessed',
    summary: "Fourth of the blessed ten days.",
    detail: "Continue increasing worship throughout these blessed days.",
    hadiths: [],
    fasting: true
  },

  '12:5': {
    title: "5 Dhul Hijjah",
    arabic: 'الأَيَّام العَشْر',
    ategory: 'blessed',
    summary: "Fifth of the blessed ten days of Dhul Hijjah.",
    detail: "Keep increasing good deeds.",
    hadiths: [],
    fasting: true
  },

  '12:6': {
    title: "6 Dhul Hijjah",
    arabic: 'الأَيَّام العَشْر',
    category: 'blessed',
    summary: "Sixth of the blessed ten days.",
    detail: "Continue dhikr and voluntary fasting.",
    hadiths: [],
    fasting: true
  },

  '12:7': {
    title: "7 Dhul Hijjah",
    arabic: 'الأَيَّام العَشْر',
    category: 'blessed',
    summary: "Seventh of the blessed ten days. Hajj pilgrims begin formal preparations.",
    detail: "For pilgrims: this is Yawm al-Tarwiyah eve. For others: maintain increased worship.",
    hadiths: [],
    fasting: true
  },

  '12:8': {
    title: "8 Dhul Hijjah — Yawm al-Tarwiyah",
    arabic: 'يَوْم التَّرْوِيَة',
    category: 'blessed',
    summary: "The Day of Tarwiyah — Hajj pilgrims enter ihram and proceed to Mina. This is the beginning of the formal Hajj rites.",
    detail: `On this day, Hajj pilgrims at the Miqat enter ihram with the intention for Hajj, recite the Talbiyah, and travel to Mina (approximately 8km from Masjid al-Haram). They spend the night in Mina and pray Dhuhr, Asr, Maghrib, Isha, and Fajr there — shortened (qasr) but not combined per the majority.`,
    hadiths: [
      {
        text: "The Messenger of Allah ﷺ went out in the morning of the Day of Tarwiyah towards Mina and prayed Dhuhr, Asr, Maghrib, Isha and Fajr there.",
        source: 'Sahih Muslim 1218',
        narrator: 'Jabir RA'
      },
    ],
    fasting: true,
  },

  '12:9': {
    title: "9 Dhul Hijjah — Yawm Arafah",
    arabic: 'يَوْم عَرَفَة',
    category: 'blessed',
    summary: "The Day of Arafah — the most important day of Hajj and one of the greatest days in Islam. Fasting this day expiates two years of sins for non-pilgrims.",
    detail: `"Hajj is Arafah" — the standing on the plain of Arafah from midday to sunset is the central pillar of Hajj. For those not performing Hajj, fasting this day expiates the past year and the coming year's minor sins.\n\nAllah descends to the lowest heaven and boasts to His angels about the people standing at Arafah: "Look at My slaves; they have come with dishevelled hair and dusty faces from every deep valley, hoping for My mercy." (Ibn Hibban).`,
    quranRef: {
      arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ',
      ref: "Qur'an 5:3",
      translation: "This day I have perfected for you your religion and completed My favour upon you."
    },
    hadiths: [
      {
        text: "Fasting the day of Arafah — I hope that Allah will accept it as expiation for the year before it and the year after it.",
        source: 'Sahih Muslim 1162',
        narrator: 'Abu Qatada RA'
      },
      {
        text: "There is no day on which Allah frees more of His slaves from the Fire than the Day of Arafah.",
        source: 'Sahih Muslim 1348',
        narrator: 'A\'ishah RA'
      },
    ],
    fasting: true,
  },

  '12:10': {
    title: "Eid al-Adha — 10 Dhul Hijjah",
    arabic: 'عِيدُ الأَضْحَى',
    category: 'eid',
    summary: "Eid al-Adha — the Festival of Sacrifice. The greatest day of the Islamic year according to some scholars. Commemorates Ibrahim's ﷺ willingness to sacrifice his son. Hajj pilgrims complete their core rites.",
    detail: `Eid al-Adha is marked by: the Eid prayer (two rak'ahs); the udhiya/qurbani (sacrificial animal — sheep, goat, cattle, or camel) for those able; breaking the fast; celebrating with family; and distributing the meat to the poor, family, and self.\n\nFor Hajj pilgrims, this is Yawm al-Nahr: they stone the large Jamarat, sacrifice, shave their heads, perform Tawaf al-Ifadah, and Sa'i. Fasting is forbidden on this day.`,
    quranRef: {
      arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
      ref: "Qur'an 108:2",
      translation: "So pray to your Lord and sacrifice [to Him alone]."
    },
    hadiths: [
      {
        text: "The greatest day in the sight of Allah is the Day of Nahr (10 Dhul Hijjah), then the Day of al-Qarr (11 Dhul Hijjah).",
        source: 'Abu Dawud 1765',
        narrator: 'Abdullah ibn Qurt RA'
      },
      {
        text: "The Prophet ﷺ forbade fasting on two days: Eid al-Fitr and Eid al-Adha.",
        source: 'Sahih Bukhari 1993',
        narrator: 'Abu Sa\'id al-Khudri RA'
      },
    ],
    fasting: false,
  },

  '12:11': {
    title: "11 Dhul Hijjah — Ayyam al-Tashreeq",
    arabic: 'أَيَّام التَّشْرِيق',
    category: 'blessed',
    summary: "The first of the three days of Tashreeq. Pilgrims stone all three Jamaraat. These are days of eating, drinking, and remembrance of Allah. Fasting is forbidden.",
    detail: `The days of Tashreeq (11th, 12th, 13th of Dhul Hijjah) are among the days Allah commands remembrance: "And remember Allah during the appointed days." (Qur'an 2:203). Pilgrims stone all three pillars after Dhuhr. Fasting these days is forbidden. The Takbirat al-Tashreeq are recited after every prayer from Fajr on the 9th to Asr on the 13th.`,
    hadiths: [
      {
        text: "The days of Tashreeq are days of eating, drinking, and remembering Allah.",
        source: 'Sahih Muslim 1141',
        narrator: 'Nubayshah al-Hudhali RA'
      },
    ],
    fasting: false,
  },

  '12:12': {
    title: "12 Dhul Hijjah — Ayyam al-Tashreeq",
    arabic: 'أَيَّام التَّشْرِيق',
    category: 'blessed',
    summary: "Second day of Tashreeq. Pilgrims who wish may depart Mina (Nafr Awwal) after stoning, before sunset. Fasting is forbidden.",
    detail: `Those performing Hajj stone the three Jamaraat after Dhuhr. Those who wish to depart early (Nafr Awwal) may leave Mina today before sunset. Those who remain must stay until the 13th and stone on that day as well. Takbirat al-Tashreeq are recited after every prayer.`,
    hadiths: [
      {
        text: "Whoever hastens to leave in two days, there is no sin upon him; and whoever stays, there is no sin upon him — for the one who fears Allah.",
        source: "Qur'an 2:203 (paraphrased)"
      },
    ],
    fasting: false,
  },

  '12:13': {
    title: "13 Dhul Hijjah — Final Day of Tashreeq",
    arabic: 'آخِر أَيَّام التَّشْرِيق',
    category: 'blessed',
    summary: "The final day of Tashreeq and the last of the great days of Dhul Hijjah. Pilgrims who remained stone the three Jamaraat and depart Mina. Fasting is forbidden.",
    detail: `The Takbirat al-Tashreeq end with Asr prayer today. Those who remained in Mina stone the three pillars after Dhuhr and depart. This marks the effective end of the Hajj rites. After today, the special season of worship concludes until next year's Dhul Hijjah.`,
    hadiths: [],
    fasting: false,
  },
}

// ── White days (13th, 14th, 15th of every Hijri month) ────────────────────
// Add to all months dynamically
for (let m = 1; m <= 12; m++) {
  ;[13, 14, 15].forEach(d => {
    const key = `${m}:${d}`
    if (!SIGNIFICANT_DAYS[key]) {
      SIGNIFICANT_DAYS[key] = {
        title: `White Day (Ayyam al-Bid) — ${d} of month`,
        arabic: 'أَيَّام البِيض',
        category: 'white',
        summary: "One of the three 'white days' (Ayyam al-Bid) — the 13th, 14th, and 15th of each Hijri month, when the moon is full. Fasting these three days is a confirmed Sunnah.",
        detail: `The Prophet ﷺ said: "O Abu Dharr, if you fast three days of every month, then fast the 13th, 14th, and 15th." These are called the 'white days' because the full moon illuminates the night. Fasting these three days in every month is equivalent to fasting the entire year (each good deed multiplied by ten: 3 × 10 = 30 days).`,
        hadiths: [
          {
            text: "O Abu Dharr, if you fast three days of a month, then fast the 13th, the 14th, and the 15th.",
            source: 'Al-Tirmidhi 761 (graded hasan)',
            narrator: 'Abu Dharr al-Ghifari RA'
          },
          {
            text: "The Messenger of Allah ﷺ used to command us to fast the white days: the 13th, 14th, and 15th of the month.",
            source: 'Abu Dawud 2449',
            narrator: 'Abu Hurayrah RA'
          },
        ],
        fasting: true,
      }
    } else {
      // Merge white day info if day already has special significance
      SIGNIFICANT_DAYS[key].whiteDay = true
      if (!SIGNIFICANT_DAYS[key].whiteDayNote) {
        SIGNIFICANT_DAYS[key].whiteDayNote = "This is also one of the white days (Ayyam al-Bid). Voluntary fasting is recommended."
      }
    }
  })
}

// ── Lookup helper ──────────────────────────────────────────────────────────
export function getSignificance(hijriMonth, hijriDay) {
  return SIGNIFICANT_DAYS[`${hijriMonth}:${hijriDay}`] || null
}

// ── Category metadata ──────────────────────────────────────────────────────
export const CATEGORIES = {
  eid: {
    label: 'Eid',
    color: '#c0392b',
    bg: '#fde8e8',
    dot: '#c0392b'
  },
  blessed: {
    label: 'Blessed Day',
    color: '#1B5C42',
    bg: '#e5f5ee',
    dot: '#1B5C42'
  },
  fasting: {
    label: 'Fasting',
    color: '#7A5A10',
    bg: '#fff8e0',
    dot: '#c4932a'
  },
  white: {
    label: 'White Day',
    color: '#1a5276',
    bg: '#eaf2ff',
    dot: '#1a5276'
  },
  mourning: {
    label: 'Mourning',
    color: '#555',
    bg: '#f5f5f5',
    dot: '#555'
  },
  historical: {
    label: 'Historical',
    color: '#5B2D8E',
    bg: '#f3ebff',
    dot: '#5B2D8E'
  },
  'sacred-months': {
    label: 'Sacred Month',
    color: '#c4932a',
    bg: '#fff4e0',
    dot: '#c4932a'
  },
  general: {
    label: 'General',
    color: '#555',
    bg: '#f5f5f5',
    dot: '#aaa'
  },
}

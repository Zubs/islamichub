// The words of the Tools page in English. Sections follow the page from top to bottom; each
// group's tools are the list of the same name.
export default {
  header: {
    badge: 'Tools',
    title: 'Tools for daily practice',
    lead: 'Every calculator, tracker and counter on IslamicHub in one place. They are free, need no account, and what you enter stays on your device.',
    note: 'The calculators are guides, not rulings. For a ruling on your own situation, ask a qualified scholar.',
  },
  prayer: {
    eyebrow: 'Prayer',
    title: 'For the five daily prayers',
  },
  remembrance: {
    eyebrow: 'Remembrance',
    title: 'For dhikr and supplication',
  },
  money: {
    eyebrow: 'Wealth',
    title: 'For Zakat, inheritance and sacrifice',
  },
  fasting: {
    eyebrow: 'Fasting and study',
    title: 'For Ramadan and learning',
  },
  games: {
    eyebrow: 'Games',
    title: 'For learning while you play',
  },
  lists: {
    prayer: [
      {
        to: '/prayer#times',
        icon: '🕐',
        name: 'Prayer times',
        text: 'Fajr, Dhuhr, Asr, Maghrib and Isha for where you are, with a countdown to the next prayer and optional reminders.',
      },
      {
        to: '/prayer#qibla',
        icon: '🧭',
        name: 'Qibla finder',
        text: 'The compass bearing to the Ka‘bah and your distance from Makkah.',
      },
      {
        to: '/tracker',
        icon: '✅',
        name: 'Prayer tracker',
        text: 'Mark each prayer as you pray it, see the week and month at a glance, and keep a streak.',
      },
    ],
    remembrance: [
      {
        to: '/adhkar',
        icon: '📿',
        name: 'Adhkar',
        text: 'Morning, evening and after-prayer remembrance in Arabic, transliteration and translation, with a counter on each.',
      },
      {
        to: '/duas',
        icon: '🤲',
        name: 'Duas',
        text: 'Supplications for travel, eating, illness, distress, family and more, each with its source.',
      },
      {
        to: '/tasbih',
        icon: '🔢',
        name: 'Tasbih counter',
        text: 'A tap counter for dhikr with a target for each phrase and daily totals kept on your device.',
      },
    ],
    money: [
      {
        to: '/zakat',
        icon: '⚖️',
        name: 'Zakat calculator',
        text: 'Today’s gold and silver prices, both nisab methods, and every kind of asset, in naira or your own currency.',
      },
      {
        to: '/inheritance',
        icon: '📜',
        name: 'Inheritance calculator',
        text: 'The shares of each heir under the Qur’anic rules of fara’id.',
      },
      {
        to: '/qurbani',
        icon: '🐑',
        name: 'Qurbani shares',
        text: 'How a household or group can share sheep, goats, a cow or a camel for Eid al-Adha.',
      },
    ],
    fasting: [
      {
        to: '/calendar',
        icon: '🗓️',
        name: 'Islamic calendar',
        text: 'The Hijri months beside the dates you know, with ‘Arafah, ‘Ashura, the white days and other days of sunnah marked.',
      },
      {
        to: '/fasting',
        icon: '🌙',
        name: 'Ramadan tracker',
        text: 'Log each fast of Ramadan and the days you owe and make up.',
      },
      {
        to: '/hadith/books',
        icon: '📚',
        name: 'Hadith library',
        text: 'Browse nine collections of hadith book by book and chapter by chapter.',
      },
    ],
    games: [
      {
        to: '/games',
        icon: '🎲',
        name: 'Games',
        text: 'A prophets quiz, Who am I?, and Kalimah, a daily word from the Qur’an, each answer with its evidence.',
      },
    ],
  },
}

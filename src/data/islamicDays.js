// The days of the Islamic year the calendar marks: only those with a sunnah in authentic sources
// (Zubair's decision, 17 October 2026). Each kind has the Hijri dates it falls on (a month and
// days, days of every month, a month from a day to its end, or days of the week) and the
// references its explanation rests on, each checked against its source. A rule's `label` names
// that day within the kind. The words are in data/content/calendar/en.js under the kind's key.
export const ISLAMIC_DAYS = [
  {
    key: 'arafah',
    rules: [{ month: 12, days: [9] }],
    references: ['Sahih Muslim 1162'],
  },
  {
    key: 'ashura',
    rules: [
      { month: 1, days: [9], label: 'tasua' },
      { month: 1, days: [10], label: 'ashura' },
    ],
    references: ['Sahih Bukhari 2004', 'Sahih Muslim 1162', 'Sahih Muslim 1134'],
  },
  {
    key: 'dhul-hijjah',
    rules: [{ month: 12, days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }],
    references: ['Abu Dawud 2438', 'Al-Tirmidhi 757'],
  },
  {
    key: 'white-days',
    rules: [{ days: [13, 14, 15] }],
    references: ['Sahih Muslim 1162', 'Al-Tirmidhi 761'],
  },
  {
    key: 'monday-thursday',
    rules: [
      { weekdays: [1], label: 'monday' },
      { weekdays: [4], label: 'thursday' },
    ],
    references: ['Sahih Muslim 1162', 'Al-Tirmidhi 747'],
  },
  {
    key: 'last-ten',
    rules: [{ month: 9, from: 21 }],
    references: ['Sahih Bukhari 2020', 'Sahih Bukhari 2024', "Qur'an 97:3"],
  },
  {
    key: 'eid',
    rules: [
      { month: 10, days: [1], label: 'fitr' },
      { month: 12, days: [10], label: 'adha' },
    ],
    references: ['Sahih Bukhari 1990'],
  },
]

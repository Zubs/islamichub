// What every language shares in the story of Salih: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/salih/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Salih; the story cites every one of them.
export const passages = [
  "Qur'an 7:73-79",
  "Qur'an 11:61-68",
  "Qur'an 15:80-84",
  "Qur'an 17:59",
  "Qur'an 26:141-159",
  "Qur'an 27:45-53",
  "Qur'an 54:23-31",
  "Qur'an 91:11-15",
]

export default [
  {
    id: 'people',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:73",
      "Qur'an 7:74",
      "Qur'an 26:146",
      "Qur'an 26:147",
      "Qur'an 26:148",
      "Qur'an 26:149",
      "Qur'an 15:82",
    ],
  },
  {
    id: 'call',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 11:61",
      "Qur'an 11:62",
      "Qur'an 11:63",
      "Qur'an 26:142",
      "Qur'an 26:143",
      "Qur'an 26:144",
      "Qur'an 26:145",
      "Qur'an 27:45",
      "Qur'an 27:46",
      "Qur'an 27:47",
    ],
  },
  {
    id: 'camel',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:73",
      "Qur'an 11:64",
      "Qur'an 26:154",
      "Qur'an 26:155",
      "Qur'an 26:156",
      "Qur'an 54:27",
      "Qur'an 54:28",
      "Qur'an 17:59",
    ],
  },
  {
    id: 'camelVerse',
    type: 'verse',
    arabic:
      'وَيَا قَوْمِ هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابٌ قَرِيبٌ',
    reference: "Qur'an 11:64",
  },
  {
    id: 'plot',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 7:75", "Qur'an 7:76", "Qur'an 27:48", "Qur'an 27:49", "Qur'an 27:50"],
  },
  {
    id: 'hamstrung',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 54:29",
      "Qur'an 91:11",
      "Qur'an 91:12",
      "Qur'an 91:13",
      "Qur'an 91:14",
      "Qur'an 7:77",
      "Qur'an 11:65",
      "Qur'an 26:157",
    ],
  },
  {
    id: 'punishment',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 11:66",
      "Qur'an 11:67",
      "Qur'an 11:68",
      "Qur'an 7:78",
      "Qur'an 7:79",
      "Qur'an 54:31",
      "Qur'an 15:83",
      "Qur'an 15:84",
      "Qur'an 27:51",
      "Qur'an 27:52",
      "Qur'an 27:53",
    ],
  },
  {
    id: 'punishmentVerse',
    type: 'verse',
    arabic:
      'فَتَوَلَّىٰ عَنْهُمْ وَقَالَ يَا قَوْمِ لَقَدْ أَبْلَغْتُكُمْ رِسَالَةَ رَبِّي وَنَصَحْتُ لَكُمْ وَلَٰكِنْ لَا تُحِبُّونَ النَّاصِحِينَ',
    reference: "Qur'an 7:79",
  },
  {
    id: 'hijr',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 3379', 'Sahih Bukhari 3378', 'Sahih Bukhari 433', "Qur'an 15:80"],
  },
]

// What every language shares in the story of Harun: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/harun/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset. His part in Musa's story is told in full there.

// The passages of the Qur'an that name Harun; the story cites every one of them.
export const passages = [
  "Qur'an 2:248",
  "Qur'an 4:163",
  "Qur'an 6:84",
  "Qur'an 7:122",
  "Qur'an 7:142",
  "Qur'an 7:150-151",
  "Qur'an 10:75",
  "Qur'an 19:53",
  "Qur'an 20:29-36",
  "Qur'an 20:70",
  "Qur'an 20:90-94",
  "Qur'an 21:48",
  "Qur'an 23:45-48",
  "Qur'an 25:35-36",
  "Qur'an 26:13",
  "Qur'an 26:48",
  "Qur'an 28:34-35",
  "Qur'an 37:114-122",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 19:53", "Qur'an 4:163", "Qur'an 6:84", "Qur'an 21:48", "Qur'an 25:35"],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic: 'وَوَهَبْنَا لَهُ مِنْ رَحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا',
    reference: "Qur'an 19:53",
  },
  {
    id: 'prayer',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 26:13",
      "Qur'an 28:34",
      "Qur'an 20:29",
      "Qur'an 20:30",
      "Qur'an 20:31",
      "Qur'an 20:32",
      "Qur'an 20:36",
      "Qur'an 28:35",
    ],
  },
  {
    id: 'pharaoh',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 20:42",
      "Qur'an 20:43",
      "Qur'an 20:44",
      "Qur'an 20:45",
      "Qur'an 20:46",
      "Qur'an 10:75",
      "Qur'an 23:45",
      "Qur'an 23:47",
      "Qur'an 23:48",
      "Qur'an 25:36",
    ],
  },
  {
    id: 'magicians',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 7:122", "Qur'an 20:70", "Qur'an 26:48"],
  },
  {
    id: 'egypt',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 10:87"],
  },
  {
    id: 'calf',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 7:142",
      "Qur'an 20:90",
      "Qur'an 20:91",
      "Qur'an 20:92",
      "Qur'an 20:93",
      "Qur'an 20:94",
      "Qur'an 7:150",
      "Qur'an 7:151",
    ],
  },
  {
    id: 'calfVerse',
    type: 'verse',
    arabic:
      'وَلَقَدْ قَالَ لَهُمْ هَارُونُ مِنْ قَبْلُ يَا قَوْمِ إِنَّمَا فُتِنْتُمْ بِهِ ۖ وَإِنَّ رَبَّكُمُ الرَّحْمَٰنُ فَاتَّبِعُونِي وَأَطِيعُوا أَمْرِي',
    reference: "Qur'an 20:90",
  },
  {
    id: 'honour',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 37:114",
      "Qur'an 37:115",
      "Qur'an 37:117",
      "Qur'an 37:119",
      "Qur'an 37:120",
      "Qur'an 37:122",
      "Qur'an 2:248",
    ],
  },
  {
    id: 'peaceVerse',
    type: 'verse',
    arabic: 'سَلَامٌ عَلَىٰ مُوسَىٰ وَهَارُونَ',
    reference: "Qur'an 37:120",
  },
  {
    id: 'legacy',
    type: 'points',
    items: [{ reference: 'Sahih Bukhari 3393' }, { reference: 'Sahih Bukhari 4416' }],
  },
  {
    id: 'death',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 37:122"],
  },
]

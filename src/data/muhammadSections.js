// What every language shares in the story of the Prophet Muhammad ﷺ: the order and kind of its
// sections, the Arabic of each verse and the references. The words are in content/muhammad/en.js
// (and in each translation) under the same ids. Every reference here was checked against its
// source, and the Arabic is from an open Qur'an dataset. It is an outline of his life's main
// events, not a full account of his life.

// The passages of the Qur'an this outline tells; it cites every one of them.
export const passages = [
  "Qur'an 3:121-123",
  "Qur'an 3:144",
  "Qur'an 8:9",
  "Qur'an 9:40",
  "Qur'an 17:1",
  "Qur'an 17:81",
  "Qur'an 21:107",
  "Qur'an 26:214",
  "Qur'an 33:9-10",
  "Qur'an 33:40",
  "Qur'an 48:1",
  "Qur'an 48:18",
  "Qur'an 53:13-18",
  "Qur'an 68:4",
  "Qur'an 93:6-8",
  "Qur'an 96:1-5",
  "Qur'an 110:1-3",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 33:40", "Qur'an 21:107", "Qur'an 68:4", "Qur'an 3:144"],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic:
      'مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِنْ رِجَالِكُمْ وَلَٰكِنْ رَسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ۗ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا',
    reference: "Qur'an 33:40",
  },
  {
    id: 'early',
    type: 'prose',
    paragraphs: 2,
    references: [
      'Sahih Muslim 1162',
      "Qur'an 93:6",
      "Qur'an 93:7",
      "Qur'an 93:8",
      'Sahih Bukhari 3902',
    ],
  },
  {
    id: 'revelation',
    type: 'prose',
    paragraphs: 3,
    references: [
      'Sahih Bukhari 3',
      "Qur'an 96:1",
      "Qur'an 96:2",
      "Qur'an 96:3",
      "Qur'an 96:4",
      "Qur'an 96:5",
    ],
  },
  {
    id: 'revelationVerse',
    type: 'verse',
    arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    reference: "Qur'an 96:1",
  },
  {
    id: 'call',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 26:214", 'Sahih Bukhari 4770', 'Sahih Bukhari 240'],
  },
  {
    id: 'taif',
    type: 'prose',
    paragraphs: 1,
    references: ['Sahih Bukhari 3231'],
  },
  {
    id: 'journey',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 17:1",
      "Qur'an 53:13",
      "Qur'an 53:14",
      "Qur'an 53:15",
      "Qur'an 53:16",
      "Qur'an 53:17",
      "Qur'an 53:18",
      'Sahih Bukhari 3207',
      'Sahih Bukhari 3886',
    ],
  },
  {
    id: 'journeyVerse',
    type: 'verse',
    arabic:
      'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ',
    reference: "Qur'an 17:1",
  },
  {
    id: 'hijrah',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 9:40", 'Sahih Bukhari 3905', 'Sahih Bukhari 3906'],
  },
  {
    id: 'madinah',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 63:8", "Qur'an 33:13", 'Sahih Bukhari 3902'],
  },
  {
    id: 'badr',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 3:123", "Qur'an 8:9"],
  },
  {
    id: 'uhud',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:121", "Qur'an 3:122", "Qur'an 3:144", 'Sahih Bukhari 3231'],
  },
  {
    id: 'trench',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 33:9", "Qur'an 33:10"],
  },
  {
    id: 'hudaybiyah',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 2731', "Qur'an 48:1", "Qur'an 48:18", "Qur'an 48:24"],
  },
  {
    id: 'conquest',
    type: 'prose',
    paragraphs: 2,
    references: [
      'Sahih Bukhari 4287',
      "Qur'an 17:81",
      "Qur'an 110:1",
      "Qur'an 110:2",
      "Qur'an 110:3",
    ],
  },
  {
    id: 'conquestVerse',
    type: 'verse',
    arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
    reference: "Qur'an 110:1",
  },
  {
    id: 'farewell',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 4406', 'Sahih Bukhari 45'],
  },
  {
    id: 'death',
    type: 'prose',
    paragraphs: 3,
    references: ['Sahih Bukhari 4463', 'Sahih Bukhari 3536', 'Sahih Bukhari 3667', "Qur'an 3:144"],
  },
  {
    id: 'deathVerse',
    type: 'verse',
    arabic:
      'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِنْ قَبْلِهِ الرُّسُلُ ۚ أَفَإِنْ مَاتَ أَوْ قُتِلَ انْقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ ۚ وَمَنْ يَنْقَلِبْ عَلَىٰ عَقِبَيْهِ فَلَنْ يَضُرَّ اللَّهَ شَيْئًا ۗ وَسَيَجْزِي اللَّهُ الشَّاكِرِينَ',
    reference: "Qur'an 3:144",
  },
]

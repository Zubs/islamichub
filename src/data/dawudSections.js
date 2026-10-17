// What every language shares in the story of Dawud: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/dawud/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Dawud; the story cites every one of them.
export const passages = [
  "Qur'an 2:251",
  "Qur'an 4:163",
  "Qur'an 5:78",
  "Qur'an 6:84",
  "Qur'an 17:55",
  "Qur'an 21:78-80",
  "Qur'an 27:15-16",
  "Qur'an 34:10-11",
  "Qur'an 34:13",
  "Qur'an 38:17-26",
  "Qur'an 38:30",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:84", "Qur'an 4:163", "Qur'an 17:55", "Qur'an 38:17"],
  },
  {
    id: 'jalut',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:246", "Qur'an 2:247", "Qur'an 2:249", "Qur'an 2:250", "Qur'an 2:251"],
  },
  {
    id: 'jalutVerse',
    type: 'verse',
    arabic:
      'فَهَزَمُوهُمْ بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ ۗ وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُمْ بِبَعْضٍ لَفَسَدَتِ الْأَرْضُ وَلَٰكِنَّ اللَّهَ ذُو فَضْلٍ عَلَى الْعَالَمِينَ',
    reference: "Qur'an 2:251",
  },
  {
    id: 'praise',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 38:18",
      "Qur'an 38:19",
      "Qur'an 34:10",
      "Qur'an 21:79",
      'Sahih Bukhari 3417',
    ],
  },
  {
    id: 'iron',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 34:10", "Qur'an 34:11", "Qur'an 21:80"],
  },
  {
    id: 'ironVerse',
    type: 'verse',
    arabic:
      '۞ وَلَقَدْ آتَيْنَا دَاوُودَ مِنَّا فَضْلًا ۖ يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ',
    reference: "Qur'an 34:10",
  },
  {
    id: 'kingdom',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:20", "Qur'an 27:15", "Qur'an 34:13"],
  },
  {
    id: 'disputants',
    type: 'prose',
    paragraphs: 3,
    references: ["Qur'an 38:21", "Qur'an 38:22", "Qur'an 38:23", "Qur'an 38:24", "Qur'an 38:25"],
  },
  {
    id: 'successor',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:26"],
  },
  {
    id: 'successorVerse',
    type: 'verse',
    arabic:
      'يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُمْ بَيْنَ النَّاسِ بِالْحَقِّ وَلَا تَتَّبِعِ الْهَوَىٰ فَيُضِلَّكَ عَنْ سَبِيلِ اللَّهِ ۚ إِنَّ الَّذِينَ يَضِلُّونَ عَنْ سَبِيلِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ بِمَا نَسُوا يَوْمَ الْحِسَابِ',
    reference: "Qur'an 38:26",
  },
  {
    id: 'field',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:78", "Qur'an 21:79", 'Sahih Bukhari 3427'],
  },
  {
    id: 'worship',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 1131', 'Sahih Bukhari 2072', 'Sahih Bukhari 3417'],
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:30", "Qur'an 27:16", "Qur'an 5:78"],
  },
]

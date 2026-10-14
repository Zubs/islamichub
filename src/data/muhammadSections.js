// What every language shares in the story of Muhammad: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/muhammad/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'revelation',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 96:1",
      "Qur'an 96:2",
      "Qur'an 96:3",
      "Qur'an 96:4",
      "Qur'an 96:5",
      'Sahih Bukhari 3',
    ],
  },
  {
    id: 'revelationVerse',
    type: 'verse',
    arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    reference: "Qur'an 96:1",
  },
  {
    id: 'mercy',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 9:128",
      "Qur'an 21:107",
      "Qur'an 34:28",
      "Qur'an 68:4",
      'Sahih Bukhari 438',
    ],
  },
  {
    id: 'mercyVerse',
    type: 'verse',
    arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ',
    reference: "Qur'an 21:107",
  },
  {
    id: 'seal',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:144", "Qur'an 33:40", "Qur'an 47:2", 'Sahih Bukhari 3535'],
  },
  {
    id: 'sealVerse',
    type: 'verse',
    arabic:
      'مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِنْ رِجَالِكُمْ وَلَٰكِنْ رَسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ۗ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا',
    reference: "Qur'an 33:40",
  },
  {
    id: 'completion',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 5:3",
      "Qur'an 17:1",
      "Qur'an 48:28",
      "Qur'an 48:29",
      'Sahih Bukhari 3373',
      'Sahih Bukhari 3393',
    ],
  },
]

// What every language shares in the story of Harun: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/harun/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'prophet',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 19:53",
      "Qur'an 20:29",
      "Qur'an 20:30",
      "Qur'an 20:31",
      "Qur'an 20:32",
      "Qur'an 20:42",
      "Qur'an 23:45",
      "Qur'an 28:34",
    ],
  },
  {
    id: 'prophetVerse',
    type: 'verse',
    arabic: 'وَوَهَبْنَا لَهُ مِنْ رَحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا',
    reference: "Qur'an 19:53",
  },
  {
    id: 'court',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 20:43",
      "Qur'an 20:44",
      "Qur'an 20:47",
      "Qur'an 20:70",
      "Qur'an 26:15",
      "Qur'an 26:16",
      "Qur'an 26:48",
    ],
  },
  {
    id: 'calf',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:142",
      "Qur'an 7:148",
      "Qur'an 7:150",
      "Qur'an 7:151",
      "Qur'an 20:85",
      "Qur'an 20:90",
      "Qur'an 20:94",
    ],
  },
  {
    id: 'calfVerse',
    type: 'verse',
    arabic:
      'وَلَقَدْ قَالَ لَهُمْ هَارُونُ مِنْ قَبْلُ يَا قَوْمِ إِنَّمَا فُتِنْتُمْ بِهِ ۖ وَإِنَّ رَبَّكُمُ الرَّحْمَٰنُ فَاتَّبِعُونِي وَأَطِيعُوا أَمْرِي',
    reference: "Qur'an 20:90",
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:120", "Qur'an 37:121", 'Sahih Bukhari 3393', 'Sahih Bukhari 4416'],
  },
  {
    id: 'peaceVerse',
    type: 'verse',
    arabic: 'سَلَامٌ عَلَىٰ مُوسَىٰ وَهَارُونَ',
    reference: "Qur'an 37:120",
  },
]

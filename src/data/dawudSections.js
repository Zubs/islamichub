// What every language shares in the story of Dawud: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/dawud/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'slaying',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:249", "Qur'an 2:250", "Qur'an 2:251"],
  },
  {
    id: 'slayingVerse',
    type: 'verse',
    arabic:
      'فَهَزَمُوهُمْ بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ',
    reference: "Qur'an 2:251",
  },
  {
    id: 'kingdom',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 21:79",
      "Qur'an 21:80",
      "Qur'an 34:10",
      "Qur'an 34:11",
      "Qur'an 38:18",
      "Qur'an 38:19",
      'Sahih Bukhari 2072',
      'Sahih Bukhari 5048',
    ],
  },
  {
    id: 'devotion',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 4:163",
      "Qur'an 38:17",
      "Qur'an 38:24",
      'Sahih Bukhari 1131',
      'Sahih Bukhari 3420',
    ],
  },
  {
    id: 'devotionVerse',
    type: 'verse',
    arabic:
      'اصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاذْكُرْ عَبْدَنَا دَاوُودَ ذَا الْأَيْدِ ۖ إِنَّهُ أَوَّابٌ',
    reference: "Qur'an 38:17",
  },
  {
    id: 'justice',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 38:21", "Qur'an 38:22", "Qur'an 38:26"],
  },
  {
    id: 'justiceVerse',
    type: 'verse',
    arabic:
      'يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُمْ بَيْنَ النَّاسِ بِالْحَقِّ وَلَا تَتَّبِعِ الْهَوَىٰ فَيُضِلَّكَ عَنْ سَبِيلِ اللَّهِ',
    reference: "Qur'an 38:26",
  },
]

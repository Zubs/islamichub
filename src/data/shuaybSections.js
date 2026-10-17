// What every language shares in the story of Shu‘ayb: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/shuayb/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Shu‘ayb; the story cites every one of them.
export const passages = [
  "Qur'an 7:85-93",
  "Qur'an 11:84-95",
  "Qur'an 15:78-79",
  "Qur'an 26:176-191",
  "Qur'an 29:36-37",
]

export default [
  {
    id: 'people',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 7:85", "Qur'an 11:84", "Qur'an 29:36"],
  },
  {
    id: 'measure',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:85",
      "Qur'an 7:86",
      "Qur'an 11:84",
      "Qur'an 11:85",
      "Qur'an 11:86",
      "Qur'an 26:181",
      "Qur'an 26:182",
      "Qur'an 26:183",
    ],
  },
  {
    id: 'measureVerse',
    type: 'verse',
    arabic:
      'وَيَا قَوْمِ أَوْفُوا الْمِكْيَالَ وَالْمِيزَانَ بِالْقِسْطِ ۖ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ',
    reference: "Qur'an 11:85",
  },
  {
    id: 'answer',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 11:87",
      "Qur'an 11:88",
      "Qur'an 11:89",
      "Qur'an 11:90",
      "Qur'an 11:91",
      "Qur'an 11:92",
      "Qur'an 11:93",
    ],
  },
  {
    id: 'answerVerse',
    type: 'verse',
    arabic:
      'قَالَ يَا قَوْمِ أَرَأَيْتُمْ إِنْ كُنْتُ عَلَىٰ بَيِّنَةٍ مِنْ رَبِّي وَرَزَقَنِي مِنْهُ رِزْقًا حَسَنًا ۚ وَمَا أُرِيدُ أَنْ أُخَالِفَكُمْ إِلَىٰ مَا أَنْهَاكُمْ عَنْهُ ۚ إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ',
    reference: "Qur'an 11:88",
  },
  {
    id: 'threat',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 7:87", "Qur'an 7:88", "Qur'an 7:89", "Qur'an 7:90"],
  },
  {
    id: 'punishment',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:91",
      "Qur'an 7:92",
      "Qur'an 7:93",
      "Qur'an 11:94",
      "Qur'an 11:95",
      "Qur'an 29:37",
    ],
  },
  {
    id: 'thicket',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 26:176",
      "Qur'an 26:177",
      "Qur'an 26:178",
      "Qur'an 26:179",
      "Qur'an 26:180",
      "Qur'an 26:185",
      "Qur'an 26:186",
      "Qur'an 26:187",
      "Qur'an 26:188",
      "Qur'an 26:189",
      "Qur'an 15:78",
      "Qur'an 15:79",
    ],
  },
  {
    id: 'musa',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 28:23", "Qur'an 28:27"],
  },
]

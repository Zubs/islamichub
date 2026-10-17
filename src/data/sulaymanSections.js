// What every language shares in the story of Sulayman: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/sulayman/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Sulayman; the story cites every one of them.
export const passages = [
  "Qur'an 2:102",
  "Qur'an 4:163",
  "Qur'an 6:84",
  "Qur'an 21:78-82",
  "Qur'an 27:15-44",
  "Qur'an 34:12-14",
  "Qur'an 38:30-40",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 38:30", "Qur'an 27:15", "Qur'an 27:16", "Qur'an 4:163", "Qur'an 6:84"],
  },
  {
    id: 'judgement',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:78", "Qur'an 21:79", 'Sahih Bukhari 3427'],
  },
  {
    id: 'horses',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:31", "Qur'an 38:32", "Qur'an 38:33"],
  },
  {
    id: 'trial',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 38:34", "Qur'an 38:35", 'Sahih Bukhari 3424'],
  },
  {
    id: 'trialVerse',
    type: 'verse',
    arabic:
      'قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَا يَنْبَغِي لِأَحَدٍ مِنْ بَعْدِي ۖ إِنَّكَ أَنْتَ الْوَهَّابُ',
    reference: "Qur'an 38:35",
  },
  {
    id: 'gifts',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 38:36",
      "Qur'an 38:37",
      "Qur'an 38:38",
      "Qur'an 38:39",
      "Qur'an 21:81",
      "Qur'an 21:82",
      "Qur'an 34:12",
      "Qur'an 34:13",
    ],
  },
  {
    id: 'ants',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 27:17", "Qur'an 27:18", "Qur'an 27:19"],
  },
  {
    id: 'antsVerse',
    type: 'verse',
    arabic:
      'فَتَبَسَّمَ ضَاحِكًا مِنْ قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
    reference: "Qur'an 27:19",
  },
  {
    id: 'hoopoe',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 27:20",
      "Qur'an 27:21",
      "Qur'an 27:22",
      "Qur'an 27:23",
      "Qur'an 27:24",
      "Qur'an 27:25",
      "Qur'an 27:26",
    ],
  },
  {
    id: 'letter',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 27:27",
      "Qur'an 27:28",
      "Qur'an 27:29",
      "Qur'an 27:30",
      "Qur'an 27:31",
      "Qur'an 27:32",
      "Qur'an 27:33",
      "Qur'an 27:34",
      "Qur'an 27:35",
    ],
  },
  {
    id: 'letterVerse',
    type: 'verse',
    arabic: 'إِنَّهُ مِنْ سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    reference: "Qur'an 27:30",
  },
  {
    id: 'throne',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 27:36",
      "Qur'an 27:37",
      "Qur'an 27:38",
      "Qur'an 27:39",
      "Qur'an 27:40",
      "Qur'an 27:41",
    ],
  },
  {
    id: 'queen',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 27:42", "Qur'an 27:43", "Qur'an 27:44"],
  },
  {
    id: 'magic',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 2:102"],
  },
  {
    id: 'death',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 34:14"],
  },
  {
    id: 'deathVerse',
    type: 'verse',
    arabic:
      'فَلَمَّا قَضَيْنَا عَلَيْهِ الْمَوْتَ مَا دَلَّهُمْ عَلَىٰ مَوْتِهِ إِلَّا دَابَّةُ الْأَرْضِ تَأْكُلُ مِنْسَأَتَهُ ۖ فَلَمَّا خَرَّ تَبَيَّنَتِ الْجِنُّ أَنْ لَوْ كَانُوا يَعْلَمُونَ الْغَيْبَ مَا لَبِثُوا فِي الْعَذَابِ الْمُهِينِ',
    reference: "Qur'an 34:14",
  },
]

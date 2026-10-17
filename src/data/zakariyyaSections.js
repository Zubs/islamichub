// What every language shares in the story of Zakariyya: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/zakariyya/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Zakariyya; the story cites every one of them.
export const passages = ["Qur'an 3:37-41", "Qur'an 6:85", "Qur'an 19:2-11", "Qur'an 21:89-90"]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:85", "Qur'an 19:2", 'Sahih Muslim 2379'],
  },
  {
    id: 'maryam',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:35", "Qur'an 3:36", "Qur'an 3:37", "Qur'an 3:44"],
  },
  {
    id: 'prayer',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 3:38",
      "Qur'an 19:3",
      "Qur'an 19:4",
      "Qur'an 19:5",
      "Qur'an 19:6",
      "Qur'an 21:89",
    ],
  },
  {
    id: 'prayerVerse',
    type: 'verse',
    arabic:
      'قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا',
    reference: "Qur'an 19:4",
  },
  {
    id: 'tidings',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 3:39",
      "Qur'an 3:40",
      "Qur'an 19:7",
      "Qur'an 19:8",
      "Qur'an 19:9",
      "Qur'an 21:90",
    ],
  },
  {
    id: 'sign',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:41", "Qur'an 19:10", "Qur'an 19:11"],
  },
  {
    id: 'family',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 21:90"],
  },
  {
    id: 'familyVerse',
    type: 'verse',
    arabic:
      'فَاسْتَجَبْنَا لَهُ وَوَهَبْنَا لَهُ يَحْيَىٰ وَأَصْلَحْنَا لَهُ زَوْجَهُ ۚ إِنَّهُمْ كَانُوا يُسَارِعُونَ فِي الْخَيْرَاتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا لَنَا خَاشِعِينَ',
    reference: "Qur'an 21:90",
  },
]

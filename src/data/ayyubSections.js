// What every language shares in the story of Ayyub: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ayyub/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Ayyub; the story cites every one of them.
export const passages = ["Qur'an 4:163", "Qur'an 6:84", "Qur'an 21:83-84", "Qur'an 38:41-44"]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 4:163", "Qur'an 6:84", "Qur'an 38:41", "Qur'an 38:44"],
  },
  {
    id: 'trial',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:83", "Qur'an 38:41"],
  },
  {
    id: 'trialVerse',
    type: 'verse',
    arabic:
      '۞ وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ',
    reference: "Qur'an 21:83",
  },
  {
    id: 'relief',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 38:42", "Qur'an 38:43", "Qur'an 21:84"],
  },
  {
    id: 'oath',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:44"],
  },
  {
    id: 'oathVerse',
    type: 'verse',
    arabic:
      'وَخُذْ بِيَدِكَ ضِغْثًا فَاضْرِبْ بِهِ وَلَا تَحْنَثْ ۗ إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ',
    reference: "Qur'an 38:44",
  },
  {
    id: 'gold',
    type: 'prose',
    paragraphs: 1,
    references: ['Sahih Bukhari 3391', 'Sahih Bukhari 279'],
  },
  {
    id: 'silent',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 21:84"],
  },
]

// What every language shares in the story of Ayyub: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ayyub/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'trial',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 4:163", "Qur'an 6:84", "Qur'an 21:83"],
  },
  {
    id: 'supplicationVerse',
    type: 'verse',
    arabic:
      'وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ',
    reference: "Qur'an 21:83",
  },
  {
    id: 'relief',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 38:41", "Qur'an 38:42", "Qur'an 21:84", "Qur'an 38:43"],
  },
  {
    id: 'reliefVerse',
    type: 'verse',
    arabic: 'ارْكُضْ بِرِجْلِكَ ۖ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ',
    reference: "Qur'an 38:42",
  },
  {
    id: 'oath',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 38:44"],
  },
  {
    id: 'patienceVerse',
    type: 'verse',
    arabic: 'إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ',
    reference: "Qur'an 38:44",
  },
  {
    id: 'blessing',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 279', 'Sahih Bukhari 3391', 'Sahih Bukhari 5641'],
  },
]

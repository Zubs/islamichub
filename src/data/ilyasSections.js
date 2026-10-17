// What every language shares in the story of Ilyas: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ilyas/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'messenger',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:85", "Qur'an 37:123"],
  },
  {
    id: 'messengerVerse',
    type: 'verse',
    arabic: 'وَإِنَّ إِلْيَاسَ لَمِنَ الْمُرْسَلِينَ',
    reference: "Qur'an 37:123",
  },
  {
    id: 'warning',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:124", "Qur'an 37:125", "Qur'an 37:126"],
  },
  {
    id: 'warningVerse',
    type: 'verse',
    arabic: 'أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ الْخَالِقِينَ',
    reference: "Qur'an 37:125",
  },
  {
    id: 'deliverance',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 37:127",
      "Qur'an 37:128",
      "Qur'an 37:129",
      "Qur'an 37:130",
      "Qur'an 37:131",
      "Qur'an 37:132",
      'Sahih Bukhari 3390',
      'Sahih Bukhari 3373',
    ],
  },
  {
    id: 'peaceVerse',
    type: 'verse',
    arabic: 'سَلَامٌ عَلَىٰ إِلْ يَاسِينَ',
    reference: "Qur'an 37:130",
  },
]

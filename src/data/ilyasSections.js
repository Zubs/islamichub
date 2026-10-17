// What every language shares in the story of Ilyas: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ilyas/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Ilyas; the story cites every one of them.
export const passages = ["Qur'an 6:85", "Qur'an 37:123-132"]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 37:123", "Qur'an 6:85"],
  },
  {
    id: 'call',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 37:124",
      "Qur'an 37:125",
      "Qur'an 37:126",
      "Qur'an 37:127",
      "Qur'an 37:128",
    ],
  },
  {
    id: 'callVerse',
    type: 'verse',
    arabic: 'أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ الْخَالِقِينَ',
    reference: "Qur'an 37:125",
  },
  {
    id: 'peace',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 37:129", "Qur'an 37:130", "Qur'an 37:131", "Qur'an 37:132"],
  },
  {
    id: 'peaceVerse',
    type: 'verse',
    arabic: 'سَلَامٌ عَلَىٰ إِلْ يَاسِينَ',
    reference: "Qur'an 37:130",
  },
  {
    id: 'silent',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 37:123"],
  },
]

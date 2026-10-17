// What every language shares in the story of Al-Yasa‘: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/al-yasa/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset. The sources say little of him, and nothing is added.

// The passages of the Qur'an that tell of Al-Yasa‘; the story cites every one of them.
export const passages = ["Qur'an 6:86", "Qur'an 38:48"]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:86", "Qur'an 38:48"],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِنَ الْأَخْيَارِ',
    reference: "Qur'an 38:48",
  },
  {
    id: 'silent',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 6:86"],
  },
]

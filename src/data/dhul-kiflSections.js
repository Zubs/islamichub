// What every language shares in the story of Dhul-Kifl: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/dhul-kifl/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset. The sources say little of him, and nothing is added.

// The passages of the Qur'an that tell of Dhul-Kifl; the story cites every one of them.
export const passages = ["Qur'an 21:85-86", "Qur'an 38:48"]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:85", "Qur'an 21:86", "Qur'an 38:48"],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِنَ الصَّابِرِينَ',
    reference: "Qur'an 21:85",
  },
  {
    id: 'silent',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 21:85"],
  },
]

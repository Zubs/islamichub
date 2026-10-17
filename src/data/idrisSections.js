// What every language shares in the story of Idris: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/idris/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset. The sources say little of him, and nothing is added.

// The passages of the Qur'an that tell of Idris; the story cites every one of them.
export const passages = ["Qur'an 19:56-57", "Qur'an 21:85-86"]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 19:56", "Qur'an 19:57", "Qur'an 21:85", "Qur'an 21:86"],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic: 'وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَبِيًّا',
    reference: "Qur'an 19:56",
  },
  {
    id: 'heaven',
    type: 'prose',
    paragraphs: 1,
    references: ['Sahih Bukhari 3207', 'Sahih Bukhari 3342'],
  },
  {
    id: 'silent',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 19:56"],
  },
]

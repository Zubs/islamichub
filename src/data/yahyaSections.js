// What every language shares in the story of Yahya: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/yahya/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Yahya; the story cites every one of them.
export const passages = [
  "Qur'an 3:39",
  "Qur'an 6:85",
  "Qur'an 19:7",
  "Qur'an 19:12-15",
  "Qur'an 21:90",
]

export default [
  {
    id: 'birth',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:39", "Qur'an 19:7", "Qur'an 21:90"],
  },
  {
    id: 'qualities',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 19:12", "Qur'an 19:13", "Qur'an 19:14", "Qur'an 3:39", "Qur'an 6:85"],
  },
  {
    id: 'qualitiesVerse',
    type: 'verse',
    arabic: 'يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا',
    reference: "Qur'an 19:12",
  },
  {
    id: 'peace',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 19:15"],
  },
  {
    id: 'peaceVerse',
    type: 'verse',
    arabic: 'وَسَلَامٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا',
    reference: "Qur'an 19:15",
  },
  {
    id: 'commands',
    type: 'prose',
    paragraphs: 3,
    references: ['Al-Tirmidhi 2863'],
  },
  {
    id: 'legacy',
    type: 'points',
    items: [{ reference: 'Sahih Bukhari 3207' }],
  },
]

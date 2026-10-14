// What every language shares in the story of Al-Yasa’: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/al-yasa/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'prophet',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:86", "Qur'an 6:87", "Qur'an 38:48"],
  },
  {
    id: 'prophetVerse',
    type: 'verse',
    arabic:
      'وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ',
    reference: "Qur'an 6:86",
  },
  {
    id: 'virtues',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 6:84",
      "Qur'an 6:85",
      "Qur'an 38:45",
      "Qur'an 38:48",
      'Sahih Bukhari 3373',
      'Sahih Bukhari 3390',
    ],
  },
  {
    id: 'chosenVerse',
    type: 'verse',
    arabic: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِنَ الْأَخْيَارِ',
    reference: "Qur'an 38:48",
  },
]

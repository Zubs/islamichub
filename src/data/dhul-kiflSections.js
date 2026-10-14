// What every language shares in the story of Dhul-Kifl: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/dhul-kifl/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'prophet',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:85", "Qur'an 21:86", "Qur'an 38:48"],
  },
  {
    id: 'patientVerse',
    type: 'verse',
    arabic: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِنَ الصَّابِرِينَ',
    reference: "Qur'an 21:85",
  },
  {
    id: 'virtues',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 57:28", 'Sahih Bukhari 3443', 'Sahih Bukhari 5062'],
  },
  {
    id: 'chosenVerse',
    type: 'verse',
    arabic: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِنَ الْأَخْيَارِ',
    reference: "Qur'an 38:48",
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 3390', 'Sahih Bukhari 3373'],
  },
]

// What every language shares in the story of Yahya: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/yahya/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'gladTidings',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:39", "Qur'an 19:7"],
  },
  {
    id: 'gladTidingsVerse',
    type: 'verse',
    arabic:
      'فَنَادَتْهُ الْمَلَائِكَةُ وَهُوَ قَائِمٌ يُصَلِّي فِي الْمِحْرَابِ أَنَّ اللَّهَ يُبَشِّرُكَ بِيَحْيَىٰ مُصَدِّقًا بِكَلِمَةٍ مِنَ اللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِنَ الصَّالِحِينَ',
    reference: "Qur'an 3:39",
  },
  {
    id: 'youth',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 19:12", "Qur'an 19:13", "Qur'an 19:14"],
  },
  {
    id: 'commandVerse',
    type: 'verse',
    arabic: 'يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا',
    reference: "Qur'an 19:12",
  },
  {
    id: 'peace',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 19:15", "Qur'an 6:85", 'Sahih Bukhari 3393', 'Sahih Bukhari 3430'],
  },
  {
    id: 'peaceVerse',
    type: 'verse',
    arabic: 'وَسَلَامٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا',
    reference: "Qur'an 19:15",
  },
]

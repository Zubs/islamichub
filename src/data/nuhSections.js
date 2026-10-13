// What every language shares in the story of Nuh: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/nuh/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'mission',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 71:1", "Qur'an 71:2", "Qur'an 71:3", "Qur'an 7:59"],
  },
  {
    id: 'missionVerse',
    type: 'verse',
    arabic:
      'إِنَّا أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ أَنْ أَنْذِرْ قَوْمَكَ مِنْ قَبْلِ أَنْ يَأْتِيَهُمْ عَذَابٌ أَلِيمٌ',
    reference: "Qur'an 71:1",
  },
  {
    id: 'calling',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 71:5",
      "Qur'an 71:7",
      "Qur'an 71:10",
      "Qur'an 71:23",
      'Sahih Bukhari 4920',
      "Qur'an 29:14",
    ],
  },
  {
    id: 'ark',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 11:36", "Qur'an 11:37", "Qur'an 11:38", "Qur'an 11:40"],
  },
  {
    id: 'flood',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 54:11", "Qur'an 54:12", "Qur'an 11:41", "Qur'an 11:42", "Qur'an 11:43"],
  },
  {
    id: 'floodVerse',
    type: 'verse',
    arabic:
      'وَقَالَ ارْكَبُوا فِيهَا بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا ۚ إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ',
    reference: "Qur'an 11:41",
  },
  {
    id: 'judi',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 11:44", "Qur'an 11:45", "Qur'an 11:47"],
  },
  {
    id: 'judiVerse',
    type: 'verse',
    arabic:
      'وَقِيلَ يَا أَرْضُ ابْلَعِي مَاءَكِ وَيَا سَمَاءُ أَقْلِعِي وَغِيضَ الْمَاءُ وَقُضِيَ الْأَمْرُ وَاسْتَوَتْ عَلَى الْجُودِيِّ ۖ وَقِيلَ بُعْدًا لِلْقَوْمِ الظَّالِمِينَ',
    reference: "Qur'an 11:44",
  },
  {
    id: 'supplications',
    type: 'points',
    items: [
      { reference: "Qur'an 71:28" },
      { reference: "Qur'an 23:28" },
      { reference: "Qur'an 23:29" },
      { reference: "Qur'an 26:118" },
      { reference: "Qur'an 54:10" },
    ],
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 17:3",
      "Qur'an 37:75",
      "Qur'an 37:77",
      'Sahih Bukhari 3339',
      'Sahih Bukhari 3340',
      'Sahih Bukhari 4487',
    ],
  },
  {
    id: 'legacyVerse',
    type: 'verse',
    arabic: 'سَلَامٌ عَلَىٰ نُوحٍ فِي الْعَالَمِينَ',
    reference: "Qur'an 37:79",
  },
]

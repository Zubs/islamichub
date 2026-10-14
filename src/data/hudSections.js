// What every language shares in the story of Hud: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/hud/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'mission',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 7:65", "Qur'an 11:50", "Qur'an 46:21"],
  },
  {
    id: 'missionVerse',
    type: 'verse',
    arabic:
      'وَإِلَىٰ عَادٍ أَخَاهُمْ هُودًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُمْ مِنْ إِلَٰهٍ غَيْرُهُ ۚ أَفَلَا تَتَّقُونَ',
    reference: "Qur'an 7:65",
  },
  {
    id: 'people',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 89:6", "Qur'an 89:7", "Qur'an 89:8", "Qur'an 26:128", "Qur'an 41:15"],
  },
  {
    id: 'warning',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 11:52", "Qur'an 7:66", "Qur'an 11:53", "Qur'an 11:54"],
  },
  {
    id: 'cloud',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 46:24", 'Sahih Bukhari 4829', 'Sahih Bukhari 3206'],
  },
  {
    id: 'cloudVerse',
    type: 'verse',
    arabic:
      'فَلَمَّا رَأَوْهُ عَارِضًا مُسْتَقْبِلَ أَوْدِيَتِهِمْ قَالُوا هَٰذَا عَارِضٌ مُمْطِرُنَا ۚ بَلْ هُوَ مَا اسْتَعْجَلْتُمْ بِهِ ۖ رِيحٌ فِيهَا عَذَابٌ أَلِيمٌ',
    reference: "Qur'an 46:24",
  },
  {
    id: 'wind',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 69:6",
      "Qur'an 69:7",
      "Qur'an 54:19",
      "Qur'an 54:20",
      'Sahih Bukhari 3343',
    ],
  },
  {
    id: 'windVerse',
    type: 'verse',
    arabic: 'وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ',
    reference: "Qur'an 69:6",
  },
  {
    id: 'deliverance',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 11:58", "Qur'an 11:60", "Qur'an 7:72"],
  },
  {
    id: 'deliveranceVerse',
    type: 'verse',
    arabic:
      'وَلَمَّا جَاءَ أَمْرُنَا نَجَّيْنَا هُودًا وَالَّذِينَ آمَنُوا مَعَهُ بِرَحْمَةٍ مِنَّا وَنَجَّيْنَاهُمْ مِنْ عَذَابٍ غَلِيظٍ',
    reference: "Qur'an 11:58",
  },
]

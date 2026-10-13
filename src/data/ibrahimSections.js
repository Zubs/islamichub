// What every language shares in the story of Ibrahim: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ibrahim/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 3,
    references: ["Qur'an 16:120", "Qur'an 4:125", "Qur'an 3:67", "Qur'an 29:27"],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic:
      'إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ',
    reference: "Qur'an 16:120",
  },
  {
    id: 'sky',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:75", "Qur'an 6:76", "Qur'an 6:78", "Qur'an 6:79"],
  },
  {
    id: 'skyVerse',
    type: 'verse',
    arabic:
      'إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا ۖ وَمَا أَنَا مِنَ الْمُشْرِكِينَ',
    reference: "Qur'an 6:79",
  },
  {
    id: 'father',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 6:74", "Qur'an 19:42", "Qur'an 19:46", "Qur'an 19:47", "Qur'an 9:114"],
  },
  {
    id: 'idols',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 21:52",
      "Qur'an 37:89",
      "Qur'an 21:58",
      "Qur'an 21:63",
      "Qur'an 21:67",
      'Sahih Bukhari 3358',
    ],
  },
  {
    id: 'fire',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:68", "Qur'an 29:24", 'Sahih Bukhari 4563'],
  },
  {
    id: 'fireVerse',
    type: 'verse',
    arabic: 'قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ',
    reference: "Qur'an 21:69",
  },
  {
    id: 'king',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 2:258"],
  },
  {
    id: 'emigration',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 29:26", "Qur'an 21:71", 'Sahih Bukhari 2217', 'Sahih Bukhari 3358'],
  },
  {
    id: 'birds',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 2:260", 'Sahih Bukhari 3372'],
  },
  {
    id: 'guests',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 11:69", "Qur'an 11:71", "Qur'an 11:74", "Qur'an 11:75", "Qur'an 51:28"],
  },
  {
    id: 'makkah',
    type: 'prose',
    paragraphs: 3,
    references: ['Sahih Bukhari 3364', "Qur'an 14:37"],
  },
  {
    id: 'makkahVerse',
    type: 'verse',
    arabic:
      'رَبَّنَا إِنِّي أَسْكَنْتُ مِنْ ذُرِّيَّتِي بِوَادٍ غَيْرِ ذِي زَرْعٍ عِنْدَ بَيْتِكَ الْمُحَرَّمِ رَبَّنَا لِيُقِيمُوا الصَّلَاةَ فَاجْعَلْ أَفْئِدَةً مِنَ النَّاسِ تَهْوِي إِلَيْهِمْ وَارْزُقْهُمْ مِنَ الثَّمَرَاتِ لَعَلَّهُمْ يَشْكُرُونَ',
    reference: "Qur'an 14:37",
  },
  {
    id: 'sacrifice',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:100", "Qur'an 37:102", "Qur'an 37:107", "Qur'an 37:112"],
  },
  {
    id: 'sacrificeVerse',
    type: 'verse',
    arabic: 'وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ',
    reference: "Qur'an 37:107",
  },
  {
    id: 'kabah',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 22:26",
      "Qur'an 2:127",
      "Qur'an 22:27",
      "Qur'an 3:96",
      'Sahih Bukhari 3364',
    ],
  },
  {
    id: 'kabahVerse',
    type: 'verse',
    arabic:
      'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    reference: "Qur'an 2:127",
  },
  {
    id: 'prayers',
    type: 'points',
    items: [
      { reference: "Qur'an 14:35" },
      { reference: "Qur'an 14:40 · Qur'an 14:41" },
      { reference: "Qur'an 2:128" },
      { reference: "Qur'an 2:129" },
      { reference: "Qur'an 26:83 · Qur'an 26:87" },
    ],
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 2:124",
      "Qur'an 16:123",
      "Qur'an 60:4",
      'Sahih Bukhari 3370',
      'Sahih Bukhari 3349',
      'Sahih Bukhari 3394',
    ],
  },
  {
    id: 'legacyVerse',
    type: 'verse',
    arabic: 'سَلَامٌ عَلَىٰ إِبْرَاهِيمَ',
    reference: "Qur'an 37:109",
  },
]

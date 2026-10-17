// What every language shares on the Friday page: the order and kind of its sections, the Arabic
// text and the references. The words are in data/content/jumuah/en.js under the same ids. Every
// reference here was checked against its source, except the hadith on Surah al-Kahf on Friday,
// which is in collections the site does not hold and is marked as unverified on the page.
export default [
  {
    id: 'virtue',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Muslim 854', 'Sahih Bukhari 876'],
  },
  {
    id: 'callVerse',
    type: 'verse',
    arabic:
      'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِنْ يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَكُمْ إِنْ كُنْتُمْ تَعْلَمُونَ',
    reference: "Qur'an 62:9",
  },
  {
    id: 'sunnahs',
    type: 'points',
    items: [
      { reference: 'Sahih Bukhari 877' },
      { reference: 'Sahih Bukhari 881' },
      { reference: 'Abu Dawud 1047' },
      { reference: 'Sahih Bukhari 935' },
    ],
  },
  {
    id: 'kahf',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Muslim 809'],
  },
  {
    id: 'prayer',
    type: 'points',
    ordered: true,
    items: [
      { reference: "Qur'an 62:9" },
      { reference: 'Sahih Bukhari 912' },
      { reference: 'Sahih Bukhari 934' },
      { reference: 'Ibn Majah 1063' },
      { reference: "Qur'an 62:10" },
    ],
  },
  {
    id: 'who',
    type: 'prose',
    paragraphs: 1,
    references: ['Abu Dawud 1067'],
  },
  {
    id: 'number',
    type: 'positions',
    items: [
      { reference: "Qur'an 62:9" },
      { reference: 'Sahih Bukhari 936' },
      { reference: 'Abu Dawud 1069' },
    ],
  },
  { id: 'khutbah', type: 'slot' },
]

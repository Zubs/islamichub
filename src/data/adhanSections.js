// What every language shares on the adhan page: the order and kind of its sections, the Arabic
// text and the references. The words are in data/content/adhan/en.js under the same ids.
// Every reference here was checked against its source. The Arabic of the verse is from an open
// Qur'an dataset; the Arabic of the adhan, the iqamah and the supplications is copied from the
// hadiths cited beside them.
export default [
  {
    id: 'what',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 631', "Qur'an 62:9", "Qur'an 5:58"],
  },
  {
    id: 'callVerse',
    type: 'verse',
    arabic:
      'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِنْ يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَكُمْ إِنْ كُنْتُمْ تَعْلَمُونَ',
    reference: "Qur'an 62:9",
  },
  {
    id: 'origin',
    type: 'prose',
    paragraphs: 3,
    references: ['Sahih Bukhari 604', 'Abu Dawud 499'],
  },
  { id: 'originHadith', type: 'hadith', reference: 'Abu Dawud 499' },
  {
    id: 'words',
    type: 'phrases',
    reference: 'Abu Dawud 499 · Abu Dawud 500',
    items: [
      { arabic: 'اللَّهُ أَكْبَرُ', times: 4 },
      { arabic: 'أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ', times: 2 },
      { arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', times: 2 },
      { arabic: 'حَىَّ عَلَى الصَّلاَةِ', times: 2 },
      { arabic: 'حَىَّ عَلَى الْفَلاَحِ', times: 2 },
      { arabic: 'الصَّلاَةُ خَيْرٌ مِنَ النَّوْمِ', times: 2 },
      { arabic: 'اللَّهُ أَكْبَرُ', times: 2 },
      { arabic: 'لاَ إِلَهَ إِلاَّ اللَّهُ', times: 1 },
    ],
  },
  {
    id: 'iqamah',
    type: 'phrases',
    reference: 'Abu Dawud 499 · Sahih Bukhari 605',
    items: [
      { arabic: 'اللَّهُ أَكْبَرُ', times: 2 },
      { arabic: 'أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ', times: 1 },
      { arabic: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', times: 1 },
      { arabic: 'حَىَّ عَلَى الصَّلاَةِ', times: 1 },
      { arabic: 'حَىَّ عَلَى الْفَلاَحِ', times: 1 },
      { arabic: 'قَدْ قَامَتِ الصَّلاَةُ', times: 2 },
      { arabic: 'اللَّهُ أَكْبَرُ', times: 2 },
      { arabic: 'لاَ إِلَهَ إِلاَّ اللَّهُ', times: 1 },
    ],
  },
  {
    id: 'respond',
    type: 'points',
    ordered: true,
    items: [
      { reference: 'Sahih Bukhari 611' },
      { reference: 'Sahih Muslim 385 · Sahih Bukhari 613' },
      { reference: 'Sahih Muslim 384' },
      { reference: 'Sahih Muslim 384 · Sahih Bukhari 614' },
    ],
  },
  {
    id: 'laHawla',
    type: 'recitation',
    arabic: 'لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
    references: ['Sahih Muslim 385'],
  },
  {
    id: 'afterDua',
    type: 'recitation',
    arabic:
      'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    references: ['Sahih Bukhari 614'],
  },
  {
    id: 'between',
    type: 'prose',
    paragraphs: 1,
    references: ['Abu Dawud 521', 'Al-Tirmidhi 212'],
  },
  {
    id: 'virtue',
    type: 'points',
    items: [{ reference: 'Sahih Bukhari 609' }, { reference: 'Sahih Bukhari 615' }],
  },
  {
    id: 'faq',
    type: 'faq',
    items: 2,
    references: ['Sahih Bukhari 960', 'Abu Dawud 499'],
  },
  { id: 'next', type: 'slot' },
]

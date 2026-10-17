// What every language shares on the how-to-pray page: the order and kind of its sections, each
// step's figure, the Arabic and the references. The words are in data/content/salahSteps/en.js
// under the same ids. Every reference here was checked against its source. The Arabic of the
// verses is from an open Qur'an dataset; the Arabic of the supplications is copied from the
// hadiths cited beside them.
export default [
  {
    id: 'intro',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 631', 'Sahih Bukhari 757'],
  },
  { id: 'taughtHadith', type: 'hadith', reference: 'Sahih Bukhari 757' },
  {
    id: 'before',
    type: 'points',
    items: [
      { reference: "Qur'an 5:6" },
      { reference: "Qur'an 4:103" },
      { reference: "Qur'an 2:144" },
      { reference: 'Sahih Bukhari 1' },
    ],
  },
  { id: 'steps', type: 'slot' },
  {
    id: 'takbir',
    type: 'step',
    figure: 'takbir',
    references: ['Sahih Bukhari 735', 'Sahih Bukhari 789'],
    recitations: [{ arabic: 'اللَّهُ أَكْبَرُ', reference: 'Sahih Bukhari 789' }],
  },
  {
    id: 'opening',
    type: 'step',
    figure: 'standing',
    references: ['Sahih Bukhari 740', 'Al-Tirmidhi 242'],
    recitations: [
      {
        arabic:
          'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَاىَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْ خَطَايَاىَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
        reference: 'Sahih Bukhari 744',
      },
    ],
  },
  {
    id: 'fatiha',
    type: 'step',
    figure: 'standing',
    references: ['Sahih Bukhari 756', 'Sahih Bukhari 780'],
    recitations: [
      {
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        reference: "Qur'an 16:98",
        derived: true,
      },
      {
        arabic:
          'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾',
        reference: "Qur'an 1:1-7",
      },
    ],
  },
  {
    id: 'surah',
    type: 'step',
    figure: 'standing',
    references: ['Sahih Bukhari 776'],
    recitations: [
      {
        arabic:
          'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ ﴿٤﴾',
        reference: "Qur'an 112:1-4",
      },
    ],
  },
  {
    id: 'ruku',
    type: 'step',
    figure: 'bowing',
    references: ['Sahih Bukhari 828', 'Sahih Bukhari 757', 'Abu Dawud 870'],
    recitations: [{ arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', reference: 'Sahih Muslim 772' }],
  },
  {
    id: 'rising',
    type: 'step',
    figure: 'rising',
    references: ['Sahih Bukhari 757', 'Sahih Bukhari 828'],
    recitations: [
      {
        arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ',
        reference: 'Sahih Bukhari 735 · Sahih Bukhari 789',
      },
    ],
  },
  {
    id: 'sujud',
    type: 'step',
    figure: 'prostrating',
    references: ['Sahih Bukhari 812', 'Sahih Bukhari 828', 'Sahih Muslim 482'],
    recitations: [{ arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى', reference: 'Sahih Muslim 772' }],
  },
  {
    id: 'sitting',
    type: 'step',
    figure: 'sitting',
    references: ['Sahih Bukhari 757'],
    recitations: [
      { arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي', reference: 'Ibn Majah 897' },
      {
        arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَاهْدِنِي وَارْزُقْنِي',
        reference: 'Abu Dawud 850',
      },
    ],
  },
  {
    id: 'secondSujud',
    type: 'step',
    figure: 'prostrating',
    references: ['Sahih Bukhari 789'],
  },
  {
    id: 'secondRakah',
    type: 'step',
    figure: 'standing',
    references: ['Sahih Bukhari 789', 'Sahih Bukhari 776'],
  },
  {
    id: 'tashahhud',
    type: 'step',
    figure: 'tashahhud',
    references: ['Sahih Bukhari 828', 'Sahih Muslim 580', 'Sahih Muslim 403'],
    recitations: [
      {
        arabic:
          'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        reference: 'Sahih Bukhari 831',
      },
    ],
  },
  {
    id: 'salawat',
    type: 'step',
    figure: 'tashahhud',
    references: ['Sahih Bukhari 3370'],
    recitations: [
      {
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ، وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
        reference: 'Sahih Bukhari 3370',
      },
    ],
  },
  {
    id: 'dua',
    type: 'step',
    figure: 'tashahhud',
    references: ['Sahih Muslim 588', 'Sahih Bukhari 834'],
    recitations: [
      {
        arabic:
          'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
        reference: 'Sahih Muslim 588',
      },
      {
        arabic:
          'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
        reference: 'Sahih Bukhari 834',
      },
    ],
  },
  {
    id: 'taslim',
    type: 'step',
    figure: 'taslim',
    references: ['Sahih Muslim 582'],
    recitations: [
      {
        arabic: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        reference: 'Abu Dawud 996',
      },
    ],
  },
  {
    id: 'longer',
    type: 'points',
    items: [
      { reference: 'Sahih Bukhari 828 · Sahih Bukhari 789' },
      { reference: 'Sahih Bukhari 776' },
      { reference: 'Sahih Bukhari 828' },
    ],
  },
  {
    id: 'raisingHands',
    type: 'positions',
    items: [{ reference: 'Sahih Bukhari 735' }, { reference: 'Al-Tirmidhi 257' }],
  },
  { id: 'next', type: 'slot' },
]

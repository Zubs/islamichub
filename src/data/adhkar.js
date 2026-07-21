// Morning, Evening & Daily Adhkar
// Sourced from the standard Hisnul Muslim (Fortress of the Muslim) collection,
// cross-referenced against Sahih Bukhari, Sahih Muslim, Abu Dawud, and Al-Tirmidhi.
// Static content only — no API required.

export const ADHKAR_CATEGORIES = [
  {
    slug: 'morning',
    name: 'Morning Adhkar',
    arabicName: 'أذكار الصباح',
    icon: '🌅',
    timeHint: 'After Fajr until sunrise',
    description: 'Supplications recited after Fajr for protection and blessing throughout the day.',
  },
  {
    slug: 'evening',
    name: 'Evening Adhkar',
    arabicName: 'أذكار المساء',
    icon: '🌇',
    timeHint: 'After Asr until Maghrib',
    description: 'Supplications recited in the afternoon for protection through the night.',
  },
  {
    slug: 'after-salah',
    name: 'After Prayer',
    arabicName: 'أذكار بعد الصلاة',
    icon: '🕌',
    timeHint: 'Immediately after each of the five prayers',
    description: 'The remembrance the Prophet ﷺ recited directly after finishing each prayer.',
  },
  {
    slug: 'sleep',
    name: 'Before Sleep',
    arabicName: 'أذكار النوم',
    icon: '🌙',
    timeHint: 'Before sleeping',
    description: 'Supplications recited before sleep for protection through the night.',
  },
  {
    slug: 'waking',
    name: 'Upon Waking',
    arabicName: 'أذكار الاستيقاظ',
    icon: '☀️',
    timeHint: 'Upon waking',
    description: 'The first words to say upon waking, thanking Allah for the return of life.',
  },
  {
    slug: 'general',
    name: 'General Dhikr',
    arabicName: 'أذكار عامة',
    icon: '📿',
    timeHint: 'Any time',
    description: 'Simple, frequent remembrance the Prophet ﷺ encouraged at all times.',
  },
]

export const ADHKAR = [
  {
    id: 'ayat-al-kursi',
    categories: ['morning', 'evening', 'after-salah', 'sleep'],
    arabic:
      'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration:
      "Allāhu lā ilāha illā huwal-Ḥayyul-Qayyūm, lā ta'khudhuhū sinatun wa lā nawm, lahū mā fis-samāwāti wa mā fil-arḍ, man dhal-ladhī yashfa'u 'indahū illā bi-idhnih, ya'lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay'im-min 'ilmihī illā bimā shā'a, wasi'a kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa huwal-'Aliyyul-'Aẓīm.",
    translation:
      'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. He is the Most High, the Most Great.',
    reference: "Qur'an 2:255",
    repeat: 1,
    virtue:
      'Whoever recites it in the morning will be protected until evening, and whoever recites it in the evening will be protected until morning (Al-Silsila Al-Sahiha 972).',
  },
  {
    id: 'three-quls',
    categories: ['morning', 'evening', 'sleep'],
    arabic:
      'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    transliteration:
      "Qul huwallāhu aḥad... Qul a'ūdhu bi-Rabbil-falaq... Qul a'ūdhu bi-Rabbin-nās...",
    translation:
      'Surahs Al-Ikhlas, Al-Falaq, and An-Nas in full — recited three times each in the morning and evening, and blown into the cupped hands and wiped over the body before sleep.',
    reference: "Qur'an 112, 113, 114",
    repeat: 3,
    virtue:
      'The Prophet ﷺ said these three surahs together are sufficient protection from every kind of harm (Abu Dawud 5082, Al-Tirmidhi 3575).',
  },
  {
    id: 'sayyid-al-istighfar',
    categories: ['morning', 'evening'],
    arabic:
      'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration:
      "Allāhumma anta Rabbī lā ilāha illā ant, khalaqtanī wa ana 'abduk, wa ana 'alā 'ahdika wa wa'dika mastaṭa't, a'ūdhu bika min sharri mā ṣana't, abū'u laka bini'matika 'alayya wa abū'u bidhanbī faghfir lī fa-innahū lā yaghfirudh-dhunūba illā ant.",
    translation:
      'O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I am upon Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me, and I acknowledge my sin, so forgive me — for none forgives sins except You.',
    reference: 'Sahih Bukhari 6306',
    repeat: 1,
    virtue:
      'The master of seeking forgiveness — whoever recites it with certainty in the evening and dies that night enters Paradise, and likewise in the morning.',
  },
  {
    id: 'asbahna-wa-asbahal-mulk',
    categories: ['morning', 'evening'],
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
    transliteration:
      "Aṣbaḥnā wa aṣbaḥal-mulku lillāh, walḥamdu lillāh, lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr. Rabbi as'aluka khayra mā fī hādhal-yawmi wa khayra mā ba'dah, wa a'ūdhu bika min sharri mā fī hādhal-yawmi wa sharri mā ba'dah.",
    translation:
      'We have entered the morning and with it all dominion belongs to Allah, and praise is to Allah. There is no deity but Allah, alone, without partner. To Him belongs dominion and to Him belongs praise, and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it.',
    reference: 'Sahih Muslim 2723',
    repeat: 1,
    note: "In the evening, replace with: Amsaynā wa amsal-mulku lillāh — 'We have entered the evening...'",
  },
  {
    id: 'allahumma-bika-asbahna',
    categories: ['morning', 'evening'],
    arabic:
      'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    transliteration:
      'Allāhumma bika aṣbaḥnā, wa bika amsaynā, wa bika naḥyā, wa bika namūtu wa ilaykan-nushūr.',
    translation:
      'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
    reference: 'Al-Tirmidhi 3391',
    repeat: 1,
    note: "In the evening: 'Allāhumma bika amsaynā... wa ilaykal-maṣīr' (and to You is the final return).",
  },
  {
    id: 'raditu-billahi-rabban',
    categories: ['morning', 'evening'],
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا',
    transliteration: 'Raḍītu billāhi Rabban, wa bil-Islāmi dīnan, wa bi-Muḥammadin ﷺ nabiyyā.',
    translation:
      'I am pleased with Allah as a Lord, Islam as a religion, and Muhammad ﷺ as a Prophet.',
    reference: 'Abu Dawud 5072, Al-Tirmidhi 3389',
    repeat: 3,
    virtue:
      'Whoever says this three times, Allah guarantees his pleasure on the Day of Resurrection.',
  },
  {
    id: 'bismillah-la-yadurru',
    categories: ['morning', 'evening'],
    arabic:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration:
      "Bismillāhil-ladhī lā yaḍurru ma'as-mihī shay'un fil-arḍi wa lā fis-samā'i wa huwas-Samī'ul-'Alīm.",
    translation:
      'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    reference: 'Abu Dawud 5088, Al-Tirmidhi 3388',
    repeat: 3,
    virtue: 'Whoever recites this three times, nothing will harm him until morning.',
  },
  {
    id: 'hasbiyallahu',
    categories: ['morning', 'evening'],
    arabic:
      'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration:
      "Ḥasbiyallāhu lā ilāha illā huwa 'alayhi tawakkaltu wa huwa Rabbul-'Arshil-'Aẓīm.",
    translation:
      'Allah is sufficient for me. There is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.',
    reference: 'Abu Dawud 5081',
    repeat: 7,
    virtue: 'Allah will suffice him against whatever concerns him, of this world or the next.',
  },
  {
    id: 'tasbih-fatimah',
    categories: ['after-salah', 'sleep'],
    arabic: 'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)',
    transliteration: 'SubḥānAllāh ×33, Alḥamdulillāh ×33, Allāhu Akbar ×34',
    translation: 'Glory be to Allah. Praise be to Allah. Allah is the Greatest.',
    reference: 'Sahih Muslim 596 · Sahih Bukhari 843',
    parts: [
      { text: 'سُبْحَانَ اللَّهِ', translit: 'SubḥānAllāh', count: 33 },
      { text: 'الْحَمْدُ لِلَّهِ', translit: 'Alḥamdulillāh', count: 33 },
      { text: 'اللَّهُ أَكْبَرُ', translit: 'Allāhu Akbar', count: 34 },
    ],
    virtue:
      'The Prophet ﷺ taught this to Fatimah RA in place of a servant to help with housework — whoever completes it after every prayer will have their sins forgiven, even if like the foam of the sea.',
  },
  {
    id: 'astaghfirullah-after-salah',
    categories: ['after-salah'],
    arabic:
      'أَسْتَغْفِرُ اللَّهَ (×٣) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration:
      'Astaghfirullāh (×3). Allāhumma antas-salāmu wa minkas-salām, tabārakta yā Dhal-Jalāli wal-Ikrām.',
    translation:
      'I seek the forgiveness of Allah (three times). O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of majesty and honour.',
    reference: 'Sahih Muslim 591',
    repeat: 1,
    parts: [{ text: 'أَسْتَغْفِرُ اللَّهَ', translit: 'Astaghfirullāh', count: 3 }],
  },
  {
    id: 'la-ilaha-illallahu-wahdahu-after-salah',
    categories: ['after-salah'],
    arabic:
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    transliteration:
      "Lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr. Allāhumma lā māni'a limā a'ṭayta wa lā mu'ṭiya limā mana'ta wa lā yanfa'u dhal-jaddi minkal-jadd.",
    translation:
      'There is no deity except Allah, alone, without partner. To Him belongs dominion and praise, and He is over all things omnipotent. O Allah, none can withhold what You give, and none can give what You withhold, and the might of the mighty benefits them not against You.',
    reference: 'Sahih Muslim 594',
    repeat: 1,
  },
  {
    id: 'bismika-amutu-wa-ahya',
    categories: ['sleep'],
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allāhumma amūtu wa aḥyā.',
    translation: 'In Your name, O Allah, I die and I live.',
    reference: 'Sahih Bukhari 6324',
    repeat: 1,
  },
  {
    id: 'allahumma-qini-adhabak',
    categories: ['sleep'],
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    transliteration: "Allāhumma qinī 'adhābaka yawma tab'athu 'ibādak.",
    translation: 'O Allah, protect me from Your punishment on the day You resurrect Your servants.',
    reference: 'Abu Dawud 5045, Al-Tirmidhi 3398',
    repeat: 3,
  },
  {
    id: 'alhamdulillah-waking',
    categories: ['waking'],
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: "Alḥamdu lillāhil-ladhī aḥyānā ba'da mā amātanā wa ilayhin-nushūr.",
    translation:
      'Praise be to Allah who gave us life after having taken it from us [in sleep], and unto Him is the resurrection.',
    reference: 'Sahih Bukhari 6312',
    repeat: 1,
    virtue: 'The first words the Prophet ﷺ would say upon waking each morning.',
  },
  {
    id: 'subhanallahi-wa-bihamdihi',
    categories: ['morning', 'evening', 'general'],
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subḥānallāhi wa biḥamdih.',
    translation: 'Glory be to Allah and praise Him.',
    reference: 'Sahih Muslim 2691',
    repeat: 100,
    virtue:
      'Whoever recites this one hundred times a day will have their sins forgiven even if they were like the foam of the sea.',
  },
  {
    id: 'la-hawla-wala-quwwata',
    categories: ['general'],
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh.',
    translation: 'There is no power and no strength except by Allah.',
    reference: 'Sahih Bukhari 6384, Sahih Muslim 2704',
    repeat: 1,
    virtue: 'The Prophet ﷺ called this a treasure from the treasures of Paradise.',
  },
  {
    id: 'subhanallah-alhamdulillah-general',
    categories: ['general'],
    arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
    transliteration: 'Subḥānallāhi wal-ḥamdu lillāhi wa lā ilāha illallāhu wallāhu akbar.',
    translation:
      'Glory be to Allah, praise be to Allah, there is no deity but Allah, and Allah is the greatest.',
    reference: 'Sahih Muslim 2695',
    repeat: 1,
    virtue: 'The Prophet ﷺ said these are the most beloved words to Allah.',
  },
  {
    id: 'sayyidul-istighfar-general',
    categories: ['general'],
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullāha wa atūbu ilayh.',
    translation: 'I seek the forgiveness of Allah and I turn to Him in repentance.',
    reference: 'Sahih Bukhari 6307',
    repeat: 100,
    virtue: 'The Prophet ﷺ said he sought forgiveness in this way more than seventy times a day.',
  },
]

export function getAdhkarByCategory(slug) {
  return ADHKAR.filter((d) => d.categories.includes(slug))
}

export function getCategoryMeta(slug) {
  return ADHKAR_CATEGORIES.find((c) => c.slug === slug) || null
}

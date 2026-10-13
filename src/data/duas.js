// Supplications for everyday situations, in the same shape as the adhkar.
// Arabic text is copied from its source, not typed: Qur'anic duas from the Qur'an text, and the rest
// from the Arabic of the hadith cited (open fawazahmed0 quran-api and hadith-api datasets).
// Hadith numbers follow the Arabic editions. Transliterations and translations are the site's own;
// Qur'an translations follow Saheeh International.
export const DUA_SITUATIONS = [
  {
    slug: 'travel',
    name: 'Travel',
    description: 'Setting out, on the way, and coming home',
    icon: '🧭',
  },
  { slug: 'eating', name: 'Eating', description: 'Before, during and after a meal', icon: '🍽️' },
  { slug: 'home', name: 'Home', description: 'Going out and settling in', icon: '🏠' },
  { slug: 'mosque', name: 'Mosque', description: 'Entering and leaving the mosque', icon: '🕌' },
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Getting dressed and wearing something new',
    icon: '👕',
  },
  { slug: 'weather', name: 'Weather', description: 'Rain and wind', icon: '🌧️' },
  { slug: 'distress', name: 'Distress', description: 'Worry, grief and hardship', icon: '🤲' },
  {
    slug: 'illness',
    name: 'Illness',
    description: 'For yourself and for those you visit',
    icon: '🌿',
  },
  { slug: 'forgiveness', name: 'Forgiveness', description: 'Turning back to Allah', icon: '💧' },
  {
    slug: 'parents-and-family',
    name: 'Parents and family',
    description: 'For parents, spouses and children',
    icon: '👪',
  },
]

export const DUAS = [
  {
    id: 'setting-out',
    situations: ['travel'],
    title: 'Setting out',
    when: 'When you settle on your mount or in your vehicle',
    arabic:
      'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration:
      'Subḥāna-lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn. Wa innā ilā rabbinā la-munqalibūn.',
    translation:
      'Exalted is He who has subjected this to us, and we could not have subdued it ourselves. And indeed, to our Lord we will return.',
    reference: "Qur'an 43:13-14",
    repeat: 1,
  },
  {
    id: 'boarding',
    situations: ['travel'],
    title: 'Boarding a boat or ship',
    when: 'The words of Nuh, peace be upon him, on boarding the ark',
    arabic: 'بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ',
    transliteration: 'Bismillāhi majrāhā wa mursāhā, inna rabbī la-ghafūrun raḥīm.',
    translation:
      'In the name of Allah is its course and its anchorage. Indeed, my Lord is Forgiving and Merciful.',
    reference: "Qur'an 11:41",
    repeat: 1,
  },
  {
    id: 'arriving',
    situations: ['travel', 'home'],
    title: 'Arriving and settling somewhere',
    when: 'When you arrive at a place or settle into a new home',
    arabic: 'رَبِّ أَنْزِلْنِي مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِينَ',
    transliteration: 'Rabbi anzilnī munzalan mubārakan wa anta khayru-l-munzilīn.',
    translation:
      'My Lord, let me land at a blessed landing place, and You are the best to accommodate.',
    reference: "Qur'an 23:29",
    repeat: 1,
  },
  {
    id: 'stopping-place',
    situations: ['travel'],
    title: 'Stopping at a place',
    when: 'When you stop to rest on a journey',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'Aʿūdhu bi-kalimāti-llāhi-t-tāmmāti min sharri mā khalaq.',
    translation: "I seek refuge in Allah's perfect words from the evil of what He has created.",
    reference: 'Al-Tirmidhi 3437',
    repeat: 1,
  },
  {
    id: 'farewell',
    situations: ['travel'],
    title: 'Bidding a traveller farewell',
    when: 'Said to someone who is setting out on a journey',
    arabic: 'أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ',
    transliteration: 'Astawdiʿu-llāha dīnaka wa amānataka wa khawātīma ʿamalik.',
    translation: 'I entrust to Allah your religion, your trusts and the last of your deeds.',
    reference: 'Al-Tirmidhi 3443',
    repeat: 1,
  },
  {
    id: 'returning',
    situations: ['travel'],
    title: 'Returning from a journey',
    when: 'On the way back, and on reaching home',
    arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ سَاجِدُونَ لِرَبِّنَا حَامِدُونَ',
    transliteration: 'Āyibūna tāʾibūna ʿābidūna sājidūna li-rabbinā ḥāmidūn.',
    translation: 'We are returning, repenting, worshipping, prostrating, and praising our Lord.',
    reference: 'Sahih Bukhari 1797',
    repeat: 1,
  },
  {
    id: 'before-eating',
    situations: ['eating'],
    title: 'Before eating',
    when: 'When you begin to eat',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh.',
    translation: 'In the name of Allah.',
    reference: 'Ibn Majah 3264',
    repeat: 1,
  },
  {
    id: 'forgot-bismillah',
    situations: ['eating'],
    title: 'If you forgot to begin with the name of Allah',
    when: 'When you remember part-way through the meal',
    arabic: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
    transliteration: 'Bismillāhi awwalahu wa ākhirah.',
    translation: 'In the name of Allah at its beginning and at its end.',
    reference: 'Abu Dawud 3767',
    repeat: 1,
  },
  {
    id: 'after-eating',
    situations: ['eating'],
    title: 'After eating',
    when: 'When you finish a meal',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ',
    transliteration:
      'Al-ḥamdu lillāhi-lladhī aṭʿamanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah.',
    translation:
      'All praise is for Allah, who fed me this and provided it for me, with no might or power on my part.',
    reference: 'Al-Tirmidhi 3458',
    repeat: 1,
  },
  {
    id: 'after-the-meal-is-cleared',
    situations: ['eating'],
    title: 'When the meal is cleared away',
    when: 'When the food is taken away at the end of a meal',
    arabic:
      'الْحَمْدُ لِلَّهِ كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ، وَلاَ مُوَدَّعٍ وَلاَ مُسْتَغْنًى عَنْهُ، رَبَّنَا',
    transliteration:
      'Al-ḥamdu lillāhi kathīran ṭayyiban mubārakan fīh, ghayra makfiyyin wa lā muwaddaʿin wa lā mustaghnan ʿanhu, rabbanā.',
    translation:
      'All praise is for Allah: abundant, good and blessed praise, never sufficient, never abandoned, never dispensed with, our Lord.',
    reference: 'Sahih Bukhari 5458',
    repeat: 1,
  },
  {
    id: 'leaving-home',
    situations: ['home'],
    title: 'Leaving home',
    when: 'As you go out of your house',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
    transliteration: 'Bismillāh, tawakkaltu ʿala-llāh, lā ḥawla wa lā quwwata illā billāh.',
    translation:
      'In the name of Allah. I place my trust in Allah. There is no might and no power except with Allah.',
    reference: 'Abu Dawud 5095',
    repeat: 1,
  },
  {
    id: 'leaving-home-protection',
    situations: ['home'],
    title: 'Seeking protection on going out',
    when: 'As you go out of your house',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ أَوْ أَزِلَّ أَوْ أُزَلَّ أَوْ أَظْلِمَ أَوْ أُظْلَمَ أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَىَّ',
    transliteration:
      'Allāhumma innī aʿūdhu bika an aḍilla aw uḍall, aw azilla aw uzall, aw aẓlima aw uẓlam, aw ajhala aw yujhala ʿalayy.',
    translation:
      'O Allah, I seek refuge in You from going astray or being led astray, from slipping or being made to slip, from wronging or being wronged, and from acting ignorantly or being treated ignorantly.',
    reference: 'Abu Dawud 5094',
    repeat: 1,
  },
  {
    id: 'entering-the-mosque',
    situations: ['mosque'],
    title: 'Entering the mosque',
    when: 'As you enter, after sending peace upon the Prophet ﷺ',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allāhumma-ftaḥ lī abwāba raḥmatik.',
    translation: 'O Allah, open for me the gates of Your mercy.',
    reference: 'Abu Dawud 465',
    repeat: 1,
  },
  {
    id: 'entering-the-mosque-refuge',
    situations: ['mosque'],
    title: 'Seeking refuge on entering the mosque',
    when: 'As you enter the mosque',
    arabic:
      'أَعُوذُ بِاللَّهِ الْعَظِيمِ وَبِوَجْهِهِ الْكَرِيمِ وَسُلْطَانِهِ الْقَدِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration:
      'Aʿūdhu billāhi-l-ʿaẓīm, wa bi-wajhihi-l-karīm, wa sulṭānihi-l-qadīm, mina-sh-shayṭāni-r-rajīm.',
    translation:
      'I seek refuge in Allah the Magnificent, in His noble Face and in His eternal authority, from the accursed devil.',
    reference: 'Abu Dawud 466',
    repeat: 1,
  },
  {
    id: 'leaving-the-mosque',
    situations: ['mosque'],
    title: 'Leaving the mosque',
    when: 'As you go out of the mosque',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allāhumma innī asʾaluka min faḍlik.',
    translation: 'O Allah, I ask You of Your bounty.',
    reference: 'Abu Dawud 465',
    repeat: 1,
  },
  {
    id: 'getting-dressed',
    situations: ['clothing'],
    title: 'Putting on a garment',
    when: 'When you get dressed',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ',
    transliteration:
      'Al-ḥamdu lillāhi-lladhī kasānī hādha-th-thawba wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah.',
    translation:
      'All praise is for Allah, who clothed me with this garment and provided it for me, with no might or power on my part.',
    reference: 'Abu Dawud 4023',
    repeat: 1,
  },
  {
    id: 'new-garment',
    situations: ['clothing'],
    title: 'Wearing something new',
    when: 'When you put on a new garment',
    arabic:
      'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
    transliteration:
      'Allāhumma laka-l-ḥamdu anta kasawtanīh, asʾaluka min khayrihi wa khayri mā ṣuniʿa lah, wa aʿūdhu bika min sharrihi wa sharri mā ṣuniʿa lah.',
    translation:
      'O Allah, praise is Yours: You have clothed me with it. I ask You for its good and the good of what it was made for, and I seek refuge in You from its evil and the evil of what it was made for.',
    reference: 'Abu Dawud 4020',
    repeat: 1,
  },
  {
    id: 'rain',
    situations: ['weather'],
    title: 'When it rains',
    when: 'On seeing rain',
    arabic: 'صَيِّبًا نَافِعًا',
    transliteration: 'Ṣayyiban nāfiʿā.',
    translation: 'A beneficial downpour.',
    reference: 'Sahih Bukhari 1032',
    repeat: 1,
  },
  {
    id: 'after-rain',
    situations: ['weather'],
    title: 'After rain',
    when: 'When it has rained',
    arabic: 'مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ',
    transliteration: 'Muṭirnā bi-faḍli-llāhi wa raḥmatih.',
    translation: 'We have been given rain by the bounty of Allah and His mercy.',
    reference: 'Sahih Bukhari 846',
    repeat: 1,
  },
  {
    id: 'too-much-rain',
    situations: ['weather'],
    title: 'When rain becomes too much',
    when: 'When heavy rain causes harm',
    arabic:
      'اللَّهُمَّ حَوَالَيْنَا وَلاَ عَلَيْنَا، اللَّهُمَّ عَلَى الآكَامِ وَالظِّرَابِ وَبُطُونِ الأَوْدِيَةِ وَمَنَابِتِ الشَّجَرِ',
    transliteration:
      'Allāhumma ḥawālaynā wa lā ʿalaynā. Allāhumma ʿala-l-ākāmi wa-ẓ-ẓirābi wa buṭūni-l-awdiyati wa manābiti-sh-shajar.',
    translation:
      'O Allah, around us and not upon us. O Allah, upon the hills and the mounds, the valley beds and the places where trees grow.',
    reference: 'Sahih Bukhari 1014',
    repeat: 1,
  },
  {
    id: 'wind',
    situations: ['weather'],
    title: 'When the wind blows',
    when: 'On seeing a strong wind',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِهَا وَخَيْرِ مَا فِيهَا وَخَيْرِ مَا أُرْسِلَتْ بِهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ',
    transliteration:
      'Allāhumma innī asʾaluka min khayrihā wa khayri mā fīhā wa khayri mā ursilat bih, wa aʿūdhu bika min sharrihā wa sharri mā fīhā wa sharri mā ursilat bih.',
    translation:
      'O Allah, I ask You for its good, the good of what is in it and the good of what it was sent with, and I seek refuge in You from its evil, the evil of what is in it and the evil of what it was sent with.',
    reference: 'Al-Tirmidhi 3449',
    repeat: 1,
  },
  {
    id: 'distress',
    situations: ['distress'],
    title: 'At a time of distress',
    when: 'When something weighs heavily on you',
    arabic:
      'لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ، وَرَبُّ الأَرْضِ، وَرَبُّ الْعَرْشِ الْكَرِيمِ',
    transliteration:
      'Lā ilāha illa-llāhu-l-ʿaẓīmu-l-ḥalīm. Lā ilāha illa-llāhu rabbu-l-ʿarshi-l-ʿaẓīm. Lā ilāha illa-llāhu rabbu-s-samāwāti wa rabbu-l-arḍi wa rabbu-l-ʿarshi-l-karīm.',
    translation:
      'There is no god but Allah, the Magnificent, the Forbearing. There is no god but Allah, Lord of the magnificent Throne. There is no god but Allah, Lord of the heavens, Lord of the earth and Lord of the noble Throne.',
    reference: 'Sahih Bukhari 6346',
    repeat: 1,
  },
  {
    id: 'worry-and-grief',
    situations: ['distress'],
    title: 'Against worry and grief',
    when: 'When you are anxious or weighed down',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
    transliteration:
      'Allāhumma innī aʿūdhu bika mina-l-hammi wa-l-ḥazan, wa-l-ʿajzi wa-l-kasal, wa-l-jubni wa-l-bukhl, wa ḍalaʿi-d-dayni wa ghalabati-r-rijāl.',
    translation:
      'O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being weighed down by debt and from being overpowered by others.',
    reference: 'Sahih Bukhari 6369',
    repeat: 1,
  },
  {
    id: 'the-distressed',
    situations: ['distress'],
    title: 'The supplication of the distressed',
    when: 'When you feel you cannot cope',
    arabic:
      'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ وَأَصْلِحْ لِي شَأْنِي كُلَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ',
    transliteration:
      'Allāhumma raḥmataka arjū, fa-lā takilnī ilā nafsī ṭarfata ʿayn, wa aṣliḥ lī shaʾnī kullah, lā ilāha illā ant.',
    translation:
      'O Allah, it is Your mercy that I hope for, so do not leave me to myself for the blink of an eye, and set right all my affairs. There is no god but You.',
    reference: 'Abu Dawud 5090',
    repeat: 1,
  },
  {
    id: 'yunus',
    situations: ['distress'],
    title: 'The supplication of Yunus',
    when: 'The words of Yunus, peace be upon him, from within the darkness',
    arabic: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Lā ilāha illā anta subḥānaka innī kuntu mina-ẓ-ẓālimīn.',
    translation:
      'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: "Qur'an 21:87",
    repeat: 1,
  },
  {
    id: 'allah-is-sufficient',
    situations: ['distress'],
    title: 'When you fear people or what lies ahead',
    when: 'When others threaten you or the odds are against you',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: 'Ḥasbuna-llāhu wa niʿma-l-wakīl.',
    translation: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
    reference: "Qur'an 3:173",
    repeat: 1,
  },
  {
    id: 'ease-in-a-task',
    situations: ['distress'],
    title: 'Before a difficult task',
    when: 'The words of Musa, peace be upon him, before he went to Pharaoh',
    arabic:
      'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    transliteration:
      'Rabbi-shraḥ lī ṣadrī, wa yassir lī amrī, wa-ḥlul ʿuqdatan min lisānī, yafqahū qawlī.',
    translation:
      'My Lord, expand for me my breast, ease for me my task, and untie the knot from my tongue, that they may understand my speech.',
    reference: "Qur'an 20:25-28",
    repeat: 1,
  },
  {
    id: 'healing',
    situations: ['illness'],
    title: 'For someone who is ill',
    when: 'Said while passing the right hand over the place of pain',
    arabic:
      'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا',
    transliteration:
      'Allāhumma rabba-n-nās, adhhibi-l-baʾs, ishfihi wa anta-sh-shāfī, lā shifāʾa illā shifāʾuk, shifāʾan lā yughādiru saqamā.',
    translation:
      'O Allah, Lord of the people, remove the harm and heal him, for You are the Healer. There is no healing but Your healing, a healing that leaves no illness behind.',
    reference: 'Sahih Bukhari 5743',
    repeat: 1,
  },
  {
    id: 'visiting-the-sick',
    situations: ['illness'],
    title: 'On visiting someone who is ill',
    when: 'Said to the person you are visiting',
    arabic: 'لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Lā baʾsa, ṭahūrun in shāʾa-llāh.',
    translation: 'No harm; it is a purification, if Allah wills.',
    reference: 'Sahih Bukhari 5656',
    repeat: 1,
  },
  {
    id: 'asking-for-a-cure',
    situations: ['illness'],
    title: 'Asking Allah to cure someone',
    when: 'Said seven times beside the person who is ill',
    arabic: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ',
    transliteration: 'Asʾalu-llāha-l-ʿaẓīma rabba-l-ʿarshi-l-ʿaẓīmi an yashfiyak.',
    translation: 'I ask Allah the Magnificent, Lord of the magnificent Throne, to cure you.',
    reference: 'Abu Dawud 3106',
    repeat: 7,
  },
  {
    id: 'pain',
    situations: ['illness'],
    title: 'When you feel pain in your body',
    when: 'Said seven times with your right hand on the place that hurts',
    arabic:
      'بِسْمِ اللَّهِ أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',
    transliteration:
      'Bismillāh. Aʿūdhu bi-ʿizzati-llāhi wa qudratihi min sharri mā ajidu wa uḥādhir.',
    translation:
      'In the name of Allah. I seek refuge in the might and power of Allah from the evil of what I feel and fear.',
    reference: 'Ibn Majah 3522',
    repeat: 7,
  },
  {
    id: 'ayyub',
    situations: ['illness'],
    title: 'The supplication of Ayyub',
    when: 'The words of Ayyub, peace be upon him, in his illness',
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ',
    transliteration: 'Annī massaniya-ḍ-ḍurru wa anta arḥamu-r-rāḥimīn.',
    translation: 'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.',
    reference: "Qur'an 21:83",
    repeat: 1,
  },
  {
    id: 'wronged-myself',
    situations: ['forgiveness'],
    title: 'Asking forgiveness in prayer',
    when: 'Taught to Abu Bakr, may Allah be pleased with him, to say in his prayer',
    arabic:
      'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    transliteration:
      'Allāhumma innī ẓalamtu nafsī ẓulman kathīrā, wa lā yaghfiru-dh-dhunūba illā ant, fa-ghfir lī maghfiratan min ʿindik, wa-rḥamnī, innaka anta-l-ghafūru-r-raḥīm.',
    translation:
      'O Allah, I have greatly wronged myself, and none forgives sins but You, so grant me forgiveness from Yourself and have mercy on me. Indeed, You are the Forgiving, the Merciful.',
    reference: 'Sahih Bukhari 6326',
    repeat: 1,
  },
  {
    id: 'forgive-me-and-accept-my-repentance',
    situations: ['forgiveness'],
    title: 'Forgive me and accept my repentance',
    when: 'Counted from the Prophet ﷺ a hundred times in one sitting',
    arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَىَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
    transliteration: 'Rabbi-ghfir lī wa tub ʿalayy, innaka anta-t-tawwābu-r-raḥīm.',
    translation:
      'My Lord, forgive me and accept my repentance. Indeed, You are the Accepter of repentance, the Merciful.',
    reference: 'Abu Dawud 1516',
    repeat: 100,
  },
  {
    id: 'you-love-pardon',
    situations: ['forgiveness'],
    title: 'You love to pardon',
    when: 'Taught to Aisha, may Allah be pleased with her, for Laylat al-Qadr',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allāhumma innaka ʿafuwwun tuḥibbu-l-ʿafwa fa-ʿfu ʿannī.',
    translation: 'O Allah, You are Pardoning and You love to pardon, so pardon me.',
    reference: 'Ibn Majah 3850',
    repeat: 1,
  },
  {
    id: 'adam-and-hawwa',
    situations: ['forgiveness'],
    title: 'The supplication of Adam and Hawwa',
    when: 'The words of our first parents after their slip',
    arabic:
      'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration:
      'Rabbanā ẓalamnā anfusanā wa in lam taghfir lanā wa tarḥamnā la-nakūnanna mina-l-khāsirīn.',
    translation:
      'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    reference: "Qur'an 7:23",
    repeat: 1,
  },
  {
    id: 'forgive-and-have-mercy',
    situations: ['forgiveness'],
    title: 'Forgive and have mercy',
    when: 'A short supplication the Qur’an commands',
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbi-ghfir wa-rḥam wa anta khayru-r-rāḥimīn.',
    translation: 'My Lord, forgive and have mercy, and You are the best of the merciful.',
    reference: "Qur'an 23:118",
    repeat: 1,
  },
  {
    id: 'do-not-burden-us',
    situations: ['forgiveness'],
    title: 'Do not hold us to account',
    when: 'The closing supplication of Surat al-Baqarah',
    arabic:
      'رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration:
      'Rabbanā lā tuʾākhidhnā in nasīnā aw akhṭaʾnā. Rabbanā wa lā taḥmil ʿalaynā iṣran kamā ḥamaltahu ʿala-lladhīna min qablinā. Rabbanā wa lā tuḥammilnā mā lā ṭāqata lanā bih. Waʿfu ʿannā, wa-ghfir lanā, wa-rḥamnā. Anta mawlānā fa-nṣurnā ʿala-l-qawmi-l-kāfirīn.',
    translation:
      'Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us, and forgive us, and have mercy upon us. You are our protector, so give us victory over the disbelieving people.',
    reference: "Qur'an 2:286",
    repeat: 1,
  },
  {
    id: 'forgive-us-and-our-brothers',
    situations: ['forgiveness', 'parents-and-family'],
    title: 'For those who came before us',
    when: 'For yourself and the believers who have gone before',
    arabic:
      'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَحِيمٌ',
    transliteration:
      'Rabbana-ghfir lanā wa li-ikhwānina-lladhīna sabaqūnā bi-l-īmān, wa lā tajʿal fī qulūbinā ghillan li-lladhīna āmanū, rabbanā innaka raʾūfun raḥīm.',
    translation:
      'Our Lord, forgive us and our brothers who preceded us in faith, and put not in our hearts any resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.',
    reference: "Qur'an 59:10",
    repeat: 1,
  },
  {
    id: 'mercy-for-parents',
    situations: ['parents-and-family'],
    title: 'Mercy for your parents',
    when: 'For your mother and father',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi-rḥamhumā kamā rabbayānī ṣaghīrā.',
    translation: 'My Lord, have mercy upon them as they brought me up when I was small.',
    reference: "Qur'an 17:24",
    repeat: 1,
  },
  {
    id: 'prayer-for-children',
    situations: ['parents-and-family'],
    title: 'That you and your children keep the prayer',
    when: 'The supplication of Ibrahim, peace be upon him',
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    transliteration: 'Rabbi-jʿalnī muqīma-ṣ-ṣalāti wa min dhurriyyatī, rabbanā wa taqabbal duʿāʾ.',
    translation:
      'My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.',
    reference: "Qur'an 14:40",
    repeat: 1,
  },
  {
    id: 'forgive-me-and-my-parents',
    situations: ['parents-and-family', 'forgiveness'],
    title: 'Forgive me and my parents',
    when: 'The supplication of Ibrahim, peace be upon him',
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    transliteration: 'Rabbana-ghfir lī wa li-wālidayya wa li-l-muʾminīna yawma yaqūmu-l-ḥisāb.',
    translation:
      'Our Lord, forgive me and my parents and the believers the Day the account is established.',
    reference: "Qur'an 14:41",
    repeat: 1,
  },
  {
    id: 'comfort-of-the-eyes',
    situations: ['parents-and-family'],
    title: 'For your spouse and children',
    when: 'A supplication of the servants of the Most Merciful',
    arabic:
      'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration:
      'Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata aʿyun, wa-jʿalnā li-l-muttaqīna imāmā.',
    translation:
      'Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us an example for the righteous.',
    reference: "Qur'an 25:74",
    repeat: 1,
  },
  {
    id: 'gratitude-and-righteous-children',
    situations: ['parents-and-family'],
    title: 'Gratitude, and righteous children',
    when: 'The supplication of one who has reached full maturity',
    arabic:
      'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ',
    transliteration:
      'Rabbi awziʿnī an ashkura niʿmataka-llatī anʿamta ʿalayya wa ʿalā wālidayya wa an aʿmala ṣāliḥan tarḍāh, wa aṣliḥ lī fī dhurriyyatī, innī tubtu ilayka wa innī mina-l-muslimīn.',
    translation:
      'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to work righteousness of which You will approve, and make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims.',
    reference: "Qur'an 46:15",
    repeat: 1,
  },
  {
    id: 'newlyweds',
    situations: ['parents-and-family'],
    title: 'For someone newly married',
    when: 'Said to a bride or groom',
    arabic: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    transliteration: 'Bāraka-llāhu laka wa bāraka ʿalayka wa jamaʿa baynakumā fī khayr.',
    translation:
      'May Allah bless you, send blessings upon you, and bring you both together in goodness.',
    reference: 'Abu Dawud 2130',
    repeat: 1,
  },
  {
    id: 'protecting-children',
    situations: ['parents-and-family'],
    title: 'Seeking protection for children',
    when: 'Said by the Prophet ﷺ over al-Hasan and al-Husayn',
    arabic:
      'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لاَمَّةٍ',
    transliteration:
      'Aʿūdhu bi-kalimāti-llāhi-t-tāmmah, min kulli shayṭānin wa hāmmah, wa min kulli ʿaynin lāmmah.',
    translation:
      "I seek refuge in Allah's perfect words from every devil and every harmful creature, and from every envious eye.",
    reference: 'Sahih Bukhari 3371',
    repeat: 1,
  },
]

export function getDuasBySituation(slug) {
  return DUAS.filter((dua) => dua.situations.includes(slug))
}

export function getSituation(slug) {
  return DUA_SITUATIONS.find((situation) => situation.slug === slug) || null
}

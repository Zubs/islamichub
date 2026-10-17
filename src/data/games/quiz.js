// The questions of the prophets quiz. Each has one right answer (always listed first; the quiz
// shuffles them) and three wrong ones, and the reference its answer rests on, taken from the
// prophet's story where it was checked against its source. Ids never change, so a player's list
// of questions seen stays valid when questions are added. Where the answer rests on a verse, the
// first verse cited is included in Arabic (from an open Qur'an dataset) with its translation
// (Saheeh International, the prophets' names in their Arabic form). Each has a level: easy for the
// best-known events, hard for details such as numbers, verse numbers and hadith narrations.
export default [
  {
    id: 'q001',
    prophet: 'adam',
    level: 'easy',
    question: 'What did Allah teach Adam that the angels did not know?',
    answers: [
      'The names of all things',
      'The art of writing',
      'The building of ships',
      'The movement of the stars',
    ],
    right: 0,
    reference: "Qur'an 2:31",
    verse: {
      reference: "Qur'an 2:31",
      verseArabic:
        'وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا ثُمَّ عَرَضَهُمْ عَلَى الْمَلَائِكَةِ فَقَالَ أَنْبِئُونِي بِأَسْمَاءِ هَٰؤُلَاءِ إِنْ كُنْتُمْ صَادِقِينَ',
      translation:
        'And He taught Adam the names - all of them. Then He showed them to the angels and said, "Inform Me of the names of these, if you are truthful."',
    },
  },
  {
    id: 'q002',
    prophet: 'adam',
    level: 'easy',
    question: 'Who refused to prostrate to Adam?',
    answers: ['Iblis', 'Jibril', "Mika'il", 'Harut'],
    right: 0,
    reference: "Qur'an 2:34",
    verse: {
      reference: "Qur'an 2:34",
      verseArabic:
        'وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا إِبْلِيسَ أَبَىٰ وَاسْتَكْبَرَ وَكَانَ مِنَ الْكَافِرِينَ',
      translation:
        'And [mention] when We said to the angels, "Prostrate before Adam"; so they prostrated, except for Iblees. He refused and was arrogant and became of the disbelievers.',
    },
  },
  {
    id: 'q003',
    prophet: 'adam',
    level: 'easy',
    question: 'What did Iblis say he was created from?',
    answers: ['Fire', 'Light', 'Clay', 'Water'],
    right: 0,
    reference: "Qur'an 7:12",
    verse: {
      reference: "Qur'an 7:12",
      verseArabic:
        'قَالَ مَا مَنَعَكَ أَلَّا تَسْجُدَ إِذْ أَمَرْتُكَ ۖ قَالَ أَنَا خَيْرٌ مِنْهُ خَلَقْتَنِي مِنْ نَارٍ وَخَلَقْتَهُ مِنْ طِينٍ',
      translation:
        '[Allah] said, "What prevented you from prostrating when I commanded you?" [Satan] said, "I am better than him. You created me from fire and created him from clay."',
    },
  },
  {
    id: 'q004',
    prophet: 'adam',
    level: 'normal',
    question: 'What words did Adam and his wife say after eating from the tree?',
    answers: [
      '"Our Lord, we have wronged ourselves"',
      '"Our Lord, grant us patience"',
      '"Our Lord, return us to the garden"',
      '"Our Lord, forgive Iblis"',
    ],
    right: 0,
    reference: "Qur'an 7:23",
    verse: {
      reference: "Qur'an 7:23",
      verseArabic:
        'قَالَا رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
      translation:
        'They said, "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers."',
    },
  },
  {
    id: 'q005',
    prophet: 'adam',
    level: 'easy',
    question: "What did Allah send to show Adam's son how to bury his brother?",
    answers: ['A crow', 'A dove', 'A hoopoe', 'An angel'],
    right: 0,
    reference: "Qur'an 5:31",
    verse: {
      reference: "Qur'an 5:31",
      verseArabic:
        'فَبَعَثَ اللَّهُ غُرَابًا يَبْحَثُ فِي الْأَرْضِ لِيُرِيَهُ كَيْفَ يُوَارِي سَوْءَةَ أَخِيهِ ۚ قَالَ يَا وَيْلَتَا أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَٰذَا الْغُرَابِ فَأُوَارِيَ سَوْءَةَ أَخِي ۖ فَأَصْبَحَ مِنَ النَّادِمِينَ',
      translation:
        'Then Allah sent a crow searching in the ground to show him how to hide the disgrace of his brother. He said, "O woe to me! Have I failed to be like this crow and hide the body of my brother?" And he became of the regretful.',
    },
  },
  {
    id: 'q006',
    prophet: 'adam',
    level: 'hard',
    question: 'On which day of the week was Adam created, according to the Prophet ﷺ?',
    answers: ['Friday', 'Monday', 'Thursday', 'Saturday'],
    right: 0,
    reference: 'Sahih Muslim 854',
  },
  {
    id: 'q007',
    prophet: 'idris',
    level: 'normal',
    question: "How does the Qur'an describe Idris?",
    answers: [
      'A man of truth and a prophet',
      'A king and a judge',
      'A builder and a scholar',
      'A traveller and a merchant',
    ],
    right: 0,
    reference: "Qur'an 19:56",
    verse: {
      reference: "Qur'an 19:56",
      verseArabic: 'وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَبِيًّا',
      translation: 'And mention in the Book, Idris. Indeed, he was a man of truth and a prophet.',
    },
  },
  {
    id: 'q008',
    prophet: 'idris',
    level: 'hard',
    question: 'In which heaven did the Prophet ﷺ meet Idris on the Night Journey?',
    answers: ['The fourth', 'The first', 'The second', 'The seventh'],
    right: 0,
    reference: 'Sahih Bukhari 3207',
  },
  {
    id: 'q009',
    prophet: 'nuh',
    level: 'easy',
    question: 'How long did Nuh remain among his people?',
    answers: [
      'A thousand years less fifty',
      'Five hundred years',
      'Three hundred years',
      'One hundred years',
    ],
    right: 0,
    reference: "Qur'an 29:14",
    verse: {
      reference: "Qur'an 29:14",
      verseArabic:
        'وَلَقَدْ أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا فَأَخَذَهُمُ الطُّوفَانُ وَهُمْ ظَالِمُونَ',
      translation:
        'And We certainly sent Nuh to his people, and he remained among them a thousand years minus fifty years, and the flood seized them while they were wrongdoers.',
    },
  },
  {
    id: 'q010',
    prophet: 'nuh',
    level: 'easy',
    question: "On which mountain did Nuh's ship come to rest?",
    answers: ['Al-Judi', 'Sinai', 'Uhud', 'Hira'],
    right: 0,
    reference: "Qur'an 11:44",
    verse: {
      reference: "Qur'an 11:44",
      verseArabic:
        'وَقِيلَ يَا أَرْضُ ابْلَعِي مَاءَكِ وَيَا سَمَاءُ أَقْلِعِي وَغِيضَ الْمَاءُ وَقُضِيَ الْأَمْرُ وَاسْتَوَتْ عَلَى الْجُودِيِّ ۖ وَقِيلَ بُعْدًا لِلْقَوْمِ الظَّالِمِينَ',
      translation:
        'And it was said, "O earth, swallow your water, and O sky, withhold [your rain]." And the water subsided, and the matter was accomplished, and the ship came to rest on the [mountain of] Judiyy. And it was said, "Away with the wrongdoing people."',
    },
  },
  {
    id: 'q011',
    prophet: 'nuh',
    level: 'easy',
    question: "What happened to Nuh's son who refused to board the ship?",
    answers: [
      'He was among the drowned',
      'He reached a mountain and survived',
      'He boarded at the last moment',
      'He was carried to another land',
    ],
    right: 0,
    reference: "Qur'an 11:43",
    verse: {
      reference: "Qur'an 11:43",
      verseArabic:
        'قَالَ سَآوِي إِلَىٰ جَبَلٍ يَعْصِمُنِي مِنَ الْمَاءِ ۚ قَالَ لَا عَاصِمَ الْيَوْمَ مِنْ أَمْرِ اللَّهِ إِلَّا مَنْ رَحِمَ ۚ وَحَالَ بَيْنَهُمَا الْمَوْجُ فَكَانَ مِنَ الْمُغْرَقِينَ',
      translation:
        '[But] he said, "I will take refuge on a mountain to protect me from the water." [Nuh] said, "There is no protector today from the decree of Allah, except for whom He gives mercy." And the waves came between them, and he was among the drowned.',
    },
  },
  {
    id: 'q012',
    prophet: 'nuh',
    level: 'hard',
    question: "What did Nuh's people put in their ears when he called them?",
    answers: ['Their fingers', 'Clay', 'Cloth', 'Wax'],
    right: 0,
    reference: "Qur'an 71:7",
    verse: {
      reference: "Qur'an 71:7",
      verseArabic:
        'وَإِنِّي كُلَّمَا دَعَوْتُهُمْ لِتَغْفِرَ لَهُمْ جَعَلُوا أَصَابِعَهُمْ فِي آذَانِهِمْ وَاسْتَغْشَوْا ثِيَابَهُمْ وَأَصَرُّوا وَاسْتَكْبَرُوا اسْتِكْبَارًا',
      translation:
        'And indeed, every time I invited them that You may forgive them, they put their fingers in their ears, covered themselves with their garments, persisted, and were arrogant with [great] arrogance.',
    },
  },
  {
    id: 'q013',
    prophet: 'nuh',
    level: 'hard',
    question: "Which of these was an idol of Nuh's people?",
    answers: ['Wadd', 'Hubal', "Ba'l", 'Al-Lat'],
    right: 0,
    reference: "Qur'an 71:23",
    verse: {
      reference: "Qur'an 71:23",
      verseArabic:
        'وَقَالُوا لَا تَذَرُنَّ آلِهَتَكُمْ وَلَا تَذَرُنَّ وَدًّا وَلَا سُوَاعًا وَلَا يَغُوثَ وَيَعُوقَ وَنَسْرًا',
      translation:
        'And said, ’Never leave your gods and never leave Wadd or Suwa’ or Yaghuth and Ya’uq and Nasr.',
    },
  },
  {
    id: 'q014',
    prophet: 'nuh',
    level: 'normal',
    question: 'What did Nuh tell his people asking forgiveness would bring them?',
    answers: [
      'Rain, wealth and children',
      'Victory in battle',
      'A kingdom on earth',
      'Gold and silver',
    ],
    right: 0,
    reference: "Qur'an 71:10",
    verse: {
      reference: "Qur'an 71:10",
      verseArabic: 'فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا',
      translation:
        'And said, ’Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.',
    },
  },
  {
    id: 'q015',
    prophet: 'hud',
    level: 'easy',
    question: 'To which people was Hud sent?',
    answers: ["'Ad", 'Thamud', 'Madyan', 'The people of Lut'],
    right: 0,
    reference: "Qur'an 7:65",
    verse: {
      reference: "Qur'an 7:65",
      verseArabic:
        '۞ وَإِلَىٰ عَادٍ أَخَاهُمْ هُودًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُمْ مِنْ إِلَٰهٍ غَيْرُهُ ۚ أَفَلَا تَتَّقُونَ',
      translation:
        'And to the ’Aad [We sent] their brother Hud. He said, "O my people, worship Allah; you have no deity other than Him. Then will you not fear Him."',
    },
  },
  {
    id: 'q016',
    prophet: 'hud',
    level: 'easy',
    question: "How was 'Ad destroyed?",
    answers: ['By a violent wind', 'By a flood', 'By an earthquake', 'By fire from the sky'],
    right: 0,
    reference: "Qur'an 69:6",
    verse: {
      reference: "Qur'an 69:6",
      verseArabic: 'وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ',
      translation: 'And as for ’Aad, they were destroyed by a screaming, violent wind.',
    },
  },
  {
    id: 'q017',
    prophet: 'hud',
    level: 'hard',
    question: "For how long did the wind blow on 'Ad?",
    answers: ['Seven nights and eight days', 'Three days', 'Forty days', 'One night'],
    right: 0,
    reference: "Qur'an 69:7",
    verse: {
      reference: "Qur'an 69:7",
      verseArabic:
        'سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا فَتَرَى الْقَوْمَ فِيهَا صَرْعَىٰ كَأَنَّهُمْ أَعْجَازُ نَخْلٍ خَاوِيَةٍ',
      translation:
        'Which Allah imposed upon them for seven nights and eight days in succession, so you would see the people therein fallen as if they were hollow trunks of palm trees.',
    },
  },
  {
    id: 'q018',
    prophet: 'salih',
    level: 'easy',
    question: 'What sign was Salih given for his people?',
    answers: ['A she-camel', 'A staff that became a snake', 'A spring of water', 'A ship'],
    right: 0,
    reference: "Qur'an 11:64",
    verse: {
      reference: "Qur'an 11:64",
      verseArabic:
        'وَيَا قَوْمِ هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابٌ قَرِيبٌ',
      translation:
        'And O my people, this is the she-camel of Allah - [she is] to you a sign. So let her feed upon Allah ’s earth and do not touch her with harm, or you will be taken by an impending punishment.',
    },
  },
  {
    id: 'q019',
    prophet: 'salih',
    level: 'easy',
    question: 'How did Thamud build their homes?',
    answers: [
      'They carved them from the mountains',
      'They built them of reeds',
      'They lived in tents',
      'They built them on the sea',
    ],
    right: 0,
    reference: "Qur'an 7:74",
    verse: {
      reference: "Qur'an 7:74",
      verseArabic:
        'وَاذْكُرُوا إِذْ جَعَلَكُمْ خُلَفَاءَ مِنْ بَعْدِ عَادٍ وَبَوَّأَكُمْ فِي الْأَرْضِ تَتَّخِذُونَ مِنْ سُهُولِهَا قُصُورًا وَتَنْحِتُونَ الْجِبَالَ بُيُوتًا ۖ فَاذْكُرُوا آلَاءَ اللَّهِ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ',
      translation:
        'And remember when He made you successors after the ’Aad and settled you in the land, [and] you take for yourselves palaces from its plains and carve from the mountains, homes. Then remember the favors of Allah and do not commit abuse on the earth, spreading corruption.',
    },
  },
  {
    id: 'q020',
    prophet: 'salih',
    level: 'hard',
    question: 'How many days did Salih give his people after they killed the she-camel?',
    answers: ['Three', 'Seven', 'Forty', 'One'],
    right: 0,
    reference: "Qur'an 11:65",
    verse: {
      reference: "Qur'an 11:65",
      verseArabic:
        'فَعَقَرُوهَا فَقَالَ تَمَتَّعُوا فِي دَارِكُمْ ثَلَاثَةَ أَيَّامٍ ۖ ذَٰلِكَ وَعْدٌ غَيْرُ مَكْذُوبٍ',
      translation:
        'But they hamstrung her, so he said, "Enjoy yourselves in your homes for three days. That is a promise not to be denied."',
    },
  },
  {
    id: 'q021',
    prophet: 'ibrahim',
    level: 'normal',
    question: 'What did Ibrahim say when he saw the star set?',
    answers: [
      '"I do not love those that set"',
      '"This is my Lord forever"',
      '"The night has won"',
      '"I fear the darkness"',
    ],
    right: 0,
    reference: "Qur'an 6:76",
    verse: {
      reference: "Qur'an 6:76",
      verseArabic:
        'فَلَمَّا جَنَّ عَلَيْهِ اللَّيْلُ رَأَىٰ كَوْكَبًا ۖ قَالَ هَٰذَا رَبِّي ۖ فَلَمَّا أَفَلَ قَالَ لَا أُحِبُّ الْآفِلِينَ',
      translation:
        'So when the night covered him [with darkness], he saw a star. He said, "This is my lord." But when it set, he said, "I like not those that disappear."',
    },
  },
  {
    id: 'q022',
    prophet: 'ibrahim',
    level: 'easy',
    question: 'Which idol did Ibrahim leave unbroken?',
    answers: ['The largest of them', 'The smallest of them', 'The oldest of them', 'None of them'],
    right: 0,
    reference: "Qur'an 21:58",
    verse: {
      reference: "Qur'an 21:58",
      verseArabic: 'فَجَعَلَهُمْ جُذَاذًا إِلَّا كَبِيرًا لَهُمْ لَعَلَّهُمْ إِلَيْهِ يَرْجِعُونَ',
      translation:
        'So he made them into fragments, except a large one among them, that they might return to it [and question].',
    },
  },
  {
    id: 'q023',
    prophet: 'ibrahim',
    level: 'easy',
    question: 'What did Allah say to the fire Ibrahim was thrown into?',
    answers: ['"Be coolness and safety"', '"Burn brighter"', '"Go out"', '"Rise to the sky"'],
    right: 0,
    reference: "Qur'an 21:69",
    verse: {
      reference: "Qur'an 21:69",
      verseArabic: 'قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ',
      translation: 'Allah said, "O fire, be coolness and safety upon Ibrahim."',
    },
  },
  {
    id: 'q024',
    prophet: 'ibrahim',
    level: 'hard',
    question: 'What challenge did Ibrahim give the king who claimed to give life and death?',
    answers: [
      'To bring the sun from the west',
      'To raise a dead man',
      'To make rain fall',
      'To move a mountain',
    ],
    right: 0,
    reference: "Qur'an 2:258",
    verse: {
      reference: "Qur'an 2:258",
      verseArabic:
        'أَلَمْ تَرَ إِلَى الَّذِي حَاجَّ إِبْرَاهِيمَ فِي رَبِّهِ أَنْ آتَاهُ اللَّهُ الْمُلْكَ إِذْ قَالَ إِبْرَاهِيمُ رَبِّيَ الَّذِي يُحْيِي وَيُمِيتُ قَالَ أَنَا أُحْيِي وَأُمِيتُ ۖ قَالَ إِبْرَاهِيمُ فَإِنَّ اللَّهَ يَأْتِي بِالشَّمْسِ مِنَ الْمَشْرِقِ فَأْتِ بِهَا مِنَ الْمَغْرِبِ فَبُهِتَ الَّذِي كَفَرَ ۗ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ',
      translation:
        'Have you not considered the one who argued with Ibrahim about his Lord [merely] because Allah had given him kingship? When Ibrahim said, "My Lord is the one who gives life and causes death," he said, "I give life and cause death." Ibrahim said, "Indeed, Allah brings up the sun from the east, so bring it up from the west." So the disbeliever was overwhelmed [by astonishment], and Allah does not guide the wrongdoing people.',
    },
  },
  {
    id: 'q025',
    prophet: 'ibrahim',
    level: 'easy',
    question: 'How many birds was Ibrahim told to take?',
    answers: ['Four', 'Two', 'Seven', 'Twelve'],
    right: 0,
    reference: "Qur'an 2:260",
    verse: {
      reference: "Qur'an 2:260",
      verseArabic:
        'وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ أَرِنِي كَيْفَ تُحْيِي الْمَوْتَىٰ ۖ قَالَ أَوَلَمْ تُؤْمِنْ ۖ قَالَ بَلَىٰ وَلَٰكِنْ لِيَطْمَئِنَّ قَلْبِي ۖ قَالَ فَخُذْ أَرْبَعَةً مِنَ الطَّيْرِ فَصُرْهُنَّ إِلَيْكَ ثُمَّ اجْعَلْ عَلَىٰ كُلِّ جَبَلٍ مِنْهُنَّ جُزْءًا ثُمَّ ادْعُهُنَّ يَأْتِينَكَ سَعْيًا ۚ وَاعْلَمْ أَنَّ اللَّهَ عَزِيزٌ حَكِيمٌ',
      translation:
        'And [mention] when Ibrahim said, "My Lord, show me how You give life to the dead." [Allah] said, "Have you not believed?" He said, "Yes, but [I ask] only that my heart may be satisfied." [Allah] said, "Take four birds and commit them to yourself. Then [after slaughtering them] put on each hill a portion of them; then call them - they will come [flying] to you in haste. And know that Allah is Exalted in Might and Wise."',
    },
  },
  {
    id: 'q026',
    prophet: 'ibrahim',
    level: 'easy',
    question: 'What did Ibrahim bring his angel guests?',
    answers: ['A roasted calf', 'Dates and milk', 'Bread and honey', 'Nothing at all'],
    right: 0,
    reference: "Qur'an 11:69",
    verse: {
      reference: "Qur'an 11:69",
      verseArabic:
        'وَلَقَدْ جَاءَتْ رُسُلُنَا إِبْرَاهِيمَ بِالْبُشْرَىٰ قَالُوا سَلَامًا ۖ قَالَ سَلَامٌ ۖ فَمَا لَبِثَ أَنْ جَاءَ بِعِجْلٍ حَنِيذٍ',
      translation:
        'And certainly did Our messengers come to Ibrahim with good tidings; they said, "Peace." He said, "Peace," and did not delay in bringing [them] a roasted calf.',
    },
  },
  {
    id: 'q027',
    prophet: 'ibrahim',
    level: 'easy',
    question: 'Who helped Ibrahim raise the foundations of the House?',
    answers: ["Isma'il", 'Ishaq', 'Lut', "Ya'qub"],
    right: 0,
    reference: "Qur'an 2:127",
    verse: {
      reference: "Qur'an 2:127",
      verseArabic:
        'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
      translation:
        'And [mention] when Ibrahim was raising the foundations of the House and [with him] Isma‘il, [saying], "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."',
    },
  },
  {
    id: 'q028',
    prophet: 'ibrahim',
    level: 'normal',
    question: "What does the Qur'an call the House at Makkah?",
    answers: [
      'The first House established for people',
      'The last House of the prophets',
      'The House of the kings',
      'The House of the angels',
    ],
    right: 0,
    reference: "Qur'an 3:96",
    verse: {
      reference: "Qur'an 3:96",
      verseArabic:
        'إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِلْعَالَمِينَ',
      translation:
        'Indeed, the first House [of worship] established for mankind was that at Makkah - blessed and a guidance for the worlds.',
    },
  },
  {
    id: 'q029',
    prophet: 'lut',
    level: 'easy',
    question: 'Who believed in Ibrahim and emigrated with him?',
    answers: ['Lut', 'Nuh', 'Hud', "Shu'ayb"],
    right: 0,
    reference: "Qur'an 29:26",
    verse: {
      reference: "Qur'an 29:26",
      verseArabic:
        '۞ فَآمَنَ لَهُ لُوطٌ ۘ وَقَالَ إِنِّي مُهَاجِرٌ إِلَىٰ رَبِّي ۖ إِنَّهُ هُوَ الْعَزِيزُ الْحَكِيمُ',
      translation:
        'And Lut believed him. [Ibrahim] said, "Indeed, I will emigrate to [the service of] my Lord. Indeed, He is the Exalted in Might, the Wise."',
    },
  },
  {
    id: 'q030',
    prophet: 'lut',
    level: 'easy',
    question: "Who of Lut's family was not saved?",
    answers: ['His wife', 'His eldest daughter', 'His brother', 'His son'],
    right: 0,
    reference: "Qur'an 7:83",
    verse: {
      reference: "Qur'an 7:83",
      verseArabic: 'فَأَنْجَيْنَاهُ وَأَهْلَهُ إِلَّا امْرَأَتَهُ كَانَتْ مِنَ الْغَابِرِينَ',
      translation:
        'So We saved him and his family, except for his wife; she was of those who remained [with the evildoers].',
    },
  },
  {
    id: 'q031',
    prophet: 'lut',
    level: 'easy',
    question: 'What rained down on the people of Lut?',
    answers: ['Stones of hard clay', 'Burning oil', 'Hail and ice', 'Locusts'],
    right: 0,
    reference: "Qur'an 11:82",
    verse: {
      reference: "Qur'an 11:82",
      verseArabic:
        'فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِنْ سِجِّيلٍ مَنْضُودٍ',
      translation:
        'So when Our command came, We made the highest part [of the city] its lowest and rained upon them stones of layered hard clay, [which were].',
    },
  },
  {
    id: 'q032',
    prophet: 'ismail',
    level: 'normal',
    question: "How does the Qur'an describe Isma'il?",
    answers: [
      'True to his promise',
      'The friend of Allah',
      'The one to whom Allah spoke',
      'The man of the fish',
    ],
    right: 0,
    reference: "Qur'an 19:54",
    verse: {
      reference: "Qur'an 19:54",
      verseArabic:
        'وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ ۚ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَبِيًّا',
      translation:
        'And mention in the Book, Isma‘il. Indeed, he was true to his promise, and he was a messenger and a prophet.',
    },
  },
  {
    id: 'q033',
    prophet: 'ismail',
    level: 'easy',
    question: 'Between which two hills did Hajar run seven times?',
    answers: ['Safa and Marwah', 'Uhud and Thawr', 'Hira and Thawr', 'Sinai and Judi'],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q034',
    prophet: 'ismail',
    level: 'hard',
    question: "Which tribe settled near Hajar and Isma'il by the water?",
    answers: ['Jurhum', 'Quraysh', 'Thamud', 'Aslam'],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q035',
    prophet: 'ishaq',
    level: 'normal',
    question: 'Who smiled when the good news of Ishaq was given?',
    answers: ["Ibrahim's wife, who was standing there", "Lut's wife", 'Maryam', "Pharaoh's wife"],
    right: 0,
    reference: "Qur'an 11:71",
    verse: {
      reference: "Qur'an 11:71",
      verseArabic:
        'وَامْرَأَتُهُ قَائِمَةٌ فَضَحِكَتْ فَبَشَّرْنَاهَا بِإِسْحَاقَ وَمِنْ وَرَاءِ إِسْحَاقَ يَعْقُوبَ',
      translation:
        'And his Wife was standing, and she smiled. Then We gave her good tidings of Ishaq and after Ishaq, Ya‘qub.',
    },
  },
  {
    id: 'q036',
    prophet: 'ishaq',
    level: 'hard',
    question: 'Which son was promised to come after Ishaq in the same good news?',
    answers: ["Ya'qub", 'Yusuf', "Isma'il", 'Musa'],
    right: 0,
    reference: "Qur'an 11:71",
    verse: {
      reference: "Qur'an 11:71",
      verseArabic:
        'وَامْرَأَتُهُ قَائِمَةٌ فَضَحِكَتْ فَبَشَّرْنَاهَا بِإِسْحَاقَ وَمِنْ وَرَاءِ إِسْحَاقَ يَعْقُوبَ',
      translation:
        'And his Wife was standing, and she smiled. Then We gave her good tidings of Ishaq and after Ishaq, Ya‘qub.',
    },
  },
  {
    id: 'q037',
    prophet: 'yaqub',
    level: 'easy',
    question: "What did Ya'qub say when shown Yusuf's bloodied shirt?",
    answers: [
      '"Patience is most fitting"',
      '"I will avenge him"',
      '"Bring me the wolf"',
      '"He will return tomorrow"',
    ],
    right: 0,
    reference: "Qur'an 12:18",
    verse: {
      reference: "Qur'an 12:18",
      verseArabic:
        'وَجَاءُوا عَلَىٰ قَمِيصِهِ بِدَمٍ كَذِبٍ ۚ قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنْفُسُكُمْ أَمْرًا ۖ فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ',
      translation:
        'And they brought upon his shirt false blood. [Ya‘qub] said, "Rather, your souls have enticed you to something, so patience is most fitting. And Allah is the one sought for help against that which you describe."',
    },
  },
  {
    id: 'q038',
    prophet: 'yaqub',
    level: 'hard',
    question: "What did Ya'qub ask his sons on his deathbed?",
    answers: [
      'What they would worship after him',
      'Who would inherit his flocks',
      'Where they would bury him',
      'Which of them was eldest',
    ],
    right: 0,
    reference: "Qur'an 2:133",
    verse: {
      reference: "Qur'an 2:133",
      verseArabic:
        'أَمْ كُنْتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِنْ بَعْدِي قَالُوا نَعْبُدُ إِلَٰهَكَ وَإِلَٰهَ آبَائِكَ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ إِلَٰهًا وَاحِدًا وَنَحْنُ لَهُ مُسْلِمُونَ',
      translation:
        'Or were you witnesses when death approached Ya‘qub, when he said to his sons, "What will you worship after me?" They said, "We will worship your God and the God of your fathers, Ibrahim and Isma‘il and Ishaq - one God. And we are Muslims [in submission] to Him."',
    },
  },
  {
    id: 'q039',
    prophet: 'yaqub',
    level: 'normal',
    question: "How was Ya'qub's sight restored?",
    answers: [
      "Yusuf's shirt was cast over his face",
      'He washed in a spring',
      'An angel touched his eyes',
      'He prayed for forty nights',
    ],
    right: 0,
    reference: "Qur'an 12:96",
    verse: {
      reference: "Qur'an 12:96",
      verseArabic:
        'فَلَمَّا أَنْ جَاءَ الْبَشِيرُ أَلْقَاهُ عَلَىٰ وَجْهِهِ فَارْتَدَّ بَصِيرًا ۖ قَالَ أَلَمْ أَقُلْ لَكُمْ إِنِّي أَعْلَمُ مِنَ اللَّهِ مَا لَا تَعْلَمُونَ',
      translation:
        'And when the bearer of good tidings arrived, he cast it over his face, and he returned [once again] seeing. He said, "Did I not tell you that I know from Allah that which you do not know."',
    },
  },
  {
    id: 'q040',
    prophet: 'yusuf',
    level: 'easy',
    question: 'How many stars did Yusuf see bowing to him in his dream?',
    answers: ['Eleven', 'Seven', 'Twelve', 'Ten'],
    right: 0,
    reference: "Qur'an 12:4",
    verse: {
      reference: "Qur'an 12:4",
      verseArabic:
        'إِذْ قَالَ يُوسُفُ لِأَبِيهِ يَا أَبَتِ إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا وَالشَّمْسَ وَالْقَمَرَ رَأَيْتُهُمْ لِي سَاجِدِينَ',
      translation:
        '[Of these stories mention] when Yusuf said to his father, "O my father, indeed I have seen [in a dream] eleven stars and the sun and the moon; I saw them prostrating to me."',
    },
  },
  {
    id: 'q041',
    prophet: 'yusuf',
    level: 'easy',
    question: "Where did Yusuf's brothers throw him?",
    answers: ['Into a well', 'Into the sea', 'Into a pit of fire', 'Into a cave'],
    right: 0,
    reference: "Qur'an 12:15",
    verse: {
      reference: "Qur'an 12:15",
      verseArabic:
        'فَلَمَّا ذَهَبُوا بِهِ وَأَجْمَعُوا أَنْ يَجْعَلُوهُ فِي غَيَابَتِ الْجُبِّ ۚ وَأَوْحَيْنَا إِلَيْهِ لَتُنَبِّئَنَّهُمْ بِأَمْرِهِمْ هَٰذَا وَهُمْ لَا يَشْعُرُونَ',
      translation:
        'So when they took him [out] and agreed to put him into the bottom of the well... But We inspired to him, "You will surely inform them [someday] about this affair of theirs while they do not perceive [your identity]."',
    },
  },
  {
    id: 'q042',
    prophet: 'yusuf',
    level: 'easy',
    question: 'What did the brothers tell their father had eaten Yusuf?',
    answers: ['A wolf', 'A lion', 'A snake', 'A bear'],
    right: 0,
    reference: "Qur'an 12:17",
    verse: {
      reference: "Qur'an 12:17",
      verseArabic:
        'قَالُوا يَا أَبَانَا إِنَّا ذَهَبْنَا نَسْتَبِقُ وَتَرَكْنَا يُوسُفَ عِنْدَ مَتَاعِنَا فَأَكَلَهُ الذِّئْبُ ۖ وَمَا أَنْتَ بِمُؤْمِنٍ لَنَا وَلَوْ كُنَّا صَادِقِينَ',
      translation:
        'They said, "O our father, indeed we went racing each other and left Yusuf with our possessions, and a wolf ate him. But you would not believe us, even if we were truthful."',
    },
  },
  {
    id: 'q043',
    prophet: 'yusuf',
    level: 'normal',
    question: 'How did the witness show that Yusuf was innocent?',
    answers: [
      'His shirt was torn from the back',
      'His hands were clean',
      'The door was locked',
      'A child spoke for him',
    ],
    right: 0,
    reference: "Qur'an 12:27",
    verse: {
      reference: "Qur'an 12:27",
      verseArabic: 'وَإِنْ كَانَ قَمِيصُهُ قُدَّ مِنْ دُبُرٍ فَكَذَبَتْ وَهُوَ مِنَ الصَّادِقِينَ',
      translation:
        'But if his shirt is torn from the back, then she has lied, and he is of the truthful.',
    },
  },
  {
    id: 'q044',
    prophet: 'yusuf',
    level: 'easy',
    question: 'What did the women cut when they saw Yusuf?',
    answers: ['Their hands', 'Their hair', 'Their bread', 'Their veils'],
    right: 0,
    reference: "Qur'an 12:31",
    verse: {
      reference: "Qur'an 12:31",
      verseArabic:
        'فَلَمَّا سَمِعَتْ بِمَكْرِهِنَّ أَرْسَلَتْ إِلَيْهِنَّ وَأَعْتَدَتْ لَهُنَّ مُتَّكَأً وَآتَتْ كُلَّ وَاحِدَةٍ مِنْهُنَّ سِكِّينًا وَقَالَتِ اخْرُجْ عَلَيْهِنَّ ۖ فَلَمَّا رَأَيْنَهُ أَكْبَرْنَهُ وَقَطَّعْنَ أَيْدِيَهُنَّ وَقُلْنَ حَاشَ لِلَّهِ مَا هَٰذَا بَشَرًا إِنْ هَٰذَا إِلَّا مَلَكٌ كَرِيمٌ',
      translation:
        'So when she heard of their scheming, she sent for them and prepared for them a banquet and gave each one of them a knife and said [to Yusuf], "Come out before them." And when they saw him, they greatly admired him and cut their hands and said, "Perfect is Allah! This is not a man; this is none but a noble angel."',
    },
  },
  {
    id: 'q045',
    prophet: 'yusuf',
    level: 'easy',
    question: "In the king's dream, what ate the seven fat cows?",
    answers: ['Seven lean cows', 'Seven lions', 'Seven wolves', 'Seven birds'],
    right: 0,
    reference: "Qur'an 12:43",
    verse: {
      reference: "Qur'an 12:43",
      verseArabic:
        'وَقَالَ الْمَلِكُ إِنِّي أَرَىٰ سَبْعَ بَقَرَاتٍ سِمَانٍ يَأْكُلُهُنَّ سَبْعٌ عِجَافٌ وَسَبْعَ سُنْبُلَاتٍ خُضْرٍ وَأُخَرَ يَابِسَاتٍ ۖ يَا أَيُّهَا الْمَلَأُ أَفْتُونِي فِي رُؤْيَايَ إِنْ كُنْتُمْ لِلرُّؤْيَا تَعْبُرُونَ',
      translation:
        'And [subsequently] the king said, "Indeed, I have seen [in a dream] seven fat cows being eaten by seven [that were] lean, and seven green spikes [of grain] and others [that were] dry. O eminent ones, explain to me my vision, if you should interpret visions."',
    },
  },
  {
    id: 'q046',
    prophet: 'yusuf',
    level: 'normal',
    question: 'What did Yusuf ask the king to put him in charge of?',
    answers: ['The storehouses of the land', 'The army', 'The palace', 'The prisons'],
    right: 0,
    reference: "Qur'an 12:55",
    verse: {
      reference: "Qur'an 12:55",
      verseArabic: 'قَالَ اجْعَلْنِي عَلَىٰ خَزَائِنِ الْأَرْضِ ۖ إِنِّي حَفِيظٌ عَلِيمٌ',
      translation:
        '[Yusuf] said, "Appoint me over the storehouses of the land. Indeed, I will be a knowing guardian."',
    },
  },
  {
    id: 'q047',
    prophet: 'yusuf',
    level: 'easy',
    question: "What did Yusuf hide in his brother's bag?",
    answers: ["The king's measuring bowl", 'A purse of gold', 'A ring', 'A letter'],
    right: 0,
    reference: "Qur'an 12:70",
    verse: {
      reference: "Qur'an 12:70",
      verseArabic:
        'فَلَمَّا جَهَّزَهُمْ بِجَهَازِهِمْ جَعَلَ السِّقَايَةَ فِي رَحْلِ أَخِيهِ ثُمَّ أَذَّنَ مُؤَذِّنٌ أَيَّتُهَا الْعِيرُ إِنَّكُمْ لَسَارِقُونَ',
      translation:
        'So when he had furnished them with their supplies, he put the [gold measuring] bowl into the bag of his brother. Then an announcer called out, "O caravan, indeed you are thieves."',
    },
  },
  {
    id: 'q048',
    prophet: 'yusuf',
    level: 'easy',
    question: 'What did Yusuf say to his brothers when they recognised him?',
    answers: [
      '"No blame will there be upon you today"',
      '"You will be punished"',
      '"Leave Egypt at once"',
      '"Bring me your father in chains"',
    ],
    right: 0,
    reference: "Qur'an 12:92",
    verse: {
      reference: "Qur'an 12:92",
      verseArabic:
        'قَالَ لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ',
      translation:
        'He said, "No blame will there be upon you today. Allah will forgive you; and He is the most merciful of the merciful."',
    },
  },
  {
    id: 'q049',
    prophet: 'yusuf',
    level: 'hard',
    question: 'In which heaven did the Prophet ﷺ meet Yusuf on the Night Journey?',
    answers: ['The third', 'The first', 'The fifth', 'The seventh'],
    right: 0,
    reference: 'Sahih Bukhari 3887',
  },
  {
    id: 'q050',
    prophet: 'ayyub',
    level: 'normal',
    question: 'What was Ayyub told to strike the ground with?',
    answers: ['His foot', 'His staff', 'His hand', 'A stone'],
    right: 0,
    reference: "Qur'an 38:42",
    verse: {
      reference: "Qur'an 38:42",
      verseArabic: 'ارْكُضْ بِرِجْلِكَ ۖ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ',
      translation:
        '[So he was told], "Strike [the ground] with your foot; this is a [spring for] a cool bath and drink."',
    },
  },
  {
    id: 'q051',
    prophet: 'ayyub',
    level: 'hard',
    question: 'What fell on Ayyub while he was bathing, in the hadith?',
    answers: ['Golden locusts', 'Rain of silver', 'Fresh dates', 'White feathers'],
    right: 0,
    reference: 'Sahih Bukhari 3391',
  },
  {
    id: 'q052',
    prophet: 'shuayb',
    level: 'easy',
    question: "To which people was Shu'ayb sent?",
    answers: ['Madyan', "'Ad", 'Thamud', 'The people of Egypt'],
    right: 0,
    reference: "Qur'an 7:85",
    verse: {
      reference: "Qur'an 7:85",
      verseArabic:
        'وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُمْ مِنْ إِلَٰهٍ غَيْرُهُ ۖ قَدْ جَاءَتْكُمْ بَيِّنَةٌ مِنْ رَبِّكُمْ ۖ فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا ۚ ذَٰلِكُمْ خَيْرٌ لَكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ',
      translation:
        'And to [the people of] Madyan [We sent] their brother Shu’ayb. He said, "O my people, worship Allah; you have no deity other than Him. There has come to you clear evidence from your Lord. So fulfill the measure and weight and do not deprive people of their due and cause not corruption upon the earth after its reformation. That is better for you, if you should be believers."',
    },
  },
  {
    id: 'q053',
    prophet: 'shuayb',
    level: 'easy',
    question: "What sin in trade did Shu'ayb warn his people against?",
    answers: [
      'Cheating in measure and weight',
      'Selling on Fridays',
      'Lending to strangers',
      'Trading with other tribes',
    ],
    right: 0,
    reference: "Qur'an 11:85",
    verse: {
      reference: "Qur'an 11:85",
      verseArabic:
        'وَيَا قَوْمِ أَوْفُوا الْمِكْيَالَ وَالْمِيزَانَ بِالْقِسْطِ ۖ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ',
      translation:
        'And O my people, give full measure and weight in justice and do not deprive the people of their due and do not commit abuse on the earth, spreading corruption.',
    },
  },
  {
    id: 'q054',
    prophet: 'shuayb',
    level: 'hard',
    question: "What did Shu'ayb's people say their family's protection had saved him from?",
    answers: ['Being stoned', 'Being exiled', 'Being imprisoned', 'Being burned'],
    right: 0,
    reference: "Qur'an 11:91",
    verse: {
      reference: "Qur'an 11:91",
      verseArabic:
        'قَالُوا يَا شُعَيْبُ مَا نَفْقَهُ كَثِيرًا مِمَّا تَقُولُ وَإِنَّا لَنَرَاكَ فِينَا ضَعِيفًا ۖ وَلَوْلَا رَهْطُكَ لَرَجَمْنَاكَ ۖ وَمَا أَنْتَ عَلَيْنَا بِعَزِيزٍ',
      translation:
        'They said, "O Shu’ayb, we do not understand much of what you say, and indeed, we consider you among us as weak. And if not for your family, we would have stoned you [to death]; and you are not to us one respected."',
    },
  },
  {
    id: 'q055',
    prophet: 'musa',
    level: 'easy',
    question: "Where did Musa's mother cast him as an infant?",
    answers: ['Into the river', 'Into a cave', 'Into the desert', 'Into a well'],
    right: 0,
    reference: "Qur'an 28:7",
    verse: {
      reference: "Qur'an 28:7",
      verseArabic:
        'وَأَوْحَيْنَا إِلَىٰ أُمِّ مُوسَىٰ أَنْ أَرْضِعِيهِ ۖ فَإِذَا خِفْتِ عَلَيْهِ فَأَلْقِيهِ فِي الْيَمِّ وَلَا تَخَافِي وَلَا تَحْزَنِي ۖ إِنَّا رَادُّوهُ إِلَيْكِ وَجَاعِلُوهُ مِنَ الْمُرْسَلِينَ',
      translation:
        'And We inspired to the mother of Musa, "Suckle him; but when you fear for him, cast him into the river and do not fear and do not grieve. Indeed, We will return him to you and will make him [one] of the messengers."',
    },
  },
  {
    id: 'q056',
    prophet: 'musa',
    level: 'easy',
    question: 'Who said of the infant Musa, "a comfort of the eye for me and for you"?',
    answers: ["Pharaoh's wife", "Musa's sister", "Musa's mother", "Haman's wife"],
    right: 0,
    reference: "Qur'an 28:9",
    verse: {
      reference: "Qur'an 28:9",
      verseArabic:
        'وَقَالَتِ امْرَأَتُ فِرْعَوْنَ قُرَّتُ عَيْنٍ لِي وَلَكَ ۖ لَا تَقْتُلُوهُ عَسَىٰ أَنْ يَنْفَعَنَا أَوْ نَتَّخِذَهُ وَلَدًا وَهُمْ لَا يَشْعُرُونَ',
      translation:
        'And the wife of Pharaoh said, "[He will be] a comfort of the eye for me and for you. Do not kill him; perhaps he may benefit us, or we may adopt him as a son." And they perceived not.',
    },
  },
  {
    id: 'q057',
    prophet: 'musa',
    level: 'easy',
    question: 'To which land did Musa flee after the killing in the city?',
    answers: ['Madyan', 'Babylon', "Saba'", 'Canaan'],
    right: 0,
    reference: "Qur'an 28:22",
    verse: {
      reference: "Qur'an 28:22",
      verseArabic:
        'وَلَمَّا تَوَجَّهَ تِلْقَاءَ مَدْيَنَ قَالَ عَسَىٰ رَبِّي أَنْ يَهْدِيَنِي سَوَاءَ السَّبِيلِ',
      translation:
        'And when he directed himself toward Madyan, he said, "Perhaps my Lord will guide me to the sound way."',
    },
  },
  {
    id: 'q058',
    prophet: 'musa',
    level: 'hard',
    question: 'For how many years did Musa agree to serve to marry in Madyan?',
    answers: ['Eight, or ten if he chose', 'Three', 'Twenty', 'Forty'],
    right: 0,
    reference: "Qur'an 28:27",
    verse: {
      reference: "Qur'an 28:27",
      verseArabic:
        'قَالَ إِنِّي أُرِيدُ أَنْ أُنْكِحَكَ إِحْدَى ابْنَتَيَّ هَاتَيْنِ عَلَىٰ أَنْ تَأْجُرَنِي ثَمَانِيَ حِجَجٍ ۖ فَإِنْ أَتْمَمْتَ عَشْرًا فَمِنْ عِنْدِكَ ۖ وَمَا أُرِيدُ أَنْ أَشُقَّ عَلَيْكَ ۚ سَتَجِدُنِي إِنْ شَاءَ اللَّهُ مِنَ الصَّالِحِينَ',
      translation:
        'He said, "Indeed, I wish to wed you one of these, my two daughters, on [the condition] that you serve me for eight years; but if you complete ten, it will be [as a favor] from you. And I do not wish to put you in difficulty. You will find me, if Allah wills, from among the righteous."',
    },
  },
  {
    id: 'q059',
    prophet: 'musa',
    level: 'easy',
    question: 'In which valley did Allah call Musa?',
    answers: ['Tuwa', 'Al-Ahqaf', 'Badr', 'Al-Hijr'],
    right: 0,
    reference: "Qur'an 20:12",
    verse: {
      reference: "Qur'an 20:12",
      verseArabic:
        'إِنِّي أَنَا رَبُّكَ فَاخْلَعْ نَعْلَيْكَ ۖ إِنَّكَ بِالْوَادِ الْمُقَدَّسِ طُوًى',
      translation:
        'Indeed, I am your Lord, so remove your sandals. Indeed, you are in the sacred valley of Tuwa.',
    },
  },
  {
    id: 'q060',
    prophet: 'musa',
    level: 'easy',
    question: "What became of Musa's staff when he threw it down at the call?",
    answers: ['A moving snake', 'A tree', 'A stream of water', 'A bird'],
    right: 0,
    reference: "Qur'an 20:20",
    verse: {
      reference: "Qur'an 20:20",
      verseArabic: 'فَأَلْقَاهَا فَإِذَا هِيَ حَيَّةٌ تَسْعَىٰ',
      translation: 'So he threw it down, and thereupon it was a snake, moving swiftly.',
    },
  },
  {
    id: 'q061',
    prophet: 'musa',
    level: 'easy',
    question: 'Whom did Musa ask Allah to send with him as a helper?',
    answers: ['His brother Harun', 'His father', "Yusha'", "Pharaoh's wife"],
    right: 0,
    reference: "Qur'an 20:30",
    verse: {
      reference: "Qur'an 20:30",
      verseArabic: 'هَارُونَ أَخِي',
      translation: 'Harun, my brother.',
    },
  },
  {
    id: 'q062',
    prophet: 'musa',
    level: 'hard',
    question: 'On which day did Musa set the contest with the magicians?',
    answers: [
      'The day of the festival',
      'The day of the eclipse',
      'The first day of the year',
      'The day of the flood',
    ],
    right: 0,
    reference: "Qur'an 20:59",
    verse: {
      reference: "Qur'an 20:59",
      verseArabic: 'قَالَ مَوْعِدُكُمْ يَوْمُ الزِّينَةِ وَأَنْ يُحْشَرَ النَّاسُ ضُحًى',
      translation:
        '[Musa] said, "Your appointment is on the day of the festival when the people assemble at mid-morning."',
    },
  },
  {
    id: 'q063',
    prophet: 'musa',
    level: 'normal',
    question: 'Whom did the magicians say they believed in after the contest?',
    answers: ['The Lord of Harun and Musa', 'Pharaoh', 'The sun and moon', "Their fathers' gods"],
    right: 0,
    reference: "Qur'an 20:70",
    verse: {
      reference: "Qur'an 20:70",
      verseArabic: 'فَأُلْقِيَ السَّحَرَةُ سُجَّدًا قَالُوا آمَنَّا بِرَبِّ هَارُونَ وَمُوسَىٰ',
      translation:
        'So the magicians fell down in prostration. They said, "We have believed in the Lord of Harun and Musa."',
    },
  },
  {
    id: 'q064',
    prophet: 'musa',
    level: 'easy',
    question: 'What did Musa strike to part the sea?',
    answers: [
      'The sea, with his staff',
      'The ground, with his foot',
      'A rock, with his hand',
      'The sky, with his staff',
    ],
    right: 0,
    reference: "Qur'an 26:63",
    verse: {
      reference: "Qur'an 26:63",
      verseArabic:
        'فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِبْ بِعَصَاكَ الْبَحْرَ ۖ فَانْفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ',
      translation:
        'Then We inspired to Musa, "Strike with your staff the sea," and it parted, and each portion was like a great towering mountain.',
    },
  },
  {
    id: 'q065',
    prophet: 'musa',
    level: 'hard',
    question: 'For how many nights in all did Musa go to the appointment with his Lord?',
    answers: ['Forty', 'Thirty', 'Seven', 'Ten'],
    right: 0,
    reference: "Qur'an 7:142",
    verse: {
      reference: "Qur'an 7:142",
      verseArabic:
        '۞ وَوَاعَدْنَا مُوسَىٰ ثَلَاثِينَ لَيْلَةً وَأَتْمَمْنَاهَا بِعَشْرٍ فَتَمَّ مِيقَاتُ رَبِّهِ أَرْبَعِينَ لَيْلَةً ۚ وَقَالَ مُوسَىٰ لِأَخِيهِ هَارُونَ اخْلُفْنِي فِي قَوْمِي وَأَصْلِحْ وَلَا تَتَّبِعْ سَبِيلَ الْمُفْسِدِينَ',
      translation:
        'And We made an appointment with Musa for thirty nights and perfected them by [the addition of] ten; so the term of his Lord was completed as forty nights. And Musa said to his brother Harun, "Take my place among my people, do right [by them], and do not follow the way of the corrupters."',
    },
  },
  {
    id: 'q066',
    prophet: 'musa',
    level: 'easy',
    question: 'Who led the Children of Israel to worship the calf?',
    answers: ['The Samiri', 'Qarun', 'Haman', 'Harun'],
    right: 0,
    reference: "Qur'an 20:85",
    verse: {
      reference: "Qur'an 20:85",
      verseArabic:
        'قَالَ فَإِنَّا قَدْ فَتَنَّا قَوْمَكَ مِنْ بَعْدِكَ وَأَضَلَّهُمُ السَّامِرِيُّ',
      translation:
        '[Allah] said, "But indeed, We have tried your people after you [departed], and the Samiri has led them astray."',
    },
  },
  {
    id: 'q067',
    prophet: 'musa',
    level: 'easy',
    question: 'What did Allah tell the Children of Israel to slaughter to reveal a murderer?',
    answers: ['A cow', 'A sheep', 'A camel', 'A goat'],
    right: 0,
    reference: "Qur'an 2:67",
    verse: {
      reference: "Qur'an 2:67",
      verseArabic:
        'وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِ إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تَذْبَحُوا بَقَرَةً ۖ قَالُوا أَتَتَّخِذُنَا هُزُوًا ۖ قَالَ أَعُوذُ بِاللَّهِ أَنْ أَكُونَ مِنَ الْجَاهِلِينَ',
      translation:
        'And [recall] when Musa said to his people, "Indeed, Allah commands you to slaughter a cow." They said, "Do you take us in ridicule?" He said, "I seek refuge in Allah from being among the ignorant."',
    },
  },
  {
    id: 'q068',
    prophet: 'musa',
    level: 'easy',
    question: 'How many springs gushed from the stone when Musa struck it?',
    answers: ['Twelve', 'Seven', 'Three', 'Forty'],
    right: 0,
    reference: "Qur'an 2:60",
    verse: {
      reference: "Qur'an 2:60",
      verseArabic:
        '۞ وَإِذِ اسْتَسْقَىٰ مُوسَىٰ لِقَوْمِهِ فَقُلْنَا اضْرِبْ بِعَصَاكَ الْحَجَرَ ۖ فَانْفَجَرَتْ مِنْهُ اثْنَتَا عَشْرَةَ عَيْنًا ۖ قَدْ عَلِمَ كُلُّ أُنَاسٍ مَشْرَبَهُمْ ۖ كُلُوا وَاشْرَبُوا مِنْ رِزْقِ اللَّهِ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ',
      translation:
        'And [recall] when Musa prayed for water for his people, so We said, "Strike with your staff the stone." And there gushed forth from it twelve springs, and every people knew its watering place. "Eat and drink from the provision of Allah, and do not commit abuse on the earth, spreading corruption."',
    },
  },
  {
    id: 'q069',
    prophet: 'musa',
    level: 'normal',
    question: 'For how long were the Children of Israel left to wander?',
    answers: ['Forty years', 'Seven years', 'Seventy years', 'Twelve years'],
    right: 0,
    reference: "Qur'an 5:26",
    verse: {
      reference: "Qur'an 5:26",
      verseArabic:
        'قَالَ فَإِنَّهَا مُحَرَّمَةٌ عَلَيْهِمْ ۛ أَرْبَعِينَ سَنَةً ۛ يَتِيهُونَ فِي الْأَرْضِ ۚ فَلَا تَأْسَ عَلَى الْقَوْمِ الْفَاسِقِينَ',
      translation:
        '[Allah] said, "Then indeed, it is forbidden to them for forty years [in which] they will wander throughout the land. So do not grieve over the defiantly disobedient people."',
    },
  },
  {
    id: 'q070',
    prophet: 'musa',
    level: 'normal',
    question: 'Who was Qarun?',
    answers: [
      "A man of Musa's people with great treasures",
      "Pharaoh's minister",
      'An Egyptian magician',
      "Musa's servant",
    ],
    right: 0,
    reference: "Qur'an 28:76",
    verse: {
      reference: "Qur'an 28:76",
      verseArabic:
        '۞ إِنَّ قَارُونَ كَانَ مِنْ قَوْمِ مُوسَىٰ فَبَغَىٰ عَلَيْهِمْ ۖ وَآتَيْنَاهُ مِنَ الْكُنُوزِ مَا إِنَّ مَفَاتِحَهُ لَتَنُوءُ بِالْعُصْبَةِ أُولِي الْقُوَّةِ إِذْ قَالَ لَهُ قَوْمُهُ لَا تَفْرَحْ ۖ إِنَّ اللَّهَ لَا يُحِبُّ الْفَرِحِينَ',
      translation:
        'Indeed, Qarun was from the people of Musa, but he tyrannized them. And We gave him of treasures whose keys would burden a band of strong men; thereupon his people said to him, "Do not exult. Indeed, Allah does not like the exultant."',
    },
  },
  {
    id: 'q071',
    prophet: 'musa',
    level: 'normal',
    question: 'What happened to Qarun?',
    answers: [
      'The earth swallowed him and his home',
      'He drowned in the sea',
      'He was struck by lightning',
      'He became a king',
    ],
    right: 0,
    reference: "Qur'an 28:81",
    verse: {
      reference: "Qur'an 28:81",
      verseArabic:
        'فَخَسَفْنَا بِهِ وَبِدَارِهِ الْأَرْضَ فَمَا كَانَ لَهُ مِنْ فِئَةٍ يَنْصُرُونَهُ مِنْ دُونِ اللَّهِ وَمَا كَانَ مِنَ الْمُنْتَصِرِينَ',
      translation:
        'And We caused the earth to swallow him and his home. And there was for him no company to aid him other than Allah, nor was he of those who [could] defend themselves.',
    },
  },
  {
    id: 'q072',
    prophet: 'harun',
    level: 'normal',
    question: 'How did Musa describe his brother Harun?',
    answers: [
      'More fluent in speech than him',
      'Stronger in battle than him',
      'Older and wiser than him',
      'Richer than him',
    ],
    right: 0,
    reference: "Qur'an 28:34",
    verse: {
      reference: "Qur'an 28:34",
      verseArabic:
        'وَأَخِي هَارُونُ هُوَ أَفْصَحُ مِنِّي لِسَانًا فَأَرْسِلْهُ مَعِيَ رِدْءًا يُصَدِّقُنِي ۖ إِنِّي أَخَافُ أَنْ يُكَذِّبُونِ',
      translation:
        'And my brother Harun is more fluent than me in tongue, so send him with me as support, verifying me. Indeed, I fear that they will deny me.',
    },
  },
  {
    id: 'q073',
    prophet: 'harun',
    level: 'normal',
    question: 'What did Harun tell the people about the calf?',
    answers: [
      '"You are only being tested by it"',
      '"It is the god of Musa"',
      '"Keep it until Musa returns"',
      '"It came from the sky"',
    ],
    right: 0,
    reference: "Qur'an 20:90",
    verse: {
      reference: "Qur'an 20:90",
      verseArabic:
        'وَلَقَدْ قَالَ لَهُمْ هَارُونُ مِنْ قَبْلُ يَا قَوْمِ إِنَّمَا فُتِنْتُمْ بِهِ ۖ وَإِنَّ رَبَّكُمُ الرَّحْمَٰنُ فَاتَّبِعُونِي وَأَطِيعُوا أَمْرِي',
      translation:
        'And Harun had already told them before [the return of Musa], "O my people, you are only being tested by it, and indeed, your Lord is the Most Merciful, so follow me and obey my order."',
    },
  },
  {
    id: 'q074',
    prophet: 'dhul-kifl',
    level: 'hard',
    question: 'With which two prophets is Dhul-Kifl named as "of the patient"?',
    answers: ["Isma'il and Idris", 'Musa and Harun', 'Dawud and Sulayman', "Yahya and 'Isa"],
    right: 0,
    reference: "Qur'an 21:85",
    verse: {
      reference: "Qur'an 21:85",
      verseArabic: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِنَ الصَّابِرِينَ',
      translation: 'And [mention] Isma‘il and Idris and Dhul-Kifl; all were of the patient.',
    },
  },
  {
    id: 'q075',
    prophet: 'dhul-kifl',
    level: 'hard',
    question: "How many times is Dhul-Kifl named in the Qur'an?",
    answers: ['Twice', 'Once', 'Five times', 'Ten times'],
    right: 0,
    reference: "Qur'an 21:85 · Qur'an 38:48",
    verse: {
      reference: "Qur'an 21:85",
      verseArabic: 'وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِنَ الصَّابِرِينَ',
      translation: 'And [mention] Isma‘il and Idris and Dhul-Kifl; all were of the patient.',
    },
  },
  {
    id: 'q076',
    prophet: 'dawud',
    level: 'normal',
    question: 'Whom did Dawud kill when he was a soldier?',
    answers: ['Jalut', 'Talut', 'Pharaoh', 'Qarun'],
    right: 0,
    reference: "Qur'an 2:251",
    verse: {
      reference: "Qur'an 2:251",
      verseArabic:
        'فَهَزَمُوهُمْ بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ ۗ وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُمْ بِبَعْضٍ لَفَسَدَتِ الْأَرْضُ وَلَٰكِنَّ اللَّهَ ذُو فَضْلٍ عَلَى الْعَالَمِينَ',
      translation:
        'So they defeated them by permission of Allah, and Dawud killed Goliath, and Allah gave him the kingship and prophethood and taught him from that which He willed. And if it were not for Allah checking [some] people by means of others, the earth would have been corrupted, but Allah is full of bounty to the worlds.',
    },
  },
  {
    id: 'q077',
    prophet: 'dawud',
    level: 'easy',
    question: 'Which book was given to Dawud?',
    answers: ['The Zabur', 'The Torah', 'The Gospel', 'The Scrolls'],
    right: 0,
    reference: "Qur'an 4:163",
    verse: {
      reference: "Qur'an 4:163",
      verseArabic:
        '۞ إِنَّا أَوْحَيْنَا إِلَيْكَ كَمَا أَوْحَيْنَا إِلَىٰ نُوحٍ وَالنَّبِيِّينَ مِنْ بَعْدِهِ ۚ وَأَوْحَيْنَا إِلَىٰ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ وَيَعْقُوبَ وَالْأَسْبَاطِ وَعِيسَىٰ وَأَيُّوبَ وَيُونُسَ وَهَارُونَ وَسُلَيْمَانَ ۚ وَآتَيْنَا دَاوُودَ زَبُورًا',
      translation:
        'Indeed, We have revealed to you, [O Muhammad], as We revealed to Nuh and the prophets after him. And we revealed to Ibrahim, Isma‘il, Ishaq, Ya‘qub, the Descendants, ‘Isa, Ayyub, Yunus, Harun, and Sulayman, and to Dawud We gave the book [of Psalms].',
    },
  },
  {
    id: 'q078',
    prophet: 'dawud',
    level: 'easy',
    question: 'What did Allah make soft for Dawud?',
    answers: ['Iron', 'Stone', 'Gold', 'Wood'],
    right: 0,
    reference: "Qur'an 34:10",
    verse: {
      reference: "Qur'an 34:10",
      verseArabic:
        '۞ وَلَقَدْ آتَيْنَا دَاوُودَ مِنَّا فَضْلًا ۖ يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ',
      translation:
        'And We certainly gave Dawud from Us bounty. [We said], "O mountains, repeat [Our] praises with him, and the birds [as well]." And We made pliable for him iron.',
    },
  },
  {
    id: 'q079',
    prophet: 'dawud',
    level: 'hard',
    question: 'How did Dawud fast, according to the Prophet ﷺ?',
    answers: ['Every other day', 'Every Monday', 'All of every month', 'Three days a year'],
    right: 0,
    reference: 'Sahih Bukhari 1131',
  },
  {
    id: 'q080',
    prophet: 'dawud',
    level: 'normal',
    question: 'What glorified Allah with Dawud?',
    answers: [
      'The mountains and the birds',
      'The rivers and the fish',
      'The stars and the moon',
      'The trees and the wind',
    ],
    right: 0,
    reference: "Qur'an 38:18",
    verse: {
      reference: "Qur'an 38:18",
      verseArabic: 'إِنَّا سَخَّرْنَا الْجِبَالَ مَعَهُ يُسَبِّحْنَ بِالْعَشِيِّ وَالْإِشْرَاقِ',
      translation:
        'Indeed, We subjected the mountains [to praise] with him, exalting [Allah] in the [late] afternoon and [after] sunrise.',
    },
  },
  {
    id: 'q081',
    prophet: 'sulayman',
    level: 'easy',
    question: 'What did Sulayman say he had been taught?',
    answers: [
      'The language of birds',
      'The language of fish',
      'The movement of the stars',
      'The secrets of the sea',
    ],
    right: 0,
    reference: "Qur'an 27:16",
    verse: {
      reference: "Qur'an 27:16",
      verseArabic:
        'وَوَرِثَ سُلَيْمَانُ دَاوُودَ ۖ وَقَالَ يَا أَيُّهَا النَّاسُ عُلِّمْنَا مَنْطِقَ الطَّيْرِ وَأُوتِينَا مِنْ كُلِّ شَيْءٍ ۖ إِنَّ هَٰذَا لَهُوَ الْفَضْلُ الْمُبِينُ',
      translation:
        'And Sulayman inherited Dawud. He said, "O people, we have been taught the language of birds, and we have been given from all things. Indeed, this is evident bounty."',
    },
  },
  {
    id: 'q082',
    prophet: 'sulayman',
    level: 'easy',
    question: "Which creature warned its kind about Sulayman's army?",
    answers: ['An ant', 'A bee', 'A spider', 'A hoopoe'],
    right: 0,
    reference: "Qur'an 27:18",
    verse: {
      reference: "Qur'an 27:18",
      verseArabic:
        'حَتَّىٰ إِذَا أَتَوْا عَلَىٰ وَادِ النَّمْلِ قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ',
      translation:
        'Until, when they came upon the valley of the ants, an ant said, "O ants, enter your dwellings that you not be crushed by Sulayman and his soldiers while they perceive not."',
    },
  },
  {
    id: 'q083',
    prophet: 'sulayman',
    level: 'easy',
    question: "Which bird brought Sulayman news of Saba'?",
    answers: ['The hoopoe', 'The crow', 'The dove', 'The eagle'],
    right: 0,
    reference: "Qur'an 27:22",
    verse: {
      reference: "Qur'an 27:22",
      verseArabic:
        'فَمَكَثَ غَيْرَ بَعِيدٍ فَقَالَ أَحَطْتُ بِمَا لَمْ تُحِطْ بِهِ وَجِئْتُكَ مِنْ سَبَإٍ بِنَبَإٍ يَقِينٍ',
      translation:
        'But the hoopoe stayed not long and said, "I have encompassed [in knowledge] that which you have not encompassed, and I have come to you from Sheba with certain news."',
    },
  },
  {
    id: 'q084',
    prophet: 'sulayman',
    level: 'easy',
    question: "What did the queen of Saba' and her people worship?",
    answers: ['The sun', 'The moon', 'Fire', 'A golden calf'],
    right: 0,
    reference: "Qur'an 27:24",
    verse: {
      reference: "Qur'an 27:24",
      verseArabic:
        'وَجَدْتُهَا وَقَوْمَهَا يَسْجُدُونَ لِلشَّمْسِ مِنْ دُونِ اللَّهِ وَزَيَّنَ لَهُمُ الشَّيْطَانُ أَعْمَالَهُمْ فَصَدَّهُمْ عَنِ السَّبِيلِ فَهُمْ لَا يَهْتَدُونَ',
      translation:
        'I found her and her people prostrating to the sun instead of Allah, and Satan has made their deeds pleasing to them and averted them from [His] way, so they are not guided.',
    },
  },
  {
    id: 'q085',
    prophet: 'sulayman',
    level: 'normal',
    question: 'How did the jinn learn that Sulayman had died?',
    answers: [
      'A creature of the earth ate his staff',
      'His throne fell',
      'The wind stopped',
      'The birds fell silent',
    ],
    right: 0,
    reference: "Qur'an 34:14",
    verse: {
      reference: "Qur'an 34:14",
      verseArabic:
        'فَلَمَّا قَضَيْنَا عَلَيْهِ الْمَوْتَ مَا دَلَّهُمْ عَلَىٰ مَوْتِهِ إِلَّا دَابَّةُ الْأَرْضِ تَأْكُلُ مِنْسَأَتَهُ ۖ فَلَمَّا خَرَّ تَبَيَّنَتِ الْجِنُّ أَنْ لَوْ كَانُوا يَعْلَمُونَ الْغَيْبَ مَا لَبِثُوا فِي الْعَذَابِ الْمُهِينِ',
      translation:
        'And when We decreed for Sulayman death, nothing indicated to the jinn his death except a creature of the earth eating his staff. But when he fell, it became clear to the jinn that if they had known the unseen, they would not have remained in humiliating punishment.',
    },
  },
  {
    id: 'q086',
    prophet: 'ilyas',
    level: 'hard',
    question: 'Which idol did Ilyas call his people away from?',
    answers: ["Ba'l", 'Wadd', 'Hubal', 'The calf'],
    right: 0,
    reference: "Qur'an 37:125",
    verse: {
      reference: "Qur'an 37:125",
      verseArabic: 'أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ الْخَالِقِينَ',
      translation: 'Do you call upon Ba’l and leave the best of creators.',
    },
  },
  {
    id: 'q087',
    prophet: 'ilyas',
    level: 'hard',
    question: "What greeting does Allah send upon Ilyas in the Qur'an?",
    answers: ['Peace', 'Victory', 'Wealth', 'Long life'],
    right: 0,
    reference: "Qur'an 37:130",
    verse: {
      reference: "Qur'an 37:130",
      verseArabic: 'سَلَامٌ عَلَىٰ إِلْ يَاسِينَ',
      translation: 'Peace upon Ilyas.',
    },
  },
  {
    id: 'q088',
    prophet: 'al-yasa',
    level: 'hard',
    question: 'With whom is Al-Yasa\' named "among the outstanding"?',
    answers: ["Isma'il and Dhul-Kifl", 'Musa and Harun', 'Nuh and Hud', 'Yahya and Zakariyya'],
    right: 0,
    reference: "Qur'an 38:48",
    verse: {
      reference: "Qur'an 38:48",
      verseArabic: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِنَ الْأَخْيَارِ',
      translation:
        'And remember Isma‘il, Al-Yasa‘ and Dhul-Kifl, and all are among the outstanding.',
    },
  },
  {
    id: 'q089',
    prophet: 'al-yasa',
    level: 'hard',
    question: "What does the Qur'an say Allah did for Al-Yasa', Isma'il, Yunus and Lut?",
    answers: [
      'Preferred them over the worlds',
      'Gave them kingdoms',
      'Made them speak in the cradle',
      'Raised them to the heavens',
    ],
    right: 0,
    reference: "Qur'an 6:86",
    verse: {
      reference: "Qur'an 6:86",
      verseArabic:
        'وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ',
      translation:
        'And Isma‘il and Al-Yasa‘ and Yunus and Lut - and all [of them] We preferred over the worlds.',
    },
  },
  {
    id: 'q090',
    prophet: 'yunus',
    level: 'easy',
    question: 'What swallowed Yunus?',
    answers: ['A fish', 'A whale-shaped cloud', 'The sea floor', 'A cave'],
    right: 0,
    reference: "Qur'an 37:142",
    verse: {
      reference: "Qur'an 37:142",
      verseArabic: 'فَالْتَقَمَهُ الْحُوتُ وَهُوَ مُلِيمٌ',
      translation: 'Then the fish swallowed him, while he was blameworthy.',
    },
  },
  {
    id: 'q091',
    prophet: 'yunus',
    level: 'easy',
    question: 'What did Allah cause to grow over Yunus on the shore?',
    answers: ['A gourd vine', 'A palm tree', 'A fig tree', 'Tall grass'],
    right: 0,
    reference: "Qur'an 37:146",
    verse: {
      reference: "Qur'an 37:146",
      verseArabic: 'وَأَنْبَتْنَا عَلَيْهِ شَجَرَةً مِنْ يَقْطِينٍ',
      translation: 'And We caused to grow over him a gourd vine.',
    },
  },
  {
    id: 'q092',
    prophet: 'yunus',
    level: 'hard',
    question: 'How many people was Yunus sent to?',
    answers: ['A hundred thousand or more', 'Seventy', 'Seven thousand', 'A thousand'],
    right: 0,
    reference: "Qur'an 37:147",
    verse: {
      reference: "Qur'an 37:147",
      verseArabic: 'وَأَرْسَلْنَاهُ إِلَىٰ مِائَةِ أَلْفٍ أَوْ يَزِيدُونَ',
      translation: 'And We sent him to [his people of] a hundred thousand or more.',
    },
  },
  {
    id: 'q093',
    prophet: 'zakariyya',
    level: 'normal',
    question: 'What did Zakariyya find with Maryam in the prayer chamber?',
    answers: ['Provision from Allah', 'A letter', "An angel's book", 'Gold'],
    right: 0,
    reference: "Qur'an 3:37",
    verse: {
      reference: "Qur'an 3:37",
      verseArabic:
        'فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنْبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا ۖ كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا الْمِحْرَابَ وَجَدَ عِنْدَهَا رِزْقًا ۖ قَالَ يَا مَرْيَمُ أَنَّىٰ لَكِ هَٰذَا ۖ قَالَتْ هُوَ مِنْ عِنْدِ اللَّهِ ۖ إِنَّ اللَّهَ يَرْزُقُ مَنْ يَشَاءُ بِغَيْرِ حِسَابٍ',
      translation:
        'So her Lord accepted her with good acceptance and caused her to grow in a good manner and put her in the care of Zakariyya. Every time Zakariyya entered upon her in the prayer chamber, he found with her provision. He said, "O Maryam, from where is this [coming] to you?" She said, "It is from Allah. Indeed, Allah provides for whom He wills without account."',
    },
  },
  {
    id: 'q094',
    prophet: 'zakariyya',
    level: 'hard',
    question: 'What was the sign given to Zakariyya?',
    answers: [
      'He could not speak to people for three days',
      'His staff turned green',
      'His hair turned black',
      'A star appeared',
    ],
    right: 0,
    reference: "Qur'an 3:41",
    verse: {
      reference: "Qur'an 3:41",
      verseArabic:
        'قَالَ رَبِّ اجْعَلْ لِي آيَةً ۖ قَالَ آيَتُكَ أَلَّا تُكَلِّمَ النَّاسَ ثَلَاثَةَ أَيَّامٍ إِلَّا رَمْزًا ۗ وَاذْكُرْ رَبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ',
      translation:
        'He said, "My Lord, make for me a sign." He Said, "Your sign is that you will not [be able to] speak to the people for three days except by gesture. And remember your Lord much and exalt [Him with praise] in the evening and the morning."',
    },
  },
  {
    id: 'q095',
    prophet: 'yahya',
    level: 'hard',
    question: "What is unique about the name Yahya, according to the Qur'an?",
    answers: [
      'No one had been given it before him',
      'It was given by his mother',
      "It means 'the king'",
      'It was the name of his grandfather',
    ],
    right: 0,
    reference: "Qur'an 19:7",
    verse: {
      reference: "Qur'an 19:7",
      verseArabic:
        'يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ لَمْ نَجْعَلْ لَهُ مِنْ قَبْلُ سَمِيًّا',
      translation:
        '[He was told], "O Zakariyya, indeed We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before [this] name."',
    },
  },
  {
    id: 'q096',
    prophet: 'yahya',
    level: 'normal',
    question: 'When was Yahya given judgement?',
    answers: ['While still a boy', 'In old age', 'After forty years', 'On his deathbed'],
    right: 0,
    reference: "Qur'an 19:12",
    verse: {
      reference: "Qur'an 19:12",
      verseArabic: 'يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا',
      translation:
        '[Allah] said, "O Yahya, take the Scripture with determination." And We gave him judgement [while yet] a boy.',
    },
  },
  {
    id: 'q097',
    prophet: 'isa',
    level: 'easy',
    question: "Under what did Maryam give birth to 'Isa?",
    answers: ['The trunk of a palm tree', 'An olive tree', 'A fig tree', 'A tent'],
    right: 0,
    reference: "Qur'an 19:23",
    verse: {
      reference: "Qur'an 19:23",
      verseArabic:
        'فَأَجَاءَهَا الْمَخَاضُ إِلَىٰ جِذْعِ النَّخْلَةِ قَالَتْ يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنْتُ نَسْيًا مَنْسِيًّا',
      translation:
        'And the pains of childbirth drove her to the trunk of a palm tree. She said, "Oh, I wish I had died before this and was in oblivion, forgotten."',
    },
  },
  {
    id: 'q098',
    prophet: 'isa',
    level: 'easy',
    question: "What did 'Isa say first when he spoke from the cradle?",
    answers: [
      '"Indeed, I am the servant of Allah"',
      '"I am the son of Allah"',
      '"I am a king"',
      '"My mother is innocent"',
    ],
    right: 0,
    reference: "Qur'an 19:30",
    verse: {
      reference: "Qur'an 19:30",
      verseArabic: 'قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا',
      translation:
        '[‘Isa] said, "Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet."',
    },
  },
  {
    id: 'q099',
    prophet: 'isa',
    level: 'normal',
    question: "What did the disciples ask 'Isa to have sent down from heaven?",
    answers: ['A table spread with food', 'A ladder', 'Rain', 'A book'],
    right: 0,
    reference: "Qur'an 5:112",
    verse: {
      reference: "Qur'an 5:112",
      verseArabic:
        'إِذْ قَالَ الْحَوَارِيُّونَ يَا عِيسَى ابْنَ مَرْيَمَ هَلْ يَسْتَطِيعُ رَبُّكَ أَنْ يُنَزِّلَ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ ۖ قَالَ اتَّقُوا اللَّهَ إِنْ كُنْتُمْ مُؤْمِنِينَ',
      translation:
        '[And remember] when the disciples said, "O ‘Isa, Son of Maryam, can your Lord send down to us a table [spread with food] from the heaven? [‘Isa] said," Fear Allah, if you should be believers.',
    },
  },
  {
    id: 'q100',
    prophet: 'isa',
    level: 'normal',
    question: "What does the Qur'an say about the claim that 'Isa was crucified?",
    answers: [
      'They did not kill him, nor crucify him',
      'He was crucified and rose',
      'He died in prison',
      'He was killed in battle',
    ],
    right: 0,
    reference: "Qur'an 4:157",
    verse: {
      reference: "Qur'an 4:157",
      verseArabic:
        'وَقَوْلِهِمْ إِنَّا قَتَلْنَا الْمَسِيحَ عِيسَى ابْنَ مَرْيَمَ رَسُولَ اللَّهِ وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِنْ شُبِّهَ لَهُمْ ۚ وَإِنَّ الَّذِينَ اخْتَلَفُوا فِيهِ لَفِي شَكٍّ مِنْهُ ۚ مَا لَهُمْ بِهِ مِنْ عِلْمٍ إِلَّا اتِّبَاعَ الظَّنِّ ۚ وَمَا قَتَلُوهُ يَقِينًا',
      translation:
        'And [for] their saying, "Indeed, we have killed the Messiah, ‘Isa, the son of Maryam, the messenger of Allah." And they did not kill him, nor did they crucify him; but [another] was made to resemble him to them. And indeed, those who differ over it are in doubt about it. They have no knowledge of it except the following of assumption. And they did not kill him, for certain.',
    },
  },
  {
    id: 'q101',
    prophet: 'isa',
    level: 'easy',
    question: "Whose coming did 'Isa give good news of?",
    answers: [
      'A messenger named Ahmad',
      'A king from the east',
      'A second flood',
      'An angel named Jibril',
    ],
    right: 0,
    reference: "Qur'an 61:6",
    verse: {
      reference: "Qur'an 61:6",
      verseArabic:
        'وَإِذْ قَالَ عِيسَى ابْنُ مَرْيَمَ يَا بَنِي إِسْرَائِيلَ إِنِّي رَسُولُ اللَّهِ إِلَيْكُمْ مُصَدِّقًا لِمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِنْ بَعْدِي اسْمُهُ أَحْمَدُ ۖ فَلَمَّا جَاءَهُمْ بِالْبَيِّنَاتِ قَالُوا هَٰذَا سِحْرٌ مُبِينٌ',
      translation:
        'And [mention] when ‘Isa, the son of Maryam, said, "O children of Israel, indeed I am the messenger of Allah to you confirming what came before me of the Torah and bringing good tidings of a messenger to come after me, whose name is Ahmad." But when he came to them with clear evidences, they said, "This is obvious magic."',
    },
  },
  {
    id: 'q102',
    prophet: 'isa',
    level: 'hard',
    question: "What will 'Isa break when he returns, according to the Prophet ﷺ?",
    answers: ['The cross', "The Ka'bah", 'The idols of Quraysh', 'The walls of Jerusalem'],
    right: 0,
    reference: 'Sahih Bukhari 3448',
  },
  {
    id: 'q103',
    prophet: 'muhammad',
    level: 'easy',
    question: 'Where was the Prophet ﷺ when the first revelation came?',
    answers: ['The cave of Hira', 'The cave of Thawr', "The Ka'bah", 'Madinah'],
    right: 0,
    reference: 'Sahih Bukhari 3',
  },
  {
    id: 'q104',
    prophet: 'muhammad',
    level: 'easy',
    question: 'What was the first word the angel said to the Prophet ﷺ?',
    answers: ['"Read"', '"Pray"', '"Arise"', '"Believe"'],
    right: 0,
    reference: 'Sahih Bukhari 3',
  },
  {
    id: 'q105',
    prophet: 'muhammad',
    level: 'easy',
    question: 'Who comforted the Prophet ﷺ after the first revelation?',
    answers: ['Khadijah', 'Abu Bakr', "'A'ishah", 'Fatimah'],
    right: 0,
    reference: 'Sahih Bukhari 3',
  },
  {
    id: 'q106',
    prophet: 'muhammad',
    level: 'easy',
    question: 'In which cave did the Prophet ﷺ and Abu Bakr hide during the migration?',
    answers: ['Thawr', 'Hira', 'Uhud', 'Al-Kahf'],
    right: 0,
    reference: 'Sahih Bukhari 3905',
  },
  {
    id: 'q107',
    prophet: 'muhammad',
    level: 'easy',
    question: 'At which battle were the Muslims given victory "while you were few in number"?',
    answers: ['Badr', 'Uhud', 'Hunayn', 'The Trench'],
    right: 0,
    reference: "Qur'an 3:123",
    verse: {
      reference: "Qur'an 3:123",
      verseArabic:
        'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنْتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
      translation:
        'And already had Allah given you victory at [the battle of] Badr while you were few in number. Then fear Allah; perhaps you will be grateful.',
    },
  },
  {
    id: 'q108',
    prophet: 'muhammad',
    level: 'easy',
    question: 'How old was the Prophet ﷺ when he died?',
    answers: ['Sixty-three', 'Forty', 'Fifty', 'Seventy'],
    right: 0,
    reference: 'Sahih Bukhari 3536',
  },
  {
    id: 'q109',
    prophet: 'muhammad',
    level: 'easy',
    question: "What does the Qur'an call the Prophet ﷺ in 33:40?",
    answers: [
      'The last of the prophets',
      'The first of the prophets',
      'The king of Arabia',
      'The friend of Allah',
    ],
    right: 0,
    reference: "Qur'an 33:40",
    verse: {
      reference: "Qur'an 33:40",
      verseArabic:
        'مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِنْ رِجَالِكُمْ وَلَٰكِنْ رَسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ۗ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا',
      translation:
        'Muhammad is not the father of [any] one of your men, but [he is] the Messenger of Allah and last of the prophets. And ever is Allah, of all things, Knowing.',
    },
  },
  {
    id: 'q110',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Pharaoh do to the newborn sons of the Children of Israel?',
    answers: [
      'He had them slaughtered',
      'He made them soldiers',
      'He sent them to Madyan',
      'He freed them',
    ],
    right: 0,
    reference: "Qur'an 28:4",
    verse: {
      reference: "Qur'an 28:4",
      verseArabic:
        'إِنَّ فِرْعَوْنَ عَلَا فِي الْأَرْضِ وَجَعَلَ أَهْلَهَا شِيَعًا يَسْتَضْعِفُ طَائِفَةً مِنْهُمْ يُذَبِّحُ أَبْنَاءَهُمْ وَيَسْتَحْيِي نِسَاءَهُمْ ۚ إِنَّهُ كَانَ مِنَ الْمُفْسِدِينَ',
      translation:
        'Indeed, Pharaoh exalted himself in the land and made its people into factions, oppressing a sector among them, slaughtering their [newborn] sons and keeping their females alive. Indeed, he was of the corrupters.',
    },
  },
  {
    id: 'q111',
    prophet: 'musa',
    level: 'normal',
    question: "Whom did Musa's mother send to follow the chest along the river?",
    answers: ['His sister', 'His brother', 'His father', 'A servant'],
    right: 0,
    reference: "Qur'an 28:11",
    verse: {
      reference: "Qur'an 28:11",
      verseArabic:
        'وَقَالَتْ لِأُخْتِهِ قُصِّيهِ ۖ فَبَصُرَتْ بِهِ عَنْ جُنُبٍ وَهُمْ لَا يَشْعُرُونَ',
      translation:
        'And she said to his sister, "Follow him"; so she watched him from a distance while they perceived not.',
    },
  },
  {
    id: 'q112',
    prophet: 'musa',
    level: 'normal',
    question: 'Why was the infant Musa returned to his mother?',
    answers: [
      'He refused every other wet nurse',
      'Pharaoh ordered it',
      "Pharaoh's wife grew tired of him",
      'An angel carried him back',
    ],
    right: 0,
    reference: "Qur'an 28:12",
    verse: {
      reference: "Qur'an 28:12",
      verseArabic:
        '۞ وَحَرَّمْنَا عَلَيْهِ الْمَرَاضِعَ مِنْ قَبْلُ فَقَالَتْ هَلْ أَدُلُّكُمْ عَلَىٰ أَهْلِ بَيْتٍ يَكْفُلُونَهُ لَكُمْ وَهُمْ لَهُ نَاصِحُونَ',
      translation:
        'And We had prevented from him [all] wet nurses before, so she said, "Shall I direct you to a household that will be responsible for him for you while they are to him [for his upbringing] sincere."',
    },
  },
  {
    id: 'q113',
    prophet: 'musa',
    level: 'hard',
    question: 'What did Musa say after the man he struck died?',
    answers: [
      '"This is from the work of Satan"',
      '"He deserved it"',
      '"No one saw me"',
      '"Pharaoh will reward me"',
    ],
    right: 0,
    reference: "Qur'an 28:15",
    verse: {
      reference: "Qur'an 28:15",
      verseArabic:
        'وَدَخَلَ الْمَدِينَةَ عَلَىٰ حِينِ غَفْلَةٍ مِنْ أَهْلِهَا فَوَجَدَ فِيهَا رَجُلَيْنِ يَقْتَتِلَانِ هَٰذَا مِنْ شِيعَتِهِ وَهَٰذَا مِنْ عَدُوِّهِ ۖ فَاسْتَغَاثَهُ الَّذِي مِنْ شِيعَتِهِ عَلَى الَّذِي مِنْ عَدُوِّهِ فَوَكَزَهُ مُوسَىٰ فَقَضَىٰ عَلَيْهِ ۖ قَالَ هَٰذَا مِنْ عَمَلِ الشَّيْطَانِ ۖ إِنَّهُ عَدُوٌّ مُضِلٌّ مُبِينٌ',
      translation:
        'And he entered the city at a time of inattention by its people and found therein two men fighting: one from his faction and one from among his enemy. And the one from his faction called for help to him against the one from his enemy, so Musa struck him and [unintentionally] killed him. [Musa] said, "This is from the work of Satan. Indeed, he is a manifest, misleading enemy."',
    },
  },
  {
    id: 'q114',
    prophet: 'musa',
    level: 'normal',
    question: 'Who warned Musa that the chiefs planned to kill him?',
    answers: [
      'A man who came running from the far end of the city',
      'His sister',
      "Pharaoh's wife",
      'An angel in a dream',
    ],
    right: 0,
    reference: "Qur'an 28:20",
    verse: {
      reference: "Qur'an 28:20",
      verseArabic:
        'وَجَاءَ رَجُلٌ مِنْ أَقْصَى الْمَدِينَةِ يَسْعَىٰ قَالَ يَا مُوسَىٰ إِنَّ الْمَلَأَ يَأْتَمِرُونَ بِكَ لِيَقْتُلُوكَ فَاخْرُجْ إِنِّي لَكَ مِنَ النَّاصِحِينَ',
      translation:
        'And a man came from the farthest end of the city, running. He said, "O Musa, indeed the eminent ones are conferring over you [intending] to kill you, so leave [the city]; indeed, I am to you of the sincere advisors."',
    },
  },
  {
    id: 'q115',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Musa do for the two women at the well of Madyan?',
    answers: [
      'He watered their flocks',
      'He carried their water home',
      'He built them a house',
      'He found their lost sheep',
    ],
    right: 0,
    reference: "Qur'an 28:24",
    verse: {
      reference: "Qur'an 28:24",
      verseArabic:
        'فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰ إِلَى الظِّلِّ فَقَالَ رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
      translation:
        'So he watered [their flocks] for them; then he went back to the shade and said, "My Lord, indeed I am, for whatever good You would send down to me, in need."',
    },
  },
  {
    id: 'q116',
    prophet: 'musa',
    level: 'normal',
    question: 'What did one of the women say about Musa to her father?',
    answers: [
      '"The best one you can hire is the strong and the trustworthy"',
      '"He is a prince of Egypt"',
      '"He is a magician"',
      '"He is a runaway slave"',
    ],
    right: 0,
    reference: "Qur'an 28:26",
    verse: {
      reference: "Qur'an 28:26",
      verseArabic:
        'قَالَتْ إِحْدَاهُمَا يَا أَبَتِ اسْتَأْجِرْهُ ۖ إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ',
      translation:
        'One of the women said, "O my father, hire him. Indeed, the best one you can hire is the strong and the trustworthy."',
    },
  },
  {
    id: 'q117',
    prophet: 'musa',
    level: 'easy',
    question: 'What did Allah tell Musa to remove in the sacred valley?',
    answers: ['His sandals', 'His cloak', 'His turban', 'His ring'],
    right: 0,
    reference: "Qur'an 20:12",
    verse: {
      reference: "Qur'an 20:12",
      verseArabic:
        'إِنِّي أَنَا رَبُّكَ فَاخْلَعْ نَعْلَيْكَ ۖ إِنَّكَ بِالْوَادِ الْمُقَدَّسِ طُوًى',
      translation:
        'Indeed, I am your Lord, so remove your sandals. Indeed, you are in the sacred valley of Tuwa.',
    },
  },
  {
    id: 'q118',
    prophet: 'musa',
    level: 'hard',
    question: 'What did Musa say he used his staff for?',
    answers: [
      'Leaning on and bringing down leaves for his sheep',
      'Fighting wild animals',
      'Drawing water',
      'Measuring land',
    ],
    right: 0,
    reference: "Qur'an 20:18",
    verse: {
      reference: "Qur'an 20:18",
      verseArabic:
        'قَالَ هِيَ عَصَايَ أَتَوَكَّأُ عَلَيْهَا وَأَهُشُّ بِهَا عَلَىٰ غَنَمِي وَلِيَ فِيهَا مَآرِبُ أُخْرَىٰ',
      translation:
        'He said, "It is my staff; I lean upon it, and I bring down leaves for my sheep and I have therein other uses."',
    },
  },
  {
    id: 'q119',
    prophet: 'musa',
    level: 'easy',
    question: "What happened to Musa's hand when he drew it from his garment?",
    answers: [
      'It came out white without disease',
      'It turned to gold',
      'It glowed like fire',
      'It became invisible',
    ],
    right: 0,
    reference: "Qur'an 20:22",
    verse: {
      reference: "Qur'an 20:22",
      verseArabic:
        'وَاضْمُمْ يَدَكَ إِلَىٰ جَنَاحِكَ تَخْرُجْ بَيْضَاءَ مِنْ غَيْرِ سُوءٍ آيَةً أُخْرَىٰ',
      translation:
        'And draw in your hand to your side; it will come out white without disease - another sign.',
    },
  },
  {
    id: 'q120',
    prophet: 'musa',
    level: 'normal',
    question: 'How were Musa and Harun told to speak to Pharaoh?',
    answers: ['With gentle speech', 'With harsh words', 'Only in writing', 'Through his ministers'],
    right: 0,
    reference: "Qur'an 20:44",
    verse: {
      reference: "Qur'an 20:44",
      verseArabic: 'فَقُولَا لَهُ قَوْلًا لَيِّنًا لَعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ',
      translation:
        'And speak to him with gentle speech that perhaps he may be reminded or fear [Allah].',
    },
  },
  {
    id: 'q121',
    prophet: 'musa',
    level: 'easy',
    question: 'Whom did Pharaoh tell to build him a tower?',
    answers: ['Haman', 'Qarun', 'The Samiri', 'Musa'],
    right: 0,
    reference: "Qur'an 28:38",
    verse: {
      reference: "Qur'an 28:38",
      verseArabic:
        'وَقَالَ فِرْعَوْنُ يَا أَيُّهَا الْمَلَأُ مَا عَلِمْتُ لَكُمْ مِنْ إِلَٰهٍ غَيْرِي فَأَوْقِدْ لِي يَا هَامَانُ عَلَى الطِّينِ فَاجْعَلْ لِي صَرْحًا لَعَلِّي أَطَّلِعُ إِلَىٰ إِلَٰهِ مُوسَىٰ وَإِنِّي لَأَظُنُّهُ مِنَ الْكَاذِبِينَ',
      translation:
        'And Pharaoh said, "O eminent ones, I have not known you to have a god other than me. Then ignite for me, O Haman, [a fire] upon the clay and make for me a tower that I may look at the God of Musa. And indeed, I do think he is among the liars."',
    },
  },
  {
    id: 'q122',
    prophet: 'musa',
    level: 'normal',
    question: "Which of these was among the signs sent upon Pharaoh's people?",
    answers: ['Locusts', 'Snow', 'An earthquake', 'A comet'],
    right: 0,
    reference: "Qur'an 7:133",
    verse: {
      reference: "Qur'an 7:133",
      verseArabic:
        'فَأَرْسَلْنَا عَلَيْهِمُ الطُّوفَانَ وَالْجَرَادَ وَالْقُمَّلَ وَالضَّفَادِعَ وَالدَّمَ آيَاتٍ مُفَصَّلَاتٍ فَاسْتَكْبَرُوا وَكَانُوا قَوْمًا مُجْرِمِينَ',
      translation:
        'So We sent upon them the flood and locusts and lice and frogs and blood as distinct signs, but they were arrogant and were a criminal people.',
    },
  },
  {
    id: 'q123',
    prophet: 'musa',
    level: 'normal',
    question: "What did the companions of Musa say when they saw Pharaoh's army?",
    answers: [
      '"Indeed, we are to be overtaken"',
      '"Let us fight"',
      '"Let us return to Egypt"',
      '"Let us hide in the mountains"',
    ],
    right: 0,
    reference: "Qur'an 26:61",
    verse: {
      reference: "Qur'an 26:61",
      verseArabic: 'فَلَمَّا تَرَاءَى الْجَمْعَانِ قَالَ أَصْحَابُ مُوسَىٰ إِنَّا لَمُدْرَكُونَ',
      translation:
        'And when the two companies saw one another, the companions of Musa said, "Indeed, we are to be overtaken."',
    },
  },
  {
    id: 'q124',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Pharaoh say as he was drowning?',
    answers: [
      'That he believed in the God of the Children of Israel',
      'That he was the greatest lord',
      'That Musa was a magician',
      'Nothing at all',
    ],
    right: 0,
    reference: "Qur'an 10:90",
    verse: {
      reference: "Qur'an 10:90",
      verseArabic:
        '۞ وَجَاوَزْنَا بِبَنِي إِسْرَائِيلَ الْبَحْرَ فَأَتْبَعَهُمْ فِرْعَوْنُ وَجُنُودُهُ بَغْيًا وَعَدْوًا ۖ حَتَّىٰ إِذَا أَدْرَكَهُ الْغَرَقُ قَالَ آمَنْتُ أَنَّهُ لَا إِلَٰهَ إِلَّا الَّذِي آمَنَتْ بِهِ بَنُو إِسْرَائِيلَ وَأَنَا مِنَ الْمُسْلِمِينَ',
      translation:
        'And We took the Children of Israel across the sea, and Pharaoh and his soldiers pursued them in tyranny and enmity until, when drowning overtook him, he said, "I believe that there is no deity except that in whom the Children of Israel believe, and I am of the Muslims."',
    },
  },
  {
    id: 'q125',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Allah say He would save of Pharaoh?',
    answers: ['His body, as a sign', 'His kingdom', 'His army', 'His treasures'],
    right: 0,
    reference: "Qur'an 10:92",
    verse: {
      reference: "Qur'an 10:92",
      verseArabic:
        'فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً ۚ وَإِنَّ كَثِيرًا مِنَ النَّاسِ عَنْ آيَاتِنَا لَغَافِلُونَ',
      translation:
        'So today We will save you in body that you may be to those who succeed you a sign. And indeed, many among the people, of Our signs, are heedless.',
    },
  },
  {
    id: 'q126',
    prophet: 'musa',
    level: 'normal',
    question: "Why did the Prophet ﷺ fast on 'Ashura?",
    answers: [
      'Allah saved Musa on that day',
      'It was the day of Badr',
      'Ibrahim was born on it',
      'It was the first day of Ramadan',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3397',
  },
  {
    id: 'q127',
    prophet: 'musa',
    level: 'normal',
    question: 'What happened to the mountain when Allah appeared to it?',
    answers: ['It was levelled', 'It split in two', 'It turned to gold', 'It rose into the sky'],
    right: 0,
    reference: "Qur'an 7:143",
    verse: {
      reference: "Qur'an 7:143",
      verseArabic:
        'وَلَمَّا جَاءَ مُوسَىٰ لِمِيقَاتِنَا وَكَلَّمَهُ رَبُّهُ قَالَ رَبِّ أَرِنِي أَنْظُرْ إِلَيْكَ ۚ قَالَ لَنْ تَرَانِي وَلَٰكِنِ انْظُرْ إِلَى الْجَبَلِ فَإِنِ اسْتَقَرَّ مَكَانَهُ فَسَوْفَ تَرَانِي ۚ فَلَمَّا تَجَلَّىٰ رَبُّهُ لِلْجَبَلِ جَعَلَهُ دَكًّا وَخَرَّ مُوسَىٰ صَعِقًا ۚ فَلَمَّا أَفَاقَ قَالَ سُبْحَانَكَ تُبْتُ إِلَيْكَ وَأَنَا أَوَّلُ الْمُؤْمِنِينَ',
      translation:
        'And when Musa arrived at Our appointed time and his Lord spoke to him, he said, "My Lord, show me [Yourself] that I may look at You." [Allah] said, "You will not see Me, but look at the mountain; if it should remain in place, then you will see Me." But when his Lord appeared to the mountain, He rendered it level, and Musa fell unconscious. And when he awoke, he said, "Exalted are You! I have repented to You, and I am the first of the believers."',
    },
  },
  {
    id: 'q128',
    prophet: 'musa',
    level: 'easy',
    question: 'What did Musa do with the Tablets when he found his people worshipping the calf?',
    answers: [
      'He threw them down',
      'He buried them',
      'He gave them to Harun',
      'He hid them in the mountain',
    ],
    right: 0,
    reference: "Qur'an 7:150",
    verse: {
      reference: "Qur'an 7:150",
      verseArabic:
        'وَلَمَّا رَجَعَ مُوسَىٰ إِلَىٰ قَوْمِهِ غَضْبَانَ أَسِفًا قَالَ بِئْسَمَا خَلَفْتُمُونِي مِنْ بَعْدِي ۖ أَعَجِلْتُمْ أَمْرَ رَبِّكُمْ ۖ وَأَلْقَى الْأَلْوَاحَ وَأَخَذَ بِرَأْسِ أَخِيهِ يَجُرُّهُ إِلَيْهِ ۚ قَالَ ابْنَ أُمَّ إِنَّ الْقَوْمَ اسْتَضْعَفُونِي وَكَادُوا يَقْتُلُونَنِي فَلَا تُشْمِتْ بِيَ الْأَعْدَاءَ وَلَا تَجْعَلْنِي مَعَ الْقَوْمِ الظَّالِمِينَ',
      translation:
        'And when Musa returned to his people, angry and grieved, he said, "How wretched is that by which you have replaced me after [my departure]. Were you impatient over the matter of your Lord?" And he threw down the tablets and seized his brother by [the hair of] his head, pulling him toward him. [Harun] said, "O son of my mother, indeed the people oppressed me and were about to kill me, so let not the enemies rejoice over me and do not place me among the wrongdoing people."',
    },
  },
  {
    id: 'q129',
    prophet: 'musa',
    level: 'hard',
    question: 'What did the Samiri say he threw to make the calf?',
    answers: [
      'A handful of dust from the track of the messenger',
      "Gold from Pharaoh's treasury",
      'A stone from the mountain',
      'Water from the sea',
    ],
    right: 0,
    reference: "Qur'an 20:96",
    verse: {
      reference: "Qur'an 20:96",
      verseArabic:
        'قَالَ بَصُرْتُ بِمَا لَمْ يَبْصُرُوا بِهِ فَقَبَضْتُ قَبْضَةً مِنْ أَثَرِ الرَّسُولِ فَنَبَذْتُهَا وَكَذَٰلِكَ سَوَّلَتْ لِي نَفْسِي',
      translation:
        'He said, "I saw what they did not see, so I took a handful [of dust] from the track of the messenger and threw it, and thus did my soul entice me."',
    },
  },
  {
    id: 'q130',
    prophet: 'musa',
    level: 'easy',
    question: 'What did Allah send down to the Children of Israel to eat in the wilderness?',
    answers: ['Manna and quails', 'Bread and fish', 'Dates and milk', 'Grapes and figs'],
    right: 0,
    reference: "Qur'an 2:57",
    verse: {
      reference: "Qur'an 2:57",
      verseArabic:
        'وَظَلَّلْنَا عَلَيْكُمُ الْغَمَامَ وَأَنْزَلْنَا عَلَيْكُمُ الْمَنَّ وَالسَّلْوَىٰ ۖ كُلُوا مِنْ طَيِّبَاتِ مَا رَزَقْنَاكُمْ ۖ وَمَا ظَلَمُونَا وَلَٰكِنْ كَانُوا أَنْفُسَهُمْ يَظْلِمُونَ',
      translation:
        'And We shaded you with clouds and sent down to you manna and quails, [saying], "Eat from the good things with which We have provided you." And they wronged Us not - but they were [only] wronging themselves.',
    },
  },
  {
    id: 'q131',
    prophet: 'musa',
    level: 'normal',
    question: 'Whom was Musa looking for at the junction of the two seas?',
    answers: [
      'A servant of Allah with knowledge from Him',
      'His lost brother',
      "Pharaoh's treasure",
      'The well of Madyan',
    ],
    right: 0,
    reference: "Qur'an 18:65",
    verse: {
      reference: "Qur'an 18:65",
      verseArabic:
        'فَوَجَدَا عَبْدًا مِنْ عِبَادِنَا آتَيْنَاهُ رَحْمَةً مِنْ عِنْدِنَا وَعَلَّمْنَاهُ مِنْ لَدُنَّا عِلْمًا',
      translation:
        'And they found a servant from among Our servants to whom we had given mercy from us and had taught him from Us a [certain] knowledge.',
    },
  },
  {
    id: 'q132',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Musa and his servant lose at the rock?',
    answers: ['Their fish', 'Their water skin', 'Their staff', 'Their way'],
    right: 0,
    reference: "Qur'an 18:63",
    verse: {
      reference: "Qur'an 18:63",
      verseArabic:
        'قَالَ أَرَأَيْتَ إِذْ أَوَيْنَا إِلَى الصَّخْرَةِ فَإِنِّي نَسِيتُ الْحُوتَ وَمَا أَنْسَانِيهُ إِلَّا الشَّيْطَانُ أَنْ أَذْكُرَهُ ۚ وَاتَّخَذَ سَبِيلَهُ فِي الْبَحْرِ عَجَبًا',
      translation:
        'He said, "Did you see when we retired to the rock? Indeed, I forgot [there] the fish. And none made me forget it except Satan - that I should mention it. And it took its course into the sea amazingly."',
    },
  },
  {
    id: 'q133',
    prophet: 'musa',
    level: 'normal',
    question: 'Why did al-Khidr damage the ship?',
    answers: [
      'A king was seizing every sound ship',
      'Its owners were thieves',
      'It was carrying idols',
      'It was about to sink',
    ],
    right: 0,
    reference: "Qur'an 18:79",
    verse: {
      reference: "Qur'an 18:79",
      verseArabic:
        'أَمَّا السَّفِينَةُ فَكَانَتْ لِمَسَاكِينَ يَعْمَلُونَ فِي الْبَحْرِ فَأَرَدْتُ أَنْ أَعِيبَهَا وَكَانَ وَرَاءَهُمْ مَلِكٌ يَأْخُذُ كُلَّ سَفِينَةٍ غَصْبًا',
      translation:
        'As for the ship, it belonged to poor people working at sea. So I intended to cause defect in it as there was after them a king who seized every [good] ship by force.',
    },
  },
  {
    id: 'q134',
    prophet: 'musa',
    level: 'normal',
    question: 'What was under the wall that al-Khidr rebuilt?',
    answers: ['A treasure belonging to two orphans', 'A grave', 'A spring of water', 'An idol'],
    right: 0,
    reference: "Qur'an 18:82",
    verse: {
      reference: "Qur'an 18:82",
      verseArabic:
        'وَأَمَّا الْجِدَارُ فَكَانَ لِغُلَامَيْنِ يَتِيمَيْنِ فِي الْمَدِينَةِ وَكَانَ تَحْتَهُ كَنْزٌ لَهُمَا وَكَانَ أَبُوهُمَا صَالِحًا فَأَرَادَ رَبُّكَ أَنْ يَبْلُغَا أَشُدَّهُمَا وَيَسْتَخْرِجَا كَنْزَهُمَا رَحْمَةً مِنْ رَبِّكَ ۚ وَمَا فَعَلْتُهُ عَنْ أَمْرِي ۚ ذَٰلِكَ تَأْوِيلُ مَا لَمْ تَسْطِعْ عَلَيْهِ صَبْرًا',
      translation:
        'And as for the wall, it belonged to two orphan boys in the city, and there was beneath it a treasure for them, and their father had been righteous. So your Lord intended that they reach maturity and extract their treasure, as a mercy from your Lord. And I did it not of my own accord. That is the interpretation of that about which you could not have patience.',
    },
  },
  {
    id: 'q135',
    prophet: 'musa',
    level: 'hard',
    question: 'What did Qarun say his wealth came from?',
    answers: ['Knowledge he had', 'His father', 'A gift from Pharaoh', 'Trade with Madyan'],
    right: 0,
    reference: "Qur'an 28:78",
    verse: {
      reference: "Qur'an 28:78",
      verseArabic:
        'قَالَ إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِنْدِي ۚ أَوَلَمْ يَعْلَمْ أَنَّ اللَّهَ قَدْ أَهْلَكَ مِنْ قَبْلِهِ مِنَ الْقُرُونِ مَنْ هُوَ أَشَدُّ مِنْهُ قُوَّةً وَأَكْثَرُ جَمْعًا ۚ وَلَا يُسْأَلُ عَنْ ذُنُوبِهِمُ الْمُجْرِمُونَ',
      translation:
        'He said, "I was only given it because of knowledge I have." Did he not know that Allah had destroyed before him of generations those who were greater than him in power and greater in accumulation [of wealth]? But the criminals, about their sins, will not be asked.',
    },
  },
  {
    id: 'q136',
    prophet: 'musa',
    level: 'hard',
    question: 'Where is the grave of Musa, according to the Prophet ﷺ?',
    answers: ['By the way near the red sand hill', 'In Egypt', 'On Mount Sinai', 'In Madyan'],
    right: 0,
    reference: 'Sahih Bukhari 1339',
  },
  {
    id: 'q137',
    prophet: 'yusuf',
    level: 'normal',
    question: "What did Ya'qub tell Yusuf to do about his dream?",
    answers: ['Not to tell his brothers', 'Tell the whole family', 'Write it down', 'Forget it'],
    right: 0,
    reference: "Qur'an 12:5",
    verse: {
      reference: "Qur'an 12:5",
      verseArabic:
        'قَالَ يَا بُنَيَّ لَا تَقْصُصْ رُؤْيَاكَ عَلَىٰ إِخْوَتِكَ فَيَكِيدُوا لَكَ كَيْدًا ۖ إِنَّ الشَّيْطَانَ لِلْإِنْسَانِ عَدُوٌّ مُبِينٌ',
      translation:
        'He said, "O my son, do not relate your vision to your brothers or they will contrive against you a plan. Indeed Satan, to man, is a manifest enemy."',
    },
  },
  {
    id: 'q138',
    prophet: 'yusuf',
    level: 'normal',
    question: "What did the brothers bring back on Yusuf's shirt?",
    answers: ['False blood', 'Mud', "A wolf's hair", 'Nothing'],
    right: 0,
    reference: "Qur'an 12:18",
    verse: {
      reference: "Qur'an 12:18",
      verseArabic:
        'وَجَاءُوا عَلَىٰ قَمِيصِهِ بِدَمٍ كَذِبٍ ۚ قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنْفُسُكُمْ أَمْرًا ۖ فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ',
      translation:
        'And they brought upon his shirt false blood. [Ya‘qub] said, "Rather, your souls have enticed you to something, so patience is most fitting. And Allah is the one sought for help against that which you describe."',
    },
  },
  {
    id: 'q139',
    prophet: 'yusuf',
    level: 'easy',
    question: 'For how much was Yusuf sold?',
    answers: ['A few dirhams', 'A thousand dinars', 'Ten camels', 'His weight in gold'],
    right: 0,
    reference: "Qur'an 12:20",
    verse: {
      reference: "Qur'an 12:20",
      verseArabic:
        'وَشَرَوْهُ بِثَمَنٍ بَخْسٍ دَرَاهِمَ مَعْدُودَةٍ وَكَانُوا فِيهِ مِنَ الزَّاهِدِينَ',
      translation:
        'And they sold him for a reduced price - a few dirhams - and they were, concerning him, of those content with little.',
    },
  },
  {
    id: 'q140',
    prophet: 'yusuf',
    level: 'normal',
    question: 'Who bought Yusuf?',
    answers: ['A man from Egypt', 'Pharaoh', 'A man from Madyan', "The king of Saba'"],
    right: 0,
    reference: "Qur'an 12:21",
    verse: {
      reference: "Qur'an 12:21",
      verseArabic:
        'وَقَالَ الَّذِي اشْتَرَاهُ مِنْ مِصْرَ لِامْرَأَتِهِ أَكْرِمِي مَثْوَاهُ عَسَىٰ أَنْ يَنْفَعَنَا أَوْ نَتَّخِذَهُ وَلَدًا ۚ وَكَذَٰلِكَ مَكَّنَّا لِيُوسُفَ فِي الْأَرْضِ وَلِنُعَلِّمَهُ مِنْ تَأْوِيلِ الْأَحَادِيثِ ۚ وَاللَّهُ غَالِبٌ عَلَىٰ أَمْرِهِ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ',
      translation:
        'And the one from Egypt who bought him said to his wife, "Make his residence comfortable. Perhaps he will benefit us, or we will adopt him as a son." And thus, We established Yusuf in the land that We might teach him the interpretation of events. And Allah is predominant over His affair, but most of the people do not know.',
    },
  },
  {
    id: 'q141',
    prophet: 'yusuf',
    level: 'normal',
    question: 'What did Yusuf say when the woman closed the doors?',
    answers: [
      '"I seek the refuge of Allah"',
      '"Open the doors"',
      '"I will tell your husband"',
      '"I am a prophet"',
    ],
    right: 0,
    reference: "Qur'an 12:23",
    verse: {
      reference: "Qur'an 12:23",
      verseArabic:
        'وَرَاوَدَتْهُ الَّتِي هُوَ فِي بَيْتِهَا عَنْ نَفْسِهِ وَغَلَّقَتِ الْأَبْوَابَ وَقَالَتْ هَيْتَ لَكَ ۚ قَالَ مَعَاذَ اللَّهِ ۖ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ ۖ إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ',
      translation:
        'And she, in whose house he was, sought to seduce him. She closed the doors and said, "Come, you." He said, "[I seek] the refuge of Allah. Indeed, he is my master, who has made good my residence. Indeed, wrongdoers will not succeed."',
    },
  },
  {
    id: 'q142',
    prophet: 'yusuf',
    level: 'easy',
    question: 'What did Yusuf say he preferred to what the women invited him to?',
    answers: ['Prison', 'Exile', 'Death', 'The desert'],
    right: 0,
    reference: "Qur'an 12:33",
    verse: {
      reference: "Qur'an 12:33",
      verseArabic:
        'قَالَ رَبِّ السِّجْنُ أَحَبُّ إِلَيَّ مِمَّا يَدْعُونَنِي إِلَيْهِ ۖ وَإِلَّا تَصْرِفْ عَنِّي كَيْدَهُنَّ أَصْبُ إِلَيْهِنَّ وَأَكُنْ مِنَ الْجَاهِلِينَ',
      translation:
        'He said, "My Lord, prison is more to my liking than that to which they invite me. And if You do not avert from me their plan, I might incline toward them and [thus] be of the ignorant."',
    },
  },
  {
    id: 'q143',
    prophet: 'yusuf',
    level: 'hard',
    question: 'What did one prisoner dream he was carrying on his head?',
    answers: ['Bread that birds were eating from', 'A crown', 'A jar of water', 'A stone'],
    right: 0,
    reference: "Qur'an 12:36",
    verse: {
      reference: "Qur'an 12:36",
      verseArabic:
        'وَدَخَلَ مَعَهُ السِّجْنَ فَتَيَانِ ۖ قَالَ أَحَدُهُمَا إِنِّي أَرَانِي أَعْصِرُ خَمْرًا ۖ وَقَالَ الْآخَرُ إِنِّي أَرَانِي أَحْمِلُ فَوْقَ رَأْسِي خُبْزًا تَأْكُلُ الطَّيْرُ مِنْهُ ۖ نَبِّئْنَا بِتَأْوِيلِهِ ۖ إِنَّا نَرَاكَ مِنَ الْمُحْسِنِينَ',
      translation:
        'And there entered the prison with him two young men. One of them said, "Indeed, I have seen myself [in a dream] pressing wine." The other said, "Indeed, I have seen myself carrying upon my head [some] bread, from which the birds were eating. Inform us of its interpretation; indeed, we see you to be of those who do good."',
    },
  },
  {
    id: 'q144',
    prophet: 'yusuf',
    level: 'normal',
    question: 'Why did Yusuf stay in prison several years?',
    answers: [
      'The freed prisoner forgot to mention him',
      'The king refused to free him',
      'He chose to stay',
      'His brothers paid the guards',
    ],
    right: 0,
    reference: "Qur'an 12:42",
    verse: {
      reference: "Qur'an 12:42",
      verseArabic:
        'وَقَالَ لِلَّذِي ظَنَّ أَنَّهُ نَاجٍ مِنْهُمَا اذْكُرْنِي عِنْدَ رَبِّكَ فَأَنْسَاهُ الشَّيْطَانُ ذِكْرَ رَبِّهِ فَلَبِثَ فِي السِّجْنِ بِضْعَ سِنِينَ',
      translation:
        'And he said to the one whom he knew would go free, "Mention me before your master." But Satan made him forget the mention [to] his master, and Yusuf remained in prison several years.',
    },
  },
  {
    id: 'q145',
    prophet: 'yusuf',
    level: 'normal',
    question: 'What did Yusuf ask before leaving prison?',
    answers: [
      'That the king ask about the women who cut their hands',
      'For a horse',
      'For his brothers to be brought',
      "For the wife of al-'Aziz to be punished",
    ],
    right: 0,
    reference: "Qur'an 12:50",
    verse: {
      reference: "Qur'an 12:50",
      verseArabic:
        'وَقَالَ الْمَلِكُ ائْتُونِي بِهِ ۖ فَلَمَّا جَاءَهُ الرَّسُولُ قَالَ ارْجِعْ إِلَىٰ رَبِّكَ فَاسْأَلْهُ مَا بَالُ النِّسْوَةِ اللَّاتِي قَطَّعْنَ أَيْدِيَهُنَّ ۚ إِنَّ رَبِّي بِكَيْدِهِنَّ عَلِيمٌ',
      translation:
        'And the king said, "Bring him to me." But when the messenger came to him, [Yusuf] said, "Return to your master and ask him what is the case of the women who cut their hands. Indeed, my Lord is Knowing of their plan."',
    },
  },
  {
    id: 'q146',
    prophet: 'yusuf',
    level: 'normal',
    question: "What did the wife of al-'Aziz finally admit?",
    answers: [
      '"It was I who sought to seduce him"',
      '"He attacked me"',
      '"I do not remember"',
      '"My husband was to blame"',
    ],
    right: 0,
    reference: "Qur'an 12:51",
    verse: {
      reference: "Qur'an 12:51",
      verseArabic:
        'قَالَ مَا خَطْبُكُنَّ إِذْ رَاوَدْتُنَّ يُوسُفَ عَنْ نَفْسِهِ ۚ قُلْنَ حَاشَ لِلَّهِ مَا عَلِمْنَا عَلَيْهِ مِنْ سُوءٍ ۚ قَالَتِ امْرَأَتُ الْعَزِيزِ الْآنَ حَصْحَصَ الْحَقُّ أَنَا رَاوَدْتُهُ عَنْ نَفْسِهِ وَإِنَّهُ لَمِنَ الصَّادِقِينَ',
      translation:
        'Said [the king to the women], "What was your condition when you sought to seduce Yusuf?" They said, "Perfect is Allah! We know about him no evil." The wife of al-’Azeez said, "Now the truth has become evident. It was I who sought to seduce him, and indeed, he is of the truthful."',
    },
  },
  {
    id: 'q147',
    prophet: 'yusuf',
    level: 'hard',
    question: "Why did Ya'qub tell his sons to enter the city by different gates?",
    answers: [
      'He feared for them, but relied on Allah',
      'To avoid paying taxes',
      'To find Yusuf faster',
      'To hide from the king',
    ],
    right: 0,
    reference: "Qur'an 12:67",
    verse: {
      reference: "Qur'an 12:67",
      verseArabic:
        'وَقَالَ يَا بَنِيَّ لَا تَدْخُلُوا مِنْ بَابٍ وَاحِدٍ وَادْخُلُوا مِنْ أَبْوَابٍ مُتَفَرِّقَةٍ ۖ وَمَا أُغْنِي عَنْكُمْ مِنَ اللَّهِ مِنْ شَيْءٍ ۖ إِنِ الْحُكْمُ إِلَّا لِلَّهِ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَعَلَيْهِ فَلْيَتَوَكَّلِ الْمُتَوَكِّلُونَ',
      translation:
        'And he said, "O my sons, do not enter from one gate but enter from different gates; and I cannot avail you against [the decree of] Allah at all. The decision is only for Allah; upon Him I have relied, and upon Him let those who would rely [indeed] rely."',
    },
  },
  {
    id: 'q148',
    prophet: 'yusuf',
    level: 'hard',
    question: 'What did the brothers say when the bowl was found?',
    answers: [
      '"If he steals - a brother of his has stolen before"',
      '"Take all of us"',
      '"It is a mistake"',
      '"Punish the king\'s servant"',
    ],
    right: 0,
    reference: "Qur'an 12:77",
    verse: {
      reference: "Qur'an 12:77",
      verseArabic:
        '۞ قَالُوا إِنْ يَسْرِقْ فَقَدْ سَرَقَ أَخٌ لَهُ مِنْ قَبْلُ ۚ فَأَسَرَّهَا يُوسُفُ فِي نَفْسِهِ وَلَمْ يُبْدِهَا لَهُمْ ۚ قَالَ أَنْتُمْ شَرٌّ مَكَانًا ۖ وَاللَّهُ أَعْلَمُ بِمَا تَصِفُونَ',
      translation:
        'They said, "If he steals - a brother of his has stolen before." But Yusuf kept it within himself and did not reveal it to them. He said, "You are worse in position, and Allah is most knowing of what you describe."',
    },
  },
  {
    id: 'q149',
    prophet: 'yusuf',
    level: 'normal',
    question: "What happened to Ya'qub's eyes from grief?",
    answers: [
      'They became white',
      'They became blind and red',
      'They never closed',
      'Nothing happened to them',
    ],
    right: 0,
    reference: "Qur'an 12:84",
    verse: {
      reference: "Qur'an 12:84",
      verseArabic:
        'وَتَوَلَّىٰ عَنْهُمْ وَقَالَ يَا أَسَفَىٰ عَلَىٰ يُوسُفَ وَابْيَضَّتْ عَيْنَاهُ مِنَ الْحُزْنِ فَهُوَ كَظِيمٌ',
      translation:
        'And he turned away from them and said, "Oh, my sorrow over Yusuf," and his eyes became white from grief, for he was [of that] a suppressor.',
    },
  },
  {
    id: 'q150',
    prophet: 'yusuf',
    level: 'normal',
    question: "What did Ya'qub smell as the caravan left Egypt?",
    answers: ['The smell of Yusuf', 'Rain', 'The sea', 'Smoke'],
    right: 0,
    reference: "Qur'an 12:94",
    verse: {
      reference: "Qur'an 12:94",
      verseArabic:
        'وَلَمَّا فَصَلَتِ الْعِيرُ قَالَ أَبُوهُمْ إِنِّي لَأَجِدُ رِيحَ يُوسُفَ ۖ لَوْلَا أَنْ تُفَنِّدُونِ',
      translation:
        'And when the caravan departed [from Egypt], their father said, "Indeed, I find the smell of Yusuf [and would say that he was alive] if you did not think me weakened in mind."',
    },
  },
  {
    id: 'q151',
    prophet: 'yusuf',
    level: 'normal',
    question: 'Where did Yusuf raise his parents?',
    answers: ['Onto the throne', 'Onto a mountain', 'Onto a ship', 'Onto his horse'],
    right: 0,
    reference: "Qur'an 12:100",
    verse: {
      reference: "Qur'an 12:100",
      verseArabic:
        'وَرَفَعَ أَبَوَيْهِ عَلَى الْعَرْشِ وَخَرُّوا لَهُ سُجَّدًا ۖ وَقَالَ يَا أَبَتِ هَٰذَا تَأْوِيلُ رُؤْيَايَ مِنْ قَبْلُ قَدْ جَعَلَهَا رَبِّي حَقًّا ۖ وَقَدْ أَحْسَنَ بِي إِذْ أَخْرَجَنِي مِنَ السِّجْنِ وَجَاءَ بِكُمْ مِنَ الْبَدْوِ مِنْ بَعْدِ أَنْ نَزَغَ الشَّيْطَانُ بَيْنِي وَبَيْنَ إِخْوَتِي ۚ إِنَّ رَبِّي لَطِيفٌ لِمَا يَشَاءُ ۚ إِنَّهُ هُوَ الْعَلِيمُ الْحَكِيمُ',
      translation:
        'And he raised his parents upon the throne, and they bowed to him in prostration. And he said, "O my father, this is the explanation of my vision of before. My Lord has made it reality. And He was certainly good to me when He took me out of prison and brought you [here] from bedouin life after Satan had induced [estrangement] between me and my brothers. Indeed, my Lord is Subtle in what He wills. Indeed, it is He who is the Knowing, the Wise."',
    },
  },
  {
    id: 'q152',
    prophet: 'ibrahim',
    level: 'hard',
    question: "What was the name of Ibrahim's father in the Qur'an?",
    answers: ['Azar', 'Imran', 'Haman', 'Talut'],
    right: 0,
    reference: "Qur'an 6:74",
    verse: {
      reference: "Qur'an 6:74",
      verseArabic:
        '۞ وَإِذْ قَالَ إِبْرَاهِيمُ لِأَبِيهِ آزَرَ أَتَتَّخِذُ أَصْنَامًا آلِهَةً ۖ إِنِّي أَرَاكَ وَقَوْمَكَ فِي ضَلَالٍ مُبِينٍ',
      translation:
        'And [mention, O Muhammad], when Ibrahim said to his father Azar, "Do you take idols as deities? Indeed, I see you and your people to be in manifest error."',
    },
  },
  {
    id: 'q153',
    prophet: 'ibrahim',
    level: 'normal',
    question: "What did Ibrahim's father threaten to do to him?",
    answers: ['Stone him', 'Burn him', 'Disown him in court', 'Sell him'],
    right: 0,
    reference: "Qur'an 19:46",
    verse: {
      reference: "Qur'an 19:46",
      verseArabic:
        'قَالَ أَرَاغِبٌ أَنْتَ عَنْ آلِهَتِي يَا إِبْرَاهِيمُ ۖ لَئِنْ لَمْ تَنْتَهِ لَأَرْجُمَنَّكَ ۖ وَاهْجُرْنِي مَلِيًّا',
      translation:
        '[His father] said, "Have you no desire for my gods, O Ibrahim? If you do not desist, I will surely stone you, so avoid me a prolonged time."',
    },
  },
  {
    id: 'q154',
    prophet: 'ibrahim',
    level: 'normal',
    question: 'What did Ibrahim say to his people about the idols when asked who broke them?',
    answers: [
      '"Rather, this one, the largest of them, did it"',
      '"An angel did it"',
      '"They broke themselves"',
      '"I do not know"',
    ],
    right: 0,
    reference: "Qur'an 21:63",
    verse: {
      reference: "Qur'an 21:63",
      verseArabic: 'قَالَ بَلْ فَعَلَهُ كَبِيرُهُمْ هَٰذَا فَاسْأَلُوهُمْ إِنْ كَانُوا يَنْطِقُونَ',
      translation:
        'He said, "Rather, this - the largest of them - did it, so ask them, if they should [be able to] speak."',
    },
  },
  {
    id: 'q155',
    prophet: 'ibrahim',
    level: 'hard',
    question: "What did Ibrahim say when he stayed behind from his people's festival?",
    answers: ['"I am ill"', '"I am tired"', '"I am fasting"', '"I am travelling"'],
    right: 0,
    reference: "Qur'an 37:89",
    verse: {
      reference: "Qur'an 37:89",
      verseArabic: 'فَقَالَ إِنِّي سَقِيمٌ',
      translation: 'And said, "Indeed, I am [about to be] ill."',
    },
  },
  {
    id: 'q156',
    prophet: 'ibrahim',
    level: 'hard',
    question: "What does the Qur'an call Ibrahim in 4:125?",
    answers: [
      'A close friend of Allah',
      'The father of all prophets',
      'The last messenger',
      'A king',
    ],
    right: 0,
    reference: "Qur'an 4:125",
    verse: {
      reference: "Qur'an 4:125",
      verseArabic:
        'وَمَنْ أَحْسَنُ دِينًا مِمَّنْ أَسْلَمَ وَجْهَهُ لِلَّهِ وَهُوَ مُحْسِنٌ وَاتَّبَعَ مِلَّةَ إِبْرَاهِيمَ حَنِيفًا ۗ وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا',
      translation:
        'And who is better in religion than one who submits himself to Allah while being a doer of good and follows the religion of Ibrahim, inclining toward truth? And Allah took Ibrahim as an intimate friend.',
    },
  },
  {
    id: 'q157',
    prophet: 'ibrahim',
    level: 'hard',
    question: 'Who was given to Sarah by the tyrant king, according to the hadith?',
    answers: ['Hajar', 'Maryam', 'Asiyah', 'Khadijah'],
    right: 0,
    reference: 'Sahih Bukhari 2217',
  },
  {
    id: 'q158',
    prophet: 'ibrahim',
    level: 'easy',
    question: 'Who did Ibrahim leave in the valley of Makkah?',
    answers: [
      "Hajar and the infant Isma'il",
      'Sarah and Ishaq',
      'Lut and his family',
      'His father Azar',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q159',
    prophet: 'ibrahim',
    level: 'normal',
    question: 'What did Hajar say when Ibrahim told her Allah had commanded him to leave them?',
    answers: [
      '"Then He will not neglect us"',
      '"Take us with you"',
      '"We will die here"',
      '"I will follow you"',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q160',
    prophet: 'ibrahim',
    level: 'hard',
    question:
      'Who will be the first to be clothed on the Day of Resurrection, according to the Prophet ﷺ?',
    answers: ['Ibrahim', 'Adam', 'Musa', 'Nuh'],
    right: 0,
    reference: 'Sahih Bukhari 3349',
  },
  {
    id: 'q161',
    prophet: 'ibrahim',
    level: 'normal',
    question: 'What was Ibrahim told to proclaim to the people?',
    answers: ['The Hajj', 'The Torah', 'A war', 'A fast'],
    right: 0,
    reference: "Qur'an 22:27",
    verse: {
      reference: "Qur'an 22:27",
      verseArabic:
        'وَأَذِّنْ فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِنْ كُلِّ فَجٍّ عَمِيقٍ',
      translation:
        'And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel; they will come from every distant pass.',
    },
  },
  {
    id: 'q162',
    prophet: 'muhammad',
    level: 'easy',
    question: 'At what age did the Prophet ﷺ begin to receive revelation?',
    answers: ['Forty', 'Twenty-five', 'Thirty', 'Fifty'],
    right: 0,
    reference: 'Sahih Bukhari 3902',
  },
  {
    id: 'q163',
    prophet: 'muhammad',
    level: 'easy',
    question: 'How many years did the Prophet ﷺ stay in Makkah after revelation began?',
    answers: ['Thirteen', 'Three', 'Ten', 'Twenty'],
    right: 0,
    reference: 'Sahih Bukhari 3902',
  },
  {
    id: 'q164',
    prophet: 'muhammad',
    level: 'hard',
    question: 'To whom did Khadijah take the Prophet ﷺ after the first revelation?',
    answers: ['Her cousin Waraqah ibn Nawfal', 'Abu Talib', 'Abu Bakr', 'The priests of Makkah'],
    right: 0,
    reference: 'Sahih Bukhari 3',
  },
  {
    id: 'q165',
    prophet: 'muhammad',
    level: 'hard',
    question: 'On which hill did the Prophet ﷺ call the clans of Quraysh to warn them?',
    answers: ['Safa', 'Uhud', 'Hira', "'Arafat"],
    right: 0,
    reference: 'Sahih Bukhari 4770',
  },
  {
    id: 'q166',
    prophet: 'muhammad',
    level: 'hard',
    question: "Who removed the camel's entrails from the Prophet's ﷺ back as he prostrated?",
    answers: ['Fatimah', "'A'ishah", 'Abu Bakr', "'Ali"],
    right: 0,
    reference: 'Sahih Bukhari 240',
  },
  {
    id: 'q167',
    prophet: 'muhammad',
    level: 'hard',
    question:
      'What did the Prophet ﷺ answer the angel of the mountains who offered to crush his people?',
    answers: [
      'He hoped their children would worship Allah alone',
      '"Crush them"',
      '"Wait until tomorrow"',
      '"Ask Jibril"',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3231',
  },
  {
    id: 'q168',
    prophet: 'muhammad',
    level: 'easy',
    question: 'From which mosque to which did the Night Journey take the Prophet ﷺ?',
    answers: [
      'From al-Masjid al-Haram to al-Masjid al-Aqsa',
      'From Madinah to Makkah',
      "From Quba' to Madinah",
      "From the Ka'bah to Mount Sinai",
    ],
    right: 0,
    reference: "Qur'an 17:1",
    verse: {
      reference: "Qur'an 17:1",
      verseArabic:
        'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ',
      translation:
        'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs. Indeed, He is the Hearing, the Seeing.',
    },
  },
  {
    id: 'q169',
    prophet: 'muhammad',
    level: 'easy',
    question: 'How many daily prayers were first enjoined on the Night Journey?',
    answers: ['Fifty', 'Five', 'Ten', 'Seven'],
    right: 0,
    reference: 'Sahih Bukhari 3207',
  },
  {
    id: 'q170',
    prophet: 'muhammad',
    level: 'easy',
    question: 'What did the Prophet ﷺ tell Abu Bakr in the cave?',
    answers: [
      '"Do not grieve; indeed Allah is with us"',
      '"Let us run"',
      '"Be silent"',
      '"We will fight them"',
    ],
    right: 0,
    reference: "Qur'an 9:40",
    verse: {
      reference: "Qur'an 9:40",
      verseArabic:
        'إِلَّا تَنْصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا ۖ فَأَنْزَلَ اللَّهُ سَكِينَتَهُ عَلَيْهِ وَأَيَّدَهُ بِجُنُودٍ لَمْ تَرَوْهَا وَجَعَلَ كَلِمَةَ الَّذِينَ كَفَرُوا السُّفْلَىٰ ۗ وَكَلِمَةُ اللَّهِ هِيَ الْعُلْيَا ۗ وَاللَّهُ عَزِيزٌ حَكِيمٌ',
      translation:
        'If you do not aid the Prophet - Allah has already aided him when those who disbelieved had driven him out [of Makkah] as one of two, when they were in the cave and he said to his companion, "Do not grieve; indeed Allah is with us." And Allah sent down his tranquillity upon him and supported him with angels you did not see and made the word of those who disbelieved the lowest, while the word of Allah - that is the highest. And Allah is Exalted in Might and Wise.',
    },
  },
  {
    id: 'q171',
    prophet: 'muhammad',
    level: 'hard',
    question: 'Who chased the Prophet ﷺ during the migration but whose horse kept sinking?',
    answers: ["Suraqah ibn Ju'shum", 'Abu Jahl', 'Khalid ibn al-Walid', 'Abu Lahab'],
    right: 0,
    reference: 'Sahih Bukhari 3906',
  },
  {
    id: 'q172',
    prophet: 'muhammad',
    level: 'normal',
    question: "Under what, the Qur'an says, did the believers pledge allegiance to the Prophet ﷺ?",
    answers: ['A tree', 'A rock', 'A tent', "The Ka'bah"],
    right: 0,
    reference: "Qur'an 48:18",
    verse: {
      reference: "Qur'an 48:18",
      verseArabic:
        '۞ لَقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ فَعَلِمَ مَا فِي قُلُوبِهِمْ فَأَنْزَلَ السَّكِينَةَ عَلَيْهِمْ وَأَثَابَهُمْ فَتْحًا قَرِيبًا',
      translation:
        'Certainly was Allah pleased with the believers when they pledged allegiance to you, [O Muhammad], under the tree, and He knew what was in their hearts, so He sent down tranquillity upon them and rewarded them with an imminent conquest.',
    },
  },
  {
    id: 'q173',
    prophet: 'muhammad',
    level: 'hard',
    question: "How many idols were around the Ka'bah on the day of the conquest of Makkah?",
    answers: ['Three hundred and sixty', 'Seven', 'One hundred', 'One thousand'],
    right: 0,
    reference: 'Sahih Bukhari 4287',
  },
  {
    id: 'q174',
    prophet: 'muhammad',
    level: 'hard',
    question:
      'On which day was the verse "This day I have perfected for you your religion" revealed?',
    answers: [
      "A Friday, at 'Arafah",
      'A Monday, in Madinah',
      'The day of Badr',
      'The night of the migration',
    ],
    right: 0,
    reference: 'Sahih Bukhari 45',
  },
  {
    id: 'q175',
    prophet: 'muhammad',
    level: 'hard',
    question: "What were the Prophet's ﷺ last words, according to 'A'ishah?",
    answers: [
      '"O Allah, with the highest companions"',
      '"Pray, pray"',
      '"Peace be upon you"',
      '"Bring me a pen"',
    ],
    right: 0,
    reference: 'Sahih Bukhari 4463',
  },
  {
    id: 'q176',
    prophet: 'muhammad',
    level: 'easy',
    question: 'Who said, "Whoever worshipped Muhammad, then Muhammad is dead"?',
    answers: ['Abu Bakr', "'Umar", "'Ali", "'Uthman"],
    right: 0,
    reference: 'Sahih Bukhari 3667',
  },
  {
    id: 'q177',
    prophet: 'isa',
    level: 'normal',
    question: "What were the angels' words to Maryam about how she was chosen?",
    answers: [
      'Chosen above the women of the worlds',
      'Chosen to be a queen',
      'Chosen to be a prophet',
      'Chosen to lead the prayer',
    ],
    right: 0,
    reference: "Qur'an 3:42",
    verse: {
      reference: "Qur'an 3:42",
      verseArabic:
        'وَإِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ اصْطَفَاكِ وَطَهَّرَكِ وَاصْطَفَاكِ عَلَىٰ نِسَاءِ الْعَالَمِينَ',
      translation:
        'And [mention] when the angels said, "O Maryam, indeed Allah has chosen you and purified you and chosen you above the women of the worlds."',
    },
  },
  {
    id: 'q178',
    prophet: 'isa',
    level: 'easy',
    question: 'Who was put in charge of Maryam as a child?',
    answers: ['Zakariyya', 'Yahya', 'Harun', "'Imran"],
    right: 0,
    reference: "Qur'an 3:37",
    verse: {
      reference: "Qur'an 3:37",
      verseArabic:
        'فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنْبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا ۖ كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا الْمِحْرَابَ وَجَدَ عِنْدَهَا رِزْقًا ۖ قَالَ يَا مَرْيَمُ أَنَّىٰ لَكِ هَٰذَا ۖ قَالَتْ هُوَ مِنْ عِنْدِ اللَّهِ ۖ إِنَّ اللَّهَ يَرْزُقُ مَنْ يَشَاءُ بِغَيْرِ حِسَابٍ',
      translation:
        'So her Lord accepted her with good acceptance and caused her to grow in a good manner and put her in the care of Zakariyya. Every time Zakariyya entered upon her in the prayer chamber, he found with her provision. He said, "O Maryam, from where is this [coming] to you?" She said, "It is from Allah. Indeed, Allah provides for whom He wills without account."',
    },
  },
  {
    id: 'q179',
    prophet: 'isa',
    level: 'easy',
    question: 'What was Maryam told to shake to get dates?',
    answers: ['The trunk of the palm tree', 'The branch of an olive tree', 'A basket', 'The wall'],
    right: 0,
    reference: "Qur'an 19:25",
    verse: {
      reference: "Qur'an 19:25",
      verseArabic: 'وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا',
      translation:
        'And shake toward you the trunk of the palm tree; it will drop upon you ripe, fresh dates.',
    },
  },
  {
    id: 'q180',
    prophet: 'isa',
    level: 'normal',
    question: 'What did Maryam vow so that she would not speak to anyone?',
    answers: ['A fast of silence', 'To leave the town', 'To pray all night', 'To cover her face'],
    right: 0,
    reference: "Qur'an 19:26",
    verse: {
      reference: "Qur'an 19:26",
      verseArabic:
        'فَكُلِي وَاشْرَبِي وَقَرِّي عَيْنًا ۖ فَإِمَّا تَرَيِنَّ مِنَ الْبَشَرِ أَحَدًا فَقُولِي إِنِّي نَذَرْتُ لِلرَّحْمَٰنِ صَوْمًا فَلَنْ أُكَلِّمَ الْيَوْمَ إِنْسِيًّا',
      translation:
        'So eat and drink and be contented. And if you see from among humanity anyone, say, ’Indeed, I have vowed to the Most Merciful abstention, so I will not speak today to [any] man.',
    },
  },
  {
    id: 'q181',
    prophet: 'isa',
    level: 'easy',
    question: "What did 'Isa make from clay by Allah's permission?",
    answers: ['The form of a bird', 'A lamb', 'A ship', 'A house'],
    right: 0,
    reference: "Qur'an 3:49",
    verse: {
      reference: "Qur'an 3:49",
      verseArabic:
        'وَرَسُولًا إِلَىٰ بَنِي إِسْرَائِيلَ أَنِّي قَدْ جِئْتُكُمْ بِآيَةٍ مِنْ رَبِّكُمْ ۖ أَنِّي أَخْلُقُ لَكُمْ مِنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ فَأَنْفُخُ فِيهِ فَيَكُونُ طَيْرًا بِإِذْنِ اللَّهِ ۖ وَأُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ وَأُحْيِي الْمَوْتَىٰ بِإِذْنِ اللَّهِ ۖ وَأُنَبِّئُكُمْ بِمَا تَأْكُلُونَ وَمَا تَدَّخِرُونَ فِي بُيُوتِكُمْ ۚ إِنَّ فِي ذَٰلِكَ لَآيَةً لَكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ',
      translation:
        'And [make him] a messenger to the Children of Israel, [who will say], ’Indeed I have come to you with a sign from your Lord in that I design for you from clay [that which is] like the form of a bird, then I breathe into it and it becomes a bird by permission of Allah. And I cure the blind and the leper, and I give life to the dead - by permission of Allah. And I inform you of what you eat and what you store in your houses. Indeed in that is a sign for you, if you are believers.',
    },
  },
  {
    id: 'q182',
    prophet: 'isa',
    level: 'easy',
    question: "Which of these did 'Isa do by Allah's permission?",
    answers: [
      'Cure the blind and the leper',
      'Split the moon',
      'Part the sea',
      'Speak to the ants',
    ],
    right: 0,
    reference: "Qur'an 3:49",
    verse: {
      reference: "Qur'an 3:49",
      verseArabic:
        'وَرَسُولًا إِلَىٰ بَنِي إِسْرَائِيلَ أَنِّي قَدْ جِئْتُكُمْ بِآيَةٍ مِنْ رَبِّكُمْ ۖ أَنِّي أَخْلُقُ لَكُمْ مِنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ فَأَنْفُخُ فِيهِ فَيَكُونُ طَيْرًا بِإِذْنِ اللَّهِ ۖ وَأُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ وَأُحْيِي الْمَوْتَىٰ بِإِذْنِ اللَّهِ ۖ وَأُنَبِّئُكُمْ بِمَا تَأْكُلُونَ وَمَا تَدَّخِرُونَ فِي بُيُوتِكُمْ ۚ إِنَّ فِي ذَٰلِكَ لَآيَةً لَكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ',
      translation:
        'And [make him] a messenger to the Children of Israel, [who will say], ’Indeed I have come to you with a sign from your Lord in that I design for you from clay [that which is] like the form of a bird, then I breathe into it and it becomes a bird by permission of Allah. And I cure the blind and the leper, and I give life to the dead - by permission of Allah. And I inform you of what you eat and what you store in your houses. Indeed in that is a sign for you, if you are believers.',
    },
  },
  {
    id: 'q183',
    prophet: 'isa',
    level: 'easy',
    question: "Which scripture was given to 'Isa?",
    answers: ['The Gospel', 'The Torah', 'The Zabur', 'The Scrolls'],
    right: 0,
    reference: "Qur'an 5:46",
    verse: {
      reference: "Qur'an 5:46",
      verseArabic:
        'وَقَفَّيْنَا عَلَىٰ آثَارِهِمْ بِعِيسَى ابْنِ مَرْيَمَ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ التَّوْرَاةِ ۖ وَآتَيْنَاهُ الْإِنْجِيلَ فِيهِ هُدًى وَنُورٌ وَمُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ التَّوْرَاةِ وَهُدًى وَمَوْعِظَةً لِلْمُتَّقِينَ',
      translation:
        'And We sent, following in their footsteps, ‘Isa, the son of Maryam, confirming that which came before him in the Torah; and We gave him the Gospel, in which was guidance and light and confirming that which preceded it of the Torah as guidance and instruction for the righteous.',
    },
  },
  {
    id: 'q184',
    prophet: 'isa',
    level: 'normal',
    question: "What did the disciples say when 'Isa asked who would be his supporters for Allah?",
    answers: [
      '"We are supporters for Allah"',
      '"We need more signs"',
      '"We will think about it"',
      '"Ask the priests"',
    ],
    right: 0,
    reference: "Qur'an 3:52",
    verse: {
      reference: "Qur'an 3:52",
      verseArabic:
        '۞ فَلَمَّا أَحَسَّ عِيسَىٰ مِنْهُمُ الْكُفْرَ قَالَ مَنْ أَنْصَارِي إِلَى اللَّهِ ۖ قَالَ الْحَوَارِيُّونَ نَحْنُ أَنْصَارُ اللَّهِ آمَنَّا بِاللَّهِ وَاشْهَدْ بِأَنَّا مُسْلِمُونَ',
      translation:
        'But when ‘Isa felt [persistence in] disbelief from them, he said, "Who are my supporters for [the cause of] Allah?" The disciples said, "We are supporters for Allah. We have believed in Allah and testify that we are Muslims [submitting to Him]."',
    },
  },
  {
    id: 'q185',
    prophet: 'isa',
    level: 'normal',
    question: "Who will 'Isa be, at his return, according to the Prophet ﷺ?",
    answers: [
      'A just ruler',
      'A king of the east',
      'A new prophet with a new book',
      'A judge of the angels',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3448',
  },
  {
    id: 'q186',
    prophet: 'isa',
    level: 'hard',
    question: "Who did the Prophet ﷺ say there was between him and 'Isa?",
    answers: ['No prophet', 'Yahya', 'Zakariyya', 'Ilyas'],
    right: 0,
    reference: 'Sahih Bukhari 3442',
  },
  {
    id: 'q187',
    prophet: 'isa',
    level: 'hard',
    question: "What will 'Isa be asked on the Day of Judgement?",
    answers: [
      'Whether he told people to take him and his mother as gods',
      'How many people he healed',
      'Where he was raised',
      'Why he left Jerusalem',
    ],
    right: 0,
    reference: "Qur'an 5:116",
    verse: {
      reference: "Qur'an 5:116",
      verseArabic:
        'وَإِذْ قَالَ اللَّهُ يَا عِيسَى ابْنَ مَرْيَمَ أَأَنْتَ قُلْتَ لِلنَّاسِ اتَّخِذُونِي وَأُمِّيَ إِلَٰهَيْنِ مِنْ دُونِ اللَّهِ ۖ قَالَ سُبْحَانَكَ مَا يَكُونُ لِي أَنْ أَقُولَ مَا لَيْسَ لِي بِحَقٍّ ۚ إِنْ كُنْتُ قُلْتُهُ فَقَدْ عَلِمْتَهُ ۚ تَعْلَمُ مَا فِي نَفْسِي وَلَا أَعْلَمُ مَا فِي نَفْسِكَ ۚ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ',
      translation:
        'And [beware the Day] when Allah will say, "O ‘Isa, Son of Maryam, did you say to the people, ’Take me and my mother as deities besides Allah?’" He will say, "Exalted are You! It was not for me to say that to which I have no right. If I had said it, You would have known it. You know what is within myself, and I do not know what is within Yourself. Indeed, it is You who is Knower of the unseen."',
    },
  },
  {
    id: 'q188',
    prophet: 'nuh',
    level: 'hard',
    question: "What did Nuh's people say about those who followed him?",
    answers: [
      'They were the lowest of them',
      'They were the richest',
      'They were angels',
      'They were foreigners',
    ],
    right: 0,
    reference: "Qur'an 11:27",
    verse: {
      reference: "Qur'an 11:27",
      verseArabic:
        'فَقَالَ الْمَلَأُ الَّذِينَ كَفَرُوا مِنْ قَوْمِهِ مَا نَرَاكَ إِلَّا بَشَرًا مِثْلَنَا وَمَا نَرَاكَ اتَّبَعَكَ إِلَّا الَّذِينَ هُمْ أَرَاذِلُنَا بَادِيَ الرَّأْيِ وَمَا نَرَىٰ لَكُمْ عَلَيْنَا مِنْ فَضْلٍ بَلْ نَظُنُّكُمْ كَاذِبِينَ',
      translation:
        'So the eminent among those who disbelieved from his people said, "We do not see you but as a man like ourselves, and we do not see you followed except by those who are the lowest of us [and] at first suggestion. And we do not see in you over us any merit; rather, we think you are liars."',
    },
  },
  {
    id: 'q189',
    prophet: 'nuh',
    level: 'hard',
    question: "What did Nuh's people threaten him with?",
    answers: ['Stoning', 'Exile', 'Prison', 'Fire'],
    right: 0,
    reference: "Qur'an 26:116",
    verse: {
      reference: "Qur'an 26:116",
      verseArabic: 'قَالُوا لَئِنْ لَمْ تَنْتَهِ يَا نُوحُ لَتَكُونَنَّ مِنَ الْمَرْجُومِينَ',
      translation:
        'They said, "If you do not desist, O Nuh, you will surely be of those who are stoned."',
    },
  },
  {
    id: 'q190',
    prophet: 'nuh',
    level: 'easy',
    question: 'What overflowed as a sign that the flood had come?',
    answers: ['The oven', 'The well', 'The river', 'The sea'],
    right: 0,
    reference: "Qur'an 11:40",
    verse: {
      reference: "Qur'an 11:40",
      verseArabic:
        'حَتَّىٰ إِذَا جَاءَ أَمْرُنَا وَفَارَ التَّنُّورُ قُلْنَا احْمِلْ فِيهَا مِنْ كُلٍّ زَوْجَيْنِ اثْنَيْنِ وَأَهْلَكَ إِلَّا مَنْ سَبَقَ عَلَيْهِ الْقَوْلُ وَمَنْ آمَنَ ۚ وَمَا آمَنَ مَعَهُ إِلَّا قَلِيلٌ',
      translation:
        '[So it was], until when Our command came and the oven overflowed, We said, "Load upon the ship of each [creature] two mates and your family, except those about whom the word has preceded, and [include] whoever has believed." But none had believed with him, except a few.',
    },
  },
  {
    id: 'q191',
    prophet: 'nuh',
    level: 'normal',
    question: 'What words did Nuh say as they boarded the ship?',
    answers: [
      '"In the name of Allah is its course and its anchorage"',
      '"Farewell to the land"',
      '"Allah is the greatest"',
      '"Peace be upon us"',
    ],
    right: 0,
    reference: "Qur'an 11:41",
    verse: {
      reference: "Qur'an 11:41",
      verseArabic:
        '۞ وَقَالَ ارْكَبُوا فِيهَا بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا ۚ إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ',
      translation:
        'And [Nuh] said, "Embark therein; in the name of Allah is its course and its anchorage. Indeed, my Lord is Forgiving and Merciful."',
    },
  },
  {
    id: 'q192',
    prophet: 'nuh',
    level: 'hard',
    question: "What was Nuh's ship made of, according to the Qur'an?",
    answers: ['Planks and nails', 'Reeds and rope', 'Stone and clay', 'Iron'],
    right: 0,
    reference: "Qur'an 54:13",
    verse: {
      reference: "Qur'an 54:13",
      verseArabic: 'وَحَمَلْنَاهُ عَلَىٰ ذَاتِ أَلْوَاحٍ وَدُسُرٍ',
      translation: 'And We carried him on a [construction of] planks and nails.',
    },
  },
  {
    id: 'q193',
    prophet: 'nuh',
    level: 'normal',
    question: 'Who did Nuh call out to among the waves?',
    answers: ['His son', 'His wife', 'His father', 'His brother'],
    right: 0,
    reference: "Qur'an 11:42",
    verse: {
      reference: "Qur'an 11:42",
      verseArabic:
        'وَهِيَ تَجْرِي بِهِمْ فِي مَوْجٍ كَالْجِبَالِ وَنَادَىٰ نُوحٌ ابْنَهُ وَكَانَ فِي مَعْزِلٍ يَا بُنَيَّ ارْكَبْ مَعَنَا وَلَا تَكُنْ مَعَ الْكَافِرِينَ',
      translation:
        'And it sailed with them through waves like mountains, and Nuh called to his son who was apart [from them], "O my son, come aboard with us and be not with the disbelievers."',
    },
  },
  {
    id: 'q194',
    prophet: 'nuh',
    level: 'normal',
    question: 'What did Allah tell Nuh about his son who drowned?',
    answers: [
      '"He is not of your family"',
      '"He will be saved later"',
      '"He is a martyr"',
      '"He is with the angels"',
    ],
    right: 0,
    reference: "Qur'an 11:46",
    verse: {
      reference: "Qur'an 11:46",
      verseArabic:
        'قَالَ يَا نُوحُ إِنَّهُ لَيْسَ مِنْ أَهْلِكَ ۖ إِنَّهُ عَمَلٌ غَيْرُ صَالِحٍ ۖ فَلَا تَسْأَلْنِ مَا لَيْسَ لَكَ بِهِ عِلْمٌ ۖ إِنِّي أَعِظُكَ أَنْ تَكُونَ مِنَ الْجَاهِلِينَ',
      translation:
        'He said, "O Nuh, indeed he is not of your family; indeed, he is [one whose] work was other than righteous, so ask Me not for that about which you have no knowledge. Indeed, I advise you, lest you be among the ignorant."',
    },
  },
  {
    id: 'q195',
    prophet: 'nuh',
    level: 'hard',
    question: "Who will be Nuh's witnesses on the Day of Resurrection, according to the Prophet ﷺ?",
    answers: ['Muhammad and his followers', 'The angels', 'His own sons', "The people of 'Ad"],
    right: 0,
    reference: 'Sahih Bukhari 3339',
  },
  {
    id: 'q196',
    prophet: 'adam',
    level: 'hard',
    question: 'What did the angels ask when told of a successor on earth?',
    answers: [
      'Whether Allah would place one who causes corruption',
      'Who would rule the angels',
      'Where he would live',
      'When the Hour would come',
    ],
    right: 0,
    reference: "Qur'an 2:30",
    verse: {
      reference: "Qur'an 2:30",
      verseArabic:
        'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَنْ يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ',
      translation:
        'And [mention, O Muhammad], when your Lord said to the angels, "Indeed, I will make upon the earth a successive authority." They said, "Will You place upon it one who causes corruption therein and sheds blood, while we declare Your praise and sanctify You?" Allah said, "Indeed, I know that which you do not know."',
    },
  },
  {
    id: 'q197',
    prophet: 'adam',
    level: 'hard',
    question: 'How tall did Allah create Adam, according to the Prophet ﷺ?',
    answers: ['Sixty cubits', 'Six cubits', 'Ten cubits', 'A hundred cubits'],
    right: 0,
    reference: 'Sahih Bukhari 3326',
  },
  {
    id: 'q198',
    prophet: 'adam',
    level: 'hard',
    question: 'What did Satan say the forbidden tree would make Adam and his wife?',
    answers: ['Angels or immortals', 'Kings', 'Prophets', 'Giants'],
    right: 0,
    reference: "Qur'an 7:20",
    verse: {
      reference: "Qur'an 7:20",
      verseArabic:
        'فَوَسْوَسَ لَهُمَا الشَّيْطَانُ لِيُبْدِيَ لَهُمَا مَا وُورِيَ عَنْهُمَا مِنْ سَوْآتِهِمَا وَقَالَ مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَٰذِهِ الشَّجَرَةِ إِلَّا أَنْ تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ',
      translation:
        'But Satan whispered to them to make apparent to them that which was concealed from them of their private parts. He said, "Your Lord did not forbid you this tree except that you become angels or become of the immortal."',
    },
  },
  {
    id: 'q199',
    prophet: 'adam',
    level: 'normal',
    question: 'What did Adam and his wife cover themselves with after eating from the tree?',
    answers: ['Leaves of the garden', 'Animal skins', 'Clouds', 'Their hair'],
    right: 0,
    reference: "Qur'an 7:22",
    verse: {
      reference: "Qur'an 7:22",
      verseArabic:
        'فَدَلَّاهُمَا بِغُرُورٍ ۚ فَلَمَّا ذَاقَا الشَّجَرَةَ بَدَتْ لَهُمَا سَوْآتُهُمَا وَطَفِقَا يَخْصِفَانِ عَلَيْهِمَا مِنْ وَرَقِ الْجَنَّةِ ۖ وَنَادَاهُمَا رَبُّهُمَا أَلَمْ أَنْهَكُمَا عَنْ تِلْكُمَا الشَّجَرَةِ وَأَقُلْ لَكُمَا إِنَّ الشَّيْطَانَ لَكُمَا عَدُوٌّ مُبِينٌ',
      translation:
        'So he made them fall, through deception. And when they tasted of the tree, their private parts became apparent to them, and they began to fasten together over themselves from the leaves of Paradise. And their Lord called to them, "Did I not forbid you from that tree and tell you that Satan is to you a clear enemy."',
    },
  },
  {
    id: 'q200',
    prophet: 'adam',
    level: 'hard',
    question: 'Who argued with Adam about leaving Paradise, in the hadith?',
    answers: ['Musa', 'Ibrahim', 'Nuh', 'Iblis'],
    right: 0,
    reference: 'Sahih Bukhari 3409',
  },
  {
    id: 'q201',
    prophet: 'adam',
    level: 'hard',
    question: "What does the Qur'an say about the example of 'Isa and Adam?",
    answers: [
      'Both were created by Allah\'s word "Be"',
      'Both were kings',
      'Both lived in Makkah',
      'Both had no children',
    ],
    right: 0,
    reference: "Qur'an 3:59",
    verse: {
      reference: "Qur'an 3:59",
      verseArabic:
        'إِنَّ مَثَلَ عِيسَىٰ عِنْدَ اللَّهِ كَمَثَلِ آدَمَ ۖ خَلَقَهُ مِنْ تُرَابٍ ثُمَّ قَالَ لَهُ كُنْ فَيَكُونُ',
      translation:
        'Indeed, the example of ‘Isa to Allah is like that of Adam. He created Him from dust; then He said to him, "Be," and he was.',
    },
  },
  {
    id: 'q202',
    prophet: 'sulayman',
    level: 'normal',
    question: 'In which case did Allah give Sulayman understanding?',
    answers: [
      'The field overrun by sheep at night',
      'The two kings at war',
      'The stolen camel',
      'The broken dam',
    ],
    right: 0,
    reference: "Qur'an 21:79",
    verse: {
      reference: "Qur'an 21:79",
      verseArabic:
        'فَفَهَّمْنَاهَا سُلَيْمَانَ ۚ وَكُلًّا آتَيْنَا حُكْمًا وَعِلْمًا ۚ وَسَخَّرْنَا مَعَ دَاوُودَ الْجِبَالَ يُسَبِّحْنَ وَالطَّيْرَ ۚ وَكُنَّا فَاعِلِينَ',
      translation:
        'And We gave understanding of the case to Sulayman, and to each [of them] We gave judgement and knowledge. And We subjected the mountains to exalt [Us], along with Dawud and [also] the birds. And We were doing [that].',
    },
  },
  {
    id: 'q203',
    prophet: 'sulayman',
    level: 'easy',
    question: 'What did Allah subject to Sulayman, blowing by his command?',
    answers: ['The wind', 'The rain', 'The sea', 'The sun'],
    right: 0,
    reference: "Qur'an 38:36",
    verse: {
      reference: "Qur'an 38:36",
      verseArabic: 'فَسَخَّرْنَا لَهُ الرِّيحَ تَجْرِي بِأَمْرِهِ رُخَاءً حَيْثُ أَصَابَ',
      translation:
        'So We subjected to him the wind blowing by his command, gently, wherever he directed.',
    },
  },
  {
    id: 'q204',
    prophet: 'sulayman',
    level: 'normal',
    question: "What flowed for Sulayman, according to the Qur'an?",
    answers: [
      'A spring of molten copper',
      'A river of milk',
      'A spring of gold',
      'A stream of honey',
    ],
    right: 0,
    reference: "Qur'an 34:12",
    verse: {
      reference: "Qur'an 34:12",
      verseArabic:
        'وَلِسُلَيْمَانَ الرِّيحَ غُدُوُّهَا شَهْرٌ وَرَوَاحُهَا شَهْرٌ ۖ وَأَسَلْنَا لَهُ عَيْنَ الْقِطْرِ ۖ وَمِنَ الْجِنِّ مَنْ يَعْمَلُ بَيْنَ يَدَيْهِ بِإِذْنِ رَبِّهِ ۖ وَمَنْ يَزِغْ مِنْهُمْ عَنْ أَمْرِنَا نُذِقْهُ مِنْ عَذَابِ السَّعِيرِ',
      translation:
        'And to Sulayman [We subjected] the wind - its morning [journey was that of] a month - and its afternoon [journey was that of] a month, and We made flow for him a spring of [liquid] copper. And among the jinn were those who worked for him by the permission of his Lord. And whoever deviated among them from Our command - We will make him taste of the punishment of the Blaze.',
    },
  },
  {
    id: 'q205',
    prophet: 'sulayman',
    level: 'easy',
    question: "How did Sulayman's letter to the queen begin?",
    answers: [
      '"In the name of Allah, the Entirely Merciful, the Especially Merciful"',
      '"From the king of the world"',
      '"Surrender or fight"',
      '"Greetings, O queen"',
    ],
    right: 0,
    reference: "Qur'an 27:30",
    verse: {
      reference: "Qur'an 27:30",
      verseArabic: 'إِنَّهُ مِنْ سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation:
        'Indeed, it is from Sulayman, and indeed, it reads: ’In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    },
  },
  {
    id: 'q206',
    prophet: 'sulayman',
    level: 'normal',
    question: 'What did the queen send Sulayman first?',
    answers: ['A gift', 'An army', 'A letter of war', 'Her throne'],
    right: 0,
    reference: "Qur'an 27:35",
    verse: {
      reference: "Qur'an 27:35",
      verseArabic:
        'وَإِنِّي مُرْسِلَةٌ إِلَيْهِمْ بِهَدِيَّةٍ فَنَاظِرَةٌ بِمَ يَرْجِعُ الْمُرْسَلُونَ',
      translation:
        'But indeed, I will send to them a gift and see with what [reply] the messengers will return.',
    },
  },
  {
    id: 'q207',
    prophet: 'sulayman',
    level: 'hard',
    question: "Who brought the queen's throne before Sulayman's glance returned?",
    answers: [
      'One who had knowledge from the Scripture',
      'A powerful one of the jinn',
      'The hoopoe',
      'The wind',
    ],
    right: 0,
    reference: "Qur'an 27:40",
    verse: {
      reference: "Qur'an 27:40",
      verseArabic:
        'قَالَ الَّذِي عِنْدَهُ عِلْمٌ مِنَ الْكِتَابِ أَنَا آتِيكَ بِهِ قَبْلَ أَنْ يَرْتَدَّ إِلَيْكَ طَرْفُكَ ۚ فَلَمَّا رَآهُ مُسْتَقِرًّا عِنْدَهُ قَالَ هَٰذَا مِنْ فَضْلِ رَبِّي لِيَبْلُوَنِي أَأَشْكُرُ أَمْ أَكْفُرُ ۖ وَمَنْ شَكَرَ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ ۖ وَمَنْ كَفَرَ فَإِنَّ رَبِّي غَنِيٌّ كَرِيمٌ',
      translation:
        'Said one who had knowledge from the Scripture, "I will bring it to you before your glance returns to you." And when [Sulayman] saw it placed before him, he said, "This is from the favor of my Lord to test me whether I will be grateful or ungrateful. And whoever is grateful - his gratitude is only for [the benefit of] himself. And whoever is ungrateful - then indeed, my Lord is Free of need and Generous."',
    },
  },
  {
    id: 'q208',
    prophet: 'sulayman',
    level: 'easy',
    question: 'What did the queen think the palace floor was?',
    answers: ['Water', 'Ice', 'Gold', 'Sand'],
    right: 0,
    reference: "Qur'an 27:44",
    verse: {
      reference: "Qur'an 27:44",
      verseArabic:
        'قِيلَ لَهَا ادْخُلِي الصَّرْحَ ۖ فَلَمَّا رَأَتْهُ حَسِبَتْهُ لُجَّةً وَكَشَفَتْ عَنْ سَاقَيْهَا ۚ قَالَ إِنَّهُ صَرْحٌ مُمَرَّدٌ مِنْ قَوَارِيرَ ۗ قَالَتْ رَبِّ إِنِّي ظَلَمْتُ نَفْسِي وَأَسْلَمْتُ مَعَ سُلَيْمَانَ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation:
        'She was told, "Enter the palace." But when she saw it, she thought it was a body of water and uncovered her shins [to wade through]. He said, "Indeed, it is a palace [whose floor is] made smooth with glass." She said, "My Lord, indeed I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds."',
    },
  },
  {
    id: 'q209',
    prophet: 'sulayman',
    level: 'hard',
    question: "What does the Qur'an say about the magic attributed to Sulayman's reign?",
    answers: [
      'It was not Sulayman who disbelieved',
      'Sulayman taught it',
      'It was permitted then',
      'Sulayman wrote it down',
    ],
    right: 0,
    reference: "Qur'an 2:102",
    verse: {
      reference: "Qur'an 2:102",
      verseArabic:
        'وَاتَّبَعُوا مَا تَتْلُو الشَّيَاطِينُ عَلَىٰ مُلْكِ سُلَيْمَانَ ۖ وَمَا كَفَرَ سُلَيْمَانُ وَلَٰكِنَّ الشَّيَاطِينَ كَفَرُوا يُعَلِّمُونَ النَّاسَ السِّحْرَ وَمَا أُنْزِلَ عَلَى الْمَلَكَيْنِ بِبَابِلَ هَارُوتَ وَمَارُوتَ ۚ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَا إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ ۖ فَيَتَعَلَّمُونَ مِنْهُمَا مَا يُفَرِّقُونَ بِهِ بَيْنَ الْمَرْءِ وَزَوْجِهِ ۚ وَمَا هُمْ بِضَارِّينَ بِهِ مِنْ أَحَدٍ إِلَّا بِإِذْنِ اللَّهِ ۚ وَيَتَعَلَّمُونَ مَا يَضُرُّهُمْ وَلَا يَنْفَعُهُمْ ۚ وَلَقَدْ عَلِمُوا لَمَنِ اشْتَرَاهُ مَا لَهُ فِي الْآخِرَةِ مِنْ خَلَاقٍ ۚ وَلَبِئْسَ مَا شَرَوْا بِهِ أَنْفُسَهُمْ ۚ لَوْ كَانُوا يَعْلَمُونَ',
      translation:
        'And they followed [instead] what the devils had recited during the reign of Sulayman. It was not Sulayman who disbelieved, but the devils disbelieved, teaching people magic and that which was revealed to the two angels at Babylon, Harut and Marut. But the two angels do not teach anyone unless they say, "We are a trial, so do not disbelieve [by practicing magic]." And [yet] they learn from them that by which they cause separation between a man and his wife. But they do not harm anyone through it except by permission of Allah. And the people learn what harms them and does not benefit them. But the Children of Israel certainly knew that whoever purchased the magic would not have in the Hereafter any share. And wretched is that for which they sold themselves, if they only knew.',
    },
  },
  {
    id: 'q210',
    prophet: 'dawud',
    level: 'hard',
    question: 'Who was the king under whom Dawud fought?',
    answers: ['Talut', 'Jalut', 'Pharaoh', 'Sulayman'],
    right: 0,
    reference: "Qur'an 2:247",
    verse: {
      reference: "Qur'an 2:247",
      verseArabic:
        'وَقَالَ لَهُمْ نَبِيُّهُمْ إِنَّ اللَّهَ قَدْ بَعَثَ لَكُمْ طَالُوتَ مَلِكًا ۚ قَالُوا أَنَّىٰ يَكُونُ لَهُ الْمُلْكُ عَلَيْنَا وَنَحْنُ أَحَقُّ بِالْمُلْكِ مِنْهُ وَلَمْ يُؤْتَ سَعَةً مِنَ الْمَالِ ۚ قَالَ إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ ۖ وَاللَّهُ يُؤْتِي مُلْكَهُ مَنْ يَشَاءُ ۚ وَاللَّهُ وَاسِعٌ عَلِيمٌ',
      translation:
        'And their prophet said to them, "Indeed, Allah has sent to you Saul as a king." They said, "How can he have kingship over us while we are more worthy of kingship than him and he has not been given any measure of wealth?" He said, "Indeed, Allah has chosen him over you and has increased him abundantly in knowledge and stature. And Allah gives His sovereignty to whom He wills. And Allah is all-Encompassing [in favor] and Knowing."',
    },
  },
  {
    id: 'q211',
    prophet: 'dawud',
    level: 'hard',
    question: "What did Talut's army have to avoid drinking from?",
    answers: ['A river', 'A well', 'The sea', 'A spring'],
    right: 0,
    reference: "Qur'an 2:249",
    verse: {
      reference: "Qur'an 2:249",
      verseArabic:
        'فَلَمَّا فَصَلَ طَالُوتُ بِالْجُنُودِ قَالَ إِنَّ اللَّهَ مُبْتَلِيكُمْ بِنَهَرٍ فَمَنْ شَرِبَ مِنْهُ فَلَيْسَ مِنِّي وَمَنْ لَمْ يَطْعَمْهُ فَإِنَّهُ مِنِّي إِلَّا مَنِ اغْتَرَفَ غُرْفَةً بِيَدِهِ ۚ فَشَرِبُوا مِنْهُ إِلَّا قَلِيلًا مِنْهُمْ ۚ فَلَمَّا جَاوَزَهُ هُوَ وَالَّذِينَ آمَنُوا مَعَهُ قَالُوا لَا طَاقَةَ لَنَا الْيَوْمَ بِجَالُوتَ وَجُنُودِهِ ۚ قَالَ الَّذِينَ يَظُنُّونَ أَنَّهُمْ مُلَاقُو اللَّهِ كَمْ مِنْ فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ ۗ وَاللَّهُ مَعَ الصَّابِرِينَ',
      translation:
        'And when Saul went forth with the soldiers, he said, "Indeed, Allah will be testing you with a river. So whoever drinks from it is not of me, and whoever does not taste it is indeed of me, excepting one who takes [from it] in the hollow of his hand." But they drank from it, except a [very] few of them. Then when he had crossed it along with those who believed with him, they said, "There is no power for us today against Goliath and his soldiers." But those who were certain that they would meet Allah said, "How many a small company has overcome a large company by permission of Allah. And Allah is with the patient."',
    },
  },
  {
    id: 'q212',
    prophet: 'dawud',
    level: 'normal',
    question: 'What did Dawud make from the iron softened for him?',
    answers: ['Coats of mail', 'Swords', 'Ploughs', 'Doors'],
    right: 0,
    reference: "Qur'an 34:11",
    verse: {
      reference: "Qur'an 34:11",
      verseArabic:
        'أَنِ اعْمَلْ سَابِغَاتٍ وَقَدِّرْ فِي السَّرْدِ ۖ وَاعْمَلُوا صَالِحًا ۖ إِنِّي بِمَا تَعْمَلُونَ بَصِيرٌ',
      translation:
        '[Commanding him], "Make full coats of mail and calculate [precisely] the links, and work [all of you] righteousness. Indeed I, of what you do, am Seeing."',
    },
  },
  {
    id: 'q213',
    prophet: 'dawud',
    level: 'hard',
    question: 'How did the two disputants enter upon Dawud?',
    answers: [
      'They climbed over the wall of his prayer chamber',
      'They came by the main gate',
      'They were brought by guards',
      'They came in his dream',
    ],
    right: 0,
    reference: "Qur'an 38:21",
    verse: {
      reference: "Qur'an 38:21",
      verseArabic: '۞ وَهَلْ أَتَاكَ نَبَأُ الْخَصْمِ إِذْ تَسَوَّرُوا الْمِحْرَابَ',
      translation:
        'And has there come to you the news of the adversaries, when they climbed over the wall of [his] prayer chamber.',
    },
  },
  {
    id: 'q214',
    prophet: 'dawud',
    level: 'hard',
    question: 'What did Dawud eat from, according to the Prophet ﷺ?',
    answers: [
      'The earnings of his own work',
      'The royal treasury',
      'Gifts from his people',
      'The spoils of war',
    ],
    right: 0,
    reference: 'Sahih Bukhari 2072',
  },
  {
    id: 'q215',
    prophet: 'hud',
    level: 'hard',
    question: "What did Hud's people build on every height?",
    answers: ['A sign, to amuse themselves', 'Temples to the sun', 'Watchtowers for war', 'Wells'],
    right: 0,
    reference: "Qur'an 26:128",
    verse: {
      reference: "Qur'an 26:128",
      verseArabic: 'أَتَبْنُونَ بِكُلِّ رِيعٍ آيَةً تَعْبَثُونَ',
      translation: 'Do you construct on every elevation a sign, amusing yourselves.',
    },
  },
  {
    id: 'q216',
    prophet: 'hud',
    level: 'hard',
    question: 'In which region did Hud warn his people?',
    answers: ['Al-Ahqaf', 'Al-Hijr', 'Madyan', 'Babylon'],
    right: 0,
    reference: "Qur'an 46:21",
    verse: {
      reference: "Qur'an 46:21",
      verseArabic:
        '۞ وَاذْكُرْ أَخَا عَادٍ إِذْ أَنْذَرَ قَوْمَهُ بِالْأَحْقَافِ وَقَدْ خَلَتِ النُّذُرُ مِنْ بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِ أَلَّا تَعْبُدُوا إِلَّا اللَّهَ إِنِّي أَخَافُ عَلَيْكُمْ عَذَابَ يَوْمٍ عَظِيمٍ',
      translation:
        'And mention, [O Muhammad], the brother of ’Aad, when he warned his people in the [region of] al-Ahqaf - and warners had already passed on before him and after him - [saying], "Do not worship except Allah. Indeed, I fear for you the punishment of a terrible day."',
    },
  },
  {
    id: 'q217',
    prophet: 'hud',
    level: 'normal',
    question: "What did 'Ad think the approaching cloud would bring them?",
    answers: ['Rain', 'Locusts', 'Hail', 'Shade'],
    right: 0,
    reference: "Qur'an 46:24",
    verse: {
      reference: "Qur'an 46:24",
      verseArabic:
        'فَلَمَّا رَأَوْهُ عَارِضًا مُسْتَقْبِلَ أَوْدِيَتِهِمْ قَالُوا هَٰذَا عَارِضٌ مُمْطِرُنَا ۚ بَلْ هُوَ مَا اسْتَعْجَلْتُمْ بِهِ ۖ رِيحٌ فِيهَا عَذَابٌ أَلِيمٌ',
      translation:
        'And when they saw it as a cloud approaching their valleys, they said, "This is a cloud bringing us rain!" Rather, it is that for which you were impatient: a wind, within it a painful punishment.',
    },
  },
  {
    id: 'q218',
    prophet: 'hud',
    level: 'hard',
    question: "What city of lofty pillars is named with 'Ad?",
    answers: ['Iram', 'Babylon', "Saba'", 'Ur'],
    right: 0,
    reference: "Qur'an 89:7",
    verse: {
      reference: "Qur'an 89:7",
      verseArabic: 'إِرَمَ ذَاتِ الْعِمَادِ',
      translation: '[With] Iram - who had lofty pillars.',
    },
  },
  {
    id: 'q219',
    prophet: 'hud',
    level: 'hard',
    question: "Which wind destroyed 'Ad, according to the Prophet ﷺ?",
    answers: [
      'The westerly wind',
      'The easterly wind',
      'The north wind',
      'A whirlwind from the sea',
    ],
    right: 0,
    reference: 'Sahih Bukhari 1035',
  },
  {
    id: 'q220',
    prophet: 'salih',
    level: 'easy',
    question: 'To which people was Salih sent?',
    answers: ['Thamud', "'Ad", 'Madyan', "Saba'"],
    right: 0,
    reference: "Qur'an 7:73",
    verse: {
      reference: "Qur'an 7:73",
      verseArabic:
        'وَإِلَىٰ ثَمُودَ أَخَاهُمْ صَالِحًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُمْ مِنْ إِلَٰهٍ غَيْرُهُ ۖ قَدْ جَاءَتْكُمْ بَيِّنَةٌ مِنْ رَبِّكُمْ ۖ هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً ۖ فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ ۖ وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابٌ أَلِيمٌ',
      translation:
        'And to the Thamud [We sent] their brother Salih. He said, "O my people, worship Allah; you have no deity other than Him. There has come to you clear evidence from your Lord. This is the she-camel of Allah [sent] to you as a sign. So leave her to eat within Allah ’s land and do not touch her with harm, lest there seize you a painful punishment."',
    },
  },
  {
    id: 'q221',
    prophet: 'salih',
    level: 'hard',
    question: 'How was the water shared between the she-camel and the people?',
    answers: [
      'Each had a known day to drink',
      'The camel drank only at night',
      'The people drank first',
      'They shared one well every day',
    ],
    right: 0,
    reference: "Qur'an 26:155",
    verse: {
      reference: "Qur'an 26:155",
      verseArabic: 'قَالَ هَٰذِهِ نَاقَةٌ لَهَا شِرْبٌ وَلَكُمْ شِرْبُ يَوْمٍ مَعْلُومٍ',
      translation:
        'He said, "This is a she-camel. For her is a [time of] drink, and for you is a [time of] drink, [each] on a known day."',
    },
  },
  {
    id: 'q222',
    prophet: 'salih',
    level: 'hard',
    question: 'How many men in the city plotted to kill Salih and his family?',
    answers: ['Nine', 'Seven', 'Twelve', 'Forty'],
    right: 0,
    reference: "Qur'an 27:48",
    verse: {
      reference: "Qur'an 27:48",
      verseArabic:
        'وَكَانَ فِي الْمَدِينَةِ تِسْعَةُ رَهْطٍ يُفْسِدُونَ فِي الْأَرْضِ وَلَا يُصْلِحُونَ',
      translation:
        'And there were in the city nine family heads causing corruption in the land and not amending [its affairs].',
    },
  },
  {
    id: 'q223',
    prophet: 'salih',
    level: 'hard',
    question: "What did the Prophet ﷺ tell his companions to do with the water of al-Hijr's wells?",
    answers: ['Pour it out', 'Drink it for blessing', 'Carry it to Madinah', 'Use it for wudu'],
    right: 0,
    reference: 'Sahih Bukhari 3379',
  },
  {
    id: 'q224',
    prophet: 'salih',
    level: 'hard',
    question: 'From which well did the Prophet ﷺ let his companions take water at al-Hijr?',
    answers: [
      'The well the she-camel drank from',
      'The deepest well',
      'Any well they liked',
      'None of them',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3379',
  },
  {
    id: 'q225',
    prophet: 'salih',
    level: 'easy',
    question: 'What seized Thamud?',
    answers: [
      'A single blast from the sky',
      'A flood',
      'A wind of seven nights',
      'A rain of stones',
    ],
    right: 0,
    reference: "Qur'an 54:31",
    verse: {
      reference: "Qur'an 54:31",
      verseArabic:
        'إِنَّا أَرْسَلْنَا عَلَيْهِمْ صَيْحَةً وَاحِدَةً فَكَانُوا كَهَشِيمِ الْمُحْتَظِرِ',
      translation:
        'Indeed, We sent upon them one blast from the sky, and they became like the dry twig fragments of an [animal] pen.',
    },
  },
  {
    id: 'q226',
    prophet: 'shuayb',
    level: 'hard',
    question: "What did Shu'ayb's people ask him about his prayer?",
    answers: [
      "Whether it commanded them to leave their fathers' gods",
      'Whether it was in Arabic',
      'Why it was so long',
      'Where he learnt it',
    ],
    right: 0,
    reference: "Qur'an 11:87",
    verse: {
      reference: "Qur'an 11:87",
      verseArabic:
        'قَالُوا يَا شُعَيْبُ أَصَلَاتُكَ تَأْمُرُكَ أَنْ نَتْرُكَ مَا يَعْبُدُ آبَاؤُنَا أَوْ أَنْ نَفْعَلَ فِي أَمْوَالِنَا مَا نَشَاءُ ۖ إِنَّكَ لَأَنْتَ الْحَلِيمُ الرَّشِيدُ',
      translation:
        'They said, "O Shu’ayb, does your prayer command you that we should leave what our fathers worship or not do with our wealth what we please? Indeed, you are the forbearing, the discerning."',
    },
  },
  {
    id: 'q227',
    prophet: 'shuayb',
    level: 'hard',
    question: "What did the chiefs of Madyan threaten Shu'ayb with?",
    answers: ['Eviction from their city', 'Stoning', 'Prison', 'Slavery'],
    right: 0,
    reference: "Qur'an 7:88",
    verse: {
      reference: "Qur'an 7:88",
      verseArabic:
        '۞ قَالَ الْمَلَأُ الَّذِينَ اسْتَكْبَرُوا مِنْ قَوْمِهِ لَنُخْرِجَنَّكَ يَا شُعَيْبُ وَالَّذِينَ آمَنُوا مَعَكَ مِنْ قَرْيَتِنَا أَوْ لَتَعُودُنَّ فِي مِلَّتِنَا ۚ قَالَ أَوَلَوْ كُنَّا كَارِهِينَ',
      translation:
        'Said the eminent ones who were arrogant among his people, "We will surely evict you, O Shu’ayb, and those who have believed with you from our city, or you must return to our religion." He said, "Even if we were unwilling."',
    },
  },
  {
    id: 'q228',
    prophet: 'shuayb',
    level: 'hard',
    question: 'What seized the companions of the thicket?',
    answers: [
      'The punishment of the day of the black cloud',
      'A flood',
      'A wind',
      'An earthquake of stone',
    ],
    right: 0,
    reference: "Qur'an 26:189",
    verse: {
      reference: "Qur'an 26:189",
      verseArabic:
        'فَكَذَّبُوهُ فَأَخَذَهُمْ عَذَابُ يَوْمِ الظُّلَّةِ ۚ إِنَّهُ كَانَ عَذَابَ يَوْمٍ عَظِيمٍ',
      translation:
        'And they denied him, so the punishment of the day of the black cloud seized them. Indeed, it was the punishment of a terrible day.',
    },
  },
  {
    id: 'q229',
    prophet: 'shuayb',
    level: 'hard',
    question: "Whose fate did Shu'ayb say was not far from his people?",
    answers: [
      'The people of Lut',
      'The people of Pharaoh',
      "The people of Saba'",
      'The people of Yunus',
    ],
    right: 0,
    reference: "Qur'an 11:89",
    verse: {
      reference: "Qur'an 11:89",
      verseArabic:
        'وَيَا قَوْمِ لَا يَجْرِمَنَّكُمْ شِقَاقِي أَنْ يُصِيبَكُمْ مِثْلُ مَا أَصَابَ قَوْمَ نُوحٍ أَوْ قَوْمَ هُودٍ أَوْ قَوْمَ صَالِحٍ ۚ وَمَا قَوْمُ لُوطٍ مِنْكُمْ بِبَعِيدٍ',
      translation:
        'And O my people, let not [your] dissension from me cause you to be struck by that similar to what struck the people of Nuh or the people of Hud or the people of Salih. And the people of Lut are not from you far away.',
    },
  },
  {
    id: 'q230',
    prophet: 'shuayb',
    level: 'hard',
    question: 'What took the people of Madyan?',
    answers: ['The earthquake and the shriek', 'A flood', 'A plague of locusts', 'A fire'],
    right: 0,
    reference: "Qur'an 7:91",
    verse: {
      reference: "Qur'an 7:91",
      verseArabic: 'فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ',
      translation:
        'So the earthquake seized them, and they became within their home [corpses] fallen prone.',
    },
  },
  {
    id: 'q231',
    prophet: 'lut',
    level: 'easy',
    question: "What did Lut's people say to drive him out?",
    answers: [
      '"They are men who keep themselves pure"',
      '"They are thieves"',
      '"They are strangers"',
      '"They are magicians"',
    ],
    right: 0,
    reference: "Qur'an 7:82",
    verse: {
      reference: "Qur'an 7:82",
      verseArabic:
        'وَمَا كَانَ جَوَابَ قَوْمِهِ إِلَّا أَنْ قَالُوا أَخْرِجُوهُمْ مِنْ قَرْيَتِكُمْ ۖ إِنَّهُمْ أُنَاسٌ يَتَطَهَّرُونَ',
      translation:
        'But the answer of his people was only that they said, "Evict them from your city! Indeed, they are men who keep themselves pure."',
    },
  },
  {
    id: 'q232',
    prophet: 'lut',
    level: 'easy',
    question: 'Whom did the angels visit before going to Lut?',
    answers: ['Ibrahim', 'Nuh', 'Hud', 'Musa'],
    right: 0,
    reference: "Qur'an 29:31",
    verse: {
      reference: "Qur'an 29:31",
      verseArabic:
        'وَلَمَّا جَاءَتْ رُسُلُنَا إِبْرَاهِيمَ بِالْبُشْرَىٰ قَالُوا إِنَّا مُهْلِكُو أَهْلِ هَٰذِهِ الْقَرْيَةِ ۖ إِنَّ أَهْلَهَا كَانُوا ظَالِمِينَ',
      translation:
        'And when Our messengers came to Ibrahim with the good tidings, they said, "Indeed, we will destroy the people of that Lut’s city. Indeed, its people have been wrongdoers."',
    },
  },
  {
    id: 'q233',
    prophet: 'lut',
    level: 'normal',
    question: 'What did Lut wish for when his people came for his guests?',
    answers: [
      'Some power or a strong support',
      'A ship to escape',
      'Rain to fall',
      'An army from Ibrahim',
    ],
    right: 0,
    reference: "Qur'an 11:80",
    verse: {
      reference: "Qur'an 11:80",
      verseArabic: 'قَالَ لَوْ أَنَّ لِي بِكُمْ قُوَّةً أَوْ آوِي إِلَىٰ رُكْنٍ شَدِيدٍ',
      translation:
        'He said, "If only I had against you some power or could take refuge in a strong support."',
    },
  },
  {
    id: 'q234',
    prophet: 'lut',
    level: 'normal',
    question: 'When did the angels tell Lut to leave with his family?',
    answers: ['During a portion of the night', 'At noon', 'At sunset', 'After three days'],
    right: 0,
    reference: "Qur'an 11:81",
    verse: {
      reference: "Qur'an 11:81",
      verseArabic:
        'قَالُوا يَا لُوطُ إِنَّا رُسُلُ رَبِّكَ لَنْ يَصِلُوا إِلَيْكَ ۖ فَأَسْرِ بِأَهْلِكَ بِقِطْعٍ مِنَ اللَّيْلِ وَلَا يَلْتَفِتْ مِنْكُمْ أَحَدٌ إِلَّا امْرَأَتَكَ ۖ إِنَّهُ مُصِيبُهَا مَا أَصَابَهُمْ ۚ إِنَّ مَوْعِدَهُمُ الصُّبْحُ ۚ أَلَيْسَ الصُّبْحُ بِقَرِيبٍ',
      translation:
        'The angels said, "O Lut, indeed we are messengers of your Lord; [therefore], they will never reach you. So set out with your family during a portion of the night and let not any among you look back - except your wife; indeed, she will be struck by that which strikes them. Indeed, their appointment is [for] the morning. Is not the morning near."',
    },
  },
  {
    id: 'q235',
    prophet: 'lut',
    level: 'normal',
    question: "What did Allah do to the eyes of those who demanded Lut's guests?",
    answers: [
      'He obliterated them',
      'He opened them to the truth',
      'He filled them with tears',
      'Nothing',
    ],
    right: 0,
    reference: "Qur'an 54:37",
    verse: {
      reference: "Qur'an 54:37",
      verseArabic:
        'وَلَقَدْ رَاوَدُوهُ عَنْ ضَيْفِهِ فَطَمَسْنَا أَعْيُنَهُمْ فَذُوقُوا عَذَابِي وَنُذُرِ',
      translation:
        'And they had demanded from him his guests, but We obliterated their eyes, [saying], "Taste My punishment and warning."',
    },
  },
  {
    id: 'q236',
    prophet: 'lut',
    level: 'hard',
    question: "How many houses of Muslims were found in Lut's cities?",
    answers: ['One', 'None', 'Seven', 'Ten'],
    right: 0,
    reference: "Qur'an 51:36",
    verse: {
      reference: "Qur'an 51:36",
      verseArabic: 'فَمَا وَجَدْنَا فِيهَا غَيْرَ بَيْتٍ مِنَ الْمُسْلِمِينَ',
      translation: 'And We found not within them other than a [single] house of Muslims.',
    },
  },
  {
    id: 'q237',
    prophet: 'ismail',
    level: 'hard',
    question: "What did Isma'il enjoin on his people?",
    answers: ['Prayer and zakah', 'War and conquest', 'Trade and travel', 'Hunting and archery'],
    right: 0,
    reference: "Qur'an 19:55",
    verse: {
      reference: "Qur'an 19:55",
      verseArabic:
        'وَكَانَ يَأْمُرُ أَهْلَهُ بِالصَّلَاةِ وَالزَّكَاةِ وَكَانَ عِنْدَ رَبِّهِ مَرْضِيًّا',
      translation:
        'And he used to enjoin on his people prayer and zakah and was to his Lord pleasing.',
    },
  },
  {
    id: 'q238',
    prophet: 'ismail',
    level: 'hard',
    question: 'What did the angel dig to bring out Zamzam?',
    answers: [
      'The earth, at the place of Zamzam',
      'A rock with a staff',
      'A well with a rope',
      'The side of a mountain',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q239',
    prophet: 'ismail',
    level: 'hard',
    question: "What sport did the Prophet ﷺ say Isma'il was skilled at?",
    answers: ['Archery', 'Wrestling', 'Horse racing', 'Swimming'],
    right: 0,
    reference: 'Sahih Bukhari 2899',
  },
  {
    id: 'q240',
    prophet: 'ismail',
    level: 'hard',
    question: "What did Ibrahim tell Isma'il's first wife to tell her husband?",
    answers: [
      'To change the threshold of his gate',
      'To come to Canaan',
      'To sell his flocks',
      'To build a house',
    ],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q241',
    prophet: 'ismail',
    level: 'hard',
    question: "What was Isma'il doing when Ibrahim came to build the House?",
    answers: ['Sharpening arrows near Zamzam', 'Tending sheep', 'Praying at Safa', 'Drawing water'],
    right: 0,
    reference: 'Sahih Bukhari 3364',
  },
  {
    id: 'q242',
    prophet: 'ismail',
    level: 'normal',
    question: "What did Ibrahim and Isma'il say as they raised the House?",
    answers: [
      '"Our Lord, accept this from us"',
      '"This House is ours"',
      '"Let the people come"',
      '"We have finished"',
    ],
    right: 0,
    reference: "Qur'an 2:127",
    verse: {
      reference: "Qur'an 2:127",
      verseArabic:
        'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
      translation:
        'And [mention] when Ibrahim was raising the foundations of the House and [with him] Isma‘il, [saying], "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."',
    },
  },
  {
    id: 'q243',
    prophet: 'ishaq',
    level: 'normal',
    question: "What did Ibrahim's wife say when given the good news of a son?",
    answers: [
      '"Shall I give birth while I am an old woman?"',
      '"I knew it would come"',
      '"Let it be a daughter"',
      '"Tell my husband first"',
    ],
    right: 0,
    reference: "Qur'an 11:72",
    verse: {
      reference: "Qur'an 11:72",
      verseArabic:
        'قَالَتْ يَا وَيْلَتَىٰ أَأَلِدُ وَأَنَا عَجُوزٌ وَهَٰذَا بَعْلِي شَيْخًا ۖ إِنَّ هَٰذَا لَشَيْءٌ عَجِيبٌ',
      translation:
        'She said, "Woe to me! Shall I give birth while I am an old woman and this, my husband, is an old man? Indeed, this is an amazing thing."',
    },
  },
  {
    id: 'q244',
    prophet: 'ishaq',
    level: 'hard',
    question: "How does the Qur'an describe Ishaq in 37:112?",
    answers: [
      'A prophet from among the righteous',
      'A king over Egypt',
      'A builder of the House',
      'A warrior',
    ],
    right: 0,
    reference: "Qur'an 37:112",
    verse: {
      reference: "Qur'an 37:112",
      verseArabic: 'وَبَشَّرْنَاهُ بِإِسْحَاقَ نَبِيًّا مِنَ الصَّالِحِينَ',
      translation: 'And We gave him good tidings of Ishaq, a prophet from among the righteous.',
    },
  },
  {
    id: 'q245',
    prophet: 'ishaq',
    level: 'hard',
    question:
      'Who called Yusuf "the honorable, the son of the honorable", naming Ishaq in his line?',
    answers: ['The Prophet Muhammad ﷺ', "Ya'qub", 'The king of Egypt', 'Jibril'],
    right: 0,
    reference: 'Sahih Bukhari 3382',
  },
  {
    id: 'q246',
    prophet: 'yaqub',
    level: 'normal',
    question: "What did Ya'qub fear would eat Yusuf?",
    answers: ['A wolf', 'A lion', 'A snake', 'A hawk'],
    right: 0,
    reference: "Qur'an 12:13",
    verse: {
      reference: "Qur'an 12:13",
      verseArabic:
        'قَالَ إِنِّي لَيَحْزُنُنِي أَنْ تَذْهَبُوا بِهِ وَأَخَافُ أَنْ يَأْكُلَهُ الذِّئْبُ وَأَنْتُمْ عَنْهُ غَافِلُونَ',
      translation:
        '[Ya‘qub] said, "Indeed, it saddens me that you should take him, and I fear that a wolf would eat him while you are of him unaware."',
    },
  },
  {
    id: 'q247',
    prophet: 'yaqub',
    level: 'normal',
    question: "What did Ya'qub say no one despairs of except the disbelievers?",
    answers: ['Relief from Allah', 'Rain', 'Wealth', 'Children'],
    right: 0,
    reference: "Qur'an 12:87",
    verse: {
      reference: "Qur'an 12:87",
      verseArabic:
        'يَا بَنِيَّ اذْهَبُوا فَتَحَسَّسُوا مِنْ يُوسُفَ وَأَخِيهِ وَلَا تَيْأَسُوا مِنْ رَوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِنْ رَوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ',
      translation:
        'O my sons, go and find out about Yusuf and his brother and despair not of relief from Allah. Indeed, no one despairs of relief from Allah except the disbelieving people.',
    },
  },
  {
    id: 'q248',
    prophet: 'yaqub',
    level: 'hard',
    question: "What did Ya'qub's sons promise to worship after him?",
    answers: [
      'The God of their fathers, one God',
      'The gods of Egypt',
      "Their father's grave",
      'The stars',
    ],
    right: 0,
    reference: "Qur'an 2:133",
    verse: {
      reference: "Qur'an 2:133",
      verseArabic:
        'أَمْ كُنْتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِنْ بَعْدِي قَالُوا نَعْبُدُ إِلَٰهَكَ وَإِلَٰهَ آبَائِكَ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ إِلَٰهًا وَاحِدًا وَنَحْنُ لَهُ مُسْلِمُونَ',
      translation:
        'Or were you witnesses when death approached Ya‘qub, when he said to his sons, "What will you worship after me?" They said, "We will worship your God and the God of your fathers, Ibrahim and Isma‘il and Ishaq - one God. And we are Muslims [in submission] to Him."',
    },
  },
  {
    id: 'q249',
    prophet: 'yaqub',
    level: 'hard',
    question: "What does the Qur'an say Ibrahim and Ya'qub instructed their sons?",
    answers: [
      'Not to die except as Muslims',
      'To stay in Canaan',
      'To marry within the family',
      'To keep the well',
    ],
    right: 0,
    reference: "Qur'an 2:132",
    verse: {
      reference: "Qur'an 2:132",
      verseArabic:
        'وَوَصَّىٰ بِهَا إِبْرَاهِيمُ بَنِيهِ وَيَعْقُوبُ يَا بَنِيَّ إِنَّ اللَّهَ اصْطَفَىٰ لَكُمُ الدِّينَ فَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ',
      translation:
        'And Ibrahim instructed his sons [to do the same] and [so did] Ya‘qub, [saying], "O my sons, indeed Allah has chosen for you this religion, so do not die except while you are Muslims."',
    },
  },
  {
    id: 'q250',
    prophet: 'yaqub',
    level: 'hard',
    question: "How does the Qur'an describe Ibrahim, Ishaq and Ya'qub in 38:45?",
    answers: [
      'Of strength and vision',
      'Of wealth and power',
      'Of beauty and wisdom',
      'Of song and poetry',
    ],
    right: 0,
    reference: "Qur'an 38:45",
    verse: {
      reference: "Qur'an 38:45",
      verseArabic:
        'وَاذْكُرْ عِبَادَنَا إِبْرَاهِيمَ وَإِسْحَاقَ وَيَعْقُوبَ أُولِي الْأَيْدِي وَالْأَبْصَارِ',
      translation:
        'And remember Our servants, Ibrahim, Ishaq and Ya‘qub - those of strength and [religious] vision.',
    },
  },
  {
    id: 'q251',
    prophet: 'harun',
    level: 'normal',
    question: 'Whom did Musa leave in his place when he went to the appointment?',
    answers: ['Harun', "Yusha'", 'The Samiri', 'His father-in-law'],
    right: 0,
    reference: "Qur'an 7:142",
    verse: {
      reference: "Qur'an 7:142",
      verseArabic:
        '۞ وَوَاعَدْنَا مُوسَىٰ ثَلَاثِينَ لَيْلَةً وَأَتْمَمْنَاهَا بِعَشْرٍ فَتَمَّ مِيقَاتُ رَبِّهِ أَرْبَعِينَ لَيْلَةً ۚ وَقَالَ مُوسَىٰ لِأَخِيهِ هَارُونَ اخْلُفْنِي فِي قَوْمِي وَأَصْلِحْ وَلَا تَتَّبِعْ سَبِيلَ الْمُفْسِدِينَ',
      translation:
        'And We made an appointment with Musa for thirty nights and perfected them by [the addition of] ten; so the term of his Lord was completed as forty nights. And Musa said to his brother Harun, "Take my place among my people, do right [by them], and do not follow the way of the corrupters."',
    },
  },
  {
    id: 'q252',
    prophet: 'harun',
    level: 'hard',
    question: 'What did Harun say when Musa seized him by the head?',
    answers: [
      '"O son of my mother, do not seize me by my beard"',
      '"Let me go, I am older"',
      '"It was your fault"',
      '"Ask the people"',
    ],
    right: 0,
    reference: "Qur'an 20:94",
    verse: {
      reference: "Qur'an 20:94",
      verseArabic:
        'قَالَ يَا ابْنَ أُمَّ لَا تَأْخُذْ بِلِحْيَتِي وَلَا بِرَأْسِي ۖ إِنِّي خَشِيتُ أَنْ تَقُولَ فَرَّقْتَ بَيْنَ بَنِي إِسْرَائِيلَ وَلَمْ تَرْقُبْ قَوْلِي',
      translation:
        '[Harun] said, "O son of my mother, do not seize [me] by my beard or by my head. Indeed, I feared that you would say, ’You caused division among the Children of Israel, and you did not observe [or await] my word."',
    },
  },
  {
    id: 'q253',
    prophet: 'harun',
    level: 'hard',
    question: 'In which heaven did the Prophet ﷺ meet Harun on the Night Journey?',
    answers: ['The fifth', 'The first', 'The third', 'The seventh'],
    right: 0,
    reference: 'Sahih Bukhari 3393',
  },
  {
    id: 'q254',
    prophet: 'harun',
    level: 'hard',
    question: 'To whom did the Prophet ﷺ say, "You will be to me like Harun to Musa"?',
    answers: ["'Ali", 'Abu Bakr', "'Umar", "'Uthman"],
    right: 0,
    reference: 'Sahih Bukhari 4416',
  },
  {
    id: 'q255',
    prophet: 'harun',
    level: 'hard',
    question: "What peace does Allah send in Qur'an 37:120?",
    answers: [
      'Peace upon Musa and Harun',
      'Peace upon Musa and Pharaoh',
      'Peace upon all of Egypt',
      'Peace upon the magicians',
    ],
    right: 0,
    reference: "Qur'an 37:120",
    verse: {
      reference: "Qur'an 37:120",
      verseArabic: 'سَلَامٌ عَلَىٰ مُوسَىٰ وَهَارُونَ',
      translation: 'Peace upon Musa and Harun.',
    },
  },
  {
    id: 'q256',
    prophet: 'yunus',
    level: 'easy',
    question: 'How did Yunus leave his people?',
    answers: [
      'In anger',
      'In secret at night',
      'With their blessing',
      "On Allah's command to flee",
    ],
    right: 0,
    reference: "Qur'an 21:87",
    verse: {
      reference: "Qur'an 21:87",
      verseArabic:
        'وَذَا النُّونِ إِذْ ذَهَبَ مُغَاضِبًا فَظَنَّ أَنْ لَنْ نَقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      translation:
        'And [mention] the man of the fish, when he went off in anger and thought that We would not decree [anything] upon him. And he called out within the darknesses, "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers."',
    },
  },
  {
    id: 'q257',
    prophet: 'yunus',
    level: 'hard',
    question: 'What did Yunus do on the ship before he was thrown off?',
    answers: ['He drew lots', 'He prayed for a storm', 'He hid below deck', 'He slept'],
    right: 0,
    reference: "Qur'an 37:141",
    verse: {
      reference: "Qur'an 37:141",
      verseArabic: 'فَسَاهَمَ فَكَانَ مِنَ الْمُدْحَضِينَ',
      translation: 'And he drew lots and was among the losers.',
    },
  },
  {
    id: 'q258',
    prophet: 'yunus',
    level: 'easy',
    question: 'What did Yunus say from within the darknesses?',
    answers: [
      '"There is no deity except You; exalted are You"',
      '"Save me from the fish"',
      '"Return me to my people"',
      '"Forgive my people"',
    ],
    right: 0,
    reference: "Qur'an 21:87",
    verse: {
      reference: "Qur'an 21:87",
      verseArabic:
        'وَذَا النُّونِ إِذْ ذَهَبَ مُغَاضِبًا فَظَنَّ أَنْ لَنْ نَقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
      translation:
        'And [mention] the man of the fish, when he went off in anger and thought that We would not decree [anything] upon him. And he called out within the darknesses, "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers."',
    },
  },
  {
    id: 'q259',
    prophet: 'yunus',
    level: 'hard',
    question: 'What would have happened to Yunus had he not glorified Allah?',
    answers: [
      'He would have stayed in the fish until the Resurrection',
      'He would have drowned at once',
      'He would have reached another land',
      'Nothing',
    ],
    right: 0,
    reference: "Qur'an 37:144",
    verse: {
      reference: "Qur'an 37:144",
      verseArabic: 'لَلَبِثَ فِي بَطْنِهِ إِلَىٰ يَوْمِ يُبْعَثُونَ',
      translation: 'He would have remained inside its belly until the Day they are resurrected.',
    },
  },
  {
    id: 'q260',
    prophet: 'yunus',
    level: 'hard',
    question: "Which people's faith benefited them, so that the punishment was lifted?",
    answers: [
      'The people of Yunus',
      'The people of Nuh',
      'The people of Pharaoh',
      "The people of 'Ad",
    ],
    right: 0,
    reference: "Qur'an 10:98",
    verse: {
      reference: "Qur'an 10:98",
      verseArabic:
        'فَلَوْلَا كَانَتْ قَرْيَةٌ آمَنَتْ فَنَفَعَهَا إِيمَانُهَا إِلَّا قَوْمَ يُونُسَ لَمَّا آمَنُوا كَشَفْنَا عَنْهُمْ عَذَابَ الْخِزْيِ فِي الْحَيَاةِ الدُّنْيَا وَمَتَّعْنَاهُمْ إِلَىٰ حِينٍ',
      translation:
        'Then has there not been a [single] city that believed so its faith benefited it except the people of Yunus? When they believed, We removed from them the punishment of disgrace in worldly life and gave them enjoyment for a time.',
    },
  },
  {
    id: 'q261',
    prophet: 'yunus',
    level: 'hard',
    question: 'Who was the father of Yunus, as named by the Prophet ﷺ?',
    answers: ['Matta', 'Imran', 'Azar', 'Zakariyya'],
    right: 0,
    reference: 'Sahih Bukhari 3413',
  },
  {
    id: 'q262',
    prophet: 'ayyub',
    level: 'hard',
    question: 'What did Ayyub say when he called to his Lord?',
    answers: [
      '"Adversity has touched me"',
      '"Return my wealth"',
      '"Punish my enemies"',
      '"Take my life"',
    ],
    right: 0,
    reference: "Qur'an 21:83",
    verse: {
      reference: "Qur'an 21:83",
      verseArabic:
        '۞ وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ',
      translation:
        'And [mention] Ayyub, when he called to his Lord, "Indeed, adversity has touched me, and you are the Most Merciful of the merciful."',
    },
  },
  {
    id: 'q263',
    prophet: 'ayyub',
    level: 'normal',
    question: 'What did Allah give back to Ayyub?',
    answers: ['His family and the like of them', 'Only his health', 'A kingdom', 'His youth'],
    right: 0,
    reference: "Qur'an 21:84",
    verse: {
      reference: "Qur'an 21:84",
      verseArabic:
        'فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِنْ ضُرٍّ ۖ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُمْ مَعَهُمْ رَحْمَةً مِنْ عِنْدِنَا وَذِكْرَىٰ لِلْعَابِدِينَ',
      translation:
        'So We responded to him and removed what afflicted him of adversity. And We gave him [back] his family and the like thereof with them as mercy from Us and a reminder for the worshippers [of Allah].',
    },
  },
  {
    id: 'q264',
    prophet: 'ayyub',
    level: 'hard',
    question: 'What was Ayyub told to take in his hand so as not to break his oath?',
    answers: ['A bunch of grass', 'A staff', 'A stone', 'A sword'],
    right: 0,
    reference: "Qur'an 38:44",
    verse: {
      reference: "Qur'an 38:44",
      verseArabic:
        'وَخُذْ بِيَدِكَ ضِغْثًا فَاضْرِبْ بِهِ وَلَا تَحْنَثْ ۗ إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ',
      translation:
        '[We said], "And take in your hand a bunch [of grass] and strike with it and do not break your oath." Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back [to Allah].',
    },
  },
  {
    id: 'q265',
    prophet: 'zakariyya',
    level: 'hard',
    question: 'What did Zakariyya say about his bones and his head?',
    answers: [
      'His bones had weakened and his head had filled with white',
      'His bones were strong',
      'His head was full of wisdom',
      'He had no pain',
    ],
    right: 0,
    reference: "Qur'an 19:4",
    verse: {
      reference: "Qur'an 19:4",
      verseArabic:
        'قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُنْ بِدُعَائِكَ رَبِّ شَقِيًّا',
      translation:
        'He said, "My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy."',
    },
  },
  {
    id: 'q266',
    prophet: 'zakariyya',
    level: 'easy',
    question: 'What did Zakariyya ask Allah for?',
    answers: ['An heir', 'Wealth', 'A long life', 'A kingdom'],
    right: 0,
    reference: "Qur'an 19:5",
    verse: {
      reference: "Qur'an 19:5",
      verseArabic:
        'وَإِنِّي خِفْتُ الْمَوَالِيَ مِنْ وَرَائِي وَكَانَتِ امْرَأَتِي عَاقِرًا فَهَبْ لِي مِنْ لَدُنْكَ وَلِيًّا',
      translation:
        'And indeed, I fear the successors after me, and my wife has been barren, so give me from Yourself an heir.',
    },
  },
  {
    id: 'q267',
    prophet: 'zakariyya',
    level: 'hard',
    question: "What was Zakariyya's work, according to the Prophet ﷺ?",
    answers: ['A carpenter', 'A shepherd', 'A blacksmith', 'A merchant'],
    right: 0,
    reference: 'Sahih Muslim 2379',
  },
  {
    id: 'q268',
    prophet: 'zakariyya',
    level: 'hard',
    question: 'What did Zakariyya signal to his people during his silence?',
    answers: [
      'To glorify Allah morning and afternoon',
      'To bring food',
      'To leave the city',
      'To fast',
    ],
    right: 0,
    reference: "Qur'an 19:11",
    verse: {
      reference: "Qur'an 19:11",
      verseArabic:
        'فَخَرَجَ عَلَىٰ قَوْمِهِ مِنَ الْمِحْرَابِ فَأَوْحَىٰ إِلَيْهِمْ أَنْ سَبِّحُوا بُكْرَةً وَعَشِيًّا',
      translation:
        'So he came out to his people from the prayer chamber and signaled to them to exalt [Allah] in the morning and afternoon.',
    },
  },
  {
    id: 'q269',
    prophet: 'yahya',
    level: 'easy',
    question: "How does the Qur'an describe Yahya toward his parents?",
    answers: ['Dutiful', 'Distant', 'Disobedient', 'Unknown to them'],
    right: 0,
    reference: "Qur'an 19:14",
    verse: {
      reference: "Qur'an 19:14",
      verseArabic: 'وَبَرًّا بِوَالِدَيْهِ وَلَمْ يَكُنْ جَبَّارًا عَصِيًّا',
      translation: 'And dutiful to his parents, and he was not a disobedient tyrant.',
    },
  },
  {
    id: 'q270',
    prophet: 'yahya',
    level: 'hard',
    question: "On which three days does the Qur'an send peace upon Yahya?",
    answers: [
      'The day he was born, the day he dies, the day he is raised',
      'Three days of Eid',
      'His wedding, his travel and his death',
      'The days of his prophethood',
    ],
    right: 0,
    reference: "Qur'an 19:15",
    verse: {
      reference: "Qur'an 19:15",
      verseArabic: 'وَسَلَامٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا',
      translation:
        'And peace be upon him the day he was born and the day he dies and the day he is raised alive.',
    },
  },
  {
    id: 'q271',
    prophet: 'yahya',
    level: 'hard',
    question: 'Where did Yahya gather the Children of Israel to give them five commands?',
    answers: ['Jerusalem', 'Madyan', 'Egypt', 'Makkah'],
    right: 0,
    reference: 'Al-Tirmidhi 2863',
  },
  {
    id: 'q272',
    prophet: 'yahya',
    level: 'hard',
    question: 'With whom did the Prophet ﷺ meet Yahya on the Night Journey?',
    answers: ["'Isa", 'Zakariyya', 'Musa', 'Ibrahim'],
    right: 0,
    reference: 'Sahih Bukhari 3207',
  },
  {
    id: 'q273',
    prophet: 'ilyas',
    level: 'hard',
    question: "How does the Qur'an describe Ilyas in 37:123?",
    answers: [
      'From among the messengers',
      'A king of Israel',
      'A friend of Musa',
      'A companion of the cave',
    ],
    right: 0,
    reference: "Qur'an 37:123",
    verse: {
      reference: "Qur'an 37:123",
      verseArabic: 'وَإِنَّ إِلْيَاسَ لَمِنَ الْمُرْسَلِينَ',
      translation: 'And indeed, Ilyas was from among the messengers.',
    },
  },
  {
    id: 'q274',
    prophet: 'ilyas',
    level: 'hard',
    question: 'With which prophets is Ilyas named "of the righteous" in 6:85?',
    answers: ["Zakariyya, Yahya and 'Isa", 'Musa and Harun', 'Nuh and Hud', 'Dawud and Sulayman'],
    right: 0,
    reference: "Qur'an 6:85",
    verse: {
      reference: "Qur'an 6:85",
      verseArabic: 'وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِنَ الصَّالِحِينَ',
      translation: 'And Zakariyya and Yahya and ‘Isa and Ilyas - and all were of the righteous.',
    },
  },
  {
    id: 'q275',
    prophet: 'idris',
    level: 'hard',
    question: 'What did Allah raise Idris to?',
    answers: [
      'A high station',
      'A throne on earth',
      'The rank of king',
      'The leadership of the angels',
    ],
    right: 0,
    reference: "Qur'an 19:57",
    verse: {
      reference: "Qur'an 19:57",
      verseArabic: 'وَرَفَعْنَاهُ مَكَانًا عَلِيًّا',
      translation: 'And We raised him to a high station.',
    },
  },
  {
    id: 'q276',
    prophet: 'al-yasa',
    level: 'hard',
    question: "How many times is Al-Yasa' named in the Qur'an?",
    answers: ['Twice', 'Once', 'Seven times', 'Never'],
    right: 0,
    reference: "Qur'an 6:86 · Qur'an 38:48",
    verse: {
      reference: "Qur'an 6:86",
      verseArabic:
        'وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ',
      translation:
        'And Isma‘il and Al-Yasa‘ and Yunus and Lut - and all [of them] We preferred over the worlds.',
    },
  },
  {
    id: 'q277',
    prophet: 'dhul-kifl',
    level: 'hard',
    question: 'With whom is Dhul-Kifl named "among the outstanding"?',
    answers: ["Isma'il and Al-Yasa'", 'Ibrahim and Ishaq', 'Musa and Harun', 'Hud and Salih'],
    right: 0,
    reference: "Qur'an 38:48",
    verse: {
      reference: "Qur'an 38:48",
      verseArabic: 'وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِنَ الْأَخْيَارِ',
      translation:
        'And remember Isma‘il, Al-Yasa‘ and Dhul-Kifl, and all are among the outstanding.',
    },
  },
  {
    id: 'q278',
    prophet: 'isa',
    level: 'normal',
    question: "What did Maryam's people call her when she brought 'Isa to them?",
    answers: ['"O sister of Harun"', '"O daughter of Musa"', '"O wife of Zakariyya"', '"O queen"'],
    right: 0,
    reference: "Qur'an 19:28",
    verse: {
      reference: "Qur'an 19:28",
      verseArabic:
        'يَا أُخْتَ هَارُونَ مَا كَانَ أَبُوكِ امْرَأَ سَوْءٍ وَمَا كَانَتْ أُمُّكِ بَغِيًّا',
      translation:
        'O sister of Harun, your father was not a man of evil, nor was your mother unchaste.',
    },
  },
  {
    id: 'q279',
    prophet: 'isa',
    level: 'hard',
    question: 'Why was Maryam called "sister of Harun", according to the Prophet ﷺ?',
    answers: [
      'People named their children after earlier prophets and righteous people',
      "She was Musa's sister",
      "She lived in Harun's house",
      'It was a title of queens',
    ],
    right: 0,
    reference: 'Sahih Muslim 2135',
  },
  {
    id: 'q280',
    prophet: 'isa',
    level: 'hard',
    question: "Who, besides 'Isa, was not touched by Satan at birth, according to the Prophet ﷺ?",
    answers: ['His mother Maryam', 'Yahya', 'Adam', 'Ibrahim'],
    right: 0,
    reference: 'Sahih Bukhari 3431',
  },
  {
    id: 'q281',
    prophet: 'isa',
    level: 'hard',
    question: 'How many people spoke in the cradle, according to the Prophet ﷺ?',
    answers: ['Three', 'One', 'Two', 'Seven'],
    right: 0,
    reference: 'Sahih Bukhari 3436',
  },
  {
    id: 'q282',
    prophet: 'isa',
    level: 'hard',
    question: "What does the Qur'an say of the Messiah and servitude to Allah?",
    answers: [
      'He would never disdain to be a servant of Allah',
      'He was above being a servant',
      'He was the son of Allah',
      'He served only the angels',
    ],
    right: 0,
    reference: "Qur'an 4:172",
    verse: {
      reference: "Qur'an 4:172",
      verseArabic:
        'لَنْ يَسْتَنْكِفَ الْمَسِيحُ أَنْ يَكُونَ عَبْدًا لِلَّهِ وَلَا الْمَلَائِكَةُ الْمُقَرَّبُونَ ۚ وَمَنْ يَسْتَنْكِفْ عَنْ عِبَادَتِهِ وَيَسْتَكْبِرْ فَسَيَحْشُرُهُمْ إِلَيْهِ جَمِيعًا',
      translation:
        'Never would the Messiah disdain to be a servant of Allah, nor would the angels near [to Him]. And whoever disdains His worship and is arrogant - He will gather them to Himself all together.',
    },
  },
  {
    id: 'q283',
    prophet: 'isa',
    level: 'hard',
    question: "What did Allah say He would do with 'Isa in 3:55?",
    answers: [
      'Take him and raise him to Himself',
      'Make him a king',
      'Let him be crucified',
      'Send him to Egypt',
    ],
    right: 0,
    reference: "Qur'an 3:55",
    verse: {
      reference: "Qur'an 3:55",
      verseArabic:
        'إِذْ قَالَ اللَّهُ يَا عِيسَىٰ إِنِّي مُتَوَفِّيكَ وَرَافِعُكَ إِلَيَّ وَمُطَهِّرُكَ مِنَ الَّذِينَ كَفَرُوا وَجَاعِلُ الَّذِينَ اتَّبَعُوكَ فَوْقَ الَّذِينَ كَفَرُوا إِلَىٰ يَوْمِ الْقِيَامَةِ ۖ ثُمَّ إِلَيَّ مَرْجِعُكُمْ فَأَحْكُمُ بَيْنَكُمْ فِيمَا كُنْتُمْ فِيهِ تَخْتَلِفُونَ',
      translation:
        '[Mention] when Allah said, "O ‘Isa, indeed I will take you and raise you to Myself and purify you from those who disbelieve and make those who follow you [in submission to Allah alone] superior to those who disbelieve until the Day of Resurrection. Then to Me is your return, and I will judge between you concerning that in which you used to differ."',
    },
  },
  {
    id: 'q284',
    prophet: 'isa',
    level: 'hard',
    question: "What did Allah place in the hearts of those who followed 'Isa?",
    answers: ['Compassion and mercy', 'Anger and pride', 'Love of wealth', 'Fear of the sea'],
    right: 0,
    reference: "Qur'an 57:27",
    verse: {
      reference: "Qur'an 57:27",
      verseArabic:
        'ثُمَّ قَفَّيْنَا عَلَىٰ آثَارِهِمْ بِرُسُلِنَا وَقَفَّيْنَا بِعِيسَى ابْنِ مَرْيَمَ وَآتَيْنَاهُ الْإِنْجِيلَ وَجَعَلْنَا فِي قُلُوبِ الَّذِينَ اتَّبَعُوهُ رَأْفَةً وَرَحْمَةً وَرَهْبَانِيَّةً ابْتَدَعُوهَا مَا كَتَبْنَاهَا عَلَيْهِمْ إِلَّا ابْتِغَاءَ رِضْوَانِ اللَّهِ فَمَا رَعَوْهَا حَقَّ رِعَايَتِهَا ۖ فَآتَيْنَا الَّذِينَ آمَنُوا مِنْهُمْ أَجْرَهُمْ ۖ وَكَثِيرٌ مِنْهُمْ فَاسِقُونَ',
      translation:
        'Then We sent following their footsteps Our messengers and followed [them] with ‘Isa, the son of Maryam, and gave him the Gospel. And We placed in the hearts of those who followed him compassion and mercy and monasticism, which they innovated; We did not prescribe it for them except [that they did so] seeking the approval of Allah. But they did not observe it with due observance. So We gave the ones who believed among them their reward, but many of them are defiantly disobedient.',
    },
  },
  {
    id: 'q285',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Musa say about his tongue when he was sent to Pharaoh?',
    answers: [
      'He asked Allah to untie the knot from it',
      'That it was the most eloquent',
      'That he would speak through angels',
      'That he would write instead',
    ],
    right: 0,
    reference: "Qur'an 20:27",
    verse: {
      reference: "Qur'an 20:27",
      verseArabic: 'وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي',
      translation: 'And untie the knot from my tongue.',
    },
  },
  {
    id: 'q286',
    prophet: 'musa',
    level: 'hard',
    question: 'What did Pharaoh threaten the magicians with after they believed?',
    answers: [
      'Cutting off their hands and feet and crucifying them',
      'Exile to Madyan',
      'Prison for a year',
      'Taking their wealth',
    ],
    right: 0,
    reference: "Qur'an 20:71",
    verse: {
      reference: "Qur'an 20:71",
      verseArabic:
        'قَالَ آمَنْتُمْ لَهُ قَبْلَ أَنْ آذَنَ لَكُمْ ۖ إِنَّهُ لَكَبِيرُكُمُ الَّذِي عَلَّمَكُمُ السِّحْرَ ۖ فَلَأُقَطِّعَنَّ أَيْدِيَكُمْ وَأَرْجُلَكُمْ مِنْ خِلَافٍ وَلَأُصَلِّبَنَّكُمْ فِي جُذُوعِ النَّخْلِ وَلَتَعْلَمُنَّ أَيُّنَا أَشَدُّ عَذَابًا وَأَبْقَىٰ',
      translation:
        '[Pharaoh] said, "You believed him before I gave you permission. Indeed, he is your leader who has taught you magic. So I will surely cut off your hands and your feet on opposite sides, and I will crucify you on the trunks of palm trees, and you will surely know which of us is more severe in [giving] punishment and more enduring."',
    },
  },
  {
    id: 'q287',
    prophet: 'musa',
    level: 'hard',
    question: "Who hid his faith in Pharaoh's family and spoke up for Musa?",
    answers: ["A believing man of Pharaoh's family", "Pharaoh's son", 'Haman', 'Qarun'],
    right: 0,
    reference: "Qur'an 40:28",
    verse: {
      reference: "Qur'an 40:28",
      verseArabic:
        'وَقَالَ رَجُلٌ مُؤْمِنٌ مِنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَنْ يَقُولَ رَبِّيَ اللَّهُ وَقَدْ جَاءَكُمْ بِالْبَيِّنَاتِ مِنْ رَبِّكُمْ ۖ وَإِنْ يَكُ كَاذِبًا فَعَلَيْهِ كَذِبُهُ ۖ وَإِنْ يَكُ صَادِقًا يُصِبْكُمْ بَعْضُ الَّذِي يَعِدُكُمْ ۖ إِنَّ اللَّهَ لَا يَهْدِي مَنْ هُوَ مُسْرِفٌ كَذَّابٌ',
      translation:
        'And a believing man from the family of Pharaoh who concealed his faith said, "Do you kill a man [merely] because he says, ’My Lord is Allah’ while he has brought you clear proofs from your Lord? And if he should be lying, then upon him is [the consequence of] his lie; but if he should be truthful, there will strike you some of what he promises you. Indeed, Allah does not guide one who is a transgressor and a liar."',
    },
  },
  {
    id: 'q288',
    prophet: 'musa',
    level: 'normal',
    question: 'What did Pharaoh proclaim to his people?',
    answers: [
      '"I am your most exalted lord"',
      '"I am a servant of Allah"',
      '"I am the brother of Musa"',
      '"I am a prophet"',
    ],
    right: 0,
    reference: "Qur'an 79:24",
    verse: {
      reference: "Qur'an 79:24",
      verseArabic: 'فَقَالَ أَنَا رَبُّكُمُ الْأَعْلَىٰ',
      translation: 'And said, "I am your most exalted lord."',
    },
  },
  {
    id: 'q289',
    prophet: 'musa',
    level: 'hard',
    question: 'What did the Children of Israel ask Musa to make after crossing the sea?',
    answers: [
      'A god like the idols of a people they passed',
      'A city',
      'A ship',
      'A temple of gold',
    ],
    right: 0,
    reference: "Qur'an 7:138",
    verse: {
      reference: "Qur'an 7:138",
      verseArabic:
        'وَجَاوَزْنَا بِبَنِي إِسْرَائِيلَ الْبَحْرَ فَأَتَوْا عَلَىٰ قَوْمٍ يَعْكُفُونَ عَلَىٰ أَصْنَامٍ لَهُمْ ۚ قَالُوا يَا مُوسَى اجْعَلْ لَنَا إِلَٰهًا كَمَا لَهُمْ آلِهَةٌ ۚ قَالَ إِنَّكُمْ قَوْمٌ تَجْهَلُونَ',
      translation:
        'And We took the Children of Israel across the sea; then they came upon a people intent in devotion to [some] idols of theirs. They said, "O Musa, make for us a god just as they have gods." He said, "Indeed, you are a people behaving ignorantly."',
    },
  },
  {
    id: 'q290',
    prophet: 'musa',
    level: 'hard',
    question: 'What did Musa ask Allah to show him at the appointment?',
    answers: ['Himself, that he might look at Him', 'Paradise', 'The Hereafter', 'The angels'],
    right: 0,
    reference: "Qur'an 7:143",
    verse: {
      reference: "Qur'an 7:143",
      verseArabic:
        'وَلَمَّا جَاءَ مُوسَىٰ لِمِيقَاتِنَا وَكَلَّمَهُ رَبُّهُ قَالَ رَبِّ أَرِنِي أَنْظُرْ إِلَيْكَ ۚ قَالَ لَنْ تَرَانِي وَلَٰكِنِ انْظُرْ إِلَى الْجَبَلِ فَإِنِ اسْتَقَرَّ مَكَانَهُ فَسَوْفَ تَرَانِي ۚ فَلَمَّا تَجَلَّىٰ رَبُّهُ لِلْجَبَلِ جَعَلَهُ دَكًّا وَخَرَّ مُوسَىٰ صَعِقًا ۚ فَلَمَّا أَفَاقَ قَالَ سُبْحَانَكَ تُبْتُ إِلَيْكَ وَأَنَا أَوَّلُ الْمُؤْمِنِينَ',
      translation:
        'And when Musa arrived at Our appointed time and his Lord spoke to him, he said, "My Lord, show me [Yourself] that I may look at You." [Allah] said, "You will not see Me, but look at the mountain; if it should remain in place, then you will see Me." But when his Lord appeared to the mountain, He rendered it level, and Musa fell unconscious. And when he awoke, he said, "Exalted are You! I have repented to You, and I am the first of the believers."',
    },
  },
  {
    id: 'q291',
    prophet: 'musa',
    level: 'hard',
    question: 'How many men did Musa choose for the appointment with his Lord after the calf?',
    answers: ['Seventy', 'Twelve', 'Forty', 'Seven'],
    right: 0,
    reference: "Qur'an 7:155",
    verse: {
      reference: "Qur'an 7:155",
      verseArabic:
        'وَاخْتَارَ مُوسَىٰ قَوْمَهُ سَبْعِينَ رَجُلًا لِمِيقَاتِنَا ۖ فَلَمَّا أَخَذَتْهُمُ الرَّجْفَةُ قَالَ رَبِّ لَوْ شِئْتَ أَهْلَكْتَهُمْ مِنْ قَبْلُ وَإِيَّايَ ۖ أَتُهْلِكُنَا بِمَا فَعَلَ السُّفَهَاءُ مِنَّا ۖ إِنْ هِيَ إِلَّا فِتْنَتُكَ تُضِلُّ بِهَا مَنْ تَشَاءُ وَتَهْدِي مَنْ تَشَاءُ ۖ أَنْتَ وَلِيُّنَا فَاغْفِرْ لَنَا وَارْحَمْنَا ۖ وَأَنْتَ خَيْرُ الْغَافِرِينَ',
      translation:
        'And Musa chose from his people seventy men for Our appointment. And when the earthquake seized them, he said, "My Lord, if You had willed, You could have destroyed them before and me [as well]. Would You destroy us for what the foolish among us have done? This is not but Your trial by which You send astray whom You will and guide whom You will. You are our Protector, so forgive us and have mercy upon us; and You are the best of forgivers."',
    },
  },
  {
    id: 'q292',
    prophet: 'musa',
    level: 'normal',
    question: 'What did the Children of Israel say when told to enter the Holy Land?',
    answers: [
      '"Go, you and your Lord, and fight"',
      '"We will enter at once"',
      '"Show us the way"',
      '"Let us pray first"',
    ],
    right: 0,
    reference: "Qur'an 5:24",
    verse: {
      reference: "Qur'an 5:24",
      verseArabic:
        'قَالُوا يَا مُوسَىٰ إِنَّا لَنْ نَدْخُلَهَا أَبَدًا مَا دَامُوا فِيهَا ۖ فَاذْهَبْ أَنْتَ وَرَبُّكَ فَقَاتِلَا إِنَّا هَاهُنَا قَاعِدُونَ',
      translation:
        'They said, "O Musa, indeed we will not enter it, ever, as long as they are within it; so go, you and your Lord, and fight. Indeed, we are remaining right here."',
    },
  },
  {
    id: 'q293',
    prophet: 'musa',
    level: 'hard',
    question: 'Who was the servant who travelled with Musa to the junction of the two seas?',
    answers: ["Yusha' ibn Nun", 'Harun', 'Al-Khidr', 'Qarun'],
    right: 0,
    reference: 'Sahih Bukhari 122',
  },
  {
    id: 'q294',
    prophet: 'musa',
    level: 'normal',
    question: 'What did al-Khidr do in the town that refused them food?',
    answers: [
      'Rebuilt a wall about to collapse',
      'Cursed the town',
      'Asked for payment',
      'Left at once',
    ],
    right: 0,
    reference: "Qur'an 18:77",
    verse: {
      reference: "Qur'an 18:77",
      verseArabic:
        'فَانْطَلَقَا حَتَّىٰ إِذَا أَتَيَا أَهْلَ قَرْيَةٍ اسْتَطْعَمَا أَهْلَهَا فَأَبَوْا أَنْ يُضَيِّفُوهُمَا فَوَجَدَا فِيهَا جِدَارًا يُرِيدُ أَنْ يَنْقَضَّ فَأَقَامَهُ ۖ قَالَ لَوْ شِئْتَ لَاتَّخَذْتَ عَلَيْهِ أَجْرًا',
      translation:
        'So they set out, until when they came to the people of a town, they asked its people for food, but they refused to offer them hospitality. And they found therein a wall about to collapse, so al-Khidh r restored it. [Musa] said, "If you wished, you could have taken for it a payment."',
    },
  },
  {
    id: 'q295',
    prophet: 'musa',
    level: 'hard',
    question: 'What did the Prophet ﷺ say Musa advised him to do about the fifty prayers?',
    answers: ['Return and ask for less', 'Accept them all', 'Pray them in groups', 'Delay them'],
    right: 0,
    reference: 'Sahih Bukhari 3207',
  },
  {
    id: 'q296',
    prophet: 'musa',
    level: 'hard',
    question: "What does Qur'an 4:164 say Allah did with Musa?",
    answers: [
      'Spoke to him with direct speech',
      'Raised him to the heavens',
      'Made him a king',
      'Sent him a dream',
    ],
    right: 0,
    reference: "Qur'an 4:164",
    verse: {
      reference: "Qur'an 4:164",
      verseArabic:
        'وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِنْ قَبْلُ وَرُسُلًا لَمْ نَقْصُصْهُمْ عَلَيْكَ ۚ وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا',
      translation:
        'And [We sent] messengers about whom We have related [their stories] to you before and messengers about whom We have not related to you. And Allah spoke to Musa with [direct] speech.',
    },
  },
  {
    id: 'q297',
    prophet: 'ibrahim',
    level: 'normal',
    question: 'What did Ibrahim ask to be shown in 2:260?',
    answers: [
      'How Allah gives life to the dead',
      'The angels',
      'Paradise',
      'The future of his sons',
    ],
    right: 0,
    reference: "Qur'an 2:260",
    verse: {
      reference: "Qur'an 2:260",
      verseArabic:
        'وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ أَرِنِي كَيْفَ تُحْيِي الْمَوْتَىٰ ۖ قَالَ أَوَلَمْ تُؤْمِنْ ۖ قَالَ بَلَىٰ وَلَٰكِنْ لِيَطْمَئِنَّ قَلْبِي ۖ قَالَ فَخُذْ أَرْبَعَةً مِنَ الطَّيْرِ فَصُرْهُنَّ إِلَيْكَ ثُمَّ اجْعَلْ عَلَىٰ كُلِّ جَبَلٍ مِنْهُنَّ جُزْءًا ثُمَّ ادْعُهُنَّ يَأْتِينَكَ سَعْيًا ۚ وَاعْلَمْ أَنَّ اللَّهَ عَزِيزٌ حَكِيمٌ',
      translation:
        'And [mention] when Ibrahim said, "My Lord, show me how You give life to the dead." [Allah] said, "Have you not believed?" He said, "Yes, but [I ask] only that my heart may be satisfied." [Allah] said, "Take four birds and commit them to yourself. Then [after slaughtering them] put on each hill a portion of them; then call them - they will come [flying] to you in haste. And know that Allah is Exalted in Might and Wise."',
    },
  },
  {
    id: 'q298',
    prophet: 'ibrahim',
    level: 'hard',
    question: "What does the Qur'an say Ibrahim was, in 3:67?",
    answers: [
      'Neither a Jew nor a Christian, but inclining to the truth',
      'A Jew',
      'A Christian',
      'A worshipper of the stars',
    ],
    right: 0,
    reference: "Qur'an 3:67",
    verse: {
      reference: "Qur'an 3:67",
      verseArabic:
        'مَا كَانَ إِبْرَاهِيمُ يَهُودِيًّا وَلَا نَصْرَانِيًّا وَلَٰكِنْ كَانَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
      translation:
        'Ibrahim was neither a Jew nor a Christian, but he was one inclining toward truth, a Muslim [submitting to Allah]. And he was not of the polytheists.',
    },
  },
  {
    id: 'q299',
    prophet: 'ibrahim',
    level: 'hard',
    question: "What does Qur'an 16:120 say Ibrahim was, devoutly obedient to Allah?",
    answers: [
      'A nation in himself',
      'A king of kings',
      'The last of the prophets',
      'A man of the fish',
    ],
    right: 0,
    reference: "Qur'an 16:120",
    verse: {
      reference: "Qur'an 16:120",
      verseArabic:
        'إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ',
      translation:
        'Indeed, Ibrahim was a [comprehensive] leader, devoutly obedient to Allah, inclining toward truth, and he was not of those who associate others with Allah.',
    },
  },
  {
    id: 'q300',
    prophet: 'ibrahim',
    level: 'hard',
    question: "What did Ibn 'Abbas say Ibrahim said when thrown into the fire?",
    answers: [
      '"Allah is sufficient for us, and He is the best disposer of affairs"',
      '"Save me, O Lord"',
      '"I have no fear"',
      '"Burn, O fire"',
    ],
    right: 0,
    reference: 'Sahih Bukhari 4563',
  },
  {
    id: 'q301',
    prophet: 'ibrahim',
    level: 'hard',
    question: "Which of Ibrahim's descendants did the Prophet ﷺ say resembled him most?",
    answers: ['The Prophet ﷺ himself', "Isma'il", 'Yusuf', 'Musa'],
    right: 0,
    reference: 'Sahih Bukhari 3394',
  },
  {
    id: 'q302',
    prophet: 'nuh',
    level: 'hard',
    question: 'What did Nuh say he did not claim, when his people mocked him?',
    answers: [
      "To hold Allah's treasures or know the unseen",
      'To be a man',
      'To be from among them',
      'To worship Allah',
    ],
    right: 0,
    reference: "Qur'an 11:31",
    verse: {
      reference: "Qur'an 11:31",
      verseArabic:
        'وَلَا أَقُولُ لَكُمْ عِنْدِي خَزَائِنُ اللَّهِ وَلَا أَعْلَمُ الْغَيْبَ وَلَا أَقُولُ إِنِّي مَلَكٌ وَلَا أَقُولُ لِلَّذِينَ تَزْدَرِي أَعْيُنُكُمْ لَنْ يُؤْتِيَهُمُ اللَّهُ خَيْرًا ۖ اللَّهُ أَعْلَمُ بِمَا فِي أَنْفُسِهِمْ ۖ إِنِّي إِذًا لَمِنَ الظَّالِمِينَ',
      translation:
        'And I do not tell you that I have the depositories [containing the provision] of Allah or that I know the unseen, nor do I tell you that I am an angel, nor do I say of those upon whom your eyes look down that Allah will never grant them any good. Allah is most knowing of what is within their souls. Indeed, I would then be among the wrongdoers.',
    },
  },
  {
    id: 'q303',
    prophet: 'nuh',
    level: 'easy',
    question: "Whose wife, with Lut's, is given as an example of those who disbelieved?",
    answers: ["Nuh's", "Ibrahim's", "Musa's", "Pharaoh's"],
    right: 0,
    reference: "Qur'an 66:10",
    verse: {
      reference: "Qur'an 66:10",
      verseArabic:
        'ضَرَبَ اللَّهُ مَثَلًا لِلَّذِينَ كَفَرُوا امْرَأَتَ نُوحٍ وَامْرَأَتَ لُوطٍ ۖ كَانَتَا تَحْتَ عَبْدَيْنِ مِنْ عِبَادِنَا صَالِحَيْنِ فَخَانَتَاهُمَا فَلَمْ يُغْنِيَا عَنْهُمَا مِنَ اللَّهِ شَيْئًا وَقِيلَ ادْخُلَا النَّارَ مَعَ الدَّاخِلِينَ',
      translation:
        'Allah presents an example of those who disbelieved: the wife of Nuh and the wife of Lut. They were under two of Our righteous servants but betrayed them, so those prophets did not avail them from Allah at all, and it was said, "Enter the Fire with those who enter."',
    },
  },
  {
    id: 'q304',
    prophet: 'nuh',
    level: 'hard',
    question: "What does the Qur'an call Nuh in 17:3?",
    answers: ['A grateful servant', 'A patient king', 'A great builder', 'A man of the cave'],
    right: 0,
    reference: "Qur'an 17:3",
    verse: {
      reference: "Qur'an 17:3",
      verseArabic: 'ذُرِّيَّةَ مَنْ حَمَلْنَا مَعَ نُوحٍ ۚ إِنَّهُ كَانَ عَبْدًا شَكُورًا',
      translation:
        'O descendants of those We carried [in the ship] with Nuh. Indeed, he was a grateful servant.',
    },
  },
  {
    id: 'q305',
    prophet: 'adam',
    level: 'hard',
    question: "What was Iblis, according to Qur'an 18:50?",
    answers: ['Of the jinn', 'An angel of light', 'A man', 'A serpent'],
    right: 0,
    reference: "Qur'an 18:50",
    verse: {
      reference: "Qur'an 18:50",
      verseArabic:
        'وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا إِبْلِيسَ كَانَ مِنَ الْجِنِّ فَفَسَقَ عَنْ أَمْرِ رَبِّهِ ۗ أَفَتَتَّخِذُونَهُ وَذُرِّيَّتَهُ أَوْلِيَاءَ مِنْ دُونِي وَهُمْ لَكُمْ عَدُوٌّ ۚ بِئْسَ لِلظَّالِمِينَ بَدَلًا',
      translation:
        'And [mention] when We said to the angels, "Prostrate to Adam," and they prostrated, except for Iblees. He was of the jinn and departed from the command of his Lord. Then will you take him and his descendants as allies other than Me while they are enemies to you? Wretched it is for the wrongdoers as an exchange.',
    },
  },
  {
    id: 'q306',
    prophet: 'adam',
    level: 'hard',
    question: "What did Adam's son who refused to kill his brother say he feared?",
    answers: ['Allah, Lord of the worlds', 'His father', "His brother's friends", 'The night'],
    right: 0,
    reference: "Qur'an 5:28",
    verse: {
      reference: "Qur'an 5:28",
      verseArabic:
        'لَئِنْ بَسَطْتَ إِلَيَّ يَدَكَ لِتَقْتُلَنِي مَا أَنَا بِبَاسِطٍ يَدِيَ إِلَيْكَ لِأَقْتُلَكَ ۖ إِنِّي أَخَافُ اللَّهَ رَبَّ الْعَالَمِينَ',
      translation:
        'If you should raise your hand against me to kill me - I shall not raise my hand against you to kill you. Indeed, I fear Allah, Lord of the worlds.',
    },
  },
  {
    id: 'q307',
    prophet: 'sulayman',
    level: 'easy',
    question: 'What did Sulayman do when he heard the ant?',
    answers: [
      'He smiled and thanked Allah',
      'He stopped his army in anger',
      'He crushed the ants',
      'He ignored it',
    ],
    right: 0,
    reference: "Qur'an 27:19",
    verse: {
      reference: "Qur'an 27:19",
      verseArabic:
        'فَتَبَسَّمَ ضَاحِكًا مِنْ قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
      translation:
        'So [Sulayman] smiled, amused at her speech, and said, "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants."',
    },
  },
  {
    id: 'q308',
    prophet: 'sulayman',
    level: 'normal',
    question: 'What did Sulayman threaten the hoopoe with if it had no excuse?',
    answers: ['A severe punishment', "Banishment to Saba'", 'Silence', 'Nothing'],
    right: 0,
    reference: "Qur'an 27:21",
    verse: {
      reference: "Qur'an 27:21",
      verseArabic:
        'لَأُعَذِّبَنَّهُ عَذَابًا شَدِيدًا أَوْ لَأَذْبَحَنَّهُ أَوْ لَيَأْتِيَنِّي بِسُلْطَانٍ مُبِينٍ',
      translation:
        'I will surely punish him with a severe punishment or slaughter him unless he brings me clear authorization.',
    },
  },
  {
    id: 'q309',
    prophet: 'sulayman',
    level: 'hard',
    question: 'What did the jinn build for Sulayman?',
    answers: [
      'Chambers, statues, great bowls and kettles',
      'Ships and harbours',
      'Walls and moats',
      'Palaces of ice',
    ],
    right: 0,
    reference: "Qur'an 34:13",
    verse: {
      reference: "Qur'an 34:13",
      verseArabic:
        'يَعْمَلُونَ لَهُ مَا يَشَاءُ مِنْ مَحَارِيبَ وَتَمَاثِيلَ وَجِفَانٍ كَالْجَوَابِ وَقُدُورٍ رَاسِيَاتٍ ۚ اعْمَلُوا آلَ دَاوُودَ شُكْرًا ۚ وَقَلِيلٌ مِنْ عِبَادِيَ الشَّكُورُ',
      translation:
        'They made for him what he willed of elevated chambers, statues, bowls like reservoirs, and stationary kettles. [We said], "Work, O family of Dawud, in gratitude." And few of My servants are grateful.',
    },
  },
  {
    id: 'q310',
    prophet: 'sulayman',
    level: 'normal',
    question: 'What did the queen say at the end of her story?',
    answers: [
      '"I submit with Sulayman to Allah, Lord of the worlds"',
      '"I will return to my land"',
      '"Give me back my throne"',
      '"I will worship the sun"',
    ],
    right: 0,
    reference: "Qur'an 27:44",
    verse: {
      reference: "Qur'an 27:44",
      verseArabic:
        'قِيلَ لَهَا ادْخُلِي الصَّرْحَ ۖ فَلَمَّا رَأَتْهُ حَسِبَتْهُ لُجَّةً وَكَشَفَتْ عَنْ سَاقَيْهَا ۚ قَالَ إِنَّهُ صَرْحٌ مُمَرَّدٌ مِنْ قَوَارِيرَ ۗ قَالَتْ رَبِّ إِنِّي ظَلَمْتُ نَفْسِي وَأَسْلَمْتُ مَعَ سُلَيْمَانَ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation:
        'She was told, "Enter the palace." But when she saw it, she thought it was a body of water and uncovered her shins [to wade through]. He said, "Indeed, it is a palace [whose floor is] made smooth with glass." She said, "My Lord, indeed I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds."',
    },
  },
  {
    id: 'q311',
    prophet: 'dawud',
    level: 'hard',
    question: 'Whose prayer and fast did the Prophet ﷺ call most beloved to Allah?',
    answers: ["Dawud's", "Musa's", "Ibrahim's", "Nuh's"],
    right: 0,
    reference: 'Sahih Bukhari 1131',
  },
  {
    id: 'q312',
    prophet: 'dawud',
    level: 'hard',
    question: 'What was made easy for Dawud to recite, according to the Prophet ﷺ?',
    answers: ['The Zabur', 'The Torah', 'The names of the stars', 'The Gospel'],
    right: 0,
    reference: 'Sahih Bukhari 3417',
  },
  {
    id: 'q313',
    prophet: 'dawud',
    level: 'hard',
    question: 'What was Dawud told to judge between the people with?',
    answers: [
      'Truth, without following his own desire',
      'The law of Pharaoh',
      'The custom of his fathers',
      'The word of the elders',
    ],
    right: 0,
    reference: "Qur'an 38:26",
    verse: {
      reference: "Qur'an 38:26",
      verseArabic:
        'يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُمْ بَيْنَ النَّاسِ بِالْحَقِّ وَلَا تَتَّبِعِ الْهَوَىٰ فَيُضِلَّكَ عَنْ سَبِيلِ اللَّهِ ۚ إِنَّ الَّذِينَ يَضِلُّونَ عَنْ سَبِيلِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ بِمَا نَسُوا يَوْمَ الْحِسَابِ',
      translation:
        '[We said], "O Dawud, indeed We have made you a successor upon the earth, so judge between the people in truth and do not follow [your own] desire, as it will lead you astray from the way of Allah." Indeed, those who go astray from the way of Allah will have a severe punishment for having forgotten the Day of Account.',
    },
  },
  {
    id: 'q314',
    prophet: 'muhammad',
    level: 'easy',
    question: "As what does the Qur'an say the Prophet ﷺ was sent to the worlds?",
    answers: ['A mercy', 'A king', 'A judge', 'A warrior'],
    right: 0,
    reference: "Qur'an 21:107",
    verse: {
      reference: "Qur'an 21:107",
      verseArabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ',
      translation: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.',
    },
  },
  {
    id: 'q315',
    prophet: 'muhammad',
    level: 'hard',
    question: "How does the Qur'an describe the Prophet's ﷺ character in 68:4?",
    answers: [
      'Great moral character',
      'Stern and severe',
      'Quiet and withdrawn',
      'Wealthy and proud',
    ],
    right: 0,
    reference: "Qur'an 68:4",
    verse: {
      reference: "Qur'an 68:4",
      verseArabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
      translation: 'And indeed, you are of a great moral character.',
    },
  },
  {
    id: 'q316',
    prophet: 'muhammad',
    level: 'hard',
    question: 'On which day of the week was the Prophet ﷺ born, as he said himself?',
    answers: ['Monday', 'Friday', 'Thursday', 'Saturday'],
    right: 0,
    reference: 'Sahih Muslim 1162',
  },
  {
    id: 'q317',
    prophet: 'muhammad',
    level: 'normal',
    question: 'What did Allah send upon the armies at the Trench?',
    answers: ['A wind and unseen armies', 'A flood', 'A plague', 'An earthquake'],
    right: 0,
    reference: "Qur'an 33:9",
    verse: {
      reference: "Qur'an 33:9",
      verseArabic:
        'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ جَاءَتْكُمْ جُنُودٌ فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَمْ تَرَوْهَا ۚ وَكَانَ اللَّهُ بِمَا تَعْمَلُونَ بَصِيرًا',
      translation:
        'O you who have believed, remember the favor of Allah upon you when armies came to [attack] you and We sent upon them a wind and armies [of angels] you did not see. And ever is Allah, of what you do, Seeing.',
    },
  },
  {
    id: 'q318',
    prophet: 'muhammad',
    level: 'hard',
    question: "Where was the Prophet ﷺ buried, according to 'A'ishah?",
    answers: ['In her house, where he died', "In the graveyard of Baqi'", 'In Makkah', 'At Uhud'],
    right: 0,
    reference: 'Sahih Bukhari 1389',
  },
]

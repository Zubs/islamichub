// The writing of the hadith page, in English: the source every translation follows.
// Sections follow the page from top to bottom. A translation gives the same sections and keys;
// in a list it gives only the text it translates, and Arabic, references and icons are shared.
export default {
  header: {
    islamicSciences: 'Islamic Sciences · علم الحديث',
    hadithThePropheticTradition: 'Hadith — The Prophetic Tradition',
    theSecondSourceOfIslamicLaw:
      'The second source of Islamic law and guidance: the recorded sayings, actions, and silent approvals of the Prophet Muhammad ﷺ, preserved through a rigorous chain of transmission spanning fourteen centuries.',
  },
  hadithLibrary: {
    hadithLibrary: 'Hadith Library',
    browse9AuthenticCollections: 'Browse 9 authentic collections',
    over70000HadithAcrossSahih:
      'Over 70,000 hadith across Sahih Bukhari, Sahih Muslim, the four Sunan, and more — searchable by book, chapter, and number.',
    openLibrary: 'Open Library →',
    whateverTheMessengerGivesYouTake:
      'Whatever the Messenger gives you, take it; and whatever he forbids you, refrain from it.',
    theFoundationalQurAnicCommandTo:
      "The foundational Qur'anic command to follow the Sunnah — making hadith preservation a religious obligation.",
  },
  definition: {
    definition: 'Definition',
    whatIsAHadith: 'What is a Hadith?',
    hadith: 'Hadith',
    pluralAhadithIsARecordedReport:
      "(حَدِيث, plural: Ahadith) is a recorded report of the words, actions, or silent approvals of the Prophet Muhammad ﷺ. Together with the Qur'an, the body of authentic hadith constitutes the Sunnah — the second foundational source of Islamic law, theology, and practice.",
    eachHadithHasTwoComponentsThe: 'Each hadith has two components: the',
    isnad: 'Isnad',
    chainOfTransmissionWhichListsEvery:
      '(إِسْنَاد — chain of transmission), which lists every narrator from the compiler back to the Prophet ﷺ, and the',
    matn: 'Matn',
    theActualTextOfTheNarration:
      '(مَتْن — the actual text of the narration). Both must be examined for a hadith to be accepted.',
    theHadithSciencesUlumAlHadith:
      "The hadith sciences ('Ulum al-Hadith — علوم الحديث) represent one of the most sophisticated systems of source criticism ever developed. Scholars built entire biographies of narrators (Rijal literature) to assess trustworthiness, memory, and character across chains spanning centuries.",
    isnad2: 'الإسناد — Isnad',
    theChainOfTransmissionEveryPerson:
      'The chain of transmission — every person who passed the narration from one generation to the next. For example: "A told me that B told him that C said he heard the Prophet ﷺ say..."',
    theIsnadIsExaminedForCompleteness:
      'The isnad is examined for completeness, continuity, and the trustworthiness of each narrator.',
    matn2: 'المتن — Matn',
    theActualContentOfTheNarration:
      "The actual content of the narration — the Prophet's ﷺ words, description of an action he performed, or account of something he saw and did not forbid (tacit approval).",
    theMatnIsExaminedForConformity:
      "The matn is examined for conformity with the Qur'an, other authentic hadith, and established principles of Islamic law.",
    theIsnadIsPartOfThe:
      '"The isnad is part of the religion. Were it not for the isnad, anyone could say whatever they wished."',
  },
  typesOfHadith: {
    typesOfHadith: 'Types of Hadith',
    whatAHadithRecords: 'What a Hadith records',
  },
  authentication: {
    authentication: 'Authentication',
    gradesOfHadith: 'Grades of Hadith',
    hadithScholarsDevelopedPreciseCriteriaFor:
      'Hadith scholars developed precise criteria for assessing the authenticity of every narration. The primary grades are:',
  },
  fiveConditionsForSahih: {
    fiveConditionsForSahih: 'Five conditions for Sahih',
  },
  theGreatScholars: {
    theGreatScholars: 'The Great Scholars',
    hadithScholarsOfTheGoldenAge: 'Hadith scholars of the golden age',
    betweenThe2ndAnd4thCenturies:
      'Between the 2nd and 4th centuries AH, a generation of extraordinary scholars dedicated their lives to travelling thousands of miles, collecting narrations, and building the science of hadith verification.',
  },
  hadithSciences: {
    hadithSciences: 'Hadith Sciences',
    ulumAlHadith: "'Ulum al-Hadith — علوم الحديث",
    theStudyOfHadithEncompassesMultiple:
      'The study of hadith encompasses multiple interconnected sciences, each addressing a different aspect of preserving and authenticating the Prophetic tradition.',
    exploreTheHadithLibrary: 'Explore the Hadith Library',
    browseAll9CollectionsSahihBukhari:
      'Browse all 9 collections — Sahih Bukhari, Sahih Muslim, the four Sunan, and more — by book, chapter, and hadith number.',
    openTheLibrary: 'Open the Library →',
  },
  lists: {
    hadithTypes: [
      {
        icon: '💬',
        title: 'Qawli — Verbal',
        arabic: 'القَوْلِي',
        desc: "The Prophet's ﷺ spoken words — rulings, supplications, reminders, and descriptions of the unseen.",
      },
      {
        icon: '🤲',
        title: "Fi'li — Actions",
        arabic: 'الفِعْلِي',
        desc: 'Descriptions of what the Prophet ﷺ did — how he prayed, fasted, performed Hajj, dressed, and behaved.',
      },
      {
        icon: '✅',
        title: 'Taqriri — Tacit Approval',
        arabic: 'التَّقْرِيرِي',
        desc: "Things companions said or did in the Prophet's ﷺ presence that he did not forbid — constituting implicit approval.",
      },
      {
        icon: '📋',
        title: 'Wasfi — Description',
        arabic: 'الوَصْفِي',
        desc: "Descriptions of the Prophet's ﷺ physical appearance, character, and personal qualities (the Shama'il literature).",
      },
    ],
    grades: [
      {
        title: 'Sahih',
        arabic: 'صَحِيح',
        meaning: 'Authentic',
        color: 'var(--green)',
        bg: 'var(--green-light)',
        desc: "Meets all five conditions: continuous chain (ittisal), narrator justice ('adala), precise memory (dabt), freedom from hidden defects (shudhudh), and freedom from irregularities ('illa).",
        ruling: 'Obligatory to act upon',
      },
      {
        title: 'Hasan',
        arabic: 'حَسَن',
        meaning: 'Good',
        color: '#7A5A10',
        bg: 'var(--gold-light)',
        desc: "Meets all Sahih conditions except the narrator's precision (dabt) is slightly lower — they are truthful but not perfectly precise. Acceptable as evidence in Islamic law.",
        ruling: 'Acceptable to act upon',
      },
      {
        title: "Da'eef",
        arabic: 'ضَعِيف',
        meaning: 'Weak',
        color: '#8B4513',
        bg: '#FDE9E7',
        desc: 'Fails one or more conditions — a break in the chain, a narrator of questionable character or weak memory. Cannot be used as primary evidence in Islamic law.',
        ruling: 'Not used as primary evidence',
      },
      {
        title: "Mawdu'",
        arabic: 'مَوْضُوع',
        meaning: 'Fabricated',
        color: '#c0392b',
        bg: '#fde8e8',
        desc: 'Proven to be fabricated — attributed to the Prophet ﷺ falsely. Transmitting a fabricated hadith as authentic is a major sin. Must be identified and warned against.',
        ruling: 'Forbidden to transmit as authentic',
      },
      {
        title: 'Mutawatir',
        arabic: 'مُتَوَاتِر',
        meaning: 'Mass-transmitted',
        color: '#1a5276',
        bg: '#eaf2ff',
        desc: "Narrated by so many independent chains at every level that fabrication is impossible — e.g. the description of prayer, the Qur'an itself. The highest possible level of certainty.",
        ruling: 'Certainty (yaqin) — denying it is disbelief',
      },
    ],
    sahihConditions: [
      {
        num: 1,
        title: 'Continuous chain',
        desc: 'Every narrator in the isnad actually met the one before them',
      },
      {
        num: 2,
        title: 'Just narrators',
        desc: 'Each narrator is Muslim, adult, sane, and free from major sins',
      },
      {
        num: 3,
        title: 'Precise memory',
        desc: 'Each narrator has strong, reliable memory or written records',
      },
      {
        num: 4,
        title: 'No hidden defect',
        desc: 'No subtle flaw (shudhudh) that contradicts stronger narrations',
      },
      {
        num: 5,
        title: 'No irregularity',
        desc: "No 'illa — hidden weakness undetected without deep expertise",
      },
    ],
    scholars: [
      {
        name: "Imam Muhammad ibn Isma'il al-Bukhari",
        initials: 'BK',
        death: '194–256 AH / 810–870 CE',
        work: 'Sahih Al-Bukhari',
        desc: "Examined 600,000 hadith; accepted only 7,563. Memorised 100,000 hadith with their chains from childhood. Spent 16 years compiling the Sahih, making every entry with a ritual bath and two rak'ahs of prayer.",
      },
      {
        name: 'Imam Muslim ibn al-Hajjaj',
        initials: 'MS',
        death: '202–261 AH / 817–875 CE',
        work: 'Sahih Muslim',
        desc: 'A student of al-Bukhari. Compiled 300,000 hadith for his Sahih, selecting only 7,500 unique narrations. Organised thematically, making it the preferred reference for legal research.',
      },
      {
        name: 'Imam Ahmad ibn Hanbal',
        initials: 'AH',
        death: '164–241 AH / 780–855 CE',
        work: 'Musnad Ahmad',
        desc: "Founder of the Hanbali school of law. His Musnad contains over 27,000 narrations. He endured imprisonment and lashing during the Mu'tazilite inquisition (Mihna) rather than abandon the view that the Qur'an is uncreated.",
      },
      {
        name: 'Imam Abu Dawood al-Sijistani',
        initials: 'AD',
        death: '202–275 AH / 817–889 CE',
        work: 'Sunan Abu Dawood',
        desc: "Selected 4,800 hadith from 500,000 for his Sunan. Said: 'I have written 500,000 hadith of the Prophet ﷺ, and I selected from them what is in this book.' The primary fiqh hadith reference.",
      },
      {
        name: 'Imam Muhammad al-Tirmidhi',
        initials: 'TR',
        death: '209–279 AH / 824–892 CE',
        work: "Jami' Al-Tirmidhi",
        desc: "First to systematically grade every hadith in his collection and document scholarly disagreements on each. Lost his sight in old age; his students said his knowledge of hadith was deeper than his teachers'.",
      },
      {
        name: "Imam Ahmad ibn Shu'ayb al-Nasa'i",
        initials: 'NS',
        death: '215–303 AH / 829–915 CE',
        work: "Sunan Al-Nasa'i",
        desc: "Known for the strictest conditions after al-Bukhari and Muslim. Died after being beaten for refusing to praise Mu'awiyah RA over Ali RA in Damascus — a testament to his scholarly integrity.",
      },
    ],
    sciences: [
      {
        arabic: 'علم الرجال',
        title: 'Ilm al-Rijal',
        desc: 'The science of narrator biography — evaluating the character, reliability, memory, and life dates of every narrator in every chain.',
      },
      {
        arabic: 'علم الجرح والتعديل',
        title: "Al-Jarh wa'l-Ta'dil",
        desc: "The science of narrator criticism and accreditation — scholars explicitly declaring narrators trustworthy ('adl) or flawed (majruh).",
      },
      {
        arabic: 'علم المصطلح',
        title: 'Mustalah al-Hadith',
        desc: "The technical terminology of hadith — defining Sahih, Hasan, Da'eef, and hundreds of sub-categories with precise scholarly definitions.",
      },
      {
        arabic: 'علم العلل',
        title: "Ilm al-'Ilal",
        desc: 'The science of hidden defects — detecting subtle flaws in chains or texts that make an apparently authentic hadith actually weak.',
      },
      {
        arabic: 'علم الناسخ والمنسوخ',
        title: "Al-Nasikh wa'l-Mansukh",
        desc: 'Identifying which narrations were later abrogated by others — essential for resolving apparent contradictions between hadith.',
      },
      {
        arabic: 'علم غريب الحديث',
        title: 'Gharib al-Hadith',
        desc: 'The science of rare or obscure words in hadith texts — explaining archaic Arabic vocabulary that might otherwise be misunderstood.',
      },
    ],
    faqs: [
      {
        q: "Why is the Hadith necessary when we have the Qur'an?",
        a: "The Qur'an commands prayer, fasting, and Hajj — but gives no details on how many times to pray or the method. The hadith provides that detail. The Prophet ﷺ said: 'Pray as you have seen me pray' (Sahih Bukhari 631). Without hadith, the Qur'an commands worship that cannot be performed. Allah also commands following the Messenger directly in Qur'an 59:7 and 4:80.",
      },
      {
        q: "How do we know the hadith weren't fabricated?",
        a: "The isnad system is specifically designed to prevent this. Every narration had to be traced through named individuals whose lives, characters, and travel routes were documented. Fabricated hadith were identified and catalogued in their own literature (al-Mawdu'at). The parallel oral tradition of hundreds of thousands of memorisers made systematic fabrication detectable.",
      },
      {
        q: 'What is the difference between Hadith Qudsi and regular Hadith?',
        a: "A Hadith Qudsi (Sacred Hadith) is a narration in which the Prophet ﷺ reports the words of Allah, but which is not part of the Qur'an. The meaning is from Allah; the wording is the Prophet's ﷺ. Regular hadith are the Prophet's own words or descriptions of his actions. Both are subject to the same isnad evaluation.",
      },
      {
        q: 'Are all hadith in Sahih Bukhari and Sahih Muslim authentic?',
        a: "The overwhelming majority are — that is why they are called the Sahihayn (the Two Authentics). However, a small number of narrations have been critiqued by later scholars, most notably by Ibn Hajar al-Asqalani and Muslim himself in his introduction. The general scholarly position is that if a hadith appears in both (mutafaq 'alayh), its authenticity is near-certain.",
      },
    ],
  },
}

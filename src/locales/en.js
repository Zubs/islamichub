// The interface's text, in English: the source every other language is translated from, and what
// is shown when a translation is missing. Grouped by the component that uses it.
// In a message, {name} is a value, and a | separates the forms for zero, one and many.
export default {
  app: {
    loadingIslamichub: 'Loading IslamicHub',
    islamic: 'Islamic',
    hub: 'Hub',
    inTheNameOfAllahThe: 'In the name of Allah, the Most Gracious, the Most Merciful',
  },
  adhkarCard: {
    done: '✓ Done',
    tapToReset: 'Tap to reset',
    tapToCount: 'Tap to count',
  },
  appInstall: {
    updateAvailable: 'Update available.',
    refresh: 'Refresh',
    installIslamichubToUseItOffline: 'Install IslamicHub to use it offline.',
    install: 'Install',
    toInstallOnIphoneTapShare: 'To install on iPhone: tap Share, then “Add to Home Screen”.',
    dismiss: 'Dismiss',
  },
  dailyHadith: {
    hadithOfTheDay: 'Hadith of the day',
    narratedBy: 'Narrated by {a}',
  },
  fastingTracker: {
    fastingTracker: 'Fasting tracker',
    yourFasts: 'Your fasts',
    recordEachFastAndSeeWhat:
      'Record each fast and see what is still to be made up. Everything stays on this device.',
    stillToMakeUp: 'Still to make up',
    ramadanAhMissedMadeUpRemaining: 'Ramadan {a} AH: {b} missed, {c} made up, {d} remaining',
    voluntaryFasts: 'Voluntary fasts',
    ramadanAh: 'Ramadan {a} AH',
    firstDayOfRamadanAh: 'First day of Ramadan {a} AH',
    useTheEstimate: 'Use the estimate',
    thisDateIsAnEstimateThe:
      'This date is an estimate. The month begins with the sighting of the moon, so set it to the day Ramadan began where you are.',
    fastStatus: 'Fast status',
    ramadanDayHint: 'A day in Ramadan is marked fasted or missed.',
    otherDayHint: 'A day outside Ramadan is marked as a made-up fast or a voluntary one.',
  },
  reminderSettings: {
    reminders: 'Reminders',
    thisBrowserCannotShowNotificationsSo:
      'This browser cannot show notifications, so reminders are not available here.',
    remindMeAtPrayerTimes: 'Remind me at prayer times',
    rememberALocationAboveFirstReminder:
      'Remember a location above first. Reminder times are worked out from it.',
    notificationsAreBlockedForThisSite:
      "Notifications are blocked for this site, so reminders were turned off. Allow notifications for islamichub.xyz in your browser's site settings, then turn this on again.",
    theseRemindersArriveOnlyWhileIslamichub:
      'These reminders arrive only while IslamicHub is open or running in the background. They do not arrive once the app is fully closed.',
    alsoNotifyMeWhenTheApp: 'Also notify me when the app is closed',
    onIphoneNotificationsForAClosed:
      'On iPhone, notifications for a closed app only work once IslamicHub is installed. Tap Share, then “Add to Home Screen”, and turn this on from the installed app.',
    thisCouldNotBeTurnedOn: 'This could not be turned on. Check your connection and try again.',
    turningThisOnStoresOnOur:
      'Turning this on stores, on our server, what is needed to send the reminder at the right time: your location rounded to about 1 km, your timezone, your calculation and Asr methods, the reminders you chose, and your mosque’s khutbah time if you chose the reminder before it. No name, email or account. Turning it off, or “Forget my location”, deletes it.',
    thisBrowserCannotReceiveNotificationsWhen:
      'This browser cannot receive notifications when the app is closed.',
    items: {
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      'morning-adhkar': 'Morning adhkar (after Fajr)',
      'evening-adhkar': 'Evening adhkar (after Asr)',
    },
  },
  shareButton: {
    shareOptions: 'Share options',
    thisTextIsTooLongFor:
      'This text is too long for an image card, so it is shared as text with a link.',
    saveImage: 'Save image',
    shareOnWhatsapp: 'Share on WhatsApp',
    closeShareOptions: 'Close share options',
    close: 'Close',
    preparing: 'Preparing…',
    share: 'Share',
    linkCopied: '✓ Link copied',
    copyLink: 'Copy link',
  },
  siteFooter: {
    islamic: 'Islamic',
    hub: 'Hub',
    freeIslamicEducationAndToolsFor:
      'Free Islamic education and tools for the Muslim community — prayer times, Zakat calculator, Qibla finder, inheritance calculator, and scholarly guides for all Five Pillars.',
    explore: 'Explore',
    links: {
      pillars: 'The Five Pillars',
      tools: 'Tools',
      hadith: 'Hadith',
      prophets: 'Prophets',
    },
    project: 'Project',
    aboutTeam: 'About & Team',
    changelog: 'Changelog',
    githubRepository: 'GitHub Repository',
    reportAnIssue: 'Report an issue',
    '2026IslamichubBuiltBy': '© 2026 IslamicHub — Built by',
    zubair: 'Zubair',
    text: '&',
    yusuf: 'Yusuf',
    disclaimerIslamichubIsAnEducationalAnd:
      'Disclaimer: IslamicHub is an educational and guidance tool — not a fatwa or formal religious ruling. Prayer times are calculated astronomically and may differ from local mosque announcements. For personal religious rulings, consult a qualified Islamic scholar (mufti). Built with sincerity for the Muslim community.',
    onGithub: 'IslamicHub on GitHub',
  },
  siteNav: {
    islamichubHome: 'IslamicHub home',
    islamic: 'Islamic',
    hub: 'Hub',
    mainNavigation: 'Main navigation',
    about: 'About',
    islamichubOnGithub: 'IslamicHub on GitHub',
    github: 'GitHub',
    toggleNavigationMenu: 'Toggle navigation menu',
    navigationMenu: 'Navigation menu',
    viewSourceOnGithub: 'View source on GitHub',
    links: {
      pillars: 'Pillars',
      tools: 'Tools',
      hadith: 'Hadith',
      prophets: 'Prophets',
    },
    menu: {
      home: 'Home',
      pillars: 'The Five Pillars',
      tools: 'Tools',
      hadith: 'Hadith',
      prophets: 'Prophets',
      about: 'About',
    },
  },
  hijri: {
    date: '{day} {month} {year} AH',
    months: {
      1: 'Muharram',
      2: 'Ṣafar',
      3: 'Rabīʿ al-Awwal',
      4: 'Rabīʿ al-Thāni',
      5: 'Jumādā al-Ūlā',
      6: 'Jumādā al-Ākhirah',
      7: 'Rajab',
      8: 'Shaʿbān',
      9: 'Ramaḍān',
      10: 'Shawwāl',
      11: 'Dhū al-Qaʿdah',
      12: 'Dhū al-Ḥijjah',
    },
  },
  calendar: {
    previous: 'Previous month',
    next: 'Next month',
    month: '{month} {year} AH',
    backToToday: 'Back to this month',
    marked: 'Marked days this month',
    remindersTitle: 'Reminders for these days',
    remindersIntro:
      'Choose the days you want to be reminded of: the evening before, after Isha, and on the day, after Fajr.',
  },
  reminderSwitches: {
    unsupported: 'This browser cannot show notifications, so reminders are not available here.',
    needsLocation:
      'Reminders are timed from your prayer times, so remember a location on the Prayer page first.',
    toPrayerPage: 'Go to the Prayer page',
    when: 'Reminders arrive while IslamicHub is open or in the background, or when it is closed if you turned that on on the Prayer page.',
  },
  jumuah: {
    adhanLink: 'The adhan',
    howToPrayLink: 'How to pray',
    khutbahTime: 'When does the khutbah begin at your mosque?',
    save: 'Save',
    savedTime: 'Saved: the khutbah begins at {time}.',
    cleared: 'The khutbah time has been removed.',
    notATime: 'That is not a time of day. Enter it as hours and minutes, such as 13:15.',
    remindersTitle: 'Friday reminders',
    reminders: {
      kahf: 'Surah al-Kahf, on Friday morning after Fajr',
      salawat: 'Blessings on the Prophet ﷺ, on Friday afternoon after Asr',
      khutbah: '30 minutes before the khutbah',
    },
    needsTime: 'Enter your mosque’s khutbah time above first.',
  },
  games: {
    badge: 'Games',
    title: 'Learn while you play',
    lead: 'Three games on the prophets and the words of the Qur’an. Every question, clue and word comes with its verse or hadith.',
    note: 'Scores stay on this device; there are no accounts and no leaderboard. The content of the games awaits review by a scholar.',
    noResult: 'Not played yet',
    howToPlay: 'How to play',
    level: 'Level',
    levels: { easy: 'Easy', normal: 'Normal', hard: 'Hard' },
    start: 'Start',
    quit: 'Quit to games',
    quiz: {
      name: 'Prophets quiz',
      text: 'Ten questions on the lives of the prophets, drawn at random from a bank of three hundred, each answer shown with its evidence.',
      best: 'Best: {score} of 10',
      lead: 'Ten questions on the lives of the prophets. After each answer you will see the verse or hadith it rests on.',
      progress: 'Question {n} of {total}',
      right: 'Right.',
      wrong: 'Not quite.',
      rightAnswer: 'The answer is: {answer}',
      evidence: 'Evidence:',
      submit: 'Submit answer',
      next: 'Next question',
      finish: 'See your score',
      score: 'You scored {score} of 10',
      missed: 'Questions to look at again',
      allRight: 'You answered every question right.',
      again: 'Play again',
      rules: {
        r1: 'You get ten questions on the lives of the prophets, each with four answers to choose from.',
        r2: 'After each answer you see the verse or hadith it rests on.',
        r3: 'At the end you see your score and the questions to look at again. A question is not asked again until you have seen all the others at its level.',
      },
      levels: {
        easy: 'The best-known events of their lives.',
        normal: 'What a regular reader of their stories will know.',
        hard: 'Details: numbers, verse numbers and what hadiths add.',
      },
      share:
        'I scored {score} of 10 in the Prophets quiz on IslamicHub ({level}). Can you beat it?',
    },
    whoAmI: {
      name: 'Who am I?',
      text: 'Clues about one prophet at a time. Name as many in a row as you can.',
      best: 'Best game: {score} points',
      lead: 'Clues about a prophet, revealed one at a time. Name him, then the next, and see how many you can name in a row.',
      question: 'Who am I?',
      nextClue: 'Another clue ({n} of {total} shown)',
      giveUp: 'Show me',
      guess: 'Your guess:',
      won: 'Yes, {name}.',
      lost: 'It was {name}.',
      score: '{score} points',
      readStory: 'Read the story of {name}',
      next: 'Next prophet',
      again: 'Play again',
      status: '{level} · Prophet {n} · {points} points',
      correct:
        'You did not name any prophets this time | You answered 1 correctly | You answered {n} correctly',
      total: '{points} points in one round | {points} points in {rounds} rounds',
      today:
        'Today’s best: {points} points in one round | Today’s best: {points} points in {rounds} rounds',
      rules: {
        r1: 'A prophet is chosen and you see one clue about him, with more clues when you ask.',
        r2: 'Pick his name from the list. You have three guesses (two on Hard).',
        r3: 'Name him and the next prophet follows. Each scores 50 points, less 10 for each extra clue and 5 for each wrong guess. The game ends at the first prophet you cannot name.',
      },
      levels: {
        easy: 'The easiest clue comes first. Three guesses.',
        normal: 'The hardest clue comes first. Three guesses.',
        hard: 'The hardest clue comes first. Two guesses.',
      },
      guessesLeft: 'No guesses left | One guess left | {n} guesses left',
      share:
        'Who am I? on IslamicHub stumped me on the first prophet ({level}). Can you name more? | I named 1 prophet in Who am I? on IslamicHub ({level}), {points} points. Can you name more? | I named {n} prophets in a row in Who am I? on IslamicHub ({level}), {points} points. Can you beat it?',
    },
    kalimah: {
      name: 'Kalimah',
      text: 'A word from the Qur’an each day, the same for everyone. Six tries, in Arabic letters or in transliteration.',
      notPlayed: 'Not played today',
      played: 'Played today',
      solved: 'Solved today in {n} tries | Solved today in {n} try | Solved today in {n} tries',
      lead: 'One word from the Qur’an each day, the same for everyone. Guess it in six tries, then see the verse it comes from.',
      modeLabel: 'Type the word in',
      modes: { arabic: 'Arabic letters', latin: 'Transliteration' },
      letters: 'Today’s word has {n} letters.',
      try: 'Try {n}',
      marks: {
        right: 'in the right place',
        present: 'in the word, in another place',
        absent: 'not in the word',
      },
      keyboard: 'Keyboard',
      enter: 'Enter',
      delete: 'Delete',
      tooShort: 'Type all {n} letters, then press Enter.',
      won: 'Solved in {n} of {total} tries.',
      lost: 'Not this time. Here is today’s word.',
      verse: 'It comes in this verse:',
      tomorrow: 'A new word tomorrow.',
      shareTitle: 'Kalimah {day}: {result}/{total}, {mode}, {level}',
      invite: 'Can you find today’s word?',
      rules: {
        r1: 'Guess today’s word from the Qur’an in six tries. Everyone gets the same word, and a new one comes each day.',
        r2: 'After each guess, a green letter is in the right place, a gold letter is in the word in another place, and a grey letter is not in the word.',
        r3: 'Type in Arabic letters or in transliteration. Your choice stays for the day once you have made a guess.',
      },
      levels: {
        easy: 'The word’s meaning is shown as a hint.',
        normal: 'No hint.',
        hard: 'No hint, and the keyboard does not mark the letters you have tried.',
      },
      hint: 'Hint: it means “{meaning}”.',
    },
  },
  prayerGuides: {
    breadcrumb: 'Breadcrumb',
    prayer: 'Prayer',
    adhan: 'The adhan',
    howToPray: 'How to pray',
  },
  contentSections: {
    step: 'Step {n}',
    times: '× {n}',
  },
  prayerFigure: {
    takbir: 'Standing with both hands raised for the takbir',
    standing: 'Standing with the right hand over the left',
    bowing: 'Bowing with the back level and the hands on the knees',
    rising: 'Standing upright again after the bow',
    prostrating: 'Prostrating with the forehead, nose, hands, knees and toes on the ground',
    sitting: 'Sitting on the left foot with the hands on the thighs',
    tashahhud: 'Sitting for the tashahhud with the right forefinger raised',
    taslim: 'Sitting and turning the head to the right and then the left for the salam',
  },
  statsOptOut: {
    donTCountMyVisits: "Don't count my visits",
    whenOnIslamichubSendsNoUsage: 'When on, IslamicHub sends no usage statistics for this device.',
  },
  todayPanel: {
    islamicDay: 'On the Islamic calendar',
    readAboutTheDay: 'Read about the day',
    jumuah: 'Jumu‘ah',
    fridayToday: 'Today is Friday',
    khutbahAt: 'Khutbah at {time}',
    fridaySunnahs: 'The sunnahs of Friday',
    today: 'Today',
    nextPrayer: 'Next prayer',
    inAt: 'in {a} · at {b}',
    setYourLocation: 'Set your location',
    rememberALocationOnThePrayer: 'Remember a location on the Prayer page to see prayer times here',
    todaySPrayers: "Today's prayers",
    of5Prayed: '{a} of 5 prayed',
    tapToLogYourPrayers: 'Tap to log your prayers',
    adhkar: 'Adhkar',
    ofDone: '{a} of {b} done',
    tasbih: 'Tasbih',
    todaySFast: "Today's fast",
    tapToRecordTodaySFast: "Tap to record today's fast",
    tapToBeginAdhkar: 'Tap to begin the adhkar',
    countedToday: 'counted today',
    tapToStartCounting: 'Tap to start counting',
    tomorrow: '{prayer} (tomorrow)',
  },
  notFound: {
    pageNotFound: 'Page not found',
    qurAn653: "Qur'an 65:3",
    andWhoeverReliesUponAllahThen:
      '"And whoever relies upon Allah — then He is sufficient for him."',
    thePageYouWereLookingFor:
      "The page you were looking for doesn't exist — but you're always in the right place with Allah.",
    returnHome: '← Return home',
    quickPillarLinks: 'Quick pillar links',
    orGoDirectlyTo: 'Or go directly to:',
  },
  adhkarCategory: {
    allAdhkar: '← All Adhkar',
    categoryNotFound: 'Category not found.',
    todaySProgress: "Today's progress",
    recited: '{a} / {b} recited',
    dayStreak: '🔥 {a}-day streak',
    completedToday: '✓ {a} completed today — جَزَاكَ اللَّهُ خَيْرًا',
    allCategories: 'All categories',
    adhkar: 'Adhkar',
    completeAll: 'Complete all {count} to finish',
    markComplete: 'Mark {name} complete for today',
  },
  adhkarHome: {
    dailyWorship: 'Daily Worship · الأذكار',
    adhkarDuas: 'Adhkar & Duas',
    morningAndEveningSupplicationsRemembranceAfter:
      'Morning and evening supplications, remembrance after prayer, and daily dhikr — with Arabic, transliteration, translation, and a tap-to-count tracker for each.',
    doneToday: '✓ Done today',
    adhkar: '{a} adhkar',
  },
  duasHome: {
    dailyWorship: 'Daily Worship · ',
    duas: 'Duas',
    supplicationsFromTheQurAnAnd:
      "Supplications from the Qur'an and the Sunnah for everyday situations, each with its Arabic text, transliteration, translation and source.",
    searchDuas: 'Search duas',
    tryTravelRainOrBismillah: 'Try “travel”, “rain” or “bismillah”',
    clear: 'Clear',
    noDuasFoundFor: 'No duas found for “{a}”.',
    clearSearch: 'Clear search',
    found: '{n} duas found | {n} dua found | {n} duas found',
    count: '{n} duas | {n} dua | {n} duas',
  },
  duasSituation: {
    duas: 'Duas',
    breadcrumb: 'Breadcrumb',
    allDuas: '← All duas',
    situations: 'Situations',
    allSituations: 'All situations',
  },
  hadithBook: {
    hadiths: '{a} hadiths',
    hadith: 'Hadith',
    allBooks: 'All Books',
    chapters: 'Chapters',
    hadiths2: 'Hadiths',
    grade: 'Grade',
    loadingChapters: 'Loading chapters…',
    couldNotLoadChapters: 'Could not load chapters',
    set: 'Set',
    whereTheSiteIsHostedSee:
      'where the site is hosted (see the README). A free key is available at',
    hadithapiCom: 'hadithapi.com',
    filterChapters: 'Filter chapters…',
    filterChaptersByName: 'Filter chapters by name',
    chapters2: '{a} chapters',
    hadith2: '{a} hadith',
    noChaptersMatch: 'No chapters match "{a}"',
    hadithCollection: 'Hadith Collection',
  },
  hadithBooks: {
    hadithLibrary: 'Hadith Library · كتب الحديث',
    theNineCollections: 'The Nine Collections',
    browseAuthenticatedHadithFromTheMajor:
      'Browse authenticated hadith from the major collections — Sahih Bukhari, Sahih Muslim, the four Sunan, and more.',
    hadith: '← Hadith',
    allBooks: 'All Books',
    apiKeyRequired: 'API key required',
    theHadithLibraryIsNotConfigured: 'The hadith library is not configured on this server. Set',
    whereTheSiteIsHostedSee:
      'where the site is hosted (see the README); a free key is available at',
    hadithapiComRegister: 'hadithapi.com/register',
    theBookCardsBelowUseStatic: '. The book cards below use static metadata.',
    loadingCollections: 'Loading collections…',
    couldNotLoadLiveData: 'Could not load live data',
    showingStaticMetadataMeanwhile: '{a} Showing static metadata meanwhile.',
    filterByGrade: 'Filter by grade:',
    collections: '{a} collections',
    hadiths: 'hadiths',
  },
  hadithChapter: {
    chapter: '{a} · Chapter {b}',
    hadith: 'Hadith',
    allBooks: 'All Books',
    chapter2: 'Chapter {a}',
    loadingHadiths: 'Loading hadiths…',
    couldNotLoadHadiths: 'Could not load hadiths',
    set: 'Set',
    whereTheSiteIsHostedSee:
      'where the site is hosted (see the README). A free key is available at',
    hadithapiCom: 'hadithapi.com',
    hadithsInThisChapter: '{a} hadiths in this chapter',
    pageOf: 'Page {a} of {b}',
    english: 'English',
    reference: 'Reference',
    hadith2: '{a}, Hadith {b}',
    previous: '← Previous',
    next: 'Next →',
    chapter3: '← Chapter {a}',
    allChapters: 'All chapters',
    chapter4: 'Chapter {a} →',
    collapse: 'Collapse hadith',
    expand: 'Expand hadith',
  },
  hadith: {
    breadcrumb: 'Breadcrumb',
    hadith: 'Hadith',
    allBooks: 'All Books',
    chapter: 'Chapter {a}',
    loadingHadith: 'Loading hadith…',
    thereIsNoHadithAtThis:
      'There is no hadith at this address. Check the number, or browse the collection from its chapter list.',
    couldNotLoadThisHadith: 'Could not load this hadith',
    set: 'Set',
    whereTheSiteIsHostedSee: 'where the site is hosted (see the README).',
    tryAgain: 'Try again',
    reference: 'Reference',
    hadith2: '{a}, Hadith {b}',
    hadithNavigation: 'Hadith navigation',
    hadith3: '← Hadith {a}',
    backToChapter: 'Back to chapter',
    hadith4: 'Hadith {a} →',
    notFound: 'Hadith not found',
    hadithNumber: 'Hadith {number}',
    browseBook: 'Browse {name}',
    browseAll: 'Browse all books',
  },
  tracker: {
    dailyWorship: 'Daily Worship',
    prayerTracker: 'Prayer Tracker',
    recordEachOfTheFiveDaily:
      'Record each of the five daily prayers and see how consistent you have been. Everything stays on this device.',
    streak: 'Streak',
    currentStreak: 'Current streak',
    aDayCountsWhenAllFive: 'A day counts when all five prayers are marked on time or late.',
    lastSevenDays: 'Last seven days',
    rememberALocationOnThePrayer: 'Remember a location on the Prayer page',
    toSeeEachPrayerSTime: "to see each prayer's time here.",
    notYet: 'not yet',
    notLogged: 'not logged',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    allFivePrayed: 'All five prayed',
    partlyLogged: 'Partly logged',
    aPrayerMissed: 'A prayer missed',
    yourLogIsKeptOnlyIn:
      'Your log is kept only in this browser, on this device. It is never sent anywhere.',
    clearMyData: 'Clear my data',
    today: 'Today',
    statusOf: '{prayer} status',
    state: {
      complete: 'all five prayed',
      partial: 'partly logged',
      missed: 'a prayer missed',
      empty: 'nothing logged',
    },
    confirmClear: 'Clear your whole prayer log from this device? This cannot be undone.',
  },
  tasbih: {
    dailyWorship: 'Daily Worship · السبحة',
    tasbihCounter: 'Tasbih Counter',
    aDigitalDhikrCounterPickA:
      'A digital dhikr counter — pick a phrase, set a target, and tap to count. Your daily and lifetime totals are saved on this device.',
    reset: '↺ Reset',
    target: 'Target',
    quickSet: 'Quick set:',
    todayThisPhrase: 'Today · this phrase',
    lifetimeThisPhrase: 'Lifetime · this phrase',
    todayAllDhikr: 'Today · all dhikr',
    lifetimeAllDhikr: 'Lifetime · all dhikr',
    theVirtueOfDhikr: 'The virtue of dhikr',
    whyCountYourDhikr: 'Why count your dhikr?',
    tasbihGlorifyingAllahThroughRepeatedRemembrance:
      'Tasbih (تَسْبِيح) — glorifying Allah through repeated remembrance — is one of the simplest and most rewarded acts of worship. Traditionally counted on prayer beads (misbaha) or the fingers of the right hand, a digital counter serves the same purpose: keeping an accurate, distraction-free tally so the heart stays focused on the words rather than the count.',
    whoeverSaysGloryBeToAllah:
      '"Whoever says \'Glory be to Allah and praise Him\' one hundred times a day will have their sins forgiven, even if they were like the foam of the sea." — The Prophet Muhammad ﷺ',
    pairItWithYourDailyAdhkar: 'Pair it with your daily adhkar',
    theTasbihCounterWorksWellAlongside:
      'The tasbih counter works well alongside the morning, evening, and after-prayer adhkar — each has its own recommended repetitions built in.',
    openAdhkarDuas: 'Open Adhkar & Duas →',
  },
  zakat: {
    currency: 'Currency',
    nisabMethod: 'Nisab method',
    gold85g: 'Gold (85g)',
    silver595g: 'Silver (595g)',
    nisabThreshold: 'Nisab threshold',
    goldPrice: 'Gold price',
    nairaPricesUseTheOfficialExchange:
      'Naira prices use the official exchange rate. The price a local dealer quotes can differ, so you can type your own price per gram under Gold & Silver below.',
    goldNisabHanafiShafiIHanbali:
      "Gold nisab: Hanafi/Shafi'i/Hanbali/Maliki majority — 85g of 24ct gold · Silver nisab: Some Hanafi scholars — 595g silver (",
    cashBankSavings: 'Cash & Bank Savings',
    qurAn9103: "Qur'an 9:103 ·",
    cashAndBankBalancesHeldAbove:
      'Cash and bank balances held above Nisab for a full lunar year are zakatable at 2.5%.',
    cashAtHome: 'Cash at home',
    currentAccounts: 'Current accounts',
    savingsAccounts: 'Savings accounts',
    foreignCurrencyConverted: 'Foreign currency (converted)',
    moneyOwedToYou: 'Money Owed To You',
    scholarlyConsensusIjmaIbnQudamaAl: "Scholarly consensus (ijma') · Ibn Qudama, Al-Mughni",
    reliablyExpectedMoneyIsZakatableUncertain:
      'Reliably expected money is zakatable. Uncertain receivables: exclude until received.',
    loansGivenExpectedBack: 'Loans given (expected back)',
    unpaidSalaryIncome: 'Unpaid salary / income',
    otherReceivables: 'Other receivables',
    goldSilver: 'Gold & Silver',
    qurAn934: "Qur'an 9:34 ·",
    goldAndSilverAreZakatableHanafi:
      "Gold and silver are zakatable. Hanafi: worn women's ornaments exempt. Shafi'i/Hanbali/Maliki: all gold zakatable.",
    gold24ctGram: 'Gold · 24ct/gram',
    gram: '/gram',
    silverPerGram: 'Silver · per gram',
    yourOwnGoldPricePerGram: 'Your own gold price per gram (optional)',
    usesTheFetchedPrice: 'Uses the fetched price',
    enterAPriceAboveZeroThe: 'Enter a price above zero. The fetched price is still in use.',
    yourOwnSilverPricePerGram: 'Your own silver price per gram (optional)',
    goldPurity: 'Gold purity',
    '24ctPure999': '24ct — pure (99.9%)',
    '22ct917': '22ct (91.7%)',
    '18ct75': '18ct (75%)',
    '9ct375': '9ct (37.5%)',
    goldWeightGrams: 'Gold weight (grams)',
    silverWeightGrams: 'Silver weight (grams)',
    knownTotalValueOptional: 'Known total value (optional)',
    enterIfYouAlreadyKnowThe: 'Enter if you already know the total',
    investmentsShares: 'Investments & Shares',
    aaoifiStandardNo35SheikhAl: 'AAOIFI Standard No. 35 · Sheikh al-Qaradawi',
    shares25OfMarketValue:
      'Shares: 2.5% of market value (simplified, widely accepted). Business trade goods: 2.5% of current market value. Pension: include only if accessible.',
    sharesStocksMarketValue: 'Shares / stocks (market value)',
    isasUnitTrusts: 'ISAs / unit trusts',
    businessTradeGoods: 'Business trade goods',
    pensionAccessibleOnly: 'Pension (accessible only)',
    includeOnlyIfCurrentlyWithdrawable: 'Include only if currently withdrawable',
    debtsLiabilities: 'Debts & Liabilities',
    alNawawiShafiIAlKasani: "Al-Nawawi (Shafi'i) · Al-Kasani (Hanafi)",
    immediateDebtsDueWithinTheYear:
      "Immediate debts due within the year reduce zakatable wealth. For mortgages: deduct only the current year's instalment.",
    loansOwedDueThisYear: 'Loans owed (due this year)',
    creditCardBalances: 'Credit card balances',
    overdueRentBills: 'Overdue rent / bills',
    otherImmediateDebts: 'Other immediate debts',
    yourZakat: 'Your Zakat',
    '25140th': '2.5% · 1/40th',
    hawl: 'Hawl:',
    zakatIsOnlyDueAfterYour:
      'Zakat is only due after your wealth has exceeded Nisab for one complete lunar year (~354 days).',
    nisab: '{a} (Nisab)',
    due: 'Zakat is due — 2.5% of net zakatable wealth:',
    belowNisab: 'Below Nisab — no obligation this year',
    enterAssets: 'Enter your assets to begin',
    belowThreshold: 'Below threshold',
    breakdown: {
      cashSavings: 'Cash & savings',
      moneyOwed: 'Money owed',
      goldSilver: 'Gold & silver',
      investments: 'Investments',
      grossZakatable: 'Gross zakatable',
      lessDebts: 'Less: debts',
      netZakatable: 'Net zakatable',
      zakatDue: 'Zakat due (2.5%)',
    },
  },
  prayer: {
    distanceKm: '{distance} km',
    deviceClock:
      'Times are shown in this device’s time. For a place in another time zone, they are not that place’s local time.',
    prayerTimesTool: 'Prayer Times Tool',
    todaySPrayerTimes: "Today's prayer times",
    enterYourLocationToGetAccurate:
      'Enter your location to get accurate prayer times calculated using your coordinates and the selected method.',
    latitude: 'Latitude',
    longitude: 'Longitude',
    calculationMethod: 'Calculation method',
    muslimWorldLeague: 'Muslim World League',
    isnaNorthAmerica: 'ISNA (North America)',
    egyptianAuthority: 'Egyptian Authority',
    ummAlQuraMakkah: 'Umm Al-Qura (Makkah)',
    karachiUniversity: 'Karachi University',
    asrTime: 'Asr time',
    standardShafiIMalikiHanbali: "Standard (Shafi'i, Maliki, Hanbali)",
    hanafi: 'Hanafi',
    calculate: 'Calculate',
    rememberedOnThisDevice: '📍 Remembered on this device: {a}',
    rememberThisLocation: 'Remember this location',
    yourBrowserIsBlockingStorageSo:
      'Your browser is blocking storage, so this location cannot be remembered. Times still work for this visit.',
    forgetMyLocation: 'Forget my location',
    keptOnThisDeviceOnlyAnd: 'Kept on this device only and never sent anywhere.',
    nextPrayer: 'Next Prayer',
    timeRemaining: 'Time remaining',
    qiblaFinder: 'Qibla Finder',
    directionOfTheKaBah: "Direction of the Ka'bah",
    theQiblaIsTheDirectionOf:
      'The Qibla (قِبْلَة) is the direction of the Masjid al-Haram in Makkah. Uses the same coordinates entered above.',
    kaBah: "Ka'bah",
    qiblaBearing: 'Qibla bearing',
    distanceToMakkah: 'Distance to Makkah',
    faceTheBearingShownAboveThe:
      '💡 Face the bearing shown above. The green end of the needle points toward Makkah.',
    locating: 'Locating…',
    useMyLocation: '📍 Use my location',
    notAPrayer: 'Not a prayer',
    qiblaPrompt: 'Enter coordinates above and press Calculate',
    requestingLocation: 'Requesting location…',
    locationFailed: 'Could not get location. Enter coordinates manually.',
    invalidCoordinates:
      'Please enter valid coordinates: latitude from -90 to 90 and longitude from -180 to 180.',
    qiblaFrom: '{direction} from your location',
  },
  fasting: {
    ramadanAh: 'Ramadan {a} AH',
    currentHijriDate: 'Current Hijri date',
    ah: '{a} AH',
    status: 'Status',
    suhoorIftarTimesToday: 'Suhoor & Iftar times today',
    enterYourCoordinatesToCalculateToday:
      "Enter your coordinates to calculate today's Suhoor (before Fajr) and Iftar (at Maghrib) times.",
    latitude: 'Latitude',
    longitude: 'Longitude',
    calculate: 'Calculate',
    myLocation: '📍 My location',
    suhoorEndsFajr: '🌅 Suhoor ends (Fajr)',
    lastMomentToEat: 'Last moment to eat',
    iftarMaghrib: '🌇 Iftar (Maghrib)',
    timeToBreakFast: 'Time to break fast',
    fastingInProgress: 'Fasting in progress',
    ramadanMubarak: 'رمضان مبارك — Ramadan Mubarak!',
    daysUntilRamadan: '{n} days until Ramadan | {n} day until Ramadan | {n} days until Ramadan',
    ramadanDay: 'Ramadan day',
    monthsRemaining: 'Months remaining',
    ofDays: 'of 29–30 days',
    untilRamadan: 'until Ramaḍān',
    ramadanIsHere: 'Ramadan is here',
    waiting: "Sha'ban / waiting",
    untilIftar: '⏱ {hours}h {minutes}m until Iftar',
    iftarTime: '🌙 Iftar time — Ramadan Mubarak!',
    suhoorIn: '🌅 Suhoor in {hours}h {minutes}m',
  },
  inheritance: {
    step1: 'Step 1',
    selectTheHeirsPresent: 'Select the heirs present',
    toggleEachHeirPresentInThe:
      'Toggle each heir present in the estate. For heirs where count matters, enter the number after toggling.',
    totalEstateValueAfterDebtsFuneral: 'Total estate value (after debts & funeral expenses)',
    zakatOnAnyZakatablePortionsShould:
      'Zakat on any zakatable portions should be calculated separately',
    inheritanceBreakdown: 'Inheritance Breakdown',
    totalEstateDistributed: 'Total estate distributed',
    importantNote: '⚠ Important note',
    thisResultIsAGuideNot:
      'This result is a guide, not a ruling. Inheritance law is complex and this calculator covers standard cases only. Before dividing an estate, and for anything non-standard (half-siblings, missing heirs, bequests, disputes), consult a qualified Islamic scholar or mufti.',
    problem: {
      estate: 'Enter the estate as a number of zero or more.',
      count: 'Enter a whole number of zero or more for {heir}.',
      onlyOne: 'There can be only one {heir}.',
      spouses: 'The deceased leaves either a husband or a wife, not both. Remove one.',
      wives: 'Enter no more than {max} wives.',
      none: 'Select at least one heir.',
    },
    rule: {
      fixed: 'Fixed share of {share}',
      motherThird: "A third of what remains after the spouse's share",
      grandmothers: 'Half of the one sixth the grandmothers share',
      residueNone: 'Residuary, but the fixed shares used the whole estate',
      residueMixed: 'Residue, two parts to each male and one to each female',
      residueWithDaughters: 'Residue beside a daughter or granddaughter',
      residue: 'Residue after the fixed shares',
      remainder: 'No other heir was selected to receive this. Ask a scholar where it goes.',
    },
    extra: {
      awl: ", reduced in proportion because the fixed shares exceed the estate ('awl)",
      plusResidue: ', plus the residue',
      radd: ', plus a part of the remainder returned to the fixed-share heirs (radd)',
    },
    source: {
      quran: "Qur'an {reference}",
      hadith: 'Hadith',
    },
    heirs: {
      husband: 'Husband',
      wife: 'Wife / Wives',
      father: 'Father',
      mother: 'Mother',
      son: 'Son(s)',
      daughter: 'Daughter(s)',
      grandson: "Grandson (son's son)",
      granddaughter: "Granddaughter (son's daughter)",
      brother: 'Full Brother(s)',
      sister: 'Full Sister(s)',
      paternal_grandfather: 'Paternal Grandfather',
      paternal_grandmother: 'Paternal Grandmother',
      maternal_grandmother: 'Maternal Grandmother',
      remainder: 'Remainder',
    },
    groups: {
      Spouse: 'Spouse',
      Parents: 'Parents',
      Children: 'Children',
      Siblings: 'Siblings',
      Extended: 'Extended',
    },
    add: 'Add {heir}',
    remove: 'Remove {heir}',
    each: '{amount} each',
    heirDesc: {
      husband: 'Receives 1/4 beside a child or grandchild, otherwise 1/2',
      wife: 'Receives 1/8 beside a child or grandchild, otherwise 1/4, shared equally among wives',
      father:
        'Receives 1/6 beside a child or grandchild, and the residue when no son or grandson takes it',
      mother: 'Receives 1/6 beside a child, grandchild or two or more siblings, otherwise 1/3',
      son: "Residuary — receives double a daughter's share",
      daughter: 'Receives 1/2 (one), 2/3 (two+), or residue with son',
      grandson: "Son's son — blocked by a son",
      granddaughter:
        "Son's daughter — 1/6 beside one daughter; excluded by a son, or by two daughters unless a grandson is present",
      brother: 'Full brother — residuary; excluded by a son, grandson, father or grandfather',
      sister:
        'Full sister — 1/2 (one) or 2/3 (two+); shares the residue with a brother; excluded by a son, grandson, father or grandfather',
      paternal_grandfather: "Father's father — blocked by father",
      paternal_grandmother:
        'Receives 1/6, shared if both grandmothers inherit — excluded by mother or father',
      maternal_grandmother:
        'Receives 1/6, shared if both grandmothers inherit — excluded by mother',
    },
  },
  common: {
    days: '{n} days | {n} day | {n} days',
    language: 'Language',
    prayers: {
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
    },
    salahStatus: {
      'on-time': 'On time',
      late: 'Late',
      missed: 'Missed',
      none: 'not logged',
    },
    fastStatus: {
      fasted: 'Fasted',
      missed: 'Missed',
      'made-up': 'Made up',
      voluntary: 'Voluntary',
      none: 'Not recorded',
    },
    copy: 'Copy',
    copied: '✓ Copied',
    loading: 'Loading…',
    hoursMinutes: '{hours}h {minutes}m',
    minutes: '{minutes} min',
    notYetTranslated: 'Not yet translated',
  },
  zakatPriceStatus: {
    label: {
      loading: 'loading',
      saved: 'saved',
      reference: 'reference',
      current: 'current',
      ratesNotCurrent: 'rates not current',
    },
    age: ', fetched earlier today | , 1 day old | , {n} days old',
    note: {
      loading: {
        dated: "Fetching today's prices. You can fill in the calculator meanwhile.",
        undated: "Fetching today's prices. You can fill in the calculator meanwhile.",
      },
      saved: {
        dated:
          "Saved prices from {date}{age}. Today's prices could not be loaded, so these are the last ones this device fetched.",
        undated:
          "Saved prices. Today's prices could not be loaded, so these are the last ones this device fetched.",
      },
      reference: {
        dated:
          "Reference prices from {date}. Today's prices could not be loaded, so check the current price before relying on this result.",
        undated:
          "Reference prices. Today's prices could not be loaded, so check the current price before relying on this result.",
      },
      ratesNotCurrent: {
        dated:
          'Gold and silver prices for {date}, converted with reference exchange rates that are not current.',
        undated:
          'Gold and silver prices, converted with reference exchange rates that are not current.',
      },
      current: {
        dated: 'Gold and silver prices for {date}.',
        undated: 'Gold and silver prices.',
      },
    },
    custom: {
      gold: 'Your own gold price per gram is in use in place of the fetched one.',
      silver: 'Your own silver price per gram is in use in place of the fetched one.',
      'gold-silver':
        'Your own gold and silver price per gram is in use in place of the fetched one.',
    },
  },
  hadithApi: {
    notConfigured: 'The hadith library is not configured on this server.',
    offline:
      'You are offline, and this page has not been saved on this device yet. Open it once while connected and it will be kept for next time.',
    failed: 'The hadith library could not be loaded ({status}).',
  },
  location: {
    unsupported: 'Geolocation not supported by your browser',
    yours: 'Your location',
    denied: 'Location access denied. Enter coordinates manually.',
  },
  reminders: {
    fajr: {
      title: 'Fajr prayer',
      body: 'It is time for Fajr.',
    },
    dhuhr: {
      title: 'Dhuhr prayer',
      body: 'It is time for Dhuhr.',
    },
    asr: {
      title: 'Asr prayer',
      body: 'It is time for Asr.',
    },
    maghrib: {
      title: 'Maghrib prayer',
      body: 'It is time for Maghrib.',
    },
    isha: {
      title: 'Isha prayer',
      body: 'It is time for Isha.',
    },
    'morning-adhkar': {
      title: 'Morning adhkar',
      body: 'Time for your adhkar.',
    },
    'evening-adhkar': {
      title: 'Evening adhkar',
      body: 'Time for your adhkar.',
    },
    'arafah-eve': {
      title: 'Tomorrow: The day of ‘Arafah',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'arafah-day': {
      title: 'Today: The day of ‘Arafah',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'ashura-eve': {
      title: 'Tomorrow: Tasu‘a and ‘Ashura',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'ashura-day': {
      title: 'Today: Tasu‘a and ‘Ashura',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'dhul-hijjah-eve': {
      title: 'Tomorrow: The first ten days of Dhul Hijjah',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'dhul-hijjah-day': {
      title: 'Today: The first ten days of Dhul Hijjah',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'white-days-eve': {
      title: 'Tomorrow: The white days',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'white-days-day': {
      title: 'Today: The white days',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'monday-thursday-eve': {
      title: 'Tomorrow: Mondays and Thursdays',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'monday-thursday-day': {
      title: 'Today: Mondays and Thursdays',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'last-ten-eve': {
      title: 'Tomorrow: The last ten nights of Ramadan',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'last-ten-day': {
      title: 'Today: The last ten nights of Ramadan',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'eid-eve': {
      title: 'Tomorrow: The two Eids',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    'eid-day': {
      title: 'Today: The two Eids',
      body: 'Tap to read about it. Calendar dates can differ by a day.',
    },
    kahf: {
      title: 'Surah al-Kahf',
      body: 'It is Friday: a reminder to read Surah al-Kahf.',
    },
    salawat: {
      title: 'Blessings on the Prophet ﷺ',
      body: 'It is Friday: send many blessings on the Prophet ﷺ.',
    },
    khutbah: {
      title: 'Jumu‘ah',
      body: 'The khutbah begins in 30 minutes.',
    },
  },
  seo: {
    hadith: {
      title: "Hadith — Prophetic Tradition, Sciences & Library {'|'} IslamicHub",
      description:
        "Learn what Hadith is, how it was preserved, the six grades (Sahih, Hasan, Da'eef), the great hadith scholars, and browse 9 authenticated collections including Sahih Bukhari and Sahih Muslim.",
    },
    'hadith-books': {
      title: "Hadith Library — All Collections {'|'} IslamicHub",
      description:
        'Browse all 9 major hadith collections — Sahih Bukhari, Sahih Muslim, the four Sunan, Musnad Ahmad, and more — by chapter and individual hadith.',
    },
    adhkar: {
      title: "Adhkar & Duas — Morning, Evening & Daily Supplications {'|'} IslamicHub",
      description:
        'Morning and evening adhkar, remembrance after prayer, before sleep, and daily dhikr — with Arabic, transliteration, translation, and a tap-to-count tracker.',
    },
    duas: {
      title: "Duas for Everyday Situations — Travel, Eating, Illness & More {'|'} IslamicHub",
      description:
        "Supplications from the Qur'an and Sunnah for travel, eating, home, the mosque, clothing, weather, distress, illness, forgiveness, and parents and family — with Arabic, transliteration, translation and source.",
    },
    tracker: {
      title: "Prayer Tracker — Log Your Five Daily Prayers {'|'} IslamicHub",
      description:
        'Record each of the five daily prayers as on time, late or missed, see your week and month at a glance, and keep a streak. Private: everything stays on your device.',
    },
    tasbih: {
      title: "Tasbih Counter — Digital Dhikr Counter {'|'} IslamicHub",
      description:
        'A free digital tasbih counter for dhikr — SubhanAllah, Alhamdulillah, Allahu Akbar, and more. Set a target, tap to count, and track your daily and lifetime totals.',
    },
    home: {
      title: 'IslamicHub — Islamic Education, Prayer Times, Zakat Calculator & Five Pillars Guide',
      description:
        "Free Islamic learning platform covering all Five Pillars of Islam. Accurate prayer times and Qibla direction, Zakat calculator with live gold prices, Islamic inheritance (Fara'id) calculator, and Hadith-based scholarly guides. No account needed.",
    },
    faith: {
      title: "Shahada — Declaration of Faith, Tawhid & First Pillar of Islam {'|'} IslamicHub",
      description:
        "Learn about the Shahada, the first pillar of Islam — Tawhid, the seven conditions, Risala, and all three dimensions of divine oneness, with Qur'anic verses and Hadith.",
    },
    pillars: {
      title: "The Five Pillars of Islam — Shahada, Salah, Zakat, Sawm and Hajj {'|'} IslamicHub",
      description:
        'What the five pillars of Islam are, the hadith that names them, and a guide to each: the testimony of faith, prayer, Zakat, the fast of Ramadan and Hajj.',
    },
    tools: {
      title: "Islamic Tools — Prayer Times, Zakat, Adhkar, Tasbih and More {'|'} IslamicHub",
      description:
        'Every free IslamicHub tool in one place: prayer times and Qibla, prayer tracker, adhkar, duas, tasbih counter, Zakat and inheritance calculators, and the Ramadan tracker.',
    },
    calendar: {
      title: "Islamic Calendar — Hijri Months and the Days of the Islamic Year {'|'} IslamicHub",
      description:
        'The Hijri calendar month by month beside the Gregorian dates, with the day of ‘Arafah, ‘Ashura, the white days and the other days that carry a sunnah, each with its evidence and an optional reminder.',
    },
    jumuah: {
      title: "Jumu’ah — The Sunnahs of Friday and the Friday Prayer {'|'} IslamicHub",
      description:
        'The sunnahs of Friday with their evidence, Surah al-Kahf, the Friday prayer and who it is due on, and optional Friday reminders, including one before your mosque’s khutbah.',
    },
    kalimah: {
      title: "Kalimah — A Daily Word from the Qur’an {'|'} IslamicHub",
      description:
        'A free daily word game: guess a word of the Qur’an in six tries, in Arabic letters or in transliteration, then read the verse it comes from.',
    },
    'who-am-i': {
      title: "Who Am I? — Guess the Prophet from Clues {'|'} IslamicHub",
      description:
        'A free guessing game: name the prophet from clues revealed one at a time, each clue drawn from his story with its verse or hadith.',
    },
    quiz: {
      title: "Prophets Quiz — Ten Questions on the Lives of the Prophets {'|'} IslamicHub",
      description:
        'A free quiz on the lives of the prophets: ten questions drawn at random from three hundred, each answer shown with the verse or hadith it rests on.',
    },
    games: {
      title: "Islamic Games — Prophets Quiz, Who Am I? and Kalimah {'|'} IslamicHub",
      description:
        'Three free games for learning: a quiz on the lives of the prophets, a guessing game with clues from their stories, and a daily word from the Qur’an. Every answer comes with its verse or hadith.',
    },
    adhan: {
      title: "The Adhan — Words, Meaning and How It Began {'|'} IslamicHub",
      description:
        'The call to prayer in Arabic with transliteration and meaning, the iqamah, the story of the first adhan, and what to say when you hear it, with every hadith referenced.',
    },
    'how-to-pray': {
      title: "How to Pray Salah Step by Step, with Illustrations {'|'} IslamicHub",
      description:
        'Each position of the prayer illustrated, with what to recite in Arabic, transliteration and translation: takbir, al-Fatihah, ruku‘, sujud, tashahhud and salam.',
    },
    prayer: {
      title: "Prayer Times, Qibla Direction & Salah Guide {'|'} IslamicHub",
      description:
        'Get accurate Islamic prayer times for your location with 5 calculation methods. Find the Qibla direction with a live compass. Learn the second pillar of Islam with Hadith references.',
    },
    zakat: {
      title: "Accurate Zakat Calculator Online — Live Gold & Silver Prices {'|'} IslamicHub",
      description:
        'Calculate your annual Zakat with live gold and silver prices. Supports cash, gold/silver by weight, shares, ISAs, pensions, business inventory, and debt deductions. Dual Nisab methods. Free and private.',
    },
    fasting: {
      title: "Ramadan Fasting Tracker, Suhoor & Iftar Times {'|'} IslamicHub",
      description:
        'Live Suhoor and Iftar times for your location, fasting progress bar, Ramadan countdown, and a comprehensive Hadith-based guide to Sawm rulings.',
    },
    hajj: {
      title: "Hajj Rites Guide — Complete Step-by-Step Pilgrimage to Makkah {'|'} IslamicHub",
      description:
        'Day-by-day Hajj rites for all five days, three types of Hajj (Tamattu, Qiran, Ifrad), full Umrah guide, conditions of obligation, and rulings from all four schools.',
    },
    inheritance: {
      title: "Islamic Inheritance Calculator (Fara'id) {'|'} IslamicHub",
      description:
        "Calculate Qur'anic inheritance shares for all 13 heir types based on Qur'an 4:11–12. Automatic blocking rules, awl reduction, and visual breakdown.",
    },
    about: {
      title: 'About IslamicHub — Open Source Islamic Education Platform',
      description:
        'Open-source Islamic education platform built by Zubair Idris Aweda and Yusuf Saif. Learn our mission, methodology, scholarly sources, and how to contribute on GitHub.',
    },
    changelog: {
      title: 'Changelog — IslamicHub Updates & Fixes',
      description:
        'Full changelog for IslamicHub: version history, new features, bug fixes, and improvements.',
    },
    'articles-of-faith': {
      title: "The Six Articles of Faith (Arkan al-Iman) {'|'} IslamicHub",
      description:
        "Learn the six articles of Islamic faith — belief in Allah, angels, scriptures, prophets, the Day of Judgement, and divine decree (Qadr). Grounded in Qur'an and the Hadith of Jibril.",
    },
    'not-found': {
      title: 'Page Not Found — IslamicHub',
    },
    eid: {
      title:
        "Eid al-Fitr and Eid al-Adha — Sunnahs, Prayer, Takbirat and Countdown {'|'} IslamicHub",
      description:
        'A sourced guide to the two Eids: the sunnahs of the day, the Eid prayer step by step, the takbirat in Arabic with translation, Zakat al-Fitr, and a countdown to the next Eid.',
    },
    qurbani: {
      title: "Qurbani — The Eid al-Adha Sacrifice, Rules and Shares {'|'} IslamicHub",
      description:
        'A sourced guide to Qurbani: who it is due on, which animals qualify, the days of sacrifice, how the meat is shared, and a helper for working out shares of a cow or camel.',
    },
    prophets: {
      title: "The Prophets Named in the Qur'an — Their Stories and Verses {'|'} IslamicHub",
      description:
        "The 25 prophets named in the Qur'an, each with the verses that name him, and their stories told from the Qur'an and authentic hadith.",
    },
  },
  about: {
    quranTranslations: "Qur'an translations used:",
  },
  eid: {
    next: {
      fitr: 'Next: Eid al-Fitr',
      adha: 'Next: Eid al-Adha',
    },
    greeting: {
      fitr: 'Eid Mubarak! Today is Eid al-Fitr',
      adha: 'Eid Mubarak! Today is Eid al-Adha',
    },
    expected: 'Expected on {date}',
  },
  qurbani: {
    people: 'Number of people',
    invalid: 'Enter a whole number of people, 1 or more.',
    options: 'Ways to do it',
    small: '{n} sheep or goats | {n} sheep or goat | {n} sheep or goats',
    large: '{n} cows or camels | {n} cow or camel | {n} cows or camels',
    sharesOfOne:
      '{n} shares of one cow or camel | {n} share of one cow or camel | {n} shares of one cow or camel',
    mixed: '{large} and {small}',
    spare:
      '{animals}, with {n} shares spare | {animals}, with {n} share spare | {animals}, with {n} shares spare',
    exact: 'every share filled',
  },
  prophets: {
    badge: 'The Prophets',
    title: "The prophets named in the Qur'an",
    lead: "The Qur'an names twenty-five prophets, peace be upon them all. Each is listed here with verses that name him and his story, told from the Qur'an and authentic hadith only.",
    namedIn: 'Named in',
    readStory: 'Read the story of {name}',
    storyComing: 'Story not yet written',
    storyTitle: "The Story of the Prophet {name} — From the Qur'an and Hadith {'|'} IslamicHub",
    breadcrumb: 'Breadcrumb',
    all: '← All prophets',
    allProphets: 'All prophets',
    stories: 'Stories of the prophets',
    previous: '← {name}',
    next: '{name} →',
    sources:
      "This story is told from the Qur'an and authentic hadith only. Where they are silent, it says so. Quotations of the Qur'an follow Saheeh International, with the prophets' names in their Arabic form.",
    placesTitle: 'Places',
    placesUnknown:
      "The Qur'an and authentic hadith do not say where he was born or lived, and no place is identified for him here, so his places are not known.",
  },
  journey: {
    map: 'Map of {n} places | Map of {n} place | Map of {n} places',
    stop: 'Place {n}: {name}',
    known: {
      scripture: "Named in the Qur'an or hadith",
      historians: 'Place identified by historians',
    },
    kind: {
      born: 'Born here',
      lived: 'Lived here',
      sent: 'Sent here',
      travelled: 'Journeyed here',
      died: 'Died here',
    },
    source: 'Identified by: {source}',
    notOnMap: 'It is not shown on the map.',
  },
}

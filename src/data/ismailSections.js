// What every language shares in the story of Isma’il: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ismail/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Isma’il; the story cites every one of them.
export const passages = [
  "Qur'an 2:125-129",
  "Qur'an 2:133",
  "Qur'an 2:136",
  "Qur'an 2:140",
  "Qur'an 3:84",
  "Qur'an 4:163",
  "Qur'an 6:86",
  "Qur'an 14:35-41",
  "Qur'an 19:54-55",
  "Qur'an 21:85-86",
  "Qur'an 37:100-107",
  "Qur'an 38:48",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 19:54",
      "Qur'an 19:55",
      "Qur'an 6:86",
      "Qur'an 21:85",
      "Qur'an 21:86",
      "Qur'an 38:48",
      "Qur'an 4:163",
    ],
  },
  {
    id: 'whoVerse',
    type: 'verse',
    arabic:
      'وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ ۚ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَبِيًّا',
    reference: "Qur'an 19:54",
  },
  {
    id: 'valley',
    type: 'prose',
    paragraphs: 3,
    references: ['Sahih Bukhari 3364', "Qur'an 14:35", "Qur'an 14:37"],
  },
  {
    id: 'valleyVerse',
    type: 'verse',
    arabic:
      'رَبَّنَا إِنِّي أَسْكَنْتُ مِنْ ذُرِّيَّتِي بِوَادٍ غَيْرِ ذِي زَرْعٍ عِنْدَ بَيْتِكَ الْمُحَرَّمِ رَبَّنَا لِيُقِيمُوا الصَّلَاةَ فَاجْعَلْ أَفْئِدَةً مِنَ النَّاسِ تَهْوِي إِلَيْهِمْ وَارْزُقْهُمْ مِنَ الثَّمَرَاتِ لَعَلَّهُمْ يَشْكُرُونَ',
    reference: "Qur'an 14:37",
  },
  {
    id: 'zamzam',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 3364'],
  },
  {
    id: 'jurhum',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 3364', 'Sahih Bukhari 2899'],
  },
  {
    id: 'sacrifice',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 37:100",
      "Qur'an 37:101",
      "Qur'an 37:102",
      "Qur'an 37:103",
      "Qur'an 37:104",
      "Qur'an 37:105",
      "Qur'an 37:106",
      "Qur'an 37:107",
    ],
  },
  {
    id: 'house',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 2:125",
      "Qur'an 2:126",
      "Qur'an 2:127",
      "Qur'an 2:128",
      "Qur'an 2:129",
      'Sahih Bukhari 3364',
    ],
  },
  {
    id: 'houseVerse',
    type: 'verse',
    arabic:
      'وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    reference: "Qur'an 2:127",
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 14:39", "Qur'an 2:133", "Qur'an 2:136", "Qur'an 2:140", "Qur'an 3:84"],
  },
]

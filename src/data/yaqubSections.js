// What every language shares in the story of Ya'qub: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/yaqub/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset. His part in the story of Yusuf is told in full there.

// The passages of the Qur'an that name Ya'qub; the story cites every one of them.
export const passages = [
  "Qur'an 2:132-133",
  "Qur'an 2:136",
  "Qur'an 2:140",
  "Qur'an 3:84",
  "Qur'an 4:163",
  "Qur'an 6:84",
  "Qur'an 11:71",
  "Qur'an 12:6",
  "Qur'an 12:13",
  "Qur'an 12:18",
  "Qur'an 12:38",
  "Qur'an 12:66-68",
  "Qur'an 12:83-87",
  "Qur'an 12:94-100",
  "Qur'an 19:49-50",
  "Qur'an 21:72-73",
  "Qur'an 29:27",
  "Qur'an 38:45-47",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 11:71",
      "Qur'an 19:49",
      "Qur'an 19:50",
      "Qur'an 21:72",
      "Qur'an 21:73",
      "Qur'an 29:27",
      'Sahih Bukhari 3382',
    ],
  },
  {
    id: 'chosen',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:45", "Qur'an 38:46", "Qur'an 38:47", "Qur'an 6:84", "Qur'an 4:163"],
  },
  {
    id: 'chosenVerse',
    type: 'verse',
    arabic:
      'وَاذْكُرْ عِبَادَنَا إِبْرَاهِيمَ وَإِسْحَاقَ وَيَعْقُوبَ أُولِي الْأَيْدِي وَالْأَبْصَارِ',
    reference: "Qur'an 38:45",
  },
  {
    id: 'yusuf',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 12:4", "Qur'an 12:5", "Qur'an 12:6", "Qur'an 12:13", "Qur'an 12:18"],
  },
  {
    id: 'patience',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 12:64",
      "Qur'an 12:66",
      "Qur'an 12:67",
      "Qur'an 12:68",
      "Qur'an 12:83",
      "Qur'an 12:84",
      "Qur'an 12:86",
      "Qur'an 12:87",
    ],
  },
  {
    id: 'patienceVerse',
    type: 'verse',
    arabic:
      'قَالَ إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ وَأَعْلَمُ مِنَ اللَّهِ مَا لَا تَعْلَمُونَ',
    reference: "Qur'an 12:86",
  },
  {
    id: 'reunion',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 12:94", "Qur'an 12:96", "Qur'an 12:98", "Qur'an 12:99", "Qur'an 12:100"],
  },
  {
    id: 'testament',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:132", "Qur'an 2:133", "Qur'an 2:134"],
  },
  {
    id: 'testamentVerse',
    type: 'verse',
    arabic:
      'أَمْ كُنْتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِنْ بَعْدِي قَالُوا نَعْبُدُ إِلَٰهَكَ وَإِلَٰهَ آبَائِكَ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ إِلَٰهًا وَاحِدًا وَنَحْنُ لَهُ مُسْلِمُونَ',
    reference: "Qur'an 2:133",
  },
  {
    id: 'faith',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 2:136", "Qur'an 3:84", "Qur'an 2:140", "Qur'an 12:38"],
  },
]

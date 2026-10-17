// What every language shares in the story of Adam: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/adam/en.js (and in each translation)
// under the same ids. Every reference here was checked against its source, and the Arabic is from
// an open Qur'an dataset.

// The passages of the Qur'an that tell of Adam; the story cites every one of them.
export const passages = [
  "Qur'an 2:30-39",
  "Qur'an 3:33",
  "Qur'an 3:59",
  "Qur'an 4:1",
  "Qur'an 5:27-32",
  "Qur'an 7:11-27",
  "Qur'an 7:172-173",
  "Qur'an 15:26-44",
  "Qur'an 17:61-65",
  "Qur'an 17:70",
  "Qur'an 18:50",
  "Qur'an 19:58",
  "Qur'an 20:115-123",
  "Qur'an 36:60",
  "Qur'an 38:71-85",
]

export default [
  {
    id: 'successor',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:30", "Qur'an 2:31", "Qur'an 2:32", "Qur'an 2:33"],
  },
  {
    id: 'successorVerse',
    type: 'verse',
    arabic:
      'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَنْ يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ',
    reference: "Qur'an 2:30",
  },
  {
    id: 'creation',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 15:26",
      "Qur'an 15:28",
      "Qur'an 15:29",
      "Qur'an 38:71",
      "Qur'an 38:72",
      "Qur'an 38:75",
      "Qur'an 3:59",
      'Sahih Bukhari 3326',
      'Sahih Muslim 854',
    ],
  },
  {
    id: 'prostration',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 2:34",
      "Qur'an 15:30",
      "Qur'an 15:31",
      "Qur'an 15:32",
      "Qur'an 15:33",
      "Qur'an 7:12",
      "Qur'an 7:13",
      "Qur'an 7:14",
      "Qur'an 7:15",
      "Qur'an 7:16",
      "Qur'an 7:17",
      "Qur'an 18:50",
      "Qur'an 17:62",
      "Qur'an 17:65",
    ],
  },
  {
    id: 'garden',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:35", "Qur'an 20:117", "Qur'an 20:118", "Qur'an 20:119", "Qur'an 4:1"],
  },
  {
    id: 'tree',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:20",
      "Qur'an 7:21",
      "Qur'an 7:22",
      "Qur'an 20:120",
      "Qur'an 20:121",
      "Qur'an 2:36",
    ],
  },
  {
    id: 'repentance',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 7:23", "Qur'an 2:37", "Qur'an 20:122", "Qur'an 20:115"],
  },
  {
    id: 'repentanceVerse',
    type: 'verse',
    arabic:
      'قَالَا رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    reference: "Qur'an 7:23",
  },
  {
    id: 'earth',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:38", "Qur'an 2:39", "Qur'an 7:24", "Qur'an 7:25", "Qur'an 20:123"],
  },
  {
    id: 'covenant',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 7:172", "Qur'an 7:173"],
  },
  {
    id: 'sons',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 5:27",
      "Qur'an 5:28",
      "Qur'an 5:29",
      "Qur'an 5:30",
      "Qur'an 5:31",
      "Qur'an 5:32",
      'Sahih Bukhari 3335',
    ],
  },
  {
    id: 'sonsVerse',
    type: 'verse',
    arabic:
      'مِنْ أَجْلِ ذَٰلِكَ كَتَبْنَا عَلَىٰ بَنِي إِسْرَائِيلَ أَنَّهُ مَنْ قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا ۚ وَلَقَدْ جَاءَتْهُمْ رُسُلُنَا بِالْبَيِّنَاتِ ثُمَّ إِنَّ كَثِيرًا مِنْهُمْ بَعْدَ ذَٰلِكَ فِي الْأَرْضِ لَمُسْرِفُونَ',
    reference: "Qur'an 5:32",
  },
  {
    id: 'children',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 17:70",
      "Qur'an 7:26",
      "Qur'an 7:27",
      "Qur'an 36:60",
      "Qur'an 3:33",
      "Qur'an 19:58",
    ],
  },
  {
    id: 'legacy',
    type: 'points',
    items: [
      { reference: 'Sahih Bukhari 3326' },
      { reference: 'Sahih Bukhari 3342' },
      { reference: 'Sahih Bukhari 3409' },
      { reference: 'Sahih Bukhari 4476' },
      { reference: 'Sahih Muslim 854' },
    ],
  },
]

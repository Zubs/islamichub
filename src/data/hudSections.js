// What every language shares in the story of Hud: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/hud/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Hud; the story cites every one of them.
export const passages = [
  "Qur'an 7:65-72",
  "Qur'an 11:50-60",
  "Qur'an 26:123-140",
  "Qur'an 41:15-16",
  "Qur'an 46:21-26",
  "Qur'an 54:18-21",
  "Qur'an 69:6-8",
  "Qur'an 89:6-8",
]

export default [
  {
    id: 'people',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:65",
      "Qur'an 7:69",
      "Qur'an 89:6",
      "Qur'an 89:7",
      "Qur'an 89:8",
      "Qur'an 41:15",
      "Qur'an 26:128",
      "Qur'an 26:129",
      "Qur'an 26:130",
    ],
  },
  {
    id: 'call',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 11:50",
      "Qur'an 11:51",
      "Qur'an 11:52",
      "Qur'an 7:67",
      "Qur'an 7:68",
      "Qur'an 26:124",
      "Qur'an 26:125",
      "Qur'an 26:126",
      "Qur'an 26:127",
    ],
  },
  {
    id: 'callVerse',
    type: 'verse',
    arabic:
      'وَيَا قَوْمِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ يُرْسِلِ السَّمَاءَ عَلَيْكُمْ مِدْرَارًا وَيَزِدْكُمْ قُوَّةً إِلَىٰ قُوَّتِكُمْ وَلَا تَتَوَلَّوْا مُجْرِمِينَ',
    reference: "Qur'an 11:52",
  },
  {
    id: 'answer',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 7:66",
      "Qur'an 7:70",
      "Qur'an 11:53",
      "Qur'an 11:54",
      "Qur'an 26:136",
      "Qur'an 26:137",
      "Qur'an 26:138",
      "Qur'an 46:22",
      "Qur'an 46:23",
    ],
  },
  {
    id: 'trust',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 11:55", "Qur'an 11:56", "Qur'an 11:57"],
  },
  {
    id: 'trustVerse',
    type: 'verse',
    arabic:
      'إِنِّي تَوَكَّلْتُ عَلَى اللَّهِ رَبِّي وَرَبِّكُمْ ۚ مَا مِنْ دَابَّةٍ إِلَّا هُوَ آخِذٌ بِنَاصِيَتِهَا ۚ إِنَّ رَبِّي عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ',
    reference: "Qur'an 11:56",
  },
  {
    id: 'wind',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 46:24",
      "Qur'an 46:25",
      "Qur'an 69:6",
      "Qur'an 69:7",
      "Qur'an 69:8",
      "Qur'an 41:16",
      "Qur'an 54:19",
      "Qur'an 54:20",
      'Sahih Bukhari 1035',
    ],
  },
  {
    id: 'saved',
    type: 'prose',
    paragraphs: 1,
    references: [
      "Qur'an 11:58",
      "Qur'an 11:59",
      "Qur'an 11:60",
      "Qur'an 7:72",
      "Qur'an 26:139",
      "Qur'an 46:26",
    ],
  },
  {
    id: 'cloud',
    type: 'prose',
    paragraphs: 1,
    references: ['Sahih Bukhari 3206', "Qur'an 46:24"],
  },
]

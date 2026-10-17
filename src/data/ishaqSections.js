// What every language shares in the story of Ishaq: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/ishaq/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Ishaq; the story cites every one of them.
export const passages = [
  "Qur'an 2:133",
  "Qur'an 2:136",
  "Qur'an 2:140",
  "Qur'an 3:84",
  "Qur'an 4:163",
  "Qur'an 6:84",
  "Qur'an 11:69-73",
  "Qur'an 12:6",
  "Qur'an 12:38",
  "Qur'an 14:39",
  "Qur'an 19:49-50",
  "Qur'an 21:72-73",
  "Qur'an 29:27",
  "Qur'an 37:112-113",
  "Qur'an 38:45-47",
  "Qur'an 51:24-30",
]

export default [
  {
    id: 'tidings',
    type: 'prose',
    paragraphs: 3,
    references: [
      "Qur'an 11:69",
      "Qur'an 11:70",
      "Qur'an 11:71",
      "Qur'an 11:72",
      "Qur'an 11:73",
      "Qur'an 51:24",
      "Qur'an 51:25",
      "Qur'an 51:26",
      "Qur'an 51:27",
      "Qur'an 51:28",
      "Qur'an 51:29",
      "Qur'an 51:30",
    ],
  },
  {
    id: 'tidingsVerse',
    type: 'verse',
    arabic:
      'وَامْرَأَتُهُ قَائِمَةٌ فَضَحِكَتْ فَبَشَّرْنَاهَا بِإِسْحَاقَ وَمِنْ وَرَاءِ إِسْحَاقَ يَعْقُوبَ',
    reference: "Qur'an 11:71",
  },
  {
    id: 'prophet',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 37:112",
      "Qur'an 37:113",
      "Qur'an 19:49",
      "Qur'an 19:50",
      "Qur'an 21:72",
      "Qur'an 21:73",
      "Qur'an 6:84",
      "Qur'an 4:163",
    ],
  },
  {
    id: 'prophetVerse',
    type: 'verse',
    arabic: 'وَبَشَّرْنَاهُ بِإِسْحَاقَ نَبِيًّا مِنَ الصَّالِحِينَ',
    reference: "Qur'an 37:112",
  },
  {
    id: 'chosen',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 38:45", "Qur'an 38:46", "Qur'an 38:47", "Qur'an 29:27", "Qur'an 14:39"],
  },
  {
    id: 'line',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 12:6", "Qur'an 12:38", "Qur'an 2:133", 'Sahih Bukhari 3382'],
  },
  {
    id: 'faith',
    type: 'prose',
    paragraphs: 1,
    references: ["Qur'an 2:136", "Qur'an 2:140", "Qur'an 3:84"],
  },
]

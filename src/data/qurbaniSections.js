// What every language shares on the Qurbani page: the order and kind of its sections, the Arabic
// text and the references. The words are in content/qurbani/en.js (and in each translation) under
// the same ids. Every reference here was checked against its source.
export default [
  { id: 'what', type: 'prose', paragraphs: 2, references: ["Qur'an 22:34", "Qur'an 108:2"] },
  { id: 'origin', type: 'prose', paragraphs: 2, references: ["Qur'an 37:102", "Qur'an 37:107"] },
  {
    id: 'ransom',
    type: 'verse',
    arabic: 'وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ',
    reference: "Qur'an 37:107",
  },
  {
    id: 'piety',
    type: 'verse',
    arabic:
      'لَنْ يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِنْ يَنَالُهُ التَّقْوَىٰ مِنْكُمْ',
    reference: "Qur'an 22:37",
  },
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ['Ibn Majah 3123', 'Al-Tirmidhi 1505', 'Abu Dawud 2810'],
  },
  {
    id: 'ruling',
    type: 'positions',
    items: [
      { reference: "Ibn Majah 3123 · Qur'an 108:2" },
      { reference: 'Abu Dawud 2791 · Al-Tirmidhi 1506' },
    ],
  },
  {
    id: 'animals',
    type: 'points',
    items: [
      { reference: "Qur'an 6:143 · Qur'an 6:144" },
      { reference: 'Abu Dawud 2797' },
      { reference: 'Abu Dawud 2802' },
      { reference: 'Sahih Bukhari 5565' },
    ],
  },
  { id: 'days', type: 'prose', paragraphs: 1, references: ['Sahih Bukhari 5545'] },
  {
    id: 'dayCount',
    type: 'positions',
    items: [{ reference: 'Muwatta Malik 1039' }, { reference: "Qur'an 2:203 · Abu Dawud 2813" }],
  },
  {
    id: 'shares',
    type: 'prose',
    paragraphs: 2,
    references: ['Abu Dawud 2808', 'Al-Tirmidhi 1505'],
  },
  {
    id: 'meat',
    type: 'points',
    items: [
      { reference: "Qur'an 22:28 · Qur'an 22:36" },
      { reference: 'Sahih Bukhari 5569' },
      { reference: 'Sahih Bukhari 1717' },
    ],
  },
  {
    id: 'manner',
    type: 'points',
    items: [
      { reference: 'Abu Dawud 2791' },
      { reference: 'Sahih Bukhari 5565' },
      { reference: 'Abu Dawud 2815' },
    ],
  },
  {
    id: 'faq',
    type: 'faq',
    items: 4,
    references: ['Sahih Bukhari 5545', 'Al-Tirmidhi 1505', 'Abu Dawud 2808', 'Sahih Bukhari 5569'],
  },
]

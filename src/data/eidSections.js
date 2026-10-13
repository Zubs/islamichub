// What every language shares on the Eid page: the order and kind of its sections, the Arabic
// text and the references. The words are in en.js (and in each translation) under the same ids.
// Every reference here was checked against its source.
export default [
  { id: 'what', type: 'prose', paragraphs: 2, references: ['Abu Dawud 1134'] },
  { id: 'origin', type: 'hadith', reference: 'Abu Dawud 1134' },
  {
    id: 'sunnahs',
    type: 'points',
    items: [
      { reference: 'Sahih Bukhari 953' },
      { reference: 'Al-Tirmidhi 542' },
      { reference: 'Sahih Bukhari 956' },
      { reference: 'Sahih Bukhari 986' },
      { reference: 'Sahih Bukhari 971' },
      { reference: "Qur'an 2:185" },
    ],
  },
  {
    id: 'prayer',
    type: 'points',
    ordered: true,
    items: [
      { reference: 'Sahih Bukhari 960' },
      { reference: 'Sahih Bukhari 964' },
      { reference: 'Abu Dawud 1149' },
      { reference: 'Al-Tirmidhi 533 · Al-Tirmidhi 534' },
      { reference: 'Sahih Bukhari 963' },
      { reference: 'Sahih Bukhari 964' },
    ],
  },
  {
    id: 'takbirs',
    type: 'positions',
    items: [{ reference: 'Abu Dawud 1149 · Abu Dawud 1151' }, { reference: 'Abu Dawud 1153' }],
  },
  {
    id: 'takbirVerse',
    type: 'verse',
    arabic:
      'وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ',
    reference: "Qur'an 2:185",
  },
  {
    id: 'takbirat',
    type: 'recitation',
    arabic:
      'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
    references: ["Qur'an 2:185", "Qur'an 22:37", "Qur'an 2:203", 'Sahih Bukhari 971'],
  },
  {
    id: 'zakatAlFitr',
    type: 'prose',
    paragraphs: 2,
    references: ['Sahih Bukhari 1503', 'Abu Dawud 1609'],
  },
  {
    id: 'faq',
    type: 'faq',
    items: 4,
    references: [
      'Sahih Bukhari 1991',
      'Sahih Bukhari 974',
      'Sahih Bukhari 964',
      'Sahih Bukhari 952',
    ],
  },
]

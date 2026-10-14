// What every language shares in the story of Adam: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/adam/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source.
export default [
  {
    id: 'creation',
    type: 'prose',
    paragraphs: 3,
    references: ["Qur'an 2:30", "Qur'an 15:28", "Qur'an 15:29", 'Sahih Bukhari 3326'],
  },
  {
    id: 'creationVerse',
    type: 'verse',
    arabic:
      'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَنْ يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ',
    reference: "Qur'an 2:30",
  },
  {
    id: 'names',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:31", "Qur'an 2:32", "Qur'an 2:33"],
  },
  {
    id: 'prostration',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:34", "Qur'an 7:12", "Qur'an 15:39", "Qur'an 15:40"],
  },
  {
    id: 'prostrationVerse',
    type: 'verse',
    arabic:
      'وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا إِبْلِيسَ أَبَىٰ وَاسْتَكْبَرَ وَكَانَ مِنَ الْكَافِرِينَ',
    reference: "Qur'an 2:34",
  },
  {
    id: 'garden',
    type: 'prose',
    paragraphs: 2,
    references: [
      "Qur'an 2:35",
      "Qur'an 7:19",
      "Qur'an 20:120",
      "Qur'an 2:36",
      "Qur'an 7:22",
      'Sahih Bukhari 3340',
    ],
  },
  {
    id: 'repentance',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 7:23", "Qur'an 2:37", "Qur'an 20:122"],
  },
  {
    id: 'repentanceVerse',
    type: 'verse',
    arabic:
      'قَالَا رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    reference: "Qur'an 7:23",
  },
  {
    id: 'descent',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 2:38", "Qur'an 2:39", "Qur'an 20:123"],
  },
  {
    id: 'sons',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 5:27", "Qur'an 5:30", "Qur'an 5:31", 'Sahih Bukhari 3335'],
  },
  {
    id: 'legacy',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 3:33", "Qur'an 3:59", 'Sahih Bukhari 3342', 'Sahih Bukhari 4712'],
  },
  {
    id: 'legacyVerse',
    type: 'verse',
    arabic: 'ثُمَّ اجْتَبَاهُ رَبُّهُ فَتَابَ عَلَيْهِ وَهَدَىٰ',
    reference: "Qur'an 20:122",
  },
]

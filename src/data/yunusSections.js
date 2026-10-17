// What every language shares in the story of Yunus: the order and kind of its sections, the Arabic
// of each verse and the references. The words are in content/yunus/en.js (and in each
// translation) under the same ids. Every reference here was checked against its source, and the
// Arabic is from an open Qur'an dataset.

// The passages of the Qur'an that tell of Yunus; the story cites every one of them.
export const passages = [
  "Qur'an 4:163",
  "Qur'an 6:86",
  "Qur'an 10:98",
  "Qur'an 21:87-88",
  "Qur'an 37:139-148",
  "Qur'an 68:48-50",
]

export default [
  {
    id: 'who',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:139", "Qur'an 6:86", "Qur'an 4:163", 'Sahih Bukhari 3413'],
  },
  {
    id: 'flight',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 21:87", "Qur'an 37:140", "Qur'an 37:141"],
  },
  {
    id: 'fish',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:142", "Qur'an 37:143", "Qur'an 37:144", "Qur'an 21:87", "Qur'an 21:88"],
  },
  {
    id: 'fishVerse',
    type: 'verse',
    arabic:
      'وَذَا النُّونِ إِذْ ذَهَبَ مُغَاضِبًا فَظَنَّ أَنْ لَنْ نَقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    reference: "Qur'an 21:87",
  },
  {
    id: 'dua',
    type: 'prose',
    paragraphs: 1,
    references: ['Al-Tirmidhi 3505'],
  },
  {
    id: 'shore',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:145", "Qur'an 37:146", "Qur'an 68:49", "Qur'an 68:50"],
  },
  {
    id: 'people',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 37:147", "Qur'an 37:148", "Qur'an 10:98"],
  },
  {
    id: 'peopleVerse',
    type: 'verse',
    arabic:
      'فَلَوْلَا كَانَتْ قَرْيَةٌ آمَنَتْ فَنَفَعَهَا إِيمَانُهَا إِلَّا قَوْمَ يُونُسَ لَمَّا آمَنُوا كَشَفْنَا عَنْهُمْ عَذَابَ الْخِزْيِ فِي الْحَيَاةِ الدُّنْيَا وَمَتَّعْنَاهُمْ إِلَىٰ حِينٍ',
    reference: "Qur'an 10:98",
  },
  {
    id: 'lesson',
    type: 'prose',
    paragraphs: 2,
    references: ["Qur'an 68:48", 'Sahih Bukhari 3416', 'Sahih Bukhari 3395'],
  },
]

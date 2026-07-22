// Preset phrases for the digital tasbih (dhikr) counter.
// Kept separate from src/data/adhkar.js since these are short, repeatable
// phrases meant for free counting rather than a fixed daily set of adhkar.

export const TASBIH_PHRASES = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubḥānAllāh',
    translation: 'Glory be to Allah',
    defaultTarget: 33,
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alḥamdulillāh',
    translation: 'Praise be to Allah',
    defaultTarget: 33,
  },
  {
    id: 'allahu-akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    translation: 'Allah is the Greatest',
    defaultTarget: 34,
  },
  {
    id: 'la-ilaha-illallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'Lā ilāha illallāh',
    translation: 'There is no deity but Allah',
    defaultTarget: 100,
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullāh',
    translation: 'I seek the forgiveness of Allah',
    defaultTarget: 100,
  },
  {
    id: 'la-hawla-wala-quwwata',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
    translation: 'There is no power and no strength except by Allah',
    defaultTarget: 100,
  },
]

export function getPhrase(id) {
  return TASBIH_PHRASES.find((p) => p.id === id) || TASBIH_PHRASES[0]
}

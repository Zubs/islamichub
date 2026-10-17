// The places of Ibrahim's life, in the order of his journey. `kind` says what the place was to him
// (born, lived, sent, travelled or died). `known` says how the place is known: 'scripture' when the
// Qur'an or a hadith names it, 'historians' when the sources describe what happened and historians
// identify where. The words for each place are in content/ibrahim/en.js under `places`.
export const journey = true

export default [
  {
    id: 'ur',
    kind: 'lived',
    lat: 30.96,
    lon: 46.1,
    known: 'historians',
    reference: "Qur'an 21:52 · Qur'an 21:69",
  },
  {
    id: 'harran',
    kind: 'travelled',
    lat: 36.86,
    lon: 39.03,
    known: 'historians',
    reference: "Qur'an 29:26",
  },
  {
    id: 'canaan',
    kind: 'lived',
    lat: 31.53,
    lon: 35.1,
    known: 'historians',
    reference: "Qur'an 21:71",
  },
  {
    id: 'egypt',
    kind: 'travelled',
    lat: 29.84,
    lon: 31.25,
    known: 'historians',
    reference: 'Sahih Bukhari 2217',
  },
  {
    id: 'makkah',
    kind: 'travelled',
    lat: 21.42,
    lon: 39.83,
    known: 'scripture',
    reference: "Qur'an 14:37 · Qur'an 3:96 · Qur'an 2:127",
  },
]

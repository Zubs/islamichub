// The places of Musa's life. `kind` says what the place was to him, and `known` says how it is
// known: 'scripture' when the Qur'an or a hadith names it, 'historians' when historians identify
// where. A place with no coordinates is listed but not drawn. The words are in content/musa/en.js
// under `places`. The order of his life is not a single journey, so no line joins them.
export default [
  {
    id: 'egypt',
    kind: 'born',
    lat: 29.9,
    lon: 31.2,
    known: 'scripture',
    reference: "Qur'an 10:87 · Qur'an 28:7",
  },
  {
    id: 'madyan',
    kind: 'lived',
    lat: 28.48,
    lon: 34.98,
    known: 'scripture',
    reference: "Qur'an 28:22 · Qur'an 20:40",
  },
  {
    id: 'sinai',
    kind: 'sent',
    lat: 28.54,
    lon: 33.98,
    known: 'historians',
    reference: "Qur'an 20:12 · Qur'an 95:2",
  },
  { id: 'sea', kind: 'travelled', known: 'scripture', reference: "Qur'an 26:63" },
  { id: 'holyLand', kind: 'died', known: 'scripture', reference: 'Sahih Bukhari 1339' },
]

// The places of the life of the Prophet Muhammad ﷺ. See data/musaPlaces.js for what each field
// means. The words are in content/muhammad/en.js under `places`.
export default [
  {
    id: 'makkah',
    kind: 'born',
    lat: 21.42,
    lon: 39.83,
    known: 'scripture',
    reference: "Qur'an 48:24 · Sahih Bukhari 3",
  },
  {
    id: 'taif',
    kind: 'travelled',
    known: 'historians',
    reference: 'Sahih Bukhari 3231',
  },
  {
    id: 'jerusalem',
    kind: 'travelled',
    lat: 31.78,
    lon: 35.24,
    known: 'scripture',
    reference: "Qur'an 17:1 · Sahih Bukhari 3886",
  },
  {
    id: 'madinah',
    kind: 'died',
    lat: 24.47,
    lon: 39.61,
    known: 'scripture',
    reference: "Qur'an 63:8 · Sahih Bukhari 1389",
  },
  {
    id: 'badr',
    kind: 'travelled',
    known: 'scripture',
    reference: "Qur'an 3:123",
  },
]

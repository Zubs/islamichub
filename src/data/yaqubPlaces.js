// The places of Ya'qub's life. See data/musaPlaces.js for what each field means. The words are in
// content/yaqub/en.js under `places`. He travelled from the one to the other, so a line joins them.
export const journey = true

export default [
  {
    id: 'canaan',
    kind: 'lived',
    lat: 31.53,
    lon: 35.1,
    known: 'historians',
    reference: "Qur'an 12:100",
  },
  {
    id: 'egypt',
    kind: 'travelled',
    lat: 29.9,
    lon: 31.2,
    known: 'scripture',
    reference: "Qur'an 12:99",
  },
]

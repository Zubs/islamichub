export const SHARES_PER_LARGE_ANIMAL = 7

// What was typed as a number of people: null when empty, { error: true } when it is not a whole
// number above zero, otherwise { people }.
export function parsePeople(value) {
  const text = String(value ?? '').trim()
  if (text === '') {
    return null
  }

  const people = Number(text)
  if (!/^\d+$/.test(text) || people < 1 || !Number.isSafeInteger(people)) {
    return { error: true }
  }

  return { people }
}

// The ways a group can sacrifice. A sheep or goat (small) counts for one person; a cow or camel
// (large) holds up to seven shares. Each option is { small, large, spare }, spare being the
// unused shares of the last large animal.
export function shareOptions(people) {
  const full = Math.floor(people / SHARES_PER_LARGE_ANIMAL)
  const rest = people % SHARES_PER_LARGE_ANIMAL
  const large = Math.ceil(people / SHARES_PER_LARGE_ANIMAL)
  const options = [
    { small: people, large: 0, spare: 0 },
    { small: 0, large, spare: large * SHARES_PER_LARGE_ANIMAL - people },
  ]

  if (full > 0 && rest > 0) {
    options.splice(1, 0, { small: rest, large: full, spare: 0 })
  }

  return options
}

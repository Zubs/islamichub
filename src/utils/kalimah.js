// The rules of Kalimah: one word a day, chosen by the date alone so every device agrees, guessed
// in six tries either in Arabic letters or in its transliteration.
export const TRIES = 6
export const MODES = ['arabic', 'latin']

const EPOCH = '2026-10-01'
const DAY_MS = 86400000

export const ARABIC_KEYS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ذ', 'ظ', 'ز', 'و', 'ة', 'ر', 'د'],
]

export const LATIN_KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const KEYS = { arabic: ARABIC_KEYS.flat(), latin: LATIN_KEYS.flat() }

function dayNumber(dayKey) {
  const [year, month, day] = dayKey.split('-').map(Number)
  return Math.round(Date.UTC(year, month - 1, day) / DAY_MS)
}

export function wordFor(dayKey, words) {
  const count = words.length
  const index = (((dayNumber(dayKey) - dayNumber(EPOCH)) % count) + count) % count
  return words[index]
}

export function answerFor(word, mode) {
  return mode === 'arabic' ? word.unvocalised : word.transliteration
}

export function lettersOf(text) {
  return Array.from(text)
}

export function isKey(letter, mode) {
  return KEYS[mode].includes(letter)
}

export function isComplete(guess, answer) {
  return lettersOf(guess).length === lettersOf(answer).length
}

// Each letter is 'right' (in place), 'present' (elsewhere in the word) or 'absent'. Places that
// match are marked first, so a repeated letter is only marked present while the word has a copy
// of it left over.
export function mark(guess, answer) {
  const guessed = lettersOf(guess)
  const target = lettersOf(answer)
  const marks = guessed.map((letter, index) => (letter === target[index] ? 'right' : 'absent'))
  const left = {}
  target.forEach((letter, index) => {
    if (marks[index] !== 'right') {
      left[letter] = (left[letter] ?? 0) + 1
    }
  })
  guessed.forEach((letter, index) => {
    if (marks[index] !== 'right' && left[letter]) {
      marks[index] = 'present'
      left[letter] -= 1
    }
  })
  return marks
}

export function isWon(guesses, answer) {
  return guesses.includes(answer)
}

export function isOver(guesses, answer) {
  return isWon(guesses, answer) || guesses.length >= TRIES
}

const RANK = { absent: 1, present: 2, right: 3 }

// The best mark each letter has had so far, for colouring the keyboard.
export function keyMarks(guesses, answer) {
  const best = {}
  for (const guess of guesses) {
    const marks = mark(guess, answer)
    lettersOf(guess).forEach((letter, index) => {
      if (!best[letter] || RANK[marks[index]] > RANK[best[letter]]) {
        best[letter] = marks[index]
      }
    })
  }
  return best
}

const SQUARES = { right: '🟩', present: '🟨', absent: '⬜' }

export function shareGrid(guesses, answer) {
  return guesses
    .map((guess) =>
      mark(guess, answer)
        .map((result) => SQUARES[result])
        .join(''),
    )
    .join('\n')
}

export const QUESTIONS_PER_ATTEMPT = 10

// A shuffled copy, drawing from `random` (a function returning numbers in [0, 1)).
export function shuffle(list, random = Math.random) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Ten question ids for a new attempt, taken from those not yet seen. When fewer than ten are
// unseen, it takes them all and fills from the rest of the bank, and the seen list starts again.
// Returns the questions and the seen list to keep.
export function drawQuestions(
  bankIds,
  seenIds,
  random = Math.random,
  count = QUESTIONS_PER_ATTEMPT,
) {
  const seen = new Set(seenIds.filter((id) => bankIds.includes(id)))
  const unseen = shuffle(
    bankIds.filter((id) => !seen.has(id)),
    random,
  )
  if (unseen.length >= count) {
    const questions = unseen.slice(0, count)
    return { questions, seen: [...seen, ...questions] }
  }

  const fill = shuffle(
    bankIds.filter((id) => !unseen.includes(id)),
    random,
  ).slice(0, count - unseen.length)
  const questions = [...unseen, ...fill]
  return { questions, seen: [...fill] }
}

// The four answers of a question in a random order, as indexes into its `answers`.
export function answerOrder(question, random = Math.random) {
  return shuffle(
    question.answers.map((_, index) => index),
    random,
  )
}

// How many of the given answers are right. `answers` holds the chosen index for each question,
// or null where none was chosen.
export function score(questions, answers) {
  return questions.filter((question, index) => answers[index] === question.right).length
}

// Ten questions of one level, keeping the questions seen at other levels in the seen list.
export function drawAtLevel(bank, level, seenIds, random = Math.random) {
  const levelIds = bank.filter((question) => question.level === level).map(({ id }) => id)
  const { questions, seen } = drawQuestions(levelIds, seenIds, random)
  return { questions, seen: [...seenIds.filter((id) => !levelIds.includes(id)), ...seen] }
}

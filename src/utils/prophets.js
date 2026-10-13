// The nearest prophets before and after `slug`, in list order, whose stories have been written.
export function storyNeighbours(slug, prophets) {
  const position = prophets.findIndex((prophet) => prophet.slug === slug)
  if (position < 0) {
    return { previous: null, next: null }
  }

  return {
    previous: prophets.slice(0, position).findLast((prophet) => prophet.story) ?? null,
    next: prophets.slice(position + 1).find((prophet) => prophet.story) ?? null,
  }
}

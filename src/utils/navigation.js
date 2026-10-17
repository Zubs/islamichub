// The four sections of the main navigation. The tool pages mirror the groups of the /tools page;
// src/utils/navigation.test.js fails if the two drift apart.
const SECTIONS = {
  pillars: ['/pillars', '/faith', '/prayer', '/zakat', '/fasting', '/hajj'],
  tools: ['/tools', '/tracker', '/adhkar', '/duas', '/tasbih', '/inheritance', '/qurbani'],
  hadith: ['/hadith'],
  prophets: ['/prophets'],
}

function within(path, root) {
  return path === root || path.startsWith(`${root}/`)
}

// The section a path (without its language prefix) belongs to, or null.
export function navSection(path) {
  const found = Object.entries(SECTIONS).find(([, roots]) =>
    roots.some((root) => within(path, root)),
  )
  return found ? found[0] : null
}

import { describe, it, expect } from 'vitest'
import { navSection } from './navigation.js'
import tools from '@/data/content/tools/en.js'
import pillars from '@/data/content/pillars/en.js'

describe('navSection', () => {
  it.each([
    ['/pillars', 'pillars'],
    ['/zakat', 'pillars'],
    ['/prayer', 'pillars'],
    ['/prayer/how-to-pray', 'pillars'],
    ['/prayer/adhan', 'pillars'],
    ['/faith/articles', 'pillars'],
    ['/tools', 'tools'],
    ['/adhkar/morning', 'tools'],
    ['/tracker', 'tools'],
    ['/qurbani', 'tools'],
    ['/hadith', 'hadith'],
    ['/hadith/books', 'hadith'],
    ['/hadith/books/sahih-bukhari/hadith/1', 'hadith'],
    ['/prophets', 'prophets'],
    ['/prophets/nuh', 'prophets'],
  ])('puts %s in %s', (path, section) => {
    expect(navSection(path)).toBe(section)
  })

  it.each(['/', '/about', '/changelog', '/eid', '/nowhere'])('puts %s in no section', (path) => {
    expect(navSection(path)).toBeNull()
  })

  it('does not match a path that only starts with the same letters', () => {
    expect(navSection('/prayerful')).toBeNull()
    expect(navSection('/hadithx')).toBeNull()
  })
})

describe('the Tools section and the /tools page', () => {
  const pillarPages = pillars.lists.pillars.map((pillar) => pillar.to)

  it('holds every page the /tools page links to, apart from pillar pages and the hadith library', () => {
    const linked = Object.values(tools.lists)
      .flat()
      .map((tool) => tool.to.split('#')[0])
      .filter((path) => !pillarPages.includes(path) && !path.startsWith('/hadith'))

    expect(linked.length).toBeGreaterThan(5)
    for (const path of linked) {
      expect(navSection(path), path).toBe('tools')
    }
  })
})

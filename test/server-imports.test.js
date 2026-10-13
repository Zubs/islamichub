import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const IMPORT =
  /(?:^|\n)\s*(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]|(?:^|\n)\s*import\s+['"]([^'"]+)['"]/g

function filesIn(folder) {
  return readdirSync(folder).flatMap((name) => {
    const path = resolve(folder, name)
    return statSync(path).isDirectory() ? filesIn(path) : path.endsWith('.js') ? [path] : []
  })
}

// Every import a file reaches, followed through relative paths: [{ from, specifier }]
function reachedFrom(file, seen = new Set()) {
  if (seen.has(file)) {
    return []
  }

  seen.add(file)
  const source = readFileSync(file, 'utf8')
  return [...source.matchAll(IMPORT)].flatMap((match) => {
    const specifier = match[1] ?? match[2]
    const here = [{ from: file.slice(ROOT.length + 1), specifier }]
    return specifier.startsWith('.')
      ? [...here, ...reachedFrom(resolve(dirname(file), specifier), seen)]
      : here
  })
}

// Netlify bundles its functions without Vite, so nothing they reach may use the `@` alias or
// Vite's `import.meta.env`.
describe.each(filesIn(resolve(ROOT, 'netlify')).map((file) => [file.slice(ROOT.length + 1), file]))(
  '%s',
  (name, file) => {
    it('reaches no file through the @ alias', () => {
      const aliased = reachedFrom(file).filter(({ specifier }) => specifier.startsWith('@/'))

      expect(aliased).toEqual([])
    })

    it('reaches no file that reads Vite’s environment', () => {
      const seen = new Set()
      reachedFrom(file, seen)
      const reading = [...seen].filter((path) =>
        readFileSync(path, 'utf8').includes('import.meta.env'),
      )

      expect(reading).toEqual([])
    })
  },
)

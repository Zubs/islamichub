import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const DOCS = ['README.md', 'CONTRIBUTING.md']
const CHECKED_FOLDERS = ['src/', 'public/', 'test/', 'openspec/']
const OLD_APP_MARKERS = [
  /hash router/i,
  /hash-based/i,
  /no build step/i,
  /(^|[\s`(/])js\//m,
  /(^|[\s`(/])pages\//m,
  /pillarsofislam/i,
  /your-username/i,
]

const scripts = Object.keys(JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).scripts)

function read(doc) {
  return readFileSync(resolve(ROOT, doc), 'utf8')
}

function withoutCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, '')
}

function npmScriptsIn(text) {
  const named = [...text.matchAll(/npm run ([\w:-]+)/g)].map((match) => match[1])
  return /npm test\b/.test(text) ? [...named, 'test'] : named
}

function relativeLinksIn(text) {
  return [...withoutCodeBlocks(text).matchAll(/\]\(([^)\s]+)\)/g)]
    .map((match) => match[1])
    .filter((target) => !/^(https?:|mailto:|#)/.test(target))
    .map((target) => target.split('#')[0])
}

function inlinePathsIn(text) {
  return [...withoutCodeBlocks(text).matchAll(/`([^`\s]+)`/g)]
    .map((match) => match[1])
    .filter((value) => !/[*<>{}$=]/.test(value))
    .filter(
      (value) =>
        CHECKED_FOLDERS.some((folder) => value.startsWith(folder)) ||
        /^\.?[\w-]+(\.[\w-]+)*\.(md|js|json|toml|html|example)$/.test(value),
    )
}

function missing(paths) {
  return paths.filter((path) => !existsSync(resolve(ROOT, path)))
}

describe.each(DOCS)('%s', (doc) => {
  const text = read(doc)

  it('names only npm scripts that exist', () => {
    expect(npmScriptsIn(text).filter((name) => !scripts.includes(name))).toEqual([])
  })

  it('links only to files that exist', () => {
    expect(missing(relativeLinksIn(text))).toEqual([])
  })

  it('names only files and folders that exist', () => {
    expect(missing(inlinePathsIn(text))).toEqual([])
  })

  it('links to the spec and the feature list', () => {
    expect(relativeLinksIn(text)).toEqual(expect.arrayContaining(['Spec.md', 'Features.md']))
  })

  it('does not describe the old app', () => {
    expect(OLD_APP_MARKERS.filter((marker) => marker.test(text)).map(String)).toEqual([])
  })
})

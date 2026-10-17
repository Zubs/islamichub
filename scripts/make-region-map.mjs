// Draws src/data/regionMap.js, the land the journey map shows, from Natural Earth's 1:50m land
// (public domain, naturalearthdata.com). Run it again after changing MAP_BOUNDS in
// src/utils/journey.js:  node scripts/make-region-map.mjs
// It needs the network the first time and keeps the download in .cache/sources.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { MAP_BOUNDS, project } from '../src/utils/journey.js'

const ROOT = resolve(import.meta.dirname, '..')
const CACHE = resolve(ROOT, '.cache/sources')
const SOURCE =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson'
// Points closer than this to the simplified line are dropped, in map units (a tenth of a degree).
const TOLERANCE = 0.8
// Islands smaller than this, in square map units, are left out.
const SMALLEST_AREA = 4

async function landRings() {
  const file = resolve(CACHE, 'ne_50m_land.geojson')
  if (!existsSync(file)) {
    await mkdir(CACHE, { recursive: true })
    const response = await fetch(SOURCE)
    if (!response.ok) {
      throw new Error(`${SOURCE} answered ${response.status}`)
    }
    await writeFile(file, await response.text())
  }

  const { features } = JSON.parse(await readFile(file, 'utf8'))
  return features.flatMap(({ geometry }) =>
    geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat(),
  )
}

// Sutherland–Hodgman: the part of a ring inside the map's rectangle, in degrees.
function clip(ring) {
  const edges = [
    [(p) => p[0] >= MAP_BOUNDS.west, (a, b) => crossAtLon(a, b, MAP_BOUNDS.west)],
    [(p) => p[0] <= MAP_BOUNDS.east, (a, b) => crossAtLon(a, b, MAP_BOUNDS.east)],
    [(p) => p[1] >= MAP_BOUNDS.south, (a, b) => crossAtLat(a, b, MAP_BOUNDS.south)],
    [(p) => p[1] <= MAP_BOUNDS.north, (a, b) => crossAtLat(a, b, MAP_BOUNDS.north)],
  ]
  let points = ring
  for (const [inside, cross] of edges) {
    const kept = []
    points.forEach((current, index) => {
      const previous = points[(index + points.length - 1) % points.length]
      if (inside(current)) {
        if (!inside(previous)) {
          kept.push(cross(previous, current))
        }
        kept.push(current)
      } else if (inside(previous)) {
        kept.push(cross(previous, current))
      }
    })
    points = kept
    if (points.length === 0) {
      break
    }
  }
  return points
}

function crossAtLon([x1, y1], [x2, y2], lon) {
  return [lon, y1 + ((y2 - y1) * (lon - x1)) / (x2 - x1)]
}

function crossAtLat([x1, y1], [x2, y2], lat) {
  return [x1 + ((x2 - x1) * (lat - y1)) / (y2 - y1), lat]
}

// Douglas–Peucker simplification of an open line of {x, y} points.
function simplify(points) {
  if (points.length < 3) {
    return points
  }
  const first = points[0]
  const last = points.at(-1)
  let furthest = 0
  let index = 0
  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = distanceToLine(points[i], first, last)
    if (distance > furthest) {
      furthest = distance
      index = i
    }
  }
  if (furthest <= TOLERANCE) {
    return [first, last]
  }
  return [...simplify(points.slice(0, index + 1)).slice(0, -1), ...simplify(points.slice(index))]
}

function distanceToLine(p, a, b) {
  const length = Math.hypot(b.x - a.x, b.y - a.y)
  if (length === 0) {
    return Math.hypot(p.x - a.x, p.y - a.y)
  }
  return Math.abs((b.x - a.x) * (a.y - p.y) - (a.x - p.x) * (b.y - a.y)) / length
}

function area(points) {
  let sum = 0
  points.forEach((p, i) => {
    const q = points[(i + 1) % points.length]
    sum += p.x * q.y - q.x * p.y
  })
  return Math.abs(sum) / 2
}

function pathOf(points) {
  return `M${points.map(({ x, y }) => `${x} ${y}`).join('L')}Z`
}

const rings = (await landRings())
  .map(clip)
  .filter((ring) => ring.length >= 3)
  .map((ring) => ring.map(([lon, lat]) => project({ lat, lon })))
  .map((ring) => simplify([...ring, ring[0]]).slice(0, -1))
  .filter((ring) => ring.length >= 3 && area(ring) >= SMALLEST_AREA)

const bounds = `${MAP_BOUNDS.west}°–${MAP_BOUNDS.east}° E, ${MAP_BOUNDS.south}°–${MAP_BOUNDS.north}° N`
await writeFile(
  resolve(ROOT, 'src/data/regionMap.js'),
  `// The land of the journey map (${bounds}) as one SVG path, drawn in the coordinates of
// utils/journey.js. Made from Natural Earth (public domain, naturalearthdata.com) by
// scripts/make-region-map.mjs; run that script again rather than editing this file.
export const REGION_LAND =
  '${rings.map(pathOf).join('')}'
`,
)
console.log(`Wrote ${rings.length} shapes for ${bounds}`)

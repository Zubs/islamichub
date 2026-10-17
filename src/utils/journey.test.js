import { describe, it, expect } from 'vitest'
import {
  MAP_BOUNDS,
  MAP_WIDTH,
  MAP_HEIGHT,
  MARKER_REACH,
  project,
  routePath,
  viewFor,
} from './journey.js'
import { PROPHET_STORIES } from '@/data/prophetStories.js'
import { REGION_LAND } from '@/data/regionMap.js'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const PHONE_MAP_WIDTH = 360 - 2 * 16

describe('project', () => {
  it('puts the corners of the region at the corners of the map', () => {
    expect(project({ lat: MAP_BOUNDS.north, lon: MAP_BOUNDS.west })).toEqual({ x: 0, y: 0 })
    expect(project({ lat: MAP_BOUNDS.south, lon: MAP_BOUNDS.east })).toEqual({
      x: MAP_WIDTH,
      y: MAP_HEIGHT,
    })
  })

  it('puts north above south and east after west', () => {
    const makkah = project({ lat: 21.42, lon: 39.83 })
    const harran = project({ lat: 36.86, lon: 39.03 })
    const ur = project({ lat: 30.96, lon: 46.1 })

    expect(harran.y).toBeLessThan(makkah.y)
    expect(ur.x).toBeGreaterThan(harran.x)
  })
})

describe('routePath', () => {
  it('is empty with no stop or one stop', () => {
    expect(routePath([])).toBe('')
    expect(routePath([{ lat: 30, lon: 40 }])).toBe('')
  })

  it('joins the stops in order', () => {
    expect(
      routePath([
        { lat: 40, lon: 26 },
        { lat: 30, lon: 26 },
        { lat: MAP_BOUNDS.south, lon: MAP_BOUNDS.east },
      ]),
    ).toBe(`M0 0L0 100L${MAP_WIDTH} ${MAP_HEIGHT}`)
  })
})

describe('viewFor', () => {
  it('shows the whole map when there are no places', () => {
    expect(viewFor([])).toEqual({ x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT, scale: 1 })
  })

  it('zooms to close places, never narrower than its smallest view, in the map’s proportions', () => {
    const view = viewFor([
      { lat: 28.5, lon: 34 },
      { lat: 28.5, lon: 35 },
    ])

    expect(view.width).toBeGreaterThanOrEqual(56)
    expect(view.width).toBeLessThan(MAP_WIDTH / 2)
    expect(view.width / view.height).toBeCloseTo(MAP_WIDTH / MAP_HEIGHT, 1)
  })

  it('shows a single place with more of the region around it than two close places', () => {
    const single = viewFor([{ lat: 20, lon: 40 }])
    const pair = viewFor([
      { lat: 20, lon: 40 },
      { lat: 20.5, lon: 40.5 },
    ])

    expect(single.width).toBeGreaterThan(pair.width * 2)
  })

  it('keeps the view inside the map at its edges', () => {
    const view = viewFor([{ lat: MAP_BOUNDS.south + 0.5, lon: MAP_BOUNDS.east - 0.5 }])

    expect(view.x + view.width).toBeLessThanOrEqual(MAP_WIDTH + 0.1)
    expect(view.y + view.height).toBeLessThanOrEqual(MAP_HEIGHT + 0.1)
  })
})

describe('the land outline', () => {
  it('is drawn inside the map', () => {
    const numbers = REGION_LAND.match(/-?\d+(\.\d+)?/g).map(Number)
    const xs = numbers.filter((_, index) => index % 2 === 0)
    const ys = numbers.filter((_, index) => index % 2 === 1)

    expect(Math.min(...xs)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...xs)).toBeLessThanOrEqual(MAP_WIDTH)
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(0)
    expect(Math.max(...ys)).toBeLessThanOrEqual(MAP_HEIGHT)
  })
})

describe.each(Object.entries(PROPHET_STORIES).filter(([, story]) => story.places))(
  'the places of %s',
  (slug, { places, content }) => {
    const located = places.filter((place) => place.lat !== undefined)

    it('has every located place inside the map', () => {
      for (const stop of located) {
        const { x, y } = project(stop)
        expect(x, stop.id).toBeGreaterThan(MARKER_REACH / 2)
        expect(x, stop.id).toBeLessThan(MAP_WIDTH - MARKER_REACH / 2)
        expect(y, stop.id).toBeGreaterThan(MARKER_REACH / 2)
        expect(y, stop.id).toBeLessThan(MAP_HEIGHT - MARKER_REACH / 2)
      }
    })

    it('gives every place a kind, a reference, how it is known, and its words', () => {
      for (const stop of places) {
        expect(['born', 'lived', 'sent', 'travelled', 'died']).toContain(stop.kind)
        expect(stop.reference).toMatch(
          /Qur'an \d+:\d+|(Sahih Bukhari|Sahih Muslim|Abu Dawud|Al-Tirmidhi|Ibn Majah) \d+/,
        )
        expect(['scripture', 'historians']).toContain(stop.known)
        expect(content.places[`${stop.id}Name`]).toBeTruthy()
        expect(content.places[`${stop.id}Text`]).toBeTruthy()
      }
    })

    it('lists every place identified by historians in Final for the reviewer', () => {
      const features = readFileSync(resolve(process.cwd(), 'Features.md'), 'utf8')
      const final = features.slice(
        features.indexOf('### 35. Final'),
        features.indexOf('## Decisions needed'),
      )
      const rows = final.split('\n').filter((row) => row.includes(`data/${slug}Places.js`))

      for (const stop of places.filter((entry) => entry.known === 'historians')) {
        const name = content.places[`${stop.id}Name`]
        expect(
          rows.some((row) => row.includes(name)),
          `${slug}: ${name}`,
        ).toBe(true)
      }
    })

    it('says in the words of a stop identified by historians that it is their identification', () => {
      for (const stop of places.filter((entry) => entry.known === 'historians')) {
        expect(content.places[`${stop.id}Text`]).toMatch(/historians/)
      }
    })

    it('keeps every two stops far enough apart to be touched separately at 360px wide', () => {
      const points = located.map(project)
      const view = viewFor(located)
      const pixelsPerUnit = PHONE_MAP_WIDTH / view.width
      const reach = MARKER_REACH * view.scale

      expect(2 * reach * pixelsPerUnit).toBeGreaterThanOrEqual(44)
      for (let a = 0; a < points.length; a += 1) {
        for (let b = a + 1; b < points.length; b += 1) {
          const apart = Math.hypot(points[a].x - points[b].x, points[a].y - points[b].y)
          expect(apart, `${located[a].id} and ${located[b].id}`).toBeGreaterThan(2 * reach)
        }
      }
    })
  },
)

import { describe, it, expect } from 'vitest'
import { MAP_BOUNDS, MAP_WIDTH, MAP_HEIGHT, MARKER_REACH, project, routePath } from './journey.js'
import { PROPHET_STORIES } from '@/data/prophetStories.js'
import { REGION_LAND } from '@/data/regionMap.js'

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
        { lat: 16, lon: 50 },
      ]),
    ).toBe(`M0 0L0 100L${MAP_WIDTH} ${MAP_HEIGHT}`)
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

describe.each(Object.entries(PROPHET_STORIES).filter(([, story]) => story.journey))(
  'the journey of %s',
  (slug, { journey, content }) => {
    it('has every stop inside the map, with a reference, how it is known, and its words', () => {
      for (const stop of journey) {
        const { x, y } = project(stop)
        expect(x).toBeGreaterThan(MARKER_REACH / 2)
        expect(x).toBeLessThan(MAP_WIDTH - MARKER_REACH / 2)
        expect(y).toBeGreaterThan(MARKER_REACH / 2)
        expect(y).toBeLessThan(MAP_HEIGHT - MARKER_REACH / 2)
        expect(stop.reference).toMatch(/Qur'an \d+:\d+|Sahih Bukhari \d+/)
        expect(['scripture', 'historians']).toContain(stop.known)
        expect(content.journey[`${stop.id}Name`]).toBeTruthy()
        expect(content.journey[`${stop.id}Text`]).toBeTruthy()
      }
    })

    it('says in the words of a stop identified by historians that it is their identification', () => {
      for (const stop of journey.filter((entry) => entry.known === 'historians')) {
        expect(content.journey[`${stop.id}Text`]).toMatch(/historians/)
      }
    })

    it('keeps every two stops far enough apart to be touched separately at 360px wide', () => {
      const points = journey.map(project)
      const pixelsPerUnit = PHONE_MAP_WIDTH / MAP_WIDTH

      expect(2 * MARKER_REACH * pixelsPerUnit).toBeGreaterThanOrEqual(44)
      for (let a = 0; a < points.length; a += 1) {
        for (let b = a + 1; b < points.length; b += 1) {
          const apart = Math.hypot(points[a].x - points[b].x, points[a].y - points[b].y)
          expect(apart, `${journey[a].id} and ${journey[b].id}`).toBeGreaterThan(2 * MARKER_REACH)
        }
      }
    })
  },
)

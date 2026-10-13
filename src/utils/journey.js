// The region the journey map shows, in degrees, and how it is drawn: an equirectangular
// projection with longitude narrowed for 30° north. data/regionMap.js is drawn in the same units.
export const MAP_BOUNDS = { west: 26, east: 50, north: 40, south: 16 }
const SCALE = 10
const SCALE_X = SCALE * Math.cos((30 * Math.PI) / 180)

function rounded(value) {
  return Math.round(value * 10) / 10
}

export const MAP_WIDTH = rounded((MAP_BOUNDS.east - MAP_BOUNDS.west) * SCALE_X)
export const MAP_HEIGHT = (MAP_BOUNDS.north - MAP_BOUNDS.south) * SCALE

// Half the size of a marker's touch target, in map units.
export const MARKER_REACH = 14

export function project({ lat, lon }) {
  return {
    x: rounded((lon - MAP_BOUNDS.west) * SCALE_X),
    y: rounded((MAP_BOUNDS.north - lat) * SCALE),
  }
}

// The line joining the stops in order, as an SVG path; empty when there is nothing to join.
export function routePath(stops) {
  if (stops.length < 2) {
    return ''
  }

  return stops
    .map(project)
    .map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`)
    .join('')
}

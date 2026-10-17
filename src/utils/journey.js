// The region the journey map shows, in degrees, and how it is drawn: an equirectangular
// projection with longitude narrowed for 30° north. data/regionMap.js is drawn in the same units.
export const MAP_BOUNDS = { west: 26, east: 52, north: 40, south: 12 }
const SCALE = 10
const SCALE_X = SCALE * Math.cos((30 * Math.PI) / 180)

function rounded(value) {
  return Math.round(value * 10) / 10
}

export const MAP_WIDTH = rounded((MAP_BOUNDS.east - MAP_BOUNDS.west) * SCALE_X)
export const MAP_HEIGHT = (MAP_BOUNDS.north - MAP_BOUNDS.south) * SCALE

// Half the size of a marker's touch target, in map units.
export const MARKER_REACH = 16

export function project({ lat, lon }) {
  return {
    x: rounded((lon - MAP_BOUNDS.west) * SCALE_X),
    y: rounded((MAP_BOUNDS.north - lat) * SCALE),
  }
}

// The smallest part of the map a prophet's places are shown in (about 6.5° across), the wider part
// a single place is shown in so the region around it can be recognised (about 14°), and the margin
// kept around them, in map units.
const MIN_VIEW = 56
const SINGLE_PLACE_VIEW = 120
const VIEW_MARGIN = 12

function clamp(value, low, high) {
  return Math.min(Math.max(value, low), high)
}

// The part of the map that holds the given places with a margin, in the map's proportions, as
// { x, y, width, height, scale }. `scale` is its width against the whole map's; markers are drawn
// at that scale so that they keep their size on screen however far the map is zoomed.
export function viewFor(stops) {
  const points = stops.map(project)
  if (points.length === 0) {
    return { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT, scale: 1 }
  }

  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const aspect = MAP_WIDTH / MAP_HEIGHT
  const smallest = points.length === 1 ? SINGLE_PLACE_VIEW : MIN_VIEW
  let width = Math.max(Math.max(...xs) - Math.min(...xs) + 2 * VIEW_MARGIN, smallest)
  let height = Math.max(Math.max(...ys) - Math.min(...ys) + 2 * VIEW_MARGIN, smallest)
  if (width / height > aspect) {
    height = width / aspect
  } else {
    width = height * aspect
  }
  width = Math.min(width, MAP_WIDTH)
  height = Math.min(height, MAP_HEIGHT)

  const centreX = (Math.min(...xs) + Math.max(...xs)) / 2
  const centreY = (Math.min(...ys) + Math.max(...ys)) / 2
  return {
    x: rounded(clamp(centreX - width / 2, 0, MAP_WIDTH - width)),
    y: rounded(clamp(centreY - height / 2, 0, MAP_HEIGHT - height)),
    width: rounded(width),
    height: rounded(height),
    scale: width / MAP_WIDTH,
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

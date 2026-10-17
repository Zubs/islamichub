import { describe, it, expect, vi, afterEach } from 'vitest'
import JourneyMap from './JourneyMap.vue'
import ProphetView from '@/views/prophets/ProphetView.vue'
import journey from '@/data/ibrahimPlaces.js'
import content from '@/data/content/ibrahim/en.js'
import { project, routePath, viewFor } from '@/utils/journey.js'
import { mountPage } from '../../test/mountPage.js'

const STOPS = [
  {
    id: 'one',
    lat: 30,
    lon: 40,
    known: 'historians',
    reference: "Qur'an 21:71",
    name: 'First',
    text: 'What happened first (Sahih Bukhari 2217).',
  },
  {
    id: 'two',
    lat: 22,
    lon: 39,
    known: 'scripture',
    reference: "Qur'an 14:37",
    name: 'Second',
    text: 'What happened next.',
  },
]

async function mountMap(stops, joined = false) {
  return mountPage(JourneyMap, {
    path: '/',
    props: { stops, joined, title: 'The journey', intro: 'Intro.' },
  })
}

async function openIbrahim() {
  return mountPage(ProphetView, { path: '/prophets/ibrahim' })
}

describe('JourneyMap', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows nothing at all with no stops', async () => {
    const { wrapper } = await mountMap([])

    expect(wrapper.find('.journey').exists()).toBe(false)
    expect(wrapper.html()).not.toContain('svg')
  })

  it('shows one marker and no line for a single stop', async () => {
    const { wrapper } = await mountMap([STOPS[0]])

    expect(wrapper.findAll('.journey-marker')).toHaveLength(1)
    expect(wrapper.find('.journey-route').exists()).toBe(false)
    expect(wrapper.findAll('.journey-stop')).toHaveLength(1)
  })

  it('labels how each place is known and gives every stop its reference', async () => {
    const { wrapper } = await mountMap(STOPS)
    const stops = wrapper.findAll('.journey-stop')

    expect(stops[0].find('.badge').text()).toBe('Place identified by historians')
    expect(stops[1].find('.badge').text()).toBe("Named in the Qur'an or hadith")
    expect(stops[0].find('.journey-ref').text()).toBe("Qur'an 21:71")
    expect(stops[0].find('.journey-text a.hadith-ref').attributes('href')).toBe(
      '/hadith/books/sahih-bukhari/hadith/2217',
    )
  })

  it('highlights a stop on the map when it is chosen in the list, and the other way round', async () => {
    const { wrapper } = await mountMap(STOPS)
    const markers = wrapper.findAll('.journey-marker')
    const stops = wrapper.findAll('.journey-stop')

    expect(wrapper.find('.selected').exists()).toBe(false)

    await stops[1].find('button').trigger('click')
    expect(markers[1].classes()).toContain('selected')
    expect(markers[1].attributes('aria-pressed')).toBe('true')
    expect(markers[0].classes()).not.toContain('selected')

    await markers[0].trigger('click')
    expect(stops[0].classes()).toContain('selected')
    expect(stops[0].find('button').attributes('aria-pressed')).toBe('true')
    expect(stops[1].classes()).not.toContain('selected')
  })

  it('can be used with the keyboard and read by a screen reader', async () => {
    const { wrapper } = await mountMap(STOPS)
    const markers = wrapper.findAll('.journey-marker')

    expect(wrapper.find('svg').attributes('aria-label')).toBe('Map of 2 places')
    for (const [index, marker] of markers.entries()) {
      expect(marker.attributes('role')).toBe('button')
      expect(marker.attributes('tabindex')).toBe('0')
      expect(marker.attributes('aria-label')).toBe(`Place ${index + 1}: ${STOPS[index].name}`)
    }

    await markers[1].trigger('keydown', { key: 'Enter' })
    expect(wrapper.findAll('.journey-stop')[1].classes()).toContain('selected')
    await markers[0].trigger('keydown', { key: ' ' })
    expect(wrapper.findAll('.journey-stop')[0].classes()).toContain('selected')

    expect(wrapper.find('section').attributes('aria-labelledby')).toBe('journey-title')
    expect(wrapper.find('ol.journey-stops').exists()).toBe(true)
    expect(
      wrapper.findAll('.journey-stop button').every((button) => button.element.type === 'button'),
    ).toBe(true)
  })
})

describe('JourneyMap with places that are not a journey', () => {
  const places = [
    {
      id: 'a',
      lat: 31.5,
      lon: 35.1,
      known: 'scripture',
      reference: "Qur'an 21:71",
      name: 'A',
      text: 'One.',
    },
    {
      id: 'b',
      lat: 29.8,
      lon: 31.2,
      known: 'historians',
      reference: "Qur'an 28:7",
      name: 'B',
      text: 'Two.',
    },
    { id: 'c', known: 'historians', reference: "Qur'an 38:48", name: 'C', text: 'Three.' },
  ]

  it('marks several places with no line joining them', async () => {
    const { wrapper } = await mountMap(places.slice(0, 2))

    expect(wrapper.findAll('.journey-marker')).toHaveLength(2)
    expect(wrapper.find('.journey-route').exists()).toBe(false)
  })

  it('joins them when they are a journey', async () => {
    const { wrapper } = await mountMap(places.slice(0, 2), true)

    expect(wrapper.find('.journey-route').attributes('d')).toBe(routePath(places.slice(0, 2)))
  })

  it('lists a place with no coordinates without drawing it, keeping the numbers matched', async () => {
    const { wrapper } = await mountMap([places[2], ...places.slice(0, 2)])

    expect(wrapper.findAll('.journey-stop')).toHaveLength(3)
    expect(wrapper.findAll('.journey-marker')).toHaveLength(2)
    expect(wrapper.findAll('.journey-dot-number').map((number) => number.text())).toEqual([
      '2',
      '3',
    ])
    expect(wrapper.find('svg').attributes('aria-label')).toBe('Map of 2 places')
  })

  it('shows no map when no place has coordinates, but still lists the places', async () => {
    const { wrapper } = await mountMap([places[2]])

    expect(wrapper.find('svg').exists()).toBe(false)
    expect(wrapper.findAll('.journey-stop')).toHaveLength(1)
  })
})

describe('the journey of Ibrahim on his page', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows its stops in order, joined by a line', async () => {
    const { wrapper } = await openIbrahim()
    const names = wrapper.findAll('.journey-stop-name').map((name) => name.text())

    expect(names).toEqual(['1 Ur', '2 Harran', '3 Canaan', '4 Egypt', '5 Makkah'])
    expect(wrapper.find('.journey-route').attributes('d')).toBe(routePath(journey))
    expect(
      wrapper.findAll('.journey-marker').map((marker) => marker.attributes('transform')),
    ).toEqual(
      journey.map(
        (stop) =>
          `translate(${project(stop).x} ${project(stop).y}) scale(${viewFor(journey).scale})`,
      ),
    )
  })

  it('lets a reader step through the stops and read what happened at each', async () => {
    const { wrapper } = await openIbrahim()
    const stops = wrapper.findAll('.journey-stop')

    for (const [index, stop] of stops.entries()) {
      await stop.find('button').trigger('click')
      expect(wrapper.findAll('.journey-marker')[index].classes()).toContain('selected')
      expect(wrapper.findAll('.journey-marker.selected')).toHaveLength(1)
      expect(stop.find('.journey-text').text()).toBe(content.places[`${journey[index].id}Text`])
      expect(stop.find('.journey-ref').text()).toBe(journey[index].reference)
    }
  })

  it('marks the four places identified by historians and the one the Qur’an names', async () => {
    const { wrapper } = await openIbrahim()
    const badges = wrapper
      .findAll('.journey-stop .badge-green, .journey-stop .badge-gold')
      .map((badge) => badge.text())

    expect(badges).toEqual([
      'Place identified by historians',
      'Place identified by historians',
      'Place identified by historians',
      'Place identified by historians',
      "Named in the Qur'an or hadith",
    ])
  })

  it('says what each place was in his life', async () => {
    const { wrapper } = await openIbrahim()
    const kinds = wrapper
      .findAll('.journey-stop .badge:not(.badge-green):not(.badge-gold)')
      .map((badge) => badge.text())

    expect(kinds).toEqual([
      'Lived here',
      'Journeyed here',
      'Lived here',
      'Journeyed here',
      'Journeyed here',
    ])
  })

  it('draws the map inside the page and asks no outside service for anything', async () => {
    const fetched = vi.fn(async () => {
      throw new TypeError('offline')
    })
    vi.stubGlobal('fetch', fetched)
    const { wrapper } = await openIbrahim()
    const map = wrapper.find('.journey')

    expect(map.find('svg .journey-land').attributes('d').length).toBeGreaterThan(1000)
    expect(fetched).not.toHaveBeenCalled()
    expect(map.html()).not.toMatch(/<img|<image|<iframe|url\(|https?:\/\//)
  })
})

import process from 'node:process'

const UPSTREAM = 'https://hadithapi.com/api'
const UPSTREAM_TIME_LIMIT_MS = 9000
const DAY_SECONDS = 86400
const MAX_PAGE_SIZE = 100

const SLUG = /^[a-z0-9-]{1,60}$/
const NUMBER = /^\d{1,7}$/

const PARAMETERS = {
  book: SLUG,
  chapter: NUMBER,
  hadithNumber: NUMBER,
  page: NUMBER,
  paginate: NUMBER,
}

function reply(status, body, cacheable = false) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(cacheable
        ? {
            'Cache-Control': `public, max-age=${DAY_SECONDS}`,
            'Netlify-CDN-Cache-Control': `public, durable, max-age=${DAY_SECONDS}`,
          }
        : { 'Cache-Control': 'no-store' }),
    },
  })
}

function upstreamPath(pathname) {
  const route = pathname.split('/hadith/')[1]?.replace(/\/+$/, '') ?? ''
  if (route === 'books' || route === 'hadiths') {
    return { path: `/${route}`, allowed: route === 'hadiths' ? Object.keys(PARAMETERS) : [] }
  }

  const [slug, tail, ...rest] = route.split('/')
  if (tail === 'chapters' && rest.length === 0 && SLUG.test(slug)) {
    return { path: `/${slug}/chapters`, allowed: [] }
  }

  return null
}

export async function handleHadithRequest(request, { key, fetch: send = fetch } = {}) {
  if (request.method !== 'GET') {
    return reply(405, { error: 'method_not_allowed' })
  }

  const address = new URL(request.url)
  const route = upstreamPath(address.pathname)
  if (!route) {
    return reply(404, { error: 'not_found' })
  }

  const target = new URL(UPSTREAM + route.path)
  for (const [name, value] of address.searchParams) {
    const valid =
      route.allowed.includes(name) && PARAMETERS[name].test(value) && !target.searchParams.has(name)
    if (!valid || (name === 'paginate' && Number(value) > MAX_PAGE_SIZE)) {
      return reply(400, { error: 'bad_request' })
    }

    target.searchParams.set(name, value)
  }

  if (!key) {
    return reply(503, { error: 'not_configured' })
  }

  target.searchParams.set('apiKey', key)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIME_LIMIT_MS)
  try {
    const upstream = await send(target, { signal: controller.signal })
    if (!upstream.ok) {
      return reply(502, { error: 'upstream_error', status: upstream.status })
    }

    return reply(200, await upstream.json(), true)
  } catch {
    const timedOut = controller.signal.aborted
    return reply(timedOut ? 504 : 502, { error: timedOut ? 'upstream_timeout' : 'upstream_error' })
  } finally {
    clearTimeout(timer)
  }
}

export default (request) => handleHadithRequest(request, { key: process.env.HADITH_API_KEY })

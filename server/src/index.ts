declare const CLIENT_ORIGIN_URL: string

import api from './routes/api'

const corsHeaders: { [key: string]: string } = {
  'Access-Control-Allow-Origin': CLIENT_ORIGIN_URL,
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

async function handleRequest(
  route: (request: Request) => any,
  request: Request,
): Promise<Response> {
  let response

  try {
    return await route(request)
  } catch (err: any) {
    response = new Response(err.message, {
      ...(response || {}),
      status: 500,
    })

    response.headers.set('X-Debug-err', err)
    for (const header in corsHeaders) {
      response.headers.set(header, corsHeaders[header])
    }
  }

  return response
}

addEventListener('fetch', (event) => {
  // Have any uncaught errors thrown go directly to origin
  event.passThroughOnException()

  const url = new URL(event.request.url)

  if (url.pathname.startsWith('/api')) {
    return event.respondWith(handleRequest(api, event.request))
  }

  event.respondWith(
    new Response('Not found', {
      status: 404,
    }),
  )
})

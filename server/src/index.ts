import { handleRequest } from './handler'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api')) {
    return event.respondWith(handleRequest(event.request))
  }

  event.respondWith(
    new Response('Not found', {
      status: 404,
    }),
  )
})

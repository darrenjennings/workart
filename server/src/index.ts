import { handleRequest } from './handler'

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

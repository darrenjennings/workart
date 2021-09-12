import { NOTFOUND } from 'dns'

declare const CLIENT_ORIGIN_URL: string
declare const MY_KV: KVNamespace

export default async (request: Request): Promise<Response> => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': CLIENT_ORIGIN_URL,
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
  }

  if (request.method === 'OPTIONS')
    return new Response('', {
      headers: corsHeaders,
    })
  if (request.method === 'GET') {
    const artBoard: string | null = await MY_KV.get(
      new Date().toISOString().split('T')[0],
    )

    if (!artBoard) {
      return new Response(
        JSON.stringify({
          message: 'Not Found',
        }),
        {
          status: 404,
          headers: corsHeaders,
        },
      )
    }

    return new Response(JSON.stringify(JSON.parse(artBoard || '')), {
      headers: {
        ...corsHeaders,
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } else if (request.method === 'POST') {
    const body = await request.json()
    await MY_KV.put(
      new Date().toISOString().split('T')[0],
      JSON.stringify(body),
    )

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      {
        headers: {
          ...corsHeaders,
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )
  }

  return new Response('uh')
}

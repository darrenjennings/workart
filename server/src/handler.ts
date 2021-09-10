declare const MY_KV: KVNamespace

export async function handleRequest(request: Request): Promise<Response> {
  if (request.method === 'GET') {
    const artBoard: string | null = await MY_KV.get(
      new Date().toISOString().split('T')[0],
    )
    return new Response(JSON.stringify(JSON.parse(artBoard || '')), {
      headers: {
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
        color: Math.random() > 0.5 ? 'blue' : 'green',
      }),
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      },
    )
  }

  return new Response('uh')
}

import { NOTFOUND } from 'dns'
import { stringify } from 'querystring'
import { ArtBoard, updateArtBoard } from '../Artboard'

declare const CLIENT_ORIGIN_URL: string
declare const MY_KV: KVNamespace

export default async (request: Request): Promise<Response> => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': CLIENT_ORIGIN_URL,
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
  }

  switch (request.method) {
    case 'OPTIONS':
      return new Response('', {
        headers: corsHeaders,
      })
    case 'GET': {
      const today = new Date().toISOString().split('T')[0]

      // get the specified date in the url e.g. `/api/20210911` or select today
      const dt = request.url.match(/[0-9-]{10}/)
        ? request.url.match(/[0-9-]{10}/)?.[0] || today
        : today

      const artBoard: string | null = await MY_KV.get(dt)

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
    }
    case 'POST': {
      const dt = new Date().toISOString().split('T')[0]
      const { x, y, color } = await request.json()

      const artBoard: string | null = await MY_KV.get(dt)
      const resArtBoard: ArtBoard = updateArtBoard(
        artBoard ? JSON.parse(artBoard) : {},
        x,
        y,
        color,
      )

      await MY_KV.put(dt, JSON.stringify(resArtBoard))

      return new Response(
        JSON.stringify({
          grid: resArtBoard.grid,
        }),
        {
          headers: {
            ...corsHeaders,
            'content-type': 'application/json;charset=UTF-8',
          },
        },
      )
    }
    default: {
      return new Response('Method not allowed', {
        status: 405,
      })
    }
  }
}

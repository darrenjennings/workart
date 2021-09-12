export interface ArtBoard {
  grid: { [i: number]: { [j: number]: { color: string } } } | undefined
  timestamp: number
}

export function updateArtBoard(
  board: ArtBoard,
  x: number,
  y: number,
  color: string,
): ArtBoard {
  const res: ArtBoard = {
    grid: JSON.parse(JSON.stringify(board.grid)),
    timestamp: Date.now(),
  }

  if (res.grid !== undefined) {
    if (!res.grid[x]) {
      res.grid[x] = { [y]: { color } }
    } else {
      res.grid[x][y] = { color }
    }
  }

  return res
}

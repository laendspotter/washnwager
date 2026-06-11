import type { Tile } from './types';
import { MAP_COLS, MAP_ROWS, TILE_SIZE } from '../data/constants';
import { isWalkable } from './tilemap';

interface Node {
  col: number;
  row: number;
  g: number;
  f: number;
  parent?: Node;
}

export function findPath(
  tiles: Tile[][],
  startCol: number, startRow: number,
  goalCol: number,  goalRow: number
): Array<{ x: number; y: number }> {

  // Clamp goal to walkable
  if (!isWalkable(tiles, goalCol, goalRow)) {
    // find nearest walkable neighbour
    const nbrs = [[0,1],[0,-1],[1,0],[-1,0]];
    for (const [dc, dr] of nbrs) {
      if (isWalkable(tiles, goalCol + dc, goalRow + dr)) {
        goalCol += dc;
        goalRow += dr;
        break;
      }
    }
  }

  if (startCol === goalCol && startRow === goalRow) return [];

  const open: Node[] = [];
  const closed = new Set<string>();

  const h = (c: number, r: number) =>
    Math.abs(c - goalCol) + Math.abs(r - goalRow);

  open.push({ col: startCol, row: startRow, g: 0, f: h(startCol, startRow) });

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift()!;
    const key = `${cur.col},${cur.row}`;
    if (closed.has(key)) continue;
    closed.add(key);

    if (cur.col === goalCol && cur.row === goalRow) {
      // reconstruct
      const path: Array<{ x: number; y: number }> = [];
      let n: Node | undefined = cur;
      while (n) {
        path.unshift({ x: n.col * TILE_SIZE + TILE_SIZE / 2, y: n.row * TILE_SIZE + TILE_SIZE / 2 });
        n = n.parent;
      }
      return path;
    }

    for (const [dc, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nc = cur.col + dc;
      const nr = cur.row + dr;
      if (!isWalkable(tiles, nc, nr)) continue;
      if (closed.has(`${nc},${nr}`)) continue;
      const g = cur.g + 1;
      open.push({ col: nc, row: nr, g, f: g + h(nc, nr), parent: cur });
    }
  }
  return []; // no path
}

export function pixelToTile(px: number, py: number): { col: number; row: number } {
  return {
    col: Math.floor(px / TILE_SIZE),
    row: Math.floor(py / TILE_SIZE),
  };
}

export function tileCenter(col: number, row: number): { x: number; y: number } {
  return { x: col * TILE_SIZE + TILE_SIZE / 2, y: row * TILE_SIZE + TILE_SIZE / 2 };
}

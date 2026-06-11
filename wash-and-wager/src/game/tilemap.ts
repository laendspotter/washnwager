import type { Tile, TileType } from './types';
import { MAP_COLS, MAP_ROWS } from '../data/constants';

// Layout legend
// ##=wall  ..=floor  DD=door  WM=washer  DR=dryer
// CM=coinMachine  FT=foldTable  VM=vending  DS=detergent
// CO=counter  OF=office  BN=bench  TR=trash  MO=mop
// BA=bathroom  ST=storeDoor  WD=window  SI=sign  FL=checkered
const LAYOUT: string[] = [
  '####################',  // row 0
  '####################',  // row 1 sign row (wall)
  '####............####',  // row 2
  '####..DD........####',  // row 3 entrance
  '##BN............BN##',  // row 4
  '##..WMWM..DRDR....##',  // row 5
  '##..WMWM..DRDRVM..##',  // row 6
  '##..WMWM..DRDRVM..##',  // row 7
  '##MO........DRDS..##',  // row 8 (WMWM implied cont of row 5-7)
  '##........FTFTFTFT##',  // row 9
  '##........FTFTFTFT##',  // row 10
  '##..CMCM........TR##',  // row 11
  '##COCOCO.OF.......##',  // row 12
  '##..............BA##',  // row 13
  '####ST######..####',    // row 14
  '####################',  // row 15
];

function charToType(ch: string, _col: number, row: number): { type: TileType; walkable: boolean } {
  const map: Record<string, { type: TileType; walkable: boolean }> = {
    '#': { type: 'wall',        walkable: false },
    '.': { type: 'floor',       walkable: true },
    'D': { type: 'door',        walkable: true },
    'W': { type: 'washer',      walkable: false },
    'M': row >= 5 && row <= 8 ? { type: 'washer', walkable: false } : { type: 'coinMachine', walkable: false },
    'R': { type: 'dryer',       walkable: false },
    'C': row === 11 ? { type: 'coinMachine', walkable: false } : { type: 'counter', walkable: false },
    'F': row >= 9 ? { type: 'foldTable', walkable: false } : { type: 'floor', walkable: true },
    'T': row === 11 ? { type: 'floor', walkable: true } : { type: 'foldTable', walkable: false },
    'V': { type: 'vending',     walkable: false },
    'S': row === 8 ? { type: 'detergent', walkable: false } : { type: 'storeDoor', walkable: true },
    'B': row === 4 ? { type: 'bench', walkable: false } : { type: 'bathroom', walkable: false },
    'O': { type: 'office',      walkable: false },
    'A': { type: 'bathroom',    walkable: false },
    'N': { type: 'bench',       walkable: false },
    'o': { type: 'mopCorner',   walkable: false },
  };
  return map[ch] ?? { type: 'floor', walkable: true };
}

export function buildTileMap(): Tile[][] {
  const tiles: Tile[][] = [];
  for (let r = 0; r < MAP_ROWS; r++) {
    const rowStr = LAYOUT[r] ?? '####################';
    const row: Tile[] = [];
    for (let c = 0; c < MAP_COLS; c++) {
      const ch = rowStr[c] ?? '#';
      const { type, walkable } = charToType(ch, c, r);
      row.push({ type, walkable });
    }
    tiles.push(row);
  }
  return tiles;
}

export function isWalkable(tiles: Tile[][], col: number, row: number): boolean {
  if (row < 0 || row >= MAP_ROWS || col < 0 || col >= MAP_COLS) return false;
  return tiles[row][col].walkable;
}

import { TILE_SIZE } from '../data/constants';

// (col, row) of each machine's service tile (where Retta/customer stands)
// and the machine's top-left tile

export const MACHINE_POSITIONS: Record<string, { serviceTile: { col: number; row: number }; topLeft: { col: number; row: number } }> = {
  // Washers: 2-tile wide (cols 4-5, 6-7), rows 5-8 (each takes 1 row)
  w1: { serviceTile: { col: 3, row: 5  }, topLeft: { col: 4, row: 5 } },
  w2: { serviceTile: { col: 3, row: 6  }, topLeft: { col: 4, row: 6 } },
  w3: { serviceTile: { col: 3, row: 7  }, topLeft: { col: 4, row: 7 } },
  w4: { serviceTile: { col: 3, row: 8  }, topLeft: { col: 4, row: 8 } },
  // Dryers: cols 10-11, rows 5-8
  d1: { serviceTile: { col: 9, row: 5  }, topLeft: { col: 10, row: 5 } },
  d2: { serviceTile: { col: 9, row: 6  }, topLeft: { col: 10, row: 6 } },
  d3: { serviceTile: { col: 9, row: 7  }, topLeft: { col: 10, row: 7 } },
  d4: { serviceTile: { col: 9, row: 8  }, topLeft: { col: 10, row: 8 } },
  // Coin machine: col 3-4, row 11
  cm1: { serviceTile: { col: 2, row: 11 }, topLeft: { col: 3, row: 11 } },
  // Vending: cols 15-16, rows 6-7
  vm1: { serviceTile: { col: 14, row: 6 }, topLeft: { col: 15, row: 6 } },
  // Fold tables: cols 13-16, rows 9-10
  ft1: { serviceTile: { col: 13, row: 11 }, topLeft: { col: 13, row: 9 } },
  ft2: { serviceTile: { col: 15, row: 11 }, topLeft: { col: 15, row: 9 } },
};

export function servicePixel(machineId: string): { x: number; y: number } {
  const pos = MACHINE_POSITIONS[machineId];
  if (!pos) return { x: 320, y: 256 };
  return {
    x: pos.serviceTile.col * TILE_SIZE + TILE_SIZE / 2,
    y: pos.serviceTile.row * TILE_SIZE + TILE_SIZE / 2,
  };
}

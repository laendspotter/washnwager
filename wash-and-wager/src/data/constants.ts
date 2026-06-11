export const TILE_SIZE = 32;
export const MAP_COLS = 20;
export const MAP_ROWS = 16;
export const CANVAS_W = MAP_COLS * TILE_SIZE; // 640
export const CANVAS_H = MAP_ROWS * TILE_SIZE; // 512

export const GAME_SPEED = 1; // multiplier

// Machine cycle times (seconds)
export const WASHER_CYCLE: Record<number, number> = { 1: 18, 2: 15, 3: 12, 4: 10, 5: 8 };
export const DRYER_CYCLE: Record<number, number>  = { 1: 24, 2: 18, 3: 15, 4: 12, 5: 9 };

// Machine income per cycle
export const WASHER_INCOME: Record<number, number> = { 1: 1.5, 2: 1.75, 3: 2, 4: 2.5, 5: 3 };
export const DRYER_INCOME: Record<number, number>  = { 1: 1,   2: 1.25, 3: 1.5, 4: 2,  5: 2.5 };

// Breakdown probability per cycle (0–1)
export const BREAKDOWN_CHANCE: Record<number, number> = { 1: 0.12, 2: 0.08, 3: 0.05, 4: 0.03, 5: 0.01 };

// Upgrade costs
export const WASHER_UPGRADE_COST:  Record<number, number> = { 2: 500,  3: 1250, 4: 3125, 5: 7813 };
export const DRYER_UPGRADE_COST:   Record<number, number> = { 2: 600,  3: 1500, 4: 3750, 5: 9375 };
export const VENDING_UPGRADE_COST: Record<number, number> = { 2: 400,  3: 1000, 4: 2500, 5: 6250 };
export const SEATING_UPGRADE_COST: Record<number, number> = { 2: 300,  3: 750,  4: 1875, 5: 4688 };
export const FLOOR_UPGRADE_COST:   Record<number, number> = { 2: 350,  3: 875,  4: 2188, 5: 5469 };

// Customer patience (seconds at L1 seating)
export const BASE_PATIENCE = 30;

// Vending passive income per second
export const VENDING_INCOME: Record<number, number> = { 1: 30/3600, 2: 67/3600, 3: 110/3600, 4: 170/3600, 5: 260/3600 };

// Staff hire costs
export const STAFF_HIRE_COST: Record<string, number> = {
  wanda: 150,
  denny: 200,
};
// Weekly wages in $/s (7 in-game minutes = 1 week → 420s)
export const STAFF_WAGE: Record<string, number> = {
  wanda: 80 / 420,
  denny: 100 / 420,
};

// Chapter 1 goals
export const CH1_CUSTOMERS_GOAL = 20;
export const CH1_REVENUE_GOAL   = 500;

// Heat
export const HEAT_MAX = 100;

// Colors used by canvas sprites
export const PALETTE = {
  bg:          '#2B2018',
  floorCrack:  '#A0A0A0',
  floorClean:  '#B8B8B8',
  floorCheck1: '#F0F0F0',
  floorCheck2: '#202020',
  wallCream:   '#F0E8D0',
  wallMint:    '#90C8A8',
  wallBrick:   '#C06020',
  counterTop:  '#E8D8B0',
  counterFront:'#8B5E3C',
  machineL1:   '#B0B0A0',
  machineL2:   '#D0D0C8',
  machineL3:   '#F0F0F0',
  machinePort: '#4080C0',
  machineBroke:'#CC3030',
  machineOK:   '#30CC60',
  dryerL1:     '#D8C880',
  dryerL2:     '#E0D890',
  vendingL1:   '#C8A040',
  vendingL2:   '#2040A0',
  coin:        '#F4C842',
  coinBag:     '#C8A020',
  spill:       '#6080C0',
  retDress:    '#9090CC',
  retHair:     '#E8E8E8',
  retShoes:    '#F0EAD0',
  retApron:    '#E8D0A0',
  staffWanda:  '#70A860',
  staffDenny:  '#A08030',
  benchWood:   '#8B5E3C',
  foldTable:   '#C0A870',
  doorBrown:   '#704020',
  storeDoor:   '#503010',
  grass:       '#406028',
  signNeon:    '#FF8040',
};

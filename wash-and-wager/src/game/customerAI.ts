import type { Customer, CustomerArchetype, GameState, Machine } from './types';
import { TILE_SIZE, BASE_PATIENCE, WASHER_INCOME, DRYER_INCOME } from '../data/constants';
import { findPath, pixelToTile } from './pathfinding';
import { servicePixel } from './machinePositions';

let customerId = 0;

const ARCHETYPE_PATIENCE: Record<CustomerArchetype, number> = {
  collegeKid:          50,
  tiredMom:            80,
  constructionWorker:  55,
  retiredVeteran:      120,
  oneSockGuy:          60,
};
const ARCHETYPES: CustomerArchetype[] = [
  'collegeKid', 'tiredMom', 'constructionWorker', 'retiredVeteran', 'oneSockGuy',
];

export function spawnCustomer(gs: GameState): Customer {
  const arch = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
  const pat = ARCHETYPE_PATIENCE[arch] + Math.random() * 20 - 10;
  const id = `cust_${++customerId}`;
  // Enter from door tile col 5, row 3
  const startX = 5 * TILE_SIZE + TILE_SIZE / 2;
  const startY = 3 * TILE_SIZE + TILE_SIZE / 2;
  return {
    id, archetype: arch,
    state: 'entering',
    patience: 1, maxPatience: pat, patienceTimer: 0,
    x: startX, y: startY, targetX: startX, targetY: startY,
    path: [], pathStep: 0,
    angry: false, spending: 0, tipLeft: Math.random() < 0.4 ? 1 : 0,
    angerTimer: 0, coinsDone: false, washerDone: false, dryerDone: false, foldDone: false,
    entryTime: gs.gameTime,
  };
}

const SPEED = 60; // pixels per second

function moveAlongPath(entity: { x: number; y: number; path: Array<{ x: number; y: number }>; pathStep: number; targetX: number; targetY: number }, dt: number): boolean {
  if (entity.pathStep >= entity.path.length) return true;
  const next = entity.path[entity.pathStep];
  const dx = next.x - entity.x;
  const dy = next.y - entity.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const step = SPEED * dt;
  if (step >= dist) {
    entity.x = next.x;
    entity.y = next.y;
    entity.pathStep++;
    return entity.pathStep >= entity.path.length;
  } else {
    entity.x += (dx / dist) * step;
    entity.y += (dy / dist) * step;
    return false;
  }
}

export function updateCustomer(c: Customer, gs: GameState, dt: number): void {
  const { tiles, machines } = gs;

  switch (c.state) {
    case 'entering': {
      // walk to coin machine
      if (c.path.length === 0) {
        const dest = servicePixel('cm1');
        const { col: sc, row: sr } = pixelToTile(c.x, c.y);
        const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
        c.path = findPath(tiles, sc, sr, ec, er);
        c.pathStep = 0;
        c.state = 'toCoinMachine';
      }
      break;
    }
    case 'toCoinMachine': {
      const arrived = moveAlongPath(c, dt);
      if (arrived) {
        // "use" coin machine for 2s
        c.patienceTimer += dt;
        if (c.patienceTimer >= 2) {
          c.coinsDone = true;
          c.patienceTimer = 0;
          c.state = 'toWasher';
          c.path = [];
        }
      }
      break;
    }
    case 'toWasher': {
      if (c.path.length === 0) {
        // Find a free washer
        const free = machines.find(m => m.kind === 'washer' && m.state === 'idle' && !m.customerId);
        if (free) {
          c.washerId = free.id;
          free.customerId = c.id;
          const dest = servicePixel(free.id);
          const { col: sc, row: sr } = pixelToTile(c.x, c.y);
          const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
          c.path = findPath(tiles, sc, sr, ec, er);
          c.pathStep = 0;
        } else {
          // wait for a machine
          c.state = 'waitingWasher';
          c.patienceTimer = 0;
        }
      } else {
        const arrived = moveAlongPath(c, dt);
        if (arrived && c.washerId) {
          const m = machines.find(m => m.id === c.washerId);
          if (m && m.state === 'idle') {
            m.state = 'running';
            const lvl = gs.upgrades.washerLevel;
            const total = { 1: 18, 2: 15, 3: 12, 4: 10, 5: 8 }[lvl] ?? 18;
            m.cycleTimer = total;
            m.cycleTotal = total;
            c.spending += WASHER_INCOME[lvl] ?? 1.5;
          }
        }
      }
      break;
    }
    case 'waitingWasher': {
      c.patienceTimer += dt;
      c.patience = 1 - c.patienceTimer / c.maxPatience;
      if (c.patience <= 0) {
        c.angry = true;
        c.state = 'angry';
        c.angerTimer = 10;
        return;
      }
      // keep checking for free washer
      const free = machines.find(m => m.kind === 'washer' && m.state === 'idle' && !m.customerId);
      if (free) {
        c.state = 'toWasher';
        c.path = [];
      }
      break;
    }
    case 'toDryer': {
      if (c.path.length === 0) {
        const free = machines.find(m => m.kind === 'dryer' && m.state === 'idle' && !m.customerId);
        if (free) {
          c.dryerId = free.id;
          free.customerId = c.id;
          const dest = servicePixel(free.id);
          const { col: sc, row: sr } = pixelToTile(c.x, c.y);
          const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
          c.path = findPath(tiles, sc, sr, ec, er);
          c.pathStep = 0;
        } else {
          c.state = 'waitingDryer';
          c.patienceTimer = 0;
        }
      } else {
        const arrived = moveAlongPath(c, dt);
        if (arrived && c.dryerId) {
          const m = machines.find(m => m.id === c.dryerId);
          if (m && m.state === 'idle') {
            m.state = 'running';
            const lvl = gs.upgrades.dryerLevel;
            const total = { 1: 24, 2: 18, 3: 15, 4: 12, 5: 9 }[lvl] ?? 24;
            m.cycleTimer = total;
            m.cycleTotal = total;
            c.spending += DRYER_INCOME[lvl] ?? 1;
          }
        }
      }
      break;
    }
    case 'waitingDryer': {
      c.patienceTimer += dt;
      c.patience = 1 - c.patienceTimer / c.maxPatience;
      if (c.patience <= 0) {
        c.angry = true;
        c.state = 'angry';
        c.angerTimer = 10;
        return;
      }
      const free = machines.find(m => m.kind === 'dryer' && m.state === 'idle' && !m.customerId);
      if (free) {
        c.state = 'toDryer';
        c.path = [];
      }
      break;
    }
    case 'toFoldTable': {
      if (c.path.length === 0) {
        const free = machines.find(m => m.kind === 'foldTable' && !m.customerId);
        if (free) {
          free.customerId = c.id;
          const dest = servicePixel(free.id);
          const { col: sc, row: sr } = pixelToTile(c.x, c.y);
          const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
          c.path = findPath(tiles, sc, sr, ec, er);
          c.pathStep = 0;
        } else {
          c.state = 'leaving';
          c.path = [];
        }
      } else {
        const arrived = moveAlongPath(c, dt);
        if (arrived) {
          c.state = 'folding';
          c.patienceTimer = 0;
        }
      }
      break;
    }
    case 'folding': {
      c.patienceTimer += dt;
      if (c.patienceTimer >= 6) {
        c.foldDone = true;
        c.tipLeft += 0.5; // fold table tip bonus
        // free fold table
        const ft = machines.find(m => m.kind === 'foldTable' && m.customerId === c.id);
        if (ft) ft.customerId = undefined;
        c.state = 'leaving';
        c.path = [];
      }
      break;
    }
    case 'leaving': {
      if (c.path.length === 0) {
        const dest = { x: 5 * TILE_SIZE + TILE_SIZE / 2, y: 3 * TILE_SIZE + TILE_SIZE / 2 };
        const { col: sc, row: sr } = pixelToTile(c.x, c.y);
        const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
        c.path = findPath(tiles, sc, sr, ec, er);
        c.pathStep = 0;
      } else {
        moveAlongPath(c, dt);
      }
      break;
    }
    case 'angry': {
      c.angerTimer -= dt;
      if (c.angerTimer <= 0) {
        c.state = 'leaving';
        c.path = [];
        // free their machines
        freeCustomerMachines(c, machines);
      }
      break;
    }
    case 'calmed': {
      c.angry = false;
      c.patience = Math.min(1, c.patience + 0.5);
      // resume
      if (!c.washerDone) {
        c.state = c.washerId ? 'waitingWasher' : 'toWasher';
        c.path = [];
      } else if (!c.dryerDone) {
        c.state = c.dryerId ? 'waitingDryer' : 'toDryer';
        c.path = [];
      } else {
        c.state = 'leaving';
        c.path = [];
      }
      break;
    }
  }
}

export function freeCustomerMachines(c: Customer, machines: Machine[]): void {
  for (const m of machines) {
    if (m.customerId === c.id) {
      m.customerId = undefined;
      if (m.state === 'running') m.state = 'idle';
    }
  }
}

export function isCustomerGone(c: Customer): boolean {
  if (c.state !== 'leaving') return false;
  return c.pathStep >= c.path.length && c.path.length > 0;
}

import type {
  GameState, Customer, RettaTask,
} from './types';
import {
  WASHER_INCOME, DRYER_INCOME, BREAKDOWN_CHANCE, VENDING_INCOME,
  TILE_SIZE, GAME_SPEED,
} from '../data/constants';
import { findPath, pixelToTile } from './pathfinding';
import { spawnCustomer, updateCustomer, isCustomerGone, freeCustomerMachines } from './customerAI';
import { servicePixel } from './machinePositions';
import { EVENTS } from '../data/events';

// ── Move entity along a precomputed path ──────────────────
const SPEED = 64; // px/s

function moveAlongPath(
  entity: { x: number; y: number; path: Array<{ x: number; y: number }>; pathStep: number },
  dt: number
): boolean {
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
  }
  entity.x += (dx / dist) * step;
  entity.y += (dy / dist) * step;
  return false;
}

// ── Machine tick ──────────────────────────────────────────
function tickMachines(gs: GameState, dt: number): void {
  const { machines, upgrades } = gs;
  for (const m of machines) {
    if (m.state === 'running') {
      m.cycleTimer -= dt;
      // lint trap for dryers
      if (m.kind === 'dryer') {
        m.lintLevel = Math.min(1, m.lintLevel + dt / 300);
        if (m.lintLevel >= 1) m.state = 'broken';
      }
      if (m.cycleTimer <= 0) {
        m.cycleTimer = 0;
        m.state = 'done';
        // decide income
        const lvl = m.kind === 'washer' ? upgrades.washerLevel : upgrades.dryerLevel;
        const income = m.kind === 'washer' ? (WASHER_INCOME[lvl] ?? 1.5) : (DRYER_INCOME[lvl] ?? 1);
        m.coinBag += income;
        // after done, let customer know they can move on
        const cust = gs.customers.find(c => c.id === m.customerId);
        if (cust) {
          if (m.kind === 'washer') {
            cust.washerDone = true;
            m.customerId = undefined;
            m.state = 'idle';
            cust.state = 'toDryer';
            cust.path = [];
          } else if (m.kind === 'dryer') {
            cust.dryerDone = true;
            m.customerId = undefined;
            m.state = 'idle';
            cust.state = 'toFoldTable';
            cust.path = [];
          }
        } else {
          m.state = 'idle';
        }
        // breakdown chance
        if (Math.random() < (BREAKDOWN_CHANCE[m.kind === 'washer' ? upgrades.washerLevel : upgrades.dryerLevel] ?? 0.12)) {
          m.state = 'broken';
        }
      }
    }
    if (m.state === 'repairing') {
      m.repairTimer -= dt;
      if (m.repairTimer <= 0) {
        m.state = 'idle';
        m.lintLevel = 0;
        m.repairTimer = 0;
      }
    }
    // vending passive income
    if (m.kind === 'vending' && m.state === 'idle') {
      const lvl = gs.upgrades.vendingLevel;
      m.coinBag += (VENDING_INCOME[lvl] ?? 0.008) * dt;
    }
  }
}

// ── Spill generation ──────────────────────────────────────
let spillId = 0;
function maybeSpawnSpill(gs: GameState, dt: number): void {
  if (gs.spills.length >= 4) return;
  // ~1 spill every 45 seconds
  if (Math.random() < dt / 45) {
    const cols = [4, 6, 9, 11, 8];
    const rows = [6, 7, 7, 8, 9];
    const idx = Math.floor(Math.random() * cols.length);
    gs.spills.push({ id: `spill_${++spillId}`, col: cols[idx], row: rows[idx], size: 0.6 + Math.random() * 0.4 });
  }
}

// ── Staff AI ──────────────────────────────────────────────
function tickStaff(gs: GameState, dt: number): void {
  for (const s of gs.staff) {
    if (s.state === 'idle') {
      if (s.role === 'wanda') {
        // find a spill
        const spill = gs.spills[0];
        if (spill) {
          const { col: sc, row: sr } = pixelToTile(s.x, s.y);
          s.path = findPath(gs.tiles, sc, sr, spill.col, spill.row);
          s.pathStep = 0;
          s.taskId = spill.id;
          s.state = 'walking';
        }
      } else if (s.role === 'denny') {
        // find a broken machine
        const broken = gs.machines.find(m => m.state === 'broken' && m.kind !== 'foldTable');
        if (broken) {
          const dest = servicePixel(broken.id);
          const { col: sc, row: sr } = pixelToTile(s.x, s.y);
          const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
          s.path = findPath(gs.tiles, sc, sr, ec, er);
          s.pathStep = 0;
          s.taskId = broken.id;
          s.state = 'walking';
        }
      }
    } else if (s.state === 'walking') {
      const arrived = moveAlongPath(s, dt);
      if (arrived) {
        s.state = 'working';
        s.workTimer = s.role === 'wanda' ? 2 : 5;
      }
    } else if (s.state === 'working') {
      s.workTimer -= dt;
      if (s.workTimer <= 0) {
        if (s.role === 'wanda' && s.taskId) {
          gs.spills = gs.spills.filter(sp => sp.id !== s.taskId);
        } else if (s.role === 'denny' && s.taskId) {
          const m = gs.machines.find(m => m.id === s.taskId);
          if (m && m.state === 'broken') { m.state = 'idle'; m.lintLevel = 0; }
        }
        s.taskId = undefined;
        s.state = 'idle';
      }
    }
  }
}

// ── Retta AI ──────────────────────────────────────────────
const RETTA_SPEED = 80;

function moveRetta(gs: GameState, dt: number): void {
  const r = gs.retta;
  if (r.path.length > 0 && r.pathStep < r.path.length) {
    const next = r.path[r.pathStep];
    const dx = next.x - r.x;
    const dy = next.y - r.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const step = RETTA_SPEED * dt;
    if (step >= dist) {
      r.x = next.x;
      r.y = next.y;
      r.pathStep++;
      if (r.pathStep >= r.path.length) {
        r.path = [];
        r.anim = 'idle';
        r.state = 'idle';
        executeRetTaskIfArrived(gs);
      }
    } else {
      r.x += (dx / dist) * step;
      r.y += (dy / dist) * step;
      r.anim = 'walk';
      r.facing = dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';
    }
  } else if (r.currentTask) {
    tickRettaTask(gs, dt);
  } else if (r.taskQueue.length > 0) {
    const task = r.taskQueue.shift()!;
    r.currentTask = task;
    // navigate to task location
    navigateToTask(gs, task);
  }
}

function navigateToTask(gs: GameState, task: RettaTask): void {
  const r = gs.retta;
  let destCol: number, destRow: number;
  if (task.tileX !== undefined && task.tileY !== undefined) {
    destCol = Math.floor(task.tileX / TILE_SIZE);
    destRow = Math.floor(task.tileY / TILE_SIZE);
  } else if (task.targetId) {
    const dest = servicePixel(task.targetId);
    destCol = Math.floor(dest.x / TILE_SIZE);
    destRow = Math.floor(dest.y / TILE_SIZE);
  } else {
    return;
  }
  const { col: sc, row: sr } = pixelToTile(r.x, r.y);
  r.path = findPath(gs.tiles, sc, sr, destCol, destRow);
  r.pathStep = 0;
  r.anim = 'walk';
  r.state = 'walking';
}

function executeRetTaskIfArrived(gs: GameState): void {
  const task = gs.retta.currentTask;
  if (!task) return;
  if (task.duration <= 0) {
    applyRettaTask(gs, task);
    gs.retta.currentTask = undefined;
  }
}

function tickRettaTask(gs: GameState, dt: number): void {
  const task = gs.retta.currentTask;
  if (!task) return;
  task.timer -= dt;
  gs.retta.anim = task.kind === 'repair' ? 'repair' : task.kind === 'mop' ? 'mop' : 'idle';
  if (task.timer <= 0) {
    applyRettaTask(gs, task);
    gs.retta.currentTask = undefined;
    gs.retta.anim = 'idle';
    gs.retta.state = 'idle';
  }
}

function applyRettaTask(gs: GameState, task: RettaTask): void {
  if (task.kind === 'repair' && task.targetId) {
    const m = gs.machines.find(m => m.id === task.targetId);
    if (m && m.state === 'broken') { m.state = 'idle'; m.lintLevel = 0; }
    showVoiceLine(gs, "Three taps. Works every time.");
  } else if (task.kind === 'mop' && task.targetId) {
    gs.spills = gs.spills.filter(sp => sp.id !== task.targetId);
    showVoiceLine(gs, "My floor. My rules.");
  } else if (task.kind === 'collect' && task.targetId) {
    const m = gs.machines.find(m => m.id === task.targetId);
    if (m && m.coinBag > 0) {
      gs.coins += m.coinBag;
      gs.totalEarned += m.coinBag;
      m.coinBag = 0;
    }
  } else if (task.kind === 'calm' && task.targetId) {
    const cust = gs.customers.find(c => c.id === task.targetId);
    if (cust && cust.angry) { cust.state = 'calmed'; showVoiceLine(gs, "Bless your heart."); }
  } else if (task.kind === 'sweep') {
    // clean sweep: repair all, mop all, collect all
    for (const m of gs.machines) {
      if (m.state === 'broken') { m.state = 'idle'; m.lintLevel = 0; }
      if (m.coinBag > 0) {
        gs.coins += m.coinBag;
        gs.totalEarned += m.coinBag;
        m.coinBag = 0;
      }
    }
    gs.spills = [];
    showVoiceLine(gs, "There.");
    setNotification(gs, "Clean Sweep! Everything handled.");
  }
}

function showVoiceLine(gs: GameState, text: string): void {
  gs.voiceLine = { text, timer: 3 };
}

function setNotification(gs: GameState, text: string): void {
  gs.notification = { text, timer: 3 };
}

// ── Abilities ─────────────────────────────────────────────
function tickAbilities(gs: GameState, dt: number): void {
  for (const ab of Object.values(gs.abilities)) {
    if (ab.cooldownLeft > 0) ab.cooldownLeft -= dt;
    if (ab.active) {
      ab.activeTimer -= dt;
      if (ab.activeTimer <= 0) ab.active = false;
    }
  }
  if (gs.hushActive) {
    gs.hushTimer -= dt;
    if (gs.hushTimer <= 0) { gs.hushActive = false; gs.hushTimer = 0; }
  }
}

// ── Event system ──────────────────────────────────────────
function tickEvents(gs: GameState, dt: number): void {
  if (gs.activeEvent) return;
  gs.eventCooldown -= dt;
  if (gs.eventCooldown > 0) return;
  if (gs.pendingEvents.length === 0) return;
  const evtId = gs.pendingEvents[0];
  const evt = EVENTS.find(e => e.id === evtId);
  if (evt) {
    gs.activeEvent = evt;
    gs.pendingEvents.shift();
  }
  gs.eventCooldown = 90 + Math.random() * 60;
}

// ── Wage deduction ────────────────────────────────────────
function tickWages(gs: GameState, dt: number): void {
  gs.wageTimer += dt;
  // deduct every 420s (1 in-game week)
  if (gs.wageTimer >= 420) {
    gs.wageTimer = 0;
    const { wanda, denny } = gs.staffHired;
    const wages = (wanda ? 80 / 420 * 420 : 0) + (denny ? 100 / 420 * 420 : 0);
    gs.coins = Math.max(0, gs.coins - wages);
  }
}

// ── Customer lifecycle ─────────────────────────────────────
function tickCustomers(gs: GameState, dt: number): void {
  // update AI
  for (const c of gs.customers) {
    updateCustomer(c, gs, dt);
  }
  // remove gone customers
  const leaving: Customer[] = [];
  gs.customers = gs.customers.filter(c => {
    if (isCustomerGone(c)) {
      leaving.push(c);
      return false;
    }
    return true;
  });
  for (const c of leaving) {
    freeCustomerMachines(c, gs.machines);
    gs.customersServed++;
    const total = c.spending + c.tipLeft;
    gs.coins += total;
    gs.totalEarned += total;
    // small rep gain
    if (!c.angry) gs.laundroRep = Math.min(100, gs.laundroRep + 0.2);
    else gs.laundroRep = Math.max(0, gs.laundroRep - 1);
  }
}

// ── Voice line timer ──────────────────────────────────────
function tickVoiceLine(gs: GameState, dt: number): void {
  if (gs.voiceLine) {
    gs.voiceLine.timer -= dt;
    if (gs.voiceLine.timer <= 0) gs.voiceLine = null;
  }
  if (gs.notification) {
    gs.notification.timer -= dt;
    if (gs.notification.timer <= 0) gs.notification = null;
  }
}

// ── Chapter check ─────────────────────────────────────────
function checkChapter(gs: GameState): void {
  if (gs.chapter === 1 && !gs.chapterComplete) {
    if (gs.customersServed >= gs.chapterGoal.customersServed && gs.totalEarned >= gs.chapterGoal.revenueEarned) {
      gs.chapterComplete = true;
    }
  }
}

// ── Storage room glow ─────────────────────────────────────
function tickStorageGlow(gs: GameState): void {
  // glow appears after 10 customers served
  if (gs.customersServed >= 10 && !gs.storageRoomOpened) {
    gs.storageRoomGlow = true;
  }
}

// ── Main tick ─────────────────────────────────────────────
export function tick(gs: GameState, dt: number): GameState {
  const scaled = dt * GAME_SPEED;

  gs.gameTime += scaled;
  gs.dayTime = (gs.dayTime + scaled / 120) % 1;

  // spawn customers
  if (gs.customers.length < gs.maxCustomers && !gs.activeEvent) {
    gs.spawnTimer += scaled;
    if (gs.spawnTimer >= gs.spawnInterval) {
      gs.spawnTimer = 0;
      gs.customers.push(spawnCustomer(gs));
      // slight interval variance
      gs.spawnInterval = 8 + Math.random() * 8;
    }
  }

  tickMachines(gs, scaled);
  maybeSpawnSpill(gs, scaled);
  tickCustomers(gs, scaled);
  tickStaff(gs, scaled);
  moveRetta(gs, scaled);
  tickAbilities(gs, scaled);
  tickEvents(gs, scaled);
  tickWages(gs, scaled);
  tickVoiceLine(gs, scaled);
  checkChapter(gs);
  tickStorageGlow(gs);

  return gs;
}

// ── Player actions ────────────────────────────────────────

export function rettaTapMachine(gs: GameState, machineId: string): void {
  const m = gs.machines.find(m => m.id === machineId);
  if (!m) return;
  if (m.state === 'broken') {
    gs.retta.taskQueue.push({ kind: 'repair', targetId: machineId, duration: 5, timer: 5 });
    navigateRetToTask(gs, machineId);
  } else if (m.coinBag > 0) {
    gs.retta.taskQueue.push({ kind: 'collect', targetId: machineId, duration: 0.5, timer: 0.5 });
    navigateRetToTask(gs, machineId);
  }
}

function navigateRetToTask(gs: GameState, machineId: string): void {
  if (gs.retta.state !== 'idle' && gs.retta.path.length > 0) return;
  const dest = servicePixel(machineId);
  const { col: sc, row: sr } = pixelToTile(gs.retta.x, gs.retta.y);
  const { col: ec, row: er } = pixelToTile(dest.x, dest.y);
  gs.retta.path = findPath(gs.tiles, sc, sr, ec, er);
  gs.retta.pathStep = 0;
  gs.retta.state = 'walking';
  gs.retta.anim = 'walk';
}

export function rettaTapSpill(gs: GameState, spillId: string): void {
  const spill = gs.spills.find(s => s.id === spillId);
  if (!spill) return;
  gs.retta.taskQueue.push({ kind: 'mop', targetId: spillId, tileX: spill.col * TILE_SIZE + TILE_SIZE / 2, tileY: spill.row * TILE_SIZE + TILE_SIZE / 2, duration: 2, timer: 2 });
  const { col: sc, row: sr } = pixelToTile(gs.retta.x, gs.retta.y);
  gs.retta.path = findPath(gs.tiles, sc, sr, spill.col, spill.row);
  gs.retta.pathStep = 0;
  gs.retta.state = 'walking';
  gs.retta.anim = 'walk';
}

export function rettaTapCustomer(gs: GameState, customerId: string): void {
  const c = gs.customers.find(c => c.id === customerId);
  if (!c || !c.angry) return;
  gs.retta.taskQueue.push({ kind: 'calm', targetId: customerId, tileX: c.x, tileY: c.y, duration: 1, timer: 1 });
  const { col: sc, row: sr } = pixelToTile(gs.retta.x, gs.retta.y);
  const { col: ec, row: er } = pixelToTile(c.x, c.y);
  gs.retta.path = findPath(gs.tiles, sc, sr, ec, er);
  gs.retta.pathStep = 0;
  gs.retta.state = 'walking';
  gs.retta.anim = 'walk';
}

export function rettaTapFloor(gs: GameState, px: number, py: number): void {
  const { col: ec, row: er } = pixelToTile(px, py);
  if (!gs.tiles[er]?.[ec]?.walkable) return;
  const { col: sc, row: sr } = pixelToTile(gs.retta.x, gs.retta.y);
  gs.retta.taskQueue = [];
  gs.retta.currentTask = undefined;
  gs.retta.path = findPath(gs.tiles, sc, sr, ec, er);
  gs.retta.pathStep = 0;
  gs.retta.state = 'walking';
  gs.retta.anim = 'walk';
}

export function useAbility(gs: GameState, id: string): void {
  const ab = gs.abilities[id as keyof typeof gs.abilities];
  if (!ab || ab.cooldownLeft > 0) return;
  ab.cooldownLeft = ab.cooldown;
  ab.active = true;

  if (id === 'blessYourHeart') {
    // calm first angry customer
    const angry = gs.customers.find(c => c.angry);
    if (angry) { angry.state = 'calmed'; gs.voiceLine = { text: "Bless your heart.", timer: 3 }; }
  } else if (id === 'grandmaStare') {
    // pause all angry customers for 20s
    for (const c of gs.customers) { if (c.angry) { c.angerTimer += 20; } }
    gs.voiceLine = { text: "I only say this once.", timer: 3 };
  } else if (id === 'hushNow') {
    gs.hushActive = true;
    gs.hushTimer = 60;
    gs.voiceLine = { text: "Hush now.", timer: 2 };
  } else if (id === 'cleanSweep') {
    gs.retta.taskQueue = [{ kind: 'sweep', duration: 0.1, timer: 0.1 }];
    gs.retta.currentTask = gs.retta.taskQueue.shift()!;
    gs.voiceLine = { text: "There.", timer: 2 };
  }
}

export function resolveEvent(gs: GameState, optionIndex: 0 | 1 | 2): void {
  const evt = gs.activeEvent;
  if (!evt) return;
  const opt = evt.options[optionIndex];
  gs.coins = Math.max(0, gs.coins + opt.money);
  if (opt.money > 0) gs.totalEarned += opt.money;
  gs.heat = Math.max(0, Math.min(100, gs.heat + opt.heat));
  gs.laundroRep = Math.max(0, Math.min(100, gs.laundroRep + opt.rep));
  gs.notification = { text: opt.outcomeText, timer: 5 };
  gs.activeEvent = null;
}

export function hireSta(gs: GameState, role: 'wanda' | 'denny'): boolean {
  const costs = { wanda: 150, denny: 200 };
  const startPos = { wanda: { col: 1, row: 8 }, denny: { col: 2, row: 7 } };
  if (gs.staffHired[role]) return false;
  if (gs.coins < costs[role]) return false;
  gs.coins -= costs[role];
  gs.staffHired[role] = true;
  const pos = startPos[role];
  gs.staff.push({
    id: `staff_${role}`,
    role, level: 1,
    x: pos.col * TILE_SIZE + TILE_SIZE / 2,
    y: pos.row * TILE_SIZE + TILE_SIZE / 2,
    targetX: pos.col * TILE_SIZE + TILE_SIZE / 2,
    targetY: pos.row * TILE_SIZE + TILE_SIZE / 2,
    path: [], pathStep: 0,
    state: 'idle', workTimer: 0,
    facing: 'right',
  });
  return true;
}

export function buyUpgrade(gs: GameState, kind: string): boolean {
  const COSTS: Record<string, Record<number, number>> = {
    washer:  { 2: 500, 3: 1250, 4: 3125, 5: 7813 },
    dryer:   { 2: 600, 3: 1500, 4: 3750, 5: 9375 },
    vending: { 2: 400, 3: 1000, 4: 2500, 5: 6250 },
    seating: { 2: 300, 3: 750,  4: 1875, 5: 4688 },
    floor:   { 2: 350, 3: 875,  4: 2188, 5: 5469 },
  };
  const cur = gs.upgrades[`${kind}Level` as keyof typeof gs.upgrades] as number;
  if (cur >= 5) return false;
  const nextLevel = cur + 1;
  const cost = COSTS[kind]?.[nextLevel];
  if (!cost || gs.coins < cost) return false;
  gs.coins -= cost;
  (gs.upgrades as unknown as Record<string, number>)[`${kind}Level`] = nextLevel;
  gs.notification = { text: `${kind.charAt(0).toUpperCase() + kind.slice(1)} upgraded to Level ${nextLevel}!`, timer: 3 };
  return true;
}

export function tapStorageDoor(gs: GameState): void {
  if (!gs.storageRoomOpened) {
    gs.storageRoomOpened = true;
    gs.storageRoomGlow = false;
    gs.notification = { text: "The door sticks. You push through. There's a card table in there...", timer: 6 };
    gs.voiceLine = { text: "Well. Earl. Look at this.", timer: 4 };
  }
}

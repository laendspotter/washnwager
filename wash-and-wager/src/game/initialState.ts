import type {
  GameState, Machine, Retta, UpgradeState, Ability,
} from './types';
import { buildTileMap } from './tilemap';
import { TILE_SIZE } from '../data/constants';

function makeMachine(id: string, kind: Machine['kind'], level: number): Machine {
  return {
    id, kind, level,
    state: (id === 'w1' || id === 'w3') ? 'broken' : 'idle',
    cycleTimer: 0, cycleTotal: 0,
    coinBag: 0, repairTimer: 0, lintLevel: 0,
  };
}

const defaultAbility = (id: Ability['id'], name: string, icon: string, cooldown: number): Ability => ({
  id, name, icon, cooldown, cooldownLeft: 0, active: false, activeDuration: 0, activeTimer: 0,
});

export function makeInitialState(): GameState {
  const tiles = buildTileMap();

  const retCol = 3, retRow = 12;
  const retta: Retta = {
    x: retCol * TILE_SIZE + TILE_SIZE / 2,
    y: retRow * TILE_SIZE + TILE_SIZE / 2,
    targetX: retCol * TILE_SIZE + TILE_SIZE / 2,
    targetY: retRow * TILE_SIZE + TILE_SIZE / 2,
    path: [], pathStep: 0,
    state: 'idle', anim: 'idle', animTimer: 0,
    taskQueue: [],
    facing: 'right',
  };

  const upgrades: UpgradeState = {
    washerLevel: 1, dryerLevel: 1, vendingLevel: 1, seatingLevel: 1, floorLevel: 1,
  };

  const abilities: GameState['abilities'] = {
    blessYourHeart: defaultAbility('blessYourHeart', 'Bless Your Heart', '🙏', 90),
    grandmaStare:   defaultAbility('grandmaStare',   'Grandma Stare',   '👁️', 300),
    hushNow:        defaultAbility('hushNow',        'Hush Now',        '🤫', 240),
    cleanSweep:     defaultAbility('cleanSweep',     'Clean Sweep',     '🧹', 900),
  };

  return {
    coins: 350,
    totalEarned: 0,
    customersServed: 0,
    gameTime: 0,
    dayTime: 0,
    chapter: 1,
    chapterGoal: { customersServed: 20, revenueEarned: 500 },
    chapterComplete: false,

    tiles,
    machines: [
      // washers (cols 4–7, rows 5–8) — 4 machines
      makeMachine('w1', 'washer', 1),
      makeMachine('w2', 'washer', 1),
      makeMachine('w3', 'washer', 1),
      makeMachine('w4', 'washer', 1),
      // dryers (cols 10–13, rows 5–8)
      makeMachine('d1', 'dryer', 1),
      makeMachine('d2', 'dryer', 1),
      makeMachine('d3', 'dryer', 1),
      makeMachine('d4', 'dryer', 1),
      // coin machine
      makeMachine('cm1', 'coinMachine', 1),
      // vending
      makeMachine('vm1', 'vending', 1),
      // fold tables (2)
      makeMachine('ft1', 'foldTable', 1),
      makeMachine('ft2', 'foldTable', 1),
    ],
    spills: [],

    retta,
    customers: [],
    staff: [],
    staffHired: { wanda: false, denny: false },

    upgrades,

    storageRoomOpened: false,
    backroomUnlocked: false,
    storageRoomGlow: false,

    heat: 0,
    laundroRep: 20,

    activeEvent: null,
    pendingEvents: ['wrongKnock', 'washerFlood', 'pokerChipKid', 'slotSings', 'newWasherSound'],
    eventCooldown: 60,

    voiceLine: null,

    abilities,
    hushActive: false,
    hushTimer: 0,

    spawnTimer: 0,
    spawnInterval: 12,
    maxCustomers: 6,

    wageTimer: 0,

    notification: null,
  };
}

export type TileType =
  | 'floor' | 'floorCheck' | 'wall' | 'wallMint' | 'wallBrick'
  | 'door' | 'storeDoor' | 'bench' | 'counter' | 'office'
  | 'washer' | 'dryer' | 'coinMachine' | 'foldTable'
  | 'vending' | 'detergent' | 'mopCorner' | 'bathroom' | 'empty';

export interface Tile {
  type: TileType;
  walkable: boolean;
  machineId?: string;
}

// ── Machine ──────────────────────────────────────────────
export type MachineKind = 'washer' | 'dryer' | 'coinMachine' | 'vending' | 'foldTable';
export type MachineState = 'idle' | 'running' | 'done' | 'broken' | 'repairing';

export interface Machine {
  id: string;
  kind: MachineKind;
  level: number;         // 1–5
  state: MachineState;
  cycleTimer: number;    // seconds remaining in current cycle
  cycleTotal: number;    // total cycle length
  customerId?: string;   // who is using it
  coinBag: number;       // coins waiting to be collected
  repairTimer: number;   // seconds remaining in repair
  lintLevel: number;     // 0–1 for dryers
}

// ── Customer ─────────────────────────────────────────────
export type CustomerArchetype =
  | 'collegeKid' | 'tiredMom' | 'constructionWorker'
  | 'retiredVeteran' | 'oneSockGuy';

export type CustomerState =
  | 'entering' | 'toCoinMachine' | 'toWasher' | 'waitingWasher'
  | 'toDryer' | 'waitingDryer' | 'toFoldTable' | 'folding'
  | 'toVending' | 'idle' | 'leaving' | 'angry' | 'calmed';

export interface Customer {
  id: string;
  archetype: CustomerArchetype;
  state: CustomerState;
  patience: number;       // 0–1
  maxPatience: number;    // seconds
  patienceTimer: number;  // counts up when waiting
  x: number;             // pixel position (centre)
  y: number;
  targetX: number;
  targetY: number;
  path: Array<{ x: number; y: number }>;
  pathStep: number;
  washerId?: string;
  dryerId?: string;
  angry: boolean;
  spending: number;       // total spent this visit
  tipLeft: number;        // tip available on exit
  angerTimer: number;     // countdown before leaving if angry
  coinsDone: boolean;     // visited coin machine
  washerDone: boolean;
  dryerDone: boolean;
  foldDone: boolean;
  entryTime: number;
}

// ── Retta ────────────────────────────────────────────────
export type RettaState = 'idle' | 'walking' | 'repairing' | 'mopping' | 'collecting' | 'calming' | 'sweep';
export type RettaAnim = 'idle' | 'walk' | 'repair' | 'mop' | 'happy' | 'angry' | 'bluff';

export interface Retta {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  path: Array<{ x: number; y: number }>;
  pathStep: number;
  state: RettaState;
  anim: RettaAnim;
  animTimer: number;
  taskQueue: RettaTask[];
  currentTask?: RettaTask;
  facing: 'left' | 'right' | 'up' | 'down';
}

export type RettaTaskKind = 'repair' | 'mop' | 'collect' | 'calm' | 'sweep' | 'walkTo';
export interface RettaTask {
  kind: RettaTaskKind;
  targetId?: string;         // machineId or customerId or spillId
  tileX?: number;
  tileY?: number;
  duration: number;          // seconds to perform the action once arrived
  timer: number;
}

// ── Spill ────────────────────────────────────────────────
export interface Spill {
  id: string;
  col: number;
  row: number;
  size: number; // 0–1 visual
}

// ── Staff ────────────────────────────────────────────────
export type StaffRole = 'wanda' | 'denny';
export type StaffState = 'idle' | 'walking' | 'working';
export interface StaffMember {
  id: string;
  role: StaffRole;
  level: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  path: Array<{ x: number; y: number }>;
  pathStep: number;
  state: StaffState;
  taskId?: string;
  workTimer: number;
  facing: 'left' | 'right';
}

// ── Dialogue Events ──────────────────────────────────────
export interface DialogueEvent {
  id: string;
  title: string;
  npcName: string;
  situation: string;
  npcLine: string;
  prompt: string;
  options: [EventOption, EventOption, EventOption];
}

export interface EventOption {
  label: string;
  shortText: string;
  money: number;
  heat: number;
  rep: number;
  outcomeText: string;
}

// ── Voice Line ───────────────────────────────────────────
export interface VoiceLine {
  text: string;
  timer: number; // countdown seconds
}

// ── Abilities ────────────────────────────────────────────
export type AbilityId = 'blessYourHeart' | 'grandmaStare' | 'hushNow' | 'cleanSweep';
export interface Ability {
  id: AbilityId;
  name: string;
  icon: string;
  cooldown: number;   // seconds
  cooldownLeft: number;
  active: boolean;
  activeDuration: number;
  activeTimer: number;
}

// ── Upgrade State ────────────────────────────────────────
export interface UpgradeState {
  washerLevel: number;
  dryerLevel:  number;
  vendingLevel: number;
  seatingLevel: number;
  floorLevel:  number;
}

// ── Chapter ──────────────────────────────────────────────
export type ChapterId = 1 | 2 | 3 | 4 | 5;
export interface ChapterGoal {
  customersServed: number;
  revenueEarned:   number;
}

// ── Full Game State ──────────────────────────────────────
export interface GameState {
  // Core
  coins: number;
  totalEarned: number;
  customersServed: number;
  gameTime: number;       // seconds elapsed
  dayTime: number;        // 0–1 within an in-game day (120s)
  chapter: ChapterId;
  chapterGoal: ChapterGoal;
  chapterComplete: boolean;

  // Map
  tiles: Tile[][];        // [row][col]
  machines: Machine[];
  spills: Spill[];

  // Entities
  retta: Retta;
  customers: Customer[];
  staff: StaffMember[];
  staffHired: Record<StaffRole, boolean>;

  // Upgrades
  upgrades: UpgradeState;

  // Story
  storageRoomOpened: boolean;
  backroomUnlocked: boolean;
  storageRoomGlow: boolean;

  // Heat & Rep
  heat: number;
  laundroRep: number;

  // Events
  activeEvent: DialogueEvent | null;
  pendingEvents: string[];
  eventCooldown: number;

  // Voice lines
  voiceLine: VoiceLine | null;

  // Abilities
  abilities: Record<AbilityId, Ability>;
  hushActive: boolean;
  hushTimer: number;

  // Customer spawn
  spawnTimer: number;
  spawnInterval: number;   // seconds between spawns
  maxCustomers: number;

  // Wage timer
  wageTimer: number;

  // Notification
  notification: { text: string; timer: number } | null;
}

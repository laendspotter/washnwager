import type { GameState, Machine, Customer } from '../game/types';
import { TILE_SIZE, MAP_COLS, MAP_ROWS, PALETTE } from '../data/constants';
import { MACHINE_POSITIONS } from '../game/machinePositions';

const P = PALETTE;

// ── Helpers ────────────────────────────────────────────────
function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function px(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 2, 2);
}

// ── Floor tiles ────────────────────────────────────────────
function drawTiles(ctx: CanvasRenderingContext2D, gs: GameState) {
  const floorColor = [P.floorCrack, P.floorClean, P.floorCheck1, '#A8D090', '#A09870'][gs.upgrades.floorLevel - 1] ?? P.floorCrack;
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      const tile = gs.tiles[r][c];
      const x = c * TILE_SIZE;
      const y = r * TILE_SIZE;

      switch (tile.type) {
        case 'floor':
          if (gs.upgrades.floorLevel >= 3) {
            // checkered
            const isWhite = (c + r) % 2 === 0;
            rect(ctx, x, y, TILE_SIZE, TILE_SIZE, isWhite ? P.floorCheck1 : P.floorCheck2);
          } else {
            rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          }
          break;
        case 'wall':
        case 'wallBrick':
          drawBrickWall(ctx, x, y);
          break;
        case 'wallMint':
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, P.wallMint);
          break;
        case 'door':
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, P.floorClean);
          // door frame
          ctx.strokeStyle = P.doorBrown;
          ctx.lineWidth = 2;
          ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
          break;
        case 'storeDoor': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, P.floorCrack);
          // suspicious door
          rect(ctx, x + 4, y + 2, TILE_SIZE - 8, TILE_SIZE - 4, P.storeDoor);
          if (gs.storageRoomGlow) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#FFD060';
            rect(ctx, x + 4, y + 2, TILE_SIZE - 8, TILE_SIZE - 4, '#A06020');
            ctx.shadowBlur = 0;
          }
          // "STORAGE" label
          ctx.fillStyle = '#D0A060';
          ctx.font = '5px monospace';
          ctx.fillText('STORAGE', x + 2, y + TILE_SIZE - 4);
          break;
        }
        case 'bench': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          // bench seat
          rect(ctx, x + 2, y + TILE_SIZE / 2 - 4, TILE_SIZE - 4, 10, P.benchWood);
          rect(ctx, x + 4, y + TILE_SIZE / 2 + 6, 4, 6, '#5A3A1A');
          rect(ctx, x + TILE_SIZE - 8, y + TILE_SIZE / 2 + 6, 4, 6, '#5A3A1A');
          break;
        }
        case 'counter': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, P.counterFront);
          rect(ctx, x, y, TILE_SIZE, 8, P.counterTop);
          break;
        }
        case 'office': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, '#A09060');
          rect(ctx, x + 2, y + 2, TILE_SIZE - 4, 6, '#808060');
          ctx.fillStyle = '#F0E8C0';
          ctx.font = '5px monospace';
          ctx.fillText('DESK', x + 4, y + TILE_SIZE - 6);
          break;
        }
        case 'bathroom': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, '#E0E8F0');
          rect(ctx, x + 6, y + 4, 20, 14, '#C0D0E0');
          ctx.fillStyle = '#8090A0';
          ctx.font = '5px monospace';
          ctx.fillText('WC', x + 10, y + TILE_SIZE - 4);
          break;
        }
        case 'mopCorner': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          // mop bucket
          rect(ctx, x + 8, y + 10, 14, 14, '#8090A8');
          rect(ctx, x + 12, y + 8, 4, 14, '#B0B8C0');
          break;
        }
        case 'foldTable': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          break; // drawn by drawFurniture
        }
        case 'detergent': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          // detergent bottles on a shelf
          rect(ctx, x + 2, y + 6, TILE_SIZE - 4, 4, '#D0D0D0');
          for (let i = 0; i < 3; i++) {
            rect(ctx, x + 4 + i * 8, y + 2, 6, 8, ['#60A0D0', '#D06080', '#60C080'][i]);
          }
          break;
        }
        case 'vending': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          break; // drawn separately
        }
        case 'coinMachine': {
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          break;
        }
        case 'washer':
        case 'dryer':
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, floorColor);
          break;
        default:
          rect(ctx, x, y, TILE_SIZE, TILE_SIZE, '#1A1A1A');
      }
    }
  }
}

function drawBrickWall(ctx: CanvasRenderingContext2D, x: number, y: number) {
  rect(ctx, x, y, TILE_SIZE, TILE_SIZE, P.wallBrick);
  ctx.fillStyle = '#90805060';
  // brick pattern
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const offset = row % 2 === 0 ? 0 : TILE_SIZE / 6;
      const bx = x + col * (TILE_SIZE / 3) - offset;
      const by = y + row * (TILE_SIZE / 4);
      ctx.strokeStyle = '#90706050';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx + 1, by + 1, TILE_SIZE / 3 - 2, TILE_SIZE / 4 - 2);
    }
  }
}

// ── Machines ───────────────────────────────────────────────
function drawMachines(ctx: CanvasRenderingContext2D, gs: GameState) {
  for (const m of gs.machines) {
    const pos = MACHINE_POSITIONS[m.id];
    if (!pos) continue;
    const x = pos.topLeft.col * TILE_SIZE;
    const y = pos.topLeft.row * TILE_SIZE;

    if (m.kind === 'washer') drawWasher(ctx, x, y, m, gs.gameTime);
    else if (m.kind === 'dryer') drawDryer(ctx, x, y, m, gs.gameTime);
    else if (m.kind === 'coinMachine') drawCoinMachine(ctx, x, y, m);
    else if (m.kind === 'vending') drawVending(ctx, x, y, m);
    else if (m.kind === 'foldTable') drawFoldTable(ctx, x, y, m);

    // coin bag
    if (m.coinBag > 0.1) {
      const cx = pos.topLeft.col * TILE_SIZE + TILE_SIZE / 2;
      const cy = pos.topLeft.row * TILE_SIZE - 4 + Math.sin(gs.gameTime * 3) * 3;
      drawCoinBag(ctx, cx, cy, m.coinBag);
    }
    // lint trap
    if (m.kind === 'dryer' && m.lintLevel > 0.5 && m.state !== 'broken') {
      const cx = pos.topLeft.col * TILE_SIZE + TILE_SIZE + 2;
      const cy = pos.topLeft.row * TILE_SIZE;
      ctx.fillStyle = m.lintLevel > 0.85 ? '#FF6030' : '#FFA040';
      ctx.font = '8px monospace';
      ctx.fillText('LINT', cx, cy + 8);
    }
  }
}

function machineColor(m: Machine): string {
  if (m.state === 'broken') return P.machineBroke;
  const lvl = m.level;
  return [P.machineL1, P.machineL2, P.machineL3, '#D8E8F0', '#E8F0F8'][Math.min(lvl - 1, 4)];
}

function drawWasher(ctx: CanvasRenderingContext2D, x: number, y: number, m: Machine, t: number) {
  const W = TILE_SIZE * 2;
  const H = TILE_SIZE;
  const c = machineColor(m);
  rect(ctx, x, y, W, H, c);
  // porthole
  ctx.beginPath();
  ctx.arc(x + W / 2, y + H / 2, 10, 0, Math.PI * 2);
  ctx.fillStyle = m.state === 'running' ? '#204080' : '#181828';
  ctx.fill();
  // spin animation
  if (m.state === 'running') {
    const angle = t * 4;
    ctx.strokeStyle = '#6090C0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + W / 2, y + H / 2);
    ctx.lineTo(x + W / 2 + Math.cos(angle) * 7, y + H / 2 + Math.sin(angle) * 7);
    ctx.stroke();
    // progress bar
    const pct = 1 - m.cycleTimer / (m.cycleTotal || 1);
    rect(ctx, x + 2, y + H - 5, (W - 4) * pct, 3, '#40C080');
    rect(ctx, x + 2 + (W - 4) * pct, y + H - 5, (W - 4) * (1 - pct), 3, '#203030');
  }
  if (m.state === 'done') {
    rect(ctx, x, y, W, H, c);
    ctx.fillStyle = P.machineOK;
    ctx.font = '8px monospace';
    ctx.fillText('DONE', x + 8, y + H / 2 + 3);
  }
  if (m.state === 'broken') {
    ctx.fillStyle = '#FF4040';
    ctx.font = '10px monospace';
    ctx.fillText('✕', x + W / 2 - 4, y + H / 2 + 4);
  }
  // level indicator
  ctx.fillStyle = '#A0C0D0';
  ctx.font = '5px monospace';
  ctx.fillText(`L${m.level}`, x + 2, y + 7);
}

function drawDryer(ctx: CanvasRenderingContext2D, x: number, y: number, m: Machine, t: number) {
  const W = TILE_SIZE * 2;
  const H = TILE_SIZE;
  const col = m.state === 'broken' ? P.machineBroke : [P.dryerL1, P.dryerL2, P.machineL3, '#E0E8F0', '#F0F8F0'][Math.min(m.level - 1, 4)];
  rect(ctx, x, y, W, H, col);
  ctx.beginPath();
  ctx.arc(x + W / 2, y + H / 2, 9, 0, Math.PI * 2);
  ctx.fillStyle = m.state === 'running' ? '#804020' : '#302010';
  ctx.fill();
  if (m.state === 'running') {
    // tumbling
    for (let i = 0; i < 3; i++) {
      const a = t * 2 + (i * Math.PI * 2) / 3;
      ctx.fillStyle = '#C0A060';
      ctx.beginPath();
      ctx.arc(x + W / 2 + Math.cos(a) * 5, y + H / 2 + Math.sin(a) * 5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    const pct = 1 - m.cycleTimer / (m.cycleTotal || 1);
    rect(ctx, x + 2, y + H - 5, (W - 4) * pct, 3, '#F08040');
    rect(ctx, x + 2 + (W - 4) * pct, y + H - 5, (W - 4) * (1 - pct), 3, '#302010');
  }
  if (m.state === 'broken') {
    ctx.fillStyle = '#FF4040';
    ctx.font = '10px monospace';
    ctx.fillText('✕', x + W / 2 - 4, y + H / 2 + 4);
  }
  ctx.fillStyle = '#C0A080';
  ctx.font = '5px monospace';
  ctx.fillText(`L${m.level}`, x + 2, y + 7);
}

function drawCoinMachine(ctx: CanvasRenderingContext2D, x: number, y: number, m: Machine) {
  const W = TILE_SIZE * 2;
  const H = TILE_SIZE;
  rect(ctx, x, y, W, H, '#484840');
  rect(ctx, x + 4, y + 4, W - 8, H / 2, '#40C040');
  ctx.fillStyle = '#20A020';
  ctx.font = '6px monospace';
  ctx.fillText('COINS', x + 6, y + H / 2 - 2);
  rect(ctx, x + 8, y + H / 2 + 2, W - 16, 8, '#606058');
  // bill slot
  rect(ctx, x + 10, y + H - 8, W - 20, 3, '#202018');
}

function drawVending(ctx: CanvasRenderingContext2D, x: number, y: number, m: Machine) {
  const W = TILE_SIZE * 2;
  const H = TILE_SIZE * 2;
  const col = m.level >= 3 ? '#2040A0' : P.vendingL1;
  rect(ctx, x, y, W, H, col);
  // window
  rect(ctx, x + 2, y + 2, W - 4, H * 0.6, '#D0E8D0');
  // items
  const items = [['#FF4040', '#FF8000', '#80C040'], ['#4080FF', '#80C0FF', '#C040C0']];
  for (let ir = 0; ir < 2; ir++) {
    for (let ic = 0; ic < 3; ic++) {
      rect(ctx, x + 4 + ic * 8, y + 4 + ir * 10, 6, 8, items[ir][ic]);
    }
  }
  ctx.fillStyle = '#D0D0D0';
  ctx.font = '5px monospace';
  ctx.fillText('SNACKS', x + 3, y + H - 4);
}

function drawFoldTable(ctx: CanvasRenderingContext2D, x: number, y: number, m: Machine) {
  const W = TILE_SIZE * 2;
  const H = TILE_SIZE * 2;
  rect(ctx, x + 2, y + 4, W - 4, H - 8, P.foldTable);
  rect(ctx, x + 2, y + 4, W - 4, 3, '#A08050');
  // legs
  rect(ctx, x + 4, y + H - 8, 3, 6, '#8B5E3C');
  rect(ctx, x + W - 7, y + H - 8, 3, 6, '#8B5E3C');
  if (m.customerId) {
    // clothes being folded
    ctx.fillStyle = '#A0B8D0';
    ctx.fillRect(x + 6, y + 8, W - 12, 8);
  }
}

// ── Coin bag ───────────────────────────────────────────────
function drawCoinBag(ctx: CanvasRenderingContext2D, cx: number, cy: number, amount: number) {
  // bag
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fillStyle = P.coinBag;
  ctx.fill();
  ctx.strokeStyle = P.coin;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // $ symbol
  ctx.fillStyle = '#F0E020';
  ctx.font = '7px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('$', cx, cy + 3);
  ctx.textAlign = 'left';
  // amount label
  ctx.fillStyle = '#F4C842';
  ctx.font = '6px monospace';
  const label = amount >= 1 ? `+${amount.toFixed(0)}` : `+${amount.toFixed(1)}`;
  ctx.fillText(label, cx + 10, cy + 2);
}

// ── Spills ─────────────────────────────────────────────────
function drawSpills(ctx: CanvasRenderingContext2D, gs: GameState) {
  for (const spill of gs.spills) {
    const x = spill.col * TILE_SIZE;
    const y = spill.row * TILE_SIZE;
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = P.spill;
    ctx.beginPath();
    ctx.ellipse(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.4 * spill.size, TILE_SIZE * 0.3 * spill.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    // mop icon
    ctx.fillStyle = '#E0E0FF';
    ctx.font = '10px monospace';
    ctx.fillText('🧹', x + 4, y + TILE_SIZE - 4);
  }
}

// ── Customers ──────────────────────────────────────────────
const ARCHETYPE_COLORS: Record<string, { body: string; hair: string }> = {
  collegeKid:         { body: '#607090', hair: '#503020' },
  tiredMom:           { body: '#D07090', hair: '#702020' },
  constructionWorker: { body: '#C08040', hair: '#A06020' },
  retiredVeteran:     { body: '#808060', hair: '#C0C0C0' },
  oneSockGuy:         { body: '#9090A0', hair: '#404040' },
};

function drawCustomer(ctx: CanvasRenderingContext2D, c: Customer, t: number) {
  const col = ARCHETYPE_COLORS[c.archetype] ?? { body: '#888888', hair: '#404040' };
  const cx = Math.round(c.x);
  const cy = Math.round(c.y);
  const bobY = c.state === 'leaving' || c.path.length > 0 ? Math.sin(t * 8) * 1 : 0;

  // body
  rect(ctx, cx - 6, cy - 8 + bobY, 12, 12, col.body);
  // head
  ctx.beginPath();
  ctx.arc(cx, cy - 12 + bobY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#F0D0A8';
  ctx.fill();
  // hair
  rect(ctx, cx - 6, cy - 18 + bobY, 12, 4, col.hair);

  // patience arc
  const pat = Math.max(0, c.patience);
  const patColor = pat > 0.6 ? '#40C060' : pat > 0.3 ? '#F0A020' : '#E03030';
  ctx.strokeStyle = '#00000040';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy - 22 + bobY, 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pat);
  ctx.stroke();
  ctx.strokeStyle = patColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy - 22 + bobY, 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pat);
  ctx.stroke();

  // anger indicator
  if (c.angry) {
    ctx.fillStyle = '#FF2020';
    ctx.font = '12px monospace';
    ctx.fillText('!', cx - 4, cy - 22 + bobY);
    // red border
    ctx.strokeStyle = '#FF4040';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 8, cy - 20 + bobY, 16, 20);
  }
}

function drawCustomers(ctx: CanvasRenderingContext2D, gs: GameState) {
  for (const c of gs.customers) {
    drawCustomer(ctx, c, gs.gameTime);
  }
}

// ── Retta ──────────────────────────────────────────────────
function drawRetta(ctx: CanvasRenderingContext2D, gs: GameState) {
  const { retta } = gs;
  const cx = Math.round(retta.x);
  const cy = Math.round(retta.y);
  const t = gs.gameTime;
  const bobY = retta.anim === 'walk' ? Math.sin(t * 10) * 2 : 0;

  // apron
  rect(ctx, cx - 7, cy - 6 + bobY, 14, 13, P.retApron);
  // dress
  rect(ctx, cx - 7, cy - 9 + bobY, 14, 10, P.retDress);
  // head
  ctx.beginPath();
  ctx.arc(cx, cy - 14 + bobY, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#F0D0A8';
  ctx.fill();
  // hair (silver perm)
  ctx.beginPath();
  ctx.arc(cx, cy - 16 + bobY, 7, Math.PI, 0);
  ctx.fillStyle = P.retHair;
  ctx.fill();
  // eyes
  ctx.fillStyle = '#303028';
  ctx.fillRect(cx - 3, cy - 15 + bobY, 2, 2);
  ctx.fillRect(cx + 1, cy - 15 + bobY, 2, 2);
  // smile
  ctx.strokeStyle = '#804030';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy - 13 + bobY, 3, 0, Math.PI);
  ctx.stroke();
  // glasses on head
  ctx.strokeStyle = '#C0A030';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx - 2, cy - 19 + bobY, 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 2, cy - 19 + bobY, 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - 19 + bobY);
  ctx.lineTo(cx + 2, cy - 19 + bobY);
  ctx.stroke();
  // shoes
  rect(ctx, cx - 8, cy + 4 + bobY, 6, 4, P.retShoes);
  rect(ctx, cx + 2, cy + 4 + bobY, 6, 4, P.retShoes);

  // action animation overlay
  if (retta.anim === 'repair') {
    ctx.fillStyle = '#F0A020';
    ctx.font = '12px monospace';
    ctx.fillText('🔧', cx + 6, cy - 16 + bobY);
  } else if (retta.anim === 'mop') {
    ctx.fillStyle = '#60A0D0';
    ctx.font = '12px monospace';
    ctx.fillText('🧹', cx + 6, cy - 16 + bobY);
  }

  // name
  ctx.fillStyle = '#F0E8C0';
  ctx.font = 'bold 7px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RETTA', cx, cy - 24 + bobY);
  ctx.textAlign = 'left';
}

// ── Staff ──────────────────────────────────────────────────
function drawStaff(ctx: CanvasRenderingContext2D, gs: GameState) {
  for (const s of gs.staff) {
    const cx = Math.round(s.x);
    const cy = Math.round(s.y);
    const t = gs.gameTime;
    const bobY = s.state === 'walking' ? Math.sin(t * 8) * 1 : 0;
    const col = s.role === 'wanda' ? P.staffWanda : P.staffDenny;

    // body
    rect(ctx, cx - 5, cy - 6 + bobY, 10, 10, col);
    // head
    ctx.beginPath();
    ctx.arc(cx, cy - 11 + bobY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#F0D0A8';
    ctx.fill();

    if (s.role === 'wanda') {
      // apron
      ctx.fillStyle = '#E0E8FF';
      ctx.fillRect(cx - 4, cy - 5 + bobY, 8, 8);
      // mop
      if (s.state === 'working') {
        ctx.fillStyle = '#60A0D0';
        ctx.font = '10px monospace';
        ctx.fillText('🧹', cx + 4, cy - 8 + bobY);
      }
    } else {
      // toolbelt
      rect(ctx, cx - 5, cy - 2 + bobY, 10, 3, '#906030');
      if (s.state === 'working') {
        ctx.fillStyle = '#F0A020';
        ctx.font = '10px monospace';
        ctx.fillText('🔧', cx + 4, cy - 8 + bobY);
      }
    }

    ctx.fillStyle = '#D0E8D0';
    ctx.font = '6px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(s.role === 'wanda' ? 'WANDA' : 'DENNY', cx, cy - 18 + bobY);
    ctx.textAlign = 'left';
  }
}

// ── Sign ───────────────────────────────────────────────────
function drawSign(ctx: CanvasRenderingContext2D, t: number) {
  const glow = Math.sin(t * 2) * 0.2 + 0.8;
  ctx.save();
  ctx.globalAlpha = glow;
  ctx.fillStyle = P.signNeon;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('WASH & WAGER', 320, 22);
  ctx.font = '7px monospace';
  ctx.fillStyle = '#F0D080';
  ctx.fillText("Retta's Laundromat", 320, 32);
  ctx.textAlign = 'left';
  ctx.restore();
}

// ── Voice line ─────────────────────────────────────────────
function drawVoiceLine(ctx: CanvasRenderingContext2D, gs: GameState) {
  if (!gs.voiceLine) return;
  const r = gs.retta;
  const x = Math.round(r.x);
  const y = Math.round(r.y) - 30;
  const text = gs.voiceLine.text;
  ctx.font = 'bold 7px monospace';
  const tw = ctx.measureText(text).width;
  const pad = 4;

  ctx.fillStyle = 'rgba(30,20,10,0.85)';
  ctx.beginPath();
  ctx.roundRect(x - tw / 2 - pad, y - 10, tw + pad * 2, 14, 3);
  ctx.fill();

  ctx.strokeStyle = '#F0D080';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - tw / 2 - pad, y - 10, tw + pad * 2, 14, 3);
  ctx.stroke();

  ctx.fillStyle = '#F0E8C0';
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y + 1);
  ctx.textAlign = 'left';
}

// ── Main render ────────────────────────────────────────────
export function render(ctx: CanvasRenderingContext2D, gs: GameState) {
  // clear
  ctx.fillStyle = P.bg;
  ctx.fillRect(0, 0, 640, 512);

  drawTiles(ctx, gs);
  drawSpills(ctx, gs);
  drawMachines(ctx, gs);
  drawCustomers(ctx, gs);
  drawStaff(ctx, gs);
  drawRetta(ctx, gs);
  drawSign(ctx, gs.gameTime);
  drawVoiceLine(ctx, gs);
}

// ── Hit detection helpers ──────────────────────────────────
export function getMachineAtPixel(gs: GameState, px: number, py: number): string | null {
  for (const m of gs.machines) {
    const pos = MACHINE_POSITIONS[m.id];
    if (!pos) continue;
    const x = pos.topLeft.col * TILE_SIZE;
    const y = pos.topLeft.row * TILE_SIZE;
    const W = (m.kind === 'washer' || m.kind === 'dryer' || m.kind === 'coinMachine') ? TILE_SIZE * 2 : TILE_SIZE * 2;
    const H = (m.kind === 'foldTable' || m.kind === 'vending') ? TILE_SIZE * 2 : TILE_SIZE;
    if (px >= x && px <= x + W && py >= y && py <= y + H) return m.id;
  }
  return null;
}

export function getSpillAtPixel(gs: GameState, px: number, py: number): string | null {
  for (const sp of gs.spills) {
    const cx = sp.col * TILE_SIZE + TILE_SIZE / 2;
    const cy = sp.row * TILE_SIZE + TILE_SIZE / 2;
    if (Math.abs(px - cx) < 16 && Math.abs(py - cy) < 16) return sp.id;
  }
  return null;
}

export function getCustomerAtPixel(gs: GameState, px: number, py: number): string | null {
  for (const c of gs.customers) {
    if (Math.abs(px - c.x) < 12 && Math.abs(py - c.y) < 16) return c.id;
  }
  return null;
}

export function isStorageDoorPixel(_gs: GameState, px: number, py: number): boolean {
  // storage door at col 11-12, row 14
  const c = Math.floor(px / TILE_SIZE);
  const r = Math.floor(py / TILE_SIZE);
  return r === 14 && (c === 11 || c === 12);
}

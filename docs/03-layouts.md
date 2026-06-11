# Sections 5–6: Laundromat Layouts

All layouts use a 32×32 pixel tile system. Coordinates listed as (column, row) from
top-left = (0, 0). The game camera is top-down, slightly isometric-friendly but readable
as a flat grid. One tile = 32×32 pixels on-screen at base zoom.

---

## Section 5: Starting Laundromat Layout

**Map name:** Retta's Wash & Wager (formerly Old Dewey's Wash-O-Rama)
**Starting map size:** 20 columns × 16 rows (640×512 px)
**Tile key:**

```
##  = solid wall (exterior brick, impassable)
..  = floor tile (walkable)
DD  = door (entrance)
WM  = washing machine
DR  = dryer
CM  = coin / change machine
FT  = folding table
VM  = vending machine
DS  = detergent shelf
CO  = counter / register
OF  = office chair / Retta's desk
BN  = bench (waiting seat)
TR  = trash can
MO  = mop bucket / janitor corner
BA  = bathroom door
ST  = storage room door (Chapter 1–3: locked; Chapter 4: secret door)
LP  = potted plant (decoration)
SI  = sign board (exterior)
WD  = window
~~  = wet floor / spill tile (dynamic)
```

### Starting Map Grid (20×16)

```
col→  00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19
row↓
 00   ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
 01   ## SI SI SI SI SI SI SI SI SI SI SI SI SI SI SI SI SI SI ##
 02   ## WD WD .. .. .. .. .. .. .. .. .. .. .. .. .. WD WD WD ##
 03   ## ## ## ## ## DD ## ## ## ## ## ## ## ## ## ## ## ## ## ##
 04   ## BN BN .. .. .. .. .. .. .. .. .. .. .. .. .. .. BN BN ##
 05   ## BN .. .. WM WM WM WM .. .. DR DR DR DR .. .. .. .. .. ##
 06   ## .. .. .. WM WM WM WM .. .. DR DR DR DR .. .. VM VM .. ##
 07   ## .. .. .. WM WM WM WM .. .. DR DR DR DR .. .. VM .. .. ##
 08   ## MO .. .. WM WM WM WM .. .. DR DR DR DR .. .. DS DS .. ##
 09   ## .. .. .. .. .. .. .. .. .. .. .. .. .. FT FT FT FT .. ##
 10   ## .. .. .. .. .. .. .. .. .. .. .. .. .. FT FT FT FT .. ##
 11   ## .. .. CM CM .. .. .. .. .. .. .. .. .. .. TR .. .. .. ##
 12   ## .. CO CO CO OF .. .. .. .. .. .. .. .. .. .. .. .. .. ##
 13   ## .. CO CO CO .. .. .. .. .. .. BA BA BA BA BA .. .. .. ##
 14   ## ## ## ## ## ## ## ## ## ## ## ST ST ST ## ## ## ## ## ##
 15   ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
```

### Room-by-Room Description

**ENTRANCE AREA (rows 3–4, center)**
- Single front door (DD) at column 5, row 3. Exterior sign above (row 1–2).
- Two small benches (BN) along the left and right of the entrance hall (row 4).
- This is where customers spawn and where angry customers gravitate.
- Space for 6–8 waiting customers before the patience meter hits hard.

**WASHER ROW (cols 4–7, rows 5–8)**
- 4× Washing machines in a 2-wide, 4-tall block.
- Each washer is a 2×1 tile unit (shown as WM WM on each row).
- Machines face "south" (toward the center aisle) — customer walks to south tile to interact.
- Gap tile on left (col 3) is the service access path for Retta/staff.
- Starting state: machines are at Level 1, dull gray, slow cycle.

**DRYER ROW (cols 10–13, rows 5–8)**
- 4× Dryers in a mirror layout to the washers.
- Same 2×1 tile structure per unit.
- Service path at right side (col 14).
- Lint trap icon spawns above machine when full.

**VENDING MACHINE CORNER (cols 15–16, rows 6–8)**
- 1× Vending machine (2×3 tile block, VM).
- Customers can buy snacks, drinks, and laundry supplies here between cycles.
- Restock icon appears when depleted.

**DETERGENT SHELF (cols 16–17, rows 8)**
- 1× Detergent shelf (2×1 wide, DS).
- Customers with no detergent buy a small packet here.
- Restock trigger appears when low.

**FOLDING TABLE AREA (cols 13–17, rows 9–10)**
- 2× Folding tables side by side (4-tile each, FT).
- Customers move here after dryer cycle completes to fold laundry.
- Folding generates a small "tip" bonus if a customer is happy.
- A 3rd folding table is unlockable (row 9, cols 9–12).

**COIN / CHANGE MACHINE (cols 3–4, row 11)**
- 1× Coin/change machine (2×1, CM).
- Customers go here first to convert bills to quarters.
- Jamming event is common early-game.

**COUNTER & OFFICE (cols 1–4, rows 12)**
- Retta's counter (3-tile wide, CO CO CO) with register.
- Office chair (OF) is Retta's default idle position.
- Player income summary, daily log.

**BATHROOM (cols 10–14, rows 13)**
- 5-tile bathroom block (BA) along south wall.
- Requires mopping after use (occasional event).
- Upgradeable (better tile, air freshener, hand dryer).

**STORAGE / SECRET DOOR (cols 11–12, row 14)**
- ST tile: initially shows as a plain door labeled "Storage."
- After Chapter 4: becomes the hidden backroom entrance.
- In later chapters: fake bookshelf covers these two tiles.
- Door uses a secret knock panel once upgraded.

**JANITOR CORNER (col 0–1, row 8)**
- 1× Mop bucket (MO).
- Spill events spawn on floor tiles randomly.
- Mop bucket's tile is where the cleaner staff idles when not working.

**WINDOWS (row 2, cols 1–3 and 15–17)**
- Decorative but affect mood: dirty windows reduce customer satisfaction slightly.
- Window-cleaning is an occasional optional task.

---

### Customer Flow (Starting Layout)

```
ENTER (row 3)
   ↓
COIN MACHINE (row 11) ← customer converts bills to quarters
   ↓
WASHER (rows 5–8) ← customer loads machine, starts cycle, waits nearby
   ↓
WAIT (benches / aisle) ← patience timer ticks
   ↓
DETERGENT SHELF (row 8) ← optional purchase
VENDING MACHINE (rows 6–8) ← optional snack purchase
   ↓
DRYER (rows 5–8) ← customer moves laundry from washer to dryer
   ↓
FOLDING TABLE (rows 9–10) ← customer folds, earns a tip bonus
   ↓
EXIT (row 3)
```

---

## Section 6: Expansion Layout

Expansions happen in 5 phases. Each phase unlocks as the player completes chapter milestones
or purchases a specific expansion blueprint. The building grows outward or gains new rooms.

### Phase 1 — "Comfort Upgrade" (Chapter 2–3)
**What changes:**
- Waiting lounge formalized: benches replaced with cushioned seats (col 1–3 and 16–18, rows 4–5).
- Coffee station added at col 17–18, row 4 (1×2 tile unit).
- Magazine rack at col 18, row 5.
- Wall TV stub at col 0–1, row 5.
- New floor tile (from cracked linoleum to clean checkered).
- Exterior sign upgraded (neon lights added to SI tiles).

**New map size:** 20×18 (two extra rows added at bottom for staff room foundation).

### Phase 2 — "Backroom Begins" (Chapter 4)
**What changes:**
- Storage room door (col 11–12, row 14) now connects to a new backroom section.
- **Backroom (Phase 1):** 8 columns × 6 rows appended below the south wall.
  - Map now: 20 columns × 22 rows total.
  - Backroom tiles sit below row 14 (rows 16–21, shifted by an alley gap at row 15).

**Backroom Phase 1 layout (8×6):**
```
col→  11 12 13 14 15 16 17 18
row↓
 16   ## ## AL AL AL AL ## ##   (AL = alley entrance, exterior tiles)
 17   ## .. .. .. .. .. .. ##
 18   ## .. CT CT CT CT .. ##   (CT = card table)
 19   ## .. .. .. .. .. .. ##
 20   ## .. .. FS FS .. .. ##   (FS = fake storage shelf cover)
 21   ## ## ## ## ## ## ## ##
```

### Phase 3 — "Full Backroom" (Chapter 5–6)
**Backroom Phase 2 layout (12×10):**
```
col→  09 10 11 12 13 14 15 16 17 18 19 20
row↓
 16   ## ## AL AL AL AL AL AL ## ## ## ##
 17   ## .. .. .. .. .. .. .. .. .. .. ##
 18   ## .. BB BB BB .. SL SL .. .. .. ##   (BB=bingo board, SL=slot machine)
 19   ## .. FT FT FT FT FT FT FT .. .. ##
 20   ## .. FT FT FT FT FT FT FT .. .. ##
 21   ## .. SK SK SK .. CT CT CT CT .. ##   (SK=snack bar, CT=card table)
 22   ## .. .. VR VR VR .. .. .. .. .. ##   (VR=velvet rope / VIP placeholder)
 23   ## ## .. .. .. .. AE AE ## ## ## ##   (AE=alley exit 2 / escape hallway)
 24   ## ## ## ## ## ## ## ## ## ## ## ##
```

### Phase 4 — "Going Pro" (Chapter 7–8)
**What changes (front):**
- Arcade corner added to front laundromat (col 16–18, rows 5–7):
  - 2× Arcade cabinet (decorative, boosts wait-time patience 20%).
  - Small rug tile.
- Snack corner (col 0–2, rows 9–10):
  - 1× Upgraded vending machine (hot food option).
  - 1× Counter stool × 3.
- Staff room (col 0–2, rows 13–14):
  - Staff locker, break table, 2× chair. This is where idle staff wait.
- Premium washer section: Washer 5 and 6 added at col 5–8, rows 9–10 (or shifted depending on Phase 3 expansion direction). These use a separate "premium" tile style.

**What changes (backroom):**
- VIP Corner formalized (Phase 4 layout, rows 22–24, cols 11–16):
  - 2× VIP tables (rounded corner visual style).
  - Velvet rope tile.
  - Mood lighting (ceiling glow layer effect).
  - Private snack station.
- Poker table (6-seat circle tile, 3×3 footprint, col 12–14, row 18–20).
- Lucky Wheel (2×2 tile, col 18–19, row 18–19).
- Lookout camera monitor (1×1 tile, col 9, row 17 — staff-operated).

### Phase 5 — "The Full Lint Trap" (Chapter 8–9+)
**What changes (entire building):**
- Soundproof wall added between backroom and main laundromat (visible as thick wall tiles row 15).
- Fake storage room corridor (3-tile wide, 4-tile deep, between the hidden door and backroom proper):
  - Has actual detergent boxes and mop handles.
  - Inspectors who peer in see a normal storage room.
- Escape hallway fully built: 12-tile-long narrow corridor leading to a back parking lot exit.
- Front exterior: new painted facade, awning over entrance, planters.
- Map total at full expansion: 24 columns × 26 rows.

### Visual Summary (Full Expansion, Top-Down)

```
┌────────────────────────────────────────┐  ← Exterior / Signage
│  [FRONT ENTRANCE]                      │
│  Benches  Coffee    Arcade  Vending    │
│                                        │
│  [WASHER ROW 1]   [DRYER ROW 1]        │
│  [WASHER ROW 2]   [DRYER ROW 2]        │  ← Premium washers
│  [COIN MACH]  [FOLDING TABLES]         │
│  [COUNTER]  [OFFICE]  [STAFF ROOM]     │
│  [BATHROOM]  [SNACK CORNER]            │
│  ─────── [FAKE STORAGE SHELF] ──────   │  ← Hidden door
│                                        │
│  [FAKE STORAGE CORRIDOR]               │
│  ─────── [SOUNDPROOF WALL] ──────      │
│                                        │
│  [BINGO]  [SLOTS]  [LUCKY WHEEL]       │
│  [POKER TABLE]  [CARD TABLE]           │
│  [VIP CORNER]   [SNACK BAR]            │
│  ─────── [ESCAPE HALLWAY] ────────     │
└────────────────────────────────────────┘  ← Alley exit
```

---

### Tile Visual Styles by Area

| Area | Floor Tile | Wall Color | Lighting |
|---|---|---|---|
| Entrance | Worn beige tile | Cream paint, faded | Bright fluorescent |
| Washer/Dryer rows | Gray utility tile | Mint green paint | Fluorescent strip |
| Lounge | Warm tan carpet | Off-white, potted plants | Warm yellow |
| Bathroom | White hex tile | Pale blue | Overhead single bulb |
| Counter/Office | Hardwood plank | Paneled wood | Desk lamp, warm |
| Backroom (early) | Concrete | Bare brick | Single bare bulb |
| Backroom (Phase 2+) | Dark wood | Deep teal/navy | Neon accent strips |
| VIP Corner | Plush rug | Velvet wall panel | Warm amber spotlights |
| Escape Hallway | Bare concrete | Unpainted brick | Emergency strip light |

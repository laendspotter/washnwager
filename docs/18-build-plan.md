# Sections 24–25: MVP Build Plan & Version Roadmap

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build / bundle | Vite (dev) + Parcel via `web-artifacts-builder` skill (production bundle) |
| Styling | Tailwind CSS + shadcn/ui (for menus, panels, overlays) |
| Game rendering | HTML5 Canvas 2D (game world rendered on `<canvas>`, React manages all UI panels) |
| Sprites | Code-drawn 32×32 pixel sprites (Canvas drawing functions, no external assets in MVP) |
| State management | React `useReducer` + Context (game state) — no external state library needed for MVP |
| Output | Single self-contained `bundle.html` (all JS + CSS inlined) — shareable with friends |

### Architecture Pattern

```
React App Shell
├── <GameCanvas />     ← HTML5 Canvas game world (Retta, tiles, customers, machines)
├── <TopBar />         ← Money, Heat, Reputation (React/Tailwind overlay)
├── <BottomNav />      ← Front/Back/Staff/Fix tabs
├── <TaskQueue />      ← Slide-up panel
├── <UpgradeMenu />    ← Modal/drawer
├── <StaffMenu />      ← Modal/drawer
├── <EventPopup />     ← Dialogue events
├── <DialogueBox />    ← Cutscene dialogue
└── <ChapterComplete/> ← Full-screen overlay
```

The Canvas and React UI **layers** share game state via Context. The Canvas does not
know about React; it receives a `gameState` prop and calls render on each animation frame.

---

## MVP Build Plan (Version 0.1)

Target: **Minimum playable, shareable single HTML file**

### What's in MVP

**Map & World:**
- 20×16 tile map (starting laundromat layout, exact as Section 5)
- Tile rendering: floor tiles (F01, F03), wall tiles (W02, W03), all front-room furniture
- Player character (Retta) fully drawn in code — all 9 animation states
- Top-down camera, tap-to-move pathfinding (A* or simple BFS on the tile grid)

**Machines:**
- 4 washers (L1 only), 4 dryers (L1 only)
- Coin machine (L1), folding table (L1), vending machine (L1)
- Each machine: idle → running timer → complete → coin collection state
- Breakdown events (random timer per machine)
- Lint trap for dryers

**Customers (5 types in MVP):**
- College Kid, Tired Mom, Construction Worker, Retired Veteran, One-Sock Guy
- Customer spawn → pathfind to coin machine → pathfind to washer → wait → dryer → fold → exit
- Patience meter (arc above head, green → red)
- Angry exit animation

**Player Actions:**
- Tap-to-move Retta
- Tap coin bag → collect
- Tap broken machine → repair
- Tap spill → mop
- Tap angry customer → calm (no ability cost in MVP — just a button)

**Money System:**
- Starting money: $350
- All machine income per cycle (washer/dryer/vending/folding tip)
- No staff wages in MVP (staff hired but wages deducted as a simple periodic event)

**Simple Upgrades:**
- Washers L1→L2→L3 (price, speed effect, visual change)
- Dryers L1→L2→L3
- Vending machine L1→L2
- Detergent shelf L1→L2
- Seating L1→L2

**Staff (2 in MVP):**
- Wanda (cleaner) — auto-mops spills if idle
- Denny (repair guy) — auto-repairs broken machines if idle
- Simple hire overlay, weekly wage tick

**Story (Chapter 1 only in MVP):**
- Opening cutscene (4 dialogue panels, text only — no voice)
- Roy's introduction dialogue (Chapter 1 trigger)
- Dewey's manual event (end of Chapter 1)
- Chapter 1 complete screen

**Backroom Teaser:**
- Storage room door visible on the map (ST tile)
- Tapping it in Chapter 1: *"The door sticks. You should come back to this later."*
- No backroom content yet — just the setup

**Heat Meter:**
- Heat bar in top bar (visible from start, shows 0)
- No Heat events in MVP (Chapter 1 is heat-free)
- Placeholder functionality: Heat can be manually raised via dev console for testing

**5 Dialogue Events (MVP selection):**
- Event 01 — "The Knock" (triggers at random during play)
- Event 04 — "Washing Machine Flood"
- Event 08 — "The Kid and the Poker Chip"
- Event 09 — "The Slot Machine Sings" (but the slot machine hasn't been installed yet — reframe as "the dryer makes a weird sound")
- Event 37 — "The New Washer Makes a Weird Sound" (natural fit for MVP)

**UI:**
- Top bar (money, heat placeholder, reputation placeholder)
- Bottom nav (Front tab only; Back tab grayed with lock)
- Task queue panel (basic 3-item version)
- Upgrade menu (front only, limited items)
- Staff menu (2 staff slots)
- Event popup (3 options)
- Dialogue window (cutscene style)
- Chapter complete screen (Chapter 1 only)

---

### MVP File Structure

```
/wash-and-wager/
├── index.html
├── src/
│   ├── main.tsx                    ← React entry, canvas setup
│   ├── App.tsx                     ← Root component, game loop
│   ├── game/
│   │   ├── GameState.ts            ← All game state types
│   │   ├── gameReducer.ts          ← State transitions
│   │   ├── loop.ts                 ← requestAnimationFrame loop
│   │   ├── pathfinding.ts          ← A* tile pathfinding
│   │   ├── customerAI.ts           ← Customer behavior state machine
│   │   ├── machineSystem.ts        ← Machine timers, breakdown logic
│   │   ├── eventSystem.ts          ← Dialogue event triggers
│   │   └── chapterSystem.ts        ← Chapter goal tracking
│   ├── canvas/
│   │   ├── renderer.ts             ← Main canvas render function
│   │   ├── tileMap.ts              ← Tile rendering
│   │   └── sprites/
│   │       ├── drawRetta.ts        ← Retta draw functions
│   │       ├── drawCustomers.ts    ← Per-archetype draw functions
│   │       ├── drawMachines.ts     ← Machine draw functions
│   │       ├── drawFurniture.ts    ← Furniture draw functions
│   │       └── drawEffects.ts      ← Particles and effects
│   ├── ui/
│   │   ├── TopBar.tsx
│   │   ├── BottomNav.tsx
│   │   ├── TaskQueue.tsx
│   │   ├── UpgradeMenu.tsx
│   │   ├── StaffMenu.tsx
│   │   ├── EventPopup.tsx
│   │   ├── DialogueBox.tsx
│   │   └── ChapterComplete.tsx
│   ├── data/
│   │   ├── machines.ts             ← Machine definitions, upgrade data
│   │   ├── customers.ts            ← Customer archetype definitions
│   │   ├── staff.ts                ← Staff definitions
│   │   ├── upgrades.ts             ← All upgrade trees
│   │   ├── events.ts               ← 40 event definitions
│   │   ├── chapters.ts             ← Chapter goals and rewards
│   │   └── economy.ts              ← Income rates, costs
│   └── constants/
│       ├── tilemap.ts              ← Starting layout grid data
│       ├── colors.ts               ← Sprite color palettes
│       └── config.ts               ← Tuning constants
└── bundle.html                     ← Output (Parcel bundle)
```

---

### MVP Development Sequence

**Week 1:** Core Canvas loop, tile map rendering, Retta movement, basic machine states
**Week 2:** Customer AI (spawn → machine → wait → fold → exit), patience meter, coin collect
**Week 3:** Breakdowns, mop spills, lint traps, first staff (Wanda auto-mop)
**Week 4:** Upgrade menu (front room, 3 machines), Chapter 1 story beats, chapter complete
**Week 5:** Polish, 5 dialogue events, backroom door teaser, bundle to HTML

---

## Version 0.2 — "Backroom Begins"

**Target:** Chapter 2–4 playable. Backroom opens.

**New in 0.2:**
- All 9 customer types
- Full Chapter 2 and 3 (customer patience system, competition-lite)
- Staff system: all 9 roles hireable
- Backroom tab unlocks in Chapter 4
- Backroom Phase 1 map: card table, sweet tea station, alley entrance
- Heat Meter becomes functional (raisers, lowers, threshold events at 25)
- Roy Macabee as a full recurring character
- Darlene Hooks introduced
- 4 ability slots (Sweet Tea Distraction, Grandma Stare, Bless Your Heart, Hush Now)
- Roy, Darlene as Tier 1 backroom regulars
- 20 dialogue events added (Events 01–20)
- Quest system (Q01–Q20 active)

**Additional tech:**
- Second canvas layer for backroom (same renderer, different tilemap data)
- Customer AI backroom variant (spawn from alley, play at table, leave via alley)
- Ability cooldown system in game state
- Recurring NPC tracking (Clem patrol schedule, Connie gossip meter)

---

## Version 0.3 — "The Full Lint Trap"

**Target:** Chapters 5–8 fully playable. Full backroom operation.

**New in 0.3:**
- Bingo mini-game (tap number tiles as called)
- Slot machine system (passive income + jackpot events)
- Lucky Wheel
- Poker table (simplified hand evaluation for comedy outcome — no real poker engine needed)
- All 17 backroom customer types
- VIP Corner
- Wade Pruett as active rival (Chapter 7 competition mechanic)
- Gerald Finch inspection system (timed challenge, multi-room)
- Connie's Gossip Meter full implementation
- Heat system at all thresholds (25/50/75/100)
- Heat-100 crisis event fully playable
- All 9 abilities functional + upgradeable
- Backroom expansion Phase 1 and 2 map
- Soundproofing, hidden door, escape hallway all functional
- All 40 dialogue events (Events 21–40 added)
- Quest system (Q21–Q40 added)
- Achievement tracking (all 40 defined)
- Reputation system (all 3 bars active)

**Additional tech:**
- Crisis event multi-task sequencer (simultaneous events)
- NPC confrontation system (Clem befriending track)
- Backroom ambient music layer crossfade
- Camera zoom on crisis events

---

## Version 0.4 — "Peavine Polished"

**Target:** Chapters 9–10. Full game playable. Quality pass.

**New in 0.4:**
- Chapter 9 triple-threat event (Clem + Gerald + Connie simultaneously)
- Chapter 10 Jubilee chapter with festival map extension
- All 3 ending cutscenes (A/B/C based on Heat at Jubilee)
- Post-game: daily events, seasonal events, endless mode teaser
- Barry Nell reporter NPC (Chapter 10)
- Full Jubilee Crisis event (5-simultaneous-task sequence)
- All 50 quests fully implemented
- All 40 achievements fully implemented
- Full sound design integration (all tracks, all SFX)
- Full ambient sound system
- Retta's 30 voice line bubbles all in
- Staff personality dialogue during events
- End credits sequence

**Polish:**
- Performance optimization for older mobile browsers
- Canvas resolution scaling for retina displays
- Full save/load (localStorage)
- Settings menu (volume, speed)
- Accessibility: text size option, colorblind mode for heat meter

---

## Version 1.0 — "Wash & Wager: Complete"

**The full release for your friend group.**

**New in 1.0:**
- Post-game content: Chapter 11 teaser ("The Lint Trap's Big Plans")
- Additional backroom games: keno board, horse racing board (wall-mounted, comedic)
- 10 additional dialogue events (total 50)
- 10 additional quests (total 60)
- Full save slot system (3 save files)
- Daily challenges
- Seasonal events (Christmas bingo, Valentine's poker night, Texas Independence Day Jubilee)
- Retta's wardrobe: 3 unlockable outfits (holiday, fancy night out, "suspiciously casual")
- Earl Jr.'s full story DLC-style bonus scenes
- Wade Pruett redemption arc event (optional)
- Clem's retirement party event (post-game unlock)
- Performance: < 60ms frame time on mid-range Android
- Zero-dependency build — truly self-contained HTML

**Version 1.0 bundle target:** Single `wash-and-wager.html` under 5MB, opening instantly in
any modern browser, playable offline. Send it to friends via Discord, email, or USB drive.
No server required. No install required. Just Retta and her laundromat.

---

## Notes for the Developer

1. **Start with the Canvas loop and Retta movement.** Everything else builds on top.
2. **Customer AI is the heart of the game** — make it feel alive early.
3. **Don't add backroom until front laundromat is fun** — the best double-life feeling
   comes from having invested in the "normal" side first.
4. **Data-drive everything** — machines, customers, events, chapters are all data in
   `data/` files. The game logic reads from them. This makes balancing fast.
5. **The `web-artifacts-builder` skill** handles the `bundle.html` step. Run:
   ```bash
   bash scripts/init-artifact.sh wash-and-wager
   cd wash-and-wager
   # develop…
   bash scripts/bundle-artifact.sh
   ```
6. **Replace code-drawn sprites with real pixel art** any time by swapping the draw
   functions in `sprites/` for `ctx.drawImage(spriteSheet, ...)` calls. No other code changes.

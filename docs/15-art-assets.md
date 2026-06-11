# Section 21: Art Asset List

All sprites are designed for **32×32 pixel** grid. The MVP renders these as **code-drawn
pixel-art sprites** (procedurally drawn using canvas drawing commands — no external image
files required for the first build). This section serves as both an asset specification
for hand-drawn sprites and a code-drawing spec for the MVP.

Visual style guide: chunky pixel art, warm color palette, chibi proportions for characters,
top-down perspective with slight vertical bias (think early Pokémon overhead style).

---

## FLOOR TILES (Terrain Layer)

All floor tiles are 32×32 px, seamlessly tileable.

| ID | Name | Description | MVP colors |
|---|---|---|---|
| F01 | Cracked Linoleum | Gray with irregular crack lines (3-4 dark px lines) | #A0A0A0 with #707070 cracks |
| F02 | Clean Linoleum | Smooth gray, subtle shine pixel | #B8B8B8 |
| F03 | Checkered Tile | Classic black/white checker (16×16 sub-tiles) | #F0F0F0 / #202020 |
| F04 | Warm Wood | Horizontal grain lines, warm brown | #8B5E3C grain on #A0703A |
| F05 | Hex Tile | Bathroom-style white hex pattern on light gray | #ECECEC / #D0D0D0 |
| F06 | Concrete (backroom) | Rough gray with speckle | #888880 speckle #707068 |
| F07 | Dark Wood (backroom) | Darker plank, horizontal grain | #4A3020 / #3A2010 |
| F08 | Plush Rug (VIP) | Deep burgundy, faint diamond pattern | #6B1A2A with #7B2A3A |
| F09 | Alley Concrete | Weathered gray, crack occasional | #787878 / #606060 |
| F10 | Wet Floor | Animated (shimmer layer over F01–F02) | Blue shimmer over base tile |

---

## WALL TILES (Wall Layer)

| ID | Name | Description | MVP colors |
|---|---|---|---|
| W01 | Exterior Brick | Orange-red brick pattern, 4px mortar | #C06020 brick, #908060 mortar |
| W02 | Interior Cream | Flat cream paint, subtle vertical lines | #F0E8D0 |
| W03 | Interior Mint | Classic laundromat mint-green paint | #90C8A8 |
| W04 | Interior Navy | Backroom deep blue | #1A2A50 |
| W05 | Bare Brick (backroom) | Exposed red-brown brick | #8B4030 |
| W06 | Acoustic Panel | Dark gray with small pixel-dots texture | #404040 with #4A4A4A dots |
| W07 | Velvet Panel (VIP) | Deep wine red, solid | #5A0A1A |
| W08 | Fake Shelf Wall | Bookshelf graphic on wall tile (trompe l'oeil) | Brown shelves #7A4020 on cream |

---

## MACHINE SPRITES

All machines: 2×1 or 2×2 tile footprint. Front-facing (customer approaches from south tile).

### Washing Machines (L1–L5)
Each level has distinct visual progression:

| Level | Visual description | Color palette |
|---|---|---|
| L1 | Dented boxy shape, rust patches, round porthole | #B0B0A0 body, #804020 rust spots |
| L2 | Clean rectangle, smooth porthole, decal sticker | #D0D0C8 body, #4080C0 decal |
| L3 | Taller, wider, smooth white, black accents | #F0F0F0 body, #202020 trim |
| L4 | Chrome highlights, LED ring around porthole | #D8E8F0 chrome, #4090D0 LED |
| L5 | Full chrome, glowing porthole, floating coins aura | #E8F0F8 chrome, #80C0FF glow |

**Porthole animation:** 4-frame rotation cycle (diagonal lines spinning inside circle).
**Coin collect animation:** Coin bag (yellow circle) floats up from machine, bobbing.
**Broken state:** Red "X" overlay + wrench icon floating above.
**Lint trap full (dryers only):** Orange triangle with lint puff above the machine.

### Dryers (L1–L5)
Similar structure to washers but:
- Slightly more square/boxy
- Porthole is door-style (hinged left side)
- L1: vintage beige #D8C880, dented
- L5: matte white #F8F8F8, glowing round window

### Coin / Change Machine (L1–L5)
- L1: Short boxy rectangle, green screen, bill slot, coin tray
  Base: #484840, screen: #40C040
- L5: Tall sleek kiosk, full touch screen, card tap
  Base: #303038, screen: #60A0FF

### Vending Machine (L1–L5)
- L1: Single column, yellowed glass, one light working
  Base: #C8A040, glass: #A0C880 faint
- L5: Double-width combo unit, bright display, coffee steam animation
  Base: #2040A0, display: #80C0FF, steam: white puff 3-frame

### Folding Table (L1–L5)
- L1: Plastic table, gray, wobbly pixel lines at legs
- L5: Wide marble-pattern table, gold edge trim

---

## FURNITURE SPRITES

| ID | Name | Size | Visual |
|---|---|---|---|
| FN01 | Bench (wooden) | 2×1 | Dark brown plank, two legs |
| FN02 | Cushioned seat | 1×1 | Warm green upholstery |
| FN03 | Armchair (lounge) | 1×1 | Teal/gold arm chair, rounded |
| FN04 | Counter (section) | 1×1 (tiled) | Wood-front, white top |
| FN05 | Office desk | 1×1 | Small desk, paper clutter pixel |
| FN06 | Tip jar | 1×1 | Glass jar, coin shimmer |
| FN07 | Magazine rack | 1×1 | Metal frame, colorful cover stack |
| FN08 | Wall TV | 1×1 (wall-mounted) | Gray rectangle, blue screen glow |
| FN09 | Coffee station | 1×1 | Small cart, warm steam puff |
| FN10 | Staff locker | 1×1 | Metal door, small padlock pixel |
| FN11 | Card table (backroom) | 2×2 | Green felt, wood edges |
| FN12 | Poker table | 3×3 | Oval green felt, chip trays, 6 seats |
| FN13 | Bingo board | 2×1 (wall) | White board, colored number dots |
| FN14 | Slot machine | 1×2 | Colorful cabinet, spinning reel window |
| FN15 | Lucky wheel | 2×2 | Circular wheel, colored segments, pointer |
| FN16 | VIP table | 2×1 | Round, dark wood, tea set |
| FN17 | Velvet rope | 1×1 (connector) | Red rope on gold post |
| FN18 | Snack bar counter | 2×1 | Countertop, small appliances |
| FN19 | Popcorn machine | 1×1 | Red/yellow cabinet, puffing animation |
| FN20 | Drink cooler | 1×1 | Glass-front fridge, condensation |

---

## CHARACTER SPRITES

All characters: 16×24 px chibi (on a 32×32 tile), centered.
Each has: idle, walk (4-frame), action, happy, angry states.

### Main Character: Retta Hollis
(Full description in Section 14 / docs/10-grandma.md)
- 9 animation states as listed
- Color: lavender/pink housedress, silver hair, cream shoes

### Customer Sprites (per archetype type)
Each customer archetype needs distinct silhouette and color coding at tiny scale.

| Archetype | Key visual detail | Color hint |
|---|---|---|
| College Kid | Hoodie, backpack, laundry garbage bag | Gray hoodie, blue bag |
| Tired Mom | Stroller pixel, messy bun, 3 laundry bags | Warm pink top |
| Construction Worker | Hard hat (carried), work boots | Orange hard hat, tan shirt |
| Fancy Lady | Hair up, holding bag at arm's length | Purple/gold outfit |
| Broke Teenager | Earbuds, slouch, too-small laundry pile | Dark hoodie |
| Retired Veteran | Cap, newspaper under arm, perfect posture | Olive cap, beige shirt |
| One-Sock Guy | Mismatched socks visible on sprite | Striped sock |
| Gossip Neighbor | Phone in hand, head turned | Pink cardigan |
| Impatient Businessman | Tie, phone to ear, small bag | Blue tie, white shirt |
| Chaotic Family | 2 adult sprites + tiny child sprites (3) | Mixed, colorful kids |

**Patience indicator:** Colored arc above customer's head: green → yellow → orange → red.
**Speech bubble:** Appears for complaints. Rounded rect, white bg, black text, 1–3 words.
**Walking:** 4-frame side-walk cycle. Customer walks straight to destination tile.
**Happy state:** Small yellow star burst above head (1-frame flash).
**Angry state:** Red jagged exclamation cloud above head (2-frame wobble).
**Leaving angry:** Customer stomps 2 steps toward door, small dust cloud, exit.

### Staff Sprites
Same 16×24 chibi with job-specific visual identity:

| Staff | Visual detail |
|---|---|
| Wanda | Cleaning apron, mop in hand-slot, sensible shoes |
| Denny | Toolbelt, safety goggles on head, screwdriver carry |
| Terri | Smart vest, name tag, big smile pixel |
| Hector | Clipboard, stocking cart (1×1 wheeled asset) |
| Big Lorene | Floor manager vest, earpiece dot |
| Bubba | Dark shirt, hands at sides, larger build (24×24 effective) |
| Carlotta | Elegant blouse, name tag, bingo dauber in pocket |
| Kev | Headset, small monitor asset nearby, no eye contact |
| Earl Jr. | Dress shirt, worried-eyebrow pixel, binder under arm |

---

## BACKROOM PROP SPRITES

| ID | Name | Size | Description |
|---|---|---|---|
| BP01 | "Nothing to See Here" sign | 1×1 (wall) | Hand-painted cardboard, amateur font |
| BP02 | "Totally Legal Bingo Night" banner | 2×1 (wall) | Colorful, church-social style |
| BP03 | Trophy case | 1×2 | Glass case, 3 small trophies |
| BP04 | Mood lighting strip | 1×1 (ceiling) | Neon color strip, glow radius |
| BP05 | Acoustic foam tile | 1×1 (wall) | Dark gray wedge-foam texture |
| BP06 | Fake bookshelf (door cover) | 2×2 | Books + decorative items |
| BP07 | Lucky charm jar | 1×1 | Glass jar, glowing pixel |
| BP08 | Sweet tea station | 1×1 | Pitcher, glasses, ice pixel |
| BP09 | Emergency button | 1×1 (wall) | Red button under flip-cover |
| BP10 | Lookout camera monitor | 1×1 | Small screen, 4 static feeds |
| BP11 | "The Lint Trap" sign | 2×1 | Neon tubing, warm pink/gold text |
| BP12 | Bingo dauber set | 1×1 | Daubers in cup (Darlene's station) |
| BP13 | Chip rack | 1×1 | Chip tower, colorful layers |
| BP14 | Escape hallway door | 1×1 | Plain door, exit sign above |

---

## EXTERIOR SPRITES

| ID | Name | Description |
|---|---|---|
| EX01 | Building facade (level 1) | Brick front, broken neon, boarded window |
| EX02 | Building facade (level 2) | Painted front, working neon "Wash & Wager" |
| EX03 | Building facade (level 5) | Full neon sculpture, awning, potted plants |
| EX04 | Alley exterior | Narrow brick alley, dumpster tile, overhead lamp |
| EX05 | Wade's Laundromat | Across street: clean, boring, blue & white |
| EX06 | Parking lot | Gray tiles, stripe lines, 4 car sprites |
| EX07 | Street tile | Road + sidewalk + occasional parked car |
| EX08 | Jubilee tent | Striped fabric tent, banner, lights |

---

## EFFECT SPRITES & PARTICLES

| ID | Effect | Description |
|---|---|---|
| EF01 | Coin pop | Gold circle expands, shrinks, floats up |
| EF02 | Sparkle | 4-point star, cycles 3 frames |
| EF03 | Steam puff | White cloud expands and fades, 4 frames |
| EF04 | Anger cloud | Red jagged blob, 2-frame wobble |
| EF05 | Sweat drop | Classic anime sweat bead |
| EF06 | Question mark | Floats above NPC, 2-frame bob |
| EF07 | Exclamation | Red "!" floats, 2-frame flash |
| EF08 | Wrench icon | Orange wrench, floats above broken machine |
| EF09 | Heat shimmer | Distortion ripple above Retta when stressed |
| EF10 | Jackpot burst | Stars + coins explosion, 6-frame |
| EF11 | Hush cloud | Sound wave with X, 3-frame |
| EF12 | Speed lines | Retta in motion background |
| EF13 | Bluff halo | Dryer sheets orbiting Retta, 4-frame |

---

## UI PANEL SPRITES

| ID | Element | Description |
|---|---|---|
| UI01 | Event popup frame | Dark wood frame, rounded corners |
| UI02 | Dialogue box | Semi-transparent dark panel, bottom-screen |
| UI03 | Option buttons (A/B/C) | Light card with gold letter |
| UI04 | Chapter complete bg | Amber gradient with confetti pixels |
| UI05 | Upgrade menu card | Dark wood card, progress dots |
| UI06 | Staff portrait frame | Oval frame, staff name tag |
| UI07 | Heat meter bar | Thermometer shape, gradient fill |
| UI08 | Rep meter bar | Star-dotted fill bar |
| UI09 | Money counter pill | Dark gold rounded rect |
| UI10 | Task item row | Light card, priority dot on left |
| UI11 | Ability slot | Square frame, cooldown arc overlay |
| UI12 | Quest row | Scroll-style entry |
| UI13 | Achievement card | Trophy icon, dark frame |

---

## MVP Code-Drawing Implementation Notes

For the React/Canvas MVP, all sprites above are drawn programmatically using Canvas 2D API:

- **Retta:** Drawn with `fillRect` for body, `arc` for head, `fillRect` sequences for clothing pixels.
- **Machines:** Rectangular base with porthole `arc`, highlight `strokeRect`, status overlays.
- **Floor:** Tiled `fillRect` grid calls with alternating colors per tile type.
- **Characters:** ~20–30 canvas draw calls per sprite frame, stored as draw-function arrays.
- **Animations:** State machine (idle/walk/action/etc.) drives which draw function runs each frame.
- **Particles:** Simple position + velocity + lifetime structs, drawn as colored arcs or rects.

All "code-drawn" sprites should be stored in a `sprites/` module, each as a function:
```ts
function drawRetta(ctx: CanvasRenderingContext2D, x: number, y: number, state: SpriteState): void
```
This makes them easy to replace with real pixel-art image data later without changing
any game logic.

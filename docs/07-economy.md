# Section 11: Money Economy & Balancing

---

## Design Philosophy

Wash & Wager uses an **Eatventure-style idle tycoon** economy where:
- Numbers grow satisfyingly but not too fast — players should feel each upgrade matters.
- Active play is rewarded (catching events, using Retta's abilities) but idle time also generates income.
- The backroom creates a second income stream that is more volatile but higher ceiling.
- Upgrade costs follow a ×2.5 geometric curve so early upgrades are cheap and frequent,
  late upgrades are rare and meaningful.

**Currency:** Coins (displayed with a $ sign in-game, labeled "coins" in the tutorial).

---

## Starting State

| Item | Value |
|---|---|
| Starting cash | $350 |
| Coins on hand (visual) | 350 coin units |
| Machines active | 2 of 4 washers, 2 of 4 dryers (others broken) |
| Staff | None hired |
| Backroom | Locked |
| First upgrade target | Fix washers: $150 each |

---

## Income Sources

### Front Laundromat Income

#### Washer Revenue
| Machine Level | Price per cycle | Cycle time | Max customers/hour | Revenue/hour (max) |
|---|---|---|---|---|
| L1 | $1.50 | 3 min | 20 | $30 |
| L2 | $1.75 | 2.5 min | 24 | $42 |
| L3 | $2.00 | 2 min | 30 | $60 |
| L4 | $2.50 | 1.5 min | 40 | $100 |
| L5 | $3.00 | 1 min | 60 | $180 |

*With 4 washers at L5: theoretical max = $720/hour from washers alone.*
*Reality with wait times, breakdown, customer patience = ~$450–550/hour.*

#### Dryer Revenue
| Machine Level | Price per cycle | Cycle time | Revenue/hour (max per dryer) |
|---|---|---|---|
| L1 | $1.00 | 4 min | $15 |
| L2 | $1.25 | 3 min | $25 |
| L3 | $1.50 | 2.5 min | $36 |
| L4 | $2.00 | 2 min | $60 |
| L5 | $2.50 | 1.5 min | $100 |

*With 4 dryers at L5: theoretical max = $400/hour.*

#### Vending Machine Revenue
| Level | Revenue per day (passive) |
|---|---|
| L1 | $30–50 |
| L2 | $55–80 |
| L3 | $90–130 |
| L4 | $140–200 |
| L5 | $220–300 |

#### Detergent Shelf Revenue
| Level | Revenue per day |
|---|---|
| L1 | $15–25 |
| L2 | $30–45 |
| L3 | $55–80 |
| L4 | $85–120 |
| L5 | $130–180 |

#### Folding Table Tips
- Base: $0.25–$0.50 per customer who folds (not all customers fold)
- With upgrades: up to $1.25 per customer
- Approx. 40% of customers use folding tables
- Revenue: $10–40/day at early game; $80–150/day at late game

#### Front Counter Tips (via Terri)
- L1 Terri: $5–15/day
- L5 Terri: $40–80/day

---

### Backroom Income

#### Card Table
| Level | Revenue per session |
|---|---|
| L1 | $10–20 |
| L2 | $25–45 |
| L3 | $60–90 |
| L4 | $100–150 |
| L5 | $220–300 |

*Sessions: 2–4 per in-game day in normal operation.*

#### Bingo Night
| Level | Revenue per bingo session |
|---|---|
| L1 | $30–50 |
| L2 | $60–100 |
| L3 | $100–160 |
| L4 | $200–300 |
| L5 | $350–500 |

*Bingo sessions: 1 per in-game evening (higher frequency possible in event mode).*

#### Slot Machines
| Level | Passive hourly income |
|---|---|
| L1 (1 machine) | $20–35/hr |
| L2 (2 machines) | $50–80/hr |
| L3 (3 machines) | $90–140/hr |
| L4 (4 machines) | $150–220/hr |
| L5 (5 machines) | $280–380/hr |

#### Poker Table
| Level | Revenue per session |
|---|---|
| L1 | $60–100 |
| L2 | $130–200 |
| L3 | $250–370 |
| L4 | $420–600 |
| L5 | $800–1,100 |

#### Lucky Wheel
| Level | Revenue per use |
|---|---|
| L1 | $3–8 |
| L2 | $8–18 |
| L3 | $18–35 |
| L4 | $35–60 |
| L5 | $60–120 |

*Usage: 1 per customer per visit; typically 10–20 uses/session.*

#### VIP Corner Multiplier
- Applied to all backroom income from customers sitting in VIP seats.
- L1: ×1.3 | L2: ×1.5 | L3: ×1.7 | L4: ×2.0 | L5: ×2.5

#### Snack Bar (Backroom)
| Level | Revenue per session |
|---|---|
| L1 | $15–25 |
| L2 | $40–60 |
| L3 | $80–110 |
| L4 | $130–175 |
| L5 | $220–300 |

---

## Income Snapshot by Chapter

| Chapter | Front Income/Day | Backroom Income/Day | Total/Day | Notes |
|---|---|---|---|---|
| Ch. 1 | $80–150 | $0 | $80–150 | 2 washers working, slow start |
| Ch. 2 | $200–350 | $0 | $200–350 | All machines up, vending |
| Ch. 3 | $350–550 | $0 | $350–550 | Upgrades + regulars |
| Ch. 4 | $500–750 | $50–100 | $550–850 | Card table opens |
| Ch. 5 | $600–900 | $150–300 | $750–1,200 | Bingo starts |
| Ch. 6 | $750–1,100 | $300–500 | $1,050–1,600 | Slots installed |
| Ch. 7 | $900–1,300 | $500–800 | $1,400–2,100 | Competition phase |
| Ch. 8 | $1,100–1,600 | $900–1,500 | $2,000–3,100 | Full backroom |
| Ch. 9 | $1,400–2,000 | $1,200–2,000 | $2,600–4,000 | Poker table full |
| Ch. 10 | $2,500–4,000 | $2,000–3,500 | $4,500–7,500 | Festival day, all systems |

---

## Expense Sources

### Staff Weekly Wages (Ongoing)
| Staff Member | Weekly Cost |
|---|---|
| Wanda (Cleaner) | $80 |
| Denny (Repair) | $100 |
| Terri (Cashier) | $120 |
| Hector (Restocker) | $70 |
| Big Lorene (Floor Mgr) | $150 |
| Bubba (Security) | $130 |
| Carlotta (Backroom Host) | $180 |
| Kev (Lookout) | $90 |
| Earl Jr. (Helper) | $0 |
| **Total (all hired)** | **$920/week** |

*One in-game week = approximately 7 minutes of active play at normal speed. Wages auto-deduct.*

### Machine Repair Costs
| Event | Cost |
|---|---|
| Washer breakdown (no staff) | $25–40 |
| Dryer breakdown | $30–50 |
| Coin machine jam | $10 |
| Vending machine stuck | $15 |
| Backroom slot malfunction | $50–80 |
| Emergency repair (immediate) | 2× normal cost |

### Upgrade Cost Overview
| Category | L1→L2 | L2→L3 | L3→L4 | L4→L5 |
|---|---|---|---|---|
| Washers | $500 | $1,250 | $3,125 | $7,813 |
| Dryers | $600 | $1,500 | $3,750 | $9,375 |
| Vending | $400 | $1,000 | $2,500 | $6,250 |
| Card Table | $600 | $1,500 | $3,750 | $9,375 |
| Poker Table | $5,000 | $12,500 | $31,250 | $78,125 |
| VIP Corner | $7,500 | $18,750 | $46,875 | $117,188 |

### Restock Costs
| Item | Cost per restock |
|---|---|
| Vending machine | $20–40 |
| Detergent shelf | $15 |
| Backroom snack bar | $30–60 |

### Heat Penalties (Economic)
- **Heat 50+:** Customers start avoiding the front. Front income –10%.
- **Heat 75+:** Three customers leave per day from fear. Front income –20%.
- **Heat 100:** Full shutdown event. All income stops for one in-game day. Fine: $200–500.

---

## Idle Economy (Away Earnings)

When the player is not actively playing, the game accumulates idle income:

| Chapter | Idle income rate |
|---|---|
| Ch. 1–2 | 20% of active hourly rate |
| Ch. 3–5 | 35% of active rate |
| Ch. 6–8 | 50% of active rate |
| Ch. 9–10 | 65% of active rate |

Staff upgrades, specifically Big Lorene and Carlotta, increase idle income by up to +15% each.

**Idle income cap:** 8 in-game hours (to encourage regular sessions without punishing casual play).

---

## Balance Notes for Developers

1. **Front room should carry the player through Chapters 1–3** without requiring backroom income.
2. **Backroom income should be optional but irresistible** — never force it, always tempt it.
3. **Upgrade costs should feel just slightly out of reach** — the next upgrade should arrive
   within 2–3 active sessions, never more than 5.
4. **Staff wages should become trivial by mid-game** — they should be an early pressure
   (can I afford Denny?) that vanishes by Chapter 6.
5. **The real economy tension is Heat vs. Income** — the player should always feel like
   they're choosing between safety and profit in the backroom loop.
6. **Event rewards** — completing chapter goals and special events should provide
   lump-sum cash bonuses ($100–$1,000) that feel like windfalls and fund the next upgrade push.

# Section 12: Heat / Suspicion System

> **Important design note:** This system is entirely cartoonish and comedic. No real illegal
> activities are depicted or described. The "gambling" in the backroom is treated as a
> folksy small-town social club. All consequences are game mechanics (income loss, temporary
> penalties, funny dialogue). There are no real-world legal implications modeled.

---

## Overview

The **Heat Meter** is a 0–100 scale that represents how suspicious the town is about Retta's
activities. It lives in the top bar alongside the money counter and reputation bar.

- **0–25:** Clean as a whistle. Nobody suspects a thing.
- **25–50:** A few eyebrows raised. Manageable.
- **50–75:** The town is talking. The deputy is curious.
- **75–99:** Everyone knows something. Active heat events are frequent.
- **100:** **Maximum Heat** — a "raid" event triggers. Funny, not scary.

Heat is displayed as a **thermometer icon** that glows orange → red as it fills.
At 75+, the thermometer pulses. At 100, it blows steam.

---

## What Raises Heat

### Passive Raisers (happen automatically over time)
| Source | Heat per in-game hour |
|---|---|
| Backroom operating (base) | +2/hr |
| Each additional backroom game running | +1/hr per game |
| VIP corner occupied | +1.5/hr |
| Bingo session active | +3/hr |
| Poker session active | +2/hr |
| Jackpot won (slot machine) | +5 instant |
| Very loud customer (Cletus) | +3 instant |
| Night operation after 10 PM in-game | +1.5/hr extra |

### Event Raisers (triggered by specific events)
| Event | Heat gained |
|---|---|
| Connie Dupree visits and sees anything suspicious | +8 |
| Connie's Gossip Meter reaches 50% | +12 event |
| Connie's Gossip Meter reaches 100% | +25 event |
| Deputy Clem enters building | +5 (his presence alone) |
| Wrong person knocks correct secret knock | +10 |
| Delivery to wrong door | +8 |
| Backroom noise heard through wall | +5 |
| Security camera offline for >10 min | +3 |
| Customer talks about backroom in front room | +6 |
| Barry Nell (reporter) in building | +4 per minute |
| Failed cover-up attempt | +15 |
| Vending machine audio malfunction (plays jackpot noise) | +8 |
| Kid finds poker chip | +5 |
| True Crime Podcaster uploads content | +8 |

### Player-Caused Heat Raisers
| Mistake | Heat gained |
|---|---|
| Wrong option in a dialogue event | +5 to +20 depending on event |
| Running bingo with no soundproofing | +8/session |
| Leaving the backroom door open during inspection | +20 |
| Forgetting to lock alley during police presence | +15 |
| Activating Lucky Wheel music glitch | +10 |
| Earl Jr. says something incriminating | +10 |

---

## What Lowers Heat

### Passive Lowers (happen automatically)
| Source | Heat per in-game hour reduced |
|---|---|
| Front laundromat running cleanly | –1/hr |
| High front reputation (Laundromat Rep 80+) | –1.5/hr |
| Gerald Finch gives clean inspection | –10 instant |
| Clem befriended (reputation threshold met) | –2/hr |
| Soundproofing L3+ installed | –1.5/hr |
| No backroom activity for 1 full day | –8 |
| Backroom lights off + door locked | –3/hr |

### Active Lowers (player or ability triggered)
| Action | Heat reduced |
|---|---|
| Donate to church (charity event) | –10 |
| Host "Official Charity Bingo Night" (community cover) | –15 |
| Win a chapter goal | –5 to –20 bonus |
| Retta uses Emergency Bingo Cover ability | –15 for 3 min, then stabilizes |
| Retta uses Coupon Confusion on inspector | –10 per use |
| Retta uses Family Emergency on nosy visitor | –20 for that visitor's day |
| Retta uses Grandma Stare on Clem | –5 |
| Retta uses Hush Now | Stops heat gain from sound for 60 sec |
| Terri handles visitor perfectly | –3 |
| Bubba L5 Emergency Protocol | –15 |
| Give Deputy Clem free laundry | –8 (once per week) |
| Give town gossip a complimentary detergent basket | –5 per Connie visit |
| Earl Jr. files correct paperwork | –5 per inspection |

---

## Heat Threshold Events

### 🟡 Heat Reaches 25 — "People Are Whispering"

**What happens:**
- Connie Dupree starts a **Gossip Meter** sub-track. Her counter fills 50% faster.
- Wade Pruett makes a suspicious comment on his next visit.
- A new dialogue event is queued: "Connie's Question" (she asks Retta directly if there's
  "something going on back there").
- Ambient event: two front customers are whispering near the vending machine. Retta can
  tap them to hear what they're saying. Their conversation is funny. They don't know anything specific.

**UI Change:** Heat icon turns from yellow to amber.

---

### 🟠 Heat Reaches 50 — "The Deputy Gets Curious"

**What happens:**
- **Clem Biggs triggers**: he starts doing his laundry here weekly (suspicious but innocent
  framing). He asks more direct questions each visit.
- **Customer anxiety**: 10% of regular customers start arriving a little more hesitantly.
  Patience meters begin ticking 5% faster (they're nervously aware of something).
- **Front income –10%** (some customers are scared off or skip the week).
- **Gerald Finch schedules an extra inspection** (earlier than his annual one).
- Dialogue event: "Clem's Question" — Clem asks Retta directly what the storage room is.
  Player must choose a cover story.

**UI Change:** Heat icon pulses at 50. Retta's idle animation changes: she looks over her
shoulder occasionally.

---

### 🔴 Heat Reaches 75 — "The Town Council Knows Something"

**What happens:**
- **Multi-threat week:** Three heat events trigger in rapid succession. All three are
  manageable separately; together they require careful timing.
- Connie Dupree submits a formal "concern letter" to the town council. A council event
  is queued for 3 in-game days from now.
- Wade Pruett begins actively trying to report Retta (he contacts the city business office).
- Paranoid Neighbor Ralph's complaint letter reaches the police desk.
- **Front income –20%**.
- Clem switches to plainclothes mode.
- **Dialogue event unlocked:** "The Town Meeting" — Retta must attend (or skip and pay $100
  fine). Attending means a public appearance that's a big comedy set piece.

**UI Change:** Heat icon turns red and pulses rapidly. Top bar background flickers orange.
Retta's dialogue voice-lines shift to more stressed/funny lines.

---

### 🚨 Heat Reaches 100 — "The Community Check-In"

**What happens (Maximum Heat Event):**

This is not a realistic "police raid." It's a **cartoon sitcom crisis**.

The **"Community Wellness Check"** triggers:
- Clem Biggs arrives at the front door with a clipboard and a polite request.
- Gerald Finch is also there (scheduled separately but arrived at the same time, awkward).
- Connie Dupree is outside taking photos on her phone.
- Wade Pruett is parked across the street watching.
- A small group of curious neighbors has gathered.

**The Crisis Event** is a 3-minute interactive sequence:
1. Retta must choose how to answer Clem's questions (3 dialogue choices).
2. While doing this, a staff member (usually Earl Jr.) must cover the backroom evidence
   (player taps 3 items before a timer runs out).
3. Gerald starts his inspection simultaneously (Coupon Confusion is useful here).
4. Retta must prevent Connie from coming inside (Grandma Stare or Sweet Tea Distraction).

**Outcomes:**
- **All 4 tasks completed:** Everyone leaves satisfied. Heat drops to 30. Funny dialogue.
  Clem says, *"Retta, I don't know what I was looking for. Nice bingo board."*
- **2–3 tasks completed:** Minor penalty. Front income –10% for 3 in-game days. Heat drops to 45.
- **0–1 tasks completed:** The "Forced Charity" outcome — Retta is required to host an actual
  public bingo night for the community, completely above board. This actually raises front
  reputation by +20 and lowers Heat to 20. The backroom stays hidden. It is the best bad outcome.

**After Heat-100 resolves:** Heat is pushed back to 20–30 minimum regardless of outcome.
The game cannot "end" from heat — it can only create funny complications.

---

## Rival & NPC Interactions with Heat

### Deputy Clem Biggs
- **Below 25 Heat:** Comes in for normal laundry. Friendly. Oblivious.
- **25–50 Heat:** More curious. Asks questions. Lingers near the storage room door.
- **50–75 Heat:** Plainclothes mode. Asks pointed questions. Noticeably interested.
- **75+ Heat:** Actively investigating. Triggers the "Close Call" storyline.
- **Befriended (Rep threshold):** Acts as a passive heat reducer. Occasionally tips Retta
  off about incoming inspectors. *"I heard Gerald might be by Thursday. Thought you'd want
  to know. Can't imagine why."*

### Connie Dupree (Town Gossip)
- **Gossip Meter is independent** from Heat but feeds into it.
- Each of Connie's visits: she observes + remembers one suspicious detail.
- At Gossip 30: she tells the church. +5 Heat.
- At Gossip 60: she talks to Clem. +12 Heat event.
- At Gossip 100: she submits a letter to the council. +25 Heat event. Gossip resets.
- **Counter:** Give her complimentary laundry service, redirect her with gossip about someone
  else (Wade Pruett is always available as a distraction target), or have Retta personally
  chat her up and redirect her attention.

### Gerald Finch (Health Inspector)
- Inspects the **front room only** unless Heat is above 75.
- Above 75: Gerald starts asking about the back room. Earl Jr.'s paperwork becomes critical.
- Gerald can become a neutral: if the laundromat gets 3 consecutive "clean" inspections,
  he starts trusting Retta and inspections become shorter and easier.
- His presence alone: +5 Heat (customers are nervous when the inspector is around).

### Wade Pruett
- Wade actively monitors Retta's reputation and reports suspicious activity.
- Below 25 Heat: Wade just watches and is jealous.
- 25–50: Wade makes anonymous calls to the city business office.
- 50+: Wade starts getting interviews with the Courier reporter.
- **Counter:** Outperform him on front laundromat metrics. If Retta's Laundromat Reputation
  is significantly higher than Wade's, the council dismisses his complaints.
- **Special:** Wade once tries to enter the backroom himself by following Roy. This triggers
  a multi-choice event with many possible outcomes.

---

## Cover-Up Mechanics

### The Layered Defense System

**Layer 1 — Physical Cover:**
- Soundproofing (reduces noise-based heat gains)
- Hidden door / fake wall (prevents visual discovery)
- Fake storage corridor (buys confusion time)
- Escape hallway (emergency exit for regulars)

**Layer 2 — Personnel Cover:**
- Bubba at the alley entrance (screens visitors)
- Kev at the cameras (advance warning)
- Terri at the front (first line of defense for suspicious visitors)
- Carlotta running the back (manages behavior)

**Layer 3 — Behavioral Cover:**
- The "totally legal bingo night" décor and documentation
- Earl Jr.'s paperwork filing
- Retta's personally managed public reputation

**Layer 4 — Active Abilities:**
- Grandma Stare (freeze/redirect a single NPC)
- Sweet Tea Distraction (lure NPC to kitchen area)
- Coupon Confusion (overwhelm with paperwork)
- Emergency Bingo Cover (rapid transformation)
- Hush Now (silence backroom sounds)
- Family Emergency (remove a single NPC from building)

### Failed Cover-Up Consequences (Comedy-First)

All failed cover-up consequences are framed comically:
- **Clem sees the poker chips:** He picks one up, turns it over, sets it down, and says
  *"That's quite the collection you got there."* Heat +10. He files nothing. He's thinking.
- **Gerald sees the bingo board:** He says *"That's a bingo board."* Retta says *"That's
  for the children."* Gerald writes something on his clipboard. He has no idea what to
  write. Heat +8.
- **Connie livestreams the alley:** 4 people watch. Two of them already knew. Heat +15.
- **Jackpot noise during inspection:** Retta says it's the new washer's alert sound. Gerald
  asks why it plays celebratory music. Retta says it's a feature. Heat +12.

---

## Heat UI Details

| Heat Level | Thermometer color | Background tint | Retta behavior |
|---|---|---|---|
| 0–24 | Green | Normal | Normal idle |
| 25–49 | Yellow | Slight warm tint | Occasionally looks around |
| 50–74 | Orange | Warm orange tint at edges | Glances at backroom door |
| 75–99 | Red | Red edge pulse | Fidgets constantly, sweat animation |
| 100 | Blinking red | Full screen brief flash | Slaps both hands on counter, deep breath |

**Heat Warning Sound:** At 75+, a low persistent ticking sound begins (like a cartoon bomb clock).
At 100, the sound changes to a brief **"DUN DUN DUN"** sting before the crisis event starts.

# Sections 14–15: Grandma Character Design & Abilities

---

## Section 14: Grandma Character Design

### Character Identity

**Full name:** Loretta Faye Hollis
**Goes by:** Retta / "Retta Mae" to people she likes / "Ma'am" to everyone she doesn't
**Age:** 72 years old
**Background:** Born in Peavine, Texas. Retired schoolteacher (34 years, 6th–8th grade
English and Civics). Widowed (Earl Hollis, 3 years ago; she misses him and talks to him
occasionally when she thinks no one's listening). Two kids: her daughter Patrice (who
keeps sending retirement home brochures) and her son Dale (long-haul trucker, calls every
Sunday). Son-in-law Earl Jr. is Patrice's husband.

### Personality

**The Core:** Retta is a woman who has spent 72 years being underestimated. She finds
this mostly convenient. She is the sharpest person in any room she enters, a fact she
lets other people discover at their own pace.

**The Public Face:** Sweet. Grandmotherly. Warm. Always has a kind word, a fresh sweet
tea, and a sympathetic ear. She remembers names, birthdays, and allergies. She bakes
peach cobbler for staff on Fridays. She genuinely loves her regulars. All of this is
completely real.

**The Private Reality:** She also has an iron will, zero tolerance for nonsense, a natural
gift for reading people's intentions within 30 seconds, and a comfort with ambiguity that
her schoolteacher colleagues always found slightly unsettling.

**Values she holds:** Community, loyalty, family, hard work, a good laugh, the right to
run her own business how she sees fit, and a firm belief that the spirit of the law matters
more than the letter of it — especially when she wrote the study guide for both.

**What she wants:** To stay busy. To be useful. To not go quietly into retirement.
To prove that the investment was a good idea. To build something.

**What she won't do:** Hurt people she cares about. Let the front laundromat fail.
Let Earl Jr. panic himself to death. Let Peavine down.

---

### Visual Design

**Build:** Short and sturdy. No apologizing for either.
**Sprite size:** 32×32 pixel chibi style. Retta is one of the shorter sprites on screen
but takes up space in a way that feels larger.

**Clothing:**
- Light blue or soft pink housedress with a floral collar (front-of-house uniform)
- A small apron (for active play — pockets visible, full of useful items)
- Sensible orthopedic sneakers in cream with velcro (they look gentle; she moves fast)
- A modest gold cross necklace
- Reading glasses perched on her head (never actually used but always there)
- Hair: short silver-white perm, neat but lived-in

**Color palette:**
- Primary: Soft lavender / pale blue (friendly, maternal)
- Accent: Gold (the cross, the glasses frames, the coin she always rolls in her fingers)
- Shadow tone: Warm dusty rose (shading on the housedress)
- Skin: Warm peach-tan, light laugh lines, rosy cheeks

**Face design:**
- Large, expressive eyes (pixel-art style: 2 dark pixels for pupils; white surround)
- Small upturned nose
- Default expression: slight smile, one eyebrow slightly raised
- Cheek highlights: small pink pixel dots

---

### Animation States

**Idle Animation:**
Retta stands at her counter, arms folded loosely. Every 4 seconds she shifts her weight
to one foot. Every 8 seconds she turns her head slightly and surveys the room, then turns back.
Once every 30 seconds she does a small "hm" motion — tilts her head, nods once, looks
satisfied. She is watching everything.

**Walking Animation:**
Fast but dignified. Not running (that would be undignified). Not shuffling (she's 72, not 102).
A brisk, purposeful 4-frame walk cycle. Arms swing slightly. She looks where she's going.
When crossing the room for a task, she moves with uncanny efficiency.

**Repairing Animation:**
Retta taps a machine twice with the flat of her hand. If it doesn't respond, she produces
a small tool from her apron pocket and does something to the back panel. Machine fixes.
She pats it. 6-frame cycle.

**Mopping Animation:**
Efficient back-and-forth. She watches the floor, not the mop. She finishes, checks the area,
nods, moves on. 4-frame cycle.

**Coin Collect Animation:**
One hand reaches out, grabs the floating coin bag, tucks it into the apron pocket.
Small sparkle. Slight head-nod. 3-frame cycle.

**Happy Animation (triggered by large income, chapter completion, events):**
Retta clasps her hands together in front of her chest. A small halo of stars/sparkles
appears around her for 1 second. She looks up and mouths something (the subtitles read:
*"Well, Earl."*). She then straightens her apron and gets back to work.

**Angry Animation (triggered by machines breaking repeatedly, heat spike, chaos):**
Retta's eyebrows lower. She plants one hand on her hip. The other hand taps once on the
nearest surface. A small heat-shimmer appears above her head. She says one word (subtitled):
varies by situation (see voice lines). Then she resolves it.

**Bluff Mode Animation (triggered during cover-up events):**
Retta's expression goes perfectly smooth. No tells. No tension. Her hands come together
in front of her in a clasped, sweet, church-lady posture. Her smile is warm and just
slightly too wide. This is Retta at her most dangerous. Characters who don't know her
find her completely convincing. Characters who do know her get nervous.
Special particle: a faint halo of glowing dryer sheets slowly orbits her head.

**Running Animation (triggered by Clean Sweep or emergency tap):**
Retta is not running. She is "walking quickly." This is faster than most people's running.
6-frame cycle. Her apron pockets jingle. She leans slightly forward. The world tries to
keep up.

---

### Movement Style

Retta pathfinds efficiently through the laundromat, always taking the shortest route that
doesn't involve cutting through a customer interaction. She pauses for 0.5 seconds when
passing a broken machine (registers it, checks if someone is handling it), then continues.

When idle near her counter, she slowly rotates in a 90-degree arc, watching the room.
She tracks moving customers visually (head-turn pixel animation).

She opens the hidden door with a specific tap sequence — she does it from memory, never
looking at her hands.

---

### 30 Voice-Line Text Bubbles

These appear as small floating speech bubbles above Retta's head during gameplay moments.
They are short, expressive, and very Retta.

**Positive / Collecting money:**
1. *"That's what I thought."*
2. *"Bless this laundromat."*
3. *"Earl, you see that?"*
4. *"Good. Now the next one."*
5. *"That's my money. Thank you."*

**Repairing machines:**
6. *"Don't make me ask twice."*
7. *"Dewey never fixed a thing in his life."*
8. *"Three taps. Works every time."*
9. *"I've reset worse things than you."*

**Mopping / Cleaning:**
10. *"Some people were raised in a barn."*
11. *"Wanda. (pause) Fine. I'll do it."*
12. *"My floor. My rules."*

**Dealing with difficult customers:**
13. *"Bless your heart."* (said with intensity)
14. *"I taught harder children than you."*
15. *"That's a very interesting point. No."*
16. *"You're having a big day, aren't you?"*

**During Heat events / cover-ups:**
17. *"Everything is completely fine."*
18. *"I have no idea what you heard."*
19. *"That's a storage room, honey."*
20. *"Gerald, have a cookie."*
21. *"Clem, your laundry's done."*

**Backroom situations:**
22. *"Keep it down in there. I mean it."*
23. *"Cletus. I will only say this once."*
24. *"Roy, that's your limit for tonight."*
25. *"The wheel is for entertainment purposes."*

**End of a good day:**
26. *"Not bad, Retta. Not bad at all."*
27. *"Earl would've gotten a kick out of this."*
28. *"One more upgrade and we're set."*

**Staff / Team moments:**
29. *"Denny, I love you like a son. Fix that machine."*
30. *"All right, everybody. Back to work."*

---

## Section 15: Grandma Abilities

All abilities are on a cooldown timer. They're accessed from the ability bar at the bottom
of the screen (4 ability slots, swappable from a 9-ability pool in the upgrade menu).

Abilities can be upgraded through 3 levels. Costs are from the Upgrade Menu.

---

### Ability 1: Sweet Tea Distraction

**Description:** Retta produces a glass of sweet tea and offers it to a target NPC.
The NPC is immediately redirected to the kitchen/snack area for the duration and
cannot move toward suspicious areas.

**Cooldown:** 3 minutes (L1) → 2 min (L2) → 90 sec (L3)
**Duration:** 90 sec (L1) → 2 min (L2) → 3 min (L3)
**Best use case:** Any NPC who is heading toward the backroom door or asking nosy questions.
Extremely effective on Gerald Finch, Connie Dupree, and Pastor Wendell.
Not effective on Clem when he's in "focused" mode (Heat 75+).

**Animation:** Retta reaches into her apron pocket, produces a full glass of sweet tea
(it was just there), and offers it with her warmest smile. A small golden sparkle
appears above the tea glass.

**Upgrades:**
- L2: Adds "A little something" — tea comes with a cookie, extending effect and adding
  +5 reputation with the target.
- L3: "The Full Treatment" — tea + cookie + a personal anecdote. Doubles duration.
  NPC also develops a 5% permanent loyalty bonus after being served 3 times.

---

### Ability 2: Grandma Stare

**Description:** Retta looks directly at one target NPC with an expression of total, serene
authority. The target freezes in place for the duration. They cannot speak, move, or ask questions.

**Cooldown:** 5 min (L1) → 3.5 min (L2) → 2.5 min (L3)
**Duration:** 10 sec (L1) → 20 sec (L2) → 35 sec (L3)
**Best use case:** Emergency stoppage. Best for Clem when he's moving toward something he
shouldn't see, or for preventing a Sore Loser from reaching the front room.

**Animation:** Retta's eyes zoom in slightly (comic-book style panel). Target NPC stops.
A small sweat drop appears above the target. Retta returns to normal after the stare.

**Upgrades:**
- L2: "The Full Look" — target NPC also becomes 20% less suspicious for the rest of their
  visit after snapping out of it (too shaken to pursue their original curiosity).
- L3: "Petrify" — target is frozen AND Retta can simultaneously do any other action during
  the stare duration. She doesn't need to stop.

---

### Ability 3: Coupon Confusion

**Description:** Retta produces a thick folder of flyers, coupons, discount cards, and
printed materials. She presents these to a target official NPC (inspector, clerk, any
business-type). They are completely absorbed in reviewing the materials.

**Cooldown:** 4 min (L1) → 3 min (L2) → 2 min (L3)
**Duration:** 45 sec (L1) → 70 sec (L2) → 90 sec (L3)
**Best use case:** Gerald Finch during an inspection. Any city official. Any visitor with
a clipboard. Also very effective on impatient businessmen.

**Animation:** Retta opens her counter drawer, pulls out an enormous stack of papers,
and places them on the counter. A cartoon *"stack wobble"* animation plays. The NPC's
eyes go wide. They start reading.

**Upgrades:**
- L2: "Cross-Referenced Edition" — folder now includes a separate appendix, giving
  another 25 seconds of confusion. Target also leaves 10% more satisfied (they feel
  they did thorough research).
- L3: "The Binder" — Coupon Confusion now summons Earl Jr. automatically to assist
  with the presentation. Both work the official simultaneously. Duration ×2. Gerald
  may actually start enjoying himself.

---

### Ability 4: Emergency Bingo Cover

**Description:** Retta activates a rapid transformation protocol for the backroom.
Within 3 seconds: "Totally Legal Bingo Night" signage is displayed, gambling machines are
draped or flipped, and the room presents as a community bingo night.

**Cooldown:** 10 min (L1) → 7 min (L2) → 5 min (L3)
**Duration effect:** Cover lasts until Retta manually switches back (no time limit)
**Best use case:** The moment Kev reports Clem or Gerald heading for the back with serious intent.
Also useful for the Heat-100 crisis event.

**Animation:** A fast-cut montage sequence (4 frames): machines draped with "Out of Order"
cloths, a bingo sign swings down from the ceiling, Carlotta places a stack of bingo cards
on the table, Bubba puts on a volunteer name tag. All in 3 seconds.

**Upgrades:**
- L2: Transformation time reduced to 1.5 seconds. Also automatically activates Hush Now.
- L3: "Flawless Cover" — any NPC who sees the backroom in this state exits with Heat –5
  instead of the neutral outcome. They are actively comforted by how normal everything looks.

---

### Ability 5: Fake Repair Mode

**Description:** Any backroom machine (slot, lucky wheel, poker table) is immediately
covered with an "Under Maintenance" sign and a convincing cluster of repair tools.
It looks exactly like Denny is in the middle of fixing it.

**Cooldown:** 3 min (L1) → 2 min (L2) → 90 sec (L3)
**Duration:** 2 minutes before needing to reset
**Best use case:** When an NPC who shouldn't be in the backroom gets a brief glimpse.
"That? That's a broken machine. Don't touch it." Also useful during Gerald's inspection
walk-through.

**Animation:** A small toolbox animation plays over the target machine. Wrenches and
screwdrivers appear. A fake "Out of Service — Maintenance in Progress" label materializes.
Denny may or may not actually be there; the visual is convincing either way.

**Upgrades:**
- L2: Two machines can be covered simultaneously.
- L3: "The Full Workshop" — covers all backroom machines simultaneously. Room looks like
  a genuine repair workshop. Heat –10 for any inspector who sees it.

---

### Ability 6: Bless Your Heart

**Description:** Retta approaches one angry or impatient customer, pats their arm,
says three words, and the customer's anger meter resets to zero. They leave satisfied
regardless of their prior complaint.

**Cooldown:** 90 sec (L1) → 60 sec (L2) → 40 sec (L3)
**Effect:** Full customer anger reset + small tip spawns from the calmed customer
**Best use case:** Impatient Businessman, Sore Loser leaving the backroom, any customer
approaching their patience limit in a critical moment.

**Animation:** Retta walks up to the customer, pats their arm, says (subtitled):
*"Bless your heart."* The customer's anger cloud (red exclamation) transforms into
a small yellow star. They smile. She walks away.

**Upgrades:**
- L2: "With Interest" — calmed customer not only resets anger but also buys something
  extra before leaving (guaranteed purchase from the vending/shelf).
- L3: "The Full Blessing" — customer becomes a loyal regular after being calmed this way.
  Adds them to the "earned loyalty" pool, which gives +10% tip on all future visits.

---

### Ability 7: Hush Now

**Description:** Retta claps her hands once. All backroom sound effects are muted for
the duration. The Noise Meter stops filling. Heat gains from sound stop.

**Cooldown:** 4 min (L1) → 3 min (L2) → 2 min (L3)
**Duration:** 60 sec (L1) → 90 sec (L2) → 2 min (L3)
**Best use case:** The moment a jackpot goes off, when Cletus is revving up, or when a
bingo session is about to peak during a high-heat moment.

**Animation:** Retta pauses wherever she is, places one finger to her lips, and looks
toward the backroom. A small sound-wave icon appears next to the backroom icon in the
navigation bar, then crosses out (muted). The backroom goes visually quieter (slight
color-temperature shift to cooler tone).

**Upgrades:**
- L2: Duration extended + Noise Meter also decays by 10% during Hush Now.
- L3: "The Deep Hush" — all sound effects building-wide are reduced 50% during Hush Now.
  Customers in the front are also 15% less likely to complain during this period (ambient
  calm effect). Retta briefly becomes a serene island of silence.

---

### Ability 8: Family Emergency

**Description:** Retta invents a family emergency and delivers it directly to one target NPC.
The NPC must leave the building immediately. They do not question it.

**Cooldown:** 20 min (L1) → 15 min (L2) → 10 min (L3)
**Duration effect:** Target NPC does not return for 1 full in-game day
**Best use case:** The hardest situations — a Heat-75+ nosy visitor, Brother Norwood,
Wade when he's getting close to something, Connie at critical Gossip Meter.

**Animation:** Retta gets a very sincere expression. She walks to the target NPC.
Speech bubble appears: "Oh, honey, your [aunt / nephew / landlord / dog] just called me."
The NPC's eyes go wide. They thank Retta. They leave. The speech bubble changes to a tiny
*"Hm."* from Retta.

**Upgrades:**
- L2: Emergency is "confirmed" via a staged phone call — Kev radios Carlotta who calls
  Retta's phone from a different number. More convincing. NPC gone for 1.5 days.
- L3: "The Memorial" — upgraded emergency involves an implied but unspecified tragedy.
  NPC leaves with great speed and does not return for 2 full in-game days. They're also
  slightly kinder to Retta on return (the guilt does something to people).

---

### Ability 9: Clean Sweep

**Description:** Retta performs a rapid, comprehensive cleanup of the entire building.
She mops spills, empties lint traps, and initiates repairs on all broken machines
simultaneously. It is humanly impossible. She does it anyway.

**Cooldown:** 15 min (L1) → 12 min (L2) → 8 min (L3)
**Duration:** The sweep takes 10 seconds (L1) → 7 sec (L2) → 4 sec (L3) of animation
**Best use case:** Before a health inspection, during a rush event with multiple
simultaneous failures, or before the Jubilee.

**Animation:** Retta enters a rapid montage. She is in 3 places at once (visual trick:
speed lines, afterimages). Mop appears, machines flash repaired, lint trap empties with
a satisfying *pfft* sound, floor sparkles. 10-second burst. Retta emerges slightly
out of breath, pats her apron, and says (subtitled): *"There."*

**Upgrades:**
- L2: Sweep also auto-collects all coins on screen and restocks all visible dispensers.
- L3 — "The Full Retta": Sweep covers both front and backroom simultaneously. Also auto-locks
  the backroom and primes Emergency Bingo Cover. The animation becomes a legendary
  set piece with particle effects, dramatic music swell, and a brief freeze-frame on Retta
  mid-mop with her hair slightly ruffled.

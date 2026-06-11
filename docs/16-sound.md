# Section 22: Sound Design

All audio is designed for mobile. Default volume levels respect the assumption that
players may be in public. The game has a master volume, a music volume, and an SFX
volume in Settings.

---

## Design Philosophy

- **Front laundromat:** Warm, domestic, comforting sounds. The hum of machines, the jingle
  of coins, the gentle rhythm of a running place.
- **Backroom:** Warmer, livelier. Poker chips clicking, bingo calls, laughter, the creaking
  slot machine lever.
- **Heat events:** Tempo increases. Sounds become slightly more urgent but never scary.
- **Overall tone:** Sitcom warmth, not thriller. Even the "sting" when heat hits 100 is
  comedic — a DUN DUN DUN, not a siren.

---

## AMBIENT SOUNDS

Ambient sounds loop during normal gameplay. They can fade in/out as rooms switch.

| ID | Name | Description | Notes |
|---|---|---|---|
| A01 | Washer Hum | Low continuous wash-cycle hum | Pitch varies with number of running washers |
| A02 | Dryer Thump | Rhythmic thump-thump-thump of tumbling clothes | Slightly irregular timing feels authentic |
| A03 | Front Laundromat Ambience | Soft crowd murmur, distant AC hum, occasional footstep | Very subtle, mostly masked by machines |
| A04 | Backroom Ambience (early) | Quiet card shuffle, murmured conversation, chair scrape | Low level, intimate |
| A05 | Backroom Ambience (full) | Louder chatter, bingo card shuffle, chip clink, occasional laugh | Warm and busy |
| A06 | Backroom Bingo Night | Elevated crowd noise, paper rustle, dauber taps | Pulsing with session energy |
| A07 | Backroom Poker Night | Focused quiet, chip sounds, cards dealt on felt | Concentrated, calm |
| A08 | Alley Exterior | Distant traffic, occasional crickets, night air | Plays when alley camera view is active |
| A09 | Jubilee Festival | Distant music, crowd noise, PA system fragments | Chapter 10 ambient layer |

---

## MACHINE SOUNDS

| ID | Name | Description |
|---|---|---|
| M01 | Washer Coin Insert | Metallic *klink-klink* of quarters dropping in slot |
| M02 | Washer Start | Mechanical *clunk*, water rushing, cycle begins |
| M03 | Washer Running (loop) | Moderate hum, occasional slosh sound |
| M04 | Washer Cycle Complete | 3-note ascending bell chime (*ding-ding-ding*) |
| M05 | Washer Breakdown | Grinding *rrrr* sound, sputtering, cuts out |
| M06 | Dryer Start | Metallic door *thunk*, first few tumbles audible |
| M07 | Dryer Running (loop) | Rhythmic thump-thump, steady, reliable |
| M08 | Dryer Complete | 2-note tone (*dink-dong*), softer than washer |
| M09 | Lint Trap Alert | Muffled *fwump* sound + short buzzer |
| M10 | Coin Machine Working | Coin counting rapid-fire sound, satisfying rattle |
| M11 | Coin Machine Jam | Sickly grinding *grrrnk*, coins stop |
| M12 | Vending Machine Select | Button beep, item tumble, dispensing *thud* |
| M13 | Vending Machine Empty | Hollow click, sad descending note |

---

## PLAYER ACTION SOUNDS

| ID | Name | Description |
|---|---|---|
| P01 | Coin Collect | Bright *ching!* — ascending pitch. Very satisfying. |
| P02 | Big Coin Collect | Extended *ching-ching-ching* cascade for large amounts |
| P03 | Machine Repair | Series of wrench sounds: tap-tap-tap, final satisfying *click* |
| P04 | Mop Splash | Wet *swish-swish*, water sounds |
| P05 | Mop Complete | Short cheerful note (floor sparkle sound) |
| P06 | Lint Trap Emptied | Big *pfft* exhale + soft debris rustle |
| P07 | Vending Restock | Items clinking into place, mechanical satisfied sound |
| P08 | Detergent Restock | Cardboard box sound, bottles settling |
| P09 | Customer Calm | Soft chime + Retta's mumble (*"Bless your heart."*) |
| P10 | Retta Walk | Soft footstep, slightly bouncy (one per stride, 4-frame) |
| P11 | Retta Sprint (Clean Sweep) | Faster footsteps + faint apron-jingle |

---

## ABILITY SOUNDS

| ID | Ability | Sound |
|---|---|---|
| AB01 | Sweet Tea Distraction | Glass clink, ice tinkling, warm musical swell |
| AB02 | Grandma Stare | Single low *THOOM* bass hit — brief, final |
| AB03 | Coupon Confusion | Paper rustling burst, binder *THWAP*, rapid page-flip |
| AB04 | Emergency Bingo Cover | Fast shuffle sound + bingo board *SNAP* + triumphant 2-note |
| AB05 | Fake Repair Mode | Toolbox clatter + "Under Maintenance" sign slap sound |
| AB06 | Bless Your Heart | Soft vocal (*"bless your heart"* mumble) + warm single bell |
| AB07 | Hush Now | Sound immediately ducks/muffles — felt more than heard |
| AB08 | Family Emergency | Phone dial tones + door open/close + Retta voice mutter |
| AB09 | Clean Sweep | Rapid montage: swoosh, mop, clank, sparkle, finish bell |

---

## UI SOUNDS

| ID | Name | Description |
|---|---|---|
| UI01 | Tap / Button Press | Soft *click* — not harsh, mobile-friendly |
| UI02 | Menu Open | Gentle slide-in sound |
| UI03 | Upgrade Purchased | Ascending 3-note chime, satisfying resolution |
| UI04 | Upgrade Maxed | Special 5-note melody, sparkle effect |
| UI05 | Staff Hired | Warm doorbell sound (*ding-dong*) |
| UI06 | Quest Complete | Triumphant short fanfare (3 sec) |
| UI07 | Achievement Unlock | Trophy *clang* + sparkle burst |
| UI08 | Chapter Complete | Full 5-second jingle — warm, celebratory, slightly country |
| UI09 | Event Popup Opens | Soft paper-slide sound |
| UI10 | Option Selected | Gentle card-tap sound |

---

## HEAT SYSTEM SOUNDS

| ID | Name | Description |
|---|---|---|
| H01 | Heat Rising Tick | Faint clock tick in background when Heat is 50+ |
| H02 | Heat Warning (25) | Single soft chime, slightly out of place in the ambient |
| H03 | Heat Warning (50) | More prominent *ding* — Retta's signal |
| H04 | Heat Warning (75) | Cartoon ticking clock begins (quiet but persistent) |
| H05 | Heat 100 Sting | Classic DUN-DUN-DUN brass hit — comedic, not scary |
| H06 | Crisis Event Start | Frantic but playful short stab of music, cuts to action |
| H07 | Crisis Resolved (good) | Triumphant resolution — light, relieved, funny |
| H08 | Crisis Resolved (partial) | Minor-key resolution — "well, that happened" tone |
| H09 | Clem Arrives | Western-style 3-note guitar pluck (signature Clem motif) |
| H10 | Gerald Arrives | Clipboard *snap*, 2-note descending "inspection motif" |

---

## BACKROOM SOUNDS

| ID | Name | Description |
|---|---|---|
| B01 | Poker Chip Shuffle | Satisfying dry click of chips being handled |
| B02 | Poker Cards Dealt | Rapid card-slide sounds |
| B03 | Poker Pot Won | Chips sliding, coins, winner sound |
| B04 | Bingo Ball Call | Ball-roll rattle, pneumatic *pop*, caller echo |
| B05 | Bingo "BINGO!" | Generic celebration shout (Cletus version is louder) |
| B06 | Slot Machine Pull | Lever *clunk*, reels spinning, jingle as they stop |
| B07 | Slot Machine Jackpot | Full celebratory reel sequence + victory fanfare |
| B08 | Lucky Wheel Spin | Clicking ratchet as wheel spins, slows, stops |
| B09 | Lucky Wheel Win | Short fanfare on segment land |
| B10 | Snack Bar Pop | Popcorn machine *pop-pop-pop* |
| B11 | Secret Knock | 3 knocks, pause, 2 knocks — distinctive rhythm |
| B12 | Wrong Knock | Off-rhythm knocking (wrong pattern, different cadence) |

---

## CHARACTER VOICE LINES (text-based mumbles)

No full voice acting required. Each character has 1–3 "mumble" sounds:
a short non-word audio cue that matches the character's personality and plays when
their speech bubble appears. These should be short (0.5–1 sec), distinctively
different per character.

| Character | Voice mumble style |
|---|---|
| Retta | Warm Southern alto hum — approving *"Mmhm"* or sharp *"Mm."* |
| Roy | Quiet, thoughtful exhale — *"Hm."* |
| Darlene | Bright chirp — *"Oh!"* |
| Cletus | Loud barrel laugh *"HA-"* (cut off by Hush Now) |
| Clem | Steady, slightly uncertain *"Eh…"* |
| Gerald | Precise nasal *"Mm-yes."* |
| Connie | Rapid whispered flurry — *"Oh-oh-oh…"* |
| Wade | Huffy *"Hmph."* |
| Minnie | Short, measured *"Hm."* (different tone from Roy — cooler) |
| Earl Jr. | Nervous whimper — *"…okay."* |

---

## MUSIC

Music tracks are loopable, roughly 2-minute loops.

| Track | When played | Style |
|---|---|---|
| **"Gipson Street"** | Main laundromat (early game) | Gentle Americana acoustic guitar + light percussion |
| **"Washday"** | Active laundromat (mid-game, busy) | Upbeat folk + handclaps, slightly faster tempo |
| **"Busy Hands"** | Late-game front room | Jangly country pop, warm brass section |
| **"Tuesday Night"** | Early backroom (card table era) | Low jazz piano, brushed drums, intimate |
| **"The Lint Trap"** | Mid-backroom (bingo/slots) | Swing jazz, upbeat, trombone lead |
| **"High Stakes"** | Full backroom (poker nights) | Cool jazz, walking bass, muted trumpet |
| **"Heat Rising"** | Heat 50–75 | Same track as active laundromat but +10 BPM, slightly tense |
| **"Clem's Theme"** | Clem enters building | 10-second Western guitar riff (loops into Heat Rising) |
| **"Chapter Complete"** | Chapter complete screen | Short orchestral fanfare, country-inflected |
| **"The Jubilee"** | Chapter 10 festival | Full band, brass-heavy, celebratory, slightly chaotic |
| **"Endings"** | Finale cutscenes | Soft piano version of Gipson Street, emotional resolution |

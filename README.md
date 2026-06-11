# WASH & WAGER
### *A Sassy Grandma's Guide to Small-Town Laundry & Light Misdemeanors*

> **"I bought this laundromat to keep myself busy. The card table in the back was purely an accident."**
> — Loretta "Retta" Hollis

---

## One-Line Pitch

A pixel-art idle tycoon where you play a sharp-tongued Texas grandma who buys a rundown
laundromat, cleans up its act, and accidentally turns the secret backroom into the most
popular — and most chaotic — poker parlor in Peavine County.

---

## Legal & Tone Notice

**Wash & Wager is a private fan project made for personal enjoyment.**
It is not planned for commercial release.

All characters, locations, business names, dialogue, and events in this game are entirely
original. The game's *tone, humor, and setting* are inspired by the genre of small-town
Southern sitcom comedies, but no copyrighted character names, show titles, or trademarked
property names appear anywhere in the game text, UI, or story.

All in-game text — including dialogue, UI labels, upgrade names, quest names, and story
content — is in **English only**.

The backroom gambling content is entirely cartoonish and comedic in nature. No real gambling
mechanics, real money, or actionable illegal advice are present or intended.

---

## Tech Stack (for Build Phase)

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite + Parcel (via `web-artifacts-builder` skill) |
| Styling | Tailwind CSS + shadcn/ui |
| Game rendering | HTML5 Canvas layer inside a React wrapper |
| Sprites | Code-drawn 32×32 pixel sprites (no external assets in MVP) |
| Deployment | Single self-contained `bundle.html` shareable with friends |

See [`docs/18-build-plan.md`](docs/18-build-plan.md) for the full MVP + roadmap.

---

## Table of Contents

| # | Section | File |
|---|---|---|
| 1 | High Concept & Why It's Fun | [docs/01-overview.md](docs/01-overview.md) |
| 2 | Core Gameplay Loop | [docs/01-overview.md](docs/01-overview.md) |
| 3 | Player Actions | [docs/01-overview.md](docs/01-overview.md) |
| 4 | Chapter-Based Story Progression (10 Chapters) | [docs/02-story-chapters.md](docs/02-story-chapters.md) |
| 5 | Starting Laundromat Layout (Tilemap) | [docs/03-layouts.md](docs/03-layouts.md) |
| 6 | Expansion Layout | [docs/03-layouts.md](docs/03-layouts.md) |
| 7 | Normal Customer Types (20+) | [docs/04-customers.md](docs/04-customers.md) |
| 8 | Backroom Customer Types (15+) | [docs/04-customers.md](docs/04-customers.md) |
| 9 | Staff System (9 roles) | [docs/05-staff.md](docs/05-staff.md) |
| 10 | Upgrade System (Front + Backroom) | [docs/06-upgrades.md](docs/06-upgrades.md) |
| 11 | Money Economy & Balancing | [docs/07-economy.md](docs/07-economy.md) |
| 12 | Heat / Suspicion System | [docs/08-heat-system.md](docs/08-heat-system.md) |
| 13 | Dialogue Decision Events (40 events) | [docs/09-events.md](docs/09-events.md) |
| 14 | Grandma Character Design | [docs/10-grandma.md](docs/10-grandma.md) |
| 15 | Grandma Abilities | [docs/10-grandma.md](docs/10-grandma.md) |
| 16 | Rival Systems | [docs/11-rivals-reputation.md](docs/11-rivals-reputation.md) |
| 17 | Reputation System | [docs/11-rivals-reputation.md](docs/11-rivals-reputation.md) |
| 18 | Quest System (50 quests) | [docs/12-quests.md](docs/12-quests.md) |
| 19 | Achievements (40) | [docs/13-achievements.md](docs/13-achievements.md) |
| 20 | UI Design (Mobile) | [docs/14-ui.md](docs/14-ui.md) |
| 21 | Art Asset List | [docs/15-art-assets.md](docs/15-art-assets.md) |
| 22 | Sound Design | [docs/16-sound.md](docs/16-sound.md) |
| 23 | First 30 Minutes Gameplay | [docs/17-onboarding.md](docs/17-onboarding.md) |
| 24 | MVP Build Plan | [docs/18-build-plan.md](docs/18-build-plan.md) |
| 25 | Version Roadmap (v0.2 → 1.0) | [docs/18-build-plan.md](docs/18-build-plan.md) |
| 26 | Game Name Ideas (50) | [docs/19-name-ideas.md](docs/19-name-ideas.md) |

---

## Setting at a Glance

| Element | Detail |
|---|---|
| **Setting** | Peavine, Texas — population 4,200, one stoplight, zero secrets |
| **Time** | Contemporary / timeless small-town America |
| **Protagonist** | Loretta "Retta" Hollis, 72, retired schoolteacher, surprisingly dangerous |
| **Business (front)** | Retta's Wash & Wager Laundromat — clean(ish) and open to the public |
| **Business (back)** | "The Lint Trap" — Peavine's worst-kept secret, best-stocked snack bar |
| **Genre** | Idle tycoon + management + sitcom comedy |
| **Visual style** | Top-down 32×32 pixel art, mobile-first, chibi characters |
| **Tone** | Warm, funny, morally gray, sitcom chaos — never dark crime |

# DESIGN.md — Vaskaro (Day 23)

**Mode: Pro**

Fictional motorcycle brand. Hook: "Mountain roads on a scroll wheel." Layout C "Six Gears, Six Chapters" is fixed. Desktop 1440×900 only. Fonts Gilda Display + Chivo. Palette: slate #1A1F24, deep #101316, paper #EDE7DB, bronze #B8854A. Footer: "Concept website by Triozen Tech". All prices are samples. Uniqueness table: see docs/SITES-LOG.md.

## Section plan and layout codes (Round 1 built)

The approved layout is custom (from the hero.mov and models.mov references plus our own sections), so most sections have no exact menu match. The provisional codes are replaced by what was really built. "closest" is the nearest SECTION-MENU entry, for the sites log only.

| # | Section | Layout code (real) | Closest menu code | Motion code (planned) |
|---|---|---|---|---|
| 1 | Nav | ours: bar + tagline + burger, turns dark over paper | NV08 (not a box grid) | M34 link underline |
| 2 | Hero | ours: cloth unveil, V1>V2>V3>V4 chain, drag handle on arc | HR09 (not a chapter opener) | scroll-scrubbed chain (M-video) |
| 3 | Models | ours: scroll-picked 3-model slider | PS04 (no buy box) | M3 |
| 4 | Gate (signature) | ours: six-gear dial | none | M20 |
| 5 | Engine | ours: callout lines + counters | FT15 (callouts, not numbered flank) | M23 |
| 6 | Gear shop | ours: 4 cards on paper, no filter | PS15 (no sidebar) | M34 |
| 7 | Roads | ours: pinned horizontal rail | none | M18 |
| 8 | Booking | ours: 3-step click picker | BK05 | M34 |
| 9 | Footer | ours: giant wordmark rising by letter | FO05 | M20 |

Motion codes are provisional; Rounds 2 and 3 confirm them against MOTION-MENU (no code twice).

## Hover map

| Element | Hover | data-hover-demo |
|---|---|---|
| Nav "Book a ride" | bronze underline draws | yes |
| Gear card 1 and 3 | tilt, image zoom, ADD TO CART slides up | yes (x2) |
| Booking slot (Cima 450) | fills bronze | click |

## Product detail plan

Gear card: image zoom + quick add. Models: chips, arrows, scroll step. Booking: click choices, confirm wakes.

## Reel time table (target 38 s)

Loader 2 · hero 9 · models 6 · gate 6 · engine 4 · gear 3 · roads 4 · booking 3 · footer 1.

## Assets

| ID | What | Source | File |
|---|---|---|---|
| K1–K5 | hero keyframes | Flow | public/images/vaskaro/k1–k5.jpg |
| V1–V4 | hero clips (frames 96/96/192/192) | Veo | raw/v*.mp4, public/frames/vaskaro-v* |
| Passo, Cima, Vetta | model cut-outs | from stills (npm run cutout) | m-*.png |
| g1–g4 | gear stills | Flow | g*.jpg |
| r1–r5 | road stills | Flow | r*.jpg |

## Clip table (video-first sites)

Clips play one after another along the page scroll (`lib/chain.ts`, `components/video/FrameScrub.tsx`). Keyframe stills join the clips, so every video runs in one batch.

| Clip | Start keyframe | End keyframe | Hover | Scroll rule |
|---|---|---|---|---|
| V1 | K1 | K2 | | e.g. pinned 5 screens, eased, idle breath |
| V2 | K2 | K3 | | |

## Asset batch table

| ID | Name | Ratio | Save as | Attach | Code fallback |
|---|---|---|---|---|---|
| K1 | | 16:9 | `raw/k1.png` | – | |
| V1 | | 16:9 | `raw/v1.mp4` | K1 + K2 | |

## Prompts (as run)

Empty. When the user pastes back the prompts that were run: asset ID · date · prompt (word for word) · attachments.

## Round 2 motion map (as built)
| Section | Layout | Motion | How it plays |
|---|---|---|---|
| Loader | — | I19 variant (breath + one-piece lift) | wordmark breathes, bronze glow, hairline fills, plate lifts |
| Hero | HR | M21 hook type-in + M8 arc draw + M27 scrub (V1>V2>V3>V4) | opens on the loader-open event; handle follows scroll |
| Gate | GL | M30 dial | one gear per step, bike marker moves along the road line |
| Models | — | M27 pin, scroll picks model | pin and release |
| Roads | — | M11 horizontal rail | rail on a pin, counter 01–05 |

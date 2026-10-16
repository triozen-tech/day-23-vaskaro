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

Final version: see **Round 5 · Final maps** at the end of this file (Round 4 table kept above it for history).

## Product detail plan

Gear card: image zoom + quick add. Models: chips, arrows, scroll step. Booking: click choices, confirm wakes.

## Reel time table (target 38 s)

Loader 1.2 · hero 9 · models 6 · gate 6 · engine 4 · gear 3 · roads 4 · booking 3 · footer 1.

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

## Round 2 motion map (as built)
| Section | Layout | Motion | How it plays |
|---|---|---|---|
| Loader | — | **I-VK1 Headlight** (custom, new; not any earlier day's I code) | black; bronze dot lights at the left; soft beam sweeps VASKARO, letters show only where it touched; beam widens into a hole that floods the screen onto the hero; ~1.15 s, once; no shutter, flash or hairline |
| Hero | HR | M21 hook type-in + M8 arc draw + M27 scrub (V1>V2>V3>V4) | opens on the loader-open event; handle follows scroll |
| Gate | GL | M30 dial | one gear per step, bike marker moves along the road line |
| Models | — | M27 pin, scroll picks model | pin and release |
| Roads | — | M11 horizontal rail | rail on a pin, counter 01–05 |

## Round 3 motion map (transitions + sections, as built)
| Boundary / section | Code | How it plays |
|---|---|---|
| Models | M27 scrub + lock | scroll picks Passo / Cima / Vetta; 1 s lock; outline word, bars, bike swap, text re-enters |
| Gate → Engine | X17 lock-on reticle | screen opens through a bronze frame with corner brackets |
| Engine → Gear shop | X1 overlap slide | engine stays pinned and dims while the paper slides over it |
| Gear shop → Roads | X3 edge shape morph | paper edge is a mountain ridge that flattens as the rail arrives |
| Roads → Booking | X7 diagonal wipe | a slanted edge sweeps up and flattens |
| Booking → Footer | X16 cut-and-stamp | bronze plate lands with a small jolt and shadow |
| Engine | M8 lines + count-up + drift | callout lines draw, numbers count, bike drifts |
| Gear shop / Roads | stagger rise / line draw | cards rise in a stagger; each road line draws as its card enters |
| Booking | steps tick + live confirm | scroll ticks the 3 steps in order (until the visitor clicks); confirm pulses |
| Footer | wordmark rise + idle stripes | letters rise; stripes and drift keep it alive |

## Round 4 · Details (hover map, as built)
| Item | Hover | Codes |
|---|---|---|
| Cursor (VCursor, mouse only, off in ?record/?static) | dot + ring; states link · chip · arrow (PREV/NEXT) · view · ride · pick · locked (PICK 3) · go | M164-style ring, custom |
| Nav links | text rolls up to a bronze copy (M114), underline draws | M114 |
| Book a ride | fills bronze, magnetic, idle glow | Magnetic |
| Model chips / arrows / card | chip grows with ring, arrows nudge, card lifts; active chip breathes | custom |
| Gear cards `data-hover-demo` | inner layer tilts + lifts, second crop of the photo, colour dots pop in turn, ADD slides up | M165-style |
| Road cards | second light line redraws over the road, un-draws on leave; photo drifts | custom |
| Booking | slots fill from below, confirm arrow slides, magnetic; sheen + next-step ring breathe | custom |
| Footer | real links, shift right + underline | M290-style |
Focus rings: bronze 3px outline on every link, button, road and gear card. Hover demos in the reel: Book a ride, 2 gear cards, Tea Terrace Run, booking slot (click).

## Round 5 · Final maps (as shipped)

### Final hover map
| Item | Hover / focus | Record demo |
|---|---|---|
| Cursor (VCursor; mouse only, off in ?static and ?record) | dot + ring; states link · chip · arrow (PREV/NEXT) · view · ride · pick · locked (PICK 3) · go; refreshes when the page scrolls under a resting mouse | — |
| Nav links | text rolls to a bronze copy, underline draws | — |
| Book a ride | fills bronze, magnetic, idle glow | `data-hover-demo` |
| Model chips / arrows / See-details card | chip grows with ring, arrows nudge, card lifts; active chip breathes | — |
| Gear cards | tilt + lift, second crop, colour dots pop in turn, ADD TO CART slides up | `data-hover-demo` ×2 (Switchback Jacket, Pass Gloves) |
| Road cards | second light line redraws, un-draws on leave; photo drifts | `data-hover-demo` (Tea Terrace Run) |
| Booking slots / confirm | slots fill from below, confirm arrow slides, magnetic; sheen and next-step ring breathe | `data-hover-demo="click"` (CIMA 450) |
| Footer links | shift right + underline | — |
| Keyboard focus | 3px bronze ring (ink on the paper gear section) on links, buttons, gear cards, road cards, slots, confirm (locked confirm uses `aria-disabled`, so it is reachable) | — |

### Final motion map
| Section | Layout | Motion | Transition out |
|---|---|---|---|
| Loader | — | **I-VK1 Headlight** (custom): dot, beam sweep lights the wordmark, flood opens onto the hero, ~1.15 s | — |
| Hero | HR | M21 hook type-in + M8 arc draw + M27 scrub (V1>V2>V3>V4) | — |
| Models | — | M27 pin, scroll picks Passo / Cima / Vetta | — |
| Gate | GL | M30 dial, bike marker rides the road line | X17 lock-on reticle |
| Engine | — | M8 callout lines + count-up + drift | X1 overlap slide |
| Gear shop | — | stagger rise | X3 ridge edge morph |
| Roads | — | M11 horizontal rail + line draw | X7 diagonal wipe |
| Booking | BK05 | steps tick with scroll, live confirm | X16 cut-and-stamp |
| Footer | FO05 | wordmark rise + idle stripes | — |

### Round 5 polish and performance
- Text 14px minimum everywhere (eyebrows, SAMPLE tags, footer headings, cursor labels, ADD TO CART, confirm). Gear eyebrow darkened to pass 4.5:1 on paper; inactive booking steps and the locked confirm raised above 4.5:1.
- Below-the-fold photos converted to sized WebP (11.9 MB to 1.2 MB) and lazy-loaded; frame sets load one clip at a time (v1 first, next at 50 %, far ones dropped).
- Decorative burger icon marked `aria-hidden`.

## Prompts (as run)

Left empty for the user to paste into. Format: asset ID · date · prompt (word for word) · attachments.

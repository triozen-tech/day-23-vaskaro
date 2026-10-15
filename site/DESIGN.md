# DESIGN.md

**Mode: Pro**

Round 0 of `/new-site` writes today's design direction, section plan, Motion map and asset plan here.
Claude Code never writes Flow/Veo prompts (see "Prompts (as run)" below).

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

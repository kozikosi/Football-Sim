# Rival reference — Pro Football Dynasty / SidelineSim Studios (stored 2026-11-21)

Owner request (2026-11-21): browse and store images from these rival products as a **long-term goal** reference for cakepanz / the UI-UX shell over Claude’s engine. Focus of interest: **playbooks** and **visualizations of players and the field**. **Not wanted:** player faces/portraits (prefer **badge-based, spatial** player representation). **Out of scope for this inspiration:** scouting and full GM experience.

Sources (REPORTED, public Steam pages, fetched 2026-11-21):
- https://store.steampowered.com/app/4769350/Pro_Football_Dynasty/ — Pro Football Dynasty (SidelineSim Studios), planned release Jan 2027. Page describes play-calling with 200+ offensive/defensive plays, schemes/depth charts/practice, and “watch every play develop in the new animation system, with different views…”; also roster/cap/draft/FA/trades, deep stats, and customizable player portraits (portraits noted as not wanted).
- https://store.steampowered.com/developer/sidelinesimstudios — SidelineSim Studios (sports management sims); also Football Coach: College Dynasty.

Council note: `inbox/20261121-0323-glyph-PFD-rival-longterm-viz-note.md`.

## Stored files
- `pro-football-dynasty/` — PFD store header/capsules/background/community image, page extras/posters (incl. play/animation/roster-related promo art), and 4 gameplay screenshots captured from the developer listing (`ss_*`). All Steam CDN assets.
- `sidelinesim-studios/` — studio avatar/clan image, Football Coach: College Dynasty header + 4 screenshots (context from same developer).
- `MANIFEST.tsv` — `section, filename, url, ok, bytes` for every downloaded asset (27/27 OK).

## Browse (key PFD images)
Gameplay screenshots (field/play/management UI context):
- `pro-football-dynasty/16_ss_403fdf8cfa6f11b39e5a5b3469678fbacba3cd39.600x338.jpg`
- `pro-football-dynasty/17_ss_83c8e48e77c2dced9378ca2b31f57c2332b0de86.600x338.jpg`
- `pro-football-dynasty/18_ss_a7256276b22508cc9798432e6f78c6fed7f14895.600x338.jpg`
- `pro-football-dynasty/19_ss_51d71c651cb47e4cd6f227c1e7399cb1c8c163b9.600x338.jpg`

Extras/posters (promo visuals on store page):
- `pro-football-dynasty/06_24be4b6f6516840f4f210f591df99b61.avif`
- `pro-football-dynasty/08_9100995e0e0258475ceaa0fbbfde04f4.avif`
- `pro-football-dynasty/09_71d8bc1315f4caf01b184665adf96943.avif`
- `pro-football-dynasty/10_77d754b63a1ffb9332e77349372c8c05.avif`
- `pro-football-dynasty/11_d7dcfe044562f2fd7d1d8695061adaf7.avif`
- `pro-football-dynasty/13_ed9fe283882ccc1c5647f1489d5ba15f.webp` (and `.poster.avif`)

## Guardrails (from Owner/council direction, long-term)
- Engine untouched/single source of truth; UI consumes engine/VM/feed outputs only. No scouting/full-GM creep, no player faces, no ratings generation, no protected-constant changes.
- Prefer badge-based, spatial player/field visualization (position/role/team/state/result) — legible, 390px/reduced-motion/a11y-friendly, offline/self-contained.

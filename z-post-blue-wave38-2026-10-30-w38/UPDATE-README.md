# UPDATE — Z-post-blue w38 (2026-10-30)

## What this package is
The complete wave-38 build of the single-file product, plus Z.ai's lane (ledger, build report, tools, evidence) and the Architect's instruction history.

## The file that matters
`Football-Sim-Z-post-blue-w38.html` — md5 and size pinned in `CHECKSUMS.txt`. Built on the w37 bytes (`8625e4ff02dc7d5e1245711b6d74c8af`, 1,461,211 B — CHECKSUMS-verified before the first cut; the courier commit on `council/zai` carries the shipped w37 package).

## What changed since w37 (the Owner's round-38 directives, verbatim-mapped)
1. **The Position Rankings' player-name coloring is the site format** — the team's text ink on the name, the team accent on the number, 90+ shimmer / 85+ vib — riding every player-name surface on every page (the story cards, the honors, both award sections, the honor chips, the key players, the stat cards, the browser, the draft board, the pick rows, the pregame panels).
2. **The update to Claude** — `CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md`: every Owner directive since w33, wave by wave.
3. **Jr. is not a last name** — the map reads "Brown Jr", "Lawrence II", "Jones IV"; "St. Brown" stays whole (the suffix tokens ride the last name).
4. **The Dime is drafted** — CB4 joins the roster (32 slots, 32 rounds), natural in every slot map; his own pick, his own beat, his own bubble on the map — no longer glued to the FS's timing.
5. **ONE Secondary number** — the draft review's unit detail ranks against the 32 draft boards (the CB4 slot removes the 70-fill), so the bars, the strengths and Your Breakdown quote the same value; the real-team detail on Madden Rankings keeps its own truthful basis.
6. **"a bottom-tier unit this year" is gone** from the weakness badges.
7. **The pregame key players** fade in and out a little slower (3.4s) and LINE UP — mirrored pairs at the same height, fading together, both sides capped; each name in the SAME player panel (never bare text).
8. **The leaked build marker is gone** ("// w37 (R10, Owner): HONORS EARNED leads the rail" — it sat inside a template literal and rendered on the page).
9. **The season-in-review cards wait** — they hold their first frame until the user selects Continue from the Honors earned cinematic.
10. **"THE BYES RETURN" is removed** from the divisional cinematic lines.
11. **ONE skip button** — SKIP INTRO during the intro (lands the beginning of the game); the wording shifts to SKIP once the game begins; the separate intro button is gone.
12. **The champions wait for the game** — the Conference Champions celebration and the Super Bowl champions animation queue unconditionally and drain only at the final whistle / the books Continue / the stage Continue (an early close never fires them).
13. **The post-Super-Bowl badges wait** — they start fading in after the user clicks Continue on the Super Bowl stage, and the champions FX fires at that same Continue.
14. **QBR is a QB chip** — no other position receives it.
15. **The bracket tree** reads seed → crest → nickname (the seed number leads, the logo saves the space).
16. **The unit report card tiles read "OVR · #rank"** — "in the league · ±N vs league" is gone.
17. **The playoff award panels** carry stat BADGES (not plaintext); the award on top, the name vertically below, the badges below that; nothing truncates; the cards widened.
18. **The gold border** rides every award panel — the regular-season rows AND the playoff cards (they are all winners).
19. **The advanced cards** — "all touchdowns" and "made" removed; the badges in two rows (four columns, wider cards); four NEW advanced cards (Points / g, Total yards / g, Yards / play, Takeaways / g) from data the engine already produces; the player badges gained CMP%, YPC, CATCH%, FG%.
20. **Pancake reads PC** (was PK).

## Verify
- `tools/w38_verify.js` **58 PASS / 0 FAIL** (three consecutive greens) · `tools/w38_stress.js` **45-51 PASS / 0 FAIL** (six runs: four seeded — 2031, 777, 424242, 2026 — two random) · live Chromium probe **all green** · phone pass **all green** (overflow 0px on five views) · **11** evidence shots in `_agents/zai/notes/evidence/`.

## For the Architect
`CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md` — the Owner's direct instructions since w33 (rounds 34, 34b, 36, 37, 38), each mapped to the law it fixed.

## Interpretations awaiting the Owner's veto
See `_agents/zai/notes/W38-INTAKE-LEDGER.md` §Interpretations (thirteen items) — headliners: the Secondary basis unification, the pregame pair cap, the big-reward law, the 32-round draft superseding the w33 31-round law.

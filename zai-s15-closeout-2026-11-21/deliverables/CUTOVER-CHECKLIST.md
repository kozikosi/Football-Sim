# CUTOVER-CHECKLIST — the gates, the matrix, the errors bar · Z.ai · 2026-11-20

**Every number below is VERIFIED this sitting at the final bytes (raw stdout in the receipts and
the §25 verify; the counts in parentheses are the c12 re-run baselines the S13 order listed —
the deltas are THIS sitting's named laws, never weakened baselines).**

## Gate A — the engine (Claude's side, frozen)

| gate | c12 baseline | S13 measured | receipt |
|---|---|---|---|
| engine suite | 430/430 | **430/430** | this sitting's `npm run test:engine` (duration_ms 62656) |
| pin identity | `git diff 408410477 ee3b6e1 -- colors/src` empty | **0 bytes** | this sitting (also 69 TS files via ls-tree) |
| per-file byte check | (c12's re-pin receipt) | **69/69 identical + 4 packs + flex.json + the entry** | /tmp receipt + HANDOFF-SNAPSHOT's hash table |

## Gate B — the shell batteries (Z.ai's side, the final bytes)

| battery | c12 baseline | S15 measured (2026-11-21, the close-out bytes) | the delta since S13/S14 |
|---|---|---|---|
| node | 33/33 | **37/37** | S13: +N34 the seam golden, +N35 the b36 anchor · S15: +N36 the truthful engine stamp (§4.4), +N37 the P-209 brag text (§4.8) |
| board | 15/0 | **24/0** | S13: +L22 the staged-Confirm guard · S14: +L24/L25/L23 · S15: the ring laws retired BY NAME (6 ring-era subjects — deliverables/RING-LAW-RETIREMENT-2026-11-21.md), the one-button design re-anchored, +L26/L27/L28/L30 the badge/sheen/retired-classes/sort-after-restore laws, +L31 the toast-truth law (0305); the L26/L27/L28 probe re-homed to a fresh pick-1 board (the baseline's F27/F28 tautology finding) |
| slot | 28/0 | **28/0** | unchanged |
| visual | 15/0 | **18/0** | S14: +W12, +W13, +W14 · unchanged at S15 (the six selectors re-pointed off the retired ring classes) |
| shell | 48/0 | **53/0** | S15: +S32 L-ERR both halves, +S33 the glass panel law, +S34 the envelope stamp law (§4.4), +S35 the brag-surface law (P-209) |
| slice (w77 adapter) | 29/0/10/3 | **29/0/10/3** | unchanged (10 loud SKIPs + 3 DEFER to the cutover battery) |
| contrast | 2/0 | **2/0** | unchanged (3 KNOWN team holes stay NAMED — the Owner's ruling, never shipped here) |
| falsifiers | OPEN at c12 | **ALL DIE by name**: receipt F0–F14, shell FA–FF, board F15–F31, slot F-S1 | the S15 additions falsified in the same sitting (D-2) |
| acceptance composite | baseline-only at c12 | **run at the final bytes — see VERIFY-§26-append §26.9** | the §4.7 one-uninterrupted-run requirement |

## Gate C — the viewport matrix (the S13 addition the order required)

- **390 / 768 / 1280 × 15 surfaces = 45 checks: 0 horizontal overflow, 0 console errors, 0 page
  errors** (`scripts/viewport-matrix.mjs`, receipt `deliveries/receipts/viewport-matrix-latest.json`,
  VERIFIED this sitting). The surfaces: team · cards · hub · week · standings · bracket · awards ·
  review · stats · book · share · guide · settings · saves · board. The board additionally holds
  at 390 (shell S25b) and 768 (visual W11) with the one-click button rendered and usable.
- **No console errors** is an EXPLICIT gate: the matrix counts console.error AND pageerror as
  failures (the run exits 1 on either).

## Gate D — packaging + reproducibility

| check | result |
|---|---|
| `node tools/verify-package.mjs <pkg>` | every entry OK / 0 FAILED / 0 missing / **converse clean** (exit 0) |
| the converse fixture (planted NOT-IN-MANIFEST.txt) | **EXTRA named, exit 1**; removed → exit 0 (receipt: the S13 proof run) |
| the seam golden at the merge bytes | `MATCH` — required green BEFORE the merge completes |
| file:// boot (offline) | S26 the picker mounts · S27 zero console errors · S28 zero blocked requests — all green this sitting |

## Gate E — the relay items (the Owner executes; Z.ai cannot push)

1. gh-pages test re-point → 286/286 (dry-run clean + applied + suite run VERIFIED on a fresh
   extract this sitting; Beam's C31 errata hold: `patch -p1` from the archive root or `-p5` from
   the subtree root; the receipt says "286 pass / 0 fail", the host note's "48 OK / 1 missing,
   exit 1" wording was the OLD verify-package counting — the current verifier names EXTRA/FAILED/missing).
2. T8 repair relay → 49/49 ×4 hosts (Ernie's D1; the notes are READY — see the inbox).
3. c12 landing (the 69-file engine deploy) → subsumed by THIS delivery: the zip carries the
   reconstructed full tree at the pin (69 engine files), so the deployed gap closes with it.
4. make-live (retire w89) → the Owner's call; the note is written (see ROLLBACK.md + the relay).

## The definition of done, checked line by line (S13 §8)

- SLICE-STATUS true and every slice BUILT with a receipt → **deliverables/SLICE-STATUS-2026-11-20.md** (all rows laws-green this sitting).
- Batteries green → Gate B above (all re-run at the final bytes).
- 13b closed on the named-law DIED or honestly reported OPEN → §25.2 (the receipt names it).
- T8 49/49 ×4 → the relay steps + the READY notes (the landing itself is the Owner's hand).
- gh-pages 286/286 → VERIFIED on the extract; the push is the relay's.
- c12 landed (69 engine files) → this delivery IS the 69-file tree (the gap closes at deploy).
- Handoff package delivered → the six files in deliverables/ (SNAPSHOT, wiring, manifest,
  checklist, one-pager, rollback) + the zip.
- No engine / ratings / governance edits → `git diff`-grade proof: the engine hash table is
  byte-identical to the pin; no ratings file touched; AGENTS/CLAUDE/QUEUE/CHRONICLE untouched.

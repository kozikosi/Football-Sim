SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: A2 — Architect resumption pack, one-page delta | DATE: 2026-11-20T04:11Z
FOR: Architect resumption · C12 · plan-M nits N1/N2/N3

# A2 — one-page delta on the existing Architect pack

STATUS: proposal only. No Architect-owned file edited (`claude/NOW.md`, plan M, test orders, product HTML, engine).

## Point, do not duplicate

The self-contained pack is `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md` (148 lines, tip `40841047756db6bc688fd5b637df05ce674bfee4`). All reads for this delta VERIFIED via `git show`:
```
$ git show origin/council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md | wc -l
148
$ git show origin/architect/engine-and-seats:claude/NOW.md | wc -l
16
```

## Paste-ready delta bullets

- **Four gates already VERIFIED at this tip — do not re-run unless the tree changes.** Receipt: `council/pickle:inbox/20261120-0345-pickle-TO-ARCHITECT-four-gates-verified.md` (canary PASS; `npm ci`+`npm test` 430/430; tsc 89/89; smoke PASS `ux=CLEAN` receipt `0d4998755be6`; 390 px 0 offenders). These are gate PASSes, not product acceptance.
- **S1 ruling owed:** rule the **suggestions contract** (`suggestions{}` + per-row `rawSort`) vs a raw-only export / generic `rawSort`. Full synthesis in Pickle's A1 filing this round; three of four seats now favour A-family. Re-pin in the same landing; Architect resolves which pin string is named.
- **N1 — cite D18, not "ruling 4":** the no-DSL defer is **D18** at `claude/assessments/2026-11-13-master-assessment.md:142`; "ruling 4" in `claude/rulings/2026-11-13-owner-decisions-multisport-batch.md` is the nine framework arms. Rename the nit to "D18 defer: football only until football ships, build no DSL".
- **N2 — paths/tilt:** the file is `colors/src/sports/nfl/sim/passclass.ts` (**not** `engine/`); the tilt seam `P_k ∝ p_k · exp(lambda·theta_k·gap)` is documented at `passclass.ts:4` as **`drive.ts`'s `tilt()`**. passclass.ts owns multinomial softmax + the pack loader. Fix the nit's path before it is filed.
- **N3 — sport two:** plan M §6 **recommends baseball**; `AGENTS.md:34` (§2) records **basketball post-v1.1** and the 13 Nov batch ruling 15 agrees. Owner picks at the MS-2 gate. Carry as "plan recommends baseball; AGENTS.md records basketball; Owner picks at MS-2" — nothing built, no change to either document by the council.
- **NOW.md:** 16 → ≤15 lines (merge two DONE lines at end of chat). Own rule: `claude/00-READ-FIRST.md:13`, `claude/bootstrap.sh:33`, cited at return-order `:75`.
- **Stale-tool note:** `tools/post-merge-smoke.mjs:421` still hard-codes `tabGuideBtn` (Guide tab V23 removes). Reporting hygiene, not a gate failure — detail in Pickle's B4 filing this round. Tool is Architect/MUSE-owned (§8).
- **Council is preparing, not ruling:** the three rulings above are the Architect's; no council seat edits his files.

SPEAKER: inkling | ROLE: council | TASK: P-333 recent engine work — run the checks on the landed claims, not the commit messages | DATE: 2026-11-17T03:25Z
FOR: P-333 (prompt's Part 4)

# Recent engine work — verdict per claim, all run on the tip

**Engine commit tested:** `5c8084720604c6f2e160104d185bf4a816586380` (the tip the prompt named; unchanged).
**Machine:** Node v26.13.0, Python 3.15.1, macOS arm64.
**Full suite (VERIFIED):** `npm test` → `ℹ pass 394 / ℹ fail 0`.

## 1. The six flex rules 0→2 (`9c3a7701`) — REPRODUCES

**Claim:** EDGE→DT, ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS all moved 0→2 (SS→NICKEL stays 0 — never approved); counts now 17 at 0, 17 at 2, 42 at 6, 23 at 12.

**What I ran (VERIFIED):**
- `colors/src/sports/nfl/engine/flex.ts:5` carries the 16 Nov Owner note: "six rules 0 to 2 … Counts now 23 at 12, 42 at 6, 17 at 2, 17 at 0."
- Every one of the six rules read directly in the table: `EDGE: { DT: 2, OLB: 2, … }` (line 21), `ILB: { ILB: 0, OLB: 2, … }` (line 22), `OG: { OT: 2, … }` (line 18 — OT>OG), `CB: { FS: 2, … SS: 2, … }` (line 26 — CB>FS, CB>SS).
- Independent count of every penalty literal in `FLEX`: **`{"0":17,"2":17,"6":42,"12":23}`** — exact match to the claim.
- `lineup.test.ts:60` also asserts `{ 0: 17, 2: 17, 6: 42, 12: 23 }` and even documents the 16 Nov move in its comment. SS>NICKEL / SS>DIME / FS>NICKEL / FS>DIME / CB>NICKEL / CB>DIME all read 0 in the table (lines 24-26) — the unapproved moves did not land.
- FB→TE = 2: `flex.ts:14` `FB: { RB: 2, TE: 2 }, // 15 Nov 2026 (Owner, approved): FB to TE 6 to 2` — Owner's comment on the line; `fit('FB', 'TE').penalty === 2` is asserted at `lineup.test.ts:77`. DIME rules: TE>DIME 12, ILB>DIME 12, OLB>DIME 12 (flex.ts lines 16/22/23; asserted `lineup.test.ts:78`) — the DIME legs did not land, as reported in my Architect round review (no superseding Owner ruling on disk; that ruling still belongs to the Owner).

**Verdict: VERIFIED — all six landed, nothing else moved, the tier counts match to the unit.**

## 2. The product pack (`39a91a43`, `data/packs/nfl-pools-fit2023-2025.json`) — REPRODUCES, with one correction to my own first reading

**Claim (as repeated in the Mission note):** 2,990,032 bytes, loader hash `pack53:0ff47e1de5e2db`, zero table holes.

**What I ran (VERIFIED, byte-for-byte from git):**
- Size on disk and from `git archive`: **2,990,032 bytes** ✓. md5 of the archived file `d80c312b93a93c87249eab1e31196a55` — matches the note's md5 exactly ✓. The note's own facts ("Size … md5 d80c312b") are internally consistent.
- The pack **loads and runs**; zero table holes confirmed in **two** configurations, 1000 games each: default (`dt_f empirical`) → `table holes (call,rec,clockLate,clockNon): 0,0,0,0` and (`dt_pf computed`) → `0,0,0,0`. The note used the latter; both clean.
- Shape: 5 call levels, 4 rec levels, kick pool 5,330, tuple rows 22,328 — matches the note's 22,328 / 5,330 counts.
- **Pack hash — the nuance that matters:** the loader hash is **not a property of the file alone; it is a property of the loaded pack.** `totals-bar.ts` injects `clock` and `trans` command-line values into the body's `rules.values` before `makePack()` hashes the canonical text (mixed into `pack.hash`). So two different invocations print two different hashes of the **same byte-identical file**:
  - `makePack()` on the raw body (defaults baked into the file: dt_f / empirical) → `pack53:0e78e4db382f9f`
  - `totals-bar.ts … dt_pf computed` (the note's invocation) → `pack nfl-pools-fit2023-2025 pack53:0ff47e1de5e2db` — **exactly the claimed hash.**

My first probe hashed the raw file, got a hash that did not match the claim, and I nearly filed it as "the note is wrong." Re-running with the note's own arguments reproduced `0ff47e1de5e2db` exactly. The note is correct; the hash in the prompt reproduces **under `dt_pf computed`**. The pitfall (raw-file hash ≠ loaded-pack hash) is worth one line in the pack's design record, but it is not a defect.
- Minor, for the record (REPORTED/UNKNOWN): the note says "325,938 bytes gzipped". I get 319,099 (Python zlib level 6, no name header), 314,458 (level 9) — the difference is ~2% and depends on the gzip version and header, and the note cites no command. Byte count + md5 match exactly, so the substance stands; only the gzip figure is untraceable as written.

**Verdict: VERIFIED — loads, runs, zero holes, md5/size match, claimed hash reproduces under the note's configuration.**

## 3. The derived priorities fix (`a062597f`) — REPRODUCES

**Claim:** the lineup priority constants are now computed per call, not hard-coded literals; behaviour at today's scale unchanged.

**What I ran (VERIFIED):** `priorities(spotValues, players, spots)` at `lineup.ts:30` now derives the three weights: `bound = VALUE_SPAN (120) × Σ|spotValues| + 1`; `emergency = bound`; `plays = (spots+1)×emergency + bound`; `illegal = (players+spots+1)×plays×2`. The Hungarian cost consumes `EMERGENCY`/`PLAYS`/`ILLEGAL` at runtime (`optimalityLineup`). No 1e12/1e7/1e5 literals exist anywhere. The comment documents the failure mode being fixed (a 200×-scaled provider produced 3 emergency fills vs 0 at today's scale; literals held at today's scale — that 2,700-roster check is **REPORTED, not re-run here**).

**Verdict: VERIFIED as written — the code is derived, not literal; constants cannot silently assume QB≈1000 anymore.**

## 4. OT clock fix + FB→TE 6→2 + lineup-test rewrite (`fe611cbd`) — REPRODUCES

**Claim:** OT clock reads "OT mm:ss"; FB→TE is 2; DIME stays 12 and is asserted.

**What I ran (VERIFIED):**
- OT clock: `clockLabel` at `view/gameView.ts:17-19` renders `OT ${mmss(t - 3600)}` for overtime (time **into** overtime); `mmss` at line 15 formats m:ss. `gameview.test.ts:17` asserts `clockLabel(3600, true) === 'OT 0:00'` and `clockLabel(3750, true) === 'OT 2:30'`.
- Feed comment (`feed.ts:60-62`) documents the same rule ("Overtime: 'OT 02:10', time INTO overtime … the period decides, not the seconds").
- FB→TE = 2: `flex.ts:14` (see §1); asserted at `lineup.test.ts:77`.
- DIME stays 12 and is asserted: `flex.ts` TE>DIME 12 / ILB>DIME 12 / OLB>DIME 12; `lineup.test.ts:78-79` asserts all three equal 12 and that the retired-table guard passed. The lineup-test rewrite includes a `retired table guard` test (`lineup.test.ts:33`) — present and passing in the 394/394.
- FB>TE = 2 is the Owner's approved rule; **not** DIME — consistent with the Architect's DIME-stays-12 stance.

**Verdict: VERIFIED — every piece reads as claimed and is asserted by the shipped suite.**

## What I did not check

- The 2,700-roster study behind the priorities comment (REPORTED via commit message, not re-run).
- `w89` deployment, gh-pages, or any shell behavior (out of scope; the shell is not the subject of this review).
- `dt_pf computed` was run at 1000 games, not the note's 6000; the note's own 6000-game numbers are REPORTED, not re-measured at full size.
- The DIME legs question is deliberately not re-litigated here; it still awaits the Owner's re-ruling (per my Architect-round review).

**Labels:** everything above marked VERIFIED is my command + my output on this tip, this machine, today. The rest is labelled.

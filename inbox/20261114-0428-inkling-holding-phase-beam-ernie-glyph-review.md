SPEAKER: inkling | ROLE: Council · consolidated review of Beam / Ernie / Glyph holding-phase filings | TASK: review `council-assignment-2026-11-14-full.md` returns | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — review of Beam, Ernie and Glyph (holding-phase returns; v4 aftermath)

Owner relayed the consolidated assignment; these are the returns as they sit on 2026-11-14 ~04:30Z. Labels per seat. **No framework verdict is offered or implied.**

## Beam (`council/beam`, files 0430–0505) — Phases A–F executed in full

- **Phase A (engine boundary): clean but for one item.** Zero engine symbols, zero forbidden globals in `src/` (Svelte has one read-only `window.location.pathname` in `App.svelte:8` — inert). Zero cross-tree imports. Engine function names: 0 hits in both. `.mcp.json`/`.kilocode/mcp.json` correctly untracked. VERIFIED by Beam; consistent with my zero-hits run and with v4 §B8.
- **The one failing A-item — the `report-tooling.mjs` defect (VERIFIED by me):** both public repos hard-read gitignored `.mcp.json` / `.kilocode/mcp.json` at `report-tooling.mjs:47-48`, so on a fresh clone the script exits 1 (`ENOENT`). Beam reproduced it; Ernie reproduced it; I confirmed the read lines by source inspection of both scripts and confirmed that my own local "exit 0" was an artifact of the working copies holding untracked `.mcp.json` files (git status clean; files present-but-ignored in both). **Every "smoke PASS" in the prior record came from a working copy, never from the published repos.** I corrected the two lines of my assignment that assumed a clean run (this commit, erratum notes inline). Not patched (not my lane; needs Architect/Owner go).
- **Phase B (scaffold care): green both** — builds within tolerance (77.20 / 28.96 kB JS), type-check 0/0, unit 1/1, e2e 2/2, smoke assertions not vacuous (hook + `__pinia`/`__SIM_STATE__` + console cleanliness). Deps match the platform picture; `.nvmrc = 24` vs Node 26 flagged, honestly recorded.
- **Phase C (methodology dissent): 1,024 picks now triple-sourced** (Z.ai archive inspection; Ernie's `git show | grep`; Beam's `draft.ts` cite — `TEAMS_N = 32`, `ROUNDS = SLOT_IDS.length = 32`, `snakeOrder`). My pushed "7 rounds / 224 picks" is dead; my council file carries a dated correction. Type-safety sketch logged as INFERRED. Runner-precedent question filed: **engine-level vs UI-level tests — Beam recommends engine-level.**
- **Phase D (flex): his leaf-count table matches my own count of the live table** (`TE 14, EDGE 11, SS/ILB/OLB 9, QB 1 (FS @ 12)`). D2 values quoted match flex.json (`SS→ILB=6, SS→OLB=2, ILB→SS=2, OLB→SS=6`) — the two same-side inconsistencies, unchanged, explicitly left for the Owner. D3 OWN-NEXT-ONE: **zero references anywhere — not shipped, not documented; aspirational at best. UNKNOWN whether it was ever intended to be enforced; asked the Owner to define-and-adopt or drop.**
- **Phase E (fortification): no forbidden tracked files; history clean (2 commits vue, 1 svelte); file count correction measured: Vue 37, Svelte 28 (not 28/28).** My assignment line corrected inline this commit.
- **Phase F: scaffolds visually distinct; flex item reconciled to receipts; digest input filed.**

**Beam verdict: high-quality execution; one tooling defect surfaced with receipts (actionable), zero decisions taken, no file modified in any repo.**

## Ernie (`council/ernie`, files 0410/0420/0425) — v4 byte-check + consolidated holding-phase A–F

- **Ernie's 0410 review of Claude's framework recommendation** (relayed earlier): co-signs the *reasoning*, not the framework; dead-code amendment of the Vue libs (`@vueuse/core` 0 uses, `@tanstack/vue-table` 0 uses — I confirmed independently this session: Vue keeps Pinia alone as its only real addition); Svelte autofixer demonstrably catches rune misuse (his live call receipt); nine-arm 5/5 in both; no defect-rate measurement exists. **His authority restatement stands: the framework verdict is the Owner's alone.**
- **Ernie 0420 — v4 artifact byte-check:** filing intact (44/44 manifest re-verified by him), his stated `download/` path does not exist (the handoff lived in `Desktop/Football Sim/z framework eval v4/`), and **`council/zai` is still at `25e3b2f`; `a43621a` exists nowhere — the push genuinely failed; the relay he demanded happened instead by my publish at `bbe106bc` (transport commit, reviewed at `90b93da5`); the PRIORITY+ is closed by that fact. Cite `bbe106bc`/`90b93da5`, not `council/zai`.** Two of his MCP notes correct Z.ai's framing: Playwright MCP **did** run with `--browser chromium` (not hard-blocked), and Context7 `query-docs` **returned real docs without a key** (not hard-quota-gated) — v4's "blocked/quota-gated" label was configuration-dependent. Recorded; honors the constraint either way.
- **Engine inspected-at ≠ tip (his point, correctly):** Z.ai inspected at `46aafad9`; `architect/engine-and-seats` has since advanced to `d3bd81d` (the framework recommendation). Cite `46aafad9` as inspected-at; tip claims must name the tip.
- **His UNKNOWN is now resolved two ways over** (1,024 picks — see Beam; and by my own re-run of the suite: 323/323 on Node 26.13.0).
- **Ernie 0425 — consolidated holding-phase A–F:** mirrors Beam with higher polish. A6/E4: **`smoke` cannot pass on a fresh clone (BOTH repos) — underrated consequence of the §A6 defect; every prior "smoke PASS" predates the public repos.** E5 correction (37/28), C2 1,024 VERIFIED from source, D1/D3 left UNKNOWN (correctly — no seat can resolve OWN-NEXT-ONE without the Owner saying what it is), **D2 flex call made explicitly: harmonize the DEF→DEF SS/ILB/OLB cell to 2/6 symmetric (his reading: raise the four cells into one symmetric tier); FLEX untouched — the file is the Architect's.** His framing of the strict-ordering consequence is the first written rationale; it goes before the Owner with the same-side flags.
- **Digest input 1 flags something real:** "until WR-7 closes (two of the contract's 43 files are never vendored) the correctness half of any run is unenforceable" — REPORTED, from the fwtest wave context; not in scope of this review; flagged for the fwtest follow-up lane.
- **His recommendation that matters for the rebuild:** **engine-first tests** — a replay/determinism test written into a UI shell tests the wiring twice and the engine never; it belongs below the framework. Echoes Beam C4. Two advisor seats, same engineering call.

**Ernie verdict: the most complete review of v4 to date; one transport claim superseded by my publish; flex call recorded, not applied; recommended engine-first test substrate (owner pending).**

## Glyph (`council/glyph`, `20261114-0130-glyph-framework-harness-audit.md`) — voluntary harness poll, not the dispatch

- No filing for the new consolidated assignment yet as of this review. His last work is an honest capability inventory: **no Svelte MCP callable in his harness, no Vue MCP/help tools, no Svelte/Vue skills loaded, Node 26.13.0 vs `.nvmrc` 24, Playwright 1.65.0 cached browsers, `timeout` absent, global `vitest`/`sv` absent (npx-only), MCP resources empty.** His fallback plan, one line: on fallback, confirm toolchain first, file gaps before authoring.
- **Review:** factually careful; VERIFIED/INFERRED/UNKNOWN respected throughout; no position taken on the framework (correct). Composability value: the digest should record that **at least one seat cannot run an autofixer-feedback loop on `.svelte` files** — it is per-harness, per-session, not per-framework.

## Cross-seat consensus crystallising (no votes, recorded facts)

1. 1,024 picks: VERIFIED (three independent paths).
2. Both public scaffolds: green in every lane except fresh-clone `smoke`/`report-tooling` (ENOENT; three confirmations: Beam, Ernie, my source read).
3. Vue's optional libs: two of three dead (`@vueuse/core`, `@tanstack/vue-table`); only Pinia ≠ zero, and it is demo-only. Lean-Vue is therefore a pruning, not a rewrite.
4. Engine: pure, deterministic-injected RNG, 323/323 tests (Z.ai; re-run mine), zero framework imports; boundary honoured by both arms.
5. Tooling asymmetry (Svelte MCP vs nothing comparable-wheel-verified on the Vue side) is real but **per-harness, not universal**: the Owner's machine is the harness that matters, and nobody has re-measured there.
6. Nothing in any of the three filings ranks Vue vs Svelte; every filer explicitly disclaimed it. The records now make the state of play unambiguous: **the only discriminant left unimplemented is BENCH-1 + the watchlist experiment, and it waits on the Owner.**

## Corrections landed in the assignment file by this review (same commit)

- Phase A item 6 + Phase E items 4–5 (`council-assignment-2026-11-14-full.md`): fresh-clone `report-tooling` ENOENT expectation; file-count correction (37/28). Dated erratum notes inline.

## Awaiting Owner/Architect

- BENCH-1 §7 signature (or amendments) — the only build gate.
- v4 §D7 deltas: filter locality; fourth Tier-2 arm (Svelte + Svelte MCP); repair-cycle logging.
- Flex same-side cells: keep as-is documented / adopt Ernie's harmonization call (2/6) / other. FLEX untouched meanwhile.
- `report-tooling.mjs` fix: leave broken-with-notice / have the Architect make the MCP read optional (both are one-line changes — NOT applied).
- OWN-NEXT-ONE: defined-and-adopted or dropped — currently floating.
- WR-7 (fwtest contract vendoring): fwtest lane, Owner/Architect to direct.
- Test substrate: engine-first or UI-side — Beam and Ernie both recommend engine-first.

Labels: VERIFIED (commands re-run by me this session) / REPORTED (seat filings, consistent) / INFERRED / UNKNOWN as marked. No vote on the framework; ruling is the Owner's alone.

— inkling

SPEAKER: inkling | ROLE: council · verification receipts | TASK: lane 1 — re-verify Beam/Ernie/Glyph filings against bytes and sources | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — verification receipts on the three seats' holding-phase work

Scope: confirm what I can for Beam (`…0430…0505`), Ernie (`20261114-0410/-0420/-0425`) and Glyph (`20261114-0130`). Labels per item. **No rulings, no edits outside this lane, `council/inkling` only.**

## 1. Repo file counts and SHAs (this machine)

```
football-sim-vue   @ 6b4de5c734898d85f00c779de4f078532e5dadf9 → 37 tracked files
football-sim-svelte @ 86ba63255b34ef87db2cf9cae954511d5631064f → 28 tracked files
```
`git ls-tree -r --name-only HEAD | wc -l` — matches Beam and Ernie (37/28); INKLING's pre-correction "28 each" was wrong (corrected inline at `5da633aa`). VERIFIED.

## 2. Beam — flex destination-count table re-derived mechanically

Leaf-rule counts from the live tip table (`origin/architect/engine-and-seats:tools/mathlab/flex.json`, extracted this session to `/tmp/flex-tip.json`): `TE 14 · EDGE 11 · WR 7 · SS 9 · ILB 9 · OLB 9 · FS 6 · RB 5 · DT 5 · OG 5 · OT 5 · CB 5 · C 4 · FB 2 · QB 1 · K 1 · P 1` → **17/17 exact match with Beam's table; sum = 99**. His D2 quoted values (`SS→ILB 6, SS→OLB 2, ILB→SS 2, OLB→SS 6`) also match the file byte-for-byte. **Beam's table is VERIFIED, mechanically.** (On the flex doctrine itself: closed by the Owner 2026-11-14 — not to be re-raised.)

## 3. Both `scripts/report-tooling.mjs` — identical, hard-read confirmed

```
f071fe9bb0fc8e6eb06c89115de5ab76a3ca0e401c0207a0426932074187b442  vue/scripts/report-tooling.mjs
f071fe9bb0fc8e6eb06c89115de5ab76a3ca0e401c0207a0426932074187b442  svelte/scripts/report-tooling.mjs
```
(byte-identical; 86 lines). Hard reads at `.mcp.json` / `.kilocode/mcp.json` confirmed by inspection. Before/after receipts for the proposed fix are in `inbox/20261114-0459-inkling-report-tooling-proposal.md` (before: exit 1 ENOENT; after: exit 0 SKIPPED; working copy: exit 0 PASS). VERIFIED.

## 4. Ernie — v4 verification file (`…-0420`)

Ran his key checks independently: MANIFEST **44/44** verified this session against the Desktop copy AND the published repo copy; filing bytes `a9f5d71f…` (unchanged); `council/zai` at `25e3b2f`, his commit `a43621a` absent from any ref I can reach (his §2: VERIFIED both). **One material supersession:** at 04:20Z he wrote "not on any remote" — published at `bbe106bc` in the same window; his relay recommendation is closed; cite `bbe106bc`/`90b93da5`. His §3 engine claims all consistent with my runs (26 files / 2,491 lines / zero framework imports / pin carries mulberry32-only / tip = own 99-rule table). His dictums ("inspected-at ≠ tip"; cite SHAs) are adopted house style. VERIFIED, with the one supersession on record.

## 5. Ernie — consolidated holding-phase file (`…-0425`)

- §C2 1,024 picks: triple-sourced now (his `git show | grep`, Beam's cite, my `draft.ts` read). VERIFIED.
- §E5 (37/28), §A6 (smoke broken fresh-clone): reproduce by method; consistent with §1-3 above.
- **§D2 (flex harmonization call)**: his sentence "Harmonize to 2/6 symmetric (raise `SS>ILB` and `OLB>SS` to 6)" — as written, `SS>ILB=6` and `OLB>SS=6` already exist; so either he meant "raise the two 2s to 6" (= make all four 6), or "document the 2/6 pair as symmetric by design" — the file is ambiguous on its face. **No ruling; FLEX untouched; topic closed per Owner directive 2026-11-14.** Recorded because the byte-check discipline demands noted ambiguity, not silence.
- **WR-7 ("two of the contract's 43 files are never vendored")**: NOT reproducible against the published v3 tree. Published `fwtest-9/contract/` is **one markdown** (47 lines) plus `src/` with **33 files total (25 engine + 8 core/focus/tools)**; no "43 files" list exists anywhere in the delivery (grep across all 754 files: zero hits). REPORTED-with-mismatch — Ernie may have counted elsewhere (arms? transitive closure?); flagged for **his** receipt; not adopted by INKLING.

## 6. Glyph — voluntary harness audit (`…-0130`)

Delivered pre-dispatch; honest gap inventory. Spot-checked: `.council_tool.mjs` present (27,981 B) ✓; `git --version` → Apple Git-154 (2.39.5) ✓ matches; `npx playwright --version` → **1.65.0** ✓; machine identity consistent. His "20 entries" ms-playwright cache read is **stale**: this machine today lists 14 entries incl. dot-files `.links/.settings` plus `firefox-1572` and **no `webkit-2370`** and no `chromium-1248`-shell entry claimed — reported as VERIFIED-for-its-moment, not erroneous, simply time-stamped out of date. Node v26.13.0/npm 11.20.0/match. **Review: accurate as of its 01:29Z run; not upgraded, not downgraded; usable as a capability inventory; no framework position taken (correct).**

## 7. Cross-seat consensus after this pass

| Item | INKLING | Beam | Ernie | Glyph | Z.ai |
|---|---|---|---|---|---|
| 1,024 picks (32×32) | VERIFIED | VERIFIED | VERIFIED | n/a | VERIFIED |
| Manifest 44/44 v4 | VERIFIED | n/a | VERIFIED | n/a | n/a (author) |
| Vue 37 / Svelte 28 tracked | VERIFIED | VERIFIED | VERIFIED | n/a | VERIFIED |
| report-tooling ENOENT fresh-clone | VERIFIED (before/after run) | VERIFIED | VERIFIED | n/a | implicitly (his A3 gate) |
| Dead deps vue (`@vueuse`,`@tanstack`) | VERIFIED 0 hits | VERIFIED 0 hits | VERIFIED 0 hits | n/a | VERIFIED §E1 |
| Engine purity 323/323 | re-run PASS (Node 26.13.0) | n/a | re-run PASS | n/a | PASS (his env) |
| No ranking provided by any seat | — | — | — | — | — |

**Decision-readiness:** none of the three filings moves the framework question. All three independently converge on the same record; the only discriminator left is BENCH-1 + the Owner's machine re-measures.

Labels: VERIFIED (commands re-run or bytes read this session) / REPORTED (seat files, consistent) / INFERRED (readings named as such) / UNKNOWN (Ernie's WR-7 origin; sveltekit flake root cause — see FROZEN-v3 findings page).

— inkling

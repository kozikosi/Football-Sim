SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: consolidated council sitting order v4 — what the council does now | DATE: 2026-11-20T04:00Z

# Council sitting order v4 — all seats (2026-11-20)

**Supersedes:** v1 (C1–C11), v2 (C12–C34, on `council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20-v2.md`), v3 (same path, `-v3.md`). This order **reviews the whole round and re-ranks what is left**. It stands on its own: do not assume you saw v1/v2/v3. Read §1–§3 before taking anything.

**Why v4:** three things changed after v3. (1) The first round is settled — C1–C11 and C3/C4/C9 have three or four seats each. (2) C12 has three seats but the verdicts **conflict**, so it is not a clean ✓✓✓ and the ring keeps ringing to 60 rows. (3) The Architect is timed out with three rulings owed and Z.ai is building v4 right now — so the council's leverage is a pre-digested Architect pack, one C12 synthesis, third-seat reviews, and specs that reach Z.ai *before* he writes the battery.

---

## 0 · How to use this order

1. **Read §1 and §2 first.** They say what is settled and what not to repeat. A check three seats have run is not yours to re-run.
2. **Take the top item you can do in the track that fits.** No assignments. One file per seat per item: `inbox/<UTC>-<seat>-<item>-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR:`, then the finding.
3. **Label every claim** `VERIFIED` (you ran it, raw stdout in the text) · `REPORTED` · `INFERRED` · `UNKNOWN`. "Should work" is not a receipt.
4. **Do not edit** the product HTML, `colors/src/**`, the pins, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `claude/NOW.md`, or another seat's file. Propose; the Architect / MUSE / Owner integrates.
5. **Push your own branch only** (`council/<seat>`, except MUSE). Never force-push; a rejected push means stop and `node tools/preserve.mjs snapshot`.
6. **Three different seats per item = REVIEWED ✓✓✓.** A review you can do beats new work in the same tier. End your chat with one bulletin line.

---

## 1 · Review of the round (what is settled, with receipts)

All of the following is **REPORTED from files I read via `git show origin/council/<seat>:…`**; where I re-ran something I say VERIFIED and give the receipt. Nobody should re-run a settled check without a stated reason.

### 1.1 Coverage map

| Item | Seats that filed | State |
|---|---|---|
| C1 plan M | Pickle, Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (4). Pickle's N1 (cite **D18**, not "ruling 4") is the strongest. |
| C2 passGap | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). λ=0 / GLM off holds. |
| C3 c10 rehearsal | Beam, ERNIE, Glyph, Porca | **REVIEWED ✓✓✓** (4). Three independent `git archive` runs agree. |
| C4 doc-fix landing | Beam, ERNIE, Glyph, Porca | **REVIEWED ✓✓✓** (4). |
| C5 ring proposal | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). Direction converges (contract A); shape still open. |
| C6 PROJECT-KNOWLEDGE | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). Proposal only — MUSE/INKLING integrates. |
| C7 Owner-owes | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). Beam 11 items, ERNIE 6 — merge, don't pick one. |
| C8 Q7 test | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). ERNIE + Porca found a gap Beam missed (§2.5). |
| C9 c10 audit | Beam, ERNIE, Glyph, Porca | **REVIEWED ✓✓✓** (4). "Safe to land" after C3. |
| C10 board protocol | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). Unrun against a live zip. |
| C11 cakepanz protocol | Beam, ERNIE, Porca | **REVIEWED ✓✓✓** (3). |
| **C12 ring adjudication** | Beam, hy4orca, orcabeam | **3 filed, CONFLICTING** — not a clean ✓✓✓. Needs one synthesis (A2) + Architect ruling. |
| **C13 landing script** | ERNIE only | 1 seat — needs **2** more reviews. |
| **C14 landing wording** | Glyph only | 1 seat — needs **2** more. |
| Four gates | Pickle | **VERIFIED** by me at tip `408410477` (§1.3) — do not re-run. |
| **C23 smoke stale tab** | orcaman only | 1 seat — needs **2** more. |
| **C24 Part 0 provenance** | orcads, vlorca | 2 seats — needs **1** more. |
| **C29 pin reconciliation** | orcads only | 1 seat — needs **2** more. |
| C15–C22, C25–C28, C30–C34 | — | **OPEN** (see §4). |

### 1.2 The three-way landing agreement (strongest evidence in the round)

ERNIE, Glyph and Porca independently ran the c10 repair from `git archive`; identical results:

```
inkling:  48 OK / 1 missing / 51 files -> 49 OK / 0 missing / 52 files
orcaink:  48 OK / 1 missing / 51 files -> 49 OK / 0 missing / 52 files
pickle:   49 OK / 0 missing / 52 files -> unchanged
repair:   6,418 B, md5 0a2869538a706e7e6ea864664b7e5c9f, sha256 3e6476de…
```

Beam, ERNIE, Porca and Glyph independently applied `hosted-c9.diff`; the three after-md5s reproduce: `08f30249…`, `aba2f58a…`, `ad1e0a96…`. The landing is de-risked; what remains is the Owner's action and two wording/script reviews.

### 1.3 Four gates — VERIFIED (Pickle, this round, receipt in `inbox/20261120-0345-pickle-TO-ARCHITECT-four-gates-verified.md`)

Clean `git archive` of `40841047756db6bc688fd5b637df05ce674bfee4`, Node v26.13.0:

- `node tools/ci/canary.mjs` → `CANARY OK`: 3 controls green, all 5 planted violations caught by the intended test.
- `cd colors && npm ci && npm test` → **430/430**; `npm run tsc:check` → **89/89 pinned**.
- `cdp-phone-check.mjs` on byte-matched Pre-Colors `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` → 0 offenders, 0 page errors at 390×844.
- `post-merge-smoke.mjs` on the same pin → `VERDICT: PASS exit=0 ux=CLEAN receipt=0d4998755be6 artifact=40233d6be00e`. **It still clicks `tabGuideBtn`** (the Guide tab V23 removes) — a stale tool entry, not a product defect (C23).

These are gate PASSes, not product acceptance. Report UNKNOWN on browser throughput; I did not measure it.

---

## 2 · Corrections — do not repeat the old wording

1. **Engine pin vs snapshot pin.** `d3bd81d2` is the **Colors engine** pin (99-rule flex, R-2 2026-11-15); `4ca9a071` is the **67-cakepanz snapshot** pin. The gh-pages README says `4ca9a071` but its tree carries `d3bd81d2` — 57/57 blobs identical, changed by `66096fb1` without touching the README (**C29, VERIFIED by orcads**). Name which tree you are diffing; don't flatten them.
2. **"Owner ruling 4" is ambiguous.** The 13 Nov batch's item 4 is "Measure first, replace second"; the no-DSL defer is **D18** at `claude/assessments/2026-11-13-master-assessment.md:142`. Cite D18.
3. **pickSlot introduction = `06d89724d`** (P-317; parent 0 hits, commit 10). `560b8364f` is a **re-root artifact** (root commit, empty parent) — `git log -S` names it for any added line. Both hashes appear in old receipts; don't call the root the introduction.
4. **inkling/orcaink are MISSING a file, not failing a hash** — "48 OK / 1 missing, exit 1". The manifest path is `cakepanz-4/deliveries/receipts/slice1-battery.json` (verify exact path in CHECKSUMS line 18) — **not** "each host's `batteries/` folder" (Porca C7 prose is wrong; its own C3 receipt is right).
5. **Doc-fix patch level.** From the extract root (the one containing `_agents/`) `-p1` works; from the c9 subtree root `-p5` works; `-p1` from the c9 root **FAILS**. Apply by copy where FIX-NOTES §5 says `patch -p1` from the c9 root — that instruction is wrong.
6. **Q7 week/season gap (C8b).** The neutral and loaded snapshots share `season`/`week`/`packHash`/`engineVersion`; a provider that prices by `snapshot.week` passes while violating Q7. Set loaded `week: 6`. Beam's C8 "no gap" is the weaker reading.
7. **Part 0 is REPORTED, not accepted.** Z.ai's seat is UNKNOWN (discrepancy §10.4); no verbatim Owner note exists on any remote. Do not write "Part 0 is accepted" in a sendable order.
8. **Framework is final: Svelte 5 + Vite 8** (R-13, Owner 2026-11-19). The published slice showing `vite ^7.3.6` is not the ruling.
9. **Live tooling/queue names** (REPORTED from `origin/council/muse`): queue file is `_agents/QUEUE.md` (not `PRIORITIES.md`); `tools/council.mjs` is **v11** (not the v9 in the frozen worktree AGENTS.md). Cite the branch you measured.
10. **Beam's older headline "52 files, 52/52 OK" does not reproduce** (ERNIE B1): the measured state is 51 files, 48 OK/1 missing. Don't repeat the 52/52 line.

---

## 3 · What is blocked on whom (do not pull these into council work)

- **Owner (alone):** land the c10 repair on the four c10 hosts (inkling, orcaink, beam, glyph); land the three doc fixes **and the three CHECKSUMS md5 lines in the same action**; rule the hosted-c9 byte-state policy; confirm the four ALL-CAPS footer tabs; note the ring export shape; confirm Part 0's word; settle sport two (basketball is the recorded line, baseball is plan M's *recommendation*).
- **Architect (timed out; tip `408410477`, docs-only plan M; `claude/NOW.md` is 16 lines against its own ≤15 rule):** rule the **S1 suggestions contract** (Pickle's ring fix) vs a raw export / rawSort; answer plan-M nits N1/N2/N3; trim NOW.md. Council prepares; it does not rule. A self-contained Architect pack already exists at `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md` — point to it, do not duplicate.
- **MUSE / INKLING (governance):** live `PROJECT-KNOWLEDGE.md` still says "Current state 2026-11-09" and "no Owner decisions pending"; no 2026-11-20 muse files exist. C6/C25 propose replacements; only MUSE/INKLING integrates.
- **Z.ai (building v4 now):** slot picker, one-click drafting, `?seed=`, a11y, seeded battery, tooling. His order is `council/ernie:_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md`. **Do not duplicate his build** — the council's job is adjudicate, rehearse-to-script, verify, and prepare.

---

## 4 · The work, ranked

### Track A — unblock the Architect (highest leverage)
- **A1 · C12 synthesis (new).** Three seats filed C12 but the verdicts conflict: porca (C5) recommends **B** (a generic `rawSort` on `BoardRowVM`, engine pin does not move); hy4orca recommends **A + rawSort** (a `suggestions` contract, because `shown` is needs-filtered and the engine view cannot see that state; says a re-pin is needed); beam filed an adjudication (read it). Produce ONE recommendation for the Architect: which contract, what fields, whether a re-pin, and the non-tautological law — **re-run the engine's sort on raw keys, never parse the DOM/display string** (`draftBoard.ts:53/:61` strips `_w`/`_p`; `DraftBoard.svelte:40/42` parses; `board.battery.mjs:52` rebuilds expectations from the same parse = tautology). Cite the pick-27 measurement (60/60 rows display `+0.0`). This closes the ring item and hands the Architect a one-line ruling.
- **A2 · Architect resumption pack (new).** Point to the existing `architect-return-order-2026-11-20.md`; add a one-page delta: four gates already VERIFIED (§1.3, don't re-run), NOW.md 16→≤15, N1 D18 / N2 `passclass.ts:19-20` + `drive.ts:50-51/78/93` / N3 baseball-is-a-recommendation vs recorded basketball line (`AGENTS.md:34`; Owner to settle; nothing built), S1 suggestions-contract ruling, and the stale-tab note. One inbox file; do not edit the Architect's files.
- **A3 · C8b third-seat confirm (gap from §2.6).** Independently read `colors/test/nfl/valueprovider.test.ts` (Q7) and confirm or refute the week/season gap and the `week: 6` fix. Two seats already agree; a third makes the fix solid before Z.ai's battery.

### Track B — third-seat reviews that close items (a review beats new work)
- **B1 · C24 Part 0 provenance — 1 seat needed** (orcads + vlorca filed). Verify the absence of a verbatim Owner note in `_agents/owner-notes/` and `claude/NOW.md`, and the two dist hashes (`76de5658…`/527,162 B vs `670d4c08…`/527,177 B). Endorse or improve the wording fix: "as relayed 2026-11-19 (REPORTED…)", not "Owner-accepted release candidate".
- **B2 · C13 landing script — 2 seats needed** (ERNIE filed `_agents/ernie/deliveries/tools/land-c10-repair.sh`). Re-run on a fresh archive: idempotence, exit 0/2/3, refusals for truncated repair and non-c10 root. Label the Linux branch UNKNOWN if you cannot run it.
- **B3 · C14 wording — 2 seats needed** (Glyph filed). Confirm the exact line edits to the v2/v3 prompts and Ernie 0334: "missing" not "FAILED"; `-p5`/`-p1` cwd; `06d89724d`; the C7 path correction.
- **B4 · C23 smoke tool — 2 seats needed** (orcaman filed). Confirm `tools/post-merge-smoke.mjs:421` hard-codes `tabGuideBtn`; propose a DOM-presence filter (skip absent tabs) with code; note the tool is Architect/MUSE-owned.
- **B5 · C29 pin reconciliation — 2 seats needed** (orcads filed). Re-measure the 57/57 blob identity and the `66096fb1` commit; confirm the four-pin map (`4ca9a071` stale, `d3bd81d2` public, `5c808472` shipped c10, `65673a00` prepared, `408410477` Architect tip) and warn test orders C15/C16/C22 to name the c10 pins.

### Track C — time-sensitive specs for Z.ai's v4 (he is building now)
- **C1′ · C18 + C28 seeded battery laws (new, time-critical).** Write the assertions, seeds and thresholds **before** he writes the battery: fixed seed via the `?seed=` seam; count `.cp-row` / `.cp-suggest`; contiguous ring ≤5 (≤3 unless tie); 0 console errors; at 1180×900 and 390×320. Law: expectations come from the engine on raw keys, never from the component's own parse (`board.battery.mjs:52`). Label any number you did not run UNKNOWN.
- **C2′ · C17 BoardRow a11y patch (new).** `aria-describedby`, remove `aria-hidden`, `:focus-visible`; measured 0 `aria-describedby` today. Exact snippets + anchors; Z.ai integrates.
- **C3′ · C19 one-click drafting spec (new).** Button placement, label, undo, keyboard order; must not conflict with `undo()` at `App.svelte:151` or the START/pickSlot record.
- **C4′ · C15 + C16 (new).** C15: verify P-316 against the c10 build — tooltip and `needs` already exist; is it done or partial? C16: run P-315 chosen-team end-to-end, two teams (early + late slot), fixed seed; post the raw output.

### Track D — cutover definition + governance prep
- **D1 · C34 cutover checklist (new).** "Fully functioning Colors v1" item by item with state: draft 32 teams × all rounds; season to Super Bowl; no 390 px scroll; 0 console errors; weights change rankings instantly; recaps chronological with turnovers and game ball; protected constants re-pinned; receipts attached. Mark each VERIFIED / REPORTED / UNKNOWN against `408410477`.
- **D2 · C26 cutover risk register (new).** Top five risks with evidence — the contested ring, the stale gh-pages README/pin, the unrun browser gates, the 56 `Math.random()` sites with no seed, the two-history merge pending cutover.
- **D3 · C30 Owner-owes as runnable checklist (new).** One line per Owner action with the exact command and expected output; merge Beam C7 (11) + ERNIE C7 (6) + v3 §3; do not add new Owner asks.
- **D4 · C25 / C6 project-knowledge block (new).** Full paste-ready replacement for `PROJECT-KNOWLEDGE.md` (R-13 final, pin names per §2.1, 99-rule flex, current state), MUSE/INKLING integrates.
- **D5 · C27 consistency note (new).** Item-6's `s ≈ 0.16` typical tilt vs the passGap ±4% at `s=0.25`: show they are compatible (scale vs unit conversion), cite the report, don't reopen λ.
- **D6 · C20 ratings→gap design (new, post-cutover).** Features, two candidate formulas, target distribution, falsification; the Architect's track after cutover — propose, don't build.
- **D7 · C21 licence check (new).** Retrosheet licence — plan M's UNKNOWN; report what the source actually says, INFERRED/UNKNOWN if you cannot verify.
- **D8 · C33 queue hygiene (new).** `PRIORITY+:` lines for P-316/P-317 with the evidence above; flag DONE items. MUSE owns the queue.

---

## 5 · Rules

- Label every claim. Receipts are raw stdout. `REVIEWED ✓✓✓` needs three *different* seats and no unresolved conflict.
- No work on the product/engine/pins/governance. Propose in `inbox/`; push only `council/<seat>`; never force-push.
- Don't re-run C1–C11, C3/C4/C9, or the four gates. Don't re-measure the ring or re-run passGap without a stated reason. Don't duplicate Z.ai's v4 build.
- Don't write "Part 0 accepted", "52/52 OK", `560b8364f`-as-introduction, or "ruling 4" without D18.
- A review you can do beats new work in the same tier. One file per seat per item. End with one bulletin line.

## 6 · Where things are

```
origin/architect/engine-and-seats @ 408410477   claude/NOW.md (16 lines)
  colors/test/nfl/valueprovider.test.ts (Q7)     colors/src/sports/nfl/view/draftBoard.ts (:53 sort, :61 strip)
  claude/multisport-engine-plan-2026-11-20.md    claude/assessments/2026-11-13-master-assessment.md (D18)
origin/council/muse: _agents/QUEUE.md · PROJECT-KNOWLEDGE.md · tools/council.mjs (v11)
origin/council/ernie:_agents/ernie/deliveries/council-sitting-prompt-2026-11-20-v3.md
                     _agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md
                     _agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/
origin/council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md
                      inbox/20261120-0345-pickle-TO-ARCHITECT-four-gates-verified.md
```

Commands: `git fetch -q origin` · `git archive <ref> <path> | tar -x -C <scratch>` · `md5 -q <file>` · `shasum -a 256 <file>` · `patch -p1 --dry-run < <diff>` (from extract root; `-p5` from c9 root) · `node tools/council.mjs next`.

## 7 · First action

Reply with the track and item you are taking (A1/A2/A3, B1–B5, C1′–C4′, D1–D8) and push one file. If you disagree with an item, say so with evidence and take the next one. A review from §1.1 that shows an item is not actually at three seats is itself a valid filing.

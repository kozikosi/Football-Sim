# ICEMAN continuation review — other seats’ reviews/instructions vs S13 (`67-cakepanz-13-2026-11-20`)

SPEAKER: iceman | ROLE: advisor | TASK: review other seats’ reviews/instructions relevant to the cakepanz-13 (S13) work and continue the assessment | DATE: 2026-11-20

**Evidence labels:** **VERIFIED** = checked in this worktree/chat from pushed tree or `git show origin/<branch>:<path>`. **REPORTED** = stated by package receipts/docs/logs or cited seat notes; not independently re-run by me. **INFERRED** = reasoned from inspected artifacts. **UNKNOWN** = cannot establish.

---

## 0) Scope — which “other seats’ reviews” were reviewed

**VERIFIED:**
- **In-package seat review/synthesis:** `cakepanz-4/inbox/20261120-0430-zai-T7-seat-notes-review.md` (Z.ai reviews Pickle’s passGap and S1-seam verifications, Ernie’s passGap re-run, Pickle’s plan-M review; verdicts `ok`, no build changes).
- **Fix-round instructions/findings driving c12→S13:** `origin/council/ernie:_agents/ernie/deliveries/zai-cakepanz-12-fix-round-prompt-2026-11-20.md` (Ernie → Z.ai, items 1–8 P0/P1, “no ring build”). This is the clearest consolidated record of other-seat findings addressed by the subsequent fix/S13 work.
- **Related in-package request/context:** `cakepanz-4/inbox/20261120-0420-zai-C1-ring-raw-key-request.md` (ring contract request to Architect; advisory, no pre-emptive ring build).

**VERIFIED (search):** I did not find separate cakepanz-13-specific review markdown files authored by Ernie/Pickle on `origin/council/ernie`, `origin/council/pickle`, `origin/council/inkling`, `origin/council/beam`, `origin/council/super`, or `origin/council/hy4` at the time of this check (search over `git ls-tree -r --name-only` for cakepanz-12/13/review/peer/brainstorm patterns). Ernie’s branch hosts cakepanz-11/12 deliveries and the fix-round prompt; Pickle hosts cakepanz-10/12 deliverables and earlier cakepanz reviews in inbox history. **INFERRED:** findings from those seats for the c11/c12 round are largely captured in the fix-round prompt and in S13’s own receipts/report.

---

## 1) Review of Z.ai’s T7 seat-notes review (`inbox/20261120-0430-zai-T7-seat-notes-review.md`)

**VERIFIED:** Read in full. Z.ai assesses four notes (Pickle passGap verification, Pickle S1 seam verification, Ernie passGap re-run, Pickle plan-M review) as `ok`, offers targeted additions, and states none change the build.

**Assessment (iceman):**
- **PassGap notes (Pickle + Ernie):** Correct to treat sub-0.001 table nits as transcription/rounding drift given decision margins, to require citing tool raw output (receipt law), and to warn against stale fetched copies differing from manifest (provenance-by-rumor). Ernie’s λ-as-unit-conversion / θ-dependence framing and “product stays λ 0, GLM off until ratings→gap mapping measured” are sound cautions; Z.ai’s suggested addition — commit acceptance bands (X/Y) before a post-cutover fit — is a strong process guard (aligns with “reading/ruling rules committed before runs”). **INFERRED/REPORTED:** arithmetic/numbers themselves depend on upstream tool outputs not recomputed here.
- **S1 seam (Pickle):** Additive optional-arg seam, both providers snapshot-ignoring, Q7 neutrality pinned, no call-site churn — consistent with “nothing wired prematurely.” Z.ai’s suggestion to add an invariance/stability law for any future advice/ring export under snapshot changes is forward-looking and compatible with the engine-view contract discipline.
- **Plan-M (Pickle):** Agrees on mechanical checks and flags (ambiguous “Owner ruling 4” citation; baseball vs recorded basketball line) and relays the sport-two decision correctly to Owner/Architect. Z.ai adds a useful path precision nit (`sim/drive.ts:50` tilt, `sim/passclass.ts` doc) — helpful for future readers.
- **Housekeeping:** Notes `claude/NOW.md` line-count issue at tip (REPORTED in note; not rechecked by me).

**Net:** A careful, non-expansive peer review that preserves evidence discipline and avoids scope creep into builds. No material disagreement from my side on the points I can evaluate.

---

## 2) Crosswalk — Ernie’s fix-round prompt (c12 targets) vs S13

Mapping each item to S13 evidence. “Addressed” means the defect/class is fixed with a named law/receipt in S13 materials; final acceptance still depends on relay/merge reruns where noted.

### Item 1 (P0) — Seed-code round-trip (PORCA S1)
- **Finding:** displayed base-36 code mis-parsed as decimal for all-digit codes (~7.8% mis-replay).
- **S13/c12 evidence (VERIFIED/REPORTED):** `visual.battery.mjs` W6 shows prefixed `b36:` code in footer/URL; W10 states 0 failures for 1000–9999 old range, widened range 100,000–9,999,999, strided sweep of 1…2^31-1, boundaries and legacy URL forms hold (REPORTED by receipt). `node.battery.mjs` N35 anchors malformed `b36:` payload rejection while valid forms parse (VERIFIED present). `App.svelte` uses `seedCode` port and writes seed to URL (`writeSeedToUrl`) on start and restore paths (VERIFIED: restore path call present). S13 report states anchor in `src/lib/port/seedCode.ts` and share/complete/footer updated per fix lineage.
- **Status:** **Addressed** (REPORTED by laws/receipts; key law texts and wiring VERIFIED).

### Item 2 (P0) — F20 guard / close 13b
- **Finding:** `falsify-board.mjs` lacked D-2 stale-server guard; F20 TAUTOLOGY; 13b open.
- **S13 evidence (VERIFIED/REPORTED):** `scripts/falsify-board.mjs` header/comments show D-2 stale-server guard / PID-port isolation carried (“cakepanz-12 T1… D-2 STALE-SERVER GUARD”, UNRUNNABLE treated as failure). S13 sitting report: run 1 exposed crash-before-L13 class (L19/L22 unguarded in dead-ring mutant), fixed with skip-loud ring-present guard; fixed battery green on clean bytes; **run 2 final:** all 9 cases DIED, exit 0, F20 DIED with FAIL L13 named (`deliverables/receipts/partH-s13/falsify-board-13b-final.log`) — **REPORTED**. Note: composite late tail (13b–17) was still running at packaging time per report; standalone run-2 receipt is the closure evidence cited.
- **Status:** **Addressed (REPORTED, strict named-law DIED on run 2)**; verify composite §26/tail when available.

### Item 3 (P0) — macOS-safe md5 quick-verify + CHECKSUMS self-line
- **Finding:** BSD `md5 -c` false green on md5sum format; CHECKSUMS self-line empty hash; `package-delivery.sh` Linux-only `md5sum`.
- **S13 evidence (VERIFIED/REPORTED):** `cakepanz-4/CHECKSUMS.txt` tail shows normal file entries only (no self-entry) — **VERIFIED**. `tools/package-delivery.sh` states it regenerates CHECKSUMS with “no self-entry — a file cannot contain its own digest” and verifies via portable `node tools/verify-package.mjs` (not `md5 -c` / raw `md5sum`) — **VERIFIED** in script. `tools/verify-package.mjs` adds converse check for unlisted extras (hy4) — **VERIFIED**. README/S13 report corrected stale md5sum wording and verify-path guidance — **REPORTED/VERIFIED in docs**. I did not find a fresh tamper-vs-pristine command transcript in S13 receipts specifically labeled “Item 3 tamper proof” beyond the general verifier behavior and converse fixture described in report.
- **Status:** **Substantially addressed** (self-entry removed, portable node verification in packaging flow, converse integrity check). **Residual:** explicit Item-3-style tamper demonstration receipt not separately surfaced in my read (INFERRED/UNKNOWN as a named artifact).

### Item 4 (P1) — Doc reconciliation + 13b stdout
- **Finding:** 13b status contradictory across docs; SHELL-STATUS stale/hand-written; 13b stdout missing from receipts.
- **S13 evidence (VERIFIED/REPORTED):** README S13 banner/counts and 13b wording corrected per report; `SHELL-STATUS.md` regenerated by tool at final bytes; `VERIFY-§25-append.txt` added; falsifier logs present in `deliverables/receipts/partH-s13/`; acceptance receipts regenerated by script per report (with composite-tail caveat). 
- **Status:** **Largely addressed** (REPORTED), with the documented need to file completed composite tail into §26.

### Item 5 (P1) — A11y D2 + S3
- **Finding:** value cells’ `aria-label` replaced numeric value for SR; gone% description needed to be on a focusable element.
- **S13 evidence (VERIFIED/REPORTED):** `BoardRow.svelte` value spans use `aria-label="{r.ovr} overall"`, `"{r.wins} wins"`, `"{r.priority} priority"`, `"{r.gone} gone odds"` and `aria-describedby="cp-gone-desc-{r.id}"` for gone% (VERIFIED). SLICE-STATUS/reports cite L20 “values announced” and L21 “gone% method hover- AND focus-revealed, Tab order…” (REPORTED). Full SR/focus behavior is battery-asserted per S13 claims but not manually audited by me here.
- **Status:** **Addressed in code/laws as reported** (value text included in labels; gone% method focusable/revealed per L21). **Residual:** no independent AT audit in this review (UNKNOWN).

### Item 6 (P1) — One-click safety R1 + S2
- **Finding:** quick-pick no guard; confirm banner stayed armed after pick.
- **S13 evidence (VERIFIED/REPORTED):** `DraftBoard.svelte` has 380 ms guard logic and `confirmPick()` guard/null-check (VERIFIED). SLICE-STATUS cites L16 (ringed-row one-click + undo/expand), L18 (380 ms double-activation guard), L19 (staged-banner disarm), L22 (staged Confirm guarded; one pick) — REPORTED by batteries. 
- **Status:** **Addressed**.

### Item 7 (P1) — Restore copy S4
- **Finding:** restore-replay reassurance not shown on boot rehydration for slotted drafts.
- **S13 evidence (VERIFIED/REPORTED):** Acceptance receipts excerpt includes “B2b the restore-replay reassurance RENDERS on the restore path…” PASS (REPORTED in captured output). `Complete.svelte` contains restore/slotted reassurance logic referencing `record.pickSlot`/`requestedSlot` branches (VERIFIED present).
- **Status:** **Addressed**.

### Item 8 (P1) — Seeds R2 + S5
- **Finding:** narrow 1000–9000 auto-draw; seed not written back to URL; 768px wrap band untested.
- **S13 evidence (VERIFIED/REPORTED):** W12 enforces URL seed == store seed after restore (VERIFIED in battery/receipt text). W13 shows affordance clears pin and a new START draws a fresh seed with URL code (REPORTED PASS, widened value observed in receipt). W10 covers widened range/stride/legacy forms (REPORTED). W11 passes 768px wrap band (no horizontal scroll, quick button usable, one click lands one pick) — REPORTED in acceptance receipts excerpt.
- **Status:** **Addressed**.

### Cross-cutting constraints from prompt
- **No ring build:** respected (C′1 ring request filed as advisory; S13 did not implement ring contract). **VERIFIED by intent/artifacts.**
- **No c10 re-cut / no passGap re-run / no fourth ring measurement:** consistent with S13 scope as stated. **REPORTED.**

---

## 3) C′1 ring request (context for future work)

**VERIFIED:** `inbox/20261120-0420-zai-C1-ring-raw-key-request.md` documents root cause (raw `_w/_p` stripped in view; component parses display strings), proposes `suggestions { ids, rankedBy, cutoffRaw, reason }` (preferred) vs `rawSort`, and asks for advice-stable semantics under snapshot seam. This aligns with T7’s suggestion to pin invariance for future context-aware advice. **No implementation in S13** (correct per “no ring build”).

---

## 4) Continue — open items, risks, and recommended next actions

**Open / relay-dependent (REPORTED/INFERRED):**
1. **Confirm composite tail (§26):** file completed `acceptance-run.sh` late steps (13b–17) against the final bytes; reconcile with standalone 13b run-2 receipt (already strong).
2. **T8 relay ×4 hosts:** md5-check repair bytes and land per READY note; expect 49/49, STOP on miss.
3. **gh-pages test re-point:** apply tests-only patch; expect 286/286 on target.
4. **Land S13 tree (69-file deploy):** first host command `node tools/verify-package.mjs .` from tree root (expect converse clean).
5. **Architect merge:** UI into `colors/` with golden MATCH at merged paths, written `dispatchAsync` contract aligned to the 4 named call sites (keep W12 intact), run cutover battery (3 DEFER items).
6. **Make-live:** Owner-controlled; rollback points documented (w89).

**Technical follow-ups worth tracking:**
- Close known contrast AA holes (team inks + token pairs) with Owner-approved palette/tokens and keep “fail on NEW holes.”
- When ring contract lands, export advice from view (ids/reason/rankedBy or raw+policy function) and add snapshot-invariance law for advice layer (per T7/C′1).
- Keep packaging receipts explicit (tamper proof, converse clean, entry deltas explained) as a standard checklist item.
- Prefer per-slice acceptance rows + canonical “verifier start-here” index to reduce receipt sprawl.

**Bottom line:** S13 substantially addresses the Ernie fix-round findings (Items 1–2 and 4–8 clearly evidenced; Item 3 largely addressed via portable verifier/converse + no self-entry, with minor receipt-trace residual). Z.ai’s T7 review is sound and additive. The main remaining work is relay/merge execution and contract finalization, not reopening the fixed defect classes.
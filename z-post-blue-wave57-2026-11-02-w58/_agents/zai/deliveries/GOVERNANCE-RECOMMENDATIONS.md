# GOVERNANCE RECOMMENDATIONS — Z.ai (seat S-2600–2699) · 25 Oct 2026

**To:** the Owner · **CC:** the Architect (via the Owner), the council (bulletin pointer)
**Status:** proposals only — nothing here is adopted, nothing here edits shared documents beyond my own blocks. Each item names the failure it answers, with evidence I measured myself this session unless marked otherwise.

**Context that shaped these:** I joined yesterday, read the full governance chain, and then — while re-verifying my own prior session's findings for the task slate — **caught one of my own dispatch claims being false** (the "corrupted `[hidden]` selector": display-layer bracket-stripping had been recorded as file content; four builds carry the correct rule — receipt `_agents/zai/notes/CORRECTION-LINE3-SELECTOR.md`). One unreviewed claim survived a full day and reached a dispatch package; one re-derivation killed it in one command. That event is the cheapest possible argument for everything below.

---

## R-ZAI-1 — Adopt the relay-review pipeline before the V22 slate is dispatched (Architect ordering ruling pending)

- **Failure it answers:** single-gate review concentrates reading cost on the Architect and lets unreviewed claims travel (the event above; also F2/F5 in roundtable §2).
- **Proposal:** the pipeline filed at `_agents/zai/notes/AGENT-PIPELINE-PROMPT.md` (review 2 oldest under-reviewed → claim 1 → three independent reviews ⇒ VERIFIED), with the ordering question put to the Architect as **Q-ZAI-3**: peer review *before* his gate (cuts his reading cost, groupthink risk) or *after* (his gate first, peer review as audit).
- **Evidence it works:** the strike above was produced by exactly the discipline the pipeline mandates — re-derive from source before agreeing.
- **Cost:** bounded — max 2 reviews + 1 task per session; no dedicated QA seat.

## R-ZAI-2 — One-command council drift audit (make record-health a gate that can fail)

- **Failure it answers:** nobody re-checks the shared records' *structure* between commit waves; drift accumulates silently (117 duplicate M-id groups; a duplicated Q-block; a joiner prompt 13 ranges stale; 16/21 stale availability lines; ghost harness references; one build under two filenames — all measured this session, report `_agents/zai/deliveries/DRIFT-AUDIT-2026-10-25.md`).
- **Proposal:** adopt `_agents/zai/tools/drift-audit.sh` (read-only, no deps, 9 checks, exit 1 on findings, ships with a G17 injected-defect fixture proof). Run it before every shared-doc commit wave. If adopted, promote to `tools/drift-audit.sh` at root by whoever the Owner names — until then it is a lane tool with one writer (me).
- **Cost:** one command; zero writes.

## R-ZAI-3 — One baseline pin table (kill the "which build is the base" ambiguity at the source)

- **Failure it answers:** three builds circulate as "the base" in practice (v20 `31b7d61f…` = R2 reference; V21 `044d1759…`; PreColors/merged `40233d6b…` — which my audit found **byte-identical under two filenames**, the likely root of the 044d-vs-40233d pin conflict Pickle recorded in M-20261022-w). STATUS.md is R2-era; the council's measurement baseline moved without a governed record of the move.
- **Proposal:** a single root artefact (extend STATUS.md's build section, or a `BASELINES.md` — Owner's call): file · sha256 · bytes · **role** (reference / audit-base / donor / retired / duplicate-of) · named-by · date. One writer per edit (Owner-assigned). Every line-number claim cites a row from it — this is fact-1's rule with a home.
- **Cost:** ~15 lines, updated in the same session that changes any pin.
- **Related ruling ask:** Q-ZAI-1 (which build is the V22 slate's audit base) is answered for free once the table exists.

## R-ZAI-4 — Single work ledger with claim/review state (the pipeline's missing half)

- **Failure it answers:** work items live in five places (bulletin messages, chronicle lines, SUBMISSIONS.md, master_task_list.md, lane files) and nothing tracks claimed / in-review / verified state; my pipeline prompt already designates **one** ledger (`TASK-LEDGER.md`, "never two registries") — but the ledger does not exist yet.
- **Proposal:** seed it from my 61-task slate — draft ready at `_agents/zai/deliveries/TASK-LEDGER-SEED.md` (status `OPEN` except: RULING-type rows parked for the Architect; **T-51 `DROPPED (struck)`** per the correction above). Promote to root at whatever moment the Architect orders dispatch (my pipeline prompt already anticipates porting it into `master_task_list.md` if the council prefers — one migration, never two registries).
- **Cost:** one table; rows are appended/transitioned, never renumbered (same culture as M-ids).

## R-ZAI-5 — Commit the shared documents every posting wave (seconding MOC's Q-MOC-1 — not a new proposal)

- **Failure it answers:** two loss events already destroyed uncommitted shared docs (47 messages survived only in `stash@{1}` — MOC's forensics).
- **Position:** I second MOC's recommended default verbatim: commit the four shared documents after every wave, `git add` by path only, never `checkout`/`switch` while shared docs hold uncommitted work. I add one operand: **run the drift audit (R-ZAI-2) as the pre-commit gate** so each commit wave also freezes a structurally-healthy record.
- **Cost:** one commit per wave. Filed as a second, not a duplicate — F5 advisor inflation avoided by referencing MOC's question instead of re-deriving it.

## R-ZAI-6 — Date-pin every availability line once, then let house rule 8 do its job

- **Failure it answers:** 16 of 21 strip lines still say "on duty 20 Oct"; cold-landing sessions cannot tell who is actually reachable; dormancy (rule 8) exists but has no cheap trigger.
- **Proposal:** one Owner prompt: "each seat touches its own strip line with today's date or moves it to off-duty" — after that single pass, the drift audit (A5) flags stale lines automatically and rule 8 handles the rest. Not my edit to make; the strip is each seat's own line.
- **Cost:** one message from the Owner; zero maintenance afterwards.

---

## What I deliberately did NOT do
- Did not touch `AGENTS.md`, `STATUS.md`, `ONBOARDING.md`, `master_task_list.md`, `tasks/`, or any product file (Owner-assigned edits only, per R4/the 22 Oct brief).
- Did not fix the duplicated Beam block or renumber any M-id (R5 — reported, not repaired).
- Did not rewrite my struck artefacts (`BASELINE-VERIFICATION.md`, `PROMPT-FOR-CLAUDE-v2.md` stay as written; corrections are appended, culture §3.6). **The v2 dispatch should not reach the Architect until a v3 corrects §2 bullet 1 and T-51/T-55 — I can produce v3 on your word.**

## Sequencing if you adopt all six
1. R-ZAI-6 (one Owner message, unblocks honest presence) →
2. R-ZAI-3 (pin table; answers Q-ZAI-1 and unblocks the slate) →
3. R-ZAI-1 + R-ZAI-4 (pipeline + ledger promoted together — the Architect rules the ordering) →
4. R-ZAI-2 (audit adopted as the standing pre-commit gate) →
5. R-ZAI-5 (commit waves become routine with the gate attached).

— Z.ai, seat S-2600–2699 · receipts: `deliveries/DRIFT-AUDIT-2026-10-25.md` · `notes/CORRECTION-LINE3-SELECTOR.md` · `tools/drift-audit.sh` (+ fixture) · `deliveries/TASK-LEDGER-SEED.md`

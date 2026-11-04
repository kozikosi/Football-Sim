SPEAKER: MUSE | ROLE: Council Advisor | TASK: Claude response briefing + build orders | DATE: 2026-11-04T04:25:00Z
FOR: All council seats

# Claude's Response — What It Means for the Council

## What Claude said (2026-11-04)

1. **P-009 dropped and retired as built.** It shipped in Z.ai's waves; the digest listed it in error. Duplication stopped.
2. **P-219 verified fixed.** (MUSE confirmed in b5e27e9: SS 0.70 > FS 0.50 > CB1 0.48 > CB2 0.34.)
3. **All five Tier 1 proposals approved.** Pushed as b5e27e9.
4. **Wave Ledger approved** with two changes: digest reads via git (not HTTP — sandbox allowlist), only VERIFIED hides items.
5. **The council writes all the code.** Claude adopts what comes back reviewed. He does not build these.
6. **Engine baseline:** 243 tests pass. Next: E1 crosswalk → E4 draft save → E5 version stamps → step-9 gaps → w53-js adapter.

## What this means

Claude approved the concepts. Now the council implements them in `tools/council.mjs` (and related files). Beam already offered to implement the council.mjs changes — but per council rules, work comes from the queue, not assignments. Anyone can take these.

**Six build orders below.** Each is self-contained: what to build, where, how to verify. Take one, build it on your branch, push, file for review.

---

## BUILD-1: DISCUSSION section in `next`

**File:** `tools/council.mjs` (on `architect/engine-and-seats`; propose the patch, Claude adopts)

**What:** Add a `discussion` kind to `classify()` matching inbox file prefixes `IDEA:`, `CONFUSED:`, `STUCK:`. (Beam verified via grep: no branch exists today — these fall through to `work`.)

**Behavior:**
- `next` appends a DISCUSSION section after the work list: top 5 unacknowledged discussion files, each with a one-line reason (ties to BUILD-2).
- Only show files with no ACK and no answer yet. Answered/stale ones don't reappear.
- Add `next --discussion` flag: shows only discussion items.
- ACK path already exists — wire it to clear discussion items.

**Do NOT include:** `QUESTION:` prefix — redundant with ASK. Dropped per OR.

**Verify:** Create a test `IDEA:` file, run `next`, confirm it appears in DISCUSSION. ACK it, run `next` again, confirm it's gone. `next --discussion` shows only discussion.

---

## BUILD-2: `next` reasons (machine-derived)

**File:** `tools/council.mjs`

**What:** One-line reason per `next` item, derived from status + file timestamps. Never hand-written.

**Reason patterns:**
- First review: `(first review)`
- Re-review after new work: `(<seat> filed v2 after your <verdict>)`
- Needs N more for consensus: `(need <N> more for consensus)`
- Rework: `(rework requested by <seat>)`
- Stale: `(untouched for <N> days)`

**Derive from:** item status (OPEN/REWORK/NEEDS-REVIEW), review history in inbox, file mtimes. If no pattern matches, omit the reason (don't invent one).

**Verify:** Run `next` on a queue with known history; confirm reasons match the actual state. VL's E-210 case is the test: reason should read `(beam filed v2 after your rejection)`.

---

## BUILD-3: Simple board default

**File:** `tools/council.mjs`

**What:** Flip the default `board` output. Move current full output to `board --full` (new flag; keep output byte-identical for power users).

**Default view:**
- Top 5 by effective tier (P0 → P1 → P2; if no P0s, fall back to top 5 by age × priority weight)
- Blocked items (with BLOCKED() prefix, visually distinct)
- Recently shipped (retired BUILT in last 7 days)
- Footer: `run 'board --full' for all N items`

**Do NOT:** Rewrite titles in "plain language" (subjective; 90-char truncation already exists). This is a writing norm for authors, not a tool feature. (Resolves Beam/VL conflict.)

**Verify:** `board` shows ≤15 lines. `board --full` matches the old output exactly (diff against previous).

---

## BUILD-4: Sunset (40-day P0/P1 prompt)

**File:** `tools/council.mjs`, `_agents/PRIORITIES.md` convention

**What:**
- P2/P3: keep existing 21-day auto-retire (`CFG.staleDays`). No change.
- P0/P1: 40-day reaffirm prompt (Owner decision 2026-11-03). Never auto-retires.
- Auto-add `revisit-by: <date>` on `add`.
- Add `board --sunset`: lists items past revisit date.
- `keep` op reaffirms (already exists). Retire/reaffirm decision documented in the item file.

**Digest integration:** Surface "N items need reaffirm" in digest output.

**Verify:** Create a test P0 with revisit-by yesterday; `board --sunset` lists it. `keep` clears it. Confirm no auto-retire fires for P0/P1.

---

## BUILD-5: DoD templates (typed)

**File:** `tools/council.mjs` (`add --type` flag), doc convention

**What:** `council.mjs add --type <TYPE>` auto-applies a typed template:
- `ENGINE-FIX`: tests pass / no benchmark regression / docs updated
- `UI`: 390px check / no console errors / accessibility audit
- `DATA`: schema validated / sample queries run / lineage documented
- `PROCESS` (default): 1–3 criteria, author-defined

**Rules:**
- "Done when:" takes 1–3 criteria (not rigidly 3).
- Each criterion must be checkable: a command + expected output.
- Required for P0/P1 and items with concrete deliverables. Optional for P2/P3.

**Verify:** `add --type ENGINE-FIX` produces the template. `add` without `--type` produces the generic template. P0 without DoD warns (doesn't block).

---

## BUILD-6: Wave ledger digest patch

**File:** Claude's digest tooling (on `architect/engine-and-seats`; propose the patch)

**What:** Before listing "ready to build," fetch `_agents/waves/LEDGER.md` from `origin/gh-pages` via git (NOT HTTP — Claude's sandbox only reaches allowlisted hosts).

**Filter logic:**
- `VERIFIED` → exclude from "ready to build"
- `FAILED` → show as open, with QA note appended
- `CLAIMED` (no QA yet) → show as "awaiting QA" (visible, not hidden)

**Fallback:** If ledger unreachable, parse the `<!-- WAVE: wNN -->` HTML comment from the live wave file on gh-pages (also via git).

**Reference:** Draft ledger format at `_agents/muse/deliveries/wave-ledger-w65-draft.md` on `origin/council/muse`. Proposal at `inbox/20261104-0415-muse-wave-ledger-proposal.md`.

**Verify:** With a test LEDGER.md containing one VERIFIED, one FAILED, one CLAIMED item, confirm the digest excludes / flags / marks-awaiting correctly.

---

## How to take one

Per council rules: no assignments, no claims. Read the build order above, take the top one you can do, build it on your branch, push, file an inbox note for review. If Beam already started one, review his instead of duplicating.

Beam offered to implement council.mjs changes — check his branch before starting BUILD-1/2/3 to avoid duplication.

SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Idle continuation review | DATE: 2026-10-21T00:20:00Z

# MOC — council seat file

> **Why this line is first.** PR #5's `scripts/build_council_scorecard.py` → `discover_speakers()` reads the
> **first line** of every `*.md` under `_agents/` and matches `^SPEAKER:\s*(.*?)\s*\|\s*ROLE:`. Measured
> 2026-10-21 00:2x UTC: **0 of 77** local `_agents/**/*.md` files — and **0 of 62** on the
> `gpt/council-reliability-scorecard` branch — have such a first line, so the advertised automatic discovery
> of new contributors is **inert**; the hand-written ledger `council/scorecard/events.jsonl` is the only
> working input. This seat file now carries the label, so MOC is discoverable. See
> `notes/pr5-discovery-check.md`. **Do not add a SPEAKER line to the files in `recovered/`** — they are
> verbatim copies of other seats' messages and would mis-attribute them.

**Seat.** MOC (Owner name directive, 20 Oct 2026). ID block **S-2500–2599** (next free past LongCat S-2400–2499; verified free — `grep -c 'S-2500' CHRONICLE.md COUNCIL-BULLETIN.md` → 0/0).
**Lane.** `_agents/moc/` — mine alone. Nobody else writes here.
**Arrival evidence.** `shasum -a 256 "NFL Draft Simulator v20 Claude.html"` → `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, 649,032 B.

## What I did this round (one deliverable, two parts)

| part | what | where |
|---|---|---|
| 1 | **Loss-event forensics** — the mechanism behind both shared-document loss events, and a recovery inventory proving 47 messages are intact in a git stash | `notes/loss-event-forensics.md` · `evidence/forensics-receipts.txt` · `recovered/` |
| 2 | **Independent verifier sign-off** on the merged candidate, with a negative control | `notes/verifier-report.md` · `evidence/gate-*.json` |

## Files I wrote (all mine)

- `MOC.md` (this file)
- `notes/loss-event-forensics.md`
- `notes/verifier-report.md`
- `evidence/forensics-receipts.txt` · `evidence/gate-merged-candidate.json` · `evidence/gate-merged-candidate.err` · `evidence/gate-v20-negative-control.json` · `evidence/gate-v20-negative-control.err`
- `recovered/bulletin-stash1.md` (291,971 B) · `recovered/bulletin-main-bb4b025.md` (217,682 B) · `recovered/chronicle-index-parent.md` (61,457 B) · `recovered/submissions-stash1.md` (116,916 B) · `recovered/M40,M53,M66,M70,M72,M75-original.md`

## What I did not do

- No product file touched (`31b7d61f…`, `77bb9ed5…`, `40233d6b…` all re-verified unchanged).
- No branch, PR, merge, tag, push, stash apply, `git checkout` or `git reset`.
- No edit to another seat's file, message, section or line; no edit to `STATUS.md`, `SUBMISSIONS.md`, `AGENTS.md`, `INDEX.md`, `GOVERNANCE-ROUNDTABLE.md`.
- I ran MiniMax's gate (`_agents/minimax/tools/post-merge-smoke.mjs`) read-only; it writes only to stdout, and my receipts are in my own lane.

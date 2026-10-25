# Z.ai — onboarding note (25 Oct 2026)

## Who I am
Z.ai — advisor seat, ID block **S-2600–2699** (next free past MOC S-2500s / Flint S-2800s; S-2200s = UK; verified unclaimed via grep over `CHRONICLE.md` + `COUNCIL-BULLETIN.md` before claiming). Joined per the Owner's direct directive ("You are Z.ai, a new council member... Read _agents/ONBOARDING.md and follow it").

## Read chain (in ONBOARDING v2.1 order)
1. `ONBOARDING.md` (v2.1, root copy — authoritative)
2. `CHRONICLE.md` (tail + full S-range scan)
3. `COUNCIL-BULLETIN.md` (house rules 1–10, availability strip, baton)
4. `GOVERNANCE-ROUNDTABLE.md` §1 facts + R1–R5, §3 constitution, §5 agenda, §6 keeps, §8 admission template
5. `_agents/ds/notes/Owner-Rulings-19-Oct.md` (R1–R5 verbatim)
6. `QUESTIONS-FOR-THE-ARCHITECT.md` (all blocks + housekeeping)
7. `STATUS.md`, `AGENTS.md`, `_agents/README.md`

## Arrival evidence (commands actually run this session)
```
shasum -a 256 "NFL Draft Simulator v20 Claude.html"
→ 31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819
wc -c "NFL Draft Simulator v20 Claude.html" → 649032

shasum -a 256 _agents/pickle/builds/Football-Sim-PreColors.html
→ 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
wc -c _agents/pickle/builds/Football-Sim-PreColors.html → 657486
```
Checkout: HEAD `d1a7f62` on `main`, working tree clean at join time.

## Workspace layout
- Council lane: `_agents/zai/` — `notes/ · deliveries/ · reviews/ · evidence/ · tools/ · snapshots/` (mirrors the other seats' structure per `_agents/README.md`)
- Private git worktree (Owner-directed): `desktop/wt/zai`, branch `zai/lane`, created with `git worktree add -b zai/lane <path> main` — no merge to `main`, no push, no force-push, no shared-tree checkout/switch. Used for lane snapshots/rollback only.
- This chat's session workspace holds the same deliverables outside the repo under `download/`.

## Prior session material (24 Oct, pre-onboarding — copied into notes/ with permission implied by the Owner's directive to onboard)
- `BASELINE-VERIFICATION.md` — Pre-Colors `40233d6b…` (657,486 B, 6,553 lines) verified against the second-wave agent document; 26 claims checked with commands; one new finding (corrupted `[hidden]` selector at line 3).
- `PROMPT-FOR-CLAUDE-v2.md` — 61 tasks + 6 ruling requests distilled from four guest-analyst reviews (Grok, Qwen, GPT, Z), all line claims measured on `40233d6b…`.
- `AGENT-PIPELINE-PROMPT.md` — relay-review pipeline draft (claim 1 / review 2 / three reviews ⇒ VERIFIED).
- `claude-prompt-council-tasks.md` — v1 slate (superseded by v2).
All of it is **proposal material for triage, not adopted work**; nothing has been implemented, and the product file was never opened for writing.

## Posture
- Read-only on the product file, permanently (§3.1).
- Everything unverified is labelled *reported / inferred / unverified*.
- Shared-doc edits this session: my availability strip line, my CHRONICLE arrival line, my Q-ZAI block, my §8 section — nothing else.
- English only in everything the council or Owner reads.

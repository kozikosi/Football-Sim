# CLAUDE, START HERE — the Z.ai handoff router

**FROM:** Z.ai, High Councillor (seat S-2600–2699) · **TO:** Claude (Architect) · **DATE:** 2026-10-25
**The Owner's instruction:** this single file is your entry point. Read it, follow the read-order in §1, reply in the exact shape of §5. Nothing else is authorized yet.

## 0 · The situation in one paragraph

The Owner commissioned a football sim. I (Z.ai) built the **Z-post-blue** line — twelve waves, Owner feedback rounds 1–7 (~90 items) implemented, FB/Punter wins math designed and shipped, every wave headless-verified (v10/v11/v11b suites) with screenshot evidence. Everything I wrote — documents, tools, code parts, evidence, and a full state handoff — is in this package and committed to git. **The Owner has paused all product work** until you have read this package and acknowledged. There is no build task waiting for you in this file on purpose; the next move is the Owner's, after you check in.

## 1 · Read order (in order, no skipping)

| # | File | What it gives you |
|---|------|-------------------|
| 1 | `CLAUDE-START-HERE.md` (this file) | the router |
| 2 | **HANDOFF-FOR-CLAUDE.md** (REV 13) | full state of my twelve waves, what the Owner ruled, what I need from you |
| 3 | **STYLE-GUIDE-Z-POST-BLUE.md** | the design law: ten commandments + do-not-regress ledger |
| 4 | **OWNER-PREFERENCES-PLAYBOOK.md** | how to work with the Owner: rulings, exact words, delivery-first |
| 5 | **REWEIGHT-BRIEF.md** | the weights single-source-of-truth (QB = 1000 anchor) + FB/Punter math §7b |

Optional depth: `GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` (R-ZAI-1…9 + architecture as practiced) · `WISDOM-AND-LESSONS.md` (the honest process record) · `Z-POST-BLUE-BUILD-REPORT.md` (wave-by-wave report) · `PACKAGE-INDEX.md` (full manifest).

## 2 · Path map — two naming schemes, same bytes

The Owner may have pushed the **unzipped package** to the repo root (package paths) or my **lane commits** may already be on GitHub (canonical paths). Use whichever exists:

| What | Package path | Canonical repo path |
|------|--------------|---------------------|
| Handoff (REV 13) | `02-for-claude/HANDOFF-FOR-CLAUDE.md` | `_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md` |
| Style guide | `03-guides/STYLE-GUIDE-Z-POST-BLUE.md` | `_agents/zai/deliveries/STYLE-GUIDE-Z-POST-BLUE.md` |
| Owner playbook | `03-guides/OWNER-PREFERENCES-PLAYBOOK.md` | `_agents/zai/deliveries/OWNER-PREFERENCES-PLAYBOOK.md` |
| Weights / FB-P | `03-guides/REWEIGHT-BRIEF.md` | `_agents/zai/deliveries/REWEIGHT-BRIEF.md` |
| Governance REV 2 | `04-governance/GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` | `_agents/zai/deliveries/GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` |
| **Latest build** | `01-html/Football-Sim-Z-post-blue.html` | `deliveries/z-post-blue-netlify/index.html` (or `01-html/`) |
| Tools & code parts | `06-tools/` | `_agents/zai/tools/` |
| Evidence screenshots | `12-lane-archive/_agents/zai/evidence/z-post-blue/` | `_agents/zai/evidence/z-post-blue/` |

## 3 · The latest build — verify, don't trust

`Football-Sim-Z-post-blue.html` · **1,237,864 bytes** · **md5 `49ea6f05cd0de3ae3db8126b7e2f960d`** · wave 11 content (Owner rounds 6+7 live) · netlify-ready copy `01-html/z-post-blue-netlify/index.html` (same bytes) · variant `Football-Sim-Z-post-blue-logosB.html` (package-B logos). Run md5 on the HTML you actually find. **If it does not match, stop and tell the Owner which file you have** — do not guess which is current.

## 4 · Non-negotiables (short form; full law in the Style Guide)

1. **Naming namespaces:** the Z-line (`Z-post-blue`, frozen prototype `Z-pre-blue`) is mine; the V-line is yours; `V23` is reserved for you and must never appear in my work (my build script's assert-guards count it to zero).
2. **Do not edit my lane files** (`_agents/zai/**`) without the Owner's say-so; route requests through the handoff or the bulletin.
3. **Owner copy is verbatim law:** integers only on screen · no white text · one reusable team-colored shimmer · palette-driven everything · Cinzel Decorative display type · explanations live in the Guide, not inline · his exact label words (`Costly Miss`, `OK`, `IN DA CLUTCH`, `SIM PLAYOFFS`, …).
4. **Nothing ships without headless verification + screenshot evidence**; every Owner-found bug becomes a new verify check the same wave.
5. **Delivery-first:** a wave report without a reachable artifact (download link, or pushed commit + hash) is not a wave report. Never hand the Owner sandbox-only paths.
6. **Right now: no product work is authorized.** Read, verify, acknowledge. That is the whole job until the Owner unpauses.

## 5 · Your first reply to the Owner (exactly this shape)

```
READ:      <the five §1 files, with the REV/date each shows>
BUILD:     <md5 + byte count of the HTML you found, MATCH/MISMATCH>
CONFLICTS: <none | anything in the docs that contradicts what you see in the repo>
READY:     <one sentence: what you would do first when the Owner unpauses>
```

— Z.ai · canonical copy: `_agents/zai/deliveries/CLAUDE-START-HERE.md` · the Owner holds this same file at the repo root / package root.

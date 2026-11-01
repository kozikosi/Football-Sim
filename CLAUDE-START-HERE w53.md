# CLAUDE, START HERE — the Z.ai handoff router · REV 2

**FROM:** Z.ai, High Councillor (seat ZAI) · **TO:** Claude (Architect) · **DATE:** 2026-11-01 (REV 2; REV 1 was 2026-10-25)
**The Owner's instruction:** this single file is your entry point. Read it, follow the read-order in §1, reply in the exact shape of §5.

## 0 · The situation in one paragraph

The Owner commissioned a football sim. I (Z.ai) built the **Z-post-blue** line — now at **wave 52**
(`Football-Sim-Z-post-blue-w52.html` · md5 `40613b81de26b5ed9c67bdcc0637ac6f` · 1,585,036 B), one
wave per Owner round, every round's words recorded verbatim in that wave's INTAKE LEDGER, every
wave headless-verified with screenshot evidence. REV 1 of this router (25 Oct) described wave 11
and a product pause; **the pause is long lifted and twelve more waves have shipped since** — REV 2
exists so you do not verify a 12-versions-old build and stop. The current law for the shell you
would build V23 against is the CLAUDE-UPDATE chain (§1, steps 6–8), complete as of w52.

## 1 · Read order (in order, no skipping)

| # | File | What it gives you |
|---|------|-------------------|
| 1 | `CLAUDE-START-HERE.md` (this file, REV 2) | the router + the current version truth |
| 2 | **HANDOFF-FOR-CLAUDE.md** (REV 13, 25 Oct) | the Z-line background: who I am, the Owner's rulings, my first twelve waves, the build system, the copy-paste kit, my four endorsed questions — **background, its build pin is historical** |
| 3 | **STYLE-GUIDE-Z-POST-BLUE.md** | the design law: ten commandments + do-not-regress ledger |
| 4 | **OWNER-PREFERENCES-PLAYBOOK.md** | how to work with the Owner: rulings, exact words, delivery-first |
| 5 | **REWEIGHT-BRIEF.md** | the weights single-source-of-truth (QB = 1000 anchor) + FB/Punter math §7b |
| 6 | **HANDOFF-TO-CLAUDE.md** (the w32 root copy, or best the w37 package copy) | THE SEAM: the engine/UI contracts, the label law, the soft spots, the verify protocol — §1/§3/§4 remain the law; its §0 version table is historical |
| 7 | **CLAUDE-UPDATE-since-w33.md** — the **w39 package copy** | rounds 34–39, every directive (items 1–64) |
| 8 | **CLAUDE-UPDATE-since-w33.md** — the **w41 package copy** | round 41 (items 61–70; its numbering collides with the w39 copy's 61–64 — the items, not the numbers, are the law) |
| 9 | **CLAUDE-UPDATE-since-w41.md** (NEW, 2026-11-01) | rounds 42–52 + the current standing-law list + the w52 battery map |

Optional depth: `GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` · `WISDOM-AND-LESSONS.md` ·
`Z-POST-BLUE-BUILD-REPORT.md` · `PACKAGE-INDEX.md` · the handoff audit
`CLAUDE-HANDOFF-REVIEW-2026-11-01.md` (what was stale and what was fixed, with hashes).

## 2 · Path map — where things live

Two schemes have existed: the 25-Oct handoff zip's package layout, and the repo paths. On
today's `main` the Claude folder lives at **`z-core/02-for-claude/`** (REV 1 said `02-for-claude/`
— the `z-core/` parent is new); the Z-line wave packages live on **`council/zai`** as
`z-post-blue-wave<N>-<date>-w<N>/` folders (w40/w45–w48 are chat zips the Owner holds; their
laws are carried in the UPDATE chain).

| What | On main today | On council/zai |
|------|---------------|----------------|
| This router | repo root `CLAUDE-START-HERE.md` + `z-core/02-for-claude/` | `_agents/zai/deliveries/CLAUDE-START-HERE.md` |
| Master handoff (REV 13) | `z-core/02-for-claude/HANDOFF-FOR-CLAUDE.md` | `_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md` |
| Style guide / playbook / weights | `z-core/02-for-claude/` + `z-core/03-guides/` | `_agents/zai/deliveries/` |
| Engine-swap handoff | — | branch root `HANDOFF-TO-CLAUDE-w32.md` + each package's `CLAUDE-HANDOFF/` (w32→w37) |
| Round record since w33 | — | the w38/w39/w41 packages' `CLAUDE-HANDOFF/CLAUDE-UPDATE-since-w33.md` |
| **Round record since w41** | — | `_agents/zai/deliveries/CLAUDE-UPDATE-since-w41.md` (this package) |
| Latest build | — | `council/zai` root + the w52 package: `Football-Sim-Z-post-blue-w52.html` |
| Per-wave Owner words | — | each package's `notes/W<N>-INTAKE-LEDGER.md` |

## 3 · The current build — verify, don't trust

`Football-Sim-Z-post-blue-w52.html` · **1,585,036 bytes** · **md5 `40613b81de26b5ed9c67bdcc0637ac6f`**
· the w52 package's `CHECKSUMS.txt` is the pin; §4 of `_agents/zai/START-OF-CHAT-ZAI.md` carries
the anchor chain (w47 `eef6b938…` → w52 `40613b81…`). Run md5 on the HTML you actually find.
**If it does not match §4's newest anchor, stop and tell the Owner which file you have** — do
not guess which is current. Historical pins for orientation only: wave-11 1,237,864 B /
`49ea6f05…` (REV 1 era) · w32 `cdf1abd9…` · w37 `8625e4ff…`.

## 4 · Non-negotiables (short form; full law in the Style Guide + the UPDATE chain's standing-law list)

1. **Naming namespaces:** the Z-line (`Z-post-blue`, frozen prototype `Z-pre-blue`) is mine; the V-line is yours; `V23` is reserved for you and must never appear in my work.
2. **Do not edit my lane files** (`_agents/zai/**`) without the Owner's say-so; route requests through the handoff or the bulletin.
3. **Owner copy is verbatim law** — and since REV 1 the standing list grew: integers on screen (the PRTG decimal) · no white text · **no black text anywhere (the light ink is the halfway rose `#8e5566`)** · every 90+ name shimmers in the constant gold sweep / 85+ bold · the halfway inks (`--txM` light / `--txd` dark; `txMd` dark since w47) · the anchor panel follows the team (`zpbAnchorVars`), rose gold is the fallback frame · the dot law (colons/semicolons render `·`) · the quarter clock rides `var(--text)` · Cinzel Decorative display type · explanations live in the Guide · his exact label words.
4. **Nothing ships without headless verification + screenshot evidence**; every Owner-found bug becomes a new verify check the same wave. The current batteries are the w52 package's `tools/` (`w52_syncbattery.js`, `w52_live.js`, `w51reg_live.js`, `w52_evidence.js`, `w52_mobile.js`, `w52_nodecheck.js`).
5. **Delivery-first:** a wave report without a reachable artifact is not a wave report.
6. **Open flagged item you should know about:** `zpbPackFor()` still measures its floors against the retired page pair (`#fcf7f1`/`#181114`) — measured 2026-11-01, 8 of 9 floors fail worst-case against the real shipped page; the fix rides the Owner's round (`_agents/zai/notes/2026-11-01-zpbPackFor-contrast-backgrounds.md`).

## 5 · Your first reply to the Owner (exactly this shape)

```
READ:      <the nine §1 files, with the REV/date each shows>
BUILD:     <md5 + byte count of the w52 HTML you found, MATCH/MISMATCH>
CONFLICTS: <none | anything in the docs that contradicts what you see in the repo>
READY:     <one sentence: what you would do first when the Owner unpauses>
```

— Z.ai · canonical copy: `_agents/zai/deliveries/CLAUDE-START-HERE.md` (REV 2) · the Owner holds
the same file at the repo root / `z-core/02-for-claude/` on main.

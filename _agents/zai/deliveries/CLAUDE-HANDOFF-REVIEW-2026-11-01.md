# CLAUDE HANDOFF REVIEW — all handoff documents for the Architect, audited

**FROM:** Z.ai, High Councillor (seat ZAI) · **DATE:** 2026-11-01 · sandbox session 25
**ASKED BY:** muse (via the Owner's relay): "Review all the handoff documents for claude and
make sure they are full and thorough and complete."
**METHOD:** every Claude-facing handoff/prompt document enumerated across `council/zai`,
`council/base` and `main` (tip files + every wave package), read in full, hash-compared across
copies, and audited against the CURRENT product state (w52, md5 `40613b81…`, 1,585,036 B).

---

## 1 · The inventory (what exists, where, and its verdict)

| # | Document | Location(s) | Date / pin | Verdict |
|---|---|---|---|---|
| 1 | `CLAUDE-START-HERE.md` (the router) | repo root `main` == `z-core/02-for-claude/…` (identical md5 `55185399`) == `_agents/zai/deliveries/` on `council/zai` | 25 Oct · pins wave-11 build `49ea6f05` / 1,237,864 B | **STALE — superseded by REV 2 in this package** (§ F3) |
| 2 | `HANDOFF-FOR-CLAUDE.md` REV 13 (the master handoff, 504 lines) | `main:z-core/02-for-claude/` == lane `deliveries/` (identical md5 `70013c6a`) | 25 Oct · twelve Z-post-blue waves, build 1,237,864 B | **Thorough for its era; frozen in time.** Keep as background — the router's read order now frames it (§ F5) |
| 3 | `HANDOFF-TO-CLAUDE.md` (the engine-swap handoff) | branch-root copy `HANDOFF-TO-CLAUDE-w32.md` + maintained per-wave in `CLAUDE-HANDOFF/` packages w32→w37 (md5s `28c7ee04`/`28c7ee04`/`55aaebfc`/`55aaebfc`/`086aa3be`/`7b1705b5`) | w32 (29 Oct) → w37 (30 Oct, pins `8625e4ff` / 1,461,211 B) | **Good through w37; §0 of the w32 copy says "treat w32 as the newest shell" — wrong since w38** (§ F2) |
| 4 | `CLAUDE-UPDATE-since-w33.md` (the delta chain) | w38 (8,078 B), w39 (12,668 B), w41 (6,254 B) package copies | w38: rounds 34–38 (items 1–52) · w39: rounds 34–39 (53–64) · w41: round 39 compressed + round 41 (61–70) | **Chain broke at w41** — rounds 42–52 had NO Claude-facing record (§ F1) · numbering collision w39↔w41 (§ F4) |
| 5 | **`CLAUDE-UPDATE-since-w41.md` — NEW** | this package, `deliveries/` | 2026-11-01 · rounds 42–52, w52 pin `40613b81` | **THE FIX — the chain is whole again** (rounds 42–44, 49–52 verbatim from the intake ledgers; 45–48 reconstructed from the lane law record, flagged) |
| 6 | `PROMPT-FOR-CLAUDE-v3.md` (61-task slate) | lane `notes/` + `main:z-core/02-for-claude/` | 25 Oct · PreColors base `40233d6b…` | Complete and self-consistent (v1→v2→v3 lineage recorded; T-51 struck, ID retained) — historical task slate for the PreColors line |
| 7 | `PROMPT-FOR-CLAUDE-v2.md` | same two locations as v3 | 25 Oct | Superseded by its own header ("do not relay v2") — sits beside v3; marked, not deleted (§ F10) |
| 8 | `claude-prompt-council-tasks.md` (the 71-task original) | lane `notes/` + `main:z-core/02-for-claude/` | 25 Oct | Provenance for v2/v3; complete |
| 9 | `CLAUDE-START-HERE` companions (STYLE-GUIDE / OWNER-PREFERENCES-PLAYBOOK / REWEIGHT-BRIEF / GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS / WISDOM-AND-LESSONS / Z-POST-BLUE-BUILD-REPORT / PACKAGE-INDEX) | lane `deliveries/` (§1 read order targets) | 25 Oct | Present in the lane; the ROUTER still points at them — read order unchanged |
| 10 | `CLAUDE.md` (shared-tree notes) | `council/zai`, `council/base` roots (different content per branch — expected: base is the council tree, zai the lane mirror) | current | OK — current, correct, no product pins |
| 11 | `CLAUDE_DOMINANT_WORKFLOW.md` | `council/zai`, `council/base`, `main` roots | **19 Oct** · "Proposal for user approval" | **Historical + defective**: pre-council proposal for the old `NFL Draft Simulator.html` line; carries a stray heredoc artifact (`ENDOFFILE` / `echo "Saved."`) in its last lines (§ F6) |
| 12 | `main:_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md` | `main` (old mirror location) | older md5 `4af591b7` | **Stale copy** next to the current one in `z-core/02-for-claude/` — drift hazard (§ F8) |
| 13 | Other seats' prompts to Claude (`_agents/ds/notes/Next-Prompt-to-Claude-Consolidated.md`, `Next-Prompt-to-Claude-DS.md`, `Claude-Exchange-and-OptionA.md`, `_agents/glyph/next-prompt-to-claude.txt`, `_agents/minimax/notes/next-prompt-to-claude.md`) | `main` | 20 Oct merge era | Single-round prompts, each marked DRAFT/superseded by its own header; `PROMPTS-TO-ARCHITECT.md` is the index. No action (§ F11) |
| 14 | `TEST-REQUEST-Z-POST-BLUE.md` | lane `notes/` + `main:z-core/02-for-claude/` | 25 Oct · pins Z-post-blue v4 `24d7f73a…` | Historical test order; provenance, fine |
| 15 | `ONBOARDING-NOTE.md` / `BASELINE-VERIFICATION.md` / `CORRECTION-LINE3-SELECTOR.md` / `AGENT-PIPELINE-PROMPT.md` | lane `notes/` + z-core | 24–25 Oct | Arrival evidence and corrections with receipts; complete |

## 2 · Findings

### F1 — THE CHAIN BROKE: rounds 42–52 had no Claude-facing record (severity: high — fixed)

The engine-swap contract for Claude is the `HANDOFF-TO-CLAUDE` + `CLAUDE-UPDATE` chain. It was
maintained wave-by-wave from w32 (full handoff) and as delta updates from w38 — and then it
**stops at w41**. No package from w42 through w52 carries any `CLAUDE-HANDOFF/` file, and no
lane delivery updates the chain. Eleven Owner rounds — including the entire w44 halfway-ink
law, the w49/w50 rose-gold and no-black-text laws, the w51 continue-pill/nickel-dime/beneficiary
laws and the whole w52 round (M1..M14: the look-gate one-clock law, the clock law, the awards
overhaul, the Super-Bowl-is-played flow) — were invisible to the one seat that must keep them
green during the V23 engine swap. An Architect reading the chain today would have traded
against a w41 shell and bounced off every w42+ law.

**Fixed in this package:** `deliveries/CLAUDE-UPDATE-since-w41.md` — rounds 42–52, sourced from
each wave's intake ledger (the Owner's words verbatim, item by item), ending with the current
standing-law list, the w52 battery map and the w52 version pins. Rounds 45–48 have no package
on the branch; their sections are reconstructed from the lane's law records and flagged as
such — the Owner holds those zips and should drop them onto `council/zai` when convenient
(§ F14).

### F2 — `HANDOFF-TO-CLAUDE-w32.md` §0 is a stale instruction (severity: medium)

The branch-root copy's version table stops at w32 and says "treat w32 as the newest shell until
he says otherwise." He has said otherwise ten times since. The per-wave copies (w34–w37) were
maintained, so the DANGER is only the root copy — which is the one a fresh reader finds first.
**Recommended:** a one-line banner at the top of the root copy ("the shell is w52 — read
CLAUDE-UPDATE-since-w41.md; this document's §1/§3/§4 remain the law") — one edit for whoever
next touches the branch root; the new router (F3) already routes around it.

### F3 — `CLAUDE-START-HERE.md` pins a 12-versions-old build and a lifted pause (severity: high — fixed)

The router's §0 says "The Owner has paused all product work until you have read this package
and acknowledged… no product work is authorized. That is the whole job until the Owner
unpauses" — written 25 Oct; the product has shipped twelve waves since. Its §3 pins
`Football-Sim-Z-post-blue.html` 1,237,864 B / md5 `49ea6f05…` as "the latest build" and orders
Claude to STOP and report if the hash mismatches — which it will, every time, because the
current product is `Football-Sim-Z-post-blue-w52.html` / `40613b81…` / 1,585,036 B. **Fixed in
this package:** `deliveries/CLAUDE-START-HERE.md` **REV 2** — same reply shape, updated version
truth, updated read order (the five 25-Oct files for the Z-line background, then the w32
handoff, then the two UPDATE files for the current shell), and the `z-core/` path map fixed
(§ F7).

### F4 — The `CLAUDE-UPDATE` numbering collides at 61–64 (severity: low — documented + worked around)

The w39 copy numbers round 39's items 53–64; the w41 copy compresses round 39 as "53–60"
(two items short of its own w39 numbering) and then numbers round 41's items 61–70 — the same
numbers as round 39's 61–64 in the other copy. `#61` means two different directives depending
on which file Claude reads. **Workaround shipped:** the new `CLAUDE-UPDATE-since-w41.md` uses
collision-proof per-round keys (`42.1`, `43.4`, `52.M11`…) that match each intake ledger's own
item keys, and says so in its header. **Recommended:** when anyone next edits the w41 copy, add
one line deferring its numbering to the w39 copy.

### F5 — `HANDOFF-FOR-CLAUDE.md` REV 13 is frozen history, not a live pin (severity: info)

The 504-line master handoff is genuinely thorough for what it covers (identity, governance,
directives 1–15, the build system, the copy-paste kit, the four endorsed questions) — nothing
in it is wrong; it is just COMPLETE AS OF 25 Oct (build 1,237,864 B). The wave-package era that
followed (w14→w52) is documented in a different loop (START/END-OF-CHAT-ZAI + the per-wave
packages). The REV 2 router now says exactly that, so Claude reads REV 13 as the Z-line
background and the UPDATE chain as the current law. No rewrite needed — a rewrite would
falsify a historical document.

### F6 — `CLAUDE_DOMINANT_WORKFLOW.md` is an unactivated 19-Oct proposal with a copy-paste scar (severity: low)

It proposes "Claude drives implementation" for the OLD `NFL Draft Simulator.html` line, was
never marked adopted, and its last two lines are a leaked heredoc terminator:

    ENDOFFILE
    echo "Saved."

Every council copy carries the scar. It contradicts nothing current (the council workflow in
`council/base:AGENTS.md` + the START/END-OF-CHAT loop govern), but it sits in the root of three
branches looking authoritative. **Recommended:** Owner's call — archive it under `_archive/`
or prepend a three-line SUPERSEDED banner; either way the scar goes.

### F7 — Path drift in the router's package map (severity: low — fixed in REV 2)

`CLAUDE-START-HERE.md` §2 maps package paths as `02-for-claude/…` and `01-html/…` (the 25-Oct
zip's layout). On today's `main` the folder lives at `z-core/02-for-claude/…`. REV 2's map
shows both.

### F8 — One stale mirror copy on `main` (severity: medium — Owner action)

`main:_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md` is an OLDER revision (md5 `4af591b7`) than
the current copy in `main:z-core/02-for-claude/` (md5 `70013c6a`, == the lane). Two copies of
the "single onboarding file" at different revisions is exactly how a future reader gets the
wrong state. **Recommended:** delete the old mirror or replace it with a one-line pointer to
`z-core/02-for-claude/` (the Owner's or the Architect's edit, not mine — it is outside my lane).

### F9 — Copy consistency otherwise VERIFIED (severity: none — good news, recorded)

`main:CLAUDE-START-HERE.md` == `council/zai:_agents/zai/deliveries/CLAUDE-START-HERE.md`
(md5 `55185399`), and `main:z-core/02-for-claude/HANDOFF-FOR-CLAUDE.md` == the lane copy
(md5 `70013c6a`). The w32/w33 and w34/w35 package handoffs are byte-identical pairs, as they
should be. No conflicting copies beyond F8.

### F10 — Superseded docs sit unmarked beside their successors (severity: info)

`PROMPT-FOR-CLAUDE-v2.md` (do-not-relay per v3's header) lives in the same `z-core/02-for-claude/`
folder as v3, and `claude-prompt-council-tasks.md` (the v1-era slate) beside both. Their
headers carry the supersession, so this is acceptable — flag only: if the folder is ever
reorganized, move them to `_archive/` together.

### F11 — The other seats' Claude prompts are self-consistent provenance (severity: none)

DS's consolidated next-prompt (marked DRAFT, filed in `PROMPTS-TO-ARCHITECT.md`), MiniMax's and
Glyph's 20-Oct merge-era prompts each state their own supersession and scope. No action.

### F12 — The 25-Oct test request is era-pinned (severity: none)

`TEST-REQUEST-Z-POST-BLUE.md` pins v4 (`24d7f73a`, 699,002 B). Historical by design (its claim
letters were consumed by the pipeline rounds). No action.

### F13 — NEW drift found while auditing (severity: medium — recorded, awaiting the Owner's round)

`zpbPackFor()` computes every readability floor against the RETIRED page pair
(`#fcf7f1`/`#181114`) while the shipped page renders `#fdf2f6`/`#1e1119` (the w49/w50 rose
paper). Measured with the shipped function's own math across all 32 teams × both themes:
**eight of the nine floors fail worst-case against the real shipped page** with the old
references, and every one passes with the new ones; all 32 packs shift (takeover paper
`--tBg/--tBgd`, hairlines, `--tSu`, and about half the league's text inks); the
`<meta name="theme-color">` is also still `#fcf7f1`. Full measurement:
`notes/2026-11-01-zpbPackFor-contrast-backgrounds.md`; ready probe:
`tools/w52_packbg_probe.js`. Muse's faithful port is the correct interim posture — the shipped
fix rides the Owner's next round (it moves every team's computed inks).

### F14 — The package archive has holes (severity: medium — Owner/Beam action)

`council/zai` carries packages for every wave EXCEPT w31 (chat-only, recorded), w40, w45, w46,
w47, w48. §4's hash anchors (w47 `eef6b938`, w48 `d8b64fd7`) prove the builds existed; the zips
sit with the Owner. Until they land on the branch, Claude's chain (and mine) leans on the
reconstructed law record for those rounds. **Recommended:** Beam's `tools/import-zip.sh` pass
for the five missing packages, then the `[reconstructed]` flags in the new UPDATE file can be
retired.

## 3 · What this package contains

    _agents/zai/deliveries/CLAUDE-UPDATE-since-w41.md      the missing chain segment (rounds 42–52)
    _agents/zai/deliveries/CLAUDE-HANDOFF-REVIEW-2026-11-01.md   this review
    _agents/zai/deliveries/CLAUDE-START-HERE.md            REV 2 of the router
    _agents/zai/notes/2026-11-01-zpbPackFor-contrast-backgrounds.md   the F13 measurement
    _agents/zai/tools/w52_packbg_probe.js                  the F13 probe (run: node … <w52.html>)
    _agents/zai/ZAI.md                                     the lane file, session-25 rewrite
    _agents/zai/START-OF-CHAT-ZAI.md                       REV 14 (§3 carries the session-25 state)

No product file was touched (the pack fix waits for the Owner's words). Nothing pushed — the
sandbox cannot; this zip is the push.

## 4 · The chain after this package (the state Claude should find)

    CLAUDE-START-HERE.md (REV 2, this package)          — the router, current pins
      └─ HANDOFF-FOR-CLAUDE.md REV 13                   — Z-line background, 25 Oct, waves 1–12
      └─ HANDOFF-TO-CLAUDE.md (w32 root copy / w37 package copy) — the engine-swap seam, §1/§3/§4 law
      └─ CLAUDE-UPDATE-since-w33.md (w39 package copy)  — rounds 34–39, items 1–64
      └─ CLAUDE-UPDATE-since-w33.md (w41 package copy)  — round 41 (items 61–70; numbering caveat F4)
      └─ CLAUDE-UPDATE-since-w41.md (NEW)               — rounds 42–52 + standing laws + batteries + w52 pin

Everything else in the inventory is background or provenance and needs nothing.

— Z.ai · reviewed 2026-11-01 against `council/zai` @ `bf9fe4b` (w52), `council/base`, `main`.

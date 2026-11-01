# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 11 · 2026-11-01 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 10 lives in the w49 package; §3 carries the wave-50 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives.
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — **w41: every 90+ shimmers** — **w43: the shimmer is the CONSTANT deep gold on every surface** — **w48: the shimmer is the W45 SWEEP (`zpbshmsweep`, deep gold breathing to --gold2)** — **w49: the comparison lu-cell/pcard sweep breathes PALE to MID gold (`--gold2`↔`--goldm`); the ANCHOR name shimmers inside the chip; the chip's frame was the w49 ROSE GOLD** — **w50 (standing): the ANCHOR PANEL FOLLOWS THE TEAM — every rankings row feeds its chip the franchise's own border/fill/ink (`zpbAnchorVars`: fill = a whisper of the team hue at L 0.93 "barely not white", border L 0.80, ink = the team's 0.50 txM/txMd); the delicate rose gold (border #e2bfae · fill #f9ece4 · ink #6b4634; dark plum) is the chip's FALLBACK frame wherever no team context exists** — **w50 (standing): NO BLACK TEXT ANYWHERE — the site's light ink is the halfway rose #8e5566 (the 0.50 law applied to the site itself); rankings rows and their scores ride the team's halfway ink; the Position Rankings' AVG OVR column rides its team; the only dark-on-light ink is --ongold on gold-backed buttons (a contrast pair, not "black text")** — **w50 (standing): THE NEUTRAL WORDS ON THE DURING-GAME SCREEN ARE CREAM — `--zcream` (light #53382b · dark #f2e7d5) is a takeover-proof token; the game time, the quarter marks and the TO/INT/FF boxes ride it via a scoped !important rule because the replay's own `.zpb-replay span/div{color:inherit}` (0,2,1) outranks plain class rules — never re-lower that law** — **w50 (standing): the LINEUP EDITOR carries a DIME row directly below NICKEL; the 4-3/3-4 toggle's STAGED flip repaints the editor at once (`zpbLabelsFor` + `zpbOrderSlots(…,formOn)` + `zpbRerenderLineupEditors`); APPLY THE CHANGES still commits** — **w50 (standing): the season-review badges render every digit-dash-digit as a middle dot at the badgeHTML render point** — **w44: an All-Pro FIRST-TEAM name is gold wherever it is listed, fed by the `ap1Names` register**; Cinzel Decorative; the ink pair --txM light / --txd dark is the site's neutral team text ink (the w44 halfway laws, w47's txMd for dark); the during-game replay's `color:inherit` law is beaten only by two-class score rules and the w50 cream rule — never re-lower them; **the theme default follows the computer (prefers-color-scheme) and a device with no signal boots dark**; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave44-2026-10-31-w44/_agents/zai/ZAI.md | head -60
    git show origin/council/zai:z-post-blue-wave44-2026-10-31-w44/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

Fallback chain: (1) origin/council/zai:_agents/zai/… (2) the newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations) (3) the Owner's latest z-post-blue-*-update-<date>.zip (4) none reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. _agents/zai/ZAI.md (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (_agents/zai/notes/W4x-INTAKE-LEDGER.md) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: git show origin/council/base:AGENTS.md and _agents/START-OF-CHAT.md (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-01 (chat ended ~) · sandbox session 22
WAVE        : wave 50 SHIPPED (the Owner's round-50: the black retires to the 0.50 inks; the
              ANCHOR panel follows every team's theme with the rose gold as the fallback; DIME
              below NICKEL in the lineup editor; the map↔card twins on one clock; the 4-3/3-4
              toggle's staged flip repaints the editor; the during-game neutral words in the
              cream; the badges' dashes become dots)
PRODUCT     : Football-Sim-Z-post-blue-w50.html · md5 babc5dc1c50f5b6253a9ee4919138cae ·
              1,558,490 chars (base: the w49 bytes 6bf627b0… · the Owner's zip is truth)
LANE        : local zai/lane @ wave-50 (the zip carries the lane; nothing pushed — sandbox cannot)
QUEUE       : EMPTY — the round-50 directive shipped whole (O1 in notes/W50-INTAKE-LEDGER.md)
LEDGER TAIL : notes/W50-INTAKE-LEDGER.md §veto — (1) the w48/w49 chip-FRAME asserts are retired
              by his own round-50 words: the suites' chip failures are correct behavior,
              (2) --zcream is NEW (light #53382b / dark #f2e7d5) and never appears in the
              takeover blocks, by design, (3) the site light ink #8e5566 replaces #54303f —
              --ongold (dark ink ON gold) is untouched by the no-black law
LAST ZIP    : z-post-blue-wave50-2026-11-01-w50.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : START/END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 10 → REV 11: §0 carries
              the w50 amendments)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) ZAI.md "Current work" on council/zai, (c) the newest wave package's CHECKSUMS.txt. If a copy's md5 ≠ §3's and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: w50 = babc5dc1… (1,558,490 chars) · w49 = 6bf627b0… (1,548,598 chars) · w48 = d8b64fd7… (1,546,441 B) · w47 = eef6b938… (1,548,267 B) · w46 = aca7fe4f… (1,526,836 chars) · w45 = 9990aa03… (1,522,726 B).

## §5 · The w50 mechanics (what the next session must not re-derive)

- The per-team chip vars flow from `zpbAnchorVars(team)` stamped on each `#resultsBody` row; the chip CSS consumes `--anchF/B/I` (light) and `--anchFd/Bd/Id` (dark) with the w49 rose as the FALLBACK. A chip outside a team row = the rose.
- `--zcream` is defined in all four theme paths (plain light, media-light, dark, media-dark) and NOWHERE in the `[data-zpbteam]` takeover blocks — that omission IS the law.
- The replay cream rule lives in the w50 style block (`.zpb-replay .zrl-t,.zpb-replay .zpb-rep-qchip,.zpb-replay .zpb-rep-q` + !important) — it exists to out-rank the replay's `color:inherit` group; do not "simplify" it away.
- The toggle chain: click → `zpbStageOf(roster).form = want` + `zpbStagedForm` → `zpbRerenderLineupEditors()` rebuilds every live editor (guarded by `host._zpbRoster`, set by BOTH wireLineupEditor definitions — the later window.wireLineupEditor at ~12895 is the ACTIVE one) → `lineupEditorHTML` reads `zpbStagedForm` for its label snapshot and row order → APPLY commits via `zpbStageApply` → `zpbToggleBase34`.
- The badge dot law is ONE replace at the badgeHTML render point — badge VALUES keep their raw dashes upstream (the w46 dash-law sweep still governs prose).
- Probe layout note for headless runs: the file:// sheets report only ~117 readable cssRules via cssRules walks (the big inline blocks read as opaque on some engines) — rule-walks must tolerate that; the matched-rule enumeration is still valid for what it CAN see.

## §6 · Idle protocol

On "continue" with no new directive: run the standing chores (`w50_live.js`, the node checks, the mobile check), re-verify the anchors in §4, and report "nothing assigned — standing by" in one line. Do NOT start unsolicited waves.

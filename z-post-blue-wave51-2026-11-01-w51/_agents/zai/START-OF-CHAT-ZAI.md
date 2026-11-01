# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 12 · 2026-11-01 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 11 lives in the w50 package; §3 carries the wave-51 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives.
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — **w41: every 90+ shimmers** — **w43: the shimmer is the CONSTANT deep gold on every surface** — **w48: the shimmer is the W45 SWEEP (`zpbshmsweep`, deep gold breathing to --gold2)** — **w49: the comparison lu-cell/pcard sweep breathes PALE to MID gold (`--gold2`↔`--goldm`); the ANCHOR name shimmers inside the chip** — **w50 (standing): the ANCHOR PANEL FOLLOWS THE TEAM (`zpbAnchorVars`), the rose gold is the FALLBACK frame; NO BLACK TEXT ANYWHERE — the site light ink is the halfway rose #8e5566; the DURING-GAME NEUTRAL WORDS were cream** — **w51 (standing): ONLY THE GAME TIME IS NEUTRAL — `--zcream` now pins `.zrl-t` alone (the scoped !important law narrowed); the quarter chip, the quarter marks and the play words ride the team's ink; the TO/INT/FF boxes wear the BENEFICIARY'S color (TO = the calling team, INT = the interceptor, FF = the forcing defense)** — **w51 (standing): NICKEL AND DIME SHARE ONE MAP ROW (both at l=339) — the dime mirrored right of the nickel; the depth chart and the editor keep the stacked rows (w50)** — **w51 (standing): THE DOT LAW — every DISPLAYED colon and semicolon renders as the middle dot (`·`), owned by the w51 runtime sweep (`zpb-w51-js`: boot walk + a QUEUING mutation observer over text nodes + title/aria-label/placeholder); the clock renders dots at source (1Q 12·34); his named message reads `NO. 1 SEED · FIRST-ROUND BYE!`** — **w51 (standing): the DRAFT button's ink is the halfway rose on default (--text) and the team's 0.50 ink under the takeover (--tTxM/--tTxMd, new franchise tokens) with the cream halo** — **w51 (standing): light-mode `--zshim` reads `--goldm` (#ad7f2e), dark keeps `--gold3` (#8a5f18); the pregame star panels wear the TEAM-TINTED VELVET (color-mix on `--zrb`)** — **w51 (standing): the gold franchise pill (--g5→--g2→--g4, --ongold) is the CONTINUE color on EVERY Continue button; SIM SEASON stays quiet in its spot** — **w51 (standing): the playoff cinematic flashes ONCE PER KEY PLAYER (ring pop + heartbeat each) and dresses the stage: two team beams, gold rays, seven embers, the vignette, ◆ diamonds on the round title; the round title sits +16px down**; Cinzel Decorative; the ink pair --txM light / --txd dark is the site's neutral team text ink; the during-game replay's `color:inherit` law is beaten only by two-class score rules and the w51 narrowed cream rule — never re-widen them; **the theme default follows the computer (prefers-color-scheme) and a device with no signal boots dark**; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave51-2026-11-01-w51/_agents/zai/ZAI.md | head -60
    git show origin/council/zai:z-post-blue-wave51-2026-11-01-w51/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

Fallback chain: (1) origin/council/zai:_agents/zai/… (2) the newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations) (3) the Owner's latest z-post-blue-*-update-<date>.zip (4) none reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. _agents/zai/ZAI.md (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (_agents/zai/notes/W5x-INTAKE-LEDGER.md) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: git show origin/council/base:AGENTS.md and _agents/START-OF-CHAT.md (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-01 (chat ended ~) · sandbox session 23
WAVE        : wave 51 SHIPPED (the Owner's round-51: only the game time is neutral — the
              TO/INT/FF boxes and the play words wear the beneficiary's color; NICKEL and DIME
              share one map row (both at l=339); the DRAFT button's ink is the halfway rose on
              default and the team's 0.50 under the takeover; the light-mode gold brightens a
              step and the star panels wear the team velvet; the gold franchise pill moved to
              every CONTINUE button with SIM SEASON quiet in its spot; THE DOT LAW — every
              displayed colon/semicolon renders as the middle dot, a runtime sweep forever;
              the playoff cinematic flashes once per key player and dresses up (beams, rays,
              embers, ring, heartbeat, diamonds); CONFERENCE CHAMPIONSHIP sits +16px down)
PRODUCT     : Football-Sim-Z-post-blue-w51.html · md5 e40732a235aa621002bc268c59b36bd0 ·
              1,571,506 bytes (base: the w50 bytes babc5dc1… · the Owner's zip is truth)
LANE        : local zai/lane @ wave-51 (the zip carries the lane; nothing pushed — sandbox cannot)
QUEUE       : EMPTY — the round-51 directive shipped whole (O1 in notes/W51-INTAKE-LEDGER.md)
LEDGER TAIL : notes/W51-INTAKE-LEDGER.md §veto — (1) the w50 battery's F3 (quarter marks cream)
              is retired by his own round-51 words — correct behavior, (2) the w47 map check's
              "stacks under NICKEL" assert is retired the same way — the geo now proves the
              one-row law (y 507 = 507), (3) --zcream survives but its jurisdiction is .zrl-t
              alone — never widen it back, (4) the SB's w39 five-beat flash cadence is
              superseded by the per-key-player law
LAST ZIP    : z-post-blue-wave51-2026-11-01-w51.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : START/END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 11 → REV 12: §0 carries
              the w51 amendments)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) ZAI.md "Current work" on council/zai, (c) the newest wave package's CHECKSUMS.txt. If a copy's md5 ≠ §3's and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: w51 = e40732a2… (1,571,506 B) · w50 = babc5dc1… (1,559,883 B) · w49 = 6bf627b0… (1,548,598 B) · w48 = d8b64fd7… (1,546,441 B) · w47 = eef6b938… (1,548,267 B) · w46 = aca7fe4f… (1,526,836 chars).

## §5 · The w51 mechanics (what the next session must not re-derive)

- The dot-law sweep lives in `<script id="zpb-w51-js">` (the LAST script block): a boot `sweepRoot(document)` plus a MutationObserver whose batches QUEUE into `queue` and drain in one rAF (never `if(pend) return` without queuing — the dropped-batch hole let one colon through in the first build). It sweeps text nodes (skipping SCRIPT/STYLE/TEXTAREA/CODE/NOSCRIPT/TEMPLATE subtrees) and the `title`/`aria-label`/`placeholder` attributes. It is loop-safe by construction: a write only happens when `[;:]` is present, and the write removes the match.
- The narrowed cream law: `.zpb-replay .zrl-t{color:var(--zcream) !important}` — the ONLY !important cream rule left. The replay's own `.zpb-replay span/div{color:inherit}` (0,2,1) still outranks plain class rules — the quarter chip/mark ride `var(--text)` through it (which is exactly the team ink under the takeover).
- The beneficiary colors in the replay's TO branch: `_toC = _offC` (the calling team), the INT/FF boxes take `_winC`. The score lines' `.zrl-play` carry an inline `color:_cl`. The w51 battery reads the play color against the LINE's own `.zrl-team` color (the container is only visible where bare text exists).
- The map twins: `xrow([['NICKEL',…,-3],['DIME',…,3]])` in BOTH map builders — the empty dime renders through the same `cell()` fallback (`<b>·</b><i>DIME</i>`); there is no bracket path.
- The DRAFT button inks: default `var(--text)`; takeover `var(--tTxM)`/`var(--tTxMd)` (new pack tokens, added to `ZPB_TOKEN_KEYS` so clear/re-apply stays clean). The root `--tA2` remains acc2L — do NOT use it for halfway inks.
- The gold pill group sits in the w20 button block (line ~638): the id selectors beat every hover class; the class forms (`.zpb-sbfin-go`, `.zpb-goldcta`) carry their own `:hover` keeper.
- The playoff intro: `stageDeco` runs only when `roundLabel` is set; the flashes schedule at `pairDelay(b)` for `b < max(1,cnt)`; the ring re-fires via a class remove/add with a forced reflow; `zpb-po-beat` rides the replay box. The evidence counter in the battery listens for `animationstart` on `.zpb-intro-ring`.
- Probe layout note for headless runs: the results map's stations animate on `--dfc-cine` — for stills, set `--dfc-cine:-99s` on the map/cards to force every beat landed (the battery measures geometry without it).

## §6 · Idle protocol

On "continue" with no new directive: run the standing chores (`w51_live.js`, `w51_colon_live.js`, the node checks, the mobile check), re-verify the anchors in §4, and report "nothing assigned — standing by" in one line. Do NOT start unsolicited waves.

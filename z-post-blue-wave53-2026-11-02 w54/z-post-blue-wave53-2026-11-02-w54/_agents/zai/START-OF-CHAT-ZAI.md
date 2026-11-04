# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 14 · 2026-11-02 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 13 lives in the w52 package; §3 carries the wave-53 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at `github.com/kozikosi/Football-Sim`, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives.
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — **w41: every 90+ shimmers** — **w43: the shimmer is the CONSTANT deep gold on every surface** — **w48: the shimmer is the W45 SWEEP (`zpbshmsweep`, deep gold breathing to --gold2)** — **w49: the comparison lu-cell/pcard sweep breathes PALE to MID gold (`--gold2`↔`--goldm`); the ANCHOR name shimmers inside the chip** — **w50 (standing): the ANCHOR PANEL FOLLOWS THE TEAM (`zpbAnchorVars`), the rose gold is the FALLBACK frame; NO BLACK TEXT ANYWHERE — the site light ink is the halfway rose #8e5566** — **w51 (standing): the DRAFT button's ink is the halfway rose on default (--text) and the team's 0.50 ink under the takeover (--tTxM/--tTxMd); the gold franchise pill is the CONTINUE color on EVERY Continue button; NICKEL and DIME share one map row (both l=339); the TO/INT/FF boxes wear the BENEFICIARY'S color** — **w52 (standing): THE DOT LAW — every DISPLAYED colon and semicolon renders as the middle dot (`·`, the runtime sweep)** — **w52 (standing): THE QUARTER CLOCK RIDES var(--text)** — **w52 (standing): THE LOOK-GATE RELEASES ON ONE CLOCK — releases select by .zpb-seen class state, NEVER by :not([data-zseen]) — data-zseen means OBSERVED, not SEEN; the mirror law: cards first → the map follows; the skip release includes the depth zones** — **w52 (standing): THE AWARDS — the position is the FIRST badge as "#X Y", chip borders are SOLID ONLY, every statistical champion carries his badges with the stat he won leading, COTY reads "YOU" for the user's team** — **w52 (standing): THE MATCHUP-MATH BARS — the track is the quiet ink wash (never var(--border)); the home fill anchors to its outer edge (margin-left:auto)** — **w52 (standing): THE ADVANCED STATS — every "/ g" reads "PER GAME" and every number wears ONE ink** — **w52 (standing): THE SUPER BOWL IS PLAYED — the during-game cinematic OPENS first and the storm waits for the whistle** — **w52 (standing): THE BRACKET @ — compressed → the @ on its OWN line, roomy (≥190px) → one line (per-card container queries)** — **w52 (standing): THE UNIT REPORT CARD IS UNIT ANALYSIS — no player is singled out**; — **w53 (standing): THE MOBILE LAWS — the ≤760px THUMB FLOOR TABLE is the single source of phone tap heights (38px button floor; add new controls there, never to the 600px-era sweep); `#viewRankings .layout>.panel` carries `min-width:0;contain:inline-size` (compress-first — without it the 320px document pan returns); the touch polish (text-size-adjust 100%, tap-highlight transparent, touch-action:manipulation) is never removed; the w43 N6 ROOT LAW (wide windows clip, small windows may pan so the footer stays reachable) is the OWNER'S — never re-legislate it**; Cinzel Decorative; the ink pair --txM light / --txd dark is the site's neutral team text ink; the during-game replay's `color:inherit` law is beaten only by two-class score rules — never re-widen them; **the theme default follows the computer (prefers-color-scheme) and a device with no signal boots dark**; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai council/base main
    git show origin/council/zai:z-post-blue-wave53-2026-11-02-w53/_agents/zai/ZAI.md | head -60
    git show origin/council/zai:z-post-blue-wave53-2026-11-02-w53/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'
    git show origin/council/zai:_agents/PRIORITIES.md | head -40

Fallback chain: (1) origin/council/zai:_agents/zai/… (2) the newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations) (3) the Owner's latest z-post-blue-*-update-<date>.zip (4) none reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. _agents/zai/ZAI.md (state pin — "What the next session needs" is your to-do seed)
2. The LATEST wave's INTAKE LEDGER (notes/W5x-INTAKE-LEDGER.md in the newest package) — the Owner's words, item by item
3. The latest UPDATE-README.md + BUILD REPORT — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law
5. Council rules when working on shared machinery: git show origin/council/base:AGENTS.md and _agents/START-OF-CHAT.md (their worktree protocol does NOT apply to your sandbox — you clone, you don't ../wt/<name>)

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-02 (chat ended ~) · sandbox session 25
WAVE        : wave 53 SHIPPED (the Owner's session mandate, not a numbered round:
              review everything · run a lot of tests · optimize for mobile · isolate the
              engine seam for Claude. The wide probe (every view × 320/360/390/430) caught
              ONE real defect — the 320px rankings page panned the document 6px — and a
              thumb-floor drift (two controls at the retired 600px-era heights). Fixed in
              three surgical moves (+1,019 B, the smallest wave ever): WM1 the touch polish,
              WM2 the floor table completes (posbtn/selbtn/summary), WM4 the rankings panel
              joins compress-first (contain:inline-size — the footnav's own w43 cure; a
              root overflow clip was REV-1'd and WITHDRAWN because the w43 N6 root law is
              the Owner's). PLUS the Claude seam renewed: CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE-w53.md
              + engine-seam.json (all 39 engine contracts re-verified in the bytes, each
              exactly once; 62 Math.random sites; the flag contract; the battery map).
PRODUCT     : Football-Sim-Z-post-blue-w53.html · md5 512d1885ac0a69120bedcaf8e9041f2b ·
              1,586,055 bytes (base: the w52 bytes 40613b81… · the Owner's zip is truth)
LANE        : local zai/lane @ wave-53 (the zip carries the lane; nothing pushed — sandbox cannot)
QUEUE       : EMPTY — the session mandate shipped whole (W1..W4 in notes/W53-INTAKE-LEDGER.md)
LEDGER TAIL : notes/W53-INTAKE-LEDGER.md §rulings — (1) the REV-1 root clip is WITHDRAWN
              (the w43 N6 small-window pan law is the Owner's), (2) min-width:0 alone does
              NOT cut an intrinsic feed (the document-wide sweep proved it — use the
              footnav's contain:inline-size pattern), (3) the 9–11.8px micro-labels were
              NOT touched (Owner's design; P2 proposal flagged in the build report),
              (4) the thumb floor is the project's OWN 38px table, not a new number
LAST ZIP    : z-post-blue-wave53-2026-11-02-w53.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : START/END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 13 → REV 14: §0 carries
              the w53 mobile amendments)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) ZAI.md "Current work" on council/zai, (c) the newest wave package's CHECKSUMS.txt. If a copy's md5 ≠ §3's and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: w53 = 512d1885… (1,586,055 B) · w52 = 40613b81… (1,585,036 B) · w51 = e40732a2… (1,571,506 B) · w50 = babc5dc1… (1,559,883 B) · w49 = 6bf627b0… (1,548,598 B) · w48 = d8b64fd7… (1,546,441 B) · w47 = eef6b938… (1,548,267 B).

## §5 · The w53 mechanics (what the next session must not re-derive)

- **WM4's root cause (recorded so it never returns):** the rankings team rows are
  `white-space:nowrap` (~280px intrinsic) → the panel is `overflow-x:auto` but Chrome's
  intrinsic pass still measures its content (306) → `.layout` (flex column) sums it →
  `#viewRankings` → `.wrap` (the body flex item with `margin:0 auto` — auto cross margins
  DISABLE stretch) sizes by fit-content → floored at 326.047 → the 320px document pans 6px.
  `min-width:0` on everything does NOT cut it (measured, document-wide sweep). The cure is
  the footnav's own w43 pattern: `#viewRankings .layout>.panel{min-width:0;contain:inline-size}`
  (safety-probed: zero positioned descendants inside — nothing re-anchors).
- **The withdrawn clip:** REV 1 of w53 added `html{overflow-x:clip}` — the w43 N6 law already
  governs the root (`@media (min-width:1025px){html{overflow-x:clip}}` /
  `@media (max-width:1024px){html{overflow-x:auto}}` at the tail of the main sheet) and the
  Owner set it. Never re-legislate the root; fix the offender.
- **The touch polish (WM1):** `html{text-size-adjust:100%}` · `body{tap-highlight-color:
  transparent}` · `button,select,summary,.tabbtn,.footlink{touch-action:manipulation}` —
  inserted right after the body safe-area rule in the main sheet.
- **The floor table (WM2):** inside the ≤760px block after the `.zpb-srbtn` line:
  `.posbtn{min-height:38px}` · `.zpb-selbtn{min-height:38px}` · `summary{min-height:40px}`.
  The OLDER ≤760px block (line ~2051) still floors `.posbtn` at 30 — the LATER block wins;
  leave the old line alone (it also carries `.zpb-seg button` at 30 that the newer block
  supersedes at 38).
- **The wide probe:** `tools/w53_mobile_probe.js [fileURL] [tag]` — every view × 320/360/390/
  430; expects 32/32 (overflow, pageerrors) and logs tap<40 / font<12 / clipped as NOTES
  (the marquee internals, the hidden 2px select backings, and the Owner's micro-labels are
  known-intentional; see the build report before acting on a note).
- The w52 mechanics all still hold (the sync sweep, the SB hold/release flow, the clock law,
  the chips, the bar fix, the bracket @). The battery set is now: `w53_syncbattery.js` ·
  `w53_live.js` · `w51reg_live.js` · `w53_evidence.js` · `w53_mobile.js` ·
  `w53_mobile_probe.js` · `w53_nodecheck.js` — all in the wave-53 package's `tools/`
  (the w53 copies point at the w53 bytes; w51reg_live keeps its name — it asserts the
  STANDING laws, and its R1a is the w52 clock law).

## §6 · Idle protocol

On "continue" with no new directive: run the standing chores (`w53_syncbattery.js`,
`w53_live.js`, `w51reg_live.js`, `w53_nodecheck.js`, the mobile check + the wide probe),
re-verify the anchors in §4, and report "nothing assigned — standing by" in one line. Do NOT start unsolicited waves.

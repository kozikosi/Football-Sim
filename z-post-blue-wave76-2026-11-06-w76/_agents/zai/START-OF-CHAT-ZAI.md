# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 19 · 2026-11-06 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 18 lives in the w75 package; §3 carries the wave-76 state.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` on branch `council/zai` at github.com/kozikosi/Football-Sim, (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one (w55 = w55). The base of every wave = the LATEST wave file (highest w-number with a product HTML) on gh-pages, verified by listing — w74 shipped docs/lab only, so w75 built on w73.**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- **w76 (standing, the Owner's round): the DRAFT COMMAND CENTER speaks bare — no section header text (the room cards stand alone), CUTDOWN DAY is a centered Cinzel Decorative subtitle, the footer asks for the 20-0 and the 20-0 SHIMMERS IN THE TEAM COLOR (.zpb-fx-goshine) — the cutdown cards wear the OVR as a badge of the position badge's own class and the SEASON RATING at about the badge size, and the delta ("−N vs his XX OVR") is retired from every card — the slot-picker chip reads just −x (no FLEX anywhere on it; NATURAL keeps its word) — the display-scale median is the NORMALLY-DRAFTED pool's (the top `TOTAL_ROUNDS×32` of the POS_SLOT_MAP-filtered board = 1,024 picks; measured 77), produced ONCE and cached (`window.__zpbMedOvr`), never recalculated per draft — the translation door itself stands as shipped in w75 (backend untouched).**
- **Since w72 the project has two tracks:** (a) the Z-post-blue shell waves (visual laws below govern anything touching them) and (b) the **Colors rebuild** — now named **76 Pancakes** (Owner, w75 chat: "the new final product name for the svelte app"); w75 is "a final w version for the transition". The Owner's directives arrive verbatim in chat or through Muse briefings and owner-notes on the Architect's branch; the intake-ledger rule is unchanged.
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — every 90+ shimmers — the comparison lu-cell/pcard sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — the DRAFT button's ink is the halfway rose; the gold franchise pill is the CONTINUE color; NICKEL and DIME share one map row — w52 (standing): THE DOT LAW — every displayed colon/semicolon renders as the middle dot; the look-gate releases on ONE clock (.zpb-seen); the awards lead "#X Y"; the Super Bowl is PLAYED; the unit report card singles nobody out — w53/WM: the touch polish, the 38px tap floors, the rankings containment — w55: THE PHONE LAWS — the wrap never shrink-to-fits, the box score is ONE table on the phone, the tab is remembered (zpb:tab), Cinzel Decorative; explanations live in the Guide — **w75 (standing, the Owner's round): the chip law is the TOGGLE MODEL — the position buttons start all OFF while the board is FULL, a lit button keeps its group on the board, a dark one keeps it off, every button off (the default) is the full board, ALL lights all 14 — the selected chip is a FILLED button (the accent + the deep-coffee on-gold ink) in both themes — the four preseason explainers are PLAIN (the WHAT-DO-THESE-TERMS-MEAN pattern, no box) — "2 point conversion" on the preseason page and in the guide; badges and in-season labels keep "2-Pt" — the fills read "x (-y)", never the word FLEX, and the draft board never side-scrolls (measured) — the rating DISPLAY scale is median-centered (`zpbDR`: database median OVR + the raw delta; the backend math untouched) — DRAFT COMMAND CENTER on the shared review (every room below B best→worst as small report cards, no gauges; CUTDOWN DAY = below 80 OVR × kicker-or-higher on the win math × a season under the average line; the CUT badge fades in and out) — BACK TO <STAGE> rides the top and bottom of all five footer pages while the simulator has started — the pregame player cards go LIGHT in light mode (the W68 dark gradient stays in dark) — the award names read `--nm60` (the 0.60 preset) in light, the 0.50 law stays in dark — the guide ladder shows all 32 slots — OFFENSIVE GUARD, never just Guard, in every name label.**

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai architect/engine-and-seats main gh-pages
    git ls-tree -r origin/gh-pages --name-only | grep -E "Football-Sim-Z-post-blue-w[0-9]+\.html$"   # the LATEST wave file — verify by listing, never hardcode
    git show origin/council/zai:z-post-blue-wave75-2026-11-06-w75/_agents/zai/START-OF-CHAT-ZAI.md 2>/dev/null | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'

**Fallback chain** (stop at the first that works):
1. `origin/council/zai:_agents/zai/…` (primary — updated by import-zip/seat-save)
2. The newest wave package folder on council/zai (the courier may lag the zip the Owner holds — verify hashes, never locations)
3. **The Owner's own branches: `council/vl` has carried the newest product bytes; the Architect's work lives on `architect/engine-and-seats`. Check ALL before saying a wave is missing.**
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST package's INTAKE LEDGER (`20261106-w75-intake-ledger.md` in the w75 zip) — the Owner's words, item by item, with the veto flags
3. The latest UPDATE-README.md / build report / answers doc — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law (shell track)
5. Colors-track law: `architect/engine-and-seats:_agents/owner-notes/` (verbatim Owner rulings) + `inbox/`; council rules on shared machinery: `git show origin/council/base:AGENTS.md`

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-06 (chat, ~10:00 PT) · sandbox session 31 · fresh clone, full state recovered in
              under 3 minutes from §1's list-first discovery (council/zai + gh-pages, w75 verified by hash)
WAVE        : wave 76 SHIPPED = the Owner's DRAFT COMMAND CENTER round + both decided vetoes + M6.
              U1 the section-A header text is gone (the room cards stand alone) · U2 the line text is
              gone (the three cut lines still run unseen) · U3 CUTDOWN DAY is a centered Cinzel
              Decorative subtitle (.zpb-fx-cdtitle, larger than the retired line, under the title) ·
              U4 the footer reads PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO 20-0 and the 20-0
              shimmers in the user's team color (.zpb-fx-goshine, the fxshine sweep on --zrb/--zrd) ·
              U5 the delta ("−N vs his XX OVR") is retired from every card, dead CSS with it · U6 the
              cutdown cards wear the OVR as a badge of the position badge's own class (measured equal)
              and the SEASON RATING at about the badge size (.72rem vs the badges' .62rem) ·
              V-a the slot-picker chip reads just −10 (NATURAL keeps its word; the last FLEX chip dies) ·
              V-c the median is the NORMALLY-DRAFTED pool's (top 1,024 of the POS_SLOT_MAP-filtered
              board; measured 77 vs the old all-database 76), produced once, cached, never per draft;
              the translation door stands (backend untouched); the scale line in the why-box reworded
              (and moved into the live tiles override — w75's copy sat in the shadowed original and
              never rendered; the recap generator it lives in is itself retired from the live shell,
              flagged for the council) · V-b HELD (the 40 % floor + TRUE OVR test await the Owner).
ANSWERS     : 20261106-zai-answers-to-muse-w76.md — M6 fits and shipped (the w74 docs retargeted, the
              count bases stated, b-top30-*.json untouched); M1 relabels flagged out of M6 scope; the
              Owner's three questions answered (direction · priorities · reboot infrastructure).
M6          : w74-docs-m6/ in the zip — 11 files at their gh-pages paths + M6-CHANGES.md (27 edits,
              line-level) + w74-m6.patch (the unified diff). CALIBRATION + FINDINGS: 90/35/25 +
              P(20-0) ≈ 1–2 %, the parity band = the real-NFL reference (3.07 ± 0.35) — the target is
              derived in M5; timeline line 33; the count bases in 8 headers.
PRODUCT     : Football-Sim-Z-post-blue-w76.html · md5 4f363452a4ad33709244ca08d4ab3b00 ·
              1,830,164 bytes (base: w75 9f990ab74fb0acba9e55b82395e60647, 1,826,882 B, re-verified)
PROOF       : 153 pass / 0 fail — w76 battery 84 (V0 the drafted-pool median + the cache surviving a
              draft boot, the command center round U1–U6, V17 the picker chip, the explainer truthful;
              V15's harness gap fixed — the fills column now really read) · w69 owner 33 · w69
              dropdowns 14 · w68 names 14 · w67 teams 8 — all re-pointed at the w76 bytes · zero page
              errors · 25 script blocks node-checked · screenshots in the package shots/
LANE        : local zai lane @ wave-76 (the zip carries it; nothing pushed — sandbox cannot)
QUEUE       : veto (b) (the cutdown 40 % games floor + TRUE OVR test) awaits the Owner's call ·
              the Lab pre-registrations (M2–M5) wait for a runnable harness · the M1 policy relabels
              ride the next Lab pass · 76 Pancakes cutover is the Architect-led move
LEDGER TAIL : 20261106-w76-intake-ledger.md §flags — 5 interpretations flagged for veto
LAST ZIP    : z-post-blue-wave76-2026-11-06-w76.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 19: §0 carries the w76
              standing laws; §3 rewritten; §4 gains the w76 anchor)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" on `council/zai`, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check gh-pages first — the w56–w75 builds live there; w74 carried no product HTML). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 52 = `40613b81…` (1,585,036 B) · the Owner's w54 = `512d1885…` (1,584,527 B) · w70 parity anchor = `79c4a934…` (1,806,245 B) · wave 73 = `8b72bf72…` (1,818,133 B) · **wave 75 = `9f990ab7…` (1,826,882 B) · **wave 76 = `4f363452…` (1,830,164 B)**.

## §5 · Working rules (the ten that matter)

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts, the `zpb_w75.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file). On the Colors track: the Architect owns `colors/src`; the executor seat ships tools/inbox/answers, never engine edits.
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess** — probe the live page for the numbers the build leans on (the w75 ladder/median probe is the pattern to copy).
4. Style guide ten commandments + the do-not-regress ledger + §0's standing laws (shell track). Integers only. No white text.
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** (see END-OF-CHAT-ZAI.md) — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only `_agents/zai/**` and `inbox/` (council convention).

## §6 · Idle protocol (Owner said "continue" with no new file, or you finished early)

1. Read `PRIORITIES.md` (§1.4) → take the **top OPEN item in your domain** (product build/design/verify).
2. One-line claim in chat (`CLAIM: <ID> · <scope>`), then build it through the full §5 pipeline.
3. If nothing in your domain is OPEN: run one standing chore — reconcile your intake ledger against `PRIORITIES.md` for drift, or re-run the verify suites against the current deliverable and pin fresh evidence.
4. Never sit waiting; never ask "what next?" without first showing §1's orientation output.

## §7 · First reply template (4 lines, then work)

```
READ : ZAI.md (council/zai) · this doc §3 · <anything else actually read>
STATE: wave <N> · md5 <first8>… · queue <state> · last zip <name>
PLAN : <what you will do this chat, one line>
```

— Z.ai · read → verify → build → verify → zip → link. Nothing else.

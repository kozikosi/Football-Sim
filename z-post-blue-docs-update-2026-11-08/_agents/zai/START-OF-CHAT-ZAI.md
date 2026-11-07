# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 22 · 2026-11-08 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 21 carried the w79 state; §3 now carries the 2026-11-08 lab-window state. REV 22 workflow deltas: §3 only — REV 21 laws held; the lab window built inside them.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` (it travels inside the latest package/zip — branch `council/zai` lags; verify by hash, never by location), (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one. The base of every wave = the LATEST wave file (highest w-number with a product HTML) on gh-pages, verified by listing — w79 built on w76 (w77 was cutover support, w78 the flex conversation, neither a product HTML).**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- **THE SHELL AND THE PORT ARE TWO TRACKS:** (a) the Z-post-blue shell waves (this lane's product) and (b) the Colors rebuild — **76 Pancakes** — the Architect's TypeScript track on `architect/engine-and-seats` (his tools: tools/mathlab/flexscan.mjs, flextune.mjs, flexcap.mjs, calibrate-weights.mjs, salary-reference.json, the Owner's verbatim owner-notes). His engine has NO natural-first unit law — his flexcap raises (TE1 600, SS 600…) do NOT transfer to the shell. **The OWNER'S VERBATIM LISTS live on the architect branch: tools/mathlab/salary-reference.json (weights+salaries, 6 Nov) and _agents/owner-notes/2026-11-07-flex-table-verbatim.txt (the flex list) — check there FIRST for Owner rulings.**
- **THE BATTERY LAW (standing):** the acceptance battery lives at `batteries/accept.js` with pluggable adapters. Re-pointing at a new build = writing an ADAPTER, never editing assertions — EXCEPT a law value the OWNER himself changes, which is re-pointed with a LAW-CHANGE marker (w79 precedent: V1's order, one line). Reference rule: before any acceptance run, the harness must reproduce 84/0 on the w76 bytes with byte-identical labels. The three-run ritual: REFERENCE → ACCEPTANCE → DELTA.
- **THE APPARATUS LAW (standing since w79): every weight/flex question runs through `tools/zai-lab/` — seeded drafts (mulberry32 in-page), the 85+ flex scan (drive/small/second/emergency classes + the "encouraged" test), the weight sweep (one-slot ±50 → downstream report), the impact audit (revealed vs displayed, ±50 room). Deterministic: same seed = identical scan. New surfaces ship with assertions in `batteries/w79-surfaces.js` (or its successor) and the suite must be BITE-PROVEN (it fails against the old build).**
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold; the DOT LAW; the phone laws; the w52/w53/w55/w75/w76 standing laws (see REV 20's §0 — unchanged); **w79 (standing, the Owner's round): the Owner's weight table IS the model (DEFAULT_WEIGHTS, the MODEL preset, every displayed weight; QB anchored 1000, inputs cap 1000) — the engine's measured slot curves carry one multiplicative calibration so the revealed 70→90 impact lands ON the table (±0; the Owner's room ±50); the game-day matchup model and the play-by-play stay untouched; the salary column is internal reference, never rendered; the flex table = the Owner's 7 Nov list under the −10 cap (2s/4s untouched; named calls at 10); the flex chart GENERATES from the live FLEX table (hand-written charts drift); the rankings weights dropdown carries the draft board's 14 position chips + ALL/CLEAR (lit = counts, dark = zeroed, ALL restores); every dropdown reads the depth chart (SS before FS); a footer-tab click never scrolls the page (nav-bar-only centering).**
- Cinzel Decorative; explanations live in the Guide.

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin gh-pages architect/engine-and-seats council/zai main
    git ls-tree -r origin/gh-pages --name-only | grep -E "Football-Sim-Z-post-blue-w[0-9]+\.html$"   # the LATEST wave file — verify by listing, never hardcode
    git show "origin/gh-pages:z-post-blue-wave79-2026-11-07-w79/_agents/zai/START-OF-CHAT-ZAI.md" 2>/dev/null | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'

**Fallback chain** (stop at the first that works):
1. The newest `_agents/zai/START-OF-CHAT-ZAI.md` on **gh-pages** (every package since w55 carries it; the newest package folder wins — verify hashes, never locations).
2. `origin/council/zai:_agents/zai/…` (primary by design — KNOWN STALE in practice; the courier lags, the zip is the push).
3. **The Owner's own branches: `architect/engine-and-seats` carries the Architect's tools + the Owner's verbatim rulings; `council/vl` has carried product bytes. Check ALL before saying a wave is missing.**
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST intake ledger (`notes/W79-INTAKE-LEDGER.md` in the w79 package) — the Owner's words, item by item
3. The latest UPDATE-README.md + the wave's evidence report — the wave deltas and the proof
4. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law (shell track)
5. Colors-track law: `architect/engine-and-seats:_agents/owner-notes/` (verbatim Owner rulings) + `tools/mathlab/`; council rules on shared machinery: `git show origin/council/base:AGENTS.md`

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-08 · sandbox session 34 · fresh clone; state from gh-pages (93447340) + council branches
WAVE        : wave 79 STANDS as the product. This chat was a LAB WINDOW (Beam's P-013 request,
            "build tooling before Claude's turn"): no product bytes touched, no wave built.
            Built + ran the lab: T3a raw-curve witness (auto-detects calibration absorption —
            w79 verdict ABSORBED 0.000000%), T3b triangulation rosetta (14/26 rank flags vs
            Owner salary anchor; new-preset PROPOSAL QB=1000/incr-50 from raw slopes, not shipped),
            T1 mechanics v0 (8 seeded seasons: skill production CLEAN vs nflverse 2024; sacks
            DL-skewed, DB 0% vs 7.3% → D-001; wins 8.5 in band), T4 replacement audit (engine
            replacement OVR 70.8–76.3 nearly uniform vs real deployment ~3× spread → D-004),
            T6 flex pricer v0 (TE→WR1 median 0.63 wins lost, CB→WR1 0.67, full-roster
            counterfactuals via the shell's own optimizer), T12 reporting law in code,
            governance set (H-001..007, D-001..007, R-001..004, heldout lint CLEAN).
            NEW FINDING (corrects the 7 Nov ruling record's premise): the 28 Oct fitlm target
            was design.json(27 Oct)×0.00254 (29/29 exact) — an Architect table on the Owner's
            25 Oct "pick your own weights, QB=1000" directive — NOT the old personal table;
            current Colors specs refit to salary 6 Nov (6cccf29); deepest verified circularity
            = the w79 display layer. See notes/FIT-TARGET-FORENSICS-2026-11-08.md + prompt v2.
PRODUCT     : Football-Sim-Z-post-blue-w79.html · md5 61acb21e55fac92a6d84eac6acb10bd1 ·
              1,836,431 B (unchanged this chat — read-only lab window)
LANE        : local branch zai-lab-20261108 (cut from council/zai tip; UNPUSHED — sandbox law).
              Deliverables: deliveries/PROMPT-FOR-CLAUDE-2026-11-08-v2.md ·
              deliveries/VERACITY-SYNTHESIS-ADDENDUM-2026-11-08.md · tools/lab-20261108/ ·
              lab-results/ · governance/ · notes/FIT-TARGET-FORENSICS-2026-11-08.md ·
              inbox/20261108-0900-zai-lab-window-results-and-prompt-v2.md
QUEUE       : Claude evaluation window (prompt v2 delivered via inbox) · confirmatory reruns of
              H-001/H-004/H-005 with the Verifier seat · Colors-side witness mirror (H-006) ·
              T7–T11 queued in the ledger · Owner owes: R-001 record correction ruling (D-007),
              display-preset PROPOSAL review (triangulate output)
NEXT ACTION : on Claude's answers → fold Q0 confirmation + Q2 param diff into the Rosetta; else
              confirmatory pre-registrations with the Verifier
WORKFLOW    : THIS doc (REV 22) + END-OF-CHAT-ZAI.md + ZAI.md (all in the zip)
BATTERIES   : unchanged from w79 (no product bytes touched this chat): REFERENCE 84/0 ·
              ACCEPTANCE 84/0 · NEW SURFACES 27/0 on w79, 6/21 bites on w76 · zero page errors
LAB         : this chat's lab window (lab-20261108): 8 seeded seasons (272 games each, ~0.7s/season),
              4 seeded drafts for T4 checkpoints, 8 paired seeds for T6 (453 priced placements);
              mulberry32 harness seeding; real inputs sha256-pinned (player_stats/snap_counts/
              depth_charts/player_stats_def 2024); all outputs in lab-results/ with T12 wrappers
LAST ZIP    : z-post-blue-docs-update-2026-11-08.zip (this chat's delivery; carries the lane)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" in the newest package, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check gh-pages first). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 52 = `40613b81…` · the Owner's w54 = `512d1885…` · wave 76 = `4f363452…` (1,830,164 B, the FROZEN REFERENCE) · **wave 79 = `61acb21e…` (1,836,431 B).**

## §5 · The rules that matter

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts, the `zpb_w79.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file). On the Colors track: the Architect owns `colors/src`.
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess.**
4. Style guide ten commandments + the do-not-regress ledger + §0's standing laws. Integers only. No white text. **EVERY NEW SURFACE SHIPS WITH AN ASSERTION — and the suite must be BITE-PROVEN against the previous build.**
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** (see END-OF-CHAT-ZAI.md) — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only `_agents/zai/**` and `inbox/` (council convention).
11. **THE RE-POINTING PATTERN (standing): the acceptance battery is `accept.js` + adapters. The assertions and their law strings are FROZEN — re-pointing a suite at a new build means writing an ADAPTER (hooks + engine snippets), never editing assertions. A LAW VALUE THE OWNER HIMSELF CHANGES is re-pointed with a LAW-CHANGE marker on that line (w79 precedent). Before any acceptance run, re-prove the harness on the w76 reference (84/0, labels byte-identical). The three-run ritual: REFERENCE → ACCEPTANCE → DELTA.**
12. **THE APPARATUS RULE (standing since w79): weight/flex questions are answered by the seeded lab, never by argument. Cite the scan. State the class definitions. Keep Claude's class definitions compatible so the numbers stay comparable across tracks.**

## §6 · Idle protocol (Owner said "continue" with no new file, or you finished early)

1. Read `PRIORITIES.md` (§1.4) → take the **top OPEN item in your domain** (product build/design/verify).
2. One-line claim in chat (`CLAIM: <ID> · <scope>`), then build it through the full §5 pipeline.
3. If nothing in your domain is OPEN: run one standing chore — reconcile your intake ledger against `PRIORITIES.md` for drift, or re-run the verify suites against the current deliverable and pin fresh evidence.
4. Never sit waiting; never ask "what next?" without first showing §1's orientation output.

## §7 · First reply template (4 lines, then work)

```
READ : ZAI.md (newest package) · this doc §3 · <anything else actually read>
STATE: wave <N> · md5 <first8>… · queue <state> · last zip <name>
PLAN : <what you will do this chat, one line>
```

— Z.ai · read → verify → build → verify → zip → link. Nothing else.

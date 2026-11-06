# START OF CHAT — Z.ai · High Councillor seat · SANDBOX EDITION

REV 21 · 2026-11-06 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 20 lives in the cutover package; §3 carries the w77 state. REV 21's workflow delta: §0 gains the OWNER-WEIGHTS LAW — the w77 standing round.)

**What this doc is for:** you (Z.ai) wake up in a FRESH SANDBOX with no memory. Your memory lives in three places: (1) this doc's §3, (2) your lane file `ZAI.md` (it travels inside the latest package/zip — branch `council/zai` lags; verify by hash, never by location), (3) the latest update zip the Owner holds. Read them; do NOT re-derive project history with probe passes. Orientation budget: 3 minutes, then work.

---

## §0 · Who you are (never re-derive this)

- Z.ai, High Councillor seat ZAI (below the Architect Claude, above advisors — Owner's ruling, 24 Oct 2026). Architect and builder of Z-post-blue: a single-file football-simulation HTML (Football-Sim-Z-post-blue-w<N>.html), built wave by wave from the Owner's verbatim directives. **The Owner's wave counter is the truth — since w54 the Owner's number and the file name are one. The base of every wave = the LATEST wave file (highest w-number with a product HTML) on gh-pages, verified by listing — never hardcode the number.**
- You are reached by IM chat. Your sandbox can read GitHub (public HTTPS) but cannot push (no credentials). Your push = the end-of-chat zip, relayed by the Owner (or Beam via tools/import-zip.sh zai <zip> → lands in _agents/zai/imports/… on council/zai).
- **THE OWNER-WEIGHTS LAW (standing since w77, 2026-11-06): the Owner has stated his PERMANENT OPINION on the weights — the xM y z table (salary · slot · weight), QB anchored at 1000, saved verbatim in `notes/W77-WEIGHTS-OPINION.md` + the w77 intake ledger. THE SALARY COLUMN IS INTERNAL REFERENCE AND MUST NEVER BE DISPLAYED TO THE USER ON THE APP — it lives only in the lane docs, never in the product bytes. The weights are the MODEL preset 1:1 (no rescaling), the input ceiling is 0..1000, and the Guide re-ranks importance by the WINS the table implies (1 unit = 0.00254 wins over a 70→90, the standing conversion). The engine keeps its own math until Claude lands slotWinsPerOvr within ±50 of the table in the 76 Pancakes port; the board panel carries the one-line disclosure of the two scales.**
- **THE BATTERY LAW (standing since the cutover chat): the acceptance battery lives at `_agents/zai/**/batteries/accept.js` with pluggable adapters. The shell wave batteries re-point by FILE, never by editing assertion labels. Reference rule: before shipping, the full battery + the four standing suites run green on the new bytes with zero page errors. Every new surface ships with an assertion.**
- **w76 (standing, the Owner's round): the DRAFT COMMAND CENTER speaks bare — no section header text, CUTDOWN DAY is a centered Cinzel Decorative subtitle, the footer asks for the 20-0 and the 20-0 SHIMMERS IN THE TEAM COLOR — the cutdown cards wear the OVR as a badge of the position badge's own class and the SEASON RATING at about the badge size — the slot-picker chip reads just −x — the display-scale median is the NORMALLY-DRAFTED pool's (top 1,024 picks; measured 77), produced ONCE and cached.**
- **Since w72 the project has two tracks:** (a) the Z-post-blue shell waves (visual laws below govern anything touching them) and (b) the **Colors rebuild — named 76 Pancakes** (the Owner's final product name for the Svelte app; Claude's engine lane). The Owner's directives arrive verbatim in chat or through Muse briefings and owner-notes on the Architect's branch; the intake-ledger rule is unchanged.
- Product law: the Owner's words are law verbatim; style guide ten commandments (deliveries/STYLE-GUIDE-Z-POST-BLUE.md); integers only; no white text; one shimmer (90+) / 85+ bold — the comparison sweep breathes PALE to MID gold — the ANCHOR PANEL FOLLOWS THE TEAM, NO BLACK TEXT ANYWHERE (the site light ink is the halfway rose #8e5566) — NICKEL and DIME share one map row — w52: THE DOT LAW (every displayed colon/semicolon renders as the middle dot; the look-gate releases on .zpb-seen); the awards lead "#X Y"; the Super Bowl is PLAYED — w53/WM: the touch polish, the 38px tap floors, the rankings containment — w55: THE PHONE LAWS — the wrap never shrink-to-fits, the box score is ONE table on the phone, the tab is remembered, Cinzel Decorative; explanations live in the Guide — w75: the chip law is the TOGGLE MODEL; the four preseason explainers are PLAIN; "2 point conversion" on the preseason page and in the guide; the rating DISPLAY scale is median-centered; DRAFT COMMAND CENTER on the shared review; BACK TO <STAGE> rides the footer pages; the guide ladder shows all 32 slots; OFFENSIVE GUARD, never just Guard — **w77: the weights surfaces wear the OWNER'S table (see the OWNER-WEIGHTS LAW above).**

## §1 · The 60-second orientation (run exactly this, in order)

    mkdir -p /home/z/my-project/boot && cd /home/z/my-project/boot
    git init -q . 2>/dev/null; git remote add origin https://github.com/kozikosi/Football-Sim.git 2>/dev/null
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin council/zai architect/engine-and-seats main gh-pages
    git ls-tree -r origin/gh-pages --name-only | grep -E "Football-Sim-Z-post-blue-w[0-9]+\.html$"   # the LATEST wave file — verify by listing, never hardcode
    git show "origin/gh-pages:z-post-blue-wave77-2026-11-06-w77/_agents/zai/START-OF-CHAT-ZAI.md" 2>/dev/null | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'

**Fallback chain** (stop at the first that works):
1. The newest `_agents/zai/START-OF-CHAT-ZAI.md` on **gh-pages** (every package since w55 carries it; the newest package folder wins — verify hashes, never locations).
2. `origin/council/zai:_agents/zai/…` (primary by design — but KNOWN STALE in practice; the courier lags, the zip is the push).
3. **The Owner's own branches: `council/vl` has carried product bytes and reviews; the Architect's work lives on `architect/engine-and-seats`. Check ALL before saying a wave is missing.**
4. The Owner's latest z-post-blue-*-update-<date>.zip — ask the chat context for its filename, or list /home/z/my-project/download/
5. None reachable → say so in one line and work from the chat context alone (the Owner's message is always the top directive anyway).

## §2 · Read order after §1 (only what the task needs — do not bulk-read)

1. `_agents/zai/ZAI.md` (state pin — "What the next session needs" is your to-do seed)
2. The LATEST intake ledger (`20261106-w77-intake-ledger.md` in the w77 package) — the Owner's words W1–W6, item by item, with the eight veto flags
3. `notes/W77-WEIGHTS-OPINION.md` — the Owner's permanent weights opinion (the salaries live HERE, never on the app)
4. The latest UPDATE-README.md / build report — the wave deltas and the proof
5. deliveries/STYLE-GUIDE-Z-POST-BLUE.md — design law (shell track)
6. Colors-track law: `architect/engine-and-seats:_agents/owner-notes/` (verbatim Owner rulings) + `inbox/`; council rules on shared machinery: `git show origin/council/base:AGENTS.md`

## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-06 (chat, after the cutover chat) · sandbox session 33 · state recovered from
              gh-packages (council/zai stale at w55; the fallback chain landed on the cutover package
              + the w76 package on gh-pages; w76 verified by md5 4f363452… before the first patch)
WAVE        : wave 77 SHIPPED (the Owner's round: THE WEIGHTS — "this is what I want to save as my
              permanent opinion on the weights that the engine should be built around"). The Owner's
              directive lifted the shell freeze for this round only; w76 stands untouched as the
              frozen reference (md5 re-verified at boot and at close).
PRODUCT     : Football-Sim-Z-post-blue-w77.html · md5 74b284e5fda0c21f40714abe7efff670 ·
              1,831,313 B (base: the w76 bytes 4f363452… from gh-pages 367d8e3e)
CHANGES     : E1 the Owner's 32-slot table IS ZPB_SLOTS_W (SS2/FS2/LB4 held at 10) · E2 modelWeights()
              1:1 (the 700 rescale dead) · E3 inputs 0..1000 · E4 the Guide ladder reads the table —
              the Owner re-rank live (QB 2.5 · WR1 1.7 · DE1 1.7 · OT1 1.3 · DT1 1.3 …) · E5 the
              series surfaces ride the same order (dropdown + steps, P and FB still outside) · E6 the
              one-line two-scales disclosure on the board panel · E7 the dead guide consts' text kept
              coherent, the REWEIGHT-BRIEF pointer gone from the bytes
SALARIES    : INTERNAL ONLY — the xM column lives in the intake ledger + notes/W77-WEIGHTS-OPINION.md;
              the product bytes carry NO salary data (asserted by a byte-sweep in zpb_w77.py and a
              live-render sweep in V77); the app shows the weights only
ENGINE      : untouched (the sim's slotWins math is measured off the matchup model, not a coefficient
              table — nothing easy to flip; Claude lands slotWinsPerOvr within ±50 of the table in the
              76 Pancakes port; the cutdown ladder + the board WINS stay engine-truth, disclosed in
              one Guide line)
PROOF       : verify_w77.js = the w76 battery re-pointed (labels byte-identical) + V77 (15 new
              assertions) — 99 pass · 0 fail · the four standing suites re-pointed — 33+14+14+8 all
              green · TOTAL 168 pass · 0 fail · zero page errors · four evidence shots
LANE        : local zai lane @ wave-77 (the zip carries it; nothing pushed — sandbox cannot)
QUEUE       : the Owner's eight veto flags (ledger) — headliners: the three unpriced slots (SS2/FS2/
              LB4 at 10), the series surfaces riding his order, the salaries' storage shape · the five
              cutover flags still await his call · the port adapter (pancakes.js) is the Architect's
              homework · the M1 policy relabels ride the next Lab pass
LAST ZIP    : z-post-blue-wave77-2026-11-06-w77.zip
NEXT ACTION : whatever the Owner sends next; on "continue" with no file → §6 idle protocol
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 21: §0 the OWNER-WEIGHTS
              LAW; §1 the w77 package path; §2 the opinion doc in the read order)
```

## §4 · Version truth table (which copy is the product?)

Latest = the NEWEST of: (a) §3 above, (b) `ZAI.md` "Current work" in the newest package, (c) the newest `Football-Sim-Z-post-blue-w<N>.html` on ANY branch (check gh-pages first — the w56–w77 builds live there; w74 carried no product HTML). If a copy's md5 ≠ §3's md5 and §3 is newer, §3 wins. Never trust a file's location alone — verify the hash. Known anchors: wave 55 = `49161f11…` (1,592,738 B) · w70 parity anchor = `79c4a934…` (1,806,245 B) · wave 73 = `8b72bf72…` (1,818,133 B) · wave 75 = `9f990ab7…` (1,826,882 B) · wave 76 = `4f363452…` (1,830,164 B — the FROZEN REFERENCE) · **wave 77 = `74b284e5…` (1,831,313 B).**

## §5 · The rules that matter

1. Owner's message = law, verbatim. Intake-ledger it first (§2.2), then build.
2. Build ONLY via the chain on the latest deliverable (patch scripts, the `zpb_w77.py` pattern: asserted exact replacements + payloads + post-checks; regenerate from the pristine baseline on every fix — never hand-edit and never append to a patched file). On the Colors track: the Architect owns `colors/src`; the executor seat ships tools/inbox/answers, never engine edits.
3. Verify before shipping: the wave battery + the standing batteries, zero console errors, screenshots to evidence. **Measure, don't guess.**
4. Style guide ten commandments + the do-not-regress ledger + §0's standing laws (shell track). Integers only. No white text. **EVERY NEW SURFACE SHIPS WITH AN ASSERTION.**
5. Delivery gate: no work report counts without a download link and a verified md5.
6. **Every chat ends with the zip** (see END-OF-CHAT-ZAI.md) — this is Owner law, not a habit.
7. Network commands: always `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …` and/or `timeout 60 …`; at most 2 attempts; never hang silently.
8. **Never `git push`** — it hangs (no credentials). Local commits + zip instead. Report `unpushed` honestly.
9. Sandbox paths exist only for you — the Owner's real paths are the chat's download area and his GitHub. Never reference sandbox paths as if he can open them.
10. Do not invent work beyond the Owner's directives; if idle, §6. Do not edit other seats' lanes; write only `_agents/zai/**` and `inbox/` (council convention).
11. **THE RE-POINTING PATTERN (standing): the shell wave batteries re-point by FILE path; the assertion labels and law strings stay byte-identical. The cutover acceptance battery (`accept.js` + adapters) is for the 76 Pancakes port — filling an adapter, never editing assertions; before any acceptance run, re-prove the harness on the w76 reference (84/0, labels byte-identical). The three-run ritual: REFERENCE → ACCEPTANCE → DELTA.**
12. **THE SALARY WALL (standing since w77): the Owner's salary figures (the xM column of his weights table) never enter the product HTML — not rendered, not in a comment, not in a constant. They live in the lane docs only. Any wave touching the weights surfaces re-runs the byte-sweep and the live-render sweep.**

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

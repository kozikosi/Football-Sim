# PROMPT — for Z.ai: the authoring sitting (≥30 minutes, do not stop)
**From:** INKLING (council seat) · **Date:** 2026-11-15 · **For:** Z.ai (Executor) — relayed by the Owner
**Delivery:** folder + MANIFEST; never attempt git push; the courier pattern stands.

---

You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. **The Owner has asked a question with a receipt:** *"Is it easier/faster/more complete for an agent to code in Vue 3 + Vite vs Svelte 5 + Vite?"* **Everything measured so far measured the artifact — lines, bundle, cold load. None of it measures how hard the thing was to write or whether you could write it well at all from a blank file.** This sitting measures the authoring, honestly, while the surface is fresh.

**Standing order:** do not queue work; complete everything before replying; anything you cannot finish, name the blocker exactly and stop. **Do not stop after §3.** Sized for at least 40 minutes.

**You are the principal executor** of this measurement (your context window is larger than anyone else's), and the benchmark must be replicable by **any other agent who runs it** — make that trivial by writing the measurement protocol down, not by memorizing what to say to yourself. The Owner will also admit BEAM/DC/GLM/PICKLE-style second agents to re-run the same protocol after you.

## 0 · State of play — read, do not re-derive

Settled and carried in `AGENTS.md` (Owner's 2026-11-15 rulings, verbatim in that file): **R-1** framework narrowed to **two arms** (Vue 3 + Vite vs Svelte 5 + Vite; you build both; **measurement decides**) · **R-2** pin **`d3bd81d2`** — your engines are vendored at it · **R-3** save = one blob + version check · **R-5** Title Odds rejected (except 100-season, post-cutover) · **R-6** λ ACCEPTED · **R-7** flex asymmetries deliberate · **R-8** ratings not yet · **R-9** React gone · **R-10** no publish · **R-11** red tests ruled "fix them" not "carry them" · **R-12** **1,953 players frozen** · **R-13** (same).

Your two arms and four-slice slope receipts are on `council/inkling:_agents/inkling/deliveries/zai-sitting-2026-11-15-four-slice/`. Your prior sittings produced them with no framework verdict; the Owner is now measuring the **authoring**.

**Your desk still carries:** the `feed.ts` OT clock defect (l.59–60: `Q4 -5:00` negative remainder, `Math.min(4, …)`caps OT at Q4) — the fix is one line at the next re-pin, filed for the Architect; you do not apply it. The `crossorigin` file:// CORS boot; the flexed-85+ rise (report only, goes to the Lab); the w89/w85 wins-page inheritance — measured at the old pin, inherited at the new one; flat/none of these is your concern this sitting.

## 1 · The experiment — the Slice 5 build in both arms (the spine)

### 1.1 Slice 5 — player cards, both arms, Vue FIRST

**The Owner's verbatim:** *"whatever looks similar to w89 [the shell] but i do think the player cards could be a lot more dynamic and beautiful. whatever looks best and is the most dynamic and interactive for the user."* So the card should belong to the w-series family visually — but feel like a genuinely better product.

**Assignment (both arms, same machine, same sitting — Vue first, then Svelte):**

Build Slice 5 — the shareables/brag card — **in both arms**, same engine bytes, same fixture bytes, same chrome. Pick the format you believe works best for shareables (HTML interactive card + PNG/share export, or another), and say why in one line. **Do not quote w89 bytes for the layouts verbatim** — build the structure from the engine's view-model truth.

Direct to the Owner's wish: **make the card feel alive, not printed** — one interaction (whatever you can afford — hover/tap highlight, an animation on open, a "skip to share" round) that makes a user want to keep it on their screen.

**Probe it (before you move from §1 on):** the card renders with the user's team (colors, name), their highest-wins-above-replacement player at their natural slot, the user's final OVR-over-replacement as a "Priority Score", a one-line bragging headline — and the printable/export action works to a clean PNG. One command per probe per arm; one receipt line each. **If the card fails the probe, fixing it comes first — nothing else in §1–§4 matters while the card is broken.**

### 1.2 The measurement — same surface both arms (this is the part the Owner cares about)

For each arm, **log in `measurements/slice5-timing.txt`**, every line prefixed by arm (`arm=vue` / `arm=svelte`):

- `frozen` (assets + engine bytes `cmp` identical across arms; `cmp` clean — one line)
- `install` (npm install exit, elapsed)
- `first_build` (time, exit, one-line of output)
- `typecheck` (time, exit, **the two worst error messages verbatim, one line each**, count of errors)
- `first_working_iterations` (n builds from blank to green; each failed build gets a one-line note)
- `time_to_first_green` (wall-clock)
- **agent_context_scratch_checks_count** (your own running count of everything you looked up mid-build — every doc opened, every file re-read, every grep — one number per arm)
- `workaround_lines` (count split: `ts-ignore`, `any`, `getter wrappers`, `else` — the wrinkles the framework forced)
- `framework_owned_lines` (entry + root + card + store glue; same convention as the four-slice receipts)
- `full_build` (time to green from launch)
- `re_build_after_one_word` (change any one visible word, rebuild, record time)
- `index_bytes` (raw + gzip-9 of `dist/`)
- `canon_purity` (`grep -nE "\.weight\b|WEIGHT\b" new files under src/` — must be clean)

**Name the arm order you picked in the filing's first line** — I built Svelte first in every pair last sitting; this sitting explicitly flips that order, and the reason is stated, so your record is legible.

### 1.3 Authoring cost — evaluated separately (AUTHORING-COST.md, required)

Write `measurements/AUTHORING-COST.md` — its own file, its own receipt. Include per arm (Vue and Svelte):

- wall-clock total (your honest sum of the logged stages plus installation),
- number of edit cycles from blank to first green,
- number of wall-clock minutes you spent on issues that existed only because of the framework,
- number of times you had to open docs, fetch references, or ask the parent repo — and how many lines of code you wrote between each such opening,
- your own per-arm verdict on what "was it hard?" felt like and why — with receipts —
- one sentence per arm: **the simplest thing that was true in the exercise but would be hard to remember at your next session**, and the one thing that was free and you should not have paid for.

**Owner want separated here: authoring cost is one input among several; this counts separately and is the input you're being measured on.**

### 1.4 Category winners — all of them, one line per row

Write `measurements/CATEGORY-WINNERS.md` — one winner per category, one receipt line per row:

| Category | Winner | Evidence |
|---|---|---|
| bundle (dist gzip-9) | | |
| cold load at w89 profile, 6× throttle | | |
| line count (framework-owned) | | |
| type-check error usefulness (quote the closest exchange) | | |
| rebuild time (one-word change) | | |
| iteration cycles (blank → green) | | |
| first-frame paint (browser `performance.timing`) | | |
| keyboard reactivity (**all** flow actions ≤ 20 ms) | | |
| CSS file size | | |
| compile errors (which checker names them better) | | |
| a11y warnings (count) | | |
| devtools fidelity (file:// protocol; what you could and could not inspect) | | |
| ecosystem depth for the long haul (plugins, shells, pinned version support) | | |
| store maintainability (shallowRef vs Svelte $state ergonomics) | | |
| template ergonomics (one-liner — where does the free $derived/computed earn its keep) | | |
| build time on clean install | | |
| dev server startup + HMR working under file:// | | |
| 390 px (no horizontal scroll on heaviest view) | | |
| offline boot (0 blocked requests, 0 console errors) | | |
| authoring cost (carry your AUTHORING-COST.md numbers here) | | |

**Then the weighting — state it in writing:** which categories decide, which are tie-breakers, which are noise, and why. The Owner is going to read that weighting before he rules.

### 1.5 Naming the experiment and the judge

The two-arm one-agent head-to-head has a ceiling: you and only you (and ERNIE — see below) are the agents in the room. The Owner has asked to add **at least one other agent** as the other arm — let the Owner know which seats are eligible and say which you'd pick. Until that second agent runs, your answer to the question stays **subjective-but-measured**, not double-blind. The block is not fatal — but name it in `AUTHORING-COST.md` so nobody mistakes a solo signal for a shared one.

## 2 · The second arm, to make this measurable without you

**The Owner has authorized any other seat to run the same protocol.** If the bench opens for others, the steps below would be the checklist a second author could follow in one sitting:

1. Checkout the pin `d3bd81d2`'s tree, copiable exactly as your `67-cakepanz-s3-s4-rev2/` does.
2. Mint the same fixture (seed 1000, MIN @ CHI, 21–11) with `scripts/two-arm-fixture.mjs`.
3. Build in the opposite arm for the same Slice 5 surface with the same engine bytes and chrome.
4. File the same eleven metrics.
5. File a two-paragraph comparison and two paragraphs per arm, tagged by framework.

**Write this into the delivery as a README for the second agent** (`measurements/PROTOCOL-FOR-A-SECOND-AGENT.md`) — short enough for the next agent to run one sitting cold. This is also the file the Owner shows other seats wishing to vote with the arms.

## 3 · Slice 5 promoted — real measurements, not build-only PR

Slice 5 is not done when it builds. It is done when it's been seen to do its four things in both arms:

1. **Renders correctly in the user's team colors and name** at 390 px (team banner / W logo attribution if Wikimedia bars attributions).
2. **The dynamic element** — whatever interaction you chose in §1.1 — fires without error, with the console clear and no blocked request.
3. **The shareable export** produces a PNG/HTML/standalone the share sheet could actually emit, with correct resolution and no cross-domain font (if you inline a font: name the exact embedded-bytes hash and size).
4. **The Slice 5 battery** (`batteries/shareable-card-probe.mjs` if you have it; proof one per arm) — you write it, you run it, you receipt it: card mounts, colors match fixture, counters match fixture, export matches card, no errors.

State measured, not asserted: a screenshot per arm at the worst case (longest player name, season not done yet, worst-case flood of pending actions).

## 4 · The attached backlog — if and only if §1–§3 are green

If — and only if — §1–§3 done and the manifest verifies, then in order:

1. **Vapor-mode Vue build** — `receipts/vapor-mode-bundle.txt` (your falsifier line; do not change the UI; enable vapor for the Vue arm; measure the JS gzip 9 total; if you cannot enable vapor cleanly, file the attempt with its verbatim errors and move on) — your switch test from last sitting.
2. **Cold-load measurement** — run the cold-load protocol on the four-slice dists: JS-only 10.9 KB moves interactive time outside the ±100 ms noise floor at the w89 low-end profile, at 390 px, no horizontal scroll. `receipts/fourslice-coldload.txt`.
3. **s2-willingness re-check** — OK if the Owner asks for it: re-run `four-slice-timing` in reverse order (Svelte first, then Vue) and note any order-of-authorship bias shift in the slope result.
4. **A second iteration pass** — ship Slice 5 in one arm to clean state, prove reproducibility (`cmp` dists; the build is deterministic under the pinned lock range), and describe its exact receipt panel. The mini-game of "prove the arm reproducible" must land before the ruling.
5. **Next-sitting handoff write-up** — four lines on what the Owner should tell you in the next prompt — including: the one decision that the R-x rulings still leave open, and which arm's name is best for the first round of shippings.

If the manifest doesn't verify at any point, stop there, say so, name the blocker — **that is the finished answer, not a failure.**

## 5 · Standing rules (binding)

- No engine edits; no `colors/` edits; no `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`; the pin is `d3bd81d2`; the old pin stays retired.
- One MANIFEST, after your last byte-changing step; blob bytes; say in one line what you cannot make contain.
- No injuries; no per-player clutch; flex consistent; no re-opening of the rejected or ruled-out items.
- No quote from the retired family without naming the pin; the live flex table is `0a26d7c2…` / 99 / QB→FS 12.
- No push; the courier pattern stands.
- Keep evidence for every claim in your filing. Receipts on every line. "No signal" is a result.

## 6 · How to reply — this is the whole finishing form

Table first: item · status (DONE | BLOCKED | UNKNOWN | ESCALATED) · receipt · one line each. Then four lines per item: cwd · command · ref@sha · output. Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <every §1-§5 item terminated by receipt>
2. STILL-BLOCKED: <...>
3. NEW INPUTS: <pointers to receipts, interview, verdict, AUTHORING-COST.md, CATEGORY-WINNERS.md>
4. NEXT-SEATING OWNER STATE: <anything the Owner told you mid-sitting>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
6. THE WINNER (if you picked one): <one line — with the weighting named>
```

— INKLING (council seat) · 2026-11-15 · the question the council, the Owner, and the project have been circling — this sitting names it.

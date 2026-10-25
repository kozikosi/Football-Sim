SPEAKER: MiMo | ROLE: Council reviewer (V22-READY-1, P7 aesthetics triage) | TASK: P7 — Aesthetics and beauty: triage 13 Beam headings | DATE: 2026-10-22 (UTC)

Scope: the 13 headings under "P7 — Aesthetics and beauty" in `V22-Suggestions.md`. **State verified against the pinned build `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b…` (656,746 B, re-verified this session).** Build line-refs below are to that pinned file and are stable; the doc itself is being restructured, so I cite the doc **by heading text, never by line**. Verdicts: **DONE** / **TO DO** (implementable now) / **TASTE** (needs the Owner's eye, not an implementer's hands). Every "current state" line is VERIFIED by grep/read of the pinned build unless tagged INFERRED.

## Verdict at a glance

| Item | Verdict |
|---|---|
| P7-1 Team-color theming across the entire UI | **TO DO** (structure) — the 32 palette hex values = TASTE |
| P7-2 Smoother animations and micro-interactions | **TO DO** (partly present) |
| P7-3 Better visual hierarchy on the draft board | **TO DO** (position-color picks = TASTE) |
| P7-4 Dark mode polish | **TO DO** (partly present) — exact hex/glass choices = TASTE |
| P7-5 Visual feedback on draft picks | **TO DO** (engine already exists) |
| P7-6 Better mobile draft board | **TO DO** — the swipe/gesture inclusion = TASTE |
| P7-7 Figma integration | **TASTE** — Owner must wire an MCP; not implementer work |
| P7-8 Super Bowl / Champions banner gold + shimmer | **TO DO** (reuse an existing gold-shimmer component) |
| P7-9 More motion: graphics/text in and out | **TASTE** — a direction/appetite, not a task |
| P7-10 Season review button placement + graphical review | **TO DO** |
| P7-11 "Seasons by Win total" chart alignment + beauty | **TO DO** (measured) |
| P7-12 "Your players; average season" + "Award patterns" visibility | **TO DO** |
| P7-13 Realism audit & league-wide records — hide from user | **TO DO** |

Net: **11 TO DO, 2 TASTE (P7-7, P7-9)**, plus TASTE sub-decisions (palette hexes, position colors, dark-hex tweaks, swipe gestures) folded into their TO-DO parents. Nothing here is DONE as written — but several items are *half-built* and can be finished by reusing components already in the build (P7-5, P7-8, P7-4).

---

## The 13, item by item

### P7-1 · Team-color theming across the entire UI
- **Asks:** derive a 3-color palette (primary/secondary/accent) per team; apply to roster strip, tab active indicator, "Drafting as" header, Team Comparison A/B headers, position-card left border, badge-strip accent — via `--team-primary/secondary/accent` on `:root`.
- **Current state:** **absent.** `grep -- "--team-primary|--team-secondary|--team-accent"` → **0 matches** in the pinned build. (There are two hard-coded team-ish gradients, `.mtag-div` / `.mtag-riv` at build l.127–128, but they are two fixed tags, not a 32-team system.)
- **Verdict:** **TO DO** for the mechanism (one palette map + set 3 vars in the team-select handler + reference them in the 6 spots). **TASTE** for the 32×3 hex values themselves (the Owner's eye / Figma).
- **Smallest change:** add `TEAM_COLORS[abbr] = [primary, secondary, accent]`; on team select, write the three to `:root.style`; point the 6 named elements at the vars. Highest data-authoring cost of the 13; overlaps the P9 Mermaid flow and P7-7 Figma.

### P7-2 · Smoother animations and micro-interactions
- **Asks:** card hover scale 1.02 + shadow; pick slide-in 200 ms; tab fade 150 ms; badge pop 100 ms; weight-counter 300 ms; "Save My Weights" pulse.
- **Current state:** **partly present.** Transitions exist on `.tabbtn` (transform/box-shadow/background .12 s, l.244), `.resetbtn` (l.247), `.slider-tog` (l.82); `tr:hover{background:var(--panel2)}` (l.45). But there is **no** player-card hover scale, **no** tab *fade* (current is transform, not opacity), **no** badge pop, **no** weight-counter animation, **no** Save-My-Weights pulse. Celebration keyframes already exist (`fxpop/fxshine/fxtoast/fxglow`, l.101–104).
- **Verdict:** **TO DO** (finish the 6 named micro-interactions; the transition plumbing already works).

### P7-3 · Better visual hierarchy on the draft board
- **Asks:** user's pick row 1.1× + glow; position-group color coding; zebra stripe; "gone" players dimmed/strikethrough.
- **Current state:** **mostly absent.** No `nth-child(even)` zebra anywhere; no position-group color map; no user-row scale/glow. "Gone" is a **column** (`td.dc-gone`, l.270, colored `--accent2`) not a dimmed row; the only dim in the build is `.chip.full{opacity:.55}` (l.186).
- **Verdict:** **TO DO.** Smallest change: add a zebra rule, a `POS_COLOR` map applied to the Pos cell, and a `.myrow` class (scale+glow) when `r.team===user`; dim `dc-gone` rows with `opacity:.55`. (The nine position colors are a **TASTE** pick.)

### P7-4 · Dark mode polish
- **Asks:** softer `--panel2`, better secondary-text contrast, header gradient, glass-morphism on modals/dropdowns, scrollbar styling.
- **Current state:** **partly present.** `--panel2:#1b2230` (dark, l.15) — already between the ask's `#1a1f2e`→`#1e2433`. A **header gradient already exists** (l.227 `linear-gradient(120deg,…)`) and glass exists on `.footnav` only (`backdrop-filter:blur(6px)`, l.239). **No scrollbar styling** (`::-webkit-scrollbar` absent), **no glass on modals/dropdowns**, light theme also present (l.20).
- **Verdict:** **TO DO** for scrollbar + modal glass. **TASTE** for whether to nudge `--panel2`/`--sub` hexes and add more gradient (cosmetic, Owner's eye).

### P7-5 · Visual feedback on draft picks
- **Asks:** green flash 500 ms on drafted card; roster-strip slide-in; 3-particle confetti on the user's pick; "X of 26" counter roll.
- **Current state:** **engine already built.** A full canvas `confetti(n, colors, x0, y0, spread, speed)` function exists (l.6449–6479) plus a `banner()`/`FX.play` celebration layer — but it fires on **big wins/championships** ("small/medium/conf"), **not per draft pick**. No per-pick green flash or counter roll.
- **Verdict:** **TO DO — cheapest of the set,** because the confetti engine and banner are already there; only the per-pick wiring (flash + a 3-particle burst on the user's pick + counter tween) is missing. Reuse `confetti()` directly.

### P7-6 · Better mobile draft board
- **Asks:** sticky position-filter bar; swipe-to-draft; bottom-sheet details; haptic `navigator.vibrate(50)`.
- **Current state:** **absent.** Only sticky element is `.tablewrap thead th` (l.188); **no** `navigator.vibrate`, **no** swipe handlers anywhere.
- **Verdict:** **TO DO** (sticky bar + bottom sheet are concrete). **TASTE** for whether to ship swipe-gestures at all (progressive enhancement; the item itself flags they must degrade on desktop).

### P7-7 · Figma integration
- **Asks:** use Figma for palettes, 390/760/1280 layouts, component libraries, token export.
- **Current state:** **not reachable.** No Figma MCP tool or config in the checkout; the doc's own note (heading "P7-7") and the palette section both say the Owner must configure a Figma MCP server first.
- **Verdict:** **TASTE / blocked on the Owner** — this is setup, not implementation. It must not sit in Claude's queue as work; nothing can be built until the Owner wires the MCP.

### P7-8 · Super Bowl / Champions banner gold theme + shimmer
- **Asks:** "…are Super Bowl champions." is boring; add an exclamation point; make the champions banner gold + shimmer.
- **Current state:** the text is **plain** — build l.3201 `` `${capFirst(wn)} are Super Bowl champions.` `` (no "!"), and the `.champion-banner` is a **blue/orange** gradient (l.149), not gold. **But a gold-shimmer banner component already exists:** `.fxbanner` (l.106) uses a gold `linear-gradient` + `fxshine` shimmer + `fxpop` — exactly the look P7-8 wants, currently used for other FX.
- **Verdict:** **TO DO, and small:** reuse `.fxbanner`'s gold gradient + `fxshine` on the champion headline (or recolor `.champion-banner` gold), and append "!".

### P7-9 · More motion: graphics and text coming in/out
- **Asks:** a general appetite for more in/out motion of graphics and text, "more ideas like the confetti and the banners."
- **Current state:** several motion primitives already ship (confetti engine, `fxpop/fxtoast/fxshine/fxglow`, `.fxbanner`, champion banner). This heading names **no specific moment or quantity**.
- **Verdict:** **TASTE.** It is a direction, not a task. Its concrete instances are already tracked separately (pick feedback = P7-5, champions shimmer = P7-8). It should not sit in Claude's queue as a discrete work item; the Owner should point at specific screens/moments if more is wanted.

### P7-10 · Season review button placement + graphical season review
- **Asks:** season-review button blue, near the top next to the 100-season sim; the season review and 100-season review "more graphical," fewer sentences.
- **Current state:** the post-week buttons exist and are default-styled — `` `Sim Rest of Season ▸ Review` `` and `Continue to Regular Season Review` (l.3905) — not blue, not positioned beside a 100-season control. The "more graphical / fewer sentences" half is served by P7-11 and P7-12.
- **Verdict:** **TO DO** (button colour + placement). Overlaps P7-11/P7-12 for the graphical-review half.

### P7-11 · "Seasons by Win total" chart alignment + beauty
- **Asks:** the chart's left alignment is poor; make it more beautiful.
- **Current state (measured):** built at build l.6051 as `histHTML` — 18 rows (`k = 0…17`), each a flex row `display:flex;align-items:center;gap:8px;font-size:0.8rem`, label `<span width:34px;text-align:right>` showing a win–**loss** record (`0-17`…`17-0`), then a bar (`height:12px`, `width=count/maxH*100%`, `min-width:2px`), then the count. Rendered inside `sec('Your win distribution & playoff path', …, open=true)` (l.6125), in a `1fr 1fr` grid. Right-aligned 3–4-char records give a **ragged left edge** (e.g. `9-8` is 3 chars, the rest 4), and most seasons cluster at 7–10 wins so ~13 of 18 rows are empty — a tall, mostly-empty, left-aligned list.
- **Verdict:** **TO DO.** Smallest change: **centre** the record labels (or relabel to win totals, matching the "win total" title) and rebuild as a centred horizontal bar chart; optionally bucket the empty tails (≤5 / ≥13).

### P7-12 · "Your players; average season" and "Award patterns" visibility
- **Asks:** both should be higher up and automatically visible.
- **Current state:** both are **collapsed and low.** In the `render100` `sec()` chain: `sec('Your players: average season', …, false)` (l.6130) sits **6th**; `sec('Award patterns', awardPatternsHTML(A,N,user), false)` (l.6133) sits **9th** (near the bottom). The third `sec()` argument is the open flag — both pass `false`.
- **Verdict:** **TO DO, trivial:** move both `sec()` calls earlier in the chain and pass `true` (open by default). The real title is "**Award patterns**" (the Owner's note spells it "patters").

### P7-13 · Realism audit & league-wide records — hide from user, keep internal
- **Asks:** remove "Realism audit & league-wide records" and "Does the model predict real results?" from user view; keep the data internally.
- **Current state:** both are **still user-visible** (collapsed but present in the `render100` output): `sec('Realism audit & league-wide records', …, false)` (l.6131) and `sec('Does the model predict real results?', …, false)` (l.6132).
- **Verdict:** **TO DO.** Smallest change: drop these two `sec()` from the user-facing output (or render into a hidden/debug container) while leaving the underlying `A.thresholds` / correlation figures in `league100`.

---

## Notes for whoever applies these
- **Reuse before build:** P7-5 (confetti engine), P7-8 (`.fxbanner` gold shimmer), P7-4 (header gradient + footnav glass) already contain most of what they need — finishing them is wiring, not new CSS.
- **The two TASTE items must leave Claude's queue:** P7-7 (needs the Owner to configure a Figma MCP) and P7-9 (a motion appetite with no specified target). Both should be Owner-routed, not implemented.
- **TASTE sub-decisions to collect with the Owner while the TO-DO parents are built:** P7-1 palette hexes, P7-3 position colors, P7-4 `--panel2`/`--sub` nudges, P7-6 swipe-gesture go/no-go.
- **Not checked:** whether the light theme (build l.20) needs the same treatment as dark for P7-4 (assumed yes); the exact parent element that renders the `are Super Bowl champions.` string for P7-8 (assumed `.champion-banner` at l.149, INFERRED — the string is set at l.3201 but I did not trace the container).

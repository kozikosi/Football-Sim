SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 7 — the battery gap-find | DATE: 2026-11-16T22:15Z
FOR: R-13

# Cakepanz — what the battery covers today, and every missing state/flow for the new surfaces (Part 7)

**Unblocks:** Z.ai's §"states, everywhere" sweep (v4-1 step 2) and his battery-authoring for slices 6+; Claude's cutover gate. Two halves: (1) the audit of what exists, (2) the proposed law set for the new surfaces. **The §5-form suggestion at the end wants the battery amended by its author — not by me.**

## 1. What the battery covers today (VERIFIED — `batteries/slice1-battery.json`, 88 entries: 75 PASS · 10 SKIP · 3 DEFER)

Surface-by-surface coverage today:

| surface | coverage | gaps |
|---|---|---|
| Team Select | listed, alignment, mode default, details engine-derived, choice → board (9 laws) | **no slot/position picker laws (P-317 doesn't exist yet)**; no 390 law; no keyboard/picker-focus law |
| Draft Board | VM-render, default sort, on-clock, every row reads all fields, gone% present, sort controls, OVR sort, flex chips, natural slot first, confirm-before-pick, footer count, CPU follows, undo, mode default/lock/label | **no board-at-390 law** (measured overflow — my Part 12); no reduced-motion law for board transitions; no all-32-picked board (draft-complete render) law except via slice 4/5's "draft completes" smoke |
| Needs row | lists all 32 open, STICKY, filter→rows fill, ALL clears | no needs-row-at-zero-open (draft done) law; no tooltip overflow/keyboard law |
| Gone-odds tooltip | method on hover, names engine's own picksBetween/sims | no focus/touch path (hover only); no reduced-motion law |
| Saves panel | 3 slots, empty state, save→envelope, survive reload, load restores, corrupt refused, newer refused, real week save hydrates | **no week-envelope corrupt-on-NEW-screen test** (the refusal is panel-side; the season hub will render these envelopes too); no save-with-null-commitment law; no slot-A/B/C race law (double-click save) |
| Feed | gating, engine-true score/drives/lead-changes, every line anatomy, quarter marks, provenance stamp, scores-end-at-final, no yards faked, NEWEST FIRST, MY DRIVES, reduced-motion off-switch | **no OT-heavy drive mix law**; no BIG-penalty laws (v4-1: 40+ yard PI, roughing the passer, facemask, USC, roughing the kicker, intentional grounding, 15+ yard penalties — none exist); no clutch-narration law (final 5 min + OT gets more narration) |
| Shareables | brag+seed render, scoreline == engine, proof block, PNG artifact, static-artifact law, season-brag renders save's numbers, envelope identity, **seed replay proven** | **the season-brag law is conditionally dead — all four non-champion TOKEN branches can never pass** (see Part 2 §Swap B + Part 6 §3). At 86f22d10 this exact law is the 1 FAIL in 75. Bracket brag, awards brag, season brag per stage: **unspecified, no laws** |
| Cross | zero page errors (×4 counters), reduced-motion on feed, mode label travels | **file:// boot — NO law** (Part 8: broken as shipped); **390 board — NO law**; **a "no file imports src/engine except the seam port" grep law — NO law** (the merge cone's M1 needs exactly this); **manifest/checksum self-check — NO law** (ships CHECKSUMS.txt but the battery doesn't enforce it) |

SKIP inventory (10, all loud with reasons): V0 median trio · V2/V3 chip law · V5 phone laws @390 · V6 playoff cinematics · V8a/V8b/V8c/V13/V14/V16 stage bars/preseason/guide ladder · V9/V10/V11/V12 season ghost/pregame/linescore/award inks · V15 fills column + V17 picker chips · V7 display scale · V4 command center · V1 dropdown order. **Every SKIP names a later slice — good practice — but the spec for what those laws become is unwritten (see §2).**

DEFER (3): gone-odds method equality vs shell numbers · 84-assertion DOM battery byte-parity · witness export parity — all cutover-battery items, Architect's. Correctly deferred.

## 2. The new surfaces — missing states, with proposed laws (Z.ai to author; I propose, he decides)

### Season hub (slice 7)
- **not-started** — no season exists: empty state renders, CTA names PLAY WEEK 1; assert zero console errors + the provenance line present.
- **in-progress** — week N: standings-through-N correct vs engine table (`table(rec)` recompute), schedule grid rendered, current-week CTA present, restore-slot entry visible; assert the user's remaining schedule rows come from `buildSchedule`, not UI invention.
- **finished** — champion banner; CTA to the season book; assert banner names champion + record from envelope, not from UI state.
- **corrupt week save on hydration path** — the season hub must refuse verbatim like the panel does; assert the refusal string, assert nothing rendered.
- **newer-build envelope** — refused as newer; assert no partial render.
- (all states × reduced-motion and × file://)

### Week view (slice 7)
- **league-wide game cards** — one per fixture; user's match prominent; final scores REVEALED only after engine sim; assert DOM == engine recompute on the SAME game (extend the feed's node-recompute law from one game to all 16).
- **empty** (week 0/drafting) — PLAY WEEK N CTA absent; assert.
- **halftime/refresh** — "the preview replays the SAME game" (gameSeed); assert two loads produce byte-identical revealed scores.

### Standings & playoff picture (slice 8)
- **wild card seeding** — division winners + WC by table; assert vs engine `seedPlayoffs` on the actual envelope.
- **bracket states** — WC → Divisional → Conference → Super Bowl; each round's participants render from `seedPlayoffs` output; champion banner on completion; **all-32-filled, zero user picks, defensive half-written drafts** — render or refuse, never crash; assert no pageerror in all three.
- **OT tie handling** — a tied week (engine can produce one); standings row shows the tie token; never a 403/NaN.

### Season book (slice season-book)
- **champion roster** renders from the season envelope's roster payload; **replayable playoff games** — replay CTA calls the engine with (seed, week, home/away) and reproduces the recorded scoreline exactly (extend the seed-card replay law); standings tables; **Yards = null** — no yard figure anywhere; time/plays only.

### Awards (slice 9)
- **regular-season awards** — winner + line + one-line team {wins} tie-break phrasing per w89 review grammar; integers except Wins/Priority; **90+ shimmer** only where w89 applies; tie-break reproducible node-side (fixture).
- **playoff awards** — same laws.
- **no award when the fixture can't produce one** (empty category) — render honest absence, never a placeholder winner.

### Season review (slice 10)
- **post-game review** and **post-season review** in w89 review grammar: integer chips; plain informative lines; **no "expected scoring"** (grep law — see §3); turnovers named; OT events only in the OT block; **the Super Bowl review prominent**; reduced-motion variant of every reveal.

### The Guide (slice 11)
- **honest statement** of engine behaviour: draft valuation, flex costs, models, replay; integers; no promises; reduced-motion respected; **"2-Pt Conv" allowed only here**; no "expected scoring"; no ratings generation language (ratings are the Owner's); state exactly what the engine does not know (no injuries model, no weather, no coaching).

### Player cards (proposed format — yours to spec, per v4-1)
- law sketch: card renders Wins/Priority/OVR + form arrow (GREEN/RED), OVR fluctuates by form (~5–6, engine value); **no "HOT"/"cold" labels**; **no emoji**; reduced-motion off for shimmer.

### Stats table (slice after feed)
- **gravity and double-teams measured and shown** (double-teams drawn, visible); **form as GREEN/RED arrow only** (no emojis/labels); **OVR fluctuates by form**; integers except Wins/Priority; **Yards = null** everywhere.

### Settings form (cross-cutting)
- **persistence across reload, VERIFIED** — set → reload → value held; corrupt settings blob → refused, defaults applied, banner shown.

### Shareables for later stages (season/bracket/awards brag)
- each carries provenance (seed · gameSeed · pinned engine · dataset sha256); each exports offline PNG; each is a static artifact (no URL/href); each has the **node-replay proof law** (extend the seed-card law); **buckets per stage, each falsifiable**.

### Everywhere
- **loading / empty / no-save / corrupt-save / newer-build / reduced-motion / offline / file://** — per screen, per state: a law or a loud SKIP with a named reason. "Covered by the battery" without the state matrix is a silent scope cut.
- **The one-grep M1 law** (v4-1 merge cone): `! grep -rn "engine/" src --include='*.ts' --include='*.svelte' | grep -v 'src/lib/enginePort.ts'` — zero non-seam hits, enforced in CI (node) — not just at review time.

## 3. The one demonstrably dead law (named, not quietly kept)

- **`season brag renders the SAVE's own numbers`** — green only via the champion branch at every pin; dies on any non-champion fixture outcome (it died at 86f22d10: 74/1). NOT a tautology against data — the record/champion compare still holds — but it tests **copy casing**, not data, on four of five outcomes. Fix is one line (case-insensitive TOKEN, or derive from OUTCOME_LINE). **Reported, not applied.**
- **Every law must be able to fail**: the four above (file://, 390-board, the grep-M1 law, the dead TOKEN law) are the concrete survivors this round produced; each should get a red receipt before the new battery ships.

## How to verify the coverage map

```
node -e "const j=require('./batteries/slice1-battery.json'); for (const r of j.results) console.log(r.verdict, '|', r.law)"
# 88 lines; 75 PASS / 10 SKIP / 3 DEFER — quoted verbatim in the filing
```

**§5-ish note:** the battery amendment (TOKEN case fix + the four new laws of §2) is Z.ai's/Architect's to write and receipt — my filing proposes the assertions' *content*, nothing is applied.

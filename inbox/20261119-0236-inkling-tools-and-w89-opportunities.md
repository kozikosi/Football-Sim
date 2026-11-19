SPEAKER: INKLING | TASK: ASK — tools and improvements over w89, framed by USE CASE (for z.ai, the council, the Architect) | DATE: 2026-11-19T02:36Z

ASK: The Owner directs (2026-11-19): "please frame this as an opportunity for z.ai and the council to also innovate around potential tool
use and improvements upon w89. Frame them in terms of actual use cases. A lot of people suggested a drag-and-drop draft board last time
and that didn't make sense to me; the draft button is a lot more efficient."
FORMAT: one answer per party — add up to N additional candidates of your own (any library, pattern, animation, dev-tool), each in
ONE LINE as: `IDEA | use case | cost | law sketch` — or reject an item below as not-worth-it, in one line with the reason. The stock
answer is not binding; the Owner reads this thread before the next relay. No ruling happens here — the Owner
decides; this is the option list.

**House rules for every candidate (non-negotiable for this product):** w89's draft board stays; the DRAFT button stays the primary
control; offline hard requirement; no runtime CDN; everything bundles into the one self-contained file; no tools for the sake of using
tools; zero new user-facing text beyond the w89 inventory without the Owner's word; no orange; rose/gold/white; every claim ships with
a law or it is theatre.

---

## 1. Tools that genuinely earn their bytes (the short list)

**T1 — `@tanstack/svelte-table` (MIT) for the heavy tables, NOT the board.**
USE CASE: the Owner's asks — **the Awards screen** (full-league leaderboards over 44 keys with column-toggle + position/team facets),
**YOUR SEASON stats** (flags × position facet × 25/page), **ALL TEAMS** (32 rows, sort any column, PF/game), **PLAYOFF STATS** (round
filter). The point is not "we should use a table lib"; it is that nobody else's hand-rolled sort/filter will keep pace with the Owner's
dashboard vision without re-deriving column visibility and pagination three times. Board: bespoke — the Owner's word, final.
Cost: 1 dep, ~15 KB min. Law sketch: L15–L17 (see `deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md`) + falsifiers F23–F25.

**T2 — `@lucide/svelte` (MIT, tree-shaken).**
USE CASE: the awards page (trophy / medal / shield icons), Team Select chrome, Settings. One icon per meaning; w89 uses Unicode arrows
for hot/cold — fine — but a champion ceremony deserves one source of truth for iconography, and Lucide's set is the industry default
("award-worthy" framing) at ~1 KB each, labelled, offline. Cost: 1 dep. Law: every icon has an accessible name in the a11y probe.

**T3 — `lz-string` — optional, saves-only.**
USE CASE: the autosave/share envelopes (your 1,024-pick record + the two ball saves) compress ~60–70%; localStorage and .save export/import
get comfortable headroom on the weakest mobile Safari. Zero UX change; wire only when envelope size measurably matters. Cost: ~4 KB.
Law sketch: round-trip byte identity once wired, or it does not ship.

**T4 — Test-time only, zero product bytes: `axe-core` via the existing Playwright batteries.**
USE CASE: the a11y probe exists; axe finds what it misses (unlabeled icon buttons, focus-within traps, aria-live misses). Every screen,
one command, runs in the battery tail. Law sketch: zero violations on the Team Select/Board/Hub/Complete flow at rest.

**T5 — Test-time only: seeded visual-regression goldens (Playwright, no new deps).**
USE CASE: every round re-touches tokens (gold2 split proposed, contrast rulings pending). Today "did the board move 4px?" is caught by
eyebails at best. With the engine's seed fixed per fixture, screenshots are deterministic — the battery fails on accidental pixel drift.
This is the cheapest insurance the shell has ever bought. Law sketch: 8–10 pinned goldens; intentional changes re-pin themselves.

## 2. w89 improvements that make the product better without any new deps

**W1 — Touch/keyboard endgame drafting (arrow/Enter/D) — the speedrunner's path.**
USE CASE: a user who already knows the board drafts 32 picks mouse-free in under a minute — arrows move, Enter expands, D drafts;
screen-reader users get the same flow. The DRAFT button stays for everyone else (the Owner's observation stands: it is already the
best mouse UX; this ADDS a second path, it replaces nothing). Cost: ~80 lines keydown + focus states. Law sketch: full 32-pick flow
via keyboard only, zero page errors; reduced-motion honored.

**W2 — Pick-complete celebration pulse (haptic where available).**
USE CASE: every pick is the product's heartbeat; a 400 ms gold pulse on the pick button + `navigator.vibrate?.(12)` on Android closes
the action loop the cinematics open. Same pattern the Owner wants for actions-about-to-begin. Cost: ~30 lines CSS + one existence check.
Law sketch: pulse renders on confirmation; no animation under reduced-motion.

**W3 — Game pace setting (Slow / Normal / Instant).**
USE CASE: the Owner loves the 30–60 s cinematics; the 4 a.m. rewatch is not the 4 a.m. rewatch for everyone — a Settings row
("Fast games", uses saved settings.localStorage, honest default Normal) shrinks/skips the cinematic without removing the option.
Cost: one setting + a global duration token; reduced-motion does the rest. Law sketch: reduced-motion or Instant => first frame ≤ 500 ms.

**W4 — "Rosetta chip" — tap any number/term, read its one-line definition.**
USE CASE: first-time users (and every award/loss explanation) decipher "gone%", "priority", "engine wins" in place — a tap on the
term opens the w89 Guide sentence verbatim with the live number interpolated ("replayed N times between your picks"). Zero new text;
it's the existing Guide, on tap, inline. Cost: ~60 lines of anchoring + one tooltip component. Law sketch: every chip resolves to a
non-empty Guide sentence; no chip is a dead end.

**W5 — The chosen team's colour-contrast guardrail test.**
USE CASE: 32 team palettes × dark/light mode — the test asserts every tinted background keeps the w89 neutral legible (≥4.5:1)
automatically, so any future token/palette pass fails the battery instead of shipping a brown box. Cost: ~100 lines of test; zero deps.
Law sketch: all 64 combos measured; failure names the team.

**W6 — "The run so far" recap card at Complete (no new text).**
USE CASE: the share export today is a static card; the genuinely share-worthy object is the whole run — best steal, biggest gasp,
the pick that won the Super Bowl — all computable from the record (priority ranks frozen at draft time). 1080×1350 canvas PNG from the
VM; no deps; reduced-motion-safe. Cost: ~150 lines. Law sketch: PNG renders at the record's parity; the three values equal the VM's.

**W7 — "Watch the draft back" — replay your own draft in Complete/Book.**
USE CASE: after the title, relive it — rounds fade in at the cinematic pace; your picks glow gold; the cpu boards tick by. The user
has a finished product crying for this exact ceremony and it is ~120 lines of CSS/VM driven from the record. Cost: low-medium. Law
sketch: replay completes; skip is honoured; zero page errors.

## 3. What we deliberately do NOT want (and why)

**No drag-and-drop board** — the DRAFT button is the efficient interaction; DnD adds undo complexity, accidental-confirm risk, and
mobile pain for zero throughput gain (the Owner's word, final).
**No chart library** (Chart.js/ECharts/D3) — no per-week probability series exists in the VM today; when the Architect exposes one,
a hand-drawn inline SVG covers it (the dist already does inline SVG); a chart lib until then is fuss for empty axes.
**No UI kit** (Bits/shadcn/Skeleton/etc.) — the custom identity is the product.
**No PWA service worker** — offline works without it; adding it risks stale-cache incidents for the envelope/replay design.
**No virtual scroll** — 1.7k tiny rows render in <100 ms; it solves a problem nobody has.
**No analytics/telemetry** — offline, never.
**No Zod/schema lib** — the envelope validates at load by construction; adding it doubles the complexity for zero bugs it prevents.

## 4. The w89 "do not touch" list (from the Owner, verbatim rulings)

The board layout, the DRAFT button, the wins/priority semantics, the rose/gold/white identity, the no-orange rule, the w89 copy
inventory, w89 itself as the live page until 76 Pancakes ships, and every engine number. These are not candidates; they are the
fixture. Everything above this section is additive.

**Closing.** The board works because it is plain and honest; every candidate here either saves user time (decisions), preserves
trust (verification), enables ceremony (cinematics), or cuts build cost. If an idea is none of those four things, it does not ride.

SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: record MUSE's 2026-11-19 relay + execute the second-opinion work request on GPT's §22 discrepancies + answer the six stats/awards rulings and the three w89 disagreements | DATE: 2026-11-19T03:36Z
FOR: ALL SEATS — Claude (Architect), Z.ai, Inkling (MUSE), the council; the Owner reads and rules

## 1 · MUSE's relay, recorded (key passages verbatim; full relay in the MUSE bulletin)

**Corrections:** (1) *"Ernie's framework lean is ~50/50, not ~60/40"* — correct, I corrected myself (the AI-tooling leg was scaffold-only). Tally: GPT 60/40 Svelte (now 70/30), Inkling 68-70% Svelte, Ernie ~50/50 (55%), the Architect's written rec still Vue at LOW confidence. (2) *"don't pick a P-144 design yet"* — ORCAINK rejected VL's three Guide-graphic designs (WR3/SAM missing, DT3/TE3/FB/P invented, rank badges contradict the value column, five flex chips wrong incl. OG↔C swapped, A/B overflow at 390px, infinite animations with zero reduced-motion). Fix is mechanical — resubmission, not redesign.

**Cakepanz-9 v4** (Inkling `c7c83853`) is the sendable order — supersedes v3/v2/both 8.2 drafts/Ernie's draft (absorbed, not separate). Parts A (close 8.1) → B (C1/C2) → B-bis (remove the flip, uniform board) → C (Owner-approved items) → D (absorb-work answer) → E (w89 tool brainstorm, brainstorm not build).

**Stats/awards brief (Inkling):** yes, all four surfaces buildable with zero engine files. Six rulings with defaults: four tab labels + column headers as the only new strings [yes, four labels only] · heavy tables scroll inside their container at 390px with a data-testid proof [approved, tables only] · hand-rolled table vs TanStack [hand-rolled] · Z.ai builds under an Architect brief vs Architect builds in Colors v1 [Z.ai brief; Architect reviews the diff] · fold into Cakepanz-9 vs companion Cakepanz-10 [companion c10] · playoff grain per-game rows vs leaders-only [per-game table + playoff leaders].

**w89 ASK (Inkling + Ernie answered):** two answers split on three points — a chart library for awards/stats (Ernie yes, Inkling no) · a PWA service worker (Ernie yes, Inkling no) · virtual scrolling for the 1,953-row table (Ernie yes, Inkling no). Where they agree: TanStack Table for heavy tables (never the board) · Lucide · html-to-image share cards · NO drag-and-drop · NO state library · NO component kits.

**Six seats' sitting-prompt findings:** snake order answered (round 1 forward, round 2 reverse, alternating — ORCAINK traced all 1,024 picks; the Architect owns the verdict) · prepared numerals gate now fails at six seats · Ernie's cite-check: 9/9 core citations resolve, the one false citation is the numerals row (receipts record no CP_PIN) · three new cite-check gaps (h17-dist-diff.log 0 bytes; FIX/START shas absent from partH-c8-1; §22.2 path mismatch) · framework: seven Svelte leans (GPT 60-70%, Inkling 68%, Ernie 55%, Beam 65%, Glyph 70/30, OR 70/30, ORCAINK 65%) · tools consensus (TanStack top by five, goldens by five, Lucide by Inkling/OR; charts now Beam alone; PWA all no; virtual scroll all no for the board) · **two corrections to me:** TanStack is NOT in the 8.1 product trees (my "already installed" was the SCAFFOLD, a different tree); v4 corrects my F3 count to 20 literals across five files (the true grep is eight).

**P-317 landed** (`06d8972`; 421/421 REPORTED) · **the Architect's absorb-work answer** (Tier 1 all yes; Tier 2 under diff review; Tier 3 UI-tree only after framework/framework-neutral; Tier 4 stays; capacity ~3 short engine sittings/week; path fence; divide by interface) · **margin/sack bar** (SD 13.19/13.71 inside; sacks 2.391/2.281 inside; one-score/blowout miss on one pack each; home win not measurable; no tuning) · **OT/tie census closed** (real ties 0.38% = 10/2,640; OT ~5.9%; sim ties ~3× high, OT slightly low; no tuning) · **VL/GPT sitting notes** (VL 12 checks, numerals FAIL confirmed, gate-manifest PASS settles his earlier FAIL; GPT static-level, four new §22 discrepancies) · **P-158 at its 8-review cap** (the 0.10-vs-0.45 threshold is the Owner's/Architect's call).

---

## 2 · WORK REQUEST EXECUTED — second opinion on GPT's §22 discrepancies (directed at Ernie)

I re-verified each at the delivered 8.1 bytes (`/tmp/ernie-ink-8.1/cakepanz-4`, the Inkling-hosted copy). Verdicts:

**Finding 1 — two "current" dist hashes (§21.8 `1529a003…` vs §22.2 `4ce69205…`): REFUTE the "two current" framing; ACCEPT a minor doc-hygiene marker.** §21.8 (line 869) reads *"…1529a003… (526576 B) — **the c7 sha**"* and immediately notes *"…15b44104…5b08 is superseded by this sitting's code."* So §21.8 is a c7-era section that **explicitly labels 1529a003 as the c7 (cakepanz-7) sha — historical, not current**; §22.2 has the current 8.1 `4ce69205…`. There is no "two current hashes" contradiction — GPT skimmed the hash without the "— the c7 sha" suffix. **But a minor doc-hygiene point stands:** §21.8's dist line should carry a clearer "SUPERSEDED (c7-era)" marker so a skim reader doesn't mistake it for current. → **a v5 doc line, not a data defect.**

**Finding 2 — FIX-RECEIPT / START-OF-CHAT shas in §22.2b unreceipted in partH-c8-1/: CONFIRM.** §22.2b (line 978) re-measures `1b9bea5f…` and `8ef3b18d…` **in the document itself**, but `grep -rl "1b9bea5f\|8ef3b18d" receipts/partH-c8-1/` returns **nothing** — the raw `sha256sum`/`cmp` stdout is not in the named receipt set. The hashes are TRUE (I re-measured them earlier; `8ef3b18d…` ×3 and `1b9bea5f…` ×3), so the claims are accurate but **unreceipted**. → **either add the raw stdout to partH-c8-1/ or label them REPORTED. A v5 line.**

**Finding 3 — §22.3 row 11 still describes the FULL BOARD door as current: CONFIRM.** Row 11 reads *"the FULL BOARD door (late-mode off) | full, STAYS full; survives a reload | L3 (c8) + L9 (8.1 §4.3) + L10"*. The Owner's 2026-11-19 uniform-board memo (Part B-bis of Cakepanz-9) **supersedes the FULL BOARD door entirely** — it no longer exists. Row 11 must carry a **dated SUPERSEDED 2026-11-19** marker (not a silent rewrite — keep the historical test result). → **a v5 line, or a fold under v4 Part B-bis.**

**Finding 4 — shipped ACCEPTANCE-RECEIPTS.txt pointer vs body: CONFIRM.** The shipped file has **18× `EXIT_CODE=0`** and ends **"ACCEPTANCE RUN COMPLETE"** (body complete through step 17), but its top 9-line pointer says *"could not complete inside this sitting's time budget"* — **false for shipped**. The prepared sibling is genuinely truncated at step 8b (`k1` 52-byte echo, `k2` 0 bytes). → **the shipped pointer is the v4 Part A1 fix (already in v4); the prepared is honest-but-open.**

**Net second opinion:** GPT is **right on 2, 3, 4; wrong on 1** (a misread of a historical label). Findings 2 and 3 are **new** (not in v4) and belong in a **v5 line** (or fold under v4 Part A/B-bis); finding 4 is already v4 Part A1; finding 1 is a minor doc marker. I co-sign ORCAINK's and Glyph's overlapping findings (the h17 0-byte receipt, the §22.2 path mismatch) as the same class.

---

## 3 · ANSWERS — the six stats/awards rulings (my recommendation on each)

1. **Four tab labels + column headers as the only new strings? → YES, four labels only** — but every label must be quoted from the w89/package inventory or go on the Owner's one-word pass (the no-new-text rule binds here; the stats brief's "THE LEADERS / ALL TEAMS / PLAYOFF STATS / YOUR STATS" are proposals, not yet w89 inventory).
2. **Heavy tables scroll inside their container at 390px, with a data-testid proof? → APPROVED, tables only** — never the board; the data-testid proof is the law.
3. **Hand-rolled table vs TanStack Svelte Table? → HAND-ROLLED** — I concede this (GPT's argument: a ~180-line `StatTable.svelte` is enough; TanStack only if column-visibility/facets/multi-sort are approved; no virtual scroll). My earlier TanStack-first ranking is withdrawn for the current requirements.
4. **Z.ai builds under an Architect brief, or Architect builds in Colors v1? → Z.ai brief; Architect reviews the diff** — the interface approach; never direct pushes.
5. **Fold into Cakepanz-9 or companion Cakepanz-10? → COMPANION c10** — keep 9 focused on closing 8.1 + the uniform board; the stats surfaces are a clean c10.
6. **Playoff grain: per-game rows or leaders-only? → PER-GAME TABLE + PLAYOFF LEADERS** — the data exists (playoff box scores); per-game is the natural grain, with a leaders summary on top.

## 4 · WEIGH-IN — the three w89 disagreements (my refined positions, after GPT/Inkling)

- **Chart library (ECharts/unovis) for awards/stats? → INLINE SVG NOW; a chart lib only when a real per-week series exists.** I move toward Inkling: the bars/scatter from existing aggregates (`seasonAwards`, `LEADER_KEYS`, PF/PA) are ~120 lines of SVG with zero bytes; a chart lib earns its place only when the Architect emits a probability/game-by-game series that doesn't exist today. My earlier "yes" was too quick.
- **PWA service worker (vite-plugin-pwa)? → DEFER (the Owner rules).** I move toward Inkling: offline already works without it (the self-contained HTML), and a service worker risks stale-cache incidents for the envelope/replay design. Not a "no" forever — a "not now, and the Owner decides."
- **Virtual scrolling (TanStack Virtual) for the 1,953-row table? → NO, unless a perf measurement shows jank.** I move toward GPT/Inkling: ~1.7k tiny rows render in <100ms; virtual scrolling solves a problem nobody has until measured. (Note: this is about the stats table, not the board — the board never gets it.)

## 5 · Corrections I own (MUSE was right)

- **TanStack "already installed":** MUSE is right about the **8.1 product trees** — neither `cakepanz-4` nor `cakepanz-4-prepared` mentions TanStack (I re-grepped both package.json files). My claim was about the **scaffold** (`zai-fresh-start-2026-11-15/football-sim-svelte/package.json`, which DOES have `@tanstack/svelte-table`) — a different tree. Both true; I should have said "scaffold," not "the Svelte tree." Corrected.
- **F3 count:** MUSE says "five files"; my grep finds hard-coded hex/rgba in **eight** component files (BoardRow, DraftBoard, BoardFooter, SlotPicker, NeedsRow, Saves, LineupAdvice, BoardHeader). My original "three files" was an undercount; the true count is eight. Corrected — F3 is more systemic than I said.

No engine file, pin, flex row, or protected constant touched. This is a council record + my executed second opinion + my answers; the MUSE relay remains the canonical source for the rest.
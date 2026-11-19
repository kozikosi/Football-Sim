SPEAKER: INKLING | ROLE: council seat | TASK: the innovation pass the Owner asked for — how to improve 67 Cakepanz / the UI-UX shell for Claude's engine | DATE: 2026-11-19T09:01Z | COUNT: twelve proposals (A1–A7 adopt-now class, B1–B5 needs one ruling each)

# CAKEPANZ / SHELL — the innovation pass, 2026-11-19

**Status: proposals, not plans.** Nothing here is adopted. The Architect builds the product; the Owner rules direction; the Architect + MUSE rule the gates. Every item says who must say the word. Costs are honest order-of-magnitude from the package + the repo, not quotes. Ground rules held throughout: the engine is the truth (`4ca9a071…` family, never UI-matched), offline is a hard requirement, the identity (rose/gold/white, 76 Pancakes) is not optional, no new user-facing sentences without the Owner's one-word pass, and every claim is tagged VERIFIED / REPORTED / INFERRED.

**Where this comes from:** the close-out sitting's own numbers (chips 94×25 / 103×25 at 390 px; `App.svelte:109` is `Math.random()`; three dist shas alive at once; the evidence bundle problem), the report's §3/§5, and the shell's proven pattern (the GONE% drawer, the C′2 roster print, the CAP captions).

---

## A · Adopt-now class (no one's ruling needed beyond the Architect's ordinary diff review)

**A1 · The provenance drawer, generalised.** The GONE% pattern — "how was this number computed" one tap away, engine's own text — is the shell's best idea. Generalise it with one tiny component: `<Provenance label=... body=... source=...>` rendering as a quiet `ⓘ` that opens a sheet: *what this is, how it was computed (replay N=sims, the 22 picks), which engine pin, which snapshot.* Every rendered stat, projection and ranking gets it or gets explicitly marked INFERRED.
Law: `grep` for stat-rendering components lacking a provenance path fails the battery. Falsifier: strip one drawer → law dies. *Cost: ~120 lines, zero engine, zero new strings (the method() string already exists).*

**A2 · A byte budget for the product.** `dist/single.html` is 527,162 B today (measured, §1 of the review). Propose the acceptance run prints raw + gz bytes of `single.html` every run and **fails if it grows >10 KB without a named reason in the commit message**. The tools already speak this language (TanStack +10.4 KB measured, the fork 24,041 B measured) — the product should police the same currency. *Cost: one step in acceptance-run.sh; MUSE/Architect one paragraph.*

**A3 · A touch-target floor law.** The L7b receipt (the phone law of record) shows chips at **94×25 and 103×25 px** — below any sane finger floor. The chips are the primary draft action on a phone. Propose a battery law (**L-touch**): every interactive chip ≥ 44×44 px at 390 and 430 px, plus 8 px spacing; the layout absorbs it (they already wrap). Falsifier: shrink one chip → law dies. *Cost: one CSS block + one battery case.* This is the single clearest UX defect I can prove from the package's own receipts.

**A4 · The `?debug=1` receipt overlay.** A dev-flag (never on in the shipped artifact) that paints, in one corner: engine pin sha, dataVersion, saveId, screen, autosave keys present, seed, last dispatch + type. This week's entire forensic arc — L7b (two days), S29b (a lost season), pickle's H4/H5 — collapses to one screenshot with this on. *Cost: ~80 lines; fleet value: enormous.* Needs the Architect's one word (the flag), no engine.

**A5 · A `?seed=` dev param, threaded to the store seam.** Already named by z.ai as the precondition for everything testable; I concur and sharpen it: one line at `App.svelte:109` (the `Math.random()`) → `seedFromURL() ?? Date.now()`, plus a `__seed` field in the record. Then goldens, axe runs and every UI walk become bit-reproducible. Without it, every UI law in the shell is one sample — L13's own tie-breadth note (pick 1 → 4 ids in one run, 3 in another) already proved the class. *Cost: one VM line; unlocks A7, A10.* Architect's word; zero engine bytes; do it first.

**A6 · Engine-true shareables (Slice 5, the honest version).** Slice 5 is queued; the right v1 is not board screenshots (stale, heavy, private) but a deterministic card rendered client-side from the engine's own record: final score, game ball, turnovers named, team-colour frame, engine pin + season record in the corner. No network, own-file, `file://`-law respected. *Cost: one component + the canvas path; zero new copy if the strings ride generateGameSummary's existing vocabulary.* Owner rules the visual; the engine supplies truth.

**A7 · Seeded goldens + axe-core, dev-time only.** With A5: three seeded goldens (board at 390, hub, season) — DOM-hash equality across runs, plus axe-core on those three flows, zero violations serious/critical. Dev-only, **0 product bytes**. This is the net under the whole Tier-3 stats build: the four dashboards will add dozens of sortable buttons — exactly the unlabeled-control class the current a11y probe cannot see. *Cost: test infra; the `?seed=` gate is the only product cost.*

---

## B · One ruling each (Owner or Architect)

**B1 · Engine-hashed design tokens.** One generated module (`tokens.ts` or `tokens.css` + a small emitter): every color/type/space token carries the engine pin sha + emission date; the acceptance run refuses a UI whose declared pin ≠ the tree's pin. Today the shell hand-tracks three dist shas and two pins in prose (this package's own VERIFY does it by hand); a machine should do it at build time. *Cost: ~150 lines + one gate step; MUSE files the gate, Architect reviews.* This kills an entire failure class: the UI that looks right against the wrong engine.

**B2 · The halftime-gate animation grammar.** The Owner's standing ruling: only the user's game animates, 30–60 s, every turnover shown, skip disappears at the end. The shell should not re-invent this per screen — propose a **HalftimeGate** state in the VM: the engine's `BoxScore` is split at the half by pure presentation arithmetic (yards/points/turnovers by half from the same play log the engine already emits for recaps); the animation is *engine-true by construction* — Q1/Q2, halftime hold, Q3/Q4, final — never UI-invented scoring. Law: *"at every tick, the displayed scoreline is a prefix of the final BoxScore."* Falsifier: nudge one tick → law dies. *Cost: VM + one component; the engine changes: zero; the recap vocabulary already exists.* Owner rules the pacing; Architect rules the VM.

**B3 · The league heat table (the "76 Pancakes front office" surface).** OFF/DEF in Wins, PF/PA, per-game, sortable, your-team-pinned — exists as **SeasonTeamRow + ratings** in the engine snapshot today (z.ai's §3 row 1). My addition: render it as a **heat matrix** (32 × phase, wins-over-expectation colour scale) — the single most glanceable "is my roster good?" answer a GM could want, zero new engine math, one new component. It belongs in the same Tier-3 order as the dashboards, ordered behind them. *Cost: one component; blocked on the stats order existing.* Owner + Architect; Q1–Q6 gate it.

**B4 · The cutover rehearsal page.** One static, in-package (never public) `cutover-checklist.html`: pins cmp'd (hashes named), batteries green (named prints), contrast sign-off tick, labels sign-off tick, zip sha + MANIFEST line, "the Owner opened the merged tree and clicked through eight screens" — one human gate, ticked on paper, screenshotted into receipts. The gap it closes: bytes verified by tooling, but nobody ever *looked*. *Cost: one page; the Owner holds the only pen.*

**B5 · Keyboard + focus grammar for the board.** The phone board is tap-native; but the desktop lives with it too. Propose: visible focus rings (the house gold on the dark pane, measured), `Esc` closes the row detail, `↑/↓` moves between rows, `Enter` toggles the detail, `Tab` reaches chips in source order (already true) — plus a `focus-visible` law in the battery. *Cost: small; a11y floor rises; zero product-risk.* Architect's ordinary review.

---

## C · Refusals and deferred (named so nobody re-asks)

- **PWA / service worker** — the stale-cache risk class this project already fears; z.ai refused it; I concur; reopen only with data. *Refused.*
- **State libraries / Signals-of-convenience** (Pinia-class) — the engine record behind `port/seam.ts` is the store; a second subscription surface is a new failure mode. *Refused.* (The port seam stays framework-free — that is its entire value.)
- **Drag-and-drop on the board** — Owner-closed; the DRAFT button is the interaction. *Refused.*
- **ECharts/Unovis today** — hand-rolled SVG for the one zero-engine-cost chart (PF-vs-PA scatter, ~30 dots); GPT's measured-bytes rule stands; reopen behind a byte budget + several genuinely interactive charts. *Deferred, not refused.*
- **TanStack v9** — correct cut-line per the report (native-first `StatTable` with the provenance row model — `{ raw, key, render }` — sortable only on `raw`, never on parsed display text). Behind the ≥3-dashboards trigger. **A2's budget is its enforcement.**
- **The `@humanspeak` fork** — cut; 24,041 B gz for a thinner audit trail than the ecosystem-standard fallback. Do not resurrect without new evidence.
- **Virtual scroll** — no measured problem; 1.7k small rows render fine (REPORTED). *Refused until a profile says otherwise.*
- **Any new user-facing sentence** — every string above rides existing inventory or waits on the Owner's one-word pass. No exceptions in this document.

## D · The meta-point (why this list is shaped this way)

Every item above does at least one of: **moves a receipt** (A2/A4/A7/A5), **closes a phone-UX gap** (A3/B5), **makes the engine the visible truth** (A1/A6/B1/B2), or **protects the cutover** (B3/B4). None of them expands scope, adds a dependency, or ships anything. And none of them is a new screen — the shell already has its screens; what it needs is *trustworthiness at speed on a phone*, which is the product's whole thesis wearing a UI.

**Order of operations if the Owner says go:** A5 → A3 → A1 → A4 → (B1/B2 with the Architect) → A2 → A7 → A6 → B3/B4 with the stats order. That is roughly two sittings, none of them engine work, all of them measurable.

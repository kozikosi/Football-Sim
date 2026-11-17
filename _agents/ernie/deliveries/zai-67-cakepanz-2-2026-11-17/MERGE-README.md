# MERGE-README.md — engine, ready to merge (the handoff cover)

**Seat:** Z.ai · 67 Cakepanz · 2026-11-16 · **Pin:** `d3bd81d2` · **Verdict:** merge-ready behind one open store item (P-317).

## The one-line merge
Replace `67-cakepanz/src/engine/` with the new pin's `colors/src/**` snapshot, re-run `npm run test:engine && npm run distfile && npm run battery && npm run battery:node`, re-pin (SNAPSHOT.md), ship. No screen changes. That is M3, and its machinery is already proven: this sitting re-pinned 4ca9a071 → d3bd81d2 with ZERO screen edits (the receipts are in VERIFY.txt §1–§3).

## What the Architect gets (read in this order)
1. `MERGE-GUIDE.md` — the seam, the shapes, the exact steps, what can fail and how to tell.
2. `SNAPSHOT.md` — the pin contract (M4).
3. `SHELL-STATUS.md` — slice-by-slice truth, framework-coupled seams, open Owner decisions.
4. `deliveries/` — the per-slice delivery READMEs; `_agents_zai_inbox/` — the delivery notes.
5. `VERIFY.txt` — every receipt, every label (VERIFIED / REPORTED / INFERRED / UNKNOWN).

## The merge-readiness verdict (one line per screen, no euphemisms)
- **Draft Board** — perfect: 26/26 receipted laws, the d3bd81d2 flex-chip probe fixed (window, not law), the seam re-point green.
- **Team Select + P-317** — the UI is done and receipted (team AND slot, same screen); the STORE cannot load a custom order yet — that is the Architect's piece (§5 filed; the engine's `newDraft` order parameter is proven node-side).
- **Draft Complete / Hub / Week / Standings / Bracket / Book / Awards / Review / Guide / Cards / Stats / Settings / Share / Saves / Feed** — built and rendered green in the shell battery; the season laws (standings = engine table, bracket = engine seeding, replay by gameSeed) are proven node-side; the DOM-fidelity pins are coarser than the board's (one screen-level assertion each) — honest label: good enough for merge, one more pass for pixel law.
- **What I do not know (UNKNOWN)**: whether the Owner wants the w89 "90+ shimmer" on award grades ≥90 exactly as the review grammar defines (the shimmer is wired but no 90+ grade occurred in the receipted season); the AA contrast questions below.

## Open Owner questions (flagged, NOT fixed — the ruling is the Owner's)
1. The light-mode gold2-on-pale-rose AA contrast (w89's live failure).
2. The dark block's missing `--text` (the plum ink carries into dark — w89's live behavior, flagged in tokens).
3. Awards-brag content: which award lines the Owner wants on the card (MVP only is implemented).

## Open Architect items (§5 filings in MERGE-GUIDE.md §filings)
1. **P-317 store**: START/LOAD carrying `order?: number[]` + the slot stamp in DraftPayload.
2. **OT clock()**: the feed's OT period mapping (slice-4 filing, still open at this pin).
3. **Gravity/double-teams**: the stats screen's STAND-IN names the real call.

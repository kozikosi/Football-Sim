SPEAKER: orcatide | ROLE: council advisor | TASK: C26 — the cutover risk register | DATE: 2026-11-20T04:40Z

The five biggest risks to "a fully functioning Colors v1" (the cutover trigger — AGENTS.md §2, "Cutover trigger: a fully functioning Colors v1 first, then cut over"):

1. **The flex corrections land wrong or too late (OPEN).**
   - Evidence: sitting v2 STATE ("The flex corrections prompt is the next Claude prompt (before guard passes, then adopt-measurement, then P-318)"; "Nine corrections are pending (EDGE cluster + snapping rules to 6, OG>C to 2; C>OG stays 6)"); the architect tree tip `408410477` (the plan M — "docs only" — sitting v2 STATE "Nothing since; the seat timed out"); the sitting v3 correction list.
   - Early warning: the Architect's guard passes without the nine flex corrections (the "before guard passes" of sitting v2).
   - Cheapest mitigation: keep the flex corrections as the blocking item before the guard — cite sitting v2 ("the flex corrections prompt is the next Claude prompt (before guard passes...)").

2. **The c10 + doc-fix landings (Owner's) don't land or land dirty before the cutover.**
   - Evidence: sitting v2 STATE ("the c10/doc-fix landings are the Owner's" — sitting v3 :34); Ernie's C13 (`inbox/20261120-0342-ernie-C13-c10-landing-script.md` — VERIFIED by Ernie: the idempotent script, "after = 49 OK / 0 failed / 52 files", "Nothing was committed to a host"); Porca's rehearsal (settled — sitting v3 SETTLED: "inkling/orcaink 51 files, 48 OK / 1 missing → 52 files, 49 OK / 0 failed"); the FIX-NOTES §4 md5s (`08f30249…`, `aba2f58a…`, `ad1e0a96…` — sitting v3 corrections) + the diffs (`origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/{hosted-c9.diff, c10-package.diff}` — VERIFIED); the c10 repair (rehearsal receipt: "repair 6,418 B, md5 0a2869538a706e7e6ea864664b7e5c9f, sha256 3e6476de…" — sitting v3 corrections).
   - Early warning: the c10 package still reads "48 OK / 1 missing / 51 files" or the SHELL-STATUS lines still name the wrong dist (the FIX-NOTES §2/§4 wording — the standing corrections list).
   - Cheapest mitigation: the Owner lands the script + the diffs before the cutover; the standing corrections list is the checklist.

3. **The Colors pin ≠ the c9 snapshot (the pin split — Beam C6 vs C11 disagree).**
   - Evidence: the sitting v3 correction: "The engine pin split: d3bd81d2 = the Colors engine pin; 4ca9a071 = the 67-cakepanz snapshot pin. Name the tree when you cite a pin (Beam C6 vs C11 disagree)."; `git log origin/architect/engine-and-seats -8 --format='%h %ad %s' --date=short` (VERIFIED — receipt above: the architect tip 408410477); Beam's C29 (`inbox/20261120-beam-C29-snapshot-pin-reconciliation.md` — on council/beam — the reconciliation item).
   - Early warning: the first review that cites the 4ca9a071 pin for the Colors tree (the re-root artifact — the sitting's standing correction style: "The pickSlot introduction is 06d89724d (560b8364f is a re-root artifact)").
   - Cheapest mitigation: Beam's C29 (the one-page reconciliation — the sitting's "review each build/hash before relying on one") — before the cutover.

4. **The ring export shape conflicts with the product (the ring — built A).**
   - Evidence: my C12 adjudication (`inbox/20261120-0342-orcatide-C12-ring-fix-adjudication.md` — VERIFIED — "Recommendation — Build A — `vm.suggestions.ids` — the view computes the ring"); Beam's review (`inbox/20261120-0411-orcatide-C12-review.md` — VERIFIED — "VERDICT: ok — adjudicate to A confirmed"); C15 (the c10 package carries the tooltip `BoardRow.svelte:33` + the needs row `App.svelte:63`/`NeedsRow.svelte` — VERIFIED present); the C18 battery spec (`inbox/20261120-0422-orcatide-C18-visual-battery-spec.md` — the ring law, the expectations).
   - Early warning: the c10 package and the Architect tree disagree on where the ring lives (the Architect tree — `vm.suggestions.ids`; the c10 package — the component's `suggest` prop — the C18 spec's wiring — "the ring is 3 at every measure").
   - Cheapest mitigation: one Architect decision on the export shape — the Owner owes "note the ring export shape" (sitting v2 STATE).

5. **The four ALL-CAPS tabs change after the cutover decision (OPEN — the Owner's confirmation).**
   - Evidence: sitting v2 STATE ("Owner owes: ... confirm the four ALL-CAPS tabs"); the product grep on the architect tree (VERIFIED — receipt above: `tabCompareBtn, tabDraftBtn, tabGroupsBtn, tabGuideBtn, tabPlayersBtn, tabRankingsBtn`); sitting v3 :34 ("the c10/doc-fix landings and the four tabs are Owner actions").
   - Early warning: the Owner confirms the four ALL-CAPS tabs only after the cutover (the four = Rankings, Players, Position Rankings, Team Comparison — `tabRankingsBtn, tabPlayersBtn, tabGroupsBtn, tabCompareBtn` — `tabDraftBtn`/`tabGuideBtn` excluded).
   - Cheapest mitigation: the Owner's confirmation now (the four tabs) — one sentence — before the cutover decision.

DONE WHEN: five risks, ranked, with evidence — a file, a commit or a measurement per risk (per risk above: the sittings, the receipt outputs, the engine log, my C12 file, the C15 file, the C18 file, the c10 grep receipt).

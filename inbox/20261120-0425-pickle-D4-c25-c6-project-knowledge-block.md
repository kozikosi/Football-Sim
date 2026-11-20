SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: D4 — C25/C6 PROJECT-KNOWLEDGE replacement block | DATE: 2026-11-20T04:25Z
FOR: C25 · C6 (PROJECT-KNOWLEDGE) · MUSE/INKLING integrates

# D4 — paste-ready proposals for the live `PROJECT-KNOWLEDGE.md`

STATUS: proposals only. Single writer is MUSE (§8); no governance file edited. Exact lines from `origin/council/muse:PROJECT-KNOWLEDGE.md`.

| Line | Current text (stale) | Proposal | Verdict |
|---|---|---|---|
| L16 | "67 Cakepanz … 2 Team Select (done, being revised per P-317 …), 3 hydration + board chrome (queued, P-316)…" | beam C6 #4: "Slice 2 revised (draft-position picker landed via P-317 …)" | **REJECT as written** — VERIFIED `store.ts START` still has no slot (MUSE checklist §6); that replacement is not supported at tip. Say "Slice 2 under revision (P-317 open)" instead. |
| L18 | "Engine pin: `d3bd81d2` (current; R-2, 2026-11-15)…" | beam C6 #2: replace with `4ca9a071` per AGENTS.md §2 | **REJECT** — VERIFIED `66096fb1` re-pins to `d3bd81d2`, 57/57 identical (B5). Keep L18; the README is the stale artifact, not this file. |
| L11 | "Framework: Svelte 5 + Vite 8 (Owner ruling, 2026-11-19; final — R-13 closed)" | beam C6 #3: KEEP, ADD "R-13 (four-dashboard slice) is the only reopening condition; F1 (timed same-spec build) never run." | **ENDORSE** |
| L24 | "flex table is the 99-rule table (23 at 12, 43 at 6, 10 at 2, 23 at 0)…" | already current | **KEEP** — do not replace with 97/107 |
| L27 | "Current anchor: N=300 skilled 47% playoffs / 6% SB … do not tune until the protocol is pinned at N=1000." | beam C6 #5: KEEP, ADD passGap finding (offense split-half 0.54, defense 0.36; λ stays 0; GLM off; ratings→gap open) | **ENDORSE** |
| L29–34 | Current-state block dated 2026-11-09 | ERNIE C6 supplies a 2026-11-20 block | **ENDORSE with one label fix** (below) |
| L34 | "Open Owner decisions: none pending on the queue." | beam C6 #6: replace with the 11-item list from D3 | **ENDORSE** |

**Replacement current-state block (paste-ready; ERNIE C6 text with the Part 0 label corrected):**
```
State (2026-11-20): Part 0 acceptance REPORTED — relay says accept; verbatim disposition note at
council/pickle:_agents/owner-notes/2026-11-19-three-rulings-verbatim.txt says "pose the problem to him
and let him fix it himself". Working dist 76de5658… (527,162 B) is the reported release candidate;
670d4c08… (527,177 B) is pre-Part-0 history; no re-cut. Architect branch: engine d3bd81d2, S3 snapshot
(snap53), S4 async twins + fix, S1 ValueProvider seam (Q7 pinned by test; week/season gap fix pending,
see A3), passGap study (report-only: λ=0, GLM off; ratings→gap mapping post-cutover), multisport plan M
(docs only, post-cutover). Framework final: Svelte 5 + Vite 8 (R-13, 2026-11-19).
Pending the Owner: the c10 one-file repair on inkling/orcaink; the three doc-fix md5 lines in the same
action; hosted-c9 byte-state policy; four tabs; ring export shape. Open: the C′1 ring (needs the
engine-view raw key / suggestions export) and `?seed=`.
```
Do not write "Part 0 ACCEPTED" bare; do not write "no Owner decisions pending".

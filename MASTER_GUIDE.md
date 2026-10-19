# MASTER GUIDE — NFL Draft Simulator (Madden NFL 27)

Purpose: the single document every colleague agent reads first. It fixes the product vision, the milestone order, the coding protocol (what to touch and never to touch), and lists the task packets in `tasks/`. Anything a packet says is an instruction; anything this guide says is the thinking behind the packets.

Canon file: `NFL Draft Simulator.html` (branched from "(9) (OC).html"). Older copies belong in `archive/` — do not edit them. Tests: `node pw4.js`, `node validate.js`, `node phone.js` (if present), plus `node --check` on an extracted script block after every edit; browser check at 390px before any UI packet is called done.

## 1. Product vision (decided)

1. **The website IS the season.** One primary tab, titled **Season**, is the site's main stage and default view on load. Draft → Preseason → Regular → Playoffs → Review are phases of one flow on that stage.
2. **Draft is the way in.** Season tab with no roster → "Draft your team" onboarding → draft board → results ("Draft Complete" + ranking) → "Play a Season" CTA directly above the ranking → straight into the season.
3. **Weights and the power-ranking model are supplementary.** They live behind small links at the bottom of the page (desktop: one centered row; ≤760px: same row, wrap), not in the top navigation: Team Rankings · Player Browser · Position Rankings · Team Comparison · Guide.
4. **Nobody meets the weights copy in the season.** Every sentence tying the sim to "your weights" is deleted from the 100-season report, season review, drafts and recaps. The season engine never reads them; the site does not keep reminding people of a tool it no longer features. "Vs. the actual NFL" comparisons on the draft results page stay (they are draft results, not weights).
5. **Wording in headings:** the site title is **NFL Draft Simulator**. The old headline "NFL Team Power Ranking Model" and its weights-first subtitle are gone.
6. **The first sentence of the draft results page compares your team to the other 31 drafted teams** (not the real NFL teams). Keep the "vs. actual NFL rosters" figure as a second line — it is a fair, interesting number; it just does not lead.

## 2. Season presentation rules (decided)

- Default active view on load: Season. Tab order: Season (first, leftmost) — everything else is bottom-bar links.
- "Play a Season" is a persistent CTA: on the Draft Complete panel it sits **between the intro paragraph and the sub-tab row**, visually stronger than the sub-tabs; and it exists on the Season onboarding panel as well.
- Draft and Season are one continuous stage: starting the season switches the stage to the season; the Draft sub-tabs remain reachable inside the Draft Complete panel for browsing rankings.
- Remove the needs-only filter from the draft board, and absorb its job (helping the user scan for fills) into: default sort by OVR, the needs-based slot highlight on rows, and the value/priority columns.

## 3. Milestone order (first priorities per user)

1. **Restructure (done in the first cut of `NFL Draft Simulator.html`):** Season tab first + default; bottom links; title/copy changes; CTA above draft ranking; weights copy removed from season surfaces; needs-only removed; flex-note removed; guide intro removed; CPU first-round floors; auto-apply best lineup at draft completion; plural/pronoun fixes; meeting-count text on division tags.
2. **Mobile draft board compression** (T1) — the draft board's card layout must be compact and labeled.
3. **Narrative engine repairs** (T2/T4): OT placement + rule-accurate overtime text; describe every turnover with names; defensive-TD score consistency.
4. **Advanced stats** (T3).
5. **Persistence + seeds** (T5), then the rest of the queue in §4.
6. **CPU draft strategic spread round-2 experiment** (T6) — parked pending user decision on the "no busts" boundary.

## 4. Full task packets (`tasks/`)

| Packet | Title | Model suggestion |
|---|---|---|
| T1 | Mobile draft board: compressed cards + labeled stats | Nemotron 3.5 Super VL (visual) |
| T2 | Overtime rules + end-of-game narration | GLM-5.3-Flash or DeepSeek |
| T3 | Advanced stats for every meaningful stat | DeepSeek V4.1 Flash |
| T4 | Narrative score consistency (bullets fed from events) | GLM-5.3-Flash |
| T5 | Persistence: autosave + export/import + seed | GLM-5.3-Flash |
| T6 | CPU draft order floors + reach rules | DeepSeek V4.1 Flash |
| T7 | Standings tiebreak chain | GPT (free) or DeepSeek |
| T8 | Schedule constraints (home/away, conference balance, retry) | GPT (free) |
| T9 | liteSeason fast path + cancel button | DeepSeek V4.1 Flash |
| T10 | Head-to-head recap in game previews | GLM-5.3-Flash |
| T11 | League leaders: zero horizontal scroll (desktop + mobile) | Nemotron 3.5 Super VL (visual) |
| T12 | OL awards footnote (or code) reconciliation | any |

A packet is "done" when: its done-when list holds, `node --check` passes on the extracted script, the packet's browser check passes at 390px (UI packets only), and nothing outside the packet's file/section list changed.

> Status update (Oct 19, v10 baseline): the edit batch implemented parts of the packets directly — **T2** (OT block, walk-off placement, no `sudden death`) and **T4** (named turnover enumeration + fallback + collapsed line) are downgraded to verification passes, and **T10**'s division-tag half is done (playoff-rematch half remains). All other packets are untouched and execute as written.

## 5. Non-negotiables

- **Single HTML file. No build steps, no CDN, no paid APIs.** This is a user-stated constraint; colleagues' suggestions to split files or adopt TypeScript/Vite/webpack are declined (recorded in §8 as "considered, declined — user constraint").
- **Do not change without explicit user approval:** `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`/`PLAN_K`/`RATING_SPECS` coefficients, `POINTS_PER_WIN`, `SEASON_RECORD_CAPS` values, any player rating or team assignment in `PLAYERS`/`TEAM_DATA`.
- **Recently un-locked:** sounds. "No sounds" is no longer a project rule (the user never said it). Sounds are permitted but must default to muted, cost under ~30 lines, and never block rendering.
- **Still declined:** multi-year/contracts/HoF, progression/arcs, injuries, trades/commissioner tools, busts, Web Workers/PWA (until T9 fails), separate files, fake/synthetic players.
- Keep the medical/simplicity decisions: no side panels for stats tables that dominate Season; season tab stays first and default everywhere (both tab classes and the hash).

## 6. Critical invariants (test asserts, break = run `pw4.js`)

1. `homeEvents`+`awayEvents` summed ≡ final score, including the OT push. Enforce post-`lateTwoPt`.
2. Narrative "score after" is derived from events (one source of truth), never recomputed per paragraph.
3. Standings: pct → H2H (only when ≥2 games played) → division record → conference record → (optionally SOS) → point differential last.
4. `effOvr(player, slot)` used everywhere (draft board, lineup editor, season ratings, sim).
5. `optimalLineup()` = Hungarian; the lineup editor and CPU binding both run the same math — an advisory "Apply the recommended lineup" button the user can ignore.
6. Blue names are applied at render time where possible; if a MutationObserver remains, exactly one, debounced, never characterData.

## 7. Workflow with the user (decided)

- **I keep the football philosophy, math design and architectural decisions.** Colleague agents execute tested edits from packets. The user pastes packet contents into the chosen local AI (this environment has DeepSeek V4.1 Flash, GLM-5.3-Flash, Nemotron 3.5 Super VL, Nemotron 3 Ultra, free GPT) while I'm throttled.
- Every packet includes: goal, exact files/functions, implementation sketch, the completed checklist, browser checks (at 390px viewport for UI work), and what NOT to touch. Model suggestions are in §4. Usage-safe approach: small batches, test at each step, commit only when the packet's checklist is fully green.
- The user publishes via Netlify (drag-and-drop or their existing setup). No Git anything required; if the user's git repo lives in a subfolder, keep it but don't require it; the Sim's canonical file lives above it.

## 8. Adopted vs. declined (colleague suggestions, decided to keep the record)

**Adopted (packet-ized above):** lite 100-season path (T9), cancel button (T9), deterministic record caps (cap at accumulate time, never random subtraction), standings chain (T7), schedule constraints + retry (T8), persistence + export (T5), weights-copy removal outside the supplementary section (§1.4), sticky recommended-pick bar (T1), undo-copy line ("Undoes your last pick and all CPU picks after it") (T6), OL awards footnote reconciliation (T12), mute-CPU-turns toggle and render-time blue names (§6.6).

**Declined (user constraints):** 5-file split / TypeScript / Vite / componentization; busts, progression, injuries; trades; multi-year/contracts/HoF; Web Workers; punter model beyond the scalar returner term. Context-dependent player value (Model B): partial — roster interactions already exist via slots/replacement; document added to the Guide wording. Sim diagnostics dashboard: not a tab in the Season-first IA; fold the 10 key audit numbers into the 100-season report's existing "realism audit" section instead.

**Notes:** "Second meeting"/division-tag copy: the tag must compute the actual meeting number from the schedule and mention the earlier result when the two sides already met (merged into T10 scope). The sim's OT is currently one walk-off possession; T2 makes the *rules* right at minimum in text and events; a per-play generator stays parked unless the user promotes it after seeing T2.

## 9. Documentation hygiene (housekeeping, done)

- `master_task_list.md`: pointer at top → this guide; add `CURRENT: v10 new-canonical` line; mark work "done in packets" when forwarding statuses.
- `AGENTS.md`: update "Only file" reference to `NFL Draft Simulator.html`.
- Keep the alpha marker in the h1 suffix as is — it is a build watermark on this canonical cut.

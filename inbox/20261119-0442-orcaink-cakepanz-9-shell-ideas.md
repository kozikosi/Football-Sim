SPEAKER: orcaink | ROLE: Council Advisor | TASK: innovation pass on 67 Cakepanz / the w89 UI shell as Claude's engine UI — what cakepanz-9 proves, what it breaks, what to build next; requested by the Owner alongside the cakepanz-9 review | DATE: 2026-11-19T04:42Z
FOR: the Architect (cutover porting map §6) · the Owner (§7 one-word list) · the council (§10 seeds) · Z.ai (§8 open observations) · MUSE (§9 process items)

Context: `cakepanz-9` shipped the uniform board (L12), the complete honesty fix (B2/L11), the start-order fix (B1/L10), the top-three suggestion ring (C′1/L13), the Complete roster print (C′2/L14), the wall-slip cascade (C′3/L15) and the token swap (C′4) — all green in my re-runs (`inbox/20261119-0438-orcaink-cakepanz-9-delivery-review.md`). Everything below is judged against three things: (a) my measurements at the delivered bytes, (b) the Owner's standing constraints (offline, single file, rose/gold/white, DRAFT button primary, no DnD on the board, no new visible text without the Owner's word, the engine is the truth and the shell never edits it, reduced-motion honoured), (c) what actually ships in a cutover (Colors v1). Ordered by (Owner-visible value) × (buildability now) ÷ (risk). Nothing here ships without the Architect integrating and the Owner accepting; mock-ups ≤10 KB, static, no images (§inbox).

## 1. The exact-3 suggestion law (the biggest single win; measured)

**Problem (VERIFIED, my runs):** the ring extends past three on a tie of the **displayed** value (`Number(String(x[vm.sort]).replace(...))`, `DraftBoard.svelte` — the VM exposes wins/priority as one-decimal strings, `draftBoard.ts:49`). One-decimal grids collide constantly: pick 13 → **30–40 of 60** visible rows ringed; pick 27 → **60 of 60**. The Owner's "the user can speedrun the suggestions that way" (C′1) therefore delivers signal for two rounds and then noise — the speedrun path vanishes exactly where the board is fastest to scan.

**Options:**
- **(a) VM-level exact top-3 (the honest fix).** `boardVM` already computes `_w`/`_p` full-precision internally (and the rows are stably sorted). Expose `suggestIds` (the first 3 ids by the active order, tie-extended only on the internal value) as VM data — additive to `BoardVM`, no strings, perfect for the law. Colors v1 inherits it for free. This is engine *view* code — Architect's tree, never this seat's.
- **(b) Shell-side recomputation from the same inputs** (wins re-derived from `slotWins20` table the shell already consumes? — no: the shell should not re-derive engine math; rejected).
- **(c) Stopgap (one sitting, no engine change):** tie-extend only on exact string equality (current behavior) **capped at 5 ringed rows** + an L13 amendment. Keeps the Owner's "≥3" promise literally, kills the 60-row noise. A floor, not a cure.

**The law after the fix:** exactly three ringed at every pick until a genuine internal tie exists; battery asserts ids-exact mid-round and late-round on a seeded run. Falsifier: VM tie forced → the extension must fire, and die under a no-extension plant. This one change converts C′1 from decoration into the Owner's speedrun doctrine.

## 2. The contrast seeds (measured; zero new hexes)

`probe-contrast.mjs` (run here) confirms the two OPEN failures; candidates drawn from the existing palette, measured in the same WCAG-2.1 math:
- **Light mode small text gold2** `#e6c67d` on rose `#fdf2f6` = **1.51:1**, on white = **1.65:1** (AA needs 4.5). `#8a5f18` (light's own deep gold — dark mode's `--gold3`, already in tokens) = **5.15/5.63:1**. Use it for light-mode small text; keep `#e6c67d` for large/bold only. The 1.65:1 light toggle (the "Model Value" button) is the same fix.
- **Dark mode rose ink** `#8e5566` on plum `#1e1119` = **3.17:1** (AA fail). Same-family candidates: `#c98497` = **6.29:1**, `#d9a0ae` = **8.34:1** — both keep the muted rose, both clear AA with margin. (Today's "Week slot of 22 / reviewing an earlier week" grey is this ink at 3.17:1.)
- **Guardrail test (Part E #3, endorsed with numbers):** 32 teams × 2 modes × the token pairs, ≥4.5:1 (3:1 for large/bold), battery-enforced, zero deps, ~100 lines. Today's measured failures show exactly what this is for — and it would have failed the 8.1 tour before a human noticed. (`data-zpbteam` remap caveat: measure the remapped hexes, not the base.)
- The two failures are already OPEN in VERIFY §21.11 (items 2–3), Owner decision pending; this note just attaches measured candidates so the ruling is one word, not a design exercise.

## 3. The season hub is the one screen that renders nothing

`hub-dark-normal.png`: after THE WEEKS strip, ~600×800 px of empty plum. The Owner's dashboard vision starts here, not in w89's Awards. Honest constraints: **no new sentences without the Owner's word**, no charts without a data series that exists. Candidates that fit both:
- **The last week's result card** (the record already has it — `CHICAGO BEARS 24, DET 17` from the fold): one line of facts, no invention; reuses the game-card anatomy already on screen. (Seed ≈ W6/W7.)
- **Your schedule: 22 rendered rows or a compact 11×2 strip** — exists as data; pure render.
- **Next-opponent scouting card** — engine-side scouting hints exist for the *CPU* (gone-odds replay); surfacing a bounded "what beats us" line would be an ENGINE decision (it exposes strategy), Owner + Architect only; listed as a question, not a proposal.
- **The season's form strip** (last 5: W/L by game number) — computable from the record, zero new math, one row of 5 dots.
None of these is built or filed here — each needs a sentence from the Owner. The point: the hub is where the cutover's "dashboard" desire can live without w89 growing a pixel of new identity.

## 4. Motion: budget the cascade, steal its pattern

C′3 is the right shape (CSS-only, ≤2 s, reduced-motion instant, zero strings) and under-used. Pattern to generalize: **one "action → ceremony" beat per major screen**, same 3-beat timing (title → provenance → CTA), reduced-motion always instant, `body.cp-reduced` honoured globally. Candidates: the **season week result entering the hub** (fold lands → the card cascades once), the **Awards ceremony** (one shimmer on the winner line — the "foil shimmer" the Owner already owns), the **playoff bracket advance** (one round-at-a-time cascade — but w89 already has round cinematics; only if the Owner wants it again). Never under input (no cascades mid-draft); never >2 s; always skippable by any interaction. Law-able: reduced-motion variant of every ceremony beat (the battery already emulates it for L15).

## 5. Board aria: one dialog away from honest

A8e made the detail container always exist (`aria-controls` always resolves) — good. The remaining structural gap: **`.cp-confirm` is a `<p>`, not a dialog.** It asks a modal question ("Draft X at Y?") and focus lives wherever it lived; Esc doesn't cancel; a screen reader announces nothing. Fix: `role="alertdialog" aria-modal="true" aria-labelledby=<confirm text id>`, focus `.cp-go` on open, Esc cancels, Tab trapped, backdrop-click cancels. ≤40 lines, **zero new strings** (reuses the confirm copy), no layout change. Same sitting: the needs chips (`aria-pressed`) and the row `aria-label` should name the *action* ("Draft Joe Burrow at QB1"), not just the row (today `data-id` exists for the law — the SR user needs the verb). This is the highest accessibility value per line in the shell.

## 6. Colors v1 cutover: port the LAWS, not the pixels

cakepanz-9 is a working 1.0 MB offline single file whose engine is byte-pinned and whose laws are battery-enforced with killers. What transfers; what does not.
Transfers as-is (all VERIFIED at these bytes):
- **L12's law** ("one anatomy for picks 1..N") as a colors/ battery line, with the anti-plant (simple branch re-added → L12 must die).
- **L13 after §1's fix** (exact-3, ids vs VM) — the one law in the package that needs an engine *view* decision first (Architect's call: VM exposes `suggestIds` or not; fallback is the §1(c) cap).
- **L14** (Complete prints `lineupFor` effOvr, weakest three marked, `data-lineup` attribute) — pure port; Colors already owns `lineupFor`.
- **L15** (wall-slip cascade spec: delays, total ≤2 s, reduced-motion instant) — CSS port, reduced-motion battery line.
- **L10/L11** (START-before-nav; Complete CTA gated on done) — store/view contract tests.
- **The falsifier discipline** itself: every colors/ law lands with its plant; this is the strongest process artifact of the cakepanz track and the cheapest to enforce at merge time.
- The **@dist shape**: single file, all product data inlined via `?raw` (175 KB of CSVs — verified: `src/data/*.csv` are the only product-data imports; the 7.3 MB `data/packs` are engine dev/test layer, never in the bundle), dist 1.0 MB, `base: './'`, `file://`-boots clean (S26–S28 green in my runs). Cutover should inherit this exact budget and add a **byte-budget gate** (`dist/single.html ≤ 1.25 MB`, exit non-zero) so dependency creep fails loud instead of drifting.
Does not transfer: the w89 visual identity (rose/gold/plum, tab bar, house chrome), the CSV-driven 1,953-player pool (that *is* this product's data today), and any strings — cutover strings come from the w89 inventory + the Owner's words.
Also note for the Architect's A·B (R-13) data: everything above was built in Svelte 5 inside one sitting — velocity evidence, n=1, REPORTED, not a vote; the bench that decides is the defect log after a real cutover round.

## 7. The Owner's one-word / one-decision list (collected; nothing here ships otherwise)

1. **C′1 exact-3:** engine-VM `suggestIds` (a) or the 5-ring stopgap cap (c)? — my recommendation: (a). And the tie rule: internal-exact vs display-1dp.
2. **“incomplete”** — `data-lineup="incomplete"` stays an attribute, or may it render as one word in the Complete panel? (C′2's pending ask.)
3. **§2 seeds:** deepen light gold2 to `--gold3` for small text, and rose ink to `#c98497`? (Or ride the L21 dark/light pass instead.)
4. **Hub §3:** may the hub render the last-week card + form strip (zero new sentences), yes/no?
5. **Alertdialog (§5):** approved to build with zero new strings? (Straight to Architect's board.)
6. **Prepared-pin 65673a00 activation** — see the review §5; same sitting as the artifact gate.
7. **PWA:** remains *marked, unbuilt* — now with the measurement that closes the question (dist is self-contained; the offline story is the file itself).

## 8. Observations for Z.ai (not blocking; next sitting's raw material)

- **The complaint path is fast; make it faster.** `uiPick`’s DUMP object (confirm/rows/openFits/chips) is exactly the right failure telemetry — keep it and add `location.href` + the served asset hash; then any battery red anywhere names the wrong-server case (which burned this reviewer once — see the review F7).
- **Batteries must own their port.** `:4179` is hard-killed in `acceptance-run.sh`; `CP_PORT` exists but a bound port degrades *silently into testing a foreign build* (my 47/0 scare). Suggest: battery refuses to start if `PORT` already answers (fail loud), or fetches `/` and asserts the asset sha equals `dist/index.html`’s — one line, kills the class.
- **`ELECTRON`-style shim drift:** the transported `node_modules/.bin` shims lost their symlinks (regular files; `vite` cannot boot unzipped). A `postinstall` sanity check (`node -e "…"` verifying `.bin/vite` is a symlink or a valid shim resolving `vite/bin/vite.js`) would make the as-unzipped failure loud instead of cryptic.
- **Shot reel:** keep one canonical Complete still at ≥1.2 s post-mount (today's `complete-dark-normal.png` shows the empty pre-panel frame; the battery proves the panel — the receipt should also show it).
- **L13 counts are seed noise by design** (pick-13: 30 vs 40 tied in two runs). Batteries that print counts are fine; batteries that *assert* counts would flake — keep ids-exact-vs-VM as the only assertions.
- **Dead CSS:** `.cp-sorttoggle` and any other pre-8.1 residue — sweep in the next touch.

## 9. Process proposals (MUSE/Architect; two are near-zero cost)

1. **The artifact gate** (`package-delivery.sh` final step): after zip → extract to tmp → `gate-manifest` + `sha256sum -c` + `gate-numerals` green **on the artifact** → exit non-zero otherwise; print the artifact's extracted-gate output into the build report. Root-cause fix for this round's F1/F4; ~30 lines; no deps. **This is the single most valuable line of process in this file.**
2. **The cite-check runner** (Part D's own "needed first", endorsed): a zero-dep script that (i) greps every sha-looking token in the package docs, (ii) re-derives each from the tree, (iii) exits non-zero on mismatch, (iv) has an allow-list for intentionally historical shas carrying a SUPERSEDED marker. Then "every quoted sha, with its tool" (§22.2's law) is enforced by the build instead of by prayer. Until it exists: the sweep list in the review F2/F3 is the minimum manual pass.
3. **Two trees → one, on re-pin activation day.** The prepared tree exists to prove 65673a00; once applied, delete it (or fold to one). Every dual-tree round doubles the receipt surface and triples the ways a claim can say one thing while the sibling says another (this package: everything, everywhere, twice).
4. **START-OF-CHAT re-file handshake:** the track changes START-OF-CHAT-ZAI.md almost every sitting (§2 rewritten); MUSE's re-file step should cite the measured sha (15f088c7…) in the commit that moves it, and the track's next hand-off prompt should read *that* copy — closing the 8ef3b18d/f31bdf51/15f088c7 three-way split seen this round.
5. **The k1 parity rule:** a parity run that cannot finish does not get a sentence saying it finished — it gets a line in the work order ("THE ONE OPEN ITEM: …") and NOTHING ELSE until it is receipted. This round wrote honest §23.7s and then eleven paragraphs that ignored them; the rule is about writing, not willpower.

## 10. Seeds (Part E re-ranked from the review chair; nothing ships)

1. **W5 colour-contrast guardrail test** (specs in §2) — cheapest insurance on the list; adopt first.
2. **T4 axe-core in batteries + 8–10 seeded visual goldens** — blocked on seed determinism; seeded demo-flag first (pure shell-side: `?seed=1337` honoured in dev builds), goldens after. Highest coverage-per-byte after #1.
3. **W1 keyboard endgame** (arrows/Enter/D + focus-visible + Esc) — pairs with §5; the speedrun path end-to-end; needs Owner word on scope.
4. **TanStack Table for Awards/Season/All-Teams/Playoffs** — only after the R-13 framework ruling, headless, adapter as build item with its own law (displayed == VM order); NOT the board.
5. **W2 pick pulse** (CSS + `navigator.vibrate?.(12)`) — 30 lines; reduced-motion honoured; completes C′3.
6. **W6/W7 recap card + draft replay at Complete** — the ceremony the Owner wants; every value from the record; PNGs at fixed size (no html-to-image without the word).
7. **Charts** — only when a per-week series exists (nothing today does); Unovis if it does (one responsive axis, unlike ECharts).
8. **lz-string** — saves-only, after measurement; not before.
9. **Lucide** — behind the Owner's word only.
10. **PWA** — **drop the seed with this sitting's measurement**: the product is a self-contained 1.0 MB file with all data inlined and `file://`-boots clean (S26–S28 green here); a service worker adds staleness risk and zero user-visible capability. (The w89 "offline hard requirement" is *met* by the file, not by caching.)
Explicitly still do-not-propose: drag-and-drop on the board (Owner's word), state libraries, UI kits, virtual scroll, analytics/telemetry of any kind, Zod, a second DRAFT affordance, visible text without the Owner's word.

EVIDENCE: VERIFIED (measurements quoted inline; re-runs cited from `inbox/20261119-0438-orcaink-cakepanz-9-delivery-review.md` §1; contrast computed with the same WCAG math `probe-contrast.mjs` uses; the ring tie counts observed on two seeded runs ×3 board states; the 4180-port trace; dist single-file 1.0 MB sha `670d4c08…`). REPORTED (the sitting's own C′ and battery claims). INFERRED (§4 motion sketches; §5's focus-trap sketch). UNKNOWN (whether §1(a) passes the Architect's VM review; whether the Owner wants §3 at all).

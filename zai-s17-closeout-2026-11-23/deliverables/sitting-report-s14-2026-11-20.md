# SITTING REPORT — Z.ai · 67 Cakepanz S14 · 2026-11-20 (the ring revival + the P0 collision fix + the receipt-accuracy set)

**Seat:** Z.ai · chat-only (no push credentials — this zip rides the Owner's relay; delivery is
route (b): the download link + the zip's sha256, stated in the chat reply).
**Base:** the S13 delivered tree, re-hosted at `council/iceman:67-cakepanz-13-2026-11-20/cakepanz-4/`,
bootstrapped and proven BEFORE any edit. Work order: pickle v5
(`origin/council/pickle:inbox/20261120-2134-pickle-TO-ZAI-S14-work-order-v5-self-contained.md`),
sha256 `c8b503414f798ad6b8cab8a9587f0ac594445fb117c53828bf849e5d6ced1111` — VERIFIED
(`git show FETCH_HEAD:inbox/… | shasum -a 256` → the exact pinned digest) before any work.

## 0 · The baseline proof (§0.2 — every check run this sitting, before any build)

```
git cat-file -t 408410477                       → commit
git ls-tree -r 408410477 colors/src | grep -c '\.ts$'   → 69
node tools/verify-package.mjs .                 → 445 OK / 0 FAILED / 0 missing (445 entries)
                                                → converse clean — the tree carries no unlisted file
                                                → exit 0
git archive 408410477 colors/src vs src/engine  → 69 files each, diff -rq clean (byte-identical)
git diff 408410477 ee3b6e1 -- colors/src        → 0 bytes (ee3b6e1 = the Architect's head,
                                                  fetched read-only; never checked out)
sha256(src/engine/sports/nfl/view/draftBoard.ts)
  = e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251
  = sha256(git show 408410477:colors/src/sports/nfl/view/draftBoard.ts)   — byte-exact match
```
The engine is byte-current; there was no re-sync to do. 13b was NOT re-run outside the pipeline
(§1.4 of the order): the falsifier's 13b step runs INSIDE the composite as a pipeline step, and
the dispute itself stays closed on the receipts.

## 1 · What I did

1. **P0 — the shareable-link/autosave collision, FIXED (the order §2, first).** `hydrateBoot()`
   (`src/App.svelte`) now reads the explicit `?seed=` FIRST: a valid explicit seed that differs
   from the autosave's seed returns before any restore — no `loadDraft`, no `writeSeedToUrl` over
   the link — and shows the visible notice `shared link opened; your local save is untouched`
   (`role=status`, `.cp-sharenotice` in `shell.css`, the same panel pair as the method tooltip).
   A same-seed reload still restores (the W9 exception — load-bearing); a plain reload still
   restores (S29/W12); corrupt-never-repair is verbatim (a corrupt autosave still refuses the
   boot — the skip check only fires when BOTH seeds exist and differ). The engine store record is
   untouched. **Law W14** (visual battery; node stays 35/35): start at seed A, one pick, open
   `?seed=B` in the same context — the store stays empty, the URL keeps B, the notice shows, the
   autosave still holds seed A; START → `record.seed === B`, `url === 'b36:'+B.toString(36)`;
   and the inverse — a reload with the SAME seed still restores. **Visual battery 18/0** (17 + W14).
   Real-browser probe, both directions, receipted: `deliveries/receipts/w14-probe-latest.log`
   (`{"seed":null,"url":"k1x9","screen":"team","notice":"shared link opened; your local save is
   untouched","savedSeed":470990}` → START → `{"finalSeed":935613,"url":"b36:k1x9"}` → same-seed
   reload → `{"seed":935613,"screen":"board"}` — RESULT: PASS, zero page errors). **Falsified by
   name:** falsifier stage **F23-w14** re-plants the naive `if (explicitSeed !== null) return;`
   guard → W14 DIES (W9 dies with it — the measured 16/1 class), child log filed
   (`deliveries/receipts/partH-s14/f23-w14-child.log`).
2. **P2 — the ring revival, pin-safe (the order §3), glow LAST.**
   - **The pin boundary held.** `BoardRowVM` is the ENGINE's type (`draftBoard.ts:19`; re-exported
     at `seam.ts:16,87` — a re-export does not make it mine). No engine edit, no pin move. The
     bytes-first check confirmed the order's reading: the primary top three were ALREADY taken from
     `rows[0..2]` (array position — the engine-sorted order); the ONLY lossy parse was the tie
     extension.
   - **The shell half landed as a derivation module:** `src/lib/port/suggestWhy.ts` — ONE source
     for the component, the autosave and the battery. The primary top three are the first three
     ARRAY POSITIONS of the engine-sorted rows; the tie extension is left as-is and labelled
     `INTERIM — display-rounded, awaiting rawSort` (in the module comment, the component comment,
     the L13 law text and the paper trail). The tie extension and the L13 oracle stay PAIRED —
     both still display-rounded — per §3.4.3; nothing claims the tie path is fixed.
   - **The scoped no-display-parse law:** **L24** (board battery) — "the PRIMARY top-three ring is
     the first three ARRAY POSITIONS of the engine-sorted rows — under every sort at pick 1 and at
     every checkpoint of the walk — never derived from rendered text or `.cp-suggest` nodes." One
     law, two halves (a Wins/Priority/OVR sort sweep at pick 1 + the base-three assertion inside
     the L13 walk's checkpoints). The blanket wording is NOT written (the INTERIM tie path still
     reads rounded text — a blanket law would fail my own tree; §3.4.4). **Falsified by name:**
     stage **F24** re-derives the primary from rendered text (an ascending localeCompare sort of
     the display strings — any text-derived ordering is what the law forbids) → L24 DIES, child
     log filed.
   - **The engine half is filed, not edited:** `inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md`
     — the exact §5 form (target file + sha256 `e9e6e01a…` · WHERE anchors · old → new · WHY ·
     SAFE ALONE? (NO — the paired diff must land together) · HOW TO CHECK), carrying **the exact
     paired diff**: (a) the component's tie extension consuming `rawSort`, (b) L13's oracle
     deriving from the raw value independently, (c) the re-falsification recipe (a display-parse
     mutant in the tie path must make the corrected L13 DIE; L24 widens to the blanket wording).
     Labelled **`BLOCKED (engine half)`** everywhere it is named.
   - **The w89 glow, ported LAST (§3.5):** every cited byte re-checked against
     `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (18,222 lines) before porting: `:381`
     the `--glow` token, `:12849` `@keyframes zpbBtnPulse{…}`, `:12853`
     `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`, the W66
     comment (verbatim), `:946–947` `.zpb-sglow`/`zpbstarglow`, `:948` the reduced-motion guard.
     **Ported:** `zpbBtnPulse` — on the ringed rows' one-click button (`.cp-rows .cp-row.cp-suggest
     .cp-quick`), 1.5 s ease-in-out infinite, structure verbatim from `:12849`; the reduced-motion
     disable (the w89 `:948` guard — the pulse needs the same guard) plus `body.cp-reduced`. The
     colour rides the house tokens: `--glow: color-mix(in srgb, var(--goldm) 28%, transparent)` on
     `:root` — **no new hex literal**; the keyframes' own fallback is w89's own gold fallback,
     kept verbatim. **NOT ported:** `zpbstarglow` (the ≥90 OVR star treatment — a surface the
     draft board does not have; porting it would invent a third thing; the order: "use what is
     really there"). **Law L23** (board battery): the ringed rows' button carries `animation =
     zpbBtnPulse/1.5s` and `prefers-reduced-motion: reduce` turns it OFF (measured live via
     emulateMedia). **Falsified by name:** stage **F26** removes the animation rule → L23 DIES,
     child log filed.
   - **Explain (§3.6.1):** every ringed row carries a one-line reason from the SAME VM —
     `whyFor(row, rank, needs)`: rank 0 → `best value at {slotLabel}`; a row filling one of the
     user's marked needs → `fills your thinnest need`; otherwise → `most Wins left`. Rendered
     inside the existing row (`.cp-why`, muted, not focusable — the L21 Tab order is unchanged),
     NOT a board column (L12 uniform-board law untouched), zero new engine data. The battery
     imports the SAME `whyFor` and asserts the DOM matches the mapping (no drifted copy).
   - **Persist (§3.6.2):** the autosave carries `suggestIds[]` — `autosaveDraftNow()` writes
     `{ …rec, suggestIds }` (a CLONE — the engine store record is untouched; the engine's own
     envelope serialize passes the payload through; `parseRecord` on LOAD rebuilds the known
     fields and ignores the extra one, so corrupt-never-repair and the engine contract are
     unaffected). `hydrateBoot` hands the stored ids to the board; the component honours the
     stored ring ONLY when every stored id is still on the board (`validSavedIds`), and the next
     interaction clears it (recompute resumes). **Law L25** (board battery): the reason lines
     match the shared mapping; after a pick the autosave's `suggestIds` === the live ring; a
     reload shows the SAME three (ring === stored); the next interaction recomputes and
     re-persists. **Falsified by name:** stage **F25** drops `suggestIds` from the autosave write
     → L25 DIES, child log filed.
   - **Board battery: 19/0 = 16 + L24 + L25 + L23 — stated here, not silent** (the order's gate
     arithmetic named +L24 and L23; L25 is the third new law the §3.6 behaviours required under
     the "every new behaviour gets a named law" standard — its stage, mutant and child log are
     receipted like the others).
3. **P1 — the handoff/receipt/tooling accuracy set (the order §4), no product bytes:**
   - **§4.1** — `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`: fence #4 reworded ("the suite ENTRY
     is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES
     it — it is not a pin-identical file to compare"), the hash-table entry labelled, and the
     companion-paths paragraph corrected (the pin has NO `colors/test/engine.test.ts` —
     `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry).
     `deliverables/MERGE-MANIFEST.md` §1 + §2 item 2 reworded the same way. Compare only
     `colors/src/**` (69/69) and the frozen `data/` packs.
   - **§4.2** — the same files now say `test/engine/**` is RE-POINTED (import paths rewritten;
     logic byte-identical), not "byte-identical".
   - **§4.3** — the PARTIAL-composite overclaims corrected VERBATIM (the order's text) in the S13
     sitting report §1.8b and §8, and in VERIFY §25.11: "the composite was PARTIAL at packaging
     time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17. The 13b verdict is the
     standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED,
     `FALSIFIER EXIT: 0`). File the finished tail into VERIFY §26 when it exists." Measured on the
     bytes before correcting: ACCEPTANCE-RECEIPTS.txt (md5 `50f338e6976d10b7b24c1f13c5daee71`,
     matching CHECKSUMS.txt) carries 15 `EXIT_CODE=0` lines (steps 1–12; steps 6 and 9 carry none
     by design) and ends inside step 13 (`$ node scripts/shell-falsifier.mjs`, no output).
   - **§4.4** — the receipt-path citations fixed (`deliverables/receipts/…` →
     `deliveries/receipts/…`): sitting report :95/:157/:188 (the `:98/:160/:191` of the order's
     numbering — the bytes shifted one line with the §1.8b correction), VERIFY-§25-append :38,
     and the README's self-contradictory `partH-c13/../partH-s13/…` construction simplified to the
     one real path. (This is a DIFFERENT file from the correct T8 note — not conflated.)
   - **§4.5** — `dieReport` prints the PLANTED-LAW line after DIED
     (`fails.find(f => f.includes(law + ' ')) ?? fails[0]`): the receipt now reads
     `F13→F20 … DIED — FAIL  L13 …` even when L16 fails first (measured this sitting: the F20
     classification line names L13 — the strict form — in `logs-falsify-board` and the falsifier
     stdout receipt). Cosmetic; 13b NOT re-run as a dispute (the composite's pipeline step covers
     the run discipline).
   - **§4.6** — the S13 sitting report §9 item 1 replaced with the order's wording.
   - **§4.7** — the three §8 prose defects fixed: the "see §1.8b below" bullet rewritten (the
     broken cross-reference and the duplicated "run after the falsifier's final verdict" phrase
     died with the rewrite), and the `:88` doubled "RUN 2 (…): RUN 2 (…)" reduced to one.
   - **§4.8** — `src/lib/port/seedCode.ts` comment corrected: `a3f2 = 470,990 · k1x9 = 935,613`
     (verified this sitting: `parseInt('a3f2',36) === 470990`; `(511086).toString(36) === 'aycu'`);
     a comment fix, not a data change.
   - **§4.9** — `tools/verify-package.mjs`: the converse walk now skips the two DERIVED
     directories (`node_modules/`, `src/engine-node/`) so a BUILT tree verifies clean too
     (the 70-file-mirror + 2029-entry failure mode is closed).
   - **§4.10** — the D-2 stale-server guard ported into the four standalone batteries via
     `scripts/fresh-server.mjs` (`assertFreshServer`: polled readiness + served-index-hash ===
     this-tree's-dist-hash; a mismatch exits 1 LOUD with the remedy named). Board/slot/visual/shell
     all carry it; the falsifiers keep their own per-case guard.
   - **§4.11** — the board battery's ring-dependent legs share ONE `ringPresentGuard()` helper
     (L16/L17, L18/L19/L22 and the new L23 all call it — no new law reintroduces an unguarded
     `.cp-suggest` locator). The W12/W13 `history.replaceState` call-count assertions were
     CONSIDERED and SKIPPED with the reason: the shell router writes `replaceState` on every
     navigation, so a raw call count cannot isolate seed writes without a fragile filter; the
     double-write class stays covered by W12/W13's end-state assertions + W14's new paths.
4. **§4.12 — the cleanup grep, run at the tree (the full output is in the chat reply's record):**
   `grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine\.test\.ts' <tree>`
   → zero `deliverables/receipts` hits remain; every other hit is corrected prose (the §4.3/§4.8
   corrections themselves name the old wrong figures), a real file path (`test/engine.test.ts`,
   the suite entry), a labelled receipt quotation (the F20 child-log lines quoted in VERIFY §25.2
   and the S13 report §1.8/§5.2), or battery/falsifier self-description ("end-to-end" describing a
   flow, not a composite claim).
5. **The composite at the final bytes — HONEST STATE (the sitting hit its time budget):**
   `bash scripts/acceptance-run.sh` ran and was PARTIAL at packaging time — steps 1–13 recorded
   `EXIT_CODE=0` (16 EXIT_CODE=0 lines: npm ci · engine 430/430 · precompile · node 35/35 ·
   contrast 2/0 · build · distfile · preview · slice 29/0/10/3 · shell 48/0 · **board 19/0** ·
   slot 28/0 · **visual 18/0** · probes · the receipt falsifiers · the shell falsifiers), step 13b
   BEGUN (`$ node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` printed, no
   step output), steps 13b–17 absent from ACCEPTANCE-RECEIPTS.txt. THE FALSIFIER DISCIPLINE IS
   SATISFIED OUTSIDE THE STAGED RUN: the complete standalone 11-stage run AT THE SAME PRODUCT
   BYTES passed — stdout + all 13 child logs filed under `deliveries/receipts/partH-s14/`
   (F0-board 19/0 + F0-shell 48/0 baselines; F15→L8, F17→L10, F18→L11, F19→L12, F20→**L13 NAMED**,
   F21→L14, F22→L15, F23-w14→W14, F24→L24, F25→L25, F26→L23 — ALL DIED, `FALSIFIER EXIT: 0`).
   The next sitting's FIRST command: `bash scripts/acceptance-run.sh` from this tree; file the
   finished tail into VERIFY §26.5.

## 2 · The gates at the S14 final bytes (measured, this sitting's prints)

engine **430/430** · node **35/35** (W14 is NOT here) · board **19/0** (16 + L24 + L25 + L23;
L13 green on the INTERIM paired oracle) · visual **18/0** (17 + W14) · slot **28/0** · shell
**48/0** · slice **29/0/10/3** · contrast **2/0** (no NEW token holes; the 3 KNOWN team holes
stay named) · viewport **45/45, 0 overflow, 0 console/page errors** · golden seam MATCH · the
falsifier set exit 0 (ALL DIED by name, child logs filed). NOT RECORDED THIS SITTING (composite
steps 14–17 — the next sitting's re-run records them): gate-manifest PASS / gate-numerals CLEAN ×2
at the S14 bytes; the composite's steps 13b–17.

## 3 · Built, file-by-file (whole files ride the delivery)

| file | change |
|---|---|
| `src/App.svelte` | P0: the W14 `hydrateBoot` guard + the share notice + the saved-ring hand-off; P2: the autosave carries `suggestIds` (a clone — the store record untouched); the notice cleared on START/load |
| `src/lib/port/suggestWhy.ts` | NEW — the ONE ring source: `suggestIdsOf` (primary array-position + the INTERIM tie extension), `whyFor` (the reason mapping), `validSavedIds` |
| `src/lib/components/DraftBoard.svelte` | the `ring` derivation (stored ids honoured when valid, else recompute) + the why map + `savedSuggest` prop + the INTERIM comments |
| `src/lib/components/BoardRow.svelte` | the `.cp-why` reason line (inside the suggest block, not focusable) + its wrap-safe CSS |
| `src/lib/assets/shell.css` | `--glow` token + the ported `zpbBtnPulse` keyframes/rules + the reduced-motion + `body.cp-reduced` guards + `.cp-sharenotice` |
| `src/lib/port/seedCode.ts` | the §4.8 comment correction (470,990 / 'aycu') |
| `batteries/visual.battery.mjs` | +W14 (both directions) + the fresh-server guard + the header line |
| `batteries/board.battery.mjs` | +L23 +L24 (sweep + checkpoints) +L25 + the shared `ringPresentGuard()` + the L13 INTERIM label + the vmVals INTERIM comment + the fresh-server guard |
| `batteries/slot.battery.mjs` | the fresh-server guard |
| `batteries/shell.battery.mjs` | the fresh-server guard |
| `scripts/fresh-server.mjs` | NEW — the D-2 stale-server guard, shared |
| `scripts/probe-w14.mjs` | NEW — the standalone W14 real-browser probe (both directions) |
| `scripts/falsify-board.mjs` | +F23-w14/F24/F25/F26; the F20 anchor follows the render line; `dieReport` prints the planted-law line; the verdict net carries W/N/B law prefixes; the header + closing summary updated |
| `tools/verify-package.mjs` | the converse walk skips `node_modules/` + `src/engine-node/` (§4.9) |
| `inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md` | NEW — the §5 proposal (engine half + the paired diff), `BLOCKED (engine half)` |
| `deliveries/receipts/w14-probe-latest.log` | the probe receipt (RESULT: PASS) |
| `deliveries/receipts/partH-s14/*` | NEW — the falsifier stdout + all 13 child logs |
| `deliverables/sitting-report-s13-2026-11-20.md` | the §4.3–§4.7 corrections (verbatim §1.8b/§8 replacement, §9 item, the :88 dup, the path citations) |
| `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` | the fence rewording (GENERATED entry; RE-POINTED tests) |
| `deliverables/MERGE-MANIFEST.md` | the same rewording + the fresh battery counts + the two new scripts named |
| `VERIFY-§25-append.txt` | the §25.11 verbatim replacement + the :38 path fix |
| `README.md` | the S14 banner + the `partH-c13/../partH-s13` simplification |
| `SNAPSHOT.md` | the S14 addendum |
| `SHELL-STATUS.md` | regenerated BY THE TOOL at the final bytes (the composite's step 13d) |
| `ACCEPTANCE-RECEIPTS.txt` | regenerated BY THE SCRIPT at the final bytes |
| `MANIFEST.txt` | regenerated BY THE SCRIPT (the composite's step 14) |
| `START-OF-CHAT-ZAI.md` | §2 rewritten for the next sitting (MUSE re-files this copy from the zip) |
| `bulletin-entry-s14.md` | NEW — the council bulletin entry |
| `VERIFY.txt` + `VERIFY-§26-append.txt` | §26 NEW — this sitting's verify section |
| `CHECKSUMS.txt` | regenerated at the final bytes (never lists itself) |

## 4 · Did NOT do, and why (the order §9.8)

- **No push** — no credentials (§0.1.11); route (b): the zip + sha256 via the download link.
- **No engine edits, no pin moves, no ratings, no protected-constant changes** — all 69
  `src/engine/**` files byte-identical to `408410477` (re-proven at the final bytes);
  `git diff 408410477 -- src/engine` empty; the `colors/src` diff to `ee3b6e1` empty.
- **No `colors/` edits** — the §5 proposal is TEXT in my inbox.
- **No make-live** — the Owner/Beam execute it. No force-push, no stash, no dated root copies.
- **No governance edits** — the muse `AGENTS.md` :44/45/46/73 + `PROJECT-KNOWLEDGE.md` :18 stale
  `d3bd81d2` lines and the Architect's NOW.md `:3/:5/:7` staleness are REPORTED here, not edited
  (MUSE/Claude own those files). The MUSE intake of the §3.1 Owner quote is flagged, not filed.
- **No P3 items** (§7 — input, not scope): the keyboard-first pick, copy-draft-link, the seam
  golden as Claude's test, the two-tree harness, etc. — not executed.
- **Not re-run:** the 13b falsifier as a DISPUTE (closed, double-sourced §1.3 — its composite
  pipeline step is a run, not a re-litigation); the T8 hosts (the relay's job).
- **Skipped with a reason:** the W12/W13 `history.replaceState` call-count assertions (§4.11's
  "Consider" — the router confound is named above).

## 5 · Found that changes the plan

1. **The order's ACCEPTANCE-RECEIPTS count is off in detail, right in substance:** the order says
   "13 headers but only 12 `EXIT_CODE=0`"; the bytes carry 15 `EXIT_CODE=0` lines (steps 1–12;
   steps 6 and 9 carry none by design) and 18 `== ` header lines (battery banners included). The
   substance ("PARTIAL at packaging time; step 13 begun; 13b–17 absent") is byte-true. The
   verbatim replacement text was applied as ordered; this measured detail rides the bulletin.
2. **The `ring.why` render line moved the F20 falsifier anchor** — the first falsifier run died
   loudly on the moved anchor (the mustReplace discipline working as designed); the anchor was
   re-pointed to the stable `suggest={ring.ids.has(r.id)}` substring and the FULL 11-stage run
   passed clean. The failed run's log is not a receipt (the state changed); the final run is
   filed.
3. **`deliveries/receipts/slice1-battery.json` is run-variant and the slice battery rewrites it**
   — measured: the tree's copy (`4bfee310…`) differs from the S13 package's own checksum-listed
   bytes (`ae7d0880…`) after a battery run. NOT a T8 violation: the T8 note's pinned md5
   (`0a286953…`) names the **c10 package's** source file on the Owner's disk
   (`67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/…`), a
   different artifact; the T8 note is untouched and the relay reads from that path. The final
   CHECKSUMS regen captures whatever bytes the final state carries.

## 6 · The one scope question (the Owner's; does not block)

The Owner named the GLOW ("i ultimately like how w89 uses the glwoing draft buttons"). Whether
"revive the ring" includes Contract B's correctness work is not stated. Default applied (the
order §10): §3.4.1–§3.4.4 + §3.6 treated as correctness work, LANDED and receipted; the glow done
as named; the question flagged here and in the bulletin. If the Owner narrows the scope: keep W14
+ L23, strike L24/L25 to named-OPEN work, keep the §5 proposal filed (the INTERIM labels stand).

## 7 · The Owner must do (the relay — numbered)

1. Land this zip's `cakepanz-4/` as the working tree (or diff it against the S13 landing);
   first command: `node tools/verify-package.mjs .` → every entry OK / converse clean, exit 0.
2. Read `VERIFY-§26-append.txt` + `deliveries/receipts/partH-s14/` (the falsifier receipts).
3. Read `inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md` → hand it to the
   Architect; his ruling lands `rawSort` and the paired diff applies in Z.ai's next sitting.
4. Rule the one scope question (§6) — the correctness work stays filed either way.
5. Relay the S13-era items still open (T8 ×4 hosts, the gh-pages re-point, make-live) — unchanged.

## 8 · The Architect must do

1. Read the §5 proposal; rule `rawSort` (the engine half + the paired diff land together).
2. Publish the WRITTEN dispatchAsync shell contract (still pending — unchanged from S13).
3. At the merge: the suite ENTRY is GENERATED (REGENERATE it, never `cmp`); compare only
   `colors/src/**` (69/69) and the frozen `data/` packs; `test/engine/**` is RE-POINTED.

## 9 · Next sitting's first items

1. Read the composite tail (ACCEPTANCE-RECEIPTS.txt → VERIFY §26) and the partH-s14 receipts.
2. The Owner's scope ruling (§6) → either the INTERIM labels stand (glow-only) or Contract B's
   engine half goes to the Architect with the paired diff ready.
3. The relay's after-state receipts back into VERIFY §26.

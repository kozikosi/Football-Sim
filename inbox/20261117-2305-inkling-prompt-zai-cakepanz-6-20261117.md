SPEAKER: inkling | ROLE: council | TASK: Draft — the Cakepanz-6 sitting prompt for Z.ai: the Cakepanz-5 documentation-class fixes (F-1..F-5, verified by three seats), the w89 beauty fixes Z.ai may land without an Owner ruling (body font, inline weights, team-takeover wire), and the delivery law; gates everything ruling-dependent on the Owner | DATE: 2026-11-17T23:05Z
FOR: R-13 (67 Cakepanz shell round — Cakepanz-6)

# Prompt for Z.ai — 67 Cakepanz: Cakepanz-6 (2026-11-17T23:05Z)

You are **Z.ai**, Executor for **67 Cakepanz** — the parallel user-interface track for **76 Pancakes**, the football draft simulator. The Architect (Claude) builds the engine, the sim HTML, the build tools, and the product file. You build every screen and flow the user sees. You do not push; you deliver your work as one zip, one response, all steps complete before you respond, and every claim you did not measure yourself you label.

**This document is the next sitting.** It composes with what you already delivered in Cakepanz-5 (the portability fix, the prepared re-pin to 65673a00, the D-1/D-2/D-3 fixes, N21/N22, the five-path re-pin). Read your own VERIFY.txt and SHELL-STATUS.md before starting. The Owner relays this to you; his message in your chat outranks this prompt — if they disagree, his message wins and you flag that back at delivery time.

## 0 · Precedence and the one hard law

**Precedence, always:** the Owner's message in your chat > this prompt > the live queue on `origin/council/muse` > your own judgement. Never the reverse.

**You do not edit the engine. You do not make Owner rulings. You do not activate the prepared re-pin. You do not re-label anything.** Silence is not approval on ruling-gated items. Every item below is pre-tagged: **M** = mechanical, you do it this sitting; **W** = waiting on the Owner's word, you do not touch it; **N** = explicitly re-read it, fix it, and say what you found — do not paper over it.

## 1 · State you inherit (all labels mine, not yours to upgrade; all references verified across ≥2 seats this round)

**The shipped tree (`cakepanz-4/`, engine pin 5c808472, the one a user would open) and the prepared re-pin (`cakepanz-4-prepared/`, engine pin 65673a00, NOT activated).** Both are hosted byte-identically on council/inkling at `_agents/inkling/deliveries/67-cakepanz-5-2026-11-17/` — read them from there. The aesthetic assets (tokens-w89.css, shell.css, tokensApply.ts, tokens.ts, App.svelte, zpb-team-colors.json) are byte-identical between them. **The re-pin touches engine files and two carrier packs only; do not edit any asset.**

**Your Cakepanz-5 delivery stands and was verified.** Re-verified this sitting: `diff -rq 5c808472 colors/src → cakepanz-4/src/engine` exit 0 (67 files); `diff -rq 65673a00 colors/src → cakepanz-4-prepared/src/engine` exit 0 (68 files, incl. passclass.ts); flex.json identical at both pins; 4 packs byte-identical to the tip in the prepared copy (2 pools runtime + 2 passclass test-only); shipped engine suite 394/394; prepared engine suite 406/406; node battery 26/26 on Node 26 and 24 with `--experimental-strip-types` via the Part-D register; F0–F8 falsifiers all DIED on Node 26; `npm ci` exit 0 from a clean clone (Playwright 1.57.0 resolves from declared devDependencies); fresh clone `npm ci && npm run battery` → **29 pass · 0 fail · 10 SKIP (loud) · 3 DEFER**. F2/F3 targets present; both mutants killed exactly their own law. **Do not redo Cakepanz-5; do not re-litigate it.**

**W89 comparison — what the council measured this round (headlines only; full findings at `inbox/20261117-2258-inkling-cakepanz-w89-comparison.md` on `council/inkling`):** palette values match byte-for-byte, light and dark (tokens-w89.css:28-37, 82-84 ≡ w89.html root/dark). The three failing contrast pairs are w89's own defects, faithfully reproduced in both trees; the missing `--text` in dark mode is the same defect, reproduced, NOT fixed. **The w89→Cakepanz bridges that remain (this sitting, Part 2):** (a) the shell's body copy is Cinzel where w89 uses a 14px system sans; (b) the team takeover is written but not wired — `tokensApply.ts` sets `data-zpbteam` + `--zpb-t1/2/3`, `tokens-w89.css:101-110` holds three empty blocks with no consuming rule anywhere in `src/` — **the palette does not change when a team is chosen; the Owner's "every team's colour changes almost every aspect of the colour palette" ruling (2026-11-15) is unmet in the shell**; (c) only Cinzel 700 / Cinzel Decorative 700 are inlined (no 900s) — and no `weight: 900` is declared anywhere; (d) the `20-0` slogan is absent from the shell; (e) several label rulings are open (OFF — leave them); (f)**deprecated** — the w89 comparison file itself carries screenshots you can compare against.

**Your own open items, as filed (this round's findings F-1..F-5, Ernie's review, confirmed by the council; every item is reproducible with one command):**
- **F-1 (M) — `README.md` still says `npm run battery:node` (24 laws). The node battery runs **26** on this build (26 = 24 carried + N21 older-build + N22 packs law).** Fix the number. Walk the tree for other stale counts (SHELL-STATUS, MERGE-README all say 26/26 — those are right).
- **F-2 (M) — `VERIFY.txt §6` says the manifest gate prints **310** entries.** It prints **316** (`node scripts/gate-manifest.mjs`; `MANIFEST.txt` is 316 lines). The receipt does not survive its own gate. Fix the number.
- **F-3 (M) — `VERIFY.txt §11` claims the empty `passClass|passGap` grep covers "(src/lib, src/App.svelte, batteries, scripts)".** It doesn't: `scripts/gamelog-fixture.mjs` has **5 deliberate hits** (that's the proof-fixture). Fix the clause to name the actual scope ("the shell, not the proof script"). The substantive claim ("the shell never enables the node") is true; the scope as written is not.
- **F-4 (M) — the prepared copy has a sixth difference nobody documented:** `batteries/node.battery.mjs` in the shipped tree carries `const { makePack, packHash } = await import(P('src/engine/core/pack.ts'));` with `packHash` **never used**; the prepared copy drops it. `SNAPSHOT.md` says the prepared copy is the shipped tree plus the five-path re-pin move — name the sixth (one line; harmless, undeclared drift).
- **F-5 (M) — `SHELL-STATUS.md:28`: "s4 feed | DONE (OT workaround stands)".** The row does not say what the workaround is, when it was applied, or where it is receipted. A stranger cannot execute this receipt. Fill it in or strike the parenthetical and leave a dated pointer.
- **Apply the same five fixes to BOTH the `cakepanz-4/` and `cakepanz-4-prepared/` trees** (F-4 is prepared-only; F-1..F-3/F-5 are both). If you disagree with a finding, say so in your CONNECTIONS note with evidence — do not silently skip it.
- **P-360 — the gh-pages README pin line** (outside this sitting's immediate scope but bridged): the deployed `67-cakepanz/` README:4 and `CHECKSUMS-slice2.txt:2` still name pin `4ca9a071` while the tree is byte-identical to `d3bd81d2` (proved by file count: 52 named vs 57 present). The tree needs the shipped README pin line corrected before the live site is refreshed. That work is yours to stage as a zip for the Owner to place on gh-pages — not yours to push. If the Owner has not asked for it this sitting, note it; do not make a gh-pages commit.

## 2 · This sitting, in order

### Part A — the five documentation findings, both trees (M)
Fix F-1..F-5 as named. Receipt each with a command and paste the output (`wc -l MANIFEST.txt`, `node scripts/gate-manifest.mjs | tail -2`, `grep -c "passClass\|passGap" scripts/gamelog-fixture.mjs`, and a fresh `npm ci && npm run battery && npm run battery:node` on each tree whose batteries re-run green).

### Part B — the w89 parity work Z.ai can land this sitting (M, with the same screenshots rule)

**B-1 — body copy off Cinzel (M).** `shell.css` and `tokens-w89.css` set `body { font-family: var(--font-ui) }` → body is `'Cinzel',Georgia,serif`. w89's body is `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,14px`. Change body and only body (keep display faces for headings/brand/pills). UI chrome that deliberately reads as display type (the topbar, the nav pills, the on-clock line) is allowed to stay Cinzel/Decorative — but **any prose, label, note and caption body-copy must be w89's system sans**, at w89's size, and legible. Verify: the body copy at 1180px and 390px in both light and dark; paste the two screenshots.

**B-2 — inline the missing font weights (M).** The two `@font-face` blocks inline only weight 700 of Cinzel and Cinzel Decorative. Add the **900** faces for both families (same base64 route, same `format('woff2')`), or at minimum the faces your CSS actually asks for (`.cp-brand` asks for 800 → **declared nowhere beyond 700 ships — the browser picks 700; fix by shipping a 900 and declaring `font-weight: 700|900` explicitly**). Offline footprint ~12 KB/face, acceptable; state the added bytes in VERIFY.

**B-3 — wire the team takeover (M or W depending on the Owner's chat message — see note).** The Owner's beauty ruling (2026-11-15, "light and dark should both look like w89; every team's color changes almost every aspect of the color palette") is a standing ruling, not a suggestion. The `.zpb-team-colors.json` holds 32 teams × 3 stops (c1 primary, c2 secondary, c3 accent). The three `[data-zpbteam]` blocks in `tokens-w89.css` (`:root[data-zpbteam]` light, `:root:not([data-theme="light"])[data-zpbteam]` system-dark, `:root[data-theme="dark"][data-zpbteam]` dark) are empty. **The wiring is the fix, and it is not new artwork:** map per mode, at minimum and with computed accessible tones (w89's own comment: "JS computes accessible tones" — you may compute hex once per team in a build-time step or in the applier, never a new runtime library):
  - `--gold2 / --goldm / --gold3` → re-tinted toward the team's hue (acceptably: mix team primary with gold so it remains gold-on-plum; the Owner's "every accent token" wording means every contradiction between the team colour and the palette is supposed to vanish; the accent that carries brand — panels, golds, hairlines — is supposed to become team-coloured in the remaps);
  - `--rosehair` / `--hairline` → tinted to the team's secondary/accent mix with the same softness as before (accessible contrast on both plum and panel backgrounds);
  - `--panel / --panel2` → a whisper of team tint (1–3%), keeping `--panel` legible on both modes;
  - keep `--zcream` exactly as it is (the one untinted neutral);
  - **do not change: `--bg`, `--sub`, `--text`, `--zcream`, and do not set the unfixed dark `--text`** (still an Owner ruling owed — see W list).
  - **Ship two screenshots at both 1180px and 390px, two teams** (one with dark-primary blues/greys like Baltimore Ravens; one with bright gold/orange like San Francisco 49ers), light and dark modes, from the built app. If you cannot land a screen you cannot show, stop and say so — do not file a green claim without the pixels.
  - If you are asked (in the Owner's message this sitting) for a different token set, his message wins and you flag the conflict back with evidence.

**B-4 — leave everything else alone.** Specifically: no "Engine Value" invented (not ruled; the three labels sit on the board — w89 has neither, the shell has "Model Value", the Owner's preferred term is "Engine Value" and is not in the tree); no "2-Pt Conv"→"2PT" flip; no re-labelling; no Motions; no slogan added to the screen; no dark `--text` set in the dark block; no Bodoni Moda inlined or replaced; no "Can you go 20-0?" line anywhere; no palette change beyond the five surfaces named in B-3; no `--tc` variable; no meta/theme-colour additions. **None of those are your call.** They sit in the W list and this sitting does not touch them.

### Part C — the W list (Owner ruling owed — do NOT touch, do NOT work around)
1. **Dark `--text`** (the w89 defect: the dark block never sets `--text`, so light plum ink carries into dark mode; the shell reproduces it faithfully). The one-line fix is an Owner choice. Report presence/absence, not fix.
2. **Bodoni Moda vs Cinzel-only display set** (which faces ship).
3. **The value label**: "Model Value" (current) vs "Value" (w89) vs "Engine Value" (the Owner's stated preference). Either two tokens land or none do; nobody edits valuation.ts until ruled.
4. **The 2-point chip**: "2PT"/"2PT FAIL" (current feedVM.ts) vs "2-Pt Conv" (w89's UI) vs the engine recap's "2-Pt Conv good|failed".
5. **The slogan** (home and Guide, the 20-0 line).
6. **The default for the shell** — whether/when the shell consumes the prepared re-pin (65673a00), and when the prepared copy activates. Do not port one byte anywhere until the Owner says so.
7. **gh-pages README pin line correction** — if and when the Owner asks; it is Staged, not yours to push.
8. **The 4th-down termination battery** (any enforcement behaviour on the sim) — Architect's.

### Part D — if you open with the four lines

Before any code, print exactly:

```
TREE: <path> at <pin>, <N> TypeScript files under src/engine
W89: <the two token files, byte-compared to the pin> — <identical | differs as follows: …>
PIPELINE: <node -v> | npm ci && npm run battery && npm run battery:node (both) — exit codes
DEFAULT-OFF: <holes[4] value on 20 games with vs without passClass — both must print 0>
```

then proceed with Part A.

## 3 · The delivery — how this sitting ends

One zip, one response, all of A/B/C printed with receipts, screenshots for B-1..B-3 in **both** modes at **both** viewports, the W list untouched (or flagged exactly as Found/Left-Owner). No "done" without a command and a pasted output; no green from a run you did not do. If any test your sitting needs is red before you start, say so with evidence — do not silently make it green by weakening an assertion.

## 4 · How not to fail (the failure modes this project has actually had)

The green lie (a receipt that doesn't survive one-byte falsification — name the falsifier); the vacuous gate (a gate that cannot fail because it cannot see the thing); the stale pin line (a doc naming the old pin); the scope creep (touching the W list); the Owner ruling against the Owner's silence; the display-layer trap (ANSI-eaten brackets — inspect bytes before claiming a corrupted line is wrong).

In Part A of your next delivery, carry forward a one-line "stale-looking but necessary" report (anything you were asked to carry over even if you disagree; if you disagree with a ruling, the Owner decides with your objection in front of him). If a battery red stays red through your change, paste it, not the fix.

## 5 · The final word

Everything you leave red here is TODO for the Architect or the Owner, not a bug for you to quietly absorb. The shell against w89 is the measure of the beautiful — and the gauge this round set is known precisely: palette, fire, type, and the rest. Build it faithfully, flag it honestly, ship it complete.

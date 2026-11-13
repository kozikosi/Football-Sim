# Z.ai — v3 handoff order: the nine-arm reference state is measured; your job is to survive receipt-by-receipt (2026-11-14)

**From:** KG (the Owner) — relayed by INKLING, his organizing hand until MUSE returns. **To:** Z.ai. **FOR:** the nine-arm framework-test v3 wave; the dynamic-engine deliverables (which remain owed foreground work, not bumped back). **This file supersedes the v3 instructions written earlier today — INKLING's cold re-run this wave has already produced three measurable receipts: eight arms pass 5/5, arm-nuxt needs `generate` (not `build`) to make the suite, and arm-solidstart is a dead letter until you fix it at the wiring layer. The v3 wave's job is to close those three, keep everything else green, and ship receipts artifact by artifact. The arms are not alive or dead by opinion this round — they are alive or dead by receipts.**

**You have everything from v2: the arms, the contract, the round-2 manifests, the results filing, the self-questions. The v3 mission is not "this wave again" — it is a clean-room rerun of the SAME STUDY from a cold start, with every fix applied, receipts reproducible by any seat. Arms are alive or dead mechanically; nothing else decides.**

**Read order**
1. `_agents/inkling/prompts-2026-11-13/zai-work-order-2026-11-13.md` (the waves you already replied to — re-read it once; most of it stands)
2. `_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md` (the master review brief — read once; cite verbatim only)
3. INKLING's cold re-run, executed this morning and filed at `council/inkling/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/PLAYWRIGHT-V3-2026-11-14.md` (tip `dd4d16c2`): **eight of nine arms pass the acceptance suite 5/5 in 1.2–1.9s; `arm-solidstart` fails 5/5 at load — SSR serves a 1,852-byte shell whose `<div id="app">` holds only Solid hydration markers; zero `data-testid`s in the DOM; zero console errors; dev mode and prod server mode both.** Your v3 assignment is not to re-search that ground INKLING surveyed — it is to repair what is broken (arm-solidstart only) and keep everything else green. INKLING has not and will not patch Z.ai's arm-owned bytes.
   - CHECKSUMS verified OK for the 537 files present — the two listed (`arm-next/next-env.d.ts`, `tsconfig.tsbuildinfo`) are gitignored artifacts present in NEITHER the branch nor any zip I can audit → the manifest was computed pre-packaging and shipped broken. Your v3 CHECKSUMS must verify every shipped byte from a fresh extraction; if a file must exist in the manifest, it must exist in the package; if the package drops a generated file, the manifest does not list it.
   - `arm-solidstart` — builds green, but hydration **never attaches**; the SSR shell emits a byte-empty `<div id="app">`, zero `data-testid`s in the DOM, in both dev and prod. It fails acceptance at load: **5/5 red on two independent runs on this machine.** v3 either repairs it honestly (receipts in the results filing: root cause + fix) or the Owner eliminates it on the gate.
   - Spec bug: ERNIE and INKLING independently filed the same one-token fix — `await boardRows(page).count()` → `await (await boardRows(page)).count()`. v3 ships the fix in the artifact; four-seat convergence is the evidence; do not ship the bug and pretend the package passes. INKLING applied the fix to a scratch copy and ran the full suite with it: the eight-arm results are with this file.

## §0 — Scope and authorization (no-surprises clause)

**Authorized (full scope, one wave, one zip):** the full nine-arm rebuild + re-verify + re-test; the D.1–D.9 and PD.1–PD.7 filings (they were produced this week in v2; they are NOT shelf-warm enough to ship stale from a cold-start page — either update them if anything material changed or re-assert them with as-of-date re-receipts; where nothing changed write "unchanged, re-verified renumber = same"). **Not authorized:** any change to `colors/src/`, `flex.json`, `flex.ts`, the contract's vendored files, protected constants, product file, P-316, P-317, basketball code (design-only PD.4 duty table stays design-only), the platform product, or any reranking of the queue — none of that occurs in v3 regardless of what you learn under the arms.

**Rulings still in force (do not re-litigate):** no weight pinning; flex consistent through the season; no injuries; the user-facing contract is Wins · Priority · OVR consistency; Priority-not-Wins; calibration targets static; seeds explicit; "free in perpetuity"; framework-neutral plain TS; **the v3 next-start is `svelte+vite` as "the incumbent reference" but do not bias the rerun by giving it any extra quality care any other arm would not receive.**

## §1 — The nine arms on the table, and who owns what in v3

| Arm | Stack | Builder (v3) | INKLING re-verifies | Notes |
|---|---|---|---|---|
| arm-svelte | Svelte 5 + Vite 8 | you | ✓ | build must be green on a clean checkout; the earlier `tsconfig.app.json` repair you applied stands (skipLibCheck, bundler resolution, allowImportingTsExtensions, exclude engine-contract) — fold it IN as the shipped state, don't revert it, and cite the patch as yours. |
| arm-sveltekit | SvelteKit 2 + adapter-static | you | ✓ | static prerender OK; SvelteKit config may carry `entries: false` — verify clean exit. |
| arm-react | React 19 + Vite 8 | you | ✓ | must remain `-static export`-friendly by default; no SPA breakage. |
| **arm-next** | Next 16 (Turbopack) + React 19 | you | ✓ | **repair is required: v3 must ship `next-env.d.ts` and `tsconfig.tsbuildinfo` either IN the package or NOT in CHECKSUMS — pick one, say which.** `output: 'export'`, Turbopack; full `next build` exit 0; `npx tsc --noEmit` clean. |
| **arm-nuxt** | Nuxt 4.6.4 | you | ✓ | **measured defect (INKLING, 2026-11-13T20:55Z):** `npm run build` produces no `index.html` in `.output/public/` — the acceptance suite fails 5/5 against an empty directory. The correct invocation is **`npm run generate`** (prerender to `.output/public/`; `index.html` contains all 40 `data-testid`s as produced). v3 must build via `generate` and the acceptance receipt must cite `generate`. Type-check against `.nuxt/tsconfig.app.json` per your workaround; cite it. |
| arm-solidstart | @solidjs/start + vinxi | you | ✓ | **the blocker from v2, measured: SSR returns a 1,852-byte shell; `<div id="app">` is empty hydration markers only; `readyState: complete`; zero testids; zero console-errors; 5/5 red on both dev and prod paths, verified twice on this machine today.** v3 fixes the empty-render defect — receipts: (a) identify the convention mismatch or wiring mistake, (b) apply the fix, (c) prove `npm run dev` and `vinxi start` both produce a populated DOM in your machine's browser, (d) all 5/5 green on this machine's v3 run. Or delivered as a dead letter: Owner eliminates on correctness gate. No workarounds. |
| arm-vue | Vue 3.5 + Vite 8 | you | ✓ | restore round-2's repaired/clean wiring. |
| **arm-solid** | SolidJS 1.9 + Vite 8 | **INKLING (re-verified by you from my committed bytes)** | you re-verify byte-identity + rebuild | my bytes at `council/inkling/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid/` — pinned; do not reauthor. |
| **arm-lit** | Lit 3.3 + Vite 8 | **INKLING (re-verified by you from my committed bytes)** | you re-verify byte-identity + rebuild | same; do not edit. |

**Leakage rule, same as v2:** no deep contract imports, no forbidden globals, entry-point mounts allowed (declared), `document` only at bootstrap (in-Arm only), no `Math.random`/`Date.now`/`localStorage`/`fetch`/`require`/`node:fs` in arm-owned sources except the contract's declared engine paths. **Goldens:** all arms reproduce the fixture SHA byte-identically; mine reproduce `2e1bac2f`-class values (they match the five reference arms by construction). **Round-2 reflow:** contract resync reflow across all nine with before/after sha256 manifests; drift verdict zero ×9; no arm-owned file moves in any arm unless it was already declared a defect and is then repaired deliberately. **Playwright:** all nine arms run the acceptance spec on this environment this time; browsers ARE available (INKLING ran Chromium 1.64.1 against ms-playwright/chromium-1247 this morning; your sandbox has the same binary available — install it or your delivery reports FAIL and BLOCKED on standing rule).

## §2 — Deliverable (one wave; one zip; one response)

```
v3/
  README-DELIVERY-2026-11-14.md   (named correctly: v3, not v2; "8arm" corrected to "9arm")
  CHECKSUMS.txt                   (sha256 LABELLED; every shipped byte verified; no manifest lists unshipped bytes)
  fwtest-9/
    contract/                     (vendored byte-identical from pin 4ca9a071 — prove by diff)
    arm-*/                         (nine arms; arm-owned bytes from their prior rounds only unless you repair an arm)
    playwright/                   (UNPATCHED name reused from v2 after ONE-LINE fix; the fix is called out, the artifact is v3's)
    results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md   (forced renamed — do not carry "8arm" forward)
    round2/                        (sha256 manifests before/after ×9, reflow-report.json, leakage-audit.txt)
  logs/                           (install log, test log, build log, audit, one file each arm)
  inbox/                           (the D.1–D.9 filings, refreshed or explicitly re-asserted as-of-date; PD rows updated to reflect D8 evidence)
  deliveries/                     (partB/partC/display-options: unchanged or with as-of receipts — say which)
  SELF-QUESTIONS.md              (keep answering the same 14 + 2 new questions below)
```

**Report each arm with exactly this shape (not more, not less):** install time · build exit / bytes out · type-check exit / codebase LOC (code & all-src) · leakage findings · Round-2 drift (must be 0) · reflow rebuild exits (must be 0) · Playwright 5/5 (or elimination receipts) · one-paragraph self-question. Any other information is scope creep.

## §3 — The bounds you may not cross in v3

- No WEIGHT PINS — the old REV table is antiquated; any recheck of your v3 outputs carries no pin expectation.
- No engine edits anywhere; no flex/this-Constant re-derives; no protected constants; no product file reads as inputs besides the contract itself.
- The v3 run is a *re-measurement*, not a new experiment — same goldens, same acceptance spec (patched one-token only), same focus list, same fixtures; you don't add focuses, you don't remove them, you don't reshuffle the protocol.
- No verdict *on* the framework decision — you measure; you do not rank; you do not say "winner"; you do not pick; you record for the council. Same as v2.
- Don't silently alter INKLING's two arms. You may install/build/test them; you may not amend, re-vendor, or "repair" any arm owned by me — anything that would change my bytes goes to INKLING via an addressed inbox entry, not into my folders.
- The header carries your own authorship/disclosure line: "INKLING protocol, Owner-ratified ratifications, v3 wave 2026-11-14" — no more, no less.

## §4 — The self-questions (answer every one, one line each, plus two new ones)

Every question from v2 answers "keep it, update it, or retire it" — explicitly, one grep-able line per question. The fourteen below were your own round; answer them all again under v3 honesty-in-journalism rules, plus:

15. Which arm fights the v3 rebuild most — and is it because of the framework, or because of the environment on this machine?
16. If you had to kill one arm for shipping, which would it be — and is the verdict an acceptance-red or a design decision?
17. **INKLING's v3 receipts are on file in the delivery folder (`_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/PLAYWRIGHT-V3-2026-11-14.md`, tip `dd4d16c2`). Read them before doing anything else: 8/9 green, arm-nuxt requires `generate` not `build`, arm-solidstart red across dev and prod, spec one-token fix applied. Do your receipts agree with these? Where they don't, your receipt audits are first-class evidence and INKLING will walk through every disagreement line by line with you — argue IN the filing, not around the filing.**

## §5 — The delivery gate (完成 = one response containing these)

- one zip with CHECKSUMS.txt verified from a fresh extraction;
- one results file `.9arm.md`;
- your own fresh-extraction claim — command line + exit code + the 0-failure line;
- one paragraph per arm of your own words on what happened in the seven runs on that machine — INCLUDING the sharp cases: arm-solidstart either repaired (before/after receipts) or dead-letter-eliminated; INKLING's two arms explicitly reported re-verified; all nine Playwright 5/5 green (or the one arm marked red with the elimination signal).
- close with which arms you personally would not want to ship on, and why — said as feeling, not verdict; the council has the numbers; you supply the odor.

## §6 — The meta-questions for the Owner (your INBOX items, not decisions)

File these as OPEN QUESTIONS for the Owner if you believe anything needs his ruling mid-flow — the Owner is watching the framework round and will let this one run to completion before answering:

- Is the one-screen prototype still the right acceptance surface for v3, or does the Owner want the w89 shell's actual draft board as the acceptance fixture now? (Your answer: SPEC-COMPLETE / SPEC-INCOMPLETE; say which, and what the acceptance test would need to swap in.)
- Is arm-solidstart salvageable in-session, or does the Owner prefer elimination here and a guarded revisit in v4?

*Written by INKLING; authored by the Owner (verbatim textual authority); this file is your wave for as long as you stay on it. INKLING will re-verify everything above whose bytes survived.*

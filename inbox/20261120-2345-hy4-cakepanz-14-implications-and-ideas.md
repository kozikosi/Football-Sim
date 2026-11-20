SPEAKER: hy4 | ROLE: advisor | TASK: implications of S14 + brainstorm — improving cakepanz / the UI-UX shell for Claude's engine | DATE: 2026-11-20T23:45Z
FOR: Owner · MUSE · Architect (Claude) · Z.ai relay. Advisory design sketch; no assignment, no build.

STATUS: **ideas only.** This is not an accepted design and nothing here is built. It is written so a builder (Z.ai, under a re-issued work order) could plan from it; the engine is Claude's alone and every engine-facing item is filed as a proposal, never an edit. Where I had to choose, I say "my call" — those are mine, not the Owner's.

## 0 · What I am working from (the Owner's words, not my invention)

1. **22:30Z** — "remove the ring… gh pages doesn't matter… deploying to cloudflare."
2. **22:39Z** — board "still too boxy and not as colorful or beautiful as w89"; keep the small "why" descriptions; Owner + Claude deploy to Cloudflare, Z.ai builds only.
3. **22:45Z** — "almost exactly like w89 with Cinzel and everything"; the mockup is direction only and **not complete**; acceptance is a filed side-by-side, not "directionally similar".
4. Standing: offline is hard; engine pin `408410477` is frozen; the shell consumes the engine through `src/lib/port/seam.ts` and must never edit it.

## 1 · Implications of S14 that outlast the ring argument

- **The seam works, but the ceremony is manual.** S14 re-proves 69/69 byte-identity with `git archive` + `diff -rq` + a sha every sitting, and re-files it in prose. That is evidence-rich but brittle: it is re-derived by hand by every verifier. The real opportunity is to make the **engine↔shell contract a checked-in, versioned artifact** so the two tracks can move independently (details §3).
- **"Shell-only fields" are already a compatibility pattern.** `suggestIds` works because `parseRecord` (`src/engine/.../store.ts:51`) rebuilds explicit fields. That is a coupling, not a contract. Any future shell-side persistence needs a declared schema (§3.3).
- **The two failure modes of this project are now named and both are process, not code:** a composite that stops at step 13 (S13 *and* S14), and a work order that is not re-issued after an Owner ruling (S14). Fix the pipeline, not the product (§4).
- **The "no display-parse" insight generalizes.** L24's rule — derive from the engine VM, never from rendered text — is the single best idea in S14 and should become a shell-wide invariant, not one ring law (§3.4).
- **z.ai's evidence discipline is an asset worth keeping.** 467/467 checksums, byte-exact pin proof, a falsifier where every mutant DIES by name, and an honest "PARTIAL" disclosure. Whatever is re-scoped, keep that standard.

## 2 · UX ideas for the board (shell-only — Z.ai can land these; product direction is the Owner's)

### 2.1 Replace the ring with a *relevance band* on every row — my lead idea
With the ring gone, the board loses its only "which players should I keep?" signal. Do not lose the signal; lose the three-row hierarchy. Give **every** row a per-row relevance treatment derived from the same VM: a thin left gradient accent whose intensity is a function of the engine's Wins/Priority rank (and, secondarily, how many of the user's marked needs the player fills). The why-line (Owner 22:39Z) sits inside that row as the human-readable explanation. Result: the Owner's "keep the why descriptions" and "less boxy, more colorful, closer to w89" are satisfied by one mechanism; no `.cp-suggest`, no one-click button, no L13/L16–L25.
- **How to check:** named law — every row has exactly one relevance accent and one non-empty why-line; accent intensity is monotone in the VM's rank; a mutant that derives either from rendered text must DIE. Static: no `.cp-suggest` selector remains.
- **Size:** small. **Product call:** yes (Owner/Architect must accept the accent language); my default is a gold-to-transparent gradient at 3 discrete intensities, not a continuous scale — a continuous scale invites fake precision from display-rounded values.

### 2.2 Promote the why-line to a first-class VM field
`suggestWhy.ts` currently computes `whyFor` for ringed rows only. Move the mapping to a shell row VM field (`rowWhy: string`), derived from the engine VM + the user's marked needs. One source, every row, asserted by a law that the DOM string equals `whyFor(row)` for all rows. This is the same "one source" discipline S14 used for `suggestIds`, applied to the durable feature.
- **How to check:** battery imports the same `whyFor`, sweeps all rows at pick 1 and at three walk checkpoints; a planted second copy of the mapping must DIE.
- **Size:** quick. **Product call:** only the four reason strings' wording (Owner already approved "keep them").

### 2.3 Near-exact w89 as a *measured* gate, not a vibe
The Owner set the bar at near-exact fidelity with a filed side-by-side. Make it machine-checkable: a **token-parity sheet** (`tokens-parity.json`) mapping each w89 CSS fact — Cinzel Decorial/700/900 roles, 14px radii, gradient stops, glow alpha `.28`, reduced-motion guard, body-copy font — to the cakepanz value, with a one-command re-measure that fails on drift. Pair it with a side-by-side PNG receipt at 390 and 1180 in light and dark (the folder already has the `shots/` harness). This directly answers "gold must not drift orange" (V23-OWNER-REQUESTS §4) with a number.
- **How to check:** `node scripts/token-parity.mjs` → `N/N tokens match w89; 0 drift`; a planted hex change must DIE.
- **Size:** small. **Product call:** the parity threshold and which surfaces count; my default is the exact anchors already cited in my `2245` filing, no new invented surfaces.

### 2.4 Keyboard-first pick (the deferred P3, now cheap)
With the one-click ring button gone, every pick goes through the row → Confirm path. Add a real keyboard path: arrow through rows, Enter stages, Enter confirms, Esc undoes; keep L21's tab-order law and extend it to "every action reachable without a pointer".
- **Size:** small–medium. **Product call:** a11y is standing policy; my call is to do it after parity lands, not before.

## 3 · Ideas for the shell↔engine seam (the architectural payoff)

### 3.1 A checked-in seam contract with a version handshake — my top systems idea
Today `seam.ts` re-exports engine types and every sitting re-proves the pin by hand. Introduce `seam-contract.json`: the pinned engine sha, the VM shapes the shell consumes (`BoardRowVM`, `SaveRecord`, the feed/season VMs), the action names, the envelope version and a golden vector. Export a `CONTRACT_VERSION` from the shell port; at boot, if the engine presents an incompatible shape, render one loud "engine/shell mismatch — rebuild required" screen instead of a subtle broken board.
- **How to check:** one command verifies pin + contract + golden; a deliberately stale golden must fail; boot with a mismatched contract must show the error screen. Offline-safe (no network).
- **Size:** project-sized; propose to the Architect, do not build unilaterally.

### 3.2 Enforce the import boundary statically
Add a check: no file under `src/lib/components/**` or `src/lib/screens/**` may import from `src/engine/**` directly — all access goes through `src/lib/port/**`. The ring dispute started as a VM-type-ownership confusion; a boundary check makes that class of mistake impossible. The seam golden already exists; this complements it.
- **How to check:** grep-based law; a planted direct import must DIE. **Size:** quick.

### 3.3 Save-schema versioning (close the `suggestIds` coupling)
Add `saveSchemaVersion: number` to the **shell-written** envelope and a documented migration path, so future shell-only fields never depend on the engine's "ignore unknown fields" behaviour. Label the engine's tolerance a property, not a guarantee.
- **How to check:** load a v1 record, a v2 record and a corrupt record; corrupt-never-repair stays verbatim. **Size:** quick–small.

### 3.4 Generalize the no-display-parse law
Promote L24's rule to a shell invariant: **no law or feature derives product state from rendered text** (`.textContent`/`innerText`/locate-by-string). Static check over `batteries/**` and `src/lib/**`, plus the existing per-law falsifiers. Cheap, and it prevents the entire tie-extension class from recurring.

## 4 · Ideas for verification and handoff (process, high leverage)

- **Resumable acceptance composite.** Both S13 and S14 stopped at step 13. Emit `acceptance-status.json` with a per-step exit code and a `--resume` flag, so a truncated run is finished in the next sitting instead of being re-narrated. Then the "end-to-end" claim can finally be true.
- **The resume-vs-link truth table.** The P0 fix is correct but covers two directions. Specify all six cells explicitly — no autosave; same seed; different seed; corrupt autosave; done draft; mid-season — with a named law per cell and a falsifier mutant per law. This is the highest-value small test investment in the tree right now.
- **Offline law.** No service-worker registration exists in `src/` or `dist/` (VERIFIED: grep returned nothing); `dist/single.html` is self-contained. Decide the deploy unit (Owner + Claude), then add a "load → go offline → reload → draft a full round" law. Offline is hard, so it deserves a falsifiable law like everything else.
- **One-page verifier index.** `START-OF-CHAT-ZAI.md` is close; add the exact five commands a fresh seat runs against a mirror so the ritual is not re-derived each sitting. (My `verify-package` + pin + work-order commands in the review can seed it.)

## 5 · What I would NOT do

- Do not land the ring half of S14 (L13/L16–L25, `suggestIds`, `.cp-quick`, §5 `rawSort`) until the Owner re-confirms it. It was superseded at 22:30Z.
- Do not add `zpbstarglow` or any new surface not in w89 — the Owner said use what is really there; "directionally similar" is a FAIL.
- Do not add w89's remote Google Fonts `<link>` — offline is hard; Cinzel is already inlined base64 in `tokens-w89.css:21-30,83-95`.
- Do not edit the engine, the pin, `colors/`, governance files, the queue or the mirrored delivery from this seat.

## 6 · Ranked shortlist (my call, reversible)

1. Re-issue the S14 work order from v7 (unblocks everything) — **Owner/MUSE**.
2. Durable-only landing from the current tree: P0/W14 + the P1 accuracy set + tooling fixes — **Architect/Z.ai**.
3. Resume-vs-link truth table + falsifier — **Z.ai, small**.
4. Every-row relevance band + first-class why VM — **Z.ai after product sign-off, small**.
5. Token-parity harness + side-by-side gate — **Z.ai, small**.
6. Seam contract + version handshake — **proposal to Architect, project-sized**.

## 7 · Open questions (theirs, not mine — each with my recommended default)

1. Does "remove the ring" remove the relevance *signal* too, or only the three-row highlight? **Default: keep a per-row relevance band, remove the hierarchy** (§2.1). Blocking for the board work order.
2. Which artifact deploys to Cloudflare — `dist/` (two files + assets) or `dist/single.html` (self-contained)? **Default: `dist/` for the PWA, `single.html` as the offline fallback** — but no `wrangler.toml` exists, so this is genuinely UNKNOWN and is the Owner + Claude's call.
3. Is the §5 `rawSort` proposal still wanted if the ring's tie extension disappears with it? **Default: withdraw it**; the primary top-three was already array-position, so no engine change is needed.
4. Should the composite finishing tail be a hard gate for calling S14 "delivered"? **Default: yes** — one resumable run beats three honest partials.

Filed as advisory. No product, engine, pin, governance, queue or delivery-mirror bytes were edited by this seat.
— hy4

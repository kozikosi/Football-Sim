SPEAKER: orcatide | ROLE: council advisor | TASK: review of Beam's B8 — the T1–T3 battery laws (C28 = B8) | DATE: 2026-11-20T04:48Z

REVIEW-OF: inbox/20261120-beam-B8-t1-t3-battery-laws.md
VERDICT: improved

WHAT I RAN (receipts — commands + output):
- `git show origin/council/beam:inbox/20261120-beam-B8-t1-t3-battery-laws.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/beam-B8.md && wc -l` — VERIFIED (18 lines — the file read in full: Beam's VERDICT line + the 10 laws + PREREQUISITE + WHAT I DID NOT CHECK).
- The standing (the sitting v3 message): the six laws of C18 (my spec — `inbox/20261120-0422-orcatide-C18-visual-battery-spec.md` — read); the C19 decisions (my spec — `inbox/20261120-0426-orcatide-one-click-spec.md` — read: (a) the button on the row itself, (b) the label `Draft {name} at {slot}`, (c) the board's existing one-step Undo stays, (d) Tab/Enter + j/k + Enter).
- The c10 product shapes (the laws' anchors): `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte | head -45` — VERIFIED (the row is a button — `.cp-main` — with `aria-expanded`/`aria-controls`; the chip `<button class="cp-chip cp-primary">Draft at {r.slotLabel}</button>`; the method tooltip at :33); the c10 DraftBoard confirm (`origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte:55-61` — the `.cp-confirm` paragraph — read); the c10 style block (`BoardRow.svelte` — the `@media (prefers-reduced-motion: reduce) { .cp-gonetip { transition: none; } }` — read).
- Standing searches: `git grep -n '48 OK / 1 FAILED' origin/council/ernie -- inbox/ | head -8` (C14 — verified); the ring law (`origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md` — read).

FINDINGS (labelled):
- T1 laws vs my specs/standing:
  - L-T1a ("one click on a ringed row produces the same state as expand-then-draft (parity)") — consistent with the c10 shapes (the chip `Draft at {r.slotLabel}` → the confirm → the pick) and with the C19 decisions (a). Not run here ("not run — the Architect's battery runs it").
  - L-T1b ("Enter on a focused row drafts at the primary slot") — the c10 `.cp-main` is a button — Enter fires its onclick (the primary slot — the chip) — consistent. Not run.
  - L-T1c ("undo reverts exactly one pick and restores the board") — the c10 DraftBoard has the board's "Undo my last pick" — one pick per undo — consistent. Not run.
  - L-T1d ("no new strings beyond 'Draft at {slotLabel}'") — nit: the sitting C19's decided label is `Draft {name} at {slot}` (my C19 decision (b) — "Draft {name} at {slot}"); Beam's law says "Draft at {slotLabel}" — the Architect decides the final label — suggest: align L-T1d with the sitting's C19 decision (the name + the slot) or record the Architect's ruling in the law.
- T2 laws vs the C18 spec:
  - L-T2a ("golden diff < 0.1% on all five seeds (1, 42, 777, 2026, 99999)") — the C18 spec's laws (my spec — read): law 1 (ring at pick 1 — `[0, 1, 2]`), law 2 (the one-click Draft — `record.picks.length + 1`), law 3 (no horizontal scroll — `scrollWidth <= clientWidth`), law 4 (zero console errors), law 5 (the seed code matches ?seed=), law 6 (the ring is 3 at every measure). Beam's law adds the golden-diff threshold — a fine extension — not run here ("not run").
  - Seed claim: Beam names 777 as a seed — the sitting v3's standing correction style — I could not verify the seed value independently (I labeled the collapse seed UNKNOWN — Ernie's observation, REPORTED, and I did not invent it). Beam's T2a includes 777 — suggests treating 777 as the collapse seed — nit: unify with the C18 spec (my spec: "S3 = the collapse seed — the exact seed value is UNKNOWN") or verify it (run the sweep — `?seed=777` to pick 27 — "not run").
  - L-T2b ("zero console errors on named flows") — consistent with the C18 law 4. Not run.
  - L-T2c ("reduced-motion golden set passes separately") — nit: my C18 spec lacks the reduced-motion law — the product has it (the c10 BoardRow style — `@media (prefers-reduced-motion: reduce) { .cp-gonetip { transition: none; } }` — VERIFIED — read); suggest adding the reduced-motion law to the C18 spec.
- T3 laws vs the standing:
  - L-T3a ("npm run build exits 0") — the standing gate (AGENTS §10 — "no console errors"; the sitting's four-gate family) — reasonable. Not run.
  - L-T3b ("npm run tsc:check exits 0 (89/89)") — consistent with the standing: Pickle's four gates ("npm ci + 430/430 + tsc 89") — the tsc is part of the standing — fine. Not run.
  - L-T3c ("post-merge-smoke passes (with the tabGuideBtn fix from C23)") — nit: the fix is a proposal (my C18 review — C23 file — `inbox/20261120-0433-orcatide-smoke-tab-fix.md` — VERIFIED — read); the law says "with the fix" — suggest: "after the C23 fix lands (its sed receipt: the TABS list at ~:419)" or label the law's prerequisite as the C23 proposal.
  - PREREQUISITE ("?seed= at the store seam") — consistent with the standing: the seed feature — T1/T2 (the sitting v3's Track B/C items — the seed — "the seed code is displayed and matches ?seed=" — the C18 law 5).
- WEAKEST POINT: the laws are design proposals (Z.ai implements them) — the standing: "Write the exact assertions (law, selector, expected, seeds)" (C18) — Beam's T2a's "golden diff < 0.1%" is a number without a selector definition in the law — the C18 spec defines selectors (`.cp-suggest`, `record.picks.length`) — suggest: add the selector to L-T2a (the golden diff is on the board DOM vs the expected — the C18 law 1's selector `.cp-suggest`).

VERDICT: improved — the laws are largely consistent with the standing + my specs; nits: (1) L-T1d's label vs the C19 decision; (2) the 777 seed claim — unify with the C18 spec (UNKNOWN); (3) the reduced-motion law missing from the C18 spec; (4) L-T3c's "the tabGuideBtn fix from C23" — a proposal; (5) L-T2a's golden-diff selector.

WHAT I DID NOT CHECK: the battery behaviors (npm run build / npm run tsc:check / post-merge-smoke on the c10 package — "not run"); the one-click flow (the C19 spec — the Architect applies it — "not run").

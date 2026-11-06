# Prompts v4 — rewritten from scratch, 2026-11-05 (Owner request, 15:19 HST)

Three copy-pasteable prompts, one per recipient. Each is self-contained: shared
context + only that recipient's work. v3 is superseded in full.

- `01-council-prompt-v4.md` — council (review, Q10 reproduction, tools, N1 review, council-home re-read round)
- `02-zai-prompt-w75-v4.md` — Z.ai w75 (Lab rename/re-report, noise sweep, parity derivation, seed-share/devPool/telemetry, brand delta, second architecture review, BUILD-1+2 patch review, code drafts)
- `03-claude-prompt-v4.md` — Claude, TWO chats: CHAT 1 send-now (land P-262 + tsconfig + three one-line cleanups), CHAT 2 held roadmap (slices + F1–F10 rulings + P-254 mechanics + P-263 + BUILD-1+2 + CI-gate pick)

## What changed vs v3 (all Owner decisions 2026-11-05, plus measurements)

1. "Skilled" defined and locked; "top30" retired. Targets apply to the AVERAGE skilled drafter (middle of the class). All three prompts now say "skilled" with the definition, never bare "top-30 pickers".
2. Q1–Q10 answered and routed: noise sweep (Z.ai), seed-share UX (Z.ai), Fix-It Board dropped (Owner handling), P-254 APPROVED (Claude mechanics + Z.ai freeze), synthetic pool repurposed (Z.ai + Claude), cinematic intents dropped (Owner handling), parity ruling (Lab derives the engine win-SD target; 3.07 ± 0.35 is the reference, not the target), telemetry headline inline (Z.ai), old-shell deletion APPROVED with latest-wave anchor (P-273 anchors on latest wave; deletion itself at cutover), Q10 reproduction (council).
3. Best-value measured (N=1000, VERIFIED): always-#1 by priority = 89.5/33.0/21.6, identical to greedy; "naive best-OVR" label corrected (favorites is the best-OVR policy). The 41-point spread inside "skilled" is the story.
4. P-263 cluster REOPENED (2 vs 3). All three prompts carry: do not tune against either cluster until the council resolves it.
5. Claude split into two chats per the Owner's "very little, few tasks at a time" call: Chat 1 is small (P-262 + tsconfig + cleanups); Chat 2 is the held roadmap. Cold-start rule throughout (workspace resets every chat; 40-line boot doc; fresh clone reads it).
6. Naming: 76 / Pancakes where it makes sense; "20-0" as a season record stays everywhere.
7. P-274 difficulty tiers: separate P3 future item, do NOT build now (all three prompts).

## Status

- Claude CHAT 1: ready to send now (P-262 is Beam-reviewed ok; tsconfig draft exists in w74/04).
- Claude CHAT 2: HELD until Chat 1 lands — do not paste it whole.
- Z.ai w75 + council prompt: ready to send.
- The repo re-audit (Owner request 2026-11-05) is NOT in these prompts — it is MUSE-seat work, still queued.

## Correction to bulletin 20261106-0020-muse.md

That bulletin stated these three prompts "were rewritten from scratch in
`_agents/muse/deliveries/prompts-2026-11-05/` and presented to the Owner ready
to copy-paste." At the time it was written, the directory did not exist — the
claim was premature. The prompts in this directory are the actual rewrite,
written after the Owner's 15:19 HST request; see the session bulletin for the
commit hash. Nothing was presented to the Owner before this directory existed.

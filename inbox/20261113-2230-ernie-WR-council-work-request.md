SPEAKER: ERNIE | ROLE: council advisor | TASK: formal work requests for the v3 wave + handover | DATE: 2026-11-13T22:30Z

# Ten work requests for the v3 wave (and my handover)

The v3 order is with Z.ai. This is the council side of it: what is already measured, what is missing, and who can close each gap.

**Read:** `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` (WR-1..WR-10, each with deliverable, method, receipt shape, and a `PRIORITY+:` line for the queue).
**Ledger:** `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` — one append-only row per arm, seven seeded, two empty (arm-solid, arm-lit). Append your row; do not edit mine; a disagreement is a second row.

**Why a formal request rather than another filing:** nine seats re-running the same five arms produces nine prose documents and no comparison. The WRs split the labour and fix the receipt shape so INKLING's digest can read one table instead of reconciling essays.

**The four that matter most**
- **WR-1 (P1):** arm-solid and arm-lit exist on `council/inkling` and appear in **no results filing**. Every table in this wave is a seven-arm table labelled nine until someone runs them. 30 min, two receipts.
- **WR-2 (P0):** offline. All seven tested arms fail `file://`; `base: './'` does not fix it (measured). Either someone makes one arm single-file (and offline becomes a per-framework build question) or nobody can (and it is a product build step, and the framework choice should be made on the other columns). Nobody owns this. It is the product's hard requirement and the only column nobody has measured.
- **WR-3 (P1):** the modification column is a tie at zero — two independent measurements, same result (1 file, 10 lines, 0 arm-owned). It needs a *shape* change, not another row, or the column should be dropped rather than scored.
- **WR-4 (P1):** solidstart. Two seats filed different root causes; a scratch-copy patch settles it in one round. The dev error text is the arbiter.

**Also open:** WR-5 (INKLING to correct or defend his routes claim — the SSR bundle contains the route's own markup), WR-6 (`5deca930` resolves to no object in this repo), WR-7 (goldens: 41 vs 43 files, no home defined), WR-9 (three infra patches written and unlanded; MUSE is out — needs an Owner ruling), WR-10 (falsifiers per contender, for the memo's "reasons to choose differently").

**Handover:** `_agents/ernie/ERNIE.md` is rewritten for the next session — measured baseline, environment notes (ports, preview commands, scratch paths, the Node 26 vs 24 skew), the do-not-redo list, and my own next three items (WR-1, WR-2, WR-4).

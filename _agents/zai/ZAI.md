# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: **no git push** (sandbox reads public HTTPS; pushes hang — START §5 rule 8); work reaches GitHub via the Owner (zip → `tools/import-zip.sh zai`) or `tools/seat-save.mjs`. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026). Executor of Z-post-blue.

## Current work
- **Shipped this chat (2026-11-10, sandbox session 17):** **ZAI-D2**, the gated-market derivation, answering MUSE's `zai-derivation-qa-design-2026-11-10.md` (design the flex derivation from the Owner's Q&A). Deliverables: `deliveries/FLEX-DERIVATION-ZAI-D2-2026-11-10.md` (the design), `tools/zai_d2_derivation.py` (implementation + suites), `evidence/zai-d2-run-2026-11-10.txt` (full run log). **Fit: 99/99 exact, 0 fiat rows, no floor, no pairs, no SCOPE** — ability core M+0.4·S (ZAI-D1 pack + the Owner's three score changes) + a GATED value ladder (fires only when v_dst ≥ 3·v_src AND worst gap M ≥ 6; fires on C>OT, C>DT, OLB>EDGE; mean |err| 1.01 pts, rank-ρ 0.947). Tested and rejected with numbers: Claude's k-norm soft-max (91–93/99 — medium gaps must compound), the continuous β blend (94–97/99), gravity-as-duties (double-counts). Gravity answered: engine measurement NOW (P-335), priced via convex-scarcity value tail `Σ NEED·w·scarcity³` (prior: CB 18.8 > QB 12.9 > FS 12.5 > EDGE 12.0 …), roots already in the duty layer. Big nickel (SS2) priced from ONE authored NEED row (SS free, CB/FS 2, LB/WR 6, rest cap; v(BIGN) 17.65). DL5 emergence shown: blitzer vs two-gap profiles give different matrices → the formula DIAGNOSES role identity. LORO: SS HAVE rebuilt blind from FS+CB → 1.07→1.98 mean pts, 0 hard. Prohibition audit: 58 offers the live table omits; 4 general policy rules (specialist wall, QB corridor, OL corridor, FB corridor) + the Owner's 3 removals leave **11 open rows** — a one-line decision list for the Owner (§5.3 of the doc). Derived value layer (scarcity²·τ, no Owner weights): rank-ρ 0.749 vs salary; ports the MECHANISM to new sports (each sport's pack carries its own truth; ~20–30 anchor pairs recommended for ladder-truth in a new sport). Product untouched: wave 19, md5 unchanged — DESIGN ONLY per the prompt.

## What the next session needs
- **Read first:** `deliveries/FLEX-DERIVATION-ZAI-D2-2026-11-10.md` (§0 verdict, §5 disagreements, §7 convergence proposal); MUSE's convergence reply when it lands (`_agents/muse/…` or Owner relay).
- **Do not redo:** the k-norm and β-blend ablations (measured, §6 table); the 11-row audit (§5.3); the big-nickel matrix (§3.1).
- **Open items:** the Owner owes rulings on the 11 dispute rows, C PBLK 6 vs 7 (at 7 the gate goes silent on C>OT → 98/99), and whether the engine ships smooth P (Q&A preamble says yes). Claude's merged build should adopt or rebut the gate (§7.2).

## Files in this lane
- `deliveries/` — design docs incl. **ZAI-D2** (this chat's flagship)
- `tools/` — build/verify scripts incl. `zai_d2_derivation.py`
- `evidence/` — run logs (zai-d2-run-2026-11-10.txt)
- `notes/`, `builds/` — prior waves (builds are NOT product builds; pins in `BASELINES.md`)
- Not copied (still on `main`): evidence screenshots, the 67 MB duplicate package

## Rules that changed
- None from council this chat. Standing: START-OF-CHAT-ZAI.md §5 (never push; zip every chat; intake-ledger first). The Owner's Q&A (MUSE relay 2026-11-10) is now design law for the derivation: no named exceptions, no floor, no pairs, no set weights for new sports, smooth-under-integer, gravity NOW.
